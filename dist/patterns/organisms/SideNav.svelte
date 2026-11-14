<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface NavItem {
    label: string;
    href: string;
    icon?: IconName;
    /** Small count pill, e.g. open items. */
    count?: number;
    active?: boolean;
  }

  export interface NavGroup {
    label?: string;
    items: NavItem[];
  }
</script>

<script lang="ts">
  /**
   * SideNav organism — the section navigation of a multi-page app, on the ground by default
   * (`level="panel"` puts it on a card). The active
   * item (`aria-current="page"`) is marked by `selection`: `frame` (default) lifts it onto the
   * selected layer (tinted glass, tint rim, tint text), `tint` only colours its text and icon,
   * `bar` adds a slim tint bar beside it (under it in the strip). When the active item changes, the selection
   * flows over to it like thick water (it stretches, thins and lands with a soft wobble) and
   * the nav bulges along (`utils/liquid.ts`). `orientation="auto"` (default) turns it into a
   * horizontal strip below 900px, where a Page moves the sidebar on top of the content — but
   * not inside a dialog or drawer, where it is the whole panel and stays a vertical list.
   * `vertical` / `horizontal` fix it either way.
   *
   *   <SideNav groups={[{ label: 'Admin', items: [{ label: 'Users', href: '/users', active: true }] }]} />
   */
  import { untrack } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import { boxWithin, LiquidDrop } from '../../utils/liquid';

  interface Props {
    groups: NavGroup[];
    label?: string;
    /** `auto`: a strip below 900px, except inside a dialog or drawer. */
    orientation?: 'auto' | 'vertical' | 'horizontal';
    onnavigate?: ((item: NavItem, event: MouseEvent) => void) | undefined;
    /** `ground` (default) sits on the backdrop; `panel` is a card. */
    level?: 'ground' | 'panel';
    /** How the active item is marked: `frame` (default, the selected layer), `tint` (its text
     *  and icon in the tint) or `bar` (a tint bar beside it). All three flow between items. */
    selection?: 'frame' | 'tint' | 'bar';
  }

  let {
    groups,
    label = 'Main',
    orientation = 'auto',
    onnavigate,
    level = 'ground',
    selection = 'frame',
  }: Props = $props();

  let nav: HTMLElement | undefined = $state();
  // Inside an overlay panel the nav is the panel's content: a list, never a strip.
  const inOverlay = $derived(!!nav?.parentElement?.closest('dialog, [role="dialog"]'));
  const mode = $derived(orientation === 'auto' && inOverlay ? 'vertical' : orientation);
  /** Is there a measured active link for the pill to sit on? */
  let hasPill = $state(false);
  let pillEl = $state<HTMLElement>();
  // The pill flows from link to link like thick water, and the nav bulges along (liquid.ts).
  let drop: LiquidDrop | undefined;

  $effect(() => {
    const el = pillEl;
    if (!el || !nav) return;
    drop = new LiquidDrop({
      render: (box) => {
        el.style.width = `${box.w}px`;
        el.style.height = `${box.h}px`;
        el.style.transform = `translate(${box.x}px, ${box.y}px)`;
      },
      host: nav,
      bulge: 0.02,
    });
    place('instant');
    return () => {
      drop?.destroy();
      drop = undefined;
    };
  });

  function place(how: 'move' | 'follow' | 'instant') {
    const active = nav?.querySelector<HTMLElement>('a[aria-current="page"]');
    hasPill = !!active?.offsetWidth;
    if (!active || !nav || !hasPill) return;
    drop?.moveTo(boxWithin(active, nav), how);
  }

  $effect(() => {
    // Track the active flags, not just the array, so in-place updates move the pill too.
    void (groups ?? []).flatMap((group) => group.items.map((item) => item.active));
    if (!nav) return;
    untrack(() => place('move'));
    if (typeof ResizeObserver !== 'function') return;
    const observer = new ResizeObserver(() => place('follow'));
    observer.observe(nav);
    return () => observer.disconnect();
  });
</script>

<nav
  class="nav nav--{mode} nav--{level} sel--{selection}"
  class:has-pill={hasPill}
  aria-label={label}
  data-orientation={mode}
  bind:this={nav}
