/**
 * Slider atom — a candy range input: an accent-filled track and a white bead knob with an
 * accent core, with the current value next to the label. `format` shapes the readout; `hint` is a grey help line.
 *
 *   <Slider label="Volume" bind:value={volume} format={(v) => `${v} %`} />
 */
interface Props {
    label: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    hint?: string | undefined;
    disabled?: boolean;
    format?: (value: number) => string;
    onchange?: ((value: number) => void) | undefined;
    /** The label is only the input's accessible name, not printed. */
    hideLabel?: boolean;
    /** Prints the current value next to the label (default on). */
    showValue?: boolean;
}
declare const Slider: import("svelte").Component<Props, {}, "value">;
type Slider = ReturnType<typeof Slider>;
export default Slider;
