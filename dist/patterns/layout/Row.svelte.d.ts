/**
   * Row — the horizontal Stack: children side by side, vertically centred, wrapping when the
   * room runs out. `collapse="md"` stacks them below 720px instead of wrapping.
   *
   *   <Row gap="sm"><Button …/><Button …/><Spacer /><Button …/></Row>
   */
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { Align, Breakpoint, Justify, LayoutTag, Space } from './space';
interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    /** With `as="form"`: skip the browser's own validation bubbles. */
    novalidate?: boolean | undefined;
    as?: LayoutTag;
    gap?: Space;
    align?: Align | undefined;
    justify?: Justify | undefined;
    wrap?: boolean;
    collapse?: Breakpoint | undefined;
    padding?: Space | undefined;
    grow?: boolean;
    equal?: boolean;
    class?: string;
    children?: Snippet | undefined;
}
declare const Row: import("svelte").Component<Props, {}, "">;
type Row = ReturnType<typeof Row>;
export default Row;
