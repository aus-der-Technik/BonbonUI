<script lang="ts">
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
  import { onDestroy, type Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Image from '../atoms/Image.svelte';
  import Price from '../atoms/Price.svelte';
  import Stars from '../atoms/Stars.svelte';
  import VisuallyHidden from '../atoms/VisuallyHidden.svelte';
  import { discountPercent } from './web';
  import { celebrate } from '../../utils/delight';

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

  let {
    level = 'ground',
    title,
    price,
    compareAt,
    href,
    onopen,
    image,
    imageAlt = '',
    media,
    subtitle,
    rating,
    reviews,
    badge,
    badgeTone,
    colors = [],
    maxColors = 5,
    colorsLabel = (n) => `${n} colours`,
    soldOut = false,
    soldOutLabel = 'Sold out',
    onadd,
    addLabel = 'Add to cart',
    addedLabel = 'Added to cart',
    addFailedLabel = "Couldn't add to cart",
    wishlisted = $bindable(false),
    onwishlist,
    wishlistLabel = 'Add to wishlist',
    unwishlistLabel = 'Remove from wishlist',
    aspect = '4 / 5',
    interactive,
    currency = 'EUR',
    locale = 'en',
    reviewsLabel = (n) => `${n} reviews`,
  }: Props = $props();

  const off = $derived(discountPercent(price, compareAt));
  const shownBadge = $derived(soldOut ? soldOutLabel : (badge ?? (off ? `-${off}%` : undefined)));
  const tone = $derived(
    soldOut ? 'neutral' : (badgeTone ?? (badge === undefined && off ? 'danger' : 'accent')),
  );
  const clickable = $derived(interactive ?? !!(href || onopen));

  let card = $state<HTMLElement>();
  let adding = $state(false);
  let added = $state(false);
  let failed = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  onDestroy(() => clearTimeout(timer));

  async function add() {
    if (!onadd || adding) return;
    adding = true;
    failed = false;
    clearTimeout(timer);
    try {
      await onadd();
      if (!added && card) celebrate(card.querySelector('.add') ?? card, 8);
      added = true;
      timer = setTimeout(() => (added = false), 1600);
    } catch {
      // Feedback at the button the user pressed, not somewhere else on the page.
      added = false;
      failed = true;
      timer = setTimeout(() => (failed = false), 4000);
    } finally {
      adding = false;
    }
  }

  function toggleWish() {
    wishlisted = !wishlisted;
    onwishlist?.(wishlisted);
  }

  function open(event: MouseEvent) {
    if (!onopen) return;
    event.preventDefault();
    onopen(event);
  }
</script>

<article
  class="product product--{level}"
  class:interactive={clickable}
  class:sold-out={soldOut}
  bind:this={card}
>
  <div class="media" style:aspect-ratio={aspect}>
    {#if media}
      {@render media()}
    {:else}
      <Image src={image} alt={imageAlt} ratio={aspect} radius="none" placeholderIcon="bag" />
    {/if}
    {#if shownBadge}<span class="badge badge--{tone}">{shownBadge}</span>{/if}
    {#if onwishlist}
      <button
        type="button"
        class="wish"
        class:on={wishlisted}
        aria-pressed={wishlisted}
        aria-label={wishlisted ? unwishlistLabel : wishlistLabel}
        onclick={toggleWish}
      >
        <Icon name="heart" size={18} />
      </button>
    {/if}
  </div>

  <div class="body">
    {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
    <h3 class="title">
      {#if href || onopen}
        <a href={href ?? '#'} class="open" onclick={open}>{title}</a>
      {:else}
        {title}
      {/if}
    </h3>
    {#if rating !== undefined}
      <p class="rating">
        <Stars value={rating} showValue />
        {#if reviews !== undefined}
          <span class="reviews" aria-label={reviewsLabel(reviews)}>({reviews})</span>
        {/if}
      </p>
    {/if}
    {#if colors.length}
      <p class="colors" aria-label={colorsLabel(colors.length)}>
        {#each colors.slice(0, maxColors) as color, i (i)}
          <span class="dot" style:background={color}></span>
        {/each}
        {#if colors.length > maxColors}
          <span class="more" aria-hidden="true">+{colors.length - maxColors}</span>
        {/if}
      </p>
    {/if}
    <div class="buy">
      <p class="price">
        <Price amount={price} {compareAt} {currency} {locale} />
      </p>
      {#if onadd}
        <Button
          variant={failed ? 'danger-solid' : 'primary'}
          shape="pill"
          size="md"
          iconOnly
          icon={failed ? 'alert' : added ? 'check' : 'plus'}
          label={failed ? addFailedLabel : added ? addedLabel : addLabel}
          busy={adding}
          disabled={soldOut}
          onclick={add}
          class="add"
        />
        <span class="live" role="status">
          {#if failed}<VisuallyHidden>{addFailedLabel}</VisuallyHidden>{/if}
        </span>
      {/if}
    </div>
  </div>
</article>

<style>
  .product {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
    border-radius: var(--radius-card);
    transition:
      transform var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .product--ground {
    overflow: visible;
  }
  .product--panel {
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
  }
  /* On the ground the picture answers the pointer (it zooms); only a card lifts. */
  .product--panel.interactive:hover {
    transform: var(--hover-lift);
    box-shadow:
      var(--glass-shadow),
      0 16px 36px rgba(12, 12, 22, 0.1),
      var(--glass-inset);
  }
  .interactive:active {
    transform: scale(0.99);
    transition-duration: var(--motion-quick);
  }
  .interactive:has(.open:focus-visible) {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  .media {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-card);
    background:
      radial-gradient(120% 80% at 30% 20%, var(--tint-100), transparent 60%),
      linear-gradient(160deg, var(--fill-subtle), var(--fill-muted));
  }
  .media > :global(:first-child) {
    display: block;
    width: 100%;
    height: 100%;
  }
  .media :global(img),
  .media > :global(svg) {
    transition: transform var(--motion-lazy) var(--ease-out);
  }
  .interactive:hover .media :global(img) {
    transform: scale(1.045);
  }
  .sold-out .media :global(img) {
    filter: grayscale(0.6);
    opacity: 0.75;
  }

  .badge {
    position: absolute;
    top: var(--space-3);
    left: var(--space-3);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-xs);
    font-weight: var(--fw-bold);
    letter-spacing: 0.01em;
    font-variant-numeric: tabular-nums;
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
  }
  .badge--accent {
    color: var(--on-accent);
    background: var(--grad-primary);
    box-shadow: var(--shadow-primary);
  }
  .badge--danger {
    color: var(--on-danger);
    background: var(--grad-danger);
    box-shadow: 0 6px 16px color-mix(in srgb, var(--danger) 30%, transparent);
  }
  .badge--neutral {
    color: var(--text);
    background: var(--layer-front-bg);
    box-shadow: var(--shadow-frosted);
  }

  .wish {
    position: absolute;
    z-index: 2;
    top: var(--space-2);
    right: var(--space-2);
    display: grid;
    place-items: center;
    width: var(--control-md);
    height: var(--control-md);
    padding: 0;
    /* A soft-touch key, not glass: it sits on the picture, it does not float over the page. */
    border: 0;
    border-radius: var(--radius-pill);
    color: var(--text-2);
    background: var(--soft-bg-hover);
    box-shadow: var(--soft-shadow);
    cursor: pointer;
    transition:
      transform var(--motion-quick) var(--ease-jelly),
      color var(--motion-quick) var(--ease-out);
  }
  .wish:hover {
    color: var(--color-pink);
  }
  .wish:active {
    transform: var(--press-squish);
  }
  .wish:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .wish.on {
    color: var(--color-pink);
  }
  .wish.on :global(svg) {
    fill: currentColor;
    animation: bb-jelly var(--motion-slow) var(--ease-out);
  }

  .body {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--space-1);
    padding: var(--space-3) 2px 0;
  }
  .product--panel .media {
    margin: 6px 6px 0;
    border-radius: calc(var(--radius-card) - 6px);
  }
  .product--panel .body {
    padding: var(--space-3) var(--space-4) var(--space-4);
  }
  .subtitle {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .title {
    font-size: var(--fs-base);
    font-weight: var(--fw-semibold);
    line-height: 1.35;
    letter-spacing: var(--tracking-tight);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .open {
    color: inherit;
    text-decoration: none;
    outline: none;
  }
  /* The title link covers the whole card; buttons sit above it. */
  .open::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  .rating {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--fs-sm);
  }
  .reviews {
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .colors {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: var(--space-1);
  }
  .dot {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: var(--radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.14);
  }
  .more {
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .buy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    margin-top: auto;
    padding-top: var(--space-2);
  }
  .price {
    min-width: 0;
  }
  /* Out of the flex flow, so the empty live region does not push the button. */
  .live {
    position: absolute;
  }
  .buy :global(.add) {
    position: relative;
    z-index: 2;
    flex: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .product,
    .media :global(img),
    .wish {
      transition: none;
    }
    .interactive:hover,
    .interactive:active,
    .interactive:hover .media :global(img) {
      transform: none;
    }
    .wish.on :global(svg) {
      animation: none;
    }
  }
</style>
