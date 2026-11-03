<script lang="ts">
  /**
   * Storybook-only: the frame of one study chapter — the handbook page (DocPage) plus a
   * "previous / next" pair at the end, so the study reads cover to cover.
   */
  import type { Snippet } from 'svelte';
  import DocPage from '../DocPage.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';
  import { chapterHref, chapters, type ChapterSlug } from './links';

  interface Props {
    slug: ChapterSlug;
    title: string;
    lead?: string | undefined;
    children: Snippet;
  }

  let { slug, title, lead, children }: Props = $props();

  const index = $derived(chapters.findIndex((c) => c.slug === slug));
  const prev = $derived(index > 0 ? chapters[index - 1] : undefined);
  const next = $derived(chapters[index + 1]);
  const eyebrow = $derived(
    index === 0 ? 'Design study' : `Design study · ${index} of ${chapters.length - 1}`,
  );
</script>

<DocPage {eyebrow} {title} {lead}>
  {@render children()}
  <nav class="pager" aria-label="Study chapters">
    {#if prev}
      <a class="step prev" href={chapterHref(prev.slug)} target="_top">
        <span class="dir"><Icon name="arrow-left" size={14} /> Previous</span>
        <strong>{prev.title}</strong>
      </a>
    {:else}<span></span>{/if}
    {#if next}
      <a class="step next" href={chapterHref(next.slug)} target="_top">
        <span class="dir">Next <Icon name="arrow-right" size={14} /></span>
        <strong>{next.title}</strong>
        <span class="blurb">{next.blurb}</span>
      </a>
    {/if}
  </nav>
</DocPage>

<style>
  .pager {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
    padding: var(--space-8) 0 var(--space-12);
    border-top: 1px solid var(--border-strong);
  }
  .step {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-4) var(--space-5);
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    border: 0.75px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    color: var(--text);
    text-decoration: none;
    transition:
      transform var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out);
  }
  .step:hover {
    transform: translateY(-2px);
  }
  .step:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .next {
    text-align: right;
    justify-items: end;
    grid-column: 2;
  }
  .dir {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .blurb {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  @media (max-width: 640px) {
    .pager {
      grid-template-columns: 1fr;
    }
    .next {
      grid-column: 1;
    }
  }
</style>
