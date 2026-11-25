<script lang="ts">
  /**
   * Example page: a player's hub for an invented game universe, the Lanternfall Isles. The
   * chosen game, its Play key and its achievements sit on the ground; the library is a row of
   * key-art tiles. The party is the one panel — it is where the work happens: invite a friend
   * and the answer comes back at that friend, whose avatar then travels into a party seat. Play
   * counts down in dot-matrix digits where it was pressed. Storybook only.
   */
  import { onDestroy } from 'svelte';
  import { crossfade } from 'svelte/transition';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import StatusDot from '../patterns/atoms/StatusDot.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import GlassPill from '../patterns/molecules/GlassPill.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { celebrate } from '../utils/delight';
  import { glide, motion } from '../utils/motion';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import GameHubArt from './GameHubArt.svelte';
  import {
    PARTY_SIZE,
    friends,
    games as allGames,
    player,
    type Achievement,
    type Friend,
    type Game,
  } from './mock-gaming';

  interface Props {
    /** The game that is selected. */
    game?: string;
    /** Who is in the party at the start. */
    party?: 'solo' | 'duo' | 'full';
    /** Opens in a running match. */
    inMatch?: boolean;
  }

  let {
    game: startGame = 'tidecaller',
    party: startParty = 'duo',
    inMatch = false,
  }: Props = $props();

  type Invite = 'idle' | 'asking' | 'joined' | 'declined';
  const START = { solo: [], duo: ['ada'], full: ['ada', 'noor', 'leo'] } as const;
  const COUNTDOWN = 5;

  let library = $state<Game[]>(allGames.map((g) => structuredClone(g)));
  // svelte-ignore state_referenced_locally
  let selectedId = $state(startGame);
  // svelte-ignore state_referenced_locally
  let party = $state<string[]>([...START[startParty]]);
  // svelte-ignore state_referenced_locally
  let invites = $state<Record<string, Invite>>(
    Object.fromEntries(START[startParty].map((id) => [id, 'joined'])),
  );
  let coins = $state(player.coins);
  // svelte-ignore state_referenced_locally
  let phase = $state<'idle' | 'starting' | 'playing'>(inMatch ? 'playing' : 'idle');
  let countdown = $state(COUNTDOWN);
  // svelte-ignore state_referenced_locally
  let elapsed = $state(inMatch ? 754 : 0);
  let installing = $state<Record<string, number>>({});

  const selected = $derived(library.find((g) => g.id === selectedId) ?? library[0]!);
  const members = $derived(party.map((id) => friends.find((f) => f.id === id)!));
  const seatsLeft = $derived(PARTY_SIZE - 1 - party.length);
  const full = $derived(seatsLeft === 0);
  const order: Record<Friend['status'], number> = { online: 0, playing: 1, away: 2, offline: 3 };
  const roster = $derived([...friends].sort((a, b) => order[a.status] - order[b.status]));
  const onlineCount = $derived(friends.filter((f) => f.status !== 'offline').length);
  const unlocked = $derived(selected.achievements.filter((a) => a.progress >= a.goal).length);

  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- pending timeouts, never shown
  const timers = new Map<string, ReturnType<typeof setTimeout>>();
  onDestroy(() => timers.forEach(clearTimeout));
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

  const travel = motion('slow', 'in-out');
  const [send, receive] = crossfade({
    duration: travel.reduced ? 0 : travel.duration,
    easing: travel.ease,
    fallback: (node) => glide(node, { scale: 0.85 }),
  });

  const pad = (n: number) => String(n).padStart(2, '0');
  const clock = (s: number) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
  const tone = (s: Friend['status']) =>
    s === 'online' ? 'ok' : s === 'playing' ? 'accent' : s === 'away' ? 'warn' : 'neutral';

  function invite(f: Friend) {
    if (full || invites[f.id] === 'asking' || invites[f.id] === 'joined') return;
    invites[f.id] = 'asking';
    // A short, varied wait, as if the friend were reading it.
    later(`invite-${f.id}`, 1300 + (f.level % 5) * 250, () => {
      if (f.answer === 'accept' && party.length < PARTY_SIZE - 1) {
        party = [...party, f.id];
        invites[f.id] = 'joined';
      } else {
        invites[f.id] = 'declined';
        later(`decline-${f.id}`, 6000, () => (invites[f.id] = 'idle'));
      }
    });
  }

  function leaveParty(id: string) {
    party = party.filter((p) => p !== id);
    invites[id] = 'idle';
  }

  function play() {
    if (!selected.installed) return;
    countdown = COUNTDOWN;
    phase = 'starting';
  }

  function install(g: Game) {
    if (g.installed || installing[g.id] !== undefined) return;
    installing[g.id] = 0;
  }

  function claim(a: Achievement, event: MouseEvent) {
    // Sprinkles first: the button is replaced as soon as the claim lands.
    celebrate(event.currentTarget as Element, 14);
    a.claimed = true;
    coins += a.reward;
  }

  // The countdown ticks where Play was pressed; then the match clock takes over.
  $effect(() => {
    if (phase === 'idle') return;
    const timer = setInterval(() => {
      if (phase === 'starting') {
        countdown -= 1;
        if (countdown <= 0) {
          phase = 'playing';
          elapsed = 0;
        }
      } else elapsed += 1;
    }, 1000);
    return () => clearInterval(timer);
  });

  // While a match runs, the next open achievement of that game creeps forward.
  $effect(() => {
    if (phase !== 'playing') return;
    const game = selected;
    const timer = setInterval(() => {
      const open = game.achievements.find((a) => a.progress < a.goal);
      if (open)
        open.progress = Math.min(
          open.goal,
          open.progress + Math.max(1, Math.round(open.goal / 25)),
        );
    }, 3000);
    return () => clearInterval(timer);
  });

  // Downloads advance in their tiles; done, the game is installed and Play takes its place.
  $effect(() => {
    if (Object.keys(installing).length === 0) return;
    const timer = setInterval(() => {
      for (const [id, pct] of Object.entries(installing)) {
        const next = Math.min(100, pct + 4);
        if (next < 100) installing[id] = next;
        else {
          delete installing[id];
          const g = library.find((x) => x.id === id);
          if (g) g.installed = true;
        }
      }
    }, 200);
    return () => clearInterval(timer);
  });

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'The game and its Play key stand on the ground',
      body: 'Key art, a line about the game and one primary button — the reason to open the hub. When the whole party has joined, Play carries the slow ring of light.',
      target: '[data-note="hero"]',
    },
    {
      principle: 'locality',
      title: 'An invite answers at the friend',
      body: '“Asking…” spins on the friend you invited; a yes sends their avatar across into a party seat, a no leaves a short line under their name. No toast in the corner.',
      target: '[data-note="friends"]',
    },
    {
      principle: 'cues',
      title: 'The countdown runs where Play was pressed',
      body: 'Dot-matrix digits replace the button and count down with Cancel beside them, then become the match clock. Progress on achievements glows as it moves.',
      target: '[data-note="play"]',
    },
    {
      principle: 'friendly',
      title: 'Claiming is the moment for sprinkles',
      body: 'A finished achievement offers Claim; pressing it throws a few sprinkles from the button and the coins in the header glow. Delight at the end of a task, once.',
      target: '[data-note="achievements"]',
    },
    {
      principle: 'function',
      title: 'One panel: the party',
      body: 'Friends, the library and achievements need only a heading and air. The party is the working surface, so it alone is a panel; empty seats add to it right there.',
      target: '[data-note="party"]',
    },
  ];
