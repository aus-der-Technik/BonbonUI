/**
 * Refraction — the view through a solid block of glass.
 *
 * `backdrop-filter: blur()` gives frosted glass: the backdrop goes soft but stays where it was.
 * A block of glass displaces it — the centre reads magnified and close to the rim the image tips
 * away, because that is where the light path bends hardest. An SVG filter reproduces that:
 * `feImage` supplies a map (red = x, green = y, 128 = stay), `feDisplacementMap` moves the
 * backdrop accordingly. This module computes the maps; `GlassLens` wires them up.
 *
 * Every displacement points inwards: `backdrop-filter` only knows the pixels inside the element,
 * so a map reaching outwards would fetch an empty margin.
 */
/** A gentle lens for when refraction is opted into: a slight bend at the rim, no colour
 *  fringe, barely any extra saturation — glass, not an effect. */
export const LENS_DEFAULTS = {
    magnify: 1.06,
    rim: 20,
    rimBend: 14,
    chroma: 0,
    saturate: 112,
};
/** What `--blur-pill` uses, for a frost where only one of blur / saturate is given. */
const FROST_DEFAULTS = { blur: 18, saturate: 118 };
/**
 * A `backdrop-filter` for the frosted fallback when the caller set `blur` or `saturate`;
 * `undefined` keeps the theme's own value.
 */
export function frostFilter(options) {
    if (!options || (options.blur === undefined && options.saturate === undefined))
        return undefined;
    const blur = options.blur ?? FROST_DEFAULTS.blur;
    const saturate = options.saturate ?? FROST_DEFAULTS.saturate;
    return `blur(${blur}px) saturate(${saturate}%)`;
}
/** Maximum excursion of a channel around its neutral 0.5. */
const CHANNEL_RANGE = 0.5;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
/**
 * Displacement at `p` (0…1 across the axis) in px; positive fetches from further right / down.
 * The lens part grows linearly with the distance from the centre; the rim part grows
 * quadratically, so the centre stays calm and the bend only sets in shortly before the edge.
 */
function displacement(p, length, magnify, rimFraction, rimBend) {
    const lens = (0.5 - p) * length * (1 - 1 / magnify);
    let edge = 0;
    if (p < rimFraction)
        edge = rimBend * ((rimFraction - p) / rimFraction) ** 2;
    else if (p > 1 - rimFraction)
        edge = -rimBend * ((p - (1 - rimFraction)) / rimFraction) ** 2;
    return lens + edge;
}
/** Sample points: dense in the two rim zones, coarse in between. */
function samples(rimFraction) {
    const points = new Set([0, 0.5, 1]);
    for (let i = 0; i <= 8; i++) {
        const p = (rimFraction * i) / 8;
        points.add(p);
        points.add(1 - p);
    }
    for (let i = 1; i < 8; i++)
        points.add(rimFraction + (1 - 2 * rimFraction) * (i / 8));
    return [...points].sort((a, b) => a - b);
}
function gradientMap(axis, stops) {
    const direction = axis === 'x' ? 'x1="0" y1="0" x2="1" y2="0"' : 'x1="0" y1="0" x2="0" y2="1"';
    const body = stops
        .map(({ at, value }) => {
        const byte = Math.round(clamp(value, 0, 1) * 255);
        const color = axis === 'x' ? `rgb(${byte},0,0)` : `rgb(0,${byte},0)`;
        return `<stop offset="${+at.toFixed(4)}" stop-color="${color}"/>`;
    })
        .join('');
    // 100 × 100 as the reference size; feImage stretches the map onto the element.
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" ` +
        `viewBox="0 0 100 100" preserveAspectRatio="none">` +
        `<defs><linearGradient id="m" ${direction}>${body}</linearGradient></defs>` +
        `<rect width="100" height="100" fill="url(#m)"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
/**
 * The two displacement maps and their shared `scale` (feDisplacementMap knows only one), taken
 * from the larger excursion; the other axis is encoded flatter. A narrow bar therefore bends
 * less vertically than horizontally — across 50px of height light has less distance to travel.
 */
export function buildLens({ width, height, magnify, rim, rimBend }) {
    // The rim never takes more than a third of an axis, or nothing calm is left in the middle.
    const rimX = clamp(rim / Math.max(width, 1), 0.02, 1 / 3);
    const rimY = clamp(rim / Math.max(height, 1), 0.02, 1 / 3);
    // On a bar 44px high a 45px bend would drag half the image into the rim: at most a sixth.
    const bendX = Math.min(rimBend, width / 6);
    const bendY = Math.min(rimBend, height / 6);
    const stopsX = samples(rimX).map((at) => ({
        at,
        raw: displacement(at, width, magnify, rimX, bendX),
    }));
    const stopsY = samples(rimY).map((at) => ({
        at,
        raw: displacement(at, height, magnify, rimY, bendY),
    }));
    const peak = Math.max(...stopsX.map((s) => Math.abs(s.raw)), ...stopsY.map((s) => Math.abs(s.raw)), 1);
    const scale = peak / CHANNEL_RANGE;
    const encode = (stops) => stops.map(({ at, raw }) => ({ at, value: 0.5 + raw / scale }));
    return { mapX: gradientMap('x', encode(stopsX)), mapY: gradientMap('y', encode(stopsY)), scale };
}
/**
 * A short, stable hash over the lens values. It goes into the filter id, which must change
 * whenever the lens does: WebKit resolves `filter: url(#…)` once, on insertion, and ignores
 * later attribute changes — only a new filter plus a newly inserted layer repaint.
 */
export function lensFingerprint(...parts) {
    const input = parts.join('|');
    let hash = 2166136261;
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
}
/**
 * Can this engine displace the real backdrop? The displacement is an ordinary `filter` on a layer
 * that itself carries the `backdrop-filter`: Chromium bends the backdrop with it, WebKit and
 * Gecko filter only the layer's own (empty) painting. Nothing of this can be feature-detected —
 * `CSS.supports` only knows the properties exist, and no script can read back what was painted.
 * Where it returns false, GlassLens bends a mirrored copy of the page instead.
 */
export function canRefract() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined')
        return false;
    const backdrop = CSS.supports?.('backdrop-filter', 'blur(1px)') ||
        CSS.supports?.('-webkit-backdrop-filter', 'blur(1px)');
    return !!backdrop && /Chrome\/\d+/.test(navigator.userAgent);
}
