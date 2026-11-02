<script lang="ts" module>
  export interface LinePoint {
    label: string;
    title?: string;
    /** `null` is a gap in the data, not a zero: the line connects the points around it. */
    value: number | null;
    /** Number of samples behind the value, shown in the tooltip. */
    count?: number;
  }
</script>

<script lang="ts">
  /**
   * LineChart organism — a value per slot on a fixed scale (e.g. "Average rating per day",
   * 1–5★). A soft gradient fills the area under the line; dots are drawn while there are at most
   * 60 points; hovering snaps a crosshair to the nearest point. `color` takes any token, e.g.
   * `var(--accent)` to follow the tint or `var(--color-purple)` from the candy palette.
   *
   *   <LineChart data={days} min={1} max={5} valueLabel="Average" />
   */
  import ChartTooltip, { type TooltipState } from '../molecules/ChartTooltip.svelte';
  import { xTicks } from '../../utils/chart';
  import { decimalFormat, numberFormat } from '../../utils/format';

  interface Props {
    data: LinePoint[];
    min?: number;
    max?: number;
    /** Gridline values; defaults to every integer from min to max. */
    ticks?: number[] | undefined;
    tickFormat?: (value: number) => string;
    valueFormat?: (value: number) => string;
    valueLabel?: string;
    countLabel?: string;
    height?: number;
    /** Colour of the line, its dots and its area. */
    color?: string;
    /** Fills the area under the line with a fading gradient. */
    area?: boolean;
    emptyText?: string;
    label?: string | undefined;
  }

  let {
    data,
    min = 0,
    max = 1,
    ticks,
    tickFormat = (v) => numberFormat.format(v),
    valueFormat = (v) => decimalFormat.format(v),
    valueLabel = 'Value',
    countLabel = 'Count',
    height = 220,
    color = 'var(--line)',
    area = true,
    emptyText = 'No data in this range',
    label,
  }: Props = $props();

  const id = $props.id();

  let width = $state(0);
  let hover = $state<number | null>(null);
  let tooltip = $state<TooltipState | null>(null);

  const m = { top: 10, right: 10, bottom: 22, left: 32 };
  const points = $derived(data.flatMap((d, i) => (d.value == null ? [] : [{ i, d, v: d.value }])));
  const plotW = $derived(Math.max(0, width - m.left - m.right));
  const plotH = $derived(height - m.top - m.bottom);
  const slot = $derived(data.length ? plotW / data.length : 0);
  const xAt = (i: number) => m.left + i * slot + slot / 2;
  const yAt = (v: number) => m.top + plotH - ((v - min) / (max - min || 1)) * plotH;
  const gridValues = $derived(
    ticks ?? Array.from({ length: Math.floor(max - min) + 1 }, (_, n) => min + n),
  );
  const path = $derived(points.map((p, n) => `${n ? 'L' : 'M'}${xAt(p.i)},${yAt(p.v)}`).join(''));
  const hovered = $derived(hover == null ? undefined : points[hover]);
  const areaPath = $derived.by(() => {
    const first = points[0];
    const last = points.at(-1);
    if (!first || !last) return '';
    const base = m.top + plotH;
    return `${path}L${xAt(last.i)},${base}L${xAt(first.i)},${base}Z`;
  });

  function move(event: PointerEvent) {
    const box = (event.currentTarget as SVGElement).ownerSVGElement?.getBoundingClientRect();
    const raw = (event.clientX - (box?.left ?? 0) - m.left) / (slot || 1) - 0.5;
    let best = 0;
    points.forEach((p, n) => {
      if (Math.abs(p.i - raw) < Math.abs((points[best]?.i ?? 0) - raw)) best = n;
    });
    const p = points[best];
    if (!p) return;
    hover = best;
    tooltip = {
      x: event.clientX,
      y: event.clientY,
      title: p.d.title ?? p.d.label,
      rows: [
        { label: valueLabel, value: valueFormat(p.v) },
        ...(p.d.count != null
          ? [{ label: countLabel, value: numberFormat.format(p.d.count) }]
          : []),
      ],
    };
  }

  function leave() {
    hover = null;
    tooltip = null;
  }
</script>

<div class="chart" style:height="{height}px" bind:clientWidth={width}>
  {#if !points.length}
    <div class="empty">{emptyText}</div>
  {:else if width > 0}
    <svg viewBox="0 0 {width} {height}" role="img" aria-label={label ?? valueLabel}>
      {#each gridValues as v, n (v)}
        <line
          x1={m.left}
          x2={width - m.right}
          y1={yAt(v)}
          y2={yAt(v)}
          stroke={n === 0 ? 'var(--axis)' : 'var(--grid)'}
        />
        <text x={m.left - 6} y={yAt(v) + 4} text-anchor="end">{tickFormat(v)}</text>
      {/each}
      {#each xTicks(data.length, plotW) as i (i)}
        <text x={xAt(i)} y={height - 6} text-anchor="middle">{data[i]?.label}</text>
      {/each}
      {#if area}
        <defs>
          <linearGradient id="{id}-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color={color} stop-opacity="0.28" />
            <stop offset="1" stop-color={color} stop-opacity="0" />
          </linearGradient>
        </defs>
        <path class="area" d={areaPath} fill="url(#{id}-area)" />
      {/if}
      <path
        class="line"
        d={path}
        pathLength="1"
        fill="none"
        stroke={color}
        stroke-width="2.5"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      {#if points.length <= 60}
        {#each points as p (p.i)}
          <circle
            class="dot"
            cx={xAt(p.i)}
            cy={yAt(p.v)}
            r="3.5"
            fill={color}
            stroke="var(--bg)"
            stroke-width="2"
          />
        {/each}
      {/if}
      {#if hovered}
        <line
          x1={xAt(hovered.i)}
          x2={xAt(hovered.i)}
          y1={m.top}
          y2={m.top + plotH}
          stroke="var(--axis)"
          stroke-dasharray="3 3"
        />
        <circle
          cx={xAt(hovered.i)}
          cy={yAt(hovered.v)}
          r="5"
          fill={color}
          stroke="var(--bg)"
          stroke-width="2"
        />
      {/if}
      <rect
        x={m.left}
        y="0"
        width={plotW}
        {height}
        fill="transparent"
        role="presentation"
        onpointermove={move}
        onpointerleave={leave}
      />
    </svg>
  {/if}
</div>
<ChartTooltip {tooltip} />

<style>
  .chart {
    position: relative;
    width: 100%;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  text {
    font-size: 11px;
    fill: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  line {
    shape-rendering: crispEdges;
  }
  /* The data arrives: the line draws itself, area and dots fade in after it. */
  .line {
    stroke-dasharray: 1;
    animation: draw var(--motion-lazy) var(--ease-out) both;
  }
  .area,
  .dot {
    pointer-events: none;
    animation: appear var(--motion-slow) var(--ease-out) var(--motion-base) both;
  }
  circle {
    transition: r var(--motion-base) var(--ease-spring);
  }
  @keyframes draw {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes appear {
    from {
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .line,
    .area,
    .dot {
      animation: none;
    }
  }
  .empty {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: var(--text-3);
    font-size: var(--fs-md);
  }
</style>
