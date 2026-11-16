<script lang="ts" module>
  /** One field of a STRUCT type, with its own fields when it is a struct too. */
  export interface StructField {
    name: string;
    type: string;
    fields?: StructField[] | undefined;
  }

  /** Splits at top-level commas, outside parentheses and double quotes. */
  function splitTopLevel(text: string): string[] {
    const parts: string[] = [];
    let depth = 0;
    let quoted = false;
    let start = 0;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') quoted = !quoted;
      else if (!quoted && c === '(') depth++;
      else if (!quoted && c === ')') depth--;
      else if (!quoted && depth === 0 && c === ',') {
        parts.push(text.slice(start, i));
        start = i + 1;
      }
    }
    parts.push(text.slice(start));
    return parts.map((p) => p.trim()).filter(Boolean);
  }

  /**
   * The fields of a SQL STRUCT type, e.g. `STRUCT(de VARCHAR, "en gb" VARCHAR, geo STRUCT(lat
   * DOUBLE))`, nested. `null` when the type is not a struct or names no fields (a bare "struct").
   */
  export function structFields(type: string): StructField[] | null {
    const body = /^\s*struct\s*\(([\s\S]*)\)\s*$/i.exec(type)?.[1];
    if (body == null) return null;
    const fields = splitTopLevel(body).map((part) => {
      const quoted = /^"((?:[^"]|"")*)"\s+([\s\S]+)$/.exec(part);
      const bare = /^(\S+)\s+([\s\S]+)$/.exec(part);
      const [name, fieldType] = quoted
        ? [quoted[1]!.replaceAll('""', '"'), quoted[2]!]
        : bare
          ? [bare[1]!, bare[2]!]
          : [part, ''];
      const nested = structFields(fieldType);
      return { name, type: fieldType.trim(), fields: nested ?? undefined };
    });
    return fields.length ? fields : null;
  }

  const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

  /**
   * `record` with every key `fields` names present, `null` where it had none, recursively for the
   * records it holds. A SQL engine converting JSON into a STRUCT may refuse an object that lacks a
   * key, so a record goes out whole even when only one value of it was set.
   */
  export function complete(
    record: Record<string, unknown>,
    fields: StructField[] | null | undefined,
  ): Record<string, unknown> {
    if (!fields?.length) return record;
    const out: Record<string, unknown> = { ...record };
    for (const field of fields) {
      const current = out[field.name];
      if (current === undefined) out[field.name] = null;
      else if (field.fields && isObject(current)) out[field.name] = complete(current, field.fields);
    }
    return out;
  }

  /** `value` with the leaf at `path` replaced, copying only the objects on the way. */
  export function setIn(
    value: Record<string, unknown> | null | undefined,
    path: string[],
    leaf: unknown,
  ): Record<string, unknown> {
    const [head, ...rest] = path;
    const base = isObject(value) ? value : {};
    if (head === undefined) return base;
    return {
      ...base,
      [head]: rest.length ? setIn(base[head] as Record<string, unknown> | null, rest, leaf) : leaf,
    };
  }
</script>

