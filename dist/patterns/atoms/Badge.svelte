<script lang="ts">
  /**
   * Badge atom — a small status label.
   *
   * Semantic tones: `live` (green, with a dot: "Editable"), `ok`, `locked` (neutral grey:
   * "Read-only"), `draft` (amber), `warn`, `danger` (red: "Failed"), `info` (blue), `accent`
   * (soft tint; `variant="solid"` for a filled tint, e.g. a classification result; `brand` is the
   * deprecated name of that). Any candy palette name
   * (`blue`, `pink`, `purple`, …) works as a tone too, for categories. `color` takes any CSS
   * colour instead.
   *
   * `variant="solid"` fills the pill; `size="sm"` is the inline meta pill next to a label (a
   * version tag), `size="lg"` a headline badge.
   *
   * Shape: a badge states something, it is not pressed, so it is a rounded tag — pills are
   * reserved for things you act on (Tag with a handler, ToggleChip, Button). `shape="pill"` opts
   * back in where a pill is wanted anyway.
   *
   *   <Badge tone="live" label="Online" />   <Badge tone="purple" variant="solid" label="Pro" />
   */
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  import type { IconName } from './icons';
  import { colorValue, isPaletteColor, type PaletteColor } from './palette';
  import type { Tone } from '../tone';

  /** The shared tones plus the badge's own states and the candy palette. */
  type BadgeTone =
    | Tone
    | 'live'
    | 'locked'
    | 'draft'
    /** @deprecated Use `tone="accent" variant="solid"`. */
    | 'brand'
    | PaletteColor;

  interface Props {
    tone?: BadgeTone;
    /** `soft` (tinted background, coloured text) or `solid` (filled). */
    variant?: 'soft' | 'solid';
    /** Any CSS colour or palette name; overrides the tone's colour. */
    color?: string | undefined;
    size?: 'sm' | 'md' | 'lg';
    /** `rounded` (default: a status) or `pill`. */
    shape?: 'rounded' | 'pill';
    /** Leading dot; on by default for `live`. */
    dot?: boolean | undefined;
    icon?: IconName | undefined;
    label?: string | undefined;
    title?: string | undefined;
    children?: Snippet | undefined;
  }

  let {
    tone = 'neutral',
    variant = 'soft',
    color,
    size = 'md',
    shape = 'rounded',
    dot,
    icon,
    label,
    title,
    children,
  }: Props = $props();

  const showDot = $derived(dot ?? tone === 'live');
  const custom = $derived(
    colorValue(color) ?? (isPaletteColor(tone) ? colorValue(tone) : undefined),
  );
  const solid = $derived(variant === 'solid' || tone === 'brand');
  // `brand` is the deprecated name of a solid accent badge.
  const toneClass = $derived(tone === 'brand' ? 'accent' : tone);
</script>

<span
  class="badge badge--{toneClass} badge--{size}"
  class:badge--pill={shape === 'pill'}
  class:badge--custom={custom !== undefined}
  class:badge--solid={solid}
  class:badge--dot={showDot}
  style:--badge-c={custom}
  {title}
>
  {#if icon}<Icon name={icon} size={size === 'lg' ? 15 : 12} />{/if}
  {#if children}{@render children()}{:else}{label}{/if}
</span>

<style>
  .badge {
    /* Every tone sets one colour; soft and solid are derived from it. */
    --_c: var(--text-3);
    --_ink: var(--text-2);
    --_bg: var(--fill-muted);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border-radius: var(--radius-sm);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.005em;
    line-height: 1;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    color: var(--_ink);
    background: var(--_bg);
    box-shadow: inset 0 0 0 0.5px color-mix(in srgb, var(--_c) 22%, transparent);
  }
  .badge--md {
    height: calc(22px * var(--density));
    padding: 0 0.6rem;
    font-size: var(--fs-xs);
  }
  .badge--sm {
    border-radius: var(--radius-xs);
    padding: 0 0.45rem;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-medium);
    line-height: 1.6;
  }
  .badge--lg {
    height: var(--control-sm);
    padding: 0 var(--space-3);
    font-size: var(--fs-md);
  }
  .badge--pill {
    border-radius: var(--radius-pill);
  }
  .badge--dot::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 0 2px color-mix(in srgb, currentColor 22%, transparent);
  }

  /* Tones: the colour, its soft background and its readable ink. */
  .badge--live,
  .badge--ok {
    --_c: var(--ok);
    /* Darkened in light, lightened in dark, like --accent-ink. */
    --_ink: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
    --_bg: var(--tint-ok);
  }
  .badge--draft {
    --_c: var(--warn);
    --_ink: var(--draft);
    --_bg: var(--tint-warn);
  }
  .badge--warn {
    --_c: var(--warn);
    --_ink: var(--draft);
    --_bg: var(--tint-warn);
  }
  .badge--danger {
    --_c: var(--danger);
    --_ink: var(--danger-strong);
    --_bg: var(--tint-danger);
  }
  .badge--info {
    --_c: var(--info);
    --_ink: color-mix(in oklab, var(--info) var(--ink-share), var(--ink-mix));
    --_bg: var(--tint-info);
  }
  .badge--accent {
    --_c: var(--accent);
    --_ink: var(--accent-ink);
    --_bg: var(--accent-soft);
  }
  .badge--custom {
    --_c: var(--badge-c);
    --_ink: color-mix(in oklab, var(--badge-c) var(--ink-share), var(--ink-mix));
    --_bg: color-mix(in srgb, var(--badge-c) 15%, transparent);
  }
  /* Yellow and orange are so light that the usual ink mix is not enough for small text. */
  .badge--yellow.badge--custom {
    --_ink: color-mix(in oklab, var(--badge-c) 52%, var(--ink-mix));
  }
  .badge--orange.badge--custom {
    --_ink: color-mix(in oklab, var(--badge-c) 62%, var(--ink-mix));
  }
  .badge--solid {
    color: oklch(from var(--_c) clamp(0.16, (0.8 - l) * 999, 1) 0 0);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0) 60%), var(--_c);
    /* Calm candy: a lit top edge and a short soft shadow below, no glow halo. */
    box-shadow:
      0 1px 3px color-mix(in srgb, var(--_c) 30%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
  .badge--accent.badge--solid {
    color: var(--on-accent);
    background: var(--grad-primary);
  }
  .badge--neutral.badge--solid,
  .badge--locked.badge--solid {
    --_c: var(--color-gray);
  }
</style>
