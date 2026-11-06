<script lang="ts">
  /** Storybook-only: the four-layer depth model, explained with a live, scrollable example. */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import NavRail from '../patterns/organisms/NavRail.svelte';
  import { layersCode } from './snippets';

  let railAt = $state('home');
  const railItems = [
    { id: 'home', label: 'Overview', icon: 'home' as const },
    { id: 'calendar', label: 'Schedule', icon: 'calendar' as const },
    { id: 'settings', label: 'Settings', icon: 'settings' as const },
  ];
  const touch = [
    {
      layer: 'Ground',
      rule: 'Is the page. A press here sends a soft ripple through all of it, outwards from the finger — except the glass, which floats above.',
    },
    {
      layer: 'Panel',
      rule: 'Lies on the page, like a tile on a soft floor. A press dips that panel, and the panels right beside it give a little. The rest of the page stays still.',
    },
    {
      layer: 'Glass',
      rule: 'Floats above the page and does not touch it. A press moves only the glass — it squeezes and swells under the finger — and the page below stays still.',
    },
  ];

  const layers = [
    {
      n: 1,
      name: 'Ground',
      level: 'ground' as const,
      what: 'Directly on the backdrop: soft stone, a little brighter at the top. No surface at all.',
      use: 'Page and section headings, body text, KPI figures, hero copy, empty states.',
    },
    {
      n: 2,
      name: 'Panel',
      level: 'panel' as const,
      what: 'A solid tile a little lighter than the ground. No glass, no lift.',
      use: 'Tables, forms, results — only what needs a box. Most groups sit on the ground.',
    },
    {
      n: 3,
      name: 'Selected',
      level: 'selected' as const,
      what: 'The same tile washed in tint, with a tint rim and a close coloured glow.',
      use: 'The chosen plan, the open conversation, the active window, the row being edited.',
    },
    {
      n: 4,
      name: 'Front',
      level: 'front' as const,
      what: 'Liquid glass floating over everything. Always sticky.',
      use: 'The header, toolbars, docks, menu bars, floating actions, bulk-action bars.',
    },
  ];
</script>

<DocPage
  title="Layers"
  lead="Depth in BonbonUI comes from four layers stacked on a tinted backdrop. Every component is one of them — which is why pages look calm: there are only four kinds of surface."
