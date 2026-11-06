<script lang="ts">
  /** Storybook-only: how light works — emitters, reflectors and the three layers, all live. */
  import DocPage from './DocPage.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import IntroRules from './IntroRules.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Switch from '../patterns/atoms/Switch.svelte';
  import ArcGauge from '../patterns/molecules/ArcGauge.svelte';
  import NavRail from '../patterns/organisms/NavRail.svelte';
  import backdrop from '../demo/assets/smart-home-backdrop.jpg';
  import LiveExample from './LiveExample.svelte';
  import OwnSurfaces from './examples/OwnSurfaces.svelte';
  import ownSurfacesSource from './examples/OwnSurfaces.svelte?raw';

  let groundOn = $state(true);
  let panelOn = $state(true);
  let betweenOn = $state(true);
  let section = $state('home');
  let target = $state(22.5);

  const railItems = [
    { id: 'home', label: 'Overview', icon: 'home' as const },
    { id: 'calendar', label: 'Schedule', icon: 'calendar' as const },
    { id: 'activity', label: 'Sensors', icon: 'activity' as const },
    { id: 'settings', label: 'Settings', icon: 'settings' as const },
  ];

  const emitters: IntroItem[] = [
    { term: 'The one main action', text: 'A primary button: Save, Start, Publish.' },
    { term: 'The current place', text: 'The current item of a `NavRail`, `NavBar` or `SideNav`.' },
    { term: 'Things that are on', text: 'A pressed `soft` key, a `Switch` that is on.' },
    { term: 'A reached value', text: 'The lit arc of an `ArcGauge`.' },
    {
      term: 'Status',
      text: 'A `success` button shines green and a `danger-solid` one red, never in the tint.',
    },
  ];
  const reflectors: IntroItem[] = [
    { term: 'Ground', text: 'Nothing to light. The emitter’s own soft halo falls on it.' },
    {
      term: 'Panel',
      text: 'A little light pools around an emitter on it, and the edge facing an emitter nearby brightens.',
    },
    {
      term: 'Glass',
      text: 'The front layer, and panels over a photo. Light scatters inside the pane, wider and stronger.',
    },
  ];
</script>

<DocPage
  title="Light"
  lead="Light comes from what is on or chosen, and falls on what is near it. Every Application lights its pages; there is nothing to set."
>
  <Section title="Emitters and reflectors">
    <p>Emitters give light; the surfaces around them catch it, each in its own way.</p>
    <div class="two">
      <div>
        <h3>Emitters</h3>
        <IntroList items={emitters} layout="stacked" />
      </div>
      <div>
        <h3>Reflectors</h3>
        <IntroList items={reflectors} layout="stacked" />
      </div>
    </div>
  </Section>

  <Section title="Three layers, three kinds of light">
    <p>The same light looks different depending on where it lands. Turn each emitter on and off.</p>
    <div class="cases">
      <div class="case">
        <IntroDemo>
          <Button variant={groundOn ? 'primary' : 'secondary'} icon="play" label="Start" />
        </IntroDemo>
        <h3>On the ground</h3>
        <p>Only the emitter’s own halo: a soft pool of tint beneath it.</p>
        <Switch label="Emitter on" bind:checked={groundOn} />
      </div>
      <div class="case">
        <IntroDemo align="stretch">
          <Layer level="panel" padding="lg" gap="sm" direction="horizontal" align="center">
            <div class="grow">
              <strong>Night mode</strong>
              <span class="muted">Dims the lights after ten.</span>
            </div>
            <Button
              variant="soft"
              icon="moon"
              label="Night mode"
              iconOnly
              aria-pressed={panelOn}
              onclick={() => (panelOn = !panelOn)}
            />
          </Layer>
        </IntroDemo>
        <h3>On a panel</h3>
        <p>A little light pools in the tile around the key, and stays inside it.</p>
        <Switch label="Emitter on" bind:checked={panelOn} />
      </div>
      <div class="case">
        <IntroDemo>
          <NavRail items={railItems} bind:current={section} orientation="horizontal" label="Demo" />
        </IntroDemo>
        <h3>In glass</h3>
        <p>The current item lights the pane from within, and the light follows it to the next.</p>
      </div>
    </div>
  </Section>

  <Section title="From beside">
    <p>
      Light reaches the surfaces next to an emitter, on the side that faces it. Press Publish and
      watch the inner edges of both tiles.
    </p>
    <IntroDemo align="stretch">
      <div class="between">
        <Layer level="panel" padding="lg" class="side"><strong>Draft</strong></Layer>
        <Button
          variant={betweenOn ? 'primary' : 'secondary'}
          label="Publish"
          onclick={() => (betweenOn = !betweenOn)}
        />
        <Layer level="panel" padding="lg" class="side"><strong>Live</strong></Layer>
      </div>
    </IntroDemo>
  </Section>

  <Section title="Over a photo">
    <p>
      Over a picture, panels are glass, so the gauge’s lit arc glows into the frosted pane around
      it. Drag the arc.
    </p>
    <IntroDemo kind="window" height="26rem">
      <Application contained image={backdrop}>
        <div class="photo">
          <Layer level="panel" padding="lg" class="photo-card">
            <ArcGauge
              label="Living room"
              bind:value={target}
              min={16}
              max={28}
              step={0.5}
              unit="°C"
            />
          </Layer>
        </div>
      </Application>
    </IntroDemo>
  </Section>

  <Section title="How it works">
    <p>
      Library parts mark themselves with <code>data-emit</code>. The <code>Application</code>
      measures where they are and writes the light each nearby surface catches into its
      <code>--light</code>, which panels and glass paint under their own background. When something
      moves, such as a selection flowing to its place, a press or a scroll, the light moves with it.
      At rest nothing runs.
    </p>
    <p>
      Your own parts join in the same way: an emitter carries <code>data-emit</code>, a surface
      carries
      <code>data-reflect</code> and paints <code>--light</code> under its background. Light is on in
      every <code>Application</code>; <code>light={'{false}'}</code> turns it off for a page that must
      stay still.
    </p>
    <LiveExample
      source={ownSurfacesSource}
      label="Study.svelte"
      kind="stage"
      caption="Your own tile and lamp, lit like the library's. Press the lamp and watch the tile."
    >
      <OwnSurfaces />
    </LiveExample>
  </Section>

  <Section title="Rules">
    <IntroRules
      dos={[
        'Let light mean “on” or “chosen”, and only that.',
        'Keep one strong emitter per group: the main action or the current place.',
        'Give status its own light: `data-emit="ok"` or `"danger"`.',
      ]}
      donts={[
        'Light disabled things, or things that merely look nice.',
        'Rely on light alone: the state is also in the words and for assistive tech.',
        'Paint a glow by hand beside an emitter. The light does that for you.',
      ]}
    />
  </Section>
</DocPage>

<style>
  .two {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: var(--space-6) var(--space-10);
  }
  .two h3 {
    margin-bottom: var(--space-3);
  }
  .cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
    gap: var(--space-8) var(--space-6);
  }
  .case {
    display: grid;
    align-content: start;
    gap: var(--space-2);
  }
  .case :global(.demo) {
    margin-bottom: var(--space-2);
  }
  .case :global(.frame) {
    height: 10rem;
  }
  .grow {
    display: grid;
    flex: 1;
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .between {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .between :global(.side) {
    flex: 1;
    min-height: 6rem;
    justify-content: center;
    align-items: center;
  }
  .photo {
    display: grid;
    place-items: center;
    height: 100%;
    padding: var(--space-6);
  }
  .photo :global(.photo-card) {
    width: min(24rem, 100%);
  }
</style>
