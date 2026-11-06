<script lang="ts" module>
  export interface GridColumn {
    name: string;
    /** SQL-ish type, shown under the name; decides the editor (number, checkbox, tags, text). */
    type: string;
    locked?: boolean;
  }

  export type CellValue = string | number | boolean | null | Record<string, unknown> | unknown[];
  export type GridRow = Record<string, CellValue>;

  export type CellKind = 'text' | 'number' | 'bool' | 'list' | 'struct';

  export function cellKind(type: string): CellKind {
    // First: `INTEGER[]` is a list, not a number.
    if (/\[\]\s*$|^\s*(list|array)\b/i.test(type)) return 'list';
    // Before the scalar checks: `STRUCT(active BOOLEAN)` is a struct, not a boolean.
    if (/^\s*struct\b/i.test(type)) return 'struct';
    if (/BOOL/i.test(type)) return 'bool';
    if (/INT|DOUBLE|FLOAT|DECIMAL|NUMERIC|NUMBER|REAL/i.test(type)) return 'number';
    return 'text';
  }

  /** Turns editor text into the value to store: numbers parse, empty numbers become NULL. */
  export function parseCell(kind: CellKind, text: string): CellValue {
    if (kind !== 'number') return text;
    const trimmed = text.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed.replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : text;
  }

  /** The `step` of a number editor: 1 for integers, the scale of a `decimal(p,s)`, else any. */
  export function stepFor(type: string): string {
    if (/INT/i.test(type)) return '1';
    const scale = Number(/^(?:decimal|numeric)\(\d+,\s*(\d+)\)$/i.exec(type.trim())?.[1] ?? NaN);
    if (Number.isInteger(scale)) return scale > 0 ? `0.${'0'.repeat(scale - 1)}1` : '1';
    return 'any';
  }

  /**
   * A list cell's items as strings, for its tags. NULL is no tags; a string holding a JSON array
   * is parsed, any other string is one item; non-string items are shown as JSON.
   */
  export function listItems(value: CellValue | undefined): string[] {
    if (value == null) return [];
    let items: unknown = value;
    if (typeof value === 'string') {
      try {
        items = value.trim().startsWith('[') ? JSON.parse(value) : [value];
      } catch {
        items = [value];
      }
    }
    if (!Array.isArray(items)) return [cellText(value)];
    return items.map((item) => (typeof item === 'string' ? item : JSON.stringify(item)));
  }

  /** How a value reads in a cell, and how it starts in an editor. */
  export function cellText(value: CellValue | undefined): string {
    if (value == null) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }
</script>

