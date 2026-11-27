<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Recipes from './Recipes.svelte';

  const { Story } = defineMeta({
    title: 'Introduction/Recipes',
    component: Recipes,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Recipes" />
