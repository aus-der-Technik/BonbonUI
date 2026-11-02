<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stack from '../layout/Stack.svelte';
  import Textarea from './Textarea.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    args: { placeholder: 'What should we improve?', rows: 4, 'aria-label': 'Feedback' },
  });
</script>

<script lang="ts">
  let note = $state('A long text…');
</script>

<Story name="Playground" />

<!-- `maxlength` stops typing at the limit; the counter shows how much is left. -->
<Story
  name="Hard limit"
  args={{ value: 'The search results were great.', maxlength: 2000, counter: true }}
/>

<!-- `limit` is soft: typing past it is allowed, the counter turns red and the field invalid.
`autogrow` grows with the text. -->
<Story name="Soft limit, autogrow" asChild>
  <Stack style="max-width: 32rem">
    <Textarea
      bind:value={note}
      autogrow
      rows={2}
      counter
      limit={50}
      aria-label="Note"
      placeholder="Type past 50 characters"
    />
  </Stack>
</Story>

<!-- `mono` for prompts, templates and code. -->
<Story
  name="Monospace"
  args={{ mono: true, rows: 3, value: 'Summarise {{content}} in three bullet points.' }}
/>
