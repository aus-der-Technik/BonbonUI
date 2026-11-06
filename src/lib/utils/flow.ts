/**
 * Flow — every layer of the page is a body of thick water, and what lies on it floats.
 *
 * A press is felt only on its own layer; the layers never move each other:
 *
 *   ground — the things lying on the backdrop (text, figures, controls) answer a press on the
 *            ground. Panels and glass stay still.
 *   panel  — the things on the panels answer a press on a panel, across every panel. The panel
 *            tiles themselves, the ground and the glass stay still.
 *   glass  — floats above the page and touches nothing: nothing moves (the glass itself gives,
 *            see `squeeze` in liquid.ts). Overlays and glass over a photo too.
 *
 * Pressing a thing on a layer is like pressing on something that swims: it sinks a few pixels
 * and pushes the water aside, so the things around it dip too and drift a hair away from the
 * press. The wave travels outwards and loses energy with every pixel it goes (`reach`), so the
 * neighbours answer clearly and the far side of the screen barely stirs. Letting go, everything
 * bobs back up on a loose spring that overshoots once or twice. Dragging (a slider, a dial)
 * pulls the water along: the things nearby sway in the direction of the drag, a moment later
 * the further they are, and swing back and forth around their place when the hand stops. The
 * thing in the hand never sways, so a slider stays exactly under the finger. A bigger control
 * moves more water than a small one: a wide key sinks deeper and reaches further than an icon
 * button (`heft`). Every piece has a
 * slightly different weight, so the pieces never move in lockstep.
 *
 * The pieces are the smallest blocks that move as one: a heading, a paragraph, a figure, a
 * button, a field. Containers are opened while they are big or hold another layer, so a panel
 * on the ground stays still while the text beside it moves. Only `translate` is animated, on one
 * frame loop that runs while something moves. Anything marked `data-flow-fixed` (DetailPanel,
 * Toaster…) or `data-flow-off` and anything `position: fixed` stays still. Off under
 * `prefers-reduced-motion`.
 */

import { prefersReducedMotion } from './motion';
import { frameTime, step, type Spring, type SpringParams } from './spring';
import { GLASS_SELECTOR, isGlass, PANEL_SELECTOR } from './surfaces';

/** What a press on starts the wave: every control, form fields and sliders included. */
const INTERACTIVE = [
  'button',
  'a[href]',
  'summary',
  'label',
  'select',
  'input:not([type="hidden"])',
  'textarea',
  '[contenteditable]:not([contenteditable="false"])',
  '[role="button"]',
  '[role="tab"]',
  '[role="option"]',
  '[role="menuitem"]',
  '[role="switch"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[role="combobox"]',
  '[role="textbox"]',
  '[role="searchbox"]',
].join(',');

/** Where you type: Space and Enter there are text, and a drag there selects text. */
const TEXT_ENTRY = [
  'textarea',
  '[contenteditable]:not([contenteditable="false"])',
  '[role="textbox"]',
  '[role="searchbox"]',
  '[role="combobox"]',
  'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="color"]):not([type="file"])',
].join(',');

export interface FlowOptions {
  /** How deep the thing under a standard-sized control sinks, in px (smaller controls less,
   *  bigger ones more). Default 3. */
  depth?: number;
  /** How quickly the wave loses energy: after this many px a third of it is left, after twice
   *  as many a tenth. Default 200. */
  reach?: number;
  /** How fast the wave travels outwards, in px per ms. Default 1.4. */
  speed?: number;
}

export type PressLayer = 'glass' | 'panel' | 'ground';

type Movable = HTMLElement | SVGSVGElement;

interface Piece {
  el: Movable;
  /** The dip (down is positive) and the drift away from the press, in px. */
  dip: Spring;
  drift: Spring;
  /** The sway of a drag, in px. */
  swayX: Spring;
  swayY: Spring;
  /** Targets while pressed: how deep it dips and how far it drifts. */
  depth: number;
  push: number;
  /** How much of a drag reaches it (0 for the piece in the hand). */
  pull: number;
  /** When the wave reaches it, in ms after the press. */
  delay: number;
  downAt: number;
  upAt: number;
  /** Its weight: a factor on the stiffness, so neighbours do not move in lockstep. */
  weight: number;
}

// Sinking: soft but direct. Rising: loose, so it bobs back with an overshoot or two. Sway:
// looser still, so a drag leaves things swinging back and forth around their place.
const SINK: SpringParams = { k: 240, c: 20 };
const RISE: SpringParams = { k: 140, c: 8 };
const SWAY: SpringParams = { k: 110, c: 6 };

const GLASS = GLASS_SELECTOR;
const PANELS = PANEL_SELECTOR;
const STILL = '[data-flow-fixed], [data-flow-off]';

