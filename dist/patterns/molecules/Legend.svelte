<script lang="ts" module>
  export interface LegendItem {
    label: string;
    color: string;
  }
</script>

<script lang="ts">
  /**
   * Legend molecule — colour keys for a chart ("■ Up  ■ Down"), wrapping onto several lines.
   *
   *   <Legend items={[{ label: 'Up', color: 'var(--up)' }, { label: 'Down', color: '…' }]} />
   */
  import Swatch from '../atoms/Swatch.svelte';

  interface Props {
    items: LegendItem[];
    shape?: 'dot' | 'square';
  }

  let { items, shape = 'square' }: Props = $props();
</script>

<div class="legend">
  {#each items as item (item.label)}
    <span class="item"><Swatch color={item.color} {shape} />{item.label}</span>
  {/each}
</div>

<style>
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-4);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
  }
  .item {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }
</style>
