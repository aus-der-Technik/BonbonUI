<script lang="ts">
  let on = $state(true);
</script>

<!-- A reflector: your own surface opts in, and paints the light it catches. -->
<div class="tile" data-reflect="panel">
  <span>Study</span>
  <!-- An emitter: full light in the tint while it is on ("soft" for a gentle glow). -->
  <button
    type="button"
    class="lamp"
    aria-pressed={on}
    data-emit={on ? '' : undefined}
    onclick={() => (on = !on)}
  >
    Lamp
  </button>
  <!-- Status light: "ok" or "danger", never in the tint. -->
  <span class="status" data-emit="ok">Online</span>
</div>

<style>
  .tile {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-5);
    border-radius: var(--radius-card);
    /* --light is written by the Application for each lit surface */
    background: var(--light, none), var(--layer-panel-bg);
  }
  .tile span:first-child {
    flex: 1;
    font-weight: var(--fw-semibold);
  }
  .lamp {
    min-width: 4rem;
    padding: var(--space-2) var(--space-4);
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
    color: var(--text);
    font: inherit;
    font-weight: var(--fw-semibold);
    cursor: pointer;
  }
  .lamp[aria-pressed='true'] {
    background: var(--accent);
    color: var(--on-accent);
  }
  .lamp:focus-visible {
    outline: var(--focus-ring);
  }
  .status {
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--tint-ok);
    color: var(--ok);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
</style>
