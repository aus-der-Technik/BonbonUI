<script lang="ts">
  /**
   * Markdown molecule — renders markdown as sanitized, styled prose (headings, lists, code,
   * quotes, scrollable tables). For a streamed answer keep passing the growing `source`: it
   * re-renders at most once per animation frame, and `streaming` shows a blinking caret.
   * `placeholder` shows while there is nothing yet. Links and quotes take the accent.
   *
   *   <Markdown source={answer} streaming={loading} placeholder="The answer appears here." />
   */
  import { renderMarkdown } from '../../utils/markdown';

  interface Props {
    source: string;
    streaming?: boolean;
    placeholder?: string | undefined;
    /** Render as preformatted plain text instead (e.g. an error that arrived before any answer). */
    plain?: boolean;
    size?: 'sm' | 'md';
  }

  let { source, streaming = false, placeholder, plain = false, size = 'md' }: Props = $props();

  let html = $state('');
  let frame = 0;

  $effect(() => {
    const text = source;
    if (plain) return;
    // Coalesce bursts of deltas into one parse per frame.
    cancelAnimationFrame(frame);
    if (!streaming) {
      html = renderMarkdown(text);
      return;
    }
    frame = requestAnimationFrame(() => (html = renderMarkdown(text)));
    return () => cancelAnimationFrame(frame);
  });
</script>

<div class="prose prose--{size}" class:streaming aria-busy={streaming ? 'true' : undefined}>
  {#if !source && placeholder}
    <p class="placeholder">{placeholder}</p>
  {:else if plain}
    <pre class="plain">{source}</pre>
  {:else}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- sanitized by renderMarkdown (DOMPurify) -->
    {@html html}
  {/if}
</div>

<style>
  .prose {
    color: var(--text);
    line-height: 1.6;
    overflow-wrap: anywhere;
  }
  .prose--md {
    font-size: var(--fs-base);
  }
  .prose--sm {
    font-size: var(--fs-md);
  }
  .placeholder {
    color: var(--text-3);
    font-style: italic;
  }
  .plain {
    margin: 0;
    font: inherit;
    white-space: pre-wrap;
  }
  .prose :global(> :first-child) {
    margin-top: 0;
  }
  .prose :global(> :last-child) {
    margin-bottom: 0;
  }
  .prose :global(:is(h1, h2, h3, h4, h5, h6)) {
    margin: 1.2em 0 0.5em;
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.3;
  }
  .prose :global(h1) {
    font-size: 1.4em;
  }
  .prose :global(h2) {
    font-size: 1.25em;
  }
  .prose :global(h3) {
    font-size: 1.1em;
  }
  .prose :global(:is(h4, h5, h6)) {
    font-size: 1em;
  }
  .prose :global(:is(p, ul, ol, blockquote, pre, table)) {
    margin: 0 0 0.85em;
  }
  .prose :global(:is(ul, ol)) {
    padding-left: 1.4em;
  }
  .prose :global(li + li) {
    margin-top: 0.25em;
  }
  .prose :global(a) {
    color: var(--accent-ink);
    font-weight: var(--fw-medium);
    text-decoration: underline;
    text-decoration-color: var(--accent-border);
    text-underline-offset: 2px;
  }
  .prose :global(a:hover) {
    text-decoration-color: currentColor;
  }
  .prose :global(code) {
    padding: 0.1em 0.35em;
    border-radius: var(--radius-xs);
    background: var(--fill-muted);
    font-family: var(--font-mono);
    font-size: 0.88em;
  }
  .prose :global(pre) {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-strong);
    background: var(--fill-subtle);
    overflow-x: auto;
  }
  .prose :global(pre code) {
    padding: 0;
    background: none;
  }
  .prose :global(blockquote) {
    padding: var(--space-2) var(--space-4);
    border-left: 3px solid var(--accent);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    background: var(--accent-faint);
    color: var(--text-2);
  }
  .prose :global(table) {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    border-collapse: collapse;
    font-size: 0.92em;
  }
  .prose :global(:is(th, td)) {
    padding: 0.4em 0.75em;
    border: 1px solid var(--border-strong);
    text-align: left;
  }
  .prose :global(th) {
    background: var(--fill-subtle);
    font-weight: var(--fw-semibold);
  }
  .prose :global(hr) {
    border: 0;
    border-top: 1px solid var(--border-strong);
    margin: 1.2em 0;
  }
  .prose :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
  }
  .streaming :global(> :last-child::after) {
    content: '';
    display: inline-block;
    width: 0.5em;
    height: 1em;
    margin-left: 0.15em;
    vertical-align: -0.12em;
    border-radius: 2px;
    background: var(--accent);
    animation: blink 1s steps(2, start) infinite;
  }
  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .streaming :global(> :last-child::after) {
      animation: none;
    }
  }
</style>
