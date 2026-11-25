<script lang="ts" module>
  import type { IconName } from '../atoms/icons';
  import type { PaletteColor } from '../atoms/palette';

  /** One place in the bar (and in its "More" sheet). */
  export interface BottomBarItem {
    id: string;
    label: string;
    /** A link; without it the item is a button calling `onclick`. */
    href?: string | undefined;
    onclick?: (() => void) | undefined;
    icon: IconName;
    /** With a colour the glyph is an app icon in it (and its badge and selection wash take it);
     *  without one a plain glyph. */
    color?: PaletteColor | 'accent' | (string & {}) | undefined;
    /** Unread or waiting things: a figure on the glyph (99+ caps). */
    badge?: number | undefined;
  }
</script>

<script lang="ts">
  /**
   * BottomBar organism — the navigation of a phone, along the bottom edge where the thumb is.
   * A few fixed places (`items`: home, search, the places used most), close together and
   * centred, each with its badge, and at the end "More": a bottom sheet with every place
   * (`more`) in a grid — with a dot on "More" while something waits in a place the bar does not
   * show. It sits above the home indicator (safe area), steps aside while someone types
   * (`data-typing`, see `watchDevice`) and sticks to the bottom of its scroller.
   *
   *   <BottomBar items={[home, search, ...recent]} more={everything} current={here} />
   *
   * Phones only by default (≤ 720 px); `phoneOnly={false}` shows it everywhere. Five or six
   * places fit a 375 px phone with "More". Which places come first is yours (most recent, most
   * used); keep the order steady while someone moves between the places it shows.
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import AppIcon from '../atoms/AppIcon.svelte';
  import { colorValue } from '../atoms/palette';
  import Popover from '../molecules/Popover.svelte';

  interface Props {
    /** The places in the bar, in order. */
    items: BottomBarItem[];
    /** Every place, for the "More" sheet; no "More" without it. */
    more?: BottomBarItem[] | undefined;
    /** The id of the place on screen. */
    current?: string | undefined;
    /** Accessible name of the bar. */
    label?: string;
    moreLabel?: string;
    moreIcon?: IconName;
    /** Accessible name of the dot on "More" (something new in a place not in the bar). */
    moreDotLabel?: string;
    /** Above the grid in the sheet (a search field); gets `close`. */
    sheetTop?: Snippet<[() => void]> | undefined;
    /** Below the grid in the sheet (a status line); gets `close`. */
    sheetFooter?: Snippet<[() => void]> | undefined;
    /** Only on phones (≤ 720 px). */
    phoneOnly?: boolean;
    /** The "More" sheet is open. */
    open?: boolean;
  }

  let {
    items,
    more,
    current,
    label = 'Main',
    moreLabel = 'More',
    moreIcon = 'grid',
    moreDotLabel = 'Something new',
    sheetTop,
    sheetFooter,
    phoneOnly = true,
    open = $bindable(false),
  }: Props = $props();

  const figure = (n: number) => (n > 99 ? '99+' : String(n));
  const named = (item: BottomBarItem) =>
    item.badge ? `${item.label}, ${figure(item.badge)} new` : item.label;
  /** Something waits in a place the bar does not show: "More" says so. */
  const elsewhere = $derived(
    (more ?? []).some((m) => (m.badge ?? 0) > 0 && !items.some((i) => i.id === m.id)),
  );
</script>

