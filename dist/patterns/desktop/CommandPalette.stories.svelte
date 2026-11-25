<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CommandPalette from './CommandPalette.svelte';
  import Button from '../atoms/Button.svelte';
  import { commandGroups } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/CommandPalette',
    component: CommandPalette,
    tags: ['autodocs'],
  });

  const groups = commandGroups({ open: () => {}, theme: () => {}, tint: () => {} });
</script>

<script lang="ts">
  let open = $state(false);
</script>

<!-- Press ⌘K (Ctrl+K) anywhere, or use the button. Type to filter, Up / Down, Enter.

     Why does the active row look like a selected list row (tinted glass, tint rim) instead of a
     solid coloured bar? Because it is the same idea — "this one" — and the system says it one
     way everywhere. The active row's icon turns into a small candy button: the one thing that
     will happen when you press Enter. The panel pops from the top centre, where your eyes
     already are, and an empty search answers kindly: "Nothing here — try fewer words." -->
<Story name="CommandPalette" asChild>
  <div>
    <Button icon="command" label="Open command palette" onclick={() => (open = true)} />
    <CommandPalette bind:open {groups} />
  </div>
</Story>
