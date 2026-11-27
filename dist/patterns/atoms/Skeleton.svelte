<script lang="ts">
  /**
   * Skeleton atom — a shimmering placeholder while content loads. `text` draws `lines` bars
   * (the last one shorter), `rect` a block, `circle` an avatar.
   *
   *   <Skeleton lines={3} />   <Skeleton shape="circle" width="40px" />
   */
  interface Props {
    shape?: 'text' | 'rect' | 'circle';
    width?: string;
    height?: string;
    lines?: number;
  }

  let { shape = 'text', width = '100%', height, lines = 1 }: Props = $props();
</script>

{#if shape === 'text'}
  <span class="stack" style:width aria-hidden="true">
    {#each Array.from({ length: lines }, (_, i) => i) as i (i)}
      <span
        class="bone text"
        style:width={i === lines - 1 && lines > 1 ? '60%' : '100%'}
        style:height
      ></span>
    {/each}
  </span>
{:else}
  <span
    class="bone {shape}"
    style:width
    style:height={height ?? (shape === 'circle' ? width : '4rem')}
    aria-hidden="true"
  ></span>
{/if}

<style>
  .stack {
    display: grid;
    gap: 0.5rem;
  }
  /* A calm placeholder with one soft band of light gliding across — "almost there", not flashing. */
  .bone {
    display: block;
    background:
      linear-gradient(
          100deg,
          transparent 30%,
          color-mix(in srgb, var(--pill-light) 55%, transparent) 50%,
          transparent 70%
        )
        0 0 / 250% 100%,
      var(--fill-muted);
    animation: bb-slide 1.8s var(--ease-in-out) infinite;
  }
  .text {
    height: 0.8em;
    border-radius: var(--radius-pill);
  }
  .rect {
    border-radius: var(--radius-lg);
  }
  .circle {
    border-radius: 50%;
  }
  @media (prefers-reduced-motion: reduce) {
    .bone {
      animation: none;
    }
  }
</style>
