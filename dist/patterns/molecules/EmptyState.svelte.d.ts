/**
   * EmptyState molecule — where a list, search or chart has nothing to show. A bare `message` is
   * the quiet centred line; with `title`, `icon` and an action it becomes a friendly first-run
   * panel: the icon bobs gently in a soft tinted circle, the copy is centred and short — and may
   * wink ("Inbox zero. Treat yourself."). Pass
   * `actionLabel` + `onaction` for a primary button, or an `action` snippet for anything else.
   *
   *   <EmptyState icon="inbox" title="No messages" message="New mail lands here."
   *     actionLabel="Compose" actionIcon="plus" onaction={compose} />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
interface Props {
    message?: string | undefined;
    title?: string | undefined;
    icon?: IconName | undefined;
    action?: Snippet | undefined;
    /** Text of a primary button (with `onaction`); ignored when an `action` snippet is given. */
    actionLabel?: string | undefined;
    actionIcon?: IconName | undefined;
    onaction?: (() => void) | undefined;
    /** Look of the `actionLabel` button: `soft` where the screen already has its primary. */
    actionVariant?: 'primary' | 'soft' | 'secondary' | 'tinted';
    /** A single quiet line with little padding, for inside cards. */
    compact?: boolean;
    children?: Snippet | undefined;
}
declare const EmptyState: import("svelte").Component<Props, {}, "">;
type EmptyState = ReturnType<typeof EmptyState>;
export default EmptyState;
