<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from '../layout/Stack.svelte';
  import Stars from './Stars.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Stars',
    component: Stars,
    tags: ['autodocs'],
    args: { value: 4, max: 5 },
    argTypes: { value: { control: { type: 'range', min: 0, max: 5, step: 0.25 } } },
  });
</script>

<Story name="Playground" />

<!-- Averages with the exact figure next to the rounded stars. -->
<Story name="With value" asChild>
  <Stack gap="xs">
    <Stars value={4.5} showValue />
    <Stars value={3.25} showValue />
    <Stars value={0} showValue />
  </Stack>
</Story>
