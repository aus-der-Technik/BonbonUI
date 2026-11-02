<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Launchpad from './Launchpad.svelte';
  import Button from '../atoms/Button.svelte';
  import { apps } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/Launchpad',
    component: Launchpad,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<script lang="ts">
  let open = $state(true);
</script>

<!-- The candy jar: all apps in one glass jar that rises from the bottom, search first, grouped
     by `category`. Icons pour in one after another. Type to filter, Enter opens the first
     match, arrows move (Up / Down find the nearest icon in the next row, across groups),
     Escape or a click beside the jar closes.

     Why a jar and not a full-screen grid? A full-screen grid wipes out where you were and turns
     a quick launch into a trip to another place. The jar rises from the tray button you
     pressed, keeps the desktop visible (blurred) around it, and goes back where it came from.
     Why categories? Sixteen identical squares are a memory game; a few honest groups ("Work",
     "Make & play") let you find an app by what it is for. Why the pour? Thirty milliseconds
     per icon is too short to wait for, long enough to feel the jar fill. -->
<Story name="Launchpad" asChild>
  <div style="padding:2rem;min-height:40rem">
    <Button variant="primary" icon="grid" label="Show all apps" onclick={() => (open = true)} />
    <Launchpad bind:open {apps} />
  </div>
</Story>
