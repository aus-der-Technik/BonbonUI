<script lang="ts">
  /**
   * MenuList — the item list of a MenuBar menu and of a ContextMenu (internal). ARIA menu with
   * arrow / Home / End navigation; Enter or Space picks, Escape asks the owner to close.
   *
   *   <MenuList items={entries} label="File" onclose={close} />
   */
  import Icon from '../atoms/Icon.svelte';
  import type { ContextMenuItem } from './shared.svelte';
  import { isSeparator, rove } from './shared.svelte';

  interface Props {
    items: ContextMenuItem[];
    label?: string | undefined;
    id?: string | undefined;
    /** Called after an item was picked, and on Escape (`picked` false). */
    onclose?: ((picked: boolean) => void) | undefined;
    /** Left / Right inside the menu (the MenuBar switches menus with them). */
    onside?: ((direction: -1 | 1) => void) | undefined;
    element?: HTMLDivElement | undefined;
    /** Pops in from its top-left corner, where it was opened. */
    animate?: boolean;
  }

  let {
    items,
    label,
    id,
    onclose,
    onside,
    element = $bindable(),
    animate = true,
  }: Props = $props();

  const hasChecks = $derived(items.some((i) => !isSeparator(i) && i.checked !== undefined));

  function entries(): HTMLElement[] {
    return [
      ...(element?.querySelectorAll<HTMLElement>(
        '[role^="menuitem"]:not([aria-disabled="true"])',
      ) ?? []),
    ];
  }

  /** Focuses the first (or last) enabled item. */
  export function focusFirst(last = false): void {
    const all = entries();
    (last ? all.at(-1) : all[0])?.focus();
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onclose?.(false);
      return;
    }
    if (onside && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      onside(event.key === 'ArrowLeft' ? -1 : 1);
      return;
    }
    if (event.key === 'Tab') {
      onclose?.(false);
      return;
    }
    rove(event, entries(), 'vertical');
  }

  function pick(item: ContextMenuItem) {
    if (isSeparator(item) || item.disabled) return;
    item.onselect?.();
    onclose?.(true);
  }
</script>

<div
  class="menu"
  class:animate
  role="menu"
  tabindex="-1"
  aria-label={label}
  {id}
  bind:this={element}
  {onkeydown}
>
  {#each items as item, i (i)}
    {#if isSeparator(item)}
      <div class="separator" role="separator"></div>
    {:else}
      <button
        type="button"
        class="item"
        class:danger={item.danger}
        role={item.checked !== undefined ? 'menuitemcheckbox' : 'menuitem'}
        aria-checked={item.checked === undefined ? undefined : item.checked}
        aria-disabled={item.disabled ? 'true' : undefined}
        tabindex="-1"
        onclick={() => pick(item)}
        onpointermove={(e) => !item.disabled && (e.currentTarget as HTMLElement).focus()}
      >
        {#if hasChecks}
          <span class="check" aria-hidden="true">
            {#if item.checked}<Icon name="check" size={13} />{/if}
          </span>
        {/if}
        {#if item.icon}<Icon name={item.icon} size={16} />{/if}
        <span class="label">{item.label}</span>
        {#if item.shortcut}<span class="shortcut">{item.shortcut}</span>{/if}
      </button>
    {/if}
  {/each}
</div>

<style>
  .menu {
    min-width: 13rem;
    max-height: min(70vh, 32rem);
    overflow-y: auto;
    padding: 0.35rem;
    border-radius: calc(var(--radius-md) + 0.35rem);
    border: 0.75px solid var(--pill-border);
    background: var(--tooltip-bg);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-pop);
    color: var(--text);
    outline: none;
  }
  .animate {
    /* The corner it grows from; ContextMenu moves it when the menu flips at an edge. */
    transform-origin: var(--menu-origin, 0 0);
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    width: 100%;
    min-height: calc(var(--control-sm) - 2px);
    padding: 0 0.6rem;
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    color: inherit;
    font: inherit;
    font-size: var(--fs-md);
    text-align: left;
    white-space: nowrap;
    cursor: default;
  }
  .item :global(.icon) {
    color: var(--text-2);
  }
  /* The highlighted item sits on the selected layer: tinted, not a solid slab of colour. */
  .item:focus {
    outline: none;
    background: var(--accent-soft);
    box-shadow: inset 0 0 0 1px var(--accent-border);
  }
  .item:focus :global(.icon) {
    color: var(--accent-ink);
  }
  .item:focus-visible {
    box-shadow:
      inset 0 0 0 1px var(--accent-border),
      var(--focus-halo);
  }
  .item[aria-disabled='true'] {
    opacity: 0.4;
  }
  .danger,
  .danger :global(.icon) {
    color: var(--danger);
  }
  .danger:focus {
    background: var(--tint-danger);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--danger) 40%, transparent);
  }
  .danger:focus :global(.icon) {
    color: var(--danger);
  }
  .check {
    display: inline-flex;
    width: 13px;
    color: var(--accent-ink);
  }
  .label {
    flex: 1;
  }
  .shortcut {
    margin-left: var(--space-6);
    color: var(--text-3);
    font-size: var(--fs-sm);
    letter-spacing: 0.06em;
    font-variant-numeric: tabular-nums;
  }
  .separator {
    height: 1px;
    margin: 0.3rem 0.6rem;
    background: var(--border-strong);
  }
  @media (prefers-reduced-motion: reduce) {
    .animate {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .menu {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--editor-bg);
    }
  }
</style>
