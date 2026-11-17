/**
   * Sheet organism — a full-height working card: a head with title, description and
   * tools (badges, toggles, filter), an optional loading bar and error, the body (a grid, a
   * chooser, a sign-in card…) filling the rest, and a footer line for counts and key hints.
   * Put it last in a `fill` Page and it takes all the room below the header. Its frosted glass
   * is painted by a layer behind the content, so fixed-position children (popovers, menus,
   * pickers in the tools) are positioned against the window, not trapped in the card.
   *
   *   <Sheet title="Products" about="Edit the catalogue in place." {tools} {footer}>
   *     <EditableGrid … />
   *   </Sheet>
   */
import type { Snippet } from 'svelte';
interface Props {
    title: string;
    about?: string | undefined;
    loading?: boolean;
    error?: string | undefined;
    tools?: Snippet | undefined;
    footer?: Snippet | undefined;
    children: Snippet;
}
declare const Sheet: import("svelte").Component<Props, {}, "">;
type Sheet = ReturnType<typeof Sheet>;
export default Sheet;
