/**
   * StackPanel organism — one panel in a `PanelStack`. `depth` 0 is the first; a deeper one opens beside it (the one
   * below slides left) or, where both do not fit, over it with "‹ {title below}" to go back.
   * Its close button closes itself when in front, the whole stack when beside one in front or
   * covering one (that one has "‹ back").
   * Keyboard focus moves into a panel as it opens and back to what opened it as it leaves.
   */
import type { Snippet } from 'svelte';
interface Props {
    /** Its level in the stack: 0 the first, 1 beside it, … Fixed for the panel's life. */
    depth?: number;
    /** Names the panel (and the back button of the one above it). */
    title: string;
    /** A second line under the title. */
    subtitle?: string | undefined;
    /** Its width as CSS (`30rem` by default; px or rem are used for the first fit before measuring). */
    width?: string;
    /** Closes this panel (its close button in front, Escape, the back button). */
    onclose: () => void;
    /** Replaces the title block (keep an element with `id={titleId}` in it). */
    head?: Snippet<[{
        titleId: string;
    }]> | undefined;
    /** Buttons in the head, before the close button (32 px: `size="sm"`). */
    actions?: Snippet | undefined;
    /** The close button's name in front ("Close"), and beside or under another ("Close all"). */
    closeLabel?: string;
    closeAllLabel?: string;
    /** Fixed at the bottom, below the scrolling body. */
    footer?: Snippet | undefined;
    /** The panel's body. */
    children: Snippet;
}
declare const StackPanel: import("svelte").Component<Props, {}, "">;
type StackPanel = ReturnType<typeof StackPanel>;
export default StackPanel;
