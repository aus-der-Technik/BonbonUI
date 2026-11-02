<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Grid from './Grid.svelte';
  import Demo from '../../foundations/DemoBox.svelte';

  const { Story } = defineMeta({
    title: 'Layout/Grid',
    component: Grid,
    tags: ['autodocs'],
    argTypes: {
      gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
      columns: { control: 'number' },
      min: { control: 'text' },
    },
    args: { min: '12rem', gap: 'md' },
  });
</script>

<!-- As many columns of at least `min` as fit. Resize the canvas. -->
<Story name="Auto columns">
  {#snippet template(args)}
    <Grid {...args}>
      {#each Array.from({ length: 8 }, (_, i) => i + 1) as n (n)}<Demo label="Tile {n}" />{/each}
    </Grid>
  {/snippet}
</Story>

<!-- At most three columns, fewer when the room is narrow. -->
<Story name="Max columns" asChild>
  <Grid columns={3}>
    {#each Array.from({ length: 6 }, (_, i) => i + 1) as n (n)}<Demo label="Card {n}" tall />{/each}
  </Grid>
</Story>

<!-- A literal template; one column below the `collapse` breakpoint. -->
<Story name="Main and side" asChild>
  <Grid columns="2fr 1fr" collapse="lg">
    <Demo label="2fr — the main column" tall />
    <Demo label="1fr — the side column" tall />
  </Grid>
</Story>

<!-- Span a child over two columns with a style. -->
<Story name="Spanning" asChild>
  <Grid columns={4} min="8rem">
    <div style="grid-column: span 2"><Demo label="span 2" tall /></div>
    <Demo label="1" tall /><Demo label="1" tall />
    <Demo label="1" />
    <div style="grid-column: span 3"><Demo label="span 3" /></div>
  </Grid>
</Story>
