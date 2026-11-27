<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CombosB from './CombosB.svelte';

  // Local only: driven by ?mk=<nn> (see Marketing/README.md).
  const { Story } = defineMeta({
    title: 'Marketing/Combinations2',
    component: CombosB,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Show" />
