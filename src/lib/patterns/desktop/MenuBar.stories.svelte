<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MenuBar from './MenuBar.svelte';
  import { appMenus } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/MenuBar',
    component: MenuBar,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
  });

  const status = [
    { icon: 'search' as const, label: 'Search', onclick: () => {} },
    { icon: 'wifi' as const, label: 'Wi-Fi' },
    { icon: 'battery' as const, label: 'Battery', text: '82%' },
  ];
  const system = [{ label: 'About this desktop' }, { label: 'Settings…' }];
</script>

<!-- The top shelf: the system menu (a wrapped bonbon), the front app's name in a pill with its
     icon, its menus, status items and the day pill. Point at the day pill for its wink. Click
     a menu, then hover its neighbours; or Tab in and use the arrow keys.

     Why a floating shelf, not a full-width bar? A bar welded to the screen edge reads as
     hardware, and in solid black or white it is the loudest thing on screen. A slim glass shelf
     lets the wallpaper run behind it and keeps the top calm.
     Why a wrapped bonbon for the system menu? It is the system's own mark in the tint's hues —
     a face, but no logo to compete with your app, and nothing borrowed from another desktop.
     Point at it and the wrapper twists.
     Why a greeting next to the time? A clock tells you the time; "Good afternoon" tells you the
     machine is on your side. It costs one word, never blocks anything, and the wink only
     appears when you go looking for it. -->
<Story name="MenuBar" asChild>
  <div style="min-height:18rem">
    <MenuBar
      logoMenu={system}
      appIcon="edit"
      appColor="yellow"
      menus={appMenus('Notes')}
      {status}
      name="Alex"
    />
  </div>
</Story>

<!-- `floating={false}` — a full-width bar for apps that sit flush in a frame. `greet={false}`
     shows the time only; `greeting` takes your own words (another language, another tone). -->
<Story name="Full-width bar" asChild>
  <div style="min-height:18rem">
    <MenuBar
      floating={false}
      greet={false}
      appIcon="folder"
      appColor="blue"
      menus={appMenus('Files').slice(0, 4)}
      {status}
    />
  </div>
</Story>
