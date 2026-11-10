<script lang="ts">
  /**
   * FilterBar molecule — the glass card holding a dashboard's filters in one wrapping row, their
   * bottoms aligned. `actions` sit at the far end (e.g. "Reset"). It lifts itself above the cards
   * below so open dropdowns are not clipped.
   *
   *   <FilterBar><SearchField label="Search" /><MultiSelect … /></FilterBar>
   */
  import type { Snippet } from 'svelte';
  import Card from '../atoms/Card.svelte';

  interface Props {
    label?: string;
    /** Buttons at the end of the row, e.g. "Reset" or "Export". */
    actions?: Snippet | undefined;
    children: Snippet;
  }

  let { label = 'Filters', actions, children }: Props = $props();
</script>

<Card class="filter-bar" role="group" aria-label={label}>
  <div class="row">
    {@render children()}
    {#if actions}<div class="actions">{@render actions()}</div>{/if}
  </div>
</Card>

<style>
  :global(.filter-bar) {
    position: relative;
    z-index: var(--z-raised);
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3) var(--space-4);
    align-items: end;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-left: auto;
  }
</style>
