<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface Segment<V extends string | number = string> {
    value: V;
    label: string;
    /** Shown before the label. */
    icon?: IconName | undefined;
  }
</script>

<script lang="ts" generics="V extends string | number">
  /**
   * SegmentedControl molecule — one-of-n buttons in a recessed track; the active one rides on a
   * liquid glass thumb that glides from option to option (a dashboard's time range, a list/grid switch).
   * `variant="accent"` fills the thumb with the accent instead. `full` stretches the control
   * across its container with equal segments.
   *
   *   <SegmentedControl label="Range" options={[{ value: 7, label: '7 days' }, …]} bind:value />
   */
  import Icon from '../atoms/Icon.svelte';
  import { indicator } from './indicator';

  interface Props {
    options: Segment<V>[];
    value: V;
    /** Accessible name of the group (or use `labelledby`). */
    label?: string | undefined;
    labelledby?: string | undefined;
    /** `sm` is a compact pill (e.g. a language switch). */
    size?: 'sm' | 'md';
    /** `glass` (default) is a frosted thumb, `accent` a filled one. */
    variant?: 'glass' | 'accent';
    /** Fills the width of its container, segments equally wide. */
    full?: boolean;
    /** Lets many options wrap onto several lines instead of overflowing. */
    wrap?: boolean;
    onchange?: ((value: V) => void) | undefined;
  }

  let {
    options,
    value = $bindable(),
    label,
    labelledby,
    size = 'md',
    variant = 'glass',
    full = false,
    wrap = false,
    onchange,
  }: Props = $props();

  function select(next: V) {
    if (next === value) return;
    value = next;
    onchange?.(next);
  }
</script>

<div
  class="segmented segmented--{size} segmented--{variant}"
  class:wrap
  class:full
  role="group"
  aria-label={label}
  aria-labelledby={labelledby}
  use:indicator={{ selector: '[aria-pressed="true"]', key: value }}
>
  {#each options as option (option.value)}
    <button
      type="button"
      aria-pressed={option.value === value}
      onclick={() => select(option.value)}
    >
      {#if option.icon}<Icon name={option.icon} size={size === 'sm' ? 12 : 14} />{/if}{option.label}
    </button>
  {/each}
</div>

<style>
  .segmented {
    position: relative;
    display: inline-flex;
    gap: 2px;
    width: max-content;
    max-width: 100%;
    height: var(--control-md);
    padding: 3px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    box-shadow: inset 0 1px 2px color-mix(in srgb, var(--text) 8%, transparent);
  }
  .full {
    display: flex;
    width: 100%;
  }
  .full button {
    flex: 1 1 0;
  }
  button {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    border: 0;
    border-radius: var(--radius-pill);
    background: transparent;
    padding: 0 var(--space-4);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    white-space: nowrap;
    cursor: pointer;
    transition:
      color var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  button:hover:not([aria-pressed='true']) {
    color: var(--text);
    background: var(--fill-hover);
  }
  button:active {
    transform: var(--press-squish);
  }
  button[aria-pressed='true'] {
    font-weight: var(--fw-semibold);
  }
  /* The thumb: drawn on the item until the track has measured it, then one shared thumb that
     flows from item to item like thick water (see indicator.ts). */
  .segmented--glass button[aria-pressed='true'],
  .segmented--glass::before {
    background: linear-gradient(180deg, var(--pill-edge), transparent 70%), var(--glass-strong);
    box-shadow:
      0 3px 10px color-mix(in srgb, var(--text) 12%, transparent),
      0 0 0 0.5px var(--border-strong),
      inset 0 1px 0 var(--pill-light);
  }
  .segmented--glass button[aria-pressed='true'] {
    color: var(--text);
  }
  .segmented--glass button[aria-pressed='true'] :global(.icon) {
    color: var(--accent-ink);
  }
  .segmented--accent button[aria-pressed='true'],
  .segmented--accent::before {
    background: var(--grad-primary);
    box-shadow: var(--shadow-primary);
  }
  .segmented--accent button[aria-pressed='true'] {
    color: var(--on-accent);
  }
  .segmented::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: var(--ind-w, 0);
    height: var(--ind-h, 0);
    border-radius: var(--radius-pill);
    transform: translate(var(--ind-x, 0), var(--ind-y, 0));
    pointer-events: none;
    opacity: 0;
  }
  .segmented:global([data-indicator])::before {
    opacity: 1;
  }
  .segmented:global([data-indicator]) button[aria-pressed='true'] {
    background: transparent;
    box-shadow: none;
  }
  button:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .segmented--sm {
    height: var(--control-xs);
    padding: 2px;
  }
  .segmented--sm button {
    padding: 0 0.65rem;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  /* Several rows of pills sit in a rounded tray, not a stretched capsule. */
  .wrap {
    flex-wrap: wrap;
    height: auto;
    border-radius: var(--radius-lg);
  }
  .wrap button {
    min-height: calc(var(--control-md) - 6px);
  }
  .segmented--sm.wrap button {
    min-height: calc(var(--control-xs) - 4px);
  }
  @media (prefers-reduced-motion: reduce) {
    button,
    button:active {
      transform: none;
    }
  }
</style>
