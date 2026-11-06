export interface NavLink {
    label: string;
    href: string;
    /** The page you are on: highlighted and `aria-current="page"`. */
    active?: boolean | undefined;
}
/**
   * NavBar organism — the header of a website or shop: brand on the left, page links in the
   * middle, call-to-action buttons on the right, all on one liquid-glass pill (front layer,
   * sticky). Below 720px of width the links fold into a menu button that opens a sheet under
   * the bar. Like the AppHeader's title pill, the bar catches a one-shot sugar-glass sheen when
   * the pointer arrives. The bar is frosted glass; `lens={{ refraction: true }}` opts into a
   * gentle refraction (see GlassLens). Put it in a
   * Page's `header` snippet.
   *
   *   <NavBar brand="Example Planner" links={[{ label: 'Pricing', href: '/pricing', active: true }]}>
   *     {#snippet actions()}<Button variant="primary" shape="pill" label="Sign up" />{/snippet}
   *   </NavBar>
   */
import type { Snippet } from 'svelte';
import { type LensOptions } from '../../utils/lens';
interface Props {
    /** Brand name, set as a wordmark. */
    brand?: string | undefined;
    /** Brand mark in front of the name (an inline SVG, an Avatar). */
    logo?: Snippet | undefined;
    brandHref?: string;
    links?: NavLink[];
    /** Buttons on the right (sign in, cart); they stay visible on phones. */
    actions?: Snippet | undefined;
    /** Extra content at the bottom of the phone menu sheet. */
    menu?: Snippet | undefined;
    /** Called for link clicks, e.g. to route in a single-page app (call `preventDefault`). */
    onnavigate?: ((link: NavLink, event: MouseEvent) => void) | undefined;
    /** Accessible name of the link list. */
    label?: string;
    menuLabel?: string;
    closeMenuLabel?: string;
    /** Refraction of the bar (magnify, rim, rimBend, chroma, blur, saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
}
declare const NavBar: import("svelte").Component<Props, {}, "">;
type NavBar = ReturnType<typeof NavBar>;
export default NavBar;