/** Containers bigger than this are opened, so their parts answer on their own. */
const BIG_WIDTH = 360;
const BIG_HEIGHT = 200;
const MAX_DEPTH = 8;
/** A dip this small is not worth a frame. */
const FAINT = 0.03;

const reduced = prefersReducedMotion;

/** Where a press lands: on glass, on a panel (which one), or on the ground. */
export function pressLayer(target: Element): { layer: PressLayer; panel?: HTMLElement } {
  const surface = target.closest<HTMLElement>(`${GLASS}, ${PANELS}`);
  if (!surface) return { layer: 'ground' };
  if (isGlass(surface)) return { layer: 'glass' };
  // A panel inside glass floats with it.
  if (surface.parentElement?.closest(GLASS)) return { layer: 'glass' };
  return { layer: 'panel', panel: surface };
}

/**
 * Is `el` in a region marked `data-flow-off` — between it and this field's own root? A region
 * marked off for an outer field can hold a press field of its own (its root is the region).
 */
function offWithin(el: Element, root: HTMLElement): boolean {
  const off = el.closest('[data-flow-off]');
  return !!off && off !== root && root.contains(off);
}

const movable = (el: Element): el is Movable =>
  el instanceof HTMLElement || el instanceof SVGSVGElement;

/** The parts of a container that can move on their own; null when it holds text or inline
 *  content, which only moves as a whole. */
function parts(el: Element): Element[] | null {
  for (const node of el.childNodes)
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) return null;
  const out: Element[] = [];
  for (const child of el.children) {
    const display = getComputedStyle(child).display;
    if (display === 'none') continue;
    if (display === 'inline') return null;
    out.push(child);
  }
  return out.length ? out : null;
}

/** Collects the pieces of one layer under `el`, opening containers as needed. */
function visit(el: Element, layer: 'ground' | 'panel', out: Movable[], depth: number): void {
  if (!movable(el) || el.matches(STILL) || el.matches(GLASS) || isGlass(el)) return;
  // A panel belongs to the panel layer: the ground moves around it.
  if (layer === 'ground' && el.matches(PANELS)) return;
  const style = getComputedStyle(el);
  if (style.display === 'none' || style.position === 'fixed') return;
  if (style.display === 'contents') {
    for (const child of el.children) visit(child, layer, out, depth);
    return;
  }
  const box = el.getBoundingClientRect();
  if (box.width <= 0 && box.height <= 0) return;
  // Something of another layer (or something that must stay still) inside: open it up.
  const foreign = el.querySelector(
    layer === 'ground' ? `${GLASS}, ${PANELS}, ${STILL}` : `${GLASS}, ${STILL}`,
  );
  const big = box.width > BIG_WIDTH || box.height > BIG_HEIGHT;
  if ((foreign || big) && depth < MAX_DEPTH) {
    // A big wrapper around a single child is opened too: the child decides for itself.
    const inner = parts(el);
    if (inner) {
      for (const child of inner) visit(child, layer, out, depth + 1);
      return;
    }
  }
  // It cannot move without carrying another layer along.
  if (foreign) return;
  out.push(el);
}

/** The pieces of the ground inside `root`: everything on the backdrop that moves as one. */
export function flowBlocks(root: HTMLElement): Movable[] {
  return flowPieces(root, 'ground');
}

/** The pieces of one layer inside `root`: what a press on that layer moves. */
export function flowPieces(root: HTMLElement, layer: 'ground' | 'panel'): Movable[] {
  const out: Movable[] = [];
  if (layer === 'panel') {
    for (const panel of root.querySelectorAll<HTMLElement>(PANELS)) {
      if (isGlass(panel) || panel.parentElement?.closest(`${GLASS}, ${PANELS}`)) continue;
      if (panel.matches(STILL) || offWithin(panel, root)) continue;
      const inner = parts(panel);
      // A tile with only text in it moves as one.
      if (inner) for (const child of inner) visit(child, 'panel', out, 1);
      else visit(panel, 'panel', out, MAX_DEPTH);
    }
    return out;
  }
  // The root itself may be marked `data-flow` (querySelectorAll does not include it).
  const seeds = [
    ...(root.matches('[data-flow]') ? [root] : []),
    ...root.querySelectorAll<HTMLElement>('main, [data-flow]'),
  ];
  for (const seed of seeds) {
    // The outermost seed collects for all inside it.
    if (seeds.some((other) => other !== seed && other.contains(seed))) continue;
    if (offWithin(seed, root) || seed.parentElement?.closest(`${GLASS}, ${PANELS}`)) continue;
    for (const child of seed.children) visit(child, 'ground', out, 0);
  }
  return out;
}

