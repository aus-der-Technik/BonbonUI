<script lang="ts">
  /**
   * StatusDot atom — a small glowing dot for presence and health: online / away / offline,
   * service up / degraded / down. `pulse` adds a soft breathing ring for live states. With
   * `label` the text sits next to it; without one, pass `aria-label` when the dot alone carries
   * the meaning.
   *
   *   <StatusDot tone="ok" pulse label="Operational" />
   *   <StatusDot tone="warn" aria-label="Away" />
   */
  import { colorValue, isPaletteColor, type PaletteColor } from './palette';

  type Tone = 'ok' | 'warn' | 'danger' | 'info' | 'neutral' | 'accent' | PaletteColor;

  interface Props {
    tone?: Tone;
    /** Any CSS colour; overrides `tone`. */
    color?: string | undefined;
    pulse?: boolean;
    label?: string | undefined;
    size?: 'sm' | 'md' | 'lg';
    'aria-label'?: string | undefined;
  }

  let {
    tone = 'neutral',
    color,
    pulse = false,
    label,
    size = 'md',
    'aria-label': ariaLabel,
  }: Props = $props();

  const TONES: Record<string, string> = {
    ok: 'var(--ok)',
    warn: 'var(--warn)',
    danger: 'var(--danger)',
    info: 'var(--info)',
    neutral: 'var(--color-gray)',
    accent: 'var(--accent)',
  };
  const value = $derived(
    colorValue(color) ?? (isPaletteColor(tone) ? colorValue(tone) : TONES[tone]),
  );
</script>

<span
  class="status status--{size}"
  style:--dot-c={value}
  role={!label && ariaLabel ? 'img' : undefined}
  aria-label={!label ? ariaLabel : undefined}
>
  <span class="dot" class:dot--pulse={pulse} aria-hidden="true"></span>
  {#if label}<span class="label">{label}</span>{/if}
</span>

<style>
  .status {
    --_s: 8px;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    white-space: nowrap;
  }
  .status--sm {
    --_s: 6px;
    gap: 0.35rem;
    font-size: var(--fs-xs);
  }
  .status--lg {
    --_s: 10px;
    font-size: var(--fs-md);
  }
  .dot {
    position: relative;
    flex-shrink: 0;
    width: var(--_s);
    height: var(--_s);
    border-radius: 50%;
    background:
      radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.55), transparent 55%), var(--dot-c);
    /* A lit bead: highlight up-left, a soft halo ring — calm, not a neon glow. */
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--dot-c) 18%, transparent),
      0 0 6px color-mix(in srgb, var(--dot-c) 35%, transparent);
  }
  .dot--pulse::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--dot-c);
    animation: bb-dot-pulse 2s var(--ease-out) infinite;
  }
  @keyframes bb-dot-pulse {
    from {
      opacity: 0.6;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(2.8);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .dot--pulse::after {
      animation: none;
      opacity: 0;
    }
  }
</style>
