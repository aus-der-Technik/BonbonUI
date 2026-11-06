<script lang="ts">
  /**
   * RefreshButton molecule — the header's accent "Refresh" pill. While a live connection pushes
   * updates (`live`), it steps back into a calm glass pill with a small pulsing green status dot
   * ("Auto refreshing") — status, not a second primary action; `loading` spins the icon (or
   * speeds up the pulse). Below 720px only the icon (or the dot) stays. A preset of Button and
   * StatusDot, so it presses, shines and spins like every other button. Inside a panel the
   * accent pill is too loud: `variant="secondary"` (or `ghost` on glass) and `size="sm"` make it
   * a quiet tool of that panel.
   *
   *   <RefreshButton loading={busy} onclick={reload} />
   */
  import Button from '../atoms/Button.svelte';
  import StatusDot from '../atoms/StatusDot.svelte';

  interface Props {
    live?: boolean;
    loading?: boolean;
    /** `primary` for the page header; `secondary` or `ghost` inside a panel or card. */
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    liveLabel?: string;
    liveHint?: string;
    /** Accessible name in live mode, from the live label and the action label. */
    liveActionLabel?: (liveLabel: string, label: string) => string;
    onclick?: (() => void) | undefined;
  }

  let {
    live = false,
    loading = false,
    variant = 'primary',
    size = 'lg',
    label = 'Refresh',
    liveLabel = 'Auto refreshing',
    liveHint = 'Updates appear automatically',
    liveActionLabel = (state, action) => `${state} — ${action.toLowerCase()} now`,
    onclick,
  }: Props = $props();
</script>

{#snippet dot()}<span class="dot" class:fast={loading}><StatusDot tone="ok" pulse /></span
  >{/snippet}

<Button
  variant={live ? 'ghost' : variant}
  {size}
  icon={live ? undefined : 'refresh'}
  leading={live ? dot : undefined}
  label={live ? liveLabel : label}
  busy={loading}
  collapse
  aria-label={live ? liveActionLabel(liveLabel, label) : label}
  title={live ? liveHint : undefined}
  onclick={() => onclick?.()}
/>

<style>
  .dot {
    display: inline-flex;
    margin: 0 0.2rem;
  }
  /* Loading while live: the pulse quickens instead of a spinner joining in. */
  .fast :global(.dot--pulse::after) {
    animation-duration: 0.6s;
  }
</style>
