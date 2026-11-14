<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ComponentCatalogue from './ComponentCatalogue.svelte';

  const { Story } = defineMeta({
    title: 'Explore/Component catalogue',
    component: ComponentCatalogue,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Component catalogue" />
