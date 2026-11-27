<script lang="ts" module>
  import type { IconName } from '../atoms/icons';
  import type { Greeting } from '../../utils/delight';

  /** A status item on the right of the menu bar (wifi, battery, …). */
  export interface MenuBarStatus {
    /** Stable name, rendered as `data-status` (tests, tours, design notes). */
    id?: string | undefined;
    icon: IconName;
    /** Accessible name, also the tooltip. */
    label: string;
    /** Short text next to the icon ("82%"). */
    text?: string | undefined;
    /** Makes it a button (e.g. opens quick settings). The event's `currentTarget` is the item,
     *  so a panel can pop out of it (`anchor`). */
    onclick?: ((event: MouseEvent) => void) | undefined;
    /** Highlights it while its panel is open. */
    active?: boolean | undefined;
  }
</script>

<script lang="ts">
  /**
   * MenuBar — the **top shelf**: a slim floating glass shelf over the desktop. On the left the
   * front app's name in a pill, followed by its menus (and, with `logoMenu`, the system menu
   * as a wrapped bonbon in front). On the right status items and the **day pill**: a greeting
   * and the time ("Good afternoon · 14:32") that shows a small wink on hover. A front layer,
   * so it sticks to the top. ARIA menubar: Left / Right move between menus, Down opens one,
   * and while a menu is open hovering a neighbour switches to it.
   *
   *   <MenuBar logoMenu={system} appIcon="edit" appColor="yellow"
   *            menus={[{ label: 'Notes', items }, { label: 'File', items }]}
   *            status={[{ icon: 'wifi', label: 'Wi-Fi' }]} name="Alex" />
   */
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  import AppIcon from '../atoms/AppIcon.svelte';
  import Icon from '../atoms/Icon.svelte';
  import { greeting as dailyGreeting } from '../../utils/delight';
  import GlassLens from '../atoms/GlassLens.svelte';
  import { frostFilter, type LensOptions } from '../../utils/lens';
  import MenuList from './MenuList.svelte';
  import type { AppColor, ContextMenuItem, MenuBarMenu } from './shared.svelte';

  interface Props {
    menus?: MenuBarMenu[];
    /** A glyph for the system menu (default: the wrapped bonbon mark). */
    logo?: IconName | undefined;
    /** The system menu; shown when given (or when `logo` is set). */
    logoMenu?: ContextMenuItem[] | undefined;
    logoLabel?: string;
    /** Small app icon in the app pill (the first menu). */
    appIcon?: IconName | undefined;
    appColor?: AppColor | undefined;
    status?: MenuBarStatus[];
    /** Shows the day pill (greeting + time) on the right. */
    clock?: boolean;
    /** A fixed time (stories, tests); without it the clock ticks. */
    now?: Date | undefined;
    formatClock?: (date: Date) => string;
    /** Greets in the day pill; off shows the time only. */
    greet?: boolean;
    /** Appended to the greeting ("Good morning, Alex"). */
    name?: string | undefined;
    /** Your own words for the moment (another language, another tone). */
    greeting?: (date: Date, name?: string) => Greeting;
    /** Click on the day pill (e.g. open a calendar); `currentTarget` is the pill. */
    onday?: ((event: MouseEvent) => void) | undefined;
    /** A floating shelf below the top edge (default) or a full-width bar. */
    floating?: boolean;
    /** Accessible name of the menu bar. */
    label?: string;
    /** Extra content before the status items. */
    trailing?: Snippet | undefined;
    /** Refraction of the shelf (magnify, rim, rimBend, chroma, blur, saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
  }

  let {
    menus = [],
    logo,
    logoMenu,
    logoLabel = 'System',
    appIcon,
    appColor,
    status = [],
    clock = true,
    now,
    formatClock = (d) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    greet = true,
    name,
    greeting = dailyGreeting,
    onday,
    floating = true,
    label = 'Menu bar',
    trailing,
    lens = {},
  }: Props = $props();

  let lensDrawn = $state(false);

  const id = $props.id();
  const hasLogo = $derived(!!logo || !!logoMenu);
  /** The system menu joins the menus at index 0. */
  const all = $derived<(MenuBarMenu & { logo?: boolean })[]>([
    ...(hasLogo ? [{ label: logoLabel, items: logoMenu ?? [], logo: true }] : []),
    ...menus,
  ]);
  const firstApp = $derived(hasLogo ? 1 : 0);

  let openAt = $state<number | null>(null);
  let focusAt = $state(0);
  let bar: HTMLDivElement;
  let lists = $state<(ReturnType<typeof MenuList> | undefined)[]>([]);
  let ticking = $state(new Date());

  const time = $derived(now ?? ticking);
  const hello = $derived(greet ? greeting(time, name) : undefined);

  $effect(() => {
    if (now || !clock) return;
    const timer = setInterval(() => (ticking = new Date()), 15_000);
    return () => clearInterval(timer);
  });

  const triggers = () => [...bar.querySelectorAll<HTMLElement>(':scope > .slot > .trigger')];

  async function openMenu(index: number, focusLast = false) {
    openAt = index;
    focusAt = index;
    await tick();
    lists[index]?.focusFirst(focusLast);
  }

  function closeMenu(refocus = true) {
    const was = openAt;
    openAt = null;
    if (refocus && was !== null) triggers()[was]?.focus();
  }

  function side(direction: -1 | 1) {
    if (openAt === null) return;
    void openMenu((openAt + direction + all.length) % all.length);
  }

  function onTriggerKeydown(event: KeyboardEvent, index: number) {
    const count = all.length;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      focusAt = (index + (event.key === 'ArrowRight' ? 1 : -1) + count) % count;
      triggers()[focusAt]?.focus();
    } else if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      void openMenu(index);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      void openMenu(index, true);
    }
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (openAt !== null && !bar.contains(event.target as Node)) closeMenu(false);
  }
