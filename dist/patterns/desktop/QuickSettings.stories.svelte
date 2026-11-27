<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import QuickSettings from './QuickSettings.svelte';
  import Button from '../atoms/Button.svelte';
  import { controlToggles } from '../../demo/mock-desktop';

  const { Story } = defineMeta({
    title: 'Organisms/Desktop & OS/QuickSettings',
    component: QuickSettings,
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  let toggles = $state(controlToggles.map((t) => ({ ...t })));
  let brightness = $state(80);
  let volume = $state(45);
  let playing = $state(true);
  let open = $state(false);
  let trigger = $state<HTMLElement>();
</script>

<!-- Toggle tiles, big sliders and a now-playing card. With `floating` it becomes a panel that
     pops out of its `anchor` (the status item you pressed), takes focus, and closes on Escape
     (focus goes back to the anchor) or an outside click.

     Why is only the "on" disc coloured? A toggle's colour is its state: candy means on, glass
     means off — you can read the whole panel at a glance without reading a single label.
     Why white slider fills? Brightness and volume are amounts, not choices; a neutral fill
     reads as "how much" in both themes and leaves the colour for what is switched on. -->
<Story name="QuickSettings" asChild>
  <QuickSettings
    {toggles}
    ontoggle={(id, on) => (toggles = toggles.map((t) => (t.id === id ? { ...t, on } : t)))}
    bind:brightness
    bind:volume
    nowPlaying={{ title: 'Sugar Rush', artist: 'The Gummy Bears', playing }}
    onplaypause={() => (playing = !playing)}
  />
</Story>

<Story name="Floating from its anchor" asChild>
  <div style="display:flex;justify-content:flex-end;padding:1rem;min-height:32rem">
    <span bind:this={trigger} style="display:inline-block">
      <Button
        icon="settings"
        label="Quick settings"
        aria-expanded={open}
        onclick={() => (open = !open)}
      />
    </span>
    <QuickSettings
      floating
      bind:open
      anchor={trigger}
      {toggles}
      ontoggle={(id, on) => (toggles = toggles.map((t) => (t.id === id ? { ...t, on } : t)))}
      bind:brightness
      bind:volume
    />
  </div>
</Story>
