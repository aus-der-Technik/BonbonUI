import { flushSync } from 'svelte';
import { click, key, render } from '../../test/render';
import TimeGrid, { isBar, layBars, packDay } from './TimeGrid.svelte';
import type { CalendarEvent } from '../molecules/Calendar.svelte';

// Monday 2 November 2026 and the six days after it.
const day = (n: number, hour = 0, minute = 0) => new Date(2026, 10, 2 + n, hour, minute);
const week = Array.from({ length: 7 }, (_, i) => day(i));
const ev = (id: string, start: Date, end?: Date, extra: Partial<CalendarEvent> = {}) => ({
  id,
  title: id,
  start,
  ...(end ? { end } : {}),
  ...extra,
});

describe('TimeGrid layout', () => {
  it('tells bars from timed events', () => {
    expect(isBar(ev('a', day(0, 9), day(0, 10)))).toBe(false);
    expect(isBar(ev('b', day(0), undefined, { allDay: true }))).toBe(true);
    expect(isBar(ev('c', day(0, 22), day(1, 1)))).toBe(true);
    // Ending exactly at midnight stays on its day.
    expect(isBar(ev('d', day(0, 22), day(1)))).toBe(false);
    expect(isBar(ev('e', day(0, 9)))).toBe(false);
  });

  it('packs overlapping events into side-by-side columns', () => {
    const blocks = packDay(
      [
        ev('a', day(1, 10), day(1, 11, 30)),
        ev('b', day(1, 10, 30), day(1, 12)),
        ev('c', day(1, 11), day(1, 12)),
        ev('d', day(1, 12), day(1, 13)),
        ev('e', day(1, 14)),
        ev('other day', day(2, 10), day(2, 11)),
        ev('bar', day(1), undefined, { allDay: true }),
        ev('zero', day(1, 16), day(1, 16)),
        ev('late', day(0, 23), day(1, 0, 30)),
      ],
      day(1),
    );
    const by = Object.fromEntries(blocks.map((b) => [b.event.id, b]));
    expect(Object.keys(by).sort()).toEqual(['a', 'b', 'c', 'd', 'e', 'zero']);
    expect([by['a']?.column, by['b']?.column, by['c']?.column]).toEqual([0, 1, 2]);
    expect(by['a']?.columns).toBe(3);
    // d starts when a, b and c have ended: a new cluster with the full width.
    expect([by['d']?.column, by['d']?.columns]).toEqual([0, 1]);
    expect([by['e']?.from, by['e']?.to]).toEqual([14 * 60, 15 * 60]);
    expect(by['zero']?.columns).toBe(1);
    // A free column is reused.
    const reuse = packDay(
      [
        ev('a', day(0, 9), day(0, 12)),
        ev('b', day(0, 9), day(0, 10)),
        ev('c', day(0, 10), day(0, 11)),
      ],
      day(0),
      30,
    );
    expect(reuse.map((b) => [b.event.id, b.column, b.columns])).toEqual([
      ['a', 0, 2],
      ['b', 1, 2],
      ['c', 1, 2],
    ]);
  });

  it('lays bars over the days they cover, in lanes', () => {
    const bars = layBars(
      [
        ev('offsite', day(3), day(4), { allDay: true }),
        ev('hack', day(-2), day(1), { allDay: true }),
        ev('trip', day(5), day(9), { allDay: true }),
        ev('one', day(3), undefined, { allDay: true }),
        ev('night', day(1, 22), day(2, 2)),
        ev('gone', day(-9), day(-8), { allDay: true }),
        ev('timed', day(1, 9), day(1, 10)),
      ],
      week,
    );
    const by = Object.fromEntries(bars.map((b) => [b.event.id, b]));
    expect(Object.keys(by).sort()).toEqual(['hack', 'night', 'offsite', 'one', 'trip']);
    expect(by['hack']).toMatchObject({ first: 0, last: 1, before: true, after: false, lane: 0 });
    expect(by['night']).toMatchObject({ first: 1, last: 2 });
    expect(by['offsite']).toMatchObject({ first: 3, last: 4, lane: 0 });
    expect(by['one']).toMatchObject({ first: 3, last: 3, lane: 1 });
    expect(by['trip']).toMatchObject({ first: 5, last: 6, after: true });
    expect(layBars([ev('x', day(0), undefined, { allDay: true })], [])).toEqual([]);
  });
});

