import type { TransitionConfig } from 'svelte/transition';

/** Whether the user asked for reduced motion (false where there is no `matchMedia`). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

/** Scrolls to the top, instantly when the user asked for reduced motion. */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** The `--motion-*` duration tokens. */
export type MotionSpeed = 'quick' | 'base' | 'slow' | 'lazy';
/** The `--ease-*` curve tokens. */
export type MotionEase = 'out' | 'in-out' | 'spring' | 'jelly';

// The tokens' values, for SSR, tests and pages without tokens.css.
const SPEEDS: Record<MotionSpeed, number> = { quick: 120, base: 220, slow: 360, lazy: 640 };
const CURVES: Record<MotionEase, string> = {
  out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  jelly: 'cubic-bezier(0.5, 1.8, 0.5, 0.8)',
};

export interface Motion {
  /** Milliseconds. */
  duration: number;
  /** A CSS timing function, for `element.animate()`. */
  easing: string;
  /** The same curve as a function, for Svelte transitions and `animate:`. */
  ease: (t: number) => number;
  /**
   * The user asked for reduced motion: `duration` is `--motion-quick` and `easing` linear.
   * Fade instead of moving or scaling.
   */
  reduced: boolean;
}

function token(name: string, from: Element | undefined): string {
  if (typeof getComputedStyle !== 'function' || typeof document === 'undefined') return '';
  try {
    return getComputedStyle(from ?? document.documentElement)
      .getPropertyValue(name)
      .trim();
  } catch {
    return '';
  }
}

function toMs(value: string, fallback: number): number {
  const match = /^(-?[\d.]+)(ms|s)$/.exec(value);
  if (!match) return fallback;
  const n = Number(match[1]) * (match[2] === 's' ? 1000 : 1);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

/** A cubic-bezier curve as a function of time, solved for x by Newton's method. */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const x = (t: number) => ((ax * t + bx) * t + cx) * t;
  const y = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (progress) => {
    if (progress <= 0) return 0;
    if (progress >= 1) return 1;
    let t = progress;
    for (let i = 0; i < 8; i++) {
      const error = x(t) - progress;
      if (Math.abs(error) < 1e-6) return y(t);
      const slope = dx(t);
      if (Math.abs(slope) < 1e-6) break;
      t -= error / slope;
    }
    // Newton stalled on a flat stretch: bisect instead.
    let lo = 0;
    let hi = 1;
    t = progress;
    while (hi - lo > 1e-6) {
      if (x(t) < progress) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return y(t);
  };
}

const linear = (t: number) => t;

function toEase(curve: string): ((t: number) => number) | undefined {
  if (curve === 'linear') return linear;
  const match = /^cubic-bezier\(([^)]+)\)$/.exec(curve);
  const n = match?.[1]?.split(',').map(Number);
  if (!n || n.length !== 4 || n.some((v) => !Number.isFinite(v))) return undefined;
  return cubicBezier(n[0]!, n[1]!, n[2]!, n[3]!);
}

/**
 * Duration and curve of a movement, read from the `--motion-*` / `--ease-*` tokens where `from`
 * sits (the root by default), so JS animations follow the same tokens as CSS ones. Under
 * reduced motion it returns a short linear fade (`--motion-quick`) and `reduced: true`.
 *
 *   const m = motion('slow', 'out', root);
 *   root.animate(frames, { duration: m.duration, easing: m.easing });
 */
export function motion(
  speed: MotionSpeed = 'base',
  ease: MotionEase = 'out',
  from?: Element,
): Motion {
  if (prefersReducedMotion()) {
    return {
      duration: toMs(token('--motion-quick', from), SPEEDS.quick),
      easing: 'linear',
      ease: linear,
      reduced: true,
    };
  }
  const read = token(`--ease-${ease}`, from);
  const parsed = read ? toEase(read) : undefined;
  return {
    duration: toMs(token(`--motion-${speed}`, from), SPEEDS[speed]),
    easing: parsed ? read : CURVES[ease],
    ease: parsed ?? toEase(CURVES[ease])!,
    reduced: false,
  };
}

export interface GlideParams {
  /** Offset in px it glides from (in) or to (out). */
  x?: number;
  y?: number;
  /** Scale at the far end, e.g. 0.96. */
  scale?: number;
  speed?: MotionSpeed;
  ease?: MotionEase;
  delay?: number;
}

/**
 * A Svelte transition on the motion tokens: glides and fades in from (or out to) an offset.
 * Under reduced motion it only fades, quickly.
 *
 *   <div in:glide={{ x: 48, speed: 'slow' }} out:glide={{ x: 24, speed: 'quick' }}>
 */
export function glide(node: Element, params: GlideParams = {}): TransitionConfig {
  const { x = 0, y = 0, scale = 1, speed = 'base', ease = 'out', delay = 0 } = params;
  const m = motion(speed, ease, node);
  if (m.reduced) return { delay, duration: m.duration, css: (t) => `opacity: ${t}` };
  const style = typeof getComputedStyle === 'function' ? getComputedStyle(node) : undefined;
  const base = style && style.transform !== 'none' ? style.transform : '';
  const opacity = style ? Number(style.opacity) || 1 : 1;
  return {
    delay,
    duration: m.duration,
    easing: m.ease,
    css: (t, u) =>
      `transform: ${base} translate(${u * x}px, ${u * y}px) scale(${1 - u * (1 - scale)}); opacity: ${t * opacity}`,
  };
}

/** Transform origin (px, relative to `box`) at the centre of `from`, for growing out of it. */
export function originFrom(from: Element | DOMRect | undefined, box: DOMRect): string | undefined {
  const rect = from instanceof Element ? from.getBoundingClientRect() : from;
  if (!rect || (!rect.width && !rect.height && !rect.left && !rect.top)) return undefined;
  return `${rect.left + rect.width / 2 - box.left}px ${rect.top + rect.height / 2 - box.top}px`;
}