>
  <!-- Always there (so the drop keeps its element), drawn only once an active link is found. -->
  <span
    class="pill"
    class:pill--on={hasPill}
    aria-hidden="true"
    data-emit={hasPill && selection === 'frame' ? 'soft' : undefined}
    bind:this={pillEl}
  ></span>
  {#each groups as group, index (group.label ?? index)}
    <div class="group">
      {#if group.label}<div class="heading">{group.label}</div>{/if}
      <ul>
        {#each group.items as item (`${item.label}|${item.href}`)}
          <li>
            <a
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              onclick={(event) => onnavigate?.(item, event)}
            >
              {#if item.icon}<Icon name={item.icon} size={17} />{/if}
              <span class="label">{item.label}</span>
              {#if item.count != null}<span class="count">{item.count}</span>{/if}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</nav>

<style>
  .nav {
    position: relative;
    display: grid;
    align-content: start;
    gap: var(--space-4);
    padding: var(--space-2);
    border-radius: var(--radius-card);
  }
  .nav--panel {
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
  }
  .heading {
    padding: var(--space-2) var(--space-3) var(--space-1);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  ul {
    list-style: none;
    display: grid;
    gap: 2px;
  }
  a {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-md);
    padding: 0 var(--space-3);
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    text-decoration: none;
    white-space: nowrap;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      color var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  a :global(.icon) {
    color: var(--text-3);
    transition: color var(--motion-base) var(--ease-out);
  }
  a:hover {
    background: var(--accent-faint);
    color: var(--text);
  }
  a:active {
    transform: scale(0.98);
  }
  /* The selected layer (`frame`): tinted glass, a tint rim and tint text. */
  a[aria-current='page'] {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--glass-inset);
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
  }
  a[aria-current='page'] :global(.icon) {
    color: var(--accent-ink);
  }
  /* The sliding selected layer: once measured it carries the tinted glass for the active link. */
  .pill {
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid var(--layer-selected-border);
    border-radius: var(--radius-lg);
    background: var(--layer-selected-bg);
    box-shadow: var(--glass-inset);
    pointer-events: none;
  }
  .pill:not(.pill--on) {
    display: none;
  }
  .has-pill a[aria-current='page'] {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
  .has-pill a[aria-current='page']::before {
    display: none;
  }
  /* `tint` and `bar`: no layer at all, the tint alone says which one it is. */
  .sel--tint a[aria-current='page'],
  .sel--bar a[aria-current='page'],
  .sel--tint .pill,
  .sel--bar .pill {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
  /* `bar`: a slim tint bar in the nav's margin beside the item; the pill carries it, so it
     flows with the selection. In the strip it lies under the item. */
  .sel--bar a[aria-current='page']::before,
  .sel--bar .pill::before {
    content: '';
    position: absolute;
    left: calc(var(--space-2) * -0.5 - 1px);
    top: 22%;
    bottom: 22%;
    width: 3px;
    border-radius: var(--radius-pill);
    background: var(--accent);
    transform: translateX(-50%);
  }
  a:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -2px;
  }
  .label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .count {
    min-width: 1.5rem;
    padding: 0 0.45rem;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    line-height: 1.25rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  a[aria-current='page'] .count {
    background: var(--accent);
    color: var(--on-accent);
  }
  /* The strip: groups side by side in one scrolling row of pills. */
  .nav--horizontal {
    grid-auto-flow: column;
    justify-content: start;
    overflow-x: auto;
    border-radius: var(--radius-pill);
  }
  .nav--horizontal .group {
    display: flex;
    align-items: center;
  }
  .nav--horizontal .heading {
    display: none;
  }
  .nav--horizontal ul {
    grid-auto-flow: column;
  }
  .nav--horizontal a,
  .nav--horizontal .pill {
    border-radius: var(--radius-pill);
  }
  .nav--horizontal.sel--bar a[aria-current='page']::before,
  .nav--horizontal.sel--bar .pill::before {
    inset: auto 30% calc(var(--space-2) * -0.5 - 1px);
    width: auto;
    height: 3px;
    transform: translateY(50%);
  }
  @media (max-width: 900px) {
    .nav--auto {
      grid-auto-flow: column;
      justify-content: start;
      overflow-x: auto;
      border-radius: var(--radius-pill);
    }
    .nav--auto .group {
      display: flex;
      align-items: center;
    }
    .nav--auto .heading {
      display: none;
    }
    .nav--auto ul {
      grid-auto-flow: column;
    }
    .nav--auto a,
    .nav--auto .pill {
      border-radius: var(--radius-pill);
    }
    .nav--auto.sel--bar a[aria-current='page']::before,
    .nav--auto.sel--bar .pill::before {
      inset: auto 30% calc(var(--space-2) * -0.5 - 1px);
      width: auto;
      height: 3px;
      transform: translateY(50%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    a {
      transition: none;
    }
  }
</style>
