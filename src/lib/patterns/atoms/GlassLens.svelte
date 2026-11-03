<script lang="ts">
  /**
   * GlassLens atom — turns a frosted glass surface into a solid block of glass: the backdrop is
   * magnified in the middle, bends at the rim and splits into a colour fringe. Put it first
   * inside the surface and bind `active`; while it is true the surface drops its own
   * `backdrop-filter` (or the backdrop would be scattered twice and the lens would see only the
   * surface) and thins its tint (or the tint would cover the refraction up). The surface must
   * be a stacking context (`isolation: isolate`) with a border radius; the lens takes both.
   *
   * Chromium bends the real backdrop. WebKit and Gecko only filter an element's own painting,
   * never its backdrop, so there the lens paints a live, inert copy of the page under the
   * surface and bends that (see `utils/mirror.ts`) — the same picture, at the cost of a partial
   * DOM copy per lens. Reduced transparency keeps the frosted look and `active` false.
   *
   *   <div class="bar" class:lensed>
   *     <GlassLens magnify={1.3} rim={31} rimBend={45} chroma={0.07} bind:active={lensed} />
   *     …
   *   </div>
   */
  import { untrack } from 'svelte';
  import { LENS_ATTR, Mirror } from '../../utils/mirror';
  import {
    buildLens,
    canRefract,
    LENS_DEFAULTS,
    lensFingerprint,
    type LensOptions,
  } from '../../utils/lens';

  // `blur` is accepted so a surface can spread its `lens` options, but only the surface's
  // frosted fallback uses it (see `frostFilter`); the lens scatters lightly on its own.
  interface Props extends LensOptions {
    /** True while the lens is drawn; bind it to restyle the surface. */
    active?: boolean;
  }

  let {
    refraction = 'auto',
    magnify = LENS_DEFAULTS.magnify,
    rim = LENS_DEFAULTS.rim,
    rimBend = LENS_DEFAULTS.rimBend,
    chroma = LENS_DEFAULTS.chroma,
    saturate = LENS_DEFAULTS.saturate,
    // The parent reads it through `bind:active`, which the linter cannot see.
    // eslint-disable-next-line no-useless-assignment
    active = $bindable(false),
  }: Props = $props();

  const uid = $props.id();
  let box = $state<HTMLElement | undefined>();
  let width = $state(0);
  let height = $state(0);
  /** Can the engine bend the real backdrop? Unknown until mounted. */
  let supported = $state<boolean | null>(null);
  // Opting out of transparency opts out of the distortion too.
  let reduced = $state(false);

  $effect(() => {
    supported = canRefract();
    const query = window.matchMedia?.('(prefers-reduced-transparency: reduce)');
    if (!query) return;
    reduced = query.matches;
    const onchange = (event: MediaQueryListEvent) => (reduced = event.matches);
    query.addEventListener('change', onchange);
    return () => query.removeEventListener('change', onchange);
  });

  /*
   * The maps depend on the size, but rebuilding means replacing the filter and the layer — cheap
   * once, flicker if it happens every frame of a width animation. So a new size settles first;
   * meanwhile the old maps (feImage, preserveAspectRatio none) stretch onto the new box.
   */
  const SETTLE_MS = 120;

  $effect(() => {
    if (!box) return;
    const el = box;
    let committedW = -1;
    let committedH = -1;
    let settle: ReturnType<typeof setTimeout> | undefined;
    const commit = (w: number, h: number) => {
      committedW = width = w;
      committedH = height = h;
    };
    const measure = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w === committedW && h === committedH) return;
      if (committedW < 0) return commit(w, h);
      clearTimeout(settle);
      settle = setTimeout(() => commit(w, h), SETTLE_MS);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return () => clearTimeout(settle);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      clearTimeout(settle);
      observer.disconnect();
    };
  });

  /** `real` bends the backdrop itself, `mirror` a copy of the page (see the header). */
  const mode = $derived<'real' | 'mirror' | 'none'>(
    refraction === false || reduced || supported === null ? 'none' : supported ? 'real' : 'mirror',
  );
  const lens = $derived(
    mode !== 'none' && width > 12 && height > 12
      ? buildLens({ width, height, magnify, rim, rimBend })
      : null,
  );

  $effect(() => {
    active = !!lens;
  });

  const filterId = $derived(
    `bb-lens-${uid}-${lensFingerprint(width, height, magnify, rim, rimBend, chroma)}`,
  );

  /*
   * Two more steps, both for WebKit: the refracting layer is only inserted once its new filter
   * is in the document (it resolves `url(#…)` on insertion), and every change nudges the
   * scattering by an invisible thousandth of a pixel — Safari does not repaint a once-filtered
   * layer whose `backdrop-filter` stays the same, even when filter and layer are replaced.
   */
  let mounted = $state<{ id: string; nudge: number } | null>(null);

  $effect(() => {
    const id = lens ? filterId : null;
    untrack(() => {
      if (!id) mounted = null;
      else if (mounted?.id !== id) mounted = { id, nudge: mounted?.nudge ? 0 : 0.001 };
    });
  });

  const refractStyle = $derived.by(() => {
    if (!mounted) return '';
    const scatter = `blur(${0.8 + mounted.nudge}px) saturate(${saturate}%) brightness(1.02)`;
    const bend = `url(#${mounted.id})`;
    // The copy is ordinary content: scattering and bending run through one `filter`.
    if (mode === 'mirror') return `-webkit-filter:${bend} ${scatter};filter:${bend} ${scatter}`;
    return (
      `-webkit-backdrop-filter:${scatter};backdrop-filter:${scatter};` +
      `-webkit-filter:${bend};filter:${bend}`
    );
  });

  /*
   * The mirror lives as long as the lens is drawn in mirror mode — not per lens change: a new
   * filter id replaces the layer, and the existing copy simply moves into the new one.
   */
  const mirrored = $derived(mode === 'mirror' && !!lens);
  let mirror = $state.raw<Mirror | null>(null);
  let layer = $state<HTMLElement | undefined>();
  let stillLayer = $state<HTMLElement | undefined>();

  $effect(() => {
    if (!mirrored || !box?.parentElement) return;
    const created = new Mirror(box, box.parentElement);
    mirror = created;
    return () => {
      created.destroy();
      mirror = null;
    };
  });

  $effect(() => {
    if (!mirror || !layer || !stillLayer) return;
    // The layers are rendered empty; their only children are the mirror's hosts, which Svelte
    // never sees.
    // eslint-disable-next-line svelte/no-dom-manipulating
    stillLayer.append(mirror.stillHost);
    // eslint-disable-next-line svelte/no-dom-manipulating
    layer.append(mirror.host);
    mirror.sync();
  });

  // The colour fringe: one displacement per channel, each a little stronger or weaker.
  const scaleR = $derived(lens ? lens.scale * (1 + chroma) : 0);
  const scaleG = $derived(lens ? lens.scale : 0);
  const scaleB = $derived(lens ? lens.scale * (1 - chroma) : 0);
