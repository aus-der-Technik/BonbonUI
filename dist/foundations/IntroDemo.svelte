<script lang="ts">
  /**
   * Storybook-only: the frame around a live example. `stage` is a quiet hairline outline on the
   * ground (the example stays on the page's own layers, so presses and light behave as in an
   * app); `window` clips a contained Application to a fixed height, like a screen.
   */
  import type { Snippet } from 'svelte';

  interface Props {
    kind?: 'stage' | 'window';
    /** Window height (any CSS length). */
    height?: string;
    /** One quiet line under the example: what to try. */
    caption?: string | undefined;
    /** Stage only: how the example is placed. */
    align?: 'center' | 'start' | 'stretch';
    children: Snippet;
  }

  let { kind = 'stage', height = '26rem', caption, align = 'center', children }: Props = $props();
</script>

<figure class="demo">
  <div
    class="frame frame--{kind} frame--{align}"
    style:height={kind === 'window' ? height : undefined}
  >
    {@render children()}
  </div>
  {#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>

<style>
  .demo {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    min-width: 0;
  }
  .frame {
    min-width: 0;
    border-radius: var(--radius-card);
  }
  .frame--stage {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    padding: var(--space-8) var(--space-6);
    border: 1px solid var(--border);
  }
  .frame--center {
    align-items: center;
    justify-content: center;
  }
  .frame--start {
    align-items: center;
    justify-content: flex-start;
  }
  .frame--stretch {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
  }
  .frame--window {
    overflow: clip;
    border: 1px solid var(--border-strong);
    box-shadow: var(--panel-shadow);
  }
  /* A Page nested in the docs' own Page would inherit its aside column (Page's layout rules
     match any ancestor): an example without sidebar or aside gets its single column back. */
  .frame--window :global(.page:not(.has-aside):not(.has-sidebar) > .body) {
    grid-template-columns: minmax(0, 1fr);
  }
  figcaption {
    max-width: 62ch;
    font-size: var(--fs-sm);
    line-height: 1.5;
    color: var(--text-3);
  }
</style>
