<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Kbd from './Kbd.svelte';
  import Text from './Text.svelte';

  const { Story } = defineMeta({ title: 'Atoms/Kbd', component: Kbd, tags: ['autodocs'] });
</script>

<!-- Key hints under an editable table. Each key is a tiny candy key cap: lit on the top edge with
a soft lip below, so it reads as something you press without shouting over the sentence. -->
<Story name="Key hints" asChild>
  <Text size="sm" tone="subtle">
    Click a cell to edit · <Kbd>Enter</Kbd> saves · <Kbd>Tab</Kbd> saves and moves right ·
    <Kbd>Esc</Kbd> cancels
  </Text>
</Story>

<!-- A shortcut combination. Write the keys out ("Ctrl", "Shift") unless you know the platform —
the hint should work for everyone. -->
<Story name="Shortcut" asChild>
  <Text size="sm" tone="muted"><Kbd>Ctrl</Kbd> <Kbd>K</Kbd> opens the command palette</Text>
</Story>
