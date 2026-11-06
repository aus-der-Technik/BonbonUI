<script lang="ts">
  /**
   * Avatar atom — initials on a candy gradient disc, or a picture. With `src` it shows the image
   * and falls back to the initials when it is missing or fails to load. `square` suits logos:
   * rounded corners, the whole image contained.
   *
   * The disc follows the accent; `color` takes a palette name, or `'auto'` picks a stable
   * palette colour from the name, so a list of people gets told apart at a glance.
   *
   *   <Avatar name="jane.doe@example.com" color="auto" />
   */
  import { colorValue, paletteFor, type PaletteColor } from './palette';

  interface Props {
    /** A name or e-mail address; initials are derived from it. */
    name: string;
    size?: number;
    /** A portrait or logo; the initials show while it is missing or broken. */
    src?: string | undefined;
    shape?: 'round' | 'square';
    /** Disc colour: the accent (default), a palette name, or `auto` (derived from `name`). */
    color?: 'accent' | 'auto' | PaletteColor;
  }

  let { name, size = 34, src, shape = 'round', color = 'accent' }: Props = $props();

  const disc = $derived(
    color === 'accent' ? undefined : colorValue(color === 'auto' ? paletteFor(name) : color),
  );

  const initials = $derived(toInitials(name));
  let failed = $state(false);

  $effect(() => {
    // A new picture gets a fresh chance to load.
    void src;
    failed = false;
  });

  function toInitials(value: string): string {
    // "kris.simon@example.com" → "KS"; "Kris Simon" → "KS"; "kris" → "K".
    const local = value.split('@')[0] ?? value;
    const parts = local.split(/[\s._-]+/).filter(Boolean);
    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }
</script>

{#if src && !failed}
  <img
    class="avatar avatar--image avatar--{shape}"
    style:--size="{size}px"
    {src}
    alt=""
    loading="lazy"
    onerror={() => (failed = true)}
  />
{:else}
  <span
    class="avatar avatar--{shape}"
    class:avatar--colored={disc}
    style:--size="{size}px"
    style:--avatar-c={disc}
    aria-hidden="true">{initials}</span
  >
{/if}

<style>
  .avatar {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    font-size: calc(var(--size) * 0.36);
    font-weight: var(--fw-bold);
    letter-spacing: 0.01em;
    color: var(--on-accent);
    background: var(--avatar-grad);
    box-shadow:
      0 2px 6px rgba(12, 12, 22, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.45);
    user-select: none;
  }
  .avatar--colored {
    color: oklch(from var(--avatar-c) clamp(0.16, (0.8 - l) * 999, 1) 0 0);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 55%),
      linear-gradient(
        160deg,
        color-mix(in oklab, var(--avatar-c) 85%, white),
        color-mix(in oklab, var(--avatar-c) 82%, black)
      );
  }
  .avatar--square {
    border-radius: calc(var(--size) * 0.2);
  }
  .avatar--image {
    object-fit: cover;
    background: var(--pill-light);
    box-shadow: none;
  }
  /* Logos keep their proportions and a little air on a light tile. */
  .avatar--image.avatar--square {
    object-fit: contain;
    padding: calc(var(--size) * 0.06);
  }
</style>
