<script lang="ts">
  /**
   * Example: the whole shop as one flow — storefront, product detail and cart drawer, then the
   * checkout steps and the confirmation, and back to the shop. The cart and the discount code
   * live here so both screens share them (Storybook only).
   */
  import { tick } from 'svelte';
  import ShopCheckout from './ShopCheckout.svelte';
  import ShopStorefront from './ShopStorefront.svelte';
  import { cartItems, type CartItem } from './mock-shop';

  interface Props {
    /** Start on this product's detail view. */
    productId?: string | undefined;
    /** Start with the cart drawer open. */
    cartOpen?: boolean;
  }

  let { productId, cartOpen = false }: Props = $props();

  let view = $state<'shop' | 'checkout'>('shop');
  let lines = $state<CartItem[]>(cartItems());
  let code = $state<string | undefined>();
  let rate = $state(0);
  // The story's args only set where the flow starts.
  // svelte-ignore state_referenced_locally
  let startProduct = $state(productId);
  // svelte-ignore state_referenced_locally
  let startCart = $state(cartOpen);

  async function goto(next: 'shop' | 'checkout') {
    view = next;
    startProduct = undefined;
    startCart = false;
    await tick();
    window.scrollTo?.({ top: 0 });
  }
</script>

{#if view === 'shop'}
  <ShopStorefront
    bind:lines
    bind:code
    bind:rate
    productId={startProduct}
    cartOpen={startCart}
    oncheckout={() => goto('checkout')}
  />
{:else}
  <ShopCheckout
    bind:lines
    bind:code
    bind:rate
    onshop={() => goto('shop')}
    onplaced={() => {
      lines = [];
      code = undefined;
      rate = 0;
    }}
  />
{/if}
