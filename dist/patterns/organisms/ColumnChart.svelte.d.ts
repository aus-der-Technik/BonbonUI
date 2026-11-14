import type { IconName } from '../atoms/icons';
import type { BarRow } from './HorizontalBarChart.svelte';
interface Props {
    data: BarRow[];
    height?: number;
    /** Name of the values, in the tooltip and the data table. */
    valueLabel?: string;
    /** Shown in the tooltip and the data table while no value is negative. */
    shareLabel?: string;
    /** Bar colour of rows without their own. */
    color?: string;
    /** Colour of negative bars without their own; default: `color`. */
    negativeColor?: string | undefined;
    /** Formats the values in the tooltip and the data table. */
    valueFormat?: (value: number) => string;
    /** Formats the gridline labels; default: `valueFormat`. */
    tickFormat?: ((value: number) => string) | undefined;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** Caption of the hidden data table; defaults to `valueLabel`. */
    label?: string | undefined;
    /** Heading of the label column in the hidden data table. */
    categoryLabel?: string;
}
declare const ColumnChart: import("svelte").Component<Props, {}, "">;
type ColumnChart = ReturnType<typeof ColumnChart>;
export default ColumnChart;
