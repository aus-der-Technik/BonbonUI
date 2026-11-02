<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CartLine from './CartLine.svelte';
  import CheckoutSteps from './CheckoutSteps.svelte';
  import ProductCard from './ProductCard.svelte';
  import QuantityStepper from './QuantityStepper.svelte';
  import VariantPicker from './VariantPicker.svelte';
  import Button from '../atoms/Button.svelte';
  import Card from '../atoms/Card.svelte';
  import Grid from '../layout/Grid.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import { later, photo, productColors, productSizes } from '../../demo/mock-shop';

  const { Story } = defineMeta({
    title: 'Molecules/Commerce',
    component: ProductCard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
      title: 'Relaxed linen shirt',
      subtitle: 'Larkspur Studio',
      price: 59,
      compareAt: 79,
      rating: 4.6,
      reviews: 128,
      colors: ['#9bb59a', '#e3d5bd', '#2f3640', '#8fb3d9'],
      image: photo('linen-shirt'),
      imageAlt: 'Linen shirt on a hanger',
      href: '#product',
      soldOut: false,
      onadd: () => later(),
      onwishlist: () => {},
    },
  });
</script>

<script lang="ts">
  let quantity = $state(2);
  let color = $state('sage');
  let size = $state('m');
  let step = $state(1);
  let lines = $state([
    { id: 'a', title: 'Relaxed linen shirt', meta: 'Sage · M', price: 59, quantity: 1 },
    { id: 'b', title: 'Speckled ceramic mug', meta: 'Sky', price: 18, quantity: 2 },
  ]);
</script>

<!-- Every control in the panel works. -->
<Story name="Playground">
  {#snippet template(args)}
    <div style="max-width:17rem"><ProductCard {...args} /></div>
  {/snippet}
</Story>

<!-- Discount badge from `compareAt`, an own badge, sold out, and no picture (placeholder). -->
<Story name="ProductCard states" asChild>
  <Grid min="13rem">
    <ProductCard
      title="Merino crew knit"
      price={89}
      badge="Bestseller"
      rating={4.8}
      reviews={342}
      image={photo('merino-crew')}
      href="#"
      onadd={() => later()}
      onwishlist={() => {}}
      wishlisted
    />
    <ProductCard
      title="Corduroy overshirt"
      price={74}
      compareAt={99}
      image={photo('cord-overshirt')}
      href="#"
      onadd={() => later()}
    />
    <ProductCard
      title="Chunky cable cardigan"
      price={119}
      soldOut
      image={photo('cable-cardigan')}
      href="#"
      onadd={() => later()}
    />
    <ProductCard title="Gift card" price={50} badge="Digital" onadd={() => later()} />
  </Grid>
</Story>

<!-- Arrow keys step, Page Up/Down by ten, Home/End to the limits; type a number and press Enter.
     The figure rolls in the direction of the step and pushing past a limit gets a polite
     head-shake — feedback you can feel. No sprinkles: changing a number is not a finish line. -->
<Story name="QuantityStepper" asChild>
  <Row gap="lg">
    <QuantityStepper bind:value={quantity} max={10} />
    <QuantityStepper value={1} size="sm" />
    <QuantityStepper value={3} size="lg" min={0} />
    <QuantityStepper value={1} disabled />
  </Row>
</Story>

<!-- Colour swatches and size pills, both radio groups; sold-out options are skipped. -->
<Story name="VariantPicker" asChild>
  <Stack gap="lg">
    <VariantPicker label="Colour" options={productColors} bind:value={color} />
    <VariantPicker label="Size" options={productSizes} bind:value={size} />
  </Stack>
</Story>

<!-- Lines inside a card; they lay themselves out compactly when the card is narrow. -->
<Story name="CartLine" asChild>
  <Grid columns="2fr 1fr" collapse="lg" gap="lg">
    <Card>
      {#each lines as line (line.id)}
        <CartLine
          title={line.title}
          meta={line.meta}
          price={line.price}
          image={photo(line.id === 'a' ? 'linen-shirt' : 'ceramic-mug', 200, 200)}
          bind:quantity={line.quantity}
          onquantity={() => {}}
          onremove={() => (lines = lines.filter((l) => l.id !== line.id))}
        />
      {/each}
    </Card>
    <Card>
      <CartLine title="Relaxed linen shirt" meta="Sage · M" price={59} quantity={2} />
      <CartLine title="Speckled ceramic mug" meta="Sky" price={18} quantity={1} />
    </Card>
  </Grid>
</Story>

<!-- The Stepper preset for checkouts; finished steps go back with `onstep`. -->
<Story name="CheckoutSteps" asChild>
  <Stack gap="lg">
    <CheckoutSteps current={step} onstep={(i) => (step = i)} />
    <Row>
      <Button label="Back" disabled={step === 0} onclick={() => (step = Math.max(0, step - 1))} />
      <Button
        variant="primary"
        label="Next"
        disabled={step === 3}
        onclick={() => (step = Math.min(3, step + 1))}
      />
    </Row>
  </Stack>
</Story>
