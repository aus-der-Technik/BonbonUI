<script lang="ts">
  /**
   * Storybook-only: a live example with its code underneath. The example is a real component;
   * `source` is the same file imported with `?raw`, shown as an app writes it (see `source.ts`),
   * so what you read is what runs.
   */
  import type { Snippet } from 'svelte';
  import Application from '../patterns/templates/Application.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import IntroDemo from './IntroDemo.svelte';
  import { appSource } from './source';

  interface Props {
    /** The example's file, imported with `?raw`. */
    source: string;
    /** The file name over the code. */
    label: string;
    /** `window`: a screen of its own (a contained Application); `stage`: on the page itself. */
    kind?: 'window' | 'stage';
    /** Window height (any CSS length). */
    height?: string;
    /** Window only: the tint of its Application. */
    tint?: string | undefined;
    caption?: string | undefined;
    children: Snippet;
  }

  let {
    source,
    label,
    kind = 'window',
    height = '30rem',
    tint,
    caption,
    children,
  }: Props = $props();

  const code = $derived(appSource(source));

  // Mounted one frame late: the page's "On this page" list reads the page's own h2 headings
  // when it mounts, and an example's headings belong to the example, not to the handbook.
  let ready = $state(false);
  $effect(() => {
    const frame = requestAnimationFrame(() => (ready = true));
    return () => cancelAnimationFrame(frame);
  });
</script>

<div class="live">
  <IntroDemo {kind} {height} {caption} align="stretch">
    {#if kind === 'window'}
      <Application contained {tint}>
        {#if ready}{@render children()}{/if}
      </Application>
    {:else if ready}
      {@render children()}
    {/if}
  </IntroDemo>
  <CodeBlock {label} {code} />
</div>

<style>
  .live {
    display: grid;
    gap: var(--space-4);
    min-width: 0;
  }
  /* The window is the example's screen: what an app pins to the viewport (a Page's photo
     backdrop) is pinned to the window instead of spilling over the handbook. */
  .live :global(.frame--window) {
    contain: paint;
  }
  /* A Desktop is screen-high (100dvh) unless told `contained`; in a preview the window is
     the screen, as the contained Application's --app-height already says to a Page. */
  .live :global(.frame--window .desktop:not(.contained)) {
    height: 100%;
  }
</style>
