/**
 * Light — where it comes from and what it falls on.
 *
 * Emitters are things that are on or chosen: a primary action, the current item of a
 * navigation, a toggle that is on, the lit part of a gauge. They carry `data-emit` (`""` for
 * full light, `"soft"` for a gentle one, `"ok"` / `"danger"` for status light). Reflectors are
 * the surfaces of the layers. Each catches the light of the emitters near it, from their
 * direction, in their colour — differently by layer:
 *
 *   ground — nothing to light: the emitter's own soft halo falls onto it (its shadow).
 *   panel  — a solid tile: a little light pools around an emitter on it, and the side that
 *            faces an emitter nearby brightens. Nothing passes through.
 *   glass  — the front layer and glass over a photo: light scatters inside the pane, so the
 *            tint shines through around the emitter, wider and stronger than on a panel.
 *
 * A surface paints its light with `background: var(--light, none), <its own background>`;
 * this module writes `--light` (radial gradients) on every surface in reach, from emitter
 * positions measured on one frame loop that only runs when something changed: a mutation (a
 * selection, a drop moving, a press), a scroll or a resize. `--light` is registered as not
 * inherited, so a nested surface never shows its parent's light.
 *
 * How much light there is overall is the `--shine` token (Application `shine`, 0 to 1,
 * default 0.6): it scales this light and the glows the tokens paint (`--glow-soft`, the
 * primary action's and a lit key's glow, the selected tile's).
 */
import { surfaceKind, type SurfaceKind } from './surfaces';
/** The light of a page when nothing says otherwise; the models below are written for it. */
export declare const SHINE_DEFAULT = 0.6;
/** A 0…1 knob read from a custom property (`--shine`, `--wiggle`), or `fallback`. */
export declare function knob(el: Element, name: string, fallback: number): number;
interface Model {
    /** Opacity (%) of the light around an emitter on the surface. */
    inside: number;
    /** Opacity (%) at the edge that faces an emitter nearby. */
    beside: number;
    /** Radius of the light, as a multiple of the emitter's size. */
    spread: number;
}
/** Glass scatters light wide; a panel only takes a little of it. */
export declare const LIGHT_MODELS: Record<'glass' | 'panel', Model>;
export type ReflectKind = SurfaceKind;
/** What kind of reflector a surface is (see `surfaces.ts`). Over a photo, panels are glass. */
export declare const reflectKind: typeof surfaceKind;
interface Emitter {
    el: Element;
    x: number;
    y: number;
    size: number;
    strength: number;
    colour: string;
}
/** The light one surface catches, as a CSS value for `--light` (or '' for none). */
export declare function lightFor(surface: Element, rect: DOMRect, emitters: Emitter[], shine?: number): string;
/** Lights every surface inside `root` from its emitters, and keeps it up to date. */
export declare function lightField(root: HTMLElement): () => void;
export {};
