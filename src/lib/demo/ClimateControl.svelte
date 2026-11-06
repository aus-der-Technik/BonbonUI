<script lang="ts">
  /**
   * Example page: the control screen of a greenhouse. Almost everything sits on the ground —
   * the readings, the zone switch, the thermostat and its soft-touch keys; one panel holds the
   * misting plan, and its "Mist now" shimmers because that is the action the panel waits for.
   * Navigation is a NavRail of round buttons on glass at the left. Numbers that are read from
   * across the room are dot-matrix readouts (DotMatrix). Storybook only.
   */
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import StatusDot from '../patterns/atoms/StatusDot.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import LineChart from '../patterns/organisms/LineChart.svelte';
  import NavRail from '../patterns/organisms/NavRail.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import { devices, railItems, zones as allZones, type DeviceId, type Zone } from './mock-climate';

  interface Props {
    /** The zone to open. */
    zone?: string;
    /** Opens with a misting cycle already running. */
    misting?: boolean;
  }

  let { zone: startZone = 'seedlings', misting = false }: Props = $props();

  const MIN = 12;
  const MAX = 32;
  const CYCLE = 20;

  let zones = $state<Zone[]>(allZones.map((z) => structuredClone(z)));
  // svelte-ignore state_referenced_locally
  let zoneId = $state(startZone);
  let section = $state('overview');
  // svelte-ignore state_referenced_locally
  let left = $state(misting ? CYCLE - 6 : 0);

  const zone = $derived(zones.find((z) => z.id === zoneId) ?? zones[0]!);
  const running = $derived(left > 0);

  const one = (n: number) => n.toFixed(1);
  const clock = (s: number) => `00:${String(s).padStart(2, '0')}`;
  const now = () =>
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });

  /** The thermostat's dotted arc: 240° from lower left over the top to lower right. */
  const DOTS = 41;
  const arc = Array.from({ length: DOTS }, (_, i) => {
    const t = i / (DOTS - 1);
    const a = ((150 + 240 * t) * Math.PI) / 180;
    return { t, x: 100 + 84 * Math.cos(a), y: 100 + 84 * Math.sin(a) };
  });
  const fraction = (v: number) => Math.min(1, Math.max(0, (v - MIN) / (MAX - MIN)));
  const airDot = $derived(
    arc.reduce((best, d) =>
      Math.abs(d.t - fraction(zone.air)) < Math.abs(best.t - fraction(zone.air)) ? d : best,
    ),
  );

  function setTarget(delta: number) {
    zone.target = Math.min(MAX, Math.max(MIN, Math.round((zone.target + delta) * 2) / 2));
  }

  function toggle(id: DeviceId) {
    zone.devices[id] = !zone.devices[id];
  }

  function mist() {
    if (running) return;
    left = CYCLE;
  }

  // The cycle counts down where it was started; when it ends the humidity reading rises (and
  // glows), so the press and its effect are seen together.
  $effect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      left -= 1;
      if (left > 0) return;
      zone.humidity = Math.min(95, zone.humidity + 5);
      zone.lastMist = now();
    }, 1000);
    return () => clearInterval(timer);
  });

  // The air follows the target: heating warms it, the vents cool it, a tenth of a degree a step.
  $effect(() => {
    const timer = setInterval(() => {
      for (const z of zones) {
        const gap = z.target - z.air;
        if (gap > 0.05 && z.devices.heat) z.air = Math.round((z.air + 0.1) * 10) / 10;
        else if (gap < -0.05 && z.devices.vents) z.air = Math.round((z.air - 0.1) * 10) / 10;
      }
    }, 2500);
    return () => clearInterval(timer);
  });

  const readings = $derived([
    { id: 'air', label: 'Air', icon: 'thermometer' as const, value: one(zone.air), unit: '°C' },
    {
      id: 'humidity',
      label: 'Humidity',
      icon: 'droplet' as const,
      value: `${zone.humidity}`,
      unit: '%',
    },
    { id: 'soil', label: 'Soil moisture', icon: 'leaf' as const, value: `${zone.soil}`, unit: '%' },
    { id: 'light', label: 'Light', icon: 'sun' as const, value: one(zone.light), unit: 'klx' },
    {
      id: 'sensors',
      label: 'Sensors online',
      icon: 'activity' as const,
      value: `${zone.sensors.online}/${zone.sensors.total}`,
      unit: '',
    },
  ]);

  const notes: DesignNote[] = [
    {
      principle: 'cues',
      title: 'The current place shines through the glass',
      body: 'The selected rail item is an emitter: its tint glows inside the glass rail around it and follows it to the next place. Pressing an item swells the rail out right there, like a band of water.',
      target: '[data-note="rail"]',
    },
    {
      principle: 'function',
      title: 'The readings sit on the ground, not in cards',
      body: 'Five figures are what this screen is for. On the ground and in dot-matrix digits of one fixed width, they read from across the room and never jump while they tick.',
      target: '[data-note="readings"]',
    },
    {
      principle: 'locality',
      title: 'Minus and plus flank the value they change',
      body: 'The target temperature is set right where it is shown; the dotted arc fills as you press, and the dark dot marks where the air is now.',
      target: '[data-note="thermostat"]',
    },
    {
      principle: 'friendly',
      title: 'Soft-touch keys, round and labelled',
      body: 'Each device is a matte key that sinks when held and stays tinted while on. The word under it says what it switches, no tooltip hunting.',
      target: '[data-note="devices"]',
    },
    {
      principle: 'cues',
      title: '“Mist now” shimmers, then its effect shows up',
      body: 'The one action the panel waits for carries a slow ring of light. Pressed, it counts down in place; when it ends, the humidity reading rises and glows.',
      target: '[data-note="mist"]',
    },
    {
      principle: 'function',
      title: 'One glass element: the rail',
      body: 'Only the navigation floats, so only it is glass. It is sticky and lies down into a bar on narrow screens.',
      target: '[data-note="rail"]',
    },
  ];
