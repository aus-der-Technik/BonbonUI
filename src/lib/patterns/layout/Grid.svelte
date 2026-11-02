<script lang="ts">
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
  import {
    alignValue,
    space,
    type Align,
    type Breakpoint,
    type LayoutTag,
    type Space,
  } from './space';

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

  let {
    as = 'div',
    columns,
    min = '16rem',
    gap = 'md',
    align,
    collapse = 'md',
    padding,
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  const literal = $derived(typeof columns === 'string');
</script>

<svelte:element
  this={as}
  class="grid {literal ? `grid--literal grid--collapse-${collapse}` : ''} {extraClass}"
  style:--grid-gap={space(gap)}
  style:--grid-min={min}
  style:--grid-cols={typeof columns === 'number' ? columns : 99}
  style:--grid-template={literal ? columns : undefined}
  style:align-items={alignValue(align)}
  style:padding={space(padding)}
  {...rest}
>
  {@render children?.()}
</svelte:element>

<style>
  .grid {
    --_max: var(--grid-cols);
    display: grid;
    gap: var(--grid-gap);
    min-width: 0;
    margin: 0;
    list-style: none;
    /* Each column is at least --grid-min and at least 1/cols of the row, never wider than 100%. */
    grid-template-columns: repeat(
      auto-fill,
      minmax(
        min(100%, max(var(--grid-min), (100% - (var(--_max) - 1) * var(--grid-gap)) / var(--_max))),
        1fr
      )
    );
  }
  .grid--literal {
    grid-template-columns: var(--grid-template);
  }
  @media (max-width: 520px) {
    .grid--collapse-sm {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 720px) {
    .grid--collapse-md {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 960px) {
    .grid--collapse-lg {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
