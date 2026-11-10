<script lang="ts" module>
  export interface Column {
    key: string;
    label: string;
    sortable?: boolean;
    align?: 'start' | 'end';
    /** Hides the column on narrow screens (below 700px). */
    hideOnMobile?: boolean;
    /** Keeps the cell on one line. */
    nowrap?: boolean;
  }

  export type SortOrder = 'asc' | 'desc';

  /** What the selection bar's snippets receive. */
  export interface TableSelection<T> {
    /** Keys of every selected row, including rows not on screen (other pages). */
    keys: string[];
    /** The selected rows among the rows on screen. */
    rows: T[];
    count: number;
    clear: () => void;
  }
</script>

<script lang="ts" generics="T">
  /**
   * DataTable organism — a report table on a glass card (e.g. "All feedback").
   * Sortable headers announce `aria-sort`; with a `detail` snippet each row toggles open on
   * click / Enter / Space (selecting text does not toggle). Cells render `cell(row, column)`
   * when given, else `row[column.key]`. Sorting and paging stay with the app: the table only
   * reports `onsort(key)`; put a `Pager` under it.
   *
   * Rows can also lead somewhere: `rowHref` puts a real link in the first cell, stretched over
   * the whole row (middle-click and "open in new tab" work, routers see an ordinary link);
   * `onrowclick` is for rows that act instead of navigate. With both, a plain click calls
   * `onrowclick` (e.g. a client-side router) while modified clicks keep the browser's link
   * behaviour. Clicks on buttons, links and inputs inside a cell never trigger the row. With
   * `rowHref`, keep other links out of the first column (a link cannot hold a link).
   * `singleOpen` keeps at most one detail open; `ontoggle`
   * reports opening, e.g. to load a detail lazily. `hideHeader` for plain lists. Hovered and
   * selected rows light up in the tint with rounded ends, like a list on a tablet.
   *
   * `current` lifts the one row on screen (e.g. the version shown) onto the selected layer
   * (it was called `selected` before row selection existed).
   * `selectable` adds a checkbox column for picking many rows: `selected` (bindable) holds their
   * keys — across pages, the header box selects or clears the rows on screen (dash when some
   * are picked), Shift+click picks a range, and Space toggles the focused row. A row without an
   * action of its own also toggles on click. `selectionActions` puts a bar right above the table
   * — "n selected", your actions, Clear — so bulk tools sit where the selection is;
   * `selectionDetail` adds a full-width line under it (e.g. a running bulk job).
   * `highlight` glows a row once whenever it changes to that row's key (a row just added or
   * updated), also when the row only appears later; `rowClass` adds your own classes per row
   * (style them with `:global`).
   *
   *   <DataTable {columns} rows={page} rowKey={(r) => r.id} {sort} {order} {onsort} />
   *   <DataTable … selectable bind:selected>
   *     {#snippet selectionActions({ keys })}<Button label="Export" onclick={() => run(keys)} />{/snippet}
   *   </DataTable>
   */
  import type { Snippet } from 'svelte';
  import { untrack } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
  import Button from '../atoms/Button.svelte';
  import Checkbox from '../atoms/Checkbox.svelte';
  import Icon from '../atoms/Icon.svelte';
  import { glowKeyed } from './highlight';
  import type { IconName } from '../atoms/icons';
  import EmptyState from '../molecules/EmptyState.svelte';

  interface Props {
    columns: Column[];
    rows: T[];
    rowKey: (row: T) => string;
    sort?: string | undefined;
    order?: SortOrder;
    onsort?: ((key: string) => void) | undefined;
    cell?: Snippet<[T, Column]> | undefined;
    detail?: Snippet<[T]> | undefined;
    /** The rows are narrowed by a search or filters: the empty state says so. */
    filtered?: boolean;
    emptyTitle?: string | undefined;
    /** Default: "Nothing here yet.", or `emptyFilteredMessage` when `filtered`. */
    emptyMessage?: string | undefined;
    emptyFilteredMessage?: string;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    /** Accessible name, e.g. the id of the card heading. */
    labelledby?: string | undefined;
    rowHref?: ((row: T) => string | undefined) | undefined;
    onrowclick?: ((row: T) => void) | undefined;
    /** Key of the one row on screen (e.g. the version shown): lifted onto the selected layer. */
    current?: string | undefined;
    singleOpen?: boolean;
    hideHeader?: boolean;
    ontoggle?: ((row: T, open: boolean) => void) | undefined;
    /** Adds a checkbox column for picking rows. */
    selectable?: boolean;
    /**
     * Keys of the picked rows (bindable); kept across pages and sorting. A single string is the
     * 1.x meaning — the one row on screen — kept for existing apps.
     * @deprecated as a string: use `current`.
     */
    selected?: string[] | string;
    onselectionchange?: ((keys: string[]) => void) | undefined;
    /** Actions in the bar right above the table while rows are picked. */
    selectionActions?: Snippet<[TableSelection<T>]> | undefined;
    /** A full-width line under the bar's actions, e.g. the progress of a bulk job. */
    selectionDetail?: Snippet<[TableSelection<T>]> | undefined;
    /** `always` keeps the bar (with `selectionHint`) while nothing is picked. */
    selectionBar?: 'auto' | 'always';
    selectionHint?: string;
    selectAllLabel?: string;
    selectRowLabel?: ((row: T) => string) | undefined;
    selectedLabel?: (count: number) => string;
    clearSelectionLabel?: string;
    /** Your own classes per row; style them with `:global(...)`. */
    rowClass?: ((row: T) => string | undefined) | undefined;
    /** Glows that row once each time this changes to its key, and scrolls it into view. */
    highlight?: string | undefined;
    /** A full-width first row in the body, e.g. a draft row for "New …": create sits on the
     *  collection it adds to. It shows even while the table is empty. */
    leading?: Snippet | undefined;
  }

  let {
    columns,
    rows,
    rowKey,
    sort,
    order = 'desc',
    onsort,
    cell,
    detail,
    filtered = false,
    emptyTitle,
    emptyMessage,
    emptyFilteredMessage = 'Nothing matches — try fewer filters.',
    emptyIcon,
    emptyText,
    labelledby,
    rowHref,
    onrowclick,
    current,
    singleOpen = false,
    hideHeader = false,
    ontoggle,
    selectable = false,
    selected = $bindable([]),
    onselectionchange,
    selectionActions,
    selectionDetail,
    selectionBar = 'auto',
    selectionHint = 'Tick rows to act on them.',
    selectAllLabel = 'Select all rows on screen',
    selectRowLabel,
    selectedLabel = (count) => `${count} selected`,
    clearSelectionLabel = 'Clear',
    rowClass,
    highlight,
    leading,
  }: Props = $props();

  // 1.x passed the one current row as `selected="key"`; arrays are the picked rows.
  const pickedKeys = $derived(Array.isArray(selected) ? selected : []);
  const currentKey = $derived(current ?? (typeof selected === 'string' ? selected : undefined));

  let wrap = $state<HTMLDivElement>();
  /** Where a Shift range starts: the row toggled last. */
  let anchor: string | undefined;

  const expanded = new SvelteSet<string>();

  /** A click on a control inside a cell belongs to that control, not the row. */
  const fromControl = (event: Event) =>
    event.target instanceof Element &&
    !!event.target.closest(
      'a, button, input, select, textarea, label, [role="button"], [role="menu"]',
    );

  function toggle(row: T, key: string) {
    if (window.getSelection()?.toString()) return;
    if (expanded.has(key)) {
      expanded.delete(key);
      ontoggle?.(row, false);
    } else {
      if (singleOpen) expanded.clear();
      expanded.add(key);
      ontoggle?.(row, true);
    }
  }

  function activate(row: T, key: string) {
    if (detail) toggle(row, key);
    else if (onrowclick) onrowclick(row);
    else if (selectable) pick(key, false);
  }

  // ---- selection

  const picked = $derived(new Set(pickedKeys));
  const pageKeys = $derived(rows.map(rowKey));
  const pageState = $derived(
    !pageKeys.some((k) => picked.has(k))
      ? 'none'
      : pageKeys.every((k) => picked.has(k))
        ? 'all'
        : 'some',
  );
  const selection = $derived<TableSelection<T>>({
    keys: pickedKeys,
    rows: rows.filter((row) => picked.has(rowKey(row))),
    count: pickedKeys.length,
    clear: () => setSelected([]),
  });

  function setSelected(next: string[]) {
    selected = next;
    onselectionchange?.(next);
  }

  /** Toggles one row; with `range`, every row from the last toggled one takes its new state. */
  function pick(key: string, range: boolean) {
    const on = !picked.has(key);
    const from = range && anchor !== undefined ? pageKeys.indexOf(anchor) : -1;
    const to = pageKeys.indexOf(key);
    const keys =
      from < 0 || to < 0 ? [key] : pageKeys.slice(Math.min(from, to), Math.max(from, to) + 1);
    anchor = key;
    setSelected(
      on
        ? [...pickedKeys, ...keys.filter((k) => !picked.has(k))]
        : pickedKeys.filter((k) => !keys.includes(k)),
    );
  }

  /**
   * Shift+click in the box's cell picks a range. Chrome does not pass a Shift+click on a label on
   * to its checkbox, others do: the cell takes every Shift+click first (and stops the label), the
   * checkbox only plain ones, so each browser picks exactly once.
   */
  function onPickCell(event: MouseEvent, key: string) {
    if (!event.shiftKey) return;
    if (!(event.target instanceof HTMLInputElement)) event.preventDefault();
    window.getSelection()?.removeAllRanges();
    pick(key, true);
  }

  function pickPage() {
    anchor = undefined;
    const page = new Set(pageKeys);
    setSelected(
      pageState === 'all'
        ? pickedKeys.filter((k) => !page.has(k))
        : [...pickedKeys, ...pageKeys.filter((k) => !picked.has(k))],
    );
  }

  const rowName = (row: T) => {
    const first = columns[0] ? value(row, columns[0].key) : '';
    return first ? `Select ${first}` : 'Select row';
  };

  // ---- highlight: one glow per change, also for a row that only shows up later

  let glowed = untrack(() => highlight);
  $effect(() => {
    const key = highlight;
    void rows;
    if (key === undefined) {
      glowed = undefined;
      return;
    }
    if (key !== glowed && glowKeyed(wrap, 'tr.row', key)) glowed = key;
  });

  /** A plain click on a row link goes to `onrowclick` when there is one; any other click opens the link. */
  function onLinkClick(event: MouseEvent, row: T) {
    if (!onrowclick || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onrowclick(row);
  }

  function onRowClick(event: MouseEvent, row: T, key: string) {
    if (fromControl(event)) return;
    if (selectable && !detail && !onrowclick) {
      // Shift+click picks a range; the text it selected on the way is not the point.
      if (event.shiftKey) window.getSelection()?.removeAllRanges();
      else if (window.getSelection()?.toString()) return;
      pick(key, event.shiftKey);
      return;
    }
    activate(row, key);
  }

  function onRowKey(event: KeyboardEvent, row: T, key: string) {
    if (fromControl(event)) return;
    if (event.key === ' ' && selectable) {
      event.preventDefault();
      pick(key, event.shiftKey);
    } else if (event.key === 'Enter' || (event.key === ' ' && detail)) {
      event.preventDefault();
      activate(row, key);
    }
  }

  const interactive = $derived(!!detail || !!onrowclick || !!rowHref || selectable);
  const linkOf = (row: T) => (detail ? undefined : rowHref?.(row));
  /** A linked row is reached through its link; only rows that act themselves take focus. */
  const acts = (href: string | undefined) => selectable || !!detail || (!!onrowclick && !href);
  const span = $derived(columns.length + (selectable ? 1 : 0));
  const showBar = $derived(
    selectable &&
      !!(selectionActions || selectionDetail) &&
      (pickedKeys.length > 0 || selectionBar === 'always'),
  );
  const shownEmpty = $derived(
    emptyMessage ?? emptyText ?? (filtered ? emptyFilteredMessage : 'Nothing here yet.'),
  );

  const ariaSort = (key: string) =>
    sort === key ? (order === 'asc' ? 'ascending' : 'descending') : undefined;
  const value = (row: T, key: string) => {
    const raw = (row as Record<string, unknown>)[key];
    return raw == null ? '' : String(raw);
  };
</script>

{#snippet content(row: T, column: Column)}
  {#if cell}{@render cell(row, column)}{:else}{value(row, column.key)}{/if}
{/snippet}

{#if showBar}
  <div class="bar" class:empty-bar={!pickedKeys.length}>
    <div class="bar-row">
      {#if pickedKeys.length}
        <span class="bar-count">{selectedLabel(pickedKeys.length)}</span>
        {#if selectionActions}<div class="bar-actions">
            {@render selectionActions(selection)}
          </div>{/if}
        <span class="bar-clear">
          <Button size="sm" variant="ghost" label={clearSelectionLabel} onclick={selection.clear} />
        </span>
      {:else}
        <span class="bar-hint">{selectionHint}</span>
      {/if}
    </div>
    {#if selectionDetail}{@render selectionDetail(selection)}{/if}
  </div>
{/if}

<div class="wrap" class:attached={showBar} bind:this={wrap}>
  {#if selectable}
    <span class="sr-only" aria-live="polite">{selectedLabel(pickedKeys.length)}</span>
  {/if}
  <table aria-labelledby={labelledby}>
    <thead class:sr-only={hideHeader}>
      <tr>
        {#if selectable}
          <th scope="col" class="pick">
            <Checkbox
              aria-label={selectAllLabel}
              checked={pageState === 'all'}
              indeterminate={pageState === 'some'}
              disabled={!rows.length}
              onclick={pickPage}
            />
          </th>
        {/if}
        {#each columns as column (column.key)}
          <th
            scope="col"
            class:mobile-hide={column.hideOnMobile}
            class:end={column.align === 'end'}
            aria-sort={column.sortable ? ariaSort(column.key) : undefined}
          >
            {#if column.sortable && onsort}
              <button
                type="button"
                class:active={sort === column.key}
                onclick={() => onsort(column.key)}
              >
                {column.label}<span class="arrow" aria-hidden="true"
                  ><Icon
                    name={sort === column.key && order === 'asc' ? 'chevron-up' : 'chevron-down'}
                    size={12}
                  /></span
                >
              </button>
            {:else}
              {column.label}
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if leading}
        <tr class="leading">
          <td colspan={span}>{@render leading()}</td>
        </tr>
      {/if}
      {#if !rows.length}
        <tr>
          <td colspan={span} class="empty">
            <EmptyState
              title={emptyTitle}
              message={shownEmpty}
              icon={emptyIcon ?? (filtered ? 'search' : undefined)}
            />
          </td>
        </tr>
      {/if}
      {#each rows as row (rowKey(row))}
        {@const key = rowKey(row)}
        {@const open = expanded.has(key)}
        {@const href = linkOf(row)}
        {@const focusable = acts(href)}
        {@const isPicked = selectable && picked.has(key)}
        <tr
          class="row {rowClass?.(row) ?? ''}"
          class:interactive
          class:linked={!!href}
          class:current={currentKey === key}
          class:picked={isPicked}
          data-key={key}
          tabindex={focusable ? 0 : undefined}
          aria-expanded={detail ? open : undefined}
          aria-current={currentKey === key ? 'true' : undefined}
          aria-selected={selectable ? isPicked : undefined}
          onclick={focusable ? (event) => onRowClick(event, row, key) : undefined}
          onkeydown={focusable ? (event) => onRowKey(event, row, key) : undefined}
        >
          {#if selectable}
            <td class="pick" onclickcapture={(event) => onPickCell(event, key)}>
              <Checkbox
                aria-label={selectRowLabel?.(row) ?? rowName(row)}
                checked={isPicked}
                tabindex={-1}
                onclick={(event: MouseEvent) => event.shiftKey || pick(key, false)}
              />
            </td>
          {/if}
          {#each columns as column, index (column.key)}
            <td
              class:mobile-hide={column.hideOnMobile}
              class:end={column.align === 'end'}
              class:nowrap={column.nowrap}
            >
              {#if href && index === 0}
                <a class="row-link" {href} onclick={(event) => onLinkClick(event, row)}
                  >{@render content(row, column)}</a
                >
              {:else}
                {@render content(row, column)}
              {/if}
            </td>
          {/each}
        </tr>
        {#if detail && open}
          <tr class="detail">
            <td colspan={span}>{@render detail(row)}</td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* Bleeds into the card padding, so cell text lines up with the card edge while the lit row
     reaches a little further out. */
  .wrap {
    overflow-x: auto;
    margin: 0 calc(-1 * var(--space-5));
    padding: 0 calc(var(--space-5) - var(--space-3));
  }
  table {
    width: 100%;
    /* separate, so hovered rows can have rounded ends */
    border-collapse: separate;
    border-spacing: 0;
    font-size: var(--fs-md);
    line-height: 1.5;
  }
  th {
    text-align: left;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
    padding: var(--space-2) var(--space-3);
    white-space: nowrap;
  }
  th button {
    border: 0;
    padding: 0;
    background: none;
    font: inherit;
    color: inherit;
    text-transform: inherit;
    letter-spacing: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    transition: color var(--motion-quick) var(--ease-out);
  }
  th button:hover,
  th button.active {
    color: var(--accent-ink);
  }
  th button:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-xs);
  }
  .arrow {
    display: inline-grid;
    place-items: center;
    width: 16px;
    height: 16px;
    border-radius: var(--radius-pill);
    opacity: 0;
    transition:
      opacity var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  th button:hover .arrow {
    opacity: 0.5;
  }
  th button.active .arrow {
    opacity: 1;
    background: var(--accent-soft);
  }
  /* Figures line up digit under digit. */
  .end {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  th.end button {
    flex-direction: row-reverse;
  }
  td {
    padding: 0.7rem var(--space-3);
    border-top: 1px solid var(--border-strong);
    vertical-align: top;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  td:first-child {
    border-top-left-radius: var(--radius-md);
    border-bottom-left-radius: var(--radius-md);
  }
  td:last-child {
    border-top-right-radius: var(--radius-md);
    border-bottom-right-radius: var(--radius-md);
  }
  .nowrap {
    white-space: nowrap;
  }
  .interactive {
    cursor: pointer;
  }
  .interactive:hover td {
    background: var(--accent-faint);
  }
  /* The selected layer: tinted glass with a tint rim around the whole row. The row on screen
     (`current`) also carries the accent edge; picked rows only the glass and rim, and a run of
     picked rows shares one rim, like one block. */
  .current td,
  .current:hover td,
  .picked td,
  .picked:hover td {
    --rim: var(--layer-selected-border);
    background: var(--layer-selected-bg);
    box-shadow:
      inset 0 var(--rim-top, 1px) 0 var(--rim),
      inset 0 calc(-1 * var(--rim-bottom, 1px)) 0 var(--rim);
  }
  .picked td:first-child {
    box-shadow:
      inset 1px 0 0 var(--rim),
      inset 0 var(--rim-top, 1px) 0 var(--rim),
      inset 0 calc(-1 * var(--rim-bottom, 1px)) 0 var(--rim);
  }
  .current td:first-child {
    box-shadow:
      inset 3px 0 0 var(--accent),
      inset 0 1px 0 var(--rim),
      inset 0 -1px 0 var(--rim);
  }
  .current td:last-child,
  .picked td:last-child {
    box-shadow:
      inset -1px 0 0 var(--rim),
      inset 0 var(--rim-top, 1px) 0 var(--rim),
      inset 0 calc(-1 * var(--rim-bottom, 1px)) 0 var(--rim);
  }
  .current td:only-child {
    box-shadow:
      inset 3px 0 0 var(--accent),
      inset -1px 0 0 var(--rim),
      inset 0 1px 0 var(--rim),
      inset 0 -1px 0 var(--rim);
  }
  .picked:has(+ .picked) td {
    --rim-bottom: 0px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .picked + .picked td {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .current td,
  .picked td {
    color: var(--text);
  }
  /* A lit row has no separators: neither its own nor the one of the row below. */
  .interactive:hover td,
  .interactive:hover + tr td,
  .current td,
  .current + tr td,
  .picked td,
  .picked + tr td {
    border-top-color: transparent;
  }
  /* The checkbox column: as narrow as the box. */
  .pick {
    width: 1%;
    padding-right: 0;
    vertical-align: middle;
  }
  td.pick {
    vertical-align: top;
    padding-top: calc(0.7rem + 0.1em);
  }
  /* The selection bar sits on the table it acts on: the selected layer, joined to the rows. */
  .bar {
    display: grid;
    gap: var(--space-2);
    margin: 0 calc(-1 * var(--space-3)) var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    background: var(--layer-selected-bg);
    box-shadow: inset 0 0 0 1px var(--layer-selected-border);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .bar.empty-bar {
    background: var(--fill-subtle);
    box-shadow: none;
  }
  .bar-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-3);
    min-height: var(--control-sm);
  }
  .bar-count {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--accent-ink);
    font-variant-numeric: tabular-nums;
  }
  .bar-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
  .bar-clear {
    margin-left: auto;
  }
  .bar-hint {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  .interactive:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -2px;
    border-radius: var(--radius-md);
  }
  .detail td {
    border-top: 0;
    padding-top: 0;
  }
  .empty {
    padding: 0;
  }
  /* The link in the first cell covers the whole row; controls in other cells sit above it. */
  .linked {
    position: relative;
  }
  .row-link {
    color: inherit;
    text-decoration: none;
  }
  .row-link::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-md);
  }
  .row-link:focus-visible {
    outline: none;
  }
  .linked:has(.row-link:focus-visible) {
    outline: var(--focus-ring);
    outline-offset: -2px;
    border-radius: var(--radius-md);
  }
  .linked :global(:is(a:not(.row-link), button, input, select, textarea, label, [role='button'])) {
    position: relative;
    z-index: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    td,
    .arrow {
      transition: none;
    }
    .bar {
      animation: none;
    }
  }
  @media (max-width: 700px) {
    .mobile-hide {
      display: none;
    }
  }
</style>
