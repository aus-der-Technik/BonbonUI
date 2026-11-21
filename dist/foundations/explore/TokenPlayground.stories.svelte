<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TokenPlayground from './TokenPlayground.svelte';

  const { Story } = defineMeta({
    title: 'Explore/Token playground',
    component: TokenPlayground,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Token playground" />
