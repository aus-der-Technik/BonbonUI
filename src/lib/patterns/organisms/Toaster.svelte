<script lang="ts">
  /**
   * Toaster organism — the stack of toasts floating in a corner, announced politely. Toasts are
   * an overlay, not a page layer, so the stack is fixed to the viewport; new ones slide in from
   * their edge and the others glide aside. With `sprinkle`, a success toast throws a few
   * sprinkles from its icon — off by default, because apps that save often would celebrate
   * constantly (delight belongs to the end of a real task, not to every autosave). Feed it `ToastQueue.items` (utils/toasts.svelte.ts):
   *
   *   <Toaster toasts={toasts.items} ondismiss={(id) => toasts.dismiss(id)} />
   */
  import { flip } from 'svelte/animate';
  import { cubicOut, quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import Toast from '../molecules/Toast.svelte';
  import type { ToastItem } from '../../utils/toasts.svelte';
  import { celebrate } from '../../utils/delight';

  interface Props {
    toasts: ToastItem[];
    ondismiss?: ((id: number) => void) | undefined;
    /** Distance from the edge, e.g. to clear floating action buttons. */
    offset?: string;
    /** Which corner (or edge centre) the stack grows from. */
    placement?: 'bottom-end' | 'bottom-center' | 'top-end' | 'top-center';
    /** A success (`ok`) toast arrives with a small burst of sprinkles. */
    sprinkle?: boolean;
  }

  let {
    toasts,
    ondismiss,
    offset = 'var(--space-8)',
    placement = 'bottom-end',
    sprinkle = false,
  }: Props = $props();

  const reducedMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = (ms: number) => (reducedMotion ? 0 : ms);
  const fromTop = $derived(placement.startsWith('top'));
  const fromSide = $derived(placement.endsWith('end'));

  // Once per toast, when it lands: the joy belongs to the moment the task finished.
  function landed(node: HTMLElement, tone: ToastItem['tone']) {
    if (!sprinkle || tone !== 'ok') return;
    const timer = setTimeout(() => celebrate(node.querySelector('svg') ?? node, 8), motion(200));
    return { destroy: () => clearTimeout(timer) };
  }
</script>

<div class="toasts toasts--{placement}" style:--toast-offset={offset} aria-live="polite">
  {#each toasts as toast (toast.id)}
    <div
      class="slot"
      animate:flip={{ duration: motion(240), easing: cubicOut }}
      in:fly={{
        x: fromSide ? 48 : 0,
        y: fromSide ? 0 : fromTop ? -16 : 16,
        duration: motion(360),
        easing: quintOut,
        opacity: 0,
      }}
      out:fly={{ x: fromSide ? 24 : 0, duration: motion(180), easing: cubicOut, opacity: 0 }}
      use:landed={toast.tone}
    >
      <Toast
        tone={toast.tone}
        message={toast.message}
        ondismiss={ondismiss ? () => ondismiss(toast.id) : undefined}
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
