import type { IconName } from '../atoms/icons';
export interface NavItem {
    label: string;
    href: string;
    icon?: IconName;
    /** Small count pill, e.g. open items. */
    count?: number;
    active?: boolean;
}
export interface NavGroup {
    label?: string;
    items: NavItem[];
}
interface Props {
    groups: NavGroup[];
    label?: string;
    /** `auto`: a strip below 900px, except inside a dialog or drawer. */
    orientation?: 'auto' | 'vertical' | 'horizontal';
    onnavigate?: ((item: NavItem, event: MouseEvent) => void) | undefined;
    /** `ground` (default) sits on the backdrop; `panel` is a card. */
    level?: 'ground' | 'panel';
    /** How the active item is marked: `frame` (default, the selected layer), `tint` (its text
     *  and icon in the tint) or `bar` (a tint bar beside it). All three flow between items. */
    selection?: 'frame' | 'tint' | 'bar';
}
declare const SideNav: import("svelte").Component<Props, {}, "">;
type SideNav = ReturnType<typeof SideNav>;
export default SideNav;
