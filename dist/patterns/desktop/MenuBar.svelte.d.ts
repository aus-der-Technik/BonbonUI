import type { IconName } from '../atoms/icons';
import type { Greeting } from '../../utils/delight';
/** A status item on the right of the menu bar (wifi, battery, …). */
export interface MenuBarStatus {
    /** Stable name, rendered as `data-status` (tests, tours, design notes). */
    id?: string | undefined;
    icon: IconName;
    /** Accessible name, also the tooltip. */
    label: string;
    /** Short text next to the icon ("82%"). */
    text?: string | undefined;
    /** Makes it a button (e.g. opens quick settings). The event's `currentTarget` is the item,
     *  so a panel can pop out of it (`anchor`). */
    onclick?: ((event: MouseEvent) => void) | undefined;
    /** Highlights it while its panel is open. */
    active?: boolean | undefined;
}
/**
   * MenuBar — the **top shelf**: a slim floating glass shelf over the desktop. On the left the
   * front app's name in a pill, followed by its menus (and, with `logoMenu`, the system menu
   * as a wrapped bonbon in front). On the right status items and the **day pill**: a greeting
   * and the time ("Good afternoon · 14:32") that shows a small wink on hover. A front layer,
   * so it sticks to the top. ARIA menubar: Left / Right move between menus, Down opens one,
   * and while a menu is open hovering a neighbour switches to it.
   *
   *   <MenuBar logoMenu={system} appIcon="edit" appColor="yellow"
   *            menus={[{ label: 'Notes', items }, { label: 'File', items }]}
   *            status={[{ icon: 'wifi', label: 'Wi-Fi' }]} name="Alex" />
   */
import type { Snippet } from 'svelte';
import { type LensOptions } from '../../utils/lens';
import type { AppColor, ContextMenuItem, MenuBarMenu } from './shared.svelte';
interface Props {
    menus?: MenuBarMenu[];
    /** A glyph for the system menu (default: the wrapped bonbon mark). */
    logo?: IconName | undefined;
    /** The system menu; shown when given (or when `logo` is set). */
    logoMenu?: ContextMenuItem[] | undefined;
    logoLabel?: string;
    /** Small app icon in the app pill (the first menu). */
    appIcon?: IconName | undefined;
    appColor?: AppColor | undefined;
    status?: MenuBarStatus[];
    /** Shows the day pill (greeting + time) on the right. */
    clock?: boolean;
    /** A fixed time (stories, tests); without it the clock ticks. */
    now?: Date | undefined;
    formatClock?: (date: Date) => string;
    /** Greets in the day pill; off shows the time only. */
    greet?: boolean;
    /** Appended to the greeting ("Good morning, Alex"). */
    name?: string | undefined;
    /** Your own words for the moment (another language, another tone). */
    greeting?: (date: Date, name?: string) => Greeting;
    /** Click on the day pill (e.g. open a calendar); `currentTarget` is the pill. */
    onday?: ((event: MouseEvent) => void) | undefined;
    /** A floating shelf below the top edge (default) or a full-width bar. */
    floating?: boolean;
    /** Accessible name of the menu bar. */
    label?: string;
    /** Extra content before the status items. */
    trailing?: Snippet | undefined;
    /** Refraction of the shelf (magnify, rim, rimBend, chroma, blur, saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
}
declare const MenuBar: import("svelte").Component<Props, {}, "">;
type MenuBar = ReturnType<typeof MenuBar>;
export default MenuBar;
