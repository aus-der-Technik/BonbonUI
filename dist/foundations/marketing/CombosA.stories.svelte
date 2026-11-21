<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CombosA from './CombosA.svelte';

  // Local only: driven by ?mk=<nn> (see Marketing/README.md).
  const { Story } = defineMeta({
    title: 'Marketing/Combinations',
    component: CombosA,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Show" />
