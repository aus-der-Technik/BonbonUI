<script lang="ts" module>
  /** Where the panel opens: a point (the pointer) or the edges of an element it opens under. */
  interface Spot {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }

  /**
   * Places a `w` × `h` panel at `spot`: below and to the right, flipped to the left or above
   * where the viewport has no room, then clamped into it. `above` keeps an earlier choice, so a
   * panel that grows while open slides instead of jumping to the other side.
   */
  function place(spot: Spot, w: number, h: number, above?: boolean) {
    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const roomRight = vw - margin - spot.left;
    const roomLeft = spot.right - margin;
    const left = w > roomRight && roomLeft > roomRight ? spot.right - w : spot.left;
    const roomBelow = vh - margin - spot.bottom;
    const roomAbove = spot.top - margin;
    const up = above ?? (h > roomBelow && roomAbove > roomBelow);
    const clamp = (v: number, max: number) => Math.max(margin, Math.min(v, max));
    const x = clamp(left, vw - w - margin);
    const y = clamp(up ? spot.top - h : spot.bottom, vh - h - margin);
    // It grows out of the corner that touches the pointer (or the element).
    const ox = Math.min(Math.max((left === spot.left ? spot.left : spot.right) - x, 0), w);
    const oy = Math.min(Math.max((up ? spot.top : spot.bottom) - y, 0), h);
    return { x, y, above: up, origin: `${Math.round(ox)}px ${Math.round(oy)}px` };
  }
</script>

