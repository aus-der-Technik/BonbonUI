<script lang="ts">
  /**
   * StarInput molecule — pick 1…5 stars; every star up to the chosen one lights up. Hovering
   * previews the pick, a chosen star pops.
   *
   *   <StarInput label="Your rating" bind:value={stars} />
   */
  import { starLabel } from '../../utils/format';

  interface Props {
    value?: number;
    max?: number;
    label?: string;
    onchange?: ((value: number) => void) | undefined;
  }

  let { value = $bindable(0), max = 5, label = 'Stars', onchange }: Props = $props();

  function pick(next: number) {
    value = next;
    onchange?.(next);
  }
</script>

<div class="stars" role="radiogroup" aria-label={label}>
  {#each Array.from({ length: max }, (_, i) => i + 1) as n (n)}
    <button
      type="button"
      role="radio"
      aria-checked={value === n}
      aria-label={starLabel(n)}
      class:on={n <= value}
      onclick={() => pick(n)}>★</button
    >
  {/each}
</div>

<style>
  .stars {
    display: flex;
    gap: var(--space-1);
  }
  button {
    border: 0;
    background: none;
    cursor: pointer;
    font-size: var(--fs-kpi);
    line-height: 1;
    padding: 0.1rem;
    color: var(--fill-off);
    border-radius: var(--radius-sm);
    transition:
      color var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  button.on {
    color: var(--star-on);
    text-shadow: 0 2px 8px color-mix(in srgb, var(--star-on) 40%, transparent);
  }
  /* Hover previews the pick: the hovered star and every one before it light up. */
  .stars:has(button:hover) button {
    color: var(--fill-off);
    text-shadow: none;
  }
  .stars:has(button:hover) button:is(:hover, :has(~ button:hover)) {
    color: var(--star-on);
  }
  button:hover {
    transform: scale(1.15);
  }
  button:active,
  button[aria-checked='true'] {
    transform: scale(1.08);
  }
  button:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
    button:hover,
    button:active,
    button[aria-checked='true'] {
      transform: none;
    }
  }
</style>
