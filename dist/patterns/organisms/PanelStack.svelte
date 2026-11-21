<script lang="ts">
  /**
   * PanelStack organism — room for panels that open beside each other — a group, then a person in it. One native
   * modal `<dialog>` holds them all (the top layer, the page behind made inert), so the panel
   * below stays in reach: a click on another name there swaps the one in front. Escape closes
   * the panel in front, a click on the dimmed page closes them all. It opens with its first
   * `StackPanel` and closes after its last has left.
   *
   *   <PanelStack onclose={() => ((group = null), (person = null))}>
   *     {#if group}<StackPanel title={group.name} onclose={() => (group = null)}>…</StackPanel>{/if}
   *     {#if person}<StackPanel depth={1} title={person.name} onclose={() => (person = null)}>…</StackPanel>{/if}
   *   </PanelStack>
   *
   * Wide screens show the top two side by side; where they do not fit (always on a phone) the
   * top one covers the rest and offers "‹ {title below}". On a phone every panel is the whole
   * screen. Which panels are open is yours: keep it in the address when Back should close them.
   */
  import type { Snippet } from 'svelte';
  import { provideStack, Stack } from './panels.svelte';

  interface Props {
    /** Closes every panel (the dimmed page was clicked, or the browser closed the dialog). */
    onclose: () => void;
    /** Accessible name of the dialog. */
    label?: string;
    /** The `StackPanel`s. */
    children: Snippet;
  }
  let { onclose, label, children }: Props = $props();

  const stack = new Stack(() => onclose());
  provideStack(stack);

  let dialog: HTMLDialogElement;
  const open = $derived(stack.entries.length > 0);

  $effect(() => {
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  });

  // Escape closes only the panel in front. Handled on keydown so the browser's own close
  // request (which would shut the whole dialog) never starts; inner controls that use Escape
  // themselves (a list, a confirmation) prevent it first.
  function onkeydown(event: KeyboardEvent) {
    if (!open || event.key !== 'Escape' || event.defaultPrevented) return;
    const target = event.target as Node | null;
    const otherDialog = target instanceof Element ? target.closest('dialog') : null;
    if (otherDialog && otherDialog !== dialog) return;
    event.preventDefault();
    stack.closeTop();
  }

  // A press that starts on the dimmed page and ends there; not one that began in a panel.
  let downOnScrim = false;
</script>

<svelte:window {onkeydown} />

<dialog
  bind:this={dialog}
  class="stack"
  class:wide={stack.wide}
  aria-label={label}
  oncancel={(e) => e.preventDefault()}
  onclose={() => open && onclose()}
  onpointerdown={(e) => (downOnScrim = e.target === dialog)}
  onclick={(e) => {
    if (downOnScrim && e.target === dialog) onclose();
    downOnScrim = false;
  }}
>
  {@render children()}
</dialog>

<style>
  .stack {
    position: fixed;
    inset: 0;
    width: 100vw;
    max-width: none;
    height: 100dvh;
    max-height: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
    background: transparent;
    color: var(--text);
  }
  .stack:focus {
    outline: none;
  }
  /* The same dimmed, blurred page as every overlay (Dialog, Drawer). */
  .stack::backdrop {
    --overlay-blur: var(--blur-backdrop, var(--blur-glass));
    background: var(--backdrop);
    backdrop-filter: var(--overlay-blur);
    -webkit-backdrop-filter: var(--overlay-blur);
    animation: stack-backdrop-in var(--motion-base) var(--ease-out);
  }
  @keyframes stack-backdrop-in {
    from {
      opacity: 0;
    }
  }
</style>
