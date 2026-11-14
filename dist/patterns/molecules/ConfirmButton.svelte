<script lang="ts">
  /**
   * ConfirmButton molecule — a destructive action that asks once. At rest it is a quiet neutral
   * "Delete" (a list of rows must not shout red); a click arms it into a solid danger "Delete
   * permanently" next to a "Cancel". `onconfirm` may return a
   * promise; while it runs the button shows `busyLabel`, and a rejection shows its message beside
   * the buttons. `shape="pill"` matches pill toolbars. It disarms on its own when you leave it:
   * Escape, Cancel, focus or a click elsewhere, or `disarmAfter` ms without activity on it. Arming
   * gives the button one gummy wobble — the "are you sure?" you can feel — but a delete never
   * throws sprinkles: removing things is not a party. With `doneLabel` the button says so for a
   * moment once `onconfirm` resolves ("Deleted", with a check), announced politely, then returns
   * to rest — the confirmation appears where the click happened.
   *
   *   <ConfirmButton icon="trash" onconfirm={() => api.remove(id)} />
   */
  import Button from '../atoms/Button.svelte';
  import VisuallyHidden from '../atoms/VisuallyHidden.svelte';
  import type { IconName } from '../atoms/icons';

  interface Props {
    label?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    busyLabel?: string;
    /** Shown on the button for `doneFor` ms after `onconfirm` resolved, e.g. "Deleted". */
    doneLabel?: string | undefined;
    doneFor?: number;
    icon?: IconName | undefined;
    size?: 'sm' | 'md';
    shape?: 'rounded' | 'pill';
    disabled?: boolean;
    /** Milliseconds without pointer or keyboard activity on it before an armed button disarms;
     *  0 keeps it armed until the user leaves it. */
    disarmAfter?: number;
    onconfirm: () => unknown;
  }

  let {
    label = 'Delete',
    confirmLabel = 'Delete permanently',
    cancelLabel = 'Cancel',
    busyLabel = 'Deleting…',
    doneLabel,
    doneFor = 2000,
    icon,
    size = 'md',
    shape = 'rounded',
    disabled = false,
    disarmAfter = 5000,
    onconfirm,
  }: Props = $props();

  let armed = $state(false);
  let busy = $state(false);
  let error = $state('');
  let done = $state(false);
  let root: HTMLDivElement | undefined = $state();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let doneTimer: ReturnType<typeof setTimeout> | undefined;

  function disarm(refocus = false) {
    if (busy) return;
    armed = false;
    error = '';
    clearTimeout(timer);
    // Cancel disappears with the armed state: keep focus on the action instead of the page.
    if (refocus && root?.contains(document.activeElement)) {
      (root.lastElementChild as HTMLElement | null)?.focus();
    }
  }

  function restartTimer() {
    clearTimeout(timer);
    if (armed && disarmAfter > 0) timer = setTimeout(() => disarm(), disarmAfter);
  }

  async function click() {
    // The action is finished: a click on "Deleted" must not arm it again.
    if (done) return;
    if (!armed) {
      armed = true;
      error = '';
      restartTimer();
      return;
    }
    clearTimeout(timer);
    busy = true;
    try {
      await onconfirm();
      busy = false;
      disarm();
      if (doneLabel) {
        done = true;
        clearTimeout(doneTimer);
        doneTimer = setTimeout(() => (done = false), doneFor);
      }
    } catch (cause) {
      error = cause instanceof Error ? cause.message : String(cause);
      busy = false;
      restartTimer();
    }
  }

  // A click anywhere else means "never mind".
  $effect(() => {
    if (!armed) return;
    const outside = (event: PointerEvent) => {
      if (root && !root.contains(event.target as Node)) disarm();
    };
    document.addEventListener('pointerdown', outside, true);
    return () => document.removeEventListener('pointerdown', outside, true);
  });

  $effect(() => () => {
    clearTimeout(timer);
    clearTimeout(doneTimer);
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={root}
  class="confirm"
  class:armed
  class:done
  onkeydown={(event) => {
    if (event.key === 'Escape' && armed) disarm(true);
    else restartTimer();
  }}
  onpointermove={restartTimer}
  onfocusout={(event) => {
    const next = event.relatedTarget as Node | null;
    if (armed && next && !root?.contains(next)) disarm();
  }}
>
  <VisuallyHidden><span role="status">{done ? doneLabel : ''}</span></VisuallyHidden>
  {#if error}<span class="error" role="alert">{error}</span>{/if}
  {#if armed}
    <Button
      {size}
      {shape}
      variant="secondary"
      label={cancelLabel}
      disabled={busy}
      onclick={() => disarm(true)}
    />
  {/if}
  <Button
    {size}
    {shape}
    icon={done ? 'check' : icon}
    variant={armed ? 'danger-solid' : 'secondary'}
    {disabled}
    {busy}
    {busyLabel}
    label={done && doneLabel ? doneLabel : armed ? confirmLabel : label}
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
  .confirm:not(.armed, .done) > :global(:last-child:hover:not(:disabled)) {
    color: var(--danger);
  }
  .armed > :global(:last-child) {
    animation: bb-jelly var(--motion-slow) var(--ease-out);
  }
  /* Done: calm, with the check in the success colour — finished, not celebrated. */
  .done > :global(:last-child) {
    cursor: default;
  }
  .done > :global(:last-child .icon) {
    color: var(--ok);
    animation: bb-pop var(--motion-base) var(--ease-spring);
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
    .armed > :global(:last-child),
    .done > :global(:last-child .icon) {
      animation: none;
    }
  }
</style>
