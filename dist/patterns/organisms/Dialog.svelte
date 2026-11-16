<script lang="ts">
  /**
   * Dialog organism — a modal of liquid glass over a dimmed, blurred page. It eases in from
   * slightly smaller (big surfaces never overshoot) and becomes a bottom sheet on phones. Given
   * the `origin` that opened it (the trigger button or its rect), it grows out of that place and
   * shrinks back into it, so cause and effect stay visible. Built on the native `<dialog>`
   * (focus trap, Escape and the top layer come from the browser).
   *
   * Every overlay closes the same way: Escape, the close button at the top end and a click on
   * the backdrop all report through `onclose` (once per request). `dismissible={false}` holds
   * the dialog open while work runs; `closeButton` / `closeOnBackdrop` switch those off.
   *
   *   <Dialog open={asking} origin={trigger} title="Discard changes?" onclose={() => (asking = false)}>
   *     …{#snippet actions()}<Button label="Keep editing" />…{/snippet}
   *   </Dialog>
   */
  import { untrack, type Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import { motion, originFrom } from '../../utils/motion';
  import { backdropClick } from '../../utils/overlay';

  interface Props {
    open: boolean;
    title?: string | undefined;
    intro?: string | undefined;
    width?: string;
    /** What opened the dialog: it grows out of this element (or rect) and shrinks back into it. */
    origin?: Element | DOMRect | undefined;
    /** Whether Escape, the close button and the backdrop may close it (off while busy). */
    dismissible?: boolean;
    /** The close button at the top end. */
    closeButton?: boolean;
    /** A click on the backdrop closes it. */
    closeOnBackdrop?: boolean;
    closeLabel?: string;
    onclose: () => void;
    children: Snippet;
    actions?: Snippet | undefined;
  }

  let {
    open,
    title,
    intro,
    width = '30rem',
    origin,
    dismissible = true,
    closeButton = true,
    closeOnBackdrop = true,
    closeLabel = 'Close',
    onclose,
    children,
    actions,
  }: Props = $props();

  const id = $props.id();
  let dialog: HTMLDialogElement;
  /** The content stays while the dialog shrinks away. */
  let leaving = $state(false);
  let exit: Animation[] = [];
  let asked = false;

  function show() {
    // happy-dom and old engines lack showModal; fall back to the open attribute.
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }
  function hide() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  function place() {
    const at = originFrom(origin, dialog.getBoundingClientRect());
    if (at) dialog.style.transformOrigin = at;
    else dialog.style.removeProperty('transform-origin');
  }

  function stopExit() {
    for (const anim of exit) anim.cancel();
    exit = [];
  }

  function leave() {
    const m = motion(origin ? 'base' : 'quick', origin ? 'in-out' : 'out', dialog);
    if (origin && !m.reduced) place();
    const to: Keyframe = m.reduced
      ? { opacity: 0 }
      : { opacity: 0, transform: origin ? 'scale(0.2)' : 'scale(0.97)' };
    const timing = { duration: m.duration, easing: m.easing, fill: 'forwards' as const };
    try {
      exit = [dialog.animate([{ opacity: 1, transform: 'none' }, to], timing)];
      exit.push(
        dialog.animate([{ opacity: 1 }, { opacity: 0 }], {
          ...timing,
          pseudoElement: '::backdrop',
        }),
      );
    } catch {
      // No WAAPI, or no ::backdrop animation: whatever started still runs.
    }
    // Cancelling (a reopening) rejects `finished`; that is expected, not an error.
    for (const anim of exit) anim.finished?.catch(() => {});
    if (!exit.length || !m.duration) return finish();
    leaving = true;
    const anim = exit[0];
    const done = () => {
      if (exit[0] === anim) finish();
    };
    anim?.finished?.then(done, () => {});
    setTimeout(done, m.duration + 80);
  }

  function finish() {
    leaving = false;
    hide();
    // The fill would keep the next opening invisible.
    stopExit();
  }

  $effect(() => {
    if (open) {
      if (leaving) {
        leaving = false;
        stopExit();
      }
      if (!dialog.open) {
        asked = false;
        show();
        untrack(place);
      }
    } else if (dialog.open && !untrack(() => leaving)) {
      untrack(leave);
    }
  });

  /** Asks the page to close; one report per request, never while not dismissible. */
  function requestClose() {
    if (!dismissible || asked || !open) return;
    asked = true;
    // Several routes can fire for one gesture (cancel, then close); a later request may retry.
    setTimeout(() => (asked = false));
    onclose();
  }

  function oncancel(event: Event) {
    // Escape goes through requestClose, so the dialog can shrink away (or stay while busy).
    event.preventDefault();
    requestClose();
  }

  function onCloseEvent() {
    if (!open) return;
    // The browser may close it anyway (a repeated Escape); a busy dialog comes straight back.
    if (!dismissible) show();
    else requestClose();
  }
</script>

<dialog
  data-glass
  bind:this={dialog}
  class="dialog"
  class:grow={!!origin}
  style:--width={width}
  aria-labelledby={title ? `${id}-title` : undefined}
  {oncancel}
  onclose={onCloseEvent}
  use:backdropClick={closeOnBackdrop ? requestClose : undefined}
>
  {#if open || leaving}
    {#if closeButton}
      <div class="close">
        <Button
          variant="ghost"
          size="sm"
          icon="close"
          iconOnly
          label={closeLabel}
          disabled={!dismissible}
          onclick={requestClose}
        />
      </div>
    {/if}
    {#if title}<h2 id="{id}-title" class:room={closeButton}>{title}</h2>{/if}
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
  /* Grown out of what opened it: the transform origin is set from the trigger's rect. */
  .dialog.grow[open] {
    animation-name: dialog-grow;
  }
  /* One backdrop for every overlay (Dialog, Drawer, DetailPanel). */
  .dialog::backdrop {
    --overlay-blur: var(--blur-backdrop, var(--blur-glass));
    background: var(--backdrop);
    backdrop-filter: var(--overlay-blur);
    -webkit-backdrop-filter: var(--overlay-blur);
    animation: backdrop-in var(--motion-base) var(--ease-out);
  }
  .close {
    position: absolute;
    top: var(--space-3);
    inset-inline-end: var(--space-3);
  }
  h2.room {
    padding-inline-end: var(--space-8);
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
  @keyframes dialog-grow {
    from {
      opacity: 0;
      transform: scale(0.2);
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
    .dialog[open],
    .dialog.grow[open] {
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
    .dialog.grow[open],
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
