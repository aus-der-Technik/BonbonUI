/**
   * AppHeader organism — the floating header of every admin app: the title pill on the left,
   * frosted actions (picker, user menu, refresh, …) on the right. It is a front-layer element,
   * so it is always sticky (design rule); without `href` the pill scrolls back to top.
   * `fillActions` lets the actions take the room right of the title pill (a list switch beside
   * the title, a toolbar stretching to the right) and aligns the pills at the top when they wrap.
   * The title pill brings its own one-shot sugar-glass sheen on hover (as on the NavBar).
   * When room runs short (a phone, a narrow pane) the title gives way first and ends in "…";
   * the actions drop onto their own line only when they do not fit beside a short title.
   * Page renders one for you from `title` / `actions`; use it directly in your own frames.
   *
   *   <AppHeader title="Orders" subtitle="today">
   *     {#snippet actions()}<RefreshButton />{/snippet}
   *   </AppHeader>
   */
import type { Snippet } from 'svelte';
import type { LensOptions } from '../../utils/lens';
interface Props {
    title: string;
    subtitle?: string | undefined;
    /** Makes the pill a home link instead of "back to top". */
    href?: string | undefined;
    hint?: string | undefined;
    /** A plain click on the title pill (with `href`, e.g. to go home without a reload). */
    onhome?: ((event: MouseEvent) => void) | undefined;
    /** The actions fill the width beside the title pill, starting at its side. */
    fillActions?: boolean;
    actions?: Snippet | undefined;
    /** Refraction of the title pill (see TitlePill); `false` = frosted. */
    lens?: LensOptions | false | undefined;
    /** A mark in the title pill instead of the tint bar (an app icon, a logo). */
    logo?: Snippet | undefined;
}
declare const AppHeader: import("svelte").Component<Props, {}, "">;
type AppHeader = ReturnType<typeof AppHeader>;
export default AppHeader;
