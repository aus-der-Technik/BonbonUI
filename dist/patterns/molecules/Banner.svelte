<script lang="ts">
  /**
   * Banner molecule — a page-wide announcement above the content: planned maintenance, a new
   * feature, a trial running out. Tinted glass in its tone (`solid` for a vibrant fill), an
   * icon, a title and message, optional actions and a close button. Once dismissed it is gone
   * (bind `open` or listen to `ondismiss` to remember that). Unlike Alert and Toast, which show
   * their × only with `ondismiss`, a banner hides itself, so its × is on unless
   * `dismissible={false}`. Announced as an alert only for `danger`.
   *
   *   <Banner tone="info" title="New: shared boards" message="Invite your team." ondismiss={…} />
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';
  import { noticeRole, toneOf, type LegacyTone, type Tone } from '../tone';

  interface Props {
    /** `error` is a deprecated alias of `danger`. */
    tone?: Tone | LegacyTone;
    variant?: 'soft' | 'solid';
    title?: string | undefined;
    message?: string | undefined;
    /** Leading icon; each tone has a default, `false` hides it (`null` too, for older callers). */
    icon?: IconName | false | null | undefined;
    open?: boolean;
    /** Shows the × button. */
    dismissible?: boolean;
    dismissLabel?: string;
    /** Buttons or links on the right. */
    actions?: Snippet | undefined;
    ondismiss?: (() => void) | undefined;
    children?: Snippet | undefined;
  }

  let {
    tone = 'accent',
    variant = 'soft',
    title,
    message,
    icon,
    open = $bindable(true),
    dismissible = true,
    dismissLabel = 'Dismiss',
    actions,
    ondismiss,
    children,
  }: Props = $props();

  const ICONS: Record<Tone, IconName> = {
    neutral: 'info',
    accent: 'sparkles',
    info: 'info',
    ok: 'check-circle',
    warn: 'alert',
    danger: 'x-circle',
  };
  const shownTone = $derived(toneOf(tone));
  const glyph = $derived(icon === null || icon === false ? undefined : (icon ?? ICONS[shownTone]));

  function dismiss() {
    open = false;
    ondismiss?.();
  }
</script>

{#if open}
  <div class="banner banner--{shownTone} banner--{variant}" role={noticeRole(shownTone)}>
    {#if glyph}<span class="icon"><Icon name={glyph} size={18} /></span>{/if}
    <div class="text">
      {#if title}<p class="title">{title}</p>{/if}
      {#if message}<p class="message">{message}</p>{/if}
      {@render children?.()}
    </div>
    {#if actions}<div class="actions">{@render actions()}</div>{/if}
    {#if dismissible}
      <button type="button" class="close" aria-label={dismissLabel} onclick={dismiss}>
        <Icon name="close" size={16} />
      </button>
    {/if}
  </div>
{/if}

<style>
  .banner {
    --tone: var(--accent);
    --tone-ink: var(--accent-ink);
    --tone-on: var(--on-accent);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-3) var(--space-3) var(--space-4);
    border-radius: var(--radius-card);
    border: 1px solid color-mix(in srgb, var(--tone) 35%, transparent);
    background: color-mix(in srgb, var(--tone) 13%, var(--layer-panel-bg));
    box-shadow:
      var(--layer-panel-shadow),
      inset 0 1px 0 var(--pill-light);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    color: var(--text);
    animation: banner-in var(--motion-slow) var(--ease-out);
  }
  .banner--neutral {
    --tone: var(--text-3);
    --tone-ink: var(--text-2);
    --tone-on: oklch(from var(--text-3) clamp(0.16, (0.7 - l) * 999, 1) 0 0);
  }
  .banner--info {
    --tone: var(--info);
    --tone-ink: var(--info);
    --tone-on: var(--on-info);
  }
  .banner--ok {
    --tone: var(--ok);
    --tone-ink: var(--ok);
    --tone-on: var(--on-ok);
  }
  .banner--warn {
    --tone: var(--warn);
    --tone-ink: var(--draft);
    --tone-on: var(--on-warn);
  }
  .banner--danger {
    --tone: var(--danger);
    --tone-ink: var(--danger);
    --tone-on: var(--on-danger);
  }
  .banner--solid {
    border-color: transparent;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--tone) 82%, #fff),
      var(--tone) 60%,
      color-mix(in srgb, var(--tone) 85%, #000)
    );
    box-shadow:
      0 10px 30px -12px var(--tone),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    /* Text follows the fill's lightness: white on red, near-black on amber. */
    color: var(--tone-on);
    --tone-ink: var(--tone-on);
  }
  .banner--accent.banner--solid {
    background: var(--grad-primary);
    color: var(--on-accent);
    --tone-ink: var(--on-accent);
  }
  .icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--tone) 18%, transparent);
    color: var(--tone-ink);
  }
  .banner--solid .icon {
    background: color-mix(in srgb, var(--tone-on) 20%, transparent);
  }
  .text {
    flex: 1 1 16rem;
    min-width: 0;
    display: grid;
    gap: 0.1rem;
  }
  .title {
    margin: 0;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
  }
  .message {
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .banner--solid .message {
    color: inherit;
    opacity: 0.88;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
  }
  .close {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: var(--control-sm);
    height: var(--control-sm);
    margin-left: auto;
    border: 0;
    border-radius: 50%;
    background: none;
    color: inherit;
    opacity: 0.7;
    cursor: pointer;
  }
  .close:hover {
    opacity: 1;
    background: color-mix(in srgb, var(--tone) 16%, transparent);
  }
  .banner--solid .close:hover {
    background: color-mix(in srgb, var(--tone-on) 20%, transparent);
  }
  .close:focus-visible {
    outline: var(--focus-ring);
    opacity: 1;
  }
  @keyframes banner-in {
    from {
      opacity: 0;
      transform: translateY(-6px) scale(0.99);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .banner {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .banner {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
</style>
