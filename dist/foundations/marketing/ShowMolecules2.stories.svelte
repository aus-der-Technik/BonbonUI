<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ShowMolecules2 from './ShowMolecules2.svelte';

  // Local only: driven by ?mk=<Component> (see Marketing/README.md).
  const { Story } = defineMeta({
    title: 'Marketing/Molecules2',
    component: ShowMolecules2,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Show" />
