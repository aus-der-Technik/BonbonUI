<script lang="ts">
  /**
   * Dialog organism — a modal of liquid glass over a dimmed, blurred page. It eases in from
   * slightly smaller (big surfaces never overshoot) and becomes a bottom sheet on phones. Built on the native `<dialog>`
   * (focus trap, Escape and the top layer come from the browser). Drive it with `open`; Escape
   * or `close()` report back through `onclose`.
   *
   *   <Dialog open={asking} title="Discard changes?" onclose={() => (asking = false)}>
   *     …{#snippet actions()}<Button label="Keep editing" />…{/snippet}
   *   </Dialog>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    title?: string | undefined;
    intro?: string | undefined;
    width?: string;
    onclose: () => void;
    children: Snippet;
    actions?: Snippet | undefined;
  }

  let { open, title, intro, width = '30rem', onclose, children, actions }: Props = $props();

  const id = $props.id();
  let dialog: HTMLDialogElement;

  $effect(() => {
    // happy-dom and old engines lack showModal; fall back to the open attribute.
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  });
</script>

<dialog
  bind:this={dialog}
  class="dialog"
  style:--width={width}
  aria-labelledby={title ? `${id}-title` : undefined}
  onclose={() => open && onclose()}
>
  {#if open}
    {#if title}<h2 id="{id}-title">{title}</h2>{/if}
    {#if intro}<p class="intro">{intro}</p>{/if}
    <div class="body">{@render children()}</div>
    {#if actions}<div class="actions">{@render actions()}</div>{/if}
  {/if}
</dialog>

<style>
  .dialog {
    margin: auto;
    width: min(var(--width), calc(100vw - 2rem));
    max-height: calc(100dvh - 2rem);
    overflow: auto;
    padding: var(--space-6) var(--space-6) var(--space-5);
    border-radius: var(--radius-dialog);
    border: 0.75px solid var(--layer-front-border);
    color: var(--text);
    background: var(--layer-front-bg), var(--glass-strong);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    box-shadow: var(--shadow-dialog);
  }
  .dialog[open] {
    animation: dialog-in var(--motion-slow) var(--ease-out);
  }
  .dialog::backdrop {
    background: var(--backdrop);
    backdrop-filter: blur(8px) saturate(120%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
    animation: backdrop-in var(--motion-base) var(--ease-out);
  }
  h2 {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.25;
    text-wrap: balance;
  }
  .intro {
    color: var(--text-2);
    font-size: var(--fs-md);
    line-height: 1.5;
    margin: var(--space-1) 0 var(--space-4);
  }
  h2 + .body {
    margin-top: var(--space-3);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
    margin-top: var(--space-5);
  }
  @keyframes dialog-in {
    from {
      opacity: 0;
      transform: translateY(6px) scale(0.97);
    }
  }
  @keyframes backdrop-in {
    from {
      opacity: 0;
    }
  }
  /* A phone gets a bottom sheet: easier to reach, and the page stays visible above it. */
  @media (max-width: 520px) {
    .dialog {
      margin: auto var(--space-2) var(--space-2);
      width: calc(100vw - 2 * var(--space-2));
      max-width: none;
    }
    .dialog[open] {
      animation-name: sheet-in;
    }
    .actions {
      flex-direction: column-reverse;
      align-items: stretch;
    }
  }
  @keyframes sheet-in {
    from {
      transform: translateY(40%);
      opacity: 0;
    }
  }
  /* Reduced motion keeps a quick fade so the dialog still arrives, just without moving. */
  @media (prefers-reduced-motion: reduce) {
    .dialog[open],
    .dialog::backdrop {
      animation: backdrop-in var(--motion-quick) linear;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .dialog {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--layer-front-bg), var(--bg);
    }
  }
</style>
