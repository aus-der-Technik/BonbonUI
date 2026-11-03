<script lang="ts" module>
  export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  /**
   * Select atom — a native `<select>` dressed like the other fields, with a soft chevron. Native,
   * so it gets the platform picker on phones for free.
   *
   *   <Select aria-label="Environment" bind:value={env} options={[{ value: 'prod', label: 'Production' }]} />
   */
  import type { HTMLSelectAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLSelectAttributes, 'class' | 'value' | 'size'> {
    value?: string;
    size?: 'sm' | 'md' | 'lg';
    options: SelectOption[];
    class?: string;
  }

  let {
    value = $bindable(''),
    options,
    size = 'md',
    class: extraClass = '',
    ...rest
  }: Props = $props();
</script>

<select bind:value class="select select--{size} {extraClass}" {...rest}>
  {#each options as option (option.value)}
    <option value={option.value} disabled={option.disabled}>{option.label}</option>
  {/each}
</select>

<style>
  .select {
    min-width: 9rem;
    height: var(--control-md);
    padding: 0 2rem 0 var(--space-3);
    border-radius: var(--radius-md);
    border: 1px solid var(--input-border);
    background-color: var(--input-bg);
    font: inherit;
    font-size: var(--fs-md);
    color: var(--text);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5l3 3 3-3' fill='none' stroke='%23888' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.6rem center;
    background-size: 12px;
    box-shadow:
      0 1px 2px rgba(12, 12, 22, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
    cursor: pointer;
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .select:hover:not(:disabled) {
    border-color: var(--accent-border);
  }
  .select:focus-visible {
    outline: none;
    border-color: var(--accent);
    box-shadow: var(--focus-halo);
  }
  .select:disabled {
    opacity: var(--disabled-opacity);
    cursor: default;
  }
  .select--sm {
    height: var(--control-sm);
    font-size: var(--fs-sm);
    border-radius: var(--radius-sm);
  }
  .select--lg {
    height: var(--control-lg);
    padding-left: var(--space-4);
    font-size: var(--fs-base);
    border-radius: var(--radius-lg);
  }
</style>
