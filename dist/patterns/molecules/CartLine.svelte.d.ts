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
declare const CartLine: import("svelte").Component<Props, {}, "quantity">;
type CartLine = ReturnType<typeof CartLine>;
export default CartLine;
