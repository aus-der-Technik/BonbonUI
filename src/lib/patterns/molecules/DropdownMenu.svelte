<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export type MenuEntry =
    | {
        label: string;
        icon?: IconName;
        danger?: boolean;
        disabled?: boolean;
        /** A keyboard hint on the right, e.g. "⌘D" (display only). */
        shortcut?: string;
        onselect: () => void;
      }
    | { separator: true }
    /** A small caps heading over the entries that follow. */
    | { heading: string };
</script>

<script lang="ts">
  /**
   * DropdownMenu molecule — a row of actions behind one button (the "⋯" of a table row). ARIA
   * menu: arrows / Home / End move, Enter picks, Escape or an outside click closes and returns
   * focus to the trigger. The menu is a frosted glass popover that drops in; entries can carry an
   * icon and a shortcut hint, `danger` ones are red, `{ heading }` groups them.
   *
   *   <DropdownMenu items={[{ label: 'Rename', icon: 'edit', onselect: rename }]} />
   */
  import type { ComponentProps } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    items: MenuEntry[];
    /** Accessible name of the trigger, also its text unless `iconOnly`. */
    label?: string;
    icon?: IconName;
    iconOnly?: boolean;
    align?: 'start' | 'end';
    size?: 'sm' | 'md';
    /** Look of the trigger button. */
    variant?: ComponentProps<typeof Button>['variant'];
    shape?: 'rounded' | 'pill';
  }

  let {
    items,
    label = 'More actions',
    icon = 'more',
    iconOnly = true,
    align = 'end',
    size = 'sm',
    variant = 'secondary',
    shape = 'rounded',
  }: Props = $props();

  const id = $props.id();
  let open = $state(false);
  let root: HTMLDivElement;
  let menu = $state<HTMLDivElement>();
  /** The side actually used: `align`, unless the menu would leave the viewport there. */
  let side = $state<'start' | 'end'>('end');

  const menuItems = () => [
    ...(menu?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? []),
  ];
  const trigger = () => root.querySelector<HTMLElement>('button');

  async function setOpen(next: boolean) {
    side = align;
    open = next;
    if (next) {
      await Promise.resolve();
      const box = menu?.getBoundingClientRect();
      if (box?.width) {
        if (side === 'end' && box.left < 8) side = 'start';
        else if (side === 'start' && box.right > window.innerWidth - 8) side = 'end';
      }
      menuItems()[0]?.focus();
    }
  }

  function close() {
    open = false;
    trigger()?.focus();
  }

  function onKeydown(event: KeyboardEvent) {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    const all = menuItems();
    const at = all.indexOf(document.activeElement as HTMLElement);
    const moves: Record<string, number> = {
      ArrowDown: at + 1,
      ArrowUp: at - 1,
      Home: 0,
      End: all.length - 1,
    };
    const target = moves[event.key];
    if (target == null || !all.length) return;
    event.preventDefault();
    all[(target + all.length) % all.length]?.focus();
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (open && !root.contains(event.target as Node)) open = false;
  }
</script>

<svelte:document onpointerdown={onDocumentPointerDown} />

<div class="dropdown" bind:this={root} onkeydown={onKeydown} role="presentation">
  <Button
    {icon}
    {label}
    {iconOnly}
    {size}
    {variant}
    {shape}
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls="{id}-menu"
    onclick={(event: MouseEvent) => {
      event.stopPropagation();
      void setOpen(!open);
    }}
  />
  {#if open}
    <div
      bind:this={menu}
      class="pop pop--{side}"
      id="{id}-menu"
      role="menu"
      aria-label={label}
      tabindex="-1"
    >
      {#each items as item, index (index)}
        {#if 'separator' in item}
          <div class="separator" role="separator"></div>
        {:else if 'heading' in item}
          <div class="heading" role="presentation">{item.heading}</div>
        {:else}
          <button
            type="button"
            role="menuitem"
            class="item"
            class:danger={item.danger}
            disabled={item.disabled}
            onclick={(event) => {
              event.stopPropagation();
              close();
              item.onselect();
            }}
          >
            {#if item.icon}<Icon name={item.icon} size={16} />{/if}
            <span class="text">{item.label}</span>
            {#if item.shortcut}<kbd class="shortcut">{item.shortcut}</kbd>{/if}
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    display: inline-flex;
  }
  .pop {
    position: absolute;
    top: calc(100% + var(--space-2));
    z-index: var(--z-popover);
    min-width: 13rem;
    max-width: min(22rem, calc(100vw - 2rem));
    padding: var(--space-1);
    border-radius: var(--radius-lg);
    border: 0.75px solid var(--pill-border);
    /* Liquid glass over a denser frost, so the entries stay readable on any page. */
    background: var(--pill-tint), var(--glass-strong);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-pop);
    /* Grows out of the trigger's corner. */
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .pop--end {
    right: 0;
    transform-origin: top right;
  }
  .pop--start {
    left: 0;
    transform-origin: top left;
  }
  .item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    min-height: var(--control-md);
    padding: 0 var(--space-3);
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    font: inherit;
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text);
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .item :global(.icon) {
    color: var(--text-2);
  }
  /* Pointing is neutral; the accent marks where the keyboard is. */
  .item:hover:not(:disabled) {
    background: var(--fill-hover);
  }
  .item:hover:not(:disabled) :global(.icon) {
    color: var(--text);
  }
  .item:focus-visible {
    background: var(--accent-soft);
    color: var(--accent-ink);
    outline: none;
  }
  .item:focus-visible :global(.icon) {
    color: var(--accent-ink);
  }
  .item:active:not(:disabled) {
    background: var(--accent-soft);
    transform: scale(0.98);
  }
  .item:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .text {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .shortcut {
    font-family: inherit;
    font-size: var(--fs-xs);
    color: var(--text-3);
    letter-spacing: 0.04em;
  }
  .danger,
  .danger :global(.icon) {
    color: var(--danger);
  }
  .danger:hover:not(:disabled),
  .danger:focus-visible {
    background: var(--tint-danger);
    color: var(--danger);
  }
  .danger:hover:not(:disabled) :global(.icon),
  .danger:focus-visible :global(.icon) {
    color: var(--danger);
  }
  .heading {
    padding: var(--space-2) var(--space-3) var(--space-1);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .separator {
    height: 1px;
    margin: var(--space-1) var(--space-2);
    background: var(--border-strong);
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
    .item:active:not(:disabled) {
      transform: none;
    }
  }
</style>
