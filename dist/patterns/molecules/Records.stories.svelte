<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import IdentityCell from './IdentityCell.svelte';
  import StructTree from './StructTree.svelte';
  import TagList from './TagList.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Card from '../atoms/Card.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Records',
    component: IdentityCell,
    tags: ['autodocs'],
    args: { name: 'Dr. Jane Doe', initialsOf: 'Jane Doe', subtitle: 'Project manager' },
  });

  const keywords = ['Sustainability', 'Gift ideas', 'Bestsellers', 'Accessibility', 'New in'];
</script>

<script lang="ts">
  let activeKeyword = $state('Bestsellers');
  let address = $state<Record<string, unknown>>({
    street: '12 Harbour Road',
    city: 'Riverside',
    geo: { lat: 51.3397, lon: 12.3731 },
    tags: ['warehouse', 'pick-up'],
    active: true,
  });
</script>

<!-- Who a row is about: picture or initials, name and a muted line. -->
<Story name="IdentityCell" />

<!-- A badge after the name. -->
<Story name="IdentityCell with badge" asChild>
  <IdentityCell name="Alex Example" subtitle="Head of marketing">
    {#snippet badge()}<Badge size="sm" tone="live" label="Team" />{/snippet}
  </IdentityCell>
</Story>

<!-- A square logo with the subtitle clamped to one line, in a list. -->
<Story name="IdentityCell list" asChild>
  <Card>
    <Stack gap="md">
      <IdentityCell
        name="Example Market Hall"
        shape="square"
        clamp
        subtitle="A covered market with forty stalls, a roastery and a rooftop terrace."
      />
      <IdentityCell name="Corner Bakery" shape="square" subtitle="Bread, cakes and coffee" />
      <IdentityCell name="Riverside Books" shape="square" subtitle="Independent bookshop" />
    </Stack>
  </Card>
</Story>

<!-- Keywords as tags: the first `max`, then "+n". Clicking filters; the active one is tinted
     in the accent. -->
<Story name="TagList" asChild>
  <TagList
    labels={keywords}
    max={3}
    active={(label) => label === activeKeyword}
    onclick={(label) => (activeKeyword = label)}
    title={(label) => `Filter by “${label}”`}
  />
</Story>

<!-- A nested record edited in place: click a value, type, Enter saves, Escape cancels. -->
<Story name="StructTree" asChild>
  <Card>
    <StructTree
      label="Address"
      value={address}
      editable
      expandDepth={2}
      onchange={(next) => (address = next)}
    />
  </Card>
</Story>
