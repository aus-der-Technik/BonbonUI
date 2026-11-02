<script lang="ts">
  /**
   * Window — a desktop app window. The title sits on the left with the app's small candy icon;
   * the window controls live in the **candy capsule** on the right: three candy dots at rest
   * that unwrap into minimise, zoom and close when you point at the window (close only turns
   * red under its own pointer). Optional toolbar in the title bar, a full-height sidebar and a
   * footer (status bar).
   *
   * Inside a Desktop it floats: drag it by the title bar, resize it from the corner,
   * double-click the title bar to zoom. The front window wears the selected layer's tint rim;
   * the others flatten. Windows grow out of their app's icon in the Dock and shrink back into
   * it when minimised. On phone widths every window becomes a sheet. With `static` it is a
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
  import type { IconName } from '../atoms/icons';
  import { space, type Space } from '../layout/space';
  import { getDesktop, type AppColor } from './shared.svelte';

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
    /** Name of the capsule; `{title}` is replaced. */
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

  // ── Motion: grow out of the tray, shrink back into it, pop away on close ──
  const still = () =>
    typeof matchMedia !== 'function' || matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** The Dock icon's centre relative to `box`, as a transform origin. */
  function trayOrigin(box: DOMRect): string | undefined {
    const icon = manager?.anchor(wid);
    if (!icon) return undefined;
    return `${icon.left + icon.width / 2 - box.left}px ${icon.top + icon.height / 2 - box.top}px`;
  }

  function play(el: HTMLElement, frames: Keyframe[], duration: number, easing: string) {
    try {
      return el.animate?.(frames, { duration, easing, fill: 'both' });
    } catch {
      return undefined;
    }
  }

  function arrive() {
    if (!managed || still() || !root?.isConnected) return;
    const origin = trayOrigin(root.getBoundingClientRect());
    root.style.transformOrigin = origin ?? '50% 0%';
    const from = origin ? 'scale(0.14)' : 'translateY(10px) scale(0.97)';
    const anim = play(
      root,
      [
        { opacity: 0, transform: from },
        { opacity: 1, transform: 'none' },
      ],
      origin ? 420 : 260,
      'cubic-bezier(0.2, 0.8, 0.2, 1)',
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
    if (!managed || still() || !root || !host?.isConnected) return;
    const copy = document.createElement('div');
    copy.className = `${root.className} ghost`;
    copy.style.cssText = root.style.cssText;
    copy.innerHTML = root.innerHTML;
    copy.setAttribute('aria-hidden', 'true');
    copy.inert = true;
    host.append(copy);
    const origin = into === 'tray' ? trayOrigin(copy.getBoundingClientRect()) : undefined;
    copy.style.transformOrigin = origin ?? '50% 50%';
    const anim = play(
      copy,
      origin
        ? [
            { opacity: 1, transform: 'none' },
            { opacity: 0.6, offset: 0.7 },
            { opacity: 0, transform: 'scale(0.1)' },
          ]
        : [
            { opacity: 1, transform: 'none' },
            { opacity: 0, transform: 'scale(0.94)' },
          ],
      origin ? 380 : 180,
      origin ? 'cubic-bezier(0.65, 0, 0.35, 1)' : 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    );
    const done = () => copy.remove();
    anim?.finished?.then(done, done);
    setTimeout(done, 900);
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
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
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

{#snippet capsule()}
  <div class="capsule" role="group" aria-label={controlsLabel.replace('{title}', title)}>
    <button
      type="button"
      class="ctl minimize"
      aria-label={minimizeLabel}
      title={minimizeLabel}
      disabled={!floating && !onminimize}
      onclick={minimize}
    >
      <Icon name="minus" size={12} />
    </button>
    <button
      type="button"
      class="ctl zoom"
      aria-label={zoomLabel}
      title={zoomLabel}
      aria-pressed={maximized}
      disabled={!floating && !onzoom}
      onclick={zoom}
    >
      <Icon name={maximized ? 'minimize' : 'maximize'} size={11} />
    </button>
    <button
      type="button"
      class="ctl close"
      aria-label={closeLabel}
      title={closeLabel}
      disabled={!onclose}
      onclick={() => onclose?.()}
    >
      <Icon name="close" size={11} />
    </button>
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
      {@render capsule()}
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
    box-shadow:
      0 22px 56px rgba(12, 12, 22, 0.2),
      0 4px 14px rgba(12, 12, 22, 0.08),
      inset 0 1px 0 var(--pill-light);
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
      0 26px 64px rgba(12, 12, 22, 0.2),
      0 12px 40px color-mix(in srgb, var(--tint) 20%, transparent),
      0 0 0 3px color-mix(in srgb, var(--tint) 8%, transparent),
      inset 0 1px 0 var(--pill-light);
  }
  /* Windows behind it step back: flatter, a little quieter. */
  .dimmed {
    box-shadow:
      0 10px 28px rgba(12, 12, 22, 0.12),
      inset 0 1px 0 var(--pill-light);
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
  }
  .titlebar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-shrink: 0;
    min-height: 52px;
    padding: var(--space-2) var(--space-3) var(--space-2) var(--space-4);
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
  /* The toolbar gives way (it scrolls) before it could push the capsule out of the window. */
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
   * The candy capsule. At rest: three candy dots in a small glass capsule, a quiet hint that
   * the window can be handled. On pointing (or focus) it unwraps — each dot grows into a
   * monochrome icon button. Close turns red only under its own pointer: the colour of danger
   * appears when you are about to act, not all the time.
   */
  .capsule {
    --dot: 8px;
    --btn: 26px;
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    margin-left: auto;
    padding: 4px 6px;
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
    box-shadow:
      inset 0 0 0 0.75px var(--border-strong),
      inset 0 1px 0 var(--pill-light);
    transition:
      padding var(--motion-base) var(--ease-spring),
      gap var(--motion-base) var(--ease-spring),
      background-color var(--motion-base) var(--ease-out);
  }
  .ctl {
    --c: var(--tint);
    position: relative;
    display: grid;
    place-items: center;
    width: var(--dot);
    height: var(--dot);
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--c);
    color: transparent;
    cursor: pointer;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      0 1px 2px color-mix(in srgb, var(--c) 40%, transparent);
    transition:
      width var(--motion-base) var(--ease-spring),
      height var(--motion-base) var(--ease-spring),
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .ctl :global(.icon) {
    opacity: 0;
    transform: scale(0.4);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .minimize {
    --c: var(--tint-2);
  }
  .close {
    --c: var(--tint-3);
  }
  /* Behind the front window the candy goes grey — colour is for the thing you are using. */
  .dimmed .ctl {
    --c: var(--fill-off);
  }
  .window:hover .capsule,
  .capsule:focus-within {
    gap: 2px;
    padding: 2px;
    background: var(--fill-muted);
  }
  .window:hover .ctl,
  .capsule:focus-within .ctl {
    width: var(--btn);
    height: var(--btn);
    background: transparent;
    color: var(--text-2);
    box-shadow: none;
  }
  .window:hover .ctl :global(.icon),
  .capsule:focus-within .ctl :global(.icon) {
    opacity: 1;
    transform: none;
  }
  .window:hover .ctl:hover:not(:disabled),
  .capsule:focus-within .ctl:focus-visible {
    background: var(--glass-strong);
    color: var(--text);
    box-shadow:
      0 1px 3px rgba(12, 12, 22, 0.12),
      inset 0 1px 0 var(--pill-light);
  }
  .window:hover .close:hover:not(:disabled) {
    background: var(--danger);
    color: #fff;
    box-shadow: 0 2px 8px color-mix(in srgb, var(--danger) 40%, transparent);
  }
  .ctl:active:not(:disabled) {
    transform: var(--press-squish);
  }
  .ctl:disabled {
    cursor: default;
  }
  .window:hover .ctl:disabled,
  .capsule:focus-within .ctl:disabled {
    color: var(--text-3);
    opacity: 0.5;
  }
  .ctl:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  /* Touch has no hover: the capsule stays unwrapped, with bigger buttons. */
  @media (pointer: coarse) {
    .capsule {
      --btn: 32px;
      gap: 2px;
      padding: 2px;
      background: var(--fill-muted);
    }
    .ctl {
      width: var(--btn);
      height: var(--btn);
      background: transparent;
      color: var(--text-2);
      box-shadow: none;
    }
    .ctl :global(.icon) {
      opacity: 1;
      transform: none;
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
    .capsule,
    .ctl,
    .ctl :global(.icon) {
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
