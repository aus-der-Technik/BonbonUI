<script lang="ts">
  /**
   * SplitLayout template — a two-column work area: the `aside` (the question, the form, the
   * settings) stays in view while the results in `children` scroll. Folds to one column below
   * 960px. The sticky aside clears the page's sticky header (`--page-top`, set by Page).
   *
   *   <SplitLayout>{#snippet aside()}<Card>…question…</Card>{/snippet}…results…</SplitLayout>
   */
  import type { Snippet } from 'svelte';
  import { space, type Space } from '../layout/space';

  interface Props {
    /** Width of the aside column, e.g. "24rem" or "38%". */
    asideWidth?: string;
    /** The aside stays in view while the results scroll. */
    sticky?: boolean;
    /** The aside on the right instead of the left. */
    reverse?: boolean;
    /** Gap between the columns and between the children of each. */
    gap?: Space;
    aside: Snippet;
    children: Snippet;
  }

  let {
    asideWidth = 'minmax(20rem, 2fr)',
    sticky = true,
    reverse = false,
    gap = 'md',
    aside,
    children,
  }: Props = $props();
</script>

<div class="split" class:reverse style:--aside={asideWidth} style:--split-gap={space(gap)}>
  <aside class:sticky>{@render aside()}</aside>
  <div class="main">{@render children()}</div>
</div>

<style>
  .split {
    display: grid;
    grid-template-columns: var(--aside) minmax(0, 3fr);
    align-items: start;
    gap: calc(var(--split-gap) + var(--space-2));
    min-width: 0;
  }
  .reverse {
    grid-template-columns: minmax(0, 3fr) var(--aside);
  }
  .reverse aside {
    order: 2;
  }
  aside,
  .main {
    display: flex;
    flex-direction: column;
    gap: var(--split-gap);
    min-width: 0;
  }
  .sticky {
    position: sticky;
    top: calc(var(--page-top, 0px) + var(--space-4));
  }
  @media (max-width: 960px) {
    .split,
    .reverse {
      grid-template-columns: minmax(0, 1fr);
    }
    .reverse aside {
      order: 0;
    }
    .sticky {
      position: static;
    }
  }
</style>
