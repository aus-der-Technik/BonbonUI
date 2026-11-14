<script lang="ts">
  /**
   * Example page: a listening room. The record that plays sits on the ground — big art, its time
   * in dot-matrix digits read from the sofa, a seek line and round soft-touch transport keys.
   * "Up next" is a plain list you reorder and trim in place (with an undo in the row), the
   * library is a grid of albums that play or join the queue right where they are. The only
   * glass besides the header is a small player that floats in when the big one scrolls away.
   * Storybook only.
   */
  import { onDestroy } from 'svelte';
  import { flip } from 'svelte/animate';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import VisuallyHidden from '../patterns/atoms/VisuallyHidden.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { glide, motion } from '../utils/motion';
  import { greeting } from '../utils/delight';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import MusicPlayerArt from './MusicPlayerArt.svelte';
  import { albumById, albums, bars, type Album, type Track } from './mock-fun';

  interface Props {
    /** Opens with music playing. */
    playing?: boolean;
    /** The album that is loaded. */
    album?: string;
    /** Opens with nothing up next. */
    emptyQueue?: boolean;
  }

  let { playing = false, album: startAlbum = 'quiet-hours', emptyQueue = false }: Props = $props();

  interface Entry {
    key: string;
    track: Track;
    /** Removed, but the row still offers an undo for a few seconds. */
    removed: boolean;
  }

  const UNDO_MS = 5000;
  let serial = 0;
  const entry = (track: Track): Entry => ({ key: `q${serial++}`, track, removed: false });

  // svelte-ignore state_referenced_locally
  const first = albumById(startAlbum);
  let current = $state<Track>(first.tracks[0]!);
  // svelte-ignore state_referenced_locally
  let queue = $state<Entry[]>(
    emptyQueue
      ? []
      : [...first.tracks.slice(1), ...albumById('small-weather').tracks.slice(0, 2)].map(entry),
  );
  let history = $state<Track[]>([]);
  // svelte-ignore state_referenced_locally
  let isPlaying = $state(playing);
  // svelte-ignore state_referenced_locally
  let position = $state(playing ? 74 : 0);
  let shuffle = $state(false);
  let repeat = $state(false);
  let volume = $state(70);
  let sort = $state<'recent' | 'az'>('recent');
  let justAdded = $state<Record<string, boolean>>({});
  let ended = $state(false);
  let nowEl = $state<HTMLElement | undefined>();
  let showMini = $state(false);
  let showAll = $state(false);

  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- pending timeouts, never shown
  const timers = new Map<string, ReturnType<typeof setTimeout>>();
  onDestroy(() => timers.forEach(clearTimeout));

  const currentAlbum = $derived(albumById(current.albumId));
  const live = $derived(queue.filter((e) => !e.removed));
  const SHOWN = 7;
  const visible = $derived(showAll ? queue : queue.slice(0, SHOWN));
  const queueMinutes = $derived(Math.round(live.reduce((s, e) => s + e.track.seconds, 0) / 60));
  const library = $derived(
    [...albums].sort((a, b) =>
      sort === 'az' ? a.title.localeCompare(b.title) : a.added - b.added,
    ),
  );
  const hello = greeting();
  const slow = motion('slow', 'in-out');
  const flipMotion = { duration: slow.reduced ? 0 : slow.duration, easing: slow.ease };

  const pad = (n: number) => String(n).padStart(2, '0');
  const clock = (s: number) => `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}`;
  const spoken = (s: number) => `${Math.floor(s / 60)} minutes ${Math.floor(s % 60)} seconds`;

  function later(key: string, ms: number, run: () => void) {
    clearTimeout(timers.get(key));
    timers.set(
      key,
      setTimeout(() => {
        timers.delete(key);
        run();
      }, ms),
    );
  }

  function start(track: Track) {
    history = [...history, current];
    current = track;
    position = 0;
    ended = false;
  }

  function next(auto = false) {
    let pool = live;
    if (pool.length === 0 && repeat) {
      queue = [...history, current].map(entry);
      history = [];
      pool = queue;
    }
    if (pool.length === 0) {
      // The end of the queue: stop on the last track instead of looping silently.
      if (auto) {
        isPlaying = false;
        position = 0;
        ended = true;
      }
      return;
    }
    const pick = shuffle ? pool[Math.floor(Math.random() * pool.length)]! : pool[0]!;
    queue = queue.filter((e) => e.key !== pick.key);
    start(pick.track);
  }

  function previous() {
    const back = history.at(-1);
    if (position > 3 || !back) {
      position = 0;
      return;
    }
    history = history.slice(0, -1);
    queue = [entry(current), ...queue];
    current = back;
    position = 0;
  }

  function toggle() {
    ended = false;
    isPlaying = !isPlaying;
  }

  function playNow(key: string) {
    const e = queue.find((q) => q.key === key);
    if (!e) return;
    queue = queue.filter((q) => q.key !== key);
    start(e.track);
    isPlaying = true;
  }

  function move(key: string, by: -1 | 1) {
    const i = queue.findIndex((q) => q.key === key);
    const j = i + by;
    if (i < 0 || j < 0 || j >= queue.length) return;
    const list = [...queue];
    [list[i], list[j]] = [list[j]!, list[i]!];
    queue = list;
  }

  function remove(key: string) {
    const e = queue.find((q) => q.key === key);
    if (!e) return;
    e.removed = true;
    later(key, UNDO_MS, () => (queue = queue.filter((q) => q.key !== key)));
  }

  function undo(key: string) {
    clearTimeout(timers.get(key));
    timers.delete(key);
    const e = queue.find((q) => q.key === key);
    if (e) e.removed = false;
  }

  function playAlbum(a: Album) {
    start(a.tracks[0]!);
    queue = a.tracks.slice(1).map(entry);
    isPlaying = true;
  }

  function queueAlbum(a: Album) {
    queue = [...queue, ...a.tracks.map(entry)];
    ended = false;
    justAdded[a.id] = true;
    later(`added-${a.id}`, 2200, () => (justAdded[a.id] = false));
  }

  function shuffleLibrary() {
    const pool = albums.flatMap((a) => a.tracks).filter((t) => t.id !== current.id);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j]!, pool[i]!];
    }
    queue = pool.slice(0, 8).map(entry);
    ended = false;
  }

  // The clock follows real time between ticks, so a busy main thread never slows the song.
  $effect(() => {
    if (!isPlaying) return;
    let last = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      position = Math.min(current.seconds, position + (now - last) / 1000);
      last = now;
      if (position >= current.seconds) next(true);
    }, 250);
    return () => clearInterval(timer);
  });

  // The small player floats in only while the big one is out of sight.
  $effect(() => {
    if (!nowEl || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => (showMini = !e?.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(nowEl);
    return () => io.disconnect();
  });

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'The time reads from across the room',
      body: 'The position is the figure people look up for, so it is large dot-matrix digits on the ground — every digit equally wide, so the readout never jitters while it counts.',
      target: '[data-note="time"]',
    },
    {
      principle: 'friendly',
      title: 'Round soft-touch keys, toggles that stay lit',
      body: 'Skip, play and skip again are matte keys that sink when pressed. Shuffle and repeat stay tinted while on, so their state is visible without a label to read.',
      target: '[data-note="transport"]',
    },
    {
      principle: 'locality',
      title: 'Reorder and remove in the row',
      body: 'Up and down sit on the track they move; a removed track leaves an undo in its own place for a few seconds instead of a toast across the screen.',
      target: '[data-note="queue"]',
    },
    {
      principle: 'cues',
      title: 'An album joins the queue where you press',
      body: 'The plus on an album turns into a tick and the count of “Up next” glows. The visualiser moves only while music plays and holds still for reduced motion.',
      target: '[data-note="library"]',
    },
    {
      principle: 'function',
      title: 'One floating player, only when needed',
      body: 'Scroll the library and a small glass player rises from the bottom edge. It is sticky because it floats, and it leaves again when the big player is back in view.',
      target: '[data-note="now"]',
    },
  ];