<script lang="ts">
  /**
   * EditableGrid organism — a spreadsheet for editing tables: sticky header (name + type), sticky
   * row numbers, click a cell to edit. Enter saves and moves down (Shift+Enter is a newline in
   * text), Tab saves and moves right, Escape cancels, leaving the cell saves. Booleans are
   * checkboxes; NULL is the indeterminate dash, and Delete/Backspace on a box sets it back to NULL.
   * A save flashes green, a failure rings red and keeps the old value. List columns (`VARCHAR[]`,
   * `list`) show their items as tags and edit them with a TagInput: Enter adds the typed tag, and
   * Enter in the empty field saves; the value committed is a string array. Struct columns
   * (`STRUCT(...)`, `struct`) show a StructTree in the cell and edit one value at a time in place;
   * the value committed is the whole record.
   *
   * Hovering a row number turns it into a delete control that asks once (and disarms itself).
   * New rows are made where they will land: with `ondraftsubmit`, a "+ New row" row after the
   * last row opens `draft` (bindable) in place — a green row at the bottom with Save and Cancel
   * right under it; Enter submits, Escape cancels. A draft opened from outside shows in the same
   * place, sticky to the bottom of the scroll area so it stays in view.
   * `resizable` adds drag handles to the headers (double-click resets); `onnearend` asks for the
   * next page while scrolling. `numbersAsText` keeps numbers exactly as typed (wide decimals).
   *
   * Feedback stays at the cell: `lockedHint` explains a cell that cannot be edited in a bubble
   * anchored to it when it is clicked, and `errorMessage` turns a rejected save into a reason in
   * the same bubble under the failed cell (red, announced) instead of a bare red ring.
   */
  import { onDestroy, tick } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';
  import EmptyState from '../molecules/EmptyState.svelte';
  import StructTree, { structFields } from '../molecules/StructTree.svelte';
  import TagInput from '../molecules/TagInput.svelte';
  import TagList from '../molecules/TagList.svelte';

  interface Props {
    columns: GridColumn[];
    rows: GridRow[];
    editable?: boolean;
    /** Long values break onto several lines instead of being cut off. */
    wrap?: boolean;
    /** A new row being entered at the bottom; `null` hides the draft row. */
    draft?: GridRow | null;
    /** Shows the "+ New row" row after the last row. Default: when `ondraftsubmit` is set. */
    addRow?: boolean | undefined;
    addRowLabel?: string;
    saveRowLabel?: string;
    cancelRowLabel?: string;
    /** Row number cell of the draft row. */
    draftRowLabel?: string;
    /** Accessible name of a draft cell. */
    draftCellLabel?: (column: string) => string;
    /** Accessible name of a cell's editor. */
    cellLabel?: (column: string, row: string | number) => string;
    /** Accessible name of the row-number column. */
    rowHeaderLabel?: string;
    /** Added to the type of a locked column. */
    readOnlyLabel?: string;
    /** Tooltip of a column resize handle. */
    resizeHint?: string;
    resizeLabel?: (column: string) => string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    nullLabel?: string;
    label?: string | undefined;
    /** What Enter does after saving: move to the cell below, or stay. */
    enterMoves?: 'down' | 'stay';
    /** Commit numbers as the typed text, never through a JavaScript double. */
    numbersAsText?: boolean;
    /** Whether an emptied cell means NULL rather than an empty string. Default: numbers only. */
    nullWhenEmpty?: ((column: GridColumn) => boolean) | undefined;
    /** Tags a list cell shows before "+n" when not wrapping. */
    listMax?: number;
    /** Row number shown in the margin, e.g. the position before filtering. */
    rowLabel?: ((row: GridRow, index: number) => string | number) | undefined;
    /** A row to flash green and scroll to, e.g. one just added. */
    highlight?: number | null | undefined;
    resizable?: boolean;
    /** Column widths in px by column name (bindable); empty means natural widths. */
    widths?: Record<string, number>;
    minColumnWidth?: number;
    /** Milliseconds before an armed delete disarms itself. */
    disarmAfter?: number;
    /** The scrolling element, e.g. to keep the position across a reload (bindable). */
    viewport?: HTMLDivElement | undefined;
    /** Accessible name of a row's delete control. */
    deleteLabel?: (row: string | number) => string;
    /** Text of the armed delete control. */
    confirmDeleteLabel?: string;
    /** Placeholder of a list cell's tag editor. */
    addTagLabel?: string;
    /** Placeholder of a locked column in the draft row. */
    lockedLabel?: string;
    /** Persist one cell; reject to mark the cell failed and keep the old value. */
    oncommit?:
      ((rowIndex: number, column: string, value: CellValue) => Promise<void> | void) | undefined;
    ondelete?: ((rowIndex: number) => Promise<void> | void) | undefined;
    ondraftsubmit?: (() => void) | undefined;
    ondraftcancel?: (() => void) | undefined;
    /** A click on a cell that cannot be edited, e.g. to explain why. */
    onlockedclick?: ((column: GridColumn, rowIndex: number) => void) | undefined;
    /** Why a cell cannot be edited, shown in a bubble at that cell when it is clicked. */
    lockedHint?:
      | string
      | ((column: GridColumn, row: GridRow, rowIndex: number) => string | undefined)
      | undefined;
    /** The reason shown at the cell when `oncommit` rejects; nothing returned = ring only. */
    errorMessage?:
      ((error: unknown, column: GridColumn, rowIndex: number) => string | undefined) | undefined;
    /** Milliseconds a locked hint stays; a save error stays twice as long. */
    hintDuration?: number;
    /** A number editor held something that is not a number; nothing was saved. */
    oninvalid?: ((column: GridColumn, rowIndex: number) => void) | undefined;
    /** Scrolled near the last row (or the rows do not fill the view): load more. */
    onnearend?: (() => void) | undefined;
    onresize?: ((widths: Record<string, number>) => void) | undefined;
  }

  let {
    columns,
    rows,
    editable = true,
    wrap = false,
    draft = $bindable(null),
    addRow,
    addRowLabel = 'New row',
    saveRowLabel = 'Save row',
    cancelRowLabel = 'Cancel',
    draftRowLabel = 'new',
    draftCellLabel = (column) => `New row, ${column}`,
    cellLabel = (column, row) => `${column}, row ${row}`,
    rowHeaderLabel = 'Row',
    readOnlyLabel = 'read-only',
    resizeHint = 'Drag to resize · double-click to reset all widths',
    resizeLabel = (column) => `Resize ${column}`,
    emptyTitle,
    emptyMessage,
    emptyIcon,
    emptyText,
    nullLabel = 'NULL',
    label,
    enterMoves = 'down',
    numbersAsText = false,
    nullWhenEmpty,
    listMax = 3,
    rowLabel,
    highlight,
    resizable = false,
    widths = $bindable({}),
    minColumnWidth = 60,
    disarmAfter = 4000,
    viewport = $bindable(),
    deleteLabel = (row) => `Delete row ${row}`,
    confirmDeleteLabel = 'Delete?',
    addTagLabel = 'Add a tag',
    lockedLabel = 'not editable',
    oncommit,
    ondelete,
    ondraftsubmit,
    ondraftcancel,
    onlockedclick,
    lockedHint,
    errorMessage,
    hintDuration = 3200,
    oninvalid,
    onnearend,
    onresize,
  }: Props = $props();

  type Status = 'saving' | 'saved' | 'failed';

  /** The open editor; `items` instead of `text` for a list cell. */
  let editing = $state<{ row: number; col: number; text: string; items?: string[] } | null>(null);
  let status = $state<Record<string, Status>>({});
  let armed = $state<number | null>(null);
  let deleting = $state<number | null>(null);
  let headHeight = $state(52);
  let headRow = $state<HTMLTableRowElement>();
  let resizing = $state<string | null>(null);
  let barHeight = $state(0);
  let draftRow = $state<HTMLTableRowElement>();
  let addButton = $state<HTMLButtonElement>();
  let armTimer: ReturnType<typeof setTimeout> | undefined;
  /** The bubble at one cell: why it is locked, or why its save failed. */
  let bubble = $state<{
    row: number;
    col: number;
    text: string;
    error: boolean;
    above: boolean;
  } | null>(null);
  let bubbleTimer: ReturnType<typeof setTimeout> | undefined;
  const uid = $props.id();

  const kinds = $derived(columns.map((column) => cellKind(column.type)));
  const structs = $derived(columns.map((column) => structFields(column.type)));
  const canEdit = (col: number) => editable && !columns[col]?.locked && !!oncommit;
  /**
   * A locked column in a table that can otherwise be edited: drawn soft and gray so it reads as
   * disabled next to the others. A table that is read-only as a whole stays at full contrast; gray
   * everywhere would mark nothing and only be harder to read.
   */
  const soft = (col: number) => editable && !!oncommit && !!columns[col]?.locked;
  const keyOf = (row: number, col: number) => `${row}:${col}`;
  const fixed = $derived(Object.keys(widths).length > 0);
  const tableWidth = $derived(
    fixed ? columns.reduce((sum, c) => sum + (widths[c.name] ?? minColumnWidth), 52) : undefined,
  );

  function display(value: CellValue | undefined): string {
    return value == null ? nullLabel : cellText(value);
  }

  function emptyMeansNull(col: number): boolean {
    const column = columns[col];
    if (!column) return false;
    return nullWhenEmpty ? nullWhenEmpty(column) : kinds[col] === 'number';
  }

  /** Editor text → the value to commit. */
  function toValue(col: number, text: string): CellValue {
    const kind = kinds[col] ?? 'text';
    if (text.trim() === '' && emptyMeansNull(col)) return null;
    if (kind === 'number' && numbersAsText) return text.trim();
    return parseCell(kind, text);
  }

  function flash(key: string, next: Status, ms = 1400) {
    status = { ...status, [key]: next };
    if (next === 'saving') return;
    setTimeout(() => {
      if (status[key] !== next) return;
      const { [key]: _drop, ...rest } = status;
      status = rest;
    }, ms);
  }

  function focusCell(row: number, col: number) {
    const box = viewport?.querySelector<HTMLInputElement>(
      `td[data-row="${row}"][data-col="${col}"] .bool-input`,
    );
    box?.focus();
  }

  function showBubble(row: number, col: number, text: string, error: boolean) {
    clearTimeout(bubbleTimer);
    // Enter has already moved the editor to the cell below: the reason goes above instead.
    const above = editing?.col === col && editing.row === row + 1;
    bubble = { row, col, text, error, above };
    bubbleTimer = setTimeout(hideBubble, error ? hintDuration * 2 : hintDuration);
  }

  function hideBubble() {
    clearTimeout(bubbleTimer);
    bubble = null;
  }

  function explainLocked(row: number, col: number) {
    const column = columns[col];
    const record = rows[row];
    if (!column || !record || lockedHint == null) return;
    const text = typeof lockedHint === 'string' ? lockedHint : lockedHint(column, record, row);
    if (text) showBubble(row, col, text, false);
  }

  /**
   * Puts the bubble under its cell (above when there is no room below), inside the scroll area
   * so it scrolls with the cell, and shifted left when it would run out on the right.
   */
  function placeBubble(node: HTMLElement, at: { row: number; col: number; above: boolean }) {
    const place = ({ row, col, above }: { row: number; col: number; above: boolean }) => {
      const cell = viewport?.querySelector<HTMLElement>(`td[data-row="${row}"][data-col="${col}"]`);
      if (!cell || !viewport) return;
      const box = viewport.getBoundingClientRect();
      const r = cell.getBoundingClientRect();
      const gap = 6;
      // Above means under the sticky header row, which covers the top of the scroll area.
      const roomAbove = r.top - box.top - headHeight >= node.offsetHeight + gap;
      const roomBelow = r.bottom + gap + node.offsetHeight <= box.bottom;
      const below = above ? !roomAbove : roomBelow || !roomAbove;
      const top =
        (below ? r.bottom + gap : r.top - gap - node.offsetHeight) - box.top + viewport.scrollTop;
      const room = viewport.scrollLeft + viewport.clientWidth - node.offsetWidth - gap;
      const left = Math.max(
        viewport.scrollLeft + gap,
        Math.min(r.left - box.left + viewport.scrollLeft, room),
      );
      node.style.top = `${top}px`;
      node.style.left = `${left}px`;
      node.classList.toggle('above', !below);
    };
    place(at);
    return { update: place };
  }
  onDestroy(() => clearTimeout(bubbleTimer));

  function startEdit(row: number, col: number) {
    if (!canEdit(col)) {
      const column = columns[col];
      if (column) onlockedclick?.(column, row);
      explainLocked(row, col);
      return;
    }
    if (bubble) hideBubble();
    // A struct is edited inside its own tree.
    if (kinds[col] === 'struct') return;
    // A checkbox is its own editor: arriving on one only focuses it.
    if (kinds[col] === 'bool') {
      focusCell(row, col);
      return;
    }
    const column = columns[col];
    if (!column) return;
    const value = rows[row]?.[column.name];
    editing =
      kinds[col] === 'list'
        ? { row, col, text: '', items: listItems(value) }
        : { row, col, text: cellText(value) };
  }

  const sameItems = (a: string[], b: string[]) =>
    a.length === b.length && a.every((item, i) => item === b[i]);

  async function commit(row: number, col: number, value: CellValue) {
    const column = columns[col];
    if (!column || !oncommit) return;
    if (rows[row]?.[column.name] === value) return;
    const key = keyOf(row, col);
    flash(key, 'saving');
    try {
      await oncommit(row, column.name, value);
      flash(key, 'saved');
    } catch (error) {
      const text = errorMessage?.(error, column, row);
      flash(key, 'failed', text ? hintDuration * 2 : 2400);
      if (text) showBubble(row, col, text, true);
    }
  }

  /**
   * Ends the open edit. A blur passes its own cell: Chrome fires blur when it removes the old
   * editor after Tab, which must not close the editor Tab just opened on the next cell.
   */
  function finishEdit(
    save: boolean,
    row?: number,
    col?: number,
    editor?: HTMLInputElement | HTMLTextAreaElement,
  ) {
    const current = editing;
    if (row != null && (current?.row !== row || current.col !== col)) return;
    editing = null;
    if (!current || !save) return;
    const column = columns[current.col];
    if (current.items) {
      // NULL and an empty list both show no tags, so going from one to the other is no edit.
      const items = current.items;
      if (sameItems(items, listItems(rows[current.row]?.[column?.name ?? '']))) return;
      void commit(
        current.row,
        current.col,
        !items.length && emptyMeansNull(current.col) ? null : items,
      );
      return;
    }
    // A number input reports an unparseable entry as empty, which would otherwise save NULL.
    if (editor instanceof HTMLInputElement && editor.validity.badInput) {
      if (column) oninvalid?.(column, current.row);
      return;
    }
    if (current.text === cellText(rows[current.row]?.[column?.name ?? ''])) return;
    void commit(current.row, current.col, toValue(current.col, current.text));
  }

  function nextEditable(row: number, col: number, step: 1 | -1): [number, number] | null {
    for (let c = col + step; c >= 0 && c < columns.length; c += step) {
      if (canEdit(c)) return [row, c];
    }
    return null;
  }

  function move(row: number, col: number, direction: 'down' | 'right' | 'left') {
    if (direction === 'down') {
      if (row + 1 < rows.length) startEdit(row + 1, col);
      return;
    }
    const next = nextEditable(row, col, direction === 'right' ? 1 : -1);
    if (next) startEdit(...next);
  }

  function onEditorKeydown(event: KeyboardEvent) {
    if (!editing) return;
    const { row, col } = editing;
    // currentTarget is null for a list cell, whose TagInput passes the event on after handling it.
    const editor = (event.currentTarget ?? event.target) as HTMLInputElement | HTMLTextAreaElement;
    const multiline = kinds[col] === 'text';
    if (event.key === 'Escape') {
      event.preventDefault();
      finishEdit(false);
    } else if (event.key === 'Enter' && !(multiline && event.shiftKey) && !event.altKey) {
      event.preventDefault();
      finishEdit(true, undefined, undefined, editor);
      if (enterMoves === 'down') move(row, col, 'down');
    } else if (event.key === 'Tab') {
      event.preventDefault();
      finishEdit(true, undefined, undefined, editor);
      move(row, col, event.shiftKey ? 'left' : 'right');
    }
  }

  function onBoolKeydown(event: KeyboardEvent, row: number, col: number) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      const column = columns[col];
      if (canEdit(col) && column && rows[row]?.[column.name] != null) void commit(row, col, null);
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      move(row, col, event.key === 'Enter' ? 'down' : event.shiftKey ? 'left' : 'right');
    }
  }

  function focusEditor(node: HTMLElement) {
    node.focus();
    if (node instanceof HTMLTextAreaElement || node instanceof HTMLInputElement) node.select();
  }

  /** A focused number input steps on the wheel: scrolling past it must not change the value. */
  function noWheel(node: HTMLElement) {
    const stop = (event: WheelEvent) => event.preventDefault();
    node.addEventListener('wheel', stop, { passive: false });
    return { destroy: () => node.removeEventListener('wheel', stop) };
  }

  /** Text editors grow with their content. */
  function grow(node: HTMLTextAreaElement) {
    const fit = () => {
      node.style.height = 'auto';
      node.style.height = `${node.scrollHeight}px`;
    };
    fit();
    node.addEventListener('input', fit);
    return { destroy: () => node.removeEventListener('input', fit) };
  }

  onDestroy(() => clearTimeout(armTimer));

  function disarm() {
    clearTimeout(armTimer);
    armed = null;
  }

  async function remove(row: number) {
    if (armed !== row) {
      disarm();
      armed = row;
      armTimer = setTimeout(disarm, disarmAfter);
      return;
    }
    disarm();
    if (!ondelete) return;
    deleting = row;
    try {
      await ondelete(row);
    } finally {
      deleting = null;
    }
  }

  function setDraft(column: string, value: CellValue | undefined) {
    if (!draft) return;
    const next = { ...draft };
    if (value === undefined) delete next[column];
    else next[column] = value;
    draft = next;
  }

  const showAddRow = $derived(editable && (addRow ?? !!ondraftsubmit));

  /** Opens the draft row where the new row will land, and puts the cursor in it. */
  async function openDraft() {
    finishEdit(true);
    draft = {};
    await tick();
    draftRow?.scrollIntoView?.({ block: 'nearest' });
    draftRow?.querySelector<HTMLElement>('input:not(:disabled), textarea:not(:disabled)')?.focus();
  }

  /** Once the draft is gone (saved or cancelled), focus returns to "+ New row". */
  async function afterDraft() {
    await tick();
    if (!draft) addButton?.focus();
  }

  function submitDraft() {
    ondraftsubmit?.();
    void afterDraft();
  }

  function cancelDraft() {
    if (ondraftcancel) ondraftcancel();
    else draft = null;
    void afterDraft();
  }

  function onDraftKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitDraft();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      cancelDraft();
    }
  }

  // ---- column widths

  function measure(): Record<string, number> {
    const cells = [...(headRow?.cells ?? [])].slice(1);
    return Object.fromEntries(
      columns.map((c, i) => [
        c.name,
        Math.round(cells[i]?.getBoundingClientRect().width ?? minColumnWidth),
      ]),
    );
  }

  function startResize(event: PointerEvent, column: string) {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    finishEdit(true);
    // Freeze every column at its width on screen, so the drag changes one column only.
    const frozen = fixed ? { ...widths } : measure();
    widths = frozen;
    const handle = event.currentTarget as HTMLElement;
    const startX = event.clientX;
    const startWidth = frozen[column] ?? minColumnWidth;
    resizing = column;
    handle.setPointerCapture?.(event.pointerId);
    const onMove = (e: PointerEvent) => {
      widths = {
        ...widths,
        [column]: Math.max(minColumnWidth, Math.round(startWidth + e.clientX - startX)),
      };
    };
    const onEnd = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onEnd);
      handle.removeEventListener('pointercancel', onEnd);
      resizing = null;
      onresize?.(widths);
    };
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onEnd);
    handle.addEventListener('pointercancel', onEnd);
  }

  function resetWidths() {
    widths = {};
    onresize?.({});
  }

  // ---- paging & highlight

  function nearEnd(): boolean {
    return !!viewport && viewport.scrollTop + viewport.clientHeight > viewport.scrollHeight - 400;
  }

  $effect(() => {
    // A short first page may not fill the view, so nothing would ever scroll.
    void rows.length;
    if (onnearend && nearEnd()) queueMicrotask(() => onnearend?.());
  });

  $effect(() => {
    if (highlight == null) return;
    viewport
      ?.querySelector(`tr[data-index="${highlight}"]`)
      ?.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
  });
