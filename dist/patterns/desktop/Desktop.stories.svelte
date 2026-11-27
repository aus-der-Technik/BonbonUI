<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Desktop from './Desktop.svelte';
  import Dock from './Dock.svelte';
  import MenuBar from './MenuBar.svelte';
  import Widget from './Widget.svelte';
  import Window from './Window.svelte';
  import Text from '../atoms/Text.svelte';
  import Stack from '../layout/Stack.svelte';
  import { appMenus, desktopIcons, dock as dockItems, wallpapers } from '../../demo/mock-desktop';
  import type { DesktopIcon, DesktopPoint } from './shared.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/Desktop',
    component: Desktop,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<script lang="ts">
  let notes = $state(true);
  let files = $state(true);
  let focused = $state<string | undefined>('notes');
  let icons = $state<DesktopIcon[]>(desktopIcons.map((i) => ({ ...i })));
  let selected = $state<string | undefined>();
  let renaming = $state<string | undefined>();

  /** A new folder lands under the pointer with its name ready to type. */
  function newFolder(at: DesktopPoint) {
    const taken = new Set(icons.map((i) => i.label));
    let label = 'Untitled folder';
    for (let n = 2; taken.has(label); n++) label = `Untitled folder ${n}`;
    const id = `new-${Date.now()}`;
    icons = [...icons, { id, label, icon: 'folder', color: 'blue', ...at }];
    selected = id;
    renaming = id;
  }
</script>

<!-- A whole screen: the tint mesh as wallpaper, the top shelf, icons, a widget, two windows and
     the candy tray. Click a window to bring it to the front (it takes the tint rim), drag it
     by its title bar, resize it from the corner. Minimise one: it shrinks into its tray icon;
     click the icon and it grows back out. Right-click the wallpaper and choose New folder: it
     lands right under the pointer (`contextmenu` as a function gets that spot; the icon keeps it
     as `x`/`y`) with its name ready to type — Enter keeps it, Escape the old one. F2 renames
     any icon.

     Why does the wallpaper default to the tint mesh? One colour drives the whole system; letting
     the wallpaper drift in the same three hues makes every app's accent look at home on it.
     Why do windows fly to and from the tray? Motion should answer "where did it go?" — a
     window that just vanishes leaves you hunting; one that shrinks into its icon shows you
     where to get it back.
     Why does a new folder appear under the pointer? You were looking there when you asked for
     it; an item that appears in a far corner has to be searched for before it can be named. -->
<Story name="Desktop" asChild>
  <Desktop
    {icons}
    bind:focused
    bind:selected
    bind:renaming
    onrename={(id, label) => (icons = icons.map((i) => (i.id === id ? { ...i, label } : i)))}
    contextmenu={(at) => [
      { label: 'New folder', icon: 'folder', onselect: () => newFolder(at) },
      { label: 'Change wallpaper…', icon: 'image' },
    ]}
  >
    {#snippet menubar()}
      <MenuBar
        logoMenu={[{ label: 'About this desktop' }]}
        appIcon={focused === 'files' ? 'folder' : 'edit'}
        appColor={focused === 'files' ? 'blue' : 'yellow'}
        menus={appMenus(focused === 'files' ? 'Files' : 'Notes')}
        status={[
          { icon: 'wifi', label: 'Wi-Fi' },
          { icon: 'battery', label: 'Battery', text: '82%' },
        ]}
      />
    {/snippet}
    {#snippet widgets()}
      <Widget
        title="Weather"
        icon="sun"
        color="orange"
        figure="21°"
        caption="Sunny · H 24° L 15°"
      />
    {/snippet}
    {#snippet dock()}
      <Dock
        items={dockItems([...(files ? ['files'] : []), ...(notes ? ['notes'] : [])], focused)}
        onselect={(a) => {
          if (a.id === 'notes') notes = true;
          if (a.id === 'files') files = true;
          focused = a.id;
        }}
      />
    {/snippet}
    {#if files}
      <Window
        id="files"
        icon="folder"
        color="blue"
        title="Files"
        x={60}
        y={40}
        width={520}
        height={340}
        onclose={() => (files = false)}
      >
        <Text tone="muted">Drag me by the title bar.</Text>
      </Window>
    {/if}
    {#if notes}
      <Window
        id="notes"
        icon="edit"
        color="yellow"
        title="Notes"
        x={320}
        y={140}
        width={460}
        height={300}
        onclose={() => (notes = false)}
      >
        <Stack gap="sm">
          <Text weight="bold">Groceries</Text>
          <Text tone="muted">Oat milk · Blueberries · Sourdough</Text>
        </Stack>
      </Window>
    {/if}
  </Desktop>
</Story>

<!-- `contained` fills its parent instead of the viewport — for previews and embeds. Any
     `wallpaper` (an image URL or a CSS gradient) can replace the mesh. -->
<Story name="Contained preview" asChild>
  <div style="height:28rem;padding:1.5rem">
    <Desktop contained wallpaper={wallpapers[2].value} icons={desktopIcons.slice(0, 2)}>
      {#snippet dock()}<Dock items={dockItems(['files'], 'files')} size={44} />{/snippet}
    </Desktop>
  </div>
</Story>
