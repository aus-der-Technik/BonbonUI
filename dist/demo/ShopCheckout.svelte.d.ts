import { type CartItem } from './mock-shop';
interface Props {
    /** The cart from the storefront; quantities can still change on the first step. */
    lines: CartItem[];
    code?: string | undefined;
    rate?: number;
    /** Back to the storefront (brand, "Back to shop", "Keep shopping"). */
    onshop: () => void;
    /** The order went through: the storefront's cart can be emptied. */
    onplaced?: (() => void) | undefined;
}
declare const ShopCheckout: import("svelte").Component<Props, {}, "code" | "lines" | "rate">;
type ShopCheckout = ReturnType<typeof ShopCheckout>;
export default ShopCheckout;
