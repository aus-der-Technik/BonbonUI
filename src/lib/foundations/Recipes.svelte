<script lang="ts">
  /** Storybook-only: copy-paste starters for every kind of app, linked to the full example pages. */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import IntroRich from './IntroRich.svelte';
  import {
    recipeCollab,
    recipeDashboard,
    recipeDesktop,
    recipeDesktopApp,
    recipeDevice,
    recipeShop,
    recipeWebsite,
  } from './snippets';
  import { chapterHref, storyHref } from './study/links';

  const recipes: { title: string; text: string; example: [string, string]; code: string }[] = [
    {
      title: 'Dashboard',
      text: 'Figures and charts on the ground, the table in a panel, a side nav for the sections.',
      example: ['Admin console', 'pages-admin--admin-console'],
      code: recipeDashboard,
    },
    {
      title: 'Website',
      text: 'Your own header (`NavBar`), wide width and big gaps; the sections are ready-made organisms.',
      example: ['Landing page', 'pages-website--landing-page'],
      code: recipeWebsite,
    },
    {
      title: 'Shop',
      text: 'A product grid, a cart in a drawer, and prices that format themselves.',
      example: ['Shop', 'pages-shop--shop'],
      code: recipeShop,
    },
    {
      title: 'Team tool',
      text: 'A `fill` page whose board takes all the room, with presence in the header.',
      example: ['Team workspace', 'pages-collaboration--team-workspace'],
      code: recipeCollab,
    },
    {
      title: 'Device screen',
      text: 'A photo backdrop, a `NavRail`, an ink tile with a `DotMatrix` figure and an `ArcGauge` to set a value.',
      example: ['Smart home', 'pages-devices--smart-home'],
      code: recipeDevice,
    },
    {
      title: 'Desktop application',
      text: 'Toolbar, source list, inspector and status bar around one content area.',
      example: ['Desktop OS', 'pages-desktop--desktop-os'],
      code: recipeDesktopApp,
    },
    {
      title: 'A whole OS',
      text: 'A desktop with a menu bar, a dock and draggable windows, all themed by the Application.',
      example: ['Desktop OS', 'pages-desktop--desktop-os'],
      code: recipeDesktop,
    },
  ];

  const examples: { group: string; pages: [string, string][] }[] = [
    {
      group: 'On the web',
      pages: [
        ['Landing page', 'pages-website--landing-page'],
        ['Residence', 'pages-website--residence'],
        ['Shop', 'pages-shop--shop'],
      ],
    },
    {
      group: 'At work',
      pages: [
        ['Admin console', 'pages-admin--admin-console'],
        ['Team workspace', 'pages-collaboration--team-workspace'],
      ],
    },
    {
      group: 'Productivity',
      pages: [
        ['Document editor', 'pages-productivity-document-editor--document-editor'],
        ['Spreadsheet', 'pages-productivity-spreadsheet--spreadsheet'],
        ['Slide deck', 'pages-productivity-slide-deck--slide-deck'],
      ],
    },
    {
      group: 'Business',
      pages: [
        ['Sales pipeline', 'pages-business--sales-pipeline'],
        ['Invoicing', 'pages-business--invoicing'],
        ['Service desk', 'pages-enterprise--service-desk'],
      ],
    },
    {
      group: 'Programming and data',
      pages: [
        ['Deployments', 'pages-programming--deployments'],
        ['Code review', 'pages-programming--code-review'],
        ['Query explorer', 'pages-data--query-explorer'],
      ],
    },
    {
      group: 'At home',
      pages: [
        ['Household budget', 'pages-private--household-budget'],
        ['Meal planner', 'pages-private--meal-planner'],
        ['Training', 'pages-private--training'],
      ],
    },
    {
      group: 'Fun, sea and devices',
      pages: [
        ['Music player', 'pages-fun--music-player'],
        ['Game hub', 'pages-gaming--game-hub'],
        ['Sea traffic', 'pages-maritime--sea-traffic'],
        ['Smart home', 'pages-devices--smart-home'],
        ['Climate control', 'pages-devices--climate-control'],
      ],
    },
    { group: 'A whole OS', pages: [['Desktop OS', 'pages-desktop--desktop-os']] },
  ];
</script>

<DocPage
  title="Recipes"
  lead="Starters for every kind of app. Each is a complete file: pass your data, and the edges, gaps and layers are already right."
>
  {#each recipes as r (r.title)}
    <Section title={r.title}>
      <p>
        <IntroRich text={r.text} />
        <a class="example" href={storyHref(r.example[1])} target="_top"
          >Full example: {r.example[0]} <Icon name="arrow-right" size={14} /></a
        >
      </p>
      <CodeBlock label="{r.title}.svelte" code={r.code} />
    </Section>
  {/each}

  <Section title="Every example page">
    <p>
      Whole applications to read and copy from. The
      <a href={chapterHref('the-examples')} target="_top">Design study</a> explains what each one demonstrates.
    </p>
    <div class="examples">
      {#each examples as g (g.group)}
        <div class="group">
          <div class="group-title">{g.group}</div>
          <ul class="pages">
            {#each g.pages as [name, id] (id)}
              <li><a href={storyHref(id)} target="_top">{name}</a></li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </Section>
</DocPage>

<style>
  .example {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    margin-left: var(--space-1);
    white-space: nowrap;
  }
  .examples {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: var(--space-6) var(--space-8);
  }
  .group {
    display: grid;
    align-content: start;
    gap: var(--space-2);
    padding-top: var(--space-3);
    border-top: 1px solid var(--border);
  }
  .group-title {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .pages {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
