<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Light from './Light.svelte';

  const { Story } = defineMeta({
    title: 'Introduction/Light',
    component: Light,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Light" />
