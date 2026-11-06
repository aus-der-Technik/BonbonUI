interface Props {
    open: boolean;
    title: string;
    message?: string | undefined;
    confirmLabel?: string;
    cancelLabel?: string;
    busyLabel?: string;
    tone?: 'danger' | 'primary';
    /** What opened it (e.g. the Delete button): the dialog grows out of it. */
    origin?: Element | DOMRect | undefined;
    closeLabel?: string;
    onconfirm: () => unknown;
    onclose: () => void;
}
declare const ConfirmDialog: import("svelte").Component<Props, {}, "">;
type ConfirmDialog = ReturnType<typeof ConfirmDialog>;
export default ConfirmDialog;
