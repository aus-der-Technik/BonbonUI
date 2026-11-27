/**
   * Storybook-only: a definition list on the ground — terms in columns, each under a hairline.
   * It replaces a grid of cards: grouping by space and a fine rule, not by boxes. Fill it with
   * StudyItem.
   */
import type { Snippet } from 'svelte';
interface Props {
    /** Narrowest a column may get before the list wraps to fewer columns. */
    min?: string;
    /** Number the items with serif numerals. */
    numbered?: boolean;
    children: Snippet;
}
declare const StudyList: import("svelte").Component<Props, {}, "">;
type StudyList = ReturnType<typeof StudyList>;
export default StudyList;
