import type { IconName } from '../atoms/icons';
interface Props {
    label?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    busyLabel?: string;
    /** Shown on the button for `doneFor` ms after `onconfirm` resolved, e.g. "Deleted". */
    doneLabel?: string | undefined;
    doneFor?: number;
    icon?: IconName | undefined;
    size?: 'sm' | 'md';
    shape?: 'rounded' | 'pill';
    disabled?: boolean;
    /** Milliseconds without pointer or keyboard activity on it before an armed button disarms;
     *  0 keeps it armed until the user leaves it. */
    disarmAfter?: number;
    onconfirm: () => unknown;
}
declare const ConfirmButton: import("svelte").Component<Props, {}, "">;
type ConfirmButton = ReturnType<typeof ConfirmButton>;
export default ConfirmButton;
