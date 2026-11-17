<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import GettingStarted from './GettingStarted.svelte';

  const { Story } = defineMeta({
    title: 'Introduction/Getting started',
    component: GettingStarted,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Getting started" />
