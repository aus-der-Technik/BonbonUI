<script lang="ts">
  /**
   * UserMenu molecule — the avatar chip in the header that opens an account menu: "Signed in
   * as …" and Sign out. Extra menu items can come in as `children` (use `role="menuitem"`).
   * The chip and the menu are liquid glass; the menu drops in under the chip.
   *
   *   <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={signOut} />
   */
  import type { Snippet } from 'svelte';
  import Avatar from '../atoms/Avatar.svelte';
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    email: string;
    name?: string | undefined;
    heading?: string;
    signOutLabel?: string;
    menuLabel?: string;
    /** Without it there is nothing to sign out of (e.g. a gateway session): no menu item. */
    onsignout?: (() => void) | undefined;
    children?: Snippet | undefined;
  }

  let {
    email,
    name,
    heading = 'Signed in as',
    signOutLabel = 'Sign out',
    menuLabel = 'Account',
    onsignout,
    children,
  }: Props = $props();

  const id = $props.id();
  let open = $state(false);
  let root: HTMLDivElement;
  let button: HTMLButtonElement;
  let menu = $state<HTMLDivElement>();

  async function setOpen(next: boolean) {
    open = next;
    if (next) {
      await Promise.resolve();
      menu?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      open = false;
      button.focus();
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const items = [...(menu?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])];
    const at = items.indexOf(document.activeElement as HTMLElement);
    const step = event.key === 'ArrowDown' ? 1 : -1;
    items[(at + step + items.length) % items.length]?.focus();
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (open && !root.contains(event.target as Node)) open = false;
  }
</script>

<svelte:document onpointerdown={onDocumentPointerDown} />

<div class="usermenu" bind:this={root} onkeydown={onKeydown} role="presentation">
  <button
    bind:this={button}
    type="button"
    class="chip"
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls="{id}-menu"
    aria-label="{menuLabel}: {name ?? email}"
    onclick={() => setOpen(!open)}
  >
    <Avatar name={name ?? email} />
    <span class="email">{name ?? email}</span>
    <Icon name="chevron-down" size={12} class="chev" />
  </button>
  {#if open}
    <div
      bind:this={menu}
      class="pop"
      id="{id}-menu"
      role="menu"
      aria-label={menuLabel}
      tabindex="-1"
    >
      <div class="heading">{heading}</div>
      <div class="who">{email}</div>
      {@render children?.()}
      {#if onsignout}
        <button
          type="button"
          class="item"
          role="menuitem"
          onclick={() => {
            open = false;
            onsignout?.();
          }}
        >
          <Icon name="sign-out" size={16} />
          <span>{signOutLabel}</span>
        </button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .usermenu {
    position: relative;
  }
  .chip,
  .pop {
    background: var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    border: 0.75px solid var(--pill-border);
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    height: var(--control-lg);
    max-width: 18rem;
    padding: 0 var(--space-4) 0 0.35rem;
    border-radius: var(--radius-pill);
    box-shadow: var(--shadow-frosted);
    font: inherit;
    font-size: var(--fs-sm);
    color: var(--text-2);
    cursor: pointer;
    transition:
      box-shadow var(--motion-base) var(--ease-out),
      background-color var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .chip:hover {
    box-shadow: var(--shadow-frosted-hover);
  }
  .chip:active {
    transform: var(--press-squish);
  }
  /* Open = the selected layer, like every other chosen thing. */
  .chip[aria-expanded='true'] {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .chip:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .email {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chip :global(.chev) {
    color: var(--text-3);
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .chip[aria-expanded='true'] :global(.chev) {
    transform: rotate(180deg);
  }
  .pop {
    /* Denser than the chip, so the menu stays readable over any page. */
    background: var(--pill-tint), var(--glass-strong);
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    z-index: var(--z-popover);
    width: max-content;
    min-width: 16rem;
    max-width: min(24rem, calc(100vw - 2rem));
    padding: 0.45rem;
    border-radius: var(--radius-pop);
    outline: none;
    box-shadow: var(--shadow-pop);
    transform-origin: top right;
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .heading {
    padding: 0.35rem var(--space-3) 0.4rem;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .who {
    padding: 0 var(--space-3) 0.55rem;
    margin-bottom: 0.35rem;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    overflow-wrap: anywhere;
    border-bottom: 1px solid var(--border-strong);
  }
  .item,
  .pop :global([role='menuitem']) {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    min-height: var(--control-md);
    padding: var(--space-2) var(--space-3);
    border: 0;
    border-radius: var(--radius-lg);
    background: none;
    font: inherit;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    color: var(--text);
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .item :global(.icon) {
    color: var(--text-2);
  }
  /* Pointing is neutral; the accent marks where the keyboard is. */
  .item:hover,
  .pop :global([role='menuitem']:hover) {
    background: var(--fill-hover);
  }
  .item:focus-visible,
  .pop :global([role='menuitem']:focus-visible) {
    background: var(--accent-soft);
    color: var(--accent-ink);
    outline: none;
  }
  .item:focus-visible :global(.icon) {
    color: var(--accent-ink);
  }
  @media (prefers-reduced-transparency: reduce) {
    .chip,
    .pop {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
    .pop {
      background: var(--tooltip-bg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pop {
      animation: none;
    }
    .chip,
    .chip :global(.chev) {
      transition: none;
    }
    .chip:active {
      transform: none;
    }
  }
  @media (max-width: 900px) {
    .email {
      display: none;
    }
    .chip {
      padding: 0 0.35rem;
    }
  }
</style>
