<script lang="ts">
  /**
   * Example page: a smart-home dashboard over a photograph of the house. The greeting sits on
   * the ground in large light type; hotspot pills float over the photo, pinned to the roof, the
   * door and the hall window, and open that place in the side panel. Three panels along the
   * bottom — a near-black energy tile, climate with an arc and four mode keys, and the hall's
   * lights and speaker — are smoked glass, because over a photo panels are glass. Light comes
   * only from what is on: lit level bars, the lit arc, the selected mode, the icons of running
   * devices. Storybook only.
   */
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import StatusDot from '../patterns/atoms/StatusDot.svelte';
  import Switch from '../patterns/atoms/Switch.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import ArcGauge from '../patterns/molecules/ArcGauge.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import NavRail from '../patterns/organisms/NavRail.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { tick } from 'svelte';
  import { boxWithin, LiquidDrop } from '../utils/liquid';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import SmartHomeLevel from './SmartHomeLevel.svelte';
  import {
    PHOTO,
    baseLoad,
    batteryCharge,
    devices as allDevices,
    energyToday,
    energyYesterday,
    favourites,
    modes,
    places,
    railItems,
    solarNow,
    solarToday,
    stripColours,
    type ClimateMode,
    type HomeDevice,
    type PlaceId,
    type StripColour,
  } from './mock-home';

  interface Props {
    /** The place open in the side panel. */
    place?: PlaceId;
    /** Opens with everyone away: lights off, door locked, Eco. */
    away?: boolean;
    /** The hotspots are pinned to the bundled photo; for another photo they line up instead. */
    anchored?: boolean;
  }

  let { place: startPlace = 'hall', away: startAway = false, anchored = true }: Props = $props();

  const AWAY_OFF = ['lamp', 'strip', 'speaker', 'porch', 'vacuum'];

  let devices = $state<HomeDevice[]>(
    allDevices.map((d) => ({
      ...d,
      on: startAway ? (d.id === 'lock' ? true : AWAY_OFF.includes(d.id) ? false : d.on) : d.on,
    })),
  );
  // svelte-ignore state_referenced_locally
  let placeId = $state<PlaceId>(startPlace);
  // svelte-ignore state_referenced_locally
  let away = $state(startAway);
  let section = $state('home');
  // svelte-ignore state_referenced_locally
  let mode = $state<ClimateMode>(startAway ? 'eco' : 'auto');
  let homeTarget = $state(22);
  let hallOffset = $state(0.5);
  let hallAir = $state(22.1);
  let reserve = $state(30);
  let strip = $state<StripColour>('warm');

  const byId = (id: string) => devices.find((d) => d.id === id)!;
  const place = $derived(places.find((p) => p.id === placeId) ?? places[0]!);
  const here = $derived(devices.filter((d) => d.place === placeId));
  const onIn = (id: PlaceId) => devices.filter((d) => d.place === id && d.on).length;
  const hallTarget = $derived(Math.min(28, Math.max(16, homeTarget + hallOffset)));
  const locked = $derived(byId('lock').on);
  const stripCss = $derived(stripColours.find((c) => c.id === strip)?.css);

  const one = (n: number) => n.toFixed(1);
  /** Watts below a kilowatt, so switching a lamp visibly moves the figure. */
  const power = (watts: number) =>
    watts < 1000 ? `${Math.round(watts)} W` : `${(watts / 1000).toFixed(2)} kW`;

  /** What the house draws now: the base load plus every device that is on. */
  const drawKw = $derived(
    baseLoad + devices.reduce((sum, d) => sum + (d.on ? d.watts : 0), 0) / 1000,
  );
  const usedToday = energyToday.reduce<number>((sum, v) => sum + (v ?? 0), 0);
  const delta = Math.round(((usedToday - energyYesterday) / energyYesterday) * 100);
  const peak = Math.max(...energyToday.map((v) => v ?? 0));
  const nowHour = energyToday.filter((v) => v !== null).length - 1;
  const solarShare = $derived(Math.min(100, Math.round((solarNow / drawKw) * 100)));

  function stateText(d: HomeDevice) {
    const word = d.on ? (d.onText ?? 'On') : (d.offText ?? 'Off');
    return d.on && d.level !== undefined ? `${word} · ${d.level} %` : word;
  }

  function hotspotText(id: PlaceId) {
    if (id === 'solar') return `Solar · ${one(solarNow)} kW`;
    if (id === 'door') return `Front door · ${locked ? 'Locked' : 'Unlocked'}`;
    return `Main hall · ${one(hallAir)} °C · ${onIn('hall')} on`;
  }

  function toggle(id: string) {
    const d = byId(id);
    d.on = !d.on;
  }

  /** Setting a level on a device that is off turns it on: the change should be seen. */
  function setLevel(id: string, value: number) {
    const d = byId(id);
    d.level = value;
    d.on = value > 0;
  }

  /** Opens a place; on narrow screens the panel sits below, so it is brought into view. */
  async function open(id: PlaceId) {
    placeId = id;
    await tick();
    const panel = document.getElementById('place-title')?.closest('aside');
    const r = panel?.getBoundingClientRect();
    if (panel && r && (r.top > innerHeight - 120 || r.bottom < 0)) {
      const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
      panel.scrollIntoView({ block: 'start', behavior: smooth ? 'smooth' : 'auto' });
    }
  }

  // Leaving turns things off one after another, so each light is seen going out.
  let timers: ReturnType<typeof setTimeout>[] = [];
  let before: { on: Record<string, boolean>; mode: ClimateMode } | null = null;
  function leave() {
    before = { on: Object.fromEntries(devices.map((d) => [d.id, d.on])), mode };
    away = true;
    const steps = [...AWAY_OFF.filter((id) => byId(id).on), 'lock'];
    steps.forEach((id, i) =>
      timers.push(
        setTimeout(() => {
          byId(id).on = id === 'lock';
          if (i === steps.length - 1) mode = 'eco';
        }, i * 160),
      ),
    );
  }
  function arrive() {
    timers.forEach(clearTimeout);
    timers = [];
    away = false;
    const back = before ?? {
      on: { lamp: true, strip: true, speaker: true },
      mode: 'auto' as ClimateMode,
    };
    ['lamp', 'strip', 'speaker', 'porch'].forEach((id, i) =>
      timers.push(setTimeout(() => (byId(id).on = back.on[id] ?? false), i * 160)),
    );
    mode = back.mode;
    before = null;
  }
  $effect(() => () => timers.forEach(clearTimeout));

  // The hall's air follows its target, a tenth of a degree a step — as far as the mode allows.
  $effect(() => {
    const timer = setInterval(() => {
      const gap = hallTarget - hallAir;
      const loose = mode === 'eco' ? 1 : 0.05;
      const warm = gap > loose && mode !== 'cool';
      const cool = gap < -loose && mode !== 'warm';
      if (warm) hallAir = Math.round((hallAir + 0.1) * 10) / 10;
      else if (cool) hallAir = Math.round((hallAir - 0.1) * 10) / 10;
    }, 2400);
    return () => clearInterval(timer);
  });

  // ── Hotspots: pinned to places in the backdrop photo ───────────────────────────────────
  // The backdrop is fixed and covers the viewport (centred), so a point in the photo is found
  // with the same cover maths; the pills are placed relative to the stage they float in.
  let stage = $state<HTMLElement>();
  let pins = $state<Record<string, { x: number; y: number }>>({});
  let pillW = $state<Record<string, number>>({});
  let pinned = $state(false);

  function measure() {
    if (!stage || !anchored) return (pinned = false);
    const s = Math.max(innerWidth / PHOTO.w, innerHeight / PHOTO.h);
    const ox = (innerWidth - PHOTO.w * s) / 2;
    const oy = (innerHeight - PHOTO.h * s) / 2;
    const r = stage.getBoundingClientRect();
    const next: Record<string, { x: number; y: number }> = {};
    let inside = r.width >= 480;
    for (const p of places) {
      const x = ox + p.anchor.x * s - r.left;
      const y = oy + p.anchor.y * s - r.top;
      if (x < 12 || x > r.width - 12 || y < 64 || y > r.height - 8) inside = false;
      next[p.id] = { x, y };
    }
    pins = next;
    pinned = inside;
  }

  $effect(() => {
    if (!stage) return;
    measure();
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    observer?.observe(stage);
    addEventListener('resize', measure);
    addEventListener('scroll', measure, true);
    return () => {
      observer?.disconnect();
      removeEventListener('resize', measure);
      removeEventListener('scroll', measure, true);
    };
  });

  /** Where a pill starts: reaching left, right or both ways from its pin, kept on the stage. */
  const pillLeft = (id: PlaceId) => {
    const x = pins[id]?.x ?? 0;
    const w = pillW[id] ?? 0;
    const reach = places.find((p) => p.id === id)?.reach;
    const start = reach === 'left' ? x - w + 18 : reach === 'right' ? x - 18 : x - w / 2;
    return Math.min(Math.max(start, 0), Math.max(0, (stage?.clientWidth ?? 0) - w));
  };

  // ── Mode keys: a pool of light flows to the chosen one (utils/liquid.ts) ──────────────
  let modesEl = $state<HTMLElement>();
  let poolEl = $state<HTMLElement>();
  let pool: LiquidDrop | undefined;
  function placePool(how: 'move' | 'follow' | 'instant') {
    const key = modesEl?.querySelector<HTMLElement>(`[data-mode="${mode}"] button`);
    if (key && modesEl && key.offsetWidth) pool?.moveTo(boxWithin(key, modesEl), how);
  }
  $effect(() => {
    const el = poolEl;
    if (!el || !modesEl) return;
    pool = new LiquidDrop({
      render: (box) => {
        el.style.width = `${box.w}px`;
        el.style.height = `${box.h}px`;
        el.style.transform = `translate(${box.x}px, ${box.y}px)`;
      },
    });
    placePool('instant');
    const observer =
      typeof ResizeObserver === 'function' ? new ResizeObserver(() => placePool('follow')) : null;
    observer?.observe(modesEl);
    return () => {
      observer?.disconnect();
      pool?.destroy();
      pool = undefined;
    };
  });
  $effect(() => {
    void mode;
    queueMicrotask(() => placePool('move'));
  });

  const modeInfo = $derived(modes.find((m) => m.id === mode) ?? modes[0]!);
  const favouriteDevices = $derived(favourites.map((id) => byId(id)));

  const chips = $derived.by(() => {
    if (placeId === 'solar')
      return [
        { icon: 'bolt' as const, value: `${one(solarNow)} kW`, label: 'Now' },
        { icon: 'sun' as const, value: `${one(solarToday)} kWh`, label: 'Today' },
        { icon: 'battery' as const, value: `${batteryCharge} %`, label: 'Battery' },
      ];
    if (placeId === 'door')
      return [
        { icon: 'lock' as const, value: locked ? 'Locked' : 'Open', label: 'Lock' },
        { icon: 'clock' as const, value: '14:12', label: 'Opened' },
        {
          icon: 'camera' as const,
          value: byId('camera').on ? 'Watching' : 'Off',
          label: 'Camera',
        },
      ];
    return [
      { icon: 'thermometer' as const, value: `${one(hallAir)} °C`, label: 'Air' },
      { icon: 'users' as const, value: away ? 'Nobody' : '2 people', label: 'Here now' },
      { icon: 'droplet' as const, value: '46 %', label: 'Humidity' },
    ];
  });

  const doorLog = [
    { time: '14:12', text: 'Robin came home' },
    { time: '11:03', text: 'A parcel was left at the door' },
    { time: '08:20', text: 'Locked after everyone left' },
  ];

  const notes: DesignNote[] = [
    {
      principle: 'cues',
      title: 'Light comes from what is on',
      body: 'Lit devices, the reached arc and the chosen mode are emitters: their tint glows into the smoked glass around them, so the page shows at a glance what is running. Switch one off and its light goes with it.',
    },
    {
      principle: 'locality',
      title: 'The pills sit on the house, where things are',
      body: 'Each hotspot is pinned to its place in the photo — the roof, the door, the hall window — and says its state in a few words. Pressed, it opens that place in the panel beside it.',
      target: '[data-note="hotspots"]',
    },
    {
      principle: 'cues',
      title: 'Only what is on gives light',
      body: 'Lit level bars, the reached part of the arc, the chosen mode and the icons of running devices glow softly; switch a light off and its glow goes out. Nothing glows just to decorate.',
      target: '[data-note="devices"]',
    },
    {
      principle: 'function',
      title: 'One near-black tile for the one figure',
      body: "Today's energy is what the house is judged by, so it is the only dark tile: a big light figure, a small delta and the day in bars. Turning a device on or off moves “Using now” at once.",
      target: '[data-note="energy"]',
    },
    {
      principle: 'friendly',
      title: 'Glass over a photo, solid words on it',
      body: 'Over a picture a solid tile would cut a hole into it, so the panels are smoked glass with one light edge on top. Type stays large and light where it is read from afar, small and clear inside.',
      target: '[data-note="climate"]',
    },
    {
      principle: 'locality',
      title: 'The room panel changes the room, nothing else',
      body: 'Lock the door here and the pill on the door says so; the hall’s target moves the hall’s air, which creeps towards it and updates its pill as it goes.',
      target: '[data-note="place"]',
    },
  ];
