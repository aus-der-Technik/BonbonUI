<script lang="ts">
  /**
   * Storybook-only: a tiny line plot of values sampled frame by frame (an edge of the liquid
   * drop, the press of a squeeze), so a spring's overshoot and ring can be seen, not only felt.
   * Dashed hairlines mark the values the springs are heading for.
   */
  interface Series {
    label: string;
    values: readonly number[];
    tone: 'accent' | 'muted';
  }

  interface Props {
    series: Series[];
    /** Values to mark with a dashed hairline (the targets). */
    marks?: readonly number[];
    min: number;
    max: number;
    /** Accessible description of what is plotted. */
    label: string;
    /** Shown while there is nothing to plot yet. */
    empty?: string;
    height?: number;
  }

  let { series, marks = [], min, max, label, empty, height = 96 }: Props = $props();
  const blank = $derived(series.every((s) => s.values.length < 2));

  const W = 320;
  const longest = $derived(Math.max(2, ...series.map((s) => s.values.length)));
  const span = $derived(max - min || 1);
  const y = (v: number) => height - 6 - ((v - min) / span) * (height - 12);
  const points = (values: readonly number[]) =>
    values.map((v, i) => `${((i / (longest - 1)) * W).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
</script>

<figure class="trace">
  {#if blank && empty}<p class="empty">{empty}</p>{/if}
  <svg viewBox="0 0 {W} {height}" preserveAspectRatio="none" role="img" aria-label={label}>
    {#each marks as m (m)}
      <line class="mark" x1="0" x2={W} y1={y(m)} y2={y(m)} />
    {/each}
    {#each series as s (s.label)}
      {#if s.values.length > 1}
        <polyline class="line line--{s.tone}" points={points(s.values)} />
      {/if}
    {/each}
  </svg>
  <figcaption>
    {#each series as s (s.label)}
      <span class="key key--{s.tone}">{s.label}</span>
    {/each}
    <span class="key key--mark">target</span>
  </figcaption>
</figure>

<style>
  .trace {
    position: relative;
    display: grid;
    gap: var(--space-2);
    margin: 0;
  }
  .trace .empty {
    position: absolute;
    inset: 0 0 auto;
    padding-top: var(--space-8);
    color: var(--text-3);
    font-size: var(--fs-sm);
    text-align: center;
  }
  /* A fixed height: the plot stretches across, it does not grow tall on a narrow page. */
  svg {
    width: 100%;
    height: 6rem;
    overflow: visible;
    border-bottom: 1px solid var(--border-strong);
  }
  .mark {
    stroke: var(--text-3);
    stroke-width: 1;
    stroke-dasharray: 3 4;
    vector-effect: non-scaling-stroke;
  }
  .line {
    fill: none;
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }
  .line--accent {
    stroke: var(--accent);
  }
  .line--muted {
    stroke: var(--text-2);
  }
  figcaption {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .key {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }
  .key::before {
    content: '';
    width: 1rem;
    height: 2px;
    border-radius: 1px;
    background: currentColor;
  }
  .key--accent::before {
    background: var(--accent);
  }
  .key--muted::before {
    background: var(--text-2);
  }
  .key--mark::before {
    height: 0;
    border-top: 1px dashed var(--text-3);
    background: none;
  }
</style>
