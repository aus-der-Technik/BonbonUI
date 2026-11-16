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
declare const PricingTable: import("svelte").Component<Props, {}, "billing">;
type PricingTable = ReturnType<typeof PricingTable>;
export default PricingTable;
