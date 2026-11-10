interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    /** Accessible name of the value field. */
    label?: string;
    decreaseLabel?: string;
    increaseLabel?: string;
    onchange?: ((value: number) => void) | undefined;
}
declare const QuantityStepper: import("svelte").Component<Props, {}, "value">;
type QuantityStepper = ReturnType<typeof QuantityStepper>;
export default QuantityStepper;
