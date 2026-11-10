<script lang="ts">
  /**
   * NavRail — the slim main navigation of a device or tool screen: round buttons on a column of
   * liquid glass (front layer, so it is sticky). Each item is an icon with its name in a tooltip
   * beside it; the current one is filled with the accent. `top` holds an identity circle (a
   * logo), `bottom` the person (an Avatar). Below 900px a vertical rail lies down into a horizontal
   * bar. Put it in its own sticky column rather than Page's `sidebar`, whose scroll box would
   * clip the tooltips beside it. Items with `href` are links, the
   * others buttons that call `onselect`.
   *
   *   <NavRail items={sections} bind:current onselect={go}>
   *     {#snippet bottom()}<Avatar name="Ada Example" size={36} />{/snippet}
   *   </NavRail>
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import Tooltip from '../atoms/Tooltip.svelte';
  import type { IconName } from '../atoms/icons';
  import Layer from '../layout/Layer.svelte';
  import { boxWithin, LiquidDrop, pillPath, squeeze } from '../../utils/liquid';

  export interface NavRailItem {
    id: string;
    label: string;
    icon: IconName;
    href?: string | undefined;
  }

  interface Props {
    items: NavRailItem[];
    /** The id of the current item. */
    current?: string | undefined;
    onselect?: ((id: string) => void) | undefined;
    /** Accessible name of the navigation landmark. */
    label?: string;
    orientation?: 'vertical' | 'horizontal';
    /** The soft white frame inside the glass's edge (default on); off leaves the hairline only. */
    frame?: boolean;
    /** How wide the frame is, any CSS length (`6px`, `0.75rem`). Default `8px`; the
     *  `--rail-frame` custom property sets it from outside as well. */
    frameWidth?: string | undefined;
    top?: Snippet | undefined;
    bottom?: Snippet | undefined;
  }

  let {
    items,
    current = $bindable(),
    onselect,
    label = 'Main',
    orientation = 'vertical',
    frame = true,
    frameWidth,
    top,
    bottom,
  }: Props = $props();

  const uid = $props.id();

  function select(id: string) {
    current = id;
    onselect?.(id);
  }

  let nav = $state<HTMLElement>();
  let track = $state<HTMLElement>();
  let dropEl = $state<HTMLElement>();
  let hasDrop = $state(false);
  let drop: LiquidDrop | undefined;

  function place(how: 'move' | 'follow' | 'instant') {
    const item = track?.querySelector<HTMLElement>('.rail__item.on');
    hasDrop = !!item?.offsetWidth;
    if (item && track && hasDrop) drop?.moveTo(boxWithin(item, track), how);
  }

  // The current mark flows from item to item like a drop of thick water, and the glass rail
  // bulges where it passes (utils/liquid.ts).
  $effect(() => {
    const el = dropEl;
    if (!el || !track) return;
    drop = new LiquidDrop({
      render: (box) => {
        el.style.width = `${box.w}px`;
        el.style.height = `${box.h}px`;
        el.style.transform = `translate(${box.x}px, ${box.y}px)`;
      },
      // The whole rail (glass, shadow and rim) bulges together.
      host: nav,
      bulge: 0.05,
    });
    place('instant');
    // Pressing an item squeezes the rail like a rubber band and swells its edges out right at
    // the item, like a water-filled band where a finger presses it.
    const unsqueeze = nav
      ? squeeze(nav, {
          selector: '.rail__item',
          onFrame: (press, at) => shape(Math.max(0, press) * BULGE, at),
        })
      : undefined;
    const observer =
      typeof ResizeObserver === 'function' ? new ResizeObserver(() => place('follow')) : undefined;
    observer?.observe(track);
    return () => {
      unsqueeze?.();
      observer?.disconnect();
      drop?.destroy();
      drop = undefined;
    };
  });

  /** Room on each long side of the glass for the bulge to grow into, and its full size. */
  const ROOM = 8;
  const BULGE = 4;
  let outline = $state('');
  let glassBox = $state({ x: 0, y: 0, w: 0, h: 0 });

  function shape(bulge = 0, at?: number) {
    const glass = nav?.querySelector<HTMLElement>('.rail__glass');
    if (!glass?.offsetWidth) return;
    glassBox = {
      x: glass.offsetLeft,
      y: glass.offsetTop,
      w: glass.offsetWidth,
      h: glass.offsetHeight,
    };
    const vertical = glassBox.h > glassBox.w;
    // The press is measured on the item, inside the glass's box minus its room.
    const along = at === undefined ? undefined : at - (vertical ? glassBox.y : glassBox.x);
    outline = pillPath(glassBox.w, glassBox.h, {
      inset: ROOM,
      at: along,
      bulge,
      reach: 34,
      vertical,
    });
    glass.style.clipPath = `path('${outline}')`;
  }

  // The outline follows the rail's size (it lies down into a bar on narrow screens).
  $effect(() => {
    const glass = nav?.querySelector<HTMLElement>('.rail__glass');
    if (!glass || typeof ResizeObserver !== 'function') return shape();
    const observer = new ResizeObserver(() => shape());
    observer.observe(glass);
    // A sticky glass moves inside the rail while the page scrolls; the drawing follows it.
    const onScroll = () => shape();
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll, { capture: true });
    };
  });

  $effect(() => {
    void current;
    // After the DOM has the new current item.
    queueMicrotask(() => place('move'));
  });
