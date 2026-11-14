// Scale helpers shared by the SVG charts.

/** Rounds a maximum up to 1, 2 or 5 × 10ⁿ, so gridlines land on readable values. */
export function niceMax(value: number): number {
  if (!(value > 0)) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(value)));
  const f = value / exp;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * exp;
}

/**
 * Gridline values for a scale that holds `min`…`max` and zero: about `count` steps of 1, 2 or
 * 5 × 10ⁿ, from a multiple of the step at or below the lower end to one at or above the upper.
 * Data that crosses zero gets a line on zero, so negative bars hang from a labelled baseline.
 */
export function niceTicks(min: number, max: number, count = 5): number[] {
  let lo = Math.min(0, Number.isFinite(min) ? min : 0, Number.isFinite(max) ? max : 0);
  let hi = Math.max(0, Number.isFinite(min) ? min : 0, Number.isFinite(max) ? max : 0);
  if (lo === hi) hi = 1;
  const raw = (hi - lo) / Math.max(1, count);
  const exp = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / exp;
  // The step nearest to the raw one (geometric midpoints between 1, 2, 5 and 10).
  const step = (f >= Math.sqrt(50) ? 10 : f >= Math.sqrt(10) ? 5 : f >= Math.sqrt(2) ? 2 : 1) * exp;
  lo = Math.floor(lo / step) * step;
  hi = Math.ceil(hi / step) * step;
  const n = Math.round((hi - lo) / step);
  // toPrecision drops float noise (0.30000000000000004); `+ 0` turns -0 into 0.
  return Array.from({ length: n + 1 }, (_, i) => Number((lo + i * step).toPrecision(12)) + 0);
}

/**
 * Shortens `label` to at most `chars` characters, ending in an ellipsis when it had to be cut.
 */
export function ellipsize(label: string, chars: number): string {
  if (label.length <= chars) return label;
  return chars <= 1 ? '…' : `${label.slice(0, chars - 1).trimEnd()}…`;
}

/**
 * Room for a column of axis labels, from the longest one: SVG text cannot be measured before it
 * is drawn, so an average glyph width of the small chart type (--fs-2xs) is close enough.
 */
export function labelSpace(labels: readonly string[], min = 24, gap = 10): number {
  const longest = labels.reduce((n, label) => Math.max(n, label.length), 0);
  return Math.max(min, Math.ceil(longest * 6.5) + gap);
}

/**
 * Indexes of the x-axis labels to draw: one per `spacing` px (70 by default, or what the labels
 * need), always including the last (most recent) point and stepping back from it.
 */
export function xTicks(count: number, plotWidth: number, spacing = 70): number[] {
  if (count <= 0) return [];
  const maxTicks = Math.max(2, Math.floor(plotWidth / Math.max(1, spacing)));
  const step = Math.max(1, Math.ceil(count / maxTicks));
  return [...Array(count).keys()].filter((i) => (count - 1 - i) % step === 0);
}

/** A vertical bar with a 4px rounded data end and a square base on the baseline `y0`. */
export function barPath(x: number, y0: number, width: number, height: number, up: boolean): string {
  if (height <= 0 || width <= 0) return '';
  const r = Math.min(4, width / 2, height);
  if (up) {
    const top = y0 - height;
    return `M${x},${y0}V${top + r}Q${x},${top} ${x + r},${top}H${x + width - r}Q${x + width},${top} ${x + width},${top + r}V${y0}Z`;
  }
  const bottom = y0 + height;
  return `M${x},${y0}V${bottom - r}Q${x},${bottom} ${x + r},${bottom}H${x + width - r}Q${x + width},${bottom} ${x + width},${bottom - r}V${y0}Z`;
}

/** A horizontal bar from `x0`, rounded at its right (data) end. */
export function hBarPath(x0: number, y: number, width: number, height: number): string {
  if (width <= 0 || height <= 0) return '';
  const r = Math.min(4, width / 2, height / 2);
  return `M${x0},${y}H${x0 + width - r}Q${x0 + width},${y} ${x0 + width},${y + r}V${y + height - r}Q${x0 + width},${y + height} ${x0 + width - r},${y + height}H${x0}Z`;
}

/** Index of the slot under `x` (relative to the plot's left edge), clamped to the data. */
export function slotAt(x: number, slot: number, count: number): number {
  if (count <= 0 || slot <= 0) return 0;
  return Math.max(0, Math.min(count - 1, Math.floor(x / slot)));
}

/** The point at `angle` (radians, clockwise from twelve o'clock) on a circle of radius `r`. */
export function polar(cx: number, cy: number, r: number, angle: number): [number, number] {
  return [cx + r * Math.sin(angle), cy - r * Math.cos(angle)];
}

/**
 * A ring segment (a donut slice) between the radii `inner` and `outer`, from `start` to `end`
 * (radians, clockwise from twelve o'clock). `gap` px are left out between neighbouring slices,
 * measured on each edge's own circle so the gap is equally wide inside and out (a slice too
 * thin for it keeps a sliver). A full turn is drawn as two halves, since an arc whose ends meet
 * draws nothing.
 */
export function arcPath(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  start: number,
  end: number,
  gap = 0,
): string {
  const sweep = end - start;
  if (!(sweep > 0) || outer <= 0) return '';
  if (sweep >= Math.PI * 2 - 1e-6) {
    const mid = start + Math.PI;
    return `${arcPath(cx, cy, outer, inner, start, mid)}${arcPath(cx, cy, outer, inner, mid, start + Math.PI * 2)}`;
  }
  const pad = (r: number) => (r > 0 ? Math.min(gap / r, (sweep * 2) / 3) / 2 : 0);
  const po = pad(outer);
  const pi = pad(inner);
  const r = (n: number) => Math.round(n * 1000) / 1000;
  const [x0, y0] = polar(cx, cy, outer, start + po);
  const [x1, y1] = polar(cx, cy, outer, end - po);
  const [x2, y2] = polar(cx, cy, inner, end - pi);
  const [x3, y3] = polar(cx, cy, inner, start + pi);
  const big = (pad: number) => (sweep - 2 * pad > Math.PI ? 1 : 0);
  return (
    `M${r(x0)},${r(y0)}A${outer},${outer} 0 ${big(po)} 1 ${r(x1)},${r(y1)}` +
    `L${r(x2)},${r(y2)}A${inner},${inner} 0 ${big(pi)} 0 ${r(x3)},${r(y3)}Z`
  );
}
