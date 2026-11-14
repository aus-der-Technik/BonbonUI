<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Grid from '../layout/Grid.svelte';
  import Row from '../layout/Row.svelte';
  import Swatch from './Swatch.svelte';
  import Text from './Text.svelte';
  import { paletteColors } from './palette';

  const { Story } = defineMeta({
    title: 'Atoms/Swatch',
    component: Swatch,
    tags: ['autodocs'],
    args: { color: 'blue', shape: 'dot', size: 10 },
    argTypes: {
      shape: { control: 'inline-radio', options: ['dot', 'square'] },
      color: { control: 'select', options: [...paletteColors, 'var(--accent)'] },
    },
  });
</script>

<Story name="Playground" />

<!-- The candy palette. Each name resolves to a token, so it adapts to dark mode. -->
<Story name="Palette" asChild>
  <Grid min="8rem" gap="sm">
    {#each paletteColors as color (color)}
      <Row gap="sm"><Swatch {color} size={14} /><Text size="sm" tone="muted">{color}</Text></Row>
    {/each}
  </Grid>
</Story>
