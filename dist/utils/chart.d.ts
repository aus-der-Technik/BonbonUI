/** Rounds a maximum up to 1, 2 or 5 × 10ⁿ, so gridlines land on readable values. */
export declare function niceMax(value: number): number;
/**
 * Gridline values for a scale that holds `min`…`max` and zero: about `count` steps of 1, 2 or
 * 5 × 10ⁿ, from a multiple of the step at or below the lower end to one at or above the upper.
 * Data that crosses zero gets a line on zero, so negative bars hang from a labelled baseline.
 */
export declare function niceTicks(min: number, max: number, count?: number): number[];
/**
 * Shortens `label` to at most `chars` characters, ending in an ellipsis when it had to be cut.
 */
export declare function ellipsize(label: string, chars: number): string;
/**
 * Room for a column of axis labels, from the longest one: SVG text cannot be measured before it
 * is drawn, so an average glyph width of the small chart type (--fs-2xs) is close enough.
 */
export declare function labelSpace(labels: readonly string[], min?: number, gap?: number): number;
/**
 * Indexes of the x-axis labels to draw: one per `spacing` px (70 by default, or what the labels
 * need), always including the last (most recent) point and stepping back from it.
 */
export declare function xTicks(count: number, plotWidth: number, spacing?: number): number[];
/** A vertical bar with a 4px rounded data end and a square base on the baseline `y0`. */
export declare function barPath(x: number, y0: number, width: number, height: number, up: boolean): string;
/** A horizontal bar from `x0`, rounded at its right (data) end. */
export declare function hBarPath(x0: number, y: number, width: number, height: number): string;
/** Index of the slot under `x` (relative to the plot's left edge), clamped to the data. */
export declare function slotAt(x: number, slot: number, count: number): number;
/** The point at `angle` (radians, clockwise from twelve o'clock) on a circle of radius `r`. */
export declare function polar(cx: number, cy: number, r: number, angle: number): [number, number];
/**
 * A ring segment (a donut slice) between the radii `inner` and `outer`, from `start` to `end`
 * (radians, clockwise from twelve o'clock). `gap` px are left out between neighbouring slices,
 * measured on each edge's own circle so the gap is equally wide inside and out (a slice too
 * thin for it keeps a sliver). A full turn is drawn as two halves, since an arc whose ends meet
 * draws nothing.
 */
export declare function arcPath(cx: number, cy: number, outer: number, inner: number, start: number, end: number, gap?: number): string;
