import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
import type { PaletteColor } from '../atoms/palette';
export interface NavItem {
    label: string;
    /** Where it goes. Without one the item is a button that only reports `onnavigate` (a
     *  section switched in place, a place further down the page). */
    href?: string | undefined;
    /** A stable key (default: label and href), also written as `data-nav` on the item. */
    id?: string | undefined;
    /** Drawn on a round disc of the item's colour. */
    icon?: IconName | undefined;
    /** The item's colour (a palette name or any CSS colour; default the tint): its disc, and
     *  the soft fill under it on hover and while it is the current one. */
    color?: PaletteColor | (string & {}) | undefined;
    /** Small count pill, e.g. open items. */
    count?: number | undefined;
    /** What the count means, read out instead of the bare number ("3 new"). */
    countLabel?: string | undefined;
    active?: boolean | undefined;
    /** Faint, still usable: e.g. a section with nothing that matches a filter. */
    dimmed?: boolean | undefined;
    /** An action at the end of a list ("Connect another"): a grey disc and softer words. */
    quiet?: boolean | undefined;
    /** Tooltip, e.g. why something does not answer. */
    title?: string | undefined;
}
export interface NavGroup {
    label?: string | undefined;
    /** A line of small print under the heading. */
    note?: string | undefined;
    items: NavItem[];
    /** Anything after the group's items — a tree, a picker; in the row it joins the items. */
    after?: Snippet | undefined;
}
interface Props {
    groups: NavGroup[];
    label?: string;
    /** `auto`: a sideways row below 900px, except inside a dialog or drawer. */
    orientation?: 'auto' | 'vertical' | 'horizontal';
    /** A click on an item. On a link only a plain click (the main button, no modifier key). */
    onnavigate?: ((item: NavItem, event: MouseEvent) => void) | undefined;
    /** `ground` (default) sits on the backdrop; `panel` is a card. */
    level?: 'ground' | 'panel';
    /** How the current item is marked: `fill` (default, a soft fill of its colour), `frame`
     *  (the selected layer), `tint` (its words in the tint) or `bar` (a tint bar beside it).
     *  All of them flow between items. */
    selection?: 'fill' | 'frame' | 'tint' | 'bar';
    /** What the current item is: the `page` shown (default) or the `location` in view. */
    ariaCurrent?: 'page' | 'location';
    /** Keeps the list in view while the content beside it scrolls (not as a row). */
    sticky?: boolean;
    /** More at the end of an item, before its count (a status dot, a mark). */
    trailing?: Snippet<[NavItem]> | undefined;
    /** Under the list (a meter, a link); not shown in the row. */
    footer?: Snippet | undefined;
}
declare const SideNav: import("svelte").Component<Props, {}, "">;
type SideNav = ReturnType<typeof SideNav>;
export default SideNav;