</script>

<svelte:document onpointerdown={onDocumentPointerDown} />

{#snippet day()}
  <time class="clock" datetime={time.toISOString()}>
    {#if hello}<span class="hello">{hello.text}</span><span class="sep" aria-hidden="true">·</span
      >{/if}
    <span class="clock-long">{formatClock(time)}</span>
  </time>
  {#if hello?.wink}<span class="wink">{hello.wink}</span>{/if}
{/snippet}

<header
  data-glass
  class="menubar"
  class:floating
  class:lensed={lens !== false && lensDrawn}
  style:--layer-front-blur={frostFilter(lens)}
>
  {#if lens !== false}<GlassLens {...lens} bind:active={lensDrawn} />{/if}
  <div class="menus" role="menubar" aria-label={label} bind:this={bar}>
    {#each all as menu, i (menu.label + i)}
      <div class="slot" class:extra={i > firstApp}>
        <button
          type="button"
          class="trigger"
          class:logo={menu.logo}
          class:app={i === firstApp}
          role="menuitem"
          aria-haspopup="menu"
          aria-expanded={openAt === i}
          aria-controls={openAt === i ? `${id}-menu-${i}` : undefined}
          aria-label={menu.logo ? menu.label : undefined}
          tabindex={focusAt === i ? 0 : -1}
          onclick={() => (openAt === i ? closeMenu() : openMenu(i))}
          onpointerenter={() => openAt !== null && openAt !== i && openMenu(i)}
          onkeydown={(e) => onTriggerKeydown(e, i)}
        >
          {#if menu.logo}
            {#if logo}<Icon name={logo} size={16} />{:else}
              <svg class="bonbon" viewBox="0 0 28 16" aria-hidden="true">
                <path class="end end--l" d="M7.5 8 1.2 2.6Q-.3 8 1.2 13.4Z" />
                <path class="end end--r" d="M20.5 8l6.3-5.4q1.5 5.4 0 10.8Z" />
                <rect class="body" x="5.5" y="2.5" width="17" height="11" rx="5.5" />
                <path class="shine" d="M9 5.5h6" />
              </svg>
            {/if}
          {:else}
            {#if i === firstApp && appIcon}
              <span class="app-icon" aria-hidden="true">
                <AppIcon label="" icon={appIcon} color={appColor ?? 'accent'} size={18} />
              </span>
            {/if}
            {menu.label}
          {/if}
        </button>
        {#if openAt === i}
          <div class="drop">
            <MenuList
              bind:this={lists[i]}
              id="{id}-menu-{i}"
              items={menu.items}
              label={menu.label}
              onclose={(picked) => closeMenu(!picked)}
              onside={side}
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="status">
    {@render trailing?.()}
    {#each status as item (item.label)}
      {#if item.onclick}
        <button
          type="button"
          class="status-item"
          class:active={item.active}
          data-status={item.id}
          aria-label={item.label}
          aria-pressed={item.active === undefined ? undefined : item.active}
          title={item.label}
          onclick={item.onclick}
        >
          <Icon name={item.icon} size={16} />
          {#if item.text}<span>{item.text}</span>{/if}
        </button>
      {:else}
        <span class="status-item" data-status={item.id} title={item.label}>
          <Icon name={item.icon} size={16} label={item.label} />
          {#if item.text}<span>{item.text}</span>{/if}
        </span>
      {/if}
    {/each}
    {#if clock}
      {#if onday}
        <button type="button" class="day" onclick={onday}>{@render day()}</button>
      {:else}
        <span class="day">{@render day()}</span>
      {/if}
    {/if}
  </div>
</header>

<style>
  .menubar {
    /* Front layer: always sticky. */
    position: sticky;
    top: 0;
    z-index: var(--z-front);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    height: calc(var(--control-sm) + 6px);
    padding: 0 var(--space-3);
    background: var(--light, none), var(--layer-front-bg);
    border-bottom: 0.75px solid var(--layer-front-border);
    box-shadow:
      inset 0 -1px 0 var(--pill-bloom),
      var(--glass-shadow);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    color: var(--text);
    font-size: var(--fs-md);
    user-select: none;
  }
  /* Thick glass: the lens scatters and bends the backdrop, the shelf only lends it a thin body. */
  .lensed {
    isolation: isolate;
    background: var(--light, none), var(--layer-front-lens-bg);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  /* The shelf: it floats, so the wallpaper reads as one surface behind it. */
  .floating {
    top: var(--space-2);
    margin: var(--space-2) var(--space-3) 0;
    padding: 0 3px;
    border: 0.75px solid var(--layer-front-border);
    border-radius: calc(var(--radius-lg) + 3px);
    box-shadow: var(--layer-front-shadow);
  }
  .menus,
  .status {
    display: flex;
    align-items: center;
    gap: 2px;
    min-width: 0;
  }
  .slot {
    position: relative;
  }
  .trigger,
  .status-item,
  .day {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--control-sm);
    padding: 0 0.65rem;
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: inherit;
    font: inherit;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    cursor: default;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .trigger {
    position: relative;
    color: var(--text-2);
  }
  /* The shelf is slim, but every item is as easy to hit as any control: an invisible hit area
     grows to --target-min where the item is shorter (compact density). */
  .trigger::before,
  button.status-item::before,
  button.day::before {
    content: '';
    position: absolute;
    top: min(0px, calc((100% - var(--target-min)) / 2));
    bottom: min(0px, calc((100% - var(--target-min)) / 2));
    left: 0;
    right: 0;
  }
  button.status-item {
    position: relative;
  }
  .trigger:active,
  button.status-item:active,
  button.day:active {
    transform: var(--press-squish);
  }
  /* The app pill: the name of what you are using, on a soft glass chip. */
  .app {
    gap: var(--space-2);
    padding-left: 5px;
    background: var(--fill-subtle);
    box-shadow:
      inset 0 0 0 0.75px var(--border-strong),
      inset 0 1px 0 var(--pill-light);
    color: var(--text);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
  }
  .app:not(:has(.app-icon)) {
    padding-left: 0.75rem;
  }
  .app-icon {
    display: inline-flex;
  }
  .trigger:hover,
  button.status-item:hover,
  button.day:hover {
    background: var(--fill-hover);
    color: var(--text);
  }
  .trigger[aria-expanded='true'],
  .status-item.active {
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .app[aria-expanded='true'] {
    color: var(--text);
  }
  .trigger:focus-visible,
  .status-item:focus-visible,
  .day:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -2px;
  }

  /* The system menu: a wrapped bonbon in the tint's hues — the desktop's own mark. Its wrapper
     ends twist when pointed at, like a sweet about to be unwrapped. */
  .logo {
    padding: 0 0.6rem;
  }
  .bonbon {
    display: block;
    width: 28px;
    height: 16px;
    overflow: visible;
  }
  .bonbon .body {
    fill: var(--tint);
  }
  .bonbon .shine {
    fill: none;
    stroke: var(--pill-light);
    stroke-width: 1.6;
    stroke-linecap: round;
  }
  .bonbon .end {
    fill: var(--tint-2);
    transform-box: fill-box;
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .bonbon .end--l {
    transform-origin: 100% 50%;
  }
  .bonbon .end--r {
    fill: var(--tint-3);
    transform-origin: 0 50%;
  }
  .logo:hover .end--l,
  .logo[aria-expanded='true'] .end--l {
    transform: rotate(-14deg) scaleY(1.1);
  }
  .logo:hover .end--r,
  .logo[aria-expanded='true'] .end--r {
    transform: rotate(14deg) scaleY(1.1);
  }

  .drop {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: var(--z-popover);
  }

  /* The day pill: greeting and time; the wink waits underneath until you point at it. */
  .day {
    position: relative;
    margin-left: var(--space-1);
    padding: 0 0.75rem;
    background: var(--fill-subtle);
    box-shadow:
      inset 0 0 0 0.75px var(--border-strong),
      inset 0 1px 0 var(--pill-light);
    color: var(--text);
  }
  .clock {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4em;
  }
  .hello {
    color: var(--text-2);
    font-weight: var(--fw-medium);
  }
  .sep {
    color: var(--text-3);
  }
  .clock-long {
    font-weight: var(--fw-semibold);
  }
  .wink {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-pill);
    border: 0.75px solid var(--pill-border);
    background: var(--tooltip-bg);
    box-shadow: var(--shadow-pop);
    color: var(--text);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    white-space: nowrap;
    opacity: 0;
    transform: translateY(-4px) scale(0.92);
    transform-origin: 85% 0;
    pointer-events: none;
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .day:hover .wink,
  .day:focus-visible .wink {
    opacity: 1;
    transform: none;
  }

  @media (max-width: 900px) {
    .hello,
    .sep {
      display: none;
    }
  }
  /* The status items give way before the menus can run into them. */
  @media (max-width: 760px) {
    .extra {
      display: none;
    }
    .status-item span {
      display: none;
    }
    .status-item {
      padding: 0 0.45rem;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .trigger,
    .status-item,
    .day,
    .wink,
    .bonbon .end {
      transition: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .menubar {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
