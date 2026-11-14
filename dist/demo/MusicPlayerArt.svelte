<script lang="ts">
  /**
   * Storybook-only album art for the listening room: two palette colours and one motif, drawn
   * with CSS gradients so no image is fetched and both themes stay in palette.
   */
  import type { AlbumArt } from './mock-fun';

  interface Props {
    art: AlbumArt;
    /** Any CSS length; the art is square. */
    size?: string;
    class?: string;
  }

  let { art, size = '100%', class: extraClass = '' }: Props = $props();
</script>

<span
  class="art art--{art.motif} {extraClass}"
  style:--a="var(--color-{art.from})"
  style:--b="var(--color-{art.to})"
  style:--s="var(--color-{art.spot})"
  style:width={size}
  aria-hidden="true"
></span>

<style>
  .art {
    /* A thin highlight on the top edge: the same lamp from above as every other surface. */
    --_sheen: linear-gradient(
      180deg,
      color-mix(in srgb, var(--pill-light) 28%, transparent),
      transparent 38%
    );
    /* A veil of the ground colour: calms the art a little in dark, lifts it a little in light. */
    --_base:
      linear-gradient(color-mix(in srgb, var(--bg) 12%, transparent) 0 0),
      linear-gradient(150deg, var(--a), var(--b));
    display: block;
    aspect-ratio: 1;
    border-radius: var(--radius-lg);
    background: var(--_sheen), var(--_base);
    box-shadow:
      var(--panel-shadow),
      0 18px 40px -24px color-mix(in srgb, var(--b) 70%, transparent);
  }
  .art--sun {
    background:
      var(--_sheen), radial-gradient(circle at 50% 64%, var(--s) 0 21%, transparent 21.5%),
      linear-gradient(180deg, transparent 64%, color-mix(in srgb, var(--b) 75%, var(--a)) 64%),
      var(--_base);
  }
  .art--rings {
    background:
      var(--_sheen),
      repeating-radial-gradient(
        circle at 28% 72%,
        color-mix(in srgb, var(--s) 70%, transparent) 0 5%,
        transparent 5% 11%
      ),
      var(--_base);
  }
  .art--stripes {
    background:
      var(--_sheen),
      repeating-linear-gradient(
        -32deg,
        color-mix(in srgb, var(--s) 60%, transparent) 0 7%,
        transparent 7% 15%
      ),
      var(--_base);
  }
  .art--split {
    background:
      var(--_sheen), radial-gradient(circle at 62% 38%, var(--s) 0 17%, transparent 17.5%),
      linear-gradient(color-mix(in srgb, var(--bg) 12%, transparent) 0 0),
      linear-gradient(135deg, var(--a) 50%, var(--b) 50%);
  }
  .art--dots {
    background:
      var(--_sheen),
      radial-gradient(circle, color-mix(in srgb, var(--s) 85%, transparent) 0 22%, transparent 24%)
        0 0 / 25% 25%,
      var(--_base);
  }
</style>
