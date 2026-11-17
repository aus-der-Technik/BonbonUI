<script lang="ts">
  /**
   * Local only (not in git): square scenes of single elements and element groups, staged for
   * social images. `scripts` in Marketing/ capture them at 1024×1024.
   */
  import Application from '../../patterns/templates/Application.svelte';
  import Layer from '../../patterns/layout/Layer.svelte';
  import Grid from '../../patterns/layout/Grid.svelte';
  import Button from '../../patterns/atoms/Button.svelte';
  import Card from '../../patterns/atoms/Card.svelte';
  import DotMatrix from '../../patterns/atoms/DotMatrix.svelte';
  import Switch from '../../patterns/atoms/Switch.svelte';
  import ArcGauge from '../../patterns/molecules/ArcGauge.svelte';
  import KpiTile from '../../patterns/molecules/KpiTile.svelte';
  import SegmentedControl from '../../patterns/molecules/SegmentedControl.svelte';
  import ChartCard from '../../patterns/organisms/ChartCard.svelte';
  import LineChart from '../../patterns/organisms/LineChart.svelte';
  import NavRail from '../../patterns/organisms/NavRail.svelte';
  import backdrop from '../../demo/assets/smart-home-backdrop.jpg';

  export type Scene =
    | 'buttons'
    | 'soft-keys'
    | 'rail'
    | 'gauge'
    | 'gauge-photo'
    | 'dot-matrix'
    | 'switches'
    | 'segmented'
    | 'kpis'
    | 'chart'
    | 'player'
    | 'glass-bar';

  interface Props {
    scene: Scene;
  }
  let { scene }: Props = $props();

  const looks: Record<
    Scene,
    { tint: string; theme: 'light' | 'dark'; caption: string; photo?: boolean }
  > = {
    buttons: { tint: '#5a9854', theme: 'light', caption: 'Buttons' },
    'soft-keys': { tint: '#c2417a', theme: 'light', caption: 'Soft-touch keys' },
    rail: { tint: '#5a9854', theme: 'light', caption: 'Navigation rail' },
    gauge: { tint: '#0f7c9c', theme: 'light', caption: 'Arc gauge' },
    'gauge-photo': { tint: '#5a9854', theme: 'dark', caption: 'Glass over a photo', photo: true },
    'dot-matrix': { tint: '#ff9500', theme: 'dark', caption: 'Dot-matrix figures' },
    switches: { tint: '#00a89d', theme: 'light', caption: 'Switches' },
    segmented: { tint: '#5856d6', theme: 'light', caption: 'Liquid selection' },
    kpis: { tint: '#007aff', theme: 'light', caption: 'Figures on the ground' },
    chart: { tint: '#5a9854', theme: 'light', caption: 'Charts' },
    player: { tint: '#c2417a', theme: 'dark', caption: 'Playback' },
    'glass-bar': { tint: '#9c7a4e', theme: 'light', caption: 'Glass that floats', photo: true },
  };
  const look = $derived(looks[scene]);

  let range = $state('week');
  let target = $state(22.5);
  let lights = $state(true);
  let heat = $state(false);
  let away = $state(true);
  let rail = $state('home');
  let shuffle = $state(true);

  const railItems = [
    { id: 'home', label: 'Overview', icon: 'home' as const },
    { id: 'calendar', label: 'Schedule', icon: 'calendar' as const },
    { id: 'activity', label: 'Sensors', icon: 'activity' as const },
    { id: 'settings', label: 'Settings', icon: 'settings' as const },
  ];
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => ({
    label,
    value: [42, 51, 47, 63, 58, 71, 76][i] ?? 0,
  }));
</script>

<Application
  tint={look.tint}
  theme={look.theme}
  image={look.photo ? backdrop : undefined}
  density="comfortable"
