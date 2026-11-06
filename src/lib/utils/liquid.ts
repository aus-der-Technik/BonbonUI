/**
 * Liquid — the motion of thick water.
 *
 * `LiquidDrop` moves a selection mark (the pill under the current tab, rail item, nav link)
 * from one box to the next like a drop of syrup: the leading edge runs ahead, the trailing edge
 * lets go late and catches up with a soft wobble, and while it is stretched the drop thins, as
 * a liquid keeps its volume. The surface it moves in (the bar, the rail) bulges along with it
 * and settles. Springs, not curves: a move that is interrupted carries its speed into the next.
 *
 * Everything is a transform or the size of one absolutely positioned leaf, run on one frame
 * loop only while something moves. Under `prefers-reduced-motion` the drop jumps and nothing
 * wobbles.
 */

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface LiquidOptions {
  /** Draws the drop each frame (e.g. writes CSS variables for a `::before`). */
  render: (box: Box) => void;
  /** The surface the drop moves in: it bulges perpendicular to the motion and settles. */
  host?: HTMLElement | null | undefined;
  /** How far the host may bulge (fraction of its size). Default 0.035. */
  bulge?: number;
}

interface Spring {
  x: number;
  v: number;
  to: number;
}

const spring = (x: number): Spring => ({ x, v: 0, to: x });

/** One semi-implicit Euler step: stable at frame rates from 30 to 120 Hz. */
function step(s: Spring, k: number, c: number, dt: number): void {
  const a = -k * (s.x - s.to) - c * s.v;
  s.v += a * dt;
  s.x += s.v * dt;
}

const settled = (s: Spring, eps = 0.05) => Math.abs(s.x - s.to) < eps && Math.abs(s.v) < eps * 4;

// Leading edge: quick and nearly critically damped. Trailing edge: slower and a little under-
// damped, so it lets go late and wobbles once. Sides: in between.
const LEAD = { k: 520, c: 34 };
const TRAIL = { k: 190, c: 16 };
const SIDE = { k: 380, c: 26 };
// The host: a soft jelly that rings out.
const JELLY = { k: 160, c: 9 };

export function reducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
}

/** An element's box relative to an ancestor, from offsets: unaffected by running transforms. */
export function boxWithin(el: HTMLElement, ancestor: HTMLElement): Box {
  const a = pageOffset(el);
  const b = pageOffset(ancestor);
  // Measured from the ancestor's padding edge, where its absolutely placed children start.
  return {
    x: a.x - b.x - ancestor.clientLeft,
    y: a.y - b.y - ancestor.clientTop,
    w: el.offsetWidth,
    h: el.offsetHeight,
  };
}

function pageOffset(el: HTMLElement): { x: number; y: number } {
  let x = 0;
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return { x, y };
}

export class LiquidDrop {
  #l = spring(0);
  #r = spring(0);
  #t = spring(0);
  #b = spring(0);
  #jelly = spring(0);
  #axis: 'x' | 'y' = 'x';
  #forward = true;
  #target: Box | null = null;
  #frame = 0;
  #last = 0;
  #opts: LiquidOptions;

  constructor(options: LiquidOptions) {
    this.#opts = options;
  }

