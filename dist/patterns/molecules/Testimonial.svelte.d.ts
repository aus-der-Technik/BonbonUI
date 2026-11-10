interface Props {
    quote: string;
    name: string;
    /** Job title and company, e.g. "Head of Design, Example Studio". */
    role?: string | undefined;
    avatar?: string | undefined;
    /** 1…5 stars above the quote. */
    rating?: number | undefined;
    size?: 'md' | 'lg';
    /** `ground` (default) sits directly on the backdrop; `panel` is a card. */
    level?: 'panel' | 'ground';
}
declare const Testimonial: import("svelte").Component<Props, {}, "">;
type Testimonial = ReturnType<typeof Testimonial>;
export default Testimonial;
