import type { IconName } from '../atoms/icons';
export interface NotificationItem {
    id: string;
    title: string;
    body?: string | undefined;
    time: Date | string;
    unread?: boolean;
    /** A glyph in a candy tile; `actor` shows that person's avatar instead. */
    icon?: IconName | undefined;
    /** Candy colour name or CSS colour of the icon tile. */
    color?: string | undefined;
    actor?: string | undefined;
    href?: string | undefined;
}
interface Props {
    items?: NotificationItem[];
    title?: string | undefined;
    now?: Date | undefined;
    locale?: string;
    markAllLabel?: string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    unreadLabel?: string;
    /** "3 unread" next to the title. */
    countLabel?: (unread: number) => string;
    onopen?: ((item: NotificationItem) => void) | undefined;
    onread?: ((ids: string[]) => void) | undefined;
}
declare const NotificationList: import("svelte").Component<Props, {}, "items">;
type NotificationList = ReturnType<typeof NotificationList>;
export default NotificationList;
