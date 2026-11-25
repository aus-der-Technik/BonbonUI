<script lang="ts">
  /**
   * CallToAction organism — the closing band of a page: a headline, a line of text and the
   * actions, on a tinted surface that stands out from the panels around it.
   *
   * | tone     | looks like                                                     |
   * | -------- | -------------------------------------------------------------- |
   * | `tinted` | tinted glass with a soft tint glow (selected layer)            |
   * | `solid`  | a vivid tint gradient; put `glass` buttons on it               |
   * | `panel`  | plain frosted glass                                            |
   *
   *   <CallToAction title="Ready when you are" text="Start free, no card needed.">
   *     {#snippet actions()}<Button variant="primary" shape="pill" size="xl" label="Start free" />{/snippet}
   *   </CallToAction>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    text?: string | undefined;
    eyebrow?: string | undefined;
    actions?: Snippet | undefined;
    tone?: 'tinted' | 'solid' | 'panel';
    /** `start` puts the actions on the right of the text on wide screens. */
    align?: 'center' | 'start';
    heading?: 2 | 3;
    /** Extras under the actions: a sign-up form, small print. */
    children?: Snippet | undefined;
  }

  let {
    title,
    text,
    eyebrow,
    actions,
    tone = 'tinted',
    align = 'center',
    heading = 2,
    children,
  }: Props = $props();
</script>

<section class="cta cta--{tone} cta--{align}" data-layer={tone === 'panel' ? 'panel' : 'selected'}>
  <span class="glow" aria-hidden="true"></span>
  <div class="inner">
    <div class="copy">
      {#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
      <svelte:element this={`h${heading}`} class="title">{title}</svelte:element>
      {#if text}<p class="text">{text}</p>{/if}
    </div>
    {#if actions}<div class="actions">{@render actions()}</div>{/if}
    {#if children}<div class="extra">{@render children()}</div>{/if}
  </div>
</section>

<style>
  .cta {
    position: relative;
    isolation: isolate;
    container-type: inline-size;
    overflow: hidden;
    min-width: 0;
    padding: clamp(var(--space-8), 5vw, 4.5rem) clamp(var(--space-5), 5vw, 4.5rem);
    border-radius: var(--radius-dialog);
  }
  .cta--tinted {
    background: var(--layer-selected-bg);
    border: 1.5px solid var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .cta--panel {
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .cta--solid {
    color: var(--on-accent);
    background:
      radial-gradient(
        90% 120% at 100% 0%,
        color-mix(in oklab, var(--tint-2) 70%, transparent),
        transparent 60%
      ),
      linear-gradient(160deg, var(--accent), var(--accent-strong));
    box-shadow:
      0 30px 60px color-mix(in srgb, var(--tint) 32%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  /* A blurred blob of the secondary hues behind the text: the "candy" in the band. */
  .glow {
    position: absolute;
    z-index: -1;
    inset: -40% -10% auto auto;
    width: 60%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(
      closest-side,
      color-mix(in srgb, var(--tint-2) 45%, transparent),
      transparent
    );
    filter: blur(20px);
    pointer-events: none;
    /* The one bit of candy breathes very slowly; the band itself stays still. */
    animation: glow-drift var(--duration-drift) var(--ease-in-out) infinite alternate;
  }
  @keyframes glow-drift {
    to {
      transform: translate(-12%, 10%) scale(1.08);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .glow {
      animation: none;
    }
  }
  .cta--panel .glow {
    opacity: 0.6;
  }
  .cta--solid .glow {
    background: radial-gradient(closest-side, rgba(255, 255, 255, 0.28), transparent);
  }

  .inner {
    display: grid;
    gap: var(--space-6);
    justify-items: center;
    text-align: center;
  }
  .copy {
    display: grid;
    gap: var(--space-3);
    justify-items: inherit;
    max-width: 40rem;
  }
  .eyebrow {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .title {
    font-size: clamp(1.75rem, 1rem + 2.4vw, 2.75rem);
    font-weight: var(--fw-bold);
    line-height: 1.1;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }
  .text {
    font-size: var(--fs-xl);
    line-height: 1.5;
    color: var(--text-2);
    text-wrap: pretty;
  }
  .cta--solid .eyebrow,
  .cta--solid .text {
    color: inherit;
    opacity: 0.86;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-3);
  }
  .extra {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @container (min-width: 720px) {
    .cta--start .inner {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      justify-items: start;
      text-align: left;
    }
    .cta--start .extra {
      grid-column: 1 / -1;
      justify-content: flex-start;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .cta--tinted,
    .cta--panel {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
</style>
