<script lang="ts">
  /**
   * QuantityStepper molecule — − value + in one pill, for a cart line or a product page. The
   * value is a spin button: arrow keys step, Page Up/Down step by ten, Home/End jump to the
   * limits, and a typed number is clamped when the field loses focus or Enter is pressed. The
   * figure rolls up or down with each step; pushing past a limit gets a polite head-shake.
   *
   *   <QuantityStepper bind:value={qty} max={10} onchange={(n) => cart.set(id, n)} />
   */
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    /** Accessible name of the value field. */
    label?: string;
    decreaseLabel?: string;
    increaseLabel?: string;
    onchange?: ((value: number) => void) | undefined;
  }

  let {
    value = $bindable(1),
    min = 1,
    max = 99,
    step = 1,
    size = 'md',
    disabled = false,
    label = 'Quantity',
    decreaseLabel = 'Decrease quantity',
    increaseLabel = 'Increase quantity',
    onchange,
  }: Props = $props();

  let draft = $state<string | null>(null);
  let pill = $state<HTMLElement>();
  let field = $state<HTMLInputElement>();

  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const still = () =>
    typeof matchMedia !== 'function' || matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Small physical feedback: the figure rolls in the direction of the step, a limit says "nope". */
  function feel(direction: number, blocked: boolean) {
    if (still()) return;
    if (blocked && pill?.animate) {
      pill.animate(
        [0, -3, 3, -1.5, 0].map((x) => ({ transform: `translateX(${x}px)` })),
        { duration: 320, easing: 'ease-out' },
      );
    } else if (!blocked && field?.animate) {
      field.animate(
        [
          { transform: `translateY(${direction > 0 ? 6 : -6}px)`, opacity: 0.3 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 220, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
      );
    }
  }

  function set(next: number) {
    const clamped = clamp(Math.round(next / step) * step);
    draft = null;
    if (clamped === value) {
      if (next !== value) feel(next - value, true);
      return;
    }
    feel(clamped - value, false);
    value = clamped;
    onchange?.(clamped);
  }

  function commit() {
    if (draft === null) return;
    const parsed = Number.parseInt(draft, 10);
    if (Number.isNaN(parsed)) draft = null;
    else set(parsed);
  }

  function onkeydown(event: KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowUp: step,
      ArrowDown: -step,
      PageUp: step * 10,
      PageDown: -step * 10,
    };
    if (event.key in moves) set(value + (moves[event.key] ?? 0));
    else if (event.key === 'Home') set(min);
    else if (event.key === 'End') set(max);
    else if (event.key === 'Enter') commit();
    else return;
    event.preventDefault();
  }
</script>

<div class="stepper stepper--{size}" class:disabled bind:this={pill}>
  <button
    type="button"
    class="step"
    aria-label={decreaseLabel}
    disabled={disabled || value <= min}
    onclick={() => set(value - step)}
  >
    <Icon name="minus" size={size === 'sm' ? 13 : 15} />
  </button>
  <input
    type="text"
    inputmode="numeric"
    bind:this={field}
    role="spinbutton"
    aria-label={label}
    aria-valuenow={value}
    aria-valuemin={min}
    aria-valuemax={max}
    {disabled}
    value={draft ?? String(value)}
    oninput={(e) => (draft = e.currentTarget.value.replace(/[^\d]/g, ''))}
    onblur={commit}
    {onkeydown}
  />
  <button
    type="button"
    class="step"
    aria-label={increaseLabel}
    disabled={disabled || value >= max}
    onclick={() => set(value + step)}
  >
    <Icon name="plus" size={size === 'sm' ? 13 : 15} />
  </button>
</div>

<style>
  .stepper {
    --_h: var(--control-md);
    display: inline-flex;
    align-items: center;
    height: var(--_h);
    padding: 3px;
    border-radius: var(--radius-pill);
    background: var(--input-bg);
    border: 1px solid var(--border-strong);
    box-shadow: var(--glass-inset);
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out);
  }
  .stepper--sm {
    --_h: var(--control-sm);
  }
  .stepper--lg {
    --_h: var(--control-lg);
  }
  .stepper:focus-within {
    border-color: var(--accent);
    box-shadow: var(--focus-halo);
  }
  .disabled {
    opacity: 0.55;
  }
  .step {
    display: grid;
    place-items: center;
    width: calc(var(--_h) - 8px);
    height: calc(var(--_h) - 8px);
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--text);
    cursor: pointer;
    transition:
      background var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .step:hover:not(:disabled) {
    background: var(--fill-hover);
  }
  .step:active:not(:disabled) {
    transform: var(--press-squish);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .step:disabled {
    color: var(--text-3);
    cursor: default;
  }
  .step:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
    box-shadow: var(--focus-halo);
  }
  input {
    width: 2.6ch;
    min-width: 2.25rem;
    height: 100%;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    font: inherit;
    font-size: var(--fs-base);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    text-align: center;
    color: var(--text);
  }
  @media (prefers-reduced-motion: reduce) {
    .step {
      transition: none;
    }
  }
</style>
