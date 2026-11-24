<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MotionLab from './MotionLab.svelte';

  const { Story } = defineMeta({
    title: 'Explore/Motion & light lab',
    component: MotionLab,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Motion & light lab" />
