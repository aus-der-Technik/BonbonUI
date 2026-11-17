/**
 * Anchored popups (menus, listboxes, popovers): one placement for all of them.
 *
 * The panel goes into the top layer (popover API) where supported and is positioned `fixed`, so
 * no scrolling or `overflow` ancestor clips it. By default it opens below its trigger and flips
 * above when there is more room there; side placements (`right-start`, `left`…) open beside the
 * trigger and flip to the other side the same way; `center` lays the panel over the trigger,
 * centred on it. It is clamped into the viewport; its height is capped to the room it has; and
 * its transform-origin sits on the edge facing the trigger, level with the trigger's centre, so it
 * visibly grows out of the thing that opened it.
 *
 * Panels can read two custom properties the helper sets: `--anchor-width` (the trigger's width,
 * for "at least as wide as the field") and `--anchor-room` (the height available on its side),
 * and `data-side` says where the panel ended up (`top`, `bottom`, `left`, `right`, `center`).
 */
export type AnchorPlacement = 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'left-start' | 'left' | 'left-end' | 'center';
export type AnchorSide = 'top' | 'bottom' | 'left' | 'right' | 'center';
export interface AnchorBox {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
}
export interface AnchorPosition {
    top: number;
    left: number;
    /** The panel sits on the other side than asked for. */
    flipped: boolean;
    /** Whether the panel ended up above the trigger. */
    above: boolean;
    /** Where the panel ended up relative to the trigger. */
    side: AnchorSide;
    /** CSS transform-origin, on the edge facing the trigger, level with its centre. */
    origin: string;
    /** Height available on the chosen side. */
    room: number;
}
export interface AnchorOptions {
    placement?: AnchorPlacement;
    /** Distance between trigger and panel. */
    gap?: number;
    /** Minimal distance to the viewport edges. */
    margin?: number;
}
/** Pure placement maths: where a panel of `size` goes next to `box` in a `viewport`. */
export declare function computePosition(box: AnchorBox, size: {
    width: number;
    height: number;
}, viewport: {
    width: number;
    height: number;
}, { placement, gap, margin }?: AnchorOptions): AnchorPosition;
/**
 * Positions `panel` at `anchor` now and on every scroll or resize until the returned cleanup
 * runs. Call it from an effect once the panel is rendered.
 */
export declare function anchorTo(panel: HTMLElement, anchor: HTMLElement, options?: AnchorOptions): () => void;
