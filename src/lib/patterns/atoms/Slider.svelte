<script lang="ts">
  /**
   * Slider atom — a candy range input: an accent-filled track and a white bead knob with an
   * accent core, with the current value next to the label. `format` shapes the readout; `hint` is a grey help line.
   *
   *   <Slider label="Volume" bind:value={volume} format={(v) => `${v} %`} />
   */
  interface Props {
    label: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    hint?: string | undefined;
    disabled?: boolean;
    format?: (value: number) => string;
    onchange?: ((value: number) => void) | undefined;
    /** The label is only the input's accessible name, not printed. */
    hideLabel?: boolean;
    /** Prints the current value next to the label (default on). */
    showValue?: boolean;
  }

  let {
    label,
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    hint,
    disabled = false,
    format = (v) => String(v),
    onchange,
    hideLabel = false,
    showValue = true,
  }: Props = $props();

  const id = $props.id();
  const fill = $derived(max > min ? ((value - min) / (max - min)) * 100 : 0);
</script>

<div class="slider" class:disabled>
  {#if !hideLabel || showValue}
    <div class="head">
      <label for={id} title={hint} class:sr-only={hideLabel}>{label}</label>
      {#if showValue}<output for={id}>{format(value)}</output>{/if}
    </div>
  {:else}
    <label for={id} class="sr-only">{label}</label>
  {/if}
  <input
    {id}
    type="range"
    {min}
    {max}
    {step}
    {disabled}
    style:--fill="{fill}%"
    aria-describedby={hint ? `${id}-hint` : undefined}
    bind:value
    oninput={() => onchange?.(value)}
  />
  {#if hint}<span class="hint" id="{id}-hint">{hint}</span>{/if}
</div>

<style>
  .slider {
    /* The knob: a white bead lit from above, with an accent core that says "grab me". */
    --_knob:
      radial-gradient(circle, var(--accent) 0 3px, transparent 3.5px),
      linear-gradient(180deg, var(--knob-top) 40%, var(--knob-bottom));
    --_knob-shadow:
      0 2px 6px rgba(12, 12, 22, 0.2), 0 0 0 0.5px rgba(12, 12, 22, 0.14),
      inset 0 -1px 0 rgba(12, 12, 22, 0.04);
    display: grid;
    gap: var(--space-2);
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-2);
  }
  label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
  }
  output {
    min-width: 2.5rem;
    padding: 0.05rem 0.5rem;
    border-radius: var(--radius-pill);
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    text-align: center;
  }
  input {
    width: 100%;
    height: 24px;
    margin: 0;
    background: transparent;
    appearance: none;
    cursor: pointer;
  }
  input::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: var(--radius-pill);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 70%) 0 0 /
        var(--fill) 100% no-repeat,
      linear-gradient(
        90deg,
        var(--accent-strong),
        var(--accent) var(--fill),
        var(--fill-muted) var(--fill)
      );
    box-shadow: inset 0 1px 2px rgba(12, 12, 22, 0.08);
  }
  input::-moz-range-track {
    height: 6px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
  }
  input::-moz-range-progress {
    height: 6px;
    border-radius: var(--radius-pill);
    background: linear-gradient(90deg, var(--accent-strong), var(--accent));
  }
  input::-webkit-slider-thumb {
    appearance: none;
    width: 22px;
    height: 22px;
    margin-top: -8px;
    border: 0;
    border-radius: 50%;
    background: var(--slider-thumb, var(--_knob));
    box-shadow: var(--_knob-shadow);
    transition:
      transform var(--motion-base) var(--ease-spring),
      box-shadow var(--motion-base) var(--ease-out);
  }
  input::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border: 0;
    border-radius: 50%;
    background: var(--slider-thumb, var(--_knob));
    box-shadow: var(--_knob-shadow);
    transition:
      transform var(--motion-base) var(--ease-spring),
      box-shadow var(--motion-base) var(--ease-out);
  }
  input:hover:not(:disabled)::-webkit-slider-thumb {
    transform: scale(1.08);
  }
  input:hover:not(:disabled)::-moz-range-thumb {
    transform: scale(1.08);
  }
  /* Grabbing it: the bead swells a little and picks up a soft tint glow. */
  input:active:not(:disabled)::-webkit-slider-thumb {
    transform: scale(1.18);
    box-shadow:
      var(--_knob-shadow),
      0 0 0 6px color-mix(in srgb, var(--tint) 16%, transparent);
  }
  input:active:not(:disabled)::-moz-range-thumb {
    transform: scale(1.18);
    box-shadow:
      var(--_knob-shadow),
      0 0 0 6px color-mix(in srgb, var(--tint) 16%, transparent);
  }
  input:focus-visible {
    outline: none;
  }
  input:focus-visible::-webkit-slider-thumb {
    box-shadow:
      var(--_knob-shadow),
      0 0 0 2px var(--accent),
      0 0 0 5px color-mix(in srgb, var(--tint) 20%, transparent);
  }
  input:focus-visible::-moz-range-thumb {
    box-shadow:
      var(--_knob-shadow),
      0 0 0 2px var(--accent),
      0 0 0 5px color-mix(in srgb, var(--tint) 20%, transparent);
  }
  .disabled {
    opacity: var(--disabled-opacity);
  }
  .disabled input {
    cursor: default;
  }
  .hint {
    font-size: var(--fs-xs);
    line-height: 1.45;
    color: var(--text-3);
  }
  @media (prefers-reduced-motion: reduce) {
    input::-webkit-slider-thumb {
      transition: none;
    }
    input::-moz-range-thumb {
      transition: none;
    }
  }
</style>
