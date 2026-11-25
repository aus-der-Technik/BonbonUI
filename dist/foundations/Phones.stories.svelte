<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Phones from './Phones.svelte';

  const { Story } = defineMeta({
    title: 'Introduction/On phones',
    component: Phones,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="On phones" />
