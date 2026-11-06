<script lang="ts">
  /**
   * The one glass thing on the Residence page: a round drop at the top right that stays there
   * while the page scrolls. Pointing at it (or focusing it, or tapping it) lets it run down
   * like a slow drop of syrup: the top stays put, the bottom flows down on a chain of two
   * springs (a slow lead and a softer, under-damped tip that overshoots and wobbles), a bead
   * swells at the leading end while it moves and the body thins behind it. The sections appear
   * one after another as the liquid reaches them, and on leave it all drains back up.
   *
   * The glass is one element clipped to the drawn outline; its shadow and rim are drawn from
   * the same outline, so they follow the morph. Reduced motion opens and closes at once.
   */
  import { untrack } from 'svelte';
  import { reducedMotion } from '../utils/liquid';
  import type { Section } from './mock-residence';

  interface Props {
    sections: Section[];
    /** Open or closed; the story uses it for the open state. */
    open?: boolean;
    /** Accessible name of the drop. */
    label?: string;
    /** A section was chosen. */
    onnavigate?: ((id: string) => void) | undefined;
  }

  let { sections, open = $bindable(false), label = 'Sections', onnavigate }: Props = $props();

  const uid = $props.id();
  /** The drop's diameter, and room on each side for the bead to swell into. */
  const D = 52;
  const ROOM = 10;
  const W = D + 2 * ROOM;
  const R = D / 2;

  let host = $state<HTMLElement | undefined>();
  let glass = $state<HTMLElement | undefined>();
  let list = $state<HTMLElement | undefined>();
  let toggle = $state<HTMLButtonElement | undefined>();
  let farShadow = $state<SVGPathElement | undefined>();
  let nearShadow = $state<SVGPathElement | undefined>();
  let edge = $state<SVGPathElement | undefined>();
  let glow = $state<SVGPathElement | undefined>();
  let clip = $state<SVGPathElement | undefined>();

  /** Full length of the open pill; measured from the list. */
  let full = $state(D * 6);
  /** Which items the liquid has reached. */
  let wet = $state<boolean[]>([]);

  // Who opened it decides what closes it: a hover closes when the pointer leaves, a click or
  // the story's arg only on a click, Escape or a press elsewhere.
  type Source = 'hover' | 'focus' | 'click' | 'prop';
  let source: Source = 'prop';
  let openedAt = 0;
  let suppressHover = false;
  let quietFocus = false;
  let leaveTimer: ReturnType<typeof setTimeout> | undefined;

  // The flow: `lead` moves towards the target, `tip` (the bottom edge) follows it.
  const lead = { x: D, v: 0 };
  const tip = { x: D, v: 0 };
  let target = D;
  let frame = 0;
  let last = 0;
  let painted = false;

  // Opening is slow and syrupy; draining back is quicker and calmer.
  const POUR = { lead: { k: 63, c: 14.3 }, tip: { k: 84, c: 6.7 } };
  const DRAIN = { lead: { k: 120, c: 21.9 }, tip: { k: 230, c: 19 } };

  function step(s: { x: number; v: number }, to: number, k: number, c: number, dt: number) {
    const a = -k * (s.x - to) - c * s.v;
    s.v += a * dt;
    s.x += s.v * dt;
  }

  /** A drop outline: round top of radius R at the top, a bottom bead of radius `rb`, a waist. */
  function outline(len: number, bead: number, waist: number): string {
    const cx = W / 2;
    const L = Math.max(D, len);
    const rb = Math.max(R * 0.7, Math.min(R * (1 + bead), L - R));
    const top = R;
    const end = L - rb;
    const s = Math.max(0, end - top);
    const rn = ((R + rb) / 2) * waist;
    const mid = top + s * 0.45;
    const f = (n: number) => n.toFixed(2);
    return [
      `M${f(cx - R)} ${f(top)}`,
      `A${f(R)} ${f(R)} 0 0 1 ${f(cx + R)} ${f(top)}`,
      `C${f(cx + R)} ${f(top + s * 0.2)} ${f(cx + rn)} ${f(mid - s * 0.2)} ${f(cx + rn)} ${f(mid)}`,
      `C${f(cx + rn)} ${f(mid + s * 0.25)} ${f(cx + rb)} ${f(end - s * 0.25)} ${f(cx + rb)} ${f(end)}`,
      `A${f(rb)} ${f(rb)} 0 0 1 ${f(cx - rb)} ${f(end)}`,
      `C${f(cx - rb)} ${f(end - s * 0.25)} ${f(cx - rn)} ${f(mid + s * 0.25)} ${f(cx - rn)} ${f(mid)}`,
      `C${f(cx - rn)} ${f(mid - s * 0.2)} ${f(cx - R)} ${f(top + s * 0.2)} ${f(cx - R)} ${f(top)}`,
      'Z',
    ].join(' ');
  }

  function paint() {
    const v = tip.v;
    // A bead gathers at the leading end while it runs, and the body thins behind it (a liquid
    // keeps its volume); both vanish as it comes to rest.
    const bead = Math.max(-0.14, Math.min(0.22, v * 0.00017));
    const waist = 1 - Math.min(0.12, Math.abs(v) * 0.00008);
    const d = outline(tip.x, bead, waist);
    if (glass) glass.style.clipPath = `path('${d}')`;
    for (const p of [farShadow, nearShadow, edge, glow, clip]) p?.setAttribute('d', d);
    host?.style.setProperty('--len', `${Math.round(tip.x)}px`);
    updateWet();
  }

  function updateWet() {
    if (!list) return;
    const items = list.querySelectorAll<HTMLElement>(':scope > li');
    let changed = false;
    const next = wet.slice(0, items.length);
    items.forEach((li, i) => {
      // An item shows once the liquid has run past most of it.
      const reach = D + li.offsetTop + li.offsetHeight * 0.7;
      const on = tip.x >= reach;
      if (next[i] !== on) {
        next[i] = on;
        changed = true;
      }
    });
    if (changed) wet = next;
  }

  function tick(now: number) {
    const dt = Math.min(1 / 30, Math.max(0, (now - last) / 1000));
    last = now;
    const p = target > D ? POUR : DRAIN;
    step(lead, target, p.lead.k, p.lead.c, dt);
    step(tip, lead.x, p.tip.k, p.tip.c, dt);
    paint();
    const still =
      Math.abs(tip.x - target) < 0.3 &&
      Math.abs(tip.v) < 2 &&
      Math.abs(lead.x - target) < 0.3 &&
      Math.abs(lead.v) < 2;
    if (still) {
      tip.x = lead.x = target;
      tip.v = lead.v = 0;
      paint();
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  function flowTo(to: number) {
    target = to;
    if (!painted || reducedMotion()) {
      cancelAnimationFrame(frame);
      frame = 0;
      tip.x = lead.x = to;
      tip.v = lead.v = 0;
      painted = true;
      paint();
      return;
    }
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }

  // The pill's length: the drop, the list, and a little room below the last item.
  function measure() {
    if (list) full = D + list.offsetHeight + 6;
  }

  $effect(() => {
    const opening = open;
    // Only `open` drives this; what the flow reads and writes per frame must not.
    untrack(() => {
      measure();
      flowTo(opening ? full : D);
    });
  });

  $effect(() => {
    if (!list || typeof ResizeObserver !== 'function') return;
    const observer = new ResizeObserver(() =>
      untrack(() => {
        measure();
        if (open && !frame) flowTo(full);
      }),
    );
    observer.observe(list);
    return () => observer.disconnect();
  });

  $effect(() => () => {
    cancelAnimationFrame(frame);
    clearTimeout(leaveTimer);
  });

  function show(from: Source) {
    clearTimeout(leaveTimer);
    leaveTimer = undefined;
    if (open) return;
    source = from;
    openedAt = performance.now();
    open = true;
  }

  function hide() {
    clearTimeout(leaveTimer);
    leaveTimer = undefined;
    open = false;
  }

  function onpointerenter(event: PointerEvent) {
    if (event.pointerType === 'touch' || suppressHover) return;
    show('hover');
  }

  // While a hover holds it open, the whole length of the pill counts as inside, even the part
  // the liquid has not reached yet — moving down faster than it flows must not close it.
  function onwindowpointermove(event: PointerEvent) {
    if (!host) return;
    const r = host.getBoundingClientRect();
    const inDrop =
      event.clientX >= r.left + ROOM &&
      event.clientX <= r.right - ROOM &&
      event.clientY >= r.top &&
      event.clientY <= r.top + D;
    if (!inDrop) suppressHover = false;
    if (!open || source !== 'hover') return;
    const inside =
      event.clientX >= r.left - 6 &&
      event.clientX <= r.right + 6 &&
      event.clientY >= r.top - 6 &&
      event.clientY <= r.top + full + 10;
    if (inside) {
      clearTimeout(leaveTimer);
      leaveTimer = undefined;
    } else if (!leaveTimer) leaveTimer = setTimeout(hide, 220);
  }

  function onwindowpointerdown(event: PointerEvent) {
    if (open && host && event.target instanceof Node && !host.contains(event.target)) hide();
  }

  function onclick() {
    if (!open) return show('click');
    // A click right after the hover opened it means "yes, that one": keep it open.
    if (source === 'hover' && performance.now() - openedAt < 700) {
      source = 'click';
      return;
    }
    suppressHover = true;
    hide();
  }

  function onfocusin(event: FocusEvent) {
    // Only keyboard focus opens it; a click's focus is handled by the click.
    const el = event.target;
    if (!quietFocus && el instanceof HTMLElement && el.matches(':focus-visible')) show('focus');
  }

  function onfocusout(event: FocusEvent) {
    const next = event.relatedTarget;
    if (next instanceof Node && host?.contains(next)) return;
    if (source === 'focus') hide();
  }

  // Escape closes it wherever focus is; from inside, focus goes back to the drop without
  // pouring it out again.
  function onwindowkeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !open) return;
    const inside = host?.contains(document.activeElement) ?? false;
    hide();
    if (!inside) return;
    quietFocus = true;
    toggle?.focus();
    quietFocus = false;
  }

  function choose(event: MouseEvent, id: string) {
    event.preventDefault();
    suppressHover = true;
    hide();
    onnavigate?.(id);
  }
