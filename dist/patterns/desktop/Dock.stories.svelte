<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dock from './Dock.svelte';
  import { dock } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/Dock',
    component: Dock,
    tags: ['autodocs'],
    args: { items: dock(['files', 'mail', 'music'], 'mail'), size: 52, onjar: () => {} },
  });
</script>

<!-- The candy tray. Point at an icon: it lifts 4px and says its name in a pill above. Click:
     one jelly squish. Running apps carry a short tint bar, the front app (`active`) a longer
     one. The jar on the left (`onjar`) holds all apps.

     Why no magnifying wave? Icons that grow under the pointer push their neighbours sideways —
     the target moves while you aim, and the wave makes the whole tray wobble on every pass. A
     lift plus a name pill gives the same "this one" feedback and nothing moves sideways.
     Why a bar, not a dot? A 4px dot is easy to miss and reads like a notification; a short bar
     reads as "open", and its length can say which one is in front.
     Why a rounded rect, not a pill? A tray holds things — in this system things that hold are
     rounded rects (concentric with the icons), things you press are pills. -->
<Story name="Playground">
  {#snippet template(args)}
    <div style="padding-top:5rem"><Dock {...args} /></div>
  {/snippet}
</Story>

<!-- A small tray without the jar, for a toolbar-sized launcher. Left / Right move between
     icons (one tab stop). -->
<Story name="Compact" asChild>
  <div style="padding-top:3rem"><Dock items={dock(['notes'], 'notes')} size={40} /></div>
</Story>
