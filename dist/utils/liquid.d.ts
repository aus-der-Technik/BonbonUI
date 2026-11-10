/**
 * Liquid — the motion of thick water.
 *
 * `LiquidDrop` moves a selection mark (the pill under the current tab, rail item, nav link)
 * from one box to the next like a drop of syrup: the leading edge runs ahead, the trailing edge
 * lets go late and catches up with a soft wobble, and while it is stretched the drop thins, as
 * a liquid keeps its volume. The surface it moves in (the bar, the rail) bulges along with it
 * and settles. Springs, not curves: a move that is interrupted carries its speed into the next.
 *
 * Everything is a transform or the size of one absolutely positioned leaf, run on one frame
 * loop only while something moves. Under `prefers-reduced-motion` the drop jumps and nothing
 * wobbles.
 */
import { prefersReducedMotion } from './motion';
export interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface LiquidOptions {
    /** Draws the drop each frame (e.g. writes CSS variables for a `::before`). */
    render: (box: Box) => void;
    /** The surface the drop moves in: it bulges perpendicular to the motion and settles. */
    host?: HTMLElement | null | undefined;
    /** How far the host may bulge (fraction of its size). Default 0.035. */
    bulge?: number;
}
/** Whether the user asked for reduced motion (the library's one check, see motion.ts). */
export declare const reducedMotion: typeof prefersReducedMotion;
/** An element's box relative to an ancestor, from offsets: unaffected by running transforms. */
export declare function boxWithin(el: HTMLElement, ancestor: HTMLElement): Box;
export declare class LiquidDrop {
    #private;
    constructor(options: LiquidOptions);
    /**
     * Sends the drop to `box`. `move` (default) flows there with a splash; `follow` adjusts to a
     * box that only changed size or place a little (a resize, a font loading) without one, and
     * keeps any motion in flight; `instant` lands at once. The first placement is always instant.
     */
    moveTo(box: Box, mode?: 'move' | 'follow' | 'instant'): void;
    destroy(): void;
}
export interface SqueezeOptions {
    /** What counts as a press (default: buttons and links inside the host). */
    selector?: string;
    /** How much the surface gives across its long side (fraction). Default 0.03. */
    amount?: number;
    /** Called every frame with the press (0…1, rings a little below 0 on release) and where it
     *  is along the long side, in px — to morph the outline there (see `pillPath`). */
    onFrame?: ((press: number, at: number) => void) | undefined;
}
/**
 * Squeeze — pressing an item squeezes the surface around it a little, like a rubber band
 * pressed with a finger: it narrows across its long side and gives a hair along it, centred on
 * the press, and on release it settles back with a soft ring. Held down, the press slides with
 * the pointer along the band (between the first and the last item), as a finger dragged over
 * it would. A plain transform, so the surface keeps its shadow and glass; nothing is left on it
 * at rest. Returns the cleanup.
 */
export declare function squeeze(host: HTMLElement, options?: SqueezeOptions): () => void;
/**
 * The outline of a pill-shaped bar as an SVG path, with an optional bulge: both long edges
 * swell outwards by `bulge` px around `at` (a smooth bell `reach` px to either side), the way
 * a water-filled band gives where it is pressed. `inset` is the room left on each long side
 * for the bulge to grow into. Vertical bars bulge left and right, horizontal ones up and down.
 */
export declare function pillPath(width: number, height: number, options: {
    inset: number;
    at?: number | undefined;
    bulge?: number | undefined;
    reach?: number | undefined;
    vertical?: boolean | undefined;
}): string;
