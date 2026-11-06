<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import ClimateControl from './ClimateControl.svelte';

  const { Story } = defineMeta({
    title: 'Pages/Devices',
    component: ClimateControl,
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
