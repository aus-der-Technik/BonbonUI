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
export declare const spring: (x: number) => Spring;
/** One semi-implicit Euler step: stable at frame rates from 30 to 120 Hz. */
export declare function step(s: Spring, { k, c }: SpringParams, dt: number): void;
/** At rest (close enough to its target, and slow enough) to stop animating. */
export declare const settled: (s: Spring, eps?: number) => boolean;
/** The time since the last frame in seconds, capped so a stalled tab does not jump. */
export declare const frameTime: (now: number, last: number) => number;
