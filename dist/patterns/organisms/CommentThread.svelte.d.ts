import type { Reaction } from '../molecules/Reactions.svelte';
export interface ThreadComment {
    id: string;
    author: string;
    src?: string | undefined;
    time: Date | string;
    text: string;
    role?: string | undefined;
    edited?: boolean;
    reactions?: Reaction[] | undefined;
}
interface Props {
    comments: ThreadComment[];
    /** The passage the thread is about, shown as a quote on top. */
    quote?: string | undefined;
    resolved?: boolean;
    /** The reply box's text (bindable): set it to prefill, read it to keep a draft. */
    draft?: string;
    /** Shows the reply box (default when `onreply` is set). */
    canReply?: boolean | undefined;
    now?: Date | undefined;
    locale?: string;
    /** Marks the thread as the one in focus (selected layer). */
    active?: boolean;
    label?: string;
    replyLabel?: string;
    replyPlaceholder?: string;
    resolveLabel?: string;
    reopenLabel?: string;
    resolvedLabel?: string;
    /** Shown under the reply box when `onreply` rejects; the draft is kept. */
    replyErrorMessage?: string;
    dismissLabel?: string;
    /** Placeholder of the composer of a thread without comments yet. */
    startPlaceholder?: string;
    /** Send button of a thread without comments yet. */
    startLabel?: string;
    /** The button that drops a draft (shown with `oncancel`). */
    cancelLabel?: string;
    /** Discard: the draft is cleared, then this is called (e.g. to close a new thread). */
    oncancel?: (() => void) | undefined;
    /** "3 comments" in the folded line. */
    countLabel?: (count: number) => string;
    onreply?: ((text: string) => void | Promise<void>) | undefined;
    onresolve?: ((resolved: boolean) => void) | undefined;
    onreact?: ((commentId: string, emoji: string, mine: boolean) => void) | undefined;
}
declare const CommentThread: import("svelte").Component<Props, {}, "resolved" | "draft">;
type CommentThread = ReturnType<typeof CommentThread>;
export default CommentThread;
