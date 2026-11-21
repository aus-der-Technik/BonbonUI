<script lang="ts">
  /**
   * Storybook-only: `squeeze` and `pillPath` from `utils/liquid.ts`. A glass bar of tools that
   * squeezes under a press and swells its edges out right at the pressed item, with the press
   * traced frame by frame; then the outline function alone, with its knobs.
   */
  import IconButton from '../../patterns/atoms/IconButton.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import CodeBlock from '../../patterns/molecules/CodeBlock.svelte';
  import Trace from './Trace.svelte';
  import { pillPath, squeeze } from '../../utils/liquid';
  import { pillPathCode, SQUEEZE_DEFAULTS, squeezeCode } from './labCode';

  let amount = $state<number>(SQUEEZE_DEFAULTS.amount);
  let bulge = $state<number>(SQUEEZE_DEFAULTS.bulge);
  let reach = $state<number>(SQUEEZE_DEFAULTS.reach);
  const ROOM = SQUEEZE_DEFAULTS.inset;

  let bar = $state<HTMLElement>();
  let glass = $state<HTMLElement>();
  let presses = $state<number[]>([]);
  let samples: number[] = [];
  let peak = $state(0);
  let ring = $state(0);

  function outline(press: number, at?: number) {
    if (!glass?.offsetWidth) return;
    const d = pillPath(glass.offsetWidth, glass.offsetHeight, {
      inset: ROOM,
      at,
      bulge: Math.max(0, press) * bulge,
      reach,
      vertical: false,
    });
    glass.style.clipPath = `path('${d}')`;
  }

  // Re-attached when a knob changes, so the next press uses it.
  $effect(() => {
    const host = bar;
    if (!host) return;
    outline(0);
    return squeeze(host, {
      selector: 'button',
      amount,
      onFrame: (press, at) => {
        outline(press, at);
        // A new press starts a new trace.
        if (press > 0 && samples.length && samples[samples.length - 1] === 0) samples = [];
        if (samples.length < 240) samples.push(press);
        presses = [...samples];
        peak = Math.max(...samples);
        ring = Math.min(0, ...samples);
      },
    });
  });

  // The outline by itself.
  let at = $state(160);
  let still = $state(6);
  let stillReach = $state(40);
  const stillPath = $derived(
    pillPath(320, 72, { inset: 10, at, bulge: still, reach: stillReach, vertical: false }),
  );
</script>

<div class="lab">
  <div class="bench">
    <div class="stage">
      <div class="bar" bind:this={bar} data-glass>
        <span class="glass" bind:this={glass} aria-hidden="true"></span>
        <div class="tools" role="toolbar" aria-label="Squeeze me">
          <IconButton icon="bold" label="Bold" />
          <IconButton icon="italic" label="Italic" />
          <IconButton icon="underline" label="Underline" />
          <IconButton icon="link" label="Link" />
          <IconButton icon="quote" label="Quote" />
          <IconButton icon="list" label="List" />
        </div>
      </div>
      <p class="note">Press and hold a tool, then let go.</p>
    </div>
    <div class="controls">
      <Slider
        label="Squeeze across the long side"
        bind:value={amount}
        min={0}
        max={0.12}
        step={0.005}
        format={(v) => `${(v * 100).toFixed(1)} %`}
      />
      <Slider
        label="Swell at the press"
        bind:value={bulge}
        min={0}
        max={ROOM}
        step={0.5}
        format={(v) => `${v} px`}
      />
      <Slider
        label="Reach of the swell"
        bind:value={reach}
        min={8}
        max={80}
        step={1}
        format={(v) => `${v} px`}
      />
    </div>
  </div>
  <div class="readout">
    <Trace
      empty="Press a tool to see its trace."
      label="How hard the bar is pressed over the last press"
      min={-0.2}
      max={1.1}
      marks={[0, 1]}
      series={[{ label: 'press', values: presses, tone: 'accent' }]}
    />
    <dl class="figures">
      <div>
        <dt>Deepest</dt>
        <dd>{peak.toFixed(2)}</dd>
      </div>
      <div>
        <dt>Rings below rest</dt>
        <dd>{ring.toFixed(2)}</dd>
      </div>
      <div>
        <dt>Frames</dt>
        <dd>{presses.length}</dd>
      </div>
    </dl>
    <p class="note">
      Pressing pulls the bar in on a firm spring; letting go is looser, so it rings once below rest
      — rubber, not a hinge. At rest nothing is left on the bar.
    </p>
  </div>
</div>

<CodeBlock label="What you set, in code" code={squeezeCode(amount, bulge, reach)} />

<h3>The outline, by itself</h3>
<p>
  <code>pillPath</code> draws the pill as an SVG path whose long edges swell out by
  <code>bulge</code> around <code>at</code>, in a smooth bell <code>reach</code> wide. The dashed lines
  are the room it may grow into; the bell keeps clear of the round ends.
</p>
<div class="lab">
  <svg
    class="outline"
    viewBox="-4 -4 328 80"
    role="img"
    aria-label="The pill outline from pillPath"
  >
    <line class="room" x1="0" x2="320" y1="10" y2="10" />
    <line class="room" x1="0" x2="320" y1="62" y2="62" />
    <line class="at" x1={at} x2={at} y1="0" y2="72" />
    <path d={stillPath} />
  </svg>
  <div class="controls">
    <Slider label="at" bind:value={at} min={0} max={320} step={1} format={(v) => `${v} px`} />
    <Slider
      label="bulge"
      bind:value={still}
      min={0}
      max={10}
      step={0.5}
      format={(v) => `${v} px`}
    />
    <Slider
      label="reach"
      bind:value={stillReach}
      min={4}
      max={120}
      step={1}
      format={(v) => `${v} px`}
    />
  </div>
</div>
<CodeBlock code={pillPathCode(at, still, stillReach)} wrap />

<style>
  .lab {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
  }
  @media (max-width: 760px) {
    .lab {
      grid-template-columns: 1fr;
    }
  }
  .bench,
  .controls,
  .readout {
    display: grid;
    gap: var(--space-4);
  }
  .bench {
    gap: var(--space-6);
  }
  .stage {
    display: grid;
    justify-items: center;
    gap: var(--space-3);
    padding: var(--space-6) var(--space-4);
    border-radius: var(--radius-card);
    border: 1px dashed var(--border-strong);
  }
  .lab .note {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }

  /* The bar: glass that floats, cut to the outline pillPath draws, with room above and below
     for the swell. Only the glass is clipped; the tools sit on top of it. */
  .bar {
    position: relative;
    padding: calc(var(--space-2) + 8px) var(--space-3);
    filter: drop-shadow(0 6px 14px color-mix(in srgb, var(--text) 14%, transparent));
  }
  .glass {
    position: absolute;
    inset: 0;
    background: var(--light, none), var(--layer-front-bg);
    backdrop-filter: var(--layer-front-blur);
    -webkit-backdrop-filter: var(--layer-front-blur);
  }
  .tools {
    position: relative;
    display: flex;
    gap: var(--space-1);
  }

  .readout .figures {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
    margin: 0;
  }
  .figures dt {
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .figures dd {
    margin: 0;
    font-size: var(--fs-xl);
    font-variant-numeric: tabular-nums;
  }

  .outline {
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .outline path {
    fill: var(--accent-faint);
    stroke: var(--accent);
    stroke-width: 1.5;
  }
  .room {
    stroke: var(--text-3);
    stroke-dasharray: 3 4;
  }
  .at {
    stroke: var(--accent-border);
  }
</style>
