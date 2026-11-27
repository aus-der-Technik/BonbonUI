import type { IconName } from './icons';
import { type PaletteColor } from './palette';
interface Props {
    /** The app's name: accessible name, tooltip and caption. */
    label: string;
    icon?: IconName | undefined;
    /** A picture instead of a glyph (fills the squircle). */
    src?: string | undefined;
    /** A palette colour, `accent` (follows the tint), `glass` (frosted, accent glyph), or any
     *  CSS colour. */
    color?: PaletteColor | 'accent' | 'glass' | (string & {});
    /** `sm` 32px, `md` 48px, `lg` 64px, `xl` 80px, or a number of pixels. */
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    /** A count (99+ caps) or a short text such as "!" in a red corner badge. */
    badge?: number | string | undefined;
    /** Label of the badge for screen readers; `{count}` is replaced. */
    badgeLabel?: string;
    /** A short tint bar below the icon: the app is open. */
    running?: boolean;
    /** Shows `label` under the icon (home screens, launchers). */
    caption?: boolean;
    href?: string | undefined;
    onclick?: ((event: MouseEvent) => void) | undefined;
    /** Pressed / current app (e.g. the open one in a switcher). */
    active?: boolean;
}
declare const AppIcon: import("svelte").Component<Props, {}, "">;
type AppIcon = ReturnType<typeof AppIcon>;
export default AppIcon;
