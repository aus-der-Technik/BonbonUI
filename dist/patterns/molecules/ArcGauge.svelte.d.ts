interface Props {
    /** Accessible name; also the caption above the arc unless `caption` is false. */
    label: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    /** Printed small after the figure, e.g. "°C" or "%". */
    unit?: string | undefined;
    /** Where it is right now (e.g. the room's air), when that differs from the setting: the
     *  glow follows it, with a small mark at its end, and a line under the figure says it. The
     *  lit ticks always show the setting. */
    current?: number | undefined;
    /** The word before the current value. */
    currentLabel?: string;
    format?: ((value: number) => string) | undefined;
    /** Number of ticks along the arc. */
    ticks?: number;
    /** Opening of the arc in degrees. */
    sweep?: number;
    size?: 'md' | 'lg';
    /** Shows the label above the arc. */
    caption?: boolean;
    /** Minus and plus at the ends of the arc. */
    buttons?: boolean;
    decreaseLabel?: string;
    increaseLabel?: string;
    disabled?: boolean;
    onchange?: ((value: number) => void) | undefined;
}
declare const ArcGauge: import("svelte").Component<Props, {}, "value">;
type ArcGauge = ReturnType<typeof ArcGauge>;
export default ArcGauge;