>
  <Section layout="grid" min="13rem">
    {#each layers as l (l.n)}
      <Layer level={l.level === 'front' ? 'panel' : l.level} gap="sm" class="layer-card">
        <span class="num">{l.n}</span>
        <h3>{l.name}</h3>
        <p><strong>{l.what}</strong></p>
        <p>{l.use}</p>
      </Layer>
    {/each}
  </Section>

  <Section
    title="See it move"
    description="Scroll inside the box. The header and the filter bar are front layers and stick; panels and the selected card scroll underneath them, and the bulk-action bar sticks to the bottom."
  >
    <div class="demo">
      <Application contained>
        <Page title="Projects" subtitle="layers demo" gap="md">
          {#snippet actions()}<Button
              variant="primary"
              shape="pill"
              icon="plus"
              label="New"
            />{/snippet}
          <Layer level="front" direction="horizontal" gap="sm">
            <Button size="sm" shape="pill" variant="ghost" label="All" />
            <Button size="sm" shape="pill" variant="ghost" label="Mine" />
            <Spacer />
            <Button size="sm" shape="pill" variant="ghost" icon="filter" label="Filter" />
          </Layer>
          <Section
            title="Ground"
            description="This heading has no surface — it sits on the backdrop."
          />
          <Grid min="12rem">
            {#each Array.from({ length: 9 }, (_, i) => i) as i (i)}
              <Layer level={i === 1 ? 'selected' : 'panel'} gap="xs">
                <strong>{i === 1 ? 'Selected' : 'Panel'} {i + 1}</strong>
                <span class="muted">{i === 1 ? 'tinted tile' : 'solid tile'}</span>
              </Layer>
            {/each}
          </Grid>
          <Stack gap="xs">
            <strong>Keep scrolling…</strong>
            <span class="muted">The front layers stay where they are.</span>
          </Stack>
          <div style:height="240px"></div>
          <Layer level="front" edge="bottom" direction="horizontal" gap="sm">
            <strong>2 selected</strong>
            <Spacer />
            <Button size="sm" shape="pill" variant="ghost" label="Archive" />
            <Button size="sm" shape="pill" variant="danger-solid" label="Delete" />
          </Layer>
        </Page>
      </Application>
    </div>
  </Section>

  <Section
    title="Pressing: what a touch moves"
    description="Every press is answered with a little give — and what gives depends on what you pressed on, because each layer touches the page differently. Try the three below and watch what moves."
  >
    <Grid min="15rem" gap="lg">
      {#each touch as t (t.layer)}
        <div class="touch-rule">
          <h3>{t.layer}</h3>
          <p>{t.rule}</p>
        </div>
      {/each}
    </Grid>
    <div class="touch-demo">
      <div class="touch-row">
        <Button variant="soft" icon="sun" label="On the ground" />
        <span class="muted">Press: the whole page ripples.</span>
      </div>
      <div class="touch-row">
        <Layer level="panel" padding="lg" class="touch-panel"><strong>Beside</strong></Layer>
        <Layer level="panel" padding="lg" gap="sm" class="touch-panel">
          <strong>On a panel</strong>
          <Button variant="soft" icon="moon" label="Press me" />
        </Layer>
        <Layer level="panel" padding="lg" class="touch-panel"><strong>Beside</strong></Layer>
      </div>
      <div class="touch-row">
        <NavRail
          items={railItems}
          bind:current={railAt}
          orientation="horizontal"
          label="Glass demo"
        />
        <span class="muted">Press: only the glass gives.</span>
      </div>
    </div>
  </Section>

  <Section title="In code">
    <CodeBlock label="One component for all four" code={layersCode} />
    <p>
      Most library components already pick their layer: <code>Card</code> and <code>DataTable</code>
      are panels, <code>Card selected</code> and the active <code>SideNav</code> item are selected,
      <code>AppHeader</code>, <code>FloatingActions</code>, docks and menu bars are front.
    </p>
  </Section>

  <Section title="Rules">
    <Row gap="md" align="start" collapse="md" equal>
      <Layer level="panel" gap="sm">
        <h3>Do</h3>
        <ul>
          <li>Put text straight on the ground — headings do not need a card.</li>
          <li>Use one panel per group of content.</li>
          <li>Mark exactly one thing as selected per group.</li>
          <li>Keep front elements few and small: they cover content.</li>
        </ul>
      </Layer>
      <Layer level="panel" gap="sm">
        <h3>Don't</h3>
        <ul>
          <li>Nest panels in panels — use <code>Card surface="subtle"</code> inside a panel.</li>
          <li>Make a front element that scrolls away. Front means sticky: always.</li>
          <li>
            Use the accent for errors — destructive and failed states are <code>--danger</code>.
          </li>
        </ul>
      </Layer>
    </Row>
    <p>
      Overlays — dialogs, drawers, menus, tooltips, toasts — are not part of the page. They appear
      on demand above all four layers and use the front layer's liquid glass.
    </p>
  </Section>
</DocPage>

<style>
  .num {
    display: inline-grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-pill);
    background: var(--accent);
    color: var(--on-accent);
    font-weight: var(--fw-bold);
    font-size: var(--fs-sm);
  }
  h3 {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
  }
  p,
  li {
    font-size: var(--fs-md);
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .demo {
    height: 460px;
    border-radius: var(--radius-card);
    overflow: hidden;
    border: 1px solid var(--border-strong);
    box-shadow: var(--glass-shadow);
  }
  .touch-rule h3 {
    font-size: var(--fs-lg);
  }
  .touch-rule p {
    color: var(--text-2);
  }
  .touch-demo {
    display: grid;
    gap: var(--space-6);
    margin-top: var(--space-4);
  }
  .touch-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
  }
  .touch-row :global(.touch-panel) {
    flex: 1 1 10rem;
    min-height: 7rem;
    justify-content: center;
  }
</style>
