// German number and date formats, as all admin UIs show them (Europe/Berlin wall clock).
export const numberFormat = new Intl.NumberFormat('de-DE');
export const decimalFormat = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export const percentFormat = new Intl.NumberFormat('de-DE', {
  style: 'percent',
  maximumFractionDigits: 0,
});
export const dateTimeFormat = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/Berlin',
});
/** Day keys (`yyyy-MM-dd`) are already cut in Europe/Berlin; format them as UTC. */
export const dayFormat = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  timeZone: 'UTC',
});
export const longDayFormat = new Intl.DateTimeFormat('de-DE', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export const dayDate = (key: string): Date => new Date(`${key}T00:00:00Z`);

/** Escapes text for the few places that must build HTML strings (Leaflet popups). */
export function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}

export const starLabel = (n: number): string => `${n} ${n === 1 ? 'star' : 'stars'}`;
