<script lang="ts">
  /**
   * Local only (not in git): an editorial square. A small serif headline, a sentence or two,
   * and a live group of components, framed like every other square (word mark, caption).
   *
   * `layout`: `top` text above the group, `bottom` text below it, `left` text in a column
   * beside it. The group is scaled by `zoom` inside its own area.
   */
  import type { Snippet } from 'svelte';
  import Frame from './Frame.svelte';

  interface Props {
    tint: string;
    theme: 'light' | 'dark';
    photo?: string | undefined;
    eyebrow?: string | undefined;
    title: string;
    text: string;
    caption: string;
    layout?: 'top' | 'bottom' | 'left' | undefined;
    zoom?: number | undefined;
    children: Snippet;
  }
  let {
    tint,
    theme,
    photo,
    eyebrow,
    title,
    text,
    caption,
    layout = 'top',
    zoom = 1.3,
    children,
  }: Props = $props();
</script>

<Frame {tint} {theme} {photo} {caption} layout="free">
  <div class="spread spread--{layout}" class:spread--photo={photo}>
    <header class="copy">
      {#if eyebrow}<span class="eyebrow">{eyebrow}</span>{/if}
      <h2 class="title">{title}</h2>
      <p class="text">{text}</p>
    </header>
    <div class="group">
      <div class="zoom" style:--zoom={zoom}>{@render children()}</div>
    </div>
  </div>
</Frame>

<style>
  .spread {
    position: absolute;
    inset: 72px 64px 104px;
    display: grid;
    gap: 40px;
  }
  .spread--top {
    grid-template-rows: auto 1fr;
  }
  .spread--bottom {
    grid-template-rows: 1fr auto;
  }
  .spread--bottom .copy {
    order: 2;
  }
  .spread--left {
    grid-template-columns: 330px 1fr;
    align-items: center;
  }
  .copy {
    display: grid;
    gap: 16px;
    max-width: 40rem;
    align-content: start;
  }
  .eyebrow {
    font-size: 0.8rem;
    font-weight: var(--fw-semibold);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .title {
    margin: 0;
    font-family: var(--font-serif);
    font-size: 3.4rem;
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.015em;
    color: var(--text);
    text-wrap: balance;
  }
  .text {
    margin: 0;
    max-width: 34rem;
    font-size: 1.3rem;
    line-height: 1.45;
    color: var(--text-2);
    text-wrap: pretty;
  }
  .spread--photo .copy {
    text-shadow: 0 1px 14px color-mix(in srgb, var(--surface, white) 80%, transparent);
  }
  .group {
    display: grid;
    place-items: center;
    min-height: 0;
  }
  .zoom {
    transform: scale(var(--zoom));
  }
</style>
