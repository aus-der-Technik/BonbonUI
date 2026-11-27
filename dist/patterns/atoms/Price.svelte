<script lang="ts">
  /**
   * Price atom — an amount of money, formatted with `Intl.NumberFormat` (English formats by
   * default, like every other figure in the library; pass `locale` for the shop's own).
   * `compareAt` shows the old price struck through next to it, and the current one turns into
   * the sale colour; `unit` adds a muted suffix such as "/ month". Tabular figures, so prices in
   * a column line up. A changed amount glows briefly (a cart total updating).
   *
   *   <Price amount={49} />                         €49.00
   *   <Price amount={39} compareAt={49} size="lg" />
   *   <Price amount={12} currency="EUR" locale="de-DE" unit="/ Monat" />
   */
  import VisuallyHidden from './VisuallyHidden.svelte';
  import { changeCue } from './changed';

  interface Props {
    amount: number;
    /** ISO 4217 code. */
    currency?: string;
    locale?: string;
    /** The regular price; shown struck through when it is higher than `amount`. */
    compareAt?: number | undefined;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Muted suffix, e.g. "/ month" or "per seat". */
    unit?: string | undefined;
    /** Fraction digits; default the currency's own (2 for EUR). */
    fractionDigits?: number | undefined;
    /** Shown instead of a zero amount, e.g. "Free". */
    freeLabel?: string | undefined;
    /** Read before the struck-through price. */
    compareLabel?: string;
    /** Read before the current price when there is a `compareAt`. */
    currentLabel?: string;
  }

  let {
    amount,
    currency = 'EUR',
    locale = 'en',
    compareAt,
    size = 'md',
    unit,
    fractionDigits,
    freeLabel,
    compareLabel = 'Regular price',
    currentLabel = 'Now',
  }: Props = $props();

  const format = $derived(
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      ...(fractionDigits === undefined
        ? {}
        : { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }),
    }),
  );
  const onSale = $derived(compareAt !== undefined && compareAt > amount);
  const current = $derived(amount === 0 && freeLabel ? freeLabel : format.format(amount));
</script>

<span class="price price--{size}" class:price--sale={onSale}>
  {#if onSale && compareAt !== undefined}
    <VisuallyHidden>{currentLabel}</VisuallyHidden>
  {/if}
  <span class="amount" use:changeCue={current}>{current}</span>
  {#if unit}<span class="unit">{unit}</span>{/if}
  {#if onSale && compareAt !== undefined}
    <s class="compare"><VisuallyHidden>{compareLabel}</VisuallyHidden>{format.format(compareAt)}</s>
  {/if}
</span>

<style>
  .price {
    display: inline-flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.15rem 0.4rem;
    font-variant-numeric: tabular-nums;
    color: var(--text);
    white-space: nowrap;
  }
  .amount {
    border-radius: var(--radius-xs);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
  }
  .price--sm .amount {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .price--md .amount {
    font-size: var(--fs-lg);
  }
  .price--lg .amount {
    font-size: var(--fs-3xl);
    letter-spacing: -0.02em;
  }
  .price--xl .amount {
    font-size: var(--fs-display);
    letter-spacing: -0.03em;
  }
  .price--sale .amount {
    color: var(--price-sale, var(--color-red));
  }
  .unit {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-3);
  }
  .compare {
    font-size: var(--fs-sm);
    color: var(--text-3);
    text-decoration-thickness: 1.5px;
  }
  .price--lg .compare,
  .price--xl .compare {
    font-size: var(--fs-lg);
  }
</style>
