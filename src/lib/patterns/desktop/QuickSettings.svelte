<script lang="ts" module>
  import type { Snippet } from 'svelte';
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

  /** Props of QuickSettings (exported for the deprecated alias). */
  export interface QuickSettingsProps {
    toggles?: ControlToggle[];
    ontoggle?: ((id: string, on: boolean) => void) | undefined;
    /** 0–100; `undefined` hides the slider. */
    brightness?: number | undefined;
    volume?: number | undefined;
    nowPlaying?: NowPlaying | undefined;
    onplaypause?: (() => void) | undefined;
    onnext?: (() => void) | undefined;
    onprevious?: (() => void) | undefined;
    /** A panel with open/close behaviour, popping out of `anchor` (else the top right corner). */
    floating?: boolean;
    /** The control that toggles the floating panel: it opens from there, and a click on it is
     *  not an outside click. */
    anchor?: Element | undefined;
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
</script>

<script lang="ts">
  /**
   * QuickSettings — the quick-settings panel of a desktop or tablet: round toggle tiles, big
   * candy sliders for brightness and volume, and a now-playing card. Everything is a control
   * with its own name, so it works by keyboard and screen reader. With `floating` it opens as a
   * panel that pops out of its `anchor` (the status item that toggles it), or in the top right
   * corner without one. It takes focus when it opens; Escape closes it and gives focus back, a
   * click outside closes it (a click on the anchor is left to the anchor's own toggle).
   *
   *   <QuickSettings floating bind:open anchor={statusButton} toggles={toggles}
   *     ontoggle={(id, on) => …} bind:brightness bind:volume
   *     nowPlaying={{ title: 'Sunrise', artist: 'Example Band', playing: true }} />
   */
  import { tick, untrack } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import { getDesktop } from './shared.svelte';
  import { tabbables } from '../../utils/overlay';

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
    anchor,
    open = $bindable(true),
    onclose,
    label = 'Quick settings',
    brightnessLabel = 'Brightness',
    volumeLabel = 'Volume',
    playLabel = 'Play',
    pauseLabel = 'Pause',
    nextLabel = 'Next track',
    previousLabel = 'Previous track',
    children,
  }: QuickSettingsProps = $props();

  const inDesktop = !!getDesktop();
  let root = $state<HTMLElement>();
  /** Focus returns here on Escape: the anchor, else whatever had focus when it opened. */
  let opener: HTMLElement | null = null;
  let giveBack = true;

  $effect(() => {
    if (!floating || !open) return;
    giveBack = true;
    opener = untrack(() => {
      if (anchor instanceof HTMLElement) return anchor;
      const active = document.activeElement;
      return active instanceof HTMLElement && active !== document.body ? active : null;
    });
    void tick().then(() => {
      if (root && !root.contains(document.activeElement)) root.focus();
    });
    return () => {
      const active = document.activeElement;
      if (giveBack && opener && (!active || active === document.body || root?.contains(active)))
        // An anchor that only wraps the real button hands focus to that button.
        (opener.tabIndex >= 0 ? opener : (tabbables(opener)[0] ?? opener)).focus?.();
    };
  });

  // Pop out of the anchor: below it, aligned with it, transform origin on it.
  $effect(() => {
    if (!floating || !open || !root || !anchor) return;
    const panel = root;
    const target = anchor;
    untrack(() => place(panel, target));
  });

  function place(panel: HTMLElement, from: Element) {
    if (typeof matchMedia === 'function' && matchMedia('(max-width: 520px)').matches) return;
    const a = from.getBoundingClientRect();
    const frame = inDesktop ? panel.offsetParent?.getBoundingClientRect() : undefined;
    const ox = frame?.left ?? 0;
    const oy = frame?.top ?? 0;
    const room = frame?.width ?? window.innerWidth;
    const w = panel.offsetWidth;
    const gap = 8;
    const centre = a.left + a.width / 2 - ox;
    // In the left half it hangs to the right of the anchor, else to the left.
    const wanted = centre < room / 2 ? a.left - ox : a.right - ox - w;
    const left = Math.max(gap, Math.min(wanted, room - w - gap));
    const top = a.bottom - oy + gap;
    Object.assign(panel.style, {
      left: `${left}px`,
      right: 'auto',
      top: `${top}px`,
      transformOrigin: `${centre - left}px ${a.top + a.height / 2 - oy - top}px`,
    });
  }

  function close(restore = true) {
    if (!floating) return;
    giveBack = restore;
    open = false;
    onclose?.();
  }

  function onDocumentPointerDown(event: PointerEvent) {
    // A press on the anchor is its own toggle's business, not an outside click.
    const t = event.target as Node;
    const exempt = anchor ?? opener;
    if (floating && open && root && !root.contains(t) && !exempt?.contains(t)) close(false);
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
    tabindex="-1"
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
    outline: none;
    position: fixed;
    top: calc(var(--page-top, 0px) + var(--space-10));
    right: var(--space-3);
    z-index: var(--z-popover);
    transform-origin: 90% 0;
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .floating:focus-visible {
    box-shadow: var(--shadow-pop), var(--focus-halo);
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
    box-shadow: var(--shadow-frosted);
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
    /* A level, not a choice: a soft tinted ink over a faint groove, so the amount reads in
       either theme (the solid accent stays for what is selected). */
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--accent-ink) 32%, transparent) var(--fill),
        transparent var(--fill)
      ),
      color-mix(in srgb, var(--text) 8%, transparent);
    overflow: hidden;
    box-shadow: inset 0 1px 2px var(--border-strong);
  }
  .track :global(.icon) {
    position: absolute;
    left: 0.7rem;
    color: var(--text);
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
