<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Grid from '../layout/Grid.svelte';
  import Card from './Card.svelte';
  import Image from './Image.svelte';
  import Price from './Price.svelte';
  import Text from './Text.svelte';

  // Inline pictures, so the stories need no network.
  const art = (a: string, b: string) =>
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><circle cx="290" cy="90" r="46" fill="#fff" opacity=".55"/><path d="M0 240 120 140l90 80 60-50 130 130H0z" fill="#fff" opacity=".35"/></svg>`,
    );
  const products = [
    { name: 'Desk lamp', price: 59, src: art('#ffcc00', '#ff9500') },
    { name: 'Lounge chair', price: 349, compareAt: 429, src: art('#5ac8fa', '#5856d6') },
    { name: 'Plant pot', price: 24, src: art('#34c759', '#00c7be') },
    { name: 'Wall clock', price: 39, src: 'https://example.com/missing.jpg' },
  ];

  const { Story } = defineMeta({
    title: 'Atoms/Image',
    component: Image,
    tags: ['autodocs'],
    args: {
      src: art('#ff2d55', '#af52de'),
      alt: 'Abstract landscape',
      ratio: '16/9',
      radius: 'lg',
    },
    argTypes: {
      fit: { control: 'inline-radio', options: ['cover', 'contain'] },
      radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'card', 'pill'] },
    },
  });
</script>

<Story name="Playground" />

<!-- Product tiles: the box keeps its ratio before the picture loads, so the grid never jumps. A
broken picture shows a quiet placeholder. -->
<Story name="Product grid" asChild>
  <Grid min="11rem">
    {#each products as p (p.name)}
      <Card padding="sm" gap="sm" interactive>
        <Image src={p.src} alt={p.name} ratio="1/1" />
        <Text weight="semibold" truncate>{p.name}</Text>
        <Price amount={p.price} compareAt={p.compareAt} />
      </Card>
    {/each}
  </Grid>
</Story>

<!-- An `overlay` lays a caption over the bottom edge. -->
<Story name="With overlay" asChild>
  <Image src={art('#007aff', '#32ade6')} alt="Lake at dawn" ratio="21/9" radius="card">
    {#snippet overlay()}Lake at dawn · 4 photos{/snippet}
  </Image>
</Story>

<Story
  name="Missing picture"
  args={{ src: null, alt: 'No cover yet', ratio: '4/3', radius: 'md' }}
/>
