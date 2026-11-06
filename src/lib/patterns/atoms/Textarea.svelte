<script lang="ts">
  /**
   * Textarea atom — multi-line text.
   * - `counter` shows "12 / 2000" under the field: against `maxlength` (hard stop) or `limit`
   *   (soft: typing past it is allowed, the counter turns red and the field invalid).
   * - `autogrow` grows with the content up to `maxRows`.
   * - `variant="plain"` drops border and background to fill a pane (e.g. a SplitPane).
   * - `mono` for prompts, templates and code.
   *
   *   <Textarea placeholder="What should we improve?" maxlength={2000} counter bind:value />
   */
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLTextareaAttributes, 'class' | 'value'> {
    value?: string;
    counter?: boolean;
    limit?: number | undefined;
    invalid?: boolean;
    autogrow?: boolean;
    maxRows?: number;
    mono?: boolean;
    variant?: 'field' | 'plain';
    class?: string;
  }

  let {
    value = $bindable(''),
    counter = false,
    limit,
    invalid = false,
    autogrow = false,
    maxRows = 16,
    mono = false,
    variant = 'field',
    rows = 4,
    maxlength,
    class: extraClass = '',
    ...rest
  }: Props = $props();

  let field: HTMLTextAreaElement;
  const max = $derived(maxlength ?? limit);
  const over = $derived(limit != null && value.length > limit);

  $effect(() => {
    void value;
    if (!autogrow || !field) return;
    const line = parseFloat(getComputedStyle(field).lineHeight) || 22;
    field.style.height = 'auto';
    field.style.height = `${Math.min(field.scrollHeight + 2, maxRows * line + 24)}px`;
  });
</script>

<div class="wrap wrap--{variant} {extraClass}">
  <textarea
    bind:this={field}
    bind:value
    {rows}
    {maxlength}
    class:mono
    class:autogrow
    aria-invalid={invalid || over ? 'true' : undefined}
    {...rest}></textarea>
  {#if counter && max != null}
    <span class="counter" class:over aria-live="polite"
      >{value.length.toLocaleString('en')} / {max.toLocaleString('en')}</span
    >
  {/if}
</div>

<style>
  .wrap {
    display: grid;
  }
  textarea {
    width: 100%;
    resize: vertical;
    padding: 0.6rem var(--space-3);
    border-radius: var(--radius-lg);
    border: 1px solid var(--input-border);
    background: var(--input-bg);
    font: inherit;
    font-size: var(--fs-base);
    color: var(--text);
    box-shadow: inset 0 1px 2px rgba(12, 12, 22, 0.05);
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out);
  }
  textarea:hover:not(:disabled):not(:focus) {
    border-color: var(--fill-off);
  }
  textarea::placeholder {
    color: var(--text-3);
  }
  textarea:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--glass-strong);
    box-shadow: var(--focus-halo);
  }
  textarea[aria-invalid='true'] {
    border-color: var(--danger);
    animation: bb-nope var(--motion-slow) var(--ease-out);
  }
  @media (prefers-reduced-motion: reduce) {
    textarea[aria-invalid='true'] {
      animation: none;
    }
  }
  textarea[aria-invalid='true']:focus {
    box-shadow: var(--focus-halo-danger);
  }
  .mono {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    line-height: 1.55;
  }
  /* Plain sets a reading size; mono (code, prompts) keeps its own. */
  .wrap--plain textarea.mono {
    font-size: var(--fs-sm);
  }
  .autogrow {
    resize: none;
    overflow-y: auto;
  }
  .wrap--plain {
    flex: 1;
    grid-template-rows: 1fr auto;
  }
  .wrap--plain textarea {
    height: 100%;
    padding: var(--space-4);
    border: 0;
    border-radius: 0;
    background: transparent;
    resize: none;
    font-size: var(--fs-lg);
  }
  .wrap--plain textarea:focus {
    background: transparent;
    box-shadow: none;
  }
  .wrap--plain .counter {
    padding: 0 var(--space-4) var(--space-2);
  }
  .counter {
    justify-self: end;
    font-size: var(--fs-xs);
    color: var(--text-3);
    margin-top: var(--space-1);
    font-variant-numeric: tabular-nums;
  }
  .over {
    color: var(--danger);
    font-weight: var(--fw-semibold);
  }
</style>