</script>

<Page title="Listening room" subtitle="Living room speakers" width="wide" gap="xl">
  <div class="top">
    <section class="now" bind:this={nowEl} aria-labelledby="now-title" data-note="now">
      <div class="now__art">
        {#key currentAlbum.id}
          <span class="now__swap" in:glide={{ scale: 0.96, speed: 'slow' }}>
            <MusicPlayerArt art={currentAlbum.art} />
          </span>
        {/key}
      </div>

      <div class="now__info">
        <p class="eyebrow">
          {isPlaying ? 'Now playing' : ended ? 'The queue is done' : 'Paused'}
        </p>
        <h1 id="now-title" class="title" use:changeCue={current.id}>{current.title}</h1>
        <p class="byline">{current.artist} · {currentAlbum.title} · {currentAlbum.year}</p>

        <div class="readout" data-note="time">
          <span class="time" role="timer" aria-live="off">
            <DotMatrix
              value={clock(position)}
              label="{spoken(position)} of {spoken(current.seconds)}"
              size="xl"
            />
          </span>
          <div class="readout__side">
            <span class="eq" class:eq--on={isPlaying} aria-hidden="true">
              {#each bars as b, i (i)}
                <i style:--h={b.h} style:--delay="{b.delay}ms" style:--speed="{b.speed}ms"></i>
              {/each}
            </span>
            <span class="left">
              <DotMatrix
                value="-{clock(current.seconds - position)}"
                label="{spoken(current.seconds - position)} left"
                size="sm"
              />
            </span>
          </div>
        </div>

        <input
          class="seek"
          type="range"
          min="0"
          max={current.seconds}
          step="1"
          aria-label="Position in {current.title}"
          aria-valuetext="{clock(position)} of {clock(current.seconds)}"
          style:--fill="{(position / current.seconds) * 100}%"
          bind:value={position}
        />

        <div class="controls">
          <div class="transport" role="group" aria-label="Playback" data-note="transport">
            <Button
              variant="soft"
              size="lg"
              icon="shuffle"
              label="Shuffle"
              iconOnly
              aria-pressed={shuffle}
              onclick={() => (shuffle = !shuffle)}
            />
            <Button
              variant="soft"
              size="xl"
              icon="skip-back"
              label="Previous"
              iconOnly
              onclick={previous}
            />
            <span class="play">
              <Button
                variant="primary"
                size="xl"
                icon={isPlaying ? 'pause' : 'play'}
                label={isPlaying ? 'Pause' : 'Play'}
                iconOnly
                onclick={toggle}
              />
            </span>
            <Button
              variant="soft"
              size="xl"
              icon="skip-forward"
              label="Next"
              iconOnly
              aria-disabled={live.length === 0 && !repeat}
              onclick={() => next()}
            />
            <Button
              variant="soft"
              size="lg"
              icon="repeat"
              label="Repeat the queue"
              iconOnly
              aria-pressed={repeat}
              onclick={() => (repeat = !repeat)}
            />
          </div>
          <div class="volume">
            <Slider label="Volume" bind:value={volume} format={(v) => `${v} %`} />
          </div>
        </div>
      </div>
    </section>

    <section class="queue" aria-labelledby="queue-title" data-note="queue">
      <header class="sec-head">
        <h2 id="queue-title">Up next</h2>
        <span class="muted" use:changeCue={live.length}>
          {live.length === 1 ? '1 track' : `${live.length} tracks`}{live.length
            ? ` · ${queueMinutes} min`
            : ''}
        </span>
      </header>

      {#if queue.length === 0}
        <EmptyState
          icon="music"
          title={ended ? 'That was the last one' : 'Nothing up next'}
          message={ended
            ? 'Add an album from the library, or press play to hear this one again.'
            : `${hello.text}. Add an album from the library, or let the room pick for you.`}
        >
          {#snippet action()}
            <Button
              variant="soft"
              icon="shuffle"
              label="Shuffle the library"
              onclick={shuffleLibrary}
            />
          {/snippet}
        </EmptyState>
      {:else}
        <ol class="list">
          {#each visible as e, i (e.key)}
            <li class="row" class:row--removed={e.removed} animate:flip={flipMotion}>
              {#if e.removed}
                <span class="removed">Removed “{e.track.title}”</span>
                <Button variant="plain" size="sm" label="Undo" onclick={() => undo(e.key)} />
              {:else}
                <MusicPlayerArt
                  art={albumById(e.track.albumId).art}
                  size="2.5rem"
                  class="row__art"
                />
                <button class="row__play" type="button" onclick={() => playNow(e.key)}>
                  <span class="row__title">{e.track.title}</span>
                  <span class="row__artist">{e.track.artist}</span>
                  <VisuallyHidden>, play now</VisuallyHidden>
                </button>
                <span class="row__len">{clock(e.track.seconds)}</span>
                <span class="row__tools">
                  <Button
                    variant="soft"
                    size="xs"
                    icon="chevron-up"
                    label="Move {e.track.title} up"
                    iconOnly
                    aria-disabled={i === 0}
                    onclick={() => move(e.key, -1)}
                  />
                  <Button
                    variant="soft"
                    size="xs"
                    icon="chevron-down"
                    label="Move {e.track.title} down"
                    iconOnly
                    aria-disabled={i === queue.length - 1}
                    onclick={() => move(e.key, 1)}
                  />
                  <Button
                    variant="soft"
                    size="xs"
                    icon="close"
                    label="Remove {e.track.title}"
                    iconOnly
                    class="row__remove"
                    onclick={() => remove(e.key)}
                  />
                </span>
              {/if}
            </li>
          {/each}
        </ol>
        {#if queue.length > SHOWN}
          <Button
            variant="plain"
            size="sm"
            trailingIcon={showAll ? 'chevron-up' : 'chevron-down'}
            label={showAll ? 'Show fewer' : `Show ${queue.length - SHOWN} more`}
            onclick={() => (showAll = !showAll)}
          />
        {/if}
      {/if}
    </section>
  </div>

  <section class="library" aria-labelledby="library-title" data-note="library">
    <header class="sec-head sec-head--row">
      <h2 id="library-title">Library</h2>
      <SegmentedControl
        size="sm"
        label="Sort albums"
        options={[
          { value: 'recent', label: 'Recently added' },
          { value: 'az', label: 'A–Z' },
        ]}
        bind:value={sort}
      />
    </header>
    <ul class="albums">
      {#each library as a (a.id)}
        {@const onAir = a.id === currentAlbum.id}
        <li class="album" animate:flip={flipMotion}>
          <button
            type="button"
            class="album__art"
            aria-label="Play {a.title} by {a.artist}"
            onclick={() => playAlbum(a)}
          >
            <MusicPlayerArt art={a.art} />
            <span class="album__hint" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </span>
            {#if onAir && isPlaying}
              <span class="album__live eq eq--on eq--mini" aria-hidden="true">
                {#each bars.slice(0, 4) as b, i (i)}
                  <i style:--h={b.h} style:--delay="{b.delay}ms" style:--speed="{b.speed}ms"></i>
                {/each}
              </span>
            {/if}
          </button>
          <div class="album__meta">
            <div class="album__text">
              <span class="album__title">{a.title}</span>
              <span class="album__artist">{a.artist}</span>
            </div>
            <Button
              variant="soft"
              size="sm"
              icon={justAdded[a.id] ? 'check' : 'plus'}
              label={justAdded[a.id] ? `${a.title} added to up next` : `Add ${a.title} to up next`}
              iconOnly
              aria-pressed={justAdded[a.id] ?? false}
              onclick={() => queueAlbum(a)}
            />
          </div>
        </li>
      {/each}
    </ul>
  </section>

  {#if showMini}
    <div class="mini" transition:glide={{ y: 24, speed: 'base' }}>
      <Layer level="front" edge="bottom" direction="horizontal" gap="sm" shape="pill">
        <MusicPlayerArt art={currentAlbum.art} size="2.25rem" />
        <span class="mini__text">
          <span class="mini__title">{current.title}</span>
          <span class="mini__artist">{current.artist}</span>
        </span>
        <span class="mini__time"><DotMatrix value={clock(position)} size="inherit" /></span>
        <Button
          variant="glass"
          size="md"
          icon={isPlaying ? 'pause' : 'play'}
          label={isPlaying ? 'Pause' : 'Play'}
          iconOnly
          onclick={toggle}
        />
        <Button
          variant="ghost"
          size="md"
          icon="skip-forward"
          label="Next"
          iconOnly
          aria-disabled={live.length === 0 && !repeat}
          onclick={() => next()}
        />
        <span class="mini__bar" style:--fill="{(position / current.seconds) * 100}%"></span>
      </Layer>
    </div>
  {/if}
</Page>

<DesignNotes title="Music player" {notes} corner="top-right" />

<style>
  .top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(19rem, 25rem);
    gap: var(--space-12);
    align-items: start;
  }

  /* Now playing */
  .now {
    display: grid;
    grid-template-columns: minmax(12rem, 20rem) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: center;
  }
  .now__art {
    display: grid;
  }
  .now__swap {
    grid-area: 1 / 1;
    display: block;
  }
  .now__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }
  .eyebrow {
    color: var(--accent-ink);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .title {
    width: fit-content;
    max-width: 100%;
    margin-inline: -6px;
    padding: 0 6px;
    border-radius: var(--radius-sm);
    font-size: var(--fs-display);
    font-weight: var(--fw-medium);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }
  .byline {
    color: var(--text-2);
    font-size: var(--fs-md);
  }
  .readout {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-4);
    margin-top: var(--space-4);
  }
  .time {
    color: var(--text);
  }
  .readout__side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-3);
    color: var(--text-2);
  }

  /* The visualiser: bars scale from the floor, only while music plays. */
  .eq {
    display: inline-flex;
    align-items: flex-end;
    gap: 3px;
    height: 2rem;
  }
  .eq i {
    width: 4px;
    height: 100%;
    border-radius: 2px;
    background: var(--accent);
    opacity: 0.85;
    transform-origin: bottom;
    transform: scaleY(calc(var(--h) * 0.35));
    transition: transform var(--motion-slow) var(--ease-out);
  }
  .eq--on i {
    animation: eq var(--speed) var(--ease-gentle) var(--delay) infinite alternate;
  }
  @keyframes eq {
    from {
      transform: scaleY(calc(var(--h) * 0.25));
    }
    to {
      transform: scaleY(var(--h));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .eq--on i {
      animation: none;
      transform: scaleY(var(--h));
    }
  }

  /* Seek line: a thin track, the accent fills what has played. */
  .seek {
    width: 100%;
    height: 24px;
    margin: var(--space-1) 0 0;
    background: transparent;
    appearance: none;
    cursor: pointer;
  }
  .seek::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: var(--radius-pill);
    background: linear-gradient(
      90deg,
      var(--accent) 0 var(--fill),
      var(--fill-off) var(--fill) 100%
    );
  }
  .seek::-moz-range-track {
    height: 6px;
    border-radius: var(--radius-pill);
    background: linear-gradient(
      90deg,
      var(--accent) 0 var(--fill),
      var(--fill-off) var(--fill) 100%
    );
  }
  .seek::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    margin-top: -5px;
    border: 3px solid var(--accent);
    border-radius: 50%;
    background: var(--bg);
    box-shadow: var(--soft-shadow);
    appearance: none;
    transition: transform var(--motion-quick) var(--ease-out);
  }
  .seek::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border: 3px solid var(--accent);
    border-radius: 50%;
    background: var(--bg);
    box-shadow: var(--soft-shadow);
  }
  .seek:active::-webkit-slider-thumb {
    transform: scale(1.2);
  }
  .seek:focus-visible {
    outline: none;
  }
  .seek:focus-visible::-webkit-slider-thumb {
    box-shadow: var(--focus-ring);
  }
  .seek:focus-visible::-moz-range-thumb {
    box-shadow: var(--focus-ring);
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4) var(--space-8);
    margin-top: var(--space-2);
  }
  .transport {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .play :global(.btn) {
    width: 4rem;
    height: 4rem;
  }
  .volume {
    flex: 0 1 12rem;
    min-width: 9rem;
  }

  /* Section heads */
  .sec-head {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
  }
  .sec-head--row {
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-5);
  }
  .sec-head h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .muted {
    padding: 0 4px;
    margin-inline: -4px;
    border-radius: var(--radius-sm);
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  /* Up next: a list on the ground, hairlines between rows. */
  .list {
    margin: 0 0 var(--space-2);
    padding: 0;
    list-style: none;
  }
  .row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto auto;
    align-items: center;
    gap: var(--space-3);
    min-height: 3.5rem;
    padding: var(--space-2) 0;
    border-bottom: 1px solid var(--border-strong);
  }
  .row--removed {
    grid-template-columns: minmax(0, 1fr) auto;
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .removed {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-style: italic;
  }
  .row__play {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
    padding: var(--space-1) var(--space-2);
    margin-inline: calc(var(--space-2) * -1);
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .row__play:hover {
    background: var(--fill-hover);
  }
  .row__play:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .row__title,
  .row__artist {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .row__title {
    font-weight: var(--fw-medium);
  }
  .row__artist {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .row__len {
    color: var(--text-3);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .row__tools {
    display: flex;
    gap: var(--space-1);
  }
  .row__tools :global(.row__remove:hover) {
    color: var(--danger);
  }
  /* With a pointer the tools wait for the row; on touch they are always there. */
  @media (hover: hover) {
    .row__tools {
      opacity: 0;
      transition: opacity var(--motion-quick) var(--ease-out);
    }
    .row:hover .row__tools,
    .row:focus-within .row__tools {
      opacity: 1;
    }
  }

  /* Library */
  .albums {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
    gap: var(--space-8) var(--space-6);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .album {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
  }
  .album__art {
    position: relative;
    display: block;
    padding: 0;
    border: 0;
    border-radius: var(--radius-lg);
    background: none;
    cursor: pointer;
    transition: transform var(--motion-base) var(--ease-out);
  }
  .album__art:hover {
    transform: translateY(-2px);
  }
  .album__art:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .album__hint {
    position: absolute;
    right: var(--space-3);
    bottom: var(--space-3);
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: var(--shadow-primary);
    color: var(--on-accent);
    opacity: 0;
    transform: translateY(6px) scale(0.9);
    transition:
      opacity var(--motion-base) var(--ease-out),
      transform var(--motion-base) var(--ease-spring);
  }
  .album__hint svg {
    width: 1.1rem;
    fill: currentColor;
    margin-left: 2px;
  }
  .album__art:hover .album__hint,
  .album__art:focus-visible .album__hint {
    opacity: 1;
    transform: none;
  }
  .album__live {
    position: absolute;
    left: var(--space-3);
    bottom: var(--space-3);
    height: 1.25rem;
    padding: 4px 6px;
    border-radius: var(--radius-sm);
    background: color-mix(in srgb, var(--bg) 80%, transparent);
  }
  .eq--mini i {
    width: 3px;
  }
  .album__meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-2);
  }
  .album__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .album__title,
  .album__artist {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .album__title {
    font-weight: var(--fw-semibold);
  }
  .album__artist {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  /* Mini player: front layer, floats in at the bottom edge. */
  .mini {
    position: sticky;
    bottom: var(--sticky-gap);
    z-index: var(--z-front);
    align-self: center;
    width: min(32rem, 100%);
    margin-top: calc(var(--space-8) * -1);
  }
  .mini :global(.layer) {
    position: relative;
    padding-block: var(--space-2);
    overflow: clip;
  }
  .mini__text {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    line-height: 1.25;
  }
  .mini__title,
  .mini__artist {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mini__title {
    font-weight: var(--fw-semibold);
    font-size: var(--fs-sm);
  }
  .mini__artist {
    color: var(--text-2);
    font-size: var(--fs-xs);
  }
  .mini__time {
    color: var(--text-2);
    font-size: var(--fs-lg);
  }
  .mini__bar {
    position: absolute;
    left: var(--space-6);
    right: var(--space-6);
    bottom: 3px;
    height: 2px;
    border-radius: 1px;
    background: linear-gradient(90deg, var(--accent) 0 var(--fill), transparent var(--fill));
  }

  @media (max-width: 1100px) {
    .top {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-10);
    }
  }
  @media (max-width: 1100px) {
    .now {
      grid-template-columns: minmax(10rem, 15rem) minmax(0, 1fr);
      gap: var(--space-6);
    }
  }
  @media (max-width: 640px) {
    .now {
      grid-template-columns: minmax(0, 1fr);
    }
    .now__art {
      width: min(16rem, 70%);
    }
    .title {
      font-size: var(--fs-3xl);
    }
  }
  @media (max-width: 520px) {
    .transport {
      gap: var(--space-2);
    }
    .readout :global(.dots--xl) {
      font-size: var(--fs-kpi);
    }
  }
</style>
