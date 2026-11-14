import type { Step } from './Stepper.svelte';
export type CheckoutStep = string | Step;
interface Props {
    steps?: CheckoutStep[];
    /** Index of the current step (0-based). */
    current?: number;
    /** Makes finished steps buttons to go back to. */
    onstep?: ((index: number) => void) | undefined;
    label?: string;
}
declare const CheckoutSteps: import("svelte").Component<Props, {}, "">;
type CheckoutSteps = ReturnType<typeof CheckoutSteps>;
export default CheckoutSteps;
