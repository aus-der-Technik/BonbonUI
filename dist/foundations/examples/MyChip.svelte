<script lang="ts">
  let picked = $state(false);
</script>

<button type="button" class="my-chip" aria-pressed={picked} onclick={() => (picked = !picked)}>
  Design
</button>
<button type="button" class="my-chip danger">Overdue</button>

<style>
  /* In your own components: never a literal colour, always a token. */
  .my-chip {
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--accent-border);
    border-radius: var(--radius-pill);
    background: var(--accent-soft); /* tinted background */
    color: var(--accent-ink); /* accent as readable text */
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    cursor: pointer;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .my-chip:hover {
    background: var(--accent-faint);
  }
  .my-chip[aria-pressed='true'] {
    background: var(--accent);
    color: var(--on-accent);
  }
  .my-chip.danger {
    border-color: transparent;
    background: var(--tint-danger);
    color: var(--danger);
  }
  .my-chip:focus-visible {
    outline: var(--focus-ring);
  }
</style>
