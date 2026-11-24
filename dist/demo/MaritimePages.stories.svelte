<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { storyTint } from './tint';
  import Application from '../patterns/templates/Application.svelte';
  import SeaTraffic from './SeaTraffic.svelte';
  import { ships } from './mock-sea';

  const shipIds = ['', ...ships.map((s) => s.id)];

  const { Story } = defineMeta({
    title: 'Pages/Maritime',
    component: SeaTraffic,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      weather: {
        type: { name: 'enum', value: ['fresh', 'gale'] },
        control: 'inline-radio',
        options: ['fresh', 'gale'],
        description: 'The forecast scenario.',
      },
      hour: {
        control: { type: 'range', min: 0, max: 24, step: 1 },
        description: 'Forecast hour to open at (0 = now).',
      },
      selected: {
        type: { name: 'enum', value: shipIds },
        control: 'select',
        options: shipIds,
        description: 'A vessel to open selected.',
      },
      paused: { control: 'boolean', description: 'Opens with the traffic paused.' },
    },
  });
</script>

<!--
Sea traffic and weather over an invented bay, drawn as one original SVG sea chart: coastline and
islands, depth contours from a sampled depth field, a traffic separation scheme to the harbour,
ferry routes, an anchorage and fishing grounds. The weather layers come from a mock 24-hour
forecast — wind streaks whose direction and length follow the wind grid, wave-height shading
with 1, 2 and 3 m isolines, a rain cell riding the front and morning fog — and the forecast
slider under the chart scrubs them. Fifteen ships move along their routes in one
requestAnimationFrame loop (paused for reduced motion, in a hidden tab and on unmount). Hover
or pick a ship on the chart or in the list: its card rides beside it and its row lights up.
The readout shows wind and waves at the pointer, the ship in focus or the middle of the bay.
-->
<Story name="Sea traffic" args={{ weather: 'fresh', hour: 0, selected: '', paused: false }}>
  {#snippet template(args, context)}
    <Application tint={storyTint(context, '#0f7c9c')}>
      {#key `${args.weather}-${args.hour}-${args.selected}-${args.paused}`}
        <SeaTraffic
          weather={args.weather ?? 'fresh'}
          hour={args.hour ?? 0}
          selected={args.selected || undefined}
          paused={args.paused ?? false}
        />
      {/key}
    </Application>
  {/snippet}
</Story>
