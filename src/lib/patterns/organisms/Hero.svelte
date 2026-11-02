<script lang="ts">
  /**
   * Hero organism — the opening of a website: an eyebrow pill, a big headline (part of it can
   * glow in the tint gradient), a line of text, the main actions and a picture or product shot
   * beside or below. With `backdrop` it sits on its own drifting tint mesh, as a rounded band.
   * On load the copy rises in line by line and the media follows; a linked eyebrow catches a
   * sugar-glass sheen on hover.
   *
   *   <Hero eyebrow="New" title="Ship ideas faster" highlight="faster" text="…" image={url}>
   *     {#snippet actions()}<Button variant="primary" size="xl" shape="pill" label="Start free" />{/snippet}
   *   </Hero>
   */
  import type { Snippet } from 'svelte';
  import Image from '../atoms/Image.svelte';
  import Backdrop from '../templates/Backdrop.svelte';

  interface Props {
    title: string;
    /** A part of the title painted in the tint gradient. */
    highlight?: string | undefined;
    /** A small pill above the title ("New · Version 2"). */
    eyebrow?: string | undefined;
    eyebrowHref?: string | undefined;
    text?: string | undefined;
    actions?: Snippet | undefined;
    /** Picture side: a product shot, a mock-up, an illustration. */
    media?: Snippet | undefined;
    image?: string | undefined;
    imageAlt?: string;
    /** Where the media goes; `below` centres the text above it. */
    mediaPosition?: 'end' | 'start' | 'below';
    /** Text alignment; default `center` without media or with media below, else `start`. */
    align?: 'start' | 'center' | undefined;
    /** Its own tint mesh behind, as a rounded band. */
    backdrop?: boolean;
    /** Base colour / CSS background of that band. */
    background?: string | undefined;
    size?: 'md' | 'lg';
    /** Heading level (default 1: a hero is usually the page title). */
    heading?: 1 | 2;
    /** Extras under the actions: small print, a sign-up form, ratings. */
    children?: Snippet | undefined;
  }

  let {
    title,
    highlight,
    eyebrow,
    eyebrowHref,
    text,
    actions,
    media,
    image,
    imageAlt = '',
    mediaPosition = 'end',
    align,
    backdrop = false,
    background,
    size = 'lg',
    heading = 1,
    children,
  }: Props = $props();

  const hasMedia = $derived(!!(media || image));
  const alignment = $derived(
    align ?? (!hasMedia || mediaPosition === 'below' ? 'center' : 'start'),
  );
  const parts = $derived.by(() => {
    const at = highlight ? title.indexOf(highlight) : -1;
    if (!highlight || at < 0) return null;
    return [title.slice(0, at), highlight, title.slice(at + highlight.length)] as const;
  });
</script>

<section
  class="hero hero--{size} hero--align-{alignment} hero--media-{hasMedia ? mediaPosition : 'none'}"
  class:hero--backdrop={backdrop}
