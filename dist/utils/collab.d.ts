/** The named colours of the candy system palette (`--color-*` tokens). */
export declare const CANDY_COLORS: readonly ["red", "orange", "yellow", "green", "mint", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "gray"];
export type CandyColor = (typeof CANDY_COLORS)[number];
/** A candy colour name becomes its token; any other CSS colour passes through unchanged. */
export declare function candy(color: string | undefined, fallback?: string): string;
export declare const toDate: (value: Date | string | number) => Date;
/** Local calendar day as `YYYY-MM-DD` (not UTC, so a late-evening event stays on its day). */
export declare function dayKey(date: Date): string;
export declare const sameDay: (a: Date, b: Date) => boolean;
export declare const startOfDay: (date: Date) => Date;
export declare const addDays: (date: Date, days: number) => Date;
/** Same day of another month, clamped to that month's length (31 Jan + 1 → 28/29 Feb). */
export declare function addMonths(date: Date, months: number): Date;
/**
 * "just now", "5 minutes ago", "yesterday", "in 3 days" — and a short date beyond a week.
 * `now` is a parameter so stories and tests stay stable.
 */
export declare function relativeTime(at: Date | string | number, now?: Date, locale?: string): string;
