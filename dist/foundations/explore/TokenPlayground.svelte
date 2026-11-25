<script lang="ts">
  /**
   * Storybook-only: the four theme knobs of an Application — tint, theme, radius, density — set
   * on a live, contained Application with a representative set of components inside, and the
   * design tokens they move, read back from the browser (as resolved colours and lengths) next
   * to what a plain Application has.
   */
  import { tick } from 'svelte';
  import DocPage from '../DocPage.svelte';
  import Section from '../../patterns/layout/Section.svelte';
  import Application, { tintPresets } from '../../patterns/templates/Application.svelte';
  import Page from '../../patterns/templates/Page.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Row from '../../patterns/layout/Row.svelte';
  import Stack from '../../patterns/layout/Stack.svelte';
  import Spacer from '../../patterns/layout/Spacer.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Checkbox from '../../patterns/atoms/Checkbox.svelte';
  import Input from '../../patterns/atoms/Input.svelte';
  import ProgressBar from '../../patterns/atoms/ProgressBar.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import Swatch from '../../patterns/atoms/Swatch.svelte';
  import Avatar from '../../patterns/atoms/Avatar.svelte';
  import Card from '../../patterns/atoms/Card.svelte';
  import Alert from '../../patterns/molecules/Alert.svelte';
  import Field from '../../patterns/molecules/Field.svelte';
  import KpiTile from '../../patterns/molecules/KpiTile.svelte';
  import SearchField from '../../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import Tabs from '../../patterns/molecules/Tabs.svelte';
  import VariantPicker from '../../patterns/molecules/VariantPicker.svelte';
  import CodeBlock from '../../patterns/molecules/CodeBlock.svelte';
  import { changeCue } from '../../patterns/atoms/changed';
  import { tintCode } from '../snippets';
  import { explorePager } from './explore';

  type Theme = 'auto' | 'light' | 'dark';
  type Radius = 'square' | 'soft' | 'round';
  type Density = 'compact' | 'default' | 'comfortable';

  let tint = $state(tintPresets[2]!.value);
  let theme = $state<Theme>('light');
  let radius = $state<Radius>('soft');
  let density = $state<Density>('default');
  let onlyChanged = $state(true);

  // Inside the preview.
  let view = $state('list');
  let tab = $state('open');
  let notify = $state(true);

  const tokens = [
    { name: '--accent', kind: 'colour', by: 'tint' },
    { name: '--accent-strong', kind: 'colour', by: 'tint' },
    { name: '--accent-ink', kind: 'colour', by: 'tint, theme' },
    { name: '--accent-soft', kind: 'colour', by: 'tint, theme' },
    { name: '--accent-border', kind: 'colour', by: 'tint, theme' },
    { name: '--on-accent', kind: 'colour', by: 'tint' },
    { name: '--bg', kind: 'colour', by: 'tint, theme' },
    { name: '--layer-panel-bg', kind: 'colour', by: 'theme, tint' },
    { name: '--text', kind: 'colour', by: 'theme' },
    { name: '--text-2', kind: 'colour', by: 'theme' },
    { name: '--border', kind: 'colour', by: 'theme' },
    { name: '--ok', kind: 'colour', by: 'theme' },
    { name: '--danger', kind: 'colour', by: 'theme' },
    { name: '--radius-sm', kind: 'length', by: 'radius' },
    { name: '--radius-md', kind: 'length', by: 'radius' },
    { name: '--radius-card', kind: 'length', by: 'radius' },
    { name: '--radius-dialog', kind: 'length', by: 'radius' },
    { name: '--control-sm', kind: 'length', by: 'density' },
    { name: '--control-md', kind: 'length', by: 'density' },
    { name: '--control-lg', kind: 'length', by: 'density' },
  ] as const;
  type TokenName = (typeof tokens)[number]['name'];

  // ── Reading the tokens back ───────────────────────────────────────────────────────────────
  // A custom property's computed value is its text (a color-mix, a calc); probes inside each
  // Application turn it into what the browser draws: a colour through `color`, a length through
  // `width`, then a canvas pixel gives the colour as hex.
  let preview = $state<HTMLElement>();
  let reference = $state<HTMLElement>();
  let now = $state<Partial<Record<TokenName, string>>>({});
  let base = $state<Partial<Record<TokenName, string>>>({});

  let ctx: CanvasRenderingContext2D | null | undefined;
  function hex(colour: string): string {
    ctx ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    if (!ctx) return colour;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    const h = [r, g, b].map((v) => (v ?? 0).toString(16).padStart(2, '0')).join('');
    return a !== undefined && a < 255 ? `#${h} · ${Math.round((a / 255) * 100)} %` : `#${h}`;
  }

  function read(box: HTMLElement | undefined): Partial<Record<TokenName, string>> {
    const out: Partial<Record<TokenName, string>> = {};
    const probes = box?.querySelector<HTMLElement>('.probes');
    if (!probes) return out;
    for (const t of tokens) {
      const el = probes.querySelector<HTMLElement>(`[data-token="${t.name}"]`);
      if (!el) continue;
      const cs = getComputedStyle(el);
      out[t.name] =
        t.kind === 'colour' ? hex(cs.color) : `${Math.round(parseFloat(cs.width) * 10) / 10}px`;
    }
    return out;
  }

  $effect(() => {
    // Read again whenever a knob moves, once the new values have landed.
    void [tint, theme, radius, density];
    let frame = 0;
    tick().then(() => {
      frame = requestAnimationFrame(() => {
        now = read(preview);
        base = read(reference);
      });
    });
    return () => cancelAnimationFrame(frame);
  });

  const rows = $derived(
    tokens
      .map((t) => ({ ...t, base: base[t.name] ?? '', now: now[t.name] ?? '' }))
      .map((r) => ({ ...r, changed: r.base !== r.now })),
  );
  const shownRows = $derived(onlyChanged ? rows.filter((r) => r.changed) : rows);
  const changedCount = $derived(rows.filter((r) => r.changed).length);
