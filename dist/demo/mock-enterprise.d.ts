/** Mock data for the enterprise examples (Pages/Enterprise): an internal IT service desk. */
import type { IconName } from '../patterns/atoms/icons';
import type { Tone } from '../patterns/tone';
export type Priority = 1 | 2 | 3 | 4;
export type TicketStatus = 'new' | 'open' | 'waiting' | 'resolved';
export type Category = 'hardware' | 'network' | 'access' | 'software' | 'email';
export declare const priorities: Record<Priority, {
    label: string;
    tone: Tone;
}>;
/** Service levels in minutes: the first answer, and the fix. */
export declare const sla: Record<Priority, {
    respond: number;
    resolve: number;
}>;
export declare const categories: Record<Category, {
    label: string;
    icon: IconName;
}>;
export declare const statuses: Record<TicketStatus, {
    label: string;
    tone: Tone;
}>;
export interface Agent {
    name: string;
    email: string;
    /** Open tickets on their desk right now. */
    load: number;
    away?: boolean;
}
/** The agent signed in. */
export declare const ME = "Robin Example";
export declare const agents: Agent[];
export interface Requester {
    name: string;
    team: string;
    email: string;
}
export type MessageKind = 'requester' | 'reply' | 'note' | 'event';
export interface Message {
    id: string;
    kind: MessageKind;
    author: string;
    /** Minutes before the page opened (mock); live messages carry a real time instead. */
    ago: number;
    text: string;
}
export interface Ticket {
    id: string;
    title: string;
    requester: Requester;
    category: Category;
    priority: Priority;
    status: TicketStatus;
    assignee: string | null;
    /** Minutes before the page opened. */
    created: number;
    /** Minutes before the page opened that the first answer went out; null = not yet. */
    responded: number | null;
    messages: Message[];
}
export declare const tickets: Ticket[];
/** What a requester answers a little while after a reply (mock background event). */
export declare const followUps: Record<string, string>;
