export interface TaskItem {
    id: string;
    label: string;
    done: boolean;
    /** Who takes care of it (name or e-mail; shown as a small avatar). */
    assignee?: string | undefined;
    /** A short due hint, e.g. "Fri" or "12 Nov". */
    due?: string | undefined;
}
interface Props {
    items?: TaskItem[];
    title?: string | undefined;
    /** Shows "3 of 5" and a progress bar under the title. */
    progress?: boolean;
    /** Shows the add field and the remove buttons. */
    editable?: boolean;
    /** Ticked items move to the end of the list. */
    sinkDone?: boolean;
    addLabel?: string;
    addPlaceholder?: string;
    removeLabel?: string;
    progressLabel?: (done: number, total: number) => string;
    emptyText?: string;
    /** Shown under the progress bar once every item is ticked. */
    allDoneText?: string;
    ontoggle?: ((item: TaskItem) => void) | undefined;
    onadd?: ((item: TaskItem) => void) | undefined;
    onremove?: ((item: TaskItem) => void) | undefined;
}
declare const TaskList: import("svelte").Component<Props, {}, "items">;
type TaskList = ReturnType<typeof TaskList>;
export default TaskList;
