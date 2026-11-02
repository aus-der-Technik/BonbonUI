<script lang="ts">
  /** Storybook-only: the rules every component follows (and yours should too). */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';

  const rules = [
    {
      title: 'Props in, callbacks out',
      text: 'Components never fetch, store or route. Data comes in as props; user actions leave as callbacks (onsave, onsearch, onmove…). A callback may return a promise — the component then shows busy, saved or failed by itself.',
    },
    {
      title: 'Every text can be replaced',
      text: 'Visible text defaults to English and always has a prop to override it (labels, empty texts, button captions), so apps can translate without forking.',
    },
    {
      title: 'Tokens, not values',
      text: 'Colours, radii, spacing, type and shadows come from tokens.css. That is what makes tint, theme, radius and density work everywhere — including in your own components.',
    },
    {
      title: 'Accent means "this", danger means "careful"',
      text: 'The accent marks the primary action and the current selection. Destructive and failed states use --danger, which never follows the tint.',
    },
    {
      title: 'Front is sticky',
      text: 'Anything on the front layer — headers, toolbars, docks, menu bars, floating actions — sticks to the viewport. Overlays (dialogs, menus, toasts) are not layers.',
    },
    {
      title: 'Accessible by default',
      text: 'Real buttons and links, labelled controls, visible focus rings, keyboard support for every interaction, reduced motion and reduced transparency respected.',
    },
    {
      title: 'Snippets for slots',
      text: 'Composite components take Svelte 5 snippets for their slots (actions, footer, sidebar…), typed and optional.',
    },
    {
      title: 'Neutral examples',
      text: 'Stories and mock data use fictional names and example.com addresses, and describe a pattern by what it does.',
    },
  ];
</script>

<DocPage
  title="Conventions"
  lead="Eight rules every component follows. Keep to them in your own components and they will sit next to the library's without a seam."
>
  <Section layout="grid" min="18rem">
    {#each rules as r, i (r.title)}
      <Layer level="panel" gap="xs">
        <span class="n">{String(i + 1).padStart(2, '0')}</span>
        <h3>{r.title}</h3>
        <p>{r.text}</p>
      </Layer>
    {/each}
  </Section>
</DocPage>

<style>
  .n {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
    color: var(--accent-ink);
  }
  h3 {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
  }
  p {
    font-size: var(--fs-md);
  }
</style>