</script>

<div
  class="wrap"
  class:resizing={!!resizing}
  style:--head-h="{headHeight}px"
  bind:this={viewport}
  onscroll={() => onnearend && nearEnd() && onnearend()}
  onkeydown={(event) => event.key === 'Escape' && bubble && !editing && hideBubble()}
  role="presentation"
>
  <table
    class="grid"
    class:wrap
    class:fixed
    class:editable={editable && !!ondelete}
    class:spaced={editable && !!ondelete && rows.length > 0}
    style:width={tableWidth != null ? `${tableWidth}px` : undefined}
    aria-label={label}
  >
    <thead bind:clientHeight={headHeight}>
      <tr bind:this={headRow}>
        <th class="rownum" scope="col"><span class="sr-only">{rowHeaderLabel}</span></th>
        {#each columns as column, col (column.name)}
          <th
            scope="col"
            class:locked={column.locked}
            class:soft={soft(col)}
            style:width={fixed ? `${widths[column.name] ?? minColumnWidth}px` : undefined}
          >
            <span class="col-name">{column.name}</span>
            <span class="col-type">{column.type}{column.locked ? ` · ${readOnlyLabel}` : ''}</span>
            {#if resizable}
              <span
                class="col-resize"
                class:active={resizing === column.name}
                title={resizeHint}
                role="separator"
                aria-orientation="vertical"
                aria-label={resizeLabel(column.name)}
                onpointerdown={(event) => startResize(event, column.name)}
                ondblclick={resetWidths}
              ></span>
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as record, row (row)}
        {@const number = rowLabel ? rowLabel(record, row) : row + 1}
        <tr class:deleting={deleting === row} class:added={highlight === row} data-index={row}>
          <th class="rownum" scope="row">
            {#if editable && ondelete}
              <button
                type="button"
                class="row-del"
                class:confirm={armed === row}
                aria-label={deleteLabel(number)}
                title={deleteLabel(number)}
                disabled={deleting === row}
                onclick={() => remove(row)}
                onblur={() => armed === row && deleting !== row && disarm()}
              >
                <Icon name="trash" size={14} />{#if armed === row}<span>{confirmDeleteLabel}</span
                  >{/if}
              </button>
            {/if}
            <span class="num-label">{number}</span>
          </th>
          {#each columns as column, col (column.name)}
            {@const value = record[column.name]}
            {@const kind = kinds[col]}
            {@const state = status[keyOf(row, col)]}
            {@const isEditing = editing?.row === row && editing.col === col}
            <td
              class="cell {state ?? ''}"
              class:num={kind === 'number'}
              class:bool={kind === 'bool'}
              class:list={kind === 'list'}
              class:struct={kind === 'struct'}
              class:locked={!canEdit(col)}
              class:soft={soft(col)}
              class:null={value == null && kind !== 'bool' && kind !== 'list' && kind !== 'struct'}
              class:editing={isEditing}
              data-row={row}
              data-col={col}
              aria-describedby={bubble?.row === row && bubble.col === col
                ? `${uid}-bubble`
                : undefined}
              title={kind === 'bool'
                ? value == null
                  ? nullLabel
                  : undefined
                : kind !== 'struct' && !wrap && value != null && cellText(value).length > 60
                  ? cellText(value)
                  : undefined}
              onclick={(event) => {
                if (isEditing) return;
                if (kind === 'bool') {
                  if (!canEdit(col)) startEdit(row, col);
                  else if (event.target === event.currentTarget)
                    (event.currentTarget as HTMLElement)
                      .querySelector<HTMLInputElement>('.bool-input')
                      ?.click();
                  return;
                }
                startEdit(row, col);
              }}
            >
              {#if kind === 'bool'}
                <input
                  type="checkbox"
                  class="bool-input"
                  aria-label={cellLabel(column.name, number)}
                  checked={value === true}
                  indeterminate={value == null}
                  disabled={!canEdit(col) || state === 'saving'}
                  onchange={(event) => commit(row, col, event.currentTarget.checked)}
                  onkeydown={(event) => onBoolKeydown(event, row, col)}
                />
              {:else if isEditing && editing}
                {#if editing.items}
                  <div class="editor tags">
                    <TagInput
                      label={cellLabel(column.name, number)}
                      placeholder={addTagLabel}
                      bind:value={editing.items}
                      autofocus
                      onkeydown={onEditorKeydown}
                      onblur={() => finishEdit(true, row, col)}
                    />
                  </div>
                {:else if kind === 'number'}
                  <!-- No bind:value in either editor: on type=number it binds a number, and the binding is
                       read once more while the editor unmounts, after `editing` is already null. -->
                  <input
                    class="editor num"
                    type="number"
                    step={stepFor(column.type)}
                    aria-label={cellLabel(column.name, number)}
                    value={editing?.text ?? ''}
                    oninput={(event) => editing && (editing.text = event.currentTarget.value)}
                    onkeydown={onEditorKeydown}
                    onblur={(event) => finishEdit(true, row, col, event.currentTarget)}
                    use:focusEditor
                    use:noWheel
                  />
                {:else}
                  <textarea
                    class="editor"
                    aria-label={cellLabel(column.name, number)}
                    spellcheck={/^(text|varchar|string)/i.test(column.type)}
                    value={editing?.text ?? ''}
                    oninput={(event) => editing && (editing.text = event.currentTarget.value)}
                    onkeydown={onEditorKeydown}
                    onblur={(event) => finishEdit(true, row, col, event.currentTarget)}
                    use:focusEditor
                    use:grow></textarea>
                {/if}
                {#if kind !== 'list'}{display(value)}{/if}
              {:else if kind === 'struct'}
                <StructTree
                  value={value as Record<string, unknown> | null | undefined}
                  fields={structs[col]}
                  editable={canEdit(col) && state !== 'saving'}
                  nullLabel={structs[col] ? '—' : nullLabel}
                  label={cellLabel(column.name, number)}
                  onchange={(next) => commit(row, col, next)}
                />
              {:else if kind === 'list'}
                <!-- No tags and NULL both read as an empty cell: "null" in a tag cell looks like a tag. -->
                <TagList
                  labels={listItems(value)}
                  max={wrap ? undefined : listMax}
                  maxWidth="12rem"
                />
              {:else}
                {display(value)}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
      {#if draft}
        <tr class="draft" bind:this={draftRow} style:--bar-h="{barHeight}px">
          <th class="rownum" scope="row">{draftRowLabel}</th>
          {#each columns as column, col (column.name)}
            {@const kind = kinds[col]}
            {@const value = draft[column.name]}
            <td>
              {#if kind === 'bool'}
                <!-- Starts indeterminate — "left out" — since an unchecked box would mean false. -->
                <label class="draft-check">
                  <input
                    type="checkbox"
                    aria-label={draftCellLabel(column.name)}
                    disabled={column.locked}
                    checked={value === true}
                    indeterminate={value == null}
                    onchange={(event) => setDraft(column.name, event.currentTarget.checked)}
                    onkeydown={onDraftKeydown}
                  />
                </label>
              {:else if kind === 'struct'}
                <div class="draft-struct">
                  <StructTree
                    value={value as Record<string, unknown> | null | undefined}
                    fields={structs[col]}
                    editable={!column.locked}
                    {nullLabel}
                    label={draftCellLabel(column.name)}
                    onchange={(next) => setDraft(column.name, next)}
                  />
                </div>
              {:else if kind === 'list'}
                <div class="draft-tags">
                  <TagInput
                    label={draftCellLabel(column.name)}
                    placeholder={column.locked ? lockedLabel : column.type}
                    disabled={column.locked}
                    value={listItems(value)}
                    onchange={(items) => setDraft(column.name, items.length ? items : undefined)}
                    onkeydown={onDraftKeydown}
                  />
                </div>
              {:else if kind === 'number'}
                <input
                  class="draft-input"
                  type="number"
                  step={stepFor(column.type)}
                  aria-label={draftCellLabel(column.name)}
                  placeholder={column.locked ? lockedLabel : column.type}
                  disabled={column.locked}
                  value={cellText(value)}
                  oninput={(event) =>
                    setDraft(
                      column.name,
                      event.currentTarget.value === '' && !event.currentTarget.validity.badInput
                        ? undefined
                        : toValue(col, event.currentTarget.value),
                    )}
                  onkeydown={onDraftKeydown}
                  use:noWheel
                />
              {:else}
                <textarea
                  class="draft-input"
                  rows="1"
                  aria-label={draftCellLabel(column.name)}
                  placeholder={column.locked ? lockedLabel : column.type}
                  disabled={column.locked}
                  value={cellText(value)}
                  oninput={(event) =>
                    setDraft(
                      column.name,
                      event.currentTarget.value === ''
                        ? undefined
                        : toValue(col, event.currentTarget.value),
                    )}
                  onkeydown={onDraftKeydown}></textarea>
              {/if}
            </td>
          {/each}
        </tr>
        <tr class="draft-bar">
          <td colspan={columns.length + 1} bind:offsetHeight={barHeight}>
            <div class="draft-actions">
              <Button
                size="sm"
                variant="success"
                shape="pill"
                icon="check"
                label={saveRowLabel}
                onclick={submitDraft}
              />
              <Button
                size="sm"
                variant="ghost"
                shape="pill"
                label={cancelRowLabel}
                onclick={cancelDraft}
              />
            </div>
          </td>
        </tr>
      {:else if showAddRow && rows.length}
        <tr class="add-row">
          <td colspan={columns.length + 1}>
            <button type="button" class="add-row-btn" bind:this={addButton} onclick={openDraft}>
              <Icon name="plus" size={14} />{addRowLabel}
            </button>
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
  {#if bubble}
    <div
      class="bubble"
      class:error={bubble.error}
      id="{uid}-bubble"
      role={bubble.error ? 'alert' : 'status'}
      use:placeBubble={bubble}
    >
      {bubble.text}
    </div>
  {/if}
  {#if !rows.length && !draft}
    <div class="empty">
      <EmptyState
        title={emptyTitle}
        message={emptyMessage ?? emptyText ?? 'No rows yet.'}
        icon={emptyIcon}
        actionLabel={showAddRow ? addRowLabel : undefined}
        actionIcon="plus"
        onaction={showAddRow ? openDraft : undefined}
      />
    </div>
  {/if}
</div>

<style>
  .wrap {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
  }
  .grid {
    border-collapse: separate;
    border-spacing: 0;
    font-size: var(--fs-sm);
    min-width: 100%;
  }
  /* Room under the last row for actions floating over the page. */
  .grid.spaced {
    margin-bottom: 5rem;
  }
  th,
  td {
    border-right: 1px solid var(--border-strong);
    border-bottom: 1px solid var(--border-strong);
  }
  thead th {
    position: sticky;
    top: 0;
    z-index: 3;
    background: var(--head-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    text-align: left;
    padding: var(--space-2) var(--space-3);
    white-space: nowrap;
    font-weight: var(--fw-semibold);
    vertical-align: bottom;
  }
  .col-name {
    display: block;
    color: var(--text);
  }
  .col-type {
    display: block;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-medium);
    color: var(--text-3);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
  }
  .rownum {
    position: sticky;
    left: 0;
    z-index: 2;
    width: 1%;
    min-width: 3.25rem;
    background: var(--head-bg);
    color: var(--text-3);
    text-align: right;
    padding: 0 0.6rem;
    font-weight: var(--fw-regular);
    font-variant-numeric: tabular-nums;
    font-size: var(--fs-xs);
    user-select: none;
  }
  thead th.rownum {
    z-index: 4;
  }
  tbody tr:hover .rownum {
    color: var(--text);
  }
  .num-label {
    display: inline-block;
    min-width: 1.5rem;
  }

  .cell {
    position: relative;
    padding: 0.42rem var(--space-3);
    max-width: 32rem;
    min-width: 6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: cell;
    transition: background-color var(--motion-base) var(--ease-out);
  }
  .cell:hover {
    background-color: var(--cell-hover);
  }
  .cell.num {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .cell.locked {
    cursor: default;
    color: var(--text-2);
  }
  .cell.soft,
  .cell.soft:hover {
    color: var(--text-3);
    background-color: var(--fill-subtle);
  }
  /* Tags and struct rows carry their own text colour; fade them with the cell. */
  .cell.soft :global(.tags),
  .cell.soft :global(.kv),
  .cell.soft .bool-input {
    opacity: 0.6;
  }
  thead th.soft .col-name {
    color: var(--text-3);
  }
  .cell.null {
    color: var(--text-3);
    font-style: italic;
  }
  .cell.bool {
    text-align: center;
    cursor: default;
  }
  .cell.editing {
    overflow: visible;
    z-index: 5;
    box-shadow: inset 0 0 0 2px var(--accent);
  }
  .cell.saving {
    background-image: linear-gradient(90deg, transparent, var(--accent-soft), transparent);
    background-size: 200% 100%;
    animation: bb-slide 1s linear infinite;
  }
  /* Saved flashes green; failed rings red (danger), never in the accent. */
  .cell.saved {
    background-color: color-mix(in srgb, var(--ok) 16%, transparent);
  }
  .cell.failed {
    box-shadow: inset 0 0 0 2px var(--danger);
    background-color: var(--tint-danger);
  }
  .grid.wrap .cell {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    text-overflow: clip;
    vertical-align: top;
  }
  .grid.wrap tbody .rownum {
    vertical-align: top;
    padding-top: 0.42rem;
  }

  .editor {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 6;
    display: block;
    min-width: 100%;
    width: max(100%, 22rem);
    min-height: 100%;
    max-height: 16rem;
    padding: 0.42rem var(--space-3);
    border: 0;
    border-radius: 0 0 var(--radius-sm) var(--radius-sm);
    resize: none;
    background: var(--editor-bg);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    font-style: normal;
    line-height: 1.5;
    box-shadow:
      inset 0 0 0 2px var(--accent),
      var(--shadow-pop);
    outline: none;
    white-space: pre-wrap;
    overflow-y: auto;
  }
  .editor.tags {
    padding: 0.15rem;
    white-space: normal;
    overflow: visible;
  }
  .editor.tags :global(.tag-input) {
    border: 0;
    box-shadow: none;
    background: none;
  }
  .cell.list {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
  .cell.struct {
    white-space: normal;
    vertical-align: top;
    min-width: 12rem;
    cursor: default;
  }
  .draft-struct {
    padding: 0.42rem var(--space-3);
  }
  .grid:not(.wrap) .cell.list :global(.tags) {
    flex-wrap: nowrap;
  }
  .draft-tags :global(.tag-input) {
    border: 0;
    border-radius: 0;
    background: none;
    box-shadow: none;
  }
  .editor.num {
    width: max(100%, 10rem);
    height: 100%;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .bool-input,
  .draft-check input {
    width: 15px;
    height: 15px;
    margin: 0;
    vertical-align: middle;
    accent-color: var(--accent);
    cursor: pointer;
  }
  .bool-input:disabled {
    cursor: default;
  }
  .bool-input:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  /* Row delete: the number turns into a trash control on hover; armed, it floats over the row. */
  .row-del {
    position: relative;
    display: none;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    height: 24px;
    min-width: 24px;
    padding: 0 0.3rem;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--text-3);
    cursor: pointer;
    font: inherit;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
  }
  /* A 32px hit area around the 24px control. */
  .row-del::before {
    content: '';
    position: absolute;
    inset: -4px;
  }
  .row-del:hover {
    color: var(--danger);
    background: var(--tint-danger);
  }
  .row-del.confirm {
    display: inline-flex;
    position: absolute;
    left: 0.35rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 6;
    white-space: nowrap;
    color: var(--on-danger);
    background: var(--grad-danger);
    padding: 0 0.55rem;
    border-radius: var(--radius-pill);
    box-shadow: 0 6px 16px color-mix(in srgb, var(--danger) 30%, transparent);
    animation: arm var(--motion-base) var(--ease-spring);
  }
  @keyframes arm {
    from {
      transform: translateY(-50%) scale(0.85);
    }
  }
  .row-del:focus-visible {
    display: inline-flex;
    outline: var(--focus-ring);
  }
  .grid.editable tbody tr:not(.draft):hover .row-del {
    display: inline-flex;
  }
  .grid.editable tbody tr:not(.draft):hover .num-label,
  .row-del:focus-visible ~ .num-label {
    display: none;
  }
  tr.deleting td {
    opacity: 0.45;
    text-decoration: line-through;
  }

  /* The draft row sits where the new row will land, after the last row; when the rows are
     longer than the view it sticks to the bottom edge, its Save / Cancel bar under it. */
  tr.draft th,
  tr.draft td {
    position: sticky;
    bottom: var(--bar-h);
    z-index: 2;
    background: var(--editor-bg);
  }
  tr.draft-bar td {
    position: sticky;
    bottom: 0;
    z-index: 3;
    padding: var(--space-2) var(--space-3);
    border-bottom: 0;
    background: var(--head-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .draft-actions {
    position: sticky;
    left: var(--space-3);
    display: inline-flex;
    gap: var(--space-2);
  }
  .add-row td {
    padding: 0;
    border-right: 0;
  }
  .add-row-btn {
    position: sticky;
    left: 0;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-sm);
    padding: 0 var(--space-3) 0 1.1rem;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--text-3);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition:
      color var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out);
  }
  .add-row-btn:hover {
    color: var(--ok);
    background: color-mix(in srgb, var(--ok) 8%, transparent);
  }
  .add-row-btn:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -2px;
  }
  tr.draft td {
    padding: 0;
    box-shadow: inset 0 -2px 0 var(--ok);
  }
  tr.draft th.rownum {
    z-index: 3;
    color: var(--ok);
    font-weight: var(--fw-bold);
    box-shadow: inset 0 -2px 0 var(--ok);
  }
  .draft-input {
    display: block;
    width: 100%;
    min-width: 10rem;
    min-height: 2.15rem;
    padding: 0.42rem var(--space-3);
    border: 0;
    background: color-mix(in srgb, var(--ok) 6%, transparent);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    outline: none;
  }
  .draft-input:focus {
    background: var(--tint-ok);
    box-shadow: inset 0 0 0 2px var(--ok);
  }
  .draft-input:disabled {
    background: transparent;
  }
  .draft-input[type='number'] {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .draft-check {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 4rem;
    min-height: 2.15rem;
    background: color-mix(in srgb, var(--ok) 6%, transparent);
    cursor: pointer;
  }
  .draft-check input {
    accent-color: var(--ok);
  }

  .empty {
    position: sticky;
    left: 0;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  @media (prefers-reduced-motion: reduce) {
    .cell.saving,
    .row-del.confirm,
    .bubble {
      animation: none;
    }
  }

  /* Column widths: a drag handle on each header's right border. */
  .grid.fixed {
    table-layout: fixed;
    min-width: 0;
  }
  .grid.fixed .cell {
    max-width: none;
    min-width: 0;
  }
  .grid.fixed thead th {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .col-resize {
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 100%;
    cursor: col-resize;
    touch-action: none;
    z-index: 1;
  }
  .col-resize::after {
    content: '';
    position: absolute;
    top: 22%;
    bottom: 22%;
    right: 3px;
    width: 2px;
    border-radius: 1px;
    background: transparent;
    transition: background var(--motion-quick) var(--ease-out);
  }
  thead th:hover .col-resize::after {
    background: var(--border-strong);
  }
  .col-resize:hover::after,
  .col-resize.active::after {
    background: var(--accent);
  }
  .wrap.resizing,
  .wrap.resizing * {
    cursor: col-resize !important;
    user-select: none;
  }
  /* The bubble at a cell: why it is locked (glass), or why its save failed (danger). */
  .bubble {
    position: absolute;
    z-index: 7;
    max-width: min(18rem, calc(100% - var(--space-4)));
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    border: 0.75px solid var(--pill-border);
    background: var(--tooltip-bg);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-pop);
    color: var(--text);
    font-size: var(--fs-sm);
    line-height: 1.4;
    white-space: normal;
    pointer-events: none;
    transform-origin: 1rem 0;
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .bubble:global(.above) {
    transform-origin: 1rem 100%;
  }
  .bubble.error {
    border-color: var(--danger);
    background: color-mix(in srgb, var(--danger) 8%, var(--tooltip-bg));
    box-shadow:
      inset 3px 0 0 var(--danger),
      var(--shadow-pop);
  }
  tr.added td {
    background-color: color-mix(in srgb, var(--ok) 14%, transparent);
  }
  textarea.draft-input {
    resize: none;
    line-height: 1.5;
  }
</style>
