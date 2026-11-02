<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SourceList from './SourceList.svelte';
  import { mailboxes, places } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/SourceList',
    component: SourceList,
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  let value = $state('inbox');
</script>

<!-- Mailboxes with counts; the labelled sections fold. Up / Down move, Enter selects.

     Why tinted glass for the selected item instead of a solid accent bar? Sidebars are read all
     day; a solid bar is the loudest thing in the window. The selected layer (tint wash + rim +
     soft glow) is the same "chosen" signal as everywhere else and keeps the icons' candy
     colours readable on top of it. -->
<Story name="Mailboxes" asChild>
  <div style="max-width:15rem">
    <SourceList sections={mailboxes} bind:value label="Mailboxes" />
  </div>
</Story>

<!-- Places of a file manager, with coloured tags. -->
<Story name="Places" asChild>
  <div style="max-width:15rem">
    <SourceList sections={places} value="documents" label="Places" />
  </div>
</Story>
