export interface Product {
    id: string;
    title: string;
    price: number;
    compareAt?: number | undefined;
    href?: string | undefined;
    image?: string | undefined;
    imageAlt?: string | undefined;
    subtitle?: string | undefined;
    rating?: number | undefined;
    reviews?: number | undefined;
    badge?: string | undefined;
    colors?: string[] | undefined;
    soldOut?: boolean | undefined;
}
/**
   * ProductGrid organism — a shop's product listing: ProductCards in as many columns as fit
   * (two on a phone), with add-to-cart and wishlist wired per product, and an empty state when
   * a filter leaves nothing. `card` replaces the default card for every product. `onadd` also
   * gets the pressed card's element, so the item can fly from there into the cart.
   *
   *   <ProductGrid products={items} bind:wishlist onadd={(p, card) => cart.add(p.id)} onopen={(p) => …} />
   */
import type { Snippet } from 'svelte';
import type { Space } from '../layout/space';
interface Props {
    products: Product[];
    /** Ids of wishlisted products; the heart shows when `onwishlist` is set or this is bound. */
    wishlist?: string[] | undefined;
    /** Add to cart; `card` is the product card that was pressed (to animate from it). */
    onadd?: ((product: Product, card: HTMLElement) => void | Promise<void>) | undefined;
    onwishlist?: ((product: Product, wishlisted: boolean) => void) | undefined;
    onopen?: ((product: Product) => void) | undefined;
    /** Minimum card width. */
    min?: string;
    columns?: number | undefined;
    gap?: Space;
    aspect?: string;
    currency?: string;
    locale?: string;
    emptyTitle?: string;
    emptyMessage?: string;
    /** Own card markup per product. */
    card?: Snippet<[Product]> | undefined;
    /** Shown instead of the default empty state. */
    empty?: Snippet | undefined;
}
declare const ProductGrid: import("svelte").Component<Props, {}, "wishlist">;
type ProductGrid = ReturnType<typeof ProductGrid>;
export default ProductGrid;
