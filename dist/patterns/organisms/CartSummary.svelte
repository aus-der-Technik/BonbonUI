<script lang="ts">
  /**
   * CartSummary organism — the money side of a cart or checkout: subtotal, shipping, discount
   * and the total, a discount-code field, a free-shipping progress bar and the checkout button.
   * The cart lines go in as children (above the totals). `ondiscount` and `oncheckout` may
   * return promises. A code that does not exist: resolve `false`, or reject with an error whose
   * `code` or `message` is `'invalid'` — the field shows `invalidCodeMessage`. Any other rejection
   * (the network) shows `discountErrorMessage`, and a failed checkout `checkoutErrorMessage` right
   * under the button.
   *
   *   <CartSummary subtotal={118} shipping={4.9} freeShippingFrom={150}
   *     ondiscount={(code) => api.apply(code)} oncheckout={() => goto('/checkout')}>
   *     {#each lines as line}<CartLine {...line} />{/each}
   *   </CartSummary>
   */
  import type { Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Price from '../atoms/Price.svelte';
  import Alert from '../molecules/Alert.svelte';
  import { formatPrice } from '../molecules/web';

  interface Props {
    subtotal: number;
    /** `undefined` → "Calculated at checkout"; `0` → "Free". */
    shipping?: number | undefined;
    /** Amount taken off (positive). */
    discount?: number | undefined;
    /** The applied code, shown with a remove button. */
    discountCode?: string | undefined;
    /** Tax shown as its own line; with `taxIncluded` it is only noted. */
    tax?: number | undefined;
    taxIncluded?: boolean;
    /** Default: subtotal + shipping + tax (unless included) − discount. */
    total?: number | undefined;
    /** Shows how much is left to free shipping. */
    freeShippingFrom?: number | undefined;
    title?: string | undefined;
    /** `panel` is a glass card; `ground` for inside a drawer or a card of your own. */
    level?: 'panel' | 'ground';
    /** Resolve `false` (or reject with `{ code: 'invalid' }`) for a code that does not exist. */
    ondiscount?: ((code: string) => void | boolean | Promise<void | boolean>) | undefined;
    onremovediscount?: (() => void) | undefined;
    oncheckout?: (() => void | Promise<void>) | undefined;
    checkoutHref?: string | undefined;
    checkoutLabel?: string;
    checkoutDisabled?: boolean;
    /** Small print under the button ("Secure payment · 30-day returns"). */
    note?: string | undefined;
    currency?: string;
    locale?: string;
    subtotalLabel?: string;
    shippingLabel?: string;
    shippingLaterLabel?: string;
    freeLabel?: string;
    discountLabel?: string;
    taxLabel?: string;
    taxIncludedLabel?: string;
    totalLabel?: string;
    codeLabel?: string;
    codePlaceholder?: string;
    applyLabel?: string;
    removeCodeLabel?: string;
    invalidCodeMessage?: string;
    /** A discount check that failed for another reason, e.g. the network. */
    discountErrorMessage?: string;
    /** Shown under the checkout button when `oncheckout` rejects. */
    checkoutErrorMessage?: string;
    dismissLabel?: string;
    freeShippingLabel?: (missing: string) => string;
    freeShippingReachedLabel?: string;
    /** Cart lines, above the totals. */
    children?: Snippet | undefined;
  }

  let {
    subtotal,
    shipping,
    discount,
    discountCode,
    tax,
    taxIncluded = true,
    total,
    freeShippingFrom,
    title = 'Order summary',
    level = 'panel',
    ondiscount,
    onremovediscount,
    oncheckout,
    checkoutHref,
    checkoutLabel = 'Checkout',
    checkoutDisabled = false,
    note,
    currency = 'EUR',
    locale = 'en',
    subtotalLabel = 'Subtotal',
    shippingLabel = 'Shipping',
    shippingLaterLabel = 'Calculated at checkout',
    freeLabel = 'Free',
    discountLabel = 'Discount',
    taxLabel = 'Tax',
    taxIncludedLabel = 'Including tax',
    totalLabel = 'Total',
    codeLabel = 'Discount code',
    codePlaceholder = 'Discount code',
    applyLabel = 'Apply',
    removeCodeLabel = 'Remove code',
    invalidCodeMessage = 'This code is not valid.',
    discountErrorMessage = 'Could not check the code. Try again.',
    checkoutErrorMessage = 'Checkout did not go through. Try again.',
    dismissLabel = 'Dismiss',
    freeShippingLabel = (missing) => `${missing} away from free shipping`,
    freeShippingReachedLabel = 'You get free shipping',
    children,
  }: Props = $props();

  const id = $props.id();
  const fmt = (n: number) => formatPrice(n, currency, locale);
  const sum = $derived(
    total ??
      Math.max(0, subtotal + (shipping ?? 0) + (taxIncluded ? 0 : (tax ?? 0)) - (discount ?? 0)),
  );
  const shippingProgress = $derived(
    freeShippingFrom ? Math.min(1, subtotal / freeShippingFrom) : 0,
  );

  let code = $state('');
  let applying = $state(false);
  let codeError = $state('');
  let checkingOut = $state(false);
  let checkoutFailed = $state(false);

  /** An error that means "no such code", as opposed to a request that failed. */
  function invalidCode(error: unknown): boolean {
    if (!error || typeof error !== 'object') return false;
    const { code: kind, message } = error as { code?: unknown; message?: unknown };
    return kind === 'invalid' || message === 'invalid';
  }

  async function apply(event: SubmitEvent) {
    event.preventDefault();
    const value = code.trim();
    if (!ondiscount || !value || applying) return;
    applying = true;
    codeError = '';
    try {
      if ((await ondiscount(value)) === false) codeError = invalidCodeMessage;
      else code = '';
    } catch (error) {
      codeError = invalidCode(error) ? invalidCodeMessage : discountErrorMessage;
    } finally {
      applying = false;
    }
  }

  async function checkout() {
    if (!oncheckout || checkingOut) return;
    checkingOut = true;
    checkoutFailed = false;
    try {
      await oncheckout();
    } catch {
      checkoutFailed = true;
    } finally {
      checkingOut = false;
    }
  }
</script>

<section
  class="summary summary--{level}"
  aria-labelledby={title ? `${id}-title` : undefined}
  data-layer={level}
>
  {#if title}<h2 class="title" id="{id}-title">{title}</h2>{/if}

  {#if children}<div class="lines">{@render children()}</div>{/if}

  {#if freeShippingFrom}
    <div class="free" class:reached={shippingProgress >= 1}>
      <p>
        <Icon name="truck" size={16} />
        {shippingProgress >= 1
          ? freeShippingReachedLabel
          : freeShippingLabel(fmt(freeShippingFrom - subtotal))}
      </p>
      <span class="track" aria-hidden="true">
        <span class="fill" style:width="{shippingProgress * 100}%"></span>
      </span>
    </div>
  {/if}

  {#if ondiscount}
    {#if discountCode}
      <p class="applied">
        <Icon name="tag" size={15} />
        <span class="code">{discountCode}</span>
        {#if onremovediscount}
          <button
            type="button"
            class="remove-code"
            aria-label="{removeCodeLabel} {discountCode}"
            onclick={onremovediscount}
          >
            <Icon name="close" size={13} />
          </button>
        {/if}
      </p>
    {:else}
      <form class="code-form" onsubmit={apply} novalidate>
        <label class="sr" for="{id}-code">{codeLabel}</label>
        <input
          id="{id}-code"
          class="code-input"
          class:invalid={!!codeError}
          placeholder={codePlaceholder}
          autocomplete="off"
          autocapitalize="characters"
          bind:value={code}
          aria-invalid={codeError ? 'true' : undefined}
          aria-describedby={codeError ? `${id}-code-error` : undefined}
          oninput={() => (codeError = '')}
        />
        <Button type="submit" label={applyLabel} busy={applying} disabled={!code.trim()} />
      </form>
      {#if codeError}
        <p class="code-error" id="{id}-code-error" role="alert">{codeError}</p>
      {/if}
    {/if}
  {/if}

  <dl class="totals">
    <div class="row">
      <dt>{subtotalLabel}</dt>
      <dd>{fmt(subtotal)}</dd>
    </div>
    <div class="row">
      <dt>{shippingLabel}</dt>
      <dd class:muted={shipping === undefined} class:free-ship={shipping === 0}>
        {shipping === undefined ? shippingLaterLabel : shipping === 0 ? freeLabel : fmt(shipping)}
      </dd>
    </div>
    {#if discount}
      <div class="row row--discount">
        <dt>{discountLabel}{discountCode ? ` (${discountCode})` : ''}</dt>
        <dd>−{fmt(discount)}</dd>
      </div>
    {/if}
    {#if tax !== undefined && !taxIncluded}
      <div class="row">
        <dt>{taxLabel}</dt>
        <dd>{fmt(tax)}</dd>
      </div>
    {/if}
    <div class="row row--total">
      <dt>{totalLabel}</dt>
      <dd>
        <Price amount={sum} size="lg" {currency} {locale} />
        {#if taxIncluded && tax !== undefined}
          <span class="tax-note">{taxIncludedLabel} {fmt(tax)}</span>
        {:else if taxIncluded}
          <span class="tax-note">{taxIncludedLabel}</span>
        {/if}
      </dd>
    </div>
  </dl>

  {#if oncheckout || checkoutHref}
    <Button
      variant="primary"
      size="xl"
      shape="pill"
      icon="lock"
      label={checkoutLabel}
      href={checkoutHref}
      busy={checkingOut}
      disabled={checkoutDisabled}
      onclick={checkoutHref ? undefined : checkout}
      class="checkout"
    />
    {#if checkoutFailed}
      <Alert
        message={checkoutErrorMessage}
        {dismissLabel}
        ondismiss={() => (checkoutFailed = false)}
      />
    {/if}
  {/if}
  {#if note}<p class="note">{note}</p>{/if}
</section>

<style>
  .summary {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
  }
  .summary--panel {
    padding: var(--space-6);
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .title {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .lines {
    display: grid;
    margin-top: calc(var(--space-2) * -1);
  }

  .free {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    background: var(--accent-faint);
  }
  .free p {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--accent-ink);
  }
  .track {
    height: 6px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    overflow: hidden;
  }
  .fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--grad-primary);
    transition: width var(--motion-slow) var(--ease-out);
  }

  .code-form {
    display: flex;
    gap: var(--space-2);
  }
  .code-input {
    flex: 1;
    min-width: 0;
    height: var(--control-md);
    padding: 0 var(--space-3);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-strong);
    background: var(--input-bg);
    font: inherit;
    font-size: var(--fs-md);
    color: var(--text);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    outline: 0;
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out);
  }
  .code-input::placeholder {
    color: var(--text-3);
    text-transform: none;
    letter-spacing: normal;
  }
  .code-input:focus-visible {
    border-color: var(--accent);
    box-shadow: var(--focus-halo);
  }
  .code-input.invalid {
    border-color: var(--danger);
  }
  .code-error {
    margin-top: calc(var(--space-2) * -1);
    font-size: var(--fs-sm);
    color: var(--danger);
  }
  .applied {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: var(--space-2);
    padding: 0.3rem 0.4rem 0.3rem 0.75rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--accent-ink);
    background: var(--accent-soft);
  }
  .code {
    letter-spacing: 0.04em;
  }
  .remove-code {
    display: grid;
    place-items: center;
    width: 1.375rem;
    height: 1.375rem;
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: transparent;
    color: inherit;
    cursor: pointer;
  }
  .remove-code:hover {
    background: var(--accent-soft);
  }
  .remove-code:focus-visible {
    outline: var(--focus-ring);
  }

  .totals {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-strong);
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-4);
    font-size: var(--fs-base);
  }
  dt {
    color: var(--text-2);
  }
  dd {
    margin: 0;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
  .muted {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .free-ship {
    font-weight: var(--fw-semibold);
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
  }
  .row--discount dd {
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
    font-weight: var(--fw-semibold);
  }
  .row--total {
    margin-top: var(--space-2);
    padding-top: var(--space-3);
    border-top: 1px solid var(--border-strong);
  }
  .row--total dt {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .row--total dd {
    display: grid;
    font-size: var(--fs-3xl);
    font-weight: var(--fw-bold);
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .tax-note {
    font-size: var(--fs-xs);
    font-weight: var(--fw-regular);
    letter-spacing: normal;
    color: var(--text-3);
  }
  .summary :global(.checkout) {
    width: 100%;
    justify-content: center;
  }
  .note {
    margin-top: calc(var(--space-2) * -1);
    font-size: var(--fs-xs);
    color: var(--text-3);
    text-align: center;
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  @media (prefers-reduced-motion: reduce) {
    .fill {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .summary--panel {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
