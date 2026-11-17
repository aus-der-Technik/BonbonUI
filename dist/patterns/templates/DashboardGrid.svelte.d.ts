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
declare const DashboardGrid: import("svelte").Component<Props, {}, "">;
type DashboardGrid = ReturnType<typeof DashboardGrid>;
export default DashboardGrid;
