<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import ShopCheckout from './ShopCheckout.svelte';
  import ShopStorefront from './ShopStorefront.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Shop',
    component: ShopStorefront,
    parameters: { layout: 'fullscreen' },
  });
</script>

<!--
A shop: promo hero, then filters beside a "Fresh picks" `Section` whose eyebrow is the
time-of-day `greeting()`, with category Tabs, sort and the ProductGrid. Below the grid's fold
point the filters close into a Disclosure so products come first on a phone. Open a product for
the detail view with gallery, variants and quantity; the cart opens as a drawer.
-->
<Story name="Storefront" asChild>
  <Application tint="#c0623f">
    <ShopStorefront />
  </Application>
</Story>

<!--
The detail view: a gallery and the buying column side by side (stacked on phones). The tint
shows up only on the price, the chosen variant and "Add to cart".
-->
<Story name="Product detail" asChild>
  <Application tint="#c0623f">
    <ShopStorefront productId="linen-shirt" />
  </Application>
</Story>

<!-- The cart as a Drawer over the shop: CartLines, a free-shipping meter and a discount code. -->
<Story name="Cart drawer" asChild>
  <Application tint="#c0623f">
    <ShopStorefront cartOpen />
  </Application>
</Story>

<!--
Cart → shipping → payment → done; leave the address empty and continue to see validation. The
confirmation is the one place with a success fill — and one burst of `celebrate()` sprinkles.
-->
<Story name="Checkout" asChild>
  <Application tint="#c0623f">
    <ShopCheckout />
  </Application>
</Story>
