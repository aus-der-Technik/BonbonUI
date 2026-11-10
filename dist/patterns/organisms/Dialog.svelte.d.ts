/**
   * Dialog organism — a modal of liquid glass over a dimmed, blurred page. It eases in from
   * slightly smaller (big surfaces never overshoot) and becomes a bottom sheet on phones. Given
   * the `origin` that opened it (the trigger button or its rect), it grows out of that place and
   * shrinks back into it, so cause and effect stay visible. Built on the native `<dialog>`
   * (focus trap, Escape and the top layer come from the browser).
   *
   * Every overlay closes the same way: Escape, the close button at the top end and a click on
   * the backdrop all report through `onclose` (once per request). `dismissible={false}` holds
   * the dialog open while work runs; `closeButton` / `closeOnBackdrop` switch those off.
   *
   *   <Dialog open={asking} origin={trigger} title="Discard changes?" onclose={() => (asking = false)}>
   *     …{#snippet actions()}<Button label="Keep editing" />…{/snippet}
   *   </Dialog>
   */
import { type Snippet } from 'svelte';
interface Props {
    open: boolean;
    title?: string | undefined;
    intro?: string | undefined;
    width?: string;
    /** What opened the dialog: it grows out of this element (or rect) and shrinks back into it. */
    origin?: Element | DOMRect | undefined;
    /** Whether Escape, the close button and the backdrop may close it (off while busy). */
    dismissible?: boolean;
    /** The close button at the top end. */
    closeButton?: boolean;
    /** A click on the backdrop closes it. */
    closeOnBackdrop?: boolean;
    closeLabel?: string;
    onclose: () => void;
    children: Snippet;
    actions?: Snippet | undefined;
}
declare const Dialog: import("svelte").Component<Props, {}, "">;
type Dialog = ReturnType<typeof Dialog>;
export default Dialog;
