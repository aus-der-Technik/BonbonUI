<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MoreButton from './MoreButton.svelte';
  import ContextPanel from '../desktop/ContextPanel.svelte';
  import Avatar from '../atoms/Avatar.svelte';
  import Button from '../atoms/Button.svelte';
  import Input from '../atoms/Input.svelte';
  import Text from '../atoms/Text.svelte';
  import Field from './Field.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/MoreButton',
    component: MoreButton,
    tags: ['autodocs'],
    argTypes: { show: { control: 'inline-radio', options: ['touch', 'hover', 'always'] } },
  });

  // ContextPanel is generic; its instance type for bind:this.
  type Panel = ContextPanel<Person>;
  interface Person {
    id: string;
    name: string;
    role: string;
  }
</script>

<script lang="ts">
  let people = $state<Person[]>([
    { id: 'a', name: 'Ada Example', role: 'Design' },
    { id: 'b', name: 'Ben Example', role: 'Engineering' },
    { id: 'c', name: 'Cleo Example', role: 'Finance' },
  ]);
  let peoplePanel = $state<Panel>();
  const rowAt = (event: MouseEvent | KeyboardEvent) => {
    const id = (event.target as Element).closest<HTMLElement>('[data-row]')?.dataset['row'];
    return people.find((p) => p.id === id);
  };
</script>

<!-- One panel per list, three ways in: right-click (mouse), a long press (finger) and the "⋯"
     (anyone). `show="hover"` here: on a desktop the dots appear on the hovered row; on a touch
     screen they are always there. On a phone the panel is a bottom sheet. -->
<Story name="In a list" asChild>
  <ContextPanel
    bind:this={peoplePanel}
    onopen={rowAt}
    label="Change a person"
    width="20rem"
    longpress
    sheet
  >
    {#snippet panel(person, close)}
      <Stack gap="md">
        <Field label="Role">
          <Input
            value={person.role}
            onchange={(e) => (person.role = (e.currentTarget as HTMLInputElement).value)}
          />
        </Field>
        <Button variant="primary" label="Done" onclick={close} />
      </Stack>
    {/snippet}
    <ul class="people">
      {#each people as person (person.id)}
        <li data-row={person.id}>
          <Avatar name={person.name} size={32} />
          <span class="who"
            ><Text>{person.name}</Text><Text size="sm" tone="muted">{person.role}</Text></span
          >
          <MoreButton
            label="Change {person.name}"
            show="hover"
            onclick={(e) => peoplePanel?.openFor(e.currentTarget, person)}
          />
        </li>
      {/each}
    </ul>
  </ContextPanel>
</Story>

<!-- Where it shows: `touch` (default) only on touch screens, `hover` also on a hovered row,
     `always` everywhere; `vertical` stacks the dots. -->
<Story
  name="Playground"
  args={{ label: 'Change this row', show: 'always', vertical: false, onclick: () => {} }}
/>

<style>
  .people {
    display: grid;
    max-width: 26rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .people li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-2);
    border-bottom: 1px solid var(--border-strong);
  }
  .who {
    display: grid;
    flex: 1;
    min-width: 0;
  }
</style>
