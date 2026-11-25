/**
   * Local only (not in git): one square for a social image. The system's own backdrop in one
   * tint and theme, the word mark bottom left, a caption bottom right, and the arrangement
   * centred and scaled up by `zoom`. With `layout="free"` the children fill the square as they
   * are (editorial layouts place themselves).
   */
import type { Snippet } from 'svelte';
interface Props {
    tint: string;
    theme: 'light' | 'dark';
    photo?: string | undefined;
    caption: string;
    note?: string | undefined;
    zoom?: number | undefined;
    layout?: 'centre' | 'free' | undefined;
    /** Where a centred layout's scene sits: the middle, or the top-left corner at the margin. */
    place?: 'centre' | 'top-left' | undefined;
    children: Snippet;
}
declare const Frame: import("svelte").Component<Props, {}, "">;
type Frame = ReturnType<typeof Frame>;
export default Frame;
