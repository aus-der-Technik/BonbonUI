<script lang="ts">
  /**
   * DatePicker molecule — a field that shows the chosen date and opens a small Calendar in a
   * popover. Picking a day closes it; the × clears it. Inside a Field, pass its `id` so the label
   * points at the field.
   *
   *   <Field label="Due date">{#snippet children({ id })}<DatePicker {id} bind:value />{/snippet}</Field>
   */
  import Calendar from './Calendar.svelte';
  import Popover from './Popover.svelte';
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    value?: Date | undefined;
    /** Accessible name when there is no visible label pointing at `id`. */
    label?: string | undefined;
    id?: string | undefined;
    placeholder?: string;
    locale?: string;
    /** How the chosen date reads in the field. */
    format?: Intl.DateTimeFormatOptions;
    weekStart?: 0 | 1;
    min?: Date | undefined;
    max?: Date | undefined;
    today?: Date | undefined;
    disabled?: boolean;
    invalid?: boolean;
    /** Shows the × button while a date is set. */
    clearable?: boolean;
    clearLabel?: string;
    size?: 'sm' | 'md' | 'lg';
    onchange?: ((value: Date | undefined) => void) | undefined;
  }

  let {
    value = $bindable(),
    label,
    id,
    placeholder = 'Pick a date',
    locale = 'en',
    format = { day: 'numeric', month: 'short', year: 'numeric' },
    weekStart = 1,
    min,
    max,
    today,
    disabled = false,
    invalid = false,
    clearable = true,
    clearLabel = 'Clear date',
    size = 'md',
    onchange,
  }: Props = $props();

  let open = $state(false);
  const text = $derived(value ? new Intl.DateTimeFormat(locale, format).format(value) : '');

  function choose(date: Date | undefined) {
    value = date;
    onchange?.(date);
  }
</script>

<span class="picker picker--{size}" class:invalid class:disabled>
  <Popover bind:open label={label ?? placeholder} placement="bottom-start" padding="sm">
    {#snippet trigger(props)}
      <button
        type="button"
        class="field"
        {id}
        {disabled}
        aria-label={label ? `${label}${text ? `: ${text}` : ''}` : undefined}
        {...props}
      >
        <Icon name="calendar" size={16} />
        <span class="value" class:placeholder={!text}>{text || placeholder}</span>
      </button>
    {/snippet}
    {#snippet children(close)}
      <Calendar
        size="sm"
        {value}
        {locale}
        {weekStart}
        {min}
        {max}
        today={today ?? new Date()}
        onselect={(day) => {
          choose(day);
          close();
        }}
      />
    {/snippet}
  </Popover>
  {#if clearable && value && !disabled}
    <button type="button" class="clear" aria-label={clearLabel} onclick={() => choose(undefined)}>
      <Icon name="close" size={14} />
    </button>
  {/if}
</span>

<style>
  .picker {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-width: 11rem;
    max-width: 100%;
  }
  .picker :global(.anchor) {
    flex: 1;
    min-width: 0;
  }
  .field {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    height: var(--control-md);
    padding: 0 2.2rem 0 var(--space-3);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-md);
    background: var(--input-bg);
    color: var(--text-3);
    font: inherit;
    font-size: var(--fs-md);
    text-align: left;
    cursor: pointer;
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out);
  }
  .picker--sm .field {
    height: var(--control-sm);
    font-size: var(--fs-sm);
  }
  .picker--lg .field {
    height: var(--control-lg);
    border-radius: var(--radius-lg);
  }
  .field:hover:not(:disabled) {
    border-color: color-mix(in srgb, var(--text) 22%, transparent);
  }
  .field:focus-visible,
  .field[aria-expanded='true'] {
    outline: none;
    border-color: var(--accent);
    box-shadow: var(--focus-halo);
  }
  .invalid .field {
    border-color: var(--danger);
  }
  .field:disabled {
    opacity: 0.55;
    cursor: default;
  }
  .value {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text);
    font-variant-numeric: tabular-nums;
  }
  .placeholder {
    color: var(--text-3);
  }
  .clear {
    position: absolute;
    right: 0.4rem;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border: 0;
    border-radius: 50%;
    background: var(--fill-muted);
    color: var(--text-2);
    cursor: pointer;
    transition: transform var(--motion-quick) var(--ease-jelly);
  }
  .clear:hover {
    background: var(--fill-hover);
    color: var(--text);
  }
  .clear:active {
    transform: var(--press-squish);
  }
  .clear:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
</style>
