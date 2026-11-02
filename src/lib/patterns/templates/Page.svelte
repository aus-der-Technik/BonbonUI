<script lang="ts">
  /**
   * Page — the frame of one screen. Name the parts, the page places them:
   *
   *   ┌──────────────────────────── header (front, sticky) ───────────────────────────┐
   *   ├──────────────────────────── nav    (front, sticky) ───────────────────────────┤
   *   │ sidebar (sticky) │  children — stacked with one gap           │ aside (sticky) │
   *   │                  │                       floating (front, sticky bottom) ⬤  │
   *   └──────────────────────────────────── footer ───────────────────────────────────┘
   *
   * - `title` / `subtitle` / `actions` give the standard floating header (AppHeader); pass a
   *   `header` snippet for your own (a website nav bar, a menu bar).
   * - Content is an auto layout: children stack `gap` apart and share the same left and right
   *   edges, set by `width`. `fill` makes a viewport-high app shell whose last child takes all
   *   the room (a sheet, a map, a chat, a canvas).
   * - Below 1100px the aside moves under the content; below 900px the sidebar moves on top.
   * - A Page may set its own backdrop (`background`, `image`, `gradient`); otherwise the
   *   Application's shows through.
   */
  import type { Snippet } from 'svelte';
  import AppHeader from '../organisms/AppHeader.svelte';
  import Backdrop from './Backdrop.svelte';
  import { space, type Space } from '../layout/space';

  interface Props {
    title?: string | undefined;
    subtitle?: string | undefined;
    /** Makes the header's title pill a home link. */
    href?: string | undefined;
    onhome?: ((event: MouseEvent) => void) | undefined;
    /** Buttons and pills on the right of the standard header. */
    actions?: Snippet | undefined;
    /** The header's actions fill the width beside the title pill. */
    fillActions?: boolean;
    /** Your own header instead of the standard one (still front layer, still sticky). */
    header?: Snippet | undefined;
    /** A second sticky row under the header: tabs, a segmented control, a toolbar. */
    nav?: Snippet | undefined;
    sidebar?: Snippet | undefined;
    aside?: Snippet | undefined;
    /** Front-layer buttons that float bottom-right (sticky): "Add row", a bulk-action bar. */
    floating?: Snippet | undefined;
    footer?: string | Snippet | undefined;
    /** Maximum width of the content (header, body and footer share the same edges). */
    width?: 'narrow' | 'medium' | 'wide' | 'full';
    /** Viewport-high shell: nothing scrolls but the last child. */
    fill?: boolean;
    /** Gap between the children. */
    gap?: Space;
    sidebarWidth?: string;
    asideWidth?: string;
    /** Own backdrop for this page. */
    background?: string | undefined;
    image?: string | undefined;
    gradient?: boolean | undefined;
    animate?: boolean;
    /** Text of the "skip to content" link keyboard users get first. */
    skipLabel?: string;
    children?: Snippet | undefined;
  }

  let {
    title,
    subtitle,
    href,
    onhome,
    actions,
    fillActions = false,
    header,
    nav,
    sidebar,
    aside,
    floating,
    footer,
    width = 'full',
    fill = false,
    gap = 'lg',
    sidebarWidth = '15.5rem',
    asideWidth = '20rem',
    background,
    image,
    gradient,
    animate = true,
    skipLabel = 'Skip to content',
    children,
  }: Props = $props();

  const id = $props.id();
  let topHeight = $state(0);
  const hasTop = $derived(!!(header || title || nav));
  const ownBackdrop = $derived(
    background !== undefined || image !== undefined || gradient !== undefined,
  );
  const maxWidth = $derived(width === 'full' ? 'none' : `var(--width-${width})`);
</script>

<div
  class="page"
  class:fill
  class:has-sidebar={!!sidebar}
  class:has-aside={!!aside}
  style:--page-top="{topHeight}px"
  style:--page-max={maxWidth}
  style:--page-gap={space(gap)}
  style:--sidebar-w={sidebarWidth}
  style:--aside-w={asideWidth}
