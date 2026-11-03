<script lang="ts">
  /**
   * FeatureCard molecule — one selling point of a website: an icon in a candy squircle, a title
   * and a line or two of text. On a glass panel by default, or straight on the ground layer.
   * With `href` the whole card is a link and lifts on hover.
   *
   *   <FeatureCard icon="bolt" color="orange" title="Instant sync" text="Changes land in ms." />
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';
  import { accentColor, type AccentColor } from './web';

  interface Props {
    title: string;
    text?: string | undefined;
    icon?: IconName | undefined;
    /** A candy hue (`blue`, `pink`…), `accent`, or any CSS colour. */
    color?: AccentColor | undefined;
    /** `tinted` — soft colour square, coloured glyph; `solid` — a glossy app-icon square. */
    iconStyle?: 'tinted' | 'solid';
    /** `panel` is a glass card; `ground` sits directly on the backdrop. */
    level?: 'panel' | 'ground';
    /** `horizontal` puts the icon beside the text (dense lists). */
    layout?: 'vertical' | 'horizontal';
    href?: string | undefined;
    /** Heading level of the title (default 3). */
    heading?: 2 | 3 | 4;
    /** Extra content under the text: a link, a tag list. */
    children?: Snippet | undefined;
  }

  let {
    title,
    text,
    icon,
    color,
    iconStyle = 'tinted',
    level = 'panel',
    layout = 'vertical',
    href,
    heading = 3,
    children,
  }: Props = $props();
</script>

<svelte:element
  this={href ? 'a' : 'article'}
  {href}
  class="feature feature--{level} feature--{layout}"
  class:feature--link={!!href}
  style:--feature-color={accentColor(color)}
>
  {#if icon}
    <span class="icon icon--{iconStyle}" aria-hidden="true"><Icon name={icon} size={22} /></span>
  {/if}
  <div class="copy">
    <svelte:element this={`h${heading}`} class="title">{title}</svelte:element>
    {#if text}<p class="text">{text}</p>{/if}
    {#if children}<div class="extra">{@render children()}</div>{/if}
  </div>
</svelte:element>

<style>
  .feature {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
    color: var(--text);
    text-decoration: none;
    border-radius: var(--radius-card);
  }
  .feature--horizontal {
    flex-direction: row;
    align-items: flex-start;
  }
  .feature--panel {
    padding: var(--space-6);
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .feature--link {
    transition:
      transform var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .feature--link:hover {
    transform: var(--hover-lift);
  }
  /* The lift adds to the resting shadow, so it grows in light and dark alike. */
  .feature--panel.feature--link:hover {
    box-shadow:
      var(--glass-shadow),
      0 16px 36px rgba(12, 12, 22, 0.1),
      var(--glass-inset);
  }
  .feature--link:active {
    transform: scale(0.99);
    transition-duration: var(--motion-quick);
  }
  .feature--link:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  .icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    /* A squircle: slightly tighter than a circle, like an app icon. */
    border-radius: calc(var(--radius-lg) * 0.9);
  }
  .icon--tinted {
    color: color-mix(in oklab, var(--feature-color) var(--ink-share), var(--ink-mix));
    background: color-mix(in srgb, var(--feature-color) 16%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--feature-color) 22%, transparent);
  }
  .icon--solid {
    /* The feature colour is free (a candy hue, the accent or any CSS colour), so its glyph colour
       is derived like --on-accent / --on-ok: white on dark hues, near-black on light ones. */
    color: oklch(from var(--feature-color) clamp(0.16, (0.7 - l) * 999, 1) 0 0);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0) 60%),
      linear-gradient(
        160deg,
        var(--feature-color),
        color-mix(in oklab, var(--feature-color) 78%, black)
      );
    box-shadow:
      0 8px 18px color-mix(in srgb, var(--feature-color) 32%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  .copy {
    display: grid;
    gap: var(--space-2);
    min-width: 0;
  }
  .title {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.3;
  }
  .text {
    font-size: var(--fs-base);
    line-height: 1.55;
    color: var(--text-2);
  }
  .extra {
    margin-top: var(--space-1);
  }

  @media (prefers-reduced-motion: reduce) {
    .feature--link {
      transition: none;
    }
    .feature--link:hover,
    .feature--link:active {
      transform: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .feature--panel {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
