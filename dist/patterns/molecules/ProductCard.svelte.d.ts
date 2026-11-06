/**
   * ProductCard molecule — a product tile of a shop: picture, badge ("New", or the discount when
   * there is a former price), wishlist heart, title, rating, colour dots, price and an add-to-cart
   * button. With `href` (or `onopen`) the whole card opens the product and lifts on hover; the
   * buttons stay separately clickable. `onadd` may return a promise: the button spins, then
   * ticks with a small burst of sprinkles — or, when it rejects, turns red and says
   * `addFailedLabel` for a few seconds.
   *
   *   <ProductCard title="Linen shirt" price={59} compareAt={79} image={url} href="/p/linen"
   *     rating={4.6} reviews={128} colors={['#9bb59a', '#e7dcc8']} onadd={() => cart.add(id)} />
   */
import { type Snippet } from 'svelte';
interface Props {
    title: string;
    price: number;
    /** Former price: struck through, and a "-20%" badge unless `badge` is set. */
    compareAt?: number | undefined;
    href?: string | undefined;
    /** Opens the product (SPA); called instead of following `href` when both are set. */
    onopen?: ((event: MouseEvent) => void) | undefined;
    image?: string | undefined;
    imageAlt?: string;
    /** Own picture content (an illustration) instead of `image`. */
    media?: Snippet | undefined;
    /** A line above the title: brand or category. */
    subtitle?: string | undefined;
    rating?: number | undefined;
    reviews?: number | undefined;
    badge?: string | undefined;
    badgeTone?: 'accent' | 'danger' | 'neutral';
    /** Available colours as CSS colours; more than `maxColors` show as "+3". */
    colors?: string[];
    maxColors?: number;
    colorsLabel?: (count: number) => string;
    soldOut?: boolean;
    soldOutLabel?: string;
    onadd?: (() => void | Promise<void>) | undefined;
    addLabel?: string;
    addedLabel?: string;
    /** Said by the add button when `onadd` failed. */
    addFailedLabel?: string;
    wishlisted?: boolean;
    onwishlist?: ((wishlisted: boolean) => void) | undefined;
    wishlistLabel?: string;
    unwishlistLabel?: string;
    /** Width / height of the picture. */
    aspect?: string;
    /** Hover lift and the card-wide click target. Default: on when it has `href` or `onopen`. */
    interactive?: boolean | undefined;
    currency?: string;
    /** `ground` (default): picture and text on the backdrop, no box; `panel` puts it on a card. */
    level?: 'ground' | 'panel';
    locale?: string;
    reviewsLabel?: (count: number) => string;
}
declare const ProductCard: import("svelte").Component<Props, {}, "wishlisted">;
type ProductCard = ReturnType<typeof ProductCard>;
export default ProductCard;
