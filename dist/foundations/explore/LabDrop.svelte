<script lang="ts">
  /**
   * Storybook-only: the liquid drop of `utils/liquid.ts`, first inside the components that use
   * it, then bare — a real LiquidDrop on a plain track, with its bulge and move mode to set and
   * a trace of both edges, so the leading edge running ahead and the trailing one catching up
   * with a wobble can be seen frame by frame.
   */
  import { onDestroy, untrack } from 'svelte';
  import NavRail from '../../patterns/organisms/NavRail.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import Tabs from '../../patterns/molecules/Tabs.svelte';
  import Slider from '../../patterns/atoms/Slider.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import CodeBlock from '../../patterns/molecules/CodeBlock.svelte';
  import Trace from './Trace.svelte';
  import { LiquidDrop, boxWithin, type Box } from '../../utils/liquid';
  import { dropCode, LIQUID_DEFAULTS, type DropMode } from './labCode';

  // ── The components that carry a drop ─────────────────────────────────────────────────────
  let railAt = $state('home');
  let range = $state('week');
  let tab = $state('overview');

  // ── The bare drop ─────────────────────────────────────────────────────────────────────────
  const stops = ['Day', 'Week', 'Month', 'Quarter', 'Year'];
  let at = $state(1);
  let bulge = $state<number>(LIQUID_DEFAULTS.bulge);
  let mode = $state<DropMode>('move');
  let track = $state<HTMLElement>();
  let mark = $state<HTMLElement>();
  const stopEls: HTMLElement[] = [];
  let drop: LiquidDrop | undefined;

  // The last move, sampled once per frame the drop is drawn.
  let trace = $state<{ left: number[]; right: number[] }>({ left: [], right: [] });
  let goal = $state<Box | null>(null);
  let stretch = $state(1);
  let thin = $state(1);
  let sampling = false;
  let samples = { left: [] as number[], right: [] as number[], maxW: 0, minH: Infinity };

  $effect(() => {
    const el = mark;
    const host = track;
    if (!el || !host) return;
    const d = new LiquidDrop({
      render: (box) => {
        el.style.width = `${box.w}px`;
        el.style.height = `${box.h}px`;
        el.style.transform = `translate(${box.x}px, ${box.y}px)`;
        if (!sampling || samples.left.length > 150) return;
        samples.left.push(box.x);
        samples.right.push(box.x + box.w);
        samples.maxW = Math.max(samples.maxW, box.w);
        samples.minH = Math.min(samples.minH, box.h);
        trace = { left: [...samples.left], right: [...samples.right] };
        if (goal) {
          stretch = samples.maxW / goal.w;
          thin = samples.minH / goal.h;
        }
      },
      host,
      bulge,
    });
    drop = d;
    // A new drop (a new bulge) starts where the old one was, without a move.
    const first = stopEls[untrack(() => at)];
    if (first) d.moveTo(boxWithin(first, host), 'instant');
    return () => {
      d.destroy();
      drop = undefined;
    };
  });

  function go(i: number) {
    const el = stopEls[i];
    if (!el || !track || !drop) return;
    at = i;
    goal = boxWithin(el, track);
    samples = { left: [], right: [], maxW: 0, minH: Infinity };
    sampling = true;
    drop.moveTo(goal, mode);
  }

  // A short tour: near, far, back — far jumps splash more.
  let tour: ReturnType<typeof setTimeout>[] = [];
  function play() {
    for (const t of tour) clearTimeout(t);
    tour = [4, 0, 3, 1].map((i, n) => setTimeout(() => go(i), n * 900));
  }
  onDestroy(() => tour.forEach(clearTimeout));

  const lo = $derived(Math.min(...trace.left, ...(goal ? [goal.x] : [0])) - 8);
  const hi = $derived(Math.max(...trace.right, ...(goal ? [goal.x + goal.w] : [1])) + 8);
  const pct = (n: number) => `${Math.round(n * 100)} %`;
</script>

<div class="live">
  <div class="rail">
    <NavRail
      label="Lab rail"
      bind:current={railAt}
      items={[
        { id: 'home', label: 'Overview', icon: 'home' },
        { id: 'calendar', label: 'Schedule', icon: 'calendar' },
        { id: 'activity', label: 'Sensors', icon: 'activity' },
        { id: 'settings', label: 'Settings', icon: 'settings' },
      ]}
    />
  </div>
  <div class="others">
    <SegmentedControl
      label="Range"
      bind:value={range}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' },
      ]}
    />
    <SegmentedControl
      label="Range, accent"
      variant="accent"
      bind:value={range}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' },
      ]}
    />
    <Tabs
      label="Lab tabs"
      bind:value={tab}
      tabs={[
        { value: 'overview', label: 'Overview' },
        { value: 'activity', label: 'Activity' },
        { value: 'members', label: 'Members' },
        { value: 'settings', label: 'Settings' },
      ]}
    />
    <p class="hint">
      Pick another item, near or far. The mark stretches towards it, thins while it is stretched — a
      liquid keeps its volume — and lands with a soft wobble; the glass of the rail and the track of
      the control bulge along. Interrupt a move and it carries its speed into the next.
    </p>
  </div>
