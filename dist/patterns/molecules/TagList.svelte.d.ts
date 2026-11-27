interface Props {
    labels: string[];
    /** Tags shown before the count; all of them without. */
    max?: number | undefined;
    /** Highlights a label, e.g. the one the list is filtered by. */
    active?: ((label: string) => boolean) | undefined;
    onclick?: ((label: string) => void) | undefined;
    /** Tooltip of a tag. */
    title?: ((label: string) => string) | undefined;
    maxWidth?: string;
    /** The text for the hidden rest, "+2" by default. */
    moreLabel?: (hidden: number) => string;
}
declare const TagList: import("svelte").Component<Props, {}, "">;
type TagList = ReturnType<typeof TagList>;
export default TagList;
