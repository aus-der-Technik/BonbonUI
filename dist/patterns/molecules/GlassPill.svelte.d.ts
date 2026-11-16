/**
   * GlassPill molecule — clear glass in the title pill's style for the header's other pills
   * (a list switch, a toolbar of filters). Lighter than the title pill and only slightly
   * blurred, so the page shows through; same specular edge and bloom. `wrap` lets the content
   * break onto several lines, rounding the pill into a card. `gap` spaces its children on the
   * layout scale, so a toolbar needs no inner wrapper. Frosted glass; `lens={{ refraction: true }}`
   * opts into a gentle refraction (see GlassLens).
   *
   *   <GlassPill as="search" label="Filters" grow><SearchField … /><Button … /></GlassPill>
   */
import type { Snippet } from 'svelte';
import { type Space } from '../layout/space';
import { type LensOptions } from '../../utils/lens';
interface Props {
    /** `search` for a toolbar of filters (a search landmark), `div` otherwise. */
    as?: 'div' | 'search';
    label?: string | undefined;
    /** Grows to fill the room it has, up to `maxWidth`. */
    grow?: boolean;
    maxWidth?: string | undefined;
    wrap?: boolean;
    /** Space between the children (default a tight 0.45rem). */
    gap?: Space | undefined;
    class?: string;
    /** Refraction of the pill (magnify, rim, rimBend, chroma, blur, saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
    children: Snippet;
}
declare const GlassPill: import("svelte").Component<Props, {}, "">;
type GlassPill = ReturnType<typeof GlassPill>;
export default GlassPill;
