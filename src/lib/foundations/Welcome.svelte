<script lang="ts">
  /** Storybook-only: the first page of the docs — what BonbonUI is and how it is organised. */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import type { IconName } from '../patterns/atoms/icons';
  import { welcomeExample } from './snippets';

  const principles: { icon: IconName; title: string; text: string }[] = [
    {
      icon: 'layers',
      title: 'Four layers',
      text: 'Every surface is ground, panel, selected or front. Front elements float as liquid glass and are always sticky.',
    },
    {
      icon: 'palette',
      title: 'One tint',
      text: 'Pick one colour. Accents, selections, focus rings, gradients and the drifting backdrop are all computed from it.',
    },
    {
      icon: 'layout',
      title: 'Auto layout',
      text: 'Page, Section, Stack, Row and Grid space and align their children, so edges line up without margins or wrapper divs.',
    },
    {
      icon: 'bolt',
      title: 'Props in, callbacks out',
      text: 'Components fetch, store and route nothing. Data comes in as props; actions leave as callbacks that may return a promise.',
    },
  ];

  const chapters: { icon: IconName; title: string; text: string }[] = [
    {
      icon: 'sparkles',
      title: 'Introduction',
      text: 'This chapter: getting started, the layers, colour & tint, layout, recipes, tokens.',
    },
    {
      icon: 'window',
      title: 'Pages',
      text: 'Complete screens — dashboards, tools, websites, shops, collaboration, a desktop OS.',
    },
    {
      icon: 'layout',
      title: 'Templates',
      text: 'Application and Page — the theme root and the frame of every screen.',
    },
    {
      icon: 'grid',
      title: 'Layout',
      text: 'Stack, Row, Grid, Spacer, Layer and Section — the auto-layout helpers.',
    },
    {
      icon: 'kanban',
      title: 'Organisms',
      text: 'Sections of a page: headers, tables, charts, boards, windows, docks.',
    },
    {
      icon: 'list',
      title: 'Molecules → Atoms',
      text: 'Smaller groups (tabs, pickers, fields) down to single elements (buttons, icons).',
    },
  ];
</script>

<DocPage
  eyebrow="BonbonUI"
  title="Candy-glass interfaces for every occasion."
  lead="BonbonUI is a Svelte 5 + TypeScript design system. Dashboards, admin tools, websites, shops, collaborative apps and desktop-style software all share one visual language: frosted and liquid glass, generous rounding, one tint colour, and a layout system that makes it hard to build an ugly page."
>
  <Section title="Four ideas carry the whole system" layout="grid" min="14rem">
    {#each principles as p (p.title)}
      <Layer level="panel" gap="sm">
        <span class="badge"><Icon name={p.icon} size={20} /></span>
        <h3>{p.title}</h3>
        <p>{p.text}</p>
      </Layer>
    {/each}
  </Section>

  <Section
    title="This is a whole page"
    description="An Application sets the theme, a Page frames the screen, and Section and Grid lay out the content. Copy it, change the tint, and you have a themed screen."
  >
    <CodeBlock label="App.svelte" code={welcomeExample} />
  </Section>

  <Section
    title="How the docs are organised"
    description="From whole to part: start with complete pages, then go down the atomic levels — the reverse of how the code is built."
    layout="grid"
    min="15rem"
  >
    {#each chapters as c (c.title)}
      <Layer level="panel" direction="horizontal" align="start" gap="md">
        <span class="badge"><Icon name={c.icon} size={18} /></span>
        <div>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
        </div>
      </Layer>
    {/each}
  </Section>

  <Section title="Use the toolbar">
    <p>
      Every story reacts to the Storybook toolbar: <strong>Theme</strong> (light, dark, follow the
      OS), <strong>Tint</strong>, <strong>Radius</strong> and <strong>Density</strong>. They set the
      same values <code>&lt;Application&gt;</code> sets in a real app, so what you see is what you ship.
    </p>
    <Row gap="sm">
      <span class="pill">Theme</span><span class="pill">Tint</span><span class="pill">Radius</span
      ><span class="pill">Density</span>
    </Row>
  </Section>
</DocPage>

<style>
  .badge {
    display: inline-grid;
    place-items: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    background: linear-gradient(160deg, var(--accent), var(--accent-strong));
    color: var(--on-accent);
    box-shadow:
      0 6px 16px color-mix(in srgb, var(--tint) 35%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.45);
  }
  h3 {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  p {
    font-size: var(--fs-md);
    color: var(--text-2);
  }
  .pill {
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--layer-front-bg);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--shadow-frosted);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
</style>