{#snippet glyph(item: BottomBarItem, size: number)}
  {#if item.color}
    <AppIcon icon={item.icon} color={item.color} label={item.label} {size} />
  {:else}
    <Icon name={item.icon} size={Math.round(size * 0.72)} />
  {/if}
  {#if item.badge && item.id !== current}<span class="badge">{figure(item.badge)}</span>{/if}
{/snippet}

{#snippet place(item: BottomBarItem)}
  <svelte:element
    this={item.href ? 'a' : 'button'}
    href={item.href}
    type={item.href ? undefined : 'button'}
    class="item"
    class:on={item.id === current}
    style:--place={colorValue(item.color === 'accent' ? undefined : item.color)}
    aria-current={item.id === current ? 'page' : undefined}
    aria-label={named(item)}
    onclick={item.onclick}
    role={item.href ? undefined : 'button'}
    tabindex="0"
  >
    <span class="glyph" class:plain={!item.color}>{@render glyph(item, 26)}</span>
    <span class="name">{item.label}</span>
  </svelte:element>
{/snippet}

<nav class="bar" class:everywhere={!phoneOnly} aria-label={label} data-glass>
  {#each items as item (item.id)}{@render place(item)}{/each}
  {#if more}
    <Popover label={moreLabel} placement="top-end" padding="md" sheet gripLabel="Close" bind:open>
      {#snippet trigger(props)}
        <button {...props} type="button" class="item" class:on={open}>
          <span class="glyph plain">
            <Icon name={moreIcon} size={19} />
            {#if elsewhere}<span class="dot" role="img" aria-label={moreDotLabel}></span>{/if}
          </span>
          <span class="name">{moreLabel}</span>
        </button>
      {/snippet}
      {#snippet children(close)}
        <div class="sheet">
          {#if sheetTop}{@render sheetTop(close)}{/if}
          <ul class="grid" aria-label={moreLabel}>
            {#each more as item (item.id)}
              <li>
                <svelte:element
                  this={item.href ? 'a' : 'button'}
                  href={item.href}
                  type={item.href ? undefined : 'button'}
                  class="tile"
                  class:on={item.id === current}
                  style:--place={colorValue(item.color === 'accent' ? undefined : item.color)}
                  aria-current={item.id === current ? 'page' : undefined}
                  aria-label={named(item)}
                  role={item.href ? undefined : 'button'}
                  tabindex="0"
                  onclick={() => {
                    close();
                    item.onclick?.();
                  }}
                >
                  <span class="glyph" class:plain={!item.color}>{@render glyph(item, 52)}</span>
                  <span class="tile-name">{item.label}</span>
                </svelte:element>
              </li>
            {/each}
          </ul>
          {#if sheetFooter}{@render sheetFooter(close)}{/if}
        </div>
      {/snippet}
    </Popover>
  {/if}
</nav>

<style>
  .bar {
    position: sticky;
    bottom: 0;
    z-index: var(--z-header, 40);
    display: none;
    justify-content: center;
    align-items: stretch;
    gap: 2px;
    height: calc(56px + env(safe-area-inset-bottom));
    padding: 0 max(var(--space-2), env(safe-area-inset-left)) env(safe-area-inset-bottom)
      max(var(--space-2), env(safe-area-inset-right));
    background: var(--light, none), color-mix(in oklch, var(--bg) 88%, transparent);
    backdrop-filter: blur(18px) saturate(1.1);
    -webkit-backdrop-filter: blur(18px) saturate(1.1);
    border-top: 1px solid var(--border-strong);
  }
  .bar.everywhere {
    display: flex;
  }
  @media (max-width: 720px) {
    .bar {
      display: flex;
    }
  }
  /* While typing the bar steps aside: the field and the keyboard get the room. */
  :global(:root[data-typing]) .bar {
    display: none;
  }
  /* Popover's anchor takes one place like the links. */
  .bar > :global(.anchor) {
    display: flex;
  }
  .item {
    display: flex;
    flex: 0 1 60px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    min-width: 0;
    min-height: 48px;
    padding: 0;
    border: 0;
    background: none;
    color: var(--text-2);
    font: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: scale var(--motion-quick) var(--ease-jelly);
  }
  .item:active {
    scale: 0.9;
  }
  .item:focus-visible {
    outline: none;
  }
  .item:focus-visible .glyph {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .glyph {
    position: relative;
    display: grid;
    place-items: center;
    width: 44px;
    height: 30px;
    border-radius: var(--radius-pill);
    transition: background var(--motion-quick) var(--ease-out);
  }
  .glyph.plain {
    color: var(--text);
  }
  .item.on .glyph {
    background: color-mix(in oklch, var(--place, var(--text)) 16%, transparent);
  }
  .name {
    max-width: 100%;
    overflow: hidden;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item.on .name {
    color: var(--text);
  }
  .badge {
    position: absolute;
    top: -3px;
    right: 0;
    display: inline-grid;
    place-items: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    box-sizing: border-box;
    border-radius: var(--radius-pill);
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
    color: white;
    background: var(--place, var(--accent-strong));
    box-shadow: 0 0 0 2px var(--bg);
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .dot {
    position: absolute;
    top: 1px;
    right: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--accent-strong);
    box-shadow: 0 0 0 2px var(--bg);
  }

  /* The sheet of every place. */
  .sheet {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    width: min(360px, calc(100vw - 48px));
  }
  @media (max-width: 720px) {
    .sheet {
      width: auto;
    }
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-4) var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 4px 0;
    border: 0;
    border-radius: var(--radius-lg, 14px);
    background: none;
    color: var(--text);
    font: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: scale var(--motion-quick) var(--ease-jelly);
  }
  .tile:active {
    scale: 0.92;
  }
  .tile .glyph {
    width: auto;
    height: auto;
  }
  .tile .glyph.plain {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: color-mix(in oklch, var(--text) 7%, transparent);
  }
  .tile .badge {
    top: -5px;
    right: -7px;
  }
  .tile-name {
    max-width: 100%;
    overflow: hidden;
    font-size: var(--fs-sm);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tile.on .tile-name {
    font-weight: var(--fw-semibold);
  }
  @media (prefers-reduced-motion: reduce) {
    .item,
    .tile {
      transition: none;
    }
    .item:active,
    .tile:active {
      scale: none;
    }
    .badge {
      animation: none;
    }
  }
</style>
