<script lang="ts" module>
  export interface MeterSegment {
    value: number;
    color: string;
  }
</script>

<script lang="ts">
  /**
   * KpiTile molecule — a summary number on a glass card: label (with an optional icon in a tinted
   * squircle), the big tabular value, a trend pill ("+12 %") and a detail line, and an optional
   * proportional meter (e.g. "Thumbs up share"). A rising `delta` is green, a falling one red;
   * `invert` swaps that for figures where less is better (errors, wait times).
   *
   *   <KpiTile label="Orders" value="1,284" delta="+12 %" detail="vs. last week" icon="cart" />
   */
  import type { Snippet } from 'svelte';
  import Card from '../atoms/Card.svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';

  interface Props {
    label: string;
    /** `null` renders the "–" placeholder (not loaded / no data). */
    value: string | number | null;
    detail?: string | undefined;
    meter?: MeterSegment[] | undefined;
    icon?: IconName | undefined;
    /** Change against a previous period, e.g. "+12 %" or "−3". */
    delta?: string | undefined;
    /** Direction of `delta`; read from its sign when left out. */
    trend?: 'up' | 'down' | 'flat' | undefined;
    /** Falling is good (errors, latency): down turns green, up red. */
    invert?: boolean;
    children?: Snippet | undefined;
  }

  let {
    label,
    value,
    detail,
    meter,
    icon,
    delta,
    trend,
    invert = false,
    children,
  }: Props = $props();

  const total = $derived(meter?.reduce((sum, segment) => sum + segment.value, 0) ?? 0);
  const direction = $derived(
    trend ??
      (delta == null
        ? 'flat'
        : /^\s*\+/.test(delta)
          ? 'up'
          : /^\s*[-−–]/.test(delta)
            ? 'down'
            : 'flat'),
  );
  const good = $derived(direction === 'flat' ? null : (direction === 'up') !== invert);
</script>

<Card class="kpi">
  <div class="top">
    <div class="label">{label}</div>
    {#if icon}<span class="icon-tile" aria-hidden="true"><Icon name={icon} size={16} /></span>{/if}
  </div>
  <div class="value">{value ?? '–'}</div>
  <div class="detail">
    {#if delta}<span
        class="delta"
        class:good={good === true}
        class:bad={good === false}
        data-trend={direction}
        >{#if direction !== 'flat'}<Icon
            name={direction === 'up' ? 'arrow-up' : 'arrow-down'}
            size={11}
          />{/if}{delta}</span
      >{/if}
    {#if children}{@render children()}{:else if detail}<span>{detail}</span
      >{:else if !delta}&nbsp;{/if}
  </div>
  {#if meter}
    <div class="meter" aria-hidden="true">
      {#if total > 0}
        {#each meter as segment, index (index)}
          <span style:flex={segment.value} style:background={segment.color}></span>
        {/each}
      {/if}
    </div>
  {/if}
</Card>

<style>
  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-2);
  }
  .label {
    font-size: var(--fs-sm);
    color: var(--text-2);
    font-weight: var(--fw-semibold);
  }
  .icon-tile {
    display: grid;
    place-items: center;
    width: var(--control-sm);
    height: var(--control-sm);
    margin: -0.2rem -0.2rem 0 0;
    border-radius: var(--radius-sm);
    background: var(--accent-soft);
    color: var(--accent-ink);
    box-shadow: inset 0 1px 0 var(--pill-light);
    flex-shrink: 0;
  }
  .value {
    font-size: var(--fs-kpi);
    font-weight: var(--fw-heavy);
    letter-spacing: -0.025em;
    line-height: 1.15;
    margin-top: var(--space-1);
    font-variant-numeric: tabular-nums;
  }
  .detail {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1) var(--space-2);
    margin-top: var(--space-1);
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .delta {
    display: inline-flex;
    align-items: center;
    gap: 0.15rem;
    padding: 0.05rem var(--space-2);
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .delta.good {
    background: var(--tint-ok);
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
  }
  .delta.bad {
    background: var(--tint-danger);
    color: color-mix(in oklab, var(--danger) var(--ink-share), var(--ink-mix));
  }
  .meter {
    display: flex;
    gap: 3px;
    height: 8px;
    margin-top: var(--space-3);
    border-radius: var(--radius-pill);
    overflow: hidden;
    background: var(--fill-subtle);
  }
  .meter span {
    display: block;
    height: 100%;
    border-radius: var(--radius-pill);
  }
</style>