</script>

<Page width="full" gap="lg">
  <div class="shell">
    <div class="rail" data-note="rail">
      <NavRail items={railItems} bind:current={section} label="Greenhouse">
        {#snippet top()}
          <span class="logo" aria-hidden="true"><Icon name="leaf" size={20} /></span>
        {/snippet}
        {#snippet bottom()}
          <Avatar name="Robin Example" size={40} />
        {/snippet}
      </NavRail>
    </div>

    <div class="main">
      <header class="head">
        <div>
          <h1>Greenhouse</h1>
          <p class="sub">
            <StatusDot tone={zone.sensors.online === zone.sensors.total ? 'ok' : 'warn'} />
            {zone.name} · {zone.sensors.online === zone.sensors.total
              ? 'all sensors reporting'
              : `${zone.sensors.total - zone.sensors.online} sensor not reporting`}
          </p>
        </div>
        <div class="zones" role="group" aria-label="Zone">
          {#each zones as z (z.id)}
            <Button
              variant="soft"
              size="md"
              label={z.name}
              aria-pressed={z.id === zoneId}
              onclick={() => (zoneId = z.id)}
            />
          {/each}
        </div>
      </header>

      {#if section === 'overview'}
        <ul class="readings" data-note="readings" aria-label="Readings in {zone.name}">
          {#each readings as r (r.id)}
            <li class="reading">
              <span class="reading__label">{r.label}</span>
              <span class="reading__value" use:changeCue={r.value}>
                <Icon name={r.icon} size={20} />
                <DotMatrix value={r.value} size="md" />
                {#if r.unit}<span class="unit">{r.unit}</span>{/if}
              </span>
            </li>
          {/each}
        </ul>

        <div class="work">
          <section class="control" aria-labelledby="thermo-title">
            <h2 id="thermo-title" class="eyebrow">Target temperature</h2>
            <div class="thermostat" data-note="thermostat">
              <Button
                variant="soft"
                size="xl"
                icon="minus"
                label="Cooler by half a degree"
                iconOnly
                disabled={zone.target <= MIN}
                onclick={() => setTarget(-0.5)}
              />
              <div class="dial">
                <svg viewBox="0 0 200 170" aria-hidden="true">
                  {#each arc as d (d.t)}
                    <circle
                      cx={d.x}
                      cy={d.y}
                      r="2.6"
                      class:lit={d.t <= fraction(zone.target) + 0.0001}
                    />
                  {/each}
                  <circle class="air" cx={airDot.x} cy={airDot.y} r="5" />
                </svg>
                <div class="dial__read">
                  <span class="dial__value" use:changeCue={zone.target}>
                    <DotMatrix
                      value={one(zone.target)}
                      label="{one(zone.target)} degrees"
                      size="xl"
                    /><span class="unit unit--big">°C</span>
                  </span>
                  <span class="dial__now">
                    Air now <DotMatrix
                      value="{one(zone.air)}°"
                      label="{one(zone.air)} degrees"
                      size="inherit"
                    />
                  </span>
                </div>
              </div>
              <Button
                variant="soft"
                size="xl"
                icon="plus"
                label="Warmer by half a degree"
                iconOnly
                disabled={zone.target >= MAX}
                onclick={() => setTarget(0.5)}
              />
            </div>

            <ul class="devices" data-note="devices" aria-label="Devices">
              {#each devices as d (d.id)}
                <li>
                  <Button
                    variant="soft"
                    size="xl"
                    icon={d.icon}
                    label={d.label}
                    iconOnly
                    aria-pressed={zone.devices[d.id]}
                    onclick={() => toggle(d.id)}
                  />
                  <span class="device__label" aria-hidden="true">{d.label}</span>
                </li>
              {/each}
            </ul>
          </section>

          <Layer level="panel" padding="lg" gap="md" as="section" aria-labelledby="mist-title">
            <div class="panel-head">
              <h2 id="mist-title">Misting</h2>
              <span class="muted">Keeps the air near 70 %</span>
            </div>
            <LineChart
              data={zone.day}
              min={40}
              max={90}
              ticks={[50, 70, 90]}
              height={150}
              area
              color="var(--accent)"
              valueLabel="Humidity"
              valueFormat={(v) => `${v} %`}
              label="Humidity today in {zone.name}"
            />
            <dl class="facts">
              <div>
                <dt>Every</dt>
                <dd><DotMatrix value="45" size="sm" /> <span class="unit">min</span></dd>
              </div>
              <div>
                <dt>Cycle</dt>
                <dd><DotMatrix value={CYCLE} size="sm" /> <span class="unit">s</span></dd>
              </div>
              <div>
                <dt>Last</dt>
                <dd use:changeCue={zone.lastMist}><DotMatrix value={zone.lastMist} size="sm" /></dd>
              </div>
            </dl>
            <div class="mist" data-note="mist">
              {#if running}
                <span class="countdown" role="timer" aria-live="off">
                  <DotMatrix value={clock(left)} label="{left} seconds left" size="md" />
                </span>
              {/if}
              <Button
                variant="primary"
                size="lg"
                icon="droplet"
                label="Mist now"
                busy={running}
                busyLabel="Misting…"
                shimmer
                block
                onclick={mist}
              />
            </div>
          </Layer>
        </div>
      {:else}
        <EmptyState
          icon={railItems.find((i) => i.id === section)?.icon ?? 'home'}
          title="{railItems.find((i) => i.id === section)?.label} is not part of this example"
          message="The overview shows everything this page demonstrates."
          actionLabel="Back to overview"
          onaction={() => (section = 'overview')}
        />
      {/if}
    </div>
  </div>
</Page>

<DesignNotes title="Climate control" {notes} corner="bottom-right" />

<style>
  .shell {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
  }
  .rail {
    position: sticky;
    top: var(--sticky-gap);
    display: flex;
  }
  .rail :global(.layer) {
    min-height: min(40rem, calc(var(--app-height, 100dvh) - 2 * var(--sticky-gap)));
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
  .main {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    min-width: 0;
    padding-block: var(--space-2) var(--space-12);
  }

  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: var(--space-4) var(--space-6);
  }
  h1 {
    font-size: var(--fs-display);
    font-weight: var(--fw-medium);
    line-height: var(--leading-tight);
  }
  .sub {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-1);
    color: var(--text-2);
    font-size: var(--fs-md);
  }
  .zones {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  /* Readings: on the ground, separated by air and a hairline, not by cards. */
  .readings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: var(--space-6);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .reading {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding-left: var(--space-4);
    border-left: 1px solid var(--border-strong);
  }
  .reading__label {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .reading__value {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-2);
    width: fit-content;
    padding: 2px 6px;
    margin: -2px -6px;
    border-radius: var(--radius-sm);
  }
  .reading__value :global(.icon) {
    align-self: center;
    color: var(--text-3);
  }
  .unit {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .unit--big {
    font-size: var(--fs-xl);
    margin-left: var(--space-1);
  }

  .work {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 24rem);
    gap: var(--space-8);
    align-items: start;
  }
  .control {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-6);
  }
  .eyebrow {
    align-self: flex-start;
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .thermostat {
    display: flex;
    align-items: center;
    gap: var(--space-6);
  }
  .dial {
    position: relative;
    width: min(22rem, 60vw);
  }
  .dial svg {
    display: block;
    width: 100%;
    height: auto;
  }
  .dial circle {
    fill: var(--fill-off);
    transition: fill var(--motion-base) var(--ease-out);
  }
  .dial circle.lit {
    fill: var(--accent);
  }
  .dial circle.air {
    fill: var(--text);
    stroke: var(--bg);
    stroke-width: 2.5;
    transition:
      cx var(--motion-slow) var(--ease-in-out),
      cy var(--motion-slow) var(--ease-in-out);
  }
  /* Centred on the arc's centre (y 100 of 170), not on the box. */
  .dial__read {
    position: absolute;
    inset: calc(100% * 100 / 170) 0 auto;
    transform: translateY(-62%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
  }
  .dial__value {
    display: inline-flex;
    align-items: baseline;
    padding: 4px 8px;
    border-radius: var(--radius-md);
  }
  .dial__now {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-md);
  }

  .devices {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-5);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .devices li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }
  .device__label {
    color: var(--text-2);
    font-size: var(--fs-xs);
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
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .facts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
    margin: 0;
  }
  .facts dt {
    color: var(--text-2);
    font-size: var(--fs-xs);
  }
  .facts dd {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-1);
    margin: var(--space-1) 0 0;
    padding: 2px 4px;
    margin-left: -4px;
    border-radius: var(--radius-sm);
  }
  .mist {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }
  .countdown {
    color: var(--accent-ink);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }

  @media (max-width: 1100px) {
    .work {
      grid-template-columns: minmax(0, 1fr);
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
    .rail :global(.layer) {
      min-height: 0;
    }
  }
  @media (max-width: 520px) {
    .thermostat {
      gap: var(--space-2);
    }
  }
</style>
