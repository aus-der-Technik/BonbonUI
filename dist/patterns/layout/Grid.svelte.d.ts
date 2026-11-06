/**
   * Grid — responsive columns without media queries. Children flow into as many columns as
   * fit at `min` width each, never more than `columns`, and fall to one column on a phone:
   *
   *   <Grid min="14rem">…tiles…</Grid>                 as many 14rem+ columns as fit
   *   <Grid columns={3}>…</Grid>                       at most 3, fewer when narrow
   *   <Grid columns="2fr 1fr" collapse="lg">…</Grid>   a fixed template, one column below 960px
   *
   * A child spans more columns with `style="grid-column: span 2"`.
   */
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { type Align, type Breakpoint, type LayoutTag, type Space } from './space';
interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    as?: LayoutTag;
    /** A maximum column count, or a literal `grid-template-columns` like "2fr 1fr". */
    columns?: number | string | undefined;
    /** Minimum width of an auto column. */
    min?: string;
    gap?: Space;
    /** Vertical alignment of the items in a row (default stretch: equal-height cards). */
    align?: Align | undefined;
    /** For a literal template: one column below this breakpoint. */
    collapse?: Breakpoint;
    padding?: Space | undefined;
    class?: string;
    children?: Snippet | undefined;
}
declare const Grid: import("svelte").Component<Props, {}, "">;
type Grid = ReturnType<typeof Grid>;
export default Grid;
