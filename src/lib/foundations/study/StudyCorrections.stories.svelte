<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StudyCorrections from './StudyCorrections.svelte';

  // One chapter of the design study, as a single sidebar entry (the story is named like the page).
  const { Story } = defineMeta({
    title: 'Design study/Corrections',
    component: StudyCorrections,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } },
  });
</script>

<Story name="Corrections" />
