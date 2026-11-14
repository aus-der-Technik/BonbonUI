<script lang="ts">
  /**
   * Example page: the storefront of a small shop — NavBar with the cart, a promo hero, the
   * product list with its filters on top of it, a product detail view, and the cart in a Drawer
   * that slides in from the cart button's side (Storybook only; ShopFlow wires it to checkout).
   */
  import Button from '../patterns/atoms/Button.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Price from '../patterns/atoms/Price.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import Stars from '../patterns/atoms/Stars.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import { changeCue, flashChanged } from '../patterns/atoms/changed';
  import CartLine from '../patterns/molecules/CartLine.svelte';
  import CheckboxGroup from '../patterns/molecules/CheckboxGroup.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import QuantityStepper from '../patterns/molecules/QuantityStepper.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import Tabs from '../patterns/molecules/Tabs.svelte';
  import ToggleChip from '../patterns/molecules/ToggleChip.svelte';
  import VariantPicker from '../patterns/molecules/VariantPicker.svelte';
  import CartSummary from '../patterns/organisms/CartSummary.svelte';
  import Drawer from '../patterns/organisms/Drawer.svelte';
  import Hero from '../patterns/organisms/Hero.svelte';
  import NavBar from '../patterns/organisms/NavBar.svelte';
  import ProductGallery from '../patterns/organisms/ProductGallery.svelte';
  import ProductGrid from '../patterns/organisms/ProductGrid.svelte';
  import SiteFooter from '../patterns/organisms/SiteFooter.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { tick } from 'svelte';
  import { greeting } from '../utils/delight';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    FREE_SHIPPING_FROM,
    SHIPPING,
    applyCode,
    categories,
    galleryImages,
    later,
    legalLinks,
    money,
    photo,
    productColors,
    products,
    productSizes,
    shopLinks,
    type CartItem,
    type ShopProduct,
  } from './mock-shop';

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

  let {
    lines = $bindable(),
    code = $bindable(),
    rate = $bindable(0),
    cartOpen = false,
    productId,
    oncheckout,
  }: Props = $props();

  // Initial values only: the page keeps its own state after that.
  // svelte-ignore state_referenced_locally
  let open = $state(cartOpen);
  let selected = $state<ShopProduct | undefined>(products.find((p) => p.id === productId));
  let wishlist = $state<string[]>(['merino-crew']);
  let category = $state('all');
  let sort = $state('featured');
  let query = $state('');
  let brands = $state<string[]>([]);
  let inStock = $state(false);
  let onSale = $state(false);
  let newIn = $state(false);
  let color = $state('sage');
  let size = $state('m');
  let quantity = $state(1);
  let justAdded = $state(false);
  let addedTimer: ReturnType<typeof setTimeout> | undefined;

  let listEl = $state<HTMLElement>();
  let toolbarEl = $state<HTMLElement>();
  let searchEl = $state<HTMLInputElement>();
  let cartEl = $state<HTMLElement>();
  let badgeEl = $state<HTMLElement>();

  const hello = greeting();
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
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!brands.length || brands.includes(p.subtitle ?? '')) &&
        (!inStock || !p.soldOut) &&
        (!onSale || (p.compareAt ?? 0) > p.price) &&
        (!newIn || p.badge === 'New') &&
        (!q || `${p.title} ${p.subtitle} ${p.category}`.toLowerCase().includes(q)),
    );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  });
  const filtered = $derived(
    category !== 'all' || brands.length > 0 || inStock || onSale || newIn || !!query.trim(),
  );
  const count = $derived(lines.reduce((n, l) => n + l.quantity, 0));
  const subtotal = $derived(lines.reduce((sum, l) => sum + l.price * l.quantity, 0));
  const discount = $derived(rate ? Math.round(subtotal * rate * 100) / 100 : undefined);
  const related = $derived(products.filter((p) => p.id !== selected?.id).slice(0, 4));
  const resultLabel = $derived(
    `${visible.length} ${visible.length === 1 ? 'product' : 'products'}`,
  );

  // The nav links are ready-made filters; the one that matches the grid is the active one.
  const links = $derived.by(() => {
    const only = (flag: boolean) => flag && category === 'all' && !brands.length && !query;
    const active: Record<string, boolean> = {
      '#all': !filtered,
      '#new': only(newIn && !onSale && !inStock),
      '#sale': only(onSale && !newIn && !inStock),
      '#knitwear':
        category === 'knitwear' && !onSale && !newIn && !inStock && !brands.length && !query,
      '#home': category === 'home' && !onSale && !newIn && !inStock && !brands.length && !query,
    };
    return shopLinks.map((l) => ({ ...l, active: !selected && !!active[l.href] }));
  });

  function add(product: ShopProduct, qty = 1, meta = '') {
    // A quick add from a card has no variant yet: it joins a line of the same product if any.
    const existing = lines.find((l) => l.id === product.id && (!meta || l.meta === meta));
    if (existing) existing.quantity += qty;
    else
      lines.push({
        id: product.id,
        title: product.title,
        meta,
        price: product.price,
        quantity: qty,
        image: photo(product.id, 200, 200),
      });
  }

  /** The item travels from where it was added to the cart button, then the count bumps. */
  function fly(from: Element | null | undefined, image: string | undefined) {
    const bump = () => {
      if (!badgeEl) return;
      badgeEl.style.animation = 'none';
      void badgeEl.offsetWidth;
      badgeEl.style.animation = '';
    };
    const start = from?.getBoundingClientRect();
    const end = cartEl?.getBoundingClientRect();
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!start || !end || !image || still || !start.width) return void tick().then(bump);
    const side = Math.min(start.width, start.height, 160);
    const ghost = document.createElement('img');
    ghost.src = image;
    ghost.alt = '';
    ghost.className = 'shop-flying';
    ghost.style.width = ghost.style.height = `${side}px`;
    document.body.append(ghost);
    const x0 = start.left + start.width / 2 - side / 2;
    const y0 = start.top + start.height / 2 - side / 2;
    const x1 = end.left + end.width / 2 - side / 2;
    const y1 = end.top + end.height / 2 - side / 2;
    // A short arc: up first, then down into the cart.
    const lift = Math.min(120, Math.abs(y0 - y1) / 2 + 40);
    const animation = ghost.animate(
      [
        { transform: `translate(${x0}px, ${y0}px) scale(1)`, opacity: 1 },
        {
          transform: `translate(${(x0 + x1) / 2}px, ${Math.min(y0, y1) - lift}px) scale(0.55)`,
          opacity: 1,
          offset: 0.55,
        },
        { transform: `translate(${x1}px, ${y1}px) scale(0.12)`, opacity: 0.4 },
      ],
      { duration: 680, easing: 'cubic-bezier(0.45, 0, 0.25, 1)' },
    );
    animation.onfinish = () => {
      ghost.remove();
      bump();
    };
  }

  async function show(product: ShopProduct | undefined) {
    selected = product;
    quantity = 1;
    justAdded = false;
    await tick();
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  }

  /** Brings the product list into view and lights up the part that changed. */
  async function reveal(cue?: Element | null) {
    if (selected) selected = undefined;
    await tick();
    listEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (cue instanceof HTMLElement) flashChanged(cue);
  }

  function chip(name: string) {
    return toolbarEl?.querySelector(`[data-chip="${name}"]`);
  }

  function reset() {
    category = 'all';
    brands = [];
    inStock = onSale = newIn = false;
    query = '';
  }

  function navigate(href: string) {
    reset();
    if (href === '#new') newIn = true;
    if (href === '#sale') onSale = true;
    if (href === '#knitwear' || href === '#home') category = href.slice(1);
    const cue = href === '#new' ? 'new' : href === '#sale' ? 'sale' : 'tabs';
    void reveal(chip(cue));
  }

  async function search() {
    await reveal();
    searchEl?.focus({ preventScroll: true });
    if (searchEl?.parentElement) flashChanged(searchEl.parentElement);
  }

  const label = (options: { value: string; label: string }[], value: string) =>
    options.find((o) => o.value === value)?.label ?? '';

  const notes: DesignNote[] = [
    {
      principle: 'locality',
      title: 'Added answers on the card',
      body: 'The plus turns into a check right where you pressed it, and the product flies to the cart. No toast in a far corner has to tell you it worked.',
      target: '[data-note="grid"]',
    },
    {
      principle: 'cues',
      title: 'The cart count bumps when the item lands',
      body: 'The count is a quantity, not an alarm, so it wears the accent colour — and it pops the moment the flying item arrives, linking cause and effect.',
      target: '[data-note="cart"]',
    },
    {
      principle: 'locality',
      title: 'Filters sit on the list they filter',
      body: 'Category, quick filters, brand, search and sort live on top of the product grid. “Shop the sale” scrolls you there and lights up the chip it switched on.',
      target: '[data-note="toolbar"]',
    },
    {
      principle: 'function',
      title: 'Nav links are honest shortcuts',
      body: 'Each link is a saved filter of the same grid, and the active link always matches what the grid shows — there is no page that looks different from its tab.',
      target: '[data-note="nav"]',
    },
    {
      principle: 'cues',
      title: 'The cart slides in from the cart button’s side',
      body: 'The drawer comes from the edge where you asked for it, so the eye never has to search for where the cart went.',
      target: '[data-note="cart"]',
    },
    {
      principle: 'friendly',
      title: 'An empty result offers a way out',
      body: 'When filters leave nothing, the grid says so in plain words and offers to clear them, right where the products were.',
      target: '[data-note="toolbar"]',
    },
  ];
