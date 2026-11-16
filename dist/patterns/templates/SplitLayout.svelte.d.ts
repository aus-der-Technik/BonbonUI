/**
   * SplitLayout template — a two-column work area: the `aside` (the question, the form, the
   * settings) stays in view while the results in `children` scroll. Folds to one column below
   * 960px. The sticky aside clears the page's sticky header (`--page-top`, set by Page).
   *
   *   <SplitLayout>{#snippet aside()}<Card>…question…</Card>{/snippet}…results…</SplitLayout>
   */
import type { Snippet } from 'svelte';
import { type Space } from '../layout/space';
interface Props {
    /** Width of the aside column, e.g. "24rem" or "38%". */
    asideWidth?: string;
    /** The aside stays in view while the results scroll. */
    sticky?: boolean;
    /** The aside on the right instead of the left. */
    reverse?: boolean;
    /** Gap between the columns and between the children of each. */
    gap?: Space;
    aside: Snippet;
    children: Snippet;
}
declare const SplitLayout: import("svelte").Component<Props, {}, "">;
type SplitLayout = ReturnType<typeof SplitLayout>;
export default SplitLayout;
