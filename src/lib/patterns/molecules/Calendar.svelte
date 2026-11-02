<script lang="ts" module>
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
</script>

<script lang="ts">
  /**
   * Calendar molecule — a month grid. Events show as candy-coloured pills (dots on narrow
   * screens and in the small size), today is marked in the accent, the chosen day is selected.
   * Arrow keys move by day and week, Page Up / Page Down by month, Home / End to the week's
   * edges; Enter picks. `size="sm"` is the compact picker used by DatePicker.
   *
   *   <Calendar {events} bind:value onselect={(day) => …} onevent={(event) => open(event)} />
   */
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import {
    addDays,
    addMonths,
    candy,
    dayKey,
    sameDay,
    startOfDay,
    toDate,
  } from '../../utils/collab';

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
    onselect?: ((date: Date) => void) | undefined;
    onevent?: ((event: CalendarEvent) => void) | undefined;
    onmonthchange?: ((month: Date) => void) | undefined;
  }

  let {
    value = $bindable(),
    month = $bindable(),
    events = [],
    today = new Date(),
    weekStart = 1,
    locale = 'en',
    size = 'md',
    min,
    max,
    maxEvents = 3,
    label = 'Calendar',
    previousLabel = 'Previous month',
    nextLabel = 'Next month',
    todayLabel = 'Today',
    moreLabel = (count) => `+${count} more`,
    eventsLabel = (count) => `${count} ${count === 1 ? 'event' : 'events'}`,
    actions,
    onselect,
    onevent,
    onmonthchange,
  }: Props = $props();

  let grid = $state<HTMLDivElement>();
  let focused = $state<Date | undefined>();

  const shownMonth = $derived(month ?? value ?? today);
  const first = $derived(new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1));
  const heading = $derived(
    new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(first),
  );
  const cursor = $derived(
    focused && sameMonth(focused, first)
      ? focused
      : value && sameMonth(value, first)
        ? value
        : sameMonth(today, first)
          ? today
          : first,
  );

  const weeks = $derived.by(() => {
    const lead = (first.getDay() - weekStart + 7) % 7;
    const start = addDays(first, -lead);
    const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const count = Math.ceil((lead + days) / 7);
    return Array.from({ length: count }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)),
    );
  });

  const weekdays = $derived.by(() => {
    const format = new Intl.DateTimeFormat(locale, { weekday: size === 'sm' ? 'narrow' : 'short' });
    const long = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    // 4 Jan 2026 is a Sunday.
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(2026, 0, 4 + ((i + weekStart) % 7));
      return { short: format.format(day), long: long.format(day) };
    });
  });

  const byDay = $derived.by(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const event of events) {
      const start = startOfDay(toDate(event.start));
      const end = event.end ? startOfDay(toDate(event.end)) : start;
      for (let day = start, n = 0; day <= end && n < 62; day = addDays(day, 1), n++) {
        const key = dayKey(day);
        map[key] = [...(map[key] ?? []), event];
      }
    }
    for (const list of Object.values(map)) {
      list.sort((a, b) => toDate(a.start).getTime() - toDate(b.start).getTime());
    }
    return map;
  });

  const dayFormat = $derived(
    new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  );
  const timeFormat = $derived(
    new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }),
  );

  function sameMonth(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
  }

  function allowed(day: Date) {
    return !(min && day < startOfDay(min)) && !(max && day > startOfDay(max));
  }

  function showMonth(next: Date) {
    month = new Date(next.getFullYear(), next.getMonth(), 1);
    onmonthchange?.(month);
  }

  function pick(day: Date) {
    if (!allowed(day)) return;
    focused = day;
    value = day;
    if (!sameMonth(day, first)) showMonth(day);
    onselect?.(day);
  }

  async function moveFocus(next: Date) {
    focused = next;
    if (!sameMonth(next, first)) showMonth(next);
    await tick();
    grid?.querySelector<HTMLElement>(`[data-day="${dayKey(next)}"]`)?.focus();
  }

  function onkeydown(event: KeyboardEvent) {
    if (!(event.target as HTMLElement).dataset.day) return;
    const at = cursor;
    const offset = (at.getDay() - weekStart + 7) % 7;
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(at, -1),
      ArrowRight: () => addDays(at, 1),
      ArrowUp: () => addDays(at, -7),
      ArrowDown: () => addDays(at, 7),
      Home: () => addDays(at, -offset),
      End: () => addDays(at, 6 - offset),
      PageUp: () => addMonths(at, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(at, event.shiftKey ? 12 : 1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    void moveFocus(move());
  }

  function goToday() {
    focused = today;
    showMonth(today);
  }

  const eventTime = (event: CalendarEvent) =>
    event.allDay ? '' : timeFormat.format(toDate(event.start));
</script>

<div class="calendar calendar--{size}">
  <div class="head">
    <h3 class="month" aria-live="polite">{heading}</h3>
    {#if actions}<div class="actions">{@render actions()}</div>{/if}
    <div class="nav">
      {#if size === 'md'}
        <Button size="sm" variant="glass" shape="pill" label={todayLabel} onclick={goToday} />
      {/if}
      <Button
        size="sm"
        variant="glass"
        shape="pill"
        icon="chevron-left"
        label={previousLabel}
        iconOnly
        onclick={() => showMonth(addMonths(first, -1))}
      />
      <Button
        size="sm"
        variant="glass"
        shape="pill"
        icon="chevron-right"
        label={nextLabel}
        iconOnly
        onclick={() => showMonth(addMonths(first, 1))}
      />
    </div>
  </div>

  <div
    bind:this={grid}
    class="grid"
    role="grid"
    aria-label="{label}, {heading}"
    tabindex="-1"
    {onkeydown}
  >
    <div class="row row--head" role="row">
      {#each weekdays as day (day.long)}
        <span class="weekday" role="columnheader" aria-label={day.long}>{day.short}</span>
      {/each}
    </div>
    {#each weeks as week (dayKey(week[0] ?? first))}
      <div class="row" role="row">
        {#each week as day (dayKey(day))}
          {@const key = dayKey(day)}
          {@const list = byDay[key] ?? []}
          {@const inMonth = sameMonth(day, first)}
          {@const isSelected = !!value && sameDay(day, value)}
          {@const isFocus = sameDay(day, cursor)}
          <div
            class="cell"
            class:outside={!inMonth}
            class:selected={isSelected}
            class:has-events={list.length > 0}
            role="gridcell"
            aria-selected={isSelected}
          >
            <button
              type="button"
              class="day"
              class:today={sameDay(day, today)}
              data-day={key}
              tabindex={isFocus ? 0 : -1}
              data-autofocus={isFocus || undefined}
              disabled={!allowed(day)}
              aria-current={sameDay(day, today) ? 'date' : undefined}
              aria-label="{dayFormat.format(day)}{list.length
                ? `, ${eventsLabel(list.length)}`
                : ''}"
              onclick={() => pick(day)}
            >
              {day.getDate()}
            </button>
            {#if list.length}
              <div class="dots" aria-hidden="true">
                {#each list.slice(0, 3) as event (event.id)}
                  <span class="dot" style:--c={candy(event.color)}></span>
                {/each}
              </div>
              {#if size === 'md'}
                <ul class="events">
                  {#each list.slice(0, maxEvents) as event (event.id)}
                    <li>
                      <button
                        type="button"
                        class="pill"
                        style:--c={candy(event.color)}
                        tabindex={isFocus ? 0 : -1}
                        title={event.title}
                        onclick={() => onevent?.(event)}
                      >
                        {#if eventTime(event)}<span class="time">{eventTime(event)}</span>{/if}
                        <span class="name">{event.title}</span>
                      </button>
                    </li>
                  {/each}
                  {#if list.length > maxEvents}
                    <li class="more">{moreLabel(list.length - maxEvents)}</li>
                  {/if}
                </ul>
              {/if}
            {/if}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .calendar {
    container-type: inline-size;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: var(--space-3);
    min-width: 0;
  }
  .calendar--md {
    width: 100%;
    min-width: 16rem;
  }
  .calendar--sm {
    width: 18.5rem;
    max-width: 100%;
    gap: var(--space-2);
  }
  .head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
  .month {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .calendar--sm .month {
    padding-left: var(--space-2);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
  }
  .actions,
  .nav {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }
  .grid {
    display: grid;
    grid-auto-rows: minmax(6.25rem, 1fr);
    grid-template-rows: auto;
    min-height: 0;
    border-radius: var(--radius-card);
    overflow: hidden;
    outline: none;
  }
  .calendar--md .grid {
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .calendar--sm .grid {
    grid-auto-rows: auto;
    gap: 2px;
  }
  .row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    min-height: 0;
  }
  .calendar--md .row + .row {
    border-top: 1px solid var(--border);
  }
  .weekday {
    padding: var(--space-2) var(--space-2) var(--space-1);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
    text-align: center;
  }
  .calendar--md .weekday {
    text-align: left;
    padding-inline: var(--space-3);
  }

  .cell {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    min-height: 0;
    padding: var(--space-1);
  }
  .calendar--md .cell + .cell {
    border-left: 1px solid var(--border);
  }
  .calendar--md .outside {
    background: var(--fill-subtle);
  }
  .calendar--md .selected {
    background: var(--accent-faint);
  }
  .calendar--sm .cell {
    align-items: center;
    padding: 1px;
  }

  .day {
    display: grid;
    place-items: center;
    width: 1.9rem;
    height: 1.9rem;
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .calendar--sm .day {
    width: 2.35rem;
    height: 2.35rem;
    font-weight: var(--fw-medium);
  }
  .day:hover:not(:disabled) {
    background: var(--fill-hover);
  }
  .day:active:not(:disabled) {
    transform: var(--press-squish);
  }
  .day:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .day:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .outside .day {
    color: var(--text-3);
  }
  .selected .day {
    background: var(--accent-soft);
    color: var(--accent-ink);
    box-shadow: inset 0 0 0 1.5px var(--accent-border);
  }
  .day.today {
    background: var(--grad-primary);
    color: var(--on-accent);
    box-shadow:
      var(--shadow-primary),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
  .selected .day.today {
    box-shadow:
      0 0 0 2px var(--bg),
      0 0 0 4px var(--accent);
  }

  .dots {
    display: none;
    gap: 3px;
    justify-content: center;
    height: 5px;
  }
  .calendar--sm .dots {
    display: flex;
  }
  .calendar--sm .cell:not(.has-events) .day {
    margin-bottom: 8px;
  }
  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--c);
  }

  .events {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 3px;
    min-width: 0;
    overflow: hidden;
  }
  .pill {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    width: 100%;
    min-width: 0;
    height: 1.4rem;
    padding: 0 0.45rem;
    border: 0;
    border-radius: var(--radius-sm);
    background: color-mix(in srgb, var(--c) 18%, transparent);
    box-shadow: inset 3px 0 0 var(--c);
    color: color-mix(in srgb, var(--c) 55%, var(--text));
    font: inherit;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    text-align: left;
    cursor: pointer;
    transition:
      transform var(--motion-quick) var(--ease-jelly),
      background-color var(--motion-quick) var(--ease-out);
  }
  .pill:hover {
    background: color-mix(in srgb, var(--c) 28%, transparent);
  }
  .pill:active {
    transform: var(--press-squish);
  }
  .pill:focus-visible {
    outline: var(--focus-ring);
  }
  .time {
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }
  .name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .more {
    padding: 0 0.45rem;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
  }

  /* Narrow: the month grid keeps its shape, pills become dots. */
  @container (max-width: 40rem) {
    .calendar--md .grid {
      grid-auto-rows: minmax(3.5rem, 1fr);
    }
    .calendar--md .cell {
      align-items: center;
    }
    .calendar--md .events {
      display: none;
    }
    .calendar--md .dots {
      display: flex;
    }
    .calendar--md .weekday {
      text-align: center;
      padding-inline: 0;
    }
    .nav :global(.btn:not(.btn--icon-only)) {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .day,
    .pill {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .calendar--md .grid {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
