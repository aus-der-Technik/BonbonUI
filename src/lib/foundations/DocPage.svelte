<script lang="ts">
  /**
   * Storybook-only frame of a handbook page (the Introduction and the Design study): an
   * Application with a calm editorial page — a serif title and lead on the ground, sections
   * divided by hairlines, an "On this page" list that follows the reader on wide screens, and
   * previous / next at the end, so a chapter reads cover to cover.
   */
  import type { Snippet } from 'svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import { introPager, type PagerStep } from './intro';

  interface Props {
    eyebrow?: string;
    title: string;
    lead?: string | undefined;
    /** Previous / next at the end; Introduction pages find theirs by their title. */
    pager?: { prev?: PagerStep | undefined; next?: PagerStep | undefined } | undefined;
    children: Snippet;
  }

  let { eyebrow = 'Introduction', title, lead, pager, children }: Props = $props();

  const steps = $derived(pager ?? introPager(title));

  let prose = $state<HTMLElement>();
  let sections = $state<{ id: string; text: string }[]>([]);
  let current = $state('');

  const slug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  // The contents list is read from the page's own section headings, so it never goes stale.
  $effect(() => {
    if (!prose) return;
    const headings = [...prose.querySelectorAll<HTMLElement>('h2')];
    const seen: string[] = [];
    sections = headings.map((h) => {
      let id = h.id || slug(h.textContent ?? '');
      while (seen.includes(id)) id += '-2';
      seen.push(id);
      h.id = id;
      return { id, text: h.textContent?.trim() ?? '' };
    });
    if (!headings.length) return;
    // The current section is the last one whose heading has passed the top third of the
    // screen: right for long sections too, not only while a heading crosses a line.
    let frame = 0;
    const mark = () => {
      frame = 0;
      const line = (window.innerHeight || 800) * 0.3;
      let at = headings[0]!.id;
      for (const h of headings) if (h.getBoundingClientRect().top <= line) at = h.id;
      current = at;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(mark);
    };
    mark();
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      cancelAnimationFrame(frame);
    };
  });
</script>

<Application>
  <Page width="medium" gap="xl" asideWidth="13rem">
    <header class="doc-head">
      <p class="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {#if lead}<p class="lead">{lead}</p>{/if}
    </header>
    <div class="prose" bind:this={prose}>{@render children()}</div>

    {#if steps.prev || steps.next}
      <nav class="pager" aria-label="Chapters">
        {#if steps.prev}
          <a class="step" href={steps.prev.href} target="_top">
            <span class="dir"><Icon name="arrow-left" size={14} /> Previous</span>
            <strong>{steps.prev.title}</strong>
          </a>
        {:else}<span></span>{/if}
        {#if steps.next}
          <a class="step step--next" href={steps.next.href} target="_top">
            <span class="dir">Next <Icon name="arrow-right" size={14} /></span>
            <strong>{steps.next.title}</strong>
            {#if steps.next.blurb}<span class="blurb">{steps.next.blurb}</span>{/if}
          </a>
        {/if}
      </nav>
    {/if}

    {#snippet aside()}
      {#if sections.length > 1}
        <nav class="toc" aria-label="On this page">
          <p class="toc-title">On this page</p>
          <ol>
            {#each sections as s (s.id)}
              <li>
                <a href="#{s.id}" aria-current={s.id === current ? 'location' : undefined}
                  >{s.text}</a
                >
              </li>
            {/each}
          </ol>
        </nav>
      {/if}
    {/snippet}
  </Page>
</Application>

<style>
  /* ── The head: a serif title and lead on the ground, a fine rule before the label ───── */
  .doc-head {
    display: grid;
    gap: var(--space-4);
    padding: var(--space-12) 0 var(--space-10);
    border-bottom: 1px solid var(--border-strong);
  }
  .eyebrow {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .eyebrow::before {
    content: '';
    width: 2.5rem;
    height: 1px;
    background: var(--accent);
  }
  h1 {
    font-family: var(--font-serif);
    font-size: clamp(2.6rem, 3.5vw + 1.2rem, 4.4rem);
    font-weight: var(--fw-regular);
    line-height: 1.02;
    letter-spacing: -0.02em;
  }
  .lead {
    max-width: 48ch;
    font-family: var(--font-serif);
    font-size: clamp(1.15rem, 0.6vw + 1rem, 1.4rem);
    line-height: 1.5;
    color: var(--text-2);
  }

  /* ── The body: sections divided by hairlines, plain text set for reading ─────────────── */
  .prose {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
  }
  .prose > :global(section + section) {
    padding-top: var(--space-12);
    border-top: 1px solid var(--border-strong);
  }
  .prose :global(h2) {
    font-family: var(--font-serif);
    font-size: clamp(1.7rem, 1vw + 1.3rem, 2.2rem);
    font-weight: var(--fw-regular);
    letter-spacing: -0.015em;
    line-height: 1.15;
    scroll-margin-top: var(--space-8);
  }
  .prose :global(h3) {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  /* Prose rules are for plain text only: lists with a class belong to a component (a rail, a
     menu) and keep their own layout. */
  .prose :global(p),
  .prose :global(:is(ul, ol):not([class]) > li) {
    max-width: 66ch;
    color: var(--text-2);
    font-size: var(--fs-base);
    line-height: var(--leading-body);
  }
  .prose :global(ul:not([class])),
  .prose :global(ol:not([class])) {
    padding-left: 1.25rem;
    display: grid;
    gap: var(--space-2);
  }
  .prose :global(strong) {
    color: var(--text);
  }
  .prose :global(:not(pre) > code) {
    font-family: var(--font-mono);
    font-size: 0.86em;
    padding: 0.1em 0.4em;
    border-radius: var(--radius-xs);
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  /* Plain links only: a link-button (`Button href`) keeps its own colours. */
  .prose :global(a:not([class])) {
    color: var(--accent-ink);
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }

  /* ── On this page: quiet, on the ground, the current section marked in the tint ─────── */
  .toc {
    padding-top: calc(var(--space-12) + var(--space-10));
  }
  .toc-title {
    margin-bottom: var(--space-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .toc ol {
    display: grid;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
    border-left: 1px solid var(--border-strong);
  }
  .toc a {
    display: block;
    margin-left: -1px;
    padding: var(--space-1) var(--space-3);
    border-left: 1px solid transparent;
    color: var(--text-2);
    font-size: var(--fs-sm);
    line-height: 1.4;
    text-decoration: none;
    transition:
      color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out);
  }
  .toc a:hover {
    color: var(--text);
  }
  .toc a[aria-current='location'] {
    color: var(--accent-ink);
    border-left-color: var(--accent);
  }
  /* Under the content the list would only repeat the page: it is for wide screens. */
  @media (max-width: 1100px) {
    .toc {
      display: none;
    }
  }

  /* ── Previous / next: two quiet links on a hairline, the next one with its promise ──── */
  .pager {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
    padding: var(--space-8) 0 var(--space-12);
    border-top: 1px solid var(--border-strong);
  }
  @media (max-width: 640px) {
    .pager {
      grid-template-columns: 1fr;
    }
  }
  .step {
    display: grid;
    align-content: start;
    gap: var(--space-1);
    color: var(--text);
    text-decoration: none;
  }
  .step--next {
    text-align: right;
    justify-items: end;
  }
  .dir {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-xs);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .step strong {
    font-family: var(--font-serif);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-regular);
    transition: color var(--motion-quick) var(--ease-out);
  }
  .step:hover strong {
    color: var(--accent-ink);
  }
  .step:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
  }
  .blurb {
    max-width: 32ch;
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
</style>
