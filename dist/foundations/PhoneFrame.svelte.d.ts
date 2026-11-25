interface Props {
    /** The story's id (`atoms-sheetgrip--on-a-popover`). */
    story: string;
    /** What the frame shows, for screen readers and the link. */
    title: string;
    /** What to try, one quiet line under the frame. */
    caption?: string | undefined;
    height?: number;
}
declare const PhoneFrame: import("svelte").Component<Props, {}, "">;
type PhoneFrame = ReturnType<typeof PhoneFrame>;
export default PhoneFrame;
