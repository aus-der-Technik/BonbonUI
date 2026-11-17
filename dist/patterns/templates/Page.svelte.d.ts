/**
   * Page — the frame of one screen. Name the parts, the page places them:
   *
   *   ┌──────────────────────────── header (front, sticky) ───────────────────────────┐
   *   ├──────────────────────────── nav    (front, sticky) ───────────────────────────┤
   *   │ sidebar (sticky) │  children — stacked with one gap           │ aside (sticky) │
   *   │                  │                       floating (front, sticky bottom) ⬤  │
   *   └──────────────────────────────────── footer ───────────────────────────────────┘
   *
   * - `title` / `subtitle` / `actions` give the standard floating header (AppHeader); pass a
   *   `header` snippet for your own (a website nav bar, a menu bar).
   * - Content is an auto layout: children stack `gap` apart and share the same left and right
   *   edges, set by `width`. `fill` makes a viewport-high app shell whose last child takes all
   *   the room (a sheet, a map, a chat, a canvas).
   * - Below 1100px the aside moves under the content; below 900px the sidebar moves on top.
   * - On phones (≤ 520px) a `fill` page lets go of the viewport height and the whole page
   *   scrolls, so a tall sheet is not squeezed under the header and keyboard. Sticky parts
   *   inside the last child (a grid's header row, a chat composer) then stick to the page
   *   instead. `fillOnPhone` keeps the viewport-high shell on phones too: the last child keeps
   *   its own scrolling, and its sticky headers keep sticking.
   * - A Page may set its own backdrop (`background`, `image`, `gradient`); otherwise the
   *   Application's shows through.
   */
import type { Snippet } from 'svelte';
import { type Space } from '../layout/space';
import type { LensOptions } from '../../utils/lens';
interface Props {
    title?: string | undefined;
    subtitle?: string | undefined;
    /** Makes the header's title pill a home link. */
    href?: string | undefined;
    onhome?: ((event: MouseEvent) => void) | undefined;
    /** Buttons and pills on the right of the standard header. */
    actions?: Snippet | undefined;
    /** The header's actions fill the width beside the title pill. */
    fillActions?: boolean;
    /** Refraction of the standard header's title pill (see TitlePill); `false` = frosted. */
    lens?: LensOptions | false | undefined;
    /** A mark in the standard header's title pill instead of the tint bar (an app icon). */
    logo?: Snippet | undefined;
    /** Your own header instead of the standard one (still front layer, still sticky). */
    header?: Snippet | undefined;
    /** A second sticky row under the header: tabs, a segmented control, a toolbar. */
    nav?: Snippet | undefined;
    sidebar?: Snippet | undefined;
    aside?: Snippet | undefined;
    /**
     * Front-layer buttons that float bottom-right (sticky) for page-wide actions: "Publish", a
     * bulk-action bar. Adding to one list belongs at the end of that list, not here.
     */
    floating?: Snippet | undefined;
    /** A line of text (rendered in a `<footer>`), or your own footer — a snippet supplies its own
     *  landmark, e.g. a SiteFooter. */
    footer?: string | Snippet | undefined;
    /** Maximum width of the content (header, body and footer share the same edges). */
    width?: 'narrow' | 'medium' | 'wide' | 'full';
    /** Viewport-high shell: nothing scrolls but the last child. */
    fill?: boolean;
    /** Keeps the `fill` shell on phones (≤ 520px) instead of switching to page scrolling. */
    fillOnPhone?: boolean;
    /** Gap between the children. */
    gap?: Space;
    sidebarWidth?: string;
    asideWidth?: string;
    /** Own backdrop for this page. */
    background?: string | undefined;
    image?: string | undefined;
    gradient?: boolean | undefined;
    animate?: boolean;
    /** Text of the "skip to content" link keyboard users get first. */
    skipLabel?: string;
    children?: Snippet | undefined;
}
declare const Page: import("svelte").Component<Props, {}, "">;
type Page = ReturnType<typeof Page>;
export default Page;
