/** One line of a plan's feature list; `included: false` shows it struck out. */
export type PlanFeature = string | {
    label: string;
    included?: boolean | undefined;
};
/**
   * PricingCard molecule — one plan: name, price per period, a short pitch, a checked feature
   * list and the call to action. `highlighted` lifts it onto the selected layer (tinted glass
   * with a glow) and makes its button primary — the plan you recommend.
   *
   *   <PricingCard name="Team" price={29} period="/ month" features={['5 seats', 'SSO']}
   *     highlighted badge="Most popular" onselect={() => …} />
   */
import { type Snippet } from 'svelte';
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
declare const PricingCard: import("svelte").Component<Props, {}, "">;
type PricingCard = ReturnType<typeof PricingCard>;
export default PricingCard;
