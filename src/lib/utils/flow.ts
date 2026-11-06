/**
 * Flow — the page as one body of thick water.
 *
 * What a press moves depends on what was pressed on, because the layers touch the page
 * differently:
 *
 *   glass  — floats above the page and does not touch it: the page stays still (the glass
 *            itself gives, see `squeeze` in liquid.ts). Overlays and glass over a photo too.
 *   panel  — lies on the page: the pressed panel sinks, and the panels beside it give a little,
 *            less the further away they are. The rest of the page stays still.
 *   ground — is the page: everything on it ripples outwards from the press, except the glass
 *            floating above it.
 *
 * Pressing a control sinks the page a little: the block under the finger most (a few pixels),
 * its neighbours less, and the dip travels outwards like a wave. Letting go, everything rises
 * back on a soft spring that overshoots a hair, so the page answers every press — gently, and
 * all of it together. The pressed control keeps its own squish (Button, IconButton…).
 *
 * The blocks are the children of each `<main>` (and anything marked `data-flow`); a block
 * taller than most of the screen is split into its own children, so a big app shell still
 * ripples. Only `translate` is animated, on one frame loop that runs while something moves.
 * Blocks holding a `position: fixed` element marked `data-flow-fixed` (DetailPanel, Toaster…)
 * stay still: a transform would make them jump. Off under `prefers-reduced-motion`.
 */

const INTERACTIVE = [
  'button',
  'a[href]',
  'summary',
  'label',
  'select',
  'input[type="checkbox"]',
  'input[type="radio"]',
  '[role="button"]',
  '[role="tab"]',
  '[role="option"]',
  '[role="menuitem"]',
  '[role="switch"]',
  '[role="checkbox"]',
  '[role="radio"]',
].join(',');

export interface FlowOptions {
  /** How deep the block under the press sinks, in px. Default 3. */
  depth?: number;
  /** How far the dip reaches: at this distance it is about a third as deep. Default 360. */
  reach?: number;
  /** How fast the dip travels outwards, in px per ms. Default 1.4. */
  speed?: number;
}

interface Block {
  el: HTMLElement;
  y: number;
  v: number;
  amp: number;
  /** When the wave reaches it (press) / when the release reaches it. */
  downAt: number;
  upAt: number;
}

// Sinking: soft but direct. Rising: looser, so it floats back with a small overshoot.
const SINK = { k: 260, c: 22 };
const RISE = { k: 150, c: 9 };

const reduced = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const GLASS = '[data-layer="front"], [data-glass], [data-reflect="glass"], dialog, [popover]';
const PANELS = '[data-layer="panel"], [data-layer="selected"], [data-reflect="panel"]';

/** Is this surface glass — floating, or a panel over a photo? */
const isGlass = (el: Element) =>
  el.matches(GLASS) || (el.matches(PANELS) && !!el.closest('[data-surface="photo"]'));

export type PressLayer = 'glass' | 'panel' | 'ground';

/** Where a press lands: on glass, on a panel (which one), or on the ground. */
export function pressLayer(target: Element): { layer: PressLayer; panel?: HTMLElement } {
  const surface = target.closest<HTMLElement>(`${GLASS}, ${PANELS}`);
  if (!surface) return { layer: 'ground' };
  if (isGlass(surface)) return { layer: 'glass' };
  // A panel inside glass floats with it.
  if (surface.parentElement?.closest(GLASS)) return { layer: 'glass' };
  return { layer: 'panel', panel: surface };
}

/** A block that is (nearly all) glass floats: a ground press leaves it alone. */
function floats(el: HTMLElement): boolean {
  if (isGlass(el)) return true;
  const glass = el.querySelector<HTMLElement>(GLASS);
  if (!glass) return false;
  const a = el.offsetWidth * el.offsetHeight;
  return a > 0 && (glass.offsetWidth * glass.offsetHeight) / a > 0.8;
}

/** Finds the blocks of the page inside `root`: what moves as one piece. */
export function flowBlocks(root: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  const tall = (window.innerHeight || 800) * 0.6;
  const usable = (el: Element): el is HTMLElement =>
    el instanceof HTMLElement &&
    !el.hasAttribute('data-flow-fixed') &&
    !el.querySelector('[data-flow-fixed]') &&
    el.offsetWidth > 0;
  const split = (parent: Element, depth: number) => {
    for (const child of parent.children) {
      if (!usable(child)) continue;
      if (depth < 3 && child.children.length > 1 && child.offsetHeight > tall)
        split(child, depth + 1);
      else out.push(child);
    }
  };
  for (const seed of root.querySelectorAll<HTMLElement>('main, [data-flow]')) {
    if (seed.closest('[data-flow-off]')) continue;
    split(seed, 0);
  }
  return out;
}

