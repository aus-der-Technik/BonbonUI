<script lang="ts">
  // Test fixture: a Dialog and a FeedbackDialog the test opens and closes from outside (not shipped).
  import Dialog from './Dialog.svelte';
  import FeedbackDialog from './FeedbackDialog.svelte';

  interface Props {
    origin?: DOMRect | undefined;
    onclose?: () => void;
    onsubmit?: () => void;
  }

  let { origin, onclose = () => {}, onsubmit = () => {} }: Props = $props();
  let open = $state(true);
  let feedback = $state(false);
</script>

<button type="button" class="toggle" onclick={() => (open = !open)}>toggle</button>
<button type="button" class="toggle-feedback" onclick={() => (feedback = !feedback)}>
  feedback
</button>
<Dialog
  {open}
  {origin}
  title="Rename"
  onclose={() => {
    open = false;
    onclose();
  }}
>
  <p class="probe">body</p>
</Dialog>
<FeedbackDialog
  open={feedback}
  closeAfter={1000}
  {onsubmit}
  onclose={() => {
    feedback = false;
    onclose();
  }}
/>
