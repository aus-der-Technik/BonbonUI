<script lang="ts">
  /**
   * ArcGauge molecule — a value you set on an arc, like a thermostat dial: fine ticks along an
   * arc, the reached part lit in the tint and glowing softly from within, a slow shimmer of light
   * running along it, the figure large in the middle, minus and plus at the ends of the arc (where the
   * value grows and shrinks). Drag along the arc, use the keys (arrows, Page Up/Down, Home/End)
   * or the buttons; it is one `slider` for assistive tech. The figure glows when it changes.
   *
   *   <ArcGauge label="Target temperature" bind:value={target} min={16} max={28} step={0.5} unit="°C" />
   */
  import Button from '../atoms/Button.svelte';
  import { changeCue } from '../atoms/changed';

  interface Props {
    /** Accessible name; also the caption above the arc unless `caption` is false. */
    label: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    /** Printed small after the figure, e.g. "°C" or "%". */
    unit?: string | undefined;
    /** Where it is right now (e.g. the room's air), when that differs from the setting: the
     *  glow follows it, with a small mark at its end, and a line under the figure says it. The
     *  lit ticks always show the setting. */
    current?: number | undefined;
    /** The word before the current value. */
    currentLabel?: string;
    format?: ((value: number) => string) | undefined;
    /** Number of ticks along the arc. */
    ticks?: number;
    /** Opening of the arc in degrees. */
    sweep?: number;
    size?: 'md' | 'lg';
    /** Shows the label above the arc. */
    caption?: boolean;
    /** Minus and plus at the ends of the arc. */
    buttons?: boolean;
    decreaseLabel?: string;
    increaseLabel?: string;
    disabled?: boolean;
    onchange?: ((value: number) => void) | undefined;
  }

  let {
    label,
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    unit,
    format,
    ticks = 44,
    sweep = 150,
    size = 'md',
    caption = true,
    buttons = true,
    current,
    currentLabel = 'Now',
    decreaseLabel = 'Decrease',
    increaseLabel = 'Increase',
    disabled = false,
    onchange,
  }: Props = $props();

  const uid = $props.id();
  const W = 320;
  const H = 180;
  // The arc's top sits at y≈25: the box starts there, so no empty band sits above the arc.
  const TOP = 18;
  const CX = W / 2;
  const CY = 168;
  const R = 138;

  const decimals = $derived((String(step).split('.')[1] ?? '').length);
  const shown = $derived(format ? format(value) : value.toFixed(decimals));
  const fraction = $derived(max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0);
  const start = $derived(-90 - sweep / 2);

  const rad = (deg: number) => (deg * Math.PI) / 180;
  const at = (deg: number, r: number) => [CX + r * Math.cos(rad(deg)), CY + r * Math.sin(rad(deg))];
  function arc(from: number, to: number, r: number) {
    const [x1, y1] = at(from, r);
    const [x2, y2] = at(to, r);
    return `M${x1} ${y1} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  }

  const marks = $derived(
    Array.from({ length: ticks }, (_, i) => {
      const t = ticks > 1 ? i / (ticks - 1) : 0;
      const deg = start + t * sweep;
      const [ox, oy] = at(deg, R + 5);
      const [ix, iy] = at(deg, R - 9);
      const [dx, dy] = at(deg, R);
      return { t, ox, oy, ix, iy, dx, dy };
    }),
  );
  // The glow shows where it is now; without `current` that is the setting itself.
  const nowFraction = $derived(
    current === undefined || max <= min
      ? fraction
      : Math.min(1, Math.max(0, (current - min) / (max - min))),
  );
  const glowTo = $derived(start + nowFraction * sweep);
  const nowAt = $derived(at(glowTo, R - 16));
  const nowShown = $derived(
    current === undefined ? '' : format ? format(current) : current.toFixed(decimals),
  );
  const lengthOf = $derived(((nowFraction * sweep * Math.PI) / 180) * (R - 16));

  function set(next: number) {
    if (disabled) return;
    const snapped = Math.round((Math.min(max, Math.max(min, next)) - min) / step) * step + min;
    const clean = Number(snapped.toFixed(decimals));
    if (clean === value) return;
    value = clean;
    onchange?.(clean);
  }

  let dial = $state<HTMLElement>();
  function fromPointer(event: PointerEvent) {
    const r = dial?.getBoundingClientRect();
    if (!r?.width) return;
    const x = ((event.clientX - r.left) / r.width) * W;
    const y = TOP + ((event.clientY - r.top) / r.height) * (H - TOP);
    let deg = (Math.atan2(y - CY, x - CX) * 180) / Math.PI;
    if (deg > 90) deg -= 360;
    set(min + ((deg - start) / sweep) * (max - min));
  }
  function down(event: PointerEvent) {
    if (disabled || event.button !== 0) return;
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    fromPointer(event);
  }
  function move(event: PointerEvent) {
    if ((event.currentTarget as HTMLElement).hasPointerCapture?.(event.pointerId))
      fromPointer(event);
  }
  function key(event: KeyboardEvent) {
    const big = Math.max(step, (max - min) / 10);
    const moves: Record<string, number> = {
      ArrowUp: value + step,
      ArrowRight: value + step,
      ArrowDown: value - step,
      ArrowLeft: value - step,
      PageUp: value + big,
      PageDown: value - big,
      Home: min,
      End: max,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    set(next);
  }
</script>

<div class="gauge gauge--{size}" class:gauge--buttons={buttons} class:disabled>
  {#if caption}<div class="caption" id="{uid}-label">{label}</div>{/if}
  <div
    class="dial"
    bind:this={dial}
    role="slider"
    tabindex={disabled ? -1 : 0}
    aria-label={caption ? undefined : label}
    aria-labelledby={caption ? `${uid}-label` : undefined}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    aria-valuetext={`${unit ? `${shown} ${unit}` : shown}${current === undefined ? '' : `, ${currentLabel.toLowerCase()} ${nowShown}${unit ? ` ${unit}` : ''}`}`}
    aria-disabled={disabled ? 'true' : undefined}
    onpointerdown={down}
    onpointermove={move}
    onkeydown={key}
  >
    <svg viewBox="0 {TOP} {W} {H - TOP}" aria-hidden="true">
      <defs>
        <filter id="{uid}-glow" x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <!-- The raised band the ticks sit on. -->
      <path class="band" d={arc(start, start + sweep, R - 2)} />
      {#if nowFraction > 0}
        <!-- Light from within, as far as it is now: a blurred band under the ticks. -->
        <path
          class="glow"
          d={arc(start, glowTo, R - 16)}
          filter="url(#{uid}-glow)"
          data-emit="soft"
        />
      {/if}
      {#each marks as m (m.t)}
        {#if m.t <= fraction + 1e-6}
          <line class="tick on" x1={m.ix} y1={m.iy} x2={m.ox} y2={m.oy} />
        {:else}
          <circle class="tick" cx={m.dx} cy={m.dy} r="1.3" />
        {/if}
      {/each}
      {#if current !== undefined}
        <!-- Where it is now: a small bead at the end of the glow. -->
        <circle class="now" cx={nowAt[0]} cy={nowAt[1]} r="4.5" />
      {/if}
      {#if nowFraction > 0}
        <path
          class="shimmer"
          d={arc(start, glowTo, R - 16)}
          style:--len="{lengthOf}px"
          stroke-dasharray="18 {Math.max(lengthOf, 1)}"
        />
      {/if}
    </svg>
    <div class="read">
      <span class="figure-row"
        ><span class="figure" use:changeCue={shown}>{shown}</span>{#if unit}<span class="unit"
            >{unit}</span
          >{/if}</span
      >
      {#if current !== undefined}
        <!-- Where it is now, under the setting: the gap between the two is the story. -->
        <span class="now-line" use:changeCue={nowShown}
          >{currentLabel} {nowShown}{unit ? ` ${unit}` : ''}</span
        >
      {/if}
    </div>
  </div>
  {#if buttons}
    <div class="ends">
      <Button
        variant="soft"
        size="lg"
        icon="minus"
        label={decreaseLabel}
        iconOnly
        disabled={disabled || value <= min}
        onclick={() => set(value - step)}
      />
      <Button
        variant="soft"
        size="lg"
        icon="plus"
        label={increaseLabel}
        iconOnly
        disabled={disabled || value >= max}
        onclick={() => set(value + step)}
      />
    </div>
  {/if}
</div>

<style>
  .gauge {
    position: relative;
    display: grid;
    gap: var(--space-2);
    width: 100%;
    max-width: 26rem;
    /* The figure sizes itself to the gauge, so a narrow card does not crowd it. Inline-size
       containment gives the gauge no width of its own, so in a flex row it keeps a minimum. */
    container-type: inline-size;
    min-width: min(16rem, 100%);
  }
  /* With buttons at its ends, the arc keeps clear of them. */
  .gauge--buttons .dial {
    margin-inline: calc(var(--control-lg) * 0.55);
  }
  .caption {
    color: var(--text-2);
    font-size: var(--fs-md);
  }
  .dial {
    position: relative;
    touch-action: none;
    cursor: grab;
    border-radius: var(--radius-card);
    outline: none;
  }
  .dial:active {
    cursor: grabbing;
  }
  .dial:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 4px;
  }
  .disabled .dial {
    cursor: default;
    opacity: var(--disabled-opacity);
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .band {
    fill: none;
    stroke: var(--fill-subtle);
    stroke-width: 34;
    stroke-linecap: round;
  }
  /* The reached arc glows in the tint, softly: candy, not neon. */
  .glow {
    fill: none;
    stroke: var(--accent);
    stroke-width: 24;
    stroke-linecap: round;
    opacity: 0.38;
  }
  .tick {
    fill: var(--text-3);
    opacity: 0.6;
  }
  .tick.on {
    stroke: var(--accent-ink);
    stroke-width: 2.2;
    stroke-linecap: round;
    opacity: 0.95;
  }
  /* A slow light running along the lit arc: the gauge is on. */
  .shimmer {
    fill: none;
    stroke: var(--glow-soft);
    stroke-width: 10;
    stroke-linecap: round;
    filter: blur(3px);
    animation: arc-shimmer 3.6s var(--ease-in-out) infinite;
  }
  @keyframes arc-shimmer {
    from {
      stroke-dashoffset: 18;
    }
    to {
      stroke-dashoffset: calc(-1 * var(--len));
    }
  }
  .now {
    fill: var(--accent);
    stroke: var(--layer-panel-bg);
    stroke-width: 2;
    transition:
      cx var(--motion-slow) var(--ease-in-out),
      cy var(--motion-slow) var(--ease-in-out);
  }
  .now-line {
    padding: 0 var(--space-2);
    border-radius: var(--radius-sm);
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .read {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
  }
  .figure-row {
    display: flex;
    align-items: baseline;
  }
  .figure {
    font-size: clamp(2rem, 17cqi, 3.2rem);
    font-weight: var(--fw-heavy);
    letter-spacing: -0.025em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    border-radius: var(--radius-md);
    padding: 0 var(--space-2);
  }
  .gauge--lg .figure {
    font-size: clamp(2.4rem, 20cqi, 4.2rem);
  }
  .unit {
    margin-left: 2px;
    color: var(--text-2);
    font-size: clamp(var(--fs-md), 6cqi, var(--fs-2xl));
    font-weight: var(--fw-semibold);
  }
  /* Minus and plus sit at the two ends of the arc. */
  .ends {
    position: absolute;
    left: -6px;
    right: -6px;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  }
  .ends :global(button) {
    pointer-events: auto;
  }
  @media (prefers-reduced-motion: reduce) {
    .shimmer {
      animation: none;
      opacity: 0;
    }
  }
</style>
