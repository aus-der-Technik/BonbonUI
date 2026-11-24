<script lang="ts" module>
  export interface GalleryImage {
    src: string;
    alt: string;
    /** A smaller version for the thumbnail strip. */
    thumb?: string | undefined;
  }
</script>

<script lang="ts">
  /**
   * ProductGallery organism — the pictures of a product page: one large image with previous /
   * next buttons, and a strip of thumbnails to jump. The arrow keys page through the images
   * while the gallery has focus; Home and End jump to the first and last.
   *
   *   <ProductGallery images={[{ src: '/p/1.jpg', alt: 'Front' }, { src: '/p/2.jpg', alt: 'Back' }]} />
   */
  import Icon from '../atoms/Icon.svelte';
  import Image from '../atoms/Image.svelte';

  interface Props {
    images: GalleryImage[];
    /** Index of the shown image. */
    index?: number;
    /** Width / height of the main image. */
    aspect?: string;
    /** Thumbnails below or (wide screens) along the left side. */
    thumbs?: 'below' | 'side' | 'none';
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
    showLabel?: (index: number, total: number) => string;
    onchange?: ((index: number) => void) | undefined;
  }

  let {
    images,
    index = $bindable(0),
    aspect = '1 / 1',
    thumbs = 'below',
    label = 'Product images',
    previousLabel = 'Previous image',
    nextLabel = 'Next image',
    showLabel = (i, total) => `Image ${i + 1} of ${total}`,
    onchange,
  }: Props = $props();

  const total = $derived(images.length);
  const current = $derived(images[Math.min(index, Math.max(total - 1, 0))]);

  function go(next: number) {
    if (!total) return;
    const wrapped = (next + total) % total;
    if (wrapped === index) return;
    index = wrapped;
    onchange?.(wrapped);
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') go(index + 1);
    else if (event.key === 'ArrowLeft') go(index - 1);
    else if (event.key === 'Home') go(0);
    else if (event.key === 'End') go(total - 1);
    else return;
    event.preventDefault();
  }
</script>

<!-- Arrow keys bubble up from the buttons inside, so the whole gallery pages with them. -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="gallery gallery--{thumbs}"
  role="group"
  aria-roledescription="gallery"
  aria-label={label}
  {onkeydown}
>
  <div class="layout">
    <div class="stage" style:aspect-ratio={aspect}>
      {#if current}
        {#key current.src}
          <span class="main"
            ><Image
              src={current.src}
              alt={current.alt}
              ratio={aspect}
              radius="none"
              lazy={false}
            /></span
          >
        {/key}
      {/if}
      {#if total > 1}
        <button
          type="button"
          class="nav nav--prev"
          aria-label={previousLabel}
          onclick={() => go(index - 1)}
        >
          <Icon name="chevron-left" size={20} />
        </button>
        <button
          type="button"
          class="nav nav--next"
          aria-label={nextLabel}
          onclick={() => go(index + 1)}
        >
          <Icon name="chevron-right" size={20} />
        </button>
        <span class="counter" aria-live="polite">{showLabel(index, total)}</span>
      {/if}
    </div>

    {#if thumbs !== 'none' && total > 1}
      <ul class="thumbs">
        {#each images as image, i (image.src)}
          <li>
            <button
              type="button"
              class="thumb"
              aria-label={showLabel(i, total)}
              aria-current={i === index ? 'true' : undefined}
              onclick={() => go(i)}
            >
              <Image src={image.thumb ?? image.src} alt="" ratio="1/1" radius="none" />
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .gallery {
    container-type: inline-size;
    min-width: 0;
  }
  .layout {
    display: grid;
    gap: var(--space-3);
    min-width: 0;
  }
  .stage {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-dialog);
    background:
      radial-gradient(120% 80% at 30% 20%, var(--tint-100), transparent 60%),
      linear-gradient(160deg, var(--fill-subtle), var(--fill-muted));
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--glass-shadow);
  }
  .main,
  .main > :global(*),
  .thumb > :global(*) {
    display: block;
    width: 100%;
    height: 100%;
  }
  .main {
    animation: fade var(--motion-base) var(--ease-out);
  }
  @keyframes fade {
    from {
      opacity: 0.4;
      transform: scale(1.015);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  .nav {
    position: absolute;
    top: 50%;
    display: grid;
    place-items: center;
    width: var(--control-lg);
    height: var(--control-lg);
    padding: 0;
    border: 0.75px solid var(--layer-front-border);
    border-radius: var(--radius-pill);
    color: var(--text);
    background: var(--layer-front-bg);
    box-shadow: var(--shadow-frosted);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    cursor: pointer;
    opacity: 0;
    transform: translateY(-50%) scale(0.92);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .nav--prev {
    left: var(--space-3);
  }
  .nav--next {
    right: var(--space-3);
  }
  .stage:hover .nav,
  .gallery:focus-within .nav,
  .nav:focus-visible {
    opacity: 1;
    transform: translateY(-50%);
  }
  .nav:active {
    transform: translateY(-50%) scale(0.9);
  }
  .nav:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  /* Touch screens have no hover: keep the arrows visible. */
  @media (hover: none) {
    .nav {
      opacity: 1;
      transform: translateY(-50%);
    }
  }
  .counter {
    position: absolute;
    left: 50%;
    bottom: var(--space-3);
    transform: translateX(-50%);
    padding: 0.2rem 0.65rem;
    border-radius: var(--radius-pill);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    color: var(--text);
    background: var(--layer-front-bg);
    box-shadow: var(--shadow-frosted);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
  }

  .thumbs {
    display: flex;
    gap: var(--space-2);
    margin: 0;
    padding: 2px;
    list-style: none;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .thumb {
    display: block;
    width: 4.5rem;
    aspect-ratio: 1;
    padding: 0;
    overflow: hidden;
    border: 0;
    border-radius: var(--radius-lg);
    background: var(--fill-muted);
    cursor: pointer;
    opacity: 0.65;
    box-shadow: inset 0 0 0 1px var(--border-strong);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .thumb:hover {
    opacity: 1;
  }
  .thumb:active {
    transform: scale(0.94);
  }
  .thumb[aria-current='true'] {
    opacity: 1;
    box-shadow:
      0 0 0 2px var(--bg),
      0 0 0 4px var(--accent);
  }
  .thumb:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }

  @container (min-width: 560px) {
    .gallery--side .layout {
      grid-template-columns: auto minmax(0, 1fr);
    }
    .gallery--side .thumbs {
      order: -1;
      flex-direction: column;
      overflow: auto;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .main {
      animation: none;
    }
    .nav,
    .thumb {
      transition: none;
    }
  }
</style>
