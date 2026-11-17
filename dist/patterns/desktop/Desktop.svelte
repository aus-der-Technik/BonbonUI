<script lang="ts">
  /**
   * Desktop — a whole screen: a wallpaper (by default the drifting tint mesh), the top shelf
   * (MenuBar), desktop icons, widgets, floating windows and the candy tray (Dock) at the
   * bottom. It manages the windows inside it — the one clicked last comes to the front with a
   * tint rim, the others step back — so a page only says which windows are open. A window grows
   * out of what opened it: the desktop icon double-clicked, the tile in the AppJar, the
   * CommandPalette row; otherwise out of its tray icon. Minimised, it shrinks into the tray. A
   * right click on the wallpaper opens `contextmenu`; given as a function it gets the point
   * where an icon dropped there would sit, so a new item lands under the pointer.
   *
   * Icons line up along the right edge, or sit where their `x`/`y` put them. Set `renaming` to
   * an icon's id (or press F2 on it) and its name becomes a field: Enter or leaving it keeps
   * the new name (`onrename`), Escape keeps the old one; the new name glows once.
   *
   *   <Desktop wallpaper="/beach.jpg" icons={files} onopen={openFile} bind:manager
   *     bind:renaming onrename={(id, name) => …}
   *     contextmenu={(at) => [{ label: 'New folder', onselect: () => add({ ...at }) }]}>
   *     {#snippet menubar()}<MenuBar … />{/snippet}
   *     {#snippet dock()}<Dock … />{/snippet}
   *     <Window title="Notes">…</Window>
   *   </Desktop>
   *
   * `bind:manager` hands the page the WindowManager, e.g. to let a window grow out of
   * something of its own (`manager.openFrom(button, 'notes')`).
   *
   * On phones the icons and widgets become a scrolling home screen and windows open as sheets.
   */
  import { tick, untrack, type Snippet } from 'svelte';
  import Backdrop from '../templates/Backdrop.svelte';
  import AppIcon from '../atoms/AppIcon.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import { flashChanged } from '../atoms/changed';
  import { glide } from '../../utils/motion';
  import {
    WindowManager,
    rove,
    setDesktop,
    type ContextMenuItem,
    type DesktopIcon,
    type DesktopPoint,
  } from './shared.svelte';

  interface Props {
    /** Wallpaper image URL (or any CSS image / gradient). */
    wallpaper?: string | undefined;
    /** Base colour or CSS background under the wallpaper. */
    background?: string | undefined;
    /** The drifting tint mesh. */
    gradient?: boolean;
    animate?: boolean;
    /** Files and apps on the desktop surface. */
    icons?: DesktopIcon[];
    /** The selected desktop icon. */
    selected?: string | undefined;
    /** Id of the front window; set it to bring a window to the front. */
    focused?: string | undefined;
    /** Double click or Enter on a desktop icon. */
    onopen?: ((icon: DesktopIcon) => void) | undefined;
    /** Id of the icon whose name is being typed; bind it. */
    renaming?: string | undefined;
    /** A rename was committed with a new, non-empty name. */
    onrename?: ((id: string, name: string) => void) | undefined;
    /** Accessible name of the rename field. */
    renameLabel?: string;
    /**
     * Right-click menu of the wallpaper. As a function it gets `at`: the `x`/`y` that puts an
     * icon's tile right under the pointer.
     */
    contextmenu?: ContextMenuItem[] | ((at: DesktopPoint) => ContextMenuItem[]) | undefined;
    /** The desktop's window manager (read it with `bind:manager`, or pass your own). */
    manager?: WindowManager | undefined;
    /** Fills its parent instead of the viewport (previews). */
    contained?: boolean;
    /** Accessible name of the icon list. */
    iconsLabel?: string;
    menubar?: Snippet | undefined;
    dock?: Snippet | undefined;
    /** A column of Widgets on the left. */
    widgets?: Snippet | undefined;
    /** Windows and overlays. */
    children?: Snippet | undefined;
  }

  let {
    wallpaper,
    background,
    gradient = true,
    animate = true,
    icons = [],
    selected = $bindable(),
    focused = $bindable(),
    onopen,
    renaming = $bindable(),
    onrename,
    renameLabel = 'Name',
    contextmenu,
    manager = $bindable(),
    contained = false,
    iconsLabel = 'Desktop',
    menubar,
    dock,
    widgets,
    children,
  }: Props = $props();

  const wm = setDesktop(untrack(() => manager) ?? new WindowManager());
  if (manager !== wm) manager = wm;

  // `focused` mirrors the manager both ways: clicks report out, the page can bring one forward.
  $effect(() => {
    const front = wm.focused;
    untrack(() => {
      if (focused !== front) focused = front;
    });
  });
  $effect(() => {
    const want = focused;
    untrack(() => {
      if (want && wm.order.includes(want)) wm.focus(want);
    });
  });
  let list = $state<HTMLElement>();
  let trayRow = $state<HTMLElement>();
  const focusId = $derived(selected ?? icons[0]?.id);

  /** Opens an icon; the window it opens grows out of the icon's tile. */
  function open(event: Event, icon: DesktopIcon) {
    if (!onopen) return;
    const el = event.currentTarget as HTMLElement;
    wm.openFrom(el.querySelector('.tile') ?? el);
    onopen(icon);
  }

  function onIconKeydown(event: KeyboardEvent, icon: DesktopIcon) {
    if (event.key === 'F2' && onrename) {
      event.preventDefault();
      selected = icon.id;
      renaming = icon.id;
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      open(event, icon);
      return;
    }
    if (event.key === ' ') {
      event.preventDefault();
      selected = icon.id;
      return;
    }
    const items = [...(list?.querySelectorAll<HTMLElement>('[role="option"]') ?? [])];
    if (rove(event, items)) selected = (document.activeElement as HTMLElement).dataset['id'];
  }

  function onAreaPointerDown(event: PointerEvent) {
    // A click on the bare wallpaper clears the icon selection.
    if (event.target === event.currentTarget) selected = undefined;
  }

  /** The wallpaper's menu — never over a window, a widget, an icon or a dialog. */
  function wallpaperMenu(event: MouseEvent | KeyboardEvent): ContextMenuItem[] | undefined {
    const target = event.target as HTMLElement;
    if (target.closest('.window, .widgets, [role="option"], [role="dialog"]')) return [];
    if (typeof contextmenu !== 'function') return undefined;
    return contextmenu(dropPoint(event));
  }

  /** Where an icon dropped at the event's point would sit: its tile centred on the pointer. */
  function dropPoint(event: MouseEvent | KeyboardEvent): DesktopPoint {
    const area = wm.area;
    const box = area?.getBoundingClientRect();
    if (!area || !box) return { x: 0, y: 0 };
    const at =
      event instanceof MouseEvent
        ? { x: event.clientX, y: event.clientY }
        : { x: box.left + box.width / 2, y: box.top + box.height / 3 };
    const rem = parseFloat(getComputedStyle(area).fontSize) || 16;
    // Half an icon cell across (6.5rem), and down to the middle of the 54px tile.
    const x = at.x - box.left + area.scrollLeft - 3.25 * rem;
    const y = at.y - box.top + area.scrollTop - 36;
    const maxX = Math.max(0, area.clientWidth - 6.5 * rem);
    // Above the tray, which floats over the bottom of the area.
    const tray = trayRow?.getBoundingClientRect();
    const floor = tray?.height ? tray.top - box.top + area.scrollTop : area.clientHeight;
    const maxY = Math.max(0, floor - 8.25 * rem);
    return {
      x: Math.round(Math.max(0, Math.min(x, maxX))),
      y: Math.round(Math.max(0, Math.min(y, maxY))),
    };
  }

  const placed = (icon: DesktopIcon) => icon.x !== undefined && icon.y !== undefined;

  /** The name field: Enter or leaving keeps the new name, Escape the old one. */
  function nameField(node: HTMLInputElement, icon: DesktopIcon) {
    node.value = icon.label;
    void tick().then(() => {
      node.focus();
      // The name without its extension is selected, ready to be typed over.
      const dot = node.value.lastIndexOf('.');
      node.setSelectionRange(0, dot > 0 ? dot : node.value.length);
    });
    let settled = false;
    const finish = async (keep: boolean) => {
      // Chrome blurs a field it removes: the first ending wins.
      if (settled) return;
      settled = true;
      const name = node.value.trim();
      const changed = keep && !!name && name !== icon.label;
      if (changed) onrename?.(icon.id, name);
      const hadFocus = document.activeElement === node;
      if (renaming === icon.id) renaming = undefined;
      await tick();
      const option = list?.querySelector<HTMLElement>(`[data-id="${CSS.escape(icon.id)}"]`);
      if (hadFocus) option?.focus();
      const label = option?.querySelector<HTMLElement>('.name');
      if (changed && label) flashChanged(label);
    };
    const onkeydown = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === 'Enter') void finish(true);
      else if (e.key === 'Escape') {
        e.preventDefault();
        void finish(false);
      }
    };
    const stop = (e: Event) => e.stopPropagation();
    const onblur = () => void finish(true);
    node.addEventListener('keydown', onkeydown);
    node.addEventListener('blur', onblur);
    node.addEventListener('dblclick', stop);
    return {
      destroy() {
        node.removeEventListener('keydown', onkeydown);
        node.removeEventListener('blur', onblur);
        node.removeEventListener('dblclick', stop);
      },
    };
  }
