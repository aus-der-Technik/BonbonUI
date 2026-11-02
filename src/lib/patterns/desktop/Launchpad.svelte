<script lang="ts">
  /**
   * Launchpad — the **candy jar**: every app in one glass jar that rises from the bottom of the
   * screen, search first, grouped by `category`. The icons pour in one after another (a 30ms
   * stagger) so the grid feels poured, not dumped. Typing filters, Enter opens the first
   * match, arrows move between icons, Escape or a click beside the jar closes. Inside a
   * Desktop it covers the desktop (the tray stays on top); elsewhere it covers the viewport.
   *
   *   <Launchpad bind:open apps={allApps} onselect={(app) => launch(app.id)} />
   */
  import { tick } from 'svelte';
  import SearchField from '../molecules/SearchField.svelte';
  import AppIcon from '../atoms/AppIcon.svelte';
  import { getDesktop, type AppEntry } from './shared.svelte';

  interface Props {
    open?: boolean;
    apps: AppEntry[];
    query?: string;
    onselect?: ((app: AppEntry) => void) | undefined;
    onclose?: (() => void) | undefined;
    /** Icon size in px. */
    size?: number;
    /** Heading of the jar and its accessible name. */
    label?: string;
    searchLabel?: string;
    placeholder?: string;
    emptyText?: string;
    /** Heading for apps without a `category` (when others have one). */
    otherLabel?: string;
    /** Heading of the search results. */
    resultsLabel?: string;
  }

  let {
    open = $bindable(false),
    apps,
    query = $bindable(''),
    onselect,
    onclose,
    size = 60,
    label = 'All apps',
    searchLabel = 'Search apps',
    placeholder = 'Search apps',
    emptyText = 'Nothing here — try fewer words.',
    otherLabel = 'More',
    resultsLabel = 'Results',
  }: Props = $props();

  const id = $props.id();
  const inDesktop = !!getDesktop();
  let search = $state<HTMLInputElement>();
  let list = $state<HTMLElement>();
  let returnFocus: HTMLElement | null = null;

  const shown = $derived.by(() => {
    const q = query.trim().toLowerCase();
    return q
      ? apps.filter((a) => `${a.label} ${a.category ?? ''}`.toLowerCase().includes(q))
      : apps;
  });

  /** Categories in order of first appearance; uncategorised apps last. */
  const groups = $derived.by(() => {
    if (query.trim() || !apps.some((a) => a.category)) {
      return [{ title: query.trim() ? resultsLabel : undefined, apps: shown }];
    }
    const order: string[] = [];
    for (const a of shown) if (!order.includes(a.category ?? '')) order.push(a.category ?? '');
    order.sort((a, b) => (a === '' ? 1 : b === '' ? -1 : 0));
    return order.map((c) => ({
      title: c || otherLabel,
      apps: shown.filter((a) => (a.category ?? '') === c),
    }));
  });

  $effect(() => {
    if (!open) return;
    returnFocus = document.activeElement as HTMLElement | null;
    void tick().then(() => search?.focus());
  });

  function close() {
    open = false;
    query = '';
    onclose?.();
    returnFocus?.focus?.();
  }

  function pick(app: AppEntry) {
    onselect?.(app);
    close();
  }

  /** The icon in the next row up or down whose centre is nearest; works across groups. */
  function vertical(items: HTMLElement[], at: number, dir: 1 | -1): number | undefined {
    const boxes = items.map((el) => el.getBoundingClientRect());
    const here = boxes[at]!;
    const cx = here.left + here.width / 2;
    const beyond = boxes
      .map((b, i) => ({ b, i }))
      .filter(({ b }) => (dir > 0 ? b.top > here.top + 1 : b.top < here.top - 1));
    if (!beyond.length) return undefined;
    const rowTop = beyond.reduce(
      (best, { b }) => (Math.abs(b.top - here.top) < Math.abs(best - here.top) ? b.top : best),
      beyond[0]!.b.top,
    );
    return beyond
      .filter(({ b }) => b.top === rowTop)
      .reduce((best, cur) =>
        Math.abs(cur.b.left + cur.b.width / 2 - cx) < Math.abs(best.b.left + best.b.width / 2 - cx)
          ? cur
          : best,
      ).i;
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    const target = event.target as HTMLElement;
    if (target === search) {
      if (event.key === 'Enter' && shown[0]) {
        event.preventDefault();
        pick(shown[0]);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        list?.querySelector<HTMLElement>('button')?.focus();
      }
      return;
    }
    const items = [...(list?.querySelectorAll<HTMLElement>('button') ?? [])];
    const at = items.indexOf(target);
    if (at < 0) return;
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = Math.min(at + 1, items.length - 1);
    else if (event.key === 'ArrowLeft') next = Math.max(at - 1, 0);
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    else if (event.key === 'ArrowDown') next = vertical(items, at, 1) ?? at;
    else if (event.key === 'ArrowUp') next = vertical(items, at, -1) ?? -1;
    else return;
    event.preventDefault();
    if (next < 0) search?.focus();
    else items[next]?.focus();
  }
