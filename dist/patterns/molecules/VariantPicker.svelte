<script lang="ts" module>
  export interface VariantOption {
    value: string;
    label: string;
    /** A CSS colour: the option shows as a colour swatch. */
    color?: string | undefined;
    /** Sold out: shown struck through and skipped by the keyboard. */
    disabled?: boolean | undefined;
  }
</script>

<script lang="ts">
  /**
   * VariantPicker molecule — pick one variant of a product: colour swatches or size pills, as a
   * radio group (arrow keys move and select, sold-out options are skipped). The heading shows
   * the group name with the chosen value: "Colour · Sage".
   *
   *   <VariantPicker label="Colour" bind:value options={[{ value: 'sage', label: 'Sage', color: '#9bb59a' }]} />
   */
  interface Props {
    label: string;
    options: VariantOption[];
    value?: string | undefined;
    /** `swatch` for colours, `pill` for sizes; default: swatches when every option has a colour. */
    kind?: 'swatch' | 'pill' | undefined;
    /** Shows the chosen option's label next to the group name. */
    showValue?: boolean;
    size?: 'sm' | 'md';
    unavailableLabel?: string;
    onchange?: ((value: string) => void) | undefined;
  }

  let {
    label,
    options,
    value = $bindable(),
    kind,
    showValue = true,
    size = 'md',
    unavailableLabel = 'sold out',
    onchange,
  }: Props = $props();

  const id = $props.id();
  const buttons: HTMLButtonElement[] = $state([]);
  const mode = $derived(
    kind ?? (options.length && options.every((o) => o.color) ? 'swatch' : 'pill'),
  );
  const selected = $derived(options.find((o) => o.value === value));
  const enabled = $derived(options.filter((o) => !o.disabled));
  // The one tab stop: the selected option, else the first that can be chosen.
  const focusValue = $derived(selected && !selected.disabled ? selected.value : enabled[0]?.value);

  function choose(option: VariantOption) {
    if (option.disabled || option.value === value) return;
    value = option.value;
    onchange?.(option.value);
  }

  function onkeydown(event: KeyboardEvent, current: VariantOption) {
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
    const backward = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
    let target: VariantOption | undefined;
    if (forward || backward) {
      const at = enabled.findIndex((o) => o.value === current.value);
      const n = enabled.length;
      target = enabled[(at + (forward ? 1 : -1) + n) % n];
    } else if (event.key === 'Home') target = enabled[0];
    else if (event.key === 'End') target = enabled[enabled.length - 1];
    else return;
    event.preventDefault();
    if (!target) return;
    choose(target);
    buttons[options.indexOf(target)]?.focus();
  }
</script>

<div class="picker picker--{mode} picker--{size}">
  <p class="legend" id="{id}-label">
    <span class="name">{label}</span>
    {#if showValue && selected}<span class="value">{selected.label}</span>{/if}
  </p>
  <div class="options" role="radiogroup" aria-labelledby="{id}-label">
    {#each options as option, i (option.value)}
      <button
        bind:this={buttons[i]}
        type="button"
        role="radio"
        class="option"
        class:unavailable={option.disabled}
        aria-checked={option.value === value}
        aria-disabled={option.disabled ? 'true' : undefined}
        aria-label={mode === 'swatch' || option.disabled
          ? `${option.label}${option.disabled ? `, ${unavailableLabel}` : ''}`
          : undefined}
        title={mode === 'swatch' ? option.label : undefined}
        tabindex={option.value === focusValue ? 0 : -1}
        style:--swatch={option.color}
        onclick={() => choose(option)}
        onkeydown={(e) => onkeydown(e, option)}
      >
        {#if mode === 'pill'}{option.label}{/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .picker {
    display: grid;
    gap: var(--space-2);
    min-width: 0;
  }
  .legend {
    display: flex;
    gap: var(--space-2);
    font-size: var(--fs-sm);
  }
  .name {
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .value {
    color: var(--text-2);
  }
  .value::before {
    content: '·';
    margin-right: var(--space-2);
    color: var(--text-3);
  }
  .options {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  .option {
    position: relative;
    font: inherit;
    cursor: pointer;
    transition:
      transform var(--motion-quick) var(--ease-jelly),
      box-shadow var(--motion-quick) var(--ease-out),
      background var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out);
  }
  .option:active:not(.unavailable) {
    transform: var(--press-squish);
  }
  .option:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  /* Swatches: a glossy colour dot; the chosen one gets an accent ring with a gap. */
  .picker--swatch .option {
    --_d: 2.125rem;
    width: var(--_d);
    height: var(--_d);
    padding: 0;
    border-radius: var(--radius-pill);
    border: 0;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 55%), var(--swatch);
    box-shadow:
      inset 0 0 0 1px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  .picker--sm.picker--swatch .option {
    --_d: 1.625rem;
  }
  .picker--swatch .option:hover:not(.unavailable) {
    transform: scale(1.08);
  }
  .picker--swatch .option[aria-checked='true'] {
    box-shadow:
      inset 0 0 0 1px rgba(0, 0, 0, 0.12),
      0 0 0 3px var(--bg),
      0 0 0 5px var(--accent);
  }
  .picker--swatch .unavailable::after {
    content: '';
    position: absolute;
    inset: 45% -8%;
    background: var(--text-2);
    transform: rotate(-45deg);
    border-radius: 2px;
  }

  /* Pills: size chips on glass; the chosen one is selected-layer tinted. */
  .picker--pill .option {
    min-width: var(--control-lg);
    height: var(--control-lg);
    padding: 0 var(--space-4);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-strong);
    background: var(--input-bg);
    color: var(--text);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    font-variant-numeric: tabular-nums;
  }
  .picker--sm.picker--pill .option {
    min-width: var(--control-md);
    height: var(--control-md);
    padding: 0 var(--space-3);
  }
  .picker--pill .option:hover:not(.unavailable) {
    background: var(--fill-hover);
  }
  .picker--pill .option[aria-checked='true'] {
    border-color: var(--accent);
    background: var(--layer-selected-bg);
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
    box-shadow: 0 0 0 1px var(--accent) inset;
  }
  .picker--pill .unavailable {
    color: var(--text-3);
    text-decoration: line-through;
    background: transparent;
    border-style: dashed;
  }
  .unavailable {
    cursor: not-allowed;
    opacity: var(--disabled-opacity);
  }

  @media (prefers-reduced-motion: reduce) {
    .option {
      transition: none;
    }
  }
</style>
