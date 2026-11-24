import type { IconName } from '../atoms/icons';
export type MenuEntry = {
    label: string;
    icon?: IconName;
    danger?: boolean;
    disabled?: boolean;
    /** A keyboard hint on the right, e.g. "⌘D" (display only). */
    shortcut?: string;
    onselect: () => void;
} | {
    separator: true;
}
/** A small caps heading over the entries that follow. */
 | {
    heading: string;
};
/** Spread these on your own trigger button (the `trigger` snippet's argument). */
export interface MenuTriggerProps {
    'aria-haspopup': 'menu';
    'aria-expanded': boolean;
    /** Only while the menu is rendered, so it never points at a missing id. */
    'aria-controls': string | undefined;
    onclick: (event: MouseEvent) => void;
}
/**
   * DropdownMenu molecule — a row of actions behind one button (the "⋯" of a table row). ARIA
   * menu: arrows / Home / End move, Enter picks, Escape or an outside click closes and returns
   * focus to the trigger; Tab out of it closes it too. The menu is a frosted glass popover that
   * grows out of its trigger (in the top layer, flipping above when there is no room below);
   * entries can carry an icon and a shortcut hint, `danger` ones are red, `{ heading }` groups
   * them. `trigger` replaces the button (spread its props on yours), `header` and `children` add
   * free content above the entries (children may be `role="menuitem"` elements).
   *
   *   <DropdownMenu items={[{ label: 'Rename', icon: 'edit', onselect: rename }]} />
   */
import type { ComponentProps, Snippet } from 'svelte';
import Button from '../atoms/Button.svelte';
interface Props {
    items: MenuEntry[];
    /** Accessible name of the trigger, also its text unless `iconOnly`. */
    label?: string;
    icon?: IconName;
    iconOnly?: boolean;
    align?: 'start' | 'end';
    size?: 'sm' | 'md';
    /** Look of the trigger button. */
    variant?: ComponentProps<typeof Button>['variant'];
    shape?: 'rounded' | 'pill';
    /** Accessible name of the menu itself; `label` when unset. */
    menuLabel?: string | undefined;
    /** Smallest width of the menu (any CSS length). */
    minWidth?: string;
    /** Your own trigger instead of the button; spread the props onto it. */
    trigger?: Snippet<[MenuTriggerProps]> | undefined;
    /** Non-interactive content at the top of the menu, e.g. who is signed in. */
    header?: Snippet | undefined;
    /** Extra entries before `items`; give them `role="menuitem"`. */
    children?: Snippet | undefined;
}
declare const DropdownMenu: import("svelte").Component<Props, {}, "">;
type DropdownMenu = ReturnType<typeof DropdownMenu>;
export default DropdownMenu;
