<script lang="ts">
  /**
   * Example page: a small online shop — NavBar with a cart count, a promo hero, category tabs,
   * filters in the sidebar, the ProductGrid, a product detail view with gallery, variants and
   * quantity, and the cart in a Drawer with CartSummary (Storybook only).
   */
  import Button from '../patterns/atoms/Button.svelte';
  import Checkbox from '../patterns/atoms/Checkbox.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Price from '../patterns/atoms/Price.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import Stars from '../patterns/atoms/Stars.svelte';
  import CartLine from '../patterns/molecules/CartLine.svelte';
  import CheckboxGroup from '../patterns/molecules/CheckboxGroup.svelte';
  import Disclosure from '../patterns/molecules/Disclosure.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import QuantityStepper from '../patterns/molecules/QuantityStepper.svelte';
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import VariantPicker from '../patterns/molecules/VariantPicker.svelte';
  import CartSummary from '../patterns/organisms/CartSummary.svelte';
  import Drawer from '../patterns/organisms/Drawer.svelte';
  import Hero from '../patterns/organisms/Hero.svelte';
  import NavBar from '../patterns/organisms/NavBar.svelte';
  import ProductGallery from '../patterns/organisms/ProductGallery.svelte';
  import ProductGrid from '../patterns/organisms/ProductGrid.svelte';
  import SiteFooter from '../patterns/organisms/SiteFooter.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { greeting } from '../utils/delight';
  import {
    applyCode,
    cartItems,
    categories,
    galleryImages,
    later,
    legalLinks,
    photo,
    productColors,
    products,
    productSizes,
    shopLinks,
    type CartItem,
    type ShopProduct,
  } from './mock-shop';

  interface Props {
    /** Start with the cart drawer open (for the story). */
    cartOpen?: boolean;
    /** Start on a product's detail view. */
    productId?: string | undefined;
  }

  let { cartOpen = false, productId }: Props = $props();

  // Initial values only: the page keeps its own state after that.
  // svelte-ignore state_referenced_locally
  let open = $state(cartOpen);
  let selected = $state<ShopProduct | undefined>(products.find((p) => p.id === productId));
  let lines = $state<CartItem[]>(cartItems());
  let wishlist = $state<string[]>(['merino-crew']);
  let category = $state('all');
  let sort = $state('featured');
  let brands = $state<string[]>([]);
  let inStock = $state(false);
  let onSale = $state(false);
  let color = $state('sage');
  let size = $state('m');
  let quantity = $state(1);
  let rate = $state(0);
  let code = $state<string | undefined>();
  let width = $state(1440);

  const hello = greeting();
  // Below the grid's fold point the filters close into a disclosure, so products come first.
  const wide = $derived(width > 960);
  const activeFilters = $derived(brands.length + Number(inStock) + Number(onSale));

  const brandOptions = [...new Set(products.map((p) => p.subtitle ?? ''))].map((b) => ({
    value: b,
    label: b,
  }));
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'rating', label: 'Top rated' },
  ];

  const visible = $derived.by(() => {
    const list = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!brands.length || brands.includes(p.subtitle ?? '')) &&
        (!inStock || !p.soldOut) &&
        (!onSale || (p.compareAt ?? 0) > p.price),
    );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  });
  const count = $derived(lines.reduce((n, l) => n + l.quantity, 0));
  const subtotal = $derived(lines.reduce((sum, l) => sum + l.price * l.quantity, 0));
  const discount = $derived(rate ? Math.round(subtotal * rate * 100) / 100 : undefined);
  const related = $derived(products.filter((p) => p.id !== selected?.id).slice(0, 4));

  function add(product: ShopProduct, qty = 1, meta = '') {
    const existing = lines.find((l) => l.id === product.id && l.meta === meta);
    if (existing) existing.quantity += qty;
    else
      lines.push({
        id: product.id,
        title: product.title,
        meta,
        price: product.price,
        quantity: qty,
        image: product.image ?? '',
      });
  }

  function show(product: ShopProduct | undefined) {
    selected = product;
    quantity = 1;
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  }

  const label = (options: { value: string; label: string }[], value: string) =>
    options.find((o) => o.value === value)?.label ?? '';
