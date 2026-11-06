/** Rounds a maximum up to 1, 2 or 5 × 10ⁿ, so gridlines land on readable values. */
export declare function niceMax(value: number): number;
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
