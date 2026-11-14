<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import ClimateControl from './ClimateControl.svelte';
  import SmartHome from './SmartHome.svelte';
  import backdrop from './assets/smart-home-backdrop.jpg';

  const { Story } = defineMeta({
    title: 'Pages/Devices',
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      zone: {
        type: { name: 'enum', value: ['seedlings', 'herbs', 'tomatoes', 'orchids'] },
        control: 'inline-radio',
        options: ['seedlings', 'herbs', 'tomatoes', 'orchids'],
        description: 'The zone to open.',
      },
      misting: { control: 'boolean', description: 'Opens with a misting cycle running.' },
      place: {
        type: { name: 'enum', value: ['hall', 'solar', 'door'] },
        control: 'inline-radio',
        options: ['hall', 'solar', 'door'],
        description: 'Smart home: the place open in the side panel.',
      },
      away: {
        control: 'boolean',
        description: 'Smart home: opens with everyone away (lights off, door locked, Eco).',
      },
      image: {
        control: 'text',
        description:
          'Smart home: the backdrop photo (a URL). The hotspots are pinned to the bundled photo; for another one they line up in a row.',
      },
    },
  });
</script>

<!--
The control screen of a greenhouse, with almost everything on the ground: five readings in
dot-matrix digits (DotMatrix), a row of soft-touch zone keys, a thermostat whose minus and plus
flank the target and whose dotted arc fills as you press, and round soft-touch device keys that
stay tinted while on. One panel holds the misting plan; its "Mist now" shimmers, counts down in
place and then lifts the humidity reading, which glows. Navigation is a NavRail of round buttons
on glass at the left; it lies down into a bar below 900px. The air drifts towards the target
while heating or the vents are on.
-->
<Story name="Climate control" args={{ zone: 'seedlings', misting: false }}>
  {#snippet template(args)}
    <Application>
      {#key `${args.zone}-${args.misting}`}
        <ClimateControl zone={args.zone ?? 'seedlings'} misting={args.misting ?? false} />
      {/key}
    </Application>
  {/snippet}
</Story>

<!--
A smart-home dashboard over a photograph of the house, in the dark theme with a soft green tint.
A greeting in large light type sits on the ground; hotspot pills float over the photo, pinned to
the roof, the door and the hall window, and open that place in the side panel. Along the bottom:
a near-black energy tile, climate with an ArcGauge and four mode keys (a pool of light flows to
the chosen one), and the hall's lamp, light strip and speaker with level bars. Over a photo the
panels are smoked glass; only what is on gives light. "Leaving home" turns the lights off one
after another and locks the door.
-->
<Story name="Smart home" args={{ place: 'hall', away: false, image: backdrop }}>
  {#snippet template(args)}
    <Application image={args.image || backdrop}>
      {#key `${args.place}-${args.away}`}
        <SmartHome
          place={args.place ?? 'hall'}
          away={args.away ?? false}
          anchored={!args.image || args.image === backdrop}
        />
      {/key}
    </Application>
  {/snippet}
</Story>
