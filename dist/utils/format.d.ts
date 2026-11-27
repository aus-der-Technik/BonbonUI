export declare const numberFormat: Intl.NumberFormat;
export declare const decimalFormat: Intl.NumberFormat;
export declare const percentFormat: Intl.NumberFormat;
export declare const dateTimeFormat: Intl.DateTimeFormat;
export declare const dateFormat: Intl.DateTimeFormat;
/** Day keys (`yyyy-MM-dd`) are already cut in Europe/Berlin; format them as UTC. */
export declare const dayFormat: Intl.DateTimeFormat;
export declare const longDayFormat: Intl.DateTimeFormat;
export declare const dayDate: (key: string) => Date;
/** Escapes text for the few places that must build HTML strings (Leaflet popups). */
export declare function escapeHtml(value: unknown): string;
export declare const starLabel: (n: number) => string;
