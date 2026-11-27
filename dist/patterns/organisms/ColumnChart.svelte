<script lang="ts">
  /**
   * ColumnChart organism — one vertical bar per category, the sibling of HorizontalBarChart
   * (e.g. "Words per chapter", "Profit per month"). Bars take `color` (any token, default
   * `--up`), a row's own `color` wins; negative values hang below a zero baseline (in
   * `negativeColor` when given). Gridlines land on readable values; x labels shorten with an
   * ellipsis and then thin out when the columns get narrow. Laid out at the container's real
   * pixel width so text stays unscaled; hovering a column dims the others and shows its value
   * (and its share while all values are positive). The svg is hidden from assistive tech; a
   * visually hidden table (caption = `label`) carries the values.
   *
   *   <ColumnChart data={[{ label: 'Jan', value: 120 }, { label: 'Feb', value: -40 }]} />
   */
  import ChartTooltip, { type TooltipState } from '../molecules/ChartTooltip.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import type { IconName } from '../atoms/icons';
  import ChartDataTable from './ChartDataTable.svelte';
  import type { BarRow } from './HorizontalBarChart.svelte';
  import { barPath, ellipsize, labelSpace, niceTicks, xTicks } from '../../utils/chart';
  import { numberFormat, percentFormat } from '../../utils/format';

  interface Props {
    data: BarRow[];
    height?: number;
    /** Name of the values, in the tooltip and the data table. */
    valueLabel?: string;
    /** Shown in the tooltip and the data table while no value is negative. */
    shareLabel?: string;
    /** Bar colour of rows without their own. */
    color?: string;
    /** Colour of negative bars without their own; default: `color`. */
    negativeColor?: string | undefined;
    /** Formats the values in the tooltip and the data table. */
    valueFormat?: (value: number) => string;
    /** Formats the gridline labels; default: `valueFormat`. */
    tickFormat?: ((value: number) => string) | undefined;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** Caption of the hidden data table; defaults to `valueLabel`. */
    label?: string | undefined;
    /** Heading of the label column in the hidden data table. */
    categoryLabel?: string;
  }

  let {
    data,
    height = 220,
    valueLabel = 'Value',
    shareLabel = 'Share',
    color = 'var(--up)',
    negativeColor,
    valueFormat = (v) => numberFormat.format(v),
    tickFormat,
    emptyTitle,
    emptyMessage,
    emptyIcon,
    label,
    categoryLabel = 'Category',
  }: Props = $props();

  let width = $state(0);
  let hover = $state<number | null>(null);
  let tooltip = $state<TooltipState | null>(null);

  // A value that is not a number is drawn (and listed) as zero.
  const rows = $derived(data.map((d) => ({ d, v: Number.isFinite(d.value) ? d.value : 0 })));
  const hasData = $derived(rows.some((r) => r.v !== 0));
  const ticks = $derived(
    niceTicks(Math.min(0, ...rows.map((r) => r.v)), Math.max(0, ...rows.map((r) => r.v))),
  );
  // niceTicks always returns at least two values.
  const lo = $derived(ticks[0]!);
  const hi = $derived(ticks.at(-1)!);
  const formatTick = $derived(tickFormat ?? valueFormat);
  const m = $derived({
    top: 10,
    right: 8,
    bottom: 22,
    left: labelSpace(
      ticks.map((v) => formatTick(v)),
      24,
      8,
    ),
  });
  const plotW = $derived(Math.max(0, width - m.left - m.right));
  const plotH = $derived(Math.max(0, height - m.top - m.bottom));
  const yAt = (v: number) => m.top + plotH - ((v - lo) / (hi - lo)) * plotH;
  const y0 = $derived(yAt(0));
  const slot = $derived(data.length ? plotW / data.length : 0);
  // Wide slots keep a gap of two fifths; narrow ones leave a pixel between the bars.
  const barW = $derived(Math.max(1, Math.min(48, slot * 0.6, slot - 1)));

  const fullSpace = $derived(
    labelSpace(
      data.map((d) => d.label),
      20,
      10,
    ),
  );
  // Every column keeps a label while a few characters fit under each; once some have to go,
  // the ones left get room for their whole text (up to a long one's worth).
  const shown = $derived(
    xTicks(data.length, plotW, Math.min(fullSpace, slot >= Math.min(fullSpace, 34) ? 34 : 90)),
  );
  const labelChars = $derived.by(() => {
    const step = shown.length > 1 ? shown[1]! - shown[0]! : data.length;
    return Math.max(2, Math.floor((slot * step - 8) / 6.5));
  });

  const positive = $derived(rows.every((r) => r.v >= 0));
  // Only shown while every value is positive, so the total is above zero.
  const total = $derived(rows.reduce((sum, r) => sum + r.v, 0));
  const shareOf = (v: number) => percentFormat.format(v / total);
  const fillOf = (d: BarRow, v: number) => d.color ?? (v < 0 ? (negativeColor ?? color) : color);

  const tableRows = $derived(
    rows.map(({ d, v }): [string, string[]] => [
      d.title ?? d.label,
      [valueFormat(v), ...(positive ? [shareOf(v)] : [])],
    ]),
  );

  function show(event: PointerEvent, { d, v }: { d: BarRow; v: number }, i: number) {
    hover = i;
    tooltip = {
      x: event.clientX,
      y: event.clientY,
      title: d.title ?? d.label,
      rows: [
        { label: valueLabel, value: valueFormat(v), color: fillOf(d, v) },
        ...(positive ? [{ label: shareLabel, value: shareOf(v) }] : []),
      ],
    };
  }

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
        message={emptyMessage ?? 'No data in this range'}
        icon={emptyIcon}
        compact={!emptyTitle}
      />
    </div>
  {:else}
    <ChartDataTable
      caption={label ?? valueLabel}
      columns={[categoryLabel, valueLabel, ...(positive ? [shareLabel] : [])]}
      rows={tableRows}
    />
  {/if}
  {#if hasData && width > 0}
    <svg viewBox="0 0 {width} {height}" aria-hidden="true">
      {#each ticks as v (v)}
        <line
          x1={m.left}
          x2={width - m.right}
          y1={yAt(v)}
          y2={yAt(v)}
          stroke={v === 0 ? 'var(--axis)' : 'var(--grid)'}
        />
        <text x={m.left - 6} y={yAt(v) + 4} text-anchor="end">{formatTick(v)}</text>
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
      {#each rows as row, i (i)}
        {@const v = row.v}
        {@const x = m.left + i * slot + (slot - barW) / 2}
        <!-- 1px surface gap between a bar and the baseline. -->
        {#if v !== 0}<path
            class="bar"
            class:up={v > 0}
            class:down={v < 0}
            class:dim={hover != null && hover !== i}
            d={barPath(
              x,
              v > 0 ? y0 - 1 : y0 + 1,
              barW,
              Math.max(1, Math.abs(yAt(v) - y0) - 1),
              v > 0,
            )}
            fill={fillOf(row.d, v)}
          />{/if}
        <rect
          x={m.left + i * slot}
          y="0"
          width={slot}
          {height}
          fill="transparent"
          role="presentation"
          onpointermove={(event) => show(event, row, i)}
          onpointerleave={leave}
        />
      {/each}
      {#each shown as i (i)}
        <text x={m.left + i * slot + slot / 2} y={height - 6} text-anchor="middle"
          >{ellipsize(data[i]!.label, labelChars)}</text
        >
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
    pointer-events: none;
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