</script>

<nav
  class="rail rail--{orientation}"
  class:rail--frameless={!frame}
  aria-label={label}
  style:--rail-frame={frameWidth}
  bind:this={nav}
>
  <!-- Shadow and rim light are drawn from the glass's own outline, so they follow its morph. -->
  {#if outline}
    <svg
      class="rail__shadow"
      aria-hidden="true"
      style:left="{glassBox.x}px"
      style:top="{glassBox.y}px"
      width={glassBox.w}
      height={glassBox.h}
    >
      <!-- SVG blurs, not CSS filters: WebKit does not blur SVG shapes with a CSS filter. -->
      <defs>
        <filter id="{uid}-far" x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="{uid}-near" x="-20%" y="-10%" width="140%" height="120%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <path class="far" d={outline} filter="url(#{uid}-far)" />
      <path class="near" d={outline} filter="url(#{uid}-near)" />
    </svg>
  {/if}
  <Layer
    level="front"
    shape="pill"
    padding="sm"
    gap="sm"
    direction={orientation}
    align="center"
    wrap={false}
    class="rail__glass"
  >
    {#if top}<div class="rail__end">{@render top()}</div>{/if}
    <div class="rail__track" class:rail__track--liquid={hasDrop} bind:this={track}>
      <span
        class="rail__drop"
        aria-hidden="true"
        data-emit={hasDrop ? '' : undefined}
        bind:this={dropEl}
      ></span>
      <ul class="rail__items">
        {#each items as item (item.id)}
          {@const on = item.id === current}
          <li>
            <Tooltip
              text={item.label}
              placement={orientation === 'vertical' ? 'right' : 'bottom'}
              describe={false}
            >
              {#if item.href}
                <a
                  class="rail__item"
                  class:on
                  href={item.href}
                  aria-label={item.label}
                  aria-current={on ? 'page' : undefined}
                  onclick={() => select(item.id)}><Icon name={item.icon} size={18} /></a
                >
              {:else}
                <button
                  type="button"
                  class="rail__item"
                  class:on
                  aria-label={item.label}
                  aria-current={on ? 'page' : undefined}
                  onclick={() => select(item.id)}><Icon name={item.icon} size={18} /></button
                >
              {/if}
            </Tooltip>
          </li>
        {/each}
      </ul>
    </div>
    {#if bottom}<div class="rail__end rail__end--bottom">{@render bottom()}</div>{/if}
  </Layer>
  {#if outline}
    <svg
      class="rail__rim"
      aria-hidden="true"
      style:left="{glassBox.x}px"
      style:top="{glassBox.y}px"
      width={glassBox.w}
      height={glassBox.h}
    >
      <defs>
        <clipPath id="{uid}-inside"><path d={outline} /></clipPath>
        <filter id="{uid}-soft" x="-20%" y="-10%" width="140%" height="120%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        <linearGradient id="{uid}-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="rim-top" />
          <stop offset="0.5" class="rim-mid" />
          <stop offset="1" class="rim-bottom" />
        </linearGradient>
      </defs>
      <!-- The pane's inner glow along its edge (what inset shadows did before the morph). -->
      {#if frame}
        <g clip-path="url(#{uid}-inside)">
          <path class="glow-in" d={outline} filter="url(#{uid}-soft)" />
        </g>
      {/if}
      <path class="edge" d={outline} stroke="url(#{uid}-rim)" />
    </svg>
  {/if}
</nav>

<style>
  .rail {
    position: relative;
    display: flex;
  }
  /* The glass is clipped to its outline (pillPath); it keeps room on its long sides for the
     bulge, and its own shadow and border give way to the drawn ones. */
  .rail :global(.rail__glass.layer) {
    box-shadow: none;
    border-color: transparent;
  }
  .rail.rail--vertical :global(.rail__glass.layer) {
    margin-inline: -8px;
    padding-inline: calc(var(--layer-pad) + var(--space-1) + 8px);
  }
  .rail.rail--horizontal :global(.rail__glass.layer) {
    margin-block: -8px;
    padding-block: calc(var(--layer-pad) + 8px);
  }
  .rail__shadow,
  .rail__rim {
    position: absolute;
    overflow: visible;
    pointer-events: none;
  }
  .rail__shadow {
    z-index: 0;
  }
  .rail__shadow path {
    fill: var(--front-shadow);
  }
  .rail__shadow .far {
    transform: translateY(10px);
    opacity: 0.9;
  }
  .rail__shadow .near {
    transform: translateY(2px);
    opacity: 0.55;
  }
  .rail__rim {
    z-index: calc(var(--z-front) + 1);
  }
  .rail__rim path {
    fill: none;
  }
  .rail__rim .edge {
    stroke-width: 1;
  }
  /* The stroke is centred on the outline and clipped to the inside, so half of it shows. */
  .rail__rim .glow-in {
    stroke: var(--pill-rim);
    stroke-width: calc(2 * var(--rail-frame, 8px));
    opacity: 0.75;
  }
  .rim-top {
    stop-color: var(--pill-light);
  }
  .rim-mid {
    stop-color: var(--pill-light);
    stop-opacity: 0.25;
  }
  .rim-bottom {
    stop-color: var(--pill-rim);
    stop-opacity: 0.7;
  }
  /* A rail is never taller than the screen: the same margin above and below it, whatever
     column it sits in. */
  .rail--vertical {
    height: calc(var(--app-height, 100dvh) - 2 * var(--space-6));
  }
  /* A front element, like the header pill: on a Page it sits at the gutter, not at the
     content's inset — the same margin left of it as above and below. */
  :global(.page .main) .rail--vertical {
    margin-inline-start: calc(var(--gutter) - var(--content-gutter));
  }
  .rail--vertical :global(.rail__glass) {
    padding-block: var(--space-3);
  }
  .rail__track {
    position: relative;
    display: flex;
    flex-direction: inherit;
  }
  /* The current mark: one drop for the whole rail, under the items. */
  .rail__drop {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    border-radius: var(--radius-pill);
    background: var(--grad-primary);
    box-shadow: var(--shadow-primary);
    pointer-events: none;
  }
  .rail__track--liquid .rail__drop {
    display: block;
  }
  .rail__items {
    position: relative;
    display: flex;
    flex-direction: inherit;
    align-items: center;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .rail--vertical .rail__items {
    flex-direction: column;
    margin-block: var(--space-4);
  }
  .rail--horizontal .rail__items {
    flex-direction: row;
    margin-inline: var(--space-2);
  }
  .rail__end {
    display: flex;
  }
  /* The person sits apart from the places: at the far end of the rail. */
  .rail__end--bottom {
    margin-block-start: auto;
  }
  .rail--horizontal .rail__end--bottom {
    margin-block-start: 0;
    margin-inline-start: auto;
  }

  .rail__item {
    display: inline-grid;
    place-items: center;
    width: var(--control-lg);
    height: var(--control-lg);
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--text-2);
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .rail__item:hover {
    background: var(--fill-hover);
    color: var(--text);
  }
  .rail__item:active {
    transform: var(--press-squish);
  }
  .rail__item:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .rail__item.on,
  .rail__item.on:hover {
    background: var(--grad-primary);
    color: var(--on-accent);
    box-shadow: var(--shadow-primary);
  }
  /* With the drop drawn, the item only takes its colour; the drop is its background. */
  .rail__track--liquid .rail__item.on,
  .rail__track--liquid .rail__item.on:hover {
    background: transparent;
    box-shadow: none;
    transition: color var(--motion-base) var(--ease-out);
  }

  /* Page puts its sidebar on top below 900px: the rail lies down with it. */
  @media (max-width: 900px) {
    .rail--vertical {
      height: auto;
    }
    /* Lying down, the bulge grows up and down: the room moves to the long sides. */
    .rail.rail--vertical :global(.rail__glass.layer) {
      margin-inline: 0;
      padding-inline: calc(var(--layer-pad) + var(--space-1));
      margin-block: -8px;
      padding-block: calc(var(--space-2) + 8px);
    }
    .rail--vertical :global(.rail__glass) {
      flex-direction: row;
      padding-block: var(--space-2);
    }
    .rail--vertical .rail__items {
      flex-direction: row;
      margin-block: 0;
      margin-inline: var(--space-2);
    }
    .rail--vertical .rail__end--bottom {
      margin-block-start: 0;
      margin-inline-start: auto;
    }
    .rail--vertical :global(.tip--right) {
      top: calc(100% + 8px);
      left: 50%;
      --_x: -50%;
      --_y: 0%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .rail__item:active {
      transform: none;
    }
  }
</style>