>
  <div class="square" class:square--photo={look.photo}>
    <div class="scene scene--{scene}">
      {#if scene === 'buttons'}
        <div class="column">
          <Button variant="primary" size="xl" icon="play" label="Start the day" shimmer />
          <div class="row">
            <Button variant="soft" size="lg" icon="edit" label="Draft" />
            <Button variant="tinted" size="lg" icon="user-plus" label="Invite" />
          </div>
        </div>
      {:else if scene === 'soft-keys'}
        <div class="keys">
          {#each [['wind', true], ['sun', false], ['droplet', true], ['moon', false], ['thermometer', false], ['bolt', true]] as [icon, on] (icon)}
            <Button
              variant="soft"
              size="xl"
              icon={icon as 'sun'}
              label={String(icon)}
              iconOnly
              aria-pressed={on as boolean}
            />
          {/each}
        </div>
      {:else if scene === 'rail'}
        <div class="rail-stage">
          <NavRail items={railItems} bind:current={rail} label="Rail" />
        </div>
      {:else if scene === 'gauge'}
        <div class="wide">
          <ArcGauge
            label="Living room"
            current={21.8}
            bind:value={target}
            min={16}
            max={28}
            step={0.5}
            unit="°C"
            size="lg"
          />
        </div>
      {:else if scene === 'gauge-photo'}
        <Layer level="panel" padding="lg" class="photo-card">
          <ArcGauge
            label="Main hall"
            current={21.2}
            bind:value={target}
            min={16}
            max={28}
            step={0.5}
            unit="°C"
            size="lg"
          />
        </Layer>
      {:else if scene === 'dot-matrix'}
        <Card surface="ink" padding="lg" class="ink">
          <span class="ink-label">Tonight</span>
          <span class="ink-figure"><DotMatrix value="21:30" label="21:30" size="xl" /></span>
          <span class="ink-label">Lights dim at half past nine</span>
        </Card>
      {:else if scene === 'switches'}
        <Layer level="panel" padding="lg" gap="lg" class="switch-card">
          <Switch
            label="Lights in the hall"
            description="Three lamps, 70 %"
            bind:checked={lights}
          />
          <Switch label="Floor heating" description="Off until 6 am" bind:checked={heat} />
          <Switch
            label="Away mode"
            description="Locks the door, saves energy"
            bind:checked={away}
          />
        </Layer>
      {:else if scene === 'segmented'}
        <div class="column">
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
            label="Range"
            variant="accent"
            bind:value={range}
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'year', label: 'Year' },
            ]}
          />
        </div>
      {:else if scene === 'kpis'}
        <div class="wide">
          <Grid min="12rem" gap="xl">
            <KpiTile label="Orders" value="1,284" delta="+12 %" detail="vs last week" />
            <KpiTile label="Revenue" value="€38.5k" delta="+8 %" detail="this month" />
            <KpiTile
              label="Returns"
              value="2.1 %"
              delta={-0.4}
              goodWhen="down"
              deltaLabel="vs last month"
            />
            <KpiTile label="Rating" value="4.8" detail="from 312 reviews" />
          </Grid>
        </div>
      {:else if scene === 'chart'}
        <div class="wide">
          <ChartCard title="Visits this week" sub="Every day a little more" value="408">
            <LineChart
              data={week}
              min={30}
              max={80}
              ticks={[40, 60, 80]}
              height={260}
              area
              color="var(--accent)"
              valueLabel="Visits"
            />
          </ChartCard>
        </div>
      {:else if scene === 'player'}
        <div class="column">
          <span class="time"><DotMatrix value="01:19" label="1 minute 19" size="xl" /></span>
          <div class="row">
            <Button
              variant="soft"
              size="lg"
              icon="shuffle"
              label="Shuffle"
              iconOnly
              aria-pressed={shuffle}
              onclick={() => (shuffle = !shuffle)}
            />
            <Button variant="soft" size="xl" icon="skip-back" label="Previous" iconOnly />
            <Button variant="primary" size="xl" icon="pause" label="Pause" iconOnly />
            <Button variant="soft" size="xl" icon="skip-forward" label="Next" iconOnly />
            <Button variant="soft" size="lg" icon="repeat" label="Repeat" iconOnly />
          </div>
        </div>
      {:else if scene === 'glass-bar'}
        <Layer level="front" direction="horizontal" gap="sm" class="bar">
          <Button variant="ghost" icon="home" label="Home" />
          <Button variant="ghost" icon="calendar" label="Viewings" />
          <Button variant="glass" icon="sparkles" label="Arrange a visit" />
        </Layer>
      {/if}
    </div>
    <footer class="mark">
      <span class="word">BonbonUI</span>
      <span class="caption">{look.caption}</span>
    </footer>
  </div>
</Application>

<style>
  .square {
    position: relative;
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh;
    overflow: clip;
  }
  /* Each scene fills its square: an element alone is shown large, a group a little less. */
  .scene {
    display: grid;
    place-items: center;
    transform: scale(var(--zoom, 1.9));
  }
  .scene--rail {
    --zoom: 1.25;
  }
  .scene--kpis,
  .scene--chart {
    --zoom: 1.45;
  }
  .scene--gauge {
    --zoom: 1.5;
  }
  .scene--gauge-photo,
  .scene--switches,
  .scene--dot-matrix {
    --zoom: 1.65;
  }
  .scene--player {
    --zoom: 1.75;
  }
  .column {
    display: grid;
    justify-items: center;
    gap: var(--space-6);
  }
  .row {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
  .keys {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: var(--space-6);
  }
  .rail-stage {
    --app-height: 34rem;
    display: flex;
  }
  .scene :global(.gauge .caption) {
    text-align: center;
  }
  .wide {
    display: grid;
    justify-items: center;
    width: 36rem;
  }
  /* KPI rows and charts take the whole width (centred, they would shrink to one column). */
  .scene--kpis .wide,
  .scene--chart .wide {
    justify-items: stretch;
  }
  .scene :global(.photo-card) {
    width: 24rem;
  }
  .scene :global(.switch-card) {
    width: 24rem;
  }
  .scene :global(.ink) {
    display: grid;
    gap: var(--space-3);
    min-width: 20rem;
  }
  .ink-label {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .ink-figure {
    color: var(--accent);
  }
  .time {
    color: var(--accent-ink);
  }
  /* Over a photo the corner text gets a soft shadow so it reads on any picture. */
  .square--photo .mark {
    text-shadow: 0 1px 12px rgba(255, 255, 255, 0.85);
  }
  .square--photo .caption {
    color: var(--text);
  }
  .mark {
    position: absolute;
    left: 44px;
    right: 44px;
    bottom: 36px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .word {
    font-size: 1.35rem;
    font-weight: var(--fw-heavy);
    letter-spacing: -0.01em;
    color: var(--text);
  }
  .caption {
    font-size: 0.8rem;
    font-weight: var(--fw-semibold);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent-ink);
  }
</style>
