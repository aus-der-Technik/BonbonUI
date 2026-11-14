<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ShowMolecules from './ShowMolecules.svelte';

  // Local only: driven by ?mk=<Component> (see Marketing/README.md).
  const { Story } = defineMeta({
    title: 'Marketing/Molecules',
    component: ShowMolecules,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Show" />
