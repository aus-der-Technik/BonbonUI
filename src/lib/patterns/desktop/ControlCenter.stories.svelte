<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ControlCenter from './ControlCenter.svelte';
  import { controlToggles } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/ControlCenter',
    component: ControlCenter,
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  let toggles = $state(controlToggles.map((t) => ({ ...t })));
  let brightness = $state(80);
  let volume = $state(45);
  let playing = $state(true);
</script>

<!-- Toggle tiles, big sliders and a now-playing card. With `floating` it becomes a panel in the
     top right corner that pops from the status item you pressed and closes on Escape or an
     outside click.

     Why is only the "on" disc coloured? A toggle's colour is its state: candy means on, glass
     means off — you can read the whole panel at a glance without reading a single label.
     Why white slider fills? Brightness and volume are amounts, not choices; a neutral fill
     reads as "how much" in both themes and leaves the colour for what is switched on. -->
<Story name="ControlCenter" asChild>
  <ControlCenter
    {toggles}
    ontoggle={(id, on) => (toggles = toggles.map((t) => (t.id === id ? { ...t, on } : t)))}
    bind:brightness
    bind:volume
    nowPlaying={{ title: 'Sugar Rush', artist: 'The Gummy Bears', playing }}
    onplaypause={() => (playing = !playing)}
  />
</Story>
