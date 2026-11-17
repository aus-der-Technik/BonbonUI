<script lang="ts">
  /** Storybook-only: the tint playground — pick a colour, see everything recompute, copy the code. */
  import DocPage from './DocPage.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import IntroList, { type IntroItem } from './IntroList.svelte';
  import IntroRules from './IntroRules.svelte';
  import Section from '../patterns/layout/Section.svelte';
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
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
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
  let tab = $state('a');

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

  const families: IntroItem[] = [
    {
      term: 'Accent family',
      text: '`--accent`, `--accent-strong`, `--accent-ink`, `--accent-soft`, `--accent-faint`, `--accent-border`, and `--on-accent`: black or white, whichever reads on the tint.',
    },
    {
      term: 'Tint scale',
      text: '`--tint-50` to `--tint-900`, light to dark, for tinted sections, charts and badges.',
    },
    {
      term: 'Light',
      text: 'What is on or chosen shines in `--accent`, so the glow on nearby surfaces follows the tint too.',
    },
    {
      term: 'Backdrop',
      text: '`--bg` is a whisper of the tint; `--blob-1` to `--blob-3` use the tint and two hues turned around it, so any tint gets a harmonious mesh.',
    },
  ];

  const nested = ['#007aff', '#ff9500', '#af52de'];
</script>

<DocPage
  title="Colour & tint"
  lead="One colour themes everything. Pick a tint and every accent, selection, focus ring, glow and the backdrop follow; status colours stay put."
>
  <Section title="Try it">
    <p>Pick a tint, a theme, a radius and a density. The window below is a real Application.</p>
    <div class="controls">
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
    </div>

    <IntroDemo kind="window" height="31rem">
      <Application {tint} {theme} {radius} {density} contained>
        <Stack gap="lg" padding="lg">
          <Row gap="sm">
            <SearchField label="Search" bind:value={query} placeholder="Search projects" />
            <Spacer />
            <Button label="Cancel" />
            <Button variant="primary" icon="check" label="Save" />
          </Row>
          <Tabs
            label="Demo tabs"
            bind:value={tab}
            tabs={[
              { value: 'a', label: 'Overview' },
              { value: 'b', label: 'Activity', count: 4 },
              { value: 'c', label: 'Settings' },
            ]}
          />
          <Grid min="13rem">
            <Card title="Panel" headingLevel={4} gap="sm">
              <Switch bind:checked={notify} label="Notifications" />
              <Slider bind:value={volume} min={0} max={100} label="Volume" />
            </Card>
            <Card title="Selected" headingLevel={4} selected gap="sm">
              <Row gap="xs">
                <Badge tone="brand" label="Accent" />
                <Badge tone="live" label="Live" />
                <Badge tone="danger" label="Danger" />
              </Row>
              <Button variant="danger" icon="trash" label="Delete project" />
            </Card>
            <Card surface="ink" gap="xs">
              <span class="ink-label">Volume</span>
              <span class="ink-value"><DotMatrix value="{volume}%" size="xl" /></span>
            </Card>
          </Grid>
          <div class="swatches">
            {#each derived as [name, use] (name)}
              <figure>
                <span class="chip" style:background="var({name})"></span>
                <figcaption><span class="mono">{name}</span><small>{use}</small></figcaption>
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
    </IntroDemo>
    <CodeBlock label="Your theme" code={tintCode(tint, theme, radius, density)} />
  </Section>

  <Section title="How it works">
    <p>
      <code>Application</code> sets <code>--tint</code> on its element, and tokens.css computes the
      rest there in pure CSS. Every element with <code>data-tint</code> or <code>data-theme</code>
      re-declares the derived tokens, so a nested Application can carry a tint of its own.
    </p>
    <IntroList items={families} />
    <div class="nested">
      {#each nested as t (t)}
        <IntroDemo kind="window" height="7.5rem">
          <Application tint={t} contained>
            <div class="nested-inner">
              <Button variant="primary" label="Save" />
              <Badge tone="brand" label={t} />
            </div>
          </Application>
        </IntroDemo>
      {/each}
    </div>
  </Section>

  <Section title="Fixed colours">
    <p>
      Status colours never follow the tint, so meaning never changes: delete is always red. The
      candy palette is for categories, tags, charts and app icons.
    </p>
    <div class="swatches">
      {#each status as [name, use] (name)}
        <figure>
          <span class="chip" style:background="var({name})"></span>
          <figcaption><span class="mono">{name}</span><small>{use}</small></figcaption>
        </figure>
      {/each}
    </div>
    <div class="palette">
      {#each palette as c (c)}
        <figure>
          <span class="dot" style:background="var(--color-{c})"></span>
          <figcaption><span class="mono">--color-{c}</span></figcaption>
        </figure>
      {/each}
    </div>
  </Section>

  <Section title="Rules">
    <IntroRules
      dos={[
        'Spend the accent on the main action and the current selection.',
        'Keep about 90 % of a screen neutral.',
        'Use the candy palette for categories, never for state.',
      ]}
      donts={[
        'Use the accent for errors or destructive actions: those are `--danger`.',
        'Write a literal colour in a component. Use a token, so tint and theme follow.',
        'Let colour carry meaning alone: pair it with an icon or a word.',
      ]}
    />
  </Section>
</DocPage>

<style>
  .controls {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: var(--space-4) var(--space-8);
  }
  .label {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.18em;
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
    box-shadow: var(--panel-shadow);
    cursor: pointer;
    transition: transform var(--motion-quick) var(--ease-spring);
  }
  .preset:hover {
    transform: scale(1.12);
  }
  .preset.on {
    outline: 2px solid var(--text);
    outline-offset: 2px;
  }
  .preset:focus-visible {
    outline: var(--focus-ring);
  }
  .ink-label {
    font-size: var(--fs-xs);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .ink-value {
    color: var(--accent);
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
  figcaption .mono {
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
    overflow: clip;
  }
  .scale span {
    padding: var(--space-4) 0 var(--space-1);
    text-align: center;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    color: var(--tint-900);
  }
  .scale span:nth-child(n + 6) {
    color: var(--tint-50);
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
    box-shadow: inset 0 1px 0 var(--pill-light);
  }
  .nested {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
    gap: var(--space-4);
  }
  .nested-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    height: 100%;
  }
</style>
