<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PanelStack from './PanelStack.svelte';
  import StackPanel from './StackPanel.svelte';
  import Avatar from '../atoms/Avatar.svelte';
  import Button from '../atoms/Button.svelte';
  import Text from '../atoms/Text.svelte';
  import Stack from '../layout/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/PanelStack',
    component: PanelStack,
    subcomponents: { StackPanel },
    tags: ['autodocs'],
  });

  const groups = {
    Design: ['Ada Example', 'Cleo Example'],
    Engineering: ['Ben Example', 'Dev Example', 'Eve Example'],
  } as const;
  type Group = keyof typeof groups;
</script>

<script lang="ts">
  let group = $state<Group | null>(null);
  let person = $state<string | null>(null);
</script>

{#snippet demo()}
  <Stack gap="sm" align="start">
    <Text tone="muted">Open a group, then a person in it.</Text>
    {#each Object.keys(groups) as name (name)}
      <Button
        label={name}
        icon="users"
        onclick={() => ((group = name as Group), (person = null))}
      />
    {/each}
  </Stack>
  <PanelStack label="People" onclose={() => ((group = null), (person = null))}>
    {#if group}
      <StackPanel
        title={group}
        subtitle="{groups[group].length} people"
        width="22rem"
        onclose={() => ((group = null), (person = null))}
      >
        <ul class="list">
          {#each groups[group] as name (name)}
            <li>
              <button type="button" class:on={person === name} onclick={() => (person = name)}>
                <Avatar {name} size={28} />{name}
              </button>
            </li>
          {/each}
        </ul>
      </StackPanel>
    {/if}
    {#if person}
      <StackPanel
        depth={1}
        title={person}
        subtitle="In {group}"
        width="22rem"
        onclose={() => (person = null)}
      >
        <Stack gap="md">
          <Avatar name={person} size={72} />
          <Text
            >Another name in the group beside this panel swaps it; Escape closes this one, the
            dimmed page all of them.</Text
          >
        </Stack>
        {#snippet footer()}<Button variant="primary" icon="send" label="Message" />{/snippet}
      </StackPanel>
    {/if}
  </PanelStack>
{/snippet}

<!-- Wide: the group moves left and stays in reach beside the person. Narrow (or on a phone)
     the person covers the group with "‹ Design" to go back. -->
<Story name="Group then person" asChild>
  {@render demo()}
</Story>

<!-- The same at phone width: every panel is the whole screen, solid, clear of the notch. -->
<Story name="On a phone" asChild globals={{ viewport: { value: 'mobile2', isRotated: false } }}>
  {@render demo()}
</Story>

<style>
  .list {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .list button {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    min-height: 44px;
    padding: var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    color: var(--text);
    font: inherit;
    text-align: start;
    cursor: pointer;
  }
  .list button:hover,
  .list button.on {
    background: var(--accent-faint);
  }
</style>
