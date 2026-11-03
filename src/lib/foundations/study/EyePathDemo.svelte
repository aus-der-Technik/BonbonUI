<script lang="ts">
  /**
   * Storybook-only: the locality experiment. The same task — rename a project — done two ways.
   * Every place you click and every place the answer appears is recorded, and the path your eyes
   * had to travel is drawn over the panel with its length in pixels.
   */
  import { tick } from 'svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Badge from '../../patterns/atoms/Badge.svelte';
  import Icon from '../../patterns/atoms/Icon.svelte';

  interface Props {
    /** `far` — header button, centred dialog, corner toast. `near` — everything on the card. */
    mode: 'far' | 'near';
  }

  let { mode }: Props = $props();

  type Point = { x: number; y: number; kind: 'act' | 'answer' };
  let panel = $state<HTMLElement | undefined>();
  let points = $state<Point[]>([]);
  let name = $state('Spring campaign');
  let draft = $state('');
  let selected = $state(false);
  let editing = $state(false);
  let dialog = $state(false);
  let toast = $state(false);
  let renamed = $state(false);

  const length = $derived(
    Math.round(
      points.reduce((sum, p, i) => {
        const q = points[i - 1];
        return q ? sum + Math.hypot(p.x - q.x, p.y - q.y) : sum;
      }, 0),
    ),
  );
  const done = $derived(renamed);

  function mark(el: Element | null | undefined, kind: Point['kind'] = 'act') {
    if (!el || !panel) return;
    const p = panel.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    points.push({ x: r.left + r.width / 2 - p.left, y: r.top + r.height / 2 - p.top, kind });
  }

  const target = (e: Event) => e.currentTarget as Element;

  function reset() {
    points = [];
    name = 'Spring campaign';
    selected = editing = dialog = toast = renamed = false;
  }

  // The far way: select the card, press "Rename" in the header, type in a centred dialog,
  // confirm, and read the result in a toast in the opposite corner.
  function selectCard(e: Event) {
    if (mode !== 'far' || renamed) return;
    selected = true;
    mark(target(e));
  }
  async function openDialog(e: Event) {
    mark(target(e));
    draft = name;
    dialog = true;
    await tick();
    const field = panel?.querySelector<HTMLInputElement>('.dialog input');
    field?.focus();
    field?.select();
    mark(field, 'answer');
  }
  async function saveDialog(e: Event) {
    mark(target(e));
    name = draft.trim() || name;
    dialog = false;
    toast = true;
    renamed = true;
    await tick();
    mark(panel?.querySelector('.toast'), 'answer');
  }

  // The near way: the pencil on the card turns the title into a field, right there; the check
  // next to it saves; the card itself says it worked.
  async function startEdit(e: Event) {
    mark(target(e));
    draft = name;
    editing = true;
    await tick();
    const field = panel?.querySelector<HTMLInputElement>('.inline input');
    field?.focus();
    field?.select();
    mark(field, 'answer');
  }
  async function saveInline(e?: Event) {
    if (e) mark(target(e));
    name = draft.trim() || name;
    editing = false;
    renamed = true;
    await tick();
    mark(panel?.querySelector('.done-chip'), 'answer');
  }
</script>

