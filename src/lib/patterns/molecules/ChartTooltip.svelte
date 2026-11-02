<script lang="ts" module>
  export interface TooltipRow {
    label: string;
    value: string;
    color?: string | undefined;
  }

  export interface TooltipState {
    x: number;
    y: number;
    title: string;
    rows: TooltipRow[];
  }
</script>

<script lang="ts">
  /**
   * ChartTooltip molecule — the small card next to the pointer over a chart: a heading and
   * label/value rows on frosted glass. Positioned `fixed` at viewport coordinates and kept inside
   * the viewport; tabular figures so the values line up.
   *
   *   <ChartTooltip tooltip={{ x, y, title: 'Mon', rows: [{ label: 'Up', value: '14' }] }} />
   */
  import Swatch from '../atoms/Swatch.svelte';

  interface Props {
    tooltip: TooltipState | null;
  }

  let { tooltip }: Props = $props();

  let width = $state(0);
  let height = $state(0);

  const PAD = 14;
  const left = $derived.by(() => {
    if (!tooltip) return 0;
    const x = tooltip.x + PAD;
    return Math.max(8, x + width > window.innerWidth - 8 ? tooltip.x - width - PAD : x);
  });
  const top = $derived.by(() => {
    if (!tooltip) return 0;
    const y = tooltip.y + PAD;
    return Math.max(8, y + height > window.innerHeight - 8 ? tooltip.y - height - PAD : y);
  });
</script>

{#if tooltip}
  <div
    class="tooltip"
    style:left="{left}px"
    style:top="{top}px"
    bind:clientWidth={width}
    bind:clientHeight={height}
    aria-hidden="true"
  >
    <div class="head">{tooltip.title}</div>
    {#each tooltip.rows as row (row.label)}
      <div class="row">
        <span
          >{#if row.color}<Swatch color={row.color} shape="square" size={8} />{/if}{row.label}</span
        >
        <b>{row.value}</b>
      </div>
    {/each}
  </div>
{/if}

<style>
  .tooltip {
    position: fixed;
    z-index: var(--z-tooltip);
    pointer-events: none;
    min-width: 9rem;
    background: var(--tooltip-bg);
    backdrop-filter: var(--blur-glass);
    -webkit-backdrop-filter: var(--blur-glass);
    color: var(--text);
    border: 0.75px solid var(--pill-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-pop);
    padding: var(--space-2) var(--space-3);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
    animation: bb-drop var(--motion-quick) var(--ease-out);
  }
  @media (prefers-reduced-motion: reduce) {
    .tooltip {
      animation: none;
    }
  }
  .head {
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    margin-bottom: var(--space-1);
  }
  .row {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
    color: var(--text-2);
  }
  .row span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }
  b {
    color: var(--text);
    font-weight: var(--fw-semibold);
  }
</style>
