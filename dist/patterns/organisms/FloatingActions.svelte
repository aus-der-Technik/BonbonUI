<script lang="ts">
  /**
   * FloatingActions organism — the pill buttons that float over the end of a page for actions on
   * the page as a whole ("Publish", "Save all", a bulk-action bar for the current selection). It
   * is a front-layer element, so it is **sticky**, never fixed: put it last in the page's content
   * and it rides along the bottom edge of the viewport while the content scrolls, then settles at
   * the end of the content. `Page` has a `floating` slot that does the same; use this inside your
   * own layouts or when you need the `bar` look.
   *
   * Not for inserting into one specific list or table: a control sits where its effect happens,
   * so adding a row belongs at the end of that list (EditableGrid's own "+ New row", a list's
   * "Add" row), where the new item will appear.
   *
   *   <FloatingActions>
   *     <Button variant="primary" shape="pill" size="xl" icon="check" label="Publish" />
   *   </FloatingActions>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    /** Distance from the bottom edge of the viewport while it floats. */
    offset?: string;
    /** Where the buttons sit along the bottom edge. */
    align?: 'start' | 'center' | 'end';
    /** Puts the buttons on one liquid-glass pill (a bulk-action bar) instead of loose pills. */
    bar?: boolean;
    /** Accessible name of the group, e.g. "Row actions". */
    label?: string | undefined;
    children: Snippet;
  }

  let {
    offset = 'var(--sticky-gap)',
    align = 'end',
    bar = false,
    label,
    children,
  }: Props = $props();
</script>

<div
  class="fab fab--{align}"
  class:fab--bar={bar}
  role={label ? 'group' : undefined}
  aria-label={label}
  style:--fab-offset={offset}
  data-layer="front"
>
  {@render children()}
</div>

<style>
  .fab {
    /* Front layer: sticky (design rule), so it never covers the end of the content. */
    position: sticky;
    bottom: var(--fab-offset);
    z-index: var(--z-fab);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-2);
    width: fit-content;
    max-width: 100%;
    margin-left: auto;
    /* Never takes the content's room, even as the last child of a `fill` Page (which grows it). */
    flex: none !important;
    animation: fab-in var(--motion-slow) var(--ease-out);
  }
  .fab--center {
    margin-inline: auto;
    justify-content: center;
  }
  .fab--start {
    margin-left: 0;
    margin-right: auto;
    justify-content: flex-start;
  }
  .fab--bar {
    padding: var(--space-2);
    border-radius: var(--radius-pill);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    box-shadow: var(--layer-front-shadow);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
  }
  @keyframes fab-in {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.96);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .fab {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .fab--bar {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
