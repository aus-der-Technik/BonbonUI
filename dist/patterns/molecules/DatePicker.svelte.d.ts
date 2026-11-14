interface Props {
    value?: Date | undefined;
    /** Accessible name when there is no visible label pointing at `id`. */
    label?: string | undefined;
    id?: string | undefined;
    placeholder?: string;
    locale?: string;
    /** How the chosen date reads in the field. */
    format?: Intl.DateTimeFormatOptions;
    weekStart?: 0 | 1;
    min?: Date | undefined;
    max?: Date | undefined;
    today?: Date | undefined;
    disabled?: boolean;
    invalid?: boolean;
    /** Shows the × button while a date is set. */
    clearable?: boolean;
    clearLabel?: string;
    size?: 'sm' | 'md' | 'lg';
    onchange?: ((value: Date | undefined) => void) | undefined;
}
declare const DatePicker: import("svelte").Component<Props, {}, "value">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
