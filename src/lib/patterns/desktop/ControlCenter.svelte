<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  /** A round on/off tile (Wi-Fi, Bluetooth, Focus, …). */
  export interface ControlToggle {
    id: string;
    label: string;
    icon: IconName;
    on: boolean;
    /** Grey line under the label when on ("Home network"). */
    detail?: string | undefined;
  }

  export interface NowPlaying {
    title: string;
    artist?: string | undefined;
    /** Cover image URL; without it a tinted note glyph shows. */
    artwork?: string | undefined;
    playing: boolean;
  }
</script>

<script lang="ts">
  /**
   * ControlCenter — the quick-settings panel of a desktop or tablet: round toggle tiles, big
   * candy sliders for brightness and volume, and a now-playing card. Everything is a control
   * with its own name, so it works by keyboard and screen reader. With `floating` it opens as a
   * panel in the top right corner (Escape or a click outside closes it).
   *
   *   <ControlCenter toggles={toggles} ontoggle={(id, on) => …} bind:brightness bind:volume
   *                  nowPlaying={{ title: 'Sunrise', artist: 'Example Band', playing: true }} />
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import { getDesktop } from './shared.svelte';

  interface Props {
    toggles?: ControlToggle[];
    ontoggle?: ((id: string, on: boolean) => void) | undefined;
    /** 0–100; `undefined` hides the slider. */
    brightness?: number | undefined;
    volume?: number | undefined;
    nowPlaying?: NowPlaying | undefined;
    onplaypause?: (() => void) | undefined;
    onnext?: (() => void) | undefined;
    onprevious?: (() => void) | undefined;
    /** A panel in the top right corner with open/close behaviour. */
    floating?: boolean;
    open?: boolean;
    onclose?: (() => void) | undefined;
    label?: string;
    brightnessLabel?: string;
    volumeLabel?: string;
    playLabel?: string;
    pauseLabel?: string;
    nextLabel?: string;
    previousLabel?: string;
    /** Extra tiles under the built-in ones. */
    children?: Snippet | undefined;
  }

  let {
    toggles = [],
    ontoggle,
    brightness = $bindable(),
    volume = $bindable(),
    nowPlaying,
    onplaypause,
    onnext,
    onprevious,
    floating = false,
    open = $bindable(true),
    onclose,
    label = 'Control Center',
    brightnessLabel = 'Brightness',
    volumeLabel = 'Volume',
    playLabel = 'Play',
    pauseLabel = 'Pause',
    nextLabel = 'Next track',
    previousLabel = 'Previous track',
    children,
  }: Props = $props();

  const inDesktop = !!getDesktop();
  let root = $state<HTMLElement>();

  function close() {
    if (!floating) return;
    open = false;
    onclose?.();
  }

  function onDocumentPointerDown(event: PointerEvent) {
    // A click on whatever opened the panel (it toggles itself) is not an outside click.
    const t = event.target as HTMLElement;
    if (floating && open && root && !root.contains(t) && !t.closest('[aria-pressed]')) close();
  }
</script>

<svelte:document onpointerdown={onDocumentPointerDown} />

