<script lang="ts" module>
  /** One line of a plan's feature list; `included: false` shows it struck out. */
  export type PlanFeature = string | { label: string; included?: boolean | undefined };
</script>

<script lang="ts">
  /**
   * PricingCard molecule — one plan: name, price per period, a short pitch, a checked feature
   * list and the call to action. `highlighted` lifts it onto the selected layer (tinted glass
   * with a glow) and makes its button primary — the plan you recommend.
   *
   *   <PricingCard name="Team" price={29} period="/ month" features={['5 seats', 'SSO']}
   *     highlighted badge="Most popular" onselect={() => …} />
   */
  import { onDestroy, type Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Price from '../atoms/Price.svelte';
  import VisuallyHidden from '../atoms/VisuallyHidden.svelte';

  interface Props {
    name: string;
    /** A number is formatted as money ("29 €"); a string is shown as is ("Custom"). */
    price: number | string;
    /** A former price, struck through before the current one. */
    compareAt?: number | undefined;
    period?: string | undefined;
    /** A small line under the price, e.g. "billed yearly". */
    note?: string | undefined;
    description?: string | undefined;
    features?: PlanFeature[];
    /** The recommended plan: selected layer, primary button. */
    highlighted?: boolean;
    /** A pill above the name, e.g. "Most popular". */
    badge?: string | undefined;
    ctaLabel?: string;
    ctaHref?: string | undefined;
    /** May return a promise: the button spins; if it rejects, the button says `failedLabel`. */
    onselect?: (() => void | Promise<void>) | undefined;
    /** Shown on the button for a few seconds when `onselect` failed. */
    failedLabel?: string;
    /** Replaces the default button. */
    actions?: Snippet | undefined;
    currency?: string;
    locale?: string;
    /** Shown instead of a zero price. */
    freeLabel?: string;
    includedLabel?: string;
    excludedLabel?: string;
  }

  let {
    name,
    price,
    compareAt,
    period,
    note,
    description,
    features = [],
    highlighted = false,
    badge,
    ctaLabel = 'Get started',
    ctaHref,
    onselect,
    failedLabel = "Didn't work — try again",
    actions,
    currency = 'EUR',
    locale = 'en',
    freeLabel = 'Free',
    includedLabel = 'Included',
    excludedLabel = 'Not included',
  }: Props = $props();

  const id = $props.id();
  let busy = $state(false);
  let failed = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  onDestroy(() => clearTimeout(timer));
  const items = $derived(
    features.map((f) => (typeof f === 'string' ? { label: f, included: true } : f)),
  );

  async function select() {
    if (!onselect) return;
    busy = true;
    failed = false;
    clearTimeout(timer);
    try {
      await onselect();
    } catch {
      // Feedback where the user acted: the button itself says it did not work.
      failed = true;
      timer = setTimeout(() => (failed = false), 4000);
    } finally {
      busy = false;
    }
  }
</script>

<article
  class="plan"
  class:plan--highlighted={highlighted}
  data-layer={highlighted ? 'selected' : 'panel'}
  aria-labelledby="{id}-name"
>
  <header class="head">
    {#if badge}<span class="badge">{badge}</span>{/if}
    <h3 class="name" id="{id}-name">{name}</h3>
    {#if description}<p class="description">{description}</p>{/if}
  </header>

  <p class="price">
    {#if typeof price === 'number'}
      <Price
        amount={price}
        {compareAt}
        unit={price === 0 ? undefined : period}
        {freeLabel}
        size="xl"
        {currency}
        {locale}
        fractionDigits={Number.isInteger(price) ? 0 : undefined}
      />
    {:else}
      <span class="amount">{price}</span>
    {/if}
  </p>
  {#if note}<p class="note">{note}</p>{/if}

  <div class="cta">
    {#if actions}
      {@render actions()}
    {:else}
      <Button
        variant={failed ? 'danger' : highlighted ? 'primary' : 'secondary'}
        size="lg"
        shape="pill"
        icon={failed ? 'alert' : undefined}
        label={failed ? failedLabel : ctaLabel}
        href={ctaHref}
        {busy}
        onclick={ctaHref ? undefined : select}
        class="cta-button"
      />
      <span class="live" role="status">
        {#if failed}<VisuallyHidden>{failedLabel}</VisuallyHidden>{/if}
      </span>
    {/if}
  </div>

  {#if items.length}
    <ul class="features">
      {#each items as item (item.label)}
        <li class:excluded={item.included === false}>
          <span class="mark" aria-hidden="true">
            <Icon name={item.included === false ? 'minus' : 'check'} size={13} />
          </span>
          <VisuallyHidden>{item.included === false ? excludedLabel : includedLabel}:</VisuallyHidden
          >
          {item.label}
        </li>
      {/each}
    </ul>
  {/if}
</article>

<style>
  .plan {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
    padding: var(--space-6);
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    transition:
      transform var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .plan:hover {
    transform: var(--hover-lift);
    box-shadow:
      var(--glass-shadow),
      0 16px 36px rgba(12, 12, 22, 0.1),
      var(--glass-inset);
  }
  .plan--highlighted {
    background: var(--layer-selected-bg);
    border: 1.5px solid var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .plan--highlighted:hover {
    box-shadow:
      var(--layer-selected-shadow),
      0 16px 36px color-mix(in srgb, var(--tint) 14%, transparent);
  }
  .head {
    display: grid;
    gap: var(--space-1);
    justify-items: start;
  }
  .badge {
    margin-bottom: var(--space-2);
    padding: 0.2rem 0.65rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.01em;
    color: var(--on-accent);
    background: var(--grad-primary);
    box-shadow: var(--shadow-primary);
  }
  .name {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .plan--highlighted .name {
    color: var(--accent-ink);
  }
  .description {
    font-size: var(--fs-md);
    line-height: 1.5;
    color: var(--text-2);
  }
  .price {
    /* A yearly price is not a sale: keep it in the accent rather than the sale red. */
    --price-sale: var(--accent-ink);
    display: flex;
    min-height: 2.75rem;
    align-items: baseline;
  }
  .amount {
    font-size: var(--fs-display);
    font-weight: var(--fw-bold);
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .note {
    margin-top: calc(var(--space-3) * -1);
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .cta {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  /* Out of the flex flow, so the empty live region adds no gap. */
  .live {
    position: absolute;
  }
  .cta :global(.cta-button) {
    width: 100%;
    justify-content: center;
  }
  .features {
    display: grid;
    gap: var(--space-3);
    margin: 0;
    padding: var(--space-4) 0 0;
    list-style: none;
    border-top: 1px solid var(--border-strong);
  }
  li {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    font-size: var(--fs-base);
    line-height: 1.4;
  }
  .mark {
    flex: none;
    display: grid;
    place-items: center;
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.05rem;
    border-radius: var(--radius-pill);
    color: var(--accent-ink);
    background: var(--accent-soft);
  }
  .excluded {
    color: var(--text-3);
  }
  .excluded .mark {
    color: var(--text-3);
    background: var(--fill-subtle);
  }

  @media (prefers-reduced-motion: reduce) {
    .plan {
      transition: none;
    }
    .plan:hover {
      transform: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .plan {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