</script>

<svelte:document
  onvisibilitychange={() => {
    // Keep the flying pictures from piling up in a hidden tab.
    if (document.hidden) document.querySelectorAll('.shop-flying').forEach((n) => n.remove());
  }}
/>

{#snippet mark()}
  <span class="mark"><Icon name="bag" size={17} /></span>
{/snippet}

<Page width="wide" gap="xl">
  {#snippet header()}
    <div data-note="nav">
      <NavBar
        brand="Example Goods"
        brandHref="#all"
        logo={mark}
        {links}
        onnavigate={(link, event) => {
          event.preventDefault();
          navigate(link.href);
        }}
      >
        {#snippet actions()}
          <Button
            variant="ghost"
            shape="pill"
            icon="search"
            label="Search products"
            iconOnly
            onclick={search}
          />
          <span class="cart-button" bind:this={cartEl} data-note="cart">
            <Button
              variant="glass"
              shape="pill"
              icon="cart"
              label="Cart"
              aria-label={count ? `Cart, ${count} ${count === 1 ? 'item' : 'items'}` : 'Cart'}
              collapse
              onclick={() => (open = true)}
            />
            {#if count}
              <span class="count" bind:this={badgeEl} aria-hidden="true">{count}</span>
            {/if}
          </span>
        {/snippet}
      </NavBar>
    </div>
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
          icon="arrow-down"
          onclick={() => {
            reset();
            onSale = true;
            void reveal(chip('sale'));
          }}
        />
        <Button
          variant="glass"
          shape="pill"
          size="lg"
          label="New arrivals"
          onclick={() => {
            reset();
            newIn = true;
            void reveal(chip('new'));
          }}
        />
      {/snippet}
    </Hero>

    <section class="list" bind:this={listEl} aria-label="Products">
      <Section eyebrow={hello.text} title="Fresh picks for you" gap="lg">
        <div class="toolbar" bind:this={toolbarEl} data-note="toolbar">
          <div class="toolbar-top">
            <span class="cue" data-chip="tabs">
              <Tabs label="Category" variant="pill" tabs={categories} bind:value={category} />
            </span>
            <span class="search">
              <SearchField
                label="Search products"
                placeholder="Search products"
                shape="pill"
                bind:value={query}
                bind:element={searchEl}
              />
            </span>
            <Select aria-label="Sort by" options={sortOptions} bind:value={sort} />
          </div>
          <Row gap="xs" wrap>
            <span class="cue" data-chip="new">
              <ToggleChip
                label="New in"
                icon="sparkles"
                pressed={newIn}
                onchange={(on) => (newIn = on)}
              />
            </span>
            <span class="cue" data-chip="sale">
              <ToggleChip
                label="On sale"
                icon="tag"
                pressed={onSale}
                onchange={(on) => (onSale = on)}
              />
            </span>
            <ToggleChip label="In stock" pressed={inStock} onchange={(on) => (inStock = on)} />
            <Popover
              label={brands.length ? `Brand · ${brands.length}` : 'Brand'}
              icon="filter"
              variant="glass"
              size="sm"
              placement="bottom-start"
              width="16rem"
              padding="md"
            >
              <CheckboxGroup label="Brand" options={brandOptions} bind:value={brands} columns={1} />
            </Popover>
            {#each brands as brand (brand)}
              <Tag
                label={brand}
                removeLabel="Remove {brand}"
                onremove={() => (brands = brands.filter((b) => b !== brand))}
              />
            {/each}
            <Spacer />
            <span class="result" use:changeCue={visible.length} aria-live="polite"
              >{resultLabel}</span
            >
            {#if filtered}
              <Button size="sm" variant="ghost" shape="pill" label="Clear" onclick={reset} />
            {/if}
          </Row>
        </div>

        <div data-note="grid">
          <ProductGrid
            products={visible}
            bind:wishlist
            min="14rem"
            columns={4}
            locale="en"
            onadd={async (p, card) => {
              const from = card.querySelector('.media');
              await later(400);
              add(p as ShopProduct);
              fly(from, p.image);
            }}
            onopen={(p) => show(p as ShopProduct)}
          >
            {#snippet empty()}
              <EmptyState
                icon="search"
                title="Nothing matches all of that"
                message="Loosen a filter or two — or start from everything again."
              >
                {#snippet action()}
                  <Button
                    variant="primary"
                    shape="pill"
                    label="Show all products"
                    onclick={reset}
                  />
                {/snippet}
              </EmptyState>
            {/snippet}
          </ProductGrid>
        </div>
      </Section>
    </section>
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
        <div class="buy">
          <QuantityStepper bind:value={quantity} size="lg" max={10} label="Quantity" />
          <Button
            variant={justAdded ? 'success' : 'primary'}
            shape="pill"
            size="xl"
            icon={justAdded ? 'check' : 'cart'}
            label={selected.soldOut ? 'Sold out' : justAdded ? 'Added to cart' : 'Add to cart'}
            disabled={selected.soldOut ?? false}
            onclick={() => {
              if (!selected) return;
              add(
                selected,
                quantity,
                `${label(productColors, color)} · ${label(productSizes, size)}`,
              );
              fly(document.querySelector('.gallery .stage'), selected.image);
              justAdded = true;
              clearTimeout(addedTimer);
              addedTimer = setTimeout(() => (justAdded = false), 2400);
            }}
          />
        </div>
        {#if justAdded}
          <p class="added" role="status">
            <Icon name="check-circle" size={16} />
            {quantity} × {selected.title} is in your cart.
            <button type="button" class="link" onclick={() => (open = true)}>View cart</button>
          </p>
        {/if}
        <ul class="perks">
          <li><Icon name="truck" size={18} />Free shipping from {money(FREE_SHIPPING_FROM)}</li>
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
        locale="en"
        onadd={async (p, card) => {
          const from = card.querySelector('.media');
          await later(400);
          add(p as ShopProduct);
          fly(from, p.image);
        }}
        onopen={(p) => show(p as ShopProduct)}
      />
    </Section>
  {/if}

  {#snippet footer()}
    <SiteFooter
      level="ground"
      brand="Example Goods"
      logo={mark}
      tagline="Slow goods for everyday life."
      legal={legalLinks}
      finePrint="© 2026 Example Goods · shop@example.com"
    />
  {/snippet}
</Page>

<Drawer
  {open}
  title="Your cart"
  subtitle={count ? `${count} ${count === 1 ? 'item' : 'items'}` : 'Empty'}
  width="28rem"
  onclose={() => (open = false)}
>
  {#if lines.length}
    <CartSummary
      title=""
      level="ground"
      locale="en"
      {subtotal}
      shipping={subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING}
      {discount}
      discountCode={code}
      freeShippingFrom={FREE_SHIPPING_FROM}
      ondiscount={async (value) => {
        rate = await applyCode(value);
        code = value.toUpperCase();
      }}
      onremovediscount={() => {
        rate = 0;
        code = undefined;
      }}
      checkoutLabel="Go to checkout"
      oncheckout={async () => {
        await later(300);
        open = false;
        oncheckout?.();
      }}
      note="Try the code SPRING10 · Secure payment"
    >
      {#each lines as line, i (line.id + line.meta)}
        <CartLine
          title={line.title}
          meta={line.meta}
          price={line.price}
          image={line.image}
          locale="en"
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

<DesignNotes title="Shop" {notes} corner="bottom-left" />

<style>
  .mark {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-md);
    color: var(--on-accent);
    background: var(--grad-primary);
    box-shadow: var(--shadow-primary);
  }
  .cart-button {
    position: relative;
    display: inline-flex;
  }
  /* A count, not an alert: it wears the accent and pops when an item lands. */
  .count {
    position: absolute;
    top: calc(var(--space-1) * -1);
    right: calc(var(--space-1) * -1);
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 var(--space-1);
    border-radius: var(--radius-pill);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-bold);
    line-height: 1.25rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
    color: var(--on-accent);
    background: var(--grad-primary);
    box-shadow:
      0 0 0 2px var(--glass-strong),
      var(--shadow-primary);
    pointer-events: none;
    animation: bb-pop var(--motion-base) var(--ease-spring);
  }
  .list {
    scroll-margin-top: calc(var(--control-xl) + var(--space-8));
  }
  .toolbar-top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-3);
  }
  .toolbar-top .cue {
    margin-right: auto;
  }
  .search {
    display: flex;
    flex: 1 1 12rem;
    max-width: 18rem;
  }
  .search > :global(*) {
    flex: 1;
  }
  .toolbar {
    display: grid;
    gap: var(--space-3);
  }
  .cue {
    display: inline-flex;
    width: fit-content;
    border-radius: var(--radius-pill);
  }
  .result {
    padding: 0 var(--space-2);
    border-radius: var(--radius-pill);
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
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
    letter-spacing: var(--tracking-tight);
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
  .buy {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }
  .added {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    color: var(--text-2);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .added :global(svg) {
    color: var(--ok);
  }
  .link {
    padding: 0;
    border: 0;
    background: none;
    color: var(--accent-ink);
    font: inherit;
    font-weight: var(--fw-semibold);
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
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
  /* The picture that travels from the product to the cart (created outside this component). */
  :global(.shop-flying) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--z-toast);
    object-fit: cover;
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-pop);
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .count,
    .added {
      animation: none;
    }
  }
</style>
