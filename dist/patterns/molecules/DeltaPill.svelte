<script lang="ts">
  /**
   * DeltaPill — the small "▲ +12 %" pill of Stat and KpiTile: an arrow for the direction, green
   * when the change is good news, red when it is bad, neutral otherwise. Internal building block.
   */
  import Icon from '../atoms/Icon.svelte';
  import type { DeltaDirection, DeltaTone } from './delta';

  interface Props {
    text: string;
    direction: DeltaDirection;
    tone: DeltaTone;
    /** Shows a dash for an unchanged figure; KpiTile leaves the pill bare instead. */
    flatIcon?: boolean;
  }

  let { text, direction, tone, flatIcon = true }: Props = $props();
</script>

<span class="delta delta--{tone}" data-trend={direction}>
  {#if direction !== 'flat' || flatIcon}<Icon
      name={direction === 'up' ? 'arrow-up' : direction === 'down' ? 'arrow-down' : 'minus'}
      size={12}
    />{/if}{text}
</span>

<style>
  .delta {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.1rem 0.45rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    background: var(--fill-muted);
    color: var(--text-2);
  }
  /* Status hues as text, mixed towards the theme's ink so they stay readable on the tint. */
  .delta--good {
    background: var(--tint-ok);
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
  }
  .delta--bad {
    background: var(--tint-danger);
    color: color-mix(in oklab, var(--danger) var(--ink-share), var(--ink-mix));
  }
</style>
