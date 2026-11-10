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
];
/** A candy colour name becomes its token; any other CSS colour passes through unchanged. */
export function candy(color, fallback = 'var(--accent)') {
    if (!color)
        return fallback;
    return CANDY_COLORS.includes(color) ? `var(--color-${color})` : color;
}
export const toDate = (value) => value instanceof Date ? value : new Date(value);
/** Local calendar day as `YYYY-MM-DD` (not UTC, so a late-evening event stays on its day). */
export function dayKey(date) {
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${m}-${d}`;
}
export const sameDay = (a, b) => dayKey(a) === dayKey(b);
export const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
export const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
/** Same day of another month, clamped to that month's length (31 Jan + 1 → 28/29 Feb). */
export function addMonths(date, months) {
    const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
    const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    target.setDate(Math.min(date.getDate(), last));
    return target;
}
const UNITS = [
    ['second', 60],
    ['minute', 60],
    ['hour', 24],
    ['day', 7],
];
/**
 * "just now", "5 minutes ago", "yesterday", "in 3 days" — and a short date beyond a week.
 * `now` is a parameter so stories and tests stay stable.
 */
export function relativeTime(at, now = new Date(), locale = 'en') {
    const date = toDate(at);
    let delta = (date.getTime() - now.getTime()) / 1000;
    if (Math.abs(delta) < 45) {
        return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(0, 'second');
    }
    const format = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    for (const [unit, size] of UNITS) {
        if (Math.abs(delta) < size)
            return format.format(Math.round(delta), unit);
        delta /= size;
    }
    const sameYear = date.getFullYear() === now.getFullYear();
    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        ...(sameYear ? {} : { year: 'numeric' }),
    }).format(date);
}
