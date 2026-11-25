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
/** How a glass surface refracts; every value is optional and falls back to `LENS_DEFAULTS`. */
export interface LensOptions {
    /** Off by default: glass is frosted, drawn the same in every engine. `true` / `'auto'` opt in
     *  to refraction (see GlassLens) — native in Chromium, a page mirror elsewhere. */
    refraction?: boolean | 'auto' | undefined;
    /** Magnification inside the glass (1 = none). */
    magnify?: number | undefined;
    /** Width of the rim zone in px, inside which contours tip away. */
    rim?: number | undefined;
    /** Displacement at the outermost edge in px — how thick the glass reads. */
    rimBend?: number | undefined;
    /** Colour fringe at the rim (0 = off). Thick glass splits colours. */
    chroma?: number | undefined;
    /** Frosted blur in px, where no lens is drawn (default: the theme's front-layer blur). */
    blur?: number | undefined;
    /** Saturation in percent; pulls colour up out of the backdrop. */
    saturate?: number | undefined;
}
/** A gentle lens for when refraction is opted into: a slight bend at the rim, no colour
 *  fringe, barely any extra saturation — glass, not an effect. */
export declare const LENS_DEFAULTS: {
    readonly magnify: 1.06;
    readonly rim: 20;
    readonly rimBend: 14;
    readonly chroma: 0;
    readonly saturate: 112;
};
/**
 * A `backdrop-filter` for the frosted fallback when the caller set `blur` or `saturate`;
 * `undefined` keeps the theme's own value.
 */
export declare function frostFilter(options: LensOptions | false | undefined): string | undefined;
export interface LensProfile {
    width: number;
    height: number;
    magnify: number;
    rim: number;
    rimBend: number;
}
export interface LensMaps {
    /** Map for the x axis (red channel) as a data: URL. */
    mapX: string;
    /** Map for the y axis (green channel) as a data: URL. */
    mapY: string;
    /** `scale` for feDisplacementMap, in px. */
    scale: number;
}
/**
 * The two displacement maps and their shared `scale` (feDisplacementMap knows only one), taken
 * from the larger excursion; the other axis is encoded flatter. A narrow bar therefore bends
 * less vertically than horizontally — across 50px of height light has less distance to travel.
 */
export declare function buildLens({ width, height, magnify, rim, rimBend }: LensProfile): LensMaps;
/**
 * A short, stable hash over the lens values. It goes into the filter id, which must change
 * whenever the lens does: WebKit resolves `filter: url(#…)` once, on insertion, and ignores
 * later attribute changes — only a new filter plus a newly inserted layer repaint.
 */
export declare function lensFingerprint(...parts: (string | number)[]): string;
/**
 * Can this engine displace the real backdrop? The displacement is an ordinary `filter` on a layer
 * that itself carries the `backdrop-filter`: Chromium bends the backdrop with it, WebKit and
 * Gecko filter only the layer's own (empty) painting. Nothing of this can be feature-detected —
 * `CSS.supports` only knows the properties exist, and no script can read back what was painted.
 * Where it returns false, GlassLens bends a mirrored copy of the page instead.
 */
export declare function canRefract(): boolean;
