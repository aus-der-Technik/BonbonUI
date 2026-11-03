<script lang="ts">
  /**
   * Card atom — a surface of the panel layer, with an optional header row.
   *
   * - `glass`   — the frosted content card every section sits on (panel layer).
   * - `frosted` — the denser liquid-glass surface: sign-in card, chooser tiles, dialogs.
   * - `subtle`  — a flat neutral box inside a card (e.g. a row detail).
   *
   * `selected` turns it into the selected layer (tinted glass, tint rim and glow) — the chosen
   * plan, the open item. `interactive` adds a hover lift for clickable cards; with `href` the
   * whole card is a link, with `onclick` a button.
   *
   * A clickable card with a `title` uses the stretched-link pattern: the title is the real button
   * (or link, when an `href` card also has `actions`) and its hit area covers the card, so the
   * heading stays a heading and the actions stay separate buttons above it. Without a title the
   * card itself is the button — keep its content plain text then.
   *
   * `title` (with `count` and an `actions` snippet) adds a header row: caps title, muted count,
   * actions on the right. `accent` draws an accent stripe on the left edge. `gap` stacks the
   * children with that gap, so a card needs no inner wrapper.
   *
   *   <Card title="Orders" count={12} gap="sm">…</Card>
   *   <Card interactive selected={plan === 'team'} onclick={() => (plan = 'team')}>…</Card>
   */
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { space, type Space } from '../layout/space';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    surface?: 'glass' | 'frosted' | 'subtle';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    as?: 'div' | 'section' | 'article' | 'aside' | 'li';
    title?: string | undefined;
    /** Level of the title's heading element (default 2). */
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    count?: string | number | undefined;
    accent?: boolean;
    /** The selected layer: tinted glass with a tint rim. */
    selected?: boolean;
    /** Hover lift and pointer for clickable cards. Implied by `href` and `onclick`. */
    interactive?: boolean;
    /** Makes the whole card a link. */
    href?: string | undefined;
    /** Stacks the children vertically with this gap. */
    gap?: Space | undefined;
    actions?: Snippet | undefined;
    class?: string;
    children?: Snippet | undefined;
  }

  let {
    surface = 'glass',
    padding = 'md',
    as = 'div',
    title,
    headingLevel = 2,
    count,
    accent = false,
    selected = false,
    interactive = false,
    href,
    gap,
    actions,
    onclick,
    onkeydown,
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  // Stretched: a real button/link on the title covers the card; the card is no control itself.
  const stretchButton = $derived(!href && !!onclick && !!title);
  const stretchLink = $derived(!!href && !!title && !!actions);
  const stretched = $derived(stretchButton || stretchLink);
  const clickable = $derived(!href && !!onclick && !stretchButton);
  const lifts = $derived(interactive || !!href || !!onclick);

  function keydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) {
    (onkeydown as ((e: KeyboardEvent) => void) | null | undefined)?.(event);
    if (!clickable || event.defaultPrevented || event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  }
</script>

<svelte:element
  this={href && !stretchLink ? 'a' : as}
  href={stretchLink ? undefined : href}
  class="card card--{surface} card--pad-{padding} {extraClass}"
  class:card--stretched={stretched}
  class:card--accent={accent}
  class:card--selected={selected}
  class:card--interactive={lifts}
  class:card--stack={gap !== undefined}
  style:--card-gap={space(gap)}
  role={clickable ? 'button' : undefined}
  tabindex={clickable ? 0 : undefined}
  aria-pressed={clickable && selected ? 'true' : undefined}
  aria-current={href && selected && !stretchLink ? 'true' : undefined}
  onclick={stretchButton ? undefined : onclick}
  onkeydown={keydown}
  {...rest}
>
  {#if title || actions}
    <div class="card-head">
      {#if title}
        <svelte:element this={`h${headingLevel}`} class="card-title">
          {#if stretchButton}
            <button
              type="button"
              class="card-hit"
              aria-pressed={selected ? 'true' : undefined}
              onclick={onclick as ((event: MouseEvent) => void) | undefined}>{title}</button
            >
          {:else if stretchLink}
            <a class="card-hit" {href} aria-current={selected ? 'true' : undefined}>{title}</a>
          {:else}{title}{/if}
        </svelte:element>
      {/if}
      {#if count != null}<span class="card-count">{count}</span>{/if}
      {#if actions}<div class="card-actions">{@render actions()}</div>{/if}
    </div>
  {/if}
  {@render children?.()}
</svelte:element>

<style>
  .card {
    display: block;
    min-width: 0;
    color: inherit;
    text-decoration: none;
    /* A card is a big thing: it eases, it never springs. */
    transition:
      transform var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out);
  }
  .card--stack {
    display: flex;
    flex-direction: column;
    gap: var(--card-gap);
  }
  .card--stack > .card-head {
    margin-bottom: 0;
  }
  .card--accent {
    border-left: 4px solid var(--accent) !important;
  }
  .card-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-3);
    margin-bottom: var(--space-3);
  }
  .card-title {
    margin: 0;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-2);
  }
  /* Stretched link: the title's control covers the whole card; real controls sit above it. */
  .card--stretched {
    position: relative;
  }
  .card-hit {
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    text-align: inherit;
    text-decoration: none;
    text-transform: inherit;
    cursor: pointer;
  }
  .card-hit::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  .card-hit:focus-visible {
    outline: none;
  }
  .card--stretched:has(.card-hit:focus-visible) {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }
  .card--stretched .card-actions,
  .card--stretched
    :global(:is(a, button, input, select, textarea, label, summary, [tabindex]):not(.card-hit)) {
    position: relative;
    z-index: 1;
  }
  .card-count {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .card-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-left: auto;
  }
  .card--glass {
    background: var(--layer-panel-bg);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    border: 1px solid var(--layer-panel-border);
    border-radius: var(--radius-card);
    box-shadow: var(--layer-panel-shadow);
  }
  .card--frosted {
    background: var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    border: 0.75px solid var(--pill-border);
    border-radius: var(--radius-dialog);
    box-shadow: var(--shadow-frosted);
  }
  .card--subtle {
    background: var(--fill-subtle);
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
  }
  .card--selected {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .card--interactive {
    cursor: pointer;
  }
  .card--interactive:hover {
    transform: var(--hover-lift);
    box-shadow: var(--shadow-frosted-hover);
  }
  .card--interactive.card--selected:hover {
    box-shadow:
      0 18px 44px color-mix(in srgb, var(--tint) 28%, transparent),
      var(--glass-inset);
  }
  /* Larger surfaces press with a hint only — a squish would look like a wobble at this size. */
  .card--interactive:active {
    transform: scale(0.99);
    transition-duration: var(--motion-quick);
  }
  .card--interactive:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }
  .card--pad-none {
    padding: 0;
  }
  .card--pad-sm {
    padding: var(--space-3) var(--space-4);
  }
  .card--pad-md {
    padding: var(--space-5);
  }
  .card--pad-lg {
    padding: var(--space-6) var(--space-8);
  }
  @media (max-width: 520px) {
    .card--pad-lg {
      padding: var(--space-5);
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .card--glass,
    .card--frosted {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
    .card--selected {
      background: color-mix(in srgb, var(--tint) 13%, var(--bg-base));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .card {
      transition: none;
    }
    .card--interactive:hover,
    .card--interactive:active {
      transform: none;
    }
  }
</style>
