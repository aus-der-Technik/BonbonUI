<script lang="ts">
  /** Storybook-only: a short quote from the design literature, with its source. */
  interface Props {
    /** The quoted words — keep them short; the study explains, the quote anchors. */
    text: string;
    author: string;
    /** Book, essay or guideline, with year. */
    source?: string;
  }
  let { text, author, source }: Props = $props();
</script>

<figure class="quote">
  <blockquote><p>“{text}”</p></blockquote>
  <figcaption>
    <strong>{author}</strong>{#if source}<span>, {source}</span>{/if}
  </figcaption>
</figure>

<style>
  .quote {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding: var(--space-4) var(--space-5);
    border-left: 3px solid var(--accent);
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    background: var(--accent-faint);
  }
  blockquote {
    margin: 0;
  }
  blockquote p {
    font-size: var(--fs-xl);
    line-height: 1.35;
    font-weight: var(--fw-medium);
    letter-spacing: -0.01em;
    color: var(--text);
  }
  figcaption {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  figcaption strong {
    color: var(--text-2);
  }
</style>
