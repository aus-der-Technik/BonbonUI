<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import LayoutGuide from './LayoutGuide.svelte';

  const { Story } = defineMeta({
    title: 'Introduction/Layout',
    component: LayoutGuide,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Layout" />
