<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Window from './Window.svelte';
  import SourceList from './SourceList.svelte';
  import StatusBar from './StatusBar.svelte';
  import Toolbar from './Toolbar.svelte';
  import Text from '../atoms/Text.svelte';
  import Stack from '../layout/Stack.svelte';
  import { places } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/Window',
    component: Window,
    tags: ['autodocs'],
    args: { title: 'Notes', icon: 'edit', color: 'yellow', static: true, height: 260 },
  });
</script>

<!-- A framed app preview in the page flow (`static`). The controls at the end of the title bar
     are plain glyphs: minimise, zoom and — after a hairline — close. Point at one for its name.

     Why glyphs and not coloured dots? A dot says nothing until you have learned which colour
     does what; a minus, a frame and a cross say it at once, for everyone, at rest. They stay
     neutral so they never shout "act on me" while you read, and each is a full 32px target.
     Close turns red only while you point at (or focus) close itself — danger appears when you
     are about to act, not all day — and the hairline keeps it one step apart from zoom, so a
     slightly missed click never closes your work. Why on the right? That is where the pointer
     already rests after reading a line, and it keeps the title and the app icon together on
     the left. -->
<Story name="Playground">
  {#snippet template(args)}
    <Window {...args} onclose={() => {}}>
      <Text tone="muted">The content scrolls inside the window.</Text>
    </Window>
  {/snippet}
</Story>

<!-- Title bar toolbar, a full-height sidebar with the app's name on top, and a status bar.

     Why is the title left-aligned with an icon? A centred title floats free of everything else
     and has to be searched for; on the left, next to the app's candy icon, it reads first and
     lines up with the sidebar and content edges. With a sidebar, the app's name sits on top of
     the sidebar and the title names the place (here: the folder), so you always know both. -->
<Story name="With sidebar, toolbar and status bar" asChild>
  <Window
    app="Files"
    icon="folder"
    color="blue"
    title="Documents"
    subtitle="8 items"
    static
    height={380}
    padding="none"
    onclose={() => {}}
  >
    {#snippet sidebar()}<SourceList sections={places} value="documents" label="Places" />{/snippet}
    {#snippet toolbar()}
      <Toolbar
        variant="plain"
        search=""
        items={[
          { icon: 'chevron-left', label: 'Back' },
          { spacer: true },
          { icon: 'grid', label: 'Icons', active: true },
          { icon: 'list', label: 'List' },
        ]}
      />
    {/snippet}
    <Stack padding="lg"><Text tone="muted">8 items</Text></Stack>
    {#snippet footer()}<StatusBar
        items={[{ label: '8 items' }]}
        trailing={[{ label: '212 GB available' }]}
      />{/snippet}
  </Window>
</Story>

<!-- The front window wears the selected layer: a tint rim and a soft glow. A window behind it
     (`focused={false}`) flattens its shadow, quiets its title and its controls.

     Why a rim and not just a darker title? On a busy desktop the eye looks for a shape, not a
     shade of grey: the rim is the same "this one is chosen" signal used for selected list rows,
     cards and tabs, so there is one rule to learn for the whole system. -->
<Story name="Focused and behind" asChild>
  <Stack gap="lg">
    <Window title="Front window" icon="edit" color="yellow" static focused height={140}>
      <Text tone="muted">Tint rim, soft glow, readable controls.</Text>
    </Window>
    <Window
      title="Window behind"
      subtitle="Not the front window"
      icon="folder"
      color="blue"
      static
      focused={false}
      height={140}
    >
      <Text tone="muted">Flatter, quieter — its controls still work at a click.</Text>
    </Window>
  </Stack>
</Story>
