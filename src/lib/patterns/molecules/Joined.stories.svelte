<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Joined from './Joined.svelte';
  import SearchField from './SearchField.svelte';
  import Button from '../atoms/Button.svelte';
  import Select from '../atoms/Select.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Joined',
    component: Joined,
    tags: ['autodocs'],
    argTypes: {
      size: { control: 'inline-radio', options: ['sm', 'md'] },
      shape: { control: 'inline-radio', options: ['pill', 'rounded'] },
    },
  });
</script>

<script lang="ts">
  let query = $state('');
  let day = $state(new Date(2026, 10, 17));
  const shift = (days: number) => (day = new Date(day.getTime() + days * 86_400_000));
  let sort = $state('newest');
</script>

<!-- A field and the action it belongs to: one capsule, one focus halo for the whole. Type in
     the field: the group lights, not just the field. -->
<Story
  name="Search and new"
  args={{ label: 'Find or start a conversation', size: 'md', shape: 'pill' }}
>
  {#snippet template(args)}
    <Joined label={args.label} size={args.size} shape={args.shape}>
      <SearchField label="Search conversations" bind:value={query} />
      <Button iconOnly icon="message-plus" label="New message" />
    </Joined>
  {/snippet}
</Story>

<!-- A few related actions as one control: ‹ Today ›. A press gives the whole group a little. -->
<Story name="Step through" asChild>
  <Joined label="Change the day">
    <Button iconOnly icon="chevron-left" label="Previous day" onclick={() => shift(-1)} />
    <Button
      label={day.toLocaleDateString('en', { weekday: 'short', day: 'numeric', month: 'short' })}
      onclick={() => (day = new Date(2026, 10, 17))}
    />
    <Button iconOnly icon="chevron-right" label="Next day" onclick={() => shift(1)} />
  </Joined>
</Story>

<!-- The action the group is about stays filled: a whole pill inset in the capsule, its gloss
     ending in its own round ends — never cut off at a hairline. -->
<Story name="With a filled part" asChild>
  <Stack gap="md" align="start">
    <Joined label="New document">
      <Button variant="primary" icon="plus" label="New" />
      <Button iconOnly icon="upload" label="Import" />
      <Button iconOnly icon="grid" label="Cards" />
    </Joined>
    <Joined label="Find a file" full>
      <SearchField label="Search files" bind:value={query} />
      <Button variant="tinted" iconOnly icon="filter" label="Filter" />
    </Joined>
  </Stack>
</Story>

<!-- `sm` (32 px) in a row or a pane's head, `rounded` in forms; `full` takes the width and the
     field grows. Selects join too. -->
<Story name="Sizes and shapes" asChild>
  <Stack gap="md" align="start">
    <Joined label="Sort" size="sm">
      <Select
        aria-label="Sort by"
        size="sm"
        bind:value={sort}
        options={[
          { value: 'newest', label: 'Newest first' },
          { value: 'name', label: 'By name' },
        ]}
      />
      <Button size="sm" iconOnly icon="arrow-down" label="Descending" />
    </Joined>
    <Joined label="Find a person" shape="rounded" full>
      <SearchField label="Search people" shape="rounded" bind:value={query} />
      <Button iconOnly icon="user-plus" label="Invite" />
    </Joined>
  </Stack>
</Story>
