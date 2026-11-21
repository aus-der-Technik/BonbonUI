<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ColourTint from './ColourTint.svelte';

  const { Story } = defineMeta({
    title: 'Introduction/Colour & tint',
    component: ColourTint,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Colour & tint" />
