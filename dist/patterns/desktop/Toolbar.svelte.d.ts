import type { IconName } from '../atoms/icons';
export interface ToolbarButton {
    id?: string | undefined;
    icon: IconName;
    /** Accessible name and tooltip; visible too with `showLabel`. */
    label: string;
    showLabel?: boolean | undefined;
    /** Pressed look (a toggled view option). */
    active?: boolean | undefined;
    /** Never folds into More when the toolbar runs out of room (the main action). */
    primary?: boolean | undefined;
    disabled?: boolean | undefined;
    onclick?: (() => void) | undefined;
}
export type ToolbarEntry = ToolbarButton | {
    separator: true;
} | {
    spacer: true;
};
/**
   * Toolbar — the toolbar of a desktop app: a title, groups of icon buttons, separators, a
   * flexible spacer and an optional search field. `floating` (default) is a liquid-glass pill
   * that sticks to the top; `bar` a full-width sticky bar; `plain` has no surface, for a
   * Window's title bar. Left / Right move between the buttons (one tab stop).
   *
   * When the room runs out (a narrow window, a phone), buttons fold into a labelled **More**
   * button from the end, the search field and `primary` buttons last of all: the main action
   * and the search stay in sight, the rest is one click away in a menu under More, which shows
   * how many it holds.
   *
   *   <Toolbar title="Inbox" items={[{ icon: 'edit', label: 'Compose', onclick: compose },
   *     { separator: true }, { icon: 'trash', label: 'Delete' }, { spacer: true }]}
   *     bind:search />
   */
import { type Snippet } from 'svelte';
import { type LensOptions } from '../../utils/lens';
interface Props {
    title?: string | undefined;
    subtitle?: string | undefined;
    items?: ToolbarEntry[];
    /** Shows a search field when defined; bind it. */
    search?: string | undefined;
    searchLabel?: string;
    searchPlaceholder?: string;
    variant?: 'floating' | 'bar' | 'plain';
    /** Accessible name. */
    label?: string;
    /** Before the title (e.g. a sidebar toggle or back button). */
    leading?: Snippet | undefined;
    /** After the buttons, before the search. */
    children?: Snippet | undefined;
    /** At the very end. */
    trailing?: Snippet | undefined;
    /** Fold buttons that do not fit into a More menu (default); `false` scrolls instead. */
    collapse?: boolean;
    /** Name and tooltip of the More button. */
    moreLabel?: string;
    /** Refraction of the floating and bar variants (magnify, rim, rimBend, chroma, blur,
        saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
}
declare const Toolbar: import("svelte").Component<Props, {}, "search">;
type Toolbar = ReturnType<typeof Toolbar>;
export default Toolbar;