<script lang="ts">
  /**
   * StructTree molecule — a record (a SQL STRUCT, a JSON object) as key/value rows, edited one value
   * at a time where it stands: click a value, type, Enter or leaving saves, Escape cancels. Booleans
   * are checkboxes; lists of plain values are tags (edited with a TagInput); an empty value shows
   * `nullLabel`.
   *
   * A nested record is indented under a toggle with a guide line. The first `expandDepth` levels
   * start open, deeper ones collapsed to "n fields". `fields` (see `structFields`) supplies the keys
   * of a record that is NULL or lacks some of them, so those can be filled in too. `onchange`
   * receives the whole record with the one value changed — with every key `fields` names, `null`
   * where unset.
   *
   *   <StructTree value={row.address} fields={structFields(column.type)} editable {onchange} />
   */
  import Icon from '../atoms/Icon.svelte';
  import TagInput from './TagInput.svelte';
  import TagList from './TagList.svelte';

  type Path = string[];

  interface Props {
    value: Record<string, unknown> | null | undefined;
    fields?: StructField[] | null | undefined;
    editable?: boolean;
    /** Levels open at first; deeper records start collapsed. */
    expandDepth?: number;
    nullLabel?: string;
    /** Accessible name, e.g. "translations, row 3". */
    label?: string | undefined;
    fieldsLabel?: (count: number) => string;
    /** Tooltip of an editable value. */
    editLabel?: (key: string) => string;
    onchange?: ((next: Record<string, unknown>) => void) | undefined;
  }

  let {
    value,
    fields,
    editable = false,
    expandDepth = 1,
    nullLabel = '—',
    label,
    fieldsLabel = (count) => `${count} ${count === 1 ? 'field' : 'fields'}`,
    editLabel = (key) => `Edit ${key}`,
    onchange,
  }: Props = $props();

  let open = $state<Record<string, boolean>>({});
  let editing = $state<{ key: string; path: Path; text: string; items?: string[] } | null>(null);

  const keyOf = (path: Path) => path.join('\u0000');
  const isOpen = (path: Path) => open[keyOf(path)] ?? path.length < expandDepth;
  const toggle = (path: Path) => (open = { ...open, [keyOf(path)]: !isOpen(path) });

  /** The keys at one level: the type's order first, then any the value has beyond it. */
  function entries(record: unknown, known: StructField[] | undefined) {
    const object = isObject(record) ? record : {};
    const names = [...(known ?? []).map((f) => f.name)];
    for (const name of Object.keys(object)) if (!names.includes(name)) names.push(name);
    return names.map((name) => ({
      name,
      value: object[name],
      field: known?.find((f) => f.name === name),
    }));
  }

  const isList = (v: unknown, field?: StructField) =>
    Array.isArray(v)
      ? v.every((item) => !isObject(item) && !Array.isArray(item))
      : /\[\]\s*$/.test(field?.type ?? '');
  const isNumeric = (v: unknown, field?: StructField) =>
    typeof v === 'number' ||
    /INT|DOUBLE|FLOAT|DECIMAL|NUMERIC|NUMBER|REAL/i.test(field?.type ?? '');
  const isBoolean = (v: unknown, field?: StructField) =>
    typeof v === 'boolean' || /^\s*BOOL/i.test(field?.type ?? '');

  function save(path: Path, leaf: unknown) {
    onchange?.(complete(setIn(value, path, leaf), fields));
  }

  function startEdit(path: Path, current: unknown, field?: StructField) {
    if (!editable) return;
    editing = isList(current, field)
      ? {
          key: keyOf(path),
          path,
          text: '',
          items: (Array.isArray(current) ? current : []).map(String),
        }
      : { key: keyOf(path), path, text: current == null ? '' : String(current) };
  }

  function finish(commit: boolean, current: unknown, field?: StructField) {
    const edit = editing;
    editing = null;
    if (!commit || !edit) return;
    if (edit.items) {
      const before = Array.isArray(current) ? current.map(String) : [];
      if (edit.items.length === before.length && edit.items.every((item, i) => item === before[i]))
        return;
      save(edit.path, edit.items.length ? edit.items : null);
      return;
    }
    const text = edit.text;
    if (text === (current == null ? '' : String(current))) return;
    if (text.trim() === '') {
      save(edit.path, null);
    } else if (
      isNumeric(current, field) &&
      Number.isFinite(Number(text.trim().replace(',', '.')))
    ) {
      save(edit.path, Number(text.trim().replace(',', '.')));
    } else {
      save(edit.path, text);
    }
  }

  function onKeydown(event: KeyboardEvent, current: unknown, field?: StructField) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      finish(false, current, field);
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      finish(true, current, field);
    }
  }

  function focusEditor(node: HTMLInputElement) {
    node.focus();
    node.select();
  }
</script>

