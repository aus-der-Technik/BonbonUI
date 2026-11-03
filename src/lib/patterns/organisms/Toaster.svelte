<script lang="ts">
  /**
   * Toaster organism — the stack of toasts floating in a corner, announced politely. Toasts are
   * an overlay, not a page layer, so the stack is fixed to the viewport; new ones slide in from
   * their edge and the others glide aside.
   *
   * A corner is far from where the user acts, so toasts are for two things only: news from the
   * background (a sync finished, a teammate shared a file), and the outcome of an action whose
   * own control has disappeared (a deleted row, a closed dialog) — then give the toast an
   * `action` such as "Undo". Feedback for a control still on screen belongs at that control.
   *
   * Countdowns pause while the pointer or keyboard focus is on the stack, and errors stay until
   * dismissed. With `sprinkle`, a success toast throws a few sprinkles from its icon — off by
   * default, because apps that save often would celebrate constantly (delight belongs to the
   * end of a real task, not to every autosave). Feed it a `ToastQueue` (utils/toasts.svelte.ts):
   *
   *   <Toaster queue={toasts} />
   *   toasts.push('Row deleted', 'ok', { action: { label: 'Undo', onaction: restore } });
   *
   * or drive it yourself with `toasts`, `ondismiss`, `onaction`, `onpause` and `onresume`.
   */
  import { flip } from 'svelte/animate';
  import Button from '../atoms/Button.svelte';
  import Toast from '../molecules/Toast.svelte';
  import type { ToastItem, ToastQueue } from '../../utils/toasts.svelte';
  import { celebrate } from '../../utils/delight';
  import { glide, motion } from '../../utils/motion';

  interface Props {
    /** The queue to show; it also handles dismiss, actions and pausing. */
    queue?: ToastQueue | undefined;
    /** Toasts to show when there is no `queue`. */
    toasts?: ToastItem[] | undefined;
    ondismiss?: ((id: number) => void) | undefined;
    /** A toast's action button was pressed (without `queue`). */
    onaction?: ((id: number) => void) | undefined;
    /** Pointer or focus arrived on the stack: stop the countdowns (without `queue`). */
    onpause?: (() => void) | undefined;
    onresume?: (() => void) | undefined;
    /** Distance from the edge, e.g. to clear floating action buttons. */
    offset?: string;
    /** Which corner (or edge centre) the stack grows from. */
    placement?: 'bottom-end' | 'bottom-center' | 'top-end' | 'top-center';
    /** A success (`ok`) toast arrives with a small burst of sprinkles. */
    sprinkle?: boolean;
    dismissLabel?: string;
    /** Accessible name of the stack. */
    label?: string;
  }

  let {
    queue,
    toasts,
    ondismiss,
    onaction,
    onpause,
    onresume,
    offset = 'var(--space-8)',
    placement = 'bottom-end',
    sprinkle = false,
    dismissLabel = 'Dismiss',
    label = 'Notifications',
  }: Props = $props();

  const items = $derived(queue?.items ?? toasts ?? []);
  const dismiss = $derived(
    queue
      ? (id: number) => queue.dismiss(id)
      : ondismiss
        ? (id: number) => ondismiss(id)
        : undefined,
  );
  const fromTop = $derived(placement.startsWith('top'));
  const fromSide = $derived(placement.endsWith('end'));
  const flipMotion = motion('base');

  function act(toast: ToastItem) {
    if (queue) queue.act(toast.id);
    else if (onaction) onaction(toast.id);
    else {
      toast.action?.onaction();
      ondismiss?.(toast.id);
    }
  }

  let hovered = false;
  let focused = false;
  let paused = false;
  function sync() {
    const next = hovered || focused;
    if (next === paused) return;
    paused = next;
    if (queue) {
      if (next) queue.pause();
      else queue.resume();
    } else if (next) onpause?.();
    else onresume?.();
  }
  function onfocusout(event: FocusEvent) {
    const stack = event.currentTarget as HTMLElement;
    if (event.relatedTarget instanceof Node && stack.contains(event.relatedTarget)) return;
    focused = false;
    sync();
  }

  // Once per toast, when it lands: the joy belongs to the moment the task finished.
  function landed(node: HTMLElement, tone: ToastItem['tone']) {
    if (!sprinkle || tone !== 'ok') return;
    const m = motion('base', 'out', node);
    const timer = setTimeout(
      () => celebrate(node.querySelector('svg') ?? node, 8),
      m.reduced ? 0 : m.duration,
    );
    return { destroy: () => clearTimeout(timer) };
  }
</script>

<div
  class="toasts toasts--{placement}"
  style:--toast-offset={offset}
  role="region"
  aria-label={label}
  aria-live="polite"
  onpointerenter={() => ((hovered = true), sync())}
  onpointerleave={() => ((hovered = false), sync())}
  onfocusin={() => ((focused = true), sync())}
  {onfocusout}
>
  {#each items as toast (toast.id)}
    <div
      class="slot"
      animate:flip={{
        duration: flipMotion.reduced ? 0 : flipMotion.duration,
        easing: flipMotion.ease,
      }}
      in:glide={{ x: fromSide ? 48 : 0, y: fromSide ? 0 : fromTop ? -16 : 16, speed: 'slow' }}
      out:glide={{ x: fromSide ? 24 : 0, speed: 'quick' }}
      use:landed={toast.tone}
    >
      {#snippet undo()}
        <Button variant="plain" size="sm" label={toast.action?.label} onclick={() => act(toast)} />
      {/snippet}
      <Toast
        tone={toast.tone}
        message={toast.message}
        actions={toast.action ? undo : undefined}
        {dismissLabel}
        ondismiss={dismiss ? () => dismiss(toast.id) : undefined}
      />
    </div>
  {/each}
</div>

<style>
  .toasts {
    position: fixed;
    z-index: var(--z-toast);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    max-width: calc(100vw - 2 * var(--gutter));
    pointer-events: none;
  }
  .toasts--bottom-end,
  .toasts--bottom-center {
    bottom: calc(var(--toast-offset) + env(safe-area-inset-bottom, 0px));
  }
  .toasts--top-end,
  .toasts--top-center {
    top: calc(var(--toast-offset) + env(safe-area-inset-top, 0px));
  }
  .toasts--bottom-end,
  .toasts--top-end {
    right: var(--gutter);
    align-items: flex-end;
  }
  .toasts--bottom-center,
  .toasts--top-center {
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }
  .slot {
    pointer-events: auto;
  }
</style>
