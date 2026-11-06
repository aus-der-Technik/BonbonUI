<script lang="ts">
  /** Storybook-only: install, wire up and write a first page — all copy-paste. */
  import DocPage from './DocPage.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import KpiTile from '../patterns/molecules/KpiTile.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import { firstPage, install, rootLayout, tokenCode } from './snippets';
  import { storyHref } from './study/links';

  let picked = $state(false);

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
    <CodeBlock label="src/routes/+page.svelte" code={firstPage} />
    <IntroDemo kind="window" height="17rem" caption="The same file, running.">
      <Application contained>
        <Page title="Orders" subtitle="today">
          {#snippet actions()}
            <Button variant="primary" icon="plus" label="New order" />
          {/snippet}
          <Section title="At a glance" heading={3}>
            <Grid min="10rem">
              <KpiTile label="Open" value="24" />
              <KpiTile label="Shipped" value="118" />
              <KpiTile label="Returns" value="3" />
            </Grid>
          </Section>
        </Page>
      </Application>
    </IntroDemo>
  </Section>

  <Section title="Your own components">
    <p>
      Style them with tokens, never literal colours, and they follow the tint, the theme and the
      density like the library's own.
    </p>
    <div class="pair">
      <CodeBlock label="MyChip.svelte, styles" code={tokenCode} />
      <IntroDemo caption="The chip from the code. Press it; switch the tint in the toolbar.">
        <button
          type="button"
          class="my-chip"
          aria-pressed={picked}
          onclick={() => (picked = !picked)}
        >
          Design
        </button>
        <button type="button" class="my-chip danger">Overdue</button>
      </IntroDemo>
    </div>
  </Section>

  <Section title="Where next">
    <IntroList items={next} />
  </Section>
</DocPage>

<style>
  .pair {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
    gap: var(--space-4);
    align-items: start;
  }
  .pair :global(.frame) {
    min-height: 12rem;
  }
  /* The chip of the token example, exactly as written there. */
  .my-chip {
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--accent-soft);
    color: var(--accent-ink);
    border: 1px solid var(--accent-border);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    cursor: pointer;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .my-chip:hover {
    background: var(--accent-faint);
  }
  .my-chip[aria-pressed='true'] {
    background: var(--accent);
    color: var(--on-accent);
  }
  .my-chip.danger {
    color: var(--danger);
    background: var(--tint-danger);
    border-color: transparent;
  }
  .my-chip:focus-visible {
    outline: var(--focus-ring);
  }
</style>
