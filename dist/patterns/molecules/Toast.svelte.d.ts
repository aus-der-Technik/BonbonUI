/**
   * Toast molecule — one short-lived notice on liquid glass: the tone's icon in a tinted circle,
   * an optional bold `title`, the message and a close button. It springs in from below. Toaster
   * stacks them; use it alone for a notice that stays put.
   *
   *   <Toast tone="ok" title="Saved" message="Your changes are live." ondismiss={close} />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
import { type Tone } from '../tone';
interface Props {
    /** Announced as an alert only for `danger`. */
    tone?: Tone | /** @deprecated Use `danger`. */ 'error';
    title?: string | undefined;
    message?: string | undefined;
    /** The tone's icon by default; another icon, or `false` for none. */
    icon?: IconName | false | undefined;
    /** Buttons after the message, e.g. "Undo". */
    actions?: Snippet | undefined;
    dismissLabel?: string;
    ondismiss?: (() => void) | undefined;
    children?: Snippet | undefined;
}
declare const Toast: import("svelte").Component<Props, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
