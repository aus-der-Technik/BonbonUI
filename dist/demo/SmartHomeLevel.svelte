<script lang="ts">
  /**
   * Smart-home example: a level bar (brightness, volume) of rounded segments. Drag along it,
   * use the keys, or step with minus and plus at its ends. While the device is on, the reached
   * segments are lit in its colour with a soft glow and a slow wave of light; while it is off
   * they stay grey, so the level is still readable. One `slider` for assistive tech.
   * Storybook only.
   */
  import Button from '../patterns/atoms/Button.svelte';

  interface Props {
    /** Accessible name, e.g. "Ceiling lamp brightness". */
    label: string;
    value?: number;
    /** Lit and glowing (the device is on). */
    lit?: boolean;
    /** The light's colour; the tint's glow when not given. */
    colour?: string | undefined;
    segments?: number;
    step?: number;
    decreaseLabel?: string;
    increaseLabel?: string;
    onchange?: ((value: number) => void) | undefined;
  }

  let {
    label,
    value = $bindable(0),
    lit = true,
    colour,
    segments = 14,
    step = 10,
    decreaseLabel = 'Lower',
    increaseLabel = 'Higher',
    onchange,
  }: Props = $props();

  let bar = $state<HTMLElement>();

  function set(next: number) {
    const clean = Math.round(Math.min(100, Math.max(0, next)));
    if (clean === value) return;
    value = clean;
    onchange?.(clean);
  }

  function fromPointer(event: PointerEvent) {
    const r = bar?.getBoundingClientRect();
    if (!r?.width) return;
    // Snaps to fives while dragging: fine enough for light, calm enough to read.
    set(Math.round((((event.clientX - r.left) / r.width) * 100) / 5) * 5);
  }
  function down(event: PointerEvent) {
    if (event.button !== 0) return;
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    fromPointer(event);
  }
  function move(event: PointerEvent) {
    if ((event.currentTarget as HTMLElement).hasPointerCapture?.(event.pointerId))
      fromPointer(event);
  }
  function key(event: KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowUp: value + 5,
      ArrowRight: value + 5,
      ArrowDown: value - 5,
      ArrowLeft: value - 5,
      PageUp: value + 20,
      PageDown: value - 20,
      Home: 0,
      End: 100,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    set(next);
  }

  const reached = $derived(Math.round((value / 100) * segments));
</script>

<div class="level" class:lit style:--light={colour ?? 'var(--glow)'}>
  <Button
    variant="soft"
    size="xs"
    icon="minus"
    label={decreaseLabel}
    iconOnly
    disabled={value <= 0}
    onclick={() => set(Math.ceil(value / step) * step - step)}
  />
  <div
    class="bar"
    bind:this={bar}
    role="slider"
    tabindex="0"
    aria-label={label}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={value}
    aria-valuetext="{value} %"
    onpointerdown={down}
    onpointermove={move}
    onkeydown={key}
  >
    {#each { length: segments }, i (i)}
      <span class="seg" class:on={i < reached} style:--i={i}></span>
    {/each}
  </div>
  <Button
    variant="soft"
    size="xs"
    icon="plus"
    label={increaseLabel}
    iconOnly
    disabled={value >= 100}
    onclick={() => set(Math.floor(value / step) * step + step)}
  />
</div>

<style>
  .level {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    max-width: 22rem;
  }
  .bar {
    flex: 1;
    min-width: 0;
    display: flex;
    gap: 3px;
    align-items: center;
    height: 24px;
    padding-inline: 2px;
    touch-action: none;
    cursor: ew-resize;
    border-radius: var(--radius-sm);
    outline: none;
  }
  .bar:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 3px;
  }
  .seg {
    flex: 1;
    height: 16px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    transition:
      background var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      height var(--motion-base) var(--ease-out);
  }
  .seg.on {
    background: var(--fill-off);
    height: 20px;
  }
  /* On: the reached part is light, glowing softly in the light's own colour. */
  .lit .seg.on {
    background: var(--light);
    box-shadow: 0 0 10px -1px color-mix(in srgb, var(--light) 55%, transparent);
    animation: level-wave 4.2s var(--ease-gentle) infinite;
    animation-delay: calc(var(--i) * 70ms);
  }
  @keyframes level-wave {
    0%,
    70%,
    100% {
      filter: brightness(1);
    }
    80% {
      filter: brightness(1.22);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .lit .seg.on {
      animation: none;
    }
  }
</style>
