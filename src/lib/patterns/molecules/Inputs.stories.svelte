<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Field from './Field.svelte';
  import SearchField from './SearchField.svelte';
  import SegmentedControl from './SegmentedControl.svelte';
  import StarInput from './StarInput.svelte';
  import TagInput from './TagInput.svelte';
  import ThumbsInput from './ThumbsInput.svelte';
  import Select from '../atoms/Select.svelte';
  import StatusText from '../atoms/StatusText.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Inputs',
    component: SearchField,
    tags: ['autodocs'],
    args: { label: 'Filter the loaded rows', placeholder: 'Filter loaded rows', size: 'sm' },
    argTypes: {
      size: { control: 'inline-radio', options: ['sm', 'lg'] },
      shape: { control: 'inline-radio', options: ['rounded', 'pill'] },
    },
  });
</script>

<script lang="ts">
  let range = $state(30);
  let view = $state('grid');
  let thumbs = $state<'up' | 'down' | null>('up');
  let stars = $state(4);
  let topics = $state(['accessibility', 'returns', 'shipping']);
</script>

<!-- A toolbar filter. Focus lights the border and a soft accent halo. -->
<Story name="SearchField small" />

<!-- A page's main search (see Autocomplete for suggestions). -->
<Story
  name="SearchField large"
  args={{ size: 'lg', label: 'Search', placeholder: 'Products, orders or customers' }}
/>

<!-- Fully rounded, for headers and glass toolbars. -->
<Story
  name="SearchField pill"
  args={{ shape: 'pill', label: 'Search', placeholder: 'Search the workspace' }}
/>

<!-- Keywords of a record: Enter or "," adds, Backspace in the empty field removes the last. -->
<Story name="TagInput" asChild>
  <Stack gap="sm">
    <TagInput label="Topics" placeholder="Add a topic" bind:value={topics} maxWidth="20rem" />
    <StatusText message={JSON.stringify(topics)} />
  </Stack>
</Story>

<!-- One of n in a recessed pill track; the active segment rides on a liquid glass thumb that
     glides to the next choice instead of blinking — so the eye follows the change. A pill,
     because you act on it (shape says what it does). -->
<Story name="SegmentedControl" asChild>
  <SegmentedControl
    label="Time range"
    options={[
      { value: 7, label: '7 days' },
      { value: 30, label: '30 days' },
      { value: 90, label: '90 days' },
      { value: 365, label: '1 year' },
    ]}
    bind:value={range}
  />
</Story>

<!-- Segments with icons; `variant="accent"` fills the thumb with the accent. -->
<Story name="SegmentedControl with icons" asChild>
  <Stack gap="md" align="start">
    <SegmentedControl
      label="View"
      options={[
        { value: 'grid', label: 'Grid', icon: 'grid' },
        { value: 'list', label: 'List', icon: 'list' },
        { value: 'board', label: 'Board', icon: 'kanban' },
      ]}
      bind:value={view}
    />
    <SegmentedControl
      label="View"
      variant="accent"
      options={[
        { value: 'grid', label: 'Grid', icon: 'grid' },
        { value: 'list', label: 'List', icon: 'list' },
        { value: 'board', label: 'Board', icon: 'kanban' },
      ]}
      bind:value={view}
    />
  </Stack>
</Story>

<!-- `full` stretches across its container with equal segments — handy in sheets and phones. -->
<Story name="SegmentedControl full width" asChild>
  <SegmentedControl
    full
    label="Delivery"
    value="standard"
    options={[
      { value: 'pickup', label: 'Pick-up' },
      { value: 'standard', label: 'Standard' },
      { value: 'express', label: 'Express' },
    ]}
  />
</Story>

<!-- A Field gives any control a label (and hint or error). -->
<Story name="Field with label" asChild>
  <Field label="Environment" hint="Where the change goes live">
    {#snippet children({ id })}
      <Select
        {id}
        value="prod"
        options={[
          { value: 'prod', label: 'Production' },
          { value: 'stage', label: 'Staging' },
        ]}
      />
    {/snippet}
  </Field>
</Story>

<!-- Two big buttons; the chosen one becomes the tinted "selected" layer (the same as every other
     selection) and its thumb keeps the vote colour and pops. -->
<Story name="ThumbsInput" asChild>
  <ThumbsInput label="Was this answer helpful?" bind:value={thumbs} />
</Story>

<!-- Hover previews the rating, a click sets it. -->
<Story name="StarInput" asChild>
  <StarInput label="Your rating" bind:value={stars} />
</Story>