/** The nearest distance from a point to a box. */
function gap(r: DOMRect, x: number, y: number): number {
  return Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom));
}

/** The size of a standard control (a 36px-high button of about 100px), as √area. */
const STANDARD = 60;

/**
 * How much water a control moves, from its size: about 1 for a standard button, about 0.6 for
 * a small icon button, up to 1.8 for a wide key or a card. Less than proportional, so a big
 * card does not shake the whole page.
 */
export function heft(control: Element): number {
  const r = control.getBoundingClientRect();
  const size = Math.sqrt(Math.max(r.width, 0) * Math.max(r.height, 0));
  if (!size) return 1;
  return Math.min(1.8, Math.max(0.45, (size / STANDARD) ** 0.75));
}

/** A steady pseudo-random weight in 0.85–1.15 for the i-th piece. */
function weightOf(i: number): number {
  const n = Math.sin((i + 1) * 12.9898) * 43758.5453;
  return 0.85 + (n - Math.floor(n)) * 0.3;
}

const rest = (): Spring => ({ x: 0, v: 0, to: 0 });

/** Makes every press inside `root` move its own layer (see the header). Returns the cleanup. */
export function pressField(root: HTMLElement, options: FlowOptions = {}): () => void {
  const depth = options.depth ?? 3;
  const reach = options.reach ?? 200;
  const speed = options.speed ?? 1.4;
  let pieces: Piece[] = [];
  let frame = 0;
  let last = 0;
  let pressed = false;
  let pressedAt = 0;
  // The drag: the hand's smoothed speed in px/ms, and its recent history so the far pieces
  // feel it later.
  let dragging = false;
  let hand = { x: 0, y: 0, t: 0 };
  let vel = { x: 0, y: 0 };
  let history: { t: number; x: number; y: number }[] = [];

  /** The hand's speed at time `t` (0 before the drag started). */
  function velocityAt(t: number): { x: number; y: number } {
    let lo = 0;
    let hi = history.length - 1;
    if (hi < 0 || t < history[0]!.t) return { x: 0, y: 0 };
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (history[mid]!.t <= t) lo = mid;
      else hi = mid - 1;
    }
    return history[lo]!;
  }

  const tick = (now: number) => {
    const dt = frameTime(now, last);
    last = now;
    // The hand's speed fades when it stops moving: thick water does not keep pulling.
    if (now - hand.t > 40) {
      const fade = Math.exp(-dt / 0.05);
      vel = { x: vel.x * fade, y: vel.y * fade };
      if (Math.abs(vel.x) + Math.abs(vel.y) < 0.002) vel = { x: 0, y: 0 };
    }
    history.push({ t: now, x: vel.x, y: vel.y });
    while (history.length > 2 && now - history[0]!.t > 1500) history.shift();
    const stirring = Math.abs(vel.x) + Math.abs(vel.y) > 0.002;

    let moving = false;
    for (const p of pieces) {
      const down = pressed ? now >= p.downAt : now < p.upAt && now >= p.downAt;
      p.dip.to = down ? p.depth : 0;
      p.drift.to = down ? p.push : 0;
      const v = p.pull ? velocityAt(now - p.delay) : { x: 0, y: 0 };
      // A fast drag pulls a few px, never more: tanh keeps a flick from throwing things.
      const amount = Math.hypot(v.x, v.y);
      const pull = amount ? (p.pull * Math.tanh(amount / 0.35)) / amount : 0;
      // Below a hundredth of a pixel the pull is over (a fading hand never reaches zero).
      p.swayX.to = Math.abs(v.x * pull) < 0.01 ? 0 : v.x * pull;
      p.swayY.to = Math.abs(v.y * pull) < 0.01 ? 0 : v.y * pull;
      const w = p.weight;
      const settle = (s: Spring, params: SpringParams) =>
        step(s, { k: params.k * w, c: params.c * Math.sqrt(w) }, dt);
      settle(p.dip, p.dip.to > p.dip.x ? SINK : RISE);
      settle(p.drift, Math.abs(p.drift.to) > Math.abs(p.drift.x) ? SINK : RISE);
      settle(p.swayX, SWAY);
      settle(p.swayY, SWAY);
      const springs = [p.dip, p.drift, p.swayX, p.swayY];
      const still = springs.every((s) => Math.abs(s.x - s.to) < 0.01 && Math.abs(s.v) < 0.05);
      const atRest = still && springs.every((s) => !s.to);
      if (atRest) {
        for (const s of springs) s.x = s.v = 0;
        p.el.style.translate = '';
      } else {
        const x = p.drift.x + p.swayX.x;
        const y = p.dip.x + p.swayY.x;
        p.el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
      }
      // Waiting for the wave to arrive (or to leave) counts as moving.
      if (!atRest || (pressed && now < p.downAt) || (!pressed && now < p.upAt)) moving = true;
    }
    if (moving || pressed || stirring) frame = requestAnimationFrame(tick);
    else {
      frame = 0;
      pieces = [];
      history = [];
    }
  };

  const start = () => {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  function press(x: number, y: number, target: Element, control: Element, drag: boolean) {
    if (reduced()) return;
    // A bigger control moves more water: it sinks deeper, and its wave carries further.
    const force = heft(control);
    const sink = depth * force;
    const carry = reach * Math.sqrt(force);
    const where = pressLayer(target);
    // Glass does not touch the page: nothing below it moves.
    if (where.layer === 'glass') return;
    const now = performance.now();
    const known = new Map(pieces.map((p) => [p.el, p]));
    const vh = window.innerHeight || 800;
    pieces = [];
    flowPieces(root, where.layer).forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const distance = gap(r, x, y);
      const e = Math.exp(-distance / carry);
      const prev = known.get(el);
      known.delete(el);
      if (sink * e < FAINT && !prev) return;
      const held = el.contains(target);
      // Away from the press, mostly sideways: the water a sinking thing pushes aside.
      const cx = r.left + r.width / 2 - x;
      const cy = r.top + r.height / 2 - y;
      const away = held ? 0 : cx / Math.max(Math.hypot(cx, cy), 1);
      pieces.push({
        el,
        dip: prev?.dip ?? rest(),
        drift: prev?.drift ?? rest(),
        swayX: prev?.swayX ?? rest(),
        swayY: prev?.swayY ?? rest(),
        depth: sink * e,
        push: sink * 0.35 * e * away,
        pull: held || !drag ? 0 : sink * 1.4 * e,
        delay: distance / speed,
        downAt: now + distance / speed,
        upAt: Infinity,
        weight: weightOf(i),
      });
    });
    // Pieces of the last press that are not part of this one settle on their own.
    for (const p of known.values()) pieces.push({ ...p, depth: 0, push: 0, pull: 0 });
    pressed = true;
    pressedAt = now;
    pressPoint = { x, y };
    dragging = drag;
    hand = { x, y, t: now };
    vel = { x: 0, y: 0 };
    start();
  }

  let pressPoint = { x: 0, y: 0 };
  function release() {
    if (!pressed) return;
    pressed = false;
    dragging = false;
    const now = performance.now();
    for (const p of pieces) {
      // The release travels like the press did: the near pieces rise first.
      p.upAt =
        Math.max(now, p.downAt) +
        gap(p.el.getBoundingClientRect(), pressPoint.x, pressPoint.y) / speed;
    }
    start();
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || !event.isPrimary) return;
    const target = event.target instanceof Element ? event.target : null;
    const control = target?.closest(INTERACTIVE);
    if (!target || !control || offWithin(target, root)) return;
    press(event.clientX, event.clientY, target, control, !control.matches(TEXT_ENTRY));
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!pressed || !dragging || !event.isPrimary) return;
    const now = performance.now();
    const dt = Math.max(now - hand.t, 1);
    const inst = { x: (event.clientX - hand.x) / dt, y: (event.clientY - hand.y) / dt };
    // Smoothed, so a jittery pointer does not shake the page.
    vel = { x: vel.x * 0.6 + inst.x * 0.4, y: vel.y * 0.6 + inst.y * 0.4 };
    hand = { x: event.clientX, y: event.clientY, t: now };
    // The first moments of a press are the press, not a drag.
    if (now - pressedAt > 60) start();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return;
    const target = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null;
    if (!target || target.matches(TEXT_ENTRY) || offWithin(target, root)) return;
    const r = target.getBoundingClientRect();
    press(r.left + r.width / 2, r.top + r.height / 2, target, target, false);
  };

  root.addEventListener('pointerdown', onPointerDown, true);
  root.addEventListener('keydown', onKeyDown, true);
  window.addEventListener('pointermove', onPointerMove, true);
  window.addEventListener('pointerup', release, true);
  window.addEventListener('pointercancel', release, true);
  window.addEventListener('keyup', release, true);
  window.addEventListener('blur', release);

  return () => {
    root.removeEventListener('pointerdown', onPointerDown, true);
    root.removeEventListener('keydown', onKeyDown, true);
    window.removeEventListener('pointermove', onPointerMove, true);
    window.removeEventListener('pointerup', release, true);
    window.removeEventListener('pointercancel', release, true);
    window.removeEventListener('keyup', release, true);
    window.removeEventListener('blur', release);
    cancelAnimationFrame(frame);
    for (const p of pieces) p.el.style.translate = '';
  };
}
