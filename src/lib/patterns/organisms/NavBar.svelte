<script lang="ts" module>
  export interface NavLink {
    label: string;
    href: string;
    /** The page you are on: highlighted and `aria-current="page"`. */
    active?: boolean | undefined;
  }
</script>

<script lang="ts">
  /**
   * NavBar organism — the header of a website or shop: brand on the left, page links in the
   * middle, call-to-action buttons on the right, all on one liquid-glass pill (front layer,
   * sticky). Below 720px of width the links fold into a menu button that opens a sheet under
   * the bar. Like the AppHeader's title pill, the bar catches a one-shot sugar-glass sheen when
   * the pointer arrives. The bar is thick glass (`lens`, see GlassLens): it magnifies what
   * scrolls under it and bends it at the rim; `lens={false}` keeps it frosted. Put it in a
   * Page's `header` snippet.
   *
   *   <NavBar brand="Larkspur" links={[{ label: 'Pricing', href: '/pricing', active: true }]}>
   *     {#snippet actions()}<Button variant="primary" shape="pill" label="Sign up" />{/snippet}
   *   </NavBar>
   */
  import type { Snippet } from 'svelte';
  import GlassLens from '../atoms/GlassLens.svelte';
  import Icon from '../atoms/Icon.svelte';
  import { frostFilter, type LensOptions } from '../../utils/lens';

  interface Props {
    /** Brand name, set as a wordmark. */
    brand?: string | undefined;
    /** Brand mark in front of the name (an inline SVG, an Avatar). */
    logo?: Snippet | undefined;
    brandHref?: string;
    links?: NavLink[];
    /** Buttons on the right (sign in, cart); they stay visible on phones. */
    actions?: Snippet | undefined;
    /** Extra content at the bottom of the phone menu sheet. */
    menu?: Snippet | undefined;
    /** Called for link clicks, e.g. to route in a single-page app (call `preventDefault`). */
    onnavigate?: ((link: NavLink, event: MouseEvent) => void) | undefined;
    /** Accessible name of the link list. */
    label?: string;
    menuLabel?: string;
    closeMenuLabel?: string;
    /** Refraction of the bar (magnify, rim, rimBend, chroma, blur, saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
  }

  let {
    brand,
    logo,
    brandHref = '/',
    links = [],
    actions,
    menu,
    onnavigate,
    label = 'Main',
    menuLabel = 'Open menu',
    closeMenuLabel = 'Close menu',
    lens = {},
  }: Props = $props();

  const id = $props.id();
  let open = $state(false);
  let root: HTMLElement | undefined = $state();
  let toggle: HTMLButtonElement | undefined = $state();
  let lensDrawn = $state(false);

  function navigate(link: NavLink, event: MouseEvent) {
    onnavigate?.(link, event);
    open = false;
  }

  function onwindowclick(event: MouseEvent) {
    if (open && root && !root.contains(event.target as Node)) open = false;
  }

  function onwindowkeydown(event: KeyboardEvent) {
    if (open && event.key === 'Escape') {
      open = false;
      toggle?.focus();
    }
  }
</script>

<svelte:window onclick={onwindowclick} onkeydown={onwindowkeydown} />

<header class="navbar" bind:this={root} style:--layer-front-blur={frostFilter(lens)}>
  <div class="bar" class:lensed={lens !== false && lensDrawn}>
    {#if lens !== false}<GlassLens {...lens} bind:active={lensDrawn} />{/if}
    {#if brand || logo}
      <a class="brand" href={brandHref}>
        {#if logo}<span class="logo">{@render logo()}</span>{/if}
        {#if brand}<span class="wordmark">{brand}</span>{/if}
      </a>
    {/if}

    {#if links.length}
      <nav class="links" aria-label={label}>
        <ul>
          {#each links as link (`${link.label}|${link.href}`)}
            <li>
              <a
                href={link.href}
                class:active={link.active}
                aria-current={link.active ? 'page' : undefined}
                onclick={(e) => navigate(link, e)}>{link.label}</a
              >
            </li>
          {/each}
        </ul>
      </nav>
    {/if}

    <div class="end">
      {#if actions}<div class="actions">{@render actions()}</div>{/if}
      {#if links.length || menu}
        <button
          bind:this={toggle}
          type="button"
          class="toggle"
          aria-expanded={open}
          aria-controls="{id}-sheet"
          aria-label={open ? closeMenuLabel : menuLabel}
          onclick={() => (open = !open)}
        >
          <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      {/if}
    </div>
  </div>

  {#if open}
    <div class="sheet" id="{id}-sheet">
      {#if links.length}
        <nav aria-label={label}>
          <ul>
            {#each links as link (`${link.label}|${link.href}`)}
              <li>
                <a
                  href={link.href}
                  class:active={link.active}
                  aria-current={link.active ? 'page' : undefined}
                  onclick={(e) => navigate(link, e)}
                >
                  {link.label}
                  <Icon name="chevron-right" size={16} />
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      {/if}
      {#if menu}<div class="sheet-extra">{@render menu()}</div>{/if}
    </div>
  {/if}
</header>

<style>
  .navbar {
    /* Front layer: always sticky. */
    position: sticky;
    top: var(--sticky-gap);
    z-index: var(--z-header);
    container: navbar / inline-size;
    margin-top: var(--sticky-gap);
    padding: 0 var(--gutter);
  }
  .bar {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-4);
    min-height: calc(var(--control-lg) + 0.75rem);
    padding: 0.375rem 0.375rem 0.375rem var(--space-5);
    border-radius: var(--radius-pill);
    background: var(--layer-front-bg);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--layer-front-shadow);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
  }
  /* Thick glass: the lens scatters and bends the backdrop, the bar only lends it a thin body. */
  .bar.lensed {
    isolation: isolate;
    background: var(--layer-front-lens-bg);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  /* Sugar-glass sheen: one sweep of light across the pill per hover. */
  .bar::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--sheen) no-repeat 150% 0 / 250% 100%;
    opacity: 0;
    pointer-events: none;
  }
  .bar:hover::after {
    opacity: 1;
    animation: bb-sheen var(--motion-lazy) var(--ease-out) forwards;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    color: var(--text);
    text-decoration: none;
    border-radius: var(--radius-pill);
  }
  .brand:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 4px;
  }
  .logo {
    display: grid;
    place-items: center;
    flex: none;
  }
  .wordmark {
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    letter-spacing: -0.025em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .links {
    flex: 1;
    display: flex;
    justify-content: center;
    min-width: 0;
  }
  ul {
    display: flex;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .links a {
    display: inline-flex;
    align-items: center;
    height: var(--control-md);
    padding: 0 var(--space-4);
    border-radius: var(--radius-pill);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    text-decoration: none;
    white-space: nowrap;
    transition:
      background var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .links a:hover {
    color: var(--text);
    background: var(--accent-faint);
  }
  .links a.active {
    color: var(--accent-ink);
    background: var(--accent-soft);
    font-weight: var(--fw-semibold);
  }
  a:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  .end {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-left: auto;
  }
  .links + .end {
    margin-left: 0;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    flex-shrink: 1;
  }
  /* The brand is who you are: it keeps its full name; the actions give way first. */
  .brand {
    flex-shrink: 0;
  }
  .toggle {
    display: none;
    place-items: center;
    width: var(--control-lg);
    height: var(--control-lg);
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
    color: var(--text);
    cursor: pointer;
    transition:
      background var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .toggle:hover {
    background: var(--fill-hover);
  }
  .toggle:active {
    transform: var(--press-squish);
  }
  .toggle:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    box-shadow: var(--focus-halo);
  }

  /* The phone menu: a liquid-glass sheet hanging under the bar. */
  .sheet {
    position: absolute;
    top: calc(100% + var(--space-2));
    left: var(--gutter);
    right: var(--gutter);
    display: grid;
    gap: var(--space-3);
    padding: var(--space-2);
    border-radius: var(--radius-dialog);
    background: var(--layer-front-bg), var(--glass-strong);
    border: 0.75px solid var(--layer-front-border);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    transform-origin: top center;
    animation: bb-drop var(--motion-base) var(--ease-out);
  }
  .sheet ul {
    flex-direction: column;
    gap: 2px;
  }
  .sheet a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: var(--control-xl);
    padding: 0 var(--space-4);
    border-radius: var(--radius-xl);
    font-size: var(--fs-xl);
    font-weight: var(--fw-medium);
    color: var(--text);
    text-decoration: none;
  }
  .sheet a :global(svg) {
    color: var(--text-3);
  }
  .sheet a:hover {
    background: var(--fill-hover);
  }
  .sheet a.active {
    color: var(--accent-ink);
    background: var(--accent-soft);
    font-weight: var(--fw-semibold);
  }
  .sheet-extra {
    display: grid;
    gap: var(--space-2);
    padding: var(--space-2);
    border-top: 1px solid var(--border-strong);
  }

  @container navbar (max-width: 420px) {
    .wordmark {
      font-size: var(--fs-lg);
    }
  }
  @container navbar (max-width: 720px) {
    .links {
      display: none;
    }
    .end {
      margin-left: auto;
    }
    .links + .end {
      margin-left: auto;
    }
    .toggle {
      display: grid;
    }
  }
  /* Wide again (a rotated tablet): the sheet has nothing to add. */
  @container navbar (min-width: 721px) {
    .sheet:not(:has(.sheet-extra)) {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .sheet,
    .bar:hover::after {
      animation: none;
    }
    .bar:hover::after {
      opacity: 0;
    }
    .toggle {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .bar,
    .sheet {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
