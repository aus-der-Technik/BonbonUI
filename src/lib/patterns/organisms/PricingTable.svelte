<script lang="ts" module>
  import type { PlanFeature } from '../molecules/PricingCard.svelte';

  export type Billing = 'monthly' | 'yearly';

  export interface PricingPlan {
    id: string;
    name: string;
    /** Price per month, billed monthly (number = money, string = "Custom"). */
    monthly: number | string;
    /** Price per month when billed yearly; without it the plan costs the same either way. */
    yearly?: number | string | undefined;
    description?: string | undefined;
    features?: PlanFeature[] | undefined;
    highlighted?: boolean | undefined;
    badge?: string | undefined;
    ctaLabel?: string | undefined;
    ctaHref?: string | undefined;
  }
</script>

<script lang="ts">
  /**
   * PricingTable organism — the plans of a website side by side, with a Monthly / Yearly switch
   * when any plan has a yearly price (yearly prices are per month, the card notes "billed
   * yearly" and the switch shows what you save — muted while monthly is chosen, lit up with a
   * small pop once yearly is). The recommended plan is `highlighted`.
   *
   *   <PricingTable title="Simple pricing" plans={plans} onselect={(plan, billing) => …} />
   */
  import PricingCard from '../molecules/PricingCard.svelte';
  import SegmentedControl from '../molecules/SegmentedControl.svelte';
  import Grid from '../layout/Grid.svelte';
  import Section from '../layout/Section.svelte';

  interface Props {
    plans: PricingPlan[];
    billing?: Billing;
    title?: string | undefined;
    eyebrow?: string | undefined;
    description?: string | undefined;
    align?: 'start' | 'center';
    size?: 'default' | 'hero';
    /** Minimum card width. */
    min?: string;
    onselect?: ((plan: PricingPlan, billing: Billing) => void | Promise<void>) | undefined;
    onbilling?: ((billing: Billing) => void) | undefined;
    currency?: string;
    locale?: string;
    monthlyLabel?: string;
    yearlyLabel?: string;
    billingLabel?: string;
    /** Next to the switch, e.g. "Save 20%"; default: computed from the plans. */
    savingsLabel?: string | undefined;
    period?: string;
    yearlyNote?: string;
    ctaLabel?: string;
  }

  let {
    plans,
    billing = $bindable('monthly'),
    title,
    eyebrow,
    description,
    align = 'center',
    size = 'hero',
    min = '17rem',
    onselect,
    onbilling,
    currency = 'EUR',
    locale = 'de-DE',
    monthlyLabel = 'Monthly',
    yearlyLabel = 'Yearly',
    billingLabel = 'Billing period',
    savingsLabel,
    period = '/ month',
    yearlyNote = 'billed yearly',
    ctaLabel = 'Get started',
  }: Props = $props();

  const hasYearly = $derived(plans.some((p) => p.yearly !== undefined));
  // The best saving across plans, so the promise next to the switch is never overstated.
  const saving = $derived.by(() => {
    if (savingsLabel !== undefined) return savingsLabel;
    let best = 0;
    for (const p of plans) {
      if (typeof p.monthly === 'number' && typeof p.yearly === 'number' && p.monthly > 0) {
        best = Math.max(best, Math.round((1 - p.yearly / p.monthly) * 100));
      }
    }
    return best > 0 ? `Save up to ${best}%` : '';
  });

  const priceOf = (plan: PricingPlan) =>
    billing === 'yearly' && plan.yearly !== undefined ? plan.yearly : plan.monthly;
</script>

{#snippet toggle()}
  {#if hasYearly}
    <div class="billing">
      <SegmentedControl
        label={billingLabel}
        bind:value={billing}
        options={[
          { value: 'monthly', label: monthlyLabel },
          { value: 'yearly', label: yearlyLabel },
        ]}
        onchange={(v) => onbilling?.(v)}
      />
      {#if saving}
        {#key billing}
          <span class="saving" class:on={billing === 'yearly'}>{saving}</span>
        {/key}
      {/if}
    </div>
  {/if}
{/snippet}

{#snippet cards()}
  <Grid {min} columns={Math.min(plans.length, 4)} gap="md" align="stretch">
    {#each plans as plan (plan.id)}
      {@const yearly = billing === 'yearly' && plan.yearly !== undefined}
      <PricingCard
        name={plan.name}
        price={priceOf(plan)}
        compareAt={yearly && typeof plan.monthly === 'number' && plan.monthly !== plan.yearly
          ? plan.monthly
          : undefined}
        {period}
        note={yearly && typeof plan.yearly === 'number' ? yearlyNote : undefined}
        description={plan.description}
        features={plan.features ?? []}
        highlighted={plan.highlighted ?? false}
        badge={plan.badge}
        ctaLabel={plan.ctaLabel ?? ctaLabel}
        ctaHref={plan.ctaHref}
        onselect={onselect ? () => onselect(plan, billing) : undefined}
        {currency}
        {locale}
      />
    {/each}
  </Grid>
{/snippet}

<div class="pricing pricing--{align}">
  {#if title || eyebrow || description}
    <Section {title} {eyebrow} {description} {align} {size} gap="lg">
      {@render toggle()}
      {@render cards()}
    </Section>
  {:else}
    {@render toggle()}
    {@render cards()}
  {/if}
</div>

<style>
  .pricing {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    min-width: 0;
  }
  .billing {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }
  .saving {
    padding: 0.25rem 0.7rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
    background: var(--fill-muted);
  }
  /* The saving becomes real: the pill lights up in the tint with a small pop. */
  .saving.on {
    color: var(--accent-ink);
    background: var(--accent-soft);
    animation: bb-pop var(--motion-base) var(--ease-spring);
  }
  @media (prefers-reduced-motion: reduce) {
    .saving.on {
      animation: none;
    }
  }
  .pricing--center .billing {
    justify-content: center;
  }
</style>
