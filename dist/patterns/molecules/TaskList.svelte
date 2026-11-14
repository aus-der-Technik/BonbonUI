<script lang="ts" module>
  export interface TaskItem {
    id: string;
    label: string;
    done: boolean;
    /** Who takes care of it (name or e-mail; shown as a small avatar). */
    assignee?: string | undefined;
    /** A short due hint, e.g. "Fri" or "12 Nov". */
    due?: string | undefined;
  }
</script>

<script lang="ts">
  /**
   * TaskList molecule — a checklist with its progress: tick items off, add new ones with Enter,
   * remove them. The list updates itself (bind `items`); the callbacks tell you what to save.
   * Ticking off the last open item throws a few sprinkles and shows `allDoneText`.
   *
   *   <TaskList title="Launch checklist" bind:items ontoggle={save} onadd={create} />
   */
  import Avatar from '../atoms/Avatar.svelte';
  import Icon from '../atoms/Icon.svelte';
  import { celebrate } from '../../utils/delight';

  interface Props {
    items?: TaskItem[];
    title?: string | undefined;
    /** Shows "3 of 5" and a progress bar under the title. */
    progress?: boolean;
    /** Shows the add field and the remove buttons. */
    editable?: boolean;
    /** Ticked items move to the end of the list. */
    sinkDone?: boolean;
    addLabel?: string;
    addPlaceholder?: string;
    removeLabel?: string;
    progressLabel?: (done: number, total: number) => string;
    emptyText?: string;
    /** Shown under the progress bar once every item is ticked. */
    allDoneText?: string;
    ontoggle?: ((item: TaskItem) => void) | undefined;
    onadd?: ((item: TaskItem) => void) | undefined;
    onremove?: ((item: TaskItem) => void) | undefined;
  }

  let {
    items = $bindable([]),
    title,
    progress = true,
    editable = true,
    sinkDone = false,
    addLabel = 'Add item',
    addPlaceholder = 'Add an item…',
    removeLabel = 'Remove',
    progressLabel = (done, total) => `${done} of ${total} done`,
    emptyText = 'Nothing on the list. Enjoy the calm.',
    allDoneText = "All done — that's a sweet day.",
    ontoggle,
    onadd,
    onremove,
  }: Props = $props();

  const id = $props.id();
  let draft = $state('');
  let serial = 0;

  const done = $derived(items.filter((item) => item.done).length);
  const ratio = $derived(items.length ? done / items.length : 0);
  const shown = $derived(
    sinkDone ? [...items.filter((i) => !i.done), ...items.filter((i) => i.done)] : items,
  );

  const complete = $derived(items.length > 0 && done === items.length);

  function toggle(item: TaskItem, box?: Element | null) {
    const next = { ...item, done: !item.done };
    items = items.map((i) => (i.id === item.id ? next : i));
    ontoggle?.(next);
    // The last tick of the list is the moment worth a sprinkle — once, from that very box.
    if (next.done && box && items.every((i) => i.done)) celebrate(box, 12);
  }

  function add() {
    const label = draft.trim();
    if (!label) return;
    serial += 1;
    const item: TaskItem = { id: `${id}-new-${serial}-${Date.now()}`, label, done: false };
    items = [...items, item];
    draft = '';
    onadd?.(item);
  }

  function remove(item: TaskItem) {
    items = items.filter((i) => i.id !== item.id);
    onremove?.(item);
  }
</script>

