<script lang="ts">
  /**
   * Layer — one of the four depth layers every surface belongs to, and an auto layout at once:
   *
   * | level      | looks like                                   | use for                          |
   * | ---------- | -------------------------------------------- | -------------------------------- |
   * | `ground`   | nothing — sits directly on the backdrop      | headings, KPI rows, hero text    |
   * | `panel`    | a solid tile (glass only over a photo)       | tables, forms, results           |
   * | `selected` | the tile washed in tint, a tint rim and glow | the chosen plan, the open item   |
   * | `front`    | frosted glass, floating, **always sticky**   | toolbars, bulk-action bars, docks|
   *
   * Front layers stick to the top (below the page header) or, with `edge="bottom"`, to the
   * bottom of the viewport. That is a design rule, so there is no prop to turn it off.
   *
   *   <Layer level="panel" gap="md">…</Layer>
   *   <Layer level="front" direction="horizontal">…filters…</Layer>
   *
   * Front layers are frosted glass; `lens={{ refraction: true }}` opts into refraction (see
   * GlassLens).
   */
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import GlassLens from '../atoms/GlassLens.svelte';
  import { frostFilter, type LensOptions } from '../../utils/lens';
  import {
    alignValue,
    justifyValue,
    space,
    type Align,
    type Breakpoint,
    type Justify,
    type LayerLevel,
    type LayoutTag,
    type Space,
  } from './space';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    /** With `as="form"`: skip the browser's own validation bubbles. */
    novalidate?: boolean | undefined;
    level?: LayerLevel;
    as?: LayoutTag;
    /** Inner padding (default: none on ground, md on panels, sm on front). */
    padding?: Space | undefined;
    /** Corner shape; front layers default to a pill, the others to the card radius. */
    shape?: 'card' | 'pill' | 'rounded' | 'square' | undefined;
    /** Front only: which viewport edge it sticks to. */
    edge?: 'top' | 'bottom';
    direction?: 'vertical' | 'horizontal';
    gap?: Space;
    align?: Align | undefined;
    justify?: Justify | undefined;
    wrap?: boolean;
    collapse?: Breakpoint | undefined;
    grow?: boolean;
    class?: string;
    /** Front only: glass options (blur, saturate; with `refraction: true` also magnify, rim,
     *  rimBend, chroma); `false` = plain frost. */
    lens?: LensOptions | false | undefined;
    children?: Snippet | undefined;
  }

  let {
    level = 'panel',
    as = 'div',
    padding,
    shape,
    edge = 'top',
    direction = 'vertical',
    gap = 'md',
    align,
    justify,
    wrap = level === 'front' && direction === 'horizontal',
    collapse,
    grow = false,
    class: extraClass = '',
    lens = {},
    children,
    ...rest
  }: Props = $props();

  const pad = $derived(padding ?? (level === 'ground' ? 'none' : level === 'front' ? 'sm' : 'md'));
  let lensDrawn = $state(false);
  const glass = $derived(level === 'front' && lens !== false);
  const form = $derived(
    shape ?? (level === 'front' && direction === 'horizontal' ? 'pill' : 'card'),
  );
</script>

<svelte:element
  this={as}
  class="layer layer--{level} layer--{form} layer--{direction} {level === 'front'
    ? `layer--edge-${edge}`
    : ''} {collapse ? `layer--collapse-${collapse}` : ''} {extraClass}"
  class:layer--wrap={wrap}
  class:layer--grow={grow}
  class:layer--lensed={glass && lensDrawn}
  data-layer={level}
  style:--layer-front-blur={level === 'front' ? frostFilter(lens) : undefined}
  style:--layer-gap={space(gap)}
  style:--layer-pad={space(pad)}
  style:--layer-align={alignValue(align ?? (direction === 'vertical' ? 'stretch' : 'center'))}
  style:--layer-justify={justifyValue(justify ?? 'start')}
  {...rest}
>
  {#if glass}<GlassLens {...lens || {}} bind:active={lensDrawn} />{/if}
  {@render children?.()}
</svelte:element>

<style>
  .layer {
    position: relative;
    display: flex;
    gap: var(--layer-gap);
    justify-content: var(--layer-justify, flex-start);
    padding: var(--layer-pad);
    min-width: 0;
    margin: 0;
    list-style: none;
    border: 0 solid transparent;
  }
  .layer--vertical {
    flex-direction: column;
    align-items: var(--layer-align, stretch);
  }
  .layer--horizontal {
    flex-direction: row;
    align-items: var(--layer-align, center);
  }
  .layer--wrap {
    flex-wrap: wrap;
  }
  .layer--grow {
    flex: 1 1 auto;
  }
  /* A pill with lots of padding looks swollen: pills pad their ends a little more instead. */
  .layer--pill {
    border-radius: var(--radius-pill);
    padding-inline: calc(var(--layer-pad) + var(--space-1));
  }
  .layer--card {
    border-radius: var(--radius-card);
  }
  .layer--rounded {
    border-radius: var(--radius-lg);
  }
  .layer--square {
    border-radius: 0;
  }

  .layer--panel {
    background: var(--light, none), var(--layer-panel-bg);
    border-width: 1px;
    border-color: var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .layer--selected {
    background: var(--light, none), var(--layer-selected-bg);
    border-width: 1.5px;
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .layer--front {
    /* Design rule: front layers always stick. */
    position: sticky;
    z-index: var(--z-front);
    background: var(--light, none), var(--layer-front-bg);
    border-width: 0.75px;
    border-color: var(--layer-front-border);
    box-shadow: var(--layer-front-shadow);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
  }
  /* Thick glass: the lens scatters and bends the backdrop, the layer only lends it a thin body. */
  .layer--front.layer--lensed {
    isolation: isolate;
    background: var(--light, none), var(--layer-front-lens-bg);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .layer--edge-top {
    top: calc(var(--page-top, 0px) + var(--sticky-gap));
  }
  .layer--edge-bottom {
    bottom: var(--sticky-gap);
  }

  @media (max-width: 520px) {
    .layer--collapse-sm {
      flex-direction: column;
      align-items: stretch;
    }
  }
  @media (max-width: 720px) {
    .layer--collapse-md {
      flex-direction: column;
      align-items: stretch;
    }
  }
  @media (max-width: 960px) {
    .layer--collapse-lg {
      flex-direction: column;
      align-items: stretch;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .layer--panel,
    .layer--selected,
    .layer--front {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
