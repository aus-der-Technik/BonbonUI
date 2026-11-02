<script lang="ts">
  /** Storybook-only: the tint playground — pick a colour, see everything recompute, copy the code. */
  import DocPage from './DocPage.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Application, { tintPresets } from '../patterns/templates/Application.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Switch from '../patterns/atoms/Switch.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import { tintCode } from './snippets';

  let tint = $state('#5a9854');
  let theme = $state<'auto' | 'light' | 'dark'>('auto');
  let radius = $state<'square' | 'soft' | 'round'>('soft');
  let density = $state<'compact' | 'default' | 'comfortable'>('default');
  let notify = $state(true);
  let volume = $state(60);
  let query = $state('');

  const derived = [
    ['--accent', 'buttons, links, focus'],
    ['--accent-strong', 'hover, pressed'],
    ['--accent-ink', 'accent as text'],
    ['--accent-soft', 'selected background'],
    ['--accent-faint', 'hover background'],
    ['--tint-2', 'backdrop companion'],
    ['--tint-3', 'backdrop companion'],
  ];
  const scale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const palette = [
    'red',
    'orange',
    'yellow',
    'green',
    'mint',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'purple',
    'pink',
    'brown',
    'gray',
  ];
  const status = [
    ['--danger', 'delete, errors'],
    ['--ok', 'success, live'],
    ['--warn', 'attention'],
    ['--info', 'neutral info'],
  ];
</script>

<DocPage
  title="Colour & tint"
  lead="One colour themes everything. Pick a tint — every accent, selection, focus ring, glow, the tint scale and the slowly drifting backdrop are computed from it in pure CSS. Status colours stay fixed, so danger is always red."
