import type { CalendarEvent } from '../molecules/Calendar.svelte';
/** A timed event on one day: minutes from midnight, and its column among the ones it overlaps. */
export interface TimeGridBlock {
    event: CalendarEvent;
    from: number;
    to: number;
    column: number;
    columns: number;
}
/** An all-day or multi-day event as a bar over the days it covers (indexes into `days`). */
export interface TimeGridBar {
    event: CalendarEvent;
    first: number;
    last: number;
    lane: number;
    /** It began before the first day shown / goes on after the last one. */
    before: boolean;
    after: boolean;
}
/** Whether an event belongs in the all-day row: marked so, or running past its first day. */
export declare function isBar(event: CalendarEvent): boolean;
/**
 * Timed events of one day, packed into columns: events that overlap (directly or through a
 * chain) share the width side by side, each in the first column that is free at its start.
 */
export declare function packDay(events: readonly CalendarEvent[], day: Date, defaultMinutes?: number): TimeGridBlock[];
/** All-day and multi-day events as bars over `days`, stacked into lanes that do not collide. */
export declare function layBars(events: readonly CalendarEvent[], days: readonly Date[]): TimeGridBar[];
interface Props {
    /** The days to show, in order: one for a day view, seven for a week. */
    days: Date[];
    events?: CalendarEvent[];
    /** First hour in view; earlier hours are a scroll away. */
    startHour?: number;
    /** Hour at the bottom of the view; later hours are a scroll away. */
    endHour?: number;
    /** Height of one hour in px. */
    hourHeight?: number;
    locale?: string;
    /** The time now, for the today mark and the now line; default: the clock. */
    now?: Date | undefined;
    /** Length of events without an `end`, in minutes. */
    defaultMinutes?: number;
    label?: string;
    allDayLabel?: string;
    /** Accessible name of the now line, e.g. "Now, 10:30". */
    nowLabel?: (time: string) => string;
    onevent?: ((event: CalendarEvent, domEvent: MouseEvent) => void) | undefined;
    /** An empty spot was clicked: its time, on the half hour. */
    onslot?: ((date: Date) => void) | undefined;
    onday?: ((date: Date) => void) | undefined;
}
declare const TimeGrid: import("svelte").Component<Props, {}, "">;
type TimeGrid = ReturnType<typeof TimeGrid>;
export default TimeGrid;
