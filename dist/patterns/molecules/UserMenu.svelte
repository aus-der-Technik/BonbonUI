<script lang="ts">
  /**
   * UserMenu molecule — the avatar chip in the header that opens an account menu: "Signed in
   * as …" and Sign out. Extra menu items can come in as `children` (use `role="menuitem"`).
   * A preset of DropdownMenu: the chip and the menu are liquid glass, the menu grows out of the
   * chip, and arrows, Escape, Tab and outside clicks behave like every other menu.
   *
   *   <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={signOut} />
   */
  import type { Snippet } from 'svelte';
  import Avatar from '../atoms/Avatar.svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { PaletteColor } from '../atoms/palette';
  import DropdownMenu, { type MenuEntry } from './DropdownMenu.svelte';

  interface Props {
    email: string;
    name?: string | undefined;
    /** The person's own colour for the avatar (as on their cursor and name tags); default the tint. */
    color?: PaletteColor | 'accent' | 'auto' | undefined;
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
    color = 'accent',
    heading = 'Signed in as',
    signOutLabel = 'Sign out',
    menuLabel = 'Account',
    onsignout,
    children,
  }: Props = $props();

  const entries = $derived<MenuEntry[]>(
    onsignout ? [{ label: signOutLabel, icon: 'sign-out', onselect: () => onsignout?.() }] : [],
  );
</script>

<DropdownMenu items={entries} label={menuLabel} {menuLabel} minWidth="16rem" {children}>
  {#snippet trigger(props)}
    <button type="button" class="chip" {...props} aria-label="{menuLabel}: {name ?? email}">
      <Avatar name={name ?? email} {color} />
      <span class="email">{name ?? email}</span>
      <Icon name="chevron-down" size={12} class="chev" />
    </button>
  {/snippet}
  {#snippet header()}
    <div class="heading">{heading}</div>
    <div class="who">{email}</div>
  {/snippet}
</DropdownMenu>

<style>
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    height: var(--control-lg);
    max-width: 18rem;
    padding: 0 var(--space-4) 0 0.35rem;
    border: 0.75px solid var(--pill-border);
    border-radius: var(--radius-pill);
    background: var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
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
  @media (prefers-reduced-transparency: reduce) {
    .chip {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .chip,
    .chip :global(.chev) {
      transition: none;
    }
    .chip:active {
      transform: none;
    }
  }
  @media (max-width: 960px) {
    .email {
      display: none;
    }
    .chip {
      padding: 0 0.35rem;
    }
  }
</style>
