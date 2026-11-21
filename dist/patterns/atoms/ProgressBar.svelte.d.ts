import { type Tone } from '../tone';
interface Props {
    value: number;
    max?: number;
    label: string;
    showValue?: boolean;
    tone?: Tone | /** @deprecated Use `accent`. */ 'brand';
    size?: 'sm' | 'md' | 'lg';
    /** Replaces the percentage, e.g. "3 of 7" or "1.2 GB of 5 GB". */
    valueLabel?: string | undefined;
    /** The label is only the bar's accessible name, not printed. */
    hideLabel?: boolean;
}
declare const ProgressBar: import("svelte").Component<Props, {}, "">;
type ProgressBar = ReturnType<typeof ProgressBar>;
export default ProgressBar;
