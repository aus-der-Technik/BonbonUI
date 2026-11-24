export interface PickerOption {
    value: string;
    title: string;
    meta?: string | undefined;
    /** Small grey pills on the right, e.g. "read-only"; `draft` ones are amber. */
    marks?: {
        label: string;
        tone?: 'neutral' | 'draft';
    }[] | undefined;
}
interface Props {
    options: PickerOption[];
    value?: string | null;
    label: string;
    /** Caps heading at the top of the list, e.g. "Data products". */
    heading?: string | undefined;
    placeholder?: string;
    /** Meta line under the placeholder, e.g. "12 available". */
    placeholderMeta?: string | undefined;
    disabled?: boolean;
    onchange?: ((value: string) => void) | undefined;
}
declare const Picker: import("svelte").Component<Props, {}, "value">;
type Picker = ReturnType<typeof Picker>;
export default Picker;
