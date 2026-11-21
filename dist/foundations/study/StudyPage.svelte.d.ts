/**
   * Storybook-only: the frame of one study chapter — the handbook page (DocPage) with the
   * chapter's place in the study as its label and the previous / next chapter at the end, so
   * the study reads cover to cover.
   */
import type { Snippet } from 'svelte';
import { type ChapterSlug } from './links';
interface Props {
    slug: ChapterSlug;
    title: string;
    lead?: string | undefined;
    children: Snippet;
}
declare const StudyPage: import("svelte").Component<Props, {}, "">;
type StudyPage = ReturnType<typeof StudyPage>;
export default StudyPage;
