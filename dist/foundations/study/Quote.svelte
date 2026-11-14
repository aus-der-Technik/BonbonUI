<script lang="ts">
  /**
   * Storybook-only: a short quote from the design literature, set as a pull quote on the
   * ground — serif, a fine tint rule before it, the source underneath. No box: a quote anchors
   * an idea, it is not a thing to act on.
   */
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
  <blockquote><span class="words">“{text}”</span></blockquote>
  <figcaption>
    <span class="author">{author}</span>{#if source}<span class="source">{source}</span>{/if}
  </figcaption>
</figure>

<style>
  .quote {
    display: grid;
    gap: var(--space-3);
    margin: var(--space-4) 0;
  }
  .quote::before {
    content: '';
    width: 2.5rem;
    height: 1px;
    background: var(--accent);
  }
  blockquote {
    margin: 0;
  }
  .words {
    display: block;
    font-family: var(--font-serif);
    font-size: clamp(1.45rem, 0.9vw + 1.15rem, 1.9rem);
    font-weight: var(--fw-regular);
    line-height: 1.28;
    letter-spacing: -0.01em;
    max-width: 26ch;
    color: var(--text);
    text-wrap: balance;
  }
  figcaption {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .author {
    color: var(--text-2);
    font-weight: var(--fw-semibold);
  }
  .source::before {
    content: '\00a0·\00a0';
  }
</style>