{#snippet slider(name: string, iconName: IconName, value: number, set: (v: number) => void)}
  <label class="slider" style:--fill="{value}%">
    <span class="slider-label">{name}</span>
    <span class="track">
      <Icon name={iconName} size={18} />
      <input
        type="range"
        min="0"
        max="100"
        {value}
        oninput={(e) => set(Number((e.currentTarget as HTMLInputElement).value))}
      />
    </span>
  </label>
{/snippet}

{#if open}
  <section
    bind:this={root}
    class="cc"
    class:floating
    class:in-desktop={inDesktop}
    aria-label={label}
    role={floating ? 'dialog' : undefined}
    onkeydown={(e) => e.key === 'Escape' && close()}
  >
    {#if toggles.length}
      <div class="tile toggles">
        {#each toggles as t (t.id)}
          <button
            type="button"
            class="toggle"
            class:on={t.on}
            aria-pressed={t.on}
            onclick={() => ontoggle?.(t.id, !t.on)}
          >
            <span class="disc"><Icon name={t.icon} size={18} /></span>
            <span class="toggle-text">
              <span class="toggle-label">{t.label}</span>
              {#if t.detail && t.on}<span class="toggle-detail">{t.detail}</span>{/if}
            </span>
          </button>
        {/each}
      </div>
    {/if}

    {#if nowPlaying}
      <div class="tile playing">
        <span
          class="art"
          style:background-image={nowPlaying.artwork ? `url("${nowPlaying.artwork}")` : undefined}
        >
          {#if !nowPlaying.artwork}<Icon name="sparkles" size={20} />{/if}
        </span>
        <span class="track-info">
          <span class="track-title">{nowPlaying.title}</span>
          {#if nowPlaying.artist}<span class="track-artist">{nowPlaying.artist}</span>{/if}
        </span>
        <span class="transport">
          <button type="button" aria-label={previousLabel} onclick={() => onprevious?.()}>
            <Icon name="chevron-left" size={18} />
          </button>
          <button
            type="button"
            class="play"
            aria-label={nowPlaying.playing ? pauseLabel : playLabel}
            onclick={() => onplaypause?.()}
          >
            <Icon name={nowPlaying.playing ? 'pause' : 'play'} size={18} />
          </button>
          <button type="button" aria-label={nextLabel} onclick={() => onnext?.()}>
            <Icon name="chevron-right" size={18} />
          </button>
        </span>
      </div>
    {/if}

    {#if brightness !== undefined}
      <div class="tile">
        {@render slider(brightnessLabel, 'sun', brightness, (v) => (brightness = v))}
      </div>
    {/if}
    {#if volume !== undefined}
      <div class="tile">
        {@render slider(volumeLabel, 'volume', volume, (v) => (volume = v))}
      </div>
    {/if}
    {@render children?.()}
  </section>
{/if}

<style>
  .cc {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-3);
    width: 21rem;
    max-width: 100%;
    padding: var(--space-3);
    border-radius: var(--radius-dialog);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    color: var(--text);
  }
  .floating {
    position: fixed;
    top: calc(var(--page-top, 0px) + var(--space-10));
    right: var(--space-3);
    z-index: var(--z-popover);
    transform-origin: 90% 0;
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .floating.in-desktop {
    position: absolute;
    top: var(--space-2);
  }
  .tile {
    grid-column: span 2;
    padding: var(--space-3);
    border-radius: var(--radius-xl);
    background: var(--fill-subtle);
    box-shadow:
      inset 0 0 0 0.5px var(--border-strong),
      inset 0 1px 0 var(--pill-light);
  }
  .cc > :global(*:not(.tile)) {
    grid-column: span 2;
  }
  .toggles {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-2);
  }
  .toggle {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    padding: var(--space-1);
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .disc {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: var(--control-md);
    height: var(--control-md);
    border-radius: 50%;
    background: var(--fill-muted);
    color: var(--text);
    transition:
      background-color var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .on .disc {
    background: var(--grad-primary);
    color: var(--on-accent);
    box-shadow: var(--shadow-primary);
  }
  .toggle:active .disc {
    transform: var(--press-squish);
  }
  .toggle:hover:not(.on) .disc {
    background: var(--fill-off);
  }
  .toggle:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .toggle-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .toggle-label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .toggle-detail {
    overflow: hidden;
    color: var(--text-2);
    font-size: var(--fs-2xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .playing {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .art {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    background: linear-gradient(
      140deg,
      var(--color-pink),
      var(--color-purple) 60%,
      var(--color-indigo)
    );
    background-size: cover;
    background-position: center;
    color: #fff;
    box-shadow: 0 6px 14px rgba(12, 12, 22, 0.18);
  }
  .track-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }
  .track-title {
    overflow: hidden;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .track-artist {
    overflow: hidden;
    color: var(--text-2);
    font-size: var(--fs-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .transport {
    display: flex;
    align-items: center;
  }
  .transport button {
    display: grid;
    place-items: center;
    width: var(--control-sm);
    height: var(--control-sm);
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: none;
    color: inherit;
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .transport button:hover {
    background: var(--fill-hover);
  }
  .transport button:active {
    transform: var(--press-squish);
  }
  .transport .play {
    background: var(--fill-muted);
  }
  .transport .play {
    width: var(--control-md);
    height: var(--control-md);
  }
  .transport button:focus-visible {
    outline: var(--focus-ring);
  }

  .slider {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .slider-label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .track {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--control-md);
    border-radius: var(--radius-pill);
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.94) var(--fill), transparent var(--fill)),
      color-mix(in srgb, var(--text) 16%, transparent);
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  .track :global(.icon) {
    position: absolute;
    left: 0.7rem;
    /* Sits on the white fill in both themes. */
    color: #77777c;
    pointer-events: none;
  }
  .track input {
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }
  .track:focus-within {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  @media (max-width: 520px) {
    .floating {
      left: var(--space-3);
      width: auto;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .floating {
      animation: none;
    }
    .disc,
    .transport button {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .cc {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
