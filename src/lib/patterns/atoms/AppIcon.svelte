<script lang="ts">
  /**
   * AppIcon atom — a candy "bonbon" app icon: a soft rounded tile in a palette colour, lit from
   * above (a gentle inner glow on the top half) and edged with a thin sugar-glass rim, with a white
   * glyph or a picture. For docks, launchers, home screens and app switchers. Its corners follow
   * the Application's `radius` setting. `badge` puts a count in the corner, `running` a short
   * tint bar underneath, `caption` the name below.
   *
   * With `onclick` it is a button, with `href` a link; `label` is always its accessible name.
   *
   *   <AppIcon icon="mail" color="blue" label="Mail" badge={3} onclick={openMail} />
   *   <AppIcon icon="calendar" color="red" label="Calendar" caption size="lg" />
   */
  import Icon from './Icon.svelte';
  import type { IconName } from './icons';
  import { colorValue, type PaletteColor } from './palette';

  interface Props {
    /** The app's name: accessible name, tooltip and caption. */
    label: string;
    icon?: IconName | undefined;
    /** A picture instead of a glyph (fills the squircle). */
    src?: string | undefined;
    /** A palette colour, `accent` (follows the tint), `glass` (frosted, accent glyph), or any
     *  CSS colour. */
    color?: PaletteColor | 'accent' | 'glass' | (string & {});
    /** `sm` 32px, `md` 48px, `lg` 64px, `xl` 80px, or a number of pixels. */
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    /** A count (99+ caps) or a short text such as "!" in a red corner badge. */
    badge?: number | string | undefined;
    /** Label of the badge for screen readers; `{count}` is replaced. */
    badgeLabel?: string;
    /** A short tint bar below the icon: the app is open. */
    running?: boolean;
    /** Shows `label` under the icon (home screens, launchers). */
    caption?: boolean;
    href?: string | undefined;
    onclick?: ((event: MouseEvent) => void) | undefined;
    /** Pressed / current app (e.g. the open one in a switcher). */
    active?: boolean;
  }

  let {
    label,
    icon,
    src,
    color = 'blue',
    size = 'md',
    badge,
    badgeLabel = '{count} new',
    running = false,
    caption = false,
    href,
    onclick,
    active = false,
  }: Props = $props();

  const SIZES = { sm: 32, md: 48, lg: 64, xl: 80 } as const;
  const px = $derived(typeof size === 'number' ? size : SIZES[size]);
  const fill = $derived(color === 'accent' || color === 'glass' ? undefined : colorValue(color));
  const shownBadge = $derived(
    badge === undefined || badge === 0 || badge === ''
      ? undefined
      : typeof badge === 'number' && badge > 99
        ? '99+'
        : String(badge),
  );
  const tag = $derived(href ? 'a' : onclick ? 'button' : 'span');
  const name = $derived(
    shownBadge ? `${label}, ${badgeLabel.replace('{count}', shownBadge)}` : label,
  );
</script>

<svelte:element
  this={tag}
  class="app"
  class:app--interactive={tag !== 'span'}
  class:app--active={active}
  style:--app-size="{px}px"
  href={tag === 'a' ? href : undefined}
  type={tag === 'button' ? 'button' : undefined}
  role={tag === 'span' ? 'img' : undefined}
  aria-label={name}
  aria-current={active && tag === 'a' ? 'page' : undefined}
  aria-pressed={tag === 'button' && active ? 'true' : undefined}
  title={caption ? undefined : label}
  {onclick}
