<script module lang="ts">
  export interface IntroItem {
    term: string;
    /** Plain text; `backticked` parts are set as code. */
    text: string;
    /** Makes the term a link (to another story: `storyHref`). */
    href?: string | undefined;
    /** A quiet note after the term, e.g. a value or a count. */
    meta?: string | undefined;
  }
</script>

<script lang="ts">
  /**
   * Storybook-only: a definition list on the ground — one hairline between rows, the term on
   * the left and its text on the right (stacked on a phone). It replaces a grid of cards for
   * anything that is only text, so the docs practise "most groups sit on the ground".
   */
  import type { Snippet } from 'svelte';
  import IntroRich from './IntroRich.svelte';

  interface Props {
    items: readonly IntroItem[];
    /** Numbers the rows 01, 02… */
    numbered?: boolean;
    /** `stacked` sets the text under its term (for narrow columns). */
    layout?: 'side' | 'stacked';
    /** A small live figure at the start of each row. */
    figure?: Snippet<[IntroItem, number]> | undefined;
  }

  let { items, numbered = false, layout = 'side', figure }: Props = $props();
</script>

<dl class="list list--{layout}" class:has-figure={!!figure}>
  {#each items as item, i (item.term)}
    <div class="row">
      {#if figure}<div class="figure">{@render figure(item, i)}</div>{/if}
      <dt>
        {#if numbered}<span class="n">{String(i + 1).padStart(2, '0')}</span>{/if}
        {#if item.href}<a href={item.href} target="_top">{item.term}</a>{:else}{item.term}{/if}
        {#if item.meta}<span class="meta">{item.meta}</span>{/if}
      </dt>
      <dd><IntroRich text={item.text} /></dd>
    </div>
  {/each}
</dl>

<style>
  .list {
    display: grid;
    margin: 0;
    border-bottom: 1px solid var(--border);
  }
  /* The section's own hairline follows; a second one right above it would only stutter. */
  .list:last-child {
    border-bottom: 0;
  }
  .row {
    display: grid;
    grid-template-columns: minmax(9rem, 13rem) minmax(0, 1fr);
    gap: var(--space-1) var(--space-8);
    align-items: baseline;
    padding: var(--space-4) 0;
    border-top: 1px solid var(--border);
  }
  .has-figure .row {
    grid-template-columns: 4.5rem minmax(9rem, 12rem) minmax(0, 1fr);
    align-items: center;
  }
  .list--stacked .row {
    grid-template-columns: minmax(0, 1fr);
  }
  .list--stacked.has-figure .row {
    grid-template-columns: 4.5rem minmax(0, 1fr);
  }
  .list--stacked.has-figure .figure {
    grid-row: span 2;
  }
  .figure {
    display: grid;
    place-items: center;
  }
  dt {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-1) var(--space-3);
    color: var(--text);
    font-weight: var(--fw-semibold);
  }
  dd {
    max-width: 62ch;
    margin: 0;
    color: var(--text-2);
    line-height: var(--leading-body);
  }
  .n {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    font-weight: var(--fw-regular);
    color: var(--accent-ink);
  }
  .meta {
    font-size: var(--fs-sm);
    font-weight: var(--fw-regular);
    color: var(--text-3);
  }
  a {
    color: inherit;
    text-decoration: none;
    background: linear-gradient(var(--accent), var(--accent)) left bottom / 0 1px no-repeat;
    transition:
      color var(--motion-quick) var(--ease-out),
      background-size var(--motion-base) var(--ease-out);
  }
  a:hover {
    color: var(--accent-ink);
    background-size: 100% 1px;
  }
  a:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 3px;
    border-radius: var(--radius-xs);
  }
  @media (max-width: 640px) {
    .row,
    .has-figure .row {
      grid-template-columns: minmax(0, 1fr);
    }
    .has-figure .row {
      grid-template-columns: 4.5rem minmax(0, 1fr);
    }
    .has-figure .figure {
      grid-row: span 2;
    }
  }
</style>