>
  {#if ownBackdrop}
    <Backdrop color={background} {image} gradient={gradient ?? !image} {animate} />
  {/if}
  <a class="skip" href="#{id}-main">{skipLabel}</a>

  {#if hasTop}
    <div class="top" bind:offsetHeight={topHeight}>
      {#if header}
        <div class="top-row">{@render header()}</div>
      {:else if title}
        <div class="top-row top-row--header">
          <AppHeader {title} {subtitle} {href} {onhome} {fillActions} {actions} />
        </div>
      {/if}
      {#if nav}<div class="top-row top-row--nav">{@render nav()}</div>{/if}
    </div>
  {/if}

  <div class="body">
    {#if sidebar}<div class="sidebar">{@render sidebar()}</div>{/if}
    <main class="main" id="{id}-main" tabindex="-1">
      {#if fill && floating}<div class="floating floating--overlay">{@render floating()}</div>{/if}
      {@render children?.()}
      {#if !fill && floating}<div class="floating">{@render floating()}</div>{/if}
    </main>
    {#if aside}<aside class="aside">{@render aside()}</aside>{/if}
  </div>

  {#if footer}
    <footer class="footer">
      {#if typeof footer === 'string'}{footer}{:else}{@render footer()}{/if}
    </footer>
  {/if}
</div>

<style>
  .page {
    position: relative;
    isolation: isolate;
    min-height: var(--app-height, 100dvh);
    display: flex;
    flex-direction: column;
  }

  .skip {
    position: absolute;
    top: var(--space-2);
    left: var(--space-2);
    z-index: calc(var(--z-header) + 1);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-pill);
    background: var(--accent);
    color: var(--on-accent);
    font-weight: var(--fw-semibold);
    text-decoration: none;
    transform: translateY(-200%);
  }
  .skip:focus-visible {
    transform: none;
  }

  /* Front layer: header + nav stick together, so their combined height is one offset. */
  .top {
    position: sticky;
    top: 0;
    z-index: var(--z-header);
    display: grid;
    gap: var(--space-3);
    padding-bottom: var(--space-2);
    /* the transparent strip between the pills must not swallow clicks on the content below */
    pointer-events: none;
  }
  .top-row {
    width: 100%;
    max-width: var(--page-max);
    margin-inline: auto;
    pointer-events: auto;
  }
  .top-row--header {
    pointer-events: none;
  }
  .top-row--header > :global(*) {
    pointer-events: auto;
  }
  .top-row--nav {
    padding-inline: var(--gutter);
  }

  .body {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
    gap: var(--space-6);
    width: 100%;
    max-width: var(--page-max);
    margin-inline: auto;
    padding: var(--space-6) var(--content-gutter) var(--space-12);
  }
  .has-sidebar .body {
    grid-template-columns: var(--sidebar-w) minmax(0, 1fr);
  }
  .has-aside .body {
    grid-template-columns: minmax(0, 1fr) var(--aside-w);
  }
  .has-sidebar.has-aside .body {
    grid-template-columns: var(--sidebar-w) minmax(0, 1fr) var(--aside-w);
  }

  .sidebar,
  .aside {
    position: sticky;
    top: calc(var(--page-top) + var(--space-2));
    max-height: calc(var(--app-height, 100dvh) - var(--page-top) - var(--space-6));
    overflow: auto;
    overscroll-behavior: contain;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
    /* room for the glass shadows inside the scroll box */
    padding: 2px;
    margin: -2px;
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: var(--page-gap);
    min-width: 0;
    outline: none;
  }

  .floating {
    position: sticky;
    bottom: var(--sticky-gap);
    z-index: var(--z-fab);
    align-self: flex-end;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
    margin-top: calc(var(--page-gap) * -1 + var(--space-2));
  }

  .footer {
    width: 100%;
    max-width: var(--page-max);
    margin-inline: auto;
    padding: 0 var(--content-gutter) var(--space-8);
    color: var(--text-3);
    font-size: var(--fs-sm);
  }

  /* Fill: a viewport-high shell; the last child of the content takes the rest. */
  .fill {
    height: var(--app-height, 100dvh);
    min-height: 0;
    overflow: hidden;
  }
  .fill .body {
    min-height: 0;
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
    padding-block: var(--space-4);
  }
  .fill .main {
    position: relative;
    min-height: 0;
  }
  .fill .main > :global(:last-child) {
    flex: 1 1 auto;
    min-height: 0;
  }
  .fill .sidebar,
  .fill .aside {
    position: static;
    max-height: none;
  }
  .floating--overlay {
    position: absolute;
    right: var(--space-4);
    bottom: var(--space-4);
    margin: 0;
  }
  .fill .footer {
    padding-bottom: var(--space-4);
  }

  @media (max-width: 1100px) {
    .has-aside .body,
    .has-sidebar.has-aside .body {
      grid-template-columns: minmax(0, 1fr);
    }
    .has-sidebar.has-aside .body {
      grid-template-columns: var(--sidebar-w) minmax(0, 1fr);
    }
    .has-sidebar.has-aside .aside {
      grid-column: 2;
    }
    .aside {
      position: static;
      max-height: none;
    }
  }
  @media (max-width: 900px) {
    .has-sidebar .body,
    .has-sidebar.has-aside .body {
      grid-template-columns: minmax(0, 1fr);
    }
    .has-sidebar.has-aside .aside {
      grid-column: auto;
    }
    .sidebar {
      position: static;
      max-height: none;
      overflow: visible;
    }
  }
  /* Fill mode once sidebar/aside fold into rows: main keeps the stretching row, the folded
     columns get a capped, scrollable auto row. */
  @media (max-width: 1100px) {
    .fill.has-aside .body {
      grid-template-rows: minmax(0, 1fr) auto;
    }
    .fill .aside {
      max-height: 34dvh;
      overflow: auto;
    }
  }
  @media (max-width: 900px) {
    .fill.has-sidebar .body {
      grid-template-rows: auto minmax(0, 1fr);
    }
    .fill.has-sidebar.has-aside .body {
      grid-template-rows: auto minmax(0, 1fr) auto;
    }
    .fill .sidebar {
      max-height: 30dvh;
      overflow: auto;
    }
  }
  @media (max-width: 520px) {
    .fill {
      height: auto;
      min-height: var(--app-height, 100dvh);
      overflow: visible;
    }
  }
</style>
