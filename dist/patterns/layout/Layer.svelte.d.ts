/**
   * Layer — one of the four depth layers every surface belongs to, and an auto layout at once:
   *
   * | level      | looks like                                   | use for                          |
   * | ---------- | -------------------------------------------- | -------------------------------- |
   * | `ground`   | nothing — sits directly on the backdrop      | headings, KPI rows, hero text    |
   * | `panel`    | a solid tile (glass only over a photo)       | tables, forms, results           |
   * | `selected` | the tile washed in tint, a tint rim and glow | the chosen plan, the open item   |
   * | `front`    | frosted glass, floating, **always sticky**   | toolbars, bulk-action bars, docks|
   *
   * Front layers stick to the top (below the page header) or, with `edge="bottom"`, to the
   * bottom of the viewport. That is a design rule, so there is no prop to turn it off.
   *
   *   <Layer level="panel" gap="md">…</Layer>
   *   <Layer level="front" direction="horizontal">…filters…</Layer>
   *
   * Front layers are frosted glass; `lens={{ refraction: true }}` opts into refraction (see
   * GlassLens).
   */
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { type LensOptions } from '../../utils/lens';
import { type Align, type Breakpoint, type Justify, type LayerLevel, type LayoutTag, type Space } from './space';
interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    /** With `as="form"`: skip the browser's own validation bubbles. */
    novalidate?: boolean | undefined;
    level?: LayerLevel;
    as?: LayoutTag;
    /** Inner padding (default: none on ground, md on panels, sm on front). */
    padding?: Space | undefined;
    /** Corner shape; front layers default to a pill, the others to the card radius. */
    shape?: 'card' | 'pill' | 'rounded' | 'square' | undefined;
    /** Front only: which viewport edge it sticks to. */
    edge?: 'top' | 'bottom';
    direction?: 'vertical' | 'horizontal';
    gap?: Space;
    align?: Align | undefined;
    justify?: Justify | undefined;
    wrap?: boolean;
    collapse?: Breakpoint | undefined;
    grow?: boolean;
    class?: string;
    /** Front only: glass options (blur, saturate; with `refraction: true` also magnify, rim,
     *  rimBend, chroma); `false` = plain frost. */
    lens?: LensOptions | false | undefined;
    children?: Snippet | undefined;
}
declare const Layer: import("svelte").Component<Props, {}, "">;
type Layer = ReturnType<typeof Layer>;
export default Layer;
