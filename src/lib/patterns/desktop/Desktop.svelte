<script lang="ts">
  /**
   * Desktop — a whole screen: a wallpaper (by default the drifting tint mesh), the top shelf
   * (MenuBar), desktop icons, widgets, floating windows and the candy tray (Dock) at the
   * bottom. It manages the windows inside it — the one clicked last comes to the front with a
   * tint rim, the others step back — so a page only says which windows are open. Windows grow
   * out of their tray icon and shrink back into it. A right click on the wallpaper opens
   * `contextmenu`.
   *
   *   <Desktop wallpaper="/beach.jpg" icons={files} onopen={openFile}>
   *     {#snippet menubar()}<MenuBar … />{/snippet}
   *     {#snippet dock()}<Dock … />{/snippet}
   *     <Window title="Notes">…</Window>
   *   </Desktop>
   *
   * On phones the icons and widgets become a scrolling home screen and windows open as sheets.
   */
  import { untrack, type Snippet } from 'svelte';
  import Backdrop from '../templates/Backdrop.svelte';
  import AppIcon from '../atoms/AppIcon.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import {
    WindowManager,
    rove,
    setDesktop,
    type ContextMenuItem,
    type DesktopIcon,
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
    /** Right-click menu of the wallpaper. */
    contextmenu?: ContextMenuItem[] | undefined;
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
    contextmenu,
    contained = false,
    iconsLabel = 'Desktop',
    menubar,
    dock,
    widgets,
    children,
  }: Props = $props();

  const manager = setDesktop(new WindowManager());

  // `focused` mirrors the manager both ways: clicks report out, the page can bring one forward.
  $effect(() => {
    const front = manager.focused;
    untrack(() => {
      if (focused !== front) focused = front;
    });
  });
  $effect(() => {
    const want = focused;
    untrack(() => {
      if (want && manager.order.includes(want)) manager.focus(want);
    });
  });
  let list = $state<HTMLElement>();
  const focusId = $derived(selected ?? icons[0]?.id);

  function onIconKeydown(event: KeyboardEvent, icon: DesktopIcon) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onopen?.(icon);
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

  function wallpaperOnly(event: MouseEvent | KeyboardEvent): ContextMenuItem[] | undefined {
    const target = event.target as HTMLElement;
    return target.closest('.window, .widgets, [role="option"], [role="dialog"]') ? [] : undefined;
  }
</script>

<div class="desktop" class:contained>
  <Backdrop color={background} image={wallpaper} {gradient} {animate} position="contained" />
  {#if menubar}<div class="menubar">{@render menubar()}</div>{/if}

  <ContextMenu items={contextmenu ?? []} onopen={wallpaperOnly} disabled={!contextmenu}>
    <div
      class="area"
      class:has-dock={!!dock}
      bind:this={manager.area}
      role="presentation"
      onpointerdown={onAreaPointerDown}
    >
      {#if widgets}<div class="widgets">{@render widgets()}</div>{/if}
      {#if icons.length}
        <div class="icons" role="listbox" aria-label={iconsLabel} bind:this={list}>
          {#each icons as icon (icon.id)}
            <div
              class="icon"
              role="option"
              aria-selected={selected === icon.id}
              aria-label={icon.meta ? `${icon.label}, ${icon.meta}` : icon.label}
              tabindex={focusId === icon.id ? 0 : -1}
              data-id={icon.id}
              onclick={() => (selected = icon.id)}
              ondblclick={() => onopen?.(icon)}
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
              <span class="name">{icon.label}</span>
              {#if icon.meta}<span class="meta">{icon.meta}</span>{/if}
            </div>
          {/each}
        </div>
      {/if}
      {@render children?.()}
    </div>
  </ContextMenu>

  {#if dock}<div class="dock">{@render dock()}</div>{/if}
</div>

<style>
  .desktop {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: minmax(0, 1fr);
    height: 100dvh;
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
    grid-template-rows: repeat(auto-fill, 6.5rem);
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
    max-width: 100%;
    padding: 1px 7px;
    border-radius: var(--radius-pill);
    color: var(--text);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    line-height: 1.3;
    overflow-wrap: anywhere;
    /* Readable on any wallpaper. */
    text-shadow: 0 1px 2px var(--glass-strong);
  }
  .meta {
    color: var(--text-2);
    font-size: var(--fs-2xs);
    text-shadow: 0 1px 2px var(--glass-strong);
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
