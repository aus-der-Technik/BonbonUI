<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ShowAtoms from './ShowAtoms.svelte';

  // Local only: driven by ?mk=<Component> (see Marketing/README.md).
  const { Story } = defineMeta({
    title: 'Marketing/Atoms',
    component: ShowAtoms,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Show" />
