<script lang="ts">
  /**
   * Storybook-only: the first page of the docs — a welcome with pictures of real BonbonUI
   * screens (captured from the example pages), the ideas behind it, a first page in code and
   * where to go next.
   */
  import DocPage from './DocPage.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import { introPager } from './intro';
  import { welcomeExample } from './snippets';
  import { chapterHref, storyHref } from './study/links';
  import { prefersReducedMotion } from '../utils/motion';
  import smartHome from './assets/welcome-smart-home.jpg';
  import residence from './assets/welcome-residence.jpg';
  import climate from './assets/welcome-climate.jpg';
  import admin from './assets/welcome-admin.jpg';
  import music from './assets/welcome-music.jpg';
  import sea from './assets/welcome-sea.jpg';
  import review from './assets/welcome-review.jpg';
  import toolbarShot from './assets/welcome-toolbar.png';
  import TintPicker from './TintPicker.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Switch from '../patterns/atoms/Switch.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import meals from './assets/welcome-meals.jpg';
  import type { IconName } from '../patterns/atoms/icons';

  // Real screens, captured from the example pages: what you see is what the library draws.
  const gallery = [
    {
      name: 'Smart home',
      line: 'Smoked glass over a photo, a glowing arc, one ink tile.',
      image: smartHome,
      id: 'pages-devices--smart-home',
    },
    {
      name: 'Residence',
      line: 'A quiet landing page with one glass drop for a menu.',
      image: residence,
      id: 'pages-website--residence',
    },
    {
      name: 'Climate control',
      line: 'A device screen: readings on the ground, soft keys, a rail.',
      image: climate,
      id: 'pages-devices--climate-control',
    },
    {
      name: 'Admin console',
      line: 'Figures and charts on the ground, tables on panels.',
      image: admin,
      id: 'pages-admin--admin-console',
    },
    {
      name: 'Music player',
      line: 'A dot-matrix clock, round keys and a queue you trim in place.',
      image: music,
      id: 'pages-fun--music-player',
    },
    {
      name: 'Sea traffic',
      line: 'A drawn sea chart with weather and ships that move.',
      image: sea,
      id: 'pages-maritime--sea-traffic',
    },
    {
      name: 'Code review',
      line: 'A diff with comments at the line, in the dark theme.',
      image: review,
      id: 'pages-programming--code-review',
    },
    {
      name: 'Meal planner',
      line: 'A week of meals, recipes that scale and a shopping list.',
      image: meals,
      id: 'pages-private--meal-planner',
    },
  ];

  const ideas: IntroItem[] = [
    {
      term: 'Four layers',
      text: 'Every surface is ground, panel, selected or front. Most content sits on the ground; only the front floats, as glass, and it is always sticky.',
    },
    {
      term: 'One tint',
      text: 'Pick one colour. Accents, selections, focus rings, light and the backdrop grow from it. Status colours stay fixed, so red always means careful.',
    },
    {
      term: 'Auto layout',
      text: '`Page`, `Section`, `Stack`, `Row` and `Grid` space and align their children. No margins, no wrapper divs, and every edge lines up.',
    },
    {
      term: 'It answers back',
      text: 'A press gives a little, a selection flows like thick water, and what is on gives light. `Application` does it for every page.',
    },
    {
      term: 'Props in, callbacks out',
      text: 'Components fetch, store and route nothing. Data comes in as props; actions leave as callbacks, which may return a promise.',
    },
  ];

  const paths: { icon: IconName; title: string; text: string; href: string }[] = [
    {
      icon: 'book',
      title: 'Learn the system',
      text: 'The design language, layers, light, colour and layout, one page each.',
      href: storyHref('introduction-design-language--design-language'),
    },
    {
      icon: 'grid',
      title: 'Explore the parts',
      text: 'Every component on one page, a motion and light lab, a token playground.',
      href: storyHref('explore-component-catalogue--component-catalogue'),
    },
    {
      icon: 'sparkles',
      title: 'Understand the why',
      text: 'The design study: four principles and the research behind every decision.',
      href: chapterHref('overview'),
    },
    {
      icon: 'layout',
      title: 'See it whole',
      text: 'Twenty-three complete example pages, each with its design notes.',
      href: chapterHref('the-examples'),
    },
  ];

  const toolbar: IntroItem[] = [
    { term: 'Theme', text: 'Light, dark, or follow the system.' },
    { term: 'Tint', text: 'The one colour everything is computed from.' },
    { term: 'Radius', text: 'Square, soft or round corners on every part.' },
    { term: 'Density', text: 'Compact for tools, comfortable for touch and websites.' },
  ];

  // The live sample beside the picker: every part of it takes its colour from the tint.
  let alerts = $state(true);
  let view = $state('week');

  // The hero leans a little towards the pointer — the screens have depth, like the UI.
  let tilt = $state({ x: 0, y: 0 });
  function lean(event: PointerEvent) {
    if (prefersReducedMotion()) return;
    const r = (event.currentTarget as HTMLElement).getBoundingClientRect();
    tilt = {
      x: ((event.clientY - r.top) / r.height - 0.5) * -4,
      y: ((event.clientX - r.left) / r.width - 0.5) * 6,
    };
  }
