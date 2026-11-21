/**
 * Storybook-only: a tiny line plot of values sampled frame by frame (an edge of the liquid
 * drop, the press of a squeeze), so a spring's overshoot and ring can be seen, not only felt.
 * Dashed hairlines mark the values the springs are heading for.
 */
interface Series {
    label: string;
    values: readonly number[];
    tone: 'accent' | 'muted';
}
interface Props {
    series: Series[];
    /** Values to mark with a dashed hairline (the targets). */
    marks?: readonly number[];
    min: number;
    max: number;
    /** Accessible description of what is plotted. */
    label: string;
    /** Shown while there is nothing to plot yet. */
    empty?: string;
    height?: number;
}
declare const Trace: import("svelte").Component<Props, {}, "">;
type Trace = ReturnType<typeof Trace>;
export default Trace;