</script>

<svelte:window bind:innerWidth={width} />

{#snippet filters()}
  <CheckboxGroup label="Brand" options={brandOptions} bind:value={brands} columns={1} />
  <Stack gap="sm">
    <Checkbox label="In stock only" bind:checked={inStock} />
    <Checkbox label="On sale" bind:checked={onSale} />
  </Stack>
{/snippet}

<Page width="wide" gap="xl">
  {#snippet header()}
    <NavBar
      brand="Larkspur Market"
      brandHref="#shop"
      links={shopLinks}
      onnavigate={(_link, event) => {
        event.preventDefault();
        show(undefined);
      }}
    >
      {#snippet logo()}
        <span class="mark"><Icon name="bag" size={17} /></span>
      {/snippet}
      {#snippet actions()}
        <Button variant="ghost" shape="pill" icon="search" label="Search" iconOnly />
        <span class="cart-button">
          <Button
            variant="glass"
            shape="pill"
            icon="cart"
            label="Cart"
            collapse
            onclick={() => (open = true)}
          />
          {#if count}<span class="count" aria-label="{count} items">{count}</span>{/if}
        </span>
      {/snippet}
    </NavBar>
  {/snippet}

  {#if !selected}
    <Hero
      size="md"
      backdrop
      eyebrow="Spring sale"
      title="Light layers for longer days"
      highlight="longer days"
      text="Linen, merino and waxed canvas — up to 25% off until Sunday."
      image={photo('spring-sale', 1200, 900)}
      imageAlt="Folded clothes on a chair"
    >
      {#snippet actions()}
        <Button
          variant="primary"
          shape="pill"
          size="lg"
          label="Shop the sale"
          onclick={() => (onSale = true)}
        />
        <Button variant="glass" shape="pill" size="lg" label="New arrivals" />
      {/snippet}
    </Hero>

    <Grid columns="15rem minmax(0, 1fr)" collapse="lg" gap="lg" align="start">
      {#if wide}
        <Section title="Filter" level="panel" gap="lg">{@render filters()}</Section>
      {:else}
        <Layer level="panel" padding="sm">
          <Disclosure
            title="Filter"
            icon="filter"
            meta={activeFilters ? `${activeFilters} active` : 'Brand, stock, sale'}
          >
            <Stack gap="lg">{@render filters()}</Stack>
          </Disclosure>
        </Layer>
      {/if}

      <Section eyebrow={hello.text} title="Fresh picks for you" gap="lg">
        {#snippet actions()}
          <Select aria-label="Sort by" options={sortOptions} bind:value={sort} />
        {/snippet}
        <Tabs label="Category" variant="pill" tabs={categories} bind:value={category} />
        <ProductGrid
          products={visible}
          bind:wishlist
          min="13.5rem"
          onadd={async (p) => {
            await later(400);
            add(p as ShopProduct);
          }}
          onopen={(p) => show(p as ShopProduct)}
        />
      </Section>
    </Grid>
  {:else}
    <Row>
      <Button
        variant="ghost"
        shape="pill"
        icon="arrow-left"
        label="All products"
        onclick={() => show(undefined)}
      />
    </Row>

    <Grid columns="minmax(0, 1.1fr) minmax(0, 1fr)" collapse="lg" gap="xl" align="start">
      <ProductGallery images={galleryImages(selected.id)} thumbs="side" />

      <Stack gap="lg">
        <Stack gap="sm">
          <p class="brand">{selected.subtitle}</p>
          <h1 class="title">{selected.title}</h1>
          {#if selected.rating}
            <Row gap="xs">
              <Stars value={selected.rating} showValue />
              <span class="muted">({selected.reviews} reviews)</span>
            </Row>
          {/if}
        </Stack>
        <Price amount={selected.price} compareAt={selected.compareAt} size="xl" />
        <p class="description">{selected.description}</p>
        <VariantPicker label="Colour" options={productColors} bind:value={color} />
        <VariantPicker label="Size" options={productSizes} bind:value={size} />
        <Row gap="sm">
          <QuantityStepper bind:value={quantity} size="lg" max={10} />
          <Button
            variant="primary"
            shape="pill"
            size="xl"
            icon="cart"
            label={selected.soldOut ? 'Sold out' : 'Add to cart'}
            disabled={selected.soldOut ?? false}
            onclick={() => {
              if (!selected) return;
              add(
                selected,
                quantity,
                `${label(productColors, color)} · ${label(productSizes, size)}`,
              );
              open = true;
            }}
          />
        </Row>
        <ul class="perks">
          <li><Icon name="truck" size={18} />Free shipping from 150 €</li>
          <li><Icon name="gift" size={18} />Free gift wrap at checkout</li>
          <li><Icon name="refresh" size={18} />30-day returns, no questions asked</li>
        </ul>
      </Stack>
    </Grid>

    <Section title="You may also like">
      <ProductGrid
        products={related}
        bind:wishlist
        min="13rem"
        columns={4}
        onadd={(p) => add(p as ShopProduct)}
        onopen={(p) => show(p as ShopProduct)}
      />
    </Section>
  {/if}

  {#snippet footer()}
    <SiteFooter
      level="ground"
      brand="Larkspur Market"
      tagline="Slow goods for everyday life."
      legal={legalLinks}
      finePrint="© 2026 Larkspur Market · shop@example.com"
    />
  {/snippet}
</Page>

<Drawer
  {open}
  title="Your cart"
  subtitle="{count} items"
  width="28rem"
  onclose={() => (open = false)}
>
  {#if lines.length}
    <CartSummary
      title=""
      level="ground"
      {subtotal}
      shipping={subtotal >= 150 ? 0 : 4.9}
      {discount}
      discountCode={code}
      freeShippingFrom={150}
      ondiscount={async (value) => {
        rate = await applyCode(value);
        code = value.toUpperCase();
      }}
      onremovediscount={() => {
        rate = 0;
        code = undefined;
      }}
      oncheckout={() => later()}
      note="Try the code SPRING10 · Secure payment"
    >
      {#each lines as line, i (line.id + line.meta)}
        <CartLine
          title={line.title}
          meta={line.meta}
          price={line.price}
          image={line.image}
          bind:quantity={line.quantity}
          onquantity={() => {}}
          onremove={() => lines.splice(i, 1)}
        />
      {/each}
    </CartSummary>
  {:else}
    <EmptyState
      icon="cart"
      title="Your cart is feeling light"
      message="Nothing in here yet — find something you love."
    >
      {#snippet action()}
        <Button
          variant="primary"
          shape="pill"
          label="Keep shopping"
          onclick={() => (open = false)}
        />
      {/snippet}
    </EmptyState>
  {/if}
</Drawer>

<style>
  .mark {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 9px;
    color: var(--on-accent);
    background: var(--grad-primary);
    box-shadow: var(--shadow-primary);
  }
  .cart-button {
    position: relative;
    display: inline-flex;
  }
  .count {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 0.3rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-bold);
    line-height: 1.25rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
    color: #fff;
    background: var(--grad-danger);
    box-shadow: 0 0 0 2px var(--glass-strong);
    pointer-events: none;
    animation: bb-pop var(--motion-base) var(--ease-spring);
  }
  .brand {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .title {
    font-size: clamp(1.75rem, 1rem + 2vw, 2.5rem);
    font-weight: var(--fw-bold);
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  .muted {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .description {
    max-width: 40rem;
    font-size: var(--fs-lg);
    line-height: 1.6;
    color: var(--text-2);
  }
  .perks {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding: var(--space-4) 0 0;
    list-style: none;
    border-top: 1px solid var(--border-strong);
    font-size: var(--fs-md);
    color: var(--text-2);
  }
  .perks li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  @media (prefers-reduced-motion: reduce) {
    .count {
      animation: none;
    }
  }
</style>
