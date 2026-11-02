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
   * Arrow keys move through the list, Enter picks or submits, Escape closes. Suggestions drop in
   * on a frosted glass list.
   *
   *   <Autocomplete label="Search places" {suggestions} onquery={lookup} onsearch={go} />
   */
  import Button from '../atoms/Button.svelte';
  import Swatch from '../atoms/Swatch.svelte';
  import SearchField from './SearchField.svelte';

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
  /** Suggestions as of the last keystroke; a fresh list reopens the popup. */
  let lastSuggestions: S[] | undefined;

  $effect(() => {
    if (suggestions !== lastSuggestions) {
      lastSuggestions = suggestions;
      active = -1;
      open = suggestions.length > 0 && value.trim().length >= minChars && focused;
    }
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
  <div class="box">
    <SearchField
      bind:value
      {label}
      {placeholder}
      size="lg"
      role="combobox"
      aria-expanded={open}
      aria-controls="{id}-list"
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
      <ul class="list" id="{id}-list" role="listbox" aria-label={label}>
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
    disabled={loading || !value.trim()}
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
    position: absolute;
    top: calc(100% + var(--space-2));
    left: 0;
    right: 0;
    z-index: var(--z-dropdown);
    max-height: 22rem;
    overflow-y: auto;
    margin: 0;
    padding: var(--space-1);
    list-style: none;
    background: var(--pill-tint), var(--glass-strong);
    border: 0.75px solid var(--pill-border);
    border-radius: var(--radius-pop);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    transform-origin: top center;
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
  .option:hover {
    background: var(--accent-faint);
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
