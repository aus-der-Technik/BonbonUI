<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { storyTint } from './tint';
  import Application from '../patterns/templates/Application.svelte';
  import GameHub from './GameHub.svelte';
  import { games } from './mock-gaming';

  const gameIds = games.map((g) => g.id);

  const { Story } = defineMeta({
    title: 'Pages/Gaming',
    component: GameHub,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      game: {
        type: { name: 'enum', value: gameIds },
        control: 'select',
        options: gameIds,
        description: 'The game that is selected.',
      },
      party: {
        type: { name: 'enum', value: ['solo', 'duo', 'full'] },
        control: 'inline-radio',
        options: ['solo', 'duo', 'full'],
        description: 'Who is in the party at the start.',
      },
      inMatch: { control: 'boolean', description: 'Opens in a running match.' },
    },
  });
</script>

<!--
A player's hub for an invented universe, the Lanternfall Isles. The chosen game stands on the
ground — SVG key art from palette tokens, a line about it, three facts and one primary Play (or
Install, which fills a progress bar in place and in its library tile). The party is the one
panel: open seats invite from a popover that grows from the seat, and every invite answers at
the friend — "Asking…" spins on their row, a yes sends their avatar across into a seat, a no
leaves a short line under their name. Play counts down in dot-matrix digits where it was
pressed, then becomes the match clock while the next achievement creeps forward. Claiming a
finished achievement throws sprinkles from the button and the coins in the header glow.
A deep violet tint; check it in dark theme too.
-->
<Story name="Game hub" args={{ game: 'tidecaller', party: 'duo', inMatch: false }}>
  {#snippet template(args, context)}
    <Application tint={storyTint(context, '#5b3fc4')}>
      {#key `${args.game}-${args.party}-${args.inMatch}`}
        <GameHub
          game={args.game ?? 'tidecaller'}
          party={args.party ?? 'duo'}
          inMatch={args.inMatch ?? false}
        />
      {/key}
    </Application>
  {/snippet}
</Story>