</script>

<Page title="Game hub" subtitle="Lanternfall Isles" width="wide" gap="xl">
  {#snippet actions()}
    <GlassPill label="Your account">
      <span class="coins" use:changeCue={coins} title="Coins">
        <Icon name="coins" size={16} />
        {coins.toLocaleString('en-GB')}
      </span>
      <Avatar name={player.name} size={32} />
    </GlassPill>
  {/snippet}

  <div class="layout">
    <section class="hero" aria-labelledby="game-title" data-note="hero">
      <div class="hero__art">
        {#key selected.id}
          <span class="hero__swap" in:glide={{ scale: 0.97, speed: 'slow' }}>
            <GameHubArt art={selected.art} />
          </span>
        {/key}
      </div>
      <div class="hero__info">
        <p class="eyebrow">{selected.genre}</p>
        <h1 id="game-title">{selected.title}</h1>
        <p class="tagline">{selected.tagline}</p>
        <dl class="facts">
          <div>
            <dt>Played</dt>
            <dd>{selected.hours ? `${selected.hours} h` : '—'}</dd>
          </div>
          <div>
            <dt>Last session</dt>
            <dd>{selected.lastPlayed}</dd>
          </div>
          <div>
            <dt>Achievements</dt>
            <dd use:changeCue={unlocked}>{unlocked} of {selected.achievements.length}</dd>
          </div>
        </dl>

        <div class="play" data-note="play">
          {#if !selected.installed}
            {@const pct = installing[selected.id]}
            {#if pct === undefined}
              <Button
                variant="primary"
                size="xl"
                icon="download"
                label="Install · {selected.sizeGb} GB"
                onclick={() => install(selected)}
              />
            {:else}
              <div class="install">
                <ProgressBar
                  value={pct}
                  label="Installing {selected.title}"
                  showValue
                  valueLabel="{Math.round((pct / 100) * selected.sizeGb * 10) /
                    10} of {selected.sizeGb} GB"
                />
              </div>
            {/if}
          {:else if phase === 'idle'}
            <Button
              variant="primary"
              size="xl"
              icon="play"
              label={party.length ? `Play with ${party.length + 1}` : 'Play'}
              shimmer={full}
              onclick={play}
            />
            <span class="muted">
              {full
                ? 'Everyone is here.'
                : party.length
                  ? `${seatsLeft} seat${seatsLeft === 1 ? '' : 's'} free`
                  : 'Solo, or invite friends'}
            </span>
          {:else if phase === 'starting'}
            <span class="count" role="timer" in:glide={{ scale: 0.9 }}>
              <span class="count__label">Starting in</span>
              <DotMatrix value={clock(countdown)} label="{countdown} seconds" size="lg" />
            </span>
            <Button
              variant="soft"
              size="lg"
              icon="close"
              label="Cancel"
              onclick={() => (phase = 'idle')}
            />
          {:else}
            <span class="count count--live" role="timer" aria-live="off" in:glide={{ scale: 0.9 }}>
              <span class="count__label"><StatusDot tone="ok" pulse /> In a match</span>
              <DotMatrix
                value={clock(elapsed)}
                label="{Math.floor(elapsed / 60)} minutes"
                size="lg"
              />
            </span>
            <Button
              variant="soft"
              size="lg"
              icon="sign-out"
              label="Leave match"
              onclick={() => (phase = 'idle')}
            />
          {/if}
        </div>
      </div>
    </section>

    <section class="library" aria-labelledby="library-title">
      <header class="sec-head">
        <h2 id="library-title">Library</h2>
        <span class="muted">{library.length} games</span>
      </header>
      <ul class="tiles">
        {#each library as g (g.id)}
          {@const pct = installing[g.id]}
          <li>
            <button
              type="button"
              class="tile"
              aria-pressed={g.id === selectedId}
              disabled={phase !== 'idle' && g.id !== selectedId}
              onclick={() => (selectedId = g.id)}
            >
              <span class="tile__art"><GameHubArt art={g.art} /></span>
              <span class="tile__title">{g.title}</span>
              <span class="tile__meta">
                {#if pct !== undefined}
                  <span class="tile__bar" style:--fill="{pct}%"></span>
                {:else if !g.installed}
                  <Icon name="download" size={13} /> {g.sizeGb} GB
                {:else}
                  {g.hours} h played
                {/if}
              </span>
            </button>
          </li>
        {/each}
      </ul>
    </section>

    <section class="ach-list" aria-labelledby="ach-title" data-note="achievements">
      <header class="sec-head">
        <h2 id="ach-title">Achievements</h2>
        <span class="muted">{selected.title}</span>
      </header>
      <ul class="achievements">
        {#each selected.achievements as a (a.id)}
          {@const done = a.progress >= a.goal}
          <li class="ach" class:ach--done={done}>
            <span class="ach__icon"><Icon name={done ? 'trophy' : a.icon} size={20} /></span>
            <div class="ach__body">
              <span class="ach__title">{a.title}</span>
              <span class="ach__detail">{a.detail}</span>
              {#if !done}
                <span class="ach__progress" use:changeCue={a.progress}>
                  <span
                    class="ach__bar"
                    role="progressbar"
                    aria-label="{a.title} progress"
                    aria-valuemin={0}
                    aria-valuemax={a.goal}
                    aria-valuenow={a.progress}
                    aria-valuetext="{a.progress} of {a.goal}"
                    style:--fill="{(a.progress / a.goal) * 100}%"
                  ></span>
                  <span class="ach__count">{a.progress} / {a.goal}</span>
                </span>
              {/if}
            </div>
            <span class="ach__end">
              {#if done && !a.claimed}
                <Button
                  variant="soft"
                  size="sm"
                  icon="gift"
                  label="Claim {a.reward}"
                  onclick={(e) => claim(a, e)}
                />
              {:else if a.claimed}
                <span class="claimed" in:glide={{ scale: 0.9 }}
                  ><Icon name="check" size={14} /> Claimed</span
                >
              {:else}
                <span class="reward"><Icon name="coins" size={14} /> {a.reward}</span>
              {/if}
            </span>
          </li>
        {/each}
      </ul>
    </section>

    <div class="side">
      <Layer level="panel" padding="lg" gap="md" as="section" aria-labelledby="party-title">
        <div class="party-head" data-note="party">
          <h2 id="party-title">Party</h2>
          <span class="muted" use:changeCue={party.length}>{party.length + 1} of {PARTY_SIZE}</span>
        </div>
        <ul class="seats">
          <li class="seat">
            <span class="seat__avatar"><Avatar name={player.name} size={44} /></span>
            <span class="seat__name">You</span>
            <span class="seat__role">Host</span>
          </li>
          {#each members as m (m.id)}
            <li class="seat">
              <span class="seat__avatar" in:receive={{ key: m.id }} out:send={{ key: m.id }}>
                <Avatar name={m.name} size={44} color="auto" />
                <button
                  type="button"
                  class="seat__drop"
                  aria-label="Remove {m.name} from the party"
                  disabled={phase !== 'idle'}
                  onclick={() => leaveParty(m.id)}
                >
                  <Icon name="close" size={11} />
                </button>
              </span>
              <span class="seat__name">{m.name.split(' ')[0]}</span>
              <span class="seat__role">{phase === 'idle' ? 'Ready' : 'In game'}</span>
            </li>
          {/each}
          {#each Array.from({ length: seatsLeft }, (_, i) => i) as i (i)}
            <li class="seat">
              <span class="seat__avatar">
                <Popover
                  title="Invite to the party"
                  width="17rem"
                  placement="bottom-end"
                  padding="sm"
                >
                  {#snippet trigger(props)}
                    <button
                      {...props}
                      type="button"
                      class="seat__empty"
                      aria-label="Invite a friend to seat {party.length + 2 + i}"
                    >
                      <Icon name="plus" size={18} />
                    </button>
                  {/snippet}
                  <ul class="pick">
                    {#each roster.filter((f) => f.status !== 'offline' && invites[f.id] !== 'joined') as f (f.id)}
                      <li>{@render friendRow(f, true)}</li>
                    {:else}
                      <li class="muted">Nobody else is online right now.</li>
                    {/each}
                  </ul>
                </Popover>
              </span>
              <span class="seat__name seat__name--empty">Open</span>
            </li>
          {/each}
        </ul>
      </Layer>

      <section class="friends" aria-labelledby="friends-title" data-note="friends">
        <header class="sec-head">
          <h2 id="friends-title">Friends</h2>
          <span class="muted">{onlineCount} online</span>
        </header>
        <ul class="roster">
          {#each roster as f (f.id)}
            <li>{@render friendRow(f, false)}</li>
          {/each}
        </ul>
      </section>
    </div>
  </div>
</Page>

{#snippet friendRow(f: Friend, compact: boolean)}
  {@const inv = invites[f.id] ?? 'idle'}
  <div class="friend" class:friend--off={f.status === 'offline'}>
    <span class="friend__avatar">
      {#if inv === 'joined' && !compact}
        <span class="friend__in" title="In your party"><Icon name="check" size={16} /></span>
      {:else if compact}
        <Avatar name={f.name} size={32} color="auto" />
      {:else}
        <span in:receive={{ key: f.id }} out:send={{ key: f.id }}>
          <Avatar name={f.name} size={36} color="auto" />
        </span>
      {/if}
      <span class="friend__dot"
        ><StatusDot tone={tone(f.status)} size="sm" aria-label={f.status} /></span
      >
    </span>
    <span class="friend__text">
      <span class="friend__name">{f.name}</span>
      {#if inv === 'declined'}
        <span class="friend__line friend__line--no" in:glide={{ y: -4 }}
          >{f.declineLine ?? 'Not right now.'}</span
        >
      {:else if inv === 'joined'}
        <span class="friend__line friend__line--yes">In your party</span>
      {:else}
        <span class="friend__line">{f.activity}</span>
      {/if}
    </span>
    {#if f.status !== 'offline' && inv !== 'joined'}
      <Button
        variant="soft"
        size="sm"
        icon={inv === 'declined' ? 'refresh' : 'user-plus'}
        label={inv === 'declined' ? 'Ask again' : 'Invite'}
        busy={inv === 'asking'}
        busyLabel="Asking…"
        aria-disabled={full}
        onclick={() => invite(f)}
      />
    {/if}
  </div>
{/snippet}

<DesignNotes title="Game hub" {notes} corner="bottom-left" />

<style>
  /* Header */
  .coins {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    color: var(--text);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .coins :global(.icon) {
    color: var(--star-on);
  }

  /* Main column and a sticky side column; on narrow screens the party follows the game. */
  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 21rem;
    grid-template-areas: 'hero side' 'library side' 'ach side';
    grid-template-rows: auto auto 1fr;
    gap: var(--space-10) var(--space-10);
    align-items: start;
  }
  .library {
    grid-area: library;
  }
  .ach-list {
    grid-area: ach;
  }
  .side {
    grid-area: side;
    position: sticky;
    top: calc(var(--page-top, 0px) + var(--space-4));
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    min-width: 0;
  }

  /* Hero */
  .hero {
    grid-area: hero;
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 1fr);
    gap: var(--space-8);
    align-items: center;
  }
  .hero__art {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: clip;
    border-radius: var(--radius-xl);
    box-shadow: var(--panel-shadow);
  }
  .hero__swap {
    position: absolute;
    inset: 0;
    display: block;
  }
  .hero__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
  }
  .eyebrow {
    color: var(--accent-ink);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  h1 {
    font-size: var(--fs-display);
    font-weight: var(--fw-semibold);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
  }
  .tagline {
    max-width: 34ch;
    color: var(--text-2);
    font-size: var(--fs-md);
  }
  .facts {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
    margin: var(--space-2) 0;
  }
  .facts div {
    padding-left: var(--space-3);
    border-left: 1px solid var(--border-strong);
  }
  .facts dt {
    color: var(--text-2);
    font-size: var(--fs-xs);
  }
  .facts dd {
    margin: 2px 0 0 -4px;
    padding: 0 4px;
    border-radius: var(--radius-sm);
    font-weight: var(--fw-semibold);
  }
  .play {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
    min-height: 4.5rem;
  }
  .install {
    width: min(100%, 20rem);
  }
  .count {
    display: inline-flex;
    flex-direction: column;
    gap: var(--space-1);
    color: var(--accent-ink);
  }
  .count--live {
    color: var(--text);
  }
  .count__label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  /* Section heads */
  .sec-head {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }
  .sec-head h2,
  .party-head h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }

  /* Library */
  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: var(--space-5);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .tile {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .tile:disabled {
    cursor: default;
    opacity: var(--disabled-opacity);
  }
  .tile__art {
    display: block;
    aspect-ratio: 4 / 3;
    margin-bottom: var(--space-1);
    overflow: clip;
    border-radius: var(--radius-lg);
    box-shadow: var(--panel-shadow);
    outline: 2px solid transparent;
    outline-offset: 3px;
    transition:
      transform var(--motion-base) var(--ease-out),
      outline-color var(--motion-base) var(--ease-out);
  }
  .tile:not(:disabled):hover .tile__art {
    transform: translateY(-2px);
  }
  .tile[aria-pressed='true'] .tile__art {
    outline-color: var(--accent);
  }
  .tile:focus-visible {
    outline: none;
  }
  .tile:focus-visible .tile__art {
    box-shadow: var(--focus-ring);
  }
  .tile__title {
    font-weight: var(--fw-semibold);
    font-size: var(--fs-sm);
  }
  .tile[aria-pressed='true'] .tile__title {
    color: var(--accent-ink);
  }
  .tile__meta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 1.2em;
    color: var(--text-2);
    font-size: var(--fs-xs);
  }
  .tile__bar {
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--accent) 0 var(--fill), var(--fill-off) var(--fill));
  }

  /* Achievements: rows on the ground, hairlines between them. */
  .achievements {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 22rem), 1fr));
    gap: 0 var(--space-8);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ach {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4) 0;
    border-bottom: 1px solid var(--border-strong);
  }
  .ach__icon {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: var(--fill-subtle);
    color: var(--text-2);
  }
  .ach--done .ach__icon {
    background: color-mix(in srgb, var(--star-on) 22%, transparent);
    color: var(--draft);
  }
  .ach__body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .ach__title {
    font-weight: var(--fw-semibold);
  }
  .ach__detail {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .ach__progress {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin: var(--space-2) -4px 0;
    padding: 2px 4px;
    border-radius: var(--radius-sm);
  }
  .ach__bar {
    flex: 1;
    height: 6px;
    border-radius: var(--radius-pill);
    background: linear-gradient(90deg, var(--accent) 0 var(--fill), var(--fill-off) var(--fill));
    transition: background var(--motion-slow) var(--ease-out);
  }
  .ach__count {
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .reward,
  .claimed {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .claimed {
    color: var(--ok-dark);
    font-weight: var(--fw-semibold);
  }

  /* Party */
  .party-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .seats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .seat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-width: 0;
    text-align: center;
  }
  .seat__avatar {
    position: relative;
    display: block;
    margin-bottom: var(--space-1);
  }
  .seat__drop {
    position: absolute;
    top: -4px;
    right: -6px;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--soft-bg);
    box-shadow: var(--soft-shadow);
    color: var(--text-2);
    cursor: pointer;
    opacity: 0;
    transition: opacity var(--motion-quick) var(--ease-out);
  }
  .seat:hover .seat__drop,
  .seat__drop:focus-visible {
    opacity: 1;
  }
  .seat__drop:hover {
    color: var(--danger);
  }
  .seat__drop:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .seat__drop:disabled {
    display: none;
  }
  @media (hover: none) {
    .seat__drop {
      opacity: 1;
    }
  }
  .seat__empty {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 1.5px dashed var(--input-border);
    border-radius: 50%;
    background: none;
    color: var(--text-2);
    cursor: pointer;
    transition:
      color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out);
  }
  .seat__empty:hover,
  .seat__empty[aria-expanded='true'] {
    border-color: var(--accent);
    color: var(--accent-ink);
  }
  .seat__empty:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .seat__name {
    max-width: 100%;
    overflow: hidden;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .seat__name--empty {
    color: var(--text-3);
    font-weight: var(--fw-regular);
  }
  .seat__role {
    color: var(--text-2);
    font-size: var(--fs-xs);
  }

  /* Friends */
  .roster,
  .pick {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .roster li + li {
    border-top: 1px solid var(--border-strong);
  }
  .pick {
    min-width: 15rem;
    text-align: left;
  }
  .pick li + li {
    margin-top: var(--space-1);
  }
  .pick .friend__line--no {
    white-space: nowrap;
  }
  .friend {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-3);
    min-height: 3.5rem;
    padding: var(--space-2) 0;
  }
  .friend--off {
    opacity: 0.62;
  }
  .friend__avatar {
    position: relative;
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
  }
  .friend__in {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent-ink);
  }
  .friend__dot {
    position: absolute;
    right: -2px;
    bottom: -2px;
    display: grid;
    place-items: center;
    padding: 2px;
    border-radius: 50%;
    background: var(--bg);
    line-height: 0;
  }
  .friend__text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .friend__name {
    font-weight: var(--fw-semibold);
    font-size: var(--fs-sm);
  }
  .friend__line {
    overflow: hidden;
    color: var(--text-2);
    font-size: var(--fs-xs);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .friend__line--no {
    color: var(--draft);
    white-space: normal;
  }
  .friend__line--yes {
    color: var(--accent-ink);
    font-weight: var(--fw-semibold);
  }

  @media (max-width: 1100px) {
    .layout {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: 'hero' 'side' 'library' 'ach';
      grid-template-rows: none;
    }
    .side {
      position: static;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
      align-items: start;
    }
  }
  @media (max-width: 900px) {
    .hero {
      grid-template-columns: minmax(0, 1fr);
    }
    .hero__art {
      aspect-ratio: 16 / 8;
    }
  }
  @media (max-width: 720px) {
    .tiles {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
