<script lang="ts">
  /**
   * Stars atom — a read-only star rating (★★★☆☆) with a spoken "3.5 of 5 stars". The stars round
   * to whole ones; `showValue` adds the exact figure ("4.5/5") for averages, in `locale`.
   */

  interface Props {
    value: number;
    max?: number;
    /** Overrides the accessible name; `''` hides the stars when a label is next to them. */
    label?: string | undefined;
    showValue?: boolean;
    /** Locale of the figure (default English, like the rest of the UI). */
    locale?: string;
  }

  let { value, max = 5, label, showValue = false, locale = 'en' }: Props = $props();

  const clamped = $derived(Math.max(0, Math.min(max, value || 0)));
  const on = $derived(Math.round(clamped));
  const figure = $derived(
    Number.isInteger(clamped)
      ? String(clamped)
      : new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(clamped),
  );
  const name = $derived(label ?? `${figure} of ${max} stars`);
</script>

<span
  class="stars"
  role={name ? 'img' : undefined}
  aria-label={name || undefined}
  aria-hidden={name ? undefined : 'true'}
  >{'★'.repeat(on)}<span class="off">{'★'.repeat(max - on)}</span>{#if showValue}<span class="value"
      >{figure}/{max}</span
    >{/if}</span
>

<style>
  .stars {
    color: var(--star-on);
    letter-spacing: 1px;
    white-space: nowrap;
  }
  .off {
    color: var(--fill-off);
  }
  .value {
    margin-left: 0.35rem;
    letter-spacing: 0;
    font-size: 0.85em;
    font-weight: var(--fw-semibold);
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
  }
</style>
