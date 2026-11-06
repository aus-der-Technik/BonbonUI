/**
 * Spring — the one piece of physics behind every organic motion in the library (liquid
 * selection marks, the rubber squeeze, the press ripple). A damped spring pulls a value
 * towards its target; stiffness `k` sets how fast, damping `c` how much it rings. Under-
 * damped springs (small `c`) overshoot and wobble; that is the "thick water" feel.
 */

export interface Spring {
  /** Where it is. */
  x: number;
  /** How fast it moves. */
  v: number;
  /** Where it wants to be. */
  to: number;
}

export interface SpringParams {
  /** Stiffness: how strongly it pulls towards the target. */
  k: number;
  /** Damping: how quickly the motion dies down (small = wobbly). */
  c: number;
}

/** A spring at rest at `x`. */
export const spring = (x: number): Spring => ({ x, v: 0, to: x });

/** One semi-implicit Euler step: stable at frame rates from 30 to 120 Hz. */
export function step(s: Spring, { k, c }: SpringParams, dt: number): void {
  s.v += (-k * (s.x - s.to) - c * s.v) * dt;
  s.x += s.v * dt;
}

/** At rest (close enough to its target, and slow enough) to stop animating. */
export const settled = (s: Spring, eps = 0.05): boolean =>
  Math.abs(s.x - s.to) < eps && Math.abs(s.v) < eps * 4;

/** The time since the last frame in seconds, capped so a stalled tab does not jump. */
export const frameTime = (now: number, last: number): number =>
  Math.min(1 / 30, Math.max(0, (now - last) / 1000));
