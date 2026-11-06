/**
 * Surfaces — which layer an element belongs to, in one place for everything that asks:
 * the light (`light.ts`, what a surface reflects) and the press field (`flow.ts`, what a press
 * moves). Components declare their layer with `data-layer` (Layer, Section), `data-glass`
 * (floating bars and overlays) or `data-reflect` (Card and custom surfaces).
 */
/** Glass: what floats above the page — front layers, overlays, declared glass. */
export declare const GLASS_SELECTOR = "[data-layer=\"front\"], [data-glass], [data-reflect=\"glass\"], dialog, [popover]";
/** Panels: what lies on the page. */
export declare const PANEL_SELECTOR = "[data-layer=\"panel\"], [data-layer=\"selected\"], [data-reflect=\"panel\"]";
/** Every surface that can catch light (glass or panel; the ground has none). */
export declare const SURFACE_SELECTOR = "[data-layer=\"front\"], [data-glass], [data-reflect=\"glass\"], dialog, [popover], [data-layer=\"panel\"], [data-layer=\"selected\"], [data-reflect=\"panel\"]";
export type SurfaceKind = 'glass' | 'panel';
/** Is this surface glass? Floating surfaces are, and so is every panel over a photo. */
export declare function isGlass(el: Element): boolean;
/** What kind of surface an element is; anything that is not glass reflects like a panel. */
export declare function surfaceKind(el: Element): SurfaceKind;
