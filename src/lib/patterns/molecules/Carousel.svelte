<script lang="ts">
  /**
   * Carousel molecule — a row of slides that snaps into place: swipe or scroll it, use the round
   * glass arrows, the dots or the arrow keys. Every direct child is one slide; `perView` shows
   * several at once (fewer on narrow screens), `peek` lets the next slide show at the edge.
   *
   *   <Carousel label="Featured">{#each items as item}<Card>…</Card>{/each}</Carousel>
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import { space, type Space } from '../layout/space';

  interface Props {
    /** Accessible name of the carousel. */
    label: string;
    /** Slides visible at once on a wide screen (2 on tablets and 1 on phones at most). */
    perView?: number;
    gap?: Space;
    /** Lets the next slide peek in at the edge. */
    peek?: boolean;
    /** Shows the arrow buttons. */
    arrows?: boolean;
    /** Shows the dots under the slides. */
    dots?: boolean;
    /** Wraps from the last slide to the first. */
    loop?: boolean;
    previousLabel?: string;
    nextLabel?: string;
    slideLabel?: (position: number, total: number) => string;
    /** Index of the first fully visible slide. */
    index?: number;
    onchange?: ((index: number) => void) | undefined;
    children: Snippet;
  }

  let {
    label,
    perView = 1,
    gap = 'md',
    peek = false,
    arrows = true,
    dots = true,
    loop = false,
    previousLabel = 'Previous slide',
    nextLabel = 'Next slide',
    slideLabel = (position, total) => `Go to slide ${position} of ${total}`,
    index = $bindable(0),
    onchange,
    children,
  }: Props = $props();

  const id = $props.id();
  let track: HTMLDivElement;
  let count = $state(0);
  // How many slides fit, measured; the CSS shows fewer than `perView` on small screens.
  let visible = $state(1);

  const slides = () => [...(track?.children ?? [])] as HTMLElement[];
  const pages = $derived(Math.max(1, count - visible + 1));

  function measure() {
    const first = slides()[0];
    const gapPx = parseFloat(getComputedStyle(track).columnGap) || 0;
    const fits =
      first && first.offsetWidth
        ? Math.round((track.clientWidth + gapPx) / (first.offsetWidth + gapPx))
        : Math.round(perView);
    visible = Math.max(1, Math.min(fits, Math.round(perView)));
  }

  $effect(() => {
    // Slides are plain children, so count them in the DOM and follow changes.
    const update = () => {
      count = track.children.length;
      slides().forEach((slide, i) => {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `${i + 1} / ${track.children.length}`);
      });
    };
    update();
    measure();
    const observer = new MutationObserver(() => {
      update();
      measure();
    });
    observer.observe(track, { childList: true });
    // Attached by hand: the arrow keys page the scroll region, which is not a widget role.
    track.addEventListener('keydown', onkeydown);
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : undefined;
    resize?.observe(track);
    return () => {
      observer.disconnect();
      resize?.disconnect();
      track.removeEventListener('keydown', onkeydown);
    };
  });

  function onscroll() {
    const all = slides();
    if (!all.length) return;
    const left = track.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    all.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - left);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    // At the end of the track the last page counts as reached even if it cannot snap left.
    if (left + track.clientWidth >= track.scrollWidth - 2) nearest = pages - 1;
    const next = Math.min(nearest, pages - 1);
    if (next !== index) {
      index = next;
      onchange?.(next);
    }
  }

  export function goTo(target: number): void {
    const last = pages - 1;
    const to = loop ? (target + pages) % pages : Math.max(0, Math.min(target, last));
    const slide = slides()[to];
    if (!slide) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo?.({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: reduce ? 'auto' : 'smooth',
    });
    if (to !== index) {
      index = to;
      onchange?.(to);
    }
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') goTo(index - 1);
    else if (event.key === 'ArrowRight') goTo(index + 1);
    else return;
    event.preventDefault();
  }
</script>

<section
  class="carousel"
  class:peek
  aria-roledescription="carousel"
  aria-label={label}
  style:--per-view={perView}
  style:--slide-gap={space(gap)}
