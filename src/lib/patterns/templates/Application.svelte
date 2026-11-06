<script module lang="ts">
  /** Ready-made tints for pickers and demos; any CSS colour works. */
  export const tintPresets: readonly { name: string; value: string }[] = [
    { name: 'Green', value: '#5a9854' },
    { name: 'Mint', value: '#00a89d' },
    { name: 'Blue', value: '#007aff' },
    { name: 'Indigo', value: '#5856d6' },
    { name: 'Purple', value: '#af52de' },
    { name: 'Pink', value: '#ff2d55' },
    { name: 'Red', value: '#e3000f' },
    { name: 'Orange', value: '#ff9500' },
    { name: 'Graphite', value: '#5b6170' },
  ];
</script>

<script lang="ts">
  /**
   * Application — the root of an app. It owns the theme: one tint colour every accent,
   * selection, focus ring and the drifting backdrop are computed from, the colour scheme, the
   * corner radius and the density. Put one around everything, then Pages inside:
   *
   *   <Application tint="#007aff">
   *     <Page title="Orders">…</Page>
   *   </Application>
   *
   * Without `tint` it inherits (default: #5a9854, the house green). The colours
   * are pure CSS (`color-mix`, relative colours), so changing `tint` re-themes instantly.
   *
   * The page flows: pressing any control (a key, a field, a slider) moves what lies on the same
   * layer like things floating in thick water, the far ones less, and a drag sways them along
   * (`utils/flow.ts`); `wiggle` sets how much (0 to 1, default 0.03), `flow={false}` keeps it
   * still. `shine` sets how much light what is on gives (0 to 1, default 0.6). And it is lit:
   * what is on or chosen (`data-emit`) casts its tint onto the surfaces near it — a little on
   * panels, more inside glass (`utils/light.ts`); `light={false}` turns that off.
   */
  import type { Snippet } from 'svelte';
  import Backdrop from './Backdrop.svelte';
  import { pressField } from '../../utils/flow';
  import { lightField } from '../../utils/light';

  interface Props {
    /** Any CSS colour. Every accent and the backdrop are computed from it. */
    tint?: string | undefined;
    /** `auto` follows the OS. */
    theme?: 'auto' | 'light' | 'dark' | undefined;
    /** Corner shape of every component. */
    radius?: 'square' | 'soft' | 'round' | undefined;
    /** Control heights: `compact` for dense tools, `comfortable` for touch and websites. */
    density?: 'compact' | 'default' | 'comfortable' | undefined;
    /** Backdrop base colour or CSS background. */
    background?: string | undefined;
    /** Backdrop image URL. */
    image?: string | undefined;
    /** The drifting tint mesh on the backdrop. */
    gradient?: boolean | undefined;
    animate?: boolean | undefined;
    /** Fills its parent instead of the viewport — for previews, embeds, windows. */
    contained?: boolean | undefined;
    /** Presses move their own layer like thick water (default on; off with reduced motion). */
    flow?: boolean;
    /** How much a press moves the page, from 0 (still) to 1. Default 0.03, a whisper; 0.8 is
     *  a clear, playful answer. Sets the `--wiggle` token. */
    wiggle?: number | undefined;
    /** Emitters light the surfaces around them (default on). */
    light?: boolean;
    /** How much light what is on gives, from 0 (none) to 1: the light on the surfaces and the
     *  glows (0.2 shines and glows less than 0.8). Default 0.6. Sets the `--shine` token. */
    shine?: number | undefined;
    class?: string;
    children: Snippet;
  }

  let {
    tint,
    theme = 'auto',
    radius = 'soft',
    density = 'default',
    background,
    image,
    gradient = true,
    animate = true,
    contained = false,
    flow = true,
    wiggle,
    light = true,
    shine,
    class: extraClass = '',
    children,
  }: Props = $props();

  let root = $state<HTMLElement>();
  // Both read their knob (`--wiggle`, `--shine`) from the root, so a value set further up
  // (the Storybook toolbar, a settings page) reaches them too.
  $effect(() => (flow && root ? pressField(root) : undefined));
  $effect(() => (light && root ? lightField(root) : undefined));

  const RADIUS = { square: 0.3, soft: 1, round: 1.45 } as const;
  const DENSITY = { compact: 0.86, default: 1, comfortable: 1.14 } as const;
</script>

<div
  bind:this={root}
  class="application {extraClass}"
  class:contained
  data-tint=""
  data-surface={image ? 'photo' : undefined}
  data-theme={theme === 'auto' ? undefined : theme}
  style:--tint={tint}
  style:--radius-scale={radius === 'soft' ? undefined : RADIUS[radius]}
  style:--density={density === 'default' ? undefined : DENSITY[density]}
  style:--wiggle={wiggle === undefined ? undefined : Math.min(1, Math.max(0, wiggle))}
  style:--shine={shine === undefined ? undefined : Math.min(1, Math.max(0, shine))}
>
  <Backdrop
    color={background}
    {image}
    {gradient}
    {animate}
    position={contained ? 'contained' : 'fixed'}
  />
  {#if contained}
    <!-- Its own scroll box, so sticky front layers stick to the preview, not the viewport. -->
    <div class="scroller">{@render children()}</div>
  {:else}
    {@render children()}
  {/if}
</div>

<style>
  .application {
    position: relative;
    isolation: isolate;
    min-height: 100dvh;
    color: var(--text);
    font-family: var(--font-sans);
    /* clip, not hidden: keeps sticky front layers working */
    overflow-x: clip;
  }
  .contained {
    --app-height: 100%;
    min-height: 0;
    height: 100%;
    overflow: clip;
  }
  .scroller {
    height: 100%;
    overflow: auto;
    overscroll-behavior: contain;
  }
</style>
