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
declare const CartSummary: import("svelte").Component<Props, {}, "">;
type CartSummary = ReturnType<typeof CartSummary>;
export default CartSummary;
