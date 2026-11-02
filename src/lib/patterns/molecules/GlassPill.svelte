<script lang="ts">
  /**
   * GlassPill molecule — clear glass in the title pill's style for the header's other pills
   * (a list switch, a toolbar of filters). Lighter than the title pill and only slightly
   * blurred, so the page shows through; same specular edge and bloom. `wrap` lets the content
   * break onto several lines, rounding the pill into a card. `gap` spaces its children on the
   * layout scale, so a toolbar needs no inner wrapper.
   *
   *   <GlassPill as="search" label="Filters" grow><SearchField … /><Button … /></GlassPill>
   */
  import type { Snippet } from 'svelte';
  import { space, type Space } from '../layout/space';

  interface Props {
    /** `search` for a toolbar of filters (a search landmark), `div` otherwise. */
    as?: 'div' | 'search';
    label?: string | undefined;
    /** Grows to fill the room it has, up to `maxWidth`. */
    grow?: boolean;
    maxWidth?: string | undefined;
    wrap?: boolean;
    /** Space between the children (default a tight 0.45rem). */
    gap?: Space | undefined;
    class?: string;
    children: Snippet;
  }

  let {
    as = 'div',
    label,
    grow = false,
    maxWidth,
    wrap = false,
    gap,
    class: className = '',
    children,
  }: Props = $props();
</script>

<svelte:element
  this={as}
  class="glass {className}"
  class:grow
  class:wrap
  style:max-width={maxWidth}
  style:gap={space(gap)}
  aria-label={label}
>
  {@render children()}
</svelte:element>

<style>
  .glass {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-width: 0;
    padding: 0.45rem 0.55rem;
    border-radius: var(--radius-pill);
    background: linear-gradient(
      150deg,
      color-mix(in srgb, var(--pill-light) 42%, transparent),
      color-mix(in srgb, var(--pill-light) 12%, transparent) 48%,
      color-mix(in srgb, var(--pill-light) 32%, transparent)
    );
    backdrop-filter: blur(9px) saturate(210%) brightness(1.04);
    -webkit-backdrop-filter: blur(9px) saturate(210%) brightness(1.04);
    border: 0.75px solid var(--pill-border);
    box-shadow: var(--shadow-header-pill);
    /* Fields inside are glass too. */
    --input-bg: color-mix(in srgb, var(--pill-light) 38%, transparent);
  }
  .grow {
    flex: 1;
  }
  .wrap {
    flex-wrap: wrap;
    border-radius: var(--radius-xl);
  }
  .glass::before,
  .glass::after {
    content: '';
    position: absolute;
    z-index: -1;
    pointer-events: none;
  }
  .glass::before {
    inset: 0.8px 26% auto 4%;
    height: 44%;
    border-radius: var(--radius-pill);
    background: linear-gradient(180deg, var(--pill-edge), transparent);
  }
  .glass::after {
    left: -6%;
    bottom: -70%;
    width: 40%;
    height: 140%;
    border-radius: 50%;
    background: radial-gradient(closest-side, var(--pill-bloom), transparent);
  }
  @media (prefers-reduced-transparency: reduce) {
    .glass {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
