<script lang="ts">
  /** Storybook-only: one numbered rule of the design language — the rule, its reason, a live example. */
  import type { Snippet } from 'svelte';
  import IntroRich from './IntroRich.svelte';

  interface Props {
    n: number;
    title: string;
    /** The reason, in a sentence or three; `backticked` parts are set as code. */
    text: string;
    children?: Snippet | undefined;
  }

  let { n, title, text, children }: Props = $props();
</script>

<article class="rule">
  <header>
    <span class="n">Rule {n}</span>
    <h3>{title}</h3>
  </header>
  <div class="text"><IntroRich {text} /></div>
  {#if children}<div class="example">{@render children()}</div>{/if}
</article>

<style>
  .rule {
    display: grid;
    gap: var(--space-3);
  }
  .rule + :global(.rule) {
    margin-top: var(--space-8);
  }
  header {
    display: grid;
    gap: var(--space-1);
  }
  .n {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--accent-ink);
  }
  .text {
    max-width: 66ch;
    color: var(--text-2);
    line-height: var(--leading-body);
  }
  .example {
    margin-top: var(--space-2);
    min-width: 0;
  }
</style>
