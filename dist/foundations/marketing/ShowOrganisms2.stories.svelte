<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ShowOrganisms2 from './ShowOrganisms2.svelte';

  // Local only: driven by ?mk=<Component> (see Marketing/README.md).
  const { Story } = defineMeta({
    title: 'Marketing/Organisms2',
    component: ShowOrganisms2,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Show" />
