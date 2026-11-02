// Small helpers shared by the collaboration components: dates, relative times, candy colours.

/** The named colours of the candy system palette (`--color-*` tokens). */
export const CANDY_COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'mint',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'purple',
  'pink',
  'brown',
  'gray',
] as const;

export type CandyColor = (typeof CANDY_COLORS)[number];

/** A candy colour name becomes its token; any other CSS colour passes through unchanged. */
export function candy(color: string | undefined, fallback = 'var(--accent)'): string {
  if (!color) return fallback;
  return (CANDY_COLORS as readonly string[]).includes(color) ? `var(--color-${color})` : color;
}

export const toDate = (value: Date | string | number): Date =>
  value instanceof Date ? value : new Date(value);

/** Local calendar day as `YYYY-MM-DD` (not UTC, so a late-evening event stays on its day). */
export function dayKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

export const sameDay = (a: Date, b: Date): boolean => dayKey(a) === dayKey(b);

export const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const addDays = (date: Date, days: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

/** Same day of another month, clamped to that month's length (31 Jan + 1 → 28/29 Feb). */
export function addMonths(date: Date, months: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(date.getDate(), last));
  return target;
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['second', 60],
  ['minute', 60],
  ['hour', 24],
  ['day', 7],
];

/**
 * "just now", "5 minutes ago", "yesterday", "in 3 days" — and a short date beyond a week.
 * `now` is a parameter so stories and tests stay stable.
 */
export function relativeTime(
  at: Date | string | number,
  now: Date = new Date(),
  locale = 'en',
): string {
  const date = toDate(at);
  let delta = (date.getTime() - now.getTime()) / 1000;
  if (Math.abs(delta) < 45) {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(0, 'second');
  }
  const format = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  for (const [unit, size] of UNITS) {
    if (Math.abs(delta) < size) return format.format(Math.round(delta), unit);
    delta /= size;
  }
  const sameYear = date.getFullYear() === now.getFullYear();
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    ...(sameYear ? {} : { year: 'numeric' }),
  }).format(date);
}
