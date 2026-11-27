export interface FaqItem {
    question: string;
    /** Plain text; blank lines start a new paragraph. */
    answer: string;
}
interface Props {
    items: FaqItem[];
    /** Lets several answers be open at once. */
    multiple?: boolean;
    open?: number[];
    title?: string | undefined;
    eyebrow?: string | undefined;
    description?: string | undefined;
    align?: 'start' | 'center';
    size?: 'default' | 'hero';
    ontoggle?: ((index: number, open: boolean) => void) | undefined;
    /** `ground` (default) sits on the backdrop; `panel` is a card. */
    level?: 'ground' | 'panel';
}
declare const Faq: import("svelte").Component<Props, {}, "open">;
type Faq = ReturnType<typeof Faq>;
export default Faq;
