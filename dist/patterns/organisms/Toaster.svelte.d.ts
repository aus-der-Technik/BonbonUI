import type { ToastItem, ToastQueue } from '../../utils/toasts.svelte';
interface Props {
    /** The queue to show; it also handles dismiss, actions and pausing. */
    queue?: ToastQueue | undefined;
    /** Toasts to show when there is no `queue`. */
    toasts?: ToastItem[] | undefined;
    ondismiss?: ((id: number) => void) | undefined;
    /** A toast's action button was pressed (without `queue`). */
    onaction?: ((id: number) => void) | undefined;
    /** Pointer or focus arrived on the stack: stop the countdowns (without `queue`). */
    onpause?: (() => void) | undefined;
    onresume?: (() => void) | undefined;
    /** Distance from the edge, e.g. to clear floating action buttons. */
    offset?: string;
    /** Which corner (or edge centre) the stack grows from. */
    placement?: 'bottom-end' | 'bottom-center' | 'top-end' | 'top-center';
    /** A success (`ok`) toast arrives with a small burst of sprinkles. */
    sprinkle?: boolean;
    dismissLabel?: string;
    /** Accessible name of the stack. */
    label?: string;
}
declare const Toaster: import("svelte").Component<Props, {}, "">;
type Toaster = ReturnType<typeof Toaster>;
export default Toaster;
