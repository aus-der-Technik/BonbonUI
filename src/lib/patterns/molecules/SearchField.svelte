<script lang="ts">
  /**
   * SearchField molecule — a search input with the magnifier inside. `lg` is a page's main search
   * (52px), `sm` a toolbar filter like "Filter loaded rows" (36px). Focus lights the border and a
   * soft halo in the accent; `shape="pill"` rounds it fully for headers and glass toolbars.
   *
   *   <SearchField label="Search orders" placeholder="Order no., customer…" bind:value={term} />
   */
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Icon from '../atoms/Icon.svelte';

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'value' | 'class'> {
    value?: string;
    /** Accessible name (visually hidden). */
    label: string;
    size?: 'sm' | 'lg';
    shape?: 'rounded' | 'pill';
    class?: string;
    element?: HTMLInputElement | undefined;
  }

  let {
    value = $bindable(''),
    label,
    size = 'sm',
    shape = 'rounded',
    class: extraClass = '',
    element = $bindable(),
    ...rest
  }: Props = $props();
</script>

<label class="search search--{size} search--{shape} {extraClass}">
  <Icon name="search" size={size === 'lg' ? 18 : 15} />
  <span class="sr-only">{label}</span>
  <input
    bind:this={element}
    bind:value
    type="search"
    autocomplete="off"
    spellcheck="false"
    {...rest}
  />
</label>

<style>
  .search {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 0;
  }
  .search :global(.icon) {
    position: absolute;
    color: var(--text-3);
    pointer-events: none;
    transition: color var(--motion-quick) var(--ease-out);
  }
  .search:focus-within :global(.icon) {
    color: var(--accent-ink);
  }
  .search--sm :global(.icon) {
    left: 0.75rem;
  }
  .search--lg :global(.icon) {
    left: 1.05rem;
  }
  input {
    width: 100%;
    border: 1px solid var(--input-border);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
    color: var(--text);
    font: inherit;
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out);
  }
  input::placeholder {
    color: var(--text-3);
  }
  input:hover:not(:focus) {
    border-color: var(--accent-border);
  }
  .search--sm input {
    height: var(--control-md);
    padding: 0 var(--space-3) 0 2.15rem;
    border-radius: var(--radius-md);
    font-size: var(--fs-md);
  }
  .search--lg input {
    height: var(--control-xl);
    padding: 0 var(--space-4) 0 2.85rem;
    border-radius: var(--radius-xl);
    font-size: var(--fs-lg);
  }
  .search--pill input {
    border-radius: var(--radius-pill);
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: var(--focus-halo), var(--glass-inset);
  }
  input[aria-invalid='true'] {
    border-color: var(--danger);
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  @media (prefers-reduced-motion: reduce) {
    input,
    .search :global(.icon) {
      transition: none;
    }
  }
</style>
