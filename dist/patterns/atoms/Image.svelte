<script lang="ts">
  /**
   * Image atom — a picture in a fixed aspect-ratio box with rounded corners, so grids of
   * products, posts or covers line up before anything has loaded. It shimmers while loading,
   * fades in when ready, and falls back to `fallback` (another URL) or a quiet placeholder with
   * an icon when the picture is missing or broken. Lazy by default.
   *
   *   <Image src={product.photo} alt={product.name} ratio="4/3" />
   *   <Image src={cover} alt="" ratio={16 / 9} radius="lg" fit="contain" />
   */
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  import type { IconName } from './icons';

  interface Props {
    src?: string | null | undefined;
    /** Describe the picture; `''` marks it decorative. */
    alt: string;
    /** Width / height: `"4/3"`, `"16/9"`, `"1/1"`, or a number like `1.5`. */
    ratio?: string | number;
    fit?: 'cover' | 'contain';
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'card' | 'pill';
    /** Tried once when `src` fails. */
    fallback?: string | undefined;
    /** Icon of the empty placeholder. */
    placeholderIcon?: IconName;
    lazy?: boolean;
    /** CSS width of the box (default: fill the container). */
    width?: string | undefined;
    /** A caption laid over the bottom edge, e.g. a price or a title. */
    overlay?: Snippet | undefined;
    onload?: (() => void) | undefined;
    onerror?: (() => void) | undefined;
  }

  let {
    src,
    alt,
    ratio = '4/3',
    fit = 'cover',
    radius = 'md',
    fallback,
    placeholderIcon = 'image',
    lazy = true,
    width,
    overlay,
    onload,
    onerror,
  }: Props = $props();

  let current = $state<string | null | undefined>(undefined);
  let status = $state<'loading' | 'ready' | 'failed'>('loading');

  $effect(() => {
    // A new source gets a fresh chance to load.
    current = src;
    status = src ? 'loading' : 'failed';
  });

  function loaded() {
    status = 'ready';
    onload?.();
  }

  function failed() {
    if (fallback && current !== fallback) {
      current = fallback;
      return;
    }
    status = 'failed';
    onerror?.();
  }

  const aspect = $derived(typeof ratio === 'number' ? String(ratio) : ratio.replace(/\s/g, ''));
</script>

<span
  class="image image--{radius} image--{status}"
  style:aspect-ratio={aspect}
  style:width
  role={status === 'failed' && alt ? 'img' : undefined}
  aria-label={status === 'failed' && alt ? alt : undefined}
>
  {#if current && status !== 'failed'}
    <img
      src={current}
      {alt}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      style:object-fit={fit}
      onload={loaded}
      onerror={failed}
    />
  {/if}
  {#if status === 'failed'}
    <span class="placeholder" aria-hidden="true"><Icon name={placeholderIcon} size={28} /></span>
  {/if}
  {#if overlay}<span class="overlay">{@render overlay()}</span>{/if}
</span>

<style>
  .image {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    background: var(--fill-subtle);
    box-shadow: inset 0 0 0 0.5px var(--border-strong);
    isolation: isolate;
  }
  .image--none {
    border-radius: 0;
  }
  .image--sm {
    border-radius: var(--radius-sm);
  }
  .image--md {
    border-radius: var(--radius-lg);
  }
  .image--lg {
    border-radius: var(--radius-xl);
  }
  .image--card {
    border-radius: var(--radius-card);
  }
  .image--pill {
    border-radius: var(--radius-pill);
  }
  .image--loading {
    background: linear-gradient(90deg, var(--fill-subtle), var(--fill-muted), var(--fill-subtle));
    background-size: 200% 100%;
    /* About 1.4 s per sweep: a calm shimmer, not a flicker. */
    animation: bb-slide calc(var(--motion-lazy) * 2.2) var(--ease-in-out) infinite;
  }
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity var(--motion-slow) var(--ease-out);
  }
  .image--ready img {
    opacity: 1;
  }
  .placeholder {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: var(--text-3);
    background:
      radial-gradient(circle at 30% 20%, var(--accent-faint), transparent 60%), var(--fill-subtle);
  }
  .overlay {
    position: absolute;
    inset: auto 0 0;
    z-index: 1;
    padding: var(--space-6) var(--space-3) var(--space-3);
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.55));
    color: #fff;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  @media (prefers-reduced-motion: reduce) {
    .image--loading {
      animation: none;
    }
    img {
      transition: none;
    }
  }
</style>
