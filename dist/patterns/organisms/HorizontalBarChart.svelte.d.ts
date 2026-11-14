export interface BarRow {
    label: string;
    /** Tooltip heading; defaults to `label`. */
    title?: string;
    value: number;
    color?: string;
}
import type { IconName } from '../atoms/icons';
interface Props {
    data: BarRow[];
    height?: number;
    countLabel?: string;
    shareLabel?: string;
    /** Bar colour of rows without their own. */
    color?: string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    /** Caption of the hidden data table; defaults to `countLabel`. */
    label?: string | undefined;
    /** Heading of the label column in the hidden data table. */
    categoryLabel?: string;
    /** Room for the row labels in px; by default as much as the longest label needs. */
    labelWidth?: number | undefined;
    /** Formats the counts at the bar ends, in the tooltip and in the data table. */
    valueFormat?: (value: number) => string;
}
declare const HorizontalBarChart: import("svelte").Component<Props, {}, "">;
type HorizontalBarChart = ReturnType<typeof HorizontalBarChart>;
export default HorizontalBarChart;
