<script lang="ts">
  /**
   * RefreshButton molecule — the header's accent "Refresh" pill. While a live connection pushes
   * updates (`live`), it steps back into a calm glass pill with a small pulsing green status dot
   * ("Auto refreshing") — status, not a second primary action; `loading` spins the icon (or speeds up the pulse). Below 640px only the icon stays.
   *
   *   <RefreshButton loading={busy} onclick={reload} />
   */
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    live?: boolean;
    loading?: boolean;
    label?: string;
    liveLabel?: string;
    liveHint?: string;
    onclick?: (() => void) | undefined;
  }

  let {
    live = false,
    loading = false,
    label = 'Refresh',
    liveLabel = 'Auto refreshing',
    liveHint = 'Updates appear automatically',
    onclick,
  }: Props = $props();
</script>

<button
  type="button"
  class="refresh"
  class:live
  class:spinning={loading}
  aria-busy={loading ? 'true' : undefined}
  aria-label={live ? `${liveLabel} — ${label.toLowerCase()} now` : label}
  title={live ? liveHint : undefined}
  {onclick}
>
  {#if live}<span class="dot" aria-hidden="true"></span>{:else}<Icon name="refresh" />{/if}
  <span class="label">{live ? liveLabel : label}</span>
</button>

<style>
  .refresh {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--control-lg);
    padding: 0 1.1rem 0 0.95rem;
    border-radius: var(--radius-pill);
    cursor: pointer;
    flex-shrink: 0;
    background:
      var(--sheen) 150% 0 / 250% 100% no-repeat,
      var(--grad-primary);
    color: var(--on-accent);
    font: inherit;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    border: 1px solid var(--border-on-accent);
    box-shadow: var(--shadow-primary);
    transition:
      box-shadow var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  /* Buttons don't lift; they brighten and catch a sheen. */
  .refresh:hover {
    box-shadow: var(--shadow-primary-hover);
    animation: bb-sheen var(--motion-slow) var(--ease-out);
  }
  .refresh:active {
    transform: var(--press-squish);
  }
  .refresh:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .spinning :global(.icon) {
    animation: bb-spin 0.8s linear infinite;
  }
  /* Live is a status, so it must not compete with the page's primary button. */
  .live {
    color: var(--text);
    background:
      var(--sheen) 150% 0 / 250% 100% no-repeat,
      var(--pill-tint);
    border-color: var(--pill-border);
    box-shadow: var(--shadow-frosted);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
  }
  .live:hover {
    box-shadow: var(--shadow-frosted-hover);
  }
  .dot {
    width: 8px;
    height: 8px;
    margin: 0 0.3rem;
    border-radius: 50%;
    background: var(--ok);
    animation: pulse 2s var(--ease-out) infinite;
  }
  .live.spinning .dot {
    animation-duration: 0.6s;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 color-mix(in srgb, var(--ok) 55%, transparent);
    }
    70%,
    100% {
      box-shadow: 0 0 0 7px transparent;
    }
  }
  @media (max-width: 640px) {
    .label {
      display: none;
    }
    .refresh {
      width: var(--control-lg);
      padding: 0;
      justify-content: center;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
    .refresh {
      transition: none;
    }
    .refresh:hover,
    .refresh:active {
      transform: none;
      animation: none;
    }
  }
</style>
