<script module lang="ts">
  /** The four core principles of the design study, in the order the study explains them. */
  export const PRINCIPLES = {
    function: { n: 1, label: 'Function first, beautiful because of it' },
    friendly: { n: 2, label: 'Friendly, always' },
    locality: { n: 3, label: 'Act where you look' },
    cues: { n: 4, label: 'Cues show cause and effect' },
  } as const;

  export type Principle = keyof typeof PRINCIPLES;

  export interface DesignNote {
    principle: Principle;
    /** One line: what the reader should notice. */
    title: string;
    /** Why it is built that way, in plain words. */
    body: string;
    /** A CSS selector for the part of the page the note talks about; it lights up on hover. */
    target?: string;
  }
</script>

<script lang="ts">
  /**
   * Storybook-only: a "Design notes" pill for the example pages. It opens where it sits (the
   * study's locality rule), lists which principles the page demonstrates and why, and points at
   * the part of the page each note is about — hover or focus a note and that part lights up
   * while the rest of the page dims (cause and effect, made visible).
   */
  import { tick } from 'svelte';
  import Icon from '../patterns/atoms/Icon.svelte';

  interface Props {
    /** What the example is, e.g. "Spreadsheet". */
    title: string;
    notes: DesignNote[];
    /** Where the pill sits; pick the corner the page leaves free. */
    corner?: 'bottom-left' | 'bottom-right' | 'top-right';
    /** Starts opened (handy for screenshots and the study's index). */
    open?: boolean;
  }

  let { title, notes, corner = 'bottom-left', open = $bindable(false) }: Props = $props();

  const uid = $props.id();
  let spot = $state<{ x: number; y: number; w: number; h: number } | null>(null);
  let target: Element | null = null;
  let frame = 0;
  let panel = $state<HTMLElement | undefined>();

  function measure() {
    frame = 0;
    if (!target?.isConnected) return (spot = null);
    const r = target.getBoundingClientRect();
    const visible = r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth;
    spot = visible && r.width && r.height ? { x: r.left, y: r.top, w: r.width, h: r.height } : null;
  }

  function follow() {
    if (!frame) frame = requestAnimationFrame(measure);
  }

  function light(note: DesignNote | null) {
    target = note?.target ? document.querySelector(note.target) : null;
    measure();
  }

  /** Brings an off-screen target into view, then lights it. */
  async function reveal(note: DesignNote) {
    if (!note.target) return;
    const el = document.querySelector(note.target);
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    target = el;
    await tick();
    follow();
  }

  async function toggle() {
    open = !open;
    if (!open) light(null);
    else {
      await tick();
      panel?.querySelector<HTMLElement>('button')?.focus();
    }
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && open) {
      open = false;
      light(null);
    }
  }
</script>

<svelte:window onscroll={follow} onresize={follow} {onkeydown} />
<svelte:document onscrollcapture={follow} />

{#if spot}
  <div
    class="spot"
    aria-hidden="true"
    style:left="{spot.x - 6}px"
    style:top="{spot.y - 6}px"
    style:width="{spot.w + 12}px"
    style:height="{spot.h + 12}px"
  ></div>
{/if}

<aside class="notes notes--{corner}" class:open aria-label="Design notes: {title}">
  {#if open}
    <div class="card" id="{uid}-panel" bind:this={panel}>
      <header>
        <span class="eyebrow">Design notes</span>
        <strong>{title}</strong>
        <span class="hint">Point at a note to see the part of the page it is about.</span>
      </header>
      <ol>
        {#each notes as note, i (i)}
          {@const p = PRINCIPLES[note.principle]}
          <li>
            <button
              type="button"
              class="note"
              class:pointing={!!note.target}
              onmouseenter={() => light(note)}
              onmouseleave={() => light(null)}
              onfocus={() => light(note)}
              onblur={() => light(null)}
              onclick={() => reveal(note)}
            >
              <span class="principle principle--{note.principle}">{p.n} · {p.label}</span>
              <span class="title">{note.title}</span>
              <span class="body">{note.body}</span>
            </button>
          </li>
        {/each}
      </ol>
    </div>
  {/if}
  <button
    type="button"
    class="pill"
    aria-expanded={open}
    aria-controls="{uid}-panel"
    onclick={toggle}
  >
    <Icon name={open ? 'close' : 'sparkles'} size={16} />
    <span>{open ? 'Close notes' : 'Design notes'}</span>
    {#if !open}<span class="count">{notes.length}</span>{/if}
  </button>
</aside>

<style>
  .notes {
    position: fixed;
    z-index: var(--z-toast);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    max-width: min(420px, calc(100vw - 2 * var(--space-4)));
    pointer-events: none;
  }
  .notes > * {
    pointer-events: auto;
  }
  .notes--bottom-left {
    left: var(--space-4);
    bottom: var(--space-4);
    align-items: flex-start;
  }
  .notes--bottom-right {
    right: var(--space-4);
    bottom: var(--space-4);
    align-items: flex-end;
  }
  .notes--top-right {
    right: var(--space-4);
    top: var(--space-4);
    flex-direction: column-reverse;
    align-items: flex-end;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-pill);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    box-shadow: var(--layer-front-shadow);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    cursor: pointer;
    transition: transform var(--motion-quick) var(--ease-out);
  }
  .pill:active {
    transform: scale(0.96);
  }
  .pill:focus-visible,
  .note:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .count {
    min-width: 1.4em;
    padding: 0 var(--space-1);
    border-radius: var(--radius-pill);
    background: var(--accent);
    color: var(--on-accent, #fff);
    font-size: var(--fs-xs);
    text-align: center;
  }
  /* The card grows out of the pill that opened it, so the eye never loses the thread. */
  .card {
    max-height: min(70vh, 640px);
    overflow: auto;
    padding: var(--space-4);
    border-radius: var(--radius-dialog);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    box-shadow: var(--shadow-pop);
    transform-origin: bottom left;
    animation: grow var(--motion-base) var(--ease-out);
  }
  .notes--bottom-right .card {
    transform-origin: bottom right;
  }
  .notes--top-right .card {
    transform-origin: top right;
  }
  @keyframes grow {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
  }
  header {
    display: grid;
    gap: var(--space-1);
    padding-bottom: var(--space-3);
  }
  .eyebrow {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  header strong {
    font-size: var(--fs-lg);
  }
  .hint {
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  ol {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .note {
    display: grid;
    gap: var(--space-1);
    width: 100%;
    padding: var(--space-3);
    border: 0;
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
    color: var(--text);
    font: inherit;
    text-align: left;
    cursor: default;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .note.pointing {
    cursor: pointer;
  }
  .note:hover {
    background: var(--accent-faint);
  }
  .principle {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .title {
    font-weight: var(--fw-semibold);
  }
  .body {
    font-size: var(--fs-sm);
    line-height: 1.5;
    color: var(--text-2);
  }
  /* The spotlight: a ring around the part of the page, the rest dimmed around it. */
  .spot {
    position: fixed;
    z-index: calc(var(--z-toast) - 1);
    border-radius: var(--radius-lg);
    box-shadow:
      0 0 0 2px var(--accent),
      0 0 0 9999px color-mix(in srgb, var(--text) 18%, transparent);
    pointer-events: none;
    transition:
      left var(--motion-base) var(--ease-out),
      top var(--motion-base) var(--ease-out),
      width var(--motion-base) var(--ease-out),
      height var(--motion-base) var(--ease-out);
  }
  @media (prefers-reduced-motion: reduce) {
    .card,
    .spot {
      animation: none;
      transition: none;
    }
  }
</style>
