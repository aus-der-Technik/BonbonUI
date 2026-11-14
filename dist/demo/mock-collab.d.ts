import type { Participant } from '../patterns/molecules/AvatarStack.svelte';
import type { CalendarEvent } from '../patterns/molecules/Calendar.svelte';
import type { TaskItem } from '../patterns/molecules/TaskList.svelte';
import type { ThreadComment } from '../patterns/organisms/CommentThread.svelte';
import type { KanbanCard, KanbanColumn } from '../patterns/organisms/KanbanBoard.svelte';
import type { NotificationItem } from '../patterns/organisms/NotificationList.svelte';
import type { ActivityEntry } from '../patterns/organisms/ActivityLog.svelte';
import type { NavGroup } from '../patterns/organisms/SideNav.svelte';
/** "Now" for every collaboration demo: Tuesday, 3 November 2026, 10:30 local time. */
export declare const NOW: Date;
export declare const team: Participant[];
export declare const me: Participant;
export declare const boardColumns: KanbanColumn[];
export declare function boardCards(): KanbanCard[];
export declare function checklist(): TaskItem[];
export declare const threadComments: ThreadComment[];
export declare const secondThread: ThreadComment[];
export declare function notifications(): NotificationItem[];
export declare const calendarEvents: CalendarEvent[];
export declare const boardActivity: ActivityEntry[];
/** The team workspace's navigation: the two views of the shared plan. */
export declare const collabNav: NavGroup[];
/** Who is looking at which card right now (card id → people), for the card drawer. */
export declare const watching: Record<string, string[]>;
/** A second discussion for the card drawer, by card id; other cards start without one. */
export declare function cardThreads(): Record<string, ThreadComment[]>;
