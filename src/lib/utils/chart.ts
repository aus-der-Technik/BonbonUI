// Scale helpers shared by the SVG charts.

/** Rounds a maximum up to 1, 2 or 5 × 10ⁿ, so gridlines land on readable values. */
export function niceMax(value: number): number {
  if (!(value > 0)) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(value)));
  const f = value / exp;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * exp;
}

/**
 * Indexes of the x-axis labels to draw: about one per 70px, always including the last
 * (most recent) point and stepping back from it.
 */
export function xTicks(count: number, plotWidth: number): number[] {
  if (count <= 0) return [];
  const maxTicks = Math.max(2, Math.floor(plotWidth / 70));
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
