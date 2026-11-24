/**
   * Comment molecule — one message in a discussion: avatar, author, a relative time, plain text
   * (line breaks kept, nothing interpreted as markup) and optional reactions. `onreply` adds a
   * "Reply" link; `actions` takes extra buttons (a ⋯ menu). `highlight` marks a new message.
   *
   *   <Comment author="Ada Byron" time={date} text="Looks good to me!" bind:reactions />
   */
import type { Snippet } from 'svelte';
import { type Reaction } from './Reactions.svelte';
interface Props {
    author: string;
    src?: string | undefined;
    time: Date | string;
    text: string;
    /** A role pill next to the name, e.g. "Owner". */
    role?: string | undefined;
    edited?: boolean;
    editedLabel?: string;
    /** `undefined` hides the reactions row; an empty array shows only the add button. */
    reactions?: Reaction[] | undefined;
    /** Reference time for "5 minutes ago" (stable stories and tests). */
    now?: Date | undefined;
    locale?: string;
    highlight?: boolean;
    size?: 'sm' | 'md';
    replyLabel?: string;
    onreply?: (() => void) | undefined;
    onreact?: ((emoji: string, mine: boolean) => void) | undefined;
    actions?: Snippet | undefined;
}
declare const Comment: import("svelte").Component<Props, {}, "reactions">;
type Comment = ReturnType<typeof Comment>;
export default Comment;
