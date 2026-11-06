/**
   * FloatingActions organism — the pill buttons that float over the end of a page for actions on
   * the page as a whole ("Publish", "Save all", a bulk-action bar for the current selection). It
   * is a front-layer element, so it is **sticky**, never fixed: put it last in the page's content
   * and it rides along the bottom edge of the viewport while the content scrolls, then settles at
   * the end of the content. `Page` has a `floating` slot that does the same; use this inside your
   * own layouts or when you need the `bar` look.
   *
   * Not for inserting into one specific list or table: a control sits where its effect happens,
   * so adding a row belongs at the end of that list (EditableGrid's own "+ New row", a list's
   * "Add" row), where the new item will appear.
   *
   *   <FloatingActions>
   *     <Button variant="primary" shape="pill" size="xl" icon="check" label="Publish" />
   *   </FloatingActions>
   */
import type { Snippet } from 'svelte';
interface Props {
    /** Distance from the bottom edge of the viewport while it floats. */
    offset?: string;
    /** Where the buttons sit along the bottom edge. */
    align?: 'start' | 'center' | 'end';
    /** Puts the buttons on one liquid-glass pill (a bulk-action bar) instead of loose pills. */
    bar?: boolean;
    /** Accessible name of the group, e.g. "Row actions". */
    label?: string | undefined;
    children: Snippet;
}
declare const FloatingActions: import("svelte").Component<Props, {}, "">;
type FloatingActions = ReturnType<typeof FloatingActions>;
export default FloatingActions;
