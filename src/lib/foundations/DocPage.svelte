<script lang="ts">
  /**
   * Storybook-only frame for the readable "Introduction" chapter: an Application with a
   * medium-width Page and prose typography, so the docs look like the library itself.
   */
  import type { Snippet } from 'svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Page from '../patterns/templates/Page.svelte';

  interface Props {
    eyebrow?: string;
    title: string;
    lead?: string | undefined;
    children: Snippet;
  }

  let { eyebrow = 'Introduction', title, lead, children }: Props = $props();
</script>

<Application>
  <Page width="medium" gap="xl">
    <header class="doc-head">
      <p class="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {#if lead}<p class="lead">{lead}</p>{/if}
    </header>
    <div class="prose">{@render children()}</div>
  </Page>
</Application>

<style>
  .doc-head {
    display: grid;
    gap: var(--space-3);
    padding-top: var(--space-8);
  }
  .eyebrow {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  h1 {
    font-size: clamp(2rem, 3vw + 1rem, 3.25rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    font-weight: var(--fw-bold);
  }
  .lead {
    max-width: 60ch;
    font-size: var(--fs-xl);
    color: var(--text-2);
  }
  .prose {
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
  }
  .prose :global(h2) {
    font-size: var(--fs-3xl);
    font-weight: var(--fw-bold);
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .prose :global(h3) {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .prose :global(p),
  .prose :global(li) {
    max-width: 68ch;
    color: var(--text-2);
    font-size: var(--fs-base);
    line-height: 1.65;
  }
  .prose :global(ul),
  .prose :global(ol) {
    padding-left: 1.25rem;
    display: grid;
    gap: var(--space-1);
  }
  .prose :global(strong) {
    color: var(--text);
  }
  .prose :global(:not(pre) > code) {
    font-family: var(--font-mono);
    font-size: 0.88em;
    padding: 0.1em 0.4em;
    border-radius: var(--radius-xs);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .prose :global(a) {
    color: var(--accent-ink);
  }
</style>
