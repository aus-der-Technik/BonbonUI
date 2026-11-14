<script lang="ts">
  /**
   * RatingDisplay molecule — a feedback rating as shown in lists: 👍 Up / 👎 Down, or ★★★★☆.
   *
   *   <RatingDisplay type="stars" value={4} />
   */
  import Icon from '../atoms/Icon.svelte';
  import Stars from '../atoms/Stars.svelte';

  interface Props {
    type: 'thumbs' | 'stars';
    /** `'up' | 'down'` for thumbs, `1…5` (number or numeric string) for stars. */
    value: string | number;
    upLabel?: string;
    downLabel?: string;
  }

  let { type, value, upLabel = 'Up', downLabel = 'Down' }: Props = $props();

  const up = $derived(value === 'up');
</script>

{#if type === 'thumbs'}
  <span class="rating" class:up class:down={!up}>
    <Icon name={up ? 'thumbs-up' : 'thumbs-down'} size={16} />
    <span class="label">{up ? upLabel : downLabel}</span>
  </span>
{:else}
  <span class="rating"><Stars value={Number(value)} /></span>
{/if}

<style>
  .rating {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    white-space: nowrap;
    font-weight: var(--fw-semibold);
  }
  .up {
    color: var(--up);
  }
  .down {
    color: var(--down);
  }
  .label {
    color: var(--text-2);
    font-weight: var(--fw-medium);
  }
</style>