</script>

<div class="desktop" class:contained>
  <Backdrop color={background} image={wallpaper} {gradient} {animate} position="contained" />
  {#if menubar}<div class="menubar">{@render menubar()}</div>{/if}

  <ContextMenu
    items={Array.isArray(contextmenu) ? contextmenu : []}
    onopen={wallpaperMenu}
    disabled={!contextmenu}
  >
    <div
      class="area"
      class:has-dock={!!dock}
      bind:this={wm.area}
      role="presentation"
      onpointerdown={onAreaPointerDown}
    >
      {#if widgets}<div class="widgets">{@render widgets()}</div>{/if}
      {#if icons.length}
        <div class="icons" role="listbox" aria-label={iconsLabel} bind:this={list}>
          {#each icons as icon (icon.id)}
            <div
              class="icon"
              class:placed={placed(icon)}
              style:--icon-x={placed(icon) ? `${icon.x}px` : undefined}
              style:--icon-y={placed(icon) ? `${icon.y}px` : undefined}
              in:glide={{ scale: 0.5, speed: 'base', ease: 'spring' }}
              role="option"
              aria-selected={selected === icon.id}
              aria-label={icon.meta ? `${icon.label}, ${icon.meta}` : icon.label}
              tabindex={focusId === icon.id ? 0 : -1}
              data-id={icon.id}
              onclick={() => (selected = icon.id)}
              ondblclick={(e) => open(e, icon)}
              onkeydown={(e) => onIconKeydown(e, icon)}
            >
              <span class="tile">
                <AppIcon
                  label={icon.label}
                  icon={icon.icon}
                  color={icon.color ?? 'accent'}
                  src={icon.src}
                  badge={icon.badge}
                  size={54}
                />
              </span>
              {#if renaming === icon.id}
                <input class="rename" aria-label={renameLabel} use:nameField={icon} />
              {:else}
                <span class="name">{icon.label}</span>
              {/if}
              {#if icon.meta}<span class="meta">{icon.meta}</span>{/if}
            </div>
          {/each}
        </div>
      {/if}
      {@render children?.()}
    </div>
  </ContextMenu>

  {#if dock}<div class="dock" bind:this={trayRow}>{@render dock()}</div>{/if}
</div>

<style>
  .desktop {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: minmax(0, 1fr);
    /* The Application's height: the viewport, or its frame when contained. */
    height: var(--app-height, 100dvh);
    overflow: hidden;
    color: var(--text);
    font-family: var(--font-sans);
  }
  .contained {
    height: 100%;
    min-height: 32rem;
  }
  .menubar {
    grid-row: 1;
    position: relative;
    z-index: var(--z-front);
  }
  .area {
    /* Windows may slide under the dock, as on a real desktop. */
    grid-row: 2 / 4;
    grid-column: 1;
    position: relative;
    z-index: 0;
    isolation: isolate;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-6);
    min-height: 0;
    padding: var(--space-4) var(--space-5) calc(var(--space-12) * 2.4);
    overflow: hidden;
  }
  .has-dock {
    --dock-room: calc(var(--space-12) * 2);
  }
  .widgets {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: var(--space-4);
    max-height: 100%;
  }
  .icons {
    display: grid;
    grid-auto-flow: column;
    /* Room for the tile, a two-line name and its size line (≈ 131px), so a label is never
       squeezed or runs into the next icon. */
    grid-template-rows: repeat(auto-fill, 8.25rem);
    grid-auto-columns: 6.5rem;
    direction: rtl;
    gap: var(--space-2);
    max-height: 100%;
    margin-left: auto;
  }
  .icon {
    direction: ltr;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: var(--space-1);
    border-radius: var(--radius-md);
    text-align: center;
    cursor: default;
    user-select: none;
    outline: none;
  }
  .tile {
    display: block;
    padding: 5px;
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    transition:
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .icon:hover .tile {
    transform: translateY(-2px);
  }
  .icon:active .tile {
    transform: var(--press-squish);
    transition-timing-function: var(--ease-jelly);
  }
  .name {
    flex-shrink: 0;
    max-width: 100%;
    padding: 1px 7px;
    border-radius: var(--radius-pill);
    color: var(--text);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    line-height: 1.3;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* Readable on any wallpaper. */
    text-shadow: 0 1px 2px var(--glass-strong);
  }
  .meta {
    color: var(--text-2);
    font-size: var(--fs-2xs);
    text-shadow: 0 1px 2px var(--glass-strong);
  }
  /* Placed by hand: stays where it was put, but never hangs off the desktop. */
  .icon.placed {
    position: absolute;
    left: clamp(0px, var(--icon-x), calc(100% - 6.5rem));
    top: clamp(0px, var(--icon-y), calc(100% - 8.25rem - var(--dock-room, 0px)));
    width: 6.5rem;
    z-index: 0;
  }
  .rename {
    width: 100%;
    min-width: 0;
    padding: 1px 6px;
    border: 0;
    border-radius: var(--radius-sm);
    background: var(--input-bg);
    box-shadow:
      0 0 0 1px var(--accent-border),
      var(--focus-halo);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    text-align: center;
    outline: none;
  }
  .icon[aria-selected='true'] .tile {
    border-color: var(--layer-selected-border);
    background: var(--layer-selected-bg);
  }
  .icon[aria-selected='true'] .name {
    background: var(--accent);
    color: var(--on-accent);
    text-shadow: none;
  }
  .icon:focus-visible .tile {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  @media (prefers-reduced-motion: reduce) {
    .tile {
      transition: none;
    }
  }
  .dock {
    grid-row: 3;
    grid-column: 1;
    z-index: var(--z-front);
    display: flex;
    justify-content: center;
    padding-bottom: var(--sticky-gap);
    pointer-events: none;
  }
  .dock > :global(*) {
    pointer-events: auto;
  }

  @media (max-width: 720px) {
    .area {
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      overflow-y: auto;
      padding: var(--space-4) var(--space-4) calc(var(--space-12) * 2.2);
    }
    .widgets {
      flex-direction: row;
      max-height: none;
    }
    .icon.placed {
      position: static;
      width: auto;
    }
    .icons {
      grid-auto-flow: row;
      grid-template-rows: none;
      grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
      direction: ltr;
      max-height: none;
      margin-left: 0;
    }
  }
</style>
