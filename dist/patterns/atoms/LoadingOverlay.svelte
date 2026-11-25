<script lang="ts">
  /**
   * LoadingOverlay atom — a spinner with a label laid over its positioned parent while the
   * content underneath is being replaced ("Translating…"). The parent needs `position: relative`.
   *
   *   <div style="position:relative">…<LoadingOverlay active={loading} label="Loading…" /></div>
   */
  import Spinner from './Spinner.svelte';

  interface Props {
    active?: boolean;
    label?: string;
    /** Block clicks on the content underneath. */
    blocking?: boolean;
  }

  let { active = true, label = 'Loading…', blocking = false }: Props = $props();
</script>

{#if active}
  <div class="overlay" class:blocking role="status" aria-live="polite">
    <span class="box"><Spinner size={18} label="" />{label}</span>
  </div>
{/if}

<style>
  .overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    place-items: center;
    border-radius: inherit;
    background: color-mix(in srgb, var(--bg) 55%, transparent);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    pointer-events: none;
  }
  .blocking {
    pointer-events: auto;
    cursor: progress;
  }
  .box {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 0.5rem 0.95rem;
    border-radius: var(--radius-pill);
    background: var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    border: 0.75px solid var(--pill-border);
    box-shadow: var(--shadow-frosted);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
    animation: bb-pop var(--motion-base) var(--ease-out) both;
  }
  @media (prefers-reduced-motion: reduce) {
    .box {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .overlay,
    .box {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
    .box {
      background: var(--glass-strong);
    }
  }
</style>
