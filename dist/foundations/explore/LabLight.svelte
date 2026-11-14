<script lang="ts">
  /**
   * Storybook-only: light from `utils/light.ts`. Three emitters (`data-emit`) you can switch,
   * recolour and drag over two panels and a pane of glass; the page's own light field lights
   * them, and what each surface catches is read back from its `--light`. The light models can be
   * tuned live — the lab writes them into the real `LIGHT_MODELS` and puts the library's values
   * back when you leave.
   */
  import { onDestroy, tick } from 'svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import CodeBlock from '../../patterns/molecules/CodeBlock.svelte';
  import { LIGHT_MODELS, reflectKind } from '../../utils/light';
  import { lightCode, type EmitKind, type LabEmitter, type LightModels } from './labCode';

  interface Emitter extends LabEmitter {
    x: number;
    y: number;
  }

  let emitters = $state<Emitter[]>([
    { name: 'A', on: true, kind: '', x: 0.46, y: 0.3 },
    { name: 'B', on: true, kind: 'soft', x: 0.16, y: 0.78 },
    { name: 'C', on: false, kind: 'danger', x: 0.86, y: 0.74 },
  ]);
  const kinds: { value: EmitKind; label: string }[] = [
    { value: '', label: 'Full' },
    { value: 'soft', label: 'Soft' },
    { value: 'ok', label: 'OK' },
    { value: 'danger', label: 'Danger' },
  ];

  // ── The surfaces, in fractions of the stage ───────────────────────────────────────────────
  const surfaces = [
    { id: 'left', label: 'Left panel', x: 0.06, y: 0.09, w: 0.3, h: 0.4 },
    { id: 'glass', label: 'Glass pane', x: 0.27, y: 0.58, w: 0.46, h: 0.3 },
    { id: 'right', label: 'Right panel', x: 0.64, y: 0.09, w: 0.3, h: 0.4 },
  ] as const;
  type SurfaceId = (typeof surfaces)[number]['id'];
  type Rect = { x: number; y: number; w: number; h: number };
  const STAGE: Rect = { x: 0, y: 0, w: 1, h: 1 };

  // A light dropped on a surface becomes part of it, so the surface's "on it" light applies;
  // while it is dragged it belongs to the stage.
  const hostOf = (e: Emitter, i: number): SurfaceId | 'stage' =>
    dragging === i
      ? 'stage'
      : (surfaces.find((r) => e.x > r.x && e.x < r.x + r.w && e.y > r.y && e.y < r.y + r.h)?.id ??
        'stage');

  // ── Dragging ──────────────────────────────────────────────────────────────────────────────
  let stage = $state<HTMLElement>();
  let dragging = $state<number | null>(null);
  const clamp = (v: number) => Math.min(0.96, Math.max(0.04, v));

  function moveTo(i: number, event: PointerEvent) {
    const e = emitters[i];
    if (!stage || !e) return;
    const r = stage.getBoundingClientRect();
    e.x = clamp((event.clientX - r.left) / r.width);
    e.y = clamp((event.clientY - r.top) / r.height);
  }
  // The pressed button is re-rendered elsewhere as it leaves a surface, so the drag listens on
  // the window rather than capturing the pointer on the button.
  function grab(i: number, event: PointerEvent) {
    if (event.button !== 0) return;
    event.preventDefault();
    dragging = i;
    moveTo(i, event);
    const move = (ev: PointerEvent) => moveTo(i, ev);
    const drop = () => {
      dragging = null;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', drop);
      window.removeEventListener('pointercancel', drop);
      refocus(i);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', drop);
    window.addEventListener('pointercancel', drop);
  }
  async function refocus(i: number) {
    await tick();
    stage?.querySelector<HTMLElement>(`[data-light="${emitters[i]?.name}"]`)?.focus();
  }
  function nudge(i: number, event: KeyboardEvent) {
    const e = emitters[i];
    const step = event.shiftKey ? 0.1 : 0.02;
    const d = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    }[event.key];
    if (!e || !d) return;
    event.preventDefault();
    e.x = clamp(e.x + d[0]!);
    e.y = clamp(e.y + d[1]!);
    refocus(i);
  }

  // ── What each surface catches, read back from the --light the field wrote ─────────────────
  let caught = $state<Record<SurfaceId, string>>({ left: '', glass: '', right: '' });
  let kindOf = $state<Record<SurfaceId, string>>({ left: '', glass: '', right: '' });
  let inspect = $state<SurfaceId>('left');

  $effect(() => {
    if (!stage) return;
    const read = () => {
      for (const s of surfaces) {
        const el = stage?.querySelector<HTMLElement>(`[data-lab-surface="${s.id}"]`);
        if (!el) continue;
        caught[s.id] = el.style.getPropertyValue('--light');
        kindOf[s.id] = reflectKind(el);
      }
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(stage, { subtree: true, attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  });

  const lights = (value: string) => (value.match(/radial-gradient/g) ?? []).length;
  const strongest = (value: string) =>
    Math.max(0, ...[...value.matchAll(/ ([\d.]+)%, transparent\)/g)].map((m) => Number(m[1])));

  // ── The models, tuned live ────────────────────────────────────────────────────────────────
  const copy = (m: LightModels): LightModels => ({ glass: { ...m.glass }, panel: { ...m.panel } });
  const library = copy(LIGHT_MODELS);
  let models = $state<LightModels>(copy(LIGHT_MODELS));
  let poke = 0;

  $effect(() => {
    for (const k of ['glass', 'panel'] as const) Object.assign(LIGHT_MODELS[k], models[k]);
    // The field re-measures on a mutation inside the page: a style change on the stage is one.
    stage?.style.setProperty('--lab-models', String(++poke));
  });
  onDestroy(() => {
    for (const k of ['glass', 'panel'] as const) Object.assign(LIGHT_MODELS[k], library[k]);
  });

  const params = [
    { key: 'inside', label: 'On it', max: 60, step: 1, unit: ' %' },
    { key: 'beside', label: 'From beside', max: 40, step: 1, unit: ' %' },
    { key: 'spread', label: 'Spread', max: 6, step: 0.1, unit: ' ×' },
  ] as const;
</script>

{#snippet light(e: Emitter, i: number, box: Rect)}
  <button
    type="button"
    class="emitter emitter--{e.on ? e.kind || 'full' : 'off'}"
    class:dragging={dragging === i}
    style:left="{((e.x - box.x) / box.w) * 100}%"
    style:top="{((e.y - box.y) / box.h) * 100}%"
    data-emit={e.on ? e.kind : undefined}
    data-light={e.name}
    aria-label="Light {e.name}: drag, or use the arrow keys, to move it"
    onpointerdown={(event) => grab(i, event)}
    onkeydown={(event) => nudge(i, event)}>{e.name}</button
  >
{/snippet}
{#snippet lightsOn(id: SurfaceId | 'stage', box: Rect)}
  {#each emitters as e, i (e.name)}
    {#if hostOf(e, i) === id}{@render light(e, i, box)}{/if}
  {/each}
{/snippet}

<div class="stage" bind:this={stage} data-flow-off>
  {#each surfaces as r (r.id)}
    <div
      class="slot"
      style:left="{r.x * 100}%"
      style:top="{r.y * 100}%"
      style:width="{r.w * 100}%"
      style:height="{r.h * 100}%"
    >
      {#if r.id === 'glass'}
        <div class="pane" data-reflect="glass" data-lab-surface="glass">
          <strong>Glass</strong>
          <span class="muted">Light scatters inside: wider, stronger.</span>
          {@render lightsOn(r.id, r)}
        </div>
      {:else}
        <Layer level="panel" padding="md" gap="xs" class="lab-surface" data-lab-surface={r.id}>
          <strong>Panel</strong>
          <span class="muted"
            >{r.id === 'left'
              ? 'A solid tile: a little light pools on it.'
              : 'The side facing a light brightens.'}</span
          >
          {@render lightsOn(r.id, r)}
        </Layer>
      {/if}
    </div>
  {/each}
  {@render lightsOn('stage', STAGE)}
</div>

<p class="hint">
  Drag a light beside a surface to light its facing side, or drop it onto one: then it sits on it,
  and the surface's <em>on it</em> light applies.
</p>

<div class="emitter-controls">
  {#each emitters as e (e.name)}
    <div class="emitter-row">
      <span class="tag emitter--{e.on ? e.kind || 'full' : 'off'}">{e.name}</span>
      <Switch label="On" size="sm" bind:checked={e.on} />
      <SegmentedControl
        label="Light {e.name} colour"
        size="sm"
        options={kinds}
        bind:value={e.kind}
      />
    </div>
  {/each}
</div>

<div class="lab">
  <div class="caught">
    <h3>What each surface catches</h3>
    <ul class="list">
      {#each surfaces as s (s.id)}
        <li>
          <button
            type="button"
            class="pick"
            aria-pressed={inspect === s.id}
            onclick={() => (inspect = s.id)}
          >
            <span>{s.label} <span class="kind">· {kindOf[s.id]}</span></span>
            <span class="figure">
              {#if caught[s.id]}{lights(caught[s.id])} light{lights(caught[s.id]) === 1 ? '' : 's'},
                strongest {strongest(caught[s.id]).toFixed(1)} %{:else}nothing{/if}
            </span>
          </button>
        </li>
      {/each}
    </ul>
    <CodeBlock
      label="What the {surfaces.find((s) => s.id === inspect)?.label.toLowerCase()} catches, as CSS"
      code={caught[inspect] || '(none — no emitter is near enough)'}
      wrap
    />
  </div>
  <div class="models">
    <h3>The light models</h3>
    {#each ['glass', 'panel'] as const as k (k)}
      <div class="model">
        <strong class="model-name">{k === 'glass' ? 'Glass' : 'Panel'}</strong>
        {#each params as p (p.key)}
          <Slider
            label={p.label}
            bind:value={models[k][p.key]}
            min={0}
            max={p.max}
            step={p.step}
            format={(v) => `${v}${p.unit}`}
          />
        {/each}
      </div>
    {/each}
    <Button
      size="sm"
      shape="pill"
      variant="ghost"
      icon="undo"
      label="Library values"
      onclick={() => (models = copy(library))}
    />
  </div>
</div>

<CodeBlock label="What you set, in code" code={lightCode(emitters, models, library)} />

<style>
  .stage {
    position: relative;
    height: 24rem;
    border-radius: var(--radius-card);
    border: 1px dashed var(--border-strong);
    overflow: clip;
    touch-action: none;
  }
  .slot {
    position: absolute;
    display: grid;
  }
  .slot :global(.lab-surface) {
    position: relative;
  }
  .pane {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-4);
    border-radius: var(--radius-card);
    border: 0.75px solid var(--layer-front-border);
    background: var(--light, none), var(--layer-front-bg);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    box-shadow: var(--layer-front-shadow);
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  p.hint {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }

  /* An emitter is a pill you act on (drag it); its fill says what kind of light it gives. */
  .emitter {
    position: absolute;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    translate: -50% -50%;
    border: 0;
    border-radius: var(--radius-pill);
    font: inherit;
    font-weight: var(--fw-semibold);
    cursor: grab;
    touch-action: none;
    transition: scale var(--motion-quick) var(--ease-out);
  }
  .emitter.dragging {
    cursor: grabbing;
    scale: 1.08;
  }
  .emitter:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }
  .emitter--full {
    background: var(--grad-primary);
    color: var(--on-accent);
    box-shadow: var(--shadow-primary);
  }
  .emitter--soft {
    background: var(--accent-soft);
    color: var(--accent-ink);
    box-shadow: inset 0 0 0 1px var(--accent-border);
  }
  .emitter--ok {
    background: var(--grad-success);
    color: var(--on-ok);
    box-shadow: var(--shadow-success);
  }
  .emitter--danger {
    background: var(--grad-danger);
    color: var(--on-danger);
  }
  .emitter--off {
    background: var(--soft-bg);
    color: var(--text-2);
    box-shadow: var(--soft-shadow);
  }

  .emitter-controls {
    display: grid;
    gap: var(--space-3);
  }
  .emitter-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
  }
  .tag {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }

  .lab {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
  }
  @media (max-width: 760px) {
    .lab {
      grid-template-columns: 1fr;
    }
  }
  .caught,
  .models {
    display: grid;
    gap: var(--space-4);
  }
  .models {
    justify-items: start;
  }
  .model {
    display: grid;
    gap: var(--space-3);
    width: 100%;
  }
  .model-name {
    font-size: var(--fs-sm);
  }
  .list {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--border);
  }
  .pick {
    display: flex;
    justify-content: space-between;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-2) var(--space-1);
    border: 0;
    border-bottom: 1px solid var(--border);
    background: none;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    text-align: left;
    cursor: pointer;
  }
  .pick[aria-pressed='true'] {
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
  }
  .pick:focus-visible {
    outline: var(--focus-ring);
  }
  .kind {
    color: var(--text-3);
    font-weight: var(--fw-regular);
  }
  .figure {
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
  }
</style>
