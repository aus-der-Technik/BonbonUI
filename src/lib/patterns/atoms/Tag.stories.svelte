<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import Tag from './Tag.svelte';
  import { paletteColors } from './palette';

  const { Story } = defineMeta({
    title: 'Atoms/Tag',
    component: Tag,
    tags: ['autodocs'],
    args: { label: 'Leipzig', name: 'City', tone: 'neutral' },
    argTypes: {
      tone: {
        control: 'select',
        options: ['neutral', 'ok', 'warn', 'danger', 'info', 'accent', ...paletteColors],
      },
    },
  });
</script>

<script lang="ts">
  let filters = $state(['Leipzig', 'Capacity ≥ 300', 'Barrier-free']);
</script>

<!-- A tag is a pill because it is something you can act on (filter, remove, open). Clickable tags
squish when pressed, like buttons. -->
<Story name="Playground" />

<!-- Applied filters you can remove one by one. -->
<Story name="Removable" asChild>
  <Row gap="xs">
    {#each filters as filter (filter)}
      <Tag
        label={filter}
        tone="accent"
        onremove={() => (filters = filters.filter((f) => f !== filter))}
      />
    {/each}
  </Row>
</Story>

<!-- Key/value tags for attributes. -->
<Story name="Key and value" asChild>
  <Row gap="xs">
    <Tag name="Type" label="Venue" />
    <Tag name="City" label="Leipzig" />
    <Tag name="Capacity" label="300" />
  </Row>
</Story>

<!-- Categories in candy colours, with or without a colour dot. -->
<Story name="Categories" asChild>
  <Stack gap="sm">
    <Row gap="xs">
      <Tag label="Design" tone="pink" />
      <Tag label="Engineering" tone="blue" />
      <Tag label="Marketing" tone="orange" />
      <Tag label="Research" tone="purple" />
      <Tag label="Support" tone="teal" />
    </Row>
    <Row gap="xs">
      <Tag label="Design" color="pink" />
      <Tag label="Engineering" color="blue" />
      <Tag label="Marketing" color="orange" />
    </Row>
  </Stack>
</Story>

<!-- Link chips cut long labels and keep the full text in the tooltip; ids in `mono`; status tones. -->
<Story name="Links, ids and status" asChild>
  <Stack gap="sm">
    <Row gap="xs">
      <Tag
        label="Venue guide — rooms, capacities and floor plans"
        href="https://example.com/guide"
        external
      />
      <Tag label="search_profiles" mono count={3} />
      <Tag label="geocode" mono count="2 failed" tone="danger" title="Timed out twice" />
    </Row>
    <Row gap="xs">
      <Tag label="sustainability" onclick={() => {}} />
      <Tag label="public" tone="ok" />
      <Tag label="members" tone="warn" />
      <Tag label="internal" tone="info" />
    </Row>
  </Stack>
</Story>
