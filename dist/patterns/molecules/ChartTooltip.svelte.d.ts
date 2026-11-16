export interface TooltipRow {
    label: string;
    value: string;
    color?: string | undefined;
}
export interface TooltipState {
    x: number;
    y: number;
    title: string;
    rows: TooltipRow[];
}
interface Props {
    tooltip: TooltipState | null;
}
declare const ChartTooltip: import("svelte").Component<Props, {}, "">;
type ChartTooltip = ReturnType<typeof ChartTooltip>;
export default ChartTooltip;