</div>

<h3>The drop, bare</h3>
<p>
  The same <code>LiquidDrop</code>, on a plain track. Set how much the track bulges and how the drop
  moves, then send it somewhere and read the trace: the leading edge (tint) runs ahead, the trailing
  edge lets go late and overshoots once before it settles.
</p>

<div class="lab">
  <div class="bench">
    <div class="track" bind:this={track}>
      <span class="mark" bind:this={mark} aria-hidden="true"></span>
      {#each stops as stop, i (stop)}
        <button
          type="button"
          class="stop"
          aria-pressed={i === at}
          bind:this={stopEls[i]}
          onclick={() => go(i)}>{stop}</button
        >
      {/each}
    </div>
    <div class="controls">
      <SegmentedControl
        label="Move mode"
        size="sm"
        bind:value={mode}
        options={[
          { value: 'move', label: 'move' },
          { value: 'follow', label: 'follow' },
          { value: 'instant', label: 'instant' },
        ]}
      />
      <div class="wide">
        <Slider
          label="Bulge of the track"
          bind:value={bulge}
          min={0}
          max={0.15}
          step={0.005}
          format={(v) => `${(v * 100).toFixed(1)} %`}
        />
      </div>
      <Button
        size="sm"
        shape="pill"
        variant="soft"
        icon="play"
        label="Play a tour"
        onclick={play}
      />
    </div>
    <p class="note">
      {#if mode === 'move'}
        <strong>move</strong> flows with a splash — the default for a new selection.
      {:else if mode === 'follow'}
        <strong>follow</strong> is for a box that only resized: with nothing in flight it is simply drawn
        there, mid-flight it joins the move without a new splash.
      {:else}
        <strong>instant</strong> lands at once, as the first placement always does.
      {/if}
    </p>
  </div>

  <div class="readout">
    <Trace
      empty="Send the drop somewhere to see its trace."
      label="Left and right edge of the drop over the last move"
      min={lo}
      max={hi}
      marks={goal ? [goal.x, goal.x + goal.w] : []}
      series={[
        { label: 'trailing edge', values: trace.left, tone: 'muted' },
        { label: 'leading edge', values: trace.right, tone: 'accent' },
      ]}
    />
    <dl class="figures">
      <div>
        <dt>Frames drawn</dt>
        <dd>{trace.left.length}</dd>
      </div>
      <div>
        <dt>Longest stretch</dt>
        <dd>{pct(stretch)}</dd>
      </div>
      <div>
        <dt>Thinnest</dt>
        <dd>{pct(thin)}</dd>
      </div>
    </dl>
  </div>
</div>

<CodeBlock label="What you set, in code" code={dropCode(bulge, mode)} />

<style>
  .live {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-8);
    align-items: start;
  }
  /* A vertical NavRail is as tall as the app; here the app is a few items high. */
  .rail {
    --app-height: 22rem;
  }
  .others {
    display: grid;
    gap: var(--space-5);
    justify-items: start;
  }
  @media (max-width: 900px) {
    .live {
      grid-template-columns: 1fr;
    }
  }
  .live .hint,
  .lab .note {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
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
  .bench {
    display: grid;
    gap: var(--space-5);
  }
  .controls {
    display: grid;
    gap: var(--space-4);
    justify-items: start;
  }
  .wide {
    width: min(20rem, 100%);
  }

  /* The track: a recessed groove on the ground; the drop is a tinted pill behind the words. */
  .track {
    position: relative;
    display: flex;
    gap: var(--space-1);
    width: fit-content;
    max-width: 100%;
    padding: var(--space-1);
    border-radius: var(--radius-pill);
    background: var(--fill-subtle);
    box-shadow: inset 0 1px 2px color-mix(in srgb, var(--text) 10%, transparent);
  }
  .mark {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: var(--radius-pill);
    background: var(--accent-soft);
    box-shadow: inset 0 0 0 1px var(--accent-border);
    pointer-events: none;
  }
  .stop {
    position: relative;
    min-height: var(--control-sm);
    padding: 0 var(--space-4);
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
  }
  .stop[aria-pressed='true'] {
    color: var(--accent-ink);
  }
  .stop:focus-visible {
    outline: var(--focus-ring);
  }

  .readout {
    display: grid;
    gap: var(--space-4);
  }
  .figures {
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
</style>