<div class="demo" bind:this={panel}>
  <header class="bar">
    {#if mode === 'far'}
      <Button
        size="sm"
        icon="edit"
        label="Rename"
        disabled={!selected || renamed}
        onclick={openDialog}
      />
    {/if}
    <span class="crumb">Projects</span>
  </header>

  <div class="cards">
    {#snippet body()}
      <span class="thumb"><Icon name="rocket" size={18} /></span>
      {#if editing}
        <form
          class="inline"
          onsubmit={(e) => {
            e.preventDefault();
            saveInline();
          }}
        >
          <input bind:value={draft} aria-label="Project name" />
          <Button size="sm" iconOnly icon="check" label="Save name" onclick={saveInline} />
        </form>
      {:else}
        <strong class="title">{name}</strong>
        {#if mode === 'near' && !renamed}
          <Button size="sm" iconOnly icon="pencil" label="Rename" onclick={startEdit} />
        {/if}
      {/if}
      {#if mode === 'near' && renamed}
        <span class="done-chip"><Badge tone="ok" icon="check" label="Renamed" /></span>
      {/if}
      <span class="meta">12 tasks · due Friday</span>
    {/snippet}
    {#if mode === 'far'}
      <button
        type="button"
        class="card"
        class:chosen={selected}
        class:flash={renamed}
        aria-pressed={selected}
        onclick={selectCard}>{@render body()}</button
      >
    {:else}
      <article class="card" class:flash={renamed}>{@render body()}</article>
    {/if}
    <article class="card dim"><span class="thumb"></span><strong>Partner portal</strong></article>
    <article class="card dim"><span class="thumb"></span><strong>Team offsite</strong></article>
  </div>

  {#if dialog}
    <div class="scrim">
      <form
        class="dialog"
        onsubmit={(e) => {
          e.preventDefault();
        }}
      >
        <strong>Rename project</strong>
        <input bind:value={draft} aria-label="Project name" />
        <div class="actions">
          <Button size="sm" label="Cancel" onclick={() => (dialog = false)} />
          <Button size="sm" variant="primary" label="Save" onclick={saveDialog} />
        </div>
      </form>
    </div>
  {/if}

  {#if toast}
    <div class="toast" role="status"><Icon name="check-circle" size={16} /> Project renamed</div>
  {/if}

  {#if points.length > 1}
    <svg class="path" aria-hidden="true">
      <polyline points={points.map((p) => `${p.x},${p.y}`).join(' ')} />
      {#each points as p, i (i)}
        <circle cx={p.x} cy={p.y} r="11" class={p.kind} />
        <text x={p.x} y={p.y + 4} class={p.kind}>{i + 1}</text>
      {/each}
    </svg>
  {/if}

  <footer class="score" class:done>
    {#if done}
      <span
        ><strong>{length.toLocaleString('en')} px</strong> of eye travel · {points.length} stops</span
      >
      <Button size="xs" icon="reload" label="Again" onclick={reset} />
    {:else}
      <span
        >{mode === 'far'
          ? 'Rename “Spring campaign”: select the card, then use the toolbar.'
          : 'Rename “Spring campaign” with the pencil on its card.'}</span
      >
    {/if}
  </footer>
</div>

<style>
  .demo {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 360px;
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    border: 0.75px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    overflow: hidden;
  }
  .bar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border-bottom: 1px solid var(--border-strong);
  }
  .crumb {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .cards {
    display: grid;
    align-content: start;
    gap: var(--space-2);
    padding: var(--space-4);
    padding-bottom: var(--space-12);
  }
  .card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-1) var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
    outline: none;
    transition: background var(--motion-quick) var(--ease-out);
  }
  button.card {
    width: 100%;
    border: 0;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .card:focus-visible {
    box-shadow: var(--focus-ring);
  }
  .card.chosen {
    background: var(--layer-selected-bg);
    box-shadow: inset 0 0 0 1px var(--layer-selected-border);
  }
  .card.flash {
    animation: changed var(--motion-lazy) var(--ease-out);
  }
  @keyframes changed {
    from {
      background: var(--accent-soft);
    }
  }
  .card.dim {
    opacity: 0.6;
  }
  .thumb {
    display: grid;
    place-items: center;
    grid-row: span 2;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .meta {
    grid-column: 2;
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .inline {
    display: flex;
    gap: var(--space-2);
    align-items: center;
    grid-column: 2 / span 2;
  }
  input {
    flex: 1;
    min-width: 0;
    height: 32px;
    padding: 0 var(--space-3);
    border: 1px solid var(--accent-border);
    border-radius: var(--radius-sm);
    background: var(--input-bg);
    color: var(--text);
    font: inherit;
  }
  input:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .scrim {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--text) 16%, transparent);
  }
  .dialog {
    display: grid;
    gap: var(--space-3);
    width: min(280px, 80%);
    padding: var(--space-4);
    border-radius: var(--radius-dialog);
    background: var(--glass-strong);
    box-shadow: var(--shadow-dialog);
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2);
  }
  .toast {
    position: absolute;
    right: var(--space-3);
    bottom: calc(var(--space-12) + var(--space-2));
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--text);
    color: var(--bg);
    font-size: var(--fs-sm);
    box-shadow: var(--shadow-pop);
  }
  .path {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
  }
  polyline {
    fill: none;
    stroke: var(--text-2);
    stroke-width: 2;
    stroke-dasharray: 6 5;
    animation: draw var(--motion-lazy) var(--ease-out);
  }
  @keyframes draw {
    from {
      stroke-dashoffset: 400;
    }
  }
  circle.act {
    fill: var(--accent);
  }
  /* Where you act: solid. Where the answer shows: a ring — two kinds of stop, told apart by shape. */
  circle.answer {
    fill: var(--glass-strong);
    stroke: var(--accent);
    stroke-width: 2;
  }
  text.answer {
    fill: var(--accent-ink);
  }
  text {
    fill: var(--on-accent);
    font-size: 11px;
    font-weight: var(--fw-bold);
    text-anchor: middle;
  }
  .score {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    min-height: 48px;
    padding: var(--space-2) var(--space-4);
    border-top: 1px solid var(--border-strong);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  @media (prefers-reduced-motion: reduce) {
    .card.flash,
    polyline {
      animation: none;
    }
  }
</style>
