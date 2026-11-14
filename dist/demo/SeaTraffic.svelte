<script lang="ts">
  /**
   * Example page: sea traffic and weather over an invented bay. The chart is the one panel —
   * the working surface — with depth contours, a traffic separation scheme, the forecast wind,
   * waves and a drifting rain cell, and fifteen ships that move along their routes. The layer
   * keys, the dot-matrix readout and the forecast slider sit on the ground around it; the
   * vessel list beside it stays in sync with the chart. The only glass is the header bar.
   * Storybook only.
   */
  import { onMount } from 'svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import StatusDot from '../patterns/atoms/StatusDot.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import type { IconName } from '../patterns/atoms/icons';
  import Legend from '../patterns/molecules/Legend.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { prefersReducedMotion } from '../utils/motion';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import SeaTrafficChart from './SeaTrafficChart.svelte';
  import {
    START_MINUTES,
    compass,
    shipAt,
    shipTypes,
    ships,
    waveAt,
    windAt,
    type ChartLayers,
    type Weather,
  } from './mock-sea';

  interface Props {
    /** The forecast scenario. */
    weather?: Weather;
    /** Forecast hour to open at (0 = now). */
    hour?: number;
    /** A vessel to open selected. */
    selected?: string | undefined;
    /** Opens with the traffic paused. */
    paused?: boolean;
  }

  let {
    weather = 'fresh',
    hour: startHour = 0,
    selected: startSelected,
    paused: startPaused = false,
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let hour = $state(startHour);
  // svelte-ignore state_referenced_locally
  let selected = $state<string | null>(startSelected ?? null);
  let hovered = $state<string | null>(null);
  // Reduced motion starts the chart still; pressing play is the reader's own choice.
  // svelte-ignore state_referenced_locally
  let paused = $state(startPaused || prefersReducedMotion());
  let sim = $state(0);
  let point = $state<{ x: number; y: number } | null>(null);
  let layers = $state<ChartLayers>({
    wind: true,
    waves: true,
    rain: true,
    ships: true,
    lanes: true,
  });
  const rows: Record<string, HTMLElement> = {};

  onMount(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const change = () => {
      if (query?.matches) paused = true;
    };
    query?.addEventListener('change', change);
    return () => query?.removeEventListener('change', change);
  });

  const keys: { id: keyof ChartLayers; label: string; icon: IconName }[] = [
    { id: 'wind', label: 'Wind', icon: 'wind' },
    { id: 'waves', label: 'Waves', icon: 'waveform' },
    { id: 'rain', label: 'Rain', icon: 'droplet' },
    { id: 'ships', label: 'Ships', icon: 'ship' },
    { id: 'lanes', label: 'Lanes', icon: 'swap' },
  ];

  const hhmm = (minutes: number) => {
    const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
    return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  };
  const nowMinutes = $derived(START_MINUTES + sim / 60);
  const forecastLabel = (h: number) =>
    h === 0 ? `Now · ${hhmm(nowMinutes)}` : `+${h} h · ${hhmm(nowMinutes + h * 60)}`;

  const fixes = $derived(Object.fromEntries(ships.map((s) => [s.id, shipAt(s, sim)])));
  const focusShip = $derived(ships.find((s) => s.id === (hovered ?? selected)));
  /** Where the readout reads: the pointer, else the ship in focus, else the bay's centre. */
  const probe = $derived.by(() => {
    if (point) return { ...point, label: 'At the pointer' };
    if (focusShip) {
      const f = fixes[focusShip.id]!;
      return { x: f.x, y: f.y, label: `At ${focusShip.name}` };
    }
    return { x: 620, y: 430, label: 'Middle of the bay' };
  });
  const wind = $derived(windAt(probe.x, probe.y, hour, weather));
  const wave = $derived(waveAt(probe.x, probe.y, hour, weather));

  const typeLabel = Object.fromEntries(shipTypes.map((t) => [t.id, t.label]));
  const legend = shipTypes.map((t) => ({ label: t.label, color: `var(--color-${t.color})` }));

  function pick(id: string) {
    fromList = true;
    selected = selected === id ? null : id;
  }

  // A ship picked on the chart scrolls its row into view inside the list — only while the list
  // scrolls by itself (beside the chart); the page itself is never moved.
  let listEl = $state<HTMLElement | undefined>();
  let fromList = false;
  $effect(() => {
    const id = selected;
    if (!id || fromList || !listEl) {
      fromList = false;
      return;
    }
    const row = rows[id];
    if (!row || listEl.scrollHeight <= listEl.clientHeight + 1) return;
    const top = row.offsetTop - listEl.clientHeight / 2 + row.offsetHeight / 2;
    listEl.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'The chart is the one panel',
      body: 'It is the working surface, so it alone is a tile. The layer keys, the readout, the forecast slider and the vessel list sit on the ground around it with a heading and some air.',
      target: '[data-note="chart"]',
    },
    {
      principle: 'locality',
      title: 'A ship’s details open beside the ship',
      body: 'Hover or pick a vessel and its card rides along next to it on the chart while its row lights up in the list; hover a row and the ship rings on the chart. One selection, two places, always in step.',
      target: '[data-note="list"]',
    },
    {
      principle: 'cues',
      title: 'Scrub the forecast, watch the weather move',
      body: 'The slider sits under the chart it changes. The wind streaks, wave shading and the rain cell move to that hour and the readout glows as its figures change.',
      target: '[data-note="forecast"]',
    },
    {
      principle: 'friendly',
      title: 'Layer keys say what they show',
      body: 'Soft-touch keys with an icon and a word; a key stays tinted while its layer is on. The readout uses dot-matrix digits for the two figures a skipper looks up for.',
      target: '[data-note="layers"]',
    },
    {
      principle: 'function',
      title: 'Motion that costs little and stops when unwatched',
      body: 'Ships move only by transforms inside one SVG; weather is redrawn only when the hour changes. The loop rests while paused, for reduced motion and in a hidden tab.',
      target: '[data-note="live"]',
    },
  ];
