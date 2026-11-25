<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { IconName } from '../atoms/icons';
  import type { PaletteColor } from '../atoms/palette';

  export interface NavItem {
    label: string;
    /** Where it goes. Without one the item is a button that only reports `onnavigate` (a
     *  section switched in place, a place further down the page). */
    href?: string | undefined;
    /** A stable key (default: label and href), also written as `data-nav` on the item. */
    id?: string | undefined;
    /** Drawn on a round disc of the item's colour. */
    icon?: IconName | undefined;
    /** The item's colour (a palette name or any CSS colour; default the tint): its disc, and
     *  the soft fill under it on hover and while it is the current one. */
    color?: PaletteColor | (string & {}) | undefined;
    /** Small count pill, e.g. open items. */
    count?: number | undefined;
    /** What the count means, read out instead of the bare number ("3 new"). */
    countLabel?: string | undefined;
    active?: boolean | undefined;
    /** Faint, still usable: e.g. a section with nothing that matches a filter. */
    dimmed?: boolean | undefined;
    /** An action at the end of a list ("Connect another"): a grey disc and softer words. */
    quiet?: boolean | undefined;
    /** Tooltip, e.g. why something does not answer. */
    title?: string | undefined;
  }

  export interface NavGroup {
    label?: string | undefined;
    /** A line of small print under the heading. */
    note?: string | undefined;
    items: NavItem[];
    /** Anything after the group's items — a tree, a picker; in the row it joins the items. */
    after?: Snippet | undefined;
  }
</script>

<script lang="ts">
  /**
   * SideNav organism — the sections or places beside an app's content, on the ground by default
   * (`level="panel"` puts it on a card). Each item is its label after a round disc of the item's
   * colour carrying its icon (the tint unless it has a `color`), an optional count and anything
   * `trailing` adds; groups may have small capital headings. The current item (`aria-current`:
   * `page` by default, `location` for a place on the same page) lies on a soft fill of its colour
   * (`selection` `fill`, default) — or on the selected layer (`frame`), only in the tint (`tint`),
   * or with a slim tint bar (`bar`); when it changes the mark flows over like thick water
   * (`utils/liquid.ts`). An item with `href` is a link (a plain click is reported to
   * `onnavigate`, which may `preventDefault()` and route; a click with a modifier key opens it
   * the browser's way); without `href` it is a button. `orientation="auto"` (default) turns it
   * into one row that scrolls sideways below 900px (where a Page moves the sidebar on top of the
   * content; its end fades, headings, notes and the `footer` step aside, the current item
   * scrolls into view) — but not inside a dialog or drawer, where it is the whole panel and stays
   * a list. `vertical` / `horizontal` fix it either way. `sticky` keeps the list in view beside
   * long content (`--side-nav-top`, else `--page-top`).
   *
   *   <SideNav groups={[{ label: 'Admin', items: [{ label: 'Users', href: '/users', icon: 'users', active: true }] }]} />
   */
  import { untrack } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import { colorValue } from '../atoms/palette';
  import { boxWithin, LiquidDrop } from '../../utils/liquid';

  interface Props {
    groups: NavGroup[];
    label?: string;
    /** `auto`: a sideways row below 900px, except inside a dialog or drawer. */
    orientation?: 'auto' | 'vertical' | 'horizontal';
    /** A click on an item. On a link only a plain click (the main button, no modifier key). */
    onnavigate?: ((item: NavItem, event: MouseEvent) => void) | undefined;
    /** `ground` (default) sits on the backdrop; `panel` is a card. */
    level?: 'ground' | 'panel';
    /** How the current item is marked: `fill` (default, a soft fill of its colour), `frame`
     *  (the selected layer), `tint` (its words in the tint) or `bar` (a tint bar beside it).
     *  All of them flow between items. */
    selection?: 'fill' | 'frame' | 'tint' | 'bar';
    /** What the current item is: the `page` shown (default) or the `location` in view. */
    ariaCurrent?: 'page' | 'location';
    /** Keeps the list in view while the content beside it scrolls (not as a row). */
    sticky?: boolean;
    /** More at the end of an item, before its count (a status dot, a mark). */
    trailing?: Snippet<[NavItem]> | undefined;
    /** Under the list (a meter, a link); not shown in the row. */
    footer?: Snippet | undefined;
  }

  let {
    groups,
    label = 'Main',
    orientation = 'auto',
    onnavigate,
    level = 'ground',
    selection = 'fill',
    ariaCurrent = 'page',
    sticky = false,
    trailing,
    footer,
  }: Props = $props();

  let nav: HTMLElement | undefined = $state();
  // Inside an overlay panel the nav is the panel's content: a list, never a row.
  const inOverlay = $derived(!!nav?.parentElement?.closest('dialog, [role="dialog"]'));
  const mode = $derived(orientation === 'auto' && inOverlay ? 'vertical' : orientation);
  const activeItem = $derived(
    (groups ?? []).flatMap((group) => group.items).find((item) => item.active),
  );
  /** Is there a measured active item for the pill to sit on? */
  let hasPill = $state(false);
  let pillEl = $state<HTMLElement>();
  // The pill flows from item to item like thick water, and the nav bulges along (liquid.ts).
  let drop: LiquidDrop | undefined;

  const keyOf = (item: NavItem) => item.id ?? `${item.label}|${item.href ?? ''}`;
  const tone = (item: NavItem | undefined) => colorValue(item?.color) ?? 'var(--accent)';

  $effect(() => {
    const el = pillEl;
    if (!el || !nav) return;
    drop = new LiquidDrop({
      render: (box) => {
        el.style.width = `${box.w}px`;
        el.style.height = `${box.h}px`;
        el.style.transform = `translate(${box.x}px, ${box.y}px)`;
      },
      host: nav,
      bulge: 0.02,
    });
    place('instant');
    return () => {
      drop?.destroy();
      drop = undefined;
    };
  });

  function place(how: 'move' | 'follow' | 'instant') {
    const active = nav?.querySelector<HTMLElement>('.item[aria-current]');
    hasPill = !!active?.offsetWidth;
    if (!active || !nav || !hasPill) return;
    drop?.moveTo(boxWithin(active, nav), how);
  }

  /** In the row, the current item slides into the middle when the row is wider than the nav. */
  function reveal() {
    const active = nav?.querySelector<HTMLElement>('.item[aria-current]');
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    if (getComputedStyle(nav).overflowX !== 'auto') return;
    const left = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    nav.scrollTo?.({ left: Math.max(0, left), behavior: still ? 'auto' : 'smooth' });
  }

  $effect(() => {
    // Track the active flags, not just the array, so in-place updates move the pill too.
    void (groups ?? []).flatMap((group) => group.items.map((item) => item.active));
    if (!nav) return;
    untrack(() => {
      place('move');
      reveal();
    });
    if (typeof ResizeObserver !== 'function') return;
    const observer = new ResizeObserver(() => place('follow'));
    observer.observe(nav);
    return () => observer.disconnect();
  });

  function clicked(item: NavItem, event: MouseEvent) {
    // A link opened in another tab or window is the browser's, not the app's.
    const plain =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    if (item.href !== undefined && !plain) return;
    onnavigate?.(item, event);
  }