</script>

<svelte:window
  onpointermove={onwindowpointermove}
  onpointerdown={onwindowpointerdown}
  onkeydown={onwindowkeydown}
/>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="drop"
  class:open
  bind:this={host}
  style:--d="{D}px"
  style:--room="{ROOM}px"
  style:--w="{W}px"
  style:--full="{full}px"
  {onfocusin}
  {onfocusout}
>
  <!-- SVG filters, not CSS ones: WebKit does not blur SVG shapes with a CSS filter. -->
  <svg class="shadow" aria-hidden="true" width={W} height={full + 48}>
    <defs>
      <filter id="{uid}-far" x="-60%" y="-30%" width="220%" height="170%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
      <filter id="{uid}-near" x="-30%" y="-15%" width="160%" height="130%">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </defs>
    <path class="far" bind:this={farShadow} filter="url(#{uid}-far)" />
    <path class="near" bind:this={nearShadow} filter="url(#{uid}-near)" />
  </svg>
  <!-- The links live inside the clipped glass: they can only be seen, and pressed, where the
       liquid already is. -->
  <div class="glass" data-glass bind:this={glass} {onpointerenter}>
    <button
      type="button"
      class="toggle"
      bind:this={toggle}
      aria-label={label}
      aria-expanded={open}
      aria-controls="{uid}-list"
      {onclick}
    >
      <span class="glyph" aria-hidden="true"><i></i><i></i></span>
    </button>
    <ul class="items" id="{uid}-list" bind:this={list} inert={!open}>
      {#each sections as section, i (section.id)}
        <li class:wet={wet[i]}>
          <a href="#{section.id}" onclick={(event) => choose(event, section.id)}>{section.short}</a>
        </li>
      {/each}
    </ul>
  </div>
  <svg class="rim" aria-hidden="true" width={W} height={full + 48}>
    <defs>
      <clipPath id="{uid}-inside"><path bind:this={clip} /></clipPath>
      <filter id="{uid}-soft" x="-30%" y="-15%" width="160%" height="130%">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
      <linearGradient id="{uid}-rim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" class="rim-top" />
        <stop offset="0.35" class="rim-mid" />
        <stop offset="1" class="rim-bottom" />
      </linearGradient>
    </defs>
    <g clip-path="url(#{uid}-inside)"
      ><path class="glow-in" bind:this={glow} filter="url(#{uid}-soft)" /></g
    >
    <path class="edge" bind:this={edge} stroke="url(#{uid}-rim)" />
  </svg>
</div>

<style>
  .drop {
    position: relative;
    width: var(--w);
    height: var(--d);
    /* The box is only a frame; the glass, the button and the links take the pointer. */
    pointer-events: none;
  }
  .shadow,
  .rim {
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
    pointer-events: none;
  }
  .shadow path {
    fill: var(--front-shadow);
  }
  .shadow .far {
    transform: translateY(10px);
    opacity: 0.75;
  }
  .shadow .near {
    transform: translateY(2px);
    opacity: 0.45;
  }
  .glass {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--w);
    height: calc(var(--full) + 48px);
    /* Before the first frame is drawn: a round drop. */
    clip-path: circle(calc(var(--d) / 2) at 50% calc(var(--d) / 2));
    background: var(--light, none), var(--layer-front-bg);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    pointer-events: auto;
  }
  .rim path {
    fill: none;
  }
  .rim .edge {
    stroke-width: 1;
  }
  .rim .glow-in {
    stroke: var(--pill-rim);
    stroke-width: 14;
    opacity: 0.7;
  }
  .rim-top {
    stop-color: var(--pill-light);
  }
  .rim-mid {
    stop-color: var(--pill-light);
    stop-opacity: 0.3;
  }
  .rim-bottom {
    stop-color: var(--pill-rim);
    stop-opacity: 0.7;
  }

  .toggle {
    position: absolute;
    top: 0;
    left: var(--room);
    display: grid;
    place-items: center;
    width: var(--d);
    height: var(--d);
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--text);
    cursor: pointer;
    pointer-events: auto;
    -webkit-tap-highlight-color: transparent;
  }
  .toggle:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }
  /* Two hairlines that cross when it is open. */
  .glyph {
    position: relative;
    width: 18px;
    height: 8px;
  }
  .glyph i {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1.25px;
    border-radius: 1px;
    background: currentColor;
    transition:
      top var(--motion-base) var(--ease-out),
      rotate var(--motion-slow) var(--ease-spring);
  }
  .glyph i:first-child {
    top: 0;
  }
  .glyph i:last-child {
    top: calc(100% - 1.25px);
  }
  .open .glyph i {
    top: calc(50% - 0.625px);
  }
  .open .glyph i:first-child {
    rotate: 45deg;
  }
  .open .glyph i:last-child {
    rotate: -45deg;
  }

  .items {
    position: absolute;
    top: var(--d);
    left: var(--room);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: var(--d);
    margin: 0;
    padding: var(--space-1) 0 var(--space-3);
    list-style: none;
    pointer-events: none;
  }
  .items li {
    opacity: 0;
    translate: 0 -8px;
    transition:
      opacity var(--motion-slow) var(--ease-out),
      translate var(--motion-slow) var(--ease-out);
  }
  .items li.wet {
    opacity: 1;
    translate: 0 0;
  }
  .open .items li.wet a {
    pointer-events: auto;
  }
  /* Set vertically, like the titles along the edge of a drawing sheet. */
  .items a {
    display: block;
    width: var(--d);
    padding: var(--space-3) 0;
    border-radius: var(--radius-pill);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-decoration: none;
    writing-mode: vertical-rl;
    line-height: var(--d);
    pointer-events: none;
    transition: color var(--motion-quick) var(--ease-out);
  }
  .items a:hover {
    color: var(--text);
  }
  .items a:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .items li,
    .glyph i {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .glass {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
