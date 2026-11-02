<script lang="ts">
  /**
   * ConfirmDialog organism — "Are you sure?" for actions that cannot be undone or affect many
   * records. `onconfirm` may return a promise: the confirm button shows `busyLabel` while it
   * runs and a rejection appears inside the dialog; success closes it. `tone="danger"` (the
   * default) gives the confirm button the red destructive fill.
   *
   *   <ConfirmDialog open={asking} title="Delete 12 records?" confirmLabel="Delete"
   *     onconfirm={() => api.delete(ids)} onclose={() => (asking = false)} />
   */
  import Button from '../atoms/Button.svelte';
  import Alert from '../molecules/Alert.svelte';
  import Dialog from './Dialog.svelte';

  interface Props {
    open: boolean;
    title: string;
    message?: string | undefined;
    confirmLabel?: string;
    cancelLabel?: string;
    busyLabel?: string;
    tone?: 'danger' | 'primary';
    onconfirm: () => unknown;
    onclose: () => void;
  }

  let {
    open,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    busyLabel = 'Working…',
    tone = 'danger',
    onconfirm,
    onclose,
  }: Props = $props();

  let busy = $state(false);
  let error = $state('');

  $effect(() => {
    if (open) error = '';
  });

  async function confirm() {
    busy = true;
    error = '';
    try {
      await onconfirm();
      onclose();
    } catch (cause) {
      error = cause instanceof Error ? cause.message : String(cause);
    } finally {
      busy = false;
    }
  }
</script>

<Dialog {open} {title} width="26rem" {onclose}>
  {#if message}<p class="message">{message}</p>{/if}
  {#if error}<div class="error"><Alert message={error} /></div>{/if}
  {#snippet actions()}
    <Button label={cancelLabel} disabled={busy} onclick={onclose} />
    <Button
      variant={tone === 'danger' ? 'danger-solid' : 'primary'}
      label={busy ? busyLabel : confirmLabel}
      disabled={busy}
      onclick={confirm}
    />
  {/snippet}
</Dialog>

<style>
  .message {
    color: var(--text-2);
    font-size: var(--fs-md);
    line-height: 1.5;
  }
  .error {
    margin-top: var(--space-3);
  }
</style>