</script>

<nav
  class="nav nav--{mode} nav--{level} sel--{selection}"
  class:has-pill={hasPill}
  class:sticky
  aria-label={label}
  data-orientation={mode}
  bind:this={nav}
>
  <!-- Always there (so the drop keeps its element), drawn only once an active item is found. -->
  <span
    class="pill"
    class:pill--on={hasPill}
    aria-hidden="true"
    style:--k={tone(activeItem)}
    data-emit={hasPill && (selection === 'frame' || selection === 'fill') ? 'soft' : undefined}
    bind:this={pillEl}
  ></span>
  {#each groups as group, index (group.label ?? index)}
    <div class="group">
      {#if group.label}<div class="heading">{group.label}</div>{/if}
      {#if group.note}<p class="note">{group.note}</p>{/if}
      {#if group.items.length}
        <ul>
          {#each group.items as item (keyOf(item))}
            {#snippet face()}
              {#if item.icon}<span class="disc"><Icon name={item.icon} size={13} /></span>{/if}
              <span class="label">{item.label}</span>
              {#if trailing}{@render trailing(item)}{/if}
              {#if item.count != null}
                <span class="count" aria-label={item.countLabel}>{item.count}</span>
              {/if}
            {/snippet}
            <li>
              {#if item.href !== undefined}
                <a
                  class="item"
                  class:dimmed={item.dimmed}
                  class:quiet={item.quiet}
                  href={item.href}
                  title={item.title}
                  style:--k={tone(item)}
                  data-nav={item.id}
                  aria-current={item.active ? ariaCurrent : undefined}
                  onclick={(event) => clicked(item, event)}
                >
                  {@render face()}
                </a>
              {:else}
                <button
                  type="button"
                  class="item"
                  class:dimmed={item.dimmed}
                  class:quiet={item.quiet}
                  title={item.title}
                  style:--k={tone(item)}
                  data-nav={item.id}
                  aria-current={item.active ? ariaCurrent : undefined}
                  onclick={(event) => clicked(item, event)}
                >
                  {@render face()}
                </button>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
      {#if group.after}{@render group.after()}{/if}
    </div>
  {/each}
  {#if footer}<div class="foot">{@render footer()}</div>{/if}
</nav>

<style>
  .nav {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-content: start;
    gap: var(--space-4);
    min-width: 0;
    border-radius: var(--radius-card);
  }
  .nav--panel {
    padding: var(--space-2);
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
  }
  .sticky:not(.nav--horizontal) {
    position: sticky;
    top: var(--side-nav-top, var(--page-top, 96px));
  }
  .group {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    min-width: 0;
  }
  .heading {
    margin-bottom: var(--space-1);
    padding: 0 var(--space-2);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-bold);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .note {
    margin: 0 0 var(--space-1);
    padding: 0 var(--space-2);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2px;
  }
  .item {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    padding: 8px var(--space-2);
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    background: none;
    font: inherit;
    color: var(--text);
    text-align: start;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-base) var(--ease-out),
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .item:hover {
    background: color-mix(in oklch, var(--k) 8%, transparent);
  }
  .item:active {
    transform: scale(0.98);
  }
  .item:focus-visible {
    outline: var(--focus-ring);
  }
  .item.dimmed {
    opacity: 0.45;
  }
  .item.quiet {
    color: var(--text-2);
  }
  .disc {
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--k);
    /* Light or dark ink, whichever reads on the colour (as AppIcon). */
    color: oklch(from var(--k) clamp(0.16, (0.8 - l) * 999, 1) 0 0);
  }
  .quiet .disc {
    background: color-mix(in oklch, var(--text) 8%, transparent);
    color: var(--text-2);
  }
  .label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .count {
    flex-shrink: 0;
    color: var(--text-2);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .item[aria-current] {
    font-weight: var(--fw-semibold);
  }
  /* `fill` (default): a soft fill of the item's colour. */
  .sel--fill .item[aria-current],
  .sel--fill .pill {
    background: color-mix(in oklch, var(--k) 15%, transparent);
  }
  /* `frame`: the selected layer — tinted glass, a tint rim and tint words. */
  .sel--frame .item[aria-current],
  .sel--frame .pill {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--glass-inset);
  }
  .sel--frame .item[aria-current],
  .sel--tint .item[aria-current],
  .sel--bar .item[aria-current] {
    color: var(--accent-ink);
  }
  /* The sliding mark: once measured it carries the current item's look. */
  .pill {
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    pointer-events: none;
  }
  .pill:not(.pill--on) {
    display: none;
  }
  .has-pill .item[aria-current] {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
  .has-pill .item[aria-current]::before {
    display: none;
  }
  /* `tint` and `bar`: no layer at all, the tint alone says which one it is. */
  .sel--tint .item[aria-current],
  .sel--bar .item[aria-current],
  .sel--tint .pill,
  .sel--bar .pill {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
  /* `bar`: a slim tint bar in the nav's margin beside the item; the pill carries it, so it
     flows with the selection. In the row it lies under the item. */
  .sel--bar .item[aria-current]::before,
  .sel--bar .pill::before {
    content: '';
    position: absolute;
    left: calc(var(--space-2) * -0.5 - 1px);
    top: 22%;
    bottom: 22%;
    width: 3px;
    border-radius: var(--radius-pill);
    background: var(--accent);
    transform: translateX(-50%);
  }
  .foot {
    padding-top: var(--space-2);
    border-top: 1px solid var(--border-strong);
  }
  @media (pointer: coarse) {
    .item {
      min-height: var(--target-min, 44px);
    }
  }
  /* The row: the items side by side, scrolling sideways; the end fades, so it reads as "more
     this way" rather than cut off. */
  .nav--horizontal {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    overflow-x: auto;
    padding-inline-end: 28px;
    scrollbar-width: none;
    mask-image: linear-gradient(to right, black calc(100% - 28px), transparent);
  }
  .nav--horizontal .group,
  .nav--horizontal ul {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }
  .nav--horizontal .heading,
  .nav--horizontal .note,
  .nav--horizontal .foot {
    display: none;
  }
  .nav--horizontal .group,
  .nav--horizontal li {
    flex-shrink: 0;
  }
  .nav--horizontal.sel--bar .item[aria-current]::before,
  .nav--horizontal.sel--bar .pill::before {
    inset: auto 30% -1px;
    width: auto;
    height: 3px;
    transform: none;
  }
  @media (max-width: 900px) {
    .nav--auto {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      overflow-x: auto;
      padding-inline-end: 28px;
      scrollbar-width: none;
      mask-image: linear-gradient(to right, black calc(100% - 28px), transparent);
    }
    .nav--auto.sticky {
      position: relative;
      top: auto;
    }
    .nav--auto .group,
    .nav--auto ul {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }
    .nav--auto .heading,
    .nav--auto .note,
    .nav--auto .foot {
      display: none;
    }
    .nav--auto .group,
    .nav--auto li {
      flex-shrink: 0;
    }
    .nav--auto.sel--bar .item[aria-current]::before,
    .nav--auto.sel--bar .pill::before {
      inset: auto 30% -1px;
      width: auto;
      height: 3px;
      transform: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .item {
      transition: none;
    }
  }
</style>
