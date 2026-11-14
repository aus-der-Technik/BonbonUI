<script lang="ts">
  /**
   * ProgressBar atom — a determinate candy bar (uploads, quotas, imports). `tone` colours the
   * fill (`accent` follows the tint; `brand` is its old name), `showValue` prints the
   * percentage next to the label, `size` sets the thickness. The printed value glows briefly
   * when it changes. `hideLabel` keeps the label for assistive tech only (the head then shows
   * just the value). Built from spans, so it may sit inside a button or a link.
   *
   *   <ProgressBar value={64} label="Storage used" showValue />
   */
  import { percentFormat } from '../../utils/format';
  import { changeCue } from './changed';
  import { toneOf, type Tone } from '../tone';

  interface Props {
    value: number;
    max?: number;
    label: string;
    showValue?: boolean;
    tone?: Tone | /** @deprecated Use `accent`. */ 'brand';
    size?: 'sm' | 'md' | 'lg';
    /** Replaces the percentage, e.g. "3 of 7" or "1.2 GB of 5 GB". */
    valueLabel?: string | undefined;
    /** The label is only the bar's accessible name, not printed. */
    hideLabel?: boolean;
  }

  let {
    value,
    max = 100,
    label,
    showValue = false,
    tone = 'accent',
    size = 'md',
    valueLabel,
    hideLabel = false,
  }: Props = $props();

  const ratio = $derived(max > 0 ? Math.max(0, Math.min(1, value / max)) : 0);
  const shown = $derived(valueLabel ?? percentFormat.format(ratio));
</script>

<span class="progress progress--{size}">
  {#if showValue}
    <span class="head" class:head--value-only={hideLabel}>
      {#if !hideLabel}<span>{label}</span>{/if}<span class="value" use:changeCue={shown}
        >{shown}</span
      >
    </span>
  {/if}
  <span
    class="track"
    role="progressbar"
    aria-label={label}
    aria-valuemin="0"
    aria-valuemax={max}
    aria-valuenow={value}
    aria-valuetext={valueLabel}
  >
    <span
      class="fill fill--{toneOf(tone)}"
      class:fill--empty={ratio === 0}
      style:width="{ratio * 100}%"
    ></span>
  </span>
</span>

<style>
  /* Spans laid out as blocks: valid inside a button, same box as before. */
  .progress,
  .head,
  .track {
    display: block;
  }
  .head--value-only {
    justify-content: flex-end;
  }
  .progress {
    --_h: 8px;
    display: grid;
    gap: var(--space-2);
  }
  .progress--sm {
    --_h: 4px;
  }
  .progress--lg {
    --_h: 12px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
  }
  .value {
    border-radius: var(--radius-xs);
    font-variant-numeric: tabular-nums;
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .track {
    height: var(--_h);
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    box-shadow: inset 0 1px 2px rgba(12, 12, 22, 0.08);
    overflow: hidden;
  }
  .fill {
    --_c: var(--accent);
    display: block;
    height: 100%;
    min-width: var(--_h);
    border-radius: var(--radius-pill);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 70%),
      linear-gradient(90deg, color-mix(in oklab, var(--_c) 78%, black), var(--_c));
    box-shadow: 0 0 10px color-mix(in srgb, var(--_c) 45%, transparent);
    /* The bar can be wide, so it eases into place rather than springing past it. */
    transition: width var(--motion-slow) var(--ease-out);
  }
  .fill--empty {
    min-width: 0;
  }
  .fill--ok {
    --_c: var(--ok);
  }
  .fill--warn {
    --_c: var(--warn);
  }
  .fill--danger {
    --_c: var(--danger);
  }
  .fill--info {
    --_c: var(--info);
  }
  .fill--neutral {
    --_c: var(--text-3);
  }
  @media (prefers-reduced-motion: reduce) {
    .fill {
      transition: none;
    }
  }
</style>
