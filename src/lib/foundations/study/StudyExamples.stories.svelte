<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StudyExamples from './StudyExamples.svelte';

  // One chapter of the design study, as a single sidebar entry (the story is named like the page).
  const { Story } = defineMeta({
    title: 'Design study/The examples',
    component: StudyExamples,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="The examples" />
