import type { IconName } from '../atoms/icons';
import type { AppColor } from './shared.svelte';
export interface OsNotification {
    id: string;
    app: string;
    icon?: IconName | undefined;
    color?: AppColor | undefined;
    src?: string | undefined;
    title: string;
    body?: string | undefined;
    time?: string | undefined;
    actions?: {
        label: string;
        onclick: () => void;
    }[] | undefined;
}
interface Props {
    notifications: OsNotification[];
    onopen?: ((notification: OsNotification) => void) | undefined;
    onclose?: ((id: string) => void) | undefined;
    /** Auto-dismiss after this many ms; 0 keeps them. */
    duration?: number;
    /** At most this many show; older ones wait. */
    max?: number;
    label?: string;
    closeLabel?: string;
}
declare const NotificationCenter: import("svelte").Component<Props, {}, "">;
type NotificationCenter = ReturnType<typeof NotificationCenter>;
export default NotificationCenter;
