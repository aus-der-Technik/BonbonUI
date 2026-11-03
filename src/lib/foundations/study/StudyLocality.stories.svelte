<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StudyLocality from './StudyLocality.svelte';

  // One chapter of the design study, as a single sidebar entry (the story is named like the page).
  const { Story } = defineMeta({
    title: 'Design study/Act where you look',
    component: StudyLocality,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Act where you look" />
