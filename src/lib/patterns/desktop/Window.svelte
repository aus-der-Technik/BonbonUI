<script lang="ts">
  /**
   * Window — a desktop app window. The title sits on the left with the app's small candy icon;
   * the window controls sit at the end of the title bar: minimise, zoom and — set apart by a
   * hairline — close, as plain glyph buttons that are readable at rest, 32px targets with a
   * tooltip naming the action. They stay neutral; close shows the danger colour only while it
   * is itself pointed at or focused. Optional toolbar in the title bar, a full-height sidebar
   * and a footer (status bar). In a narrow window the toolbar takes a row of its own.
   *
   * Inside a Desktop it floats: drag it by the title bar, resize it from the corner,
   * double-click the title bar to zoom. The front window wears the selected layer's tint rim;
   * the others flatten. Windows grow out of whatever opened them — a desktop icon, the app jar,
   * a palette row (`WindowManager.openFrom`) — else out of their app's icon in the Dock, and
   * shrink back into the Dock when minimised. On phone widths every window becomes a sheet. With `static` it is a
   * framed app preview in the page flow.
   *
   *   <Window title="Notes" icon="edit" color="yellow" bind:x bind:y onclose={() => (open = false)}>
   *     …
   *   </Window>
   *
   * Keyboard: the resize grip takes arrow keys (Shift + arrows moves the window).
   */
  import { untrack, type Snippet } from 'svelte';
  import AppIcon from '../atoms/AppIcon.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Tooltip from '../atoms/Tooltip.svelte';
  import type { IconName } from '../atoms/icons';
  import { space, type Space } from '../layout/space';
  import { getDesktop, type AppColor } from './shared.svelte';
  import { motion } from '../../utils/motion';

  interface Props {
    title: string;
    /** Grey line under the title. */
    subtitle?: string | undefined;
    /** Glyph of the small app icon before the title. */
    icon?: IconName | undefined;
    /** Colour of that icon: a palette name, `accent` or any CSS colour (default: accent). */
    color?: AppColor | undefined;
    /** The app's name, shown on top of the sidebar (the title then names the place). */
    app?: string | undefined;
    /** Identity in the desktop's stacking order and the Dock icon it grows from. */
    id?: string | undefined;
    x?: number;
    y?: number;
    /** Width / height in px (floating default 640 × 420; static: full width, auto height). */
    width?: number | undefined;
    height?: number | undefined;
    minWidth?: number;
    minHeight?: number;
    /** Outside a Desktop: whether it looks focused (inside one, the desktop decides). */
    focused?: boolean | undefined;
    maximized?: boolean | undefined;
    minimized?: boolean | undefined;
    /** A framed preview in the page flow instead of a floating window. */
    static?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    /** Inner padding of the content. */
    padding?: Space;
    /** In the title bar, after the title (buttons, a segmented control, a search). */
    toolbar?: Snippet | undefined;
    /** A full-height column on the left, under the app's name. */
    sidebar?: Snippet | undefined;
    sidebarWidth?: string;
    /** Under the content, e.g. a StatusBar. */
    footer?: Snippet | undefined;
    onclose?: (() => void) | undefined;
    onminimize?: (() => void) | undefined;
    onzoom?: ((maximized: boolean) => void) | undefined;
    onfocus?: (() => void) | undefined;
    closeLabel?: string;
    minimizeLabel?: string;
    zoomLabel?: string;
    resizeLabel?: string;
    /** Name of the window controls group; `{title}` is replaced. */
    controlsLabel?: string;
    class?: string;
    children?: Snippet | undefined;
  }

  let {
    title,
    subtitle,
    icon,
    color,
    app,
    id,
    x = $bindable(64),
    y = $bindable(48),
    width = $bindable(),
    height = $bindable(),
    minWidth = 280,
    minHeight = 180,
    focused,
    maximized = $bindable(false),
    minimized = $bindable(false),
    static: isStatic = false,
    resizable = true,
    draggable = true,
    padding = 'md',
    toolbar,
    sidebar,
    sidebarWidth = '13.5rem',
    footer,
    onclose,
    onminimize,
    onzoom,
    onfocus,
    closeLabel = 'Close',
    minimizeLabel = 'Minimize',
    zoomLabel = 'Zoom',
    resizeLabel = 'Resize window',
    controlsLabel = '{title} window controls',
    class: extraClass = '',
    children,
  }: Props = $props();

  const generated = $props.id();
  const wid = $derived(id ?? generated);
  const manager = getDesktop();
  const floating = $derived(!isStatic);
  const managed = $derived(!!manager && floating);
  const isFocused = $derived(managed ? manager!.focused === wid : (focused ?? true));
  /* The tint rim only means something where windows compete for focus; a lone preview stays
     plain unless it asks for it. */
  const rim = $derived(managed ? isFocused : focused === true);
  const dimmed = $derived(managed ? !isFocused : focused === false);
  const w = $derived(width ?? (floating ? 640 : undefined));
  const h = $derived(height ?? (floating ? 420 : undefined));

  let root: HTMLElement;

  $effect(() => {
    if (!manager || !floating || minimized) return;
    const me = wid;
    untrack(() => manager.register(me));
    return () => manager.unregister(me);
  });

  // ── Motion: grow out of the opener (or the tray), shrink back into it, pop away on close ──
  /** Without WAAPI (tests, old engines) windows simply appear and disappear. */
  const animates = () => typeof root?.animate === 'function';

  /** The centre of `rect` relative to `box`, as a transform origin. */
  function originAt(rect: DOMRect | undefined, box: DOMRect): string | undefined {
    if (!rect) return undefined;
    return `${rect.left + rect.width / 2 - box.left}px ${rect.top + rect.height / 2 - box.top}px`;
  }

  function play(el: HTMLElement, frames: Keyframe[], duration: number, easing: string) {
    try {
      return el.animate?.(frames, { duration, easing, fill: 'both' });
    } catch {
      return undefined;
    }
  }

  function arrive() {
    if (!managed || !animates() || !root?.isConnected) return;
    const origin = originAt(manager?.origin(wid), root.getBoundingClientRect());
    const m = motion(origin ? 'slow' : 'base', 'out', root);
    root.style.transformOrigin = origin ?? '50% 0%';
    const from = origin ? 'scale(0.14)' : 'translateY(10px) scale(0.97)';
    // Reduced motion: the window fades in where it stands.
    const anim = play(
      root,
      [
        m.reduced ? { opacity: 0 } : { opacity: 0, transform: from },
        { opacity: 1, transform: 'none' },
      ],
      m.duration,
      m.easing,
    );
    // Leave no transform behind: it would trap fixed-position children.
    const clear = () => anim?.cancel();
    anim?.finished?.then(clear, clear);
  }

  /*
   * Leaving windows are hidden (or removed) at once, so the page stays honest about its state;
   * a picture of the window — an inert copy — does the animation and removes itself.
   */
  let host: HTMLElement | null = null;
  function ghost(into: 'tray' | 'air') {
    if (!managed || !animates() || !root || !host?.isConnected) return;
    const copy = document.createElement('div');
    copy.className = `${root.className} ghost`;
    copy.style.cssText = root.style.cssText;
    copy.innerHTML = root.innerHTML;
    copy.setAttribute('aria-hidden', 'true');
    copy.inert = true;
    host.append(copy);
    const origin =
      into === 'tray' ? originAt(manager?.anchor(wid), copy.getBoundingClientRect()) : undefined;
    const m = origin ? motion('slow', 'in-out', root) : motion('base', 'out', root);
    copy.style.transformOrigin = origin ?? '50% 50%';
    const anim = play(
      copy,
      m.reduced
        ? [{ opacity: 1 }, { opacity: 0 }]
        : origin
          ? [
              { opacity: 1, transform: 'none' },
              { opacity: 0.6, offset: 0.7 },
              { opacity: 0, transform: 'scale(0.1)' },
            ]
          : [
              { opacity: 1, transform: 'none' },
              { opacity: 0, transform: 'scale(0.94)' },
            ],
      m.duration,
      m.easing,
    );
    const done = () => copy.remove();
    anim?.finished?.then(done, done);
    setTimeout(done, m.duration + 500);
  }

  let wasMinimized = untrack(() => minimized);
  // Before the DOM hides it: the copy must be taken while the window is still visible.
  $effect.pre(() => {
    const now = minimized;
    untrack(() => {
      if (now && !wasMinimized) ghost('tray');
      wasMinimized = now;
    });
  });
  $effect(() => {
    if (minimized || !floating) return;
    untrack(arrive);
  });
  $effect(() => {
    host = root.parentElement;
    return () => {
      if (!untrack(() => minimized)) ghost('air');
    };
  });

  function bringToFront() {
    if (manager && floating && manager.focused !== wid) {
      manager.focus(wid);
      onfocus?.();
    }
  }

  /** The element the window must stay inside. */
  function bounds(): { width: number; height: number } {
    const area = manager?.area ?? (root.offsetParent as HTMLElement | null);
    return { width: area?.clientWidth || Infinity, height: area?.clientHeight || Infinity };
  }

  function clamp(nextX: number, nextY: number) {
    const b = bounds();
    const ww = w ?? 0;
    x = Math.round(Math.max(0, Math.min(nextX, b.width - Math.min(ww, b.width))));
    // Keep the title bar reachable.
    y = Math.round(Math.max(0, Math.min(nextY, b.height - 44)));
  }

  const sheet = () => typeof matchMedia === 'function' && matchMedia('(max-width: 720px)').matches;

  function startDrag(event: PointerEvent) {
    if (!floating || !draggable || maximized || event.button !== 0 || sheet()) return;
    if ((event.target as HTMLElement).closest('button, a, input, select, textarea, [role="menu"]'))
      return;
    const startX = event.clientX - x;
    const startY = event.clientY - y;
    const handle = event.currentTarget as HTMLElement;
    handle.setPointerCapture?.(event.pointerId);
    root.classList.add('dragging');
    const move = (e: PointerEvent) => clamp(e.clientX - startX, e.clientY - startY);
    const up = () => {
      root.classList.remove('dragging');
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', up);
      handle.removeEventListener('pointercancel', up);
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  }

  function resizeTo(nextW: number, nextH: number) {
    const b = bounds();
    width = Math.round(Math.max(minWidth, Math.min(nextW, b.width - x)));
    height = Math.round(Math.max(minHeight, Math.min(nextH, b.height - y)));
  }

  function startResize(event: PointerEvent) {
    if (event.button !== 0) return;
    event.preventDefault();
    const sw = w ?? root.offsetWidth;
    const sh = h ?? root.offsetHeight;
    const ox = event.clientX;
    const oy = event.clientY;
    const handle = event.currentTarget as HTMLElement;
    handle.setPointerCapture?.(event.pointerId);
    const move = (e: PointerEvent) => resizeTo(sw + e.clientX - ox, sh + e.clientY - oy);
    const up = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', up);
      handle.removeEventListener('pointercancel', up);
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  }

  function onGripKeydown(event: KeyboardEvent) {
    const step = 16;
    const d: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const delta = d[event.key];
    if (!delta) return;
    event.preventDefault();
    if (event.shiftKey) clamp(x + delta[0], y + delta[1]);
    else resizeTo((w ?? root.offsetWidth) + delta[0], (h ?? root.offsetHeight) + delta[1]);
  }

  function zoom() {
    maximized = !maximized;
    onzoom?.(maximized);
  }

  function minimize() {
    minimized = true;
    onminimize?.();
  }
</script>

{#snippet controls()}
  <div class="controls" role="group" aria-label={controlsLabel.replace('{title}', title)}>
    <Tooltip text={minimizeLabel} placement="bottom">
      <button
        type="button"
        class="ctl minimize"
        aria-label={minimizeLabel}
        disabled={!floating && !onminimize}
        onclick={minimize}
      >
        <Icon name="minus" size={15} />
      </button>
    </Tooltip>
    <Tooltip text={zoomLabel} placement="bottom">
      <button
        type="button"
        class="ctl zoom"
        aria-label={zoomLabel}
        aria-pressed={maximized}
        disabled={!floating && !onzoom}
        onclick={zoom}
      >
        <Icon name={maximized ? 'minimize' : 'maximize'} size={14} />
      </button>
    </Tooltip>
    <span class="rule" aria-hidden="true"></span>
    <Tooltip text={closeLabel} placement="bottom">
      <button
        type="button"
        class="ctl close"
        aria-label={closeLabel}
        disabled={!onclose}
        onclick={() => onclose?.()}
      >
        <Icon name="close" size={14} />
      </button>
    </Tooltip>
  </div>
{/snippet}

{#snippet badge()}
  {#if icon}
    <span class="app-icon" aria-hidden="true">
      <AppIcon label="" {icon} color={color ?? 'accent'} size={22} />
    </span>
  {/if}
{/snippet}

<section
  bind:this={root}
  class="window {extraClass}"
  class:floating
  class:focused={isFocused}
  class:rim
  class:dimmed
  class:maximized
  class:has-sidebar={!!sidebar}
  aria-label={title}
  hidden={minimized}
  style:--win-x="{x}px"
  style:--win-y="{y}px"
  style:--win-w={w === undefined ? undefined : `${w}px`}
  style:--win-h={h === undefined ? undefined : `${h}px`}
  style:--win-pad={space(padding)}
  style:--win-sidebar={sidebarWidth}
  style:z-index={managed ? manager!.z(wid) : undefined}
  onpointerdowncapture={bringToFront}
  onfocusin={bringToFront}
>
  {#if sidebar}
    <aside class="sidebar">
      <!-- The sidebar's top strip is part of the title bar: it names the app and drags. -->
      <div class="sidebar-top" role="presentation" onpointerdown={startDrag} ondblclick={zoom}>
        {@render badge()}
        {#if app}<span class="app-name">{app}</span>{/if}
      </div>
      <div class="sidebar-body">{@render sidebar()}</div>
    </aside>
  {/if}
  <div class="main">
    <header
      class="titlebar"
      class:has-toolbar={!!toolbar}
      role="presentation"
      onpointerdown={startDrag}
      ondblclick={(e) =>
        !(e.target as HTMLElement).closest('button, input, a, select, textarea') && zoom()}
    >
      <div class="title">
        {#if !sidebar}{@render badge()}{/if}
        <div class="title-text">
          <h2>{title}</h2>
          {#if subtitle}<p>{subtitle}</p>{/if}
        </div>
      </div>
      {#if toolbar}<div class="toolbar">{@render toolbar()}</div>{/if}
      {@render controls()}
    </header>
    <div class="body">{@render children?.()}</div>
    {#if footer}<div class="footer">{@render footer()}</div>{/if}
  </div>
  {#if floating && resizable && !maximized}
    <button
      type="button"
      class="grip"
      aria-label={resizeLabel}
      onpointerdown={startResize}
      onkeydown={onGripKeydown}
    ></button>
  {/if}
</section>

<style>
  .window {
    position: relative;
    display: flex;
    width: var(--win-w, 100%);
    height: var(--win-h, auto);
    min-width: 0;
    overflow: hidden;
    border-radius: var(--radius-card);
    border: 0.75px solid var(--pill-border);
    /* Denser than a panel: a window holds work, and what drifts behind it must not stain it. */
    background: color-mix(in srgb, var(--glass-strong), var(--editor-bg) 70%);
    backdrop-filter: blur(28px) saturate(120%);
    -webkit-backdrop-filter: blur(28px) saturate(120%);
    box-shadow: var(--shadow-pop);
    color: var(--text);
    transition:
      box-shadow var(--motion-base) var(--ease-out),
      border-color var(--motion-base) var(--ease-out);
  }
  .window[hidden] {
    display: none;
  }
  /* The front window: selected-layer rim and a soft glow in the tint. */
  .rim {
    border-color: var(--layer-selected-border);
    box-shadow:
      var(--shadow-pop),
      0 12px 40px color-mix(in srgb, var(--tint) 20%, transparent),
      0 0 0 3px color-mix(in srgb, var(--tint) 8%, transparent);
  }
  /* Windows behind it step back: flatter, a little quieter. */
  .dimmed {
    box-shadow: var(--shadow-frosted);
  }
  .floating {
    position: absolute;
    left: var(--win-x);
    top: var(--win-y);
    max-width: 100%;
    max-height: 100%;
  }
  .floating:global(.dragging) {
    cursor: grabbing;
  }
  .window:global(.ghost) {
    pointer-events: none;
  }
  .maximized {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--radius-lg);
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    flex: 0 0 var(--win-sidebar);
    min-width: 0;
    border-right: 1px solid var(--border-strong);
    background: var(--fill-subtle);
  }
  .sidebar-top {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex-shrink: 0;
    height: 52px;
    padding: 0 var(--space-4);
    touch-action: none;
    user-select: none;
  }
  .app-name {
    overflow: hidden;
    font-size: var(--fs-md);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sidebar-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 0 var(--space-2) var(--space-3);
  }
  .main {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    min-height: 0;
    /* The title bar follows the window's width, not the screen's. */
    container: window / inline-size;
  }
  .titlebar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-shrink: 0;
    min-height: 52px;
    /* Even sides: the controls' tooltips need room inside the window's rounded edge. */
    padding: var(--space-2) var(--space-4);
    user-select: none;
    touch-action: none;
  }
  .titlebar.has-toolbar {
    border-bottom: 1px solid var(--border-strong);
  }
  .title {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex: 1;
    min-width: 0;
    color: var(--text);
    transition: color var(--motion-base) var(--ease-out);
  }
  .app-icon {
    display: inline-flex;
    flex-shrink: 0;
    transition:
      filter var(--motion-base) var(--ease-out),
      opacity var(--motion-base) var(--ease-out);
  }
  .title-text {
    min-width: 0;
  }
  h2 {
    margin: 0;
    overflow: hidden;
    font-size: var(--fs-md);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .has-toolbar h2 {
    font-size: var(--fs-lg);
  }
  .title-text p {
    margin: 0;
    overflow: hidden;
    color: var(--text-3);
    font-size: var(--fs-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dimmed .title,
  .dimmed .app-name {
    color: var(--text-3);
  }
  .dimmed .app-icon {
    filter: saturate(0.4);
    opacity: 0.75;
  }
  /* The title keeps its width; the toolbar gives way first. */
  .has-toolbar .title {
    flex: 0 0 auto;
    max-width: 45%;
  }
  /* The toolbar gives way (it collapses into More) before it could push the controls out. */
  .toolbar {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-2);
    min-width: 0;
    margin: -4px;
    padding: 4px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  /* A narrow window gives its toolbar a row of its own under the title and the controls. */
  @container window (max-width: 34rem) {
    .titlebar.has-toolbar {
      flex-wrap: wrap;
      row-gap: var(--space-1);
    }
    .has-toolbar .title {
      flex: 1 1 0;
      max-width: none;
    }
    .has-toolbar h2 {
      font-size: var(--fs-md);
    }
    .toolbar {
      order: 1;
      flex-basis: 100%;
    }
  }
  .body {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: var(--win-pad);
  }
  .footer {
    flex-shrink: 0;
  }

  /*
   * Window controls: three plain glyph buttons at the end of the title bar — minimise, zoom
   * and, set apart by a hairline, close. Always readable (no colour code to learn), quiet at
   * rest, and each a full 32px target. Close shows the danger colour only while it is the one
   * pointed at or focused: danger appears when you are about to act, not all day.
   */
  .controls {
    --btn: var(--control-sm);
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
    margin-left: auto;
  }
  .ctl {
    display: grid;
    place-items: center;
    width: var(--btn);
    height: var(--btn);
    min-width: 32px;
    min-height: 32px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .rule {
    flex-shrink: 0;
    width: 1px;
    height: 16px;
    margin: 0 var(--space-1);
    background: var(--border-strong);
  }
  /* Behind the front window the controls step back with the title. */
  .dimmed .ctl {
    color: var(--text-3);
  }
  .ctl:hover:not(:disabled),
  .ctl:focus-visible {
    background: var(--fill-hover);
    color: var(--text);
  }
  .close:hover:not(:disabled),
  .close:focus-visible:not(:disabled) {
    background: var(--danger);
    color: var(--on-danger);
    box-shadow: 0 2px 8px color-mix(in srgb, var(--danger) 35%, transparent);
  }
  .ctl:active:not(:disabled) {
    transform: var(--press-squish);
  }
  .ctl:disabled {
    color: var(--text-3);
    opacity: 0.45;
    cursor: default;
  }
  .ctl:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  /* Fingers are bigger than pointers. */
  @media (pointer: coarse) {
    .controls {
      --btn: var(--control-md);
    }
  }

  .grip {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 22px;
    height: 22px;
    padding: 0;
    border: 0;
    border-radius: 0 0 var(--radius-card) 0;
    background:
      linear-gradient(
        135deg,
        transparent 55%,
        var(--fill-off) 55%,
        var(--fill-off) 62%,
        transparent 62%
      ),
      linear-gradient(
        135deg,
        transparent 72%,
        var(--fill-off) 72%,
        var(--fill-off) 79%,
        transparent 79%
      );
    opacity: 0;
    cursor: nwse-resize;
    touch-action: none;
    transition: opacity var(--motion-quick) var(--ease-out);
  }
  .window:hover .grip,
  .grip:focus-visible {
    opacity: 1;
  }
  .grip:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -4px;
  }

  /* Phones and small tablets: every floating window is a sheet. */
  @media (max-width: 720px) {
    .floating {
      left: 0;
      top: var(--space-2);
      width: 100%;
      /* Leave the tray visible below the sheet (the Desktop sets the room it needs). */
      height: calc(100% - var(--space-2) - var(--dock-room, 0px));
      border-radius: var(--radius-dialog);
    }
    .grip {
      display: none;
    }
    .window.has-sidebar {
      flex-direction: column;
    }
    .sidebar {
      flex: 0 0 auto;
      max-height: 38%;
      border-right: 0;
      border-bottom: 1px solid var(--border-strong);
    }
    .has-sidebar .titlebar {
      min-height: 44px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .ctl {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .window {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--editor-bg);
    }
  }
</style>
