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
   * The svg is hidden from assistive tech; a visually hidden table (caption = `label`) carries
   * the values.
   *
   *   <HorizontalBarChart data={[{ label: '5★', value: 120 }, { label: '4★', value: 64 }]} />
   */
  import ChartTooltip, { type TooltipState } from '../molecules/ChartTooltip.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import type { IconName } from '../atoms/icons';
  import ChartDataTable from './ChartDataTable.svelte';
  import { hBarPath, labelSpace } from '../../utils/chart';
  import { numberFormat, percentFormat } from '../../utils/format';

  interface Props {
    data: BarRow[];
    height?: number;
    countLabel?: string;
    shareLabel?: string;
    /** Bar colour of rows without their own. */
    color?: string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    /** Caption of the hidden data table; defaults to `countLabel`. */
    label?: string | undefined;
    /** Heading of the label column in the hidden data table. */
    categoryLabel?: string;
    /** Room for the row labels in px; by default as much as the longest label needs. */
    labelWidth?: number | undefined;
    /** Formats the counts at the bar ends, in the tooltip and in the data table. */
    valueFormat?: (value: number) => string;
  }

  let {
    data,
    height = 220,
    countLabel = 'Count',
    shareLabel = 'Share',
    color = 'var(--up)',
    emptyTitle,
    emptyMessage,
    emptyIcon,
    emptyText,
    label,
    categoryLabel = 'Category',
    labelWidth,
    valueFormat = (v) => numberFormat.format(v),
  }: Props = $props();

  let width = $state(0);
  let tooltip = $state<TooltipState | null>(null);
  let hover = $state<string | null>(null);

  const m = $derived({
    top: 4,
    right: labelSpace(
      data.map((d) => valueFormat(d.value)),
      32,
      12,
    ),
    bottom: 4,
    left:
      labelWidth ??
      labelSpace(
        data.map((d) => d.label),
        30,
        10,
      ),
  });
  const total = $derived(data.reduce((sum, d) => sum + d.value, 0));
  const maxValue = $derived(Math.max(...data.map((d) => d.value), 0));
  const plotW = $derived(Math.max(0, width - m.left - m.right));
  const rowH = $derived(data.length ? (height - m.top - m.bottom) / data.length : 0);
  const barH = $derived(Math.max(4, Math.min(22, rowH - 8)));

  const shareOf = (d: BarRow) => percentFormat.format(total ? d.value / total : 0);
  const tableRows = $derived(
    data.map((d): [string, string[]] => [d.title ?? d.label, [valueFormat(d.value), shareOf(d)]]),
  );

  function show(event: PointerEvent, d: BarRow) {
    hover = d.label;
    tooltip = {
      x: event.clientX,
      y: event.clientY,
      title: d.title ?? d.label,
      rows: [
        { label: countLabel, value: valueFormat(d.value), color: d.color ?? color },
        { label: shareLabel, value: shareOf(d) },
      ],
    };
  }
</script>

<div class="chart" style:height="{height}px" bind:clientWidth={width}>
  {#if total <= 0}
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
      caption={label ?? countLabel}
      columns={[categoryLabel, countLabel, shareLabel]}
      rows={tableRows}
    />
  {/if}
  {#if total > 0 && width > 0}
    <svg viewBox="0 0 {width} {height}" aria-hidden="true">
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
        <text x={m.left + w + 6} y={y + barH / 2 + 4}>{valueFormat(d.value)}</text>
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
  }
</style>