</script>

{#snippet probes()}
  <div class="probes" aria-hidden="true">
    {#each tokens as t (t.name)}
      <span
        data-token={t.name}
        style:color={t.kind === 'colour' ? `var(${t.name})` : undefined}
        style:width={t.kind === 'length' ? `var(${t.name})` : undefined}
      ></span>
    {/each}
  </div>
{/snippet}

<DocPage
  eyebrow="Explore"
  title="Token playground"
  lead="One colour, a scheme, a corner shape and a density: that is the whole theme of an Application. Set them here and watch a small app follow, with the tokens that moved, read straight from the browser."
  pager={explorePager('Token playground')}
>
  <Section title="Set the theme">
    <div class="knobs">
      <div class="knob">
        <VariantPicker
          label="Tint"
          kind="swatch"
          bind:value={tint}
          options={tintPresets.map((p) => ({ value: p.value, label: p.name, color: p.value }))}
        />
        <label class="custom">
          <input type="color" bind:value={tint} />
          <span>Any colour <code>{tint}</code></span>
        </label>
      </div>
      <div class="knob">
        <span class="knob-label" id="theme-label">Theme</span>
        <SegmentedControl
          labelledby="theme-label"
          size="sm"
          bind:value={theme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Follow the OS' },
          ]}
        />
      </div>
      <div class="knob">
        <span class="knob-label" id="radius-label">Radius</span>
        <SegmentedControl
          labelledby="radius-label"
          size="sm"
          bind:value={radius}
          options={[
            { value: 'square', label: 'Square' },
            { value: 'soft', label: 'Soft' },
            { value: 'round', label: 'Round' },
          ]}
        />
      </div>
      <div class="knob">
        <span class="knob-label" id="density-label">Density</span>
        <SegmentedControl
          labelledby="density-label"
          size="sm"
          bind:value={density}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'default', label: 'Default' },
            { value: 'comfortable', label: 'Comfortable' },
          ]}
        />
      </div>
    </div>
  </Section>

  <Section
    title="The app follows"
    description="A contained Application with exactly these four props. Everything inside takes its colours, corners and heights from the tokens; nothing in it knows the tint."
  >
    <div class="preview" bind:this={preview}>
      <Application contained {tint} {theme} {radius} {density}>
        <Page title="Orders" subtitle="token playground" gap="md">
          {#snippet actions()}
            <Button variant="primary" shape="pill" icon="plus" label="New order" />
          {/snippet}
          <Layer level="front" direction="horizontal" gap="sm" wrap>
            <SegmentedControl
              label="View"
              size="sm"
              bind:value={view}
              options={[
                { value: 'list', label: 'List' },
                { value: 'board', label: 'Board' },
              ]}
            />
            <Spacer />
            <SearchField label="Search orders" size="sm" shape="pill" value="" />
          </Layer>
          <Grid min="10rem" gap="md">
            <KpiTile label="Open" value={24} delta="+3" trend="up" />
            <KpiTile label="Shipped" value={118} delta="+12 %" trend="up" />
            <KpiTile label="Returns" value={3} delta="−1" trend="down" goodWhen="down" />
          </Grid>
          <Row gap="md" align="start" collapse="md" equal>
            <Layer level="panel" gap="md">
              <Tabs
                label="Orders"
                bind:value={tab}
                tabs={[
                  { value: 'open', label: 'Open', count: 24 },
                  { value: 'done', label: 'Done' },
                ]}
              />
              <Field label="Customer">
                {#snippet children({ id })}<Input {id} value="Ada Example" />{/snippet}
              </Field>
              <Switch label="Notify the customer" bind:checked={notify} />
              <Checkbox checked label="Gift wrap" />
              <ProgressBar value={64} label="Packed" showValue />
              <Row gap="sm">
                <Button variant="primary" label="Ship" />
                <Button variant="soft" label="Hold" />
                <Button variant="danger" label="Cancel" />
              </Row>
            </Layer>
            <Stack gap="md">
              <Card selected title="Next pickup" headingLevel={3}>
                <Row gap="sm">
                  <Avatar name="Ben Sample" size={32} />
                  <Stack gap="none">
                    <strong>Ben Sample</strong>
                    <span class="muted">Today, 14:00</span>
                  </Stack>
                  <Spacer />
                  <Badge tone="live" label="Ready" />
                </Row>
              </Card>
              <Alert tone="ok" message="All orders from yesterday shipped." />
              <Alert tone="danger" message="One payment failed." />
            </Stack>
          </Row>
        </Page>
        {@render probes()}
      </Application>
    </div>
    <!-- The same, untouched: what the tokens are without the four props. -->
    <div class="reference" aria-hidden="true" inert bind:this={reference}>
      <Application contained gradient={false} animate={false} flow={false} light={false}>
        {@render probes()}
      </Application>
    </div>
  </Section>

  <Section
    title="The tokens that moved"
    description="Resolved by the browser inside the preview, next to a plain Application on this page. Colours are what is drawn, lengths are what they come to."
  >
    <div class="table-head">
      <Switch label="Only what changed" size="sm" bind:checked={onlyChanged} />
      <span class="muted">{changedCount} of {tokens.length} changed</span>
    </div>
    {#if shownRows.length}
      <table class="tokens">
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Follows</th>
            <th scope="col">Plain</th>
            <th scope="col">Now</th>
          </tr>
        </thead>
        <tbody>
          {#each shownRows as r (r.name)}
            <tr class:changed={r.changed}>
              <th scope="row"><code>{r.name}</code></th>
              <td class="muted">{r.by}</td>
              <td>
                <span class="value">
                  {#if r.kind === 'colour'}<Swatch
                      color={r.base.split(' ')[0] ?? ''}
                      size={12}
                    />{/if}
                  {r.base}
                </span>
              </td>
              <td>
                <span class="value" use:changeCue={r.now}>
                  {#if r.kind === 'colour'}<Swatch
                      color={r.now.split(' ')[0] ?? ''}
                      size={12}
                    />{/if}
                  {r.now}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="muted">Nothing differs from a plain Application. Pick another tint or theme.</p>
    {/if}
  </Section>

  <Section title="In code">
    <CodeBlock label="Your Application" code={tintCode(tint, theme, radius, density)} />
    <p>
      The four props only set <code>--tint</code>, <code>data-theme</code>,
      <code>--radius-scale</code> and <code>--density</code> on the Application's root; every other token
      is computed from them in CSS, so a change re-themes at once, and an Application inside another can
      have a tint of its own.
    </p>
  </Section>
</DocPage>

<style>
  .knobs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: var(--space-6) var(--space-8);
  }
  .knob {
    display: grid;
    gap: var(--space-2);
    align-content: start;
    justify-items: start;
  }
  .knob-label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .custom {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-sm);
    cursor: pointer;
  }
  .custom input {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-pill);
    background: none;
    cursor: pointer;
  }
  .preview {
    height: 40rem;
    border-radius: var(--radius-card);
    overflow: clip;
    border: 1px solid var(--border-strong);
  }
  .reference {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    visibility: hidden;
  }
  .probes {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
  }
  .probes span {
    display: block;
    position: absolute;
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  .table-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
  }
  .tokens {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--fs-sm);
  }
  .tokens th,
  .tokens td {
    padding: var(--space-2) var(--space-3) var(--space-2) 0;
    border-bottom: 1px solid var(--border);
    text-align: left;
    vertical-align: middle;
  }
  .tokens thead th {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .tokens tbody th {
    font-weight: var(--fw-regular);
  }
  /* Twenty names in the accent would be far more than the 10 % of colour: keep them ink. */
  .tokens tbody th code {
    padding: 0;
    background: none;
    color: var(--text);
  }
  .tokens tr:not(.changed) td:last-child {
    color: var(--text-3);
  }
  .value {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 1px var(--space-1);
    border-radius: var(--radius-xs);
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  @media (max-width: 640px) {
    .tokens th:nth-child(2),
    .tokens td:nth-child(2) {
      display: none;
    }
  }
</style>
