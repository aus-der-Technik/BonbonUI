<script lang="ts">
  /**
   * ChartCard organism — a chart with its heading, on the ground by default (`level="panel"`
   * for a card): a chart heading, a sub line, an optional headline
   * figure (`value`), a legend and `actions` (a range switch, a menu). The chart itself is
   * `children`. Mark it `wide` to span a full row in a dashboard grid.
   *
   *   <ChartCard title="Orders per day" sub="Last 30 days" value="1,284"><LineChart … /></ChartCard>
   */
  import type { Snippet } from 'svelte';
  import Card from '../atoms/Card.svelte';
  import Legend, { type LegendItem } from '../molecules/Legend.svelte';

  interface Props {
    title: string;
    sub?: string | undefined;
    /** A headline figure under the title, e.g. the total of the range. */
    value?: string | undefined;
    legend?: LegendItem[] | undefined;
    wide?: boolean;
    /** `ground` (default) sits on the backdrop; `panel` is a card. */
    level?: 'ground' | 'panel';
    /** Controls on the right of the heading. */
    actions?: Snippet | undefined;
    children: Snippet;
  }

  let {
    title,
    sub,
    value,
    legend,
    wide = false,
    level = 'ground',
    actions,
    children,
  }: Props = $props();
</script>

<Card
  class={wide ? 'chart-card wide' : 'chart-card'}
  surface={level === 'ground' ? 'ground' : 'glass'}
>
  <div class="head">
    <div class="titles">
      <h2>{title}</h2>
      {#if sub}<div class="sub">{sub}</div>{/if}
      {#if value}<div class="value">{value}</div>{/if}
    </div>
    {#if legend || actions}
      <div class="end">
        {#if legend}<Legend items={legend} />{/if}
        {@render actions?.()}
      </div>
    {/if}
  </div>
  <div class="plot">{@render children()}</div>
</Card>

<style>
  /* Spans the row once DashboardGrid folds to two columns. */
  @media (max-width: 1100px) {
    :global(.chart-card.wide) {
      grid-column: 1 / -1;
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-2) var(--space-4);
    flex-wrap: wrap;
    margin-bottom: var(--space-3);
  }
  .titles {
    min-width: 0;
  }
  h2 {
    font-size: var(--fs-base);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .sub {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .value {
    margin-top: var(--space-1);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-bold);
    letter-spacing: -0.02em;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }
  .end {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-3);
  }
  .plot {
    min-width: 0;
  }
</style>
