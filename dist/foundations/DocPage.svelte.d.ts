/**
   * Storybook-only frame of a handbook page (the Introduction and the Design study): an
   * Application with a calm editorial page — a serif title and lead on the ground, sections
   * divided by hairlines, an "On this page" list that follows the reader on wide screens, and
   * previous / next at the end, so a chapter reads cover to cover.
   */
import type { Snippet } from 'svelte';
import type { PagerStep } from './book';
interface Props {
    eyebrow?: string;
    title: string;
    lead?: string | undefined;
    /** Previous / next at the end; Introduction pages find theirs by their title. */
    pager?: {
        prev?: PagerStep | undefined;
        next?: PagerStep | undefined;
    } | undefined;
    children: Snippet;
}
declare const DocPage: import("svelte").Component<Props, {}, "">;
type DocPage = ReturnType<typeof DocPage>;
export default DocPage;
