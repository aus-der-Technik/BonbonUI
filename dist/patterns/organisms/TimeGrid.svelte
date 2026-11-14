<script lang="ts" module>
  import type { CalendarEvent } from '../molecules/Calendar.svelte';

  const DAY = 24 * 60;
  /** The hour lines that carry a label (midnight at the top edge does not). */
  const HOURS = Array.from({ length: 23 }, (_, h) => h);

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

  const time = (value: Date | string) => (value instanceof Date ? value : new Date(value));
  const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  /** Whether an event belongs in the all-day row: marked so, or running past its first day. */
  export function isBar(event: CalendarEvent): boolean {
    if (event.allDay) return true;
    if (!event.end) return false;
    const start = time(event.start);
    const end = time(event.end);
    // An event that ends exactly at midnight still belongs to the day it started on.
    return midnight(new Date(end.getTime() - 1)).getTime() > midnight(start).getTime();
  }

  /**
   * Timed events of one day, packed into columns: events that overlap (directly or through a
   * chain) share the width side by side, each in the first column that is free at its start.
   */
  export function packDay(
    events: readonly CalendarEvent[],
    day: Date,
    defaultMinutes = 60,
  ): TimeGridBlock[] {
    const dayStart = midnight(day).getTime();
    const items = events
      .filter((event) => !isBar(event))
      .map((event) => {
        const start = time(event.start).getTime();
        const end = event.end ? time(event.end).getTime() : start + defaultMinutes * 60_000;
        return {
          event,
          from: Math.round((start - dayStart) / 60_000),
          to: Math.round((Math.max(end, start) - dayStart) / 60_000),
        };
      })
      .filter((b) => b.from < DAY && (b.to > 0 || (b.from === 0 && b.to === 0)))
      .map((b) => ({ ...b, from: Math.max(0, b.from), to: Math.min(DAY, b.to) }))
      .sort((a, b) => a.from - b.from || b.to - a.to);

    const blocks: TimeGridBlock[] = [];
    let cluster: TimeGridBlock[] = [];
    let ends: number[] = [];
    let clusterEnd = -1;
    const flush = () => {
      for (const b of cluster) b.columns = ends.length;
      cluster = [];
      ends = [];
    };
    for (const item of items) {
      // A zero-length event still takes a sliver of time, so it never stacks on its neighbour.
      const to = Math.max(item.to, item.from + 1);
      if (item.from >= clusterEnd) flush();
      let column = ends.findIndex((end) => end <= item.from);
      if (column < 0) column = ends.push(to) - 1;
      else ends[column] = to;
      const block = { ...item, column, columns: 1 };
      cluster.push(block);
      blocks.push(block);
      clusterEnd = Math.max(clusterEnd, to);
    }
    flush();
    return blocks;
  }

  /** All-day and multi-day events as bars over `days`, stacked into lanes that do not collide. */
  export function layBars(events: readonly CalendarEvent[], days: readonly Date[]): TimeGridBar[] {
    const keys = days.map((d) => midnight(d).getTime());
    const firstDay = keys[0];
    const lastDay = keys.at(-1);
    if (firstDay === undefined || lastDay === undefined) return [];
    const bars: Omit<TimeGridBar, 'lane'>[] = [];
    for (const event of events.filter(isBar)) {
      const start = midnight(time(event.start)).getTime();
      const endAt = event.end ? time(event.end) : time(event.start);
      // A timed end at midnight does not reach into that day.
      const end = midnight(
        new Date(endAt.getTime() - (!event.allDay && event.end ? 1 : 0)),
      ).getTime();
      if (end < firstDay || start > lastDay) continue;
      const first = keys.findIndex((k) => k >= start);
      let last = keys.length - 1;
      while (last > 0 && (keys[last] ?? 0) > end) last--;
      if (first < 0 || last < first) continue;
      bars.push({ event, first, last, before: start < firstDay, after: end > lastDay });
    }
    bars.sort((a, b) => a.first - b.first || b.last - b.first - (a.last - a.first));
    const laneEnds: number[] = [];
    return bars.map((bar) => {
      let lane = laneEnds.findIndex((end) => end < bar.first);
      if (lane < 0) lane = laneEnds.push(bar.last) - 1;
      else laneEnds[lane] = bar.last;
      return { ...bar, lane };
    });
  }
