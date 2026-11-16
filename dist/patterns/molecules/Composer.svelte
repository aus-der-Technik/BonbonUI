<script lang="ts">
  /**
   * Composer molecule — a textarea with its send button for prompts, questions and queries.
   * `submitOn="enter"`: Enter sends, Shift+Enter breaks the line (chat style).
   * `submitOn="mod-enter"`: Cmd/Ctrl+Enter sends, Enter breaks the line (long text).
   * Grows with its content up to `maxRows`; shows a key hint next to the button. The field and its
   * button share one glass box that glows in the accent while focused.
   *
   *   <Composer label="Message" placeholder="Write a message…" icon="send" onsubmit={send} />
   */
  import Button from '../atoms/Button.svelte';
  import Kbd from '../atoms/Kbd.svelte';
  import VisuallyHidden from '../atoms/VisuallyHidden.svelte';
  import type { IconName } from '../atoms/icons';

  interface Props {
    value?: string;
    label: string;
    placeholder?: string | undefined;
    buttonLabel?: string;
    busyLabel?: string;
    icon?: IconName;
    busy?: boolean;
    disabled?: boolean;
    submitOn?: 'enter' | 'mod-enter';
    minRows?: number;
    maxRows?: number;
    /** Below this many trimmed characters the button stays disabled. */
    minLength?: number;
    maxlength?: number | undefined;
    hint?: boolean;
    /** Hint text after the send keys. */
    sendHint?: string;
    /** Hint text after Shift+Enter (`submitOn="enter"` only). */
    newlineHint?: string;
    /** Key caps of the hint; `mod` defaults to ⌘ on Apple devices, "Ctrl" elsewhere. */
    keyLabels?: Partial<Record<'mod' | 'enter' | 'shift', string>>;
    layout?: 'stacked' | 'inline';
    /** Look of the send button: `soft` for a reply box on a screen whose primary is elsewhere. */
    sendVariant?: 'primary' | 'soft' | 'tinted';
    onsubmit: (value: string) => void;
  }

  let {
    value = $bindable(''),
    label,
    placeholder,
    buttonLabel = 'Send',
    busyLabel = 'Working…',
    icon,
    busy = false,
    disabled = false,
    submitOn = 'enter',
    minRows = 2,
    maxRows = 10,
    minLength = 1,
    maxlength,
    hint = true,
    sendHint = 'to send',
    newlineHint = 'for a new line',
    keyLabels = {},
    layout = 'stacked',
    sendVariant = 'primary',
    onsubmit,
  }: Props = $props();

  const id = $props.id();
  let field: HTMLTextAreaElement;

  const ready = $derived(!busy && !disabled && value.trim().length >= minLength);
  const mac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
  const keys = $derived({ mod: mac ? '⌘' : 'Ctrl', enter: 'Enter', shift: 'Shift', ...keyLabels });

  function submit() {
    if (ready) onsubmit(value.trim());
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter' || event.isComposing) return;
    const mod = event.metaKey || event.ctrlKey;
    if (submitOn === 'enter' ? !event.shiftKey : mod) {
      event.preventDefault();
      submit();
    }
  }

  // Auto-grow: measure the content, clamp between min and max rows.
  $effect(() => {
    void value;
    if (!field) return;
    const line = parseFloat(getComputedStyle(field).lineHeight) || 22;
    const pad = field.offsetHeight - field.clientHeight + 16;
    field.style.height = 'auto';
    const wanted = Math.min(
      Math.max(field.scrollHeight, minRows * line + pad),
      maxRows * line + pad,
    );
    field.style.height = `${wanted}px`;
  });
</script>

<div class="composer composer--{layout}" class:disabled>
  <VisuallyHidden><label for={id}>{label}</label></VisuallyHidden>
  <textarea
    bind:this={field}
    {id}
    bind:value
    {placeholder}
    {maxlength}
    rows={minRows}
    {disabled}
    aria-describedby={hint ? `${id}-hint` : undefined}
    {onkeydown}></textarea>
  <div class="bar">
    {#if hint}
      <span class="hint" id="{id}-hint">
        {#if submitOn === 'enter'}
          <Kbd>{keys.enter}</Kbd>
          {sendHint} · <Kbd>{keys.shift}</Kbd>+<Kbd>{keys.enter}</Kbd>
          {newlineHint}
        {:else}
          <Kbd>{keys.mod}</Kbd>+<Kbd>{keys.enter}</Kbd> {sendHint}
        {/if}
      </span>
    {/if}
    <Button
      variant={sendVariant}
      shape="pill"
      size={layout === 'inline' ? 'lg' : 'md'}
      {icon}
      label={busy ? busyLabel : buttonLabel}
      {busy}
      {disabled}
      aria-disabled={!ready && !busy && !disabled ? 'true' : undefined}
      onclick={submit}
    />
  </div>
</div>

<style>
  .composer {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-1);
    border-radius: var(--radius-xl);
    border: 1px solid var(--input-border);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out);
  }
  .composer:focus-within {
    border-color: var(--accent);
    box-shadow: var(--focus-halo), var(--glass-inset);
  }
  .composer.disabled {
    opacity: var(--disabled-opacity);
  }
  .composer--inline {
    grid-template-columns: 1fr auto;
    align-items: end;
  }
  .composer--inline .bar {
    display: contents;
  }
  .composer--inline .hint {
    display: none;
  }
  textarea {
    width: 100%;
    resize: none;
    padding: var(--space-2) var(--space-3);
    border: 0;
    border-radius: var(--radius-lg);
    background: none;
    font: inherit;
    font-size: var(--fs-base);
    line-height: 1.5;
    color: var(--text);
  }
  textarea::placeholder {
    color: var(--text-3);
  }
  textarea:focus {
    outline: none;
  }
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
    padding: 0 0 0 var(--space-3);
  }
  .bar :global(.btn) {
    margin-left: auto;
  }
  .hint {
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  @media (prefers-reduced-motion: reduce) {
    .composer {
      transition: none;
    }
  }
</style>
