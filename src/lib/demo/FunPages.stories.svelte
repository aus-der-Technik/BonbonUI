<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Application from '../patterns/templates/Application.svelte';
  import MusicPlayer from './MusicPlayer.svelte';
  import { albums } from './mock-fun';

  const albumIds = albums.map((a) => a.id);

  const { Story } = defineMeta({
    title: 'Pages/Fun',
    component: MusicPlayer,
    tags: ['!autodocs'],
    parameters: { layout: 'fullscreen' },
    argTypes: {
      playing: { control: 'boolean', description: 'Opens with music playing.' },
      album: {
        type: { name: 'enum', value: albumIds },
        control: 'select',
        options: albumIds,
        description: 'The album that is loaded.',
      },
      emptyQueue: { control: 'boolean', description: 'Opens with nothing up next.' },
    },
  });
</script>

<!--
A listening room with the record on the ground: big gradient art, the position as dot-matrix
digits, a seek line, and round soft-touch keys for previous, play and next, with shuffle and
repeat as toggles that stay tinted. A small visualiser moves only while music plays. "Up next"
is a plain list: play a track now, move it up or down, or remove it and undo in the same row.
The library plays an album where you press, or adds it to the queue with a plus that turns into
a tick while the queue count glows. Scroll down and a small glass player floats in from the
bottom edge.
-->
<Story name="Music player" args={{ playing: true, album: 'quiet-hours', emptyQueue: false }}>
  {#snippet template(args)}
    <Application tint="#c2417a">
      {#key `${args.album}-${args.playing}-${args.emptyQueue}`}
        <MusicPlayer
          playing={args.playing ?? true}
          album={args.album ?? 'quiet-hours'}
          emptyQueue={args.emptyQueue ?? false}
        />
      {/key}
    </Application>
  {/snippet}
</Story>
