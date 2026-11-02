<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import GlassLens from './GlassLens.svelte';
  import Button from './Button.svelte';
  import NavBar from '../organisms/NavBar.svelte';
  import { frostFilter, LENS_DEFAULTS } from '../../utils/lens';

  const { Story } = defineMeta({
    title: 'Atoms/GlassLens',
    component: GlassLens,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    args: { refraction: 'auto', ...LENS_DEFAULTS },
    argTypes: {
      refraction: { control: 'inline-radio', options: ['auto', true, false] },
      magnify: { control: { type: 'range', min: 1, max: 2, step: 0.02 } },
      rim: { control: { type: 'range', min: 2, max: 60, step: 1 } },
      rimBend: { control: { type: 'range', min: 0, max: 60, step: 1 } },
      chroma: { control: { type: 'range', min: 0, max: 0.2, step: 0.005 } },
      blur: { control: { type: 'range', min: 0, max: 40, step: 1 } },
      saturate: { control: { type: 'range', min: 100, max: 300, step: 10 } },
      active: { control: false },
    },
  });

  const lines = Array.from({ length: 14 }, (_, i) => i);
</script>

<script lang="ts">
  let drawn = $state(false);
</script>

{#snippet scenery()}
  {#each lines as i (i)}
    <p class:big={i % 3 === 0}>
      Contours tip away at the rim, the middle reads larger — glass with a body.
    </p>
  {/each}
{/snippet}

<!-- Thick glass over stripes and text — scroll the stage. `magnify` enlarges the middle, `rim`
     is the width of the zone where contours bend and `rimBend` how far, `chroma` splits the
     colours at the edge. `blur` is the frosted fallback, `saturate` applies to both.
     Refraction is drawn in Chrome and in Safari outside an iframe; Firefox and Storybook in
     Safari show the frosted fallback (`refraction: true` forces it on). -->
<Story name="Playground">
  {#snippet template(args)}
    <div class="stage">
      <div class="slab-row">
        <div
          class="slab"
          class:lensed={drawn}
          style:--slab-frost={frostFilter({ blur: args.blur, saturate: args.saturate })}
        >
          <GlassLens {...args} bind:active={drawn} />
          <span>{drawn ? 'Thick glass' : 'Frosted glass'}</span>
        </div>
      </div>
      {@render scenery()}
    </div>
  {/snippet}
</Story>

<!-- The website NavBar with the same controls (`lens` on NavBar, TitlePill, GlassPill, MenuBar,
     Toolbar, Dock and front Layers). Scroll: the text magnifies as it passes under the bar. -->
<Story name="On a NavBar">
  {#snippet template(args)}
    <div class="stage stage--page">
      <NavBar
        brand="Larkspur"
        links={[
          { label: 'Product', href: '#product', active: true },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Docs', href: '#docs' },
        ]}
        lens={args}
      >
        {#snippet actions()}<Button variant="primary" shape="pill" label="Sign up" />{/snippet}
      </NavBar>
      {@render scenery()}
    </div>
  {/snippet}
</Story>

<style>
  .stage {
    height: 520px;
    overflow: auto;
    padding: 0 var(--space-8) var(--space-8);
    background:
      repeating-linear-gradient(
        90deg,
        color-mix(in srgb, var(--accent) 22%, transparent) 0 2px,
        transparent 2px 28px
      ),
      repeating-linear-gradient(
        0deg,
        color-mix(in srgb, var(--color-blue) 18%, transparent) 0 2px,
        transparent 2px 28px
      );
  }
  .stage--page {
    padding-inline: 0;
  }
  .stage--page p {
    padding-inline: var(--content-gutter);
  }
  .slab-row {
    position: sticky;
    top: var(--space-8);
    z-index: 1;
    display: flex;
    justify-content: center;
    padding-top: var(--space-8);
  }
  .slab {
    position: relative;
    isolation: isolate;
    display: grid;
    place-items: center;
    width: min(560px, 100%);
    height: 220px;
    border-radius: var(--radius-dialog);
    border: 0.75px solid var(--layer-front-border);
    background: var(--layer-front-bg);
    box-shadow: var(--layer-front-shadow);
    backdrop-filter: var(--slab-frost, var(--layer-front-blur));
    -webkit-backdrop-filter: var(--slab-frost, var(--layer-front-blur));
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .slab.lensed {
    background: var(--layer-front-lens-bg);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  p {
    margin: var(--space-4) 0;
    font-size: var(--fs-xl);
    color: var(--text);
  }
  p.big {
    font-size: var(--fs-display);
    font-weight: var(--fw-bold);
    color: var(--accent-ink);
  }
</style>
