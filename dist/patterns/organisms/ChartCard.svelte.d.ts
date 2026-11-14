/**
   * ChartCard organism — a chart with its heading, on the ground by default (`level="panel"`
   * for a card): a chart heading, a sub line, an optional headline
   * figure (`value`), a legend and `actions` (a range switch, a menu). The chart itself is
   * `children`. Mark it `wide` to span a full row in a dashboard grid.
   *
   *   <ChartCard title="Orders per day" sub="Last 30 days" value="1,284"><LineChart … /></ChartCard>
   */
import type { Snippet } from 'svelte';
import { type LegendItem } from '../molecules/Legend.svelte';
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
declare const ChartCard: import("svelte").Component<Props, {}, "">;
type ChartCard = ReturnType<typeof ChartCard>;
export default ChartCard;
