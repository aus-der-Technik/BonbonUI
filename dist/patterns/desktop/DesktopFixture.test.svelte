<script lang="ts">
  // Test fixture: a Desktop with two windows, a menu bar and a dock (not shipped).
  import { untrack } from 'svelte';
  import Desktop from './Desktop.svelte';
  import Dock from './Dock.svelte';
  import MenuBar from './MenuBar.svelte';
  import Window from './Window.svelte';
  import type { ContextMenuItem, DesktopIcon, DesktopPoint, WindowManager } from './shared.svelte';

  interface Props {
    icons?: DesktopIcon[];
    onopen?: (icon: DesktopIcon) => void;
    contextmenu?: ContextMenuItem[] | ((at: DesktopPoint) => ContextMenuItem[]) | undefined;
    onclose?: () => void;
    /** Starts with this icon's name in a field. */
    renaming?: string | undefined;
    onrename?: ((id: string, name: string) => void) | undefined;
    /** Receives the manager from `bind:manager`. */
    onmanager?: (manager: WindowManager) => void;
  }

  let {
    icons = [],
    onopen,
    contextmenu,
    onclose,
    renaming: start,
    onrename,
    onmanager,
  }: Props = $props();
  let minimized = $state(false);
  let renaming = $state(untrack(() => start));
  let manager = $state<WindowManager>();
  $effect(() => {
    if (manager) onmanager?.(manager);
  });
</script>

<Desktop {icons} {onopen} {contextmenu} {onrename} bind:renaming bind:manager contained>
  {#snippet menubar()}
    <MenuBar menus={[{ label: 'Notes', items: [{ label: 'About' }] }]} now={new Date(0)} />
  {/snippet}
  {#snippet dock()}
    <Dock items={[{ id: 'notes', label: 'Notes', icon: 'edit' }]} />
  {/snippet}
  <Window id="a" title="First" {onclose}>A</Window>
  <Window id="b" title="Second" bind:minimized>B</Window>
  <button type="button" class="restore" onclick={() => (minimized = false)}>restore</button>
  <output class="renaming">{renaming ?? ''}</output>
</Desktop>
