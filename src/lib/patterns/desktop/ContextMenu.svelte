<script lang="ts">
  /**
   * ContextMenu — the right-click menu. Wrap any content; a right click (or the Menu key /
   * Shift+F10 on a focused element inside) opens the menu at the pointer, in the top layer so
   * no glass or window clips it. Arrows move, Enter picks, Escape or a click outside closes.
   *
   *   <ContextMenu items={[{ label: 'Rename', onselect: rename }, { separator: true }, …]}>
   *     <FileGrid />
   *   </ContextMenu>
   *
   * `onopen` sees the event first; return items from it to build a menu for the clicked thing.
   */
  import { flushSync, mount, onDestroy, unmount, type Snippet } from 'svelte';
  import MenuList from './MenuList.svelte';
  import type { ContextMenuItem } from './shared.svelte';

  interface Props {
    items?: ContextMenuItem[];
    /** Accessible name of the menu. */
    label?: string;
    /** Called on open; may return the items to show (e.g. for the right-clicked row). */
    onopen?:
      ((event: MouseEvent | KeyboardEvent) => ContextMenuItem[] | void | undefined) | undefined;
    onclose?: (() => void) | undefined;
    disabled?: boolean;
    children: Snippet;
  }

  let {
    items = [],
    label = 'Context menu',
    onopen,
    onclose,
    disabled = false,
    children,
  }: Props = $props();

  let target: HTMLDivElement;
  let layer: HTMLDivElement | undefined;
  let menu: { focusFirst: (last?: boolean) => void } | undefined;
  let returnFocus: HTMLElement | null = null;

  /*
   * The menu is mounted into its own popover at the end of <body>: windows and glass panels
   * (backdrop filters, transforms, overflow) can neither clip nor offset it there. It takes the
   * theme, tint and shape of the place it was opened from.
   */
  function show(event: MouseEvent | KeyboardEvent, at: { x: number; y: number }) {
    const shown = onopen?.(event) ?? items;
    if (!shown.length) return;
    event.preventDefault();
    close(false);
    returnFocus = document.activeElement as HTMLElement | null;

    const host = document.createElement('div');
    host.setAttribute('popover', 'manual');
    host.className = 'bb-context-menu';
    host.dataset['tint'] = '';
    const theme = target.closest<HTMLElement>('[data-theme]')?.dataset['theme'];
    if (theme) host.dataset['theme'] = theme;
    const computed = getComputedStyle(target);
    for (const name of ['--tint', '--radius-scale', '--density']) {
      const value = computed.getPropertyValue(name);
      if (value) host.style.setProperty(name, value);
    }
    Object.assign(host.style, {
      position: 'fixed',
      inset: 'auto',
      left: `${at.x}px`,
      top: `${at.y}px`,
      margin: '0',
      padding: '0',
      border: '0',
      background: 'none',
      overflow: 'visible',
      color: 'var(--text)',
      zIndex: 'var(--z-popover)',
    });
    document.body.append(host);
    layer = host;
    menu = mount(MenuList, {
      target: host,
      props: { items: shown, label, onclose: () => close() },
    });
    flushSync();
    (host as HTMLElement & { showPopover?: () => void }).showPopover?.();

    // Keep the menu on screen: flip it to the other side of the pointer near an edge.
    const { offsetWidth: w, offsetHeight: h } = host;
    if (at.x + w > window.innerWidth - 8) host.style.left = `${Math.max(8, at.x - w)}px`;
    if (at.y + h > window.innerHeight - 8)
      host.style.top = `${Math.max(8, window.innerHeight - h - 8)}px`;
    menu.focusFirst();
  }

  function oncontextmenu(event: MouseEvent) {
    if (disabled) return;
    show(event, { x: event.clientX, y: event.clientY });
  }

  function onkeydown(event: KeyboardEvent) {
    if (disabled || !(event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')))
      return;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    show(event, { x: rect.left + 8, y: rect.bottom + 4 });
  }

  function close(restore = true) {
    if (!layer) return;
    if (menu) void unmount(menu);
    layer.remove();
    layer = undefined;
    menu = undefined;
    onclose?.();
    if (restore) returnFocus?.focus?.();
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (layer && !layer.contains(event.target as Node)) close(false);
  }

  onDestroy(() => close(false));
</script>

<svelte:document onpointerdown={onDocumentPointerDown} />
<svelte:window onblur={() => close(false)} onresize={() => close(false)} />

<!-- display: contents — the wrapper only listens, it adds no box to the layout. -->
<div class="target" role="presentation" bind:this={target} {oncontextmenu} {onkeydown}>
  {@render children()}
</div>

<style>
  .target {
    display: contents;
  }
</style>
