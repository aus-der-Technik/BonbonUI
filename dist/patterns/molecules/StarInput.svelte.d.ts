interface Props {
    value?: number;
    max?: number;
    label?: string;
    /** Accessible name of the star worth `n`, e.g. "3 stars". */
    starLabel?: (n: number) => string;
    onchange?: ((value: number) => void) | undefined;
}
declare const StarInput: import("svelte").Component<Props, {}, "value">;
type StarInput = ReturnType<typeof StarInput>;
export default StarInput;
