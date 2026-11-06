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
    top?: Snippet | undefined;
    bottom?: Snippet | undefined;
  }

  let {
    items,
    current = $bindable(),
    onselect,
    label = 'Main',
    orientation = 'vertical',
    top,
    bottom,
  }: Props = $props();

  function select(id: string) {
    current = id;
    onselect?.(id);
  }
</script>

<nav class="rail rail--{orientation}" aria-label={label}>
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
    {#if bottom}<div class="rail__end rail__end--bottom">{@render bottom()}</div>{/if}
  </Layer>
</nav>

<style>
  .rail {
    display: flex;
  }
  .rail--vertical {
    height: 100%;
  }
  .rail--vertical :global(.rail__glass) {
    padding-block: var(--space-3);
  }
  .rail__items {
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

  /* Page puts its sidebar on top below 900px: the rail lies down with it. */
  @media (max-width: 900px) {
    .rail--vertical {
      height: auto;
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
