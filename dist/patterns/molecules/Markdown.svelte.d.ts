interface Props {
    source: string;
    streaming?: boolean;
    placeholder?: string | undefined;
    /** Render as preformatted plain text instead (e.g. an error that arrived before any answer). */
    plain?: boolean;
    size?: 'sm' | 'md';
}
declare const Markdown: import("svelte").Component<Props, {}, "">;
type Markdown = ReturnType<typeof Markdown>;
export default Markdown;
