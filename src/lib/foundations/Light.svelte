<script lang="ts">
  /** Storybook-only: how light works — emitters, reflectors and the three layers, all live. */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Application from '../patterns/templates/Application.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Switch from '../patterns/atoms/Switch.svelte';
  import ArcGauge from '../patterns/molecules/ArcGauge.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import NavRail from '../patterns/organisms/NavRail.svelte';
  import backdrop from '../demo/assets/smart-home-backdrop.jpg';
  import { lightCode } from './snippets';

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

  const emitters = [
    ['The one primary action', 'Save, Start, Mist now — a filled button shines in the tint.'],
    ['The current place', 'The selected item of a rail, a nav bar or a side nav.'],
    ['Things that are on', 'A pressed soft key, a switch that is on, a lit level.'],
    ['A reached value', 'The lit part of a gauge.'],
    ['Status', 'Success and danger shine in their own colour, never in the tint.'],
  ];
  const reflectors = [
    ['Ground', 'Has nothing to light. The emitter’s own soft halo falls onto it — its shadow.'],
    [
      'Panel',
      'A solid tile. A little light pools around an emitter on it, and the side that faces an emitter beside it brightens. Nothing passes through.',
    ],
    [
      'Glass',
      'The front layer, and every panel over a photo. Light scatters inside the pane: the tint shines through around the emitter — wider and stronger than on a panel.',
    ],
  ];
</script>

<DocPage
  title="Light"
  lead="Light in BonbonUI comes from what is on or chosen, and it falls on what is around it. That is all the rule there is — and it is why a selected item seems to glow inside its glass, and why a primary button warms the panel beside it. The Application does it for every page; nothing needs to be set by hand."
>
  <Section title="Emitters and reflectors">
    <Row gap="lg" align="start" collapse="md" equal>
      <Layer level="panel" gap="sm" grow>
        <h3>Emitters give light</h3>
        <dl class="list">
          {#each emitters as [name, text] (name)}
            <dt>{name}</dt>
            <dd>{text}</dd>
          {/each}
        </dl>
      </Layer>
      <Layer level="panel" gap="sm" grow>
        <h3>Reflectors catch it</h3>
        <dl class="list">
          {#each reflectors as [name, text] (name)}
            <dt>{name}</dt>
            <dd>{text}</dd>
          {/each}
        </dl>
      </Layer>
    </Row>
  </Section>

  <Section
    title="Three layers, three kinds of light"
    description="Turn each emitter on and off. The same light looks different depending on where it lands."
  >
    <Grid min="15rem" gap="lg">
      <div class="case">
        <div class="stage stage--ground">
          {#if groundOn}<Button variant="primary" icon="play" label="Start" />{:else}<Button
              variant="secondary"
              icon="play"
              label="Start"
            />{/if}
        </div>
        <h3>On the ground</h3>
        <p>Only the emitter’s own halo: a soft pool of tint under it.</p>
        <Switch label="Emitter on" bind:checked={groundOn} />
      </div>

      <div class="case">
        <div class="stage">
          <Layer level="panel" padding="lg" gap="sm" class="panel-demo">
            <strong>Night mode</strong>
            <span class="muted">Dims the lights after ten.</span>
            <Button
              variant="soft"
              size="lg"
              icon="moon"
              label="Night mode"
              iconOnly
              aria-pressed={panelOn}
              onclick={() => (panelOn = !panelOn)}
            />
          </Layer>
        </div>
        <h3>On a panel</h3>
        <p>A little light pools in the tile around the key. It stays inside the tile.</p>
        <Switch label="Emitter on" bind:checked={panelOn} />
      </div>

      <div class="case">
        <div class="stage stage--rail">
          <NavRail items={railItems} bind:current={section} orientation="horizontal" label="Demo" />
        </div>
        <h3>In glass</h3>
        <p>
          The selected item lights the pane from within: the tint shines through, and it follows the
          item when you pick another.
        </p>
      </div>
    </Grid>
  </Section>

  <Section
    title="From beside"
    description="Light reaches the surfaces next to an emitter too — on the side that faces it. Turn it off and watch both panels’ inner edges."
  >
    <div class="between">
      <Layer level="panel" padding="lg" class="side"><strong>Draft</strong></Layer>
      {#if betweenOn}
        <Button variant="primary" label="Publish" onclick={() => (betweenOn = false)} />
      {:else}
        <Button variant="secondary" label="Publish" onclick={() => (betweenOn = true)} />
      {/if}
      <Layer level="panel" padding="lg" class="side"><strong>Live</strong></Layer>
    </div>
  </Section>

  <Section
    title="Over a photo"
    description="Over a picture, panels are glass: the gauge’s lit arc glows into the smoked pane around it."
  >
    <div class="photo">
      <Application contained image={backdrop}>
        <div class="photo-inner">
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
    </div>
  </Section>

  <Section title="Automatic, everywhere">
    <p>
      Every <code>Application</code> lights its page: it finds what is marked
      <code>data-emit</code>, measures where it is, and writes the light each nearby surface catches
      into that surface’s <code>--light</code>, which panels and glass paint under their own
      background. When something moves — a selection flowing to its new place, a press, a scroll —
      the light moves with it; at rest nothing runs.
    </p>
    <CodeBlock label="Emitters, reflectors and your own surfaces" code={lightCode} />
  </Section>

  <Section title="Rules">
    <Row gap="md" align="start" collapse="md" equal>
      <Layer level="panel" gap="sm">
        <h3>Do</h3>
        <ul>
          <li>Let light mean “on” or “chosen” — and only that.</li>
          <li>Keep one strong emitter per group: the primary action or the current place.</li>
          <li>Give status its own light: success green, danger red.</li>
        </ul>
      </Layer>
      <Layer level="panel" gap="sm">
        <h3>Don't</h3>
        <ul>
          <li>Light disabled things, or things that merely look nice.</li>
          <li>Rely on light alone: the state is also in the words and in assistive tech.</li>
          <li>Paint a glow by hand next to an emitter — the light does that for you.</li>
        </ul>
      </Layer>
    </Row>
  </Section>
</DocPage>

<style>
  .list {
    display: grid;
    gap: var(--space-1) 0;
    margin: 0;
  }
  .list dt {
    margin-top: var(--space-2);
    font-weight: var(--fw-semibold);
  }
  .list dd {
    margin: 0;
    color: var(--text-2);
  }
  .case {
    display: grid;
    align-content: start;
    gap: var(--space-2);
  }
  .case h3 {
    margin-top: var(--space-2);
    font-size: var(--fs-lg);
  }
  .case p,
  .muted {
    color: var(--text-2);
  }
  .stage {
    display: grid;
    place-items: center;
    min-height: 11rem;
    padding: var(--space-4);
    border-radius: var(--radius-card);
    border: 1px dashed var(--border-strong);
  }
  .stage :global(.panel-demo) {
    width: 100%;
    align-items: flex-start;
  }
  .between {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .between :global(.side) {
    flex: 1;
    min-height: 7rem;
    justify-content: center;
    align-items: center;
  }
  .photo {
    height: 26rem;
    border-radius: var(--radius-card);
    overflow: clip;
  }
  .photo-inner {
    display: grid;
    place-items: center;
    height: 100%;
    padding: var(--space-6);
  }
  .photo :global(.photo-card) {
    width: min(24rem, 100%);
  }
</style>
