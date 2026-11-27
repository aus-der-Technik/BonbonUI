<script lang="ts">
  /**
   * Storybook-only: a definition list on the ground — terms in columns, each under a hairline.
   * It replaces a grid of cards: grouping by space and a fine rule, not by boxes. Fill it with
   * StudyItem.
   */
  import type { Snippet } from 'svelte';

  interface Props {
    /** Narrowest a column may get before the list wraps to fewer columns. */
    min?: string;
    /** Number the items with serif numerals. */
    numbered?: boolean;
    children: Snippet;
  }
  let { min = '16rem', numbered = false, children }: Props = $props();
</script>

<dl class="study-list" class:numbered style:--list-min={min}>
  {@render children()}
</dl>

<style>
  .study-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--list-min)), 1fr));
    gap: var(--space-2) var(--space-8);
    margin: 0;
    counter-reset: study-item;
  }
</style>
