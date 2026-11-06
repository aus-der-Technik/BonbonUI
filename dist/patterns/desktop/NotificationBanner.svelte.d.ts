import type { IconName } from '../atoms/icons';
import type { AppColor } from './shared.svelte';
interface Props {
    /** The sending app's name. */
    app: string;
    icon?: IconName | undefined;
    /** A palette name, `accent`, or any CSS colour. */
    color?: AppColor | undefined;
    /** App icon picture instead of the glyph. */
    src?: string | undefined;
    title: string;
    body?: string | undefined;
    /** "now", "5m ago", "09:41". */
    time?: string | undefined;
    actions?: {
        label: string;
        onclick: () => void;
    }[];
    onopen?: (() => void) | undefined;
    onclose?: (() => void) | undefined;
    closeLabel?: string;
}
declare const NotificationBanner: import("svelte").Component<Props, {}, "">;
type NotificationBanner = ReturnType<typeof NotificationBanner>;
export default NotificationBanner;
