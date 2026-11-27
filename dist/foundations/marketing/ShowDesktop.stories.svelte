<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ShowDesktop from './ShowDesktop.svelte';

  // Local only: driven by ?mk=<Component> (see Marketing/README.md).
  const { Story } = defineMeta({
    title: 'Marketing/Desktop',
    component: ShowDesktop,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Show" />
