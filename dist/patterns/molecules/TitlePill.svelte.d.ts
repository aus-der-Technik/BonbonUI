/**
   * TitlePill molecule — the liquid glass pill with a glowing accent bar and "App — what it
   * does", which opens an app's header. `logo` replaces the bar (an app icon, a mark). A link with
   * `href`, a button with `onclick` (e.g. back to top), plain otherwise; links and buttons catch a
   * sugar-glass sheen on hover and squish when pressed. Frosted glass; `lens={{ refraction: true }}`
   * opts into a gentle refraction (see GlassLens).
   *
   *   <TitlePill title="Inventory" subtitle="stock across all stores" href="/" />
   */
import type { Snippet } from 'svelte';
import { type LensOptions } from '../../utils/lens';
interface Props {
    title: string;
    subtitle?: string | undefined;
    href?: string | undefined;
    /** With `href`: runs on a plain left click (modified clicks still follow the link). */
    onclick?: ((event: MouseEvent) => void) | undefined;
    /** Tooltip, e.g. "Back to top" or "All data products". */
    hint?: string | undefined;
    /** In place of the accent bar, e.g. an app icon. */
    logo?: Snippet | undefined;
    /** Refraction of the pill (magnify, rim, rimBend, chroma, blur, saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
}
declare const TitlePill: import("svelte").Component<Props, {}, "">;
type TitlePill = ReturnType<typeof TitlePill>;
export default TitlePill;
