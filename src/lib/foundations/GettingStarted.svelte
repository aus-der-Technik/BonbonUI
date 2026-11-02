<script lang="ts">
  /** Storybook-only: install, wire up and write a first page — all copy-paste. */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import KpiTile from '../patterns/molecules/KpiTile.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import { firstPage, install, rootLayout, tokenCode } from './snippets';
</script>

<DocPage
  title="Getting started"
  lead="Three steps: install the package, wrap the app in an Application, write pages. Every block below is complete — copy it as it is."
>
  <Section eyebrow="Step 1" title="Install">
    <CodeBlock label="Terminal" code={install} />
    <p>
      Peer dependency: <code>svelte ^5.20</code>. <code>leaflet</code> is optional and only needed
      for <code>MapView</code>, which is imported from <code>@bonbon-ui/core/map</code>.
    </p>
  </Section>

  <Section
    eyebrow="Step 2"
    title="Wrap the app"
    description="Import the styles once and put one Application around everything. It owns the theme: tint, light/dark, radius and density."
  >
    <CodeBlock label="src/routes/+layout.svelte" code={rootLayout} />
    <p>
      Prefer your own reset? Import <code>@bonbon-ui/core/tokens.css</code> instead of
      <code>styles.css</code>.
    </p>
  </Section>

  <Section
    eyebrow="Step 3"
    title="Write a page"
    description="A Page frames the screen: the floating header, the content edges and the gaps between blocks. You only name the parts."
  >
    <CodeBlock label="src/routes/+page.svelte" code={firstPage} />
    <Layer level="ground" class="preview">
      <Application contained>
        <Page title="Orders" subtitle="today">
          {#snippet actions()}
            <Button variant="primary" shape="pill" icon="plus" label="New order" />
          {/snippet}
          <Section title="At a glance">
            <Grid min="12rem">
              <KpiTile label="Open" value="24" />
              <KpiTile label="Shipped" value="118" />
              <KpiTile label="Returns" value="3" />
            </Grid>
          </Section>
        </Page>
      </Application>
    </Layer>
  </Section>

  <Section
    title="Writing your own components"
    description="Use tokens, never literal colours, and your components follow the tint, the theme and the density like the library's own."
  >
    <CodeBlock label="MyChip.svelte — styles" code={tokenCode} />
  </Section>

  <Section title="Where next">
    <ul>
      <li>
        <strong>Introduction / Layers</strong> — which surface to use for what, and why front elements
        are always sticky.
      </li>
      <li>
        <strong>Introduction / Colour &amp; tint</strong> — try any tint live and copy the code.
      </li>
      <li>
        <strong>Introduction / Layout</strong> — Stack, Row, Grid and Section in five minutes.
      </li>
      <li>
        <strong>Introduction / Recipes</strong> — starters for dashboards, websites, shops, collaborative
        tools and desktop apps.
      </li>
      <li><strong>Pages</strong> — complete screens to copy from.</li>
    </ul>
  </Section>
</DocPage>

<style>
  :global(.preview) {
    height: 360px;
    overflow: hidden;
    border-radius: var(--radius-card);
    border: 1px solid var(--border-strong);
    box-shadow: var(--glass-shadow);
  }
</style>
