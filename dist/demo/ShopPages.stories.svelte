<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { storyTint } from './tint';
  import Application from '../patterns/templates/Application.svelte';
  import ShopFlow from './ShopFlow.svelte';
  import { products } from './mock-shop';

  const { Story } = defineMeta({
    title: 'Pages/Shop',
    component: ShopFlow,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      productId: {
        control: 'select',
        options: [undefined, ...products.map((p) => p.id)],
        description: 'Start on this product’s detail view.',
      },
      cartOpen: { control: 'boolean', description: 'Start with the cart drawer open.' },
    },
  });
</script>

<!--
The whole shop in one flow. The storefront: a promo hero, then the product list with its filters
on top (category tabs, quick chips, brand, search, sort). "Shop the sale" and the nav links are
ready-made filters that scroll the list into view and light up what they switched on. Add a
product and it answers on its card, flies to the cart and bumps the count. Open a product for
gallery, variants and quantity; open the cart drawer and "Go to checkout" for the steps
cart → shipping → payment → done (leave fields empty to see the errors at the field). The
confirmation celebrates once and leads back to the shop. `productId` and `cartOpen` choose where
the flow starts.
-->
<Story name="Shop" args={{ productId: undefined, cartOpen: false }}>
  {#snippet template(args, context)}
    <Application tint={storyTint(context, '#c0623f')}>
      {#key `${args.productId}-${args.cartOpen}`}
        <ShopFlow productId={args.productId} cartOpen={args.cartOpen ?? false} />
      {/key}
    </Application>
  {/snippet}
</Story>
