<script lang="ts" module>
  export interface Suggestion {
    label: string;
    /** Right-aligned grey detail, e.g. "Airport · 3 terminals". */
    meta?: string | undefined;
    /** Colour dot in front of the label. */
    color?: string | undefined;
  }
</script>

<script lang="ts" generics="S extends Suggestion">
  /**
   * Autocomplete molecule — a location-style search: one big field with a suggestion list (ARIA
   * combobox) and a primary button. The component does no fetching: it calls `onquery`
   * (debounced, from `minChars` on) and shows whatever `suggestions` the app passes back.
   * Arrow keys move through the list, Enter picks or submits, Escape closes. Suggestions grow out
   * of the field on a frosted glass list (in the top layer, flipping above when there is no room
   * below). While `loading` the button shows a spinner but keeps focus.
   *
   *   <Autocomplete label="Search places" {suggestions} onquery={lookup} onsearch={go} />
   */
  import Button from '../atoms/Button.svelte';
  import Swatch from '../atoms/Swatch.svelte';
  import SearchField from './SearchField.svelte';
  import { anchorTo } from './anchor';

  interface Props {
    value?: string;
    suggestions?: S[];
    label: string;
    placeholder?: string | undefined;
    buttonLabel?: string;
    loading?: boolean;
    minChars?: number;
    debounce?: number;
    onquery?: ((term: string) => void) | undefined;
    /** A suggestion was picked (`chosen`) or free text submitted (`chosen` is null). */
    onsearch: (term: string, chosen: S | null) => void;
  }

  let {
    value = $bindable(''),
    suggestions = [],
    label,
    placeholder,
    buttonLabel = 'Search',
    loading = false,
    minChars = 2,
    debounce = 150,
    onquery,
    onsearch,
  }: Props = $props();

  const id = $props.id();
  let active = $state(-1);
  let open = $state(false);
  let focused = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  let box: HTMLDivElement;
  let list = $state<HTMLUListElement>();
  /** Suggestions as of the last keystroke; a fresh list reopens the popup. */
  let lastSuggestions: S[] | undefined;

  $effect(() => {
    if (suggestions !== lastSuggestions) {
      lastSuggestions = suggestions;
      active = -1;
      open = suggestions.length > 0 && value.trim().length >= minChars && focused;
    }
  });

  $effect(() => {
    if (!open || !list) return;
    return anchorTo(list, box, { placement: 'bottom-start' });
  });

  function oninput() {
    clearTimeout(timer);
    const term = value.trim();
    if (term.length < minChars) {
      open = false;
      return;
    }
    timer = setTimeout(() => onquery?.(term), debounce);
  }

  function choose(suggestion: S) {
    value = suggestion.label;
    open = false;
    onsearch(suggestion.label, suggestion);
  }

  function submit() {
    // Busy, or nothing typed: the button stays focused but does nothing.
    if (loading || !value.trim()) return;
    open = false;
    const term = value.trim();
    if (term) onsearch(term, null);
  }

  function onkeydown(event: KeyboardEvent) {
    const count = suggestions.length;
    if (event.key === 'ArrowDown' && count) {
      event.preventDefault();
      open = true;
      active = (active + 1) % count;
    } else if (event.key === 'ArrowUp' && count) {
      event.preventDefault();
      open = true;
      active = active <= 0 ? count - 1 : active - 1;
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const picked = open && active >= 0 ? suggestions[active] : undefined;
      if (picked) choose(picked);
      else submit();
    } else if (event.key === 'Escape') {
      open = false;
    }
  }
</script>

<div class="row">
  <div class="box" bind:this={box}>
    <SearchField
      bind:value
      {label}
      {placeholder}
      size="lg"
      role="combobox"
      aria-expanded={open}
      aria-controls={open ? `${id}-list` : undefined}
      aria-autocomplete="list"
      aria-activedescendant={open && active >= 0 ? `${id}-opt-${active}` : undefined}
      {oninput}
      {onkeydown}
      onfocus={() => {
        focused = true;
        open = suggestions.length > 0 && value.trim().length >= minChars;
      }}
      onblur={() => {
        focused = false;
        // Let a pointer pick land before the list goes away.
        setTimeout(() => (open = false), 120);
      }}
    />
    {#if open}
      <ul
        bind:this={list}
        class="list"
        id="{id}-list"
        role="listbox"
        aria-label={label}
        popover="manual"
      >
        {#each suggestions as suggestion, index (index)}
          <li
            id="{id}-opt-{index}"
            class="option"
            role="option"
            aria-selected={index === active}
            onmousedown={(event) => {
              event.preventDefault();
              choose(suggestion);
            }}
          >
            {#if suggestion.color}<Swatch color={suggestion.color} />{/if}
            <span class="label">{suggestion.label}</span>
            {#if suggestion.meta}<span class="meta">{suggestion.meta}</span>{/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <Button
    variant="primary"
    size="xl"
    label={buttonLabel}
    busy={loading}
    aria-disabled={!value.trim() ? 'true' : undefined}
    onclick={submit}
  />
</div>

<style>
  .row {
    display: flex;
    gap: var(--space-2);
    align-items: center;
  }
  .box {
    position: relative;
    flex: 1;
    min-width: 0;
  }
  .list {
    /* Placed by anchorTo (fixed, in the top layer), which also sets the transform-origin. */
    position: fixed;
    inset: auto;
    z-index: var(--z-popover);
    width: var(--anchor-width, 100%);
    max-height: min(22rem, var(--anchor-room, 22rem));
    overflow-y: auto;
    overscroll-behavior: contain;
    margin: 0;
    color: var(--text);
    padding: var(--space-1);
    list-style: none;
    background: var(--pill-tint), var(--glass-strong);
    border: 0.75px solid var(--pill-border);
    border-radius: var(--radius-pop);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .option {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-lg);
    padding: 0 var(--space-3);
    border-radius: var(--radius-lg);
    cursor: pointer;
    font-size: var(--fs-base);
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  /* Pointing is neutral; the accent marks the active suggestion. */
  .option:hover {
    background: var(--fill-hover);
  }
  .option[aria-selected='true'] {
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: var(--fw-medium);
  }
  .meta {
    color: var(--text-3);
    font-size: var(--fs-sm);
    white-space: nowrap;
  }
  @media (prefers-reduced-transparency: reduce) {
    .list {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--tooltip-bg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .list {
      animation: none;
    }
  }
</style>
