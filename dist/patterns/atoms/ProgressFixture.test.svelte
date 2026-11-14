<script lang="ts">
  // Test fixture: a ProgressBar whose value a button changes, for the changed-value cue.
  import ProgressBar from './ProgressBar.svelte';

  let value = $state(20);
</script>

<ProgressBar {value} label="Upload" showValue />
<button type="button" class="bump" onclick={() => (value += 10)}>bump</button>
