// English number and date formats for every admin UI, on the Europe/Berlin wall clock (where
// the mock services and their day keys live). One locale everywhere, so no screen mixes styles.
export const numberFormat = new Intl.NumberFormat('en');
export const decimalFormat = new Intl.NumberFormat('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
export const percentFormat = new Intl.NumberFormat('en', {
    style: 'percent',
    maximumFractionDigits: 0,
});
export const dateTimeFormat = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
});
export const dateFormat = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeZone: 'Europe/Berlin',
});
/** Day keys (`yyyy-MM-dd`) are already cut in Europe/Berlin; format them as UTC. */
export const dayFormat = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'UTC',
});
export const longDayFormat = new Intl.DateTimeFormat('en', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
});
export const dayDate = (key) => new Date(`${key}T00:00:00Z`);
/** Escapes text for the few places that must build HTML strings (Leaflet popups). */
export function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
export const starLabel = (n) => `${n} ${n === 1 ? 'star' : 'stars'}`;
