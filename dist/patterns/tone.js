const ALIASES = { error: 'danger', brand: 'accent' };
/** Maps a deprecated alias onto the unified vocabulary; anything else passes through. */
export function toneOf(tone) {
    return ALIASES[tone] ?? tone;
}
/** A notice announces itself assertively only when something failed. */
export const noticeRole = (tone) => toneOf(tone) === 'danger' ? 'alert' : 'status';
