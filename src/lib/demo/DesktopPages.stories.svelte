<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DesktopOS from './DesktopOS.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Desktop',
    parameters: { layout: 'fullscreen' },
  });
</script>

<!-- An original candy desktop that has a good day. The top shelf greets you (point at the day
     pill for a wink, click it for today); windows carry plain glyph controls and grow out of
     whatever opened them — a desktop icon, a tile in the jar, a palette row, the tray. Mail is
     a real app: read, reply, save an attachment, delete with Undo right where the message was.
     Right-click the wallpaper for a new folder that lands under the pointer, ready to name;
     move a file to the trash and watch it fly there. Banners only report what happens in the
     background: new mail, a finished download, a meeting coming up. Settings → Appearance
     re-tints and reshapes everything live; the quick settings pop out of their status item.
     Tick off every little win for sprinkles. On a phone the desktop becomes a home screen,
     windows open as sheets and the tray keeps your five favourites.

     Why not copy a familiar desktop? Familiar habits stay (windows, a tray, menus, a launcher,
     ⌘K) — people should never have to relearn how to close a window. The look is new so that
     apps built with this library feel like themselves: calm glass, one tint, candy only where
     something is chosen, running, or worth celebrating. -->
<Story name="Desktop OS" asChild>
  <DesktopOS />
</Story>