  /**
   * Sends the drop to `box`. `move` (default) flows there with a splash; `follow` adjusts to a
   * box that only changed size or place a little (a resize, a font loading) without one, and
   * keeps any motion in flight; `instant` lands at once. The first placement is always instant.
   */
  moveTo(box: Box, mode: 'move' | 'follow' | 'instant' = 'move'): void {
    const from = this.#target;
    this.#target = box;
    if (!from || mode === 'instant' || reducedMotion()) {
      for (const [s, v] of [
        [this.#l, box.x],
        [this.#r, box.x + box.w],
        [this.#t, box.y],
        [this.#b, box.y + box.h],
      ] as const) {
        s.x = s.to = v;
        s.v = 0;
      }
      this.#jelly.x = this.#jelly.to = this.#jelly.v = 0;
      this.#paint();
      this.#clearHost();
      return;
    }
    this.#l.to = box.x;
    this.#r.to = box.x + box.w;
    this.#t.to = box.y;
    this.#b.to = box.y + box.h;
    if (mode === 'follow') {
      if (this.#frame) return;
      // Nothing in flight: a small change is simply drawn.
      for (const e of [this.#l, this.#r, this.#t, this.#b]) e.x = e.to;
      this.#paint();
      return;
    }
    const dx = box.x + box.w / 2 - (from.x + from.w / 2);
    const dy = box.y + box.h / 2 - (from.y + from.h / 2);
    this.#axis = Math.abs(dy) > Math.abs(dx) ? 'y' : 'x';
    this.#forward = (this.#axis === 'x' ? dx : dy) >= 0;
    // The surface gets a push in proportion to the distance: a far jump splashes more.
    const distance = Math.hypot(dx, dy);
    const size = this.#axis === 'x' ? box.w : box.h;
    this.#jelly.v += Math.min(1, distance / Math.max(size * 4, 1)) * 6;
    this.#start();
  }

  destroy(): void {
    cancelAnimationFrame(this.#frame);
    this.#frame = 0;
    this.#clearHost();
  }

  #start(): void {
    if (this.#frame) return;
    this.#last = performance.now();
    this.#frame = requestAnimationFrame(this.#tick);
  }

  #tick = (now: number): void => {
    const dt = Math.min(1 / 30, Math.max(0, (now - this.#last) / 1000));
    this.#last = now;
    const horizontal = this.#axis === 'x';
    // Which edge leads depends on the direction of travel.
    const [leadX, trailX] = this.#forward ? [this.#r, this.#l] : [this.#l, this.#r];
    const [leadY, trailY] = this.#forward ? [this.#b, this.#t] : [this.#t, this.#b];
    if (horizontal) {
      step(leadX, LEAD.k, LEAD.c, dt);
      step(trailX, TRAIL.k, TRAIL.c, dt);
      step(this.#t, SIDE.k, SIDE.c, dt);
      step(this.#b, SIDE.k, SIDE.c, dt);
    } else {
      step(leadY, LEAD.k, LEAD.c, dt);
      step(trailY, TRAIL.k, TRAIL.c, dt);
      step(this.#l, SIDE.k, SIDE.c, dt);
      step(this.#r, SIDE.k, SIDE.c, dt);
    }
    step(this.#jelly, JELLY.k, JELLY.c, dt);
    this.#paint();
    this.#paintHost();
    const done =
      [this.#l, this.#r, this.#t, this.#b].every((s) => settled(s)) && settled(this.#jelly, 0.002);
    if (done) {
      this.#frame = 0;
      this.#clearHost();
      return;
    }
    this.#frame = requestAnimationFrame(this.#tick);
  };

  #paint(): void {
    const target = this.#target;
    if (!target) return;
    let x = this.#l.x;
    let y = this.#t.x;
    let w = Math.max(1, this.#r.x - this.#l.x);
    let h = Math.max(1, this.#b.x - this.#t.x);
    // A liquid keeps its volume: stretched along the motion, it thins across it.
    if (this.#axis === 'x') {
      const thin = Math.min(1.12, Math.max(0.74, Math.sqrt(target.w / w)));
      const nh = target.h * thin;
      y += (h - nh) / 2;
      h = nh;
    } else {
      const thin = Math.min(1.12, Math.max(0.74, Math.sqrt(target.h / h)));
      const nw = target.w * thin;
      x += (w - nw) / 2;
      w = nw;
    }
    this.#opts.render({ x, y, w, h });
  }

  #paintHost(): void {
    const host = this.#opts.host;
    if (!host) return;
    const amount = Math.max(-1, Math.min(1, this.#jelly.x)) * (this.#opts.bulge ?? 0.035);
    // Bulge across the motion, give a little along it — around where the drop is.
    const cx = (this.#l.x + this.#r.x) / 2;
    const cy = (this.#t.x + this.#b.x) / 2;
    host.style.transformOrigin = `${cx}px ${cy}px`;
    host.style.scale =
      this.#axis === 'x'
        ? `${1 - amount * 0.35} ${1 + amount}`
        : `${1 + amount} ${1 - amount * 0.35}`;
  }

  #clearHost(): void {
    const host = this.#opts.host;
    if (!host) return;
    host.style.scale = '';
    host.style.transformOrigin = '';
  }
}

export interface SqueezeOptions {
  /** What counts as a press (default: buttons and links inside the host). */
  selector?: string;
  /** How much the surface gives across its long side (fraction). Default 0.03. */
  amount?: number;
  /** Called every frame with the press (0…1, rings a little below 0 on release) and where it
   *  is along the long side, in px — to morph the outline there (see `pillPath`). */
  onFrame?: ((press: number, at: number) => void) | undefined;
}

const PINCH_IN = { k: 360, c: 30 };
// Letting go: a little looser, so the band settles back with one soft ring — rubber, not a hinge.
const PINCH_OUT = { k: 210, c: 15 };

/**
 * Squeeze — pressing an item squeezes the surface around it a little, like a rubber band
 * pressed with a finger: it narrows across its long side and gives a hair along it, centred on
 * the press, and on release it settles back with a soft ring. A plain transform, so the
 * surface keeps its shadow and glass; nothing is left on it at rest. Returns the cleanup.
 */
export function squeeze(host: HTMLElement, options: SqueezeOptions = {}): () => void {
  const selector = options.selector ?? 'a[href], button';
  const amount = options.amount ?? 0.03;
  const s = spring(0);
  let frame = 0;
  let last = 0;
  let across = true;
  let origin = '50% 50%';
  let along = 0;

  const paint = () => {
    options.onFrame?.(Math.abs(s.x) < 0.002 ? 0 : s.x, along);
    if (Math.abs(s.x) < 0.002) {
      host.style.removeProperty('transform');
      host.style.removeProperty('transform-origin');
      return;
    }
    const narrow = 1 - s.x * amount;
    const longer = 1 + s.x * amount * 0.25;
    host.style.transformOrigin = origin;
    host.style.transform = across ? `scale(${narrow}, ${longer})` : `scale(${longer}, ${narrow})`;
  };

  const tick = (now: number) => {
    const dt = Math.min(1 / 30, Math.max(0, (now - last) / 1000));
    last = now;
    const { k, c } = s.to ? PINCH_IN : PINCH_OUT;
    step(s, k, c, dt);
    paint();
    if (s.to || !settled(s, 0.003)) frame = requestAnimationFrame(tick);
    else {
      frame = 0;
      s.x = s.v = 0;
      paint();
    }
  };
  const start = () => {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const down = (event: PointerEvent) => {
    if (event.button !== 0 || reducedMotion()) return;
    const item =
      event.target instanceof Element ? event.target.closest<HTMLElement>(selector) : null;
    if (!item || !host.contains(item)) return;
    const box = host.getBoundingClientRect();
    const r = item.getBoundingClientRect();
    // Squeeze across the long side: a tall rail narrows, a wide bar gets lower.
    across = box.height > box.width;
    origin = `${r.left + r.width / 2 - box.left}px ${r.top + r.height / 2 - box.top}px`;
    along = across ? r.top + r.height / 2 - box.top : r.left + r.width / 2 - box.left;
    s.to = 1;
    start();
  };
  const up = () => {
    if (!s.to) return;
    s.to = 0;
    start();
  };

  host.addEventListener('pointerdown', down);
  window.addEventListener('pointerup', up, true);
  window.addEventListener('pointercancel', up, true);
  return () => {
    host.removeEventListener('pointerdown', down);
    window.removeEventListener('pointerup', up, true);
    window.removeEventListener('pointercancel', up, true);
    cancelAnimationFrame(frame);
    s.x = 0;
    paint();
  };
}

/**
 * The outline of a pill-shaped bar as an SVG path, with an optional bulge: both long edges
 * swell outwards by `bulge` px around `at` (a smooth bell `reach` px to either side), the way
 * a water-filled band gives where it is pressed. `inset` is the room left on each long side
 * for the bulge to grow into. Vertical bars bulge left and right, horizontal ones up and down.
 */
export function pillPath(
  width: number,
  height: number,
  options: {
    inset: number;
    at?: number | undefined;
    bulge?: number | undefined;
    reach?: number | undefined;
    vertical?: boolean | undefined;
  },
): string {
  const vertical = options.vertical ?? height > width;
  // Work in a vertical frame: x across, y along; swap back for horizontal bars.
  const W = vertical ? width : height;
  const H = vertical ? height : width;
  const B = options.inset;
  const r = (W - 2 * B) / 2;
  const bulge = Math.max(0, options.bulge ?? 0);
  const at = options.at ?? H / 2;
  // The bell stays on the straight part of the edge, clear of the round ends.
  const reach = Math.max(4, Math.min(options.reach ?? 30, at - r, H - r - at));
  const pt = (x: number, y: number) =>
    vertical ? `${x.toFixed(2)} ${y.toFixed(2)}` : `${y.toFixed(2)} ${x.toFixed(2)}`;
  const k = 0.5;
  const left = B - bulge;
  const right = W - B + bulge;
  const parts = [`M${pt(B, r)}`];
  // Top cap, then down the right edge (with its bulge), bottom cap, up the left edge.
  parts.push(`A${r} ${r} 0 0 ${vertical ? 1 : 0} ${pt(W - B, r)}`);
  if (bulge > 0.01 && reach > 4) {
    parts.push(`L${pt(W - B, at - reach)}`);
    parts.push(`C${pt(W - B, at - reach * k)} ${pt(right, at - reach * k)} ${pt(right, at)}`);
    parts.push(
      `C${pt(right, at + reach * k)} ${pt(W - B, at + reach * k)} ${pt(W - B, at + reach)}`,
    );
  }
  parts.push(`L${pt(W - B, H - r)}`);
  parts.push(`A${r} ${r} 0 0 ${vertical ? 1 : 0} ${pt(B, H - r)}`);
  if (bulge > 0.01 && reach > 4) {
    parts.push(`L${pt(B, at + reach)}`);
    parts.push(`C${pt(B, at + reach * k)} ${pt(left, at + reach * k)} ${pt(left, at)}`);
    parts.push(`C${pt(left, at - reach * k)} ${pt(B, at - reach * k)} ${pt(B, at - reach)}`);
  }
  parts.push('Z');
  return parts.join(' ');
}
