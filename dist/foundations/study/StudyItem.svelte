<script lang="ts">
  /**
   * Storybook-only: one entry of a StudyList — a small label, the term, its explanation and an
   * optional note (where to see it, what the system took from it).
   */
  import type { Snippet } from 'svelte';

  interface Props {
    term: string;
    /** Small caps line above the term: a date, a place, a kind. */
    meta?: string | undefined;
    /** Plain explanation; use `children` instead for rich text. */
    text?: string | undefined;
    /** A last line in the tint, e.g. where to see it. */
    note?: string | undefined;
    children?: Snippet | undefined;
  }
  let { term, meta, text, note, children }: Props = $props();
</script>

<div class="item">
  <dt>
    {#if meta}<span class="meta">{meta}</span>{/if}
    <span class="term">{term}</span>
  </dt>
  <dd class="text">
    {#if children}{@render children()}{:else}{text}{/if}
  </dd>
  {#if note}<dd class="note">{note}</dd>{/if}
</div>

<style>
  .item {
    display: grid;
    align-content: start;
    gap: var(--space-2);
    padding: var(--space-4) 0 var(--space-5);
    border-top: 1px solid var(--border-strong);
    counter-increment: study-item;
  }
  dt {
    display: grid;
    gap: var(--space-1);
  }
  :global(.numbered) > .item dt::before {
    content: counter(study-item);
    font-family: var(--font-serif);
    font-size: var(--fs-3xl);
    line-height: 1;
    color: var(--accent-ink);
  }
  .meta {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .term {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    line-height: 1.35;
    color: var(--text);
  }
  dd {
    margin: 0;
  }
  .text {
    font-size: var(--fs-md);
    line-height: var(--leading-body);
    color: var(--text-2);
  }
  .note {
    font-size: var(--fs-sm);
    line-height: 1.5;
    color: var(--accent-ink);
  }
</style>
