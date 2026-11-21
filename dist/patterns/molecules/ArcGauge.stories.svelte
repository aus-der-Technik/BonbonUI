<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../templates/Application.svelte';
  import Layer from '../layout/Layer.svelte';
  import ArcGauge from './ArcGauge.svelte';
  import backdrop from '../../demo/assets/smart-home-backdrop.jpg';

  const { Story } = defineMeta({
    title: 'Molecules/ArcGauge',
    component: ArcGauge,
    tags: ['autodocs'],
    args: { label: 'Target temperature', value: 22.5, min: 16, max: 28, step: 0.5, unit: '°C' },
    argTypes: { size: { control: 'inline-radio', options: ['md', 'lg'] } },
  });
</script>

<!-- Drag along the arc, use the arrow keys, or press minus and plus at its ends. The reached
part is lit: white ticks with a soft glow under them and a slow light running along. -->
<Story name="Playground" />

<!-- Over a photo, on a smoked-glass panel in the dark theme. -->
<Story name="On glass over a photo" asChild>
  <div style="height: 30rem; position: relative">
    <Application contained image={backdrop}>
      <div style="padding: 2rem; display: grid; place-items: center; height: 100%">
        <Layer level="panel" padding="lg" style="width: min(26rem, 100%)">
          <ArcGauge
            label="Zonal climate"
            value={22.5}
            min={16}
            max={28}
            step={0.5}
            unit="°C"
            size="lg"
          />
        </Layer>
      </div>
    </Application>
  </div>
</Story>
