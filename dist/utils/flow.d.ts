/**
 * Flow — the page as one body of thick water.
 *
 * What a press moves depends on what was pressed on, because the layers touch the page
 * differently:
 *
 *   glass  — floats above the page and does not touch it: the page stays still (the glass
 *            itself gives, see `squeeze` in liquid.ts). Overlays and glass over a photo too.
 *   panel  — lies on the page: the pressed panel sinks, and the panels beside it give a little,
 *            less the further away they are. The rest of the page stays still.
 *   ground — is the page: everything on it ripples outwards from the press, except the glass
 *            floating above it.
 *
 * Pressing a control sinks the page a little: the block under the finger most (a few pixels),
 * its neighbours less, and the dip travels outwards like a wave. Letting go, everything rises
 * back on a soft spring that overshoots a hair, so the page answers every press — gently, and
 * all of it together. The pressed control keeps its own squish (Button, IconButton…).
 *
 * The blocks are the children of each `<main>` (and anything marked `data-flow`); a block
 * taller than most of the screen is split into its own children, so a big app shell still
 * ripples. Only `translate` is animated, on one frame loop that runs while something moves.
 * Blocks holding a `position: fixed` element marked `data-flow-fixed` (DetailPanel, Toaster…)
 * stay still: a transform would make them jump. Off under `prefers-reduced-motion`.
 */
export interface FlowOptions {
    /** How deep the block under the press sinks, in px. Default 3. */
    depth?: number;
    /** How far the dip reaches: at this distance it is about a third as deep. Default 360. */
    reach?: number;
    /** How fast the dip travels outwards, in px per ms. Default 1.4. */
    speed?: number;
}
export type PressLayer = 'glass' | 'panel' | 'ground';
/** Where a press lands: on glass, on a panel (which one), or on the ground. */
export declare function pressLayer(target: Element): {
    layer: PressLayer;
    panel?: HTMLElement;
};
/** Finds the blocks of the page inside `root`: what moves as one piece. */
export declare function flowBlocks(root: HTMLElement): HTMLElement[];
/** Makes every press inside `root` move what it touches (see the header). Returns the cleanup. */
export declare function pressField(root: HTMLElement, options?: FlowOptions): () => void;
