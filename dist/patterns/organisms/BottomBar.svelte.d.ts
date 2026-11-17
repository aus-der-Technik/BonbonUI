import type { IconName } from '../atoms/icons';
import type { PaletteColor } from '../atoms/palette';
/** One place in the bar (and in its "More" sheet). */
export interface BottomBarItem {
    id: string;
    label: string;
    /** A link; without it the item is a button calling `onclick`. */
    href?: string | undefined;
    onclick?: (() => void) | undefined;
    icon: IconName;
    /** With a colour the glyph is an app icon in it (and its badge and selection wash take it);
     *  without one a plain glyph. */
    color?: PaletteColor | 'accent' | (string & {}) | undefined;
    /** Unread or waiting things: a figure on the glyph (99+ caps). */
    badge?: number | undefined;
}
/**
   * BottomBar organism — the navigation of a phone, along the bottom edge where the thumb is.
   * A few fixed places (`items`: home, search, the places used most), close together and
   * centred, each with its badge, and at the end "More": a bottom sheet with every place
   * (`more`) in a grid — with a dot on "More" while something waits in a place the bar does not
   * show. It sits above the home indicator (safe area), steps aside while someone types
   * (`data-typing`, see `watchDevice`) and sticks to the bottom of its scroller.
   *
   *   <BottomBar items={[home, search, ...recent]} more={everything} current={here} />
   *
   * Phones only by default (≤ 720 px); `phoneOnly={false}` shows it everywhere. Five or six
   * places fit a 375 px phone with "More". Which places come first is yours (most recent, most
   * used); keep the order steady while someone moves between the places it shows.
   */
import type { Snippet } from 'svelte';
interface Props {
    /** The places in the bar, in order. */
    items: BottomBarItem[];
    /** Every place, for the "More" sheet; no "More" without it. */
    more?: BottomBarItem[] | undefined;
    /** The id of the place on screen. */
    current?: string | undefined;
    /** Accessible name of the bar. */
    label?: string;
    moreLabel?: string;
    moreIcon?: IconName;
    /** Accessible name of the dot on "More" (something new in a place not in the bar). */
    moreDotLabel?: string;
    /** Above the grid in the sheet (a search field); gets `close`. */
    sheetTop?: Snippet<[() => void]> | undefined;
    /** Below the grid in the sheet (a status line); gets `close`. */
    sheetFooter?: Snippet<[() => void]> | undefined;
    /** Only on phones (≤ 720 px). */
    phoneOnly?: boolean;
    /** The "More" sheet is open. */
    open?: boolean;
}
declare const BottomBar: import("svelte").Component<Props, {}, "open">;
type BottomBar = ReturnType<typeof BottomBar>;
export default BottomBar;