</script>

<div class="scrim" aria-hidden="true"></div>

<Page width="full" gap="lg">
  <div class="shell">
    <div class="rail">
      <NavRail items={railItems} bind:current={section} label="Home">
        {#snippet top()}
          <span class="logo" aria-hidden="true"><Icon name="leaf" size={19} /></span>
        {/snippet}
        {#snippet bottom()}
          <Avatar name="Robin Example" size={40} />
        {/snippet}
      </NavRail>
    </div>

    {#if section === 'home'}
      <div class="main">
        <header class="head">
          <div>
            <h1>Good afternoon, Robin</h1>
            <p class="sub" use:changeCue={away}>
              <StatusDot tone={away ? 'neutral' : 'ok'} />
              {#if away}
                Away · lights off, door locked, Eco on
              {:else}
                Friday, 6 November · 19 °C and hazy outside · everyone is home
              {/if}
            </p>
          </div>
          {#if away}
            <Button variant="soft" size="lg" icon="home" label="I'm home" onclick={arrive} />
          {:else}
            <Button variant="soft" size="lg" icon="sign-out" label="Leaving home" onclick={leave} />
          {/if}
        </header>

        <div
          class="stage"
          class:pinned
          bind:this={stage}
          data-note="hotspots"
          role="group"
          aria-label="Around the house"
        >
          {#each places as p (p.id)}
            {@const on = p.id === placeId}
            {@const pin = pins[p.id]}
            <div
              class="spot"
              class:on
              style:--x={pinned && pin ? `${pin.x}px` : undefined}
              style:--y={pinned && pin ? `${pin.y}px` : undefined}
            >
              {#if pinned}<span class="spot__pin" aria-hidden="true"></span>{/if}
              <button
                type="button"
                class="spot__pill"
                aria-pressed={on}
                bind:offsetWidth={pillW[p.id]}
                style:left={pinned ? `${pillLeft(p.id)}px` : undefined}
                onclick={() => open(p.id)}
              >
                <span class="spot__dot" aria-hidden="true"></span>
                <span use:changeCue={hotspotText(p.id)}>{hotspotText(p.id)}</span>
              </button>
            </div>
          {/each}
        </div>

        <Card
          surface="ink"
          padding="lg"
          gap="sm"
          as="section"
          class="smart-energy"
          data-note="energy"
          aria-labelledby="energy-title"
        >
          <div class="energy">
            <div class="energy__head">
              <h2 id="energy-title" class="eyebrow">Energy usage</h2>
              <span class="delta" title="Against {one(energyYesterday)} kWh yesterday">
                <Icon name={delta < 0 ? 'trending-down' : 'trending-up'} size={14} />
                {delta > 0 ? '+' : '−'}{Math.abs(delta)} %
                <span class="sr-only">against {one(energyYesterday)} kWh yesterday</span>
              </span>
            </div>
            <p class="figure">
              {one(usedToday)}<span class="figure__unit">kWh</span>
            </p>
            <p class="muted">So far today</p>
            <svg
              class="bars"
              viewBox="0 0 240 64"
              role="img"
              aria-label="Use per hour today; most at {String(energyToday.indexOf(peak)).padStart(
                2,
                '0',
              )}:00 with {peak} kWh"
            >
              {#each energyToday as v, h (h)}
                {#if v === null}
                  <circle class="bar bar--later" cx={h * 10 + 4} cy="60" r="1.4" />
                {:else}
                  <rect
                    class="bar"
                    class:bar--now={h === nowHour}
                    x={h * 10 + 1}
                    y={62 - (v / peak) * 58}
                    width="6"
                    height={(v / peak) * 58}
                    rx="3"
                  />
                {/if}
              {/each}
            </svg>
            <div class="axis" aria-hidden="true">
              <span>00</span><span>06</span><span>12</span><span>18</span><span>24</span>
            </div>
            <p class="now">
              <span class="now__line">
                Using now
                <strong use:changeCue={power(drawKw * 1000)}>{power(drawKw * 1000)}</strong>
              </span>
              <span class="muted" use:changeCue={solarShare}
                >{solarShare === 100
                  ? 'Solar covers all of it'
                  : `Solar covers ${solarShare} %`}</span
              >
            </p>
          </div>
        </Card>

        <Layer
          level="panel"
          padding="lg"
          gap="md"
          as="section"
          class="smart-climate"
          data-note="climate"
          aria-labelledby="climate-title"
        >
          <div class="panel-head">
            <h2 id="climate-title">Climate &amp; comfort</h2>
            <span class="muted" use:changeCue={mode}>{modeInfo.says}</span>
          </div>
          <div class="climate">
            <ArcGauge
              label="Home target temperature"
              bind:value={homeTarget}
              min={16}
              max={28}
              step={0.5}
              unit="°C"
              caption={false}
              decreaseLabel="Cooler by half a degree"
              increaseLabel="Warmer by half a degree"
            />
          </div>
          <div class="modes-wrap" bind:this={modesEl}>
            <span class="pool" bind:this={poolEl} aria-hidden="true"></span>
            <ul class="modes" aria-label="Mode">
              {#each modes as m (m.id)}
                <li data-mode={m.id}>
                  <Button
                    variant="soft"
                    size="lg"
                    icon={m.icon}
                    label={m.label}
                    iconOnly
                    aria-pressed={m.id === mode}
                    onclick={() => (mode = m.id)}
                  />
                  <span class="key-label" aria-hidden="true">{m.label}</span>
                </li>
              {/each}
            </ul>
          </div>
        </Layer>

        <Layer
          level="panel"
          padding="lg"
          gap="md"
          as="section"
          class="smart-devices"
          aria-labelledby="devices-title"
        >
          <div class="panel-head">
            <h2 id="devices-title">Smart devices</h2>
            <span class="muted"
              >Main hall · {favouriteDevices.filter((d) => d.on).length} of {favouriteDevices.length}
              on</span
            >
          </div>
          <ul class="devices" data-note="devices">
            {#each favouriteDevices as d (d.id)}
              {@const light = d.id === 'strip' ? stripCss : undefined}
              <li class="device" class:on={d.on} style:--light={light ?? 'var(--glow)'}>
                <span class="key">
                  <Button
                    variant="soft"
                    size="lg"
                    icon={d.icon}
                    label={d.name}
                    iconOnly
                    aria-pressed={d.on}
                    onclick={() => toggle(d.id)}
                  />
                </span>
                <div class="device__text">
                  <span class="device__name">{d.name}</span>
                  {#if d.id === 'strip'}
                    <div class="colours" role="radiogroup" aria-label="Light strip colour">
                      {#each stripColours as c (c.id)}
                        <label class="colour" style:--c={c.css} title={c.name}>
                          <input
                            type="radio"
                            name="strip-colour"
                            value={c.id}
                            bind:group={strip}
                            onchange={() => (d.on = true)}
                          />
                          <span class="colour__dot"></span>
                          <span class="sr-only">{c.name}</span>
                        </label>
                      {/each}
                    </div>
                  {/if}
                  <span class="device__state" use:changeCue={stateText(d)}>{stateText(d)}</span>
                </div>
                <div class="device__control">
                  <SmartHomeLevel
                    label="{d.name} {d.id === 'speaker' ? 'volume' : 'brightness'}"
                    value={d.level ?? 0}
                    lit={d.on}
                    colour={light}
                    decreaseLabel={d.id === 'speaker' ? 'Quieter' : 'Dimmer'}
                    increaseLabel={d.id === 'speaker' ? 'Louder' : 'Brighter'}
                    onchange={(v) => setLevel(d.id, v)}
                  />
                </div>
              </li>
            {/each}
          </ul>
        </Layer>
      </div>

      <Layer
        level="panel"
        padding="lg"
        gap="lg"
        as="aside"
        class="smart-place"
        aria-labelledby="place-title"
      >
        {#key placeId}
          <div class="place__body" data-note="place">
            <header class="place__head">
              <span class="eyebrow">{place.kind}</span>
              <h2 id="place-title">{place.name}</h2>
              <span class="muted" use:changeCue={onIn(placeId)}
                >{onIn(placeId)} of {here.length} devices on</span
              >
            </header>

            <ul class="chips">
              {#each chips as c (c.label)}
                <li class="chip">
                  <Icon name={c.icon} size={16} />
                  <span class="chip__value" use:changeCue={c.value}>{c.value}</span>
                  <span class="chip__label">{c.label}</span>
                </li>
              {/each}
            </ul>

            {#if placeId === 'hall'}
              <div class="zone">
                <ArcGauge
                  label="Main hall target"
                  value={hallTarget}
                  min={16}
                  max={28}
                  step={0.5}
                  unit="°C"
                  decreaseLabel="Cooler by half a degree"
                  increaseLabel="Warmer by half a degree"
                  onchange={(v) => (hallOffset = v - homeTarget)}
                />
                <p class="muted zone__note">
                  {hallOffset === 0
                    ? 'Follows the house'
                    : `${hallOffset > 0 ? '+' : '−'}${one(Math.abs(hallOffset))}° on the house`}
                  · air now {one(hallAir)} °C
                </p>
              </div>
            {:else if placeId === 'solar'}
              <div class="zone">
                <ArcGauge
                  label="Battery kept for the evening"
                  bind:value={reserve}
                  min={0}
                  max={80}
                  step={5}
                  unit="%"
                  decreaseLabel="Keep less"
                  increaseLabel="Keep more"
                />
              </div>
            {:else}
              <ol class="log" aria-label="At the door today">
                {#each doorLog as e (e.time)}
                  <li><span class="log__time">{e.time}</span> {e.text}</li>
                {/each}
              </ol>
            {/if}

            <section class="here" aria-labelledby="here-title">
              <h3 id="here-title" class="eyebrow">
                {placeId === 'hall' ? 'Devices in this room' : 'Controls here'}
              </h3>
              <ul class="rows">
                {#each here as d (d.id)}
                  <li class="row" class:on={d.on}>
                    <span class="row__icon" aria-hidden="true"
                      ><Icon name={d.icon} size={17} /></span
                    >
                    <span class="row__text">
                      <span class="row__name">{d.name}</span>
                      <span class="row__state" use:changeCue={stateText(d)}>{stateText(d)}</span>
                    </span>
                    <Switch size="sm" aria-label={d.name} bind:checked={d.on} />
                  </li>
                {/each}
              </ul>
            </section>
          </div>
        {/key}
      </Layer>
    {:else}
      <div class="main main--empty">
        <!-- On a panel, because plain grey words would sink into the pale sky of the photo. -->
        <Layer level="panel" padding="lg">
          <EmptyState
            icon={railItems.find((i) => i.id === section)?.icon ?? 'home'}
            title="{railItems.find((i) => i.id === section)?.label} is not part of this example"
            message="The home screen shows everything this page demonstrates."
            actionLabel="Back home"
            onaction={() => (section = 'home')}
          />
        </Layer>
      </div>
    {/if}
  </div>
</Page>

<DesignNotes title="Smart home" {notes} corner="bottom-right" />

<style>
  /* The photo is pale; a warm dusk over it keeps light type readable on the ground. */
  .scrim {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--bg) 58%, transparent) 0%,
        color-mix(in srgb, var(--bg) 18%, transparent) 30%,
        color-mix(in srgb, var(--bg) 4%, transparent) 50%,
        color-mix(in srgb, var(--bg) 42%, transparent) 100%
      ),
      linear-gradient(90deg, color-mix(in srgb, var(--bg) 34%, transparent), transparent 40%);
  }

  .shell {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) clamp(18rem, 24vw, 21rem);
    gap: var(--space-6);
    align-items: stretch;
    /* Page pads the body 1.5rem above and 3rem below. */
    min-height: calc(var(--app-height, 100dvh) - var(--space-6) - var(--space-12));
  }
  .rail {
    position: sticky;
    top: var(--sticky-gap);
    align-self: start;
    display: flex;
  }
  .logo {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--soft-bg);
    box-shadow: var(--soft-shadow);
    color: var(--accent-ink);
  }

  /* The main column: greeting, the stage over the photo, then the three panels. */
  .main {
    display: grid;
    grid-template-columns: minmax(12.5rem, 0.85fr) minmax(15rem, 1fr) minmax(17.5rem, 1.25fr);
    grid-template-rows: auto minmax(9rem, 1fr) auto;
    grid-template-areas:
      'head head head'
      'stage stage stage'
      'energy climate devices';
    gap: var(--space-6) var(--space-5);
    min-width: 0;
  }
  .main :global(.smart-energy) {
    grid-area: energy;
  }
  .main :global(.smart-climate) {
    grid-area: climate;
  }
  .main :global(.smart-devices) {
    grid-area: devices;
  }
  .main--empty {
    display: block;
    grid-column: 2 / -1;
    width: min(100%, 30rem);
    margin: var(--space-12) auto 0;
  }

  .head {
    grid-area: head;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4) var(--space-6);
  }
  h1 {
    font-size: clamp(2.25rem, 4vw, 3.4rem);
    font-weight: var(--fw-light);
    letter-spacing: -0.025em;
    line-height: 1.05;
    text-shadow: 0 1px 28px color-mix(in srgb, var(--bg) 55%, transparent);
  }
  .sub {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: fit-content;
    margin-top: var(--space-3);
    padding: 2px 6px;
    margin-left: -6px;
    border-radius: var(--radius-sm);
    color: var(--text-2);
    font-size: var(--fs-base);
  }

  /* The stage: where the photo shows through, with the hotspots pinned onto it. */
  .stage {
    grid-area: stage;
    position: relative;
    min-height: 9rem;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
    gap: var(--space-2);
  }
  .spot {
    display: contents;
  }
  .pinned .spot {
    display: block;
  }
  .spot__pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    height: 36px;
    padding: 0 var(--space-4) 0 var(--space-3);
    border: 0.5px solid var(--photo-glass-border);
    border-radius: var(--radius-pill);
    background: var(--photo-glass);
    backdrop-filter: blur(18px) saturate(115%);
    -webkit-backdrop-filter: blur(18px) saturate(115%);
    box-shadow:
      0 10px 24px -14px color-mix(in srgb, var(--bg) 90%, transparent),
      inset 0 1px 0 var(--photo-glass-light);
    color: var(--text);
    font: inherit;
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    white-space: nowrap;
    cursor: pointer;
    transition:
      background var(--motion-base) var(--ease-out),
      transform var(--motion-quick) var(--ease-out);
  }
  .spot__pill > span:last-child {
    padding: 2px 4px;
    margin: -2px -4px;
    border-radius: var(--radius-sm);
  }
  .spot__pill:hover {
    background: color-mix(in srgb, var(--text) 8%, var(--photo-glass));
  }
  .spot__pill:active {
    transform: scale(0.97);
  }
  .spot__pill:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .spot.on .spot__pill {
    background: var(--layer-selected-bg);
    border-color: var(--accent-border);
  }
  .spot__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-3);
    transition:
      background var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .spot.on .spot__dot {
    background: var(--glow);
    box-shadow: 0 0 8px var(--glow-soft);
  }
  /* Pinned: the pill floats above its place; a hairline stem ends in a ring on the spot. */
  .pinned .spot__pill {
    position: absolute;
    top: calc(var(--y) - 36px - 22px);
  }
  .spot__pin {
    position: absolute;
    left: var(--x);
    top: calc(var(--y) - 22px);
    width: 1px;
    height: 22px;
    background: linear-gradient(transparent, var(--photo-glass-light));
    pointer-events: none;
  }
  .spot__pin::after {
    content: '';
    position: absolute;
    left: -5px;
    bottom: -5px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1.5px solid var(--text);
    background: color-mix(in srgb, var(--bg) 40%, transparent);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--text) 14%, transparent);
  }
  .spot.on .spot__pin::after {
    border-color: var(--glow);
    background: var(--glow);
    box-shadow: 0 0 0 5px var(--glow-soft);
    animation: spot-breathe 3.2s var(--ease-gentle) infinite;
  }
  @keyframes spot-breathe {
    50% {
      box-shadow: 0 0 0 8px color-mix(in srgb, var(--glow) 18%, transparent);
    }
  }

  .eyebrow {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .panel-head {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .panel-head h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .panel-head .muted {
    width: fit-content;
    padding: 1px 4px;
    margin-left: -4px;
    border-radius: var(--radius-xs);
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  /* Energy: the ink tile. */
  .energy {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    height: 100%;
  }
  .energy__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
  }
  .delta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: var(--radius-pill);
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .figure {
    margin-top: var(--space-1);
    font-size: 3.4rem;
    font-weight: var(--fw-light);
    letter-spacing: -0.035em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .figure__unit {
    margin-left: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-2xl);
    letter-spacing: 0;
  }
  .bars {
    display: block;
    width: 100%;
    height: auto;
    margin-top: auto;
    padding-top: var(--space-3);
    overflow: visible;
  }
  .bar {
    fill: var(--text-3);
    opacity: 0.55;
  }
  .bar--later {
    fill: var(--text-3);
    opacity: 0.4;
  }
  /* The hour running now is the one that is on: it glows. */
  .bar--now {
    fill: var(--glow);
    opacity: 1;
    filter: drop-shadow(0 0 5px var(--glow-soft));
  }
  .axis {
    display: flex;
    justify-content: space-between;
    color: var(--text-3);
    font-size: var(--fs-2xs);
    font-variant-numeric: tabular-nums;
  }
  .now {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: var(--space-2);
    border-top: 1px solid var(--border);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .now .muted {
    width: fit-content;
    padding: 1px 4px;
    margin-left: -4px;
    border-radius: var(--radius-xs);
  }
  .now strong {
    padding: 1px 4px;
    border-radius: var(--radius-xs);
    color: var(--text);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }

  /* Climate */
  .climate {
    display: flex;
    justify-content: center;
    padding-inline: var(--space-2);
  }
  /* The arc's box keeps room above the arc for the glow; the heading above has its own air. */
  .climate :global(.gauge) {
    max-width: 16rem;
  }
  .modes-wrap {
    position: relative;
  }
  .modes {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .modes li {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }
  /* The pool of light under the chosen key; it flows from key to key. */
  .pool {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  .pool::before {
    content: '';
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    background: radial-gradient(closest-side, var(--glow-soft), transparent);
    filter: blur(3px);
  }
  .key-label {
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
  }

  /* Devices */
  .devices {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .device {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: var(--space-3);
    row-gap: var(--space-1);
    align-items: center;
  }
  .key {
    position: relative;
    display: inline-flex;
    grid-row: span 2;
    align-self: start;
    border-radius: 50%;
  }
  /* A device that is on lights the air around its key, in its own colour. */
  .key::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: radial-gradient(
      closest-side,
      color-mix(in srgb, var(--light) 42%, transparent),
      transparent
    );
    opacity: 0;
    transition: opacity var(--motion-slow) var(--ease-out);
    pointer-events: none;
  }
  .device.on .key::before {
    opacity: 1;
  }
  .device.on .key :global(.btn) {
    color: var(--light);
  }
  .device__text {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
  .device__name {
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
  }
  .device__state {
    margin-left: auto;
    padding: 1px 4px;
    margin-right: -4px;
    border-radius: var(--radius-xs);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .device__control {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2);
    min-width: 0;
  }
  .colours {
    display: flex;
  }
  .colour {
    position: relative;
    display: grid;
    place-items: center;
    width: 20px;
    height: 24px;
    cursor: pointer;
  }
  .colour input {
    position: absolute;
    inset: 0;
    opacity: 0;
    margin: 0;
    cursor: pointer;
  }
  .colour__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--c);
    box-shadow: inset 0 0 0 0.5px var(--border-strong);
    transition: box-shadow var(--motion-base) var(--ease-out);
  }
  .colour input:checked + .colour__dot {
    box-shadow:
      0 0 0 2px var(--bg),
      0 0 0 3.5px var(--c);
  }
  .device.on .colour input:checked + .colour__dot {
    box-shadow:
      0 0 0 2px var(--bg),
      0 0 0 3.5px var(--c),
      0 0 12px var(--c);
  }
  .colour input:focus-visible + .colour__dot {
    outline: var(--focus-ring);
    outline-offset: 4px;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* The place panel */
  :global(.layer.smart-place) {
    align-self: stretch;
    min-width: 0;
  }
  .place__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    animation: bb-rise var(--motion-slow) var(--ease-out);
  }
  .place__head {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .place__head h2 {
    font-size: var(--fs-3xl);
    font-weight: var(--fw-regular);
    letter-spacing: -0.01em;
  }
  .place__head .muted {
    width: fit-content;
    padding: 1px 4px;
    margin-left: -4px;
    border-radius: var(--radius-xs);
  }
  .chips {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .chip {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--fill-subtle);
    box-shadow: inset 0 0 0 0.5px var(--border);
  }
  .chip :global(.icon) {
    color: var(--text-3);
    margin-bottom: var(--space-1);
  }
  .chip__value {
    width: fit-content;
    padding: 0 3px;
    margin-left: -3px;
    border-radius: var(--radius-xs);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .chip__label {
    color: var(--text-2);
    font-size: var(--fs-xs);
  }
  .zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }
  .zone :global(.gauge) {
    max-width: 18rem;
  }
  .zone__note {
    text-align: center;
  }
  .log {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--fs-sm);
  }
  .log__time {
    display: inline-block;
    min-width: 3.2em;
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
  }
  .here {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .rows {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding-block: var(--space-2);
  }
  .row + .row {
    border-top: 1px solid var(--border);
  }
  .row__icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--fill-subtle);
    color: var(--text-3);
    transition:
      background var(--motion-base) var(--ease-out),
      color var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .row.on .row__icon {
    background: var(--accent-soft);
    color: var(--glow);
    box-shadow: 0 0 14px -2px var(--glow-soft);
  }
  .row__text {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  .row__name {
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
  }
  .row__state {
    width: fit-content;
    padding: 0 3px;
    margin-left: -3px;
    border-radius: var(--radius-xs);
    color: var(--text-2);
    font-size: var(--fs-xs);
  }

  /* Shorter screens: the greeting gives up a little height so the panels still fit. */
  @media (max-height: 860px) {
    .main {
      row-gap: var(--space-4);
    }
    .climate :global(.gauge) {
      max-width: 14rem;
    }
    h1 {
      font-size: clamp(2.25rem, 3.2vw, 2.7rem);
    }
    .figure {
      font-size: 3rem;
    }
    .place__body {
      gap: var(--space-4);
    }
    .sub {
      margin-top: var(--space-2);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .spot.on .spot__pin::after {
      animation: none;
    }
  }
  /* Narrower: the ink tile moves up beside the stage, over the empty sky left of the house,
     so climate and the devices get the width of the row below. */
  @media (min-width: 821px) and (max-width: 1360px) {
    .main {
      grid-template-columns: 14rem 5rem minmax(0, 1fr);
      grid-template-rows: auto auto auto;
      grid-template-areas:
        'head head head'
        'energy stage stage'
        'climate climate devices';
    }
  }
  @media (max-width: 1100px) {
    .shell {
      grid-template-columns: auto minmax(0, 1fr);
    }
    :global(.layer.smart-place) {
      grid-column: 2;
    }
  }
  @media (max-width: 900px) {
    .shell {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-4);
    }
    .rail {
      z-index: var(--z-front);
    }
    :global(.layer.smart-place),
    .main--empty {
      grid-column: 1;
    }
  }
  @media (max-width: 820px) {
    .main {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      grid-template-areas:
        'head head'
        'stage stage'
        'energy climate'
        'devices devices';
    }
  }
  @media (max-width: 560px) {
    .main {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: 'head' 'stage' 'energy' 'climate' 'devices';
    }
  }
</style>
