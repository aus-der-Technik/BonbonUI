<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MapView, { type MapMarker } from './MapView.svelte';
  import Card from '../atoms/Card.svelte';
  import Legend from '../molecules/Legend.svelte';
  import Stack from '../layout/Stack.svelte';
  import { frankfurtHits } from '../../demo/mock';

  // Loads basemap.de tiles (CC BY 4.0) — needs network access.
  const { Story } = defineMeta({
    title: 'Organisms/MapView',
    component: MapView,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });

  // Leaflet paints with literal colours: candy hex values, not CSS variables.
  const offices: MapMarker[] = [
    {
      lat: 52.52,
      lon: 13.405,
      title: 'Berlin office',
      subtitle: 'Headquarters',
      color: '#007aff',
      details: [
        ['People', '48'],
        ['Open', 'Mon–Fri 8–18'],
      ],
    },
    {
      lat: 53.5511,
      lon: 9.9937,
      title: 'Hamburg studio',
      subtitle: 'Design team',
      color: '#af52de',
      details: [['People', '12']],
    },
    {
      lat: 48.1351,
      lon: 11.582,
      title: 'Munich warehouse',
      subtitle: 'Shipping',
      color: '#ff9500',
      details: [['Parcels today', '1,204']],
    },
  ];
</script>

<!-- Circle markers in their category colour, a hover label and a frosted popup of details;
     the map fits itself to the markers. -->
<Story name="Search hits" asChild>
  <Stack style="height:32rem">
    <MapView markers={frankfurtHits()} label="Search hits around Frankfurt" />
  </Stack>
</Story>

<!-- On a card with a legend: give the parent a height, the map fills it. -->
<Story name="On a card" asChild>
  <Card title="Locations" padding="sm">
    <Stack gap="sm" style="height:28rem">
      <Legend
        items={[
          { label: 'Office', color: '#007aff' },
          { label: 'Studio', color: '#af52de' },
          { label: 'Warehouse', color: '#ff9500' },
        ]}
      />
      <Stack grow><MapView markers={offices} label="Our locations" /></Stack>
    </Stack>
  </Card>
</Story>

<!-- Nothing to show: the map rests on its `home` bounds. -->
<Story name="Empty" asChild>
  <Stack style="height:32rem">
    <MapView markers={[]} />
  </Stack>
</Story>
