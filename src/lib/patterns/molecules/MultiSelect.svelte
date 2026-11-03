<script lang="ts" module>
  export interface MultiOption {
    value: string;
    label: string;
    /** Stars drawn in place of the label, for star ratings (the label is still spoken). */
    stars?: number;
  }
  export interface MultiGroup {
    label?: string;
    options: MultiOption[];
  }
</script>

<script lang="ts">
  /**
   * MultiSelect molecule — a dropdown of checkboxes (e.g. source and rating
   * filters). A group heading toggles its whole group; `onchange` receives the selection in
   * option order. Closes on Escape, outside click and focus leaving. The list grows out of the
   * trigger as a frosted glass popover (in the top layer, flipping above when there is no room
   * below); the trigger glows in the accent while open.
   *
   *   <MultiSelect label="Status" groups={[{ options }]} {value} {onchange} />
   */
  import { tick } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import Stars from '../atoms/Stars.svelte';
  import VisuallyHidden from '../atoms/VisuallyHidden.svelte';
  import { anchorTo } from './anchor';

  interface Props {
    label: string;
    groups: MultiGroup[];
    value: string[];
    /** Summary when nothing is selected, e.g. "All systems". */
    allLabel?: string;
    /** Plural noun for "3 systems". */
    unit?: string;
    clearLabel?: string;
    emptyLabel?: string;
    onchange: (value: string[]) => void;
  }

  let {
    label,
    groups,
    value,
    allLabel = 'All',
    unit = 'selected',
    clearLabel = 'Clear',
    emptyLabel = 'Nothing to pick from yet.',
    onchange,
  }: Props = $props();

  const id = $props.id();
  let open = $state(false);
  let root: HTMLDivElement;
  let button: HTMLButtonElement;
  let pop = $state<HTMLDivElement>();

  const options = $derived(groups.flatMap((group) => group.options));
  const selected = $derived(new Set(value));
  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;
  const summary = $derived(
    !value.length
      ? allLabel
      : value.length === 1
        ? labelOf(value[0] ?? '')
        : `${value.length} ${unit}`,
  );

  function emit(next: Set<string>) {
    onchange(options.map((o) => o.value).filter((v) => next.has(v)));
  }

  function toggle(optionValue: string, checked: boolean) {
    // A throwaway copy handed to `emit`, not state: no reactivity needed.
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const next = new Set(selected);
    if (checked) next.add(optionValue);
    else next.delete(optionValue);
    emit(next);
  }

  function toggleGroup(group: MultiGroup) {
    // A throwaway copy handed to `emit`, not state: no reactivity needed.
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const next = new Set(selected);
    const all = group.options.every((o) => next.has(o.value));
    for (const o of group.options) {
      if (all) next.delete(o.value);
      else next.add(o.value);
    }
    emit(next);
  }

  async function setOpen(next: boolean) {
    open = next;
    if (next) {
      await tick();
      pop?.querySelector<HTMLElement>('input, button')?.focus();
    }
  }

  $effect(() => {
    if (!open || !pop) return;
    return anchorTo(pop, button, { placement: 'bottom-start' });
  });

  function onDocumentPointerDown(event: PointerEvent) {
    if (open && !root.contains(event.target as Node)) open = false;
  }

  function onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (open && next && !root.contains(next)) open = false;
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && open) {
      open = false;
      button.focus();
    }
  }
</script>

<svelte:document
  onpointerdown={onDocumentPointerDown}
  onfocusin={(event) => {
    // Focus that left the window (relatedTarget null) and came back elsewhere.
    if (open && !root.contains(event.target as Node)) open = false;
  }}
/>