</script>

{#if open}
  <div
    class="launchpad"
    class:in-desktop={inDesktop}
    role="dialog"
    aria-modal="true"
    aria-labelledby="{id}-title"
    tabindex="-1"
    style:--app-col="{size}px"
    {onkeydown}
    onclick={(e) => e.target === e.currentTarget && close()}
  >
    <div class="jar">
      <header class="head">
        <h2 id="{id}-title">{label}</h2>
        <div class="search">
          <SearchField bind:value={query} bind:element={search} label={searchLabel} {placeholder} />
        </div>
      </header>
      {#if shown.length}
        <div class="apps" bind:this={list}>
          {#each groups as group, gi (group.title ?? gi)}
            <section class="group" aria-label={group.title}>
              {#if group.title}<h3>{group.title}</h3>{/if}
              <div class="grid" role="presentation">
                {#each group.apps as app (app.id)}
                  <span class="pour" style:--i={shown.indexOf(app)}>
                    <AppIcon
                      label={app.label}
                      icon={app.icon}
                      color={app.color ?? 'accent'}
                      src={app.src}
                      badge={app.badge}
                      {size}
                      caption
                      onclick={() => pick(app)}
                    />
                  </span>
                {/each}
              </div>
            </section>
          {/each}
        </div>
      {:else}
        <p class="empty">{emptyText}</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .launchpad {
    position: fixed;
    inset: 0;
    z-index: var(--z-popover);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: var(--space-8) var(--space-4) var(--space-6);
    background: color-mix(in srgb, var(--backdrop) 55%, transparent);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    outline: none;
    animation: bb-jar-fade var(--motion-base) var(--ease-out);
  }
  .in-desktop {
    position: absolute;
    z-index: calc(var(--z-front) - 1);
    /* Rise just above the tray. */
    padding-bottom: calc(var(--dock-room, var(--space-12)) + var(--space-3));
  }
  /* The jar itself: a big glass vessel that rises from the tray. */
  .jar {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    width: min(46rem, 100%);
    max-height: 100%;
    padding: var(--space-5) var(--space-6) var(--space-6);
    overflow: hidden;
    border-radius: var(--radius-dialog);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    box-shadow: var(--shadow-dialog);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
    color: var(--text);
    transform-origin: 50% 100%;
    animation: bb-jar-rise var(--motion-slow) var(--ease-out);
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
  }
  h2 {
    margin: 0;
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
  }
  .search {
    flex: 0 1 16rem;
    min-width: 10rem;
  }
  .search :global(input) {
    border-radius: var(--radius-pill);
  }
  .apps {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    min-height: 0;
    margin: 0 calc(var(--space-2) * -1);
    padding: var(--space-1) var(--space-2) var(--space-2);
    overflow-y: auto;
  }
  h3 {
    margin: 0 0 var(--space-3);
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(var(--app-col) + 1.75rem), 1fr));
    gap: var(--space-5) var(--space-2);
    justify-items: center;
  }
  /* Each icon pops in a beat after the one before it. */
  .pour {
    display: flex;
    justify-content: center;
    min-width: 0;
    max-width: 100%;
    animation: bb-pop var(--motion-base) var(--ease-out) backwards;
    animation-delay: calc(80ms + var(--i) * 30ms);
  }
  .grid :global(.caption) {
    max-width: calc(var(--app-col) + 1.5rem);
    font-size: var(--fs-xs);
  }
  .empty {
    margin: 0;
    padding: var(--space-8) 0;
    color: var(--text-2);
    font-size: var(--fs-lg);
    text-align: center;
  }
  @keyframes bb-jar-fade {
    from {
      opacity: 0;
    }
  }
  @keyframes bb-jar-rise {
    from {
      opacity: 0;
      transform: translateY(24px) scale(0.96);
    }
  }
  @media (max-width: 520px) {
    .launchpad {
      --app-col: 52px !important;
      padding-inline: var(--space-2);
    }
    .jar {
      padding: var(--space-4);
    }
    .search {
      flex-basis: 100%;
    }
    .grid :global(.app) {
      --app-size: 52px !important;
    }
    .grid :global(.tile > .icon) {
      width: 50%;
      height: 50%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .launchpad,
    .jar,
    .pour {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .launchpad {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
    .jar {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
