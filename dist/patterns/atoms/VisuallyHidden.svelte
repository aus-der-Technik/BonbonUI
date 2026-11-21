<script lang="ts">
  /**
   * VisuallyHidden atom — text for assistive tech only, e.g. the meaning of an icon.
   *
   *   <Icon name="lock" /><VisuallyHidden>Read-only</VisuallyHidden>
   */
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<span class="sr-only">{@render children()}</span>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>
