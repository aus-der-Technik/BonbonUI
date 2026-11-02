<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Conventions from './Conventions.svelte';

  const { Story } = defineMeta({
    title: 'Introduction/Conventions',
    component: Conventions,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Conventions" />
