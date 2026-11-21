interface Props {
    file?: File | null;
    /** Comma-separated extensions or MIME types, as for `<input accept>`, e.g. ".pdf,.md". */
    accept?: string | undefined;
    maxBytes?: number | undefined;
    label?: string;
    hint?: string | undefined;
    /** 0…1 while uploading; `null` when idle. */
    progress?: number | null;
    progressLabel?: string;
    disabled?: boolean;
    error?: string | undefined;
    /** Message for a file whose type `accept` does not allow. */
    typeErrorLabel?: (allowed: string) => string;
    /** Message for a file over `maxBytes`. */
    sizeErrorLabel?: (size: string, max: string) => string;
    /** Accessible name of the remove button. */
    removeLabel?: (name: string) => string;
    onselect?: ((file: File | null) => void) | undefined;
}
declare const FileDropzone: import("svelte").Component<Props, {}, "file">;
type FileDropzone = ReturnType<typeof FileDropzone>;
export default FileDropzone;
