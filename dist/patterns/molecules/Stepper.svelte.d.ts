export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';
export interface Step {
    label: string;
    description?: string | undefined;
    /** Overrides the status derived from `current`. */
    status?: StepStatus | undefined;
}
interface Props {
    steps: Step[];
    /** Index of the current step; earlier ones count as complete. */
    current?: number;
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    /** "Step 2 of 4" for screen readers. */
    stepLabel?: (position: number, total: number) => string;
    statusLabels?: Record<StepStatus, string>;
    onselect?: ((index: number) => void) | undefined;
}
declare const Stepper: import("svelte").Component<Props, {}, "">;
type Stepper = ReturnType<typeof Stepper>;
export default Stepper;
