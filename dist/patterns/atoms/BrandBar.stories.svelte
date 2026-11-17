<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import BrandBar from './BrandBar.svelte';
  import Heading from './Heading.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/BrandBar',
    component: BrandBar,
    tags: ['autodocs'],
    args: { height: 26 },
  });
</script>

<Story name="Default" />

<!-- In front of an app title; it follows the tint unless `color` is set. -->
<Story name="With a title" asChild>
  <Row gap="sm">
    <BrandBar height={30} />
    <Heading level={1} size="3xl">Orders</Heading>
  </Row>
</Story>

<Story name="Colours" asChild>
  <Row>
    <BrandBar color="pink" />
    <BrandBar color="orange" />
    <BrandBar color="indigo" />
    <BrandBar color="mint" />
  </Row>
</Story>
