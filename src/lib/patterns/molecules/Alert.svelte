<script lang="ts">
  /**
   * Alert molecule — a message in its tone: tinted glass with the tone's icon. `inline` sits inside
   * a card or form (a sheet's error box, a dialog error); `card` stands on its own glass card
   * between sections (a failed request); `strong` tints the whole card, for a failure that blocks
   * the page. `title` adds a bold first line, `actions` buttons on the right, `ondismiss` a close
   * button.
   *
   *   <Alert tone="warn" title="Draft" message="This list is not published yet." />
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';

  type Tone = 'error' | 'warn' | 'ok' | 'info';

  interface Props {
    tone?: Tone;
    variant?: 'inline' | 'card';
    /** Tints the whole card, border and text in the tone, not only its icon. */
    strong?: boolean;
    /** A bold first line above the message. */
    title?: string | undefined;
    message?: string | undefined;
    /** The tone's icon by default; another icon, or `false` for none. */
    icon?: IconName | false | undefined;
    /** Buttons at the end, e.g. "Retry". */
    actions?: Snippet | undefined;
    dismissLabel?: string;
    /** Shows a close button. */
    ondismiss?: (() => void) | undefined;
    children?: Snippet | undefined;
  }

  let {
    tone = 'error',
    variant = 'inline',
    strong = false,
    title,
    message,
    icon,
    actions,
    dismissLabel = 'Dismiss',
    ondismiss,
    children,
  }: Props = $props();

  const ICONS: Record<Tone, IconName> = {
    error: 'x-circle',
    warn: 'alert',
    ok: 'check-circle',
    info: 'info',
  };
  const shownIcon = $derived(icon === false ? undefined : (icon ?? ICONS[tone]));
</script>

<div class="alert alert--{tone} alert--{variant}" class:alert--strong={strong}>
  {#if shownIcon}<span class="icon-wrap" aria-hidden="true"
      ><Icon name={shownIcon} size={variant === 'card' ? 18 : 16} /></span
    >{/if}
  <div class="text" role={tone === 'error' ? 'alert' : 'status'}>
    {#if title}<strong class="title">{title}</strong
      >{/if}{#if children}{@render children()}{:else}{message}{/if}
  </div>
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
  {#if ondismiss}
    <button type="button" class="dismiss" aria-label={dismissLabel} onclick={ondismiss}>
      <Icon name="close" size={14} />
    </button>
  {/if}
</div>

<style>
  .alert {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    min-width: 0;
    border: 1px solid color-mix(in srgb, var(--tone) 24%, transparent);
    color: var(--text);
    font-size: var(--fs-md);
    line-height: 1.45;
    overflow-wrap: anywhere;
    /* The tone as readable text: darkened in light themes, lightened in dark ones. */
    --tone-ink: color-mix(in oklab, var(--tone) var(--ink-share), var(--ink-mix));
  }
  .alert--error {
    --tone: var(--danger);
    --tone-bg: var(--tint-danger);
  }
  .alert--warn {
    --tone: var(--warn);
    --tone-bg: var(--tint-warn);
  }
  .alert--ok {
    --tone: var(--ok);
    --tone-bg: var(--tint-ok);
  }
  .alert--info {
    --tone: var(--info);
    --tone-bg: var(--tint-info);
  }
  .alert--inline {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    background: var(--tone-bg);
    box-shadow: var(--glass-inset);
  }
  .alert--card {
    align-items: center;
    padding: var(--space-4) var(--space-5);
    border-radius: var(--radius-card);
    border-color: var(--layer-panel-border);
    background: var(--layer-panel-bg);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    box-shadow: var(--layer-panel-shadow);
  }
  .alert--strong {
    border-color: color-mix(in srgb, var(--tone) 40%, transparent);
    background: color-mix(in srgb, var(--tone) 12%, var(--glass));
    box-shadow:
      0 12px 30px color-mix(in srgb, var(--tone) 18%, transparent),
      var(--glass-inset);
  }
  .alert--strong .text {
    color: var(--tone-ink);
    font-weight: var(--fw-medium);
  }
  .icon-wrap {
    flex: none;
    display: grid;
    place-items: center;
    color: var(--tone);
    padding-top: 0.1em;
  }
  .alert--card .icon-wrap {
    width: var(--control-sm);
    height: var(--control-sm);
    padding: 0;
    border-radius: 50%;
    background: var(--tone-bg);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--tone) 22%, transparent);
  }
  .text {
    flex: 1;
    min-width: 0;
  }
  .title {
    display: block;
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    flex-shrink: 0;
    align-self: center;
  }
  .dismiss {
    flex: none;
    display: grid;
    place-items: center;
    width: var(--control-xs);
    height: var(--control-xs);
    margin: -0.15rem -0.35rem 0 0;
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--text-3);
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .dismiss:hover {
    background: var(--fill-hover);
    color: var(--text);
  }
  .dismiss:active {
    transform: var(--press-squish);
  }
  .dismiss:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  @media (prefers-reduced-transparency: reduce) {
    .alert--card {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .dismiss {
      transition: none;
    }
  }
</style>
