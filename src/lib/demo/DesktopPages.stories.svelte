<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DesktopApp from './DesktopApp.svelte';
  import DesktopOS from './DesktopOS.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Desktop',
    parameters: { layout: 'fullscreen' },
  });
</script>

<!-- An original candy desktop that has a good day. The top shelf greets you (point at the day
     pill for a wink); windows wear the candy capsule and grow out of the candy tray; the jar on
     the left of the tray holds all apps. Drag and resize windows, minimise one and watch it go
     home, right-click files and the wallpaper, press ⌘K for the command palette, open the
     control panel from the shelf. Settings → Appearance re-tints and reshapes everything live.
     Tick off every little win for sprinkles. On a phone the desktop becomes a home screen,
     windows open as sheets and the tray keeps your five favourites.

     Why not copy a familiar desktop? Familiar habits stay (windows, a tray, menus, a launcher,
     ⌘K) — people should never have to relearn how to close a window. The look is new so that
     apps built with this library feel like themselves: calm glass, one tint, candy only where
     something is chosen, running, or worth celebrating. -->
<Story name="Desktop OS" asChild>
  <DesktopOS />
</Story>

<!-- One desktop-style app: a toolbar with search, a source list of mailboxes, the message
     list, a reading pane, an inspector and a status bar. Right-click a message for its menu. -->
<Story name="Mail app" asChild>
  <DesktopApp />
</Story>
