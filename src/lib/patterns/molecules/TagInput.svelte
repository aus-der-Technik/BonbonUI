<script lang="ts">
  /**
   * TagInput molecule — edits a list of short strings as tags: each tag has an ×, typing and
   * Enter (or a separator, "," by default) adds one, Backspace in the empty field removes the
   * last. Pasting "a, b, c" adds three. Duplicates are ignored unless `unique` is off.
   *
   * Keys it does not use itself — Enter with nothing typed, Escape, Tab — go to `onkeydown`, so a
   * host can save, cancel or move on (EditableGrid does). Tab adds the pending text first.
   * `onblur` fires once focus leaves the whole field, not when it moves between its own parts.
   *
   *   <TagInput label="Topics" placeholder="Add a topic" bind:value={topics} />
   */
  import { untrack } from 'svelte';
  import Tag from '../atoms/Tag.svelte';

  interface Props {
    /** The tags (bindable). */
    value?: string[];
    /** Accessible name of the text field. */
    label: string;
    placeholder?: string | undefined;
    removeLabel?: string;
    /** Characters that end a tag as it is typed, besides Enter. */
    separators?: string[];
    unique?: boolean;
    disabled?: boolean | undefined;
    autofocus?: boolean;
    maxWidth?: string;
    onchange?: ((value: string[]) => void) | undefined;
    onkeydown?: ((event: KeyboardEvent) => void) | undefined;
    onblur?: (() => void) | undefined;
  }

  let {
    value = $bindable([]),
    label,
    placeholder,
    removeLabel = 'Remove',
    separators = [','],
    unique = true,
    disabled = false,
    autofocus = false,
    maxWidth = '16rem',
    onchange,
    onkeydown,
    onblur,
  }: Props = $props();

  let text = $state('');
  let field = $state<HTMLInputElement>();
  let root = $state<HTMLDivElement>();

  function set(next: string[]) {
    value = next;
    onchange?.(next);
  }

  /** Adds every non-empty piece of `raw`; returns whether anything was added. */
  function add(...raw: string[]): boolean {
    const next = [...value];
    for (const piece of raw) {
      const tag = piece.trim();
      if (!tag || (unique && next.includes(tag))) continue;
      next.push(tag);
    }
    if (next.length === value.length) return false;
    set(next);
    return true;
  }

  function removeAt(index: number) {
    set(value.filter((_, i) => i !== index));
    // The × that was clicked is gone; keep typing where the user was.
    field?.focus();
  }

  function split(raw: string): string[] {
    return separators.reduce<string[]>((parts, sep) => parts.flatMap((p) => p.split(sep)), [raw]);
  }

  function oninput(event: Event & { currentTarget: HTMLInputElement }) {
    const parts = split(event.currentTarget.value);
    // Everything before the last separator is finished; the rest is still being typed.
    const pending = parts.pop() ?? '';
    if (parts.length) add(...parts);
    text = pending;
    event.currentTarget.value = pending;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.isComposing && text.trim()) {
      event.preventDefault();
      add(text);
      text = '';
      return;
    }
    if (event.key === 'Backspace' && text === '' && value.length) {
      event.preventDefault();
      set(value.slice(0, -1));
      return;
    }
    if (event.key === 'Tab' && text.trim()) {
      add(text);
      text = '';
    }
    onkeydown?.(event);
  }

  /**
   * Keeps focus in the text field while a tag's × is pressed. Safari does not focus a button on
   * click, so focus would leave the field for the page, a host editor would close on that blur, and
   * the click would land on nothing.
   */
  function keepFocus(event: MouseEvent) {
    if (event.target !== field) event.preventDefault();
  }

  function handleFocusout() {
    // Deferred: removing a tag moves focus from its × back to the field, and Chrome reports the
    // removed button's blur with no related target. A field already removed — its host saved or
    // cancelled — has nothing left to report.
    setTimeout(() => {
      if (!root?.isConnected || root.contains(document.activeElement)) return;
      if (text.trim()) {
        add(text);
        text = '';
      }
      onblur?.();
    });
  }

  $effect(() => {
    if (autofocus) untrack(() => field?.focus());
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
  class="tag-input"
  class:disabled
  bind:this={root}
  onfocusout={handleFocusout}
  onmousedown={keepFocus}
  onclick={(event) => event.target === event.currentTarget && field?.focus()}
>
  {#each value as tag, index (`${index}:${tag}`)}
    <Tag
      label={tag}
      {maxWidth}
      title={tag}
      {removeLabel}
      onremove={disabled ? undefined : () => removeAt(index)}
    />
  {/each}
  <input
    bind:this={field}
    class="field"
    type="text"
    aria-label={label}
    placeholder={value.length ? undefined : placeholder}
    value={text}
    {disabled}
    {oninput}
    onkeydown={handleKeydown}
  />
</div>

<style>
  .tag-input {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1);
    min-height: var(--control-md);
    padding: var(--space-1) var(--space-2);
    border: 1px solid var(--input-border);
    border-radius: var(--radius-md);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
    color: var(--text);
    cursor: text;
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out);
  }
  .tag-input:hover:not(:focus-within):not(.disabled) {
    border-color: var(--accent-border);
  }
  .tag-input:focus-within {
    border-color: var(--accent);
    box-shadow: var(--focus-halo), var(--glass-inset);
  }
  .tag-input.disabled {
    opacity: 0.6;
    cursor: default;
  }
  .field {
    flex: 1;
    min-width: 6ch;
    border: 0;
    outline: none;
    padding: 0.15rem 0.2rem;
    background: none;
    color: inherit;
    font: inherit;
    font-size: var(--fs-sm);
  }
  .field::placeholder {
    color: var(--text-3);
  }
  @media (prefers-reduced-motion: reduce) {
    .tag-input {
      transition: none;
    }
  }
</style>