</script>

<script lang="ts">
  /**
   * TimeGrid organism — the week or day view of a calendar: one column per day in `days` (pass
   * seven for a week, one for a day), times on the left, the hours from `startHour` to
   * `endHour` in view and the rest of the day a scroll away. Timed events sit at their time;
   * overlapping ones share the column side by side. All-day and multi-day events run as bars in
   * a row on top. The day headers stay on top while the hours scroll, today in the accent; a
   * line marks the time now (from `now`, or the clock, moving every minute). Colours are
   * Calendar's: a candy name (`blue`, `pink`, …) or any CSS colour.
   *
   * A click on an empty spot calls `onslot` with its time (on the half hour), to create an
   * event right there; a day header calls `onday`, an event `onevent`. Events are buttons,
   * named by their title and time.
   *
   *   <TimeGrid days={week} {events} onevent={(e) => open(e)} onslot={(at) => create(at)} />
   */
  import { candy } from '../../utils/collab';

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

  let {
    days,
    events = [],
    startHour = 7,
    endHour = 21,
    hourHeight = 48,
    locale = 'en',
    now,
    defaultMinutes = 60,
    label = 'Schedule',
    allDayLabel = 'All day',
    nowLabel = (t) => `Now, ${t}`,
    onevent,
    onslot,
    onday,
  }: Props = $props();

  let scroller = $state<HTMLDivElement>();
  let headHeight = $state(0);
  let clock = $state(new Date());

  // Without a given `now` the line follows the clock.
  $effect(() => {
    if (now) return;
    const timer = setInterval(() => (clock = new Date()), 60_000);
    return () => clearInterval(timer);
  });
  const current = $derived(now ?? clock);

  const first = $derived(Math.max(0, Math.min(23, Math.floor(startHour))));
  const last = $derived(Math.max(first + 1, Math.min(24, Math.ceil(endHour))));

  // Open on the first hour of the window (again when the window or the scale changes), a little
  // above its line so its label is not cut by the day headers.
  const LEAD = 12;
  const lead = $derived(first > 0 ? LEAD : 0);
  $effect(() => {
    if (scroller) scroller.scrollTop = first * hourHeight - lead;
  });

  const bars = $derived(layBars(events, days));
  const lanes = $derived(bars.reduce((n, b) => Math.max(n, b.lane + 1), 0));
  const columns = $derived(days.map((day) => packDay(events, day, defaultMinutes)));

  const weekday = $derived(new Intl.DateTimeFormat(locale, { weekday: 'short' }));
  const longDay = $derived(
    new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }),
  );
  const hourFormat = $derived(new Intl.DateTimeFormat(locale, { hour: 'numeric' }));
  const timeFormat = $derived(
    new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }),
  );

  const isToday = (day: Date) => midnight(day).getTime() === midnight(current).getTime();
  const nowMinutes = $derived(current.getHours() * 60 + current.getMinutes());
  const at = (day: Date, minutes: number) =>
    new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, minutes);

  function range(block: TimeGridBlock): string {
    const start = time(block.event.start);
    const end = block.event.end
      ? time(block.event.end)
      : new Date(start.getTime() + defaultMinutes * 60_000);
    return timeFormat.formatRange(start, end);
  }

  function barLabel(bar: TimeGridBar): string {
    const start = time(bar.event.start);
    const end = bar.event.end ? time(bar.event.end) : start;
    const span = midnight(start).getTime() === midnight(end).getTime();
    return span
      ? `${bar.event.title}, ${allDayLabel}, ${longDay.format(start)}`
      : `${bar.event.title}, ${longDay.format(start)}–${longDay.format(end)}`;
  }

  function slot(event: MouseEvent, day: Date) {
    if (!onslot || (event.target as Element).closest('.event')) return;
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const minutes = ((event.clientY - box.top) / hourHeight) * 60;
    onslot(at(day, Math.max(0, Math.min(DAY - 30, Math.floor(minutes / 30) * 30))));
  }
