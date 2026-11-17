<script lang="ts">
  /** Storybook-only: a labelled placeholder box for the layout stories. */
  interface Props {
    label?: string;
    tall?: boolean;
  }
  let { label = '', tall = false }: Props = $props();
</script>

<div class="box" class:tall>{label}</div>

<style>
  .box {
    display: grid;
    place-items: center;
    min-height: 48px;
    min-width: 72px;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--accent-soft);
    border: 1px dashed var(--accent-border);
    color: var(--accent-ink);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    text-align: center;
  }
  .tall {
    min-height: 120px;
  }
</style>
