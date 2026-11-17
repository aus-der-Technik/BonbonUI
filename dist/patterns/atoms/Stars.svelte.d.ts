/**
 * Stars atom — a read-only star rating (★★★☆☆) with a spoken "3.5 of 5 stars". The stars round
 * to whole ones; `showValue` adds the exact figure ("4.5/5") for averages, in `locale`.
 */
interface Props {
    value: number;
    max?: number;
    /** Overrides the accessible name; `''` hides the stars when a label is next to them. */
    label?: string | undefined;
    showValue?: boolean;
    /** Locale of the figure (default English, like the rest of the UI). */
    locale?: string;
}
declare const Stars: import("svelte").Component<Props, {}, "">;
type Stars = ReturnType<typeof Stars>;
export default Stars;
