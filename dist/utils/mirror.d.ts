/**
 * Mirror — a live, inert copy of what lies behind a glass surface.
 *
 * Chromium displaces the real backdrop: an SVG filter on a layer that carries a
 * `backdrop-filter` bends what is behind it. WebKit and Gecko apply SVG filters only to an
 * element's own painting, never to its backdrop. So for them the lens paints the page itself —
 * a copy of `<body>`, pixel-aligned under the surface — and runs the same filter over that.
 *
 * Keeping it cheap and correct:
 *   - Two layers. The still one holds what does not move while the page scrolls — the canvas
 *     and fixed backgrounds below the content (the blurred tint mesh). The moving one holds the
 *     content and gets a compositing layer of its own (GlassLens), so scrolling repaints only
 *     the content: re-running a 70px blur over the mesh in software on every frame is what made
 *     the lens slow in Safari.
 *   - Only boxes near the lens are copied in full; far-away boxes become empty stand-ins of the
 *     same size (`content-visibility: hidden` + `contain-intrinsic-size`), so layout matches.
 *     A stand-in that comes near, or whose original changes size, is filled in on its own.
 *   - Wide blurs are left out of the copy. A blur of 24px or more only softens what is soft
 *     already (a tint mesh, a glow), the lens scatters the picture anyway — and WebKit re-runs
 *     such a blur in software over the whole element on every repaint of the copy. It was what
 *     made scrolling under the glass drop to a few frames a second in Safari.
 *   - Scrolling only moves the copy; attribute, text and child-list changes are patched in place.
 *     Only a resize copies the page again. Form values, scroll offsets, sticky offsets and
 *     running CSS animations are carried over.
 *   - The copy lives in shadow roots, so it is invisible to the page's own queries: a toolbar
 *     looking up its buttons, `getElementById`, label lookups and radio groups all stay with the
 *     originals. The page's stylesheets are shared into every shadow root as one constructed
 *     sheet. The copy is `inert` and `aria-hidden`, and leaves out every lens (no mirrors of
 *     mirrors) and the surface itself (hidden, so it does not show up behind itself).
 */
/** Marks a lens box; mirrors skip it, and mutations inside it are ignored. */
export declare const LENS_ATTR = "data-bb-lens";
/** On the copy of the surface: hidden but still taking its room. */
export declare const HIDE_ATTR = "data-bb-mirror-hide";
/** On copies of sticky elements: positioned by the mirror instead. */
export declare const STICKY_ATTR = "data-bb-mirror-sticky";
/** On the still layer's stand-ins for the ancestors of a lifted background: no box of their own. */
export declare const SHELL_ATTR = "data-bb-mirror-shell";
/** Sets an inline style only when it changes: an unchanged write still invalidates in WebKit. */
/** A `filter` without its wide blurs, or null when it has none to lose. */
export declare function softened(filter: string): string | null;
export declare class Mirror {
    #private;
    /** Holds the moving layer (the content); GlassLens puts it inside the filtered layer. */
    readonly host: HTMLSpanElement;
    /** Holds the still layer (canvas and fixed backgrounds), for a filtered layer below. */
    readonly stillHost: HTMLSpanElement;
    /** The content copy's viewport, inside the moving shadow root. */
    readonly stage: HTMLDivElement;
    /** The still copy's viewport. */
    readonly stillStage: HTMLDivElement;
    constructor(lens: HTMLElement, surface: Element);
    destroy(): void;
    /** Gives the shadow roots the page's current styles. */
    restyle(): void;
    /** Copies the page again (throttled unless `now`). */
    rebuild(now?: boolean): void;
    /** Fills in stand-ins that came near or changed size (throttled). */
    refresh(): void;
    build(): void;
    /** Re-aligns the copy with the page (next frame). */
    schedule(): void;
    sync(): void;
    /** A scroll somewhere in the page. */
    scrolled(target: EventTarget | null, distance: number): void;
    /** A form control changed its value (no mutation reports that). */
    input(target: EventTarget | null): void;
    mutated(records: MutationRecord[]): void;
}
