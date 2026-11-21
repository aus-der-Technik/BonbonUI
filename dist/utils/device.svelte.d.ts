/**
 * What the screen is like right now, for layouts that change on a phone — and the same facts
 * written onto `<html>` for CSS.
 *
 *   const screen = new Viewport();   screen.phone, screen.touch, screen.keyboard, screen.visible
 *   onMount(() => watchDevice());    --visible-height, --keyboard and data-typing on <html>
 *
 * The on-screen keyboard comes from `visualViewport`: iOS and Android shrink the visual viewport,
 * not the layout one, so `position: fixed; bottom: 0` would sit behind the keys. A bar that rides
 * on the keys uses `bottom: var(--keyboard, 0px)` (or `screen.keyboard` px). BonbonUI's sheets,
 * the Dialog and the BottomBar read these variables and fall back to sensible values without them.
 */
/** A phone: narrow (≤ 720 px). The one breakpoint every phone rule in BonbonUI shares. */
export declare const PHONE_QUERY = "(max-width: 720px)";
/** A finger, not a mouse: no hover, bigger targets. */
export declare const TOUCH_QUERY = "(pointer: coarse)";
/** Pixels of the bottom the on-screen keyboard covers (0 when down or when the page is resized for it). */
export declare function keyboardInset(win?: Window): number;
/** Whether `el` takes typed text (the keyboard comes up for it). */
export declare function takesText(el: Element | null): boolean;
/**
 * Reactive screen facts. Make one where a component lays out differently on a phone; `destroy()`
 * stops listening (a page-long one never needs to).
 */
export declare class Viewport {
    #private;
    /** Narrow (≤ 720 px): one column, sheets instead of side panels. */
    phone: boolean;
    /** A finger (`pointer: coarse`): no hover, 44 px targets. */
    touch: boolean;
    /** Pixels of the bottom the on-screen keyboard covers. */
    keyboard: number;
    /** The height that is really visible (the visual viewport). */
    visible: number;
    constructor();
    /** Stops listening. */
    destroy(): void;
}
/** Settings of `watchDevice`. */
export interface DeviceOptions {
    /** Where the variables and `data-typing` go (default `<html>`). */
    root?: HTMLElement | undefined;
    /**
     * iOS zooms into any field under 16 px when it gets focus; adding `maximum-scale=1` to the
     * viewport meta stops that there (people can still pinch-zoom on iOS). On by default.
     */
    capFocusZoom?: boolean;
}
/**
 * Writes the screen facts onto `root` for CSS and keeps them current; returns the cleanup.
 *
 *   --visible-height  the visible height (smaller while the keyboard is up)
 *   --keyboard        px of the bottom the keyboard covers
 *   data-typing       a text field has focus on a phone: bottom bars step aside, shells take
 *                     `--visible-height`, so a composer sits right above the keys
 */
export declare function watchDevice(options?: DeviceOptions): () => void;