>
  <div class="viewport">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      bind:this={track}
      class="track"
      id="{id}-track"
      tabindex="0"
      role="group"
      aria-label={label}
      {onscroll}
    >
      {@render children()}
    </div>
    {#if arrows && pages > 1}
      <button
        type="button"
        class="arrow arrow--prev"
        aria-label={previousLabel}
        aria-controls="{id}-track"
        disabled={!loop && index === 0}
        onclick={() => goTo(index - 1)}
      >
        <Icon name="chevron-left" size={20} />
      </button>
      <button
        type="button"
        class="arrow arrow--next"
        aria-label={nextLabel}
        aria-controls="{id}-track"
        disabled={!loop && index >= pages - 1}
        onclick={() => goTo(index + 1)}
      >
        <Icon name="chevron-right" size={20} />
      </button>
    {/if}
  </div>
  {#if dots && pages > 1}
    <div class="dots">
      {#each { length: pages }, i (i)}
        <button
          type="button"
          class="dot"
          class:active={i === index}
          aria-label={slideLabel(i + 1, pages)}
          aria-current={i === index ? 'true' : undefined}
          onclick={() => goTo(i)}
        ></button>
      {/each}
    </div>
  {/if}
</section>

<style>
  .carousel {
    --view: var(--per-view);
    display: grid;
    gap: var(--space-3);
    min-width: 0;
  }
  @media (max-width: 960px) {
    .carousel {
      --view: min(var(--per-view), 2);
    }
  }
  @media (max-width: 600px) {
    .carousel {
      --view: 1;
    }
  }
  .viewport {
    position: relative;
    min-width: 0;
  }
  .track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: calc((100% - (var(--view) - 1) * var(--slide-gap)) / var(--view));
    gap: var(--slide-gap);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    /* room for slide shadows inside the scroll box */
    padding: var(--space-2) var(--space-1) var(--space-3);
    margin: calc(var(--space-2) * -1) calc(var(--space-1) * -1) calc(var(--space-3) * -1);
    scroll-padding-inline: var(--space-1);
    border-radius: var(--radius-card);
    outline: none;
  }
  .track::-webkit-scrollbar {
    display: none;
  }
  .track:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .peek .track {
    grid-auto-columns: calc((88% - (var(--view) - 1) * var(--slide-gap)) / var(--view));
  }
  .track > :global(*) {
    scroll-snap-align: start;
    min-width: 0;
  }

  .arrow {
    position: absolute;
    top: 50%;
    z-index: 1;
    display: grid;
    place-items: center;
    width: var(--control-md);
    height: var(--control-md);
    border-radius: 50%;
    border: 0.75px solid var(--pill-border);
    background: var(--pill-tint);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    box-shadow:
      var(--shadow-frosted),
      inset 0 1px 0 var(--pill-light);
    color: var(--text);
    cursor: pointer;
    transform: translateY(-50%);
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-spring),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .arrow--prev {
    left: var(--space-2);
  }
  .arrow--next {
    right: var(--space-2);
  }
  .arrow:hover:not(:disabled) {
    box-shadow:
      var(--shadow-frosted-hover),
      inset 0 1px 0 var(--pill-light);
    transform: translateY(-50%) scale(1.06);
  }
  .arrow:active:not(:disabled) {
    transform: translateY(-50%) scale(0.94);
  }
  .arrow:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .arrow:disabled {
    opacity: 0;
    pointer-events: none;
  }
  @media (hover: none) {
    .arrow {
      display: none;
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: var(--space-1);
  }
  .dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    cursor: pointer;
    transition:
      width var(--motion-base) var(--ease-spring),
      background-color var(--motion-quick) var(--ease-out);
  }
  /* bigger hit area than the visible dot */
  .dot {
    box-shadow: 0 0 0 6px transparent;
  }
  .dot:hover {
    background: var(--text-3);
  }
  .dot.active {
    width: 22px;
    background: var(--accent);
  }
  .dot:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .arrow,
    .dot {
      transition: none;
    }
  }
</style>