<script lang="ts" generics="T">
  /**
   * ContextPanel — the right-click panel: like ContextMenu, but it holds content instead of a
   * list of items (an in-place edit form, a comment thread), at the pointer. Right-click (or
   * the Menu key / Shift+F10 on a focused element) inside `children`: `onopen` gets the event
   * and returns the thing under the pointer; nothing (null / undefined) leaves the browser's own
   * menu alone. The `panel` snippet renders that target with a `close` function.
   *
   *   <ContextPanel onopen={(event) => rowAt(event)} label="Rename">
   *     {#snippet panel(row, close)}<RenameForm {row} ondone={close} />{/snippet}
   *     <FileList />
   *   </ContextPanel>
   *
   * `openAt(x, y, target)` and `openFor(element, target)` open it from a button or a marker.
   * It floats on glass in the top layer, so no panel, window or transform clips it, and stays
   * inside the viewport (flipped near an edge, sliding as it grows). It is rendered in place, so
   * it keeps the theme and tint of where it opened and the snippet is ordinary content of the
   * caller. Escape, a press outside or `close()` shut it and focus returns where it was; popups
   * opened from inside it (a Popover, a menu, a select, a dialog) do not count as outside.
   */
  import { tick, type Snippet } from 'svelte';
  import { fromOtherModal } from '../../utils/overlay';

  interface Props {
    /** Called on right-click or the menu keys: the thing to show, or nothing to stand aside. */
    onopen: (event: MouseEvent | KeyboardEvent) => T | null | undefined;
    onclose?: (() => void) | undefined;
    /** Accessible name of the panel. */
    label: string;
    /** Panel width (any CSS length); content decides when unset. */
    width?: string | undefined;
    /** Right-click and the menu keys leave the browser's menu alone; `openAt` still opens. */
    disabled?: boolean;
    /** Inner padding of the panel. */
    padding?: 'none' | 'sm' | 'md';
    /** The panel's content for a target, with a function that closes it. */
    panel: Snippet<[T, () => void]>;
    /** The area that answers a right-click. */
    children: Snippet;
  }

  let {
    onopen,
    onclose,
    label,
    width,
    disabled = false,
    padding = 'md',
    panel,
    children,
  }: Props = $props();

  const FOCUSABLE =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // One opening: the target, where it opened, and a counter so a new one replays the entrance.
  let opened = $state<{ target: T; spot: Spot; n: number } | null>(null);
  let el = $state<HTMLDivElement>();
  let returnFocus: HTMLElement | null = null;
  let count = 0;

  function open(target: T, spot: Spot) {
    if (!opened) returnFocus = document.activeElement as HTMLElement | null;
    opened = { target, spot, n: ++count };
  }

  /** Opens the panel for `target` with its corner at (`x`, `y`) in viewport pixels. */
  export function openAt(x: number, y: number, target: T): void {
    open(target, { left: x, right: x, top: y, bottom: y });
  }

  /** Opens the panel for `target` under `element` (above it near the bottom edge). */
  export function openFor(element: Element, target: T): void {
    const r = element.getBoundingClientRect();
    open(target, { left: r.left, right: r.right, top: r.top - 4, bottom: r.bottom + 4 });
    if (element instanceof HTMLElement) returnFocus = element;
  }

  /** Closes the panel; focus goes back to where it was before it opened. */
  export function close(): void {
    shut(true);
  }

  function shut(restore: boolean) {
    if (!opened) return;
    opened = null;
    onclose?.();
    if (restore) returnFocus?.focus?.({ preventScroll: true });
    returnFocus = null;
  }

  /** Whether the panel is showing. */
  export function isOpen(): boolean {
    return !!opened;
  }

  const closePanel = () => close();

  function oncontextmenu(event: MouseEvent) {
    if (disabled) return;
    const target = onopen(event);
    if (target == null) return;
    event.preventDefault();
    openAt(event.clientX, event.clientY, target);
  }

  function onkeydown(event: KeyboardEvent) {
    if (disabled || !(event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')))
      return;
    const target = onopen(event);
    if (target == null) return;
    event.preventDefault();
    openFor(event.target as Element, target);
  }

  /** A press in a popup opened from the panel (rendered elsewhere in the top layer, like a
   *  ContextMenu or a dialog) belongs to the panel. */
  function belongs(node: EventTarget | null): boolean {
    if (!(node instanceof Node) || !el) return false;
    if (el.contains(node)) return true;
    const host = node instanceof Element ? node : node.parentElement;
    const popup = host?.closest('[popover], dialog[open], [aria-modal="true"]');
    return !!popup && popup !== el && !popup.contains(el);
  }

  $effect(() => {
    const now = opened;
    const panelEl = el;
    if (!now || !panelEl) return;

    try {
      if (typeof panelEl.showPopover === 'function' && !panelEl.matches(':popover-open')) {
        panelEl.showPopover();
      }
    } catch {
      /* no popover API: `position: fixed` remains */
    }
    let above: boolean | undefined;
    const reposition = () => {
      const at = place(now.spot, panelEl.offsetWidth, panelEl.offsetHeight, above);
      above = at.above;
      panelEl.style.left = `${at.x}px`;
      panelEl.style.top = `${at.y}px`;
      panelEl.style.transformOrigin = at.origin;
    };
    reposition();

    void tick().then(() => {
      if (!panelEl.isConnected) return;
      const first =
        panelEl.querySelector<HTMLElement>('[data-autofocus]') ??
        panelEl.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panelEl).focus({ preventScroll: true });
    });

    // A thread that grows or a form that shows an error keeps the panel inside the viewport.
    const observer =
      typeof ResizeObserver === 'function' ? new ResizeObserver(() => reposition()) : undefined;
    observer?.observe(panelEl);

    const outside = (event: PointerEvent) => {
      if (!belongs(event.target)) shut(false);
    };
    // On the window, after everything else: a popup inside that handled Escape (a Popover, a
    // menu, an armed delete) marks it handled, and the panel stays.
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      if (fromOtherModal(event, panelEl)) return;
      const popup = (event.target as Element | null)?.closest?.('[popover]');
      if (popup && popup !== panelEl) return;
      event.preventDefault();
      close();
    };
    document.addEventListener('pointerdown', outside, true);
    window.addEventListener('keydown', escape);
    window.addEventListener('resize', reposition);
    return () => {
      observer?.disconnect();
      document.removeEventListener('pointerdown', outside, true);
      window.removeEventListener('keydown', escape);
      window.removeEventListener('resize', reposition);
    };
  });

  // The panel is not inside the area, but an outer right-click area must not open over it.
  function keepInside(event: Event) {
    event.stopPropagation();
  }
</script>

<!-- display: contents — the wrapper only listens, it adds no box to the layout. -->
<div class="target" role="presentation" {oncontextmenu} {onkeydown}>
  {@render children()}
</div>

{#if opened}
  {#key opened.n}
    <div
      bind:this={el}
      class="panel panel--pad-{padding}"
      class:sized={!!width}
      popover="manual"
      role="dialog"
      aria-label={label}
      tabindex="-1"
      style:width
      oncontextmenu={keepInside}
    >
      {@render panel(opened.target, closePanel)}
    </div>
  {/key}
{/if}

<style>
  .target {
    display: contents;
  }
  .panel {
    position: fixed;
    inset: auto;
    margin: 0;
    z-index: var(--z-popover);
    box-sizing: border-box;
    max-width: calc(100vw - 16px);
    max-height: calc(100dvh - 16px);
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
    /* Position and transform-origin are set inline, at the pointer. */
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .panel:not(.sized) {
    max-width: min(28rem, calc(100vw - 16px));
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
