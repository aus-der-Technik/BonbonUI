/**
 * ChartDataTable — the numbers behind a chart as a table that only assistive tech reads. The
 * charts draw their svg `aria-hidden` and put this next to it, so a screen reader gets every
 * value (with the chart's label as caption) instead of a picture it cannot walk.
 *
 *   <ChartDataTable caption="Votes" columns={['Day', 'Up']} rows={[['Mon', ['14']]]} />
 */
interface Props {
    caption: string;
    /** Header of the label column, then one per value column. */
    columns: string[];
    /** Per row: its label and its formatted values. */
    rows: [label: string, values: string[]][];
}
declare const ChartDataTable: import("svelte").Component<Props, {}, "">;
type ChartDataTable = ReturnType<typeof ChartDataTable>;
export default ChartDataTable;
