<script lang="ts">
  /**
   * ConfirmButton molecule — a destructive action that asks once. At rest it is a quiet neutral
   * "Delete" (a list of rows must not shout red); a click arms it into a solid danger "Delete
   * permanently" next to a "Cancel". `onconfirm` may return a
   * promise; while it runs the button shows `busyLabel`, and a rejection shows its message beside
   * the buttons. `shape="pill"` matches pill toolbars. Escape disarms. Arming gives the button
   * one gummy wobble — the "are you sure?" you can feel — but a delete never throws sprinkles:
   * removing things is not a party.
   *
   *   <ConfirmButton icon="trash" onconfirm={() => api.remove(id)} />
   */
  import Button from '../atoms/Button.svelte';
  import type { IconName } from '../atoms/icons';

  interface Props {
    label?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    busyLabel?: string;
    icon?: IconName | undefined;
    size?: 'sm' | 'md';
    shape?: 'rounded' | 'pill';
    disabled?: boolean;
    onconfirm: () => unknown;
  }

  let {
    label = 'Delete',
    confirmLabel = 'Delete permanently',
    cancelLabel = 'Cancel',
    busyLabel = 'Deleting…',
    icon,
    size = 'md',
    shape = 'rounded',
    disabled = false,
    onconfirm,
  }: Props = $props();

  let armed = $state(false);
  let busy = $state(false);
  let error = $state('');

  async function click() {
    if (!armed) {
      armed = true;
      error = '';
      return;
    }
    busy = true;
    try {
      await onconfirm();
      armed = false;
    } catch (cause) {
      error = cause instanceof Error ? cause.message : String(cause);
    } finally {
      busy = false;
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="confirm"
  class:armed
  onkeydown={(event) => {
    if (event.key === 'Escape' && armed && !busy) armed = false;
  }}
>
  {#if error}<span class="error" role="alert">{error}</span>{/if}
  {#if armed}
    <Button
      {size}
      {shape}
      variant="ghost"
      label={cancelLabel}
      disabled={busy}
      onclick={() => (armed = false)}
    />
  {/if}
  <Button
    {size}
    {shape}
    {icon}
    variant={armed ? 'danger-solid' : 'secondary'}
    disabled={disabled || busy}
    label={busy ? busyLabel : armed ? confirmLabel : label}
    onclick={click}
  />
</div>

<style>
  .confirm {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
  }
  /* Pointing at it hints at what it does; only the armed state is loud. */
  .confirm:not(.armed) > :global(:last-child:hover:not(:disabled)) {
    color: var(--danger);
  }
  .armed > :global(:last-child) {
    animation: bb-jelly var(--motion-slow) var(--ease-out);
  }
  .error {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    margin-right: auto;
    padding: 0.15rem var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--tint-danger);
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  @media (prefers-reduced-motion: reduce) {
    /* Pointing at it hints at what it does; only the armed state is loud. */
    .confirm:not(.armed) > :global(:last-child:hover:not(:disabled)) {
      color: var(--danger);
    }
    .armed > :global(:last-child) {
      animation: none;
    }
  }
</style>
