<script lang="ts">
  /**
   * DashboardGrid template — the responsive rows of a dashboard: `kpis` auto-fits tiles of at
   * least `min` (12rem) wide; `charts` is a 2 : 1.4 : 1 row, folding to two columns below
   * 1100px and one below 700px (a `wide` ChartCard then spans the row). For other grids use
   * `Grid` from the layout helpers.
   *
   *   <DashboardGrid><KpiTile … /><KpiTile … /></DashboardGrid>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'kpis' | 'charts';
    label?: string | undefined;
    /** Minimum tile width of the `kpis` row. */
    min?: string;
    children: Snippet;
  }

  let { variant = 'kpis', label, min = '12rem', children }: Props = $props();
</script>

<section class="grid grid--{variant}" aria-label={label} style:--tile-min={min}>
  {@render children()}
</section>

<style>
  .grid {
    display: grid;
    gap: var(--space-4);
    min-width: 0;
  }
  .grid--kpis {
    grid-template-columns: repeat(auto-fit, minmax(min(var(--tile-min), 100%), 1fr));
  }
  .grid--charts {
    grid-template-columns: 2fr 1.4fr 1fr;
  }
  @media (max-width: 1100px) {
    .grid--charts {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 700px) {
    .grid--charts {
      grid-template-columns: 1fr;
    }
  }
</style>
