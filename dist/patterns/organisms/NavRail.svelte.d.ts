/**
   * NavRail — the slim main navigation of a device or tool screen: round buttons on a column of
   * liquid glass (front layer, so it is sticky). Each item is an icon with its name in a tooltip
   * beside it; the current one is filled with the accent. `top` holds an identity circle (a
   * logo), `bottom` the person (an Avatar). Below 900px a vertical rail lies down into a horizontal
   * bar. Put it in its own sticky column rather than Page's `sidebar`, whose scroll box would
   * clip the tooltips beside it. Items with `href` are links, the
   * others buttons that call `onselect`.
   *
   *   <NavRail items={sections} bind:current onselect={go}>
   *     {#snippet bottom()}<Avatar name="Ada Example" size={36} />{/snippet}
   *   </NavRail>
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
export interface NavRailItem {
    id: string;
    label: string;
    icon: IconName;
    href?: string | undefined;
}
interface Props {
    items: NavRailItem[];
    /** The id of the current item. */
    current?: string | undefined;
    onselect?: ((id: string) => void) | undefined;
    /** Accessible name of the navigation landmark. */
    label?: string;
    orientation?: 'vertical' | 'horizontal';
    top?: Snippet | undefined;
    bottom?: Snippet | undefined;
}
declare const NavRail: import("svelte").Component<Props, {}, "current">;
type NavRail = ReturnType<typeof NavRail>;
export default NavRail;
