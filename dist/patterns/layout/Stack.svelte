<script lang="ts">
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
  import {
    alignValue,
    justifyValue,
    space,
    type Align,
    type Breakpoint,
    type Justify,
    type LayoutTag,
    type Space,
  } from './space';

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

  let {
    as = 'div',
    direction = 'vertical',
    gap = 'md',
    align,
    justify,
    wrap = false,
    collapse,
    padding,
    grow = false,
    equal = false,
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();
</script>

<svelte:element
  this={as}
  class="stack stack--{direction} {collapse ? `stack--collapse-${collapse}` : ''} {extraClass}"
  class:stack--wrap={wrap}
  class:stack--grow={grow}
  class:stack--equal={equal}
  style:--stack-gap={space(gap)}
  style:--stack-align={alignValue(align ?? (direction === 'vertical' ? 'stretch' : 'center'))}
  style:--stack-justify={justifyValue(justify ?? 'start')}
  style:padding={space(padding)}
  {...rest}
>
  {@render children?.()}
</svelte:element>

<style>
  .stack {
    display: flex;
    gap: var(--stack-gap);
    justify-content: var(--stack-justify, flex-start);
    min-width: 0;
    margin: 0;
    list-style: none;
    border: 0;
  }
  .stack--vertical {
    flex-direction: column;
    align-items: var(--stack-align, stretch);
  }
  .stack--horizontal {
    flex-direction: row;
    align-items: var(--stack-align, center);
  }
  .stack--wrap {
    flex-wrap: wrap;
  }
  .stack--grow {
    flex: 1 1 auto;
  }
  .stack--equal > :global(*) {
    flex: 1 1 0;
    min-width: 0;
  }
  @media (max-width: 520px) {
    .stack--collapse-sm {
      flex-direction: column;
      align-items: stretch;
    }
  }
  @media (max-width: 720px) {
    .stack--collapse-md {
      flex-direction: column;
      align-items: stretch;
    }
  }
  @media (max-width: 960px) {
    .stack--collapse-lg {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
