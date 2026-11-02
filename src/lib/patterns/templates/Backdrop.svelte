<script lang="ts">
  /**
   * Backdrop — what the ground layer sits on: a base colour, an optional image and a soft mesh
   * of tint blobs that drifts slowly (one cycle ≈ 48s). Every colour comes from `--tint`, so
   * changing the Application's tint recolours the backdrop too. Used by Application and Page;
   * use it directly for a hero band or a window.
   */
  interface Props {
    /** Base colour or any CSS background (gradient…). Default: the tinted page background. */
    color?: string | undefined;
    /** An image URL (or any CSS image), laid over the colour, covering. */
    image?: string | undefined;
    /** The tint mesh on top. */
    gradient?: boolean;
    /** Lets the mesh drift (off for `prefers-reduced-motion` anyway). */
    animate?: boolean;
    /** `fixed` stays put while the page scrolls; `contained` fills the parent only. */
    position?: 'fixed' | 'contained';
  }

  let { color, image, gradient = true, animate = true, position = 'fixed' }: Props = $props();

  const imageValue = $derived(
    image && !/^(url|image-set|linear-gradient|radial-gradient|conic-gradient)\(/.test(image)
      ? `url("${image}")`
      : image,
  );
</script>

<div
  class="backdrop backdrop--{position}"
  class:animate
  style:background={color}
  aria-hidden="true"
>
  {#if imageValue}<div class="image" style:background-image={imageValue}></div>{/if}
  {#if gradient}
    <div class="mesh" class:over-image={!!imageValue}>
      <span class="blob b1"></span>
      <span class="blob b2"></span>
      <span class="blob b3"></span>
    </div>
  {/if}
</div>

<style>
  .backdrop {
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    background: var(--bg);
  }
  .backdrop--fixed {
    position: fixed;
  }
  .backdrop--contained {
    position: absolute;
    border-radius: inherit;
  }
  .image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }
  .mesh {
    position: absolute;
    inset: -10%;
    filter: blur(70px) saturate(130%);
  }
  .mesh.over-image {
    opacity: 0.55;
    mix-blend-mode: soft-light;
  }
  .blob {
    position: absolute;
    border-radius: 50%;
    will-change: transform;
  }
  .b1 {
    width: 55%;
    aspect-ratio: 1;
    top: -12%;
    left: -8%;
    background: radial-gradient(circle at 40% 40%, var(--blob-1), transparent 68%);
  }
  .b2 {
    width: 60%;
    aspect-ratio: 1;
    bottom: -22%;
    right: -12%;
    background: radial-gradient(circle at 50% 50%, var(--blob-2), transparent 68%);
  }
  .b3 {
    width: 42%;
    aspect-ratio: 1;
    top: 30%;
    left: 38%;
    background: radial-gradient(circle at 50% 50%, var(--blob-3), transparent 70%);
  }
  .animate .b1 {
    animation: bb-drift-1 var(--duration-drift) ease-in-out infinite alternate;
  }
  .animate .b2 {
    animation: bb-drift-2 calc(var(--duration-drift) * 1.25) ease-in-out infinite alternate;
  }
  .animate .b3 {
    animation: bb-drift-3 calc(var(--duration-drift) * 0.85) ease-in-out infinite alternate;
  }
  @keyframes bb-drift-1 {
    to {
      transform: translate(18%, 14%) scale(1.12);
    }
  }
  @keyframes bb-drift-2 {
    to {
      transform: translate(-16%, -12%) scale(0.92);
    }
  }
  @keyframes bb-drift-3 {
    to {
      transform: translate(-24%, 10%) scale(1.2);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .blob {
      animation: none !important;
    }
  }
</style>
