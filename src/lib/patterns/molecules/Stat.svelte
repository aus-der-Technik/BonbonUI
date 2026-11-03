<script lang="ts">
  /**
   * Stat molecule — a headline figure on the ground layer: a label, a big tabular value, an
   * optional change against a named period (arrow, sign and a tone that knows whether up is
   * good) and an optional sparkline whose latest point is marked in the accent. No card around
   * it — put several in a Grid, or inside a panel.
   *
   * When `value` changes the figure glows briefly, so an update is noticed. KpiTile takes the
   * same delta props, so the two are interchangeable (Stat on the ground, KpiTile on a card).
   *
   *   <Stat label="Open tasks" value={128} delta={-12} deltaLabel="vs last week" goodWhen="down" />
   */
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';
  import { changeCue } from '../atoms/changed';
  import DeltaPill from './DeltaPill.svelte';
  import { deltaDirection, deltaTone, formatDelta, type GoodWhen } from './delta';

  interface Props {
    label: string;
    value: string | number;
    /** Small text after the value, e.g. "%", "h", "€". */
    unit?: string | undefined;
    /** Relative change in percent; its sign picks the arrow. */
    delta?: number | undefined;
    /** Overrides the printed change, e.g. "+3 new". */
    deltaText?: string | undefined;
    /** The period it is compared against, e.g. "vs last week". */
    deltaLabel?: string | undefined;
    /** Which direction is good news (colours the change). */
    goodWhen?: GoodWhen;
    /** Recent values, oldest first, for the sparkline. */
    trend?: number[] | undefined;
    icon?: IconName | undefined;
    size?: 'sm' | 'md' | 'lg';
    align?: 'start' | 'center';
    locale?: string;
    /** Accessible description of the sparkline. */
    trendLabel?: string;
  }

  let {
    label,
    value,
    unit,
    delta,
    deltaText,
    deltaLabel,
    goodWhen = 'up',
    trend,
    icon,
    size = 'md',
    align = 'start',
    locale = 'en',
    trendLabel = 'Trend',
  }: Props = $props();

  const W = 120;
  const H = 36;

  const shown = $derived(
    typeof value === 'number' ? new Intl.NumberFormat(locale).format(value) : value,
  );
  const direction = $derived(deltaDirection(delta));
  const tone = $derived(deltaTone(direction, goodWhen));
  const change = $derived(deltaText ?? (delta == null ? undefined : formatDelta(delta, locale)));

  const points = $derived.by(() => {
    if (!trend || trend.length < 2) return [];
    const lo = Math.min(...trend);
    const hi = Math.max(...trend);
    const span = hi - lo || 1;
    return trend.map((v, i) => ({
      x: (i / (trend.length - 1)) * W,
      // 3px inset keeps the 2px line and the end dot inside the box
      y: 3 + (1 - (v - lo) / span) * (H - 6),
    }));
  });
  const line = $derived(points.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' '));
  const area = $derived(points.length ? `${line} L${W},${H} L0,${H} Z` : '');
  const last = $derived(points[points.length - 1]);
</script>

<div class="stat stat--{size} stat--{align}">
  <span class="label">
    {#if icon}<Icon name={icon} size={14} />{/if}
    {label}
  </span>
  <span class="value" use:changeCue={shown}>
    {shown}{#if unit}<span class="unit">{unit}</span>{/if}
  </span>
  {#if change || deltaLabel}
    <span class="delta">
      {#if change}<DeltaPill text={change} {direction} {tone} />{/if}
      {#if deltaLabel}<span class="period">{deltaLabel}</span>{/if}
    </span>
  {/if}
  {#if last}
    <span class="spark-box">
      <svg
        class="spark"
        viewBox="0 0 {W} {H}"
        preserveAspectRatio="none"
        role="img"
        aria-label="{trendLabel}: {trend?.join(', ')}"
      >
        <path class="area" d={area} />
        <path class="line" d={line} vector-effect="non-scaling-stroke" />
      </svg>
      <span
        class="end"
        style:left="{(last.x / W) * 100}%"
        style:top="{(last.y / H) * 100}%"
        aria-hidden="true"
      ></span>
    </span>
  {/if}
</div>

<style>
  .stat {
    position: relative;
    display: grid;
    gap: var(--space-1);
    min-width: 0;
    align-content: start;
  }
  .stat--center {
    justify-items: center;
    text-align: center;
  }
  .label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
  }
  .label :global(.icon) {
    color: var(--accent-ink);
  }
  .value {
    font-size: var(--fs-kpi);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.05;
    color: var(--text);
    font-variant-numeric: tabular-nums;
    /* Room for the changed-value glow (bb-changed) without shifting the figure. */
    margin-inline: calc(var(--space-1) * -1);
    padding-inline: var(--space-1);
    border-radius: var(--radius-sm);
    width: fit-content;
  }
  .stat--sm .value {
    font-size: var(--fs-2xl);
  }
  .stat--lg .value {
    font-size: var(--fs-display);
  }
  .unit {
    margin-left: 0.15em;
    font-size: 0.5em;
    font-weight: var(--fw-semibold);
    color: var(--text-3);
    letter-spacing: 0;
  }
  .delta {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-xs);
  }
  .period {
    color: var(--text-3);
  }
  .spark-box {
    position: relative;
    display: block;
    width: 100%;
    max-width: 12rem;
    height: 2.25rem;
    margin-top: var(--space-1);
  }
  .stat--center .spark-box {
    justify-self: center;
  }
  .spark {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .line {
    fill: none;
    stroke: var(--text-3);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .area {
    fill: var(--accent-faint);
  }
  /* The end dot is HTML so it stays round when the sparkline stretches. */
  .end {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 2px var(--bg);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
</style>
