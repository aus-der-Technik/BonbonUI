/** Text fields keep their own long-press (select, paste). */
export declare function isEditable(node: EventTarget | null): boolean;
/** A short squeeze where the finger is, so a held row answers before its panel appears. */
export declare function squeezeOnce(element: Element | null): void;
/** Settings of the `longpress` action. */
export interface LongPressParams {
    /** The finger was held at (`x`, `y`) on `target`; return false when nothing opened (the click then goes through). */
    onpress: (x: number, y: number, target: Element) => boolean | void;
    /** How long to hold, in ms. */
    delay?: number;
    /** Leave long-presses in text fields to the browser (default true). */
    skipEditable?: boolean;
    /** False turns it off; on by default. */
    enabled?: boolean;
}
/** Action: a finger held still for `delay` ms (480 by default) calls `onpress`; touch only. */
export declare function longpress(node: HTMLElement, params: LongPressParams): {
    update(next: LongPressParams): void;
    destroy(): void;
};
/** Settings of the `swipe` action. */
export interface SwipeParams {
    /** The way the finger flung: `left` usually means "next". */
    onswipe: (direction: 'left' | 'right') => void;
    /** Minimum horizontal travel in px. */
    distance?: number;
    /** False turns it off; on by default. */
    enabled?: boolean;
}
/**
 * A horizontal fling: more sideways than up or down, far enough, quick enough. Give the node
 * `touch-action: pan-y` so the browser keeps vertical scrolling and leaves sideways to us.
 */
export declare function swipe(node: HTMLElement, params: SwipeParams): {
    update(next: SwipeParams): void;
    destroy(): void;
};
/**
 * Pull a sheet down by its grip: it follows the finger (resisting upwards), and closes when let
 * go far enough down or with a flick; otherwise it springs back.
 *
 * @param sheet finds the sheet when the pull starts (the grip's panel may be swapped meanwhile).
 * @returns the cleanup.
 */
export declare function dragToClose(handle: HTMLElement, sheet: () => HTMLElement | null, close: () => void): () => void;
