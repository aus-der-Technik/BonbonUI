/**
   * Storybook-only: one entry of a StudyList — a small label, the term, its explanation and an
   * optional note (where to see it, what the system took from it).
   */
import type { Snippet } from 'svelte';
interface Props {
    term: string;
    /** Small caps line above the term: a date, a place, a kind. */
    meta?: string | undefined;
    /** Plain explanation; use `children` instead for rich text. */
    text?: string | undefined;
    /** A last line in the tint, e.g. where to see it. */
    note?: string | undefined;
    children?: Snippet | undefined;
}
declare const StudyItem: import("svelte").Component<Props, {}, "">;
type StudyItem = ReturnType<typeof StudyItem>;
export default StudyItem;
