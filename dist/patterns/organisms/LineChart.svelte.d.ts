export interface LinePoint {
    label: string;
    title?: string;
    /** `null` is a gap in the data, not a zero: the line connects the points around it. */
    value: number | null;
    /** Number of samples behind the value, shown in the tooltip. */
    count?: number;
}
import type { IconName } from '../atoms/icons';
interface Props {
    data: LinePoint[];
    min?: number;
    /** Top of the scale. Default: the data's own maximum, rounded up to a readable value. */
    max?: number | undefined;
    /** Gridline values; default: every integer from min to max when `max` is given, else five
     *  evenly spaced lines. */
    ticks?: number[] | undefined;
    tickFormat?: (value: number) => string;
    valueFormat?: (value: number) => string;
    valueLabel?: string;
    countLabel?: string;
    height?: number;
    /** Colour of the line, its dots and its area. */
    color?: string;
    /** Fills the area under the line with a fading gradient. */
    area?: boolean;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    /** Caption of the hidden data table; defaults to `valueLabel`. */
    label?: string | undefined;
    /** Heading of the label column in the hidden data table. */
    categoryLabel?: string;
    /** A gap (`null`) in the hidden data table. */
    noValueLabel?: string;
}
declare const LineChart: import("svelte").Component<Props, {}, "">;
type LineChart = ReturnType<typeof LineChart>;
export default LineChart;
