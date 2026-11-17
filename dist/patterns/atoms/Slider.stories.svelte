<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Grid from '../layout/Grid.svelte';
  import Slider from './Slider.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Slider',
    component: Slider,
    tags: ['autodocs'],
    args: { label: 'Volume', value: 60, min: 0, max: 100, step: 1 },
  });
</script>

<script lang="ts">
  let temperature = $state(0.7);
  let topK = $state(40);
  let budget = $state(2500);
</script>

<!-- The knob is a white bead lit from above with a small accent core, so it reads as "grab me" on
any backdrop. Hover grows it a touch; while dragging it swells and picks up a soft tint glow. -->
<Story name="Playground" />

<!-- `format` shapes the readout; `hint` is a grey help line under the track. -->
<Story name="Formatted values" asChild>
  <Grid columns={3} min="12rem" gap="lg">
    <Slider
      label="Temperature"
      bind:value={temperature}
      min={0}
      max={2}
      step={0.05}
      format={(v) => v.toFixed(2)}
      hint="Higher is more creative, lower more focused."
    />
    <Slider label="Top-k" bind:value={topK} min={1} max={100} />
    <Slider
      label="Budget"
      bind:value={budget}
      min={0}
      max={10000}
      step={100}
      format={(v) => `${v.toLocaleString('de-DE')} €`}
    />
  </Grid>
</Story>

<Story name="Disabled" args={{ label: 'Brightness', value: 30, disabled: true }} />
