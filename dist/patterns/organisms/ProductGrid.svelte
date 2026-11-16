<script lang="ts" module>
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
</script>

<script lang="ts">
  /**
   * ProductGrid organism — a shop's product listing: ProductCards in as many columns as fit
   * (two on a phone), with add-to-cart and wishlist wired per product, and an empty state when
   * a filter leaves nothing. `card` replaces the default card for every product. `onadd` also
   * gets the pressed card's element, so the item can fly from there into the cart.
   *
   *   <ProductGrid products={items} bind:wishlist onadd={(p, card) => cart.add(p.id)} onopen={(p) => …} />
   */
  import type { Snippet } from 'svelte';
  import ProductCard from '../molecules/ProductCard.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import Grid from '../layout/Grid.svelte';
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

  let {
    products,
    wishlist = $bindable(),
    onadd,
    onwishlist,
    onopen,
    min = '15rem',
    columns,
    gap = 'md',
    aspect = '4 / 5',
    currency = 'EUR',
    locale = 'en',
    emptyTitle = 'Nothing found',
    emptyMessage = 'Nothing here — try fewer words or another category.',
    card,
    empty,
  }: Props = $props();

  const hearts = $derived(!!onwishlist || wishlist !== undefined);
  // The list items by product id, so `onadd` can hand over the card that was pressed.
  const cells: Record<string, HTMLLIElement> = {};
  const cardOf = (id: string) => {
    const cell = cells[id];
    return (cell?.firstElementChild as HTMLElement | null) ?? cell;
  };

  function wish(product: Product, on: boolean) {
    const list = wishlist ?? [];
    wishlist = on ? [...list, product.id] : list.filter((id) => id !== product.id);
    onwishlist?.(product, on);
  }
</script>

{#if products.length}
  <!-- Two narrow columns on phones read better than one huge card per row. -->
  <div class="products" style:--card-min={min}>
    <Grid min="var(--_min)" {columns} {gap} as="ul" role="list">
      {#each products as product (product.id)}
        <li class="cell" bind:this={cells[product.id]}>
          {#if card}
            {@render card(product)}
          {:else}
            <ProductCard
              title={product.title}
              price={product.price}
              compareAt={product.compareAt}
              href={product.href}
              image={product.image}
              imageAlt={product.imageAlt ?? ''}
              subtitle={product.subtitle}
              rating={product.rating}
              reviews={product.reviews}
              badge={product.badge}
              colors={product.colors ?? []}
              soldOut={product.soldOut ?? false}
              {aspect}
              {currency}
              {locale}
              onopen={onopen ? () => onopen(product) : undefined}
              onadd={onadd ? () => onadd(product, cardOf(product.id)!) : undefined}
              wishlisted={wishlist?.includes(product.id) ?? false}
              onwishlist={hearts ? (on) => wish(product, on) : undefined}
            />
          {/if}
        </li>
      {/each}
    </Grid>
  </div>
{:else if empty}
  {@render empty()}
{:else}
  <EmptyState icon="search" title={emptyTitle} message={emptyMessage} />
{/if}

<style>
  .products {
    --_min: var(--card-min);
    min-width: 0;
  }
  .cell {
    display: flex;
    min-width: 0;
  }
  .cell > :global(*) {
    flex: 1;
  }
  @media (max-width: 560px) {
    .products {
      --_min: 9.5rem;
    }
  }
</style>
