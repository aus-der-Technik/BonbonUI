/**
   * Example page: a team calendar, mock data (Storybook only). A KPI row on the ground layer, the
   * month grid with candy event pills, and the chosen day's agenda in the aside (under the
   * calendar on smaller screens). Events are added on the day they belong to: from the "+" that
   * the Calendar's `day` snippet puts in the day under the pointer (or the chosen day), or from
   * "Add to this day" in the agenda — never from a header button that guesses the day. TeamWorkspace passes the shared
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
declare const TeamCalendar: import("svelte").Component<Props, {}, "">;
type TeamCalendar = ReturnType<typeof TeamCalendar>;
export default TeamCalendar;
