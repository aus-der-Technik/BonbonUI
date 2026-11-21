<script lang="ts">
  /**
   * Storybook-only: the frame of a live demo — the one place the study keeps a panel, because
   * here something is being worked with. An optional caption under it says what to try.
   */
  import type { Snippet } from 'svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import type { Space } from '../../patterns/layout/space';

  interface Props {
    /** What to try, in one short sentence. */
    caption?: string | undefined;
    gap?: Space;
    padding?: Space;
    children: Snippet;
  }
  let { caption, gap = 'md', padding = 'lg', children }: Props = $props();
</script>

<figure class="study-demo">
  <Layer level="panel" {gap} {padding}>
    {@render children()}
  </Layer>
  {#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>

<style>
  .study-demo {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    min-width: 0;
  }
  figcaption {
    padding-left: var(--space-1);
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
</style>
