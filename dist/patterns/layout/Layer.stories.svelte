<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Layer from './Layer.svelte';
  import Grid from './Grid.svelte';
  import Spacer from './Spacer.svelte';
  import Stack from './Stack.svelte';
  import Button from '../atoms/Button.svelte';

  const { Story } = defineMeta({
    title: 'Layout/Layer',
    component: Layer,
    tags: ['autodocs'],
    argTypes: {
      level: { control: 'inline-radio', options: ['ground', 'panel', 'selected', 'front'] },
      direction: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
      shape: { control: 'inline-radio', options: ['card', 'pill', 'rounded', 'square'] },
    },
    args: { level: 'panel' },
  });
</script>

<!-- Switch the level to see the four surfaces. -->
<Story name="Playground">
  {#snippet template(args)}
    <Layer {...args}>
      <strong>A {args.level} layer</strong>
      <span style:color="var(--text-2)">It lays out its own children — no wrapper needed.</span>
    </Layer>
  {/snippet}
</Story>

<!-- The four layers side by side. -->
<Story name="All four" asChild>
  <Grid min="12rem">
    <Layer level="ground"><strong>Ground</strong><span>on the backdrop</span></Layer>
    <Layer level="panel"><strong>Panel</strong><span>frosted glass</span></Layer>
    <Layer level="selected"><strong>Selected</strong><span>tinted glass</span></Layer>
    <Layer level="front"><strong>Front</strong><span>liquid glass, sticky</span></Layer>
  </Grid>
</Story>

<!-- A front toolbar sticks under the header; a bottom one sticks to the bottom. Scroll the canvas. -->
<Story name="Sticky front bars" asChild>
  <Stack gap="md">
    <Layer level="front" direction="horizontal" gap="sm">
      <Button size="sm" variant="ghost" shape="pill" label="All" />
      <Button size="sm" variant="ghost" shape="pill" label="Open" />
      <Spacer />
      <Button size="sm" variant="ghost" shape="pill" icon="filter" label="Filter" />
    </Layer>
    {#each Array.from({ length: 14 }, (_, i) => i + 1) as n (n)}
      <Layer level={n === 3 ? 'selected' : 'panel'}>Row {n}</Layer>
    {/each}
    <Layer level="front" edge="bottom" direction="horizontal">
      <strong>3 selected</strong>
      <Spacer />
      <Button size="sm" variant="danger-solid" shape="pill" label="Delete" />
    </Layer>
  </Stack>
</Story>
