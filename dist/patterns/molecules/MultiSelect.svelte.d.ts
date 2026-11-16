export interface MultiOption {
    value: string;
    label: string;
    /** Stars drawn in place of the label, for star ratings (the label is still spoken). */
    stars?: number;
}
export interface MultiGroup {
    label?: string;
    options: MultiOption[];
}
interface Props {
    label: string;
    groups: MultiGroup[];
    value: string[];
    /** Summary when nothing is selected, e.g. "All systems". */
    allLabel?: string;
    /** Plural noun for "3 systems". */
    unit?: string;
    clearLabel?: string;
    emptyLabel?: string;
    onchange: (value: string[]) => void;
}
declare const MultiSelect: import("svelte").Component<Props, {}, "">;
type MultiSelect = ReturnType<typeof MultiSelect>;
export default MultiSelect;