{#snippet level(record: unknown, known: StructField[] | undefined, parent: Path)}
  {#each entries(record, known) as entry (entry.name)}
    {@const path = [...parent, entry.name]}
    {@const nested = isObject(entry.value) || (entry.value == null && !!entry.field?.fields)}
    {#if nested}
      {@const count = entries(entry.value, entry.field?.fields).length}
      <button
        type="button"
        class="key toggle"
        aria-expanded={isOpen(path)}
        onclick={() => toggle(path)}
      >
        <span class="caret" class:open={isOpen(path)}><Icon name="chevron-right" size={12} /></span>
        {entry.name}
      </button>
      {#if isOpen(path)}
        <span class="summary"></span>
        <div class="kv nested">{@render level(entry.value, entry.field?.fields, path)}</div>
      {:else}
        <button type="button" class="summary" onclick={() => toggle(path)}>
          {entry.value == null ? nullLabel : fieldsLabel(count)}
        </button>
      {/if}
    {:else}
      {@const isEditing = editing?.key === keyOf(path)}
      <span class="key">{entry.name}</span>
      <span class="val">
        {#if isBoolean(entry.value, entry.field)}
          <input
            type="checkbox"
            class="bool"
            aria-label={entry.name}
            checked={entry.value === true}
            indeterminate={entry.value == null}
            disabled={!editable}
            onchange={(event) => save(path, event.currentTarget.checked)}
          />
        {:else if isEditing && editing?.items}
          <TagInput
            label={entry.name}
            bind:value={editing.items}
            autofocus
            onkeydown={(event) => onKeydown(event, entry.value, entry.field)}
            onblur={() => editing?.key === keyOf(path) && finish(true, entry.value, entry.field)}
          />
        {:else if isEditing && editing}
          <input
            class="editor"
            class:num={isNumeric(entry.value, entry.field)}
            aria-label={entry.name}
            value={editing.text}
            oninput={(event) => editing && (editing.text = event.currentTarget.value)}
            onkeydown={(event) => onKeydown(event, entry.value, entry.field)}
            onblur={() => editing?.key === keyOf(path) && finish(true, entry.value, entry.field)}
            use:focusEditor
          />
        {:else}
          <button
            type="button"
            class="leaf"
            class:null={entry.value == null}
            class:num={typeof entry.value === 'number'}
            disabled={!editable}
            title={editable ? editLabel(entry.name) : undefined}
            onclick={() => startEdit(path, entry.value, entry.field)}
          >
            {#if Array.isArray(entry.value) && entry.value.length}
              <TagList
                labels={entry.value.map((item) =>
                  isObject(item) ? JSON.stringify(item) : String(item),
                )}
              />
            {:else if entry.value == null || (Array.isArray(entry.value) && !entry.value.length)}
              {nullLabel}
            {:else if isObject(entry.value) || Array.isArray(entry.value)}
              {JSON.stringify(entry.value)}
            {:else}
              {String(entry.value)}
            {/if}
          </button>
        {/if}
      </span>
    {/if}
  {/each}
{/snippet}

<div class="kv" role="group" aria-label={label}>
  {#if value == null && !fields?.length}
    <span class="empty">{nullLabel}</span>
  {:else}
    {@render level(value, fields ?? undefined, [])}
  {/if}
</div>

<style>
  .kv {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    column-gap: 0.75rem;
    row-gap: 0.1rem;
    align-items: baseline;
    font-size: var(--fs-sm);
    white-space: normal;
    text-align: left;
  }
  .nested {
    grid-column: 1 / -1;
    margin: 0.1rem 0 0.25rem 0.4rem;
    padding-left: 0.85rem;
    border-left: 2px solid var(--accent-soft);
  }
  .key {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    white-space: nowrap;
  }
  .toggle,
  .summary,
  .leaf {
    border: 0;
    background: none;
    font: inherit;
    color: inherit;
    padding: 0;
    text-align: left;
  }
  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    margin-left: -1rem;
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    cursor: pointer;
  }
  .caret {
    display: inline-grid;
    place-items: center;
    width: 0.8rem;
    transition: transform var(--motion-quick) var(--ease-out);
  }
  .caret.open {
    transform: rotate(90deg);
  }
  .summary {
    color: var(--text-3);
    font-size: var(--fs-xs);
    cursor: pointer;
  }
  span.summary {
    cursor: default;
  }
  .val {
    min-width: 0;
  }
  .leaf {
    display: block;
    width: 100%;
    min-height: 1.4em;
    padding: 0.05rem 0.3rem;
    margin-left: -0.3rem;
    border-radius: var(--radius-sm);
    overflow-wrap: anywhere;
    cursor: text;
  }
  .leaf:hover:not(:disabled) {
    background: var(--accent-faint);
  }
  .leaf:focus-visible {
    outline: var(--focus-ring);
  }
  .leaf:disabled {
    cursor: inherit;
    color: inherit;
  }
  .leaf.null,
  .empty {
    color: var(--text-3);
  }
  .num {
    font-variant-numeric: tabular-nums;
  }
  .editor {
    width: 100%;
    margin-left: -0.3rem;
    padding: 0.05rem 0.3rem;
    border: 0;
    border-radius: var(--radius-sm);
    outline: none;
    background: var(--editor-bg);
    box-shadow:
      inset 0 0 0 2px var(--accent),
      var(--focus-halo);
    color: var(--text);
    font: inherit;
  }
  .bool {
    width: 14px;
    height: 14px;
    accent-color: var(--accent);
  }
</style>
