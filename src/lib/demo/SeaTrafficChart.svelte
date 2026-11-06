<script lang="ts">
  /**
   * Storybook-only: the sea chart of the sea traffic example — one SVG with an invented bay,
   * depth contours, lanes, the forecast weather and the ships. Weather is recomputed only when
   * the forecast hour changes (and cached per hour); ships move by rewriting their `transform`
   * in one requestAnimationFrame loop, which stops while paused, under reduced motion, while
   * the tab is hidden and on unmount.
   */
  import { onMount } from 'svelte';
  import {
    CELL,
    GX,
    GY,
    H,
    SPEEDUP,
    START_MINUTES,
    W,
    chart,
    compass,
    depth,
    fogAt,
    isoline,
    lanes,
    rainAt,
    shipAt,
    shipTypes,
    shoreDistance,
    waveField,
    windAt,
    type ChartLayers,
    type Ship,
    type Weather,
  } from './mock-sea';

  interface Props {
    ships: Ship[];
    hour: number;
    weather: Weather;
    layers: ChartLayers;
    /** Moves the ships; the loop also waits for a visible tab. */
    running: boolean;
    selected?: string | null;
    hovered?: string | null;
    /** Simulated seconds since the start; written back about once a second. */
    sim?: number;
    /** The pointer in chart units, or null when it leaves. */
    onpoint?: ((p: { x: number; y: number } | null) => void) | undefined;
    label?: string;
  }

  let {
    ships,
    hour,
    weather,
    layers,
    running,
    selected = $bindable(null),
    hovered = $bindable(null),
    sim = $bindable(0),
    onpoint,
    label = 'Sea chart of Kestrel Bay',
  }: Props = $props();

  const uid = $props.id();
  const colorOf = Object.fromEntries(shipTypes.map((t) => [t.id, `var(--color-${t.color})`]));
  const typeLabel = Object.fromEntries(shipTypes.map((t) => [t.id, t.label]));
  const scaleOf = { cargo: 1.5, tanker: 1.55, passenger: 1.3, fishing: 1, pleasure: 0.85 };

  // Static chart: depth contours once.
  const depthLevels = [5, 10, 20, 40];
  const contours = depthLevels.map((level) => ({ level, d: isoline(depth(), level) }));

  // Weather per forecast hour, cached: scrubbing back and forth costs nothing the second time.
  interface Sky {
    bands: string[];
    heads: string;
    waves: string;
    waveLines: string[];
  }
  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- a memo, never shown
  const cache = new Map<string, Sky>();
  const STEP = 56;
  function skyAt(h: number, w: Weather): Sky {
    const key = `${h}-${w}`;
    const hit = cache.get(key);
    if (hit) return hit;
    const shore = shoreDistance();
    const bands = ['', '', ''];
    let heads = '';
    for (let y = STEP / 2; y < H; y += STEP)
      for (let x = STEP / 2; x < W; x += STEP) {
        const gi = Math.round(x / CELL) + Math.round(y / CELL) * GX;
        if ((shore[gi] ?? 0) < 10) continue;
        const wind = windAt(x, y, h, w);
        const len = 8 + wind.speed * 1.15;
        const x0 = x - (wind.ux * len) / 2;
        const y0 = y - (wind.uy * len) / 2;
        const x1 = x + (wind.ux * len) / 2;
        const y1 = y + (wind.uy * len) / 2;
        const band = wind.speed < 12 ? 0 : wind.speed < 24 ? 1 : 2;
        bands[band] += `M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`;
        // A small open head at the tip.
        const hx = -wind.ux * 5;
        const hy = -wind.uy * 5;
        heads += `M${(x1 + hx - hy * 0.6).toFixed(1)} ${(y1 + hy + hx * 0.6).toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}L${(x1 + hx + hy * 0.6).toFixed(1)} ${(y1 + hy - hx * 0.6).toFixed(1)}`;
      }
    const field = waveField(h, w);
    const sky = {
      bands,
      heads,
      waves: waveImage(field),
      waveLines: [1, 2, 3].map((level) => isoline(field, level)),
    };
    cache.set(key, sky);
    return sky;
  }

  /** The wave field as a small grey image, scaled up smoothly by the browser and used as a
   *  mask, so the shading itself takes its colour from a token. */
  function waveImage(field: Float32Array): string {
    if (typeof document === 'undefined') return '';
    const canvas = document.createElement('canvas');
    canvas.width = GX;
    canvas.height = GY;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    const img = ctx.createImageData(GX, GY);
    for (let i = 0; i < field.length; i++) {
      const v = Math.round(Math.min(1, field[i]! / 4) * 255);
      img.data.set([v, v, v, 255], i * 4);
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL();
  }

  const sky = $derived(skyAt(hour, weather));
  const rain = $derived(rainAt(hour));
  const fog = $derived(fogAt(hour));

  // ── Ships ──
  const els: (SVGGElement | undefined)[] = [];
  let callout = $state<HTMLElement | undefined>();
  let width = $state(0);
  let t = sim;
  let tick = $state(0);
  let visible = $state(true);
  const focus = $derived(ships.find((s) => s.id === (hovered ?? selected)) ?? null);
  // `t` runs outside Svelte; the once-a-second `tick` refreshes the callout's figures.
  const focusFix = $derived.by(() => {
    void tick;
    return focus ? { ...shipAt(focus, t), now: t } : null;
  });

  function place(now: number) {
    for (let i = 0; i < ships.length; i++) {
      const el = els[i];
      if (!el) continue;
      const f = shipAt(ships[i]!, now);
      el.setAttribute(
        'transform',
        `translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) rotate(${f.course.toFixed(0)})`,
      );
    }
    if (callout && focus && width) {
      const f = shipAt(focus, now);
      const k = width / W;
      const px = f.x * k;
      const py = f.y * k;
      const flip = px > width - 240;
      callout.style.transform = `translate(${flip ? px - 20 : px + 20}px, ${py}px) translate(${flip ? '-100%' : '0'}, -50%)`;
    }
  }

  // Re-place after anything that re-creates or moves the glyphs while the loop may be idle.
  $effect(() => {
    void layers.ships;
    void width;
    void focus;
    void callout;
    place(t);
  });

  $effect(() => {
    if (!running || !visible) return;
    let frame = 0;
    let last = performance.now();
    let lastTick = last;
    const step = (now: number) => {
      // A long gap (a background tab, a debugger) must not teleport the fleet.
      t += Math.min(0.25, (now - last) / 1000) * SPEEDUP;
      last = now;
      place(t);
      if (now - lastTick > 1000) {
        lastTick = now;
        sim = t;
        tick++;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      sim = t;
    };
  });

  onMount(() => {
    const onVisibility = () => (visible = document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  });

  function pointer(event: PointerEvent) {
    const r = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
    onpoint?.({
      x: ((event.clientX - r.left) / r.width) * W,
      y: ((event.clientY - r.top) / r.height) * H,
    });
  }

  const hhmm = (minutes: number) => {
    const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
    return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  };
  const inTime = (s: number) => {
    const m = Math.round(s / 60);
    return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60} min`;
  };
</script>

<div class="chart" bind:clientWidth={width}>
  <!-- Three stacked SVGs on one viewBox: the still chart, the wind and the ships. Each moving
       part is its own compositing layer, so a ship's step never repaints the wind or the land. -->
  <svg class="base" viewBox="0 0 {W} {H}" aria-hidden="true">
    <defs>
      <mask id="{uid}-waves" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
        <image href={sky.waves} x="0" y="0" width={W} height={H} preserveAspectRatio="none" />
      </mask>
      <radialGradient id="{uid}-rain">
        <stop offset="0" class="rain-core" />
        <stop offset="0.6" class="rain-mid" />
        <stop offset="1" class="rain-edge" />
      </radialGradient>
      <radialGradient id="{uid}-fog">
        <stop offset="0" class="fog-core" />
        <stop offset="1" class="fog-edge" />
      </radialGradient>
      <pattern
        id="{uid}-drops"
        width="9"
        height="9"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(20)"
      >
        <line x1="0" y1="0" x2="0" y2="5" class="drop" />
      </pattern>
      <pattern
        id="{uid}-hatch"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line x1="0" y1="0" x2="0" y2="8" class="hatch" />
      </pattern>
    </defs>

    <rect class="sea" width={W} height={H} />
    {#each contours as c (c.level)}
      <path class="depth depth--{c.level}" d={c.d} />
    {/each}

    {#if layers.waves}
      <g class="waves">
        <rect width={W} height={H} class="waves__fill" mask="url(#{uid}-waves)" />
        {#each sky.waveLines as d, i (i)}
          <path class="waves__line" {d} />
        {/each}
      </g>
    {/if}

    {#if layers.lanes}
      <g class="lanes">
        <path class="lanes__zone" d={lanes.zone} fill="url(#{uid}-hatch)" />
        {#each lanes.edges as d, i (i)}<path class="lanes__edge" {d} />{/each}
        <path class="lanes__lane" d={lanes.inbound} />
        <path class="lanes__lane" d={lanes.outbound} />
        {#each lanes.arrows as a, i (i)}
          <path
            class="lanes__arrow"
            d="M-6 5 L0 -6 L6 5"
            transform="translate({a.p[0].toFixed(1)} {a.p[1].toFixed(1)}) rotate({a.heading.toFixed(
              0,
            )})"
          />
        {/each}
        {#each lanes.ferry as d, i (i)}<path class="lanes__ferry" {d} />{/each}
        <circle
          class="lanes__anchorage"
          cx={chart.anchorage.cx}
          cy={chart.anchorage.cy}
          r={chart.anchorage.r}
        />
        <text
          class="label label--sea"
          x={chart.anchorage.cx}
          y={chart.anchorage.cy - chart.anchorage.r - 6}>Anchorage</text
        >
        <path class="lanes__fishing" d={chart.fishing} />
        <text class="label label--sea" x="226" y="594">Fishing grounds</text>
      </g>
    {/if}

    <g class="land">
      <path class="land__fill" d={chart.mainland} />
      {#each chart.islands as isle, i (i)}<path class="land__fill" d={isle.d} />{/each}
      {#each chart.harbour.arms as d, i (i)}<path class="harbour__arm" {d} />{/each}
      <path class="harbour__quay" d={chart.harbour.quay} />
      <circle class="lighthouse" cx={chart.lighthouse[0]} cy={chart.lighthouse[1]} r="3.5" />
      <text class="label label--place" x={chart.harbour.label[0]} y={chart.harbour.label[1]}
        >Kestrel Harbour</text
      >
      {#each chart.islands.filter((i) => i.name && i.name !== 'Lantern Rock') as isle (isle.name)}
        <text class="label label--isle" x={isle.label[0]} y={isle.label[1]}>{isle.name}</text>
      {/each}
      <text class="label label--sea" x={chart.lighthouse[0]} y={chart.lighthouse[1] + 26}
        >Lantern Rock</text
      >
      <text class="label label--bay" x="600" y="606">Kestrel Bay</text>
    </g>

    {#if layers.rain}
      <g class="rain" style:opacity={0.25 + 0.75 * rain.k}>
        <ellipse cx={rain.x} cy={rain.y} rx={rain.rx} ry={rain.ry} fill="url(#{uid}-rain)" />
        <ellipse
          cx={rain.x}
          cy={rain.y}
          rx={rain.rx * 0.62}
          ry={rain.ry * 0.62}
          fill="url(#{uid}-drops)"
        />
      </g>
      {#if fog > 0}
        <ellipse
          class="fog"
          cx="856"
          cy="252"
          rx="130"
          ry="50"
          fill="url(#{uid}-fog)"
          style:opacity={fog}
        />
      {/if}
    {/if}

    <g class="scale" transform="translate(36 40)">
      <path class="scale__north" d="M12 22 L18 0 L24 22 L18 17 Z" />
      <text x="18" y="38">N</text>
      <path d="M48 26 V32 H{48 + (5 * W) / 24} V26" />
      <text x={48 + (5 * W) / 48} y="20">5 sea miles</text>
    </g>
  </svg>

  <svg class="overlay" class:running viewBox="0 0 {W} {H}" aria-hidden="true">
    {#if layers.wind}
      <g class="wind">
        {#each sky.bands as d, i (i)}
          <path class="wind__band wind__band--{i}" {d} />
        {/each}
        <path class="wind__head" d={sky.heads} />
      </g>
    {/if}
  </svg>

  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
  <svg
    class="live"
    viewBox="0 0 {W} {H}"
    role="img"
    aria-label={label}
    onpointermove={pointer}
    onpointerleave={() => onpoint?.(null)}
    onclick={() => (selected = null)}
  >
    {#if layers.ships}
      <g class="ships">
        {#each ships as s, i (s.id)}
          {@const k = scaleOf[s.type]}
          <g
            bind:this={els[i]}
            class="ship"
            class:ship--on={s.id === selected}
            class:ship--hover={s.id === hovered}
            style:--hull={colorOf[s.type]}
            role="presentation"
            onpointerenter={() => (hovered = s.id)}
            onpointerleave={() => (hovered = null)}
            onclick={(e) => {
              e.stopPropagation();
              selected = selected === s.id ? null : s.id;
            }}
          >
            <circle class="ship__hit" r="14" />
            <circle class="ship__ring" r={12 * Math.max(1, k)} />
            <line class="ship__wake" x1="0" y1={7 * k} x2="0" y2={20 * k} />
            <path
              class="ship__hull"
              d="M0 {-9 * k} C{3.4 * k} {-5 * k} {3.8 * k} 0 {3.2 * k} {7 * k} L{-3.2 * k} {7 *
                k} C{-3.8 * k} 0 {-3.4 * k} {-5 * k} 0 {-9 * k} Z"
            />
          </g>
        {/each}
      </g>
    {/if}
  </svg>

  {#if focus && focusFix && layers.ships}
    <div class="callout" bind:this={callout} aria-hidden={focus.id !== selected}>
      <span class="callout__name"><i style:background={colorOf[focus.type]}></i>{focus.name}</span>
      <dl>
        <dt>Type</dt>
        <dd>{typeLabel[focus.type]} · {focus.length} m</dd>
        <dt>Speed</dt>
        <dd>{focus.kn.toFixed(1)} kn</dd>
        <dt>Course</dt>
        <dd>{Math.round(focusFix.course)}° {compass(focusFix.course)}</dd>
        <dt>To</dt>
        <dd>{focusFix.destination}</dd>
        <dt>ETA</dt>
        <dd>
          {focusFix.eta === undefined
            ? '—'
            : `${hhmm(START_MINUTES + (focusFix.now + focusFix.eta) / 60)} · in ${inTime(focusFix.eta)}`}
        </dd>
      </dl>
    </div>
  {/if}
</div>

<style>
  .chart {
    position: relative;
    overflow: clip;
    border-radius: inherit;
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1000 / 640;
    user-select: none;
  }
  .overlay,
  .live {
    position: absolute;
    inset: 0;
    /* its own compositing layer: what moves is repainted alone */
    will-change: transform;
  }
  .overlay {
    pointer-events: none;
  }
  .live {
    cursor: crosshair;
  }

  .sea {
    fill: color-mix(in srgb, var(--color-blue) 10%, var(--bg));
  }
  .depth {
    fill: none;
    stroke: var(--color-blue);
    stroke-width: 0.8;
    stroke-linecap: round;
    opacity: 0.32;
  }
  .depth--5 {
    stroke-dasharray: 2 3;
  }
  .depth--40 {
    opacity: 0.18;
  }

  .waves__fill {
    fill: var(--color-indigo);
    opacity: 0.4;
  }
  .waves__line {
    fill: none;
    stroke: var(--color-indigo);
    stroke-width: 1;
    stroke-dasharray: 5 4;
    stroke-linecap: round;
    opacity: 0.55;
  }

  .lanes__zone {
    stroke: none;
  }
  .hatch {
    stroke: var(--color-purple);
    stroke-width: 1.2;
    opacity: 0.4;
  }
  .lanes__edge {
    fill: none;
    stroke: var(--color-purple);
    stroke-width: 1;
    stroke-dasharray: 8 6;
    opacity: 0.55;
  }
  .lanes__lane {
    fill: none;
    stroke: var(--color-purple);
    stroke-width: 1;
    opacity: 0.25;
  }
  .lanes__arrow {
    fill: none;
    stroke: var(--color-purple);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.7;
  }
  .lanes__ferry {
    fill: none;
    stroke: var(--color-blue);
    stroke-width: 1.2;
    stroke-dasharray: 2 4;
    stroke-linecap: round;
    opacity: 0.7;
  }
  .lanes__anchorage {
    fill: none;
    stroke: var(--text-3);
    stroke-width: 1;
    stroke-dasharray: 4 4;
  }
  .lanes__fishing {
    fill: color-mix(in srgb, var(--color-orange) 6%, transparent);
    stroke: var(--color-orange);
    stroke-width: 1;
    stroke-dasharray: 3 5;
    opacity: 0.7;
  }

  .land__fill {
    fill: color-mix(in srgb, var(--color-brown) 16%, var(--bg-base));
    stroke: color-mix(in srgb, var(--color-brown) 45%, var(--text-3));
    stroke-width: 1;
    stroke-linejoin: round;
  }
  .harbour__arm,
  .harbour__quay {
    fill: none;
    stroke: color-mix(in srgb, var(--color-brown) 45%, var(--text-3));
    stroke-width: 3;
    stroke-linecap: round;
  }
  .harbour__quay {
    stroke-width: 2;
  }
  .lighthouse {
    fill: var(--color-yellow);
    stroke: var(--text-2);
    stroke-width: 1;
  }
  .label {
    fill: var(--text-2);
    font-size: 12px;
    font-weight: var(--fw-semibold);
    text-anchor: middle;
    paint-order: stroke;
    stroke: color-mix(in srgb, var(--color-blue) 10%, var(--bg));
    stroke-width: 3px;
    stroke-linejoin: round;
    pointer-events: none;
  }
  .label--place,
  .label--isle {
    stroke: color-mix(in srgb, var(--color-brown) 16%, var(--bg-base));
    fill: var(--text);
  }
  .label--isle {
    font-size: 10px;
  }
  .label--sea {
    font-size: 10px;
    font-weight: var(--fw-medium);
    fill: var(--text-3);
  }
  .label--bay {
    fill: var(--text-3);
    font-size: 15px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  .rain-core {
    stop-color: var(--color-teal);
    stop-opacity: 0.45;
  }
  .rain-mid {
    stop-color: var(--color-teal);
    stop-opacity: 0.22;
  }
  .rain-edge {
    stop-color: var(--color-teal);
    stop-opacity: 0;
  }
  .drop {
    stroke: var(--color-teal);
    stroke-width: 1.2;
    stroke-linecap: round;
    opacity: 0.55;
  }
  .rain,
  .fog {
    pointer-events: none;
    transition: opacity var(--motion-base) var(--ease-out);
  }
  .rain ellipse {
    transition:
      cx var(--motion-slow) var(--ease-in-out),
      cy var(--motion-slow) var(--ease-in-out),
      rx var(--motion-slow) var(--ease-in-out),
      ry var(--motion-slow) var(--ease-in-out);
  }
  .fog-core {
    stop-color: var(--text-3);
    stop-opacity: 0.3;
  }
  .fog-edge {
    stop-color: var(--text-3);
    stop-opacity: 0;
  }

  /* Wind: streaks drift along each arrow while the chart is live. */
  .wind {
    pointer-events: none;
  }
  .wind__band,
  .wind__head {
    fill: none;
    stroke: var(--text-2);
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .wind__band {
    stroke-dasharray: 7 4;
  }
  .wind__band--0 {
    stroke-width: 1.2;
    opacity: 0.45;
  }
  .wind__band--1 {
    stroke-width: 1.7;
    opacity: 0.6;
  }
  .wind__band--2 {
    stroke-width: 2.3;
    stroke: var(--text);
    opacity: 0.7;
  }
  .wind__head {
    stroke-width: 1.3;
    opacity: 0.55;
  }
  /* Stepped, so the whole wind layer repaints a few times a second rather than every frame. */
  .running .wind__band {
    animation: streak 1100ms steps(8) infinite;
  }
  @keyframes streak {
    to {
      stroke-dashoffset: -11;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .running .wind__band {
      animation: none;
    }
  }

  .scale path {
    fill: none;
    stroke: var(--text-2);
    stroke-width: 1.2;
  }
  .scale .scale__north {
    fill: var(--text-2);
    stroke: none;
  }
  .scale text {
    fill: var(--text-2);
    font-size: 10px;
    text-anchor: middle;
  }

  .ship {
    cursor: pointer;
  }
  .ship__hit {
    fill: transparent;
  }
  .ship__hull {
    fill: var(--hull);
    stroke: var(--bg);
    stroke-width: 1;
  }
  .ship__wake {
    stroke: var(--bg);
    stroke-width: 2;
    stroke-linecap: round;
    opacity: 0.8;
  }
  .ship__ring {
    fill: none;
    stroke: var(--accent);
    stroke-width: 2;
    opacity: 0;
    transition: opacity var(--motion-quick) var(--ease-out);
  }
  .ship--hover .ship__ring {
    opacity: 0.5;
  }
  .ship--on .ship__ring {
    opacity: 1;
    stroke-width: 2.5;
  }

  /* Chart text is in chart units; on a small chart it grows back to a readable size. */
  @media (max-width: 900px) {
    .label,
    .scale text {
      font-size: 16px;
    }
    .label--isle,
    .label--sea {
      font-size: 14px;
    }
  }

  .callout {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    min-width: 13rem;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    background: var(--tooltip-bg);
    box-shadow: var(--shadow-pop);
    font-size: var(--fs-sm);
    pointer-events: none;
    will-change: transform;
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .callout__name {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-2);
    font-weight: var(--fw-semibold);
  }
  .callout__name i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .callout dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2px var(--space-3);
    margin: 0;
  }
  .callout dt {
    color: var(--text-2);
  }
  .callout dd {
    margin: 0;
    font-variant-numeric: tabular-nums;
  }
</style>
