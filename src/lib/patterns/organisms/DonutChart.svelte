<script lang="ts" module>
  export interface DonutSlice {
    label: string;
    /** Tooltip heading; defaults to `label`. */
    title?: string;
    /** Zero, negative and non-finite values are left out. */
    value: number;
    /** Any CSS colour or token; default: the next colour of the candy palette. */
    color?: string;
  }

  /** The candy palette in an order that keeps neighbouring slices apart. */
  export const donutColors = [
    'var(--color-blue)',
    'var(--color-orange)',
    'var(--color-green)',
    'var(--color-purple)',
    'var(--color-pink)',
    'var(--color-teal)',
    'var(--color-yellow)',
    'var(--color-indigo)',
    'var(--color-red)',
  ] as const;
</script>

<script lang="ts">
  /**
   * DonutChart organism — shares of a whole (e.g. "Storage by file type"). Each slice takes its
   * own `color` or the next candy colour; the total (or `centerValue` / `centerLabel`) sits in
   * the hole, a Legend beside it, below it where the container is narrow. Hovering a slice
   * lifts it out of the ring, dims the others and shows its value and share. Zero and negative
   * values have no share of a whole and are left out. The svg is hidden from assistive tech; a
   * visually hidden table (caption = `label`) carries the values.
   *
   *   <DonutChart data={[{ label: 'Pictures', value: 12.4 }, { label: 'Documents', value: 3.1 }]} />
   */
  import ChartTooltip, { type TooltipState } from '../molecules/ChartTooltip.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import Legend from '../molecules/Legend.svelte';
  import type { IconName } from '../atoms/icons';
  import ChartDataTable from './ChartDataTable.svelte';
  import { arcPath } from '../../utils/chart';
  import { numberFormat, percentFormat } from '../../utils/format';

  interface Props {
    data: DonutSlice[];
    /** Largest diameter of the ring in px; it shrinks with a narrower container. */
    size?: number;
    /** Width of the ring as a share of its radius (0.1–0.9). */
    thickness?: number;
    /** Big figure in the hole; default: the formatted total. */
    centerValue?: string | undefined;
    /** Small line under it. */
    centerLabel?: string;
    /** Shows the legend beside (or below) the ring. */
    legend?: boolean;
    /** Name of the values, in the tooltip and the data table. */
    valueLabel?: string;
    shareLabel?: string;
    /** Formats the values in the hole, the tooltip and the data table. */
    valueFormat?: (value: number) => string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** Caption of the hidden data table; defaults to `centerLabel` and the total. */
    label?: string | undefined;
    /** Heading of the label column in the hidden data table. */
    categoryLabel?: string;
  }

  let {
    data,
    size = 200,
    thickness = 0.3,
    centerValue,
    centerLabel = 'Total',
    legend = true,
    valueLabel = 'Value',
    shareLabel = 'Share',
    valueFormat = (v) => numberFormat.format(v),
    emptyTitle,
    emptyMessage,
    emptyIcon,
    label,
    categoryLabel = 'Category',
  }: Props = $props();

  let hover = $state<number | null>(null);
  let tooltip = $state<TooltipState | null>(null);

  // The ring is drawn in a 100 × 100 box with room for a lifted slice.
  const C = 50;
  const R = 46;
  const LIFT = 3;
  // A thin gap between slices, as wide inside as outside.
  const GAP = 1.6;

  const slices = $derived(
    data.flatMap((d, i) =>
      Number.isFinite(d.value) && d.value > 0
        ? [{ d, color: d.color ?? donutColors[i % donutColors.length]! }]
        : [],
    ),
  );
  const total = $derived(slices.reduce((sum, s) => sum + s.d.value, 0));
  const inner = $derived(R * (1 - Math.min(0.9, Math.max(0.1, thickness))));
  const arcs = $derived.by(() => {
    let at = 0;
    const gap = slices.length > 1 ? GAP : 0;
    return slices.map((s) => {
      const start = at;
      at += (s.d.value / total) * Math.PI * 2;
      const mid = (start + at) / 2;
      return {
        ...s,
        path: arcPath(C, C, R, inner, start, at, gap),
        dx: Math.round(Math.sin(mid) * LIFT * 100) / 100,
        dy: Math.round(-Math.cos(mid) * LIFT * 100) / 100,
      };
    });
  });

  const shareOf = (v: number) => percentFormat.format(total ? v / total : 0);
  const legendItems = $derived(slices.map((s) => ({ label: s.d.label, color: s.color })));
  const tableRows = $derived(
    slices.map((s): [string, string[]] => [
      s.d.title ?? s.d.label,
      [valueFormat(s.d.value), shareOf(s.d.value)],
    ]),
  );

  function show(event: PointerEvent, i: number) {
    const s = arcs[i];
    if (!s) return;
    hover = i;
    tooltip = {
      x: event.clientX,
      y: event.clientY,
      title: s.d.title ?? s.d.label,
      rows: [
        { label: valueLabel, value: valueFormat(s.d.value), color: s.color },
        { label: shareLabel, value: shareOf(s.d.value) },
      ],
    };
  }

  function leave() {
    hover = null;
    tooltip = null;
  }
