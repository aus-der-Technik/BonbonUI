<script lang="ts">
  /**
   * LoadingBar atom — a thin track under a toolbar with a small candy pill gliding along it while
   * a request runs.
   *
   *   <LoadingBar active={loading} />
   */
  interface Props {
    active?: boolean;
    label?: string;
  }

  let { active = true, label = 'Loading' }: Props = $props();
</script>

{#if active}
  <div class="loading" role="progressbar" aria-label={label}></div>
{/if}

<style>
  /* A short candy pill gliding along a faint track: it eases in and out at the ends, so it feels
     like something is travelling rather than a stripe scrolling forever. */
  .loading {
    position: relative;
    height: 3px;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: var(--radius-pill);
    background: var(--accent-soft);
  }
  .loading::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 38%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--accent), var(--tint-2));
    box-shadow: 0 0 8px color-mix(in srgb, var(--tint) 45%, transparent);
    animation: glide 1.4s var(--ease-in-out) infinite;
  }
  @keyframes glide {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(265%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .loading::before {
      inset: 0;
      width: auto;
      opacity: 0.6;
      animation: none;
    }
  }
</style>
