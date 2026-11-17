/**
   * Storybook-only: the frame of a live demo — the one place the study keeps a panel, because
   * here something is being worked with. An optional caption under it says what to try.
   */
import type { Snippet } from 'svelte';
import type { Space } from '../../patterns/layout/space';
interface Props {
    /** What to try, in one short sentence. */
    caption?: string | undefined;
    gap?: Space;
    padding?: Space;
    children: Snippet;
}
declare const StudyDemo: import("svelte").Component<Props, {}, "">;
type StudyDemo = ReturnType<typeof StudyDemo>;
export default StudyDemo;
