/**
 * The one tone vocabulary every notice, badge, tag and indicator speaks.
 *
 *   neutral — no judgement     accent — the current / chosen thing (follows the tint)
 *   ok      — it worked        warn   — look at this
 *   danger  — failed / destructive     info — for your information
 */
export type Tone = 'neutral' | 'accent' | 'ok' | 'warn' | 'danger' | 'info';

/**
 * Older names some components accepted before the vocabulary was unified.
 * @deprecated Use `danger` instead of `error`, `accent` instead of `brand`.
 */
export type LegacyTone = 'error' | 'brand';

const ALIASES: Readonly<Record<LegacyTone, Tone>> = { error: 'danger', brand: 'accent' };

/** Maps a deprecated alias onto the unified vocabulary; anything else passes through. */
export function toneOf<T extends string>(tone: T | LegacyTone): Exclude<T, LegacyTone> | Tone {
  return (ALIASES as Record<string, Tone>)[tone] ?? (tone as Exclude<T, LegacyTone>);
}

/** A notice announces itself assertively only when something failed. */
export const noticeRole = (tone: string): 'alert' | 'status' =>
  toneOf(tone) === 'danger' ? 'alert' : 'status';
