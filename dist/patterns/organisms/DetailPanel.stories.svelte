<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DetailPanel from './DetailPanel.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Button from '../atoms/Button.svelte';
  import DetailHeader from '../molecules/DetailHeader.svelte';
  import DetailSection from '../molecules/DetailSection.svelte';
  import IdentityCell from '../molecules/IdentityCell.svelte';
  import TagList from '../molecules/TagList.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/DetailPanel',
    component: DetailPanel,
    tags: ['autodocs'],
    // Each panel is fixed to the viewport: on the docs page every story gets its own frame.
    parameters: { layout: 'fullscreen', docs: { story: { inline: false, height: '40rem' } } },
  });

  const people = [
    { id: 1, name: 'Dr. Jane Doe', role: 'Project manager', topics: ['Sustainability', 'Venues'] },
    { id: 2, name: 'Max Mustermann', role: 'Head of marketing', topics: ['Hybrid events'] },
    { id: 3, name: 'Erika Example', role: 'Research associate', topics: ['Research', 'Data'] },
  ];
</script>

<script lang="ts">
  let open = $state(true);
  let index = $state(0);
  let person = $state<number | null>(null);
  const current = $derived(people[index]!);
</script>

{#snippet personDetail(p: (typeof people)[number], id: string)}
  <DetailHeader title={p.name} titleId={id} subtitle={p.role}>
    {#snippet badge()}<Badge size="sm" label="External" />{/snippet}
    {#snippet meta()}Riverside Studios{/snippet}
  </DetailHeader>
  <DetailSection title="Topics">
    <TagList labels={p.topics} />
  </DetailSection>
  <DetailSection title="About">
    <p>Plans events across the country and speaks at the yearly community conference.</p>
  </DetailSection>
{/snippet}

<!-- A record over its list: it glides in from the right on liquid glass, the list stays visible
     behind it. ← / → step through the list, Escape or a click beside it closes it. -->
<Story name="Stepping through a list" asChild>
  <Stack padding="xl" align="start" style="min-height:40rem">
    <Button label="Open Jane Doe" onclick={() => (open = true)} />
    {#if open}
      <DetailPanel
        labelledby="story-person"
        itemKey={current.id}
        onclose={() => (open = false)}
        onprevious={index > 0 ? () => index-- : undefined}
        onnext={index < people.length - 1 ? () => index++ : undefined}
      >
        {@render personDetail(current, 'story-person')}
        {#snippet footer()}Updated 04.11.2026 · id {current.id}{/snippet}
      </DetailPanel>
    {/if}
  </Stack>
</Story>

<!-- A record opened from another one: the organisation's panel (`layer="behind"`) slides left
     and the person's (`layer="front"`) takes the keys. On narrow screens the one behind recedes
     under the front one. -->
<Story name="Side by side" asChild>
  <Stack padding="xl" style="min-height:40rem">
    <DetailPanel
      labelledby="story-company"
      itemKey="company"
      layer={person === null ? 'single' : 'behind'}
      onclose={() => (person = null)}
      onbackdrop={() => (person = null)}
    >
      <DetailHeader title="Riverside Studios" titleId="story-company" shape="square">
        {#snippet badge()}<Badge size="sm" label="3 people" />{/snippet}
      </DetailHeader>
      <DetailSection title="People">
        <Stack gap="xs" align="start">
          {#each people as p (p.id)}
            <Button variant="ghost" onclick={() => (person = p.id)}>
              <IdentityCell name={p.name} subtitle={p.role} size={32} />
            </Button>
          {/each}
        </Stack>
      </DetailSection>
    </DetailPanel>
    {#if person !== null}
      {@const p = people.find((candidate) => candidate.id === person)!}
      <DetailPanel
        labelledby="story-beside"
        itemKey={p.id}
        layer="front"
        onclose={() => (person = null)}
      >
        {@render personDetail(p, 'story-beside')}
      </DetailPanel>
    {/if}
  </Stack>
</Story>

<!-- The first load (`itemKey={null}`) shows a skeleton of the header and the sections. -->
<Story name="Loading" asChild>
  <Stack padding="xl" style="min-height:40rem">
    <DetailPanel labelledby="story-loading" itemKey={null} onclose={() => {}}>
      <span></span>
    </DetailPanel>
  </Stack>
</Story>

<!-- A failed load shows its message in the danger colour instead of the content. -->
<Story name="Error" asChild>
  <Stack padding="xl" style="min-height:40rem">
    <DetailPanel
      labelledby="story-error"
      itemKey={1}
      error="This person was deleted in the meantime."
      onclose={() => {}}
    >
      <span></span>
    </DetailPanel>
  </Stack>
</Story>
