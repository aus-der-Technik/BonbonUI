/**
   * Alert molecule — a message in its tone: tinted glass with the tone's icon. `inline` sits inside
   * a card or form (a sheet's error box, a dialog error); `card` stands on its own glass card
   * between sections (a failed request); `strong` tints the whole card, for a failure that blocks
   * the page. `title` adds a bold first line, `actions` buttons on the right, `ondismiss` a close
   * button. Announced as an alert only for `danger`, as a status otherwise.
   *
   *   <Alert tone="warn" title="Draft" message="This list is not published yet." />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
import { type Tone } from '../tone';
interface Props {
    tone?: Tone | /** @deprecated Use `danger`. */ 'error';
    variant?: 'inline' | 'card';
    /** Tints the whole card, border and text in the tone, not only its icon. */
    strong?: boolean;
    /** A bold first line above the message. */
    title?: string | undefined;
    message?: string | undefined;
    /** The tone's icon by default; another icon, or `false` for none. */
    icon?: IconName | false | undefined;
    /** Buttons at the end, e.g. "Retry". */
    actions?: Snippet | undefined;
    dismissLabel?: string;
    /** Shows a close button. */
    ondismiss?: (() => void) | undefined;
    children?: Snippet | undefined;
}
declare const Alert: import("svelte").Component<Props, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