</script>

<div class="donut">
  {#if !slices.length}
    <div class="empty" style:min-height="{size}px">
      <EmptyState
        title={emptyTitle}
        message={emptyMessage ?? 'No data in this range'}
        icon={emptyIcon}
        compact={!emptyTitle}
      />
    </div>
  {:else}
    <ChartDataTable
      caption={label ?? `${centerLabel} ${valueFormat(total)}`}
      columns={[categoryLabel, valueLabel, shareLabel]}
      rows={tableRows}
    />
    <div class="ring" style:width="{size}px">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <g class="slices">
          {#each arcs as s, i (i)}
            <path
              class="slice"
              class:dim={hover != null && hover !== i}
              d={s.path}
              fill={s.color}
              style:transform={hover === i ? `translate(${s.dx}px, ${s.dy}px)` : undefined}
              role="presentation"
              onpointermove={(event) => show(event, i)}
              onpointerleave={leave}
            />
          {/each}
        </g>
      </svg>
      <div class="center" aria-hidden="true">
        <span class="value">{centerValue ?? valueFormat(total)}</span>
        {#if centerLabel}<span class="caption">{centerLabel}</span>{/if}
      </div>
    </div>
    {#if legend}
      <div class="legend"><Legend items={legendItems} shape="dot" /></div>
    {/if}
  {/if}
</div>
<ChartTooltip {tooltip} />

<style>
  .donut {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--space-4) var(--space-6);
    width: 100%;
  }
  .ring {
    position: relative;
    flex: 0 1 auto;
    max-width: 100%;
    aspect-ratio: 1;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .slices {
    transform-origin: 50px 50px;
    animation: bb-pop var(--motion-slow) var(--ease-out) both;
  }
  .slice {
    cursor: default;
    transition:
      transform var(--motion-base) var(--ease-spring),
      opacity var(--motion-quick) var(--ease-out);
  }
  .dim {
    opacity: 0.45;
  }
  .center {
    position: absolute;
    inset: 22%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    pointer-events: none;
    min-width: 0;
  }
  .value {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    font-variant-numeric: tabular-nums;
    color: var(--text);
  }
  .caption {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--fs-2xs);
    color: var(--text-3);
  }
  /* As wide as its labels, so it sits centred under the ring when the row wraps. */
  .legend {
    flex: 0 1 auto;
    min-width: 0;
  }
  .legend :global(.legend) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  @media (prefers-reduced-motion: reduce) {
    .slices {
      animation: none;
    }
    .slice {
      transition: none;
    }
  }
  .empty {
    flex: 1;
    display: grid;
    place-items: center;
  }
</style>
