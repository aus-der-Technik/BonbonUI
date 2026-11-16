export type FeedbackDraft = {
    type: 'thumbs';
    value: 'up' | 'down';
} | {
    type: 'stars';
    value: 1 | 2 | 3 | 4 | 5;
};
interface Props {
    open: boolean;
    title?: string;
    intro?: string;
    maxComment?: number;
    /** ms the thank-you stays before the dialog closes itself; 0 keeps it open. */
    closeAfter?: number;
    sentTitle?: string;
    sentMessage?: string;
    ratingLabel?: string;
    thumbsLabel?: string;
    starsLabel?: string;
    commentLabel?: string;
    optionalLabel?: string;
    commentPlaceholder?: string;
    cancelLabel?: string;
    sendLabel?: string;
    sendingLabel?: string;
    /** Closes the thank-you. */
    doneLabel?: string;
    /** The two thumbs. */
    upLabel?: string;
    downLabel?: string;
    closeLabel?: string;
    /** What opened it (e.g. a "Feedback" button): the dialog grows out of it. */
    origin?: Element | DOMRect | undefined;
    onclose: () => void;
    onsubmit: (draft: FeedbackDraft, comment: string) => Promise<void> | void;
}
declare const FeedbackDialog: import("svelte").Component<Props, {}, "">;
type FeedbackDialog = ReturnType<typeof FeedbackDialog>;
export default FeedbackDialog;
