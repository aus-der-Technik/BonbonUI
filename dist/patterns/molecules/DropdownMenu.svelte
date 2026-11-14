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

  /** Spread these on your own trigger button (the `trigger` snippet's argument). */
  export interface MenuTriggerProps {
    'aria-haspopup': 'menu';
    'aria-expanded': boolean;
    /** Only while the menu is rendered, so it never points at a missing id. */
    'aria-controls': string | undefined;
    onclick: (event: MouseEvent) => void;
  }
</script>

<script lang="ts">
  /**
   * DropdownMenu molecule — a row of actions behind one button (the "⋯" of a table row). ARIA
   * menu: arrows / Home / End move, Enter picks, Escape or an outside click closes and returns
   * focus to the trigger; Tab out of it closes it too. The menu is a frosted glass popover that
   * grows out of its trigger (in the top layer, flipping above when there is no room below);
   * entries can carry an icon and a shortcut hint, `danger` ones are red, `{ heading }` groups
   * them. `trigger` replaces the button (spread its props on yours), `header` and `children` add
   * free content above the entries (children may be `role="menuitem"` elements).
   *
   *   <DropdownMenu items={[{ label: 'Rename', icon: 'edit', onselect: rename }]} />
   */
  import type { ComponentProps, Snippet } from 'svelte';
  import { tick } from 'svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import { anchorTo } from './anchor';

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
    /** Accessible name of the menu itself; `label` when unset. */
    menuLabel?: string | undefined;
    /** Smallest width of the menu (any CSS length). */
    minWidth?: string;
    /** Your own trigger instead of the button; spread the props onto it. */
    trigger?: Snippet<[MenuTriggerProps]> | undefined;
    /** Non-interactive content at the top of the menu, e.g. who is signed in. */
    header?: Snippet | undefined;
    /** Extra entries before `items`; give them `role="menuitem"`. */
    children?: Snippet | undefined;
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
    menuLabel,
    minWidth = '13rem',
    trigger: customTrigger,
    header,
    children,
  }: Props = $props();

  const id = $props.id();
  let open = $state(false);
  let root: HTMLDivElement;
  let menu = $state<HTMLDivElement>();

  const menuItems = () => [
    ...(menu?.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])',
    ) ?? []),
  ];
  const trigger = () =>
    root.querySelector<HTMLElement>('[aria-haspopup="menu"]') ??
    root.querySelector<HTMLElement>('button');

  async function setOpen(next: boolean) {
    open = next;
    if (next) {
      await tick();
      menuItems()[0]?.focus();
    }
  }

  $effect(() => {
    if (!open || !menu) return;
    return anchorTo(menu, trigger() ?? root, {
      placement: align === 'start' ? 'bottom-start' : 'bottom-end',
    });
  });

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

  /** Tab (or anything else) moving focus out of trigger and menu closes it. */
  function onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (open && next && !root.contains(next)) open = false;
  }

  const triggerProps = $derived<MenuTriggerProps>({
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': open ? `${id}-menu` : undefined,
    onclick: (event: MouseEvent) => {
      event.stopPropagation();
      void setOpen(!open);
    },
  });
</script>

<svelte:document
  onpointerdown={onDocumentPointerDown}
  onfocusin={(event) => {
    // Focus that left the window (relatedTarget null) and came back elsewhere.
    if (open && !root.contains(event.target as Node)) open = false;
  }}
/>

<div
  class="dropdown"
  bind:this={root}
  onkeydown={onKeydown}
  onfocusout={onFocusOut}
  role="presentation"
>
  {#if customTrigger}
    {@render customTrigger(triggerProps)}
  {:else}
    <Button {icon} {label} {iconOnly} {size} {variant} {shape} {...triggerProps} />
  {/if}
  {#if open}
    <div
      bind:this={menu}
      class="pop"
      id="{id}-menu"
      role="menu"
      aria-label={menuLabel ?? label}
      tabindex="-1"
      popover="manual"
      style:min-width={minWidth}
    >
      {@render header?.()}
      {@render children?.()}
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
    /* Placed by anchorTo (fixed, in the top layer); these hold until it runs. */
    position: fixed;
    inset: auto;
    margin: 0;
    z-index: var(--z-popover);
    max-width: min(22rem, calc(100vw - 2rem));
    max-height: min(32rem, var(--anchor-room, calc(100dvh - 16px)));
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: var(--space-1);
    color: var(--text);
    border-radius: var(--radius-pop);
    border: 0.75px solid var(--pill-border);
    /* Liquid glass over a denser frost, so the entries stay readable on any page. */
    background: var(--pill-tint), var(--glass-strong);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow: var(--shadow-pop);
    /* Grows out of the trigger (anchorTo sets the transform-origin there). */
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .item,
  .pop :global([role='menuitem']:not(.item)) {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    min-height: var(--control-md);
    padding: 0 var(--space-3);
    border: 0;
    border-radius: var(--radius-lg);
    background: none;
    font: inherit;
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text);
    text-align: left;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .item :global(.icon) {
    color: var(--text-2);
  }
  /* Pointing is neutral; the accent marks where the keyboard is. */
  .item:hover:not(:disabled),
  .pop :global([role='menuitem']:not(.item):hover) {
    background: var(--fill-hover);
  }
  .item:hover:not(:disabled) :global(.icon) {
    color: var(--text);
  }
  .item:focus-visible,
  .pop :global([role='menuitem']:not(.item):focus-visible) {
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
    opacity: var(--disabled-opacity);
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
