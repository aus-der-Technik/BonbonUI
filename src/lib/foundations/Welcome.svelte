<script lang="ts">
  /** Storybook-only: the first page of the docs — what BonbonUI is and how the docs are laid out. */
  import DocPage from './DocPage.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import NavRail from '../patterns/organisms/NavRail.svelte';
  import { welcomeExample } from './snippets';
  import { chapterHref, storyHref } from './study/links';

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

  const news: IntroItem[] = [
    {
      term: 'Calmer ground',
      text: 'Panels are solid tiles, used sparingly. Glass is kept for what floats: the front layer, overlays, and panels over a photo.',
      href: storyHref('introduction-layers--layers'),
    },
    {
      term: 'Liquid motion',
      text: 'Selection marks flow from item to item, and a press moves what its layer touches: the page, a panel, or only the glass.',
      href: storyHref('introduction-design-language--design-language'),
    },
    {
      term: 'Light',
      text: 'What is on or chosen casts its tint onto the surfaces around it. No setting needed.',
      href: storyHref('introduction-light--light'),
    },
    {
      term: 'New parts',
      text: '`NavRail`, `ArcGauge`, `DotMatrix`, `Card surface="ink"`, `Button variant="soft"` and `shimmer`, and more than twenty example pages.',
      href: chapterHref('the-examples'),
    },
  ];

  const chapters: IntroItem[] = [
    {
      term: 'Introduction',
      text: 'This chapter: the design language, layers, light, colour, layout, recipes and tokens.',
    },
    {
      term: 'Design study',
      text: 'Why it looks like this: four principles, the research behind them, every element, and the corrections made on the way.',
      href: chapterHref('overview'),
    },
    {
      term: 'Pages',
      text: 'Complete example applications, from a landing page to a desktop OS, each with design notes.',
      href: chapterHref('the-examples'),
    },
    { term: 'Templates', text: '`Application` and `Page`: the theme root and the screen frame.' },
    { term: 'Layout', text: '`Stack`, `Row`, `Grid`, `Spacer`, `Layer` and `Section`.' },
    {
      term: 'Organisms',
      text: 'Parts of a page: headers, tables, charts, boards, windows, docks.',
    },
    {
      term: 'Molecules, Atoms',
      text: 'Smaller groups, such as tabs, pickers and fields, down to single buttons and icons.',
    },
  ];

  const toolbar: IntroItem[] = [
    { term: 'Theme', text: 'Light, dark, or follow the system.' },
    { term: 'Tint', text: 'The one colour everything is computed from.' },
    { term: 'Radius', text: 'Square, soft or round corners on every part.' },
    { term: 'Density', text: 'Compact for tools, comfortable for touch and websites.' },
  ];

  let rail = $state('home');
  const railItems = [
    { id: 'home', label: 'Overview', icon: 'home' as const },
    { id: 'calendar', label: 'Schedule', icon: 'calendar' as const },
    { id: 'activity', label: 'Activity', icon: 'activity' as const },
  ];
</script>

<DocPage
  eyebrow="BonbonUI"
  title="Calm interfaces, with a little candy."
  lead="A Svelte 5 design system for dashboards, tools, websites, shops and desktop-style apps: calm ground, one tint colour, and glass only where something floats."
>
  <Section title="Five ideas">
    <p>Everything else in the system follows from these.</p>
    <IntroList items={ideas} />
  </Section>

  <Section title="A whole page">
    <p>
      An <code>Application</code> sets the theme, a <code>Page</code> frames the screen, and
      <code>Section</code> and <code>Grid</code> lay out the rest. This is all of it.
    </p>
    <div class="pair">
      <CodeBlock label="App.svelte" code={welcomeExample} />
      <IntroDemo kind="window" height="100%">
        <Application tint="#007aff" contained>
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

  <Section title="New in 1.5">
    <p>The latest release made the ground calmer and the interface livelier.</p>
    <IntroDemo caption="Pick another place on the rail, and press the keys: the light follows.">
      <NavRail items={railItems} bind:current={rail} orientation="horizontal" label="Demo" />
      <Button variant="primary" shimmer icon="play" label="Start" />
      <Card surface="ink" padding="md">
        <span class="ink"><DotMatrix value="21:30" label="21:30" size="lg" /></span>
      </Card>
    </IntroDemo>
    <IntroList items={news} />
  </Section>

  <Section title="How the docs are organised">
    <p>
      From whole to part: complete pages first, then down the atomic levels. It is the reverse of
      how the code is built.
    </p>
    <IntroList items={chapters} />
    <p>
      Not a designer? Start with the <a href={chapterHref('overview')} target="_top">Design study</a
      >: nine short chapters that explain every decision in plain words, with experiments to try.
    </p>
  </Section>

  <Section title="Use the toolbar">
    <p>
      Every story follows the Storybook toolbar. It sets the same values <code>Application</code> sets
      in a real app, so what you see is what you ship.
    </p>
    <IntroList items={toolbar} />
  </Section>
</DocPage>

<style>
  .pair {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
    gap: var(--space-4);
    align-items: stretch;
  }
  .pair :global(.demo) {
    min-height: 20rem;
  }
  .ink {
    display: block;
    color: var(--accent);
  }
</style>
