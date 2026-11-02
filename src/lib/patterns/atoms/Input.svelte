<script lang="ts">
  /**
   * Input atom — a single-line text field on the translucent input surface. Focus draws an
   * accent rim with a soft halo; `invalid` turns it red with a small polite head-shake.
   *
   *   <Input type="email" placeholder="name@example.com" bind:value={email} />
   */
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'class' | 'value'> {
    value?: string | number | null | undefined;
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
    class?: string;
    element?: HTMLInputElement | undefined;
  }

  let {
    value = $bindable(''),
    size = 'md',
    invalid = false,
    type = 'text',
    class: extraClass = '',
    element = $bindable(),
    ...rest
  }: Props = $props();
</script>

<input
  bind:this={element}
  bind:value
  {type}
  class="input input--{size} {extraClass}"
  aria-invalid={invalid ? 'true' : undefined}
  {...rest}
/>

<style>
  .input {
    width: 100%;
    min-width: 0;
    border: 1px solid var(--input-border);
    background: var(--input-bg);
    color: var(--text);
    font: inherit;
    box-shadow: inset 0 1px 2px rgba(12, 12, 22, 0.05);
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out);
  }
  .input:hover:not(:disabled):not(:focus) {
    border-color: var(--fill-off);
  }
  .input::placeholder {
    color: var(--text-3);
  }
  .input:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--glass-strong);
    box-shadow: var(--focus-halo);
  }
  /* Polite "nope": a small head-shake the moment the value turns invalid (plus the message). */
  .input[aria-invalid='true'] {
    border-color: var(--danger);
    animation: bb-nope var(--motion-slow) var(--ease-out);
  }
  @media (prefers-reduced-motion: reduce) {
    .input[aria-invalid='true'] {
      animation: none;
    }
  }
  .input[aria-invalid='true']:focus {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--danger) 20%, transparent);
  }
  .input:disabled {
    opacity: 0.6;
  }
  .input--sm {
    height: var(--control-md);
    padding: 0 var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--fs-md);
  }
  .input--md {
    height: calc(40px * var(--density));
    padding: 0 0.85rem;
    border-radius: var(--radius-lg);
    font-size: var(--fs-base);
  }
  .input--lg {
    height: var(--control-xl);
    padding: 0 var(--space-4);
    border-radius: var(--radius-xl);
    font-size: var(--fs-lg);
  }
</style>
