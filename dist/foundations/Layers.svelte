<script lang="ts">
  /** Storybook-only: the four-layer depth model — what each layer is, how it scrolls, what a press moves. */
  import DocPage from './DocPage.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import IntroRules from './IntroRules.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import NavRail from '../patterns/organisms/NavRail.svelte';
  import backdrop from '../demo/assets/smart-home-backdrop.jpg';
  import LiveExample from './LiveExample.svelte';
  import FourLayers from './examples/FourLayers.svelte';
  import fourLayersSource from './examples/FourLayers.svelte?raw';

  const layers: IntroItem[] = [
    {
      term: 'Ground',
      text: 'The page itself: soft stone, a little brighter at the top. Headings, body text, figures, hero copy and empty states sit here, with no surface at all.',
    },
    {
      term: 'Panel',
      text: 'A solid tile, a little lighter than the ground. Only for what needs a box: a table, a form, a set of results. Most groups need none.',
    },
    {
      term: 'Selected',
      text: 'The same tile washed in tint, with a tint rim and a close glow: the chosen plan, the open conversation, the row being edited.',
    },
    {
      term: 'Front',
      text: 'Frosted glass floating above the page, and always sticky: the header, toolbars, docks, menu bars, floating and bulk actions.',
    },
  ];

  let railAt = $state('home');
  const railItems = [
    { id: 'home', label: 'Overview', icon: 'home' as const },
    { id: 'calendar', label: 'Schedule', icon: 'calendar' as const },
    { id: 'settings', label: 'Settings', icon: 'settings' as const },
  ];

  let lamp = $state(false);
  let fan = $state(true);
  let brightness = $state(60);
</script>

<DocPage
  title="Layers"
  lead="Every surface is one of four layers. With only four kinds of surface to tell apart, a page stays calm."
