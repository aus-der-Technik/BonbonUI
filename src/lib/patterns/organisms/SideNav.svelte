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
   * item (`aria-current="page"`) is lifted onto the selected layer: tinted glass, tint-coloured
   * text and a small pill marker on its leading edge. When the active item changes, that pill
   * slides over to it instead of blinking. `orientation="auto"` (default) turns it into a
   * horizontal strip below 900px, where a Page moves the sidebar on top of the content — but
   * not inside a dialog or drawer, where it is the whole panel and stays a vertical list.
   * `vertical` / `horizontal` fix it either way.
   *
   *   <SideNav groups={[{ label: 'Admin', items: [{ label: 'Users', href: '/users', active: true }] }]} />
   */
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    groups: NavGroup[];
    label?: string;
    /** `auto`: a strip below 900px, except inside a dialog or drawer. */
    orientation?: 'auto' | 'vertical' | 'horizontal';
    onnavigate?: ((item: NavItem, event: MouseEvent) => void) | undefined;
    /** `ground` (default) sits on the backdrop; `panel` is a card. */
    level?: 'ground' | 'panel';
  }

  let {
    groups,
    label = 'Main',
    orientation = 'auto',
    onnavigate,
    level = 'ground',
  }: Props = $props();

  let nav: HTMLElement | undefined = $state();
  // Inside an overlay panel the nav is the panel's content: a list, never a strip.
  const inOverlay = $derived(!!nav?.parentElement?.closest('dialog, [role="dialog"]'));
  const mode = $derived(orientation === 'auto' && inOverlay ? 'vertical' : orientation);
  let pill: { x: number; y: number; w: number; h: number } | null = $state(null);
  // The first placement jumps; only later moves slide.
  let ready = $state(false);

  $effect(() => {
    // Track the active flags, not just the array, so in-place updates move the pill too.
    void (groups ?? []).flatMap((group) => group.items.map((item) => item.active));
    if (!nav) return;
    const place = () => {
      const active = nav?.querySelector<HTMLElement>('a[aria-current="page"]');
      pill = active
        ? {
            x: active.offsetLeft,
            y: active.offsetTop,
            w: active.offsetWidth,
            h: active.offsetHeight,
          }
        : null;
    };
    place();
    const frame = requestAnimationFrame(() => (ready = true));
    if (typeof ResizeObserver !== 'function') return () => cancelAnimationFrame(frame);
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  });
</script>

<nav
  class="nav nav--{mode} nav--{level}"
  class:has-pill={pill && pill.w > 0}
  aria-label={label}
  data-orientation={mode}
  bind:this={nav}
>
  {#if pill && pill.w > 0}
    <span
      class="pill"
      class:ready
      aria-hidden="true"
      style:width="{pill.w}px"
      style:height="{pill.h}px"
      style:transform="translate({pill.x}px, {pill.y}px)"
    ></span>
  {/if}
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
  /* The selected layer: tinted glass, tint rim and a pill marker on the leading edge. */
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
  a[aria-current='page']::before,
  .pill::before {
    content: '';
    position: absolute;
    left: -1px;
    top: 50%;
    width: 3px;
    height: 1rem;
    border-radius: var(--radius-pill);
    background: var(--accent);
    transform: translate(-50%, -50%);
    animation: marker-in var(--motion-base) var(--ease-spring);
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
  .pill.ready {
    transition:
      transform var(--motion-slow) var(--ease-in-out),
      width var(--motion-slow) var(--ease-in-out),
      height var(--motion-slow) var(--ease-in-out);
  }
  .has-pill a[aria-current='page'] {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
  .has-pill a[aria-current='page']::before {
    display: none;
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
  @keyframes marker-in {
    from {
      transform: translate(-50%, -50%) scaleY(0);
    }
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
  .nav--horizontal a[aria-current='page']::before,
  .nav--horizontal .pill::before {
    display: none;
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
    .nav--auto a[aria-current='page']::before,
    .nav--auto .pill::before {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    a,
    .pill.ready,
    a[aria-current='page']::before,
    .pill::before {
      transition: none;
      animation: none;
    }
  }
</style>
