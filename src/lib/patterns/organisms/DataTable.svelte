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
</script>

<script lang="ts" generics="T">
  /**
   * DataTable organism — a report table on a glass card (e.g. "All feedback").
   * Sortable headers announce `aria-sort`; with a `detail` snippet each row toggles open on
   * click / Enter / Space (selecting text does not toggle). Cells render `cell(row, column)`
   * when given, else `row[column.key]`. Sorting and paging stay with the app: the table only
   * reports `onsort(key)`; put a `Pager` under it.
   *
   * Rows can also lead somewhere: `rowHref` (whole row is a link) or `onrowclick`. Clicks on
   * buttons, links and inputs inside a cell never trigger the row. `selected` highlights one
   * row (e.g. the version on screen); `singleOpen` keeps at most one detail open; `ontoggle`
   * reports opening, e.g. to load a detail lazily. `hideHeader` for plain lists. Hovered and
   * selected rows light up in the tint with rounded ends, like a list on a tablet.
   *
   *   <DataTable {columns} rows={page} rowKey={(r) => r.id} {sort} {order} {onsort} />
   */
  import type { Snippet } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    columns: Column[];
    rows: T[];
    rowKey: (row: T) => string;
    sort?: string | undefined;
    order?: SortOrder;
    onsort?: ((key: string) => void) | undefined;
    cell?: Snippet<[T, Column]> | undefined;
    detail?: Snippet<[T]> | undefined;
    emptyText?: string;
    /** Accessible name, e.g. the id of the card heading. */
    labelledby?: string | undefined;
    rowHref?: ((row: T) => string | undefined) | undefined;
    onrowclick?: ((row: T) => void) | undefined;
    selected?: string | undefined;
    singleOpen?: boolean;
    hideHeader?: boolean;
    ontoggle?: ((row: T, open: boolean) => void) | undefined;
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
    emptyText = 'Nothing here — try fewer filters.',
    labelledby,
    rowHref,
    onrowclick,
    selected,
    singleOpen = false,
    hideHeader = false,
    ontoggle,
  }: Props = $props();

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
    else {
      const href = rowHref?.(row);
      if (href) window.location.assign(href);
    }
  }

  function onRowClick(event: MouseEvent, row: T, key: string) {
    if (fromControl(event)) return;
    activate(row, key);
  }

  function onRowKey(event: KeyboardEvent, row: T, key: string) {
    if (fromControl(event)) return;
    if (event.key === 'Enter' || (event.key === ' ' && detail)) {
      event.preventDefault();
      activate(row, key);
    }
  }

  const interactive = $derived(!!detail || !!onrowclick || !!rowHref);

  const ariaSort = (key: string) =>
    sort === key ? (order === 'asc' ? 'ascending' : 'descending') : undefined;
  const value = (row: T, key: string) => {
    const raw = (row as Record<string, unknown>)[key];
    return raw == null ? '' : String(raw);
  };
</script>

<div class="wrap">
  <table aria-labelledby={labelledby}>
    <thead class:sr-only={hideHeader}>
      <tr>
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
      {#if !rows.length}
        <tr><td colspan={columns.length} class="empty">{emptyText}</td></tr>
      {/if}
      {#each rows as row (rowKey(row))}
        {@const key = rowKey(row)}
        {@const open = expanded.has(key)}
        {@const href = rowHref?.(row)}
        <tr
          class="row"
          class:interactive
          class:selected={selected === key}
          tabindex={interactive ? 0 : undefined}
          role={!detail && (href || onrowclick) ? 'link' : undefined}
          aria-expanded={detail ? open : undefined}
          aria-current={selected === key ? 'true' : undefined}
          data-href={href}
          onclick={interactive ? (event) => onRowClick(event, row, key) : undefined}
          onkeydown={interactive ? (event) => onRowKey(event, row, key) : undefined}
        >
          {#each columns as column (column.key)}
            <td
              class:mobile-hide={column.hideOnMobile}
              class:end={column.align === 'end'}
              class:nowrap={column.nowrap}
            >
              {#if cell}{@render cell(row, column)}{:else}{value(row, column.key)}{/if}
            </td>
          {/each}
        </tr>
        {#if detail && open}
          <tr class="detail">
            <td colspan={columns.length}>{@render detail(row)}</td>
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
  /* The selected layer: tinted glass with a tint rim around the whole row. */
  .selected td,
  .selected:hover td {
    background: var(--layer-selected-bg);
    box-shadow:
      inset 0 1px 0 var(--layer-selected-border),
      inset 0 -1px 0 var(--layer-selected-border);
  }
  .selected td:first-child {
    box-shadow:
      inset 3px 0 0 var(--accent),
      inset 0 1px 0 var(--layer-selected-border),
      inset 0 -1px 0 var(--layer-selected-border);
  }
  .selected td:last-child {
    box-shadow:
      inset -1px 0 0 var(--layer-selected-border),
      inset 0 1px 0 var(--layer-selected-border),
      inset 0 -1px 0 var(--layer-selected-border);
  }
  .selected td:only-child {
    box-shadow:
      inset 3px 0 0 var(--accent),
      inset -1px 0 0 var(--layer-selected-border),
      inset 0 1px 0 var(--layer-selected-border),
      inset 0 -1px 0 var(--layer-selected-border);
  }
  .selected td {
    color: var(--text);
  }
  /* A lit row has no separators: neither its own nor the one of the row below. */
  .interactive:hover td,
  .interactive:hover + tr td,
  .selected td,
  .selected + tr td {
    border-top-color: transparent;
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
    text-align: center;
    color: var(--text-3);
    padding: var(--space-8) 0;
    font-size: var(--fs-md);
  }
  @media (prefers-reduced-motion: reduce) {
    td,
    .arrow {
      transition: none;
    }
  }
  @media (max-width: 700px) {
    .mobile-hide {
      display: none;
    }
  }
</style>
