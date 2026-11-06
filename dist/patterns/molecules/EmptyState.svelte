<script lang="ts">
  /**
   * EmptyState molecule — where a list, search or chart has nothing to show. A bare `message` is
   * the quiet centred line; with `title`, `icon` and an action it becomes a friendly first-run
   * panel: the icon bobs gently in a soft tinted circle, the copy is centred and short — and may
   * wink ("Inbox zero. Treat yourself."). Pass
   * `actionLabel` + `onaction` for a primary button, or an `action` snippet for anything else.
   *
   *   <EmptyState icon="inbox" title="No messages" message="New mail lands here."
   *     actionLabel="Compose" actionIcon="plus" onaction={compose} />
   */
  import type { Snippet } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';

  interface Props {
    message?: string | undefined;
    title?: string | undefined;
    icon?: IconName | undefined;
    action?: Snippet | undefined;
    /** Text of a primary button (with `onaction`); ignored when an `action` snippet is given. */
    actionLabel?: string | undefined;
    actionIcon?: IconName | undefined;
    onaction?: (() => void) | undefined;
    /** Look of the `actionLabel` button: `soft` where the screen already has its primary. */
    actionVariant?: 'primary' | 'soft' | 'secondary' | 'tinted';
    /** A single quiet line with little padding, for inside cards. */
    compact?: boolean;
    children?: Snippet | undefined;
  }

  let {
    message,
    title,
    icon,
    action,
    actionLabel,
    actionIcon,
    onaction,
    actionVariant = 'primary',
    compact = false,
    children,
  }: Props = $props();
</script>

<div class="empty" class:compact>
  {#if icon}<span class="icon-disc" aria-hidden="true"
      ><Icon name={icon} size={compact ? 16 : 26} /></span
    >{/if}
  {#if title}<h3>{title}</h3>{/if}
  {#if children}{@render children()}{:else if message}<p>{message}</p>{/if}
  {#if action}<div class="action">{@render action()}</div>
  {:else if actionLabel && onaction}<div class="action">
      <Button
        variant={actionVariant}
        shape="pill"
        icon={actionIcon}
        label={actionLabel}
        onclick={onaction}
      />
    </div>{/if}
</div>

<style>
  .empty {
    display: grid;
    justify-items: center;
    align-content: center;
    gap: var(--space-2);
    padding: var(--space-10) var(--space-5);
    text-align: center;
    color: var(--text-2);
    font-size: var(--fs-md);
    line-height: 1.5;
  }
  .compact {
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    padding: var(--space-2) 0;
    text-align: left;
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .icon-disc {
    position: relative;
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    margin-bottom: var(--space-2);
    border-radius: 50%;
    background:
      radial-gradient(circle at 30% 25%, var(--pill-light), transparent 60%), var(--accent-soft);
    color: var(--accent-ink);
    box-shadow:
      0 10px 28px color-mix(in srgb, var(--accent) 22%, transparent),
      inset 0 1px 0 var(--pill-light),
      inset 0 0 0 1px var(--accent-border);
    /* An idle moment: the disc breathes, slowly enough to never pull focus. */
    animation: bb-float 4.8s var(--ease-in-out) infinite;
  }
  .compact .icon-disc {
    animation: none;
    width: var(--control-sm);
    height: var(--control-sm);
    margin: 0;
    box-shadow: inset 0 0 0 1px var(--accent-border);
  }
  h3 {
    margin: 0;
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    color: var(--text);
  }
  .compact h3 {
    font-size: var(--fs-md);
  }
  p {
    margin: 0;
    max-width: 42ch;
  }
  .action {
    margin-top: var(--space-3);
  }
  .compact .action {
    margin: 0 0 0 var(--space-2);
  }
  @media (prefers-reduced-motion: reduce) {
    .icon-disc {
      animation: none;
    }
  }
</style>
