<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AvatarStack from './AvatarStack.svelte';
  import Row from '../layout/Row.svelte';
  import Stack from '../layout/Stack.svelte';
  import { team } from '../../demo/mock-collab';

  const { Story } = defineMeta({
    title: 'Molecules/AvatarStack',
    component: AvatarStack,
    tags: ['autodocs'],
    args: { people: team, max: 4, size: 30, label: 'People on this page' },
  });
</script>

<script lang="ts">
  let picked = $state('');
</script>

<Story name="Playground" />

<!-- Who is looking at the page right now: presence dots, names as tooltips, "+n" for the rest. -->
<Story name="Presence" args={{ people: team.slice(0, 5), max: 5, size: 34 }} />

<!-- Each person in their own colour (the one their cursor wears), and where they are in the tooltip. -->
<Story
  name="Colours and whereabouts"
  args={{
    people: team.slice(0, 4).map((person, i) => ({
      ...person,
      color: (['indigo', 'orange', 'teal', 'pink'] as const)[i],
      detail: ['in Writer', 'in Sheets · Budget', 'on the dashboard', 'in Calendar'][i],
    })),
    max: 4,
    size: 34,
  }}
/>

<!-- Assignees on a card: small and without presence. -->
<Story name="Assignees" args={{ people: team.slice(0, 3), size: 22, presence: false }} />

<!-- With `onselect` every face is a button, e.g. to filter a board by person. -->
<Story name="Selectable" asChild>
  <Stack gap="sm">
    <AvatarStack people={team} max={6} onselect={(person) => (picked = person.name)} />
    <Row>{picked ? `Filtered by ${picked}` : 'Pick someone to filter.'}</Row>
  </Stack>
</Story>
