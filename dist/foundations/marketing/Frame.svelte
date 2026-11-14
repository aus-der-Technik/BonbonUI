<script lang="ts">
  /**
   * Local only (not in git): one square for a social image. The system's own backdrop in one
   * tint and theme, the word mark bottom left, a caption bottom right, and the arrangement
   * centred and scaled up by `zoom`. With `layout="free"` the children fill the square as they
   * are (editorial layouts place themselves).
   */
  import type { Snippet } from 'svelte';
  import Application from '../../patterns/templates/Application.svelte';

  interface Props {
    tint: string;
    theme: 'light' | 'dark';
    photo?: string | undefined;
    caption: string;
    note?: string | undefined;
    zoom?: number | undefined;
    layout?: 'centre' | 'free' | undefined;
    /** Where a centred layout's scene sits: the middle, or the top-left corner at the margin. */
    place?: 'centre' | 'top-left' | undefined;
    children: Snippet;
  }
  let {
    tint,
    theme,
    photo,
    caption,
    note,
    zoom = 1.6,
    layout = 'centre',
    place = 'centre',
    children,
  }: Props = $props();
</script>

<Application {tint} {theme} image={photo} density="comfortable">
  <div class="square" class:square--photo={photo} data-theme-name={theme}>
    {#if layout === 'centre'}
      <div class="scene scene--{place}" style:--zoom={zoom}>{@render children()}</div>
    {:else}
      <div class="free">{@render children()}</div>
    {/if}
    <footer class="mark">
      <span class="word">BonbonUI</span>
      <span class="label">
        {#if note}<span class="note">{note}</span>{/if}
        <span class="caption">{caption}</span>
      </span>
    </footer>
  </div>
</Application>

<style>
  .square {
    position: relative;
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh;
    overflow: clip;
  }
  .scene {
    display: grid;
    place-items: center;
    /* Lifted a little: the corner text takes the bottom band. */
    margin-bottom: 40px;
    transform: scale(var(--zoom));
  }
  /* In the corner, on the same 44px margin as the word mark; scaled from that corner. */
  .scene--top-left {
    position: absolute;
    top: 44px;
    left: 44px;
    margin: 0;
    transform-origin: top left;
  }
  .free {
    position: absolute;
    inset: 0;
  }
  .square--photo .mark {
    text-shadow: 0 1px 12px rgba(255, 255, 255, 0.85);
  }
  .square--photo[data-theme-name='dark'] .mark {
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.75);
  }
  .square--photo .caption,
  .square--photo .note {
    color: var(--text);
  }
  .mark {
    position: absolute;
    left: 44px;
    right: 44px;
    bottom: 36px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--space-6);
    pointer-events: none;
  }
  .word {
    font-size: 1.35rem;
    font-weight: var(--fw-heavy);
    letter-spacing: -0.01em;
    line-height: 1;
    color: var(--text);
  }
  .label {
    display: grid;
    justify-items: end;
    gap: 6px;
    text-align: right;
  }
  .note {
    font-size: 0.95rem;
    color: var(--text-2);
    line-height: 1.2;
  }
  .caption {
    font-size: 0.8rem;
    font-weight: var(--fw-semibold);
    letter-spacing: 0.2em;
    line-height: 1;
    text-transform: uppercase;
    color: var(--accent-ink);
  }
</style>
