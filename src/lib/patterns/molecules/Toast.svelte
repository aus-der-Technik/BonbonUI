<script lang="ts">
  /**
   * Toast molecule — one short-lived notice on liquid glass: the tone's icon in a tinted circle,
   * an optional bold `title`, the message and a close button. It springs in from below. Toaster
   * stacks them; use it alone for a notice that stays put.
   *
   *   <Toast tone="ok" title="Saved" message="Your changes are live." ondismiss={close} />
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';

  type Tone = 'ok' | 'warn' | 'error' | 'info';

  interface Props {
    tone?: Tone;
    title?: string | undefined;
    message?: string | undefined;
    /** The tone's icon by default; another icon, or `false` for none. */
    icon?: IconName | false | undefined;
    /** Buttons after the message, e.g. "Undo". */
    actions?: Snippet | undefined;
    dismissLabel?: string;
    ondismiss?: (() => void) | undefined;
    children?: Snippet | undefined;
  }

  let {
    tone = 'ok',
    title,
    message,
    icon,
    actions,
    dismissLabel = 'Dismiss',
    ondismiss,
    children,
  }: Props = $props();

  const ICONS: Record<Tone, IconName> = {
    ok: 'check-circle',
    warn: 'alert',
    error: 'x-circle',
    info: 'info',
  };
  const shownIcon = $derived(icon === false ? undefined : (icon ?? ICONS[tone]));
</script>

<div class="toast toast--{tone}">
  {#if shownIcon}<span class="icon-disc" aria-hidden="true"
      ><Icon name={shownIcon} size={15} /></span
    >{/if}
  <div class="body" role={tone === 'error' ? 'alert' : 'status'}>
    {#if title}<strong class="title">{title}</strong>{/if}
    {#if children}{@render children()}{:else}{message}{/if}
  </div>
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
  {#if ondismiss}
    <button type="button" class="dismiss" aria-label={dismissLabel} onclick={ondismiss}>
      <Icon name="close" size={14} />
    </button>
  {/if}
</div>

<style>
  .toast {
    --tone: var(--ok);
    display: flex;
    align-items: center;
    gap: var(--space-3);
    pointer-events: auto;
    max-width: min(28rem, calc(100vw - 2rem));
    padding: var(--space-2) var(--space-3) var(--space-2) var(--space-2);
    border-radius: var(--radius-xl);
    font-size: var(--fs-sm);
    line-height: 1.4;
    color: var(--text);
    background: var(--pill-tint), var(--glass-strong);
    border: 0.75px solid var(--pill-border);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    animation: toast-in var(--motion-slow) var(--ease-out);
  }
  .toast--warn {
    --tone: var(--warn);
  }
  .toast--error {
    --tone: var(--danger);
  }
  .toast--info {
    --tone: var(--info);
  }
  .icon-disc {
    flex: none;
    display: grid;
    place-items: center;
    width: var(--control-sm);
    height: var(--control-sm);
    border-radius: 50%;
    background: color-mix(in srgb, var(--tone) 16%, transparent);
    color: var(--tone);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--tone) 24%, transparent);
  }
  .body {
    flex: 1;
    min-width: 0;
    padding: var(--space-1) 0;
  }
  .toast:not(:has(.icon-disc)) .body {
    padding-left: var(--space-2);
  }
  .title {
    display: block;
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .body :global(b) {
    font-weight: var(--fw-semibold);
  }
  .actions {
    display: flex;
    gap: var(--space-1);
    flex-shrink: 0;
  }
  .dismiss {
    flex: none;
    display: grid;
    place-items: center;
    width: var(--control-xs);
    height: var(--control-xs);
    margin-right: calc(-1 * var(--space-1));
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--text-3);
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
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
  }
  @keyframes toast-in {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .toast {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--tooltip-bg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .toast {
      animation: none;
    }
  }
</style>
