export interface DonutSlice {
    label: string;
    /** Tooltip heading; defaults to `label`. */
    title?: string;
    /** Zero, negative and non-finite values are left out. */
    value: number;
    /** Any CSS colour or token; default: the next colour of the candy palette. */
    color?: string;
}
/** The candy palette in an order that keeps neighbouring slices apart. */
export declare const donutColors: readonly ["var(--color-blue)", "var(--color-orange)", "var(--color-green)", "var(--color-purple)", "var(--color-pink)", "var(--color-teal)", "var(--color-yellow)", "var(--color-indigo)", "var(--color-red)"];
import type { IconName } from '../atoms/icons';
interface Props {
    data: DonutSlice[];
    /** Largest diameter of the ring in px; it shrinks with a narrower container. */
    size?: number;
    /** Width of the ring as a share of its radius (0.1–0.9). */
    thickness?: number;
    /** Big figure in the hole; default: the formatted total. */
    centerValue?: string | undefined;
    /** Small line under it. */
    centerLabel?: string;
    /** Shows the legend beside (or below) the ring. */
    legend?: boolean;
    /** Name of the values, in the tooltip and the data table. */
    valueLabel?: string;
    shareLabel?: string;
    /** Formats the values in the hole, the tooltip and the data table. */
    valueFormat?: (value: number) => string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** Caption of the hidden data table; defaults to `centerLabel` and the total. */
    label?: string | undefined;
    /** Heading of the label column in the hidden data table. */
    categoryLabel?: string;
}
declare const DonutChart: import("svelte").Component<Props, {}, "">;
type DonutChart = ReturnType<typeof DonutChart>;
export default DonutChart;