>
  {#if backdrop}<Backdrop color={background} position="contained" />{/if}
  <div class="inner">
    <div class="copy">
      {#if eyebrow}
        <svelte:element this={eyebrowHref ? 'a' : 'p'} href={eyebrowHref} class="eyebrow">
          <span class="spark" aria-hidden="true"></span>{eyebrow}
        </svelte:element>
      {/if}
      <svelte:element this={`h${heading}`} class="title">
        {#if parts}{parts[0]}<span class="highlight">{parts[1]}</span>{parts[2]}{:else}{title}{/if}
      </svelte:element>
      {#if text}<p class="text">{text}</p>{/if}
      {#if actions}<div class="actions">{@render actions()}</div>{/if}
      {#if children}<div class="extra">{@render children()}</div>{/if}
    </div>
    {#if hasMedia}
      <div class="media">
        {#if media}{@render media()}{:else}
          <span class="frame">
            <Image
              src={image}
              alt={imageAlt}
              ratio={mediaPosition === 'below' ? '16/9' : '4/3'}
              radius="none"
              lazy={false}
            />
          </span>
        {/if}
      </div>
    {/if}
  </div>
</section>

<style>
  .hero {
    position: relative;
    isolation: isolate;
    container-type: inline-size;
    min-width: 0;
    padding-block: clamp(var(--space-8), 6vw, 6rem) clamp(var(--space-6), 4vw, var(--space-12));
  }
  .hero--md {
    padding-block: clamp(var(--space-6), 4vw, var(--space-12));
  }
  .hero--backdrop {
    overflow: hidden;
    padding-inline: clamp(var(--space-5), 5vw, 5rem);
    border-radius: var(--radius-dialog);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--glass-shadow), var(--glass-inset);
  }
  .inner {
    display: grid;
    align-items: center;
    gap: var(--space-10) clamp(var(--space-8), 5vw, 5rem);
    min-width: 0;
  }
  .hero--media-end .inner {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  }
  .hero--media-start .inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  }
  .hero--media-start .media {
    order: -1;
  }

  .copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-5);
    min-width: 0;
  }
  /* Arrival: the copy rises line by line, the media settles in after it. Once, on load. */
  .copy > *,
  .media {
    animation: bb-rise var(--motion-slow) var(--ease-out) both;
  }
  .copy > :nth-child(2) {
    animation-delay: 60ms;
  }
  .copy > :nth-child(3) {
    animation-delay: 120ms;
  }
  .copy > :nth-child(n + 4) {
    animation-delay: 180ms;
  }
  .media {
    animation-duration: var(--motion-lazy);
    animation-delay: 160ms;
  }
  .hero--align-center .copy {
    align-items: center;
    text-align: center;
    max-width: 52rem;
    margin-inline: auto;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 0.35rem 0.85rem 0.35rem 0.6rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--accent-ink);
    text-decoration: none;
    background: var(--layer-front-bg);
    border: 0.75px solid var(--accent-border);
    box-shadow: var(--shadow-frosted);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    transition: transform var(--motion-quick) var(--ease-jelly);
  }
  a.eyebrow {
    position: relative;
    overflow: hidden;
  }
  a.eyebrow::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--sheen) no-repeat 150% 0 / 250% 100%;
    opacity: 0;
    pointer-events: none;
  }
  a.eyebrow:hover::after {
    opacity: 1;
    animation: bb-sheen var(--motion-lazy) var(--ease-out) forwards;
  }
  a.eyebrow:active {
    transform: var(--press-squish);
  }
  a.eyebrow:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }
  .spark {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: var(--radius-pill);
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }

  .title {
    font-size: clamp(2.25rem, 1.2rem + 4.2vw, 4.5rem);
    font-weight: var(--fw-bold);
    line-height: 1.04;
    letter-spacing: -0.035em;
    text-wrap: balance;
    color: var(--text);
  }
  .hero--md .title {
    font-size: clamp(2rem, 1.2rem + 2.8vw, 3.25rem);
  }
  .highlight {
    background: linear-gradient(
      100deg,
      var(--accent-ink),
      color-mix(in oklab, var(--tint-2) 70%, var(--accent-ink)) 55%,
      color-mix(in oklab, var(--tint-3) 60%, var(--accent-ink))
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .text {
    max-width: 38rem;
    font-size: clamp(var(--fs-lg), 0.9rem + 0.5vw, 1.25rem);
    line-height: 1.55;
    color: var(--text-2);
    text-wrap: pretty;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }
  .hero--align-center .actions {
    justify-content: center;
  }
  .extra {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }

  .media {
    position: relative;
    min-width: 0;
  }
  .frame {
    display: block;
    overflow: hidden;
    border-radius: var(--radius-dialog);
    border: 1px solid var(--layer-panel-border);
    box-shadow:
      0 30px 70px rgba(12, 12, 22, 0.22),
      0 8px 20px rgba(12, 12, 22, 0.1);
  }
  .hero--media-below .media {
    width: 100%;
    max-width: 68rem;
    margin-inline: auto;
  }
  .frame > :global(*) {
    display: block;
    width: 100%;
  }

  /* Side by side needs room; below that the media goes under the text. */
  @container (max-width: 820px) {
    .hero--media-end .inner,
    .hero--media-start .inner {
      grid-template-columns: minmax(0, 1fr);
    }
    .hero--media-start .media {
      order: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .eyebrow {
      transition: none;
    }
    .copy > *,
    .media,
    a.eyebrow:hover::after {
      animation: none;
    }
    a.eyebrow:hover::after {
      opacity: 0;
    }
  }
</style>
