<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StudyOverview from './StudyOverview.svelte';

  // One chapter of the design study, as a single sidebar entry (the story is named like the page).
  const { Story } = defineMeta({
    title: 'Design study/Overview',
    component: StudyOverview,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Overview" />
