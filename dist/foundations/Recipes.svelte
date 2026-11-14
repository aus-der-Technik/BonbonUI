<script lang="ts">
  /** Storybook-only: copy-paste starters for every kind of app, linked to the full example pages. */
  import type { Component } from 'svelte';
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import IntroRich from './IntroRich.svelte';
  import LiveExample from './LiveExample.svelte';
  import Dashboard from './recipes/Dashboard.svelte';
  import dashboardSource from './recipes/Dashboard.svelte?raw';
  import Website from './recipes/Website.svelte';
  import websiteSource from './recipes/Website.svelte?raw';
  import Shop from './recipes/Shop.svelte';
  import shopSource from './recipes/Shop.svelte?raw';
  import TeamTool from './recipes/TeamTool.svelte';
  import teamToolSource from './recipes/TeamTool.svelte?raw';
  import DeviceScreen from './recipes/DeviceScreen.svelte';
  import deviceScreenSource from './recipes/DeviceScreen.svelte?raw';
  import DesktopApp from './recipes/DesktopApp.svelte';
  import desktopAppSource from './recipes/DesktopApp.svelte?raw';
  import WholeOS from './recipes/WholeOS.svelte';
  import wholeOSSource from './recipes/WholeOS.svelte?raw';
  import { chapterHref, storyHref } from './study/links';

  interface Recipe {
    title: string;
    file: string;
    text: string;
    example: [string, string];
    view: Component;
    source: string;
    /** The live window's height: a screen-high tool needs more room than a scrolling site. */
    height: string;
    tint?: string;
    caption: string;
  }

  // Each recipe is a real file under ./recipes: the window runs it, the code block shows it.
  const recipes: Recipe[] = [
    {
      title: 'Dashboard',
      file: 'Dashboard.svelte',
      text: 'Figures and charts on the ground, the table in a panel, a side nav for the sections.',
      example: ['Admin console', 'pages-admin--admin-console'],
      view: Dashboard,
      source: dashboardSource,
      height: '40rem',
      caption: 'Scroll inside: the header and the side nav stay put. Hover the chart.',
    },
    {
      title: 'Website',
      file: 'Website.svelte',
      text: 'Your own header (`NavBar`), wide width and big gaps; the sections are ready-made organisms.',
      example: ['Landing page', 'pages-website--landing-page'],
      view: Website,
      source: websiteSource,
      height: '40rem',
      caption: 'A whole site in one window: scroll down to the pricing and the footer.',
    },
    {
      title: 'Shop',
      file: 'Shop.svelte',
      text: 'A product grid, a cart in a drawer, and prices that format themselves.',
      example: ['Shop', 'pages-shop--shop'],
      view: Shop,
      source: shopSource,
      height: '36rem',
      caption: 'Add a product, then open the cart and change the quantity.',
    },
    {
      title: 'Team tool',
      file: 'TeamTool.svelte',
      text: 'A `fill` page whose board takes all the room, with presence in the header and the add button on each column.',
      example: ['Team workspace', 'pages-collaboration--team-workspace'],
      view: TeamTool,
      source: teamToolSource,
      height: '32rem',
      caption: 'Drag a card to another column, or add one where it belongs.',
    },
    {
      title: 'Device screen',
      file: 'DeviceScreen.svelte',
      text: 'A photo backdrop, a `NavRail`, an ink tile with a `DotMatrix` figure and an `ArcGauge` to set a value.',
      example: ['Smart home', 'pages-devices--smart-home'],
      view: DeviceScreen,
      source: deviceScreenSource,
      height: '30rem',
      caption: 'Drag the arc, flip the switch, pick another place on the rail.',
    },
    {
      title: 'Desktop application',
      file: 'DesktopApp.svelte',
      text: 'Toolbar, source list, inspector and status bar around one content area.',
      example: ['Desktop OS', 'pages-desktop--desktop-os'],
      view: DesktopApp,
      source: desktopAppSource,
      height: '28rem',
      caption: 'Pick a message: the inspector shows it.',
    },
    {
      title: 'A whole OS',
      file: 'WholeOS.svelte',
      text: 'A desktop with a menu bar, a dock and draggable windows, themed by the `Application` around it (here `tint="#5856d6"`).',
      example: ['Desktop OS', 'pages-desktop--desktop-os'],
      view: WholeOS,
      source: wholeOSSource,
      height: '30rem',
      tint: '#5856d6',
      caption: 'Drag the window by its title, close it, and open it again from the dock.',
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
  lead="Starters for every kind of app, each running above its code. Every file is complete: copy it, swap in your data, and the edges, gaps and layers are already right."
>
  {#each recipes as r (r.title)}
    <Section title={r.title}>
      <p>
        <IntroRich text={r.text} />
        <a class="example" href={storyHref(r.example[1])} target="_top"
          >Full example: {r.example[0]} <Icon name="arrow-right" size={14} /></a
        >
      </p>
      <LiveExample
        source={r.source}
        label={r.file}
        height={r.height}
        tint={r.tint}
        caption={r.caption}
      >
        <r.view />
      </LiveExample>
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
  /* The page's own links; Svelte's scoping class keeps DocPage's `a:not([class])` off them. */
  a {
    color: var(--accent-ink);
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }
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
