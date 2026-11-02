<script lang="ts">
  /**
   * CartLine molecule — one product in a cart: thumbnail, title with its variant, a quantity
   * stepper, the line total and a remove button. Without `onquantity` the quantity is plain
   * text (an order summary, a receipt). Lays itself out compactly in narrow containers.
   *
   *   <CartLine title="Linen shirt" meta="Sage · M" price={59} bind:quantity onremove={…} />
   */
  import Icon from '../atoms/Icon.svelte';
  import Image from '../atoms/Image.svelte';
  import Price from '../atoms/Price.svelte';
  import QuantityStepper from './QuantityStepper.svelte';
  import { formatPrice } from './web';

  interface Props {
    title: string;
    /** Unit price. */
    price: number;
    quantity?: number;
    /** The chosen variant, e.g. "Sage · M". */
    meta?: string | undefined;
    image?: string | undefined;
    imageAlt?: string;
    href?: string | undefined;
    max?: number;
    currency?: string;
    locale?: string;
    onquantity?: ((quantity: number) => void) | undefined;
    onremove?: (() => void) | undefined;
    removeLabel?: string;
    /** "2 ×" in front of the unit price when read-only. */
    quantityLabel?: (quantity: number) => string;
    eachLabel?: string;
  }

  let {
    title,
    price,
    quantity = $bindable(1),
    meta,
    image,
    imageAlt = '',
    href,
    max = 99,
    currency = 'EUR',
    locale = 'de-DE',
    onquantity,
    onremove,
    removeLabel = 'Remove',
    quantityLabel = (n) => `Qty ${n}`,
    eachLabel = 'each',
  }: Props = $props();
</script>

<article class="line">
  <div class="row">
    <div class="thumb">
      <Image src={image} alt={imageAlt} ratio="1/1" radius="none" placeholderIcon="bag" />
    </div>
    <div class="info">
      <h3 class="title">
        {#if href}<a {href}>{title}</a>{:else}{title}{/if}
      </h3>
      {#if meta}<p class="meta">{meta}</p>{/if}
      {#if quantity > 1}
        <p class="unit">{formatPrice(price, currency, locale)} {eachLabel}</p>
      {/if}
    </div>
    <div class="qty">
      {#if onquantity}
        <QuantityStepper
          bind:value={quantity}
          {max}
          size="sm"
          label="{title}: quantity"
          onchange={onquantity}
        />
      {:else}
        <span class="qty-text">{quantityLabel(quantity)}</span>
      {/if}
    </div>
    <p class="total"><Price amount={price * quantity} {currency} {locale} /></p>
    {#if onremove}
      <button type="button" class="remove" aria-label="{removeLabel} {title}" onclick={onremove}>
        <Icon name="trash" size={16} />
      </button>
    {/if}
  </div>
</article>

<style>
  .line {
    container-type: inline-size;
    min-width: 0;
  }
  .row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto auto auto;
    grid-template-areas: 'thumb info qty total remove';
    align-items: center;
    gap: var(--space-2) var(--space-4);
    min-width: 0;
    padding: var(--space-3) 0;
  }
  .line + :global(.line) {
    border-top: 1px solid var(--border-strong);
  }
  .thumb {
    grid-area: thumb;
    width: 4.5rem;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: var(--radius-lg);
    background: linear-gradient(150deg, var(--tint-100), var(--fill-muted));
    box-shadow: inset 0 0 0 1px var(--border-strong);
  }
  .thumb > :global(*) {
    display: block;
    width: 100%;
  }
  .info {
    grid-area: info;
    display: grid;
    gap: 0.15rem;
    min-width: 0;
  }
  .title {
    font-size: var(--fs-base);
    font-weight: var(--fw-semibold);
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title a {
    color: inherit;
    text-decoration: none;
  }
  .title a:hover {
    color: var(--accent-ink);
  }
  .title a:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-xs);
  }
  .meta,
  .unit {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .unit {
    font-variant-numeric: tabular-nums;
  }
  .qty {
    grid-area: qty;
  }
  .qty-text {
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .total {
    grid-area: total;
    min-width: 5rem;
    text-align: right;
    font-size: var(--fs-base);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .remove {
    grid-area: remove;
    display: grid;
    place-items: center;
    width: var(--control-sm);
    height: var(--control-sm);
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--text-3);
    cursor: pointer;
    transition:
      background var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .remove:hover {
    color: var(--danger);
    background: var(--tint-danger);
  }
  .remove:focus-visible {
    outline: var(--focus-ring);
  }

  /* Narrow (a drawer, a phone): stepper and total move under the title. */
  @container (max-width: 30rem) {
    .row {
      grid-template-columns: auto minmax(0, 1fr) auto;
      grid-template-areas:
        'thumb info remove'
        'thumb qty total';
      align-items: start;
    }
    .qty {
      align-self: end;
    }
    .total {
      align-self: center;
      min-width: 0;
    }
  }
</style>
