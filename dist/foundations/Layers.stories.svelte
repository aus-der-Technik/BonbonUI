<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Layers from './Layers.svelte';

  const { Story } = defineMeta({
    title: 'Introduction/Layers',
    component: Layers,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Layers" />
