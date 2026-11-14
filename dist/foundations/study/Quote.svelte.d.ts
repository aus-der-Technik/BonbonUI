/**
 * Storybook-only: a short quote from the design literature, set as a pull quote on the
 * ground — serif, a fine tint rule before it, the source underneath. No box: a quote anchors
 * an idea, it is not a thing to act on.
 */
interface Props {
    /** The quoted words — keep them short; the study explains, the quote anchors. */
    text: string;
    author: string;
    /** Book, essay or guideline, with year. */
    source?: string;
}
declare const Quote: import("svelte").Component<Props, {}, "">;
type Quote = ReturnType<typeof Quote>;
export default Quote;