<div class="tasks">
  {#if title || progress}
    <div class="head">
      {#if title}<h3 class="title" id="{id}-title">{title}</h3>{/if}
      {#if progress && items.length}
        <span class="count">{progressLabel(done, items.length)}</span>
      {/if}
    </div>
    {#if progress && items.length}
      <div
        class="bar"
        class:complete={ratio === 1}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={done}
        aria-label={progressLabel(done, items.length)}
      >
        <span style:width="{ratio * 100}%"></span>
      </div>
    {/if}
    {#if progress && complete && allDoneText}
      <p class="cheer" aria-live="polite">{allDoneText}</p>
    {/if}
  {/if}

  {#if items.length}
    <ul class="list" aria-labelledby={title ? `${id}-title` : undefined}>
      {#each shown as item (item.id)}
        <li class="item" class:done={item.done}>
          <label class="check">
            <input
              type="checkbox"
              checked={item.done}
              onchange={(event) => toggle(item, event.currentTarget.nextElementSibling)}
            />
            <span class="box" aria-hidden="true"><Icon name="check" size={13} /></span>
            <span class="label">{item.label}</span>
          </label>
          {#if item.due || item.assignee}
            <span class="meta">
              {#if item.due}<span class="due">{item.due}</span>{/if}
              {#if item.assignee}<Avatar name={item.assignee} size={22} />{/if}
            </span>
          {/if}
          {#if editable}
            <button
              type="button"
              class="remove"
              aria-label="{removeLabel} {item.label}"
              onclick={() => remove(item)}
            >
              <Icon name="close" size={14} />
            </button>
          {/if}
        </li>
      {/each}
    </ul>
  {:else}
    <p class="empty">{emptyText}</p>
  {/if}

  {#if editable}
    <form
      class="add"
      onsubmit={(event) => {
        event.preventDefault();
        add();
      }}
    >
      <span class="plus" aria-hidden="true"><Icon name="plus" size={14} /></span>
      <input
        type="text"
        bind:value={draft}
        placeholder={addPlaceholder}
        aria-label={addLabel}
        enterkeyhint="done"
      />
      {#if draft.trim()}
        <button type="submit" class="add-button">{addLabel}</button>
      {/if}
    </form>
  {/if}
</div>

<style>
  .tasks {
    display: grid;
    gap: var(--space-2);
    container: tasks / inline-size;
  }
  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .title {
    margin: 0;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .count {
    margin-left: auto;
    font-size: var(--fs-xs);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .bar {
    height: 6px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    overflow: hidden;
  }
  .bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--grad-primary);
    transition: width var(--motion-slow) var(--ease-in-out);
  }
  .bar.complete span {
    background: var(--grad-success);
  }
  .cheer {
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
  }
  .item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-sm);
    padding: 0 var(--space-1);
    border-radius: var(--radius-md);
  }
  .item:hover {
    background: var(--fill-subtle);
  }
  .check {
    position: relative;
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-1) 0;
    cursor: pointer;
  }
  .check input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }
  .box {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    /* A clearly visible ring (≥ 3:1) — an empty task must read as "tick me". */
    border: 1.5px solid color-mix(in srgb, var(--text-3) 75%, transparent);
    background: var(--input-bg);
    color: transparent;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .check:hover .box {
    border-color: var(--accent);
  }
  .check:active .box {
    transform: var(--press-squish);
  }
  .check input:focus-visible + .box {
    outline: var(--focus-ring);
    outline-offset: 2px;
    box-shadow: var(--focus-halo);
  }
  /* The tick draws itself in. */
  .done .box :global(svg) {
    stroke-dasharray: 24;
    animation: tick-draw var(--motion-base) var(--ease-spring) both;
  }
  @keyframes tick-draw {
    from {
      stroke-dashoffset: 24;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  .done .box {
    background: var(--grad-primary);
    border-color: transparent;
    color: var(--on-accent);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
  .label {
    min-width: 0;
    font-size: var(--fs-md);
    color: var(--text);
    overflow-wrap: anywhere;
    transition: color var(--motion-quick) var(--ease-out);
  }
  .done .label {
    color: var(--text-3);
    text-decoration: line-through;
    text-decoration-color: var(--text-3);
  }
  .meta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    flex-shrink: 0;
  }
  /* In a narrow aside the title keeps the whole line; due date and assignee drop below it. */
  @container tasks (max-width: 22rem) {
    .item {
      flex-wrap: wrap;
      padding-bottom: var(--space-1);
    }
    .check {
      flex: 1 0 calc(100% - 26px - var(--space-2));
    }
    .remove {
      order: 1;
    }
    .meta {
      order: 2;
      flex: 1 0 100%;
      margin-top: calc(var(--space-1) * -1);
      padding-left: calc(20px + var(--space-3));
    }
  }
  .due {
    flex-shrink: 0;
    font-size: var(--fs-xs);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .remove {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--text-3);
    cursor: pointer;
    opacity: 0;
  }
  .item:hover .remove,
  .remove:focus-visible {
    opacity: 1;
  }
  @media (hover: none) {
    .remove {
      opacity: 1;
    }
  }
  .remove:hover {
    background: var(--fill-hover);
    color: var(--danger);
  }
  .remove:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .empty {
    margin: 0;
    padding: var(--space-2) var(--space-1);
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .add {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-sm);
    padding: 0 var(--space-1);
    border-radius: var(--radius-md);
  }
  .add:focus-within {
    background: var(--fill-subtle);
  }
  .plus {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px dashed var(--border-strong);
    color: var(--text-3);
  }
  .add input {
    flex: 1;
    min-width: 0;
    height: var(--control-sm);
    border: 0;
    background: none;
    font: inherit;
    font-size: var(--fs-md);
    color: var(--text);
    outline: none;
  }
  .add input::placeholder {
    color: var(--text-3);
  }
  .add-button {
    flex-shrink: 0;
    height: var(--control-xs);
    padding: 0 var(--space-3);
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--grad-primary);
    color: var(--on-accent);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    cursor: pointer;
    transition: transform var(--motion-quick) var(--ease-jelly);
  }
  .add-button:active {
    transform: var(--press-squish);
  }
  .add-button:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .bar span,
    .box {
      transition: none;
    }
    .cheer,
    .done .box :global(svg) {
      animation: none;
    }
  }
</style>
