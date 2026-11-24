interface Props {
    amount: number;
    /** ISO 4217 code. */
    currency?: string;
    locale?: string;
    /** The regular price; shown struck through when it is higher than `amount`. */
    compareAt?: number | undefined;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Muted suffix, e.g. "/ month" or "per seat". */
    unit?: string | undefined;
    /** Fraction digits; default the currency's own (2 for EUR). */
    fractionDigits?: number | undefined;
    /** Shown instead of a zero amount, e.g. "Free". */
    freeLabel?: string | undefined;
    /** Read before the struck-through price. */
    compareLabel?: string;
    /** Read before the current price when there is a `compareAt`. */
    currentLabel?: string;
}
declare const Price: import("svelte").Component<Props, {}, "">;
type Price = ReturnType<typeof Price>;
export default Price;
