/**
 * Flow — every layer of the page is a body of thick water, and what lies on it floats.
 *
 * A press is felt only on its own layer; the layers never move each other:
 *
 *   ground — the things lying on the backdrop (text, figures, controls) answer a press on the
 *            ground. Panels and glass stay still.
 *   panel  — the things on the panels answer a press on a panel, across every panel. The panel
 *            tiles themselves, the ground and the glass stay still.
 *   glass  — floats above the page and touches nothing: nothing moves (the glass itself gives,
 *            see `squeeze` in liquid.ts). Overlays and glass over a photo too.
 *
 * Pressing a thing on a layer is like pressing on something that swims: it sinks a few pixels
 * and pushes the water aside, so the things around it dip too and drift a hair away from the
 * press. The wave travels outwards and loses energy with every pixel it goes (`reach`), so the
 * neighbours answer clearly and the far side of the screen barely stirs. Letting go, everything
 * bobs back up on a loose spring that overshoots once or twice. Dragging (a slider, a dial)
 * pulls the water along: the things nearby sway in the direction of the drag, a moment later
 * the further they are, and swing back and forth around their place when the hand stops. The
 * thing in the hand never sways, so a slider stays exactly under the finger. A bigger control
 * moves more water than a small one: a wide key sinks deeper and reaches further than an icon
 * button (`heft`). Every piece has a
 * slightly different weight, so the pieces never move in lockstep.
 *
 * The pieces are the smallest blocks that move as one: a heading, a paragraph, a figure, a
 * button, a field. Containers are opened while they are big or hold another layer, so a panel
 * on the ground stays still while the text beside it moves. Only `translate` is animated, on one
 * frame loop that runs while something moves. Anything marked `data-flow-fixed` (DetailPanel,
 * Toaster…) or `data-flow-off` and anything `position: fixed` stays still. Off under
 * `prefers-reduced-motion`.
 */
export interface FlowOptions {
    /** How deep the thing under a standard-sized control sinks, in px (smaller controls less,
     *  bigger ones more). Default 3. */
    depth?: number;
    /** How quickly the wave loses energy: after this many px a third of it is left, after twice
     *  as many a tenth. Default 200. */
    reach?: number;
    /** How fast the wave travels outwards, in px per ms. Default 1.4. */
    speed?: number;
}
export type PressLayer = 'glass' | 'panel' | 'ground';
type Movable = HTMLElement | SVGSVGElement;
/** Where a press lands: on glass, on a panel (which one), or on the ground. */
export declare function pressLayer(target: Element): {
    layer: PressLayer;
    panel?: HTMLElement;
};
/** The pieces of the ground inside `root`: everything on the backdrop that moves as one. */
export declare function flowBlocks(root: HTMLElement): Movable[];
/** The pieces of one layer inside `root`: what a press on that layer moves. */
export declare function flowPieces(root: HTMLElement, layer: 'ground' | 'panel'): Movable[];
/**
 * How much water a control moves, from its size: about 1 for a standard button, about 0.6 for
 * a small icon button, up to 1.8 for a wide key or a card. Less than proportional, so a big
 * card does not shake the whole page.
 */
export declare function heft(control: Element): number;
/** Makes every press inside `root` move its own layer (see the header). Returns the cleanup. */
export declare function pressField(root: HTMLElement, options?: FlowOptions): () => void;
export {};