>
  <span
    class="tile"
    class:tile--accent={color === 'accent'}
    class:tile--glass={color === 'glass'}
    class:tile--image={!!src}
    style:--app-c={fill}
    aria-hidden="true"
  >
    {#if src}
      <img {src} alt="" loading="lazy" />
    {:else if icon}
      <Icon name={icon} size={Math.round(px * 0.5)} />
    {:else}
      <span class="initial">{label.slice(0, 1).toUpperCase()}</span>
    {/if}
    {#if shownBadge}<span class="badge">{shownBadge}</span>{/if}
  </span>
  {#if running}<span class="running" aria-hidden="true"></span>{/if}
  {#if caption}<span class="caption" aria-hidden="true">{label}</span>{/if}
</svelte:element>

<style>
  .app {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    flex-shrink: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
  .app--interactive {
    cursor: pointer;
  }
  .tile {
    /* Default: the palette colour passed in; accent and glass override below. */
    --_c: var(--app-c, var(--color-blue));
    position: relative;
    display: grid;
    place-items: center;
    width: var(--app-size);
    height: var(--app-size);
    /* A softer, rounder corner than a phone icon (30%), scaled by the Application's radius. */
    border-radius: min(50%, calc(var(--app-size) * 0.3 * var(--radius-scale, 1)));
    /* White glyph, or near-black on very light colours (yellow, mint in dark), for contrast. */
    color: oklch(from var(--_c) clamp(0.16, (0.8 - l) * 999, 1) 0 0);
    background:
      /* the light from above: a soft glow over the top half */
      radial-gradient(130% 75% at 50% -10%, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0) 62%),
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--_c) 86%, white),
        var(--_c) 55%,
        color-mix(in oklab, var(--_c) 86%, black)
      );
    box-shadow:
      0 calc(var(--app-size) * 0.06) calc(var(--app-size) * 0.18)
        color-mix(in srgb, var(--_c) 30%, rgba(12, 12, 22, 0.18)),
      0 1px 2px rgba(12, 12, 22, 0.12);
    transition:
      transform var(--motion-base) var(--ease-spring),
      box-shadow var(--motion-base) var(--ease-out);
  }
  /* The sugar rim: a thin glassy edge, bright where the light hits (top), faint below. */
  .tile::after {
    content: '';
    position: absolute;
    inset: 0;
    padding: max(1px, calc(var(--app-size) * 0.022));
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.14) 35%,
      rgba(255, 255, 255, 0.06) 70%,
      rgba(255, 255, 255, 0.22)
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    mask:
      linear-gradient(#000 0 0) content-box exclude,
      linear-gradient(#000 0 0);
    pointer-events: none;
  }
  .tile :global(.icon) {
    filter: drop-shadow(0 1px 1.5px color-mix(in srgb, var(--_c) 40%, rgba(0, 0, 0, 0.35)));
  }
  .tile--accent {
    --_c: var(--accent);
    color: var(--on-accent);
  }
  .tile--glass {
    color: var(--accent-ink);
    background: var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow:
      var(--shadow-frosted),
      inset 0 0 0 0.75px var(--pill-border);
  }
  .tile--glass::after {
    opacity: 0.6;
  }
  .tile--glass :global(.icon) {
    filter: none;
  }
  .tile--image {
    overflow: hidden;
    background: var(--glass-strong);
  }
  .tile--image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .initial {
    font-size: calc(var(--app-size) * 0.44);
    font-weight: var(--fw-bold);
    letter-spacing: -0.02em;
    line-height: 1;
    text-shadow: 0 1px 1.5px color-mix(in srgb, var(--_c) 40%, rgba(0, 0, 0, 0.35));
  }
  .tile--glass .initial {
    text-shadow: none;
  }
  .badge {
    position: absolute;
    z-index: 1;
    top: calc(var(--app-size) * -0.1);
    right: calc(var(--app-size) * -0.1);
    min-width: max(18px, calc(var(--app-size) * 0.34));
    height: max(18px, calc(var(--app-size) * 0.34));
    padding: 0 0.32em;
    display: grid;
    place-items: center;
    border-radius: var(--radius-pill);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0) 60%), var(--danger);
    color: var(--on-danger, #fff);
    font-size: max(11px, calc(var(--app-size) * 0.19));
    font-weight: var(--fw-bold);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    box-shadow:
      0 2px 6px color-mix(in srgb, var(--danger) 35%, transparent),
      0 0 0 2px var(--bg, #fff),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
    animation: bb-pop var(--motion-base) var(--ease-spring) both;
  }
  /* Running: a short tint bar, not a dot — it reads as "open" even at a glance. */
  .running {
    width: max(10px, calc(var(--app-size) * 0.26));
    height: 3px;
    border-radius: var(--radius-pill);
    background: var(--accent);
    box-shadow: 0 0 6px color-mix(in srgb, var(--tint) 45%, transparent);
  }
  .caption {
    max-width: calc(var(--app-size) * 1.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    color: var(--text);
  }
  .app--interactive:hover .tile {
    transform: translateY(-3px);
    box-shadow:
      0 calc(var(--app-size) * 0.12) calc(var(--app-size) * 0.26)
        color-mix(in srgb, var(--_c) 34%, rgba(12, 12, 22, 0.2)),
      0 1px 2px rgba(12, 12, 22, 0.12);
  }
  .app--interactive:hover .tile--glass {
    box-shadow:
      var(--shadow-frosted-hover),
      inset 0 0 0 0.75px var(--pill-border);
  }
  /* Jelly press: the tile squishes and springs back on release. */
  .app--interactive:active .tile {
    transform: var(--press-squish);
    transition: transform var(--motion-quick) var(--ease-jelly);
  }
  /* Selected: the tint rim and soft tint glow every selected thing in the library wears. */
  .app--active .tile,
  .app--active.app--interactive:hover .tile {
    box-shadow:
      0 0 0 2px var(--bg, #fff),
      0 0 0 4px var(--accent),
      0 calc(var(--app-size) * 0.1) calc(var(--app-size) * 0.3)
        color-mix(in srgb, var(--tint) 35%, transparent);
  }
  .app:focus-visible {
    outline: none;
  }
  .app:focus-visible .tile {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }
  @media (prefers-reduced-motion: reduce) {
    .tile,
    .app--interactive:active .tile {
      transition: none;
    }
    .app--interactive:hover .tile,
    .app--interactive:active .tile {
      transform: none;
    }
    .badge {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .tile--glass {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
