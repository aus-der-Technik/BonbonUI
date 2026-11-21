<script lang="ts">
  /** Storybook-only: install, wire up and write a first page — all copy-paste. */
  import DocPage from './DocPage.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import LiveExample from './LiveExample.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import FirstPage from './examples/FirstPage.svelte';
  import firstPageSource from './examples/FirstPage.svelte?raw';
  import MyChip from './examples/MyChip.svelte';
  import myChipSource from './examples/MyChip.svelte?raw';
  import { install, rootLayout } from './snippets';
  import { storyHref } from './study/links';

  const next: IntroItem[] = [
    {
      term: 'Layers',
      text: 'Which surface to use for what, and why front elements are always sticky.',
      href: storyHref('introduction-layers--layers'),
    },
    {
      term: 'Colour & tint',
      text: 'Try any tint live and copy the code.',
      href: storyHref('introduction-colour-tint--colour-tint'),
    },
    {
      term: 'Layout',
      text: '`Stack`, `Row`, `Grid` and `Section` in five minutes.',
      href: storyHref('introduction-layout--layout'),
    },
    {
      term: 'Recipes',
      text: 'Starters for dashboards, websites, shops, team tools, devices and desktop apps.',
      href: storyHref('introduction-recipes--recipes'),
    },
  ];
</script>

<DocPage
  title="Getting started"
  lead="Install the package, wrap your app in an Application, write a page. Every block below is complete: copy it as it is."
>
  <Section title="Install">
    <p>
      One package, one peer: <code>svelte ^5.20</code>. <code>leaflet</code> is optional and only
      needed for <code>MapView</code>, which comes from <code>@bonbon-ui/core/map</code>.
    </p>
    <CodeBlock label="Terminal" code={install} />
  </Section>

  <Section title="Wrap the app">
    <p>
      Import the styles once and put one <code>Application</code> around everything. It owns the theme
      (tint, light or dark, radius, density), and it makes the page answer presses and catch light.
    </p>
    <CodeBlock label="src/routes/+layout.svelte" code={rootLayout} />
    <p>
      Prefer your own reset? Import <code>@bonbon-ui/core/tokens.css</code> instead of
      <code>styles.css</code>. For a page that must stay still, <code>flow={'{false}'}</code> and
      <code>light={'{false}'}</code> turn the motion and the light off.
    </p>
  </Section>

  <Section title="Write a page">
    <p>
      A <code>Page</code> frames the screen: the floating header, the content edges and the gaps between
      blocks. You only name the parts.
    </p>
    <LiveExample
      source={firstPageSource}
      label="src/routes/+page.svelte"
      height="17rem"
      caption="The file below, running."
    >
      <FirstPage />
    </LiveExample>
  </Section>

  <Section title="Your own components">
    <p>
      Style them with tokens, never literal colours, and they follow the tint, the theme and the
      density like the library's own.
    </p>
    <LiveExample
      source={myChipSource}
      label="MyChip.svelte"
      kind="stage"
      caption="The chip from the code. Press it; switch the tint in the toolbar."
    >
      <div class="chips"><MyChip /></div>
    </LiveExample>
  </Section>

  <Section title="Where next">
    <IntroList items={next} />
  </Section>
</DocPage>

<style>
  .chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-4);
  }
</style>
