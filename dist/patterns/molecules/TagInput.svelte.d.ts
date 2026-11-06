interface Props {
    /** The tags (bindable). */
    value?: string[];
    /** Accessible name of the text field. */
    label: string;
    placeholder?: string | undefined;
    removeLabel?: string;
    /** Announced when a typed tag already exists. */
    duplicateLabel?: (tag: string) => string;
    /** Characters that end a tag as it is typed, besides Enter. */
    separators?: string[];
    unique?: boolean;
    disabled?: boolean | undefined;
    autofocus?: boolean;
    maxWidth?: string;
    onchange?: ((value: string[]) => void) | undefined;
    onkeydown?: ((event: KeyboardEvent) => void) | undefined;
    onblur?: (() => void) | undefined;
}
declare const TagInput: import("svelte").Component<Props, {}, "value">;
type TagInput = ReturnType<typeof TagInput>;
export default TagInput;
