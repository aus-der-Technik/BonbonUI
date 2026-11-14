<script lang="ts">
  // Test fixture: a ContextPanel holding popups of its own, opened from buttons too (not shipped).
  import ContextPanel from './ContextPanel.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import Popover from '../molecules/Popover.svelte';
  import ConfirmButton from '../molecules/ConfirmButton.svelte';
  import ChartTooltip from '../molecules/ChartTooltip.svelte';

  interface Props {
    onopen: (event: MouseEvent | KeyboardEvent) => string | null | undefined;
    onclose?: () => void;
    disabled?: boolean;
  }

  let { onopen, onclose = () => {}, disabled = false }: Props = $props();
  let ref = $state<ContextPanel<string>>();
</script>

<button type="button" class="opener" onclick={() => ref?.openAt(40, 50, 'from-button')}>open</button
>
<button
  type="button"
  class="opener-for"
  onclick={(event) => ref?.openFor(event.currentTarget, 'under')}>for</button
>
<ContextPanel bind:this={ref} {onopen} {onclose} {disabled} label="Edit" width="300px" padding="sm">
  {#snippet panel(target, close)}
    <p class="target">{target}</p>
    <input class="field" />
    <select class="choice"><option>One</option></select>
    <button type="button" class="done" onclick={close}>Done</button>
    <Popover label="More"><button type="button" class="in-popover">x</button></Popover>
    <ContextMenu items={[{ label: 'Copy' }]}><span class="menu-area">menu</span></ContextMenu>
    <ConfirmButton onconfirm={() => {}} />
    <ChartTooltip tooltip={{ x: 1, y: 1, title: 'Tip', rows: [] }} />
  {/snippet}
  <p class="row">Row A</p>
  <p class="heading">Heading</p>
</ContextPanel>
