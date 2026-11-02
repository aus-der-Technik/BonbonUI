<script lang="ts">
  /**
   * Radio atom — one candy radio button (an accent disc whose centre dot pops in) with its label
   * and an optional grey description. Group them with RadioGroup, or bind several to one value:
   *
   *   <Radio name="plan" value="team" label="Team" bind:group={plan} />
   */
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'class' | 'children'> {
    group?: string | number | undefined;
    value: string | number;
    label: string;
    description?: string | undefined;
  }

  let { group = $bindable(), value, label, description, ...rest }: Props = $props();
</script>

<label class="radio">
  <input type="radio" bind:group {value} {...rest} />
  <span class="text">
    <span class="label">{label}</span>
    {#if description}<span class="desc">{description}</span>{/if}
  </span>
</label>

<style>
  .radio {
    display: inline-flex;
    align-items: flex-start;
    gap: 0.6rem;
    cursor: pointer;
  }
  input {
    width: 18px;
    height: 18px;
    margin: 1px 0 0;
    flex-shrink: 0;
    appearance: none;
    border: 1.5px solid var(--fill-off);
    border-radius: 50%;
    /* The centre dot is a radial layer that grows from nothing — so it can pop with a spring. */
    background-color: var(--input-bg);
    background-image:
      radial-gradient(circle, var(--on-accent) 0 30%, transparent 34%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 60%);
    background-position: center;
    background-repeat: no-repeat;
    background-size:
      0 0,
      100% 100%;
    box-shadow: inset 0 1px 1px rgba(12, 12, 22, 0.05);
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      background-size var(--motion-base) var(--ease-spring),
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  input:hover:not(:disabled) {
    border-color: var(--accent-border);
  }
  /* Jelly press. */
  input:active:not(:disabled) {
    transform: var(--press-squish);
  }
  input:checked {
    border-color: transparent;
    background-color: var(--accent);
    background-size:
      100% 100%,
      100% 100%;
    box-shadow:
      0 2px 6px color-mix(in srgb, var(--tint) 32%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  input:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  input:disabled,
  input:disabled + .text {
    cursor: default;
    opacity: 0.5;
  }
  .text {
    display: grid;
    gap: 1px;
  }
  .label {
    font-size: var(--fs-md);
    line-height: 1.4;
    color: var(--text);
  }
  .radio:has(.desc) .label {
    font-weight: var(--fw-medium);
  }
  .desc {
    font-size: var(--fs-sm);
    line-height: 1.45;
    color: var(--text-3);
  }
  @media (prefers-reduced-motion: reduce) {
    input {
      transition:
        background-color var(--motion-quick) ease,
        border-color var(--motion-quick) ease;
    }
  }
</style>
