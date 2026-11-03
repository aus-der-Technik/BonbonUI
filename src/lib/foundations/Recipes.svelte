<script lang="ts">
  /** Storybook-only: copy-paste starters for every kind of app, linked to the full example pages. */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import {
    recipeCollab,
    recipeDashboard,
    recipeDesktop,
    recipeDesktopApp,
    recipeShop,
    recipeWebsite,
  } from './snippets';

  const recipes = [
    {
      title: 'Dashboard',
      text: 'KPIs, charts and a table on the standard page, a sidebar for sections. Full example: Pages / Admin / Admin console (Overview).',
      code: recipeDashboard,
    },
    {
      title: 'Website',
      text: 'Your own header (NavBar), wide width and big gaps; the sections are ready-made organisms. Full example: Pages / Website / Landing page.',
      code: recipeWebsite,
    },
    {
      title: 'Shop',
      text: 'A product grid, a cart in a drawer, prices that format themselves. Full example: Pages / Shop.',
      code: recipeShop,
    },
    {
      title: 'Collaborative tool',
      text: 'A fill page whose board takes all the room; presence in the header. Full example: Pages / Collaboration / Team workspace.',
      code: recipeCollab,
    },
    {
      title: 'Desktop application',
      text: 'Toolbar, source list, inspector and status bar around one content area. Full example: the Mail window in Pages / Desktop / Desktop OS.',
      code: recipeDesktopApp,
    },
    {
      title: 'A whole OS',
      text: 'A desktop with a menu bar, a dock and draggable windows — every window is themed by the Application. Full example: Pages / Desktop / Desktop OS.',
      code: recipeDesktop,
    },
  ];
</script>

<DocPage
  title="Recipes"
  lead="Starters for every occasion. Each one is a complete, idiomatic file: copy it, pass your data, and the page already has the right edges, gaps, layers and responsive behaviour."
>
  {#each recipes as r (r.title)}
    <Section title={r.title} description={r.text}>
      <CodeBlock label="{r.title}.svelte" code={r.code} />
    </Section>
  {/each}
</DocPage>