</script>

<Page width="full" gap="lg">
  {#snippet header()}
    <div class="bar-wrap">
      <Layer level="front" direction="horizontal" gap="md" shape="pill" padding="sm">
        <span class="mark" aria-hidden="true"><Icon name="ship" size={20} /></span>
        <span class="title">
          <span class="title__main">Sea traffic</span>
          <span class="title__sub">Kestrel Bay</span>
        </span>
        <span class="bar-spacer"></span>
        <span class="live" data-note="live">
          <StatusDot tone={paused ? 'neutral' : 'ok'} pulse={!paused} />
          <span class="live__word">{paused ? 'Paused' : 'Live'}</span>
          <DotMatrix value={hhmm(nowMinutes)} label="Time {hhmm(nowMinutes)}" size="sm" />
        </span>
        <Button
          variant="glass"
          size="md"
          icon={paused ? 'play' : 'pause'}
          label={paused ? 'Resume traffic' : 'Pause traffic'}
          iconOnly
          onclick={() => (paused = !paused)}
        />
      </Layer>
    </div>
  {/snippet}

  <div class="layout">
    <div class="work">
      <div class="tools">
        <div class="keys" role="group" aria-label="Chart layers" data-note="layers">
          {#each keys as k (k.id)}
            <Button
              variant="soft"
              size="sm"
              icon={k.icon}
              label={k.label}
              aria-pressed={layers[k.id]}
              onclick={() => (layers[k.id] = !layers[k.id])}
            />
          {/each}
        </div>
        <div class="readout" aria-live="off">
          <span class="readout__where">{probe.label}</span>
          <span class="readout__item" use:changeCue={hour}>
            <Icon name="wind" size={18} />
            <DotMatrix
              value={Math.round(wind.speed)}
              label="{Math.round(wind.speed)} knots"
              size="md"
            />
            <span class="unit">kn</span>
            <span class="dir" title="From {Math.round(wind.from)}°">
              <span class="dir__arrow" style:transform="rotate({wind.from + 180}deg)">
                <Icon name="arrow-up" size={14} />
              </span>
              {compass(wind.from)}
            </span>
          </span>
          <span class="readout__item" use:changeCue={hour}>
            <Icon name="waveform" size={18} />
            <DotMatrix value={wave.toFixed(1)} label="{wave.toFixed(1)} metres" size="md" />
            <span class="unit">m</span>
          </span>
        </div>
      </div>

      <div data-note="chart">
        <Layer level="panel" padding="none" class="chart-panel">
          <SeaTrafficChart
            {ships}
            {hour}
            {weather}
            {layers}
            running={!paused}
            bind:selected
            bind:hovered
            bind:sim
            onpoint={(p) => (point = p)}
          />
        </Layer>
      </div>

      <div class="below">
        <div class="forecast" data-note="forecast">
          <Slider
            label="Forecast"
            min={0}
            max={24}
            step={1}
            bind:value={hour}
            format={forecastLabel}
          />
        </div>
        <div class="keys-legend">
          <Legend items={legend} shape="dot" />
          <span class="scale">
            <span class="scale__bar" aria-hidden="true"></span>
            Waves 0–4 m
          </span>
          <span class="muted">Depth contours 5 · 10 · 20 · 40 m</span>
        </div>
      </div>
    </div>

    <section class="list" aria-labelledby="vessels-title" data-note="list" bind:this={listEl}>
      <header class="list__head">
        <h2 id="vessels-title">Vessels</h2>
        <span class="muted">{ships.length} in the area</span>
      </header>
      <ul>
        {#each ships as s (s.id)}
          {@const f = fixes[s.id]!}
          {@const on = s.id === selected}
          <li bind:this={rows[s.id]}>
            <button
              type="button"
              class="vessel"
              class:vessel--on={on}
              class:vessel--hover={s.id === hovered}
              aria-pressed={on}
              onclick={() => pick(s.id)}
              onpointerenter={() => (hovered = s.id)}
              onpointerleave={() => (hovered = null)}
              onfocus={() => (hovered = s.id)}
              onblur={() => (hovered = null)}
            >
              <svg class="glyph" viewBox="-10 -10 20 20" aria-hidden="true">
                <path
                  d="M0 -8 C3 -4.5 3.4 0 2.9 6.5 L-2.9 6.5 C-3.4 0 -3 -4.5 0 -8 Z"
                  style:fill="var(--color-{shipTypes.find((t) => t.id === s.type)?.color})"
                  transform="rotate({Math.round(f.course)})"
                />
              </svg>
              <span class="vessel__text">
                <span class="vessel__name">{s.name}</span>
                <span class="vessel__line">
                  {typeLabel[s.type]} · {s.kn.toFixed(1)} kn · {f.destination}
                </span>
              </span>
              <span class="vessel__eta">
                {f.eta === undefined ? '' : hhmm(nowMinutes + f.eta / 60)}
              </span>
            </button>
            {#if on}
              <dl class="details">
                <div>
                  <dt>Course</dt>
                  <dd>{Math.round(f.course)}° {compass(f.course)}</dd>
                </div>
                <div>
                  <dt>Length</dt>
                  <dd>{s.length} m</dd>
                </div>
                <div>
                  <dt>To</dt>
                  <dd>{f.destination}</dd>
                </div>
                <div>
                  <dt>ETA</dt>
                  <dd>{f.eta === undefined ? 'On station' : hhmm(nowMinutes + f.eta / 60)}</dd>
                </div>
                {#if !f.onChart}<div class="details__note">Outside the chart right now</div>{/if}
              </dl>
            {/if}
          </li>
        {/each}
      </ul>
    </section>
  </div>
</Page>

<DesignNotes title="Sea traffic" {notes} corner="bottom-right" />

<style>
  .bar-wrap {
    padding: var(--sticky-gap) var(--gutter) 0;
  }
  .mark {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--accent);
    color: var(--on-accent);
  }
  .title {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    min-width: 0;
  }
  .title__main {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
  }
  .title__sub {
    color: var(--text-2);
  }
  .bar-spacer {
    flex: 1;
  }
  .live {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text);
  }
  .live__word {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }

  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 20rem;
    gap: var(--space-8);
    align-items: start;
  }
  .work {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
  }
  .tools {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3) var(--space-6);
  }
  .keys {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  .readout {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-5);
  }
  .readout__where {
    min-width: 9rem;
    color: var(--text-2);
    font-size: var(--fs-sm);
    text-align: right;
  }
  .readout__item {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-2);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
  }
  .readout__item :global(.icon) {
    align-self: center;
    color: var(--text-3);
  }
  .unit {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .dir {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .dir__arrow {
    display: inline-grid;
    transition: transform var(--motion-slow) var(--ease-in-out);
  }
  .work :global(.chart-panel) {
    overflow: clip;
  }

  .below {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4) var(--space-8);
  }
  .forecast {
    flex: 1 1 18rem;
    max-width: 30rem;
  }
  .keys-legend {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-2);
  }
  .scale {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .scale__bar {
    width: 4.5rem;
    height: 8px;
    border-radius: var(--radius-pill);
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-blue) 10%, var(--bg)),
      color-mix(in srgb, var(--color-indigo) 45%, var(--bg))
    );
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  /* Vessel list: on the ground, sticky beside the chart. */
  .list {
    position: sticky;
    top: calc(var(--page-top, 0px) + var(--space-2));
    max-height: calc(var(--app-height, 100dvh) - var(--page-top, 0px) - var(--space-6));
    overflow: auto;
    overscroll-behavior: contain;
    padding: 2px;
    margin: -2px;
  }
  .list__head {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }
  .list h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .list ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .list li + li {
    border-top: 1px solid var(--border-strong);
  }
  .vessel {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-2) var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background var(--motion-quick) var(--ease-out);
  }
  .vessel--hover {
    background: var(--fill-hover);
  }
  .vessel--on {
    background: var(--accent-soft);
  }
  .vessel:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .glyph {
    width: 22px;
    height: 22px;
  }
  .glyph path {
    stroke: var(--bg);
    stroke-width: 0.8;
    transition: transform var(--motion-slow) var(--ease-in-out);
  }
  .vessel__text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .vessel__name {
    font-weight: var(--fw-semibold);
    font-size: var(--fs-sm);
  }
  .vessel--on .vessel__name {
    color: var(--accent-ink);
  }
  .vessel__line {
    overflow: hidden;
    color: var(--text-2);
    font-size: var(--fs-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .vessel__eta {
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .details {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-2) var(--space-4);
    margin: 0;
    padding: var(--space-2) var(--space-2) var(--space-3) calc(22px + var(--space-5));
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .details dt {
    color: var(--text-2);
    font-size: var(--fs-xs);
  }
  .details dd {
    margin: 0;
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .details__note {
    grid-column: 1 / -1;
    color: var(--text-2);
    font-size: var(--fs-xs);
  }

  @media (max-width: 1100px) {
    .layout {
      grid-template-columns: minmax(0, 1fr);
    }
    .list {
      position: static;
      max-height: none;
    }
    .keys-legend {
      align-items: flex-start;
    }
    .readout__where {
      text-align: left;
    }
  }
  @media (max-width: 520px) {
    .title__sub,
    .live__word {
      display: none;
    }
  }
</style>
