<script lang="ts">
  /**
   * ChoiceCard molecule — a frosted tile to pick one of several things (a data set chooser, a plan,
   * a template): an optional icon in a tinted squircle, title with badges, a meta line and a
   * three-line description. It lifts on hover; `selected` turns it into the tinted "selected"
   * layer. A link with `href`, a button otherwise.
   *
   *   <ChoiceCard icon="database" title="Venues" meta="14 columns" about="…" onclick={open} />
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';

  interface Props {
    title: string;
    meta?: string | undefined;
    about?: string | undefined;
    /** Shown in a tinted squircle above the title. */
    icon?: IconName | undefined;
    /** Marks the chosen tile (tinted glass, `aria-pressed` on a button). */
    selected?: boolean | undefined;
    href?: string | undefined;
    onclick?: (() => void) | undefined;
    badges?: Snippet | undefined;
  }

  let { title, meta, about, icon, selected, href, onclick, badges }: Props = $props();
</script>

{#snippet content()}
  {#if icon}<span class="icon-tile" aria-hidden="true"><Icon name={icon} size={20} /></span>{/if}
  <span class="head">
    <span class="title">{title}</span>
    {#if badges}<span class="badges">{@render badges()}</span>{/if}
  </span>
  {#if meta}<span class="meta">{meta}</span>{/if}
  {#if about}<span class="about">{about}</span>{/if}
{/snippet}

{#if href}
  <a class="choice" class:selected {href} aria-current={selected ? 'true' : undefined}
    >{@render content()}</a
  >
{:else}
  <button type="button" class="choice" class:selected aria-pressed={selected} {onclick}
    >{@render content()}</button
  >
{/if}

<style>
  .choice {
    display: grid;
    align-content: start;
    gap: var(--space-1);
    min-width: 0;
    padding: var(--space-4) var(--space-5) var(--space-5);
    border-radius: var(--radius-card);
    cursor: pointer;
    text-align: left;
    color: inherit;
    font: inherit;
    text-decoration: none;
    background: var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    border: 0.75px solid var(--pill-border);
    box-shadow: var(--shadow-frosted);
    transition:
      box-shadow var(--motion-base) var(--ease-out),
      background-color var(--motion-base) var(--ease-out),
      transform var(--motion-base) var(--ease-out);
  }
  .choice:hover {
    box-shadow: var(--shadow-frosted-hover);
    transform: var(--hover-lift);
  }
  /* Large surfaces press only a little; the jelly squish is for pills. */
  .choice:active {
    transform: scale(0.99);
    transition-duration: var(--motion-quick);
  }
  .choice:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    box-shadow: var(--shadow-frosted-hover), var(--focus-halo);
  }
  .selected {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .selected:hover {
    box-shadow: var(--layer-selected-shadow);
  }
  .selected:focus-visible {
    box-shadow: var(--layer-selected-shadow), var(--focus-halo);
  }
  .icon-tile {
    display: grid;
    place-items: center;
    width: var(--control-lg);
    height: var(--control-lg);
    margin-bottom: var(--space-2);
    border-radius: var(--radius-md);
    background: var(--accent-soft);
    color: var(--accent-ink);
    box-shadow: inset 0 1px 0 var(--pill-light);
  }
  .selected .icon-tile {
    background: var(--grad-primary);
    color: var(--on-accent);
    box-shadow: var(--shadow-primary);
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    min-width: 0;
  }
  .badges {
    display: inline-flex;
    gap: var(--space-1);
    flex-shrink: 0;
  }
  .title {
    font-size: var(--fs-base);
    font-weight: var(--fw-heavy);
    letter-spacing: var(--tracking-tight);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .meta {
    font-size: var(--fs-xs);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .about {
    margin-top: var(--space-1);
    font-size: var(--fs-sm);
    line-height: 1.45;
    color: var(--text-2);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  @media (prefers-reduced-transparency: reduce) {
    .choice {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
    .choice.selected {
      background: var(--layer-selected-bg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .choice {
      transition: none;
    }
    .choice:hover,
    .choice:active {
      transform: none;
    }
  }
</style>
