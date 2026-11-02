<script lang="ts">
  // Test fixture: a Desktop with two windows, a menu bar and a dock (not shipped).
  import Desktop from './Desktop.svelte';
  import Dock from './Dock.svelte';
  import MenuBar from './MenuBar.svelte';
  import Window from './Window.svelte';
  import type { ContextMenuItem, DesktopIcon } from './shared.svelte';

  interface Props {
    icons?: DesktopIcon[];
    onopen?: (icon: DesktopIcon) => void;
    contextmenu?: ContextMenuItem[] | undefined;
    onclose?: () => void;
  }

  let { icons = [], onopen, contextmenu, onclose }: Props = $props();
  let minimized = $state(false);
</script>

<Desktop {icons} {onopen} {contextmenu} contained>
  {#snippet menubar()}
    <MenuBar menus={[{ label: 'Notes', items: [{ label: 'About' }] }]} now={new Date(0)} />
  {/snippet}
  {#snippet dock()}
    <Dock items={[{ id: 'notes', label: 'Notes', icon: 'edit' }]} />
  {/snippet}
  <Window id="a" title="First" {onclose}>A</Window>
  <Window id="b" title="Second" bind:minimized>B</Window>
  <button type="button" class="restore" onclick={() => (minimized = false)}>restore</button>
</Desktop>
