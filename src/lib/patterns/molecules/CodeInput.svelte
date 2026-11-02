<script lang="ts">
  /**
   * CodeInput molecule — a one-time or device code in separate boxes ("ABCD-EFGH"). Typing
   * moves on, Backspace moves back, arrows navigate, pasting fills every box. Letters are
   * upper-cased; `numeric` allows digits only and brings up the number pad. `oncomplete` fires
   * once every box is filled. A hidden `name` input carries the joined value for plain forms.
   *
   *   <CodeInput label="Verification code" numeric length={6} oncomplete={verify} />
   */
  interface Props {
    length?: number;
    value?: string;
    label: string;
    numeric?: boolean;
    /** Box index after which a dash is drawn (e.g. 4 for "ABCD-EFGH"). */
    groupAfter?: number | undefined;
    name?: string | undefined;
    disabled?: boolean;
    invalid?: boolean;
    autofocus?: boolean;
    /** Accessible name of one box. */
    boxLabel?: (label: string, position: number, length: number) => string;
    oncomplete?: ((value: string) => void) | undefined;
  }

  let {
    length = 6,
    value = $bindable(''),
    label,
    numeric = false,
    groupAfter,
    name,
    disabled = false,
    invalid = false,
    autofocus = false,
    boxLabel = (name, position, total) => `${name}, character ${position} of ${total}`,
    oncomplete,
  }: Props = $props();

  let boxes: HTMLInputElement[] = $state([]);

  const chars = $derived(Array.from({ length }, (_, i) => value[i] ?? ''));
  const allowed = $derived(numeric ? /[0-9]/ : /[0-9A-Z]/);

  function clean(text: string): string {
    return [...text.toUpperCase()].filter((c) => allowed.test(c)).join('');
  }

  function write(at: number, text: string) {
    const next = [...chars];
    for (const [offset, char] of [...text].entries()) {
      if (at + offset < length) next[at + offset] = char;
    }
    value = next.join('').slice(0, length);
    const focus = Math.min(at + text.length, length - 1);
    boxes[focus]?.focus();
    if (value.length === length && !next.includes('')) oncomplete?.(value);
  }

  function oninput(event: Event, at: number) {
    const target = event.currentTarget as HTMLInputElement;
    const text = clean(target.value);
    target.value = chars[at] ?? '';
    if (text) write(at, text.slice(-1));
  }

  function onpaste(event: ClipboardEvent, at: number) {
    event.preventDefault();
    const text = clean(event.clipboardData?.getData('text') ?? '');
    if (text) write(text.length >= length ? 0 : at, text);
  }

  function onkeydown(event: KeyboardEvent, at: number) {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const next = [...chars];
      const target = next[at] ? at : Math.max(0, at - 1);
      next[target] = '';
      value = next.join('');
      boxes[target]?.focus();
    } else if (event.key === 'ArrowLeft' && at > 0) {
      event.preventDefault();
      boxes[at - 1]?.focus();
    } else if (event.key === 'ArrowRight' && at < length - 1) {
      event.preventDefault();
      boxes[at + 1]?.focus();
    }
  }

  $effect(() => {
    if (autofocus) boxes[Math.min(value.length, length - 1)]?.focus();
  });
</script>

<div class="code" role="group" aria-label={label} style:--boxes={length}>
  {#each chars as char, index (index)}
    {#if groupAfter && index === groupAfter}<span class="dash" aria-hidden="true">–</span>{/if}
    <input
      bind:this={boxes[index]}
      class="box"
      class:filled={!!char}
      value={char}
      aria-label={boxLabel(label, index + 1, length)}
      aria-invalid={invalid ? 'true' : undefined}
      inputmode={numeric ? 'numeric' : 'text'}
      autocomplete={index === 0 ? 'one-time-code' : 'off'}
      autocapitalize="characters"
      spellcheck="false"
      maxlength="2"
      {disabled}
      oninput={(event) => oninput(event, index)}
      onpaste={(event) => onpaste(event, index)}
      onkeydown={(event) => onkeydown(event, index)}
      onfocus={(event) => event.currentTarget.select()}
    />
  {/each}
  {#if name}<input type="hidden" {name} {value} />{/if}
</div>

<style>
  .code {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    min-width: 0;
    max-width: calc(var(--boxes) * 3.25rem);
  }
  .box {
    flex: 1 1 0;
    /* An explicit zero width keeps the inputs' intrinsic size out of the min-content width,
       so eight boxes shrink on a phone instead of pushing their card off-screen. */
    width: 0;
    min-width: 1.5rem;
    max-width: 2.75rem;
    height: calc(var(--control-xl) + 0.25rem);
    padding: 0;
    border-radius: var(--radius-lg);
    border: 1px solid var(--input-border);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
    text-align: center;
    font-family: var(--font-mono);
    font-size: 1.35rem;
    font-weight: var(--fw-semibold);
    color: var(--text);
    caret-color: var(--accent);
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-spring);
  }
  .box.filled {
    border-color: var(--accent-border);
    background: var(--accent-faint);
  }
  .box:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: var(--focus-halo);
    transform: translateY(-1px) scale(1.04);
  }
  .box[aria-invalid='true'] {
    border-color: var(--danger);
    background: var(--tint-danger);
  }
  .box[aria-invalid='true']:focus {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--danger) 20%, transparent);
  }
  .box:disabled {
    opacity: 0.5;
  }
  .dash {
    color: var(--text-3);
    font-size: 1.2rem;
  }
  @media (max-width: 420px) {
    .code {
      gap: var(--space-1);
    }
    .box {
      height: var(--control-xl);
      font-size: 1.1rem;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .box {
      transition: none;
    }
    .box:focus {
      transform: none;
    }
  }
</style>
