<script lang="ts">
  /**
   * Pager molecule — "26–50 of 1,234" with Previous / Next pills, for offset-paged lists. The
   * range uses tabular figures so it does not jitter while paging. At either end the button is
   * only marked unavailable (`aria-disabled`), so the focus stays on it after the last page.
   *
   *   <Pager {offset} limit={25} total={1234} onpage={(next) => (offset = next)} />
   */
  import Button from '../atoms/Button.svelte';
  import { numberFormat } from '../../utils/format';

  interface Props {
    offset: number;
    limit: number;
    total: number;
    /** Number of items on the current page; defaults to what `limit` and `total` imply. */
    count?: number | undefined;
    previousLabel?: string;
    nextLabel?: string;
    ofLabel?: string;
    /** Accessible name of the navigation landmark. */
    label?: string;
    disabled?: boolean;
    onpage: (offset: number) => void;
  }

  let {
    offset,
    limit,
    total,
    count,
    previousLabel = 'Previous',
    nextLabel = 'Next',
    ofLabel = 'of',
    label = 'Pagination',
    disabled = false,
    onpage,
  }: Props = $props();

  const start = $derived(total ? offset + 1 : 0);
  const end = $derived(offset + (count ?? Math.max(0, Math.min(limit, total - offset))));
  const atStart = $derived(disabled || offset <= 0);
  const atEnd = $derived(disabled || end >= total);
</script>

<nav class="pager" aria-label={label}>
  <span class="range" aria-live="polite">
    {#if total}
      {numberFormat.format(start)}–{numberFormat.format(end)}
      {ofLabel}
      {numberFormat.format(total)}
    {/if}
  </span>
  <div class="buttons">
    <Button
      shape="pill"
      label={previousLabel}
      aria-disabled={atStart ? 'true' : undefined}
      onclick={() => {
        if (!atStart) onpage(Math.max(0, offset - limit));
      }}
    />
    <Button
      shape="pill"
      label={nextLabel}
      aria-disabled={atEnd ? 'true' : undefined}
      onclick={() => {
        if (!atEnd) onpage(offset + limit);
      }}
    />
  </div>
</nav>

<style>
  .pager {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
    font-size: var(--fs-sm);
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
  }
  .range {
    font-weight: var(--fw-medium);
  }
  .buttons {
    display: flex;
    gap: var(--space-2);
  }
</style>
