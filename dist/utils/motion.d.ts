import type { TransitionConfig } from 'svelte/transition';
/** Whether the user asked for reduced motion (false where there is no `matchMedia`). */
export declare function prefersReducedMotion(): boolean;
/** Scrolls to the top, instantly when the user asked for reduced motion. */
export declare function scrollToTop(): void;
/** The `--motion-*` duration tokens. */
export type MotionSpeed = 'quick' | 'base' | 'slow' | 'lazy';
/** The `--ease-*` curve tokens. */
export type MotionEase = 'out' | 'in-out' | 'spring' | 'jelly';
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
/** A cubic-bezier curve as a function of time, solved for x by Newton's method. */
export declare function cubicBezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number;
/**
 * Duration and curve of a movement, read from the `--motion-*` / `--ease-*` tokens where `from`
 * sits (the root by default), so JS animations follow the same tokens as CSS ones. Under
 * reduced motion it returns a short linear fade (`--motion-quick`) and `reduced: true`.
 *
 *   const m = motion('slow', 'out', root);
 *   root.animate(frames, { duration: m.duration, easing: m.easing });
 */
export declare function motion(speed?: MotionSpeed, ease?: MotionEase, from?: Element): Motion;
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
export declare function glide(node: Element, params?: GlideParams): TransitionConfig;
/** Transform origin (px, relative to `box`) at the centre of `from`, for growing out of it. */
export declare function originFrom(from: Element | DOMRect | undefined, box: DOMRect): string | undefined;