>
  <Section title="Four layers">
    <p>From the page up: ground, panel, selected and front. Each one has one job.</p>
    <IntroList items={layers} numbered>
      {#snippet figure(item)}
        <span class="chip chip--{item.term.toLowerCase()}" aria-hidden="true"></span>
      {/snippet}
    </IntroList>
  </Section>

  <Section title="See them scroll">
    <p>
      Scroll inside the window. The header and the filter bar are front layers and stay put; the
      ground and its tiles pass underneath, and the bulk-action bar holds the bottom edge.
    </p>
    <IntroDemo kind="window" height="30rem">
      <Application contained>
        <Page title="Projects" subtitle="layers" gap="lg">
          {#snippet actions()}
            <Button variant="primary" shape="pill" icon="plus" label="New" />
          {/snippet}
          <Layer level="front" direction="horizontal" gap="sm">
            <Button size="sm" variant="ghost" label="All" aria-pressed="true" />
            <Button size="sm" variant="ghost" label="Mine" />
            <Spacer />
            <Button size="sm" variant="ghost" icon="filter" label="Filter" />
          </Layer>
          <Stack gap="xs">
            <strong class="demo-title">This week</strong>
            <span class="muted">A heading on the ground needs no card.</span>
          </Stack>
          <Grid min="11rem">
            {#each Array.from({ length: 9 }, (_, i) => i) as i (i)}
              <Layer level={i === 1 ? 'selected' : 'panel'} gap="xs">
                <strong>{i === 1 ? 'Selected' : 'Panel'} {i + 1}</strong>
                <span class="muted">{i === 1 ? 'the open project' : 'a solid tile'}</span>
              </Layer>
            {/each}
          </Grid>
          <Stack gap="xs">
            <strong>Keep scrolling</strong>
            <span class="muted">The front layers stay where they are.</span>
          </Stack>
          <div style:height="16rem"></div>
          <Layer level="front" edge="bottom" direction="horizontal" gap="sm">
            <strong>2 selected</strong>
            <Spacer />
            <Button size="sm" variant="ghost" label="Archive" />
            <Button size="sm" variant="danger-solid" label="Delete" />
          </Layer>
        </Page>
      </Application>
    </IntroDemo>
  </Section>

  <Section title="What a press moves">
    <p>
      Every layer is a body of thick water, and what lies on it floats. A press is felt only on its
      own layer: the layers never move each other. Try all three and watch what moves.
    </p>
    <div class="press">
      <div class="press-text">
        <h3>On the ground</h3>
        <p>
          Press a key, a field or a slider: the thing under your finger sinks and pushes the water
          aside, its neighbours dip a moment later and less, and the far side of the page barely
          stirs, because the wave loses energy with every pixel it travels. Drag the slider and the
          things around it sway along, then swing back and forth into place. A big key moves more
          water than a small one: press both and compare. Panels and glass stay still.
        </p>
        <p>
          How much it moves is <code>wiggle</code> on the <code>Application</code>, from 0 (still)
          to 1. The default, 0.03, is a whisper you feel more than see; set
          <strong>Wiggle</strong> in the toolbar to Playful (0.8) to watch it here.
        </p>
      </div>
      <IntroDemo>
        <div class="drag">
          <Slider label="Brightness" bind:value={brightness} min={0} max={100} />
        </div>
        <Button
          variant="soft"
          icon="sun"
          label="Lamp"
          aria-pressed={lamp}
          onclick={() => (lamp = !lamp)}
        />
        <Button variant="soft" size="xs" label="Small" />
        <Button variant="soft" size="xl" label="Big key" />
      </IntroDemo>
    </div>
    <div class="press">
      <div class="press-text">
        <h3>On a panel</h3>
        <p>
          The panels are a body of water of their own. A press on one moves what lies on the panels,
          the nearest most and the panels beside it a little, while the tiles themselves, the ground
          and the glass stay still.
        </p>
      </div>
      <IntroDemo align="stretch">
        <div class="tiles">
          <Layer level="panel" padding="md" class="tile"><span class="muted">Beside</span></Layer>
          <Layer level="panel" padding="md" class="tile">
            <Button
              variant="soft"
              icon="wind"
              label="Fan"
              aria-pressed={fan}
              onclick={() => (fan = !fan)}
            />
          </Layer>
          <Layer level="panel" padding="md" class="tile"
            ><Input aria-label="A field on a panel" placeholder="Type here" /></Layer
          >
        </div>
      </IntroDemo>
    </div>
    <div class="press">
      <div class="press-text">
        <h3>On glass</h3>
        <p>
          Glass floats above the page and never touches it. Only the glass squeezes and swells under
          your finger.
        </p>
      </div>
      <IntroDemo>
        <NavRail
          items={railItems}
          bind:current={railAt}
          orientation="horizontal"
          label="Glass demo"
        />
      </IntroDemo>
    </div>
  </Section>

  <Section title="Glass only where it floats">
    <p>
      Glass is gentle frost, kept for what floats: the front layer, overlays, and panels over a
      photo. Off a front layer, <code>glass</code> and <code>ghost</code> buttons turn into
      soft-touch keys, like <code>variant="soft"</code>.
    </p>
    <div class="glass-cases">
      <IntroDemo caption="On the ground: the same three buttons are matte keys.">
        <Button variant="glass" label="Glass" />
        <Button variant="ghost" label="Ghost" />
        <Button variant="soft" label="Soft" />
      </IntroDemo>
      <IntroDemo caption="In a front layer: glass and ghost are liquid glass.">
        <Layer level="front" direction="horizontal" gap="sm">
          <Button variant="glass" label="Glass" />
          <Button variant="ghost" label="Ghost" />
          <Button variant="soft" label="Soft" />
        </Layer>
      </IntroDemo>
    </div>
    <IntroDemo
      kind="window"
      height="17rem"
      caption="Over a photo, panels turn to frosted glass by themselves: a solid tile would cut a hole into the picture."
    >
      <Application contained image={backdrop}>
        <div class="photo">
          <Layer level="panel" padding="lg" gap="xs" class="photo-card">
            <strong>Living room</strong>
            <span>21.5 °C · lights on</span>
          </Layer>
        </div>
      </Application>
    </IntroDemo>
  </Section>

  <Section title="In code">
    <p>
      One component covers all four. Most library parts already pick their own layer:
      <code>Card</code> and <code>Section level="panel"</code> are panels (the one to hold a
      <code>DataTable</code>), <code>Card selected</code> and the current <code>SideNav</code> item
      are selected, and <code>AppHeader</code>, <code>NavRail</code>, <code>FloatingActions</code>,
      docks and menu bars are front. <code>KpiTile</code> and <code>ChartCard</code> sit on the ground.
    </p>
    <LiveExample
      source={fourLayersSource}
      label="Plans.svelte"
      height="26rem"
      caption="All four layers in one file. Choose a plan, then scroll inside."
    >
      <FourLayers />
    </LiveExample>
  </Section>

  <Section title="Rules">
    <IntroRules
      dos={[
        'Put text straight on the ground: headings need no card.',
        'Use a panel only for a group that needs a box, and one per group.',
        'Mark exactly one thing as selected in a group.',
        'Keep front elements few and small: they cover content.',
      ]}
      donts={[
        'Put a panel on a panel. Inside a panel, group with hairlines or `Card surface="subtle"`.',
        'Make a front element that scrolls away. Front means sticky, always.',
        'Use glass for a group that does not float.',
        'Use the accent for errors: destructive and failed states are `--danger`.',
      ]}
    />
    <p>
      <strong>Never a panel on a panel.</strong> A panel says "this group needs a box"; a second box
      inside it says nothing new, it only adds a rim, a shadow and less room. If it happens anyway
      (a <code>Card</code> or a <code>ChartCard level="panel"</code> dropped into a panel), the inner
      one turns into a quiet well by itself: the subtle fill, no rim, no shadow, and it catches no light.
      The same happens over a photo, where panels are glass.
    </p>
    <p>
      Overlays, such as dialogs, drawers, menus, tooltips and toasts, are not layers. They appear on
      demand above all four, in the front layer's glass.
    </p>
  </Section>
</DocPage>

<style>
  .chip {
    width: 3.5rem;
    height: 2.25rem;
    border-radius: var(--radius-md);
  }
  .chip--ground {
    border: 1px dashed var(--border-strong);
  }
  .chip--panel {
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
  }
  .chip--selected {
    background: var(--layer-selected-bg);
    border: 1.5px solid var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .chip--front {
    border-radius: var(--radius-pill);
    background: var(--layer-front-bg);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--layer-front-shadow);
    backdrop-filter: var(--layer-front-blur);
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .demo-title {
    font-size: var(--fs-xl);
  }
  .press {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
    gap: var(--space-4) var(--space-8);
    align-items: center;
  }
  .press-text {
    display: grid;
    gap: var(--space-1);
  }
  .drag {
    width: min(14rem, 100%);
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-3);
  }
  .tiles :global(.tile) {
    min-height: 5.5rem;
    align-items: center;
    justify-content: center;
  }
  .glass-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: var(--space-4);
  }
  .photo {
    display: grid;
    place-items: center;
    height: 100%;
    padding: var(--space-6);
  }
  .photo :global(.photo-card) {
    width: min(18rem, 100%);
  }
  @media (max-width: 760px) {
    .press {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
