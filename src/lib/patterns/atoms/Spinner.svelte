<script lang="ts">
  /**
   * Spinner atom — an indeterminate busy "comet" in the accent (inside a button it takes the
   * button's text colour), announced as "Loading". Pass `label=""` when it sits next to its own
   * text.
   *
   *   <Spinner size={16} label="Saving" />
   */
  interface Props {
    size?: number;
    label?: string;
  }

  let { size = 20, label = 'Loading' }: Props = $props();
</script>

<!-- An empty label makes it decorative, for spinners next to their own text. -->
<span
  class="spinner"
  role={label ? 'status' : undefined}
  aria-label={label || undefined}
  aria-hidden={label ? undefined : 'true'}
  style:--size="{size}px"
></span>

<style>
  /* A candy comet: an arc that fades into its tail, with a round head, circling a faint track.
     It takes `--spinner-c` from its context (a button sets currentColor) and the accent elsewhere. */
  .spinner {
    --_c: var(--spinner-c, var(--accent));
    --_w: max(2px, calc(var(--size) / 8));
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background:
      conic-gradient(
        from 0deg,
        transparent 8%,
        color-mix(in srgb, var(--_c) 35%, transparent) 45%,
        var(--_c)
      ),
      color-mix(in srgb, var(--_c) 14%, transparent);
    -webkit-mask: radial-gradient(
      farthest-side,
      transparent calc(100% - var(--_w) - 0.5px),
      #000 calc(100% - var(--_w))
    );
    mask: radial-gradient(
      farthest-side,
      transparent calc(100% - var(--_w) - 0.5px),
      #000 calc(100% - var(--_w))
    );
    /* A gentle speed change per turn feels alive; a constant spin feels mechanical. */
    animation: bb-spin calc(var(--motion-slow) * 2.5) var(--ease-gentle) infinite;
  }
  .spinner::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: var(--_w);
    height: var(--_w);
    border-radius: 50%;
    background: var(--_c);
    transform: translateX(-50%);
  }
  @media (prefers-reduced-motion: reduce) {
    .spinner {
      animation-duration: calc(var(--motion-slow) * 6.5);
      animation-timing-function: linear;
    }
  }
</style>
