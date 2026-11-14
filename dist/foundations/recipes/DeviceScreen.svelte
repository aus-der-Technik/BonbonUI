<script lang="ts">
  import {
    Page,
    Grid,
    NavRail,
    Card,
    DotMatrix,
    ArcGauge,
    Switch,
    Avatar,
    type NavRailItem,
  } from '../../index';
  import photo from '../../demo/assets/smart-home-backdrop.jpg';

  const sections: NavRailItem[] = [
    { id: 'home', label: 'Overview', icon: 'home' },
    { id: 'climate', label: 'Climate', icon: 'thermometer' },
    { id: 'energy', label: 'Energy', icon: 'bolt' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  const kwh = 7.4;
  let section = $state('home');
  let target = $state(21.5);
  let heating = $state(true);
  let lights = $state(false);
</script>

<!-- Over a photo, panels turn to frosted glass by themselves. -->
<Page width="full" image={photo}>
  <div class="shell">
    <!-- NavRail in its own sticky column, so its tooltips are not clipped -->
    <div class="rail">
      <NavRail items={sections} bind:current={section} label="Home">
        {#snippet bottom()}<Avatar name="Robin Example" size={40} />{/snippet}
      </NavRail>
    </div>

    <Grid min="16rem">
      <Card surface="ink" padding="lg" gap="sm">
        <span>Energy today</span>
        <DotMatrix value={kwh.toFixed(1)} label="{kwh} kilowatt hours" size="xl" />
      </Card>
      <Card padding="lg">
        <ArcGauge label="Living room" bind:value={target} min={16} max={28} step={0.5} unit="°C" />
      </Card>
      <Card padding="lg" gap="md">
        <Switch label="Heating" bind:checked={heating} />
        <Switch label="Lights" bind:checked={lights} />
      </Card>
    </Grid>
  </div>
</Page>

<style>
  .shell {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: var(--space-6);
  }
  .rail {
    position: sticky;
    top: var(--space-6);
    align-self: start;
  }
  @media (max-width: 900px) {
    .shell {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
