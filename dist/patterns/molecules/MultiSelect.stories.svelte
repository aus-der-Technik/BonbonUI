<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MultiSelect, { type MultiGroup } from './MultiSelect.svelte';
  import { starLabel } from '../../utils/format';

  const ratings: MultiGroup[] = [
    {
      label: 'Thumbs',
      options: [
        { value: 'up', label: 'Thumbs up' },
        { value: 'down', label: 'Thumbs down' },
      ],
    },
    {
      label: 'Stars',
      options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: starLabel(n), stars: n })),
    },
  ];

  const channels: MultiGroup[] = [
    {
      options: ['Web shop', 'Mobile app', 'Marketplace', 'Phone orders'].map((label) => ({
        value: label.toLowerCase().replace(/\s+/g, '-'),
        label,
      })),
    },
  ];

  const { Story } = defineMeta({
    title: 'Molecules/MultiSelect',
    component: MultiSelect,
    tags: ['autodocs'],
    parameters: { layout: 'padded', docs: { story: { height: '22rem' } } },
  });
</script>

<script lang="ts">
  let picked = $state<string[]>([]);
  let rated = $state<string[]>(['up', '5', '4']);
</script>

<!-- A filter dropdown of checkboxes. The trigger summarises the pick ("All channels",
     "Web shop", "2 channels") and glows in the accent while open. -->
<Story name="Channels" asChild>
  <MultiSelect
    label="Channel"
    allLabel="All channels"
    unit="channels"
    groups={channels}
    value={picked}
    onchange={(v) => (picked = v)}
  />
</Story>

<!-- Groups get a caps heading that toggles the whole group; options can show stars. -->
<Story name="Grouped ratings" asChild>
  <MultiSelect
    label="Rating"
    allLabel="All ratings"
    unit="ratings"
    groups={ratings}
    value={rated}
    onchange={(v) => (rated = v)}
  />
</Story>

<!-- Before the options have loaded. -->
<Story name="Empty" asChild>
  <MultiSelect
    label="Channel"
    allLabel="All channels"
    groups={[{ options: [] }]}
    value={[]}
    onchange={() => {}}
  />
</Story>