<div class="field">
  <span class="label" id="{id}-label">{label}</span>
  <div
    class="multi"
    bind:this={root}
    onfocusout={onFocusOut}
    onkeydown={onKeydown}
    role="presentation"
  >
    <button
      bind:this={button}
      type="button"
      class="trigger"
      aria-haspopup="true"
      aria-expanded={open}
      aria-labelledby="{id}-label {id}-summary"
      title={value.length ? value.map(labelOf).join(', ') : allLabel}
      onclick={() => setOpen(!open)}
    >
      <span id="{id}-summary" class="summary" class:some={value.length > 0}>{summary}</span>
      <Icon name="chevron-down" size={12} class="chev" />
    </button>
    {#if open}
      <div class="pop" role="group" aria-labelledby="{id}-label" popover="manual" bind:this={pop}>
        {#if !options.length}
          <div class="empty">{emptyLabel}</div>
        {:else}
          {#each groups as group, index (group.label ?? index)}
            <div class="group">
              {#if group.label}
                <button type="button" class="group-head" onclick={() => toggleGroup(group)}>
                  {group.label}
                </button>
              {/if}
              {#each group.options as option (option.value)}
                <label class="option" class:checked={selected.has(option.value)}>
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selected.has(option.value)}
                    onchange={(event) => toggle(option.value, event.currentTarget.checked)}
                  />
                  {#if option.stars}
                    <Stars value={option.stars} label="" />
                    <VisuallyHidden>{option.label}</VisuallyHidden>
                  {:else}
                    {option.label}
                  {/if}
                </label>
              {/each}
            </div>
          {/each}
          <div class="foot">
            <button
              type="button"
              disabled={!value.length}
              onclick={() => {
                emit(new Set());
                button.focus();
              }}>{clearLabel}</button
            >
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .field {
    display: grid;
    gap: var(--space-1);
  }
  .label {
    padding-left: 0.1rem;
    font-size: var(--fs-xs);
    color: var(--text-2);
    font-weight: var(--fw-semibold);
  }
  .multi {
    position: relative;
    /* Hug the trigger, so the panel's min-width matches it rather than the whole column. */
    justify-self: start;
    max-width: 100%;
  }
  .trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    min-width: 11rem;
    max-width: 18rem;
    height: var(--control-md);
    padding: 0 var(--space-3);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-strong);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
    cursor: pointer;
    font: inherit;
    font-size: var(--fs-md);
    color: var(--text);
    text-align: left;
    transition:
      border-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out);
  }
  .trigger:hover {
    border-color: color-mix(in srgb, var(--text) 22%, transparent);
  }
  .summary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .summary.some {
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
  }
  .trigger :global(.chev) {
    flex-shrink: 0;
    color: var(--text-3);
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .trigger[aria-expanded='true'] :global(.chev) {
    transform: rotate(180deg);
  }
  .trigger[aria-expanded='true'],
  .trigger:focus-visible {
    border-color: var(--accent);
    box-shadow: var(--focus-halo);
    outline: none;
  }
  .trigger:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .pop {
    /* Placed by anchorTo (fixed, in the top layer), which also sets the transform-origin. */
    position: fixed;
    inset: auto;
    margin: 0;
    z-index: var(--z-popover);
    min-width: var(--anchor-width, 11rem);
    width: max-content;
    max-width: min(22rem, calc(100vw - 2rem));
    max-height: min(22rem, var(--anchor-room, 22rem));
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: var(--space-1);
    color: var(--text);
    background: var(--pill-tint), var(--glass-strong);
    border: 0.75px solid var(--pill-border);
    border-radius: var(--radius-pop);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .group + .group {
    border-top: 1px solid var(--border-strong);
    margin-top: var(--space-1);
    padding-top: var(--space-1);
  }
  .group-head {
    display: block;
    width: 100%;
    border: 0;
    background: none;
    text-align: left;
    cursor: pointer;
    padding: var(--space-2) var(--space-2) var(--space-1);
    border-radius: var(--radius-lg);
    font: inherit;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .group-head:hover {
    color: var(--text);
  }
  .group-head:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -2px;
  }
  .option {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-sm);
    padding: 0 var(--space-2);
    border-radius: var(--radius-lg);
    cursor: pointer;
    font-size: var(--fs-md);
    color: var(--text);
    white-space: nowrap;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  /* Pointing is neutral; the accent marks what is chosen. */
  .option:hover {
    background: var(--fill-hover);
  }
  .option.checked {
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-weight: var(--fw-medium);
  }
  .option input {
    accent-color: var(--accent);
    width: 16px;
    height: 16px;
  }
  .foot {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid var(--border-strong);
    margin-top: var(--space-1);
    padding-top: var(--space-1);
  }
  .foot button {
    border: 0;
    background: none;
    cursor: pointer;
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--accent-ink);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-pill);
  }
  .foot button:hover:not(:disabled) {
    background: var(--fill-hover);
  }
  .foot button:disabled {
    opacity: var(--disabled-opacity);
    cursor: default;
  }
  .foot button:focus-visible {
    outline: var(--focus-ring);
  }
  .empty {
    padding: var(--space-2) var(--space-3);
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  @media (prefers-reduced-transparency: reduce) {
    .pop {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--tooltip-bg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pop {
      animation: none;
    }
    .trigger :global(.chev) {
      transition: none;
    }
  }
</style>
