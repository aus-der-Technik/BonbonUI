<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Grid from '../layout/Grid.svelte';
  import Stack from '../layout/Stack.svelte';
  import Icon from './Icon.svelte';
  import Text from './Text.svelte';
  import { iconNames } from './icons';

  const { Story } = defineMeta({
    title: 'Atoms/Icon',
    component: Icon,
    tags: ['autodocs'],
    args: { name: 'search', size: 24 },
    argTypes: { name: { control: 'select', options: iconNames } },
  });
</script>

<Story name="Playground" />

<!-- Every glyph shares the 24×24 grid and one stroke weight; colour comes from `currentColor`. -->
<Story name="All icons" asChild>
  <Grid min="7rem" gap="md">
    {#each iconNames as name (name)}
      <Stack gap="xs" align="center">
        <Icon {name} size={24} />
        <Text size="xs" tone="muted" mono>{name}</Text>
      </Stack>
    {/each}
  </Grid>
</Story>
