export interface IntroItem {
    term: string;
    /** Plain text; `backticked` parts are set as code. */
    text: string;
    /** Makes the term a link (to another story: `storyHref`). */
    href?: string | undefined;
    /** A quiet note after the term, e.g. a value or a count. */
    meta?: string | undefined;
}
/**
   * Storybook-only: a definition list on the ground — one hairline between rows, the term on
   * the left and its text on the right (stacked on a phone). It replaces a grid of cards for
   * anything that is only text, so the docs practise "most groups sit on the ground".
   */
import type { Snippet } from 'svelte';
interface Props {
    items: readonly IntroItem[];
    /** Numbers the rows 01, 02… */
    numbered?: boolean;
    /** `stacked` sets the text under its term (for narrow columns). */
    layout?: 'side' | 'stacked';
    /** A small live figure at the start of each row. */
    figure?: Snippet<[IntroItem, number]> | undefined;
}
declare const IntroList: import("svelte").Component<Props, {}, "">;
type IntroList = ReturnType<typeof IntroList>;
export default IntroList;
