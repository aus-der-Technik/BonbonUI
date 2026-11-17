<script lang="ts" module>
  export interface MeterSegment {
    value: number;
    color: string;
  }
</script>

<script lang="ts">
  /**
   * KpiTile molecule — a summary number, on the ground by default (a hairline on its leading
   * edge sets a row of them apart; `level="panel"` puts it on a card): label (with an optional icon in a tinted
   * squircle), the big tabular value, a trend pill ("+12 %") and a detail line, and an optional
   * proportional meter (e.g. "Thumbs up share"). A rising `delta` is green, a falling one red;
   * `goodWhen="down"` (or `invert`) swaps that for figures where less is better (errors, wait
   * times). It takes Stat's props too — a numeric `delta` in percent, `deltaText`, `deltaLabel`,
   * `goodWhen`, `unit`, `locale` — so a Stat can move onto a card without rewriting it. A changed
   * value glows briefly.
   *
   * The value is `value`, or the children when there is nothing else to say about it.
   *
   *   <KpiTile label="Open">24</KpiTile>
   *   <KpiTile label="Orders" value="1,284" delta="+12 %" detail="vs. last week" icon="cart" />
   *   <KpiTile label="Errors" value={12} delta={-8} deltaLabel="vs last week" goodWhen="down" />
   */
  import type { Snippet } from 'svelte';
  import Card from '../atoms/Card.svelte';
  import type { IconName } from '../atoms/icons';
  import Icon from '../atoms/Icon.svelte';
  import { changeCue, textCue } from '../atoms/changed';
  import DeltaPill from './DeltaPill.svelte';
  import { deltaDirection, deltaTone, formatDelta, type GoodWhen } from './delta';

  interface Props {
    /** `ground` (default) sits on the backdrop beside a hairline; `panel` is a card. */
    level?: 'ground' | 'panel';
    label: string;
    /** `null` renders the "–" placeholder (not loaded / no data). Leave it out to pass the
     *  value as children. */
    value?: string | number | null;
    /** The line under the value; a snippet for anything richer than text. */
    detail?: string | Snippet | undefined;
    meter?: MeterSegment[] | undefined;
    icon?: IconName | undefined;
    /** Change against a previous period: printed as given ("+12 %", "−3"), or a number read
     *  as a relative change in percent (like Stat). */
    delta?: string | number | undefined;
    /** Overrides the printed change of a numeric `delta`, e.g. "+3 new". */
    deltaText?: string | undefined;
    /** The period it is compared against, e.g. "vs last week"; shown when there is no `detail`. */
    deltaLabel?: string | undefined;
    /** Direction of `delta`; read from its sign when left out. */
    trend?: 'up' | 'down' | 'flat' | undefined;
    /** Which direction is good news (colours the change). Default `up`, or `down` with `invert`. */
    goodWhen?: GoodWhen | undefined;
    /** Falling is good (errors, latency): down turns green, up red. Same as `goodWhen="down"`. */
    invert?: boolean;
    /** Small text after a value, e.g. "%", "h". */
    unit?: string | undefined;
    /** Formats a numeric `value` and `delta`. */
    locale?: string;
    /** The value, written as content: `<KpiTile label="Open">24</KpiTile>`. */
    children?: Snippet | undefined;
  }

  let {
    level = 'ground',
    label,
    value,
    detail,
    meter,
    icon,
    delta,
    deltaText,
    deltaLabel,
    trend,
    goodWhen,
    invert = false,
    unit,
    locale = 'en',
    children,
  }: Props = $props();

  const total = $derived(meter?.reduce((sum, segment) => sum + segment.value, 0) ?? 0);
  const direction = $derived(trend ?? deltaDirection(delta));
  const tone = $derived(deltaTone(direction, goodWhen ?? (invert ? 'down' : 'up')));
  const change = $derived(
    typeof delta === 'number' ? (deltaText ?? formatDelta(delta, locale)) : delta || undefined,
  );
  const shown = $derived(
    value == null
      ? '–'
      : typeof value === 'number'
        ? new Intl.NumberFormat(locale).format(value)
        : value,
  );
  const note = $derived(typeof detail === 'string' ? detail : deltaLabel);
  const detailSnippet = $derived(typeof detail === 'function' ? detail : undefined);
  // Children are the value only when no `value` is given (`null` still means "no data").
  const content = $derived(value === undefined ? children : undefined);
</script>

<Card class="kpi kpi--{level}" surface={level === 'ground' ? 'ground' : 'glass'}>
  <div class="top">
    <div class="label">{label}</div>
    {#if icon}<span class="icon-tile" aria-hidden="true"><Icon name={icon} size={16} /></span>{/if}
  </div>
  {#if content}
    <div class="value" use:textCue>
      {@render content()}{#if unit}<span class="unit">{unit}</span>{/if}
    </div>
  {:else}
    <div class="value" use:changeCue={shown}>
      {shown}{#if unit && value != null}<span class="unit">{unit}</span>{/if}
    </div>
  {/if}
  <div class="detail">
    {#if change}<DeltaPill text={change} {direction} {tone} flatIcon={false} />{/if}
    {#if detailSnippet}{@render detailSnippet()}{:else if note}<span>{note}</span
      >{:else if !change}&nbsp;{/if}
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
  /* Three classes: Card's scoped `.card--pad-none` (two) would otherwise reset the padding and
     put the figures right against the hairline. */
  :global(.card.kpi.kpi--ground) {
    padding-left: var(--space-4);
    border-left: 1px solid var(--border-strong) !important;
    border-radius: 0 !important;
  }
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
    /* Room for the changed-value glow (bb-changed) without shifting the figure. */
    width: fit-content;
    margin-inline: calc(var(--space-1) * -1);
    padding-inline: var(--space-1);
    border-radius: var(--radius-sm);
  }
  .unit {
    margin-left: 0.15em;
    font-size: 0.5em;
    font-weight: var(--fw-semibold);
    color: var(--text-3);
    letter-spacing: 0;
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
