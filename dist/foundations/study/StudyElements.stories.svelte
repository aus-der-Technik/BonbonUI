<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StudyElements from './StudyElements.svelte';

  // One chapter of the design study, as a single sidebar entry (the story is named like the page).
  const { Story } = defineMeta({
    title: 'Design study/Element by element',
    component: StudyElements,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Element by element" />
