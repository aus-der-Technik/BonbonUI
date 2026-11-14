<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AppJar from './AppJar.svelte';
  import Button from '../atoms/Button.svelte';
  import { apps } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/AppJar',
    component: AppJar,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<script lang="ts">
  let open = $state(true);
  let trigger = $state<HTMLElement>();
</script>

<!-- The candy jar: all apps in one glass jar that rises from the bottom, search first, grouped
     by `category`. Icons pour in one after another. Type to filter, Enter opens the first
     match, arrows move (Up / Down find the nearest icon in the next row, across groups),
     Tab stays inside, Escape or a click beside the jar closes. `anchor` is the button that
     opened it: the jar rises out of it.

     Why a jar and not a full-screen grid? A full-screen grid wipes out where you were and turns
     a quick launch into a trip to another place. The jar rises from the tray button you
     pressed, keeps the desktop visible (blurred) around it, and goes back where it came from.
     Why categories? Sixteen identical squares are a memory game; a few honest groups ("Work",
     "Make & play") let you find an app by what it is for. Why the pour? Thirty milliseconds
     per icon is too short to wait for, long enough to feel the jar fill. -->
<Story name="AppJar" asChild>
  <div style="padding:2rem;min-height:40rem">
    <span bind:this={trigger} style="display:inline-block">
      <Button variant="primary" icon="grid" label="Show all apps" onclick={() => (open = true)} />
    </span>
    <AppJar bind:open anchor={trigger} {apps} />
  </div>
</Story>
