export interface ActivityEntry {
    id: string;
    /** Who did it — a name or an e-mail address. */
    actor: string;
    /** What happened, e.g. "changed the role of". */
    action: string;
    /** What it happened to, set in bold after the action. */
    target?: string;
    at: Date | string;
    /** Colours the dot: a deletion is `danger`, a creation `ok`. */
    tone?: 'neutral' | 'ok' | 'warn' | 'danger' | 'info';
    detail?: string;
}
interface Props {
    entries: ActivityEntry[];
    label?: string;
    emptyText?: string;
    showAvatars?: boolean;
}
declare const ActivityLog: import("svelte").Component<Props, {}, "">;
type ActivityLog = ReturnType<typeof ActivityLog>;
export default ActivityLog;
