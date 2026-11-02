<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from '../layout/Stack.svelte';
  import Radio from './Radio.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Radio',
    component: Radio,
    tags: ['autodocs'],
    args: { name: 'demo', value: 'a', label: 'Standard delivery', description: '3–5 working days' },
  });
</script>

<script lang="ts">
  let shipping = $state('standard');
</script>

<!-- Choosing an option fills the circle with the accent and pops the centre dot in with a small
spring. A circle on purpose: in the shape grammar circles mean state or identity. -->
<Story name="Playground" />

<!-- Bind every radio to the same value with `bind:group` (never `checked`). For a labelled group
with keyboard roving, use RadioGroup. -->
<Story name="Group" asChild>
  <Stack gap="sm">
    <Radio
      name="shipping"
      value="standard"
      label="Standard"
      description="3–5 working days · free"
      bind:group={shipping}
    />
    <Radio
      name="shipping"
      value="express"
      label="Express"
      description="Next working day · 9,90 €"
      bind:group={shipping}
    />
    <Radio
      name="shipping"
      value="pickup"
      label="Pick up in store"
      description="Not available for this order"
      disabled
      bind:group={shipping}
    />
  </Stack>
</Story>
