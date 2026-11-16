<script lang="ts">
  /**
   * Kbd atom — a tiny candy key cap for keyboard hints ("Enter saves"): lit on top, with a soft
   * lip underneath so it reads as a key you could press.
   *
   *   <Kbd>⌘</Kbd><Kbd>K</Kbd> opens the command palette
   */
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<kbd>{@render children()}</kbd>

<style>
  kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 1.75em;
    height: 1.75em;
    padding: 0 0.45em;
    border-radius: calc(var(--radius-xs) + 1px);
    border: 0.75px solid var(--border-strong);
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--pill-light) 50%, transparent),
        transparent 70%
      ),
      var(--glass-strong);
    /* One light from above: highlight on the top edge, the key's lip below. */
    box-shadow:
      inset 0 1px 0 var(--pill-light),
      inset 0 -1.5px 0 var(--fill-subtle),
      0 1.5px 0 var(--border-strong),
      0 2px 4px rgba(12, 12, 22, 0.06);
    font-family: var(--font-sans);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    line-height: 1;
    color: var(--text-2);
    vertical-align: 0.1em;
    white-space: nowrap;
  }
</style>
