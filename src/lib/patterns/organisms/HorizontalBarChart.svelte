<script lang="ts" module>
  export interface BarRow {
    label: string;
    /** Tooltip heading; defaults to `label`. */
    title?: string;
    value: number;
    color?: string;
  }
</script>

<script lang="ts">
  /**
   * HorizontalBarChart organism — one bar per row with its count at the end
   * (e.g. "Rating distribution"); the tooltip adds the share of the total. Bars take `color`
   * (any token, default `--up`), a row's own `color` wins; hovering a row dims the others.
   *
   *   <HorizontalBarChart data={[{ label: '5★', value: 120 }, { label: '4★', value: 64 }]} />
   */
  import ChartTooltip, { type TooltipState } from '../molecules/ChartTooltip.svelte';
  import { hBarPath } from '../../utils/chart';
  import { numberFormat, percentFormat } from '../../utils/format';

  interface Props {
    data: BarRow[];
    height?: number;
    countLabel?: string;
    shareLabel?: string;
    /** Bar colour of rows without their own. */
    color?: string;
    emptyText?: string;
    label?: string | undefined;
  }

  let {
    data,
    height = 220,
    countLabel = 'Count',
    shareLabel = 'Share',
    color = 'var(--up)',
    emptyText = 'No data in this range',
    label,
  }: Props = $props();

  let width = $state(0);
  let tooltip = $state<TooltipState | null>(null);
  let hover = $state<string | null>(null);

  const m = { top: 4, right: 44, bottom: 4, left: 30 };
  const total = $derived(data.reduce((sum, d) => sum + d.value, 0));
  const maxValue = $derived(Math.max(...data.map((d) => d.value), 0));
  const plotW = $derived(Math.max(0, width - m.left - m.right));
  const rowH = $derived(data.length ? (height - m.top - m.bottom) / data.length : 0);
  const barH = $derived(Math.max(4, Math.min(22, rowH - 8)));

  function show(event: PointerEvent, d: BarRow) {
    hover = d.label;
    tooltip = {
      x: event.clientX,
      y: event.clientY,
      title: d.title ?? d.label,
      rows: [
        { label: countLabel, value: numberFormat.format(d.value) },
        { label: shareLabel, value: percentFormat.format(total ? d.value / total : 0) },
      ],
    };
  }
</script>

<div class="chart" style:height="{height}px" bind:clientWidth={width}>
  {#if total <= 0}
    <div class="empty">{emptyText}</div>
  {:else if width > 0}
    <svg
      viewBox="0 0 {width} {height}"
      role="img"
      aria-label={label ?? data.map((d) => `${d.label} ${d.value}`).join(', ')}
    >
      {#each data as d, row (d.label)}
        {@const y = m.top + row * rowH + (rowH - barH) / 2}
        {@const w = maxValue ? (d.value / maxValue) * plotW : 0}
        <text x={m.left - 8} y={y + barH / 2 + 4} text-anchor="end">{d.label}</text>
        <line x1={m.left} x2={m.left} y1={y - 3} y2={y + barH + 3} stroke="var(--axis)" />
        {#if d.value}<path
            class="bar"
            d={hBarPath(m.left + 1, y, w, barH)}
            fill={d.color ?? color}
            class:dim={hover != null && hover !== d.label}
          />{/if}
        <text x={m.left + w + 6} y={y + barH / 2 + 4}>{numberFormat.format(d.value)}</text>
        <rect
          x="0"
          y={m.top + row * rowH}
          {width}
          height={rowH}
          fill="transparent"
          role="presentation"
          onpointermove={(event) => show(event, d)}
          onpointerleave={() => {
            tooltip = null;
            hover = null;
          }}
        />
      {/each}
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
  path {
    transition: opacity var(--motion-quick) var(--ease-out);
  }
  .dim {
    opacity: 0.45;
  }
  line {
    shape-rendering: crispEdges;
  }
  /* Bars grow out of the axis once, when the data arrives. */
  .bar {
    transform-box: fill-box;
    transform-origin: left center;
    animation: grow var(--motion-slow) var(--ease-out) both;
  }
  @keyframes grow {
    from {
      transform: scaleX(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .bar {
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
