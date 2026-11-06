<script lang="ts">
  /**
   * Example page: a personal training log for someone who runs and rides. This week's distance
   * fills a ring on the ground, with the goal set by soft keys right beside it; the week's
   * sessions are a list on the ground, and a planned one is started or ticked off on its own
   * line. The live workout is the one panel: a dot-matrix clock, distance and pace, and round
   * soft-touch keys for lap, start/pause and finish. Finishing logs the session, fills the ring
   * and the history line, and reaching the weekly goal throws a few sprinkles from the ring.
   * Navigation is a NavRail of round glass buttons. Storybook only.
   */
  import { tick } from 'svelte';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import StatusDot from '../patterns/atoms/StatusDot.svelte';
  import { changeCue, flashChanged } from '../patterns/atoms/changed';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import ChartCard from '../patterns/organisms/ChartCard.svelte';
  import LineChart from '../patterns/organisms/LineChart.svelte';
  import NavRail from '../patterns/organisms/NavRail.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { celebrate, greeting } from '../utils/delight';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    days,
    historyPoints,
    sportIcon,
    trainingRail,
    trainingToday,
    trainingWeek,
    type Sport,
    type TrainingSession,
  } from './mock-private';

  interface Props {
    /** The state the live workout opens in. */
    workout?: 'ready' | 'running' | 'paused';
    /** The weekly goal is a few kilometres away, so one more session reaches it. */
    nearGoal?: boolean;
  }

  let { workout = 'ready', nearGoal = false }: Props = $props();

  type Status = 'ready' | 'running' | 'paused';
  interface Lap {
    n: number;
    seconds: number;
    km: number;
  }

  /** Simulated speeds: 5:20 per km on foot, 26 km/h on the bike. */
  const SPEED: Record<Sport, number> = { run: 1 / 320, ride: 26 / 3600 };
  const GOAL_STEP = 5;

  let sessions = $state<TrainingSession[]>(trainingWeek.map((s) => ({ ...s })));
  // svelte-ignore state_referenced_locally
  let goal = $state(nearGoal ? 40 : 70);
  let section = $state('week');

  // The live workout.
  // svelte-ignore state_referenced_locally
  const resumed = workout !== 'ready';
  // svelte-ignore state_referenced_locally
  let status = $state<Status>(workout);
  let sport = $state<Sport>('run');
  let linked = $state<string | null>(resumed ? 's4' : null);
  let elapsed = $state(resumed ? 31 * 60 + 12 : 0);
  let km = $state(resumed ? 5.86 : 0);
  let laps = $state<Lap[]>(
    resumed ? [5, 4, 3, 2, 1].map((n) => ({ n, seconds: 318 + ((n * 7) % 11), km: 1 })) : [],
  );

  let ring = $state<HTMLElement | undefined>();
  let list = $state<HTMLElement | undefined>();
  let lapList = $state<HTMLElement | undefined>();
  let panel = $state<HTMLElement | undefined>();

  const hello = greeting(new Date(), 'Robin');
  const round1 = (n: number) => Math.round(n * 10) / 10;
  const doneKm = $derived(round1(sessions.filter((s) => s.done).reduce((t, s) => t + s.km, 0)));
  const doneCount = $derived(sessions.filter((s) => s.done).length);
  const doneSeconds = $derived(sessions.filter((s) => s.done).reduce((t, s) => t + s.seconds, 0));
  const share = $derived(Math.min(1, doneKm / goal));
  const reached = $derived(doneKm >= goal);
  const linkedSession = $derived(sessions.find((s) => s.id === linked));
  const history = $derived(historyPoints(doneKm));
  const chartMax = $derived(Math.max(100, Math.ceil(doneKm / 25) * 25));
  const chartTicks = $derived(Array.from({ length: chartMax / 25 + 1 }, (_, i) => i * 25));

  function clock(s: number): string {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(sec).padStart(2, '0');
    return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }
  const duration = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.round((s % 3600) / 60);
    return h ? `${h} h ${m} min` : `${m} min`;
  };
  function pace(seconds: number, distance: number, kind: Sport): string {
    if (distance < 0.01) return kind === 'run' ? '0:00' : '0.0';
    if (kind === 'ride') return (distance / (seconds / 3600)).toFixed(1);
    const per = Math.round(seconds / distance);
    return `${Math.floor(per / 60)}:${String(per % 60).padStart(2, '0')}`;
  }
  const paceUnit = (kind: Sport) => (kind === 'run' ? '/km' : 'km/h');
  const dayLabel = (id: string) => days.find((d) => d.id === id)?.short ?? id;

  /** Throws sprinkles from the ring when a change carries the week over its goal. */
  async function after(before: number, id: string) {
    await tick();
    const row = list?.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (row) flashChanged(row);
    if (before < goal && doneKm >= goal && ring) celebrate(ring, 14);
  }

  function markDone(s: TrainingSession) {
    const before = doneKm;
    s.done = true;
    s.seconds = Math.round(s.km / SPEED[s.sport]);
    if (linked === s.id && status === 'ready') linked = null;
    void after(before, s.id);
  }

  async function startPlanned(s: TrainingSession) {
    if (status !== 'ready') return;
    linked = s.id;
    sport = s.sport;
    status = 'running';
    section = 'workout';
    await tick();
    panel?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function toggleRun() {
    status = status === 'running' ? 'paused' : 'running';
  }

  async function lap() {
    if (status !== 'running') return;
    const before = laps.reduce((t, l) => ({ s: t.s + l.seconds, k: t.k + l.km }), { s: 0, k: 0 });
    laps = [
      { n: laps.length + 1, seconds: elapsed - before.s, km: round1(km - before.k) },
      ...laps,
    ];
    await tick();
    const first = lapList?.querySelector<HTMLElement>('li');
    if (first) flashChanged(first);
  }

  function reset() {
    status = 'ready';
    elapsed = 0;
    km = 0;
    laps = [];
    linked = null;
  }

  function finish() {
    if (elapsed < 1) return;
    const before = doneKm;
    const distance = round1(km);
    let id: string;
    if (linkedSession) {
      linkedSession.done = true;
      linkedSession.km = distance;
      linkedSession.seconds = elapsed;
      id = linkedSession.id;
    } else {
      id = `w${Date.now()}`;
      sessions = [
        ...sessions,
        {
          id,
          day: trainingToday,
          sport,
          title: sport === 'run' ? 'Free run' : 'Free ride',
          km: distance,
          seconds: elapsed,
          done: true,
        },
      ];
    }
    reset();
    void after(before, id);
  }

  function setGoal(delta: number) {
    goal = Math.min(200, Math.max(10, goal + delta));
  }

  function go(id: string) {
    document.getElementById(`train-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  $effect(() => {
    if (status !== 'running') return;
    const t = setInterval(() => {
      elapsed += 1;
      km += SPEED[sport];
    }, 1000);
    return () => clearInterval(t);
  });

  // The ring: a full circle drawn from the top, clockwise.
  const R = 84;
  const C = 2 * Math.PI * R;

  const sorted = $derived(
    [...sessions].sort(
      (a, b) =>
        days.findIndex((d) => d.id === a.day) - days.findIndex((d) => d.id === b.day) ||
        Number(b.done) - Number(a.done),
    ),
  );

  const notes: DesignNote[] = [
    {
      principle: 'locality',
      title: 'The goal is set right at the ring',
      body: 'Minus and plus flank the figure they change. The ring refills as you press, so you see at once how far the week has to go.',
      target: '[data-note="ring"]',
    },
    {
      principle: 'locality',
      title: 'A planned session starts on its own line',
      body: 'Each planned session has its Start and its “done as planned” key. Nothing to look up in another screen — the line you read is the line you press.',
      target: '[data-note="sessions"]',
    },
    {
      principle: 'function',
      title: 'Read at a glance, mid-stride',
      body: 'The clock, the distance and the pace are dot-matrix readouts of one fixed width, so they do not wobble while they tick. Three big round keys: lap, start or pause, finish.',
      target: '[data-note="workout"]',
    },
    {
      principle: 'cues',
      title: 'Finishing shows where the work landed',
      body: 'The session row glows, the ring fills and the last point of the history line rises. Reaching the weekly goal throws a few sprinkles from the ring — at the end of the task, never in the way.',
      target: '[data-note="history"]',
    },
    {
      principle: 'friendly',
      title: 'Glass only on the rail',
      body: 'Everything else sits on the ground or in the one workout panel. The rail floats and sticks, and lies down into a bar on narrow screens.',
      target: '[data-note="rail"]',
    },
  ];
</script>

<Page width="full" gap="lg">
  <div class="shell">
    <div class="rail" data-note="rail">
      <NavRail items={trainingRail} bind:current={section} label="Training" onselect={go}>
        {#snippet top()}
          <span class="logo" aria-hidden="true"><Icon name="flame" size={20} /></span>
        {/snippet}
        {#snippet bottom()}
          <Avatar name="Robin Example" size={40} />
        {/snippet}
      </NavRail>
    </div>

    <div class="main">
      <header class="head" id="train-week">
        <h1>{hello.text}</h1>
        <p class="sub">{hello.wink} Week of 9 November.</p>
      </header>

      <div class="week">
        <section class="goal" aria-labelledby="goal-title" data-note="ring">
          <h2 id="goal-title" class="eyebrow">Distance this week</h2>
          <div class="goal__dial">
            <Button
              variant="soft"
              size="lg"
              icon="minus"
              label="Lower the goal by {GOAL_STEP} km"
              iconOnly
              disabled={goal <= 10}
              onclick={() => setGoal(-GOAL_STEP)}
            />
            <div class="ring" bind:this={ring}>
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <circle class="ring__track" cx="100" cy="100" r={R} />
                <circle
                  class="ring__fill"
                  class:reached
                  cx="100"
                  cy="100"
                  r={R}
                  stroke-dasharray={share >= 1 ? 'none' : C}
                  stroke-dashoffset={C * (1 - share)}
                />
              </svg>
              <div class="ring__read">
                <span class="ring__value" use:changeCue={doneKm}>
                  <DotMatrix value={doneKm.toFixed(1)} label="{doneKm} kilometres" size="inherit" />
                </span>
                <span class="ring__goal" use:changeCue={goal}>of {goal} km</span>
              </div>
            </div>
            <Button
              variant="soft"
              size="lg"
              icon="plus"
              label="Raise the goal by {GOAL_STEP} km"
              iconOnly
              disabled={goal >= 200}
              onclick={() => setGoal(GOAL_STEP)}
            />
          </div>
          <p class="goal__line" class:ok={reached} role="status">
            {#if reached}
              <Icon name="trophy" size={16} /> Goal reached. Lovely week.
            {:else}
              {round1(goal - doneKm)} km to go · {doneCount} sessions, {duration(doneSeconds)}
            {/if}
          </p>
        </section>

        <section class="sessions" aria-labelledby="sessions-title" data-note="sessions">
          <div class="sec-head">
            <h2 id="sessions-title">Sessions</h2>
            <span class="muted">{doneCount} done · {sessions.length - doneCount} planned</span>
          </div>
          <ul bind:this={list}>
            {#each sorted as s (s.id)}
              {@const today = s.day === trainingToday}
              <li class="session" class:planned={!s.done} class:today data-id={s.id}>
                <span class="session__day">
                  {dayLabel(s.day)}{#if today}<span class="session__today">Today</span>{/if}
                </span>
                <span class="session__icon" aria-hidden="true">
                  <Icon name={sportIcon[s.sport]} size={16} />
                </span>
                <span class="session__what">
                  <span class="session__title">{s.title}</span>
                  <span class="session__meta">
                    {#if s.done}
                      {s.km.toFixed(1)} km · {clock(s.seconds)} · {pace(s.seconds, s.km, s.sport)}
                      {paceUnit(s.sport)}
                    {:else}
                      Planned · {s.km} km
                    {/if}
                  </span>
                </span>
                <span class="session__end">
                  {#if s.done}
                    <span class="session__done"><Icon name="check" size={14} /> Done</span>
                  {:else if linked === s.id && status !== 'ready'}
                    <span class="session__live"><StatusDot tone="ok" pulse /> Recording</span>
                  {:else}
                    <Button
                      variant="soft"
                      size="sm"
                      icon="play"
                      label="Start"
                      disabled={status !== 'ready'}
                      onclick={() => startPlanned(s)}
                    />
                    <Button
                      variant="soft"
                      size="sm"
                      icon="check"
                      label="Mark {s.title} done as planned"
                      iconOnly
                      onclick={() => markDone(s)}
                    />
                  {/if}
                </span>
              </li>
            {/each}
          </ul>
        </section>
      </div>

      <div class="work">
        <div bind:this={panel} id="train-workout" class="anchor">
          <Layer
            level="panel"
            padding="lg"
            gap="lg"
            as="section"
            aria-labelledby="workout-title"
            data-note="workout"
          >
            <div class="sec-head">
              <div>
                <h2 id="workout-title">Workout</h2>
                <span class="muted">
                  {#if linkedSession}
                    {linkedSession.title} · planned {linkedSession.km} km
                  {:else}
                    A free {sport === 'run' ? 'run' : 'ride'}
                  {/if}
                </span>
              </div>
              {#if status === 'ready'}
                <SegmentedControl
                  label="Sport"
                  size="sm"
                  bind:value={sport}
                  options={[
                    { value: 'run', label: 'Run', icon: 'activity' },
                    { value: 'ride', label: 'Ride', icon: 'bike' },
                  ]}
                />
              {:else}
                <span class="state" role="status">
                  <StatusDot
                    tone={status === 'running' ? 'ok' : 'warn'}
                    pulse={status === 'running'}
                  />
                  {status === 'running' ? 'Recording' : 'Paused'}
                </span>
              {/if}
            </div>

            <div class="readout" class:paused={status === 'paused'}>
              <span class="readout__clock" role="timer" aria-live="off">
                <DotMatrix
                  value={clock(elapsed)}
                  label="Time {clock(elapsed)}"
                  size="inherit"
                  unlit
                />
              </span>
              <dl class="readout__figures">
                <div>
                  <dt>Distance</dt>
                  <dd>
                    <DotMatrix value={km.toFixed(2)} label="{km.toFixed(2)} km" size="md" />
                    <span class="unit">km</span>
                  </dd>
                </div>
                <div>
                  <dt>{sport === 'run' ? 'Pace' : 'Speed'}</dt>
                  <dd>
                    <DotMatrix value={pace(elapsed, km, sport)} size="md" />
                    <span class="unit">{paceUnit(sport)}</span>
                  </dd>
                </div>
                <div>
                  <dt>Laps</dt>
                  <dd><DotMatrix value={laps.length} size="md" /></dd>
                </div>
              </dl>
            </div>

            <ul class="keys" aria-label="Workout controls">
              <li>
                <Button
                  variant="soft"
                  size="xl"
                  icon="flag"
                  label="Lap"
                  iconOnly
                  disabled={status !== 'running'}
                  onclick={lap}
                />
                <span class="key__label" aria-hidden="true">Lap</span>
              </li>
              <li class="key--main">
                <Button
                  variant="primary"
                  size="xl"
                  icon={status === 'running' ? 'pause' : 'play'}
                  label={status === 'running' ? 'Pause' : status === 'paused' ? 'Resume' : 'Start'}
                  iconOnly
                  shimmer={status === 'ready'}
                  onclick={toggleRun}
                />
                <span class="key__label" aria-hidden="true">
                  {status === 'running' ? 'Pause' : status === 'paused' ? 'Resume' : 'Start'}
                </span>
              </li>
              <li>
                <Button
                  variant="soft"
                  size="xl"
                  icon="check"
                  label="Finish and save"
                  iconOnly
                  disabled={elapsed < 1}
                  onclick={finish}
                />
                <span class="key__label" aria-hidden="true">Finish</span>
              </li>
            </ul>

            {#if laps.length}
              <ol class="laps" bind:this={lapList} aria-label="Laps, newest first">
                {#each laps as l (l.n)}
                  <li>
                    <span class="laps__n">Lap {l.n}</span>
                    <span>{l.km.toFixed(1)} km</span>
                    <span class="laps__time">{clock(l.seconds)}</span>
                  </li>
                {/each}
              </ol>
            {/if}
            {#if status === 'paused'}
              <div class="discard">
                <ConfirmButton
                  size="sm"
                  shape="pill"
                  icon="trash"
                  label="Discard"
                  confirmLabel="Discard this workout"
                  onconfirm={reset}
                />
              </div>
            {/if}
          </Layer>
        </div>

        <div id="train-history" class="anchor" data-note="history">
          <ChartCard
            title="Weekly distance"
            sub="The last twelve weeks, this one included"
            value="{doneKm.toFixed(1)} km so far"
          >
            <LineChart
              data={history}
              min={0}
              max={chartMax}
              ticks={chartTicks}
              height={240}
              area
              color="var(--accent)"
              valueLabel="Distance"
              valueFormat={(v) => `${v} km`}
              categoryLabel="Week of"
              label="Kilometres per week"
            />
          </ChartCard>
        </div>
      </div>
    </div>
  </div>
</Page>

<DesignNotes title="Training" {notes} corner="bottom-right" />

<style>
  .shell {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
  }
  .rail {
    position: sticky;
    top: var(--sticky-gap);
    display: flex;
  }
  .rail :global(.layer) {
    min-height: min(34rem, calc(var(--app-height, 100dvh) - 2 * var(--sticky-gap)));
  }
  .logo {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--soft-bg);
    box-shadow: var(--soft-shadow);
    color: var(--accent-ink);
  }
  .main {
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
    min-width: 0;
    padding-block: var(--space-2) var(--space-12);
  }
  .anchor {
    scroll-margin-top: var(--space-6);
    min-width: 0;
  }
  h1 {
    font-size: var(--fs-display);
    font-weight: var(--fw-medium);
    line-height: var(--leading-tight);
  }
  .sub {
    margin-top: var(--space-1);
    color: var(--text-2);
    font-size: var(--fs-md);
  }
  h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .eyebrow {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .sec-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2) var(--space-4);
  }
  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .week {
    display: grid;
    grid-template-columns: minmax(20rem, 26rem) minmax(0, 1fr);
    gap: var(--space-10);
    align-items: start;
  }

  /* Goal ring */
  .goal {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  .goal__dial {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
  .ring {
    position: relative;
    flex: 1;
    max-width: 15rem;
    aspect-ratio: 1;
  }
  .ring svg {
    display: block;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .ring circle {
    fill: none;
    stroke-width: 14;
  }
  .ring__track {
    stroke: var(--fill-off);
  }
  .ring__fill {
    stroke: var(--accent);
    stroke-linecap: round;
    transition:
      stroke-dashoffset var(--motion-slow) var(--ease-out),
      stroke var(--motion-base) var(--ease-out);
  }
  .ring__fill.reached {
    stroke: var(--ok);
  }
  .ring__read {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
  }
  .ring__value {
    font-size: var(--fs-display);
  }
  .ring__value,
  .ring__goal {
    padding: 2px 6px;
    border-radius: var(--radius-sm);
  }
  .ring__goal {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .goal__line {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .goal__line.ok {
    color: var(--ok);
    font-weight: var(--fw-semibold);
  }

  /* Sessions */
  .sessions {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .session {
    display: grid;
    grid-template-columns: 3.25rem auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-2);
    margin-inline: calc(-1 * var(--space-2));
    border-radius: var(--radius-md);
  }
  .session + .session {
    border-top: 1px solid var(--border);
  }
  .session__day {
    display: flex;
    flex-direction: column;
    font-weight: var(--fw-semibold);
    font-size: var(--fs-sm);
  }
  .session__today {
    color: var(--accent-ink);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  .session__icon {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .planned .session__icon {
    background: none;
    box-shadow: inset 0 0 0 1px var(--border-strong);
    color: var(--text-3);
  }
  .session__what {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .session__title {
    font-weight: var(--fw-medium);
  }
  .session__meta {
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .session__end {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .session__done {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--ok);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .session__live {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }

  /* Workout + history */
  .work {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--space-10);
    align-items: start;
  }
  .state {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .readout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
    transition: opacity var(--motion-base) var(--ease-out);
  }
  .readout.paused .readout__clock {
    animation: blink 1.6s steps(2, jump-none) infinite;
  }
  @keyframes blink {
    50% {
      opacity: 0.45;
    }
  }
  .readout__clock {
    font-size: calc(var(--fs-display) * 1.7);
    color: var(--text);
  }
  .readout__figures {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-4);
    width: 100%;
    margin: 0;
  }
  .readout__figures > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }
  .readout__figures dt {
    color: var(--text-2);
    font-size: var(--fs-xs);
  }
  .readout__figures dd {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-1);
    margin: 0;
  }
  .unit {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .keys {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: var(--space-8);
  }
  .keys li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }
  .key--main :global(.btn) {
    transform: scale(1.18);
    margin-bottom: var(--space-2);
  }
  .key__label {
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
  }
  .laps {
    display: flex;
    flex-direction: column;
    max-height: 12rem;
    overflow: auto;
  }
  .laps li {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-2);
    border-radius: var(--radius-sm);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  .laps li + li {
    border-top: 1px solid var(--border);
  }
  .laps__n {
    color: var(--text-2);
  }
  .laps__time {
    font-weight: var(--fw-semibold);
  }
  .discard {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 1200px) {
    .work {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 1000px) {
    .week {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 900px) {
    .shell {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-4);
    }
    .rail {
      z-index: var(--z-front);
    }
    .rail :global(.layer) {
      min-height: 0;
    }
  }
  @media (max-width: 520px) {
    .readout__clock {
      font-size: var(--fs-display);
    }
    .keys {
      gap: var(--space-5);
    }
    .session {
      grid-template-columns: 2.75rem minmax(0, 1fr) auto;
    }
    .session__icon {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .readout.paused .readout__clock {
      animation: none;
      opacity: 0.6;
    }
  }
</style>
