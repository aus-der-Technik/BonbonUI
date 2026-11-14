<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface ToolbarButton {
    id?: string | undefined;
    icon: IconName;
    /** Accessible name and tooltip; visible too with `showLabel`. */
    label: string;
    showLabel?: boolean | undefined;
    /** Pressed look (a toggled view option). */
    active?: boolean | undefined;
    /** Never folds into More when the toolbar runs out of room (the main action). */
    primary?: boolean | undefined;
    disabled?: boolean | undefined;
    onclick?: (() => void) | undefined;
  }

  export type ToolbarEntry = ToolbarButton | { separator: true } | { spacer: true };
</script>

<script lang="ts">
  /**
   * Toolbar — the toolbar of a desktop app: a title, groups of icon buttons, separators, a
   * flexible spacer and an optional search field. `floating` (default) is a liquid-glass pill
   * that sticks to the top; `bar` a full-width sticky bar; `plain` has no surface, for a
   * Window's title bar. Left / Right move between the buttons (one tab stop).
   *
   * When the room runs out (a narrow window, a phone), buttons fold into a labelled **More**
   * button from the end, the search field and `primary` buttons last of all: the main action
   * and the search stay in sight, the rest is one click away in a menu under More, which shows
   * how many it holds.
   *
   *   <Toolbar title="Inbox" items={[{ icon: 'edit', label: 'Compose', onclick: compose },
   *     { separator: true }, { icon: 'trash', label: 'Delete' }, { spacer: true }]}
   *     bind:search />
   */
  import { flushSync, type Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import type { ContextMenuItem } from './shared.svelte';
  import SearchField from '../molecules/SearchField.svelte';
  import GlassLens from '../atoms/GlassLens.svelte';
  import { frostFilter, type LensOptions } from '../../utils/lens';

  interface Props {
    title?: string | undefined;
    subtitle?: string | undefined;
    items?: ToolbarEntry[];
    /** Shows a search field when defined; bind it. */
    search?: string | undefined;
    searchLabel?: string;
    searchPlaceholder?: string;
    variant?: 'floating' | 'bar' | 'plain';
    /** Accessible name. */
    label?: string;
    /** Before the title (e.g. a sidebar toggle or back button). */
    leading?: Snippet | undefined;
    /** After the buttons, before the search. */
    children?: Snippet | undefined;
    /** At the very end. */
    trailing?: Snippet | undefined;
    /** Fold buttons that do not fit into a More menu (default); `false` scrolls instead. */
    collapse?: boolean;
    /** Name and tooltip of the More button. */
    moreLabel?: string;
    /** Refraction of the floating and bar variants (magnify, rim, rimBend, chroma, blur,
        saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
  }

  let {
    title,
    subtitle,
    items = [],
    search = $bindable(),
    searchLabel = 'Search',
    searchPlaceholder = 'Search',
    variant = 'floating',
    label = 'Toolbar',
    leading,
    children,
    trailing,
    lens = {},
    collapse = true,
    moreLabel = 'More',
  }: Props = $props();

  let lensDrawn = $state(false);
  const glass = $derived(variant !== 'plain' && lens !== false);

  let root: HTMLElement;
  let focusAt = $state(0);

  const isButton = (e: ToolbarEntry): e is ToolbarButton => 'icon' in e;
  const tools = () => [...root.querySelectorAll<HTMLElement>('.tool:not(:disabled):not([hidden])')];

  function onkeydown(event: KeyboardEvent) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const all = tools();
    const at = all.indexOf(event.target as HTMLElement);
    if (at < 0) return;
    event.preventDefault();
    focusAt = (at + (event.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length;
    all[focusAt]?.focus();
  }

  // ── Folding into More: from the end, primary buttons never ──
  /** Indices of the buttons that may fold, in the order they fold (last first). */
  const foldable = $derived(
    items.flatMap((e, i) => (isButton(e) && !e.primary ? [i] : [])).reverse(),
  );
  let folded = $state(0);
  const hidden = $derived(new Set(foldable.slice(0, folded)));
  /** A separator shows only between two visible buttons. */
  const shows = (i: number) => {
    const entry = items[i];
    if (!entry || isButton(entry)) return !hidden.has(i);
    if (!('separator' in entry)) return true;
    const visibleIn = (from: number, step: 1 | -1) => {
      for (let j = from; j >= 0 && j < items.length; j += step) {
        const e = items[j]!;
        if (!isButton(e)) return false;
        if (!hidden.has(j)) return true;
      }
      return false;
    };
    return visibleIn(i - 1, -1) && visibleIn(i + 1, 1);
  };
  const overflow = $derived<ContextMenuItem[]>(
    items.flatMap((e, i): ContextMenuItem[] => {
      if (!isButton(e) || !hidden.has(i)) return [];
      return [
        {
          label: e.label,
          icon: e.icon,
          checked: e.active,
          disabled: e.disabled,
          onselect: () => e.onclick?.(),
        },
      ];
    }),
  );

  // Index among the enabled, visible buttons (More last), for the roving tab stop.
  const enabled = $derived(
    items.filter((e, i) => isButton(e) && !e.disabled && !hidden.has(i)) as ToolbarButton[],
  );

  /** Shows everything, then folds from the end until nothing spills out. */
  function fit() {
    if (!root?.isConnected) return;
    folded = 0;
    flushSync();
    while (folded < foldable.length && root.scrollWidth > root.clientWidth + 1) {
      folded++;
      flushSync();
    }
  }

  let frame = 0;
  const refit = () => {
    cancelAnimationFrame(frame);
    // Next frame: folding changes the toolbar's own size, which must not happen inside the
    // observer's callback.
    frame = requestAnimationFrame(fit);
  };
  $effect(() => {
    void items.length;
    if (!collapse) {
      folded = 0;
      return;
    }
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(refit) : undefined;
    observer?.observe(root);
    refit();
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  });

  let menu = $state<ContextMenu>();
  let moreOpen = $state(false);
  let wasOpen = false;
  function toggleMore(event: MouseEvent) {
    if (wasOpen) return;
    menu?.openBelow(event.currentTarget as Element);
    moreOpen = !!menu?.isOpen();
  }
</script>

<div
  class="toolbar toolbar--{variant}"
  role="toolbar"
  tabindex="-1"
  aria-label={title ?? label}
  bind:this={root}
  class:lensed={glass && lensDrawn}
  class:collapse
  style:--layer-front-blur={variant === 'plain' ? undefined : frostFilter(lens)}
  {onkeydown}
>
  {#if glass}<GlassLens {...lens || {}} bind:active={lensDrawn} />{/if}
  {@render leading?.()}
  {#if title}
    <div class="title">
      <h2>{title}</h2>
      {#if subtitle}<p>{subtitle}</p>{/if}
    </div>
  {/if}
  {#each items as entry, i (i)}
    {#if 'separator' in entry}
      {#if shows(i)}
        <span class="separator" role="separator" aria-orientation="vertical"></span>
      {/if}
    {:else if 'spacer' in entry}
      <span class="spacer"></span>
    {:else}
      <button
        type="button"
        class="tool"
        class:labelled={entry.showLabel}
        aria-label={entry.showLabel ? undefined : entry.label}
        aria-pressed={entry.active === undefined ? undefined : entry.active}
        title={entry.label}
        disabled={entry.disabled}
        hidden={hidden.has(i)}
        tabindex={enabled.indexOf(entry) === focusAt ? 0 : -1}
        onclick={() => entry.onclick?.()}
      >
        <Icon name={entry.icon} size={18} />
        {#if entry.showLabel}<span>{entry.label}</span>{/if}
      </button>
    {/if}
  {/each}
  {#if overflow.length}
    <ContextMenu
      bind:this={menu}
      items={overflow}
      label={moreLabel}
      disabled
      onclose={() => (moreOpen = false)}
    >
      <button
        type="button"
        class="tool more"
        aria-label={moreLabel}
        aria-haspopup="menu"
        aria-expanded={moreOpen}
        title={moreLabel}
        tabindex={focusAt === enabled.length ? 0 : -1}
        onpointerdown={() => (wasOpen = moreOpen)}
        onclick={(e) => {
          toggleMore(e);
          wasOpen = false;
        }}
      >
        <Icon name="more-vertical" size={18} />
        <span class="count" aria-hidden="true">{overflow.length}</span>
      </button>
    </ContextMenu>
  {/if}
  {@render children?.()}
  {#if search !== undefined}
    <div class="search">
      <SearchField bind:value={search} label={searchLabel} placeholder={searchPlaceholder} />
    </div>
  {/if}
  {@render trailing?.()}
</div>

<style>
  .toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
    min-height: var(--control-lg);
  }
  .toolbar--floating,
  .toolbar--bar {
    /* Front layer: always sticky. */
    position: sticky;
    z-index: var(--z-front);
    background: var(--layer-front-bg);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
  }
  /* Thick glass: the lens scatters and bends the backdrop, the bar only lends it a thin body. */
  .toolbar.lensed {
    isolation: isolate;
    background: var(--layer-front-lens-bg);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .toolbar--floating {
    top: calc(var(--page-top, 0px) + var(--sticky-gap));
    padding: var(--space-1) var(--space-2);
    border: 0.75px solid var(--layer-front-border);
    border-radius: var(--radius-pill);
    box-shadow: var(--layer-front-shadow);
  }
  .toolbar--bar {
    top: var(--page-top, 0px);
    padding: var(--space-1) var(--space-4);
    border-bottom: 0.75px solid var(--border-strong);
    box-shadow: 0 1px 0 var(--pill-bloom);
  }
  .toolbar--plain {
    flex: 1;
  }
  .title {
    min-width: 0;
    margin-right: var(--space-3);
    padding-left: var(--space-2);
  }
  .toolbar--plain .title {
    padding-left: 0;
  }
  h2 {
    margin: 0;
    overflow: hidden;
    font-size: var(--fs-lg);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title p {
    margin: 0;
    color: var(--text-3);
    font-size: var(--fs-xs);
    white-space: nowrap;
  }
  .tool {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    flex-shrink: 0;
    min-width: var(--control-md);
    height: var(--control-md);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .tool.labelled {
    padding: 0 var(--space-3);
  }
  .tool:hover:not(:disabled) {
    background: var(--fill-hover);
    color: var(--text);
  }
  .tool:active:not(:disabled) {
    transform: var(--press-squish);
  }
  .tool[aria-pressed='true'] {
    background: var(--accent-soft);
    box-shadow: inset 0 0 0 1px var(--accent-border);
    color: var(--accent-ink);
  }
  .tool:disabled {
    opacity: 0.38;
    cursor: default;
  }
  .tool:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .tool[hidden] {
    display: none;
  }
  /* More: a glyph with a small count of what it holds. */
  .more {
    position: relative;
    gap: 2px;
    padding: 0 var(--space-2) 0 var(--space-1);
  }
  .more[aria-expanded='true'] {
    background: var(--fill-hover);
    color: var(--text);
  }
  .count {
    min-width: 1.15rem;
    padding: 0 0.3rem;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    color: var(--text-2);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-bold);
    line-height: 1.15rem;
    font-variant-numeric: tabular-nums;
  }
  .separator {
    flex-shrink: 0;
    width: 1px;
    height: 20px;
    margin: 0 var(--space-1);
    background: var(--border-strong);
  }
  .spacer {
    flex: 1;
  }
  .search {
    flex: 0 1 14rem;
    min-width: 7rem;
    margin-left: var(--space-1);
  }
  /* Folding: tools give way before the title truncates or the search gets too short to read
     its placeholder. */
  .collapse .title {
    flex-shrink: 0;
    max-width: 50%;
  }
  .collapse .search {
    min-width: 9rem;
  }
  .toolbar--floating .search :global(input) {
    border-radius: var(--radius-pill);
  }
  @media (max-width: 640px) {
    .title p,
    .tool.labelled span {
      display: none;
    }
    .toolbar {
      overflow-x: auto;
      scrollbar-width: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tool {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .toolbar--floating,
    .toolbar--bar {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
