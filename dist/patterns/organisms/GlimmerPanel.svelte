<script lang="ts">
  /**
   * GlimmerPanel — a panel that shows it is being worked on: while `working` (an assistant
   * writing an answer, a summary being drafted), a soft halo in the tint and its neighbouring
   * hues turns slowly round the panel and breathes, with a thin ring of the same colours on its
   * edge. When the work is done the glimmer fades out while still turning, so it lets go
   * instead of switching off. The feedback sits on the thing being made, not in a spinner
   * somewhere else. Under reduced motion the halo stands still.
   *
   *   <GlimmerPanel working={status === 'streaming'} aria-label="Answer">
   *     <Markdown source={answer} />
   *   </GlimmerPanel>
   *
   * A panel (or `level="selected"`), so never inside another panel. Forwarded attributes land
   * on the panel itself; it carries `aria-busy` while working.
   */
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import Layer from '../layout/Layer.svelte';
  import type { LayoutTag, Space } from '../layout/space';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    /** The glimmer runs while this is true and fades out when it turns false. */
    working?: boolean;
    level?: 'panel' | 'selected';
    as?: LayoutTag;
    padding?: Space | undefined;
    gap?: Space;
    class?: string;
    children?: Snippet | undefined;
  }

  let {
    working = false,
    level = 'panel',
    as = 'section',
    padding,
    gap = 'md',
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  // How long the halo keeps turning after the work is done, while its opacity fades
  // (a little longer than the fade, so the motion never stops before the light is gone).
  const FADE_MS = 720;
  let fading = $state(false);
  let wasWorking = false;
  $effect(() => {
    if (working) {
      wasWorking = true;
      fading = false;
      return;
    }
    if (!wasWorking) return;
    wasWorking = false;
    fading = true;
    const id = setTimeout(() => (fading = false), FADE_MS);
    return () => clearTimeout(id);
  });
</script>

<div class="glimmer" class:glimmer--on={working} class:glimmer--fading={fading}>
  <span class="glimmer__halo" aria-hidden="true"></span>
  <Layer
    {level}
    {as}
    {padding}
    {gap}
    class="glimmer__panel {extraClass}"
    aria-busy={working ? 'true' : undefined}
    {...rest}
  >
    {@render children?.()}
  </Layer>
  <span class="glimmer__ring" aria-hidden="true"></span>
</div>

<style>
  .glimmer {
    position: relative;
    isolation: isolate;
    min-width: 0;
    border-radius: var(--radius-card);
  }
  .glimmer > :global(.glimmer__panel) {
    z-index: 1;
  }
  .glimmer__halo,
  .glimmer__ring {
    /* The tint and its neighbours on the colour wheel, with one bright point: still one
       colour family, so the glimmer belongs to the page it is on. */
    --_glimmer: conic-gradient(
      from var(--bb-shimmer-angle),
      var(--tint),
      var(--tint-2),
      color-mix(in oklab, var(--tint) 30%, white),
      var(--tint-3),
      oklch(from var(--tint) l c calc(h + 150)),
      var(--tint)
    );
    position: absolute;
    pointer-events: none;
    background: var(--_glimmer);
    opacity: 0;
    transition: opacity var(--motion-lazy) var(--ease-out);
  }
  /* Behind the panel: blurred, so only a soft light shows around its edge. */
  .glimmer__halo {
    inset: -3px;
    z-index: 0;
    border-radius: calc(var(--radius-card) + 3px);
    filter: blur(9px);
  }
  /* On the panel's edge: the same colours, sharp, as a hairline ring. */
  .glimmer__ring {
    inset: -1.5px;
    z-index: 2;
    padding: 1.5px;
    border-radius: calc(var(--radius-card) + 1.5px);
    mask:
      linear-gradient(#000 0 0) content-box exclude,
      linear-gradient(#000 0 0);
  }
  .glimmer:is(.glimmer--on, .glimmer--fading) .glimmer__halo {
    animation:
      bb-shimmer-turn var(--duration-glimmer) linear infinite,
      bb-glimmer-wave calc(var(--duration-glimmer) * 0.7) ease-in-out infinite;
  }
  .glimmer:is(.glimmer--on, .glimmer--fading) .glimmer__ring {
    animation: bb-shimmer-turn var(--duration-glimmer) linear infinite;
  }
  .glimmer--on .glimmer__halo {
    opacity: 0.8;
  }
  .glimmer--on .glimmer__ring {
    opacity: 0.9;
  }

  @media (prefers-reduced-motion: reduce) {
    .glimmer:is(.glimmer--on, .glimmer--fading) :is(.glimmer__halo, .glimmer__ring) {
      animation: none;
    }
    .glimmer--on .glimmer__halo {
      opacity: 0.6;
    }
  }
</style>
