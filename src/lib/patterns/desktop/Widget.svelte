<script lang="ts">
  /**
   * Widget — a square-ish glass tile for a desktop or home screen, in three sizes: `small` (a
   * square), `medium` (two squares wide) and `large` (two by two). It holds one big figure or
   * a list. The candy goes to the key number only: `figure` is set large in the widget's
   * colour, with a `caption` under it; the header stays quiet (a small coloured disc and a
   * grey title). `filled` paints the whole card — keep it for one hero tile at most. With
   * `onclick` or `href` the whole card is a control.
   *
   *   <Widget title="Weather" icon="sun" color="cyan" figure="21°" caption="Sunny · H 24°" />
   *
   * The unit is `--widget-unit` (default 10.5rem); set it on a parent to scale every widget.
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';
  import { colorValue } from '../atoms/palette';

  interface Props {
    size?: 'small' | 'medium' | 'large';
    title?: string | undefined;
    icon?: IconName | undefined;
    /** Accent of the header: a palette name or any CSS colour (default: the tint). */
    color?: string | undefined;
    /** Fills the card with `color`. */
    filled?: boolean;
    /** A background image URL or CSS image behind the content. */
    image?: string | undefined;
    /** Something on the right of the header (a time, a count). */
    meta?: string | undefined;
    /** The one big number, in the widget's colour. */
    figure?: string | number | undefined;
    /** A line under the figure. */
    caption?: string | undefined;
    onclick?: (() => void) | undefined;
    href?: string | undefined;
    /** Accessible name when the card is a control (default: the title). */
    label?: string | undefined;
    class?: string;
    children?: Snippet | undefined;
  }

  let {
    size = 'small',
    title,
    icon,
    color,
    filled = false,
    image,
    meta,
    figure,
    caption,
    onclick,
    href,
    label,
    class: extraClass = '',
    children,
  }: Props = $props();

  const tag = $derived(href ? 'a' : onclick ? 'button' : 'section');
  const bg = $derived(
    image && !/^(url|image-set|linear-gradient|radial-gradient)\(/.test(image)
      ? `url("${image}")`
      : image,
  );
</script>

<svelte:element
  this={tag}
  class="widget widget--{size} {extraClass}"
  class:filled
  class:interactive={tag !== 'section'}
  class:has-image={!!bg}
  style:--widget-color={colorValue(color)}
  style:background-image={bg}
  {href}
  type={tag === 'button' ? 'button' : undefined}
  aria-label={tag === 'section' ? title : (label ?? title)}
  onclick={onclick ? () => onclick() : undefined}
  role={tag === 'section' && !title ? 'group' : undefined}
>
  {#if title || icon || meta}
    <span class="head">
      {#if icon}<span class="icon"><Icon name={icon} size={14} /></span>{/if}
      {#if title}<span class="title">{title}</span>{/if}
      {#if meta}<span class="meta">{meta}</span>{/if}
    </span>
  {/if}
  <span class="content">
    {#if figure !== undefined}<span class="figure">{figure}</span>{/if}
    {#if caption}<span class="caption">{caption}</span>{/if}
    {@render children?.()}
  </span>
</svelte:element>

<style>
  .widget {
    --unit: var(--widget-unit, 10.5rem);
    --c: var(--widget-color, var(--accent));
    /* Ink on a solid candy fill: white on deep colours, near-black on light ones (yellow, mint,
       cyan) — the same lightness clamp as the --on-ok / --on-warn tokens. */
    --on-c: oklch(from var(--c) clamp(0.16, (0.7 - l) * 999, 1) 0 0);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    flex-shrink: 0;
    max-width: 100%;
    padding: var(--space-4);
    overflow: hidden;
    border-radius: var(--radius-dialog);
    border: 0.75px solid var(--pill-border);
    background-color: var(--layer-panel-bg);
    background-size: cover;
    background-position: center;
    box-shadow:
      var(--glass-shadow),
      inset 0 1px 0 var(--pill-light);
    backdrop-filter: var(--blur-glass);
    -webkit-backdrop-filter: var(--blur-glass);
    color: var(--text);
    font: inherit;
    text-align: left;
    text-decoration: none;
  }
  .widget--small {
    width: var(--unit);
    height: var(--unit);
  }
  .widget--medium {
    width: calc(var(--unit) * 2 + var(--space-4));
    height: var(--unit);
  }
  .widget--large {
    width: calc(var(--unit) * 2 + var(--space-4));
    height: calc(var(--unit) * 2 + var(--space-4));
  }
  .filled {
    border-color: var(--border-on-accent);
    background-image:
      linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0) 50%),
      linear-gradient(
        160deg,
        color-mix(in oklab, var(--c) 78%, white),
        var(--c) 55%,
        color-mix(in oklab, var(--c) 72%, black)
      );
    box-shadow:
      0 14px 34px color-mix(in srgb, var(--c) 32%, transparent),
      inset 0 1px 0 var(--pill-edge);
    color: var(--on-c);
  }
  .has-image {
    color: #fff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  }
  .interactive {
    cursor: pointer;
    transition:
      box-shadow var(--motion-base) var(--ease-out),
      transform var(--motion-base) var(--ease-out);
  }
  .interactive:hover {
    transform: var(--hover-lift);
    box-shadow: var(--shadow-frosted-hover);
  }
  .interactive:active {
    transform: scale(0.99);
  }
  .interactive:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }
  .head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    font-size: var(--fs-xs);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .icon {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--c);
    color: var(--on-c);
  }
  .filled .icon,
  .has-image .icon {
    background: color-mix(in srgb, currentColor 22%, transparent);
    color: inherit;
  }
  .title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    color: var(--text-2);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .filled .title,
  .has-image .title {
    color: inherit;
  }
  .meta {
    color: var(--text-3);
    font-weight: var(--fw-semibold);
    letter-spacing: 0;
    text-transform: none;
    font-variant-numeric: tabular-nums;
  }
  .filled .meta,
  .has-image .meta {
    color: color-mix(in srgb, currentColor 80%, transparent);
  }
  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--space-2);
    min-height: 0;
  }
  .figure {
    margin-top: auto;
    color: color-mix(in oklab, var(--c) var(--ink-share), var(--ink-mix));
    font-size: var(--fs-display);
    font-weight: var(--fw-bold);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    line-height: 1;
  }
  .caption {
    margin-top: calc(var(--space-1) * -1);
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .filled .figure,
  .has-image .figure,
  .filled .caption,
  .has-image .caption {
    color: inherit;
  }
  @media (prefers-reduced-motion: reduce) {
    .interactive,
    .interactive:hover,
    .interactive:active {
      transition: none;
      transform: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .widget {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background-color: var(--glass-strong);
    }
  }
</style>
