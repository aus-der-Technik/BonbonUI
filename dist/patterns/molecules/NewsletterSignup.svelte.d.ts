interface Props {
    onsubscribe: (email: string) => void | Promise<void>;
    title?: string | undefined;
    text?: string | undefined;
    /** Accessible name of the field (visually hidden). */
    label?: string;
    placeholder?: string;
    buttonLabel?: string;
    busyLabel?: string;
    successMessage?: string;
    errorMessage?: string;
    invalidMessage?: string;
    /** `stacked` puts the button under the field (narrow columns, footers). */
    layout?: 'inline' | 'stacked';
    align?: 'start' | 'center';
}
declare const NewsletterSignup: import("svelte").Component<Props, {}, "">;
type NewsletterSignup = ReturnType<typeof NewsletterSignup>;
export default NewsletterSignup;
