<script lang="ts">
  /**
   * Storybook-only: a story shown at phone size (390 × 760) in a frame of its own, so its phone
   * rules — which follow the width of the window they are in — really apply. Link underneath to
   * open the story on its own.
   */
  import { storyHref } from './study/links';

  interface Props {
    /** The story's id (`atoms-sheetgrip--on-a-popover`). */
    story: string;
    /** What the frame shows, for screen readers and the link. */
    title: string;
    /** What to try, one quiet line under the frame. */
    caption?: string | undefined;
    height?: number;
  }

  let { story, title, caption, height = 720 }: Props = $props();
</script>

<figure class="phone" data-live>
  <div class="device" style:height="{height}px">
    <iframe {title} src="iframe.html?id={story}&viewMode=story" loading="lazy"></iframe>
  </div>
  <figcaption>
    {#if caption}<span>{caption}</span>{/if}
    <a href={storyHref(story)} target="_top">Open “{title}” on its own ↗</a>
  </figcaption>
</figure>

<style>
  .phone {
    display: grid;
    justify-items: center;
    gap: var(--space-3);
    margin: var(--space-5) 0;
  }
  .device {
    width: min(390px, 100%);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 46px;
    background: color-mix(in oklch, var(--text) 88%, var(--bg));
    box-shadow:
      0 30px 60px -30px rgb(0 0 0 / 0.45),
      inset 0 0 0 1.5px color-mix(in oklch, var(--text) 60%, transparent);
  }
  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 36px;
    background: var(--bg);
  }
  figcaption {
    display: grid;
    justify-items: center;
    gap: var(--space-1);
    max-width: 34rem;
    font-size: var(--fs-sm);
    color: var(--text-3);
    text-align: center;
  }
  a {
    color: var(--accent-ink);
  }
</style>
