export interface CheckboxOption {
    value: string;
    label: string;
    /** Shown as a tooltip and to screen readers. */
    description?: string;
    disabled?: boolean;
}
interface Props {
    label: string;
    options: CheckboxOption[];
    value?: string[];
    columns?: number;
    mono?: boolean;
    selectAllLabel?: string;
    clearLabel?: string;
    countLabel?: (selected: number, total: number) => string;
    onchange?: ((value: string[]) => void) | undefined;
}
declare const CheckboxGroup: import("svelte").Component<Props, {}, "value">;
type CheckboxGroup = ReturnType<typeof CheckboxGroup>;
export default CheckboxGroup;
