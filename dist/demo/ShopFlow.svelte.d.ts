interface Props {
    /** Start on this product's detail view. */
    productId?: string | undefined;
    /** Start with the cart drawer open. */
    cartOpen?: boolean;
}
declare const ShopFlow: import("svelte").Component<Props, {}, "">;
type ShopFlow = ReturnType<typeof ShopFlow>;
export default ShopFlow;
