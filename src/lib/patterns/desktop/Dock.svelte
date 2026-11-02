<script lang="ts">
  /**
   * Dock — the **candy tray**: a floating glass tray of apps at the bottom of a desktop. Icons
   * stay put while you aim (no magnifying wave): the one under the pointer lifts a little and
   * shows its name in a pill above; a click plays one jelly squish. Running apps carry a short
   * tint bar, the front app a longer one. `onjar` adds the candy jar — a button for all apps —
   * at the start. A front layer: it sticks to the bottom. Left / Right move between icons (one
   * tab stop).
   *
   *   <Dock items={[{ id: 'mail', label: 'Mail', icon: 'mail', color: 'blue', running: true,
   *                   badge: 3 }, { separator: true }, …]}
   *         onselect={(app) => open(app.id)} onjar={() => (jar = true)} />
   */
  import type { Snippet } from 'svelte';
  import AppIcon from '../atoms/AppIcon.svelte';
  import GlassLens from '../atoms/GlassLens.svelte';
  import { frostFilter, type LensOptions } from '../../utils/lens';
  import { getDesktop, isSeparator, rove, type DockApp, type DockEntry } from './shared.svelte';

  interface Props {
    items: DockEntry[];
    /** Icon size in px (smaller on phones). */
    size?: number;
    /** Accessible name. */
    label?: string;
    /** Spoken after the name of a running app. */
    runningLabel?: string;
    onselect?: ((app: DockApp) => void) | undefined;
    /** Shows the candy jar (all apps) at the start of the tray. */
    onjar?: (() => void) | undefined;
    jarLabel?: string;
    /** The jar's overlay is open. */
    jarOpen?: boolean;
    /** Renders each icon instead of the built-in candy icon. */
    icon?: Snippet<[DockApp]> | undefined;
    /** Extra content at the end (e.g. a clock). */
    trailing?: Snippet | undefined;
    /** Refraction of the tray (magnify, rim, rimBend, chroma, blur, saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
  }

  let {
    items,
    size = 52,
    label = 'Dock',
    runningLabel = 'running',
    onselect,
    onjar,
    jarLabel = 'All apps',
    jarOpen = false,
    icon,
    trailing,
    lens = {},
  }: Props = $props();

  let lensDrawn = $state(false);

  const manager = getDesktop();
  let focusAt = $state(0);
  let squish = $state<string | undefined>();
  let root: HTMLElement;

  const apps = $derived(items.filter((i): i is DockApp => !isSeparator(i)));
  const offset = $derived(onjar ? 1 : 0);
  const indexOf = (app: DockApp) => apps.indexOf(app) + offset;
  const buttons = () => [...root.querySelectorAll<HTMLElement>('.item')];

  // Windows grow out of their icon here and shrink back into it.
  $effect(() => {
    if (!manager) return;
    manager.tray = root;
    return () => {
      if (manager.tray === root) manager.tray = undefined;
    };
  });

  function onkeydown(event: KeyboardEvent) {
    const all = buttons();
    if (rove(event, all, 'horizontal')) {
      focusAt = all.indexOf(document.activeElement as HTMLElement);
    }
  }

  function pick(app: DockApp) {
    focusAt = indexOf(app);
    squish = app.id;
    onselect?.(app);
  }
</script>

<!-- Arrow keys bubble up from the buttons inside (roving focus). -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<nav
  class="dock"
  class:lensed={lens !== false && lensDrawn}
  aria-label={label}
  style:--dock-size-prop="{size}px"
  style:--layer-front-blur={frostFilter(lens)}
  bind:this={root}
  {onkeydown}
>
  {#if lens !== false}<GlassLens {...lens} bind:active={lensDrawn} />{/if}
  {#if onjar}
    <button
      type="button"
      class="item jar"
      data-app="jar"
      aria-label={jarLabel}
      aria-expanded={jarOpen}
      tabindex={focusAt === 0 ? 0 : -1}
      onclick={() => {
        focusAt = 0;
        squish = 'jar';
        onjar();
      }}
    >
      <span class="tip" aria-hidden="true">{jarLabel}</span>
      <span
        class="lift"
        class:squish={squish === 'jar'}
        onanimationend={() => (squish = undefined)}
      >
        <!-- A jar of four candies: the tint's three hues and a pink one. -->
        <span class="jar-glass" aria-hidden="true">
          <i></i><i></i><i></i><i></i>
        </span>
      </span>
      <span class="run" aria-hidden="true"></span>
    </button>
    {#if apps.length}<span class="separator" role="separator" aria-orientation="vertical"
      ></span>{/if}
  {/if}
  {#each items as entry, i (isSeparator(entry) ? `sep-${i}` : entry.id)}
    {#if isSeparator(entry)}
      <span class="separator" role="separator" aria-orientation="vertical"></span>
    {:else}
      {@const at = indexOf(entry)}
      <button
        type="button"
        class="item"
        data-app={entry.id}
        aria-label={[
          entry.label,
          entry.badge !== undefined ? String(entry.badge) : '',
          entry.running ? runningLabel : '',
        ]
          .filter(Boolean)
          .join(', ')}
        aria-current={entry.active ? 'true' : undefined}
        tabindex={focusAt === at ? 0 : -1}
        onclick={() => pick(entry)}
      >
        <span class="tip" aria-hidden="true">{entry.label}</span>
        <span
          class="lift"
          class:squish={squish === entry.id}
          onanimationend={() => (squish = undefined)}
        >
          {#if icon}{@render icon(entry)}{:else}
            <AppIcon
              label={entry.label}
              icon={entry.icon}
              color={entry.color ?? 'accent'}
              src={entry.src}
              badge={entry.badge}
              {size}
            />
          {/if}
        </span>
        <span class="run" class:on={entry.running} class:active={entry.active} aria-hidden="true"
        ></span>
      </button>
    {/if}
  {/each}
  {@render trailing?.()}
</nav>

<style>
  .dock {
    --dock-size: var(--dock-size-prop);
    --tray-pad: calc(var(--dock-size) * 0.18);
    /* Front layer: always sticky, at the bottom edge. */
    position: sticky;
    bottom: var(--sticky-gap);
    z-index: var(--z-front);
    display: flex;
    align-items: flex-end;
    gap: calc(var(--dock-size) * 0.16);
    width: max-content;
    max-width: calc(100% - 2 * var(--sticky-gap));
    margin-inline: auto;
    padding: var(--tray-pad) var(--tray-pad) calc(var(--tray-pad) * 0.45);
    /* A tray holds things, so it is a rounded rect, concentric with the icons inside it. */
    border-radius: calc((var(--dock-size) * 0.225 + var(--tray-pad)) * var(--radius-scale));
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    box-shadow: var(--layer-front-shadow);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
  }
  /* Thick glass: the lens scatters and bends the backdrop, the tray only lends it a thin body. */
  .dock.lensed {
    isolation: isolate;
    background: var(--layer-front-lens-bg);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .lift {
    position: relative;
    display: block;
    height: var(--dock-size);
    transform-origin: 50% 100%;
    transition: transform var(--motion-base) var(--ease-spring);
  }
  /* On phones the tray shrinks; the icon follows its size. */
  .lift :global(.app) {
    --app-size: var(--dock-size) !important;
  }
  .lift :global(.tile > .icon) {
    width: 50%;
    height: 50%;
  }
  /* The tray does the lifting; the icon's own hover would double it. */
  .lift :global(.tile) {
    transform: none !important;
  }
  .item:hover .lift,
  .item:focus-visible .lift {
    transform: translateY(-4px);
  }
  .item:active .lift {
    transform: translateY(-2px) var(--press-squish);
    transition-timing-function: var(--ease-jelly);
  }
  .lift.squish {
    animation: bb-jelly var(--motion-lazy) var(--ease-out);
  }
  .item:focus-visible {
    outline: none;
  }
  .item:focus-visible .lift {
    border-radius: calc(var(--dock-size) * 0.26);
    outline: var(--focus-ring);
    outline-offset: 3px;
  }

  /* Running: a short tint bar (a dot is too easy to miss); the front app's is longer. */
  .run {
    width: 0;
    height: 3px;
    border-radius: var(--radius-pill);
    background: var(--accent);
    opacity: 0;
    transition:
      width var(--motion-base) var(--ease-spring),
      opacity var(--motion-quick) var(--ease-out);
  }
  .run.on {
    width: 10px;
    opacity: 0.7;
  }
  .run.active {
    width: 20px;
    opacity: 1;
    box-shadow: 0 0 6px color-mix(in srgb, var(--tint) 50%, transparent);
  }

  .separator {
    align-self: stretch;
    width: 1px;
    margin: calc(var(--dock-size) * 0.1) 0 calc(var(--dock-size) * 0.2);
    border-radius: 1px;
    background: var(--border-strong);
  }

  /* The name pill floats above the lifted icon and pops from its bottom edge. */
  .tip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    padding: 0.2rem 0.65rem;
    border-radius: var(--radius-pill);
    border: 0.75px solid var(--pill-border);
    background: var(--tooltip-bg);
    box-shadow: var(--shadow-pop);
    color: var(--text);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    white-space: nowrap;
    opacity: 0;
    transform: translate(-50%, 4px) scale(0.9);
    transform-origin: 50% 100%;
    pointer-events: none;
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .item:hover .tip,
  .item:focus-visible .tip {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }

  /* The candy jar: frosted glass holding four candies. */
  .jar-glass {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
    gap: calc(var(--dock-size) * 0.06);
    width: var(--dock-size);
    height: var(--dock-size);
    padding: calc(var(--dock-size) * 0.22);
    border-radius: calc(var(--dock-size) * 0.225);
    background: var(--pill-tint);
    box-shadow:
      var(--shadow-frosted),
      inset 0 0 0 0.75px var(--pill-border);
  }
  .jar-glass i {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    background:
      radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.7), transparent 45%), var(--c);
    box-shadow: 0 1px 2px color-mix(in srgb, var(--c) 50%, transparent);
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .jar-glass i:nth-child(1) {
    --c: var(--tint);
  }
  .jar-glass i:nth-child(2) {
    --c: var(--tint-2);
  }
  .jar-glass i:nth-child(3) {
    --c: var(--tint-3);
  }
  .jar-glass i:nth-child(4) {
    --c: var(--color-pink);
  }
  /* Pointing at the jar gives the candies a little shake. */
  .jar:hover .jar-glass i:nth-child(odd),
  .jar[aria-expanded='true'] .jar-glass i:nth-child(odd) {
    transform: translateY(-2px) rotate(-8deg);
  }
  .jar:hover .jar-glass i:nth-child(even),
  .jar[aria-expanded='true'] .jar-glass i:nth-child(even) {
    transform: translateY(1px) rotate(8deg);
  }

  @media (max-width: 520px) {
    .dock {
      --dock-size: min(var(--dock-size-prop), 44px);
      overflow-x: auto;
      scrollbar-width: none;
    }
    .tip {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .lift,
    .tip,
    .run,
    .jar-glass i {
      transition: none;
    }
    .lift.squish {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .dock {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
