<script lang="ts">
  import {
    Page,
    NavBar,
    Section,
    ProductGrid,
    CartSummary,
    CartLine,
    Drawer,
    Button,
    type Product,
  } from '../../index';

  const photo = (seed: string) => `https://picsum.photos/seed/${seed}/600/750`;
  const products: Product[] = [
    { id: 'mug', title: 'Stoneware mug', price: 24, image: photo('mug'), rating: 4.8 },
    { id: 'towel', title: 'Linen tea towel', price: 18, image: photo('towel'), badge: 'New' },
    { id: 'vase', title: 'Bud vase', price: 32, compareAt: 40, image: photo('vase') },
    { id: 'bowl', title: 'Serving bowl', price: 46, image: photo('bowl') },
  ];

  let lines = $state([{ id: 'mug', title: 'Stoneware mug', price: 24, quantity: 2 }]);
  let cartOpen = $state(false);
  const count = $derived(lines.reduce((n, l) => n + l.quantity, 0));
  const subtotal = $derived(lines.reduce((sum, l) => sum + l.price * l.quantity, 0));

  function add(p: Product) {
    const line = lines.find((l) => l.id === p.id);
    if (line) line.quantity += 1;
    else lines.push({ id: p.id, title: p.title, price: p.price, quantity: 1 });
  }
</script>

<Page width="wide">
  {#snippet header()}
    <NavBar brand="Example Studio" links={[{ label: 'New in', href: '#new', active: true }]}>
      {#snippet actions()}
        <Button icon="bag" label="Cart ({count})" onclick={() => (cartOpen = true)} />
      {/snippet}
    </NavBar>
  {/snippet}

  <Section title="New in" description="Fresh from the studio">
    <ProductGrid {products} min="11rem" onadd={add} />
  </Section>
</Page>

<Drawer open={cartOpen} title="Your cart" onclose={() => (cartOpen = false)}>
  <CartSummary {subtotal} shipping={4.9}>
    {#each lines as line (line.id)}
      <CartLine
        title={line.title}
        price={line.price}
        bind:quantity={line.quantity}
        onremove={() => (lines = lines.filter((l) => l !== line))}
      />
    {/each}
  </CartSummary>
</Drawer>