</script>

<!-- The box clips the layer to the surface's radius; the layer rounds itself too, because
     Chromium does not clip a backdrop-filtered descendant to an ancestor's rounded corners. -->
<span
  class="lens"
  class:lens--mirror={mode === 'mirror'}
  bind:this={box}
  aria-hidden="true"
  {...{ [LENS_ATTR]: '' }}
>
  {#if lens}
    <!-- Keyed on the id: any change replaces filter and layer (see `filterId`). The filter comes
         first — WebKit leaves a reference to a not-yet-inserted filter dead. -->
    {#key filterId}
      <svg class="defs" width="0" height="0" focusable="false">
        <filter
          id={filterId}
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <!-- No x/y/width/height on feImage: it then fills the filter region, i.e. the layer.
               Given in px, WebKit measures them from the document origin instead. -->
          <feImage href={lens.mapX} preserveAspectRatio="none" result="mapX" />
          <feImage href={lens.mapY} preserveAspectRatio="none" result="mapY" />
          <feComposite in="mapX" in2="mapY" operator="arithmetic" k2="1" k3="1" result="map" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale={scaleR}
            xChannelSelector="R"
            yChannelSelector="G"
            result="bentR"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale={scaleG}
            xChannelSelector="R"
            yChannelSelector="G"
            result="bentG"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale={scaleB}
            xChannelSelector="R"
            yChannelSelector="G"
            result="bentB"
          />
          <feColorMatrix
            in="bentR"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="onlyR"
          />
          <feColorMatrix
            in="bentG"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="onlyG"
          />
          <feColorMatrix
            in="bentB"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="onlyB"
          />
          <feBlend in="onlyR" in2="onlyG" mode="screen" result="rg" />
          <feBlend in="rg" in2="onlyB" mode="screen" />
        </filter>
      </svg>
    {/key}
    {#key mounted?.id}
      {#if mounted}
        <!-- In mirror mode the copy comes in two layers (see utils/mirror.ts): what stays put
             while the page scrolls, and the content above it. -->
        {#if mode === 'mirror'}<span
            class="refract refract--mirror"
            style={refractStyle}
            bind:this={stillLayer}
          ></span>{/if}
        <span
          class="refract"
          class:refract--mirror={mode === 'mirror'}
          class:refract--moving={mode === 'mirror'}
          style={refractStyle}
          bind:this={layer}
        ></span>
      {/if}
    {/key}
    <!-- Over the opaque copy the surface's own body would be lost: it rides on top instead. -->
    {#if mode === 'mirror'}<span class="body"></span>{/if}
  {/if}
</span>

<style>
  /* Behind the surface's own light (its ::before / ::after sit at -1) and its content. */
  .lens {
    position: absolute;
    inset: 0;
    z-index: -2;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
  }
  /* A lensed surface drops its own backdrop-filter and with it its compositing layer; the lens
     would then paint into the scrolling page and WebKit repaint it — re-running the blurred
     copy — on every scroll frame. A layer of its own lets it ride along instead. Its url()
     filters live on children, which WebKit keeps (only a filtered element with layers inside
     loses its filter). */
  .lens--mirror {
    will-change: transform;
  }
  /* Must not take room, but must not be display: none either, or CSS cannot find the filter. */
  .defs {
    position: absolute;
    width: 0;
    height: 0;
  }
  .refract {
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  .refract--mirror {
    overflow: hidden;
  }
  /* A compositing layer of its own: scrolling repaints the content, and leaves the still layer
     below — with its blurred tint mesh, filtered in software — alone. Its own url() filter
     survives that in Safari; only layers inside a filtered element break it. */
  .refract--moving {
    will-change: transform;
  }
  .body {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--layer-front-lens-bg);
    /* The bevel; the outer shadow parts are clipped by the box. */
    box-shadow: var(--layer-front-shadow);
  }
</style>
