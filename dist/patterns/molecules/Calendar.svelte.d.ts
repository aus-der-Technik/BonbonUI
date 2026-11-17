export interface CalendarEvent {
    id: string;
    title: string;
    start: Date | string;
    /** Last moment of a multi-day event; the pill shows on every day it touches. */
    end?: Date | string | undefined;
    allDay?: boolean;
    /** A candy colour name (`blue`, `pink`, …) or any CSS colour. */
    color?: string | undefined;
}
/** What the `day` snippet receives for each cell. */
export interface CalendarDay {
    date: Date;
    selected: boolean;
    today: boolean;
    /** The day belongs to the month on screen (not a lead-in or trailing day). */
    inMonth: boolean;
    /** The day can be picked (inside `min` / `max`). */
    allowed: boolean;
    /** The day holds the grid's keyboard stop: give your controls `tabindex={focused ? 0 : -1}`. */
    focused: boolean;
}
/**
   * Calendar molecule — a month grid. Events show as candy-coloured pills (dots on narrow
   * screens and in the small size), today is marked in the accent, the chosen day is selected.
   * Arrow keys move by day and week, Page Up / Page Down by month, Home / End to the week's
   * edges; Enter picks. `size="sm"` is the compact picker used by DatePicker.
   *
   * `day` renders your own controls inside every day cell (e.g. an "add to this day" button), in
   * the cell's top-right corner beside the day number, so actions sit on the day they act on.
   * With `dayReveal="hover"` they show only in the hovered, focused or chosen day. The slot is
   * left out where cells are too narrow to hold it beside the number (`size="sm"`, and month
   * grids under 40rem): offer the action elsewhere there, e.g. in the chosen day's agenda.
   *
   *   <Calendar {events} bind:value onselect={(day) => …} onevent={(event) => open(event)} />
   */
import type { Snippet } from 'svelte';
interface Props {
    /** The chosen day. */
    value?: Date | undefined;
    /** Any day of the month on screen (defaults to `value` or today). */
    month?: Date | undefined;
    events?: CalendarEvent[];
    /** The day marked as today (pass one for stable screenshots). */
    today?: Date;
    /** 0 = Sunday, 1 = Monday. */
    weekStart?: 0 | 1;
    locale?: string;
    size?: 'sm' | 'md';
    /** Earliest and latest day that can be picked. */
    min?: Date | undefined;
    max?: Date | undefined;
    /** Pills per day before "+n more". */
    maxEvents?: number;
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
    todayLabel?: string;
    moreLabel?: (count: number) => string;
    eventsLabel?: (count: number) => string;
    /** Buttons at the right of the month heading, e.g. "New event". */
    actions?: Snippet | undefined;
    /** Your own controls in every day cell's top-right corner (`md` size, wide grids). */
    day?: Snippet<[CalendarDay]> | undefined;
    /** `hover` shows the `day` controls only in the hovered, focused or chosen day. */
    dayReveal?: 'always' | 'hover';
    onselect?: ((date: Date) => void) | undefined;
    onevent?: ((event: CalendarEvent) => void) | undefined;
    onmonthchange?: ((month: Date) => void) | undefined;
}
declare const Calendar: import("svelte").Component<Props, {}, "value" | "month">;
type Calendar = ReturnType<typeof Calendar>;
export default Calendar;
