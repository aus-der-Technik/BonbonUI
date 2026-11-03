/**
 * The change of a figure against a previous period, shared by Stat and KpiTile so both read
 * a delta the same way: direction from the sign, tone from which direction is good news.
 */
export type DeltaDirection = 'up' | 'down' | 'flat';
export type GoodWhen = 'up' | 'down' | 'none';
export type DeltaTone = 'good' | 'bad' | 'neutral';

/** Direction of a numeric change, or of a printed one ("+12 %", "−3"). */
export function deltaDirection(delta: number | string | null | undefined): DeltaDirection {
  if (delta == null) return 'flat';
  if (typeof delta === 'number') return delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
  if (/^\s*\+/.test(delta)) return 'up';
  if (/^\s*[-−–]/.test(delta)) return 'down';
  return 'flat';
}

export function deltaTone(direction: DeltaDirection, goodWhen: GoodWhen): DeltaTone {
  if (direction === 'flat' || goodWhen === 'none') return 'neutral';
  return direction === goodWhen ? 'good' : 'bad';
}

/** A relative change in percent, signed: "+12 %", "−3.5 %". */
export function formatDelta(delta: number, locale = 'en'): string {
  return `${new Intl.NumberFormat(locale, {
    signDisplay: 'exceptZero',
    maximumFractionDigits: 1,
  }).format(delta)} %`;
}