</script>

<section
  class="timegrid"
  aria-label={label}
  style:--hour="{hourHeight}px"
  style:--days={Math.max(1, days.length)}
  style:--lanes={lanes}
>
  <div
    class="scroller"
    bind:this={scroller}
    style:max-height="{headHeight + (last - first) * hourHeight + lead + 1}px"
  >
    <div class="head" bind:clientHeight={headHeight}>
      <div class="days">
        <span class="gutter"></span>
        {#each days as day (day.getTime())}
          {@const today = isToday(day)}
          {#if onday}
            <button
              type="button"
              class="day"
              class:today
              aria-current={today ? 'date' : undefined}
              aria-label={longDay.format(day)}
              onclick={() => onday(day)}
            >
              <span class="weekday">{weekday.format(day)}</span>
              <span class="date">{day.getDate()}</span>
            </button>
          {:else}
            <span class="day" class:today aria-current={today ? 'date' : undefined}>
              <span class="weekday">{weekday.format(day)}</span>
              <span class="date">{day.getDate()}</span>
            </span>
          {/if}
        {/each}
      </div>
      {#if bars.length}
        <div class="allday">
          <span class="gutter label">{allDayLabel}</span>
          <div class="bars">
            {#each bars as bar (bar.event.id)}
              <button
                type="button"
                class="bar event"
                class:before={bar.before}
                class:after={bar.after}
                style:--c={candy(bar.event.color)}
                style:grid-column="{bar.first + 1} / {bar.last + 2}"
                style:grid-row={bar.lane + 1}
                aria-label={barLabel(bar)}
                title={bar.event.title}
                onclick={(domEvent) => onevent?.(bar.event, domEvent)}
              >
                <span class="name">{bar.event.title}</span>
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <div class="body">
      <div class="gutter hours" aria-hidden="true">
        {#each HOURS as h (h)}
          <span class="hour" style:top="calc(var(--hour) * {h + 1})"
            >{hourFormat.format(at(new Date(2026, 0, 5), (h + 1) * 60))}</span
          >
        {/each}
      </div>
      {#each days as day, d (day.getTime())}
        <!-- A pointer shortcut: a click on an empty spot starts an event there. The keyboard
             route is the day header (`onday`). -->
        <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
        <div
          class="column"
          class:today={isToday(day)}
          class:creates={!!onslot}
          role="group"
          aria-label={longDay.format(day)}
          onclick={(event) => slot(event, day)}
        >
          {#each columns[d] ?? [] as block (block.event.id)}
            {@const height = ((block.to - block.from) / 60) * hourHeight}
            <button
              type="button"
              class="event"
              class:short={height < 38}
              style:--c={candy(block.event.color)}
              style:top="{(block.from / 60) * hourHeight}px"
              style:height="{Math.max(height, 20)}px"
              style:left="calc({block.column} / {block.columns} * 100%)"
              style:width="calc(100% / {block.columns} - 3px)"
              aria-label="{block.event.title}, {range(block)}"
              onclick={(domEvent) => onevent?.(block.event, domEvent)}
            >
              <span class="name">{block.event.title}</span>
              <span class="time" aria-hidden="true">{range(block)}</span>
            </button>
          {/each}
          {#if isToday(day)}
            <div
              class="now"
              style:top="{(nowMinutes / 60) * hourHeight}px"
              role="img"
              aria-label={nowLabel(timeFormat.format(current))}
            ></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .timegrid {
    --gutter: 3.5rem;
    min-width: 0;
    border-radius: var(--radius-card);
    overflow: clip;
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .scroller {
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  /* The day headers and the all-day row stay on top while the hours scroll under them: the
     tile's own header, as solid as the tile, so no event shows through the day names. */
  .head {
    position: sticky;
    top: 0;
    z-index: 2;
    background: var(--layer-panel-bg);
    /* Over a photo the tile is glass, and so is its header. */
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    border-bottom: 1px solid var(--border-strong);
  }
  .days,
  .allday,
  .body {
    display: grid;
    grid-template-columns: var(--gutter) repeat(var(--days), minmax(0, 1fr));
  }
  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-width: 0;
    padding: var(--space-2) var(--space-1);
    border: 0;
    background: none;
    color: var(--text);
    font: inherit;
  }
  button.day {
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  button.day:hover {
    background: var(--fill-hover);
  }
  button.day:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -2px;
  }
  .weekday {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .date {
    display: grid;
    place-items: center;
    min-width: 1.9rem;
    height: 1.9rem;
    border-radius: 50%;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .day.today .weekday {
    color: var(--accent-ink);
  }
  .day.today .date {
    background: var(--grad-primary);
    color: var(--on-accent);
    box-shadow:
      var(--shadow-primary),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }

  .allday {
    padding-bottom: var(--space-1);
  }
  .label {
    align-self: center;
    padding-right: var(--space-2);
    font-size: var(--fs-2xs);
    color: var(--text-3);
    text-align: right;
  }
  .bars {
    grid-column: 2 / -1;
    display: grid;
    grid-template-columns: repeat(var(--days), minmax(0, 1fr));
    grid-auto-rows: 1.4rem;
    gap: 3px 0;
    min-width: 0;
  }

  .body {
    position: relative;
    height: calc(var(--hour) * 24);
  }
  .hours {
    position: relative;
  }
  .hour {
    position: absolute;
    right: var(--space-2);
    transform: translateY(-50%);
    font-size: var(--fs-2xs);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .column {
    position: relative;
    min-width: 0;
    border-left: 1px solid var(--border-strong);
    background-image: repeating-linear-gradient(
      to bottom,
      var(--border-strong) 0 1px,
      transparent 1px var(--hour)
    );
  }
  .column.creates {
    cursor: cell;
  }
  .column.today {
    background-color: var(--accent-faint);
  }

  .event {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    min-width: 0;
    overflow: hidden;
    padding: 3px 6px;
    border: 0;
    border-radius: var(--radius-sm);
    background: color-mix(in srgb, var(--c) 20%, var(--bg));
    box-shadow: inset 3px 0 0 var(--c);
    color: color-mix(in srgb, var(--c) 55%, var(--text));
    font: inherit;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    line-height: 1.25;
    text-align: left;
    cursor: pointer;
    transition:
      transform var(--motion-quick) var(--ease-jelly),
      background-color var(--motion-quick) var(--ease-out);
  }
  .column .event {
    position: absolute;
    margin-left: 1px;
  }
  .event:hover {
    background: color-mix(in srgb, var(--c) 30%, var(--bg));
    z-index: 1;
  }
  .event:active {
    transform: var(--press-squish);
  }
  .event:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
    z-index: 1;
  }
  /* A short event keeps its title and time on one line. */
  .event.short {
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;
    padding-block: 0;
  }
  .name,
  .time {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .event:not(.short) .name {
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .time {
    flex-shrink: 0;
    font-weight: var(--fw-medium);
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }
  .short .time {
    flex-shrink: 1;
  }
  .bar {
    flex-direction: row;
    align-items: center;
    margin: 0 2px;
    padding-block: 0;
  }
  .bar.before {
    margin-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: none;
  }
  .bar.after {
    margin-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .now {
    position: absolute;
    left: -1px;
    right: 0;
    z-index: 1;
    height: 2px;
    margin-top: -1px;
    background: var(--accent);
    pointer-events: none;
  }
  .now::before {
    content: '';
    position: absolute;
    left: -4px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
  }

  @media (prefers-reduced-motion: reduce) {
    button.day,
    .event {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .timegrid,
    .head {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
</style>
