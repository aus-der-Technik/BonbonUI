<script lang="ts" module>
  export interface CheckboxOption {
    value: string;
    label: string;
    /** Shown as a tooltip and to screen readers. */
    description?: string;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  /**
   * CheckboxGroup molecule — an inline grid of checkboxes under a legend, with "Select all /
   * Clear" and a running "3 of 8 selected" count (e.g. which tools an assistant may use). For a
   * dropdown use MultiSelect. Options sit in soft rows that light up on hover; the boxes are the
   * Checkbox atom, so a group and a lone checkbox look the same side by side.
   *
   *   <CheckboxGroup label="Notify me about" options={topics} bind:value={chosen} />
   */
  import Checkbox from '../atoms/Checkbox.svelte';
  import VisuallyHidden from '../atoms/VisuallyHidden.svelte';

  interface Props {
    label: string;
    options: CheckboxOption[];
    value?: string[];
    columns?: number;
    mono?: boolean;
    selectAllLabel?: string;
    clearLabel?: string;
    countLabel?: (selected: number, total: number) => string;
    onchange?: ((value: string[]) => void) | undefined;
  }

  let {
    label,
    options,
    value = $bindable([]),
    columns = 2,
    mono = false,
    selectAllLabel = 'Select all',
    clearLabel = 'Clear',
    countLabel = (n, total) => `${n} of ${total} selected`,
    onchange,
  }: Props = $props();

  const id = $props.id();
  const enabled = $derived(options.filter((o) => !o.disabled));

  function set(next: string[]) {
    // Keep option order, whatever order the clicks came in.
    value = options.map((o) => o.value).filter((v) => next.includes(v));
    onchange?.(value);
  }

  const allChosen = $derived(enabled.every((o) => value.includes(o.value)));

  function toggle(option: string, checked: boolean) {
    set(checked ? [...value, option] : value.filter((v) => v !== option));
  }
</script>

<fieldset class="group" aria-labelledby="{id}-label">
  <div class="head">
    <span class="label" id="{id}-label">{label}</span>
    <span class="count" aria-live="polite">{countLabel(value.length, options.length)}</span>
    <span class="actions">
      <!-- aria-disabled, not disabled: the button just pressed keeps focus instead of dropping
           it to the page. -->
      <button
        type="button"
        aria-disabled={allChosen}
        onclick={() => !allChosen && set(enabled.map((o) => o.value))}
      >
        {selectAllLabel}
      </button>
      <button type="button" aria-disabled={!value.length} onclick={() => value.length && set([])}
        >{clearLabel}</button
      >
    </span>
  </div>
  <div class="grid" style:--columns={columns}>
    {#each options as option (option.value)}
      <label class="option" title={option.description}>
        <Checkbox
          checked={value.includes(option.value)}
          disabled={option.disabled}
          aria-describedby={option.description ? `${id}-${option.value}` : undefined}
          onchange={(event) => toggle(option.value, event.currentTarget.checked)}
        />
        <span class:mono>{option.label}</span>
        {#if option.description}<VisuallyHidden
            ><span id="{id}-{option.value}">{option.description}</span></VisuallyHidden
          >{/if}
      </label>
    {/each}
  </div>
</fieldset>

<style>
  .group {
    border: 0;
    min-width: 0;
  }
  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-2) var(--space-3);
    margin-bottom: var(--space-2);
  }
  .label {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
  }
  .count {
    font-size: var(--fs-xs);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .actions {
    display: inline-flex;
    gap: var(--space-2);
    margin-left: auto;
  }
  .actions button {
    border: 0;
    background: none;
    padding: 0.1rem var(--space-2);
    border-radius: var(--radius-pill);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--accent-ink);
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .actions button:hover:not([aria-disabled='true']) {
    background: var(--accent-faint);
  }
  .actions button[aria-disabled='true'] {
    color: var(--text-3);
    cursor: default;
  }
  .actions button:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
    gap: var(--space-1) var(--space-4);
  }
  .option {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    min-height: var(--control-sm);
    padding: 0 var(--space-2);
    margin: 0 calc(-1 * var(--space-2));
    border-radius: var(--radius-sm);
    font-size: var(--fs-md);
    color: var(--text);
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .option:hover {
    background: var(--fill-hover);
  }
  .option:has(:global(input:checked)) {
    font-weight: var(--fw-medium);
  }
  .option:has(:global(input:disabled)) {
    opacity: var(--disabled-opacity);
    cursor: default;
  }
  .option > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mono {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
  }
  @media (max-width: 520px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
