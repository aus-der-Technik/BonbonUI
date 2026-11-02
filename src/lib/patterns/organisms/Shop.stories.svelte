<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CartSummary from './CartSummary.svelte';
  import ProductGallery from './ProductGallery.svelte';
  import ProductGrid from './ProductGrid.svelte';
  import CartLine from '../molecules/CartLine.svelte';
  import Grid from '../layout/Grid.svelte';
  import { applyCode, cartItems, galleryImages, later, products } from '../../demo/mock-shop';

  const { Story } = defineMeta({
    title: 'Organisms/Shop',
    component: ProductGrid,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });
</script>

<script lang="ts">
  let wishlist = $state<string[]>(['merino-crew']);
  let lines = $state(cartItems());
  let rate = $state(0);
  let code = $state<string | undefined>();
  const subtotal = $derived(lines.reduce((sum, l) => sum + l.price * l.quantity, 0));
</script>

<!-- Two columns on phones, as many as fit above. The heart and the cart button are live. -->
<Story name="ProductGrid" asChild>
  <ProductGrid {products} bind:wishlist onadd={() => later()} onopen={() => {}} />
</Story>

<Story name="ProductGrid empty" asChild>
  <ProductGrid products={[]} />
</Story>

<!-- Arrow keys page through while focus is inside; thumbnails jump. -->
<Story name="ProductGallery" asChild>
  <Grid columns="1fr 1fr" collapse="md" gap="xl">
    <ProductGallery images={galleryImages('linen')} />
    <ProductGallery images={galleryImages('mug')} thumbs="side" aspect="4 / 5" />
  </Grid>
</Story>

<!-- Lines as children, the free-shipping bar, and the code "SPRING10" (anything else fails). -->
<Story name="CartSummary" asChild>
  <div style="max-width:28rem">
    <CartSummary
      {subtotal}
      shipping={subtotal >= 150 ? 0 : 4.9}
      discount={rate ? Math.round(subtotal * rate * 100) / 100 : undefined}
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
      note="Secure payment · Free returns within 30 days"
    >
      {#each lines as line (line.id)}
        <CartLine
          title={line.title}
          meta={line.meta}
          price={line.price}
          image={line.image}
          bind:quantity={line.quantity}
          onquantity={() => {}}
          onremove={() => (lines = lines.filter((l) => l.id !== line.id))}
        />
      {/each}
    </CartSummary>
  </div>
</Story>

<!-- Totals only: shipping still unknown, tax listed separately. -->
<Story name="CartSummary totals only" asChild>
  <div style="max-width:24rem">
    <CartSummary subtotal={136} tax={25.84} taxIncluded={false} checkoutHref="#checkout" />
  </div>
</Story>
