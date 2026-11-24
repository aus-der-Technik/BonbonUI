<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Welcome from './Welcome.svelte';

  // The readable chapter: one page per story file, each story named like its file's title so
  // Storybook shows it as a single sidebar entry.
  const { Story } = defineMeta({
    title: 'Introduction/Welcome',
    component: Welcome,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Welcome" />
