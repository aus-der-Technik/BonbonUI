<script lang="ts">
  /**
   * ToggleChip molecule — a pressable pill. `md` is a legend or filter chip (colour dot, label,
   * count); off, it keeps readable text but loses its fill — a dashed outline and a grey dot — so
   * "off" never looks like "disabled" (which dims the whole chip). `sm` is a toolbar toggle like
   * "Wrap" (icon; accent-tinted when on); it looks xs but has a --target-min hit area.
   *
   *   <ToggleChip label="Open" color="var(--color-green)" count={12} bind:pressed={showOpen} />
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import Swatch from '../atoms/Swatch.svelte';
  import type { IconName } from '../atoms/icons';
  import { changeCue } from '../atoms/changed';

  interface Props {
    pressed?: boolean;
    label?: string | undefined;
    color?: string | undefined;
    count?: number | string | undefined;
    icon?: IconName | undefined;
    size?: 'sm' | 'md';
    title?: string | undefined;
    disabled?: boolean;
    onchange?: ((pressed: boolean) => void) | undefined;
    children?: Snippet | undefined;
  }

  let {
    pressed = $bindable(false),
    label,
    color,
    count,
    icon,
    size = 'md',
    title,
    disabled = false,
    onchange,
    children,
  }: Props = $props();

  function toggle() {
    pressed = !pressed;
    onchange?.(pressed);
  }
</script>

<button
  type="button"
  class="chip chip--{size}"
  aria-pressed={pressed}
  {title}
  {disabled}
  onclick={toggle}
>
  {#if color}<Swatch {color} />{/if}
  {#if icon}<Icon name={icon} size={14} />{/if}
  {#if children}{@render children()}{:else}<span>{label}</span>{/if}
  {#if count != null}<b use:changeCue={count}>{count}</b>{/if}
</button>

<style>
  .chip {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-strong);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
    color: var(--text-2);
    font: inherit;
    font-weight: var(--fw-medium);
    cursor: pointer;
    white-space: nowrap;
    transition:
      opacity var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .chip:hover:not(:disabled) {
    border-color: color-mix(in srgb, var(--text) 22%, transparent);
  }
  .chip:active:not(:disabled) {
    transform: var(--press-squish);
  }
  .chip:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .chip:disabled {
    cursor: default;
    opacity: var(--disabled-opacity);
  }
  b {
    border-radius: var(--radius-xs);
    color: var(--text);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }

  .chip--md {
    height: var(--control-sm);
    padding: 0 var(--space-3);
    font-size: var(--fs-sm);
  }
  .chip--md[aria-pressed='true'] {
    color: var(--text);
    background: var(--glass-strong);
  }
  .chip--md[aria-pressed='false'] {
    color: var(--text-3);
    border-style: dashed;
    border-color: var(--input-border);
    background: transparent;
    box-shadow: none;
  }
  .chip--md[aria-pressed='false'] b {
    color: var(--text-3);
  }
  .chip--md[aria-pressed='false'] :global(.swatch) {
    filter: grayscale(1);
    opacity: 0.55;
  }

  .chip--sm {
    height: var(--control-xs);
    padding: 0 var(--space-3);
    gap: var(--space-1);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .chip--sm::before {
    content: '';
    position: absolute;
    inset: min(0px, calc((100% - var(--target-min)) / 2)) 0;
  }
  .chip--sm:hover:not(:disabled):not([aria-pressed='true']) {
    background: var(--fill-hover);
  }
  .chip--sm[aria-pressed='true'] {
    color: var(--accent-ink);
    border-color: var(--layer-selected-border);
    background: var(--layer-selected-bg);
  }
  @media (prefers-reduced-motion: reduce) {
    .chip {
      transition: none;
    }
    .chip:active:not(:disabled) {
      transform: none;
    }
  }
</style>