/** Makes every press inside `root` move what it touches (see the header). Returns the cleanup. */
export function pressField(root: HTMLElement, options: FlowOptions = {}): () => void {
  const depth = options.depth ?? 3;
  const reach = options.reach ?? 360;
  const speed = options.speed ?? 1.4;
  let blocks: Block[] = [];
  let frame = 0;
  let last = 0;
  let pressed = false;

  const tick = (now: number) => {
    const dt = Math.min(1 / 30, Math.max(0, (now - last) / 1000));
    last = now;
    let moving = false;
    for (const b of blocks) {
      const down = pressed ? now >= b.downAt : now < b.upAt && now >= b.downAt;
      const target = down ? b.amp : 0;
      const { k, c } = target ? SINK : RISE;
      b.v += (-k * (b.y - target) - c * b.v) * dt;
      b.y += b.v * dt;
      const still = Math.abs(b.y - target) < 0.01 && Math.abs(b.v) < 0.05;
      if (still && !target) {
        b.y = 0;
        b.el.style.translate = '';
      } else {
        b.el.style.translate = `0 ${b.y.toFixed(2)}px`;
      }
      // Waiting for the wave to arrive (or to leave) counts as moving.
      if (!still || (pressed && now < b.downAt) || (!pressed && now < b.upAt)) moving = true;
    }
    if (moving || pressed) frame = requestAnimationFrame(tick);
    else {
      frame = 0;
      blocks = [];
    }
  };

  const start = () => {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  /** The pressed panel and the panels beside it, with how far each is from the press. */
  function panelGroup(panel: HTMLElement, x: number, y: number) {
    const near = Math.max(panel.offsetWidth, panel.offsetHeight) * 0.6 + 120;
    const group: { el: HTMLElement; distance: number; share: number }[] = [
      { el: panel, distance: 0, share: 1 },
    ];
    const box = panel.getBoundingClientRect();
    for (const other of root.querySelectorAll<HTMLElement>(PANELS)) {
      if (other === panel || other.contains(panel) || panel.contains(other)) continue;
      if (isGlass(other) || other.parentElement?.closest(PANELS)) continue;
      if (other.hasAttribute('data-flow-fixed') || other.querySelector('[data-flow-fixed]'))
        continue;
      const r = other.getBoundingClientRect();
      // The gap between the two panels: neighbours are close, the rest of the page is not.
      const gap = Math.hypot(
        Math.max(r.left - box.right, 0, box.left - r.right),
        Math.max(r.top - box.bottom, 0, box.top - r.bottom),
      );
      if (gap > near) continue;
      const dx = Math.max(r.left - x, 0, x - r.right);
      const dy = Math.max(r.top - y, 0, y - r.bottom);
      group.push({ el: other, distance: Math.hypot(dx, dy), share: 0.55 * (1 - gap / near) });
    }
    return group;
  }

  function press(x: number, y: number, target: Element) {
    if (reduced()) return;
    const where = pressLayer(target);
    // Glass does not touch the page: nothing below it moves.
    if (where.layer === 'glass') return;
    const now = performance.now();
    const known = new Map(blocks.map((b) => [b.el, b]));
    const vh = window.innerHeight || 800;
    blocks = [];
    const moving =
      where.layer === 'panel' && where.panel
        ? panelGroup(where.panel, x, y)
        : flowBlocks(root)
            .filter((el) => !floats(el))
            .map((el) => {
              const r = el.getBoundingClientRect();
              const dx = Math.max(r.left - x, 0, x - r.right);
              const dy = Math.max(r.top - y, 0, y - r.bottom);
              return { el, distance: Math.hypot(dx, dy), share: 1 };
            });
    for (const { el, distance, share } of moving) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const prev = known.get(el);
      blocks.push({
        el,
        y: prev?.y ?? 0,
        v: prev?.v ?? 0,
        amp: depth * share * Math.exp(-distance / reach),
        downAt: now + distance / speed,
        upAt: Infinity,
      });
    }
    // Blocks of the last press that are no longer found rise on their own.
    for (const [el, b] of known)
      if (!blocks.some((n) => n.el === el)) blocks.push({ ...b, amp: 0 });
    pressed = true;
    pressPoint = { x, y };
    start();
  }

  let pressPoint = { x: 0, y: 0 };
  function release() {
    if (!pressed) return;
    pressed = false;
    const now = performance.now();
    for (const b of blocks) {
      const r = b.el.getBoundingClientRect();
      const dx = Math.max(r.left - pressPoint.x, 0, pressPoint.x - r.right);
      const dy = Math.max(r.top - pressPoint.y, 0, pressPoint.y - r.bottom);
      // The release travels like the press did: the near blocks rise first.
      b.upAt = Math.max(now, b.downAt) + Math.hypot(dx, dy) / speed;
    }
    start();
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || !event.isPrimary) return;
    const target = event.target instanceof Element ? event.target : null;
    if (!target?.closest(INTERACTIVE) || target.closest('[data-flow-off]')) return;
    press(event.clientX, event.clientY, target);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return;
    const target = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null;
    if (!target || target.closest('[data-flow-off]')) return;
    const r = target.getBoundingClientRect();
    press(r.left + r.width / 2, r.top + r.height / 2, target);
  };

  root.addEventListener('pointerdown', onPointerDown, true);
  root.addEventListener('keydown', onKeyDown, true);
  window.addEventListener('pointerup', release, true);
  window.addEventListener('pointercancel', release, true);
  window.addEventListener('keyup', release, true);
  window.addEventListener('blur', release);

  return () => {
    root.removeEventListener('pointerdown', onPointerDown, true);
    root.removeEventListener('keydown', onKeyDown, true);
    window.removeEventListener('pointerup', release, true);
    window.removeEventListener('pointercancel', release, true);
    window.removeEventListener('keyup', release, true);
    window.removeEventListener('blur', release);
    cancelAnimationFrame(frame);
    for (const b of blocks) b.el.style.translate = '';
  };
}
