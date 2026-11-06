<script lang="ts">
  /**
   * TitlePill molecule — the liquid glass pill with a glowing accent bar and "App — what it
   * does", which opens an app's header. `logo` replaces the bar (an app icon, a mark). A link with
   * `href`, a button with `onclick` (e.g. back to top), plain otherwise; links and buttons catch a
   * sugar-glass sheen on hover and squish when pressed. Frosted glass; `lens={{ refraction: true }}`
   * opts into a gentle refraction (see GlassLens).
   *
   *   <TitlePill title="Inventory" subtitle="stock across all stores" href="/" />
   */
  import type { Snippet } from 'svelte';
  import GlassLens from '../atoms/GlassLens.svelte';
  import { frostFilter, type LensOptions } from '../../utils/lens';

  interface Props {
    title: string;
    subtitle?: string | undefined;
    href?: string | undefined;
    /** With `href`: runs on a plain left click (modified clicks still follow the link). */
    onclick?: ((event: MouseEvent) => void) | undefined;
    /** Tooltip, e.g. "Back to top" or "All data products". */
    hint?: string | undefined;
    /** In place of the accent bar, e.g. an app icon. */
    logo?: Snippet | undefined;
    /** Refraction of the pill (magnify, rim, rimBend, chroma, blur, saturate); `false` = frosted. */
    lens?: LensOptions | false | undefined;
  }

  let { title, subtitle, href, onclick, hint, logo, lens = {} }: Props = $props();
  let lensDrawn = $state(false);
  const lensed = $derived(lens !== false && lensDrawn);
</script>

{#snippet content()}
  {#if lens !== false}<GlassLens {...lens} bind:active={lensDrawn} />{/if}
  {#if logo}{@render logo()}{:else}<span class="bar" aria-hidden="true"></span>{/if}
  <span class="title">
    {title}{#if subtitle}<span class="light">{` — ${subtitle}`}</span>{/if}
  </span>
{/snippet}

{#if href}
  <a
    class="pill"
    class:lensed
    style:--blur-pill={frostFilter(lens)}
    {href}
    title={hint}
    onclick={(event) => {
      // A real link underneath, so a middle or modified click still opens a new tab.
      if (
        !onclick ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      onclick(event);
    }}>{@render content()}</a
  >
{:else if onclick}
  <button
    type="button"
    class="pill"
    class:lensed
    style:--blur-pill={frostFilter(lens)}
    title={hint}
    {onclick}>{@render content()}</button
  >
{:else}
  <div class="pill" class:lensed style:--blur-pill={frostFilter(lens)}>{@render content()}</div>
{/if}

<style>
  .pill {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
    padding: 0.65rem var(--space-5) 0.65rem 1.1rem;
    border-radius: var(--radius-pill);
    background: var(--light, none), var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    border: 0.75px solid var(--pill-border);
    box-shadow: var(--shadow-header-pill);
    color: inherit;
    font: inherit;
    text-align: left;
    text-decoration: none;
  }
  a.pill,
  button.pill {
    cursor: pointer;
    /* The sheen rides as an extra background layer, parked off to the side until hover. */
    background:
      var(--sheen) 150% 0 / 250% 100% no-repeat,
      var(--pill-tint);
    transition:
      box-shadow var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  /* Thick glass: the lens scatters and bends the backdrop, the pill only lends it a thin body. */
  .pill.lensed {
    --pill-tint: var(--layer-front-lens-bg);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  a.pill:hover,
  button.pill:hover {
    animation: bb-sheen var(--motion-slow) var(--ease-out);
  }
  a.pill:active,
  button.pill:active {
    transform: var(--press-squish);
  }
  .bar {
    display: block;
    flex-shrink: 0;
    width: 5px;
    height: 26px;
    border-radius: var(--radius-pill);
    background: linear-gradient(180deg, var(--tint-400), var(--accent-strong));
    box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 55%, transparent);
  }
  a.pill:focus-visible,
  button.pill:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  /* Specular edge along the top and a bloom in the lower left. */
  .pill::before,
  .pill::after {
    content: '';
    position: absolute;
    pointer-events: none;
    z-index: -1;
  }
  .pill::before {
    inset: 0.8px 26% auto 4%;
    height: 44%;
    border-radius: var(--radius-pill);
    background: linear-gradient(180deg, var(--pill-edge), transparent);
  }
  .pill::after {
    left: -10%;
    bottom: -60%;
    width: 60%;
    height: 120%;
    border-radius: 50%;
    background: radial-gradient(closest-side, var(--pill-bloom), transparent);
  }
  .title {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .light {
    color: var(--text-3);
    font-weight: var(--fw-regular);
  }
  @media (max-width: 960px) {
    .light {
      display: none;
    }
  }
  @media (max-width: 520px) {
    .title {
      font-size: var(--fs-lg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    a.pill,
    button.pill {
      transition: none;
    }
    a.pill:is(:hover, :active),
    button.pill:is(:hover, :active) {
      transform: none;
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .pill {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
