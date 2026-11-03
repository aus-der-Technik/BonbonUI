<script lang="ts" module>
  export interface DivergingPoint {
    /** Short axis label, e.g. "14.10." */
    label: string;
    /** Tooltip heading; defaults to `label`. */
    title?: string;
    up: number;
    down: number;
  }
</script>

<script lang="ts">
  /**
   * DivergingBarChart organism — per-slot counts above and below a baseline (e.g.
   * "Votes per day": up above, down below, in the chart tokens `--up` / `--down` unless
   * `upColor` / `downColor` say otherwise). Laid out at the container's real pixel width so
   * text stays unscaled; hovering a slot highlights it and shows both counts and the up share.
   * The svg is hidden from assistive tech; a visually hidden table (caption = `label`) carries
   * the values.
   *
   *   <DivergingBarChart data={[{ label: '14.10.', up: 12, down: 3 }]} upLabel="Helpful" />
   */
  import ChartTooltip, { type TooltipState } from '../molecules/ChartTooltip.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import type { IconName } from '../atoms/icons';
  import ChartDataTable from './ChartDataTable.svelte';
  import { barPath, niceMax, slotAt, xTicks } from '../../utils/chart';
  import { numberFormat, percentFormat } from '../../utils/format';

  interface Props {
    data: DivergingPoint[];
    height?: number;
    upLabel?: string;
    downLabel?: string;
    shareLabel?: string;
    upColor?: string;
    downColor?: string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    /** Caption of the hidden data table; defaults to the up and down totals. */
    label?: string | undefined;
    /** Heading of the label column in the hidden data table. */
    categoryLabel?: string;
  }

  let {
    data,
    height = 220,
    upLabel = 'Up',
    downLabel = 'Down',
    shareLabel = 'Up share',
    upColor = 'var(--up)',
    downColor = 'var(--down)',
    emptyTitle,
    emptyMessage,
    emptyIcon,
    emptyText,
    label,
    categoryLabel = 'Period',
  }: Props = $props();

  let width = $state(0);
  let hover = $state<number | null>(null);
  let tooltip = $state<TooltipState | null>(null);

  const m = { top: 8, right: 8, bottom: 22, left: 36 };
  const totalUp = $derived(data.reduce((sum, d) => sum + d.up, 0));
  const totalDown = $derived(data.reduce((sum, d) => sum + d.down, 0));
  const hasData = $derived(totalUp + totalDown > 0);
  const plotW = $derived(Math.max(0, width - m.left - m.right));
  const plotH = $derived(height - m.top - m.bottom);
  const scaleMax = $derived(niceMax(Math.max(...data.map((d) => Math.max(d.up, d.down)), 1)));
  const y0 = $derived(m.top + plotH / 2);
  const k = $derived(plotH / 2 / scaleMax);
  const slot = $derived(data.length ? plotW / data.length : 0);
  const barW = $derived(Math.max(1, Math.min(18, slot - 2)));
  const gridValues = $derived([scaleMax, scaleMax / 2, 0, -scaleMax / 2, -scaleMax]);

  function move(event: PointerEvent) {
    const box = (event.currentTarget as SVGElement).ownerSVGElement?.getBoundingClientRect();
    const i = slotAt(event.clientX - (box?.left ?? 0) - m.left, slot, data.length);
    const d = data[i];
    if (!d) return;
    hover = i;
    tooltip = {
      x: event.clientX,
      y: event.clientY,
      title: d.title ?? d.label,
      rows: [
        { label: upLabel, value: numberFormat.format(d.up), color: upColor },
        { label: downLabel, value: numberFormat.format(d.down), color: downColor },
        ...(d.up + d.down ? [{ label: shareLabel, value: share(d) }] : []),
      ],
    };
  }

  const share = (d: DivergingPoint) =>
    d.up + d.down ? percentFormat.format(d.up / (d.up + d.down)) : '';
  const tableRows = $derived(
    data.map((d): [string, string[]] => [
      d.title ?? d.label,
      [numberFormat.format(d.up), numberFormat.format(d.down), share(d)],
    ]),
  );

  function leave() {
    hover = null;
    tooltip = null;
  }
</script>

<div class="chart" style:height="{height}px" bind:clientWidth={width}>
  {#if !hasData}
    <div class="empty">
      <EmptyState
        title={emptyTitle}
        message={emptyMessage ?? emptyText ?? 'No data in this range'}
        icon={emptyIcon}
        compact={!emptyTitle}
      />
    </div>
  {:else}
    <ChartDataTable
      caption={label ??
        `${upLabel} ${numberFormat.format(totalUp)}, ${downLabel} ${numberFormat.format(totalDown)}`}
      columns={[categoryLabel, upLabel, downLabel, shareLabel]}
      rows={tableRows}
    />
  {/if}
  {#if hasData && width > 0}
    <svg viewBox="0 0 {width} {height}" aria-hidden="true">
      {#each gridValues as v (v)}
        {@const y = y0 - v * k}
        <line
          x1={m.left}
          x2={width - m.right}
          y1={y}
          y2={y}
          stroke={v === 0 ? 'var(--axis)' : 'var(--grid)'}
        />
        <!-- Counts are whole numbers; a half-way gridline between them stays unlabeled. -->
        {#if Number.isInteger(v)}
          <text x={m.left - 6} y={y + 4} text-anchor="end">{numberFormat.format(Math.abs(v))}</text>
        {/if}
      {/each}
      {#if hover != null}
        <rect
          x={m.left + hover * slot}
          y={m.top}
          width={slot}
          height={plotH}
          rx="4"
          fill="var(--fill-subtle)"
        />
      {/if}
      {#each data as d, i (i)}
        {@const x = m.left + i * slot + (slot - barW) / 2}
        <!-- 2px surface gap between the up and down segments at the baseline. -->
        {#if d.up}<path
            class="bar up"
            d={barPath(x, y0 - 1, barW, Math.max(1, d.up * k - 1), true)}
            fill={upColor}
            class:dim={hover != null && hover !== i}
          />{/if}
        {#if d.down}<path
            class="bar down"
            d={barPath(x, y0 + 1, barW, Math.max(1, d.down * k - 1), false)}
            fill={downColor}
            class:dim={hover != null && hover !== i}
          />{/if}
      {/each}
      {#each xTicks(data.length, plotW) as i (i)}
        <text x={m.left + i * slot + slot / 2} y={height - 6} text-anchor="middle"
          >{data[i]?.label}</text
        >
      {/each}
      <rect
        class="hit"
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
    font-size: var(--fs-2xs);
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
  /* Bars grow out of the baseline once, when the data arrives. */
  .bar {
    transform-box: fill-box;
    animation: grow var(--motion-slow) var(--ease-out) both;
  }
  .up {
    transform-origin: center bottom;
  }
  .down {
    transform-origin: center top;
  }
  @keyframes grow {
    from {
      transform: scaleY(0);
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
  }
</style>