>
  <Section title="Try it">
    <Layer level="panel" gap="md">
      <Row gap="md" align="end">
        <Stack gap="xs">
          <span class="label">Tint</span>
          <Row gap="xs">
            <input class="picker" type="color" bind:value={tint} aria-label="Custom tint" />
            {#each tintPresets as p (p.value)}
              <button
                type="button"
                class="preset"
                class:on={p.value === tint}
                style:background={p.value}
                title={p.name}
                aria-label={p.name}
                aria-pressed={p.value === tint}
                onclick={() => (tint = p.value)}
              ></button>
            {/each}
          </Row>
        </Stack>
        <Stack gap="xs">
          <span class="label">Theme</span>
          <SegmentedControl
            label="Theme"
            size="sm"
            bind:value={theme}
            options={[
              { value: 'auto', label: 'Auto' },
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
          />
        </Stack>
        <Stack gap="xs">
          <span class="label">Radius</span>
          <SegmentedControl
            label="Radius"
            size="sm"
            bind:value={radius}
            options={[
              { value: 'square', label: 'Square' },
              { value: 'soft', label: 'Soft' },
              { value: 'round', label: 'Round' },
            ]}
          />
        </Stack>
        <Stack gap="xs">
          <span class="label">Density</span>
          <SegmentedControl
            label="Density"
            size="sm"
            bind:value={density}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'default', label: 'Default' },
              { value: 'comfortable', label: 'Comfortable' },
            ]}
          />
        </Stack>
      </Row>
    </Layer>

    <div class="stage">
      <Application {tint} {theme} {radius} {density} contained>
        <Stack gap="lg" padding="lg">
          <Row gap="sm">
            <SearchField label="Search" bind:value={query} placeholder="Search projects" />
            <Spacer />
            <Button label="Cancel" />
            <Button variant="primary" icon="check" label="Save" />
          </Row>
          <Grid min="15rem">
            <Card title="Panel">
              <Stack gap="sm">
                <Switch bind:checked={notify} label="Notifications" />
                <Slider bind:value={volume} min={0} max={100} label="Volume" />
              </Stack>
            </Card>
            <Card title="Selected" selected>
              <Stack gap="sm">
                <Row gap="xs">
                  <Badge tone="brand" label="Accent" />
                  <Badge tone="live" label="Live" />
                  <Badge tone="danger" label="Danger" />
                  <Badge tone="info" label="Info" />
                </Row>
                <Button variant="danger" icon="trash" label="Delete project" />
              </Stack>
            </Card>
          </Grid>
          <Tabs
            label="Demo tabs"
            tabs={[
              { value: 'a', label: 'Overview' },
              { value: 'b', label: 'Activity', count: 4 },
              { value: 'c', label: 'Settings' },
            ]}
          />
          <div class="swatches">
            {#each derived as [name, use] (name)}
              <figure>
                <span class="chip" style:background="var({name})"></span>
                <figcaption><code>{name}</code><small>{use}</small></figcaption>
              </figure>
            {/each}
          </div>
          <div class="scale" aria-label="Tint scale">
            {#each scale as step (step)}
              <span style:background="var(--tint-{step})" title="--tint-{step}">{step}</span>
            {/each}
          </div>
        </Stack>
      </Application>
    </div>
    <CodeBlock label="Your theme" code={tintCode(tint, theme, radius, density)} />
  </Section>

  <Section
    title="How it works"
    description="Application sets --tint (plus --radius-scale and --density) on its element. tokens.css re-declares every derived token on any element with data-tint or data-theme, so the colours are computed where the tint is set — nested Applications can even use different tints."
  >
    <Grid min="15rem">
      <Layer level="panel" gap="xs">
        <h3>Accent family</h3>
        <p>
          <code>--accent</code>, <code>--accent-strong</code>, <code>--accent-ink</code>,
          <code>--accent-soft</code>, <code>--accent-faint</code>, <code>--accent-border</code>,
          <code>--on-accent</code> (black or white, whichever reads on the tint).
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <h3>Tint scale</h3>
        <p>
          <code>--tint-50</code> … <code>--tint-900</code> for tinted sections, charts and badges — light
          to dark, always in tune with the tint.
        </p>
      </Layer>
      <Layer level="panel" gap="xs">
        <h3>Backdrop</h3>
        <p>
          <code>--bg</code> is a whisper of the tint; <code>--blob-1…3</code> use the tint and two hues
          rotated around it, so any tint gets a harmonic mesh.
        </p>
      </Layer>
    </Grid>
  </Section>

  <Section
    title="Fixed colours"
    description="Status colours do not follow the tint, so meaning never changes: delete is always red. The candy palette is for categories, tags, charts and app icons."
  >
    <Stack gap="md">
      <div class="swatches">
        {#each status as [name, use] (name)}
          <figure>
            <span class="chip" style:background="var({name})"></span>
            <figcaption><code>{name}</code><small>{use}</small></figcaption>
          </figure>
        {/each}
      </div>
      <div class="palette">
        {#each palette as c (c)}
          <figure>
            <span class="dot" style:background="var(--color-{c})"></span>
            <figcaption><code>--color-{c}</code></figcaption>
          </figure>
        {/each}
      </div>
    </Stack>
  </Section>
</DocPage>

<style>
  .label {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .picker {
    width: 34px;
    height: 34px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    cursor: pointer;
  }
  .picker::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  .picker::-webkit-color-swatch {
    border: 2px solid var(--pill-light);
    border-radius: var(--radius-pill);
  }
  .preset {
    width: 26px;
    height: 26px;
    border-radius: var(--radius-pill);
    border: 2px solid var(--pill-light);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    transition: transform var(--duration-fast) cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .preset:hover {
    transform: scale(1.12);
  }
  .preset.on {
    outline: 2px solid var(--text);
    outline-offset: 2px;
  }
  .stage {
    height: 560px;
    border-radius: var(--radius-card);
    overflow: hidden;
    border: 1px solid var(--border-strong);
    box-shadow: var(--glass-shadow);
  }
  .swatches {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
    gap: var(--space-3);
  }
  figure {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0;
  }
  figcaption {
    display: grid;
    line-height: 1.25;
  }
  figcaption code {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text);
  }
  small {
    font-size: var(--fs-2xs);
    color: var(--text-3);
  }
  .chip {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-strong);
  }
  .scale {
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .scale span {
    padding: var(--space-4) 0 var(--space-1);
    text-align: center;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    color: rgba(0, 0, 0, 0.55);
  }
  .scale span:nth-child(n + 6) {
    color: rgba(255, 255, 255, 0.8);
  }
  .palette {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
    gap: var(--space-3);
  }
  .dot {
    width: 28px;
    height: 28px;
    border-radius: var(--radius-pill);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  h3 {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
  }
  p {
    font-size: var(--fs-md);
  }
</style>
