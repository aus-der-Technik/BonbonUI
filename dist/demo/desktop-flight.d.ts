/** One jelly squish on `target` (≤ 48px things may spring). */
export declare function squish(target: Element | null | undefined): void;
/**
 * Flies an inert copy of `source` into `target` (an arc: up and over, shrinking on the way)
 * and squishes the target when it lands. Without a target the copy shrinks away where it was;
 * under reduced motion it only fades.
 */
export declare function flyInto(source: Element | null | undefined, target: Element | null | undefined): Promise<void>;
