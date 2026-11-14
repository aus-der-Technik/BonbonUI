<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ShowOrganisms from './ShowOrganisms.svelte';

  // Local only: driven by ?mk=<Component> (see Marketing/README.md).
  const { Story } = defineMeta({
    title: 'Marketing/Organisms',
    component: ShowOrganisms,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Show" />