describe('TimeGrid', () => {
  const events: CalendarEvent[] = [
    { id: 'plan', title: 'Planning', start: day(1, 9, 30), end: day(1, 11), color: 'blue' },
    { id: 'std', title: 'Stand-up', start: day(1, 9), end: day(1, 9, 15) },
    { id: 'off', title: 'Offsite', start: day(3), end: day(4), allDay: true, color: '#f0a' },
  ];

  it('draws days, events and the now line', () => {
    const onevent = vi.fn();
    const host = render(TimeGrid, {
      days: week,
      events,
      now: day(1, 10, 15),
      onevent,
      label: 'Team week',
      allDayLabel: 'Whole day',
      nowLabel: (t) => `It is ${t}`,
    });
    expect(host.querySelector('section')?.getAttribute('aria-label')).toBe('Team week');
    const heads = host.querySelectorAll('.days .day');
    expect(heads).toHaveLength(7);
    expect(heads[1]?.getAttribute('aria-current')).toBe('date');
    expect(heads[1]?.textContent).toContain('Tue');
    expect(heads[1]?.tagName).toBe('SPAN');
    expect(host.querySelectorAll('.column.today')).toHaveLength(1);

    const plan = host.querySelector<HTMLButtonElement>('.column .event[aria-label^="Planning"]')!;
    expect(plan.getAttribute('aria-label')).toMatch(/^Planning, 9:30\s?–\s?11:00\sAM$/);
    expect(plan.querySelector('.time')?.textContent).toMatch(/9:30/);
    expect(plan.style.top).toBe(`${9.5 * 48}px`);
    expect(plan.style.height).toBe(`${1.5 * 48}px`);
    expect(plan.style.getPropertyValue('--c')).toBe('var(--color-blue)');
    const standup = host.querySelector<HTMLElement>('.event[aria-label^="Stand-up"]')!;
    expect(standup.classList.contains('short')).toBe(true);
    expect(standup.style.height).toBe('20px');

    const bar = host.querySelector<HTMLElement>('.allday .bar')!;
    expect(host.querySelector('.allday .label')?.textContent).toBe('Whole day');
    expect(bar.style.gridColumn).toBe('4 / 6');
    expect(bar.style.getPropertyValue('--c')).toBe('#f0a');
    expect(bar.getAttribute('aria-label')).toContain('Offsite, Thursday, November 5');

    const now = host.querySelector<HTMLElement>('.now')!;
    expect(now.style.top).toBe(`${(10.25 * 48).toString()}px`);
    expect(now.getAttribute('aria-label')).toMatch(/^It is 10:15\sAM$/);

    click(plan);
    expect(onevent).toHaveBeenCalledWith(events[0], expect.any(MouseEvent));
    click(bar);
    expect(onevent).toHaveBeenLastCalledWith(events[2], expect.any(MouseEvent));
  });

  it('hands the half hour of an empty spot to onslot, and the day to onday', () => {
    const onslot = vi.fn();
    const onday = vi.fn();
    const host = render(TimeGrid, {
      days: [day(0)],
      events,
      now: day(5),
      hourHeight: 40,
      startHour: 0,
      onslot,
      onday,
    });
    expect(host.querySelector('.now')).toBeNull();
    expect(host.querySelector('.allday')).toBeNull();
    expect(host.querySelector('.scroller')?.scrollTop).toBe(0);
    const column = host.querySelector('.column')!;
    column.dispatchEvent(new MouseEvent('click', { bubbles: true, clientY: 14.8 * 40 }));
    flushSync();
    expect(onslot).toHaveBeenCalledWith(day(0, 14, 30));
    column.dispatchEvent(new MouseEvent('click', { bubbles: true, clientY: 99 * 40 }));
    expect(onslot).toHaveBeenLastCalledWith(day(0, 23, 30));

    const head = host.querySelector<HTMLButtonElement>('button.day')!;
    expect(head.getAttribute('aria-label')).toBe('Monday, November 2');
    click(head);
    expect(onday).toHaveBeenCalledWith(day(0));
    key(head, 'Enter');
  });

  it('ignores clicks on events for onslot, and follows the clock without `now`', () => {
    vi.useFakeTimers();
    vi.setSystemTime(day(1, 8));
    const onslot = vi.fn();
    const host = render(TimeGrid, { days: week, events, onslot, startHour: 6, endHour: 8 });
    click(host.querySelector('.column .event'));
    expect(onslot).not.toHaveBeenCalled();
    const now = host.querySelector<HTMLElement>('.now')!;
    expect(now.style.top).toBe(`${8 * 48}px`);
    vi.setSystemTime(day(1, 9));
    vi.advanceTimersByTime(60_000);
    flushSync();
    expect(parseFloat(host.querySelector<HTMLElement>('.now')!.style.top)).toBeCloseTo(
      (9 + 1 / 60) * 48,
    );
    // The view opens on the first hour of the window.
    expect(host.querySelector('.scroller')?.scrollTop).toBe(6 * 48 - 12);
    vi.useRealTimers();
  });
});
