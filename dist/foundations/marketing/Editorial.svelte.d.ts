/**
   * Local only (not in git): an editorial square. A small serif headline, a sentence or two,
   * and a live group of components, framed like every other square (word mark, caption).
   *
   * `layout`: `top` text above the group, `bottom` text below it, `left` text in a column
   * beside it. The group is scaled by `zoom` inside its own area.
   */
import type { Snippet } from 'svelte';
interface Props {
    tint: string;
    theme: 'light' | 'dark';
    photo?: string | undefined;
    eyebrow?: string | undefined;
    title: string;
    text: string;
    caption: string;
    layout?: 'top' | 'bottom' | 'left' | undefined;
    zoom?: number | undefined;
    children: Snippet;
}
declare const Editorial: import("svelte").Component<Props, {}, "">;
type Editorial = ReturnType<typeof Editorial>;
export default Editorial;
