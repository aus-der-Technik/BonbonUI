/**
   * Stack — auto layout. Lays its children out in one direction with one gap, like an auto
   * layout frame in a design tool: no margins, no wrapper divs, edges line up by construction.
   *
   *   <Stack gap="lg">…</Stack>                       vertical, 1.5rem apart
   *   <Stack direction="horizontal" align="center">   a row
   *   <Stack direction="horizontal" collapse="md">    a row that becomes a column below 720px
   *
   * `Row` is the horizontal preset. Every layer (`Layer`, `Section`, `Page`) takes the same
   * layout props, so most pages need no Stack at all.
   */
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { type Align, type Breakpoint, type Justify, type LayoutTag, type Space } from './space';
interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    /** With `as="form"`: skip the browser's own validation bubbles. */
    novalidate?: boolean | undefined;
    as?: LayoutTag;
    direction?: 'vertical' | 'horizontal';
    gap?: Space;
    /** Cross-axis alignment (default: stretch for columns, center for rows). */
    align?: Align | undefined;
    justify?: Justify | undefined;
    /** Lets a row break onto several lines. */
    wrap?: boolean;
    /** A horizontal stack turns vertical below this breakpoint (sm 520px, md 720px, lg 960px). */
    collapse?: Breakpoint | undefined;
    padding?: Space | undefined;
    /** Takes the free room in a parent stack. */
    grow?: boolean;
    /** Children share the room equally (each gets `flex: 1`). */
    equal?: boolean;
    class?: string;
    children?: Snippet | undefined;
}
declare const Stack: import("svelte").Component<Props, {}, "">;
type Stack = ReturnType<typeof Stack>;
export default Stack;
