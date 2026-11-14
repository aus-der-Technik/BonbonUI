import { type CartItem } from './mock-shop';
interface Props {
    /** The cart, shared with the checkout. */
    lines: CartItem[];
    /** Applied discount code and its rate (0.1 = 10 %), shared with the checkout. */
    code?: string | undefined;
    rate?: number;
    /** Start with the cart drawer open. */
    cartOpen?: boolean;
    /** Start on a product's detail view. */
    productId?: string | undefined;
    /** "Checkout" in the cart drawer. */
    oncheckout?: (() => void) | undefined;
}
declare const ShopStorefront: import("svelte").Component<Props, {}, "code" | "lines" | "rate">;
type ShopStorefront = ReturnType<typeof ShopStorefront>;
export default ShopStorefront;
