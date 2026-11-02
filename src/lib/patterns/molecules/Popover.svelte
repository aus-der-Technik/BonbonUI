<script lang="ts" module>
  export type PopoverPlacement =
    'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end';

  /** Spread these on your own trigger element (the `trigger` snippet's argument). */
  export interface PopoverTriggerProps {
    'aria-expanded': boolean;
    'aria-controls': string;
    'aria-haspopup': 'dialog';
    onclick: (event: MouseEvent) => void;
  }
</script>

<script lang="ts">
  /**
   * Popover molecule — a floating liquid-glass panel anchored to its trigger: filters, a date
   * picker, a reaction picker, a short form. A click on the trigger toggles it; Escape, a click
   * outside or `close()` from inside shuts it and returns focus to the trigger. It renders in the
   * top layer (popover API) where supported, so scrolling containers never clip it, and flips
   * above the trigger when there is no room below. Focus moves to the first control inside, or
   * to an element marked `data-autofocus`.
   *
   *   <Popover label="Filters" icon="filter">…form…</Popover>
   *   <Popover title="Share">{#snippet trigger(props)}<button {...props}>Share</button>{/snippet}…</Popover>
   */
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import type { IconName } from '../atoms/icons';

  interface Props {
    open?: boolean;
    /** Text of the default trigger button and accessible name of the panel. */
    label?: string;
    icon?: IconName | undefined;
    /** Default trigger shows only its icon. */
    iconOnly?: boolean;
    variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    /** A heading inside the panel. */
    title?: string | undefined;
    placement?: PopoverPlacement;
    /** Panel width (any CSS length); content decides when unset. */
    width?: string | undefined;
    /** Inner padding of the panel. */
    padding?: 'none' | 'sm' | 'md';
    /** Moves focus into the panel when it opens. */
    autofocus?: boolean;
    /** Your own trigger instead of the button; spread the props onto it. */
    trigger?: Snippet<[PopoverTriggerProps]> | undefined;
    onopenchange?: ((open: boolean) => void) | undefined;
    /** The content; receives a `close` function. */
    children: Snippet<[() => void]>;
  }

  let {
    open = $bindable(false),
    label = 'More',
    icon,
    iconOnly = false,
    variant = 'secondary',
    size = 'md',
    title,
    placement = 'bottom-start',
    width,
    padding = 'md',
    autofocus = true,
    trigger,
    onopenchange,
    children,
  }: Props = $props();

  const id = $props.id();
  let anchor: HTMLSpanElement;
  let panel = $state<HTMLDivElement>();
  let pos = $state({ top: 0, left: 0, flipped: false, origin: 'top center' });

  const FOCUSABLE =
    'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  function setOpen(next: boolean, restoreFocus = false) {
    if (next === open) return;
    open = next;
    onopenchange?.(next);
    if (!next && restoreFocus) anchor?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }

  export function close(): void {
    setOpen(false, true);
  }

  const toggle = (event: MouseEvent) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const triggerProps = $derived<PopoverTriggerProps>({
    'aria-expanded': open,
    'aria-controls': `${id}-panel`,
    'aria-haspopup': 'dialog',
    onclick: toggle,
  });

  function place() {
    if (!panel || !anchor) return;
    const box = anchor.getBoundingClientRect();
    const own = panel.getBoundingClientRect();
    const margin = 8;
    const gap = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const wantsTop = placement.startsWith('top');
    const roomBelow = vh - box.bottom - gap;
    const roomAbove = box.top - gap;
    const flipped = wantsTop
      ? roomAbove < own.height && roomBelow > roomAbove
      : roomBelow < own.height && roomAbove > roomBelow;
    const top = wantsTop !== flipped ? box.top - gap - own.height : box.bottom + gap;
    const align = placement.split('-')[1] ?? 'center';
    let left =
      align === 'start'
        ? box.left
        : align === 'end'
          ? box.right - own.width
          : box.left + box.width / 2 - own.width / 2;
    left = Math.max(margin, Math.min(left, vw - own.width - margin));
    // Grow out of the trigger: the origin sits on the edge facing it, at its centre.
    const ox = Math.round(Math.max(0, Math.min(own.width, box.left + box.width / 2 - left)));
    const origin = `${ox}px ${wantsTop !== flipped ? 'bottom' : 'top'}`;
    pos = { top: Math.max(margin, top), left, flipped, origin };
  }

  $effect(() => {
    if (!open || !panel) return;
    const el = panel;
    // Top layer where available: escapes overflow clipping and transformed ancestors.
    try {
      if (typeof el.showPopover === 'function' && !el.matches(':popover-open')) el.showPopover();
    } catch {
      /* already shown, or the popover API is unsupported */
    }
    place();
    if (autofocus) {
      void tick().then(() => {
        const first =
          el.querySelector<HTMLElement>('[data-autofocus]') ??
          el.querySelector<HTMLElement>(FOCUSABLE);
        (first ?? el).focus({ preventScroll: true });
      });
    }

    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!el.contains(target) && !anchor.contains(target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false, true);
      }
    };
    const reposition = () => place();
    document.addEventListener('pointerdown', outside, true);
    document.addEventListener('keydown', escape);
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    return () => {
      document.removeEventListener('pointerdown', outside, true);
      document.removeEventListener('keydown', escape);
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  });
</script>

<span class="anchor" bind:this={anchor}>
  {#if trigger}
    {@render trigger(triggerProps)}
  {:else}
    <Button
      {variant}
      {size}
      {icon}
      {label}
      {iconOnly}
      aria-expanded={open}
      aria-controls="{id}-panel"
      aria-haspopup="dialog"
      onclick={toggle}
    />
  {/if}
</span>

{#if open}
  <div
    bind:this={panel}
    class="panel panel--pad-{padding}"
    id="{id}-panel"
    popover="manual"
    role="dialog"
    aria-label={title ?? label}
    tabindex="-1"
    style:top="{pos.top}px"
    style:left="{pos.left}px"
    style:transform-origin={pos.origin}
    style:width
  >
    {#if title}<p class="title">{title}</p>{/if}
    {@render children(close)}
  </div>
{/if}

<style>
  .anchor {
    display: inline-flex;
    position: relative;
  }
  .panel {
    position: fixed;
    inset: auto;
    margin: 0;
    z-index: var(--z-popover);
    max-width: min(28rem, calc(100vw - 16px));
    max-height: min(32rem, calc(100dvh - 16px));
    overflow: auto;
    overscroll-behavior: contain;
    color: var(--text);
    background: var(--layer-front-bg);
    border: 0.75px solid var(--layer-front-border);
    border-radius: var(--radius-pop);
    box-shadow:
      var(--shadow-pop),
      inset 0 1px 0 var(--pill-light);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    outline: none;
    /* transform-origin is set inline, at the trigger. */
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .panel--pad-none {
    padding: 0;
  }
  .panel--pad-sm {
    padding: var(--space-2);
  }
  .panel--pad-md {
    padding: var(--space-4);
  }
  .title {
    margin: 0 0 var(--space-3);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  @media (prefers-reduced-motion: reduce) {
    .panel {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .panel {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
