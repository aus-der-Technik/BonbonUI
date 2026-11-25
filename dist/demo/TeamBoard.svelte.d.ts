/**
   * Example page: a team's kanban board, mock data (Storybook only). A filling Page: the board
   * takes all the room and each column scrolls on its own; new cards are added at the foot of
   * the column they belong to. A card opens in a Drawer with its details, who else is looking at
   * it and its discussion. The week's numbers and the activity sit in the aside on wide screens
   * and in a drawer from the "Activity" button otherwise. TeamWorkspace passes the shared
   * navigation and header actions.
   */
import type { Snippet } from 'svelte';
interface Props {
    /** The shared workspace navigation (left column on wide screens). */
    sidebar?: Snippet | undefined;
    /** Shared header actions: inbox, menu. */
    actions?: Snippet | undefined;
    width?: number;
}
declare const TeamBoard: import("svelte").Component<Props, {}, "">;
type TeamBoard = ReturnType<typeof TeamBoard>;
export default TeamBoard;