</script>

<DocPage
  eyebrow="Welcome"
  title="Welcome to BonbonUI"
  lead="Calm interfaces with a little candy: a Svelte 5 design system for dashboards, tools, websites, shops and desktop-style apps. Have a look around."
  pager={introPager('Welcome')}
>
  <div
    class="hero"
    role="presentation"
    onpointermove={lean}
    onpointerleave={() => (tilt = { x: 0, y: 0 })}
  >
    <div class="stage" style:--rx="{tilt.x}deg" style:--ry="{tilt.y}deg">
      <img class="shot shot--left" src={residence} alt="" />
      <img class="shot shot--right" src={climate} alt="" />
      <img
        class="shot shot--front"
        src={smartHome}
        alt="A smart-home dashboard built with BonbonUI: smoked glass panels over a house, a temperature arc and device controls."
      />
    </div>
  </div>

  <Section title="Make it yours">
    <p>
      The toolbar above every page sets theme, tint, corners and density for the whole Storybook:
      the same four values an <code>Application</code> sets in your app. Open the brush and pick a colour,
      or pick one right here.
    </p>
    <div class="yours">
      <figure class="toolbar-shot">
        <img
          src={toolbarShot}
          alt="The Storybook toolbar with the tint menu open: Green (default), Mint, Blue, Indigo, Purple, Pink, Red, Orange and Graphite."
        />
        <figcaption>The tint menu in the toolbar, next to theme, corners and density.</figcaption>
      </figure>
      <div class="try">
        <TintPicker />
        <IntroDemo caption="Accents, selections, switches, focus rings and the light all follow.">
          <div class="sample">
            <SegmentedControl
              label="View"
              options={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
              ]}
              bind:value={view}
            />
            <Switch label="Alerts" bind:checked={alerts} />
            <ProgressBar label="Synced" value={64} />
            <Button variant="primary" icon="check" label="Save" />
          </div>
        </IntroDemo>
        <IntroList items={toolbar} />
      </div>
    </div>
  </Section>

  <Section title="A first look">
    <p>Every picture is a real page from this Storybook, built only from the library. Open one.</p>
    <Grid min="16rem" gap="lg">
      {#each gallery as g (g.id)}
        <a class="tile" href={storyHref(g.id)} target="_top">
          <span class="frame"><img src={g.image} alt="" loading="lazy" /></span>
          <span class="tile-name">{g.name}</span>
          <span class="tile-line">{g.line}</span>
        </a>
      {/each}
    </Grid>
  </Section>

  <Section title="What makes it BonbonUI">
    <p>Five ideas. Everything else in the system follows from them.</p>
    <IntroList items={ideas} />
  </Section>

  <Section title="Your first page">
    <p>
      An <code>Application</code> sets the theme, a <code>Page</code> frames the screen, and
      <code>Section</code> and <code>Grid</code> lay out the rest. This is all of it.
    </p>
    <div class="pair">
      <CodeBlock label="App.svelte" code={welcomeExample} />
      <IntroDemo kind="window" height="100%">
        <Application contained>
          <Page title="Team" subtitle="who is in">
            <Section title="Members" heading={3} description="Everyone who can sign in.">
              <Grid min="7rem">
                <Card>Ada</Card>
                <Card selected>Grace</Card>
                <Card>Linus</Card>
              </Grid>
            </Section>
          </Page>
        </Application>
      </IntroDemo>
    </div>
  </Section>

  <Section title="Where to go next">
    <p>Four ways in. Pick the one that sounds like you.</p>
    <div class="paths">
      {#each paths as p (p.title)}
        <a class="path" href={p.href} target="_top">
          <span class="path-icon" aria-hidden="true"><Icon name={p.icon} size={18} /></span>
          <span class="path-title">{p.title} <Icon name="arrow-right" size={14} /></span>
          <span class="path-text">{p.text}</span>
        </a>
      {/each}
    </div>
  </Section>
</DocPage>

<style>
  /* ── The hero: three real screens with depth, the front one dark over a photo ──────── */
  .hero {
    margin-top: var(--space-2);
    padding: var(--space-4) 0 var(--space-8);
  }
  .stage {
    position: relative;
    aspect-ratio: 16 / 8.2;
    perspective: 1800px;
    transform-style: preserve-3d;
    transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    transition: transform var(--motion-lazy) var(--ease-out);
  }
  .shot {
    position: absolute;
    width: 64%;
    height: auto;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: var(--radius-card);
    box-shadow:
      0 30px 60px -30px rgba(12, 12, 22, 0.45),
      0 0 0 1px var(--border-strong);
    background: var(--layer-panel-bg);
  }
  .shot--left {
    top: 2%;
    left: 0;
    width: 52%;
    opacity: 0.92;
    transform: translateZ(-140px) rotateY(9deg);
  }
  .shot--right {
    top: 2%;
    right: 0;
    width: 52%;
    opacity: 0.92;
    transform: translateZ(-140px) rotateY(-9deg);
  }
  .shot--front {
    left: 18%;
    top: 12%;
    transform: translateZ(40px);
    box-shadow:
      0 40px 80px -30px rgba(12, 12, 22, 0.55),
      0 0 0 1px var(--border-strong);
  }
  @media (prefers-reduced-motion: reduce) {
    .stage {
      transition: none;
    }
  }

  /* ── A first look: picture cards on the ground, the picture is the card ────────────── */
  .tile {
    display: grid;
    gap: var(--space-1);
    color: inherit;
    text-decoration: none;
  }
  .frame {
    display: block;
    overflow: hidden;
    margin-bottom: var(--space-2);
    border-radius: var(--radius-lg);
    box-shadow:
      0 18px 36px -24px rgba(12, 12, 22, 0.4),
      0 0 0 1px var(--border-strong);
  }
  .frame img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    transition: transform var(--motion-slow) var(--ease-out);
  }
  .tile:hover .frame img {
    transform: scale(1.03);
  }
  .tile:focus-visible {
    outline: none;
  }
  .tile:focus-visible .frame {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }
  .tile-name {
    font-family: var(--font-serif);
    font-size: var(--fs-2xl);
    color: var(--text);
  }
  .tile-line {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  /* ── Your first page: code beside its result ──────────────────────────────────────── */
  /* ── Make it yours: the real toolbar beside swatches and a live sample ────────────── */
  .yours {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: var(--space-8);
    align-items: start;
  }
  @media (max-width: 860px) {
    .yours {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  .toolbar-shot {
    display: grid;
    gap: var(--space-2);
    margin: 0;
  }
  .toolbar-shot img {
    width: 100%;
    max-width: 28rem;
    height: auto;
    border-radius: var(--radius-card);
    border: 1px solid var(--border);
  }
  .toolbar-shot figcaption {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .try {
    display: grid;
    gap: var(--space-5);
  }
  .sample {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4) var(--space-5);
  }
  .sample > :global(.progress),
  .sample > :global([role='progressbar']) {
    flex: 1 1 10rem;
  }

  .pair {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
    gap: var(--space-4);
    align-items: stretch;
  }
  .pair :global(.demo) {
    min-height: 20rem;
  }

  /* ── Where to go next: four quiet paths divided by hairlines ───────────────────────── */
  .paths {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
    border-top: 1px solid var(--border-strong);
  }
  .path {
    display: grid;
    align-content: start;
    gap: var(--space-2);
    padding: var(--space-5) var(--space-4) var(--space-5) 0;
    border-bottom: 1px solid var(--border-strong);
    color: inherit;
    text-decoration: none;
  }
  .path-icon {
    display: grid;
    place-items: center;
    width: var(--control-md);
    height: var(--control-md);
    border-radius: 50%;
    background: var(--soft-bg);
    box-shadow: var(--soft-shadow);
    color: var(--accent-ink);
  }
  .path-title {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-serif);
    font-size: var(--fs-2xl);
    color: var(--text);
  }
  .path-title :global(.icon) {
    color: var(--accent-ink);
    transition: transform var(--motion-quick) var(--ease-out);
  }
  .path:hover .path-title :global(.icon) {
    transform: translateX(3px);
  }
  .path-text {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .path:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
</style>
