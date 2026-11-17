export interface DivergingPoint {
    /** Short axis label, e.g. "14.10." */
    label: string;
    /** Tooltip heading; defaults to `label`. */
    title?: string;
    up: number;
    down: number;
}
import type { IconName } from '../atoms/icons';
interface Props {
    data: DivergingPoint[];
    height?: number;
    upLabel?: string;
    downLabel?: string;
    shareLabel?: string;
    upColor?: string;
    downColor?: string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    /** Caption of the hidden data table; defaults to the up and down totals. */
    label?: string | undefined;
    /** Heading of the label column in the hidden data table. */
    categoryLabel?: string;
}
declare const DivergingBarChart: import("svelte").Component<Props, {}, "">;
type DivergingBarChart = ReturnType<typeof DivergingBarChart>;
export default DivergingBarChart;
