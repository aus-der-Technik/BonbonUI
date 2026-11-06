<script lang="ts">
  /**
   * Example page: a team's deployments. The two environments sit on the ground with the version
   * each one runs in dot-matrix digits, and their deploy and rollback controls sit right there —
   * promoting asks in place, then the rollout counts up under the version it replaces. The
   * pipelines are a list on the ground, one row per branch with its stages; the selected run's
   * steps and live log are the one panel. When main's deploy stage ends, staging's version
   * changes and glows. Storybook only.
   */
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import Select from '../patterns/atoms/Select.svelte';
  import Spinner from '../patterns/atoms/Spinner.svelte';
  import StatusDot from '../patterns/atoms/StatusDot.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import type { IconName } from '../patterns/atoms/icons';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { celebrate } from '../utils/delight';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    branches,
    environments,
    rolloutLog,
    runs as allRuns,
    runTotal,
    stagesFor,
    type Environment,
    type Run,
    type RunStatus,
    type StageId,
  } from './mock-programming';

  interface Props {
    /** The run whose steps and log are open. */
    run?: 'main' | 'failed' | 'passed';
    /** Opens with a production rollout under way. */
    deploying?: boolean;
  }

  let { run: startRun = 'main', deploying = false }: Props = $props();

  type Phase = 'queued' | 'running' | 'passed' | 'failed' | 'skipped' | 'cancelled';

  interface Rollout {
    env: Environment['id'];
    kind: 'deploy' | 'rollback';
    from: string;
    to: string;
    sha: string;
    at: number;
    log: string[];
  }

  const ME = 'Sam Example';
  const startIds = { main: 'r-1288', failed: 'r-1287', passed: 'r-1285' } as const;

  let runs = $state<Run[]>(allRuns.map((r) => structuredClone(r)));
  let envs = $state<Environment[]>(environments.map((e) => structuredClone(e)));
  // svelte-ignore state_referenced_locally
  let selectedId = $state<string>(startIds[startRun]);
  let pickedStage = $state<StageId | null>(null);
  let openSteps = $state<Record<string, boolean>>({});
  let confirming = $state<Environment['id'] | null>(null);
  // svelte-ignore state_referenced_locally
  let rollout = $state<Rollout | null>(deploying ? start('production', 'deploy', 2) : null);
  let newBranch = $state(branches[4] ?? 'main');
  let nextNumber = 1289;
  const versionEls: Record<string, HTMLElement | undefined> = {};

  const selected = $derived(runs.find((r) => r.id === selectedId) ?? runs[0]!);
  const staging = $derived(envs.find((e) => e.id === 'staging')!);
  const production = $derived(envs.find((e) => e.id === 'production')!);
  const runningCount = $derived(runs.filter((r) => r.status === 'running').length);
  const anyRunning = $derived(runningCount > 0);
  const ticking = $derived(anyRunning || rollout !== null);

  // ── Where a run is: everything follows from the seconds it has been going ───────────────

  function spans(run: Run) {
    let t = 0;
    return run.stages.map((stage) => {
      const start = t;
      const steps = stage.steps.map((step) => {
        const s = t;
        t += step.seconds;
        return { step, start: s, end: t };
      });
      return { stage, start, end: t, steps };
    });
  }

  function phase(run: Run, start: number, end: number, failing: boolean, later: boolean): Phase {
    if (run.status === 'failed') return failing ? 'failed' : later ? 'skipped' : 'passed';
    if (run.at >= end) return 'passed';
    if (run.at >= start) return run.status === 'cancelled' ? 'cancelled' : 'running';
    return run.status === 'cancelled' ? 'skipped' : 'queued';
  }

  /** Each stage and step with its phase; a failed run marks the failing one and skips the rest. */
  function timeline(run: Run) {
    const all = spans(run);
    const failStage = all.findIndex((s) => s.stage.steps.some((st) => st.fails));
    return all.map((s, i) => {
      const failIdx = s.stage.steps.findIndex((st) => st.fails);
      return {
        ...s,
        phase: phase(run, s.start, s.end, i === failStage, failStage >= 0 && i > failStage),
        steps: s.steps.map((st, j) => ({
          ...st,
          phase: phase(
            run,
            st.start,
            st.end,
            i === failStage && j === failIdx,
            failStage >= 0 && (i > failStage || (i === failStage && j > failIdx)),
          ),
        })),
      };
    });
  }

  const lines = $derived(timeline(selected));
  /** The stage on show: the one picked, else the one running, failed or last. */
  const shownStage = $derived(
    lines.find((s) => s.stage.id === pickedStage) ??
      lines.find((s) => s.phase === 'running' || s.phase === 'failed' || s.phase === 'cancelled') ??
      lines.at(-1)!,
  );

  /** The part of a step's log written so far. */
  function written(run: Run, st: { step: { log: string[]; seconds: number }; start: number }) {
    const { log, seconds } = st.step;
    if (run.at >= st.start + seconds || run.status === 'failed') return log;
    const share = (run.at - st.start + 1) / seconds;
    return log.slice(0, Math.max(1, Math.ceil(share * log.length)));
  }

  const isOpen = (key: string, p: Phase) =>
    openSteps[key] ?? (p === 'running' || p === 'failed' || p === 'cancelled');

  // ── The clock ────────────────────────────────────────────────────────────────────────────

  function start(env: Environment['id'], kind: Rollout['kind'], at = 0): Rollout {
    const e = envs.find((x) => x.id === env)!;
    const source = kind === 'deploy' ? envs.find((x) => x.id === 'staging')! : e.before[0]!;
    return {
      env,
      kind,
      from: e.version,
      to: source.version,
      sha: source.sha,
      at,
      log: rolloutLog(source.version, e.instances),
    };
  }

  function finishRun(run: Run) {
    run.status = 'passed';
    run.when = 'just now';
    if (!run.ships) return;
    // The deploy stage's effect lands on the environment: staging now runs this version.
    const env = envs.find((e) => e.id === 'staging')!;
    env.before.unshift({ version: env.version, sha: env.sha });
    env.version = run.ships;
    env.sha = run.sha;
    env.deployedBy = `Pipeline ${run.id.slice(2)}`;
    env.deployedAt = 'just now';
  }

  function finishRollout(r: Rollout) {
    const env = envs.find((e) => e.id === r.env)!;
    if (r.kind === 'deploy') env.before.unshift({ version: env.version, sha: env.sha });
    else env.before.shift();
    env.version = r.to;
    env.sha = r.sha;
    env.deployedBy = ME;
    env.deployedAt = 'just now';
    rollout = null;
    const origin = versionEls[r.env];
    // A finished deploy is the end of a task; a rollback is a recovery, so it stays quiet.
    if (r.kind === 'deploy' && origin) celebrate(origin);
  }

  function tick() {
    for (const run of runs) {
      if (run.status !== 'running') continue;
      run.at += 1;
      const failing = spans(run)
        .flatMap((s) => s.steps)
        .find((s) => s.step.fails);
      if (failing && run.at >= failing.end) {
        run.at = failing.end;
        run.status = 'failed';
        run.when = 'just now';
      } else if (run.at >= runTotal(run.stages)) finishRun(run);
    }
    if (rollout) {
      rollout.at += 1;
      if (rollout.at >= rollout.log.length) finishRollout(rollout);
    }
  }

  $effect(() => {
    if (!ticking) return;
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  });

  /** The log follows the running step as it writes, unless you scrolled up to read. */
  function follow(node: HTMLElement, _written: number) {
    node.scrollTop = node.scrollHeight;
    return {
      update() {
        const near = node.scrollHeight - node.scrollTop - node.clientHeight < 80;
        if (near) node.scrollTop = node.scrollHeight;
      },
    };
  }

  // ── Actions ──────────────────────────────────────────────────────────────────────────────

  function select(id: string) {
    selectedId = id;
    pickedStage = null;
  }

  function rerun(run: Run) {
    // The second try gets a warm preview server, so the flaky browser test passes.
    for (const stage of run.stages) for (const step of stage.steps) delete step.fails;
    run.status = 'running';
    run.at = 0;
    run.when = 'now';
    select(run.id);
  }

  function cancel(run: Run) {
    run.status = 'cancelled';
    run.when = 'just now';
  }

  function startPipeline(close: () => void) {
    const id = `r-${nextNumber++}`;
    const stages = stagesFor(newBranch);
    runs.unshift({
      id,
      branch: newBranch,
      sha: Math.random().toString(16).slice(2, 9),
      message: 'Started by hand',
      author: ME,
      when: 'now',
      status: 'running',
      at: 0,
      stages,
      ...(newBranch === 'main' ? { ships: '1.5.1' } : {}),
    });
    select(id);
    close();
  }

  function promote() {
    confirming = null;
    rollout = start('production', 'deploy');
  }

  function rollBack(env: Environment['id']) {
    confirming = null;
    rollout = start(env, 'rollback');
  }

  // ── Looks ────────────────────────────────────────────────────────────────────────────────

  const clock = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const phaseIcon: Record<Phase, IconName> = {
    queued: 'circle',
    running: 'clock',
    passed: 'check',
    failed: 'close',
    skipped: 'minus',
    cancelled: 'x-circle',
  };
  const phaseLabel: Record<Phase, string> = {
    queued: 'waiting',
    running: 'running',
    passed: 'passed',
    failed: 'failed',
    skipped: 'skipped',
    cancelled: 'cancelled',
  };
  const runLabel: Record<RunStatus, string> = {
    queued: 'Waiting',
    running: 'Running',
    passed: 'Passed',
    failed: 'Failed',
    cancelled: 'Cancelled',
  };
  const runTone = (s: RunStatus) =>
    s === 'passed' ? 'ok' : s === 'failed' ? 'danger' : s === 'running' ? 'accent' : 'neutral';

  const canPromote = $derived(staging.version !== production.version && !rollout);

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'What runs where, at a glance',
      body: 'The two environments sit on the ground, with the version each one runs in dot-matrix digits — no cards, just a hairline between them.',
      target: '[data-note="envs"]',
    },
    {
      principle: 'locality',
      title: 'Deploy and roll back on the environment',
      body: '“Promote” sits under the version it replaces and asks right there; the rollout then counts up in the same spot. “Roll back” arms in place too, and names the version you would return to.',
      target: '[data-note="promote"]',
    },
    {
      principle: 'cues',
      title: 'The deploy stage changes staging, visibly',
      body: 'When main’s last stage finishes, staging’s version flips and glows: the cause in the list, the effect where it lands.',
      target: '[data-note="staging"]',
    },
    {
      principle: 'locality',
      title: '“Run pipeline” sits on the list it adds to',
      body: 'It opens from its button with the branch to build. A failed run carries its own “Run again”, a running one its “Cancel”.',
      target: '[data-note="pipelines"]',
    },
    {
      principle: 'friendly',
      title: 'One panel: the run you are reading',
      body: 'Stages, steps and the live log of the selected run. The running step opens itself and the log follows it, unless you scroll up to read.',
      target: '[data-note="log"]',
    },
  ];
</script>

{#snippet phaseMark(p: Phase, size = 14)}
  <span class="mark mark--{p}" aria-hidden="true">
    {#if p === 'running'}<Spinner {size} />{:else}<Icon name={phaseIcon[p]} {size} />{/if}
  </span>
{/snippet}

<Page title="web-shop" subtitle="Deployments" width="wide" gap="xl">
  {#snippet actions()}
    <Button
      variant="ghost"
      shape="pill"
      icon="git-branch"
      label={runningCount ? `${runningCount} running` : 'Nothing running'}
      disabled={!runningCount}
      collapse
      onclick={() => {
        const r = runs.find((x) => x.status === 'running');
        if (r) select(r.id);
      }}
    />
  {/snippet}

  <section class="envs" aria-labelledby="envs-title" data-note="envs">
    <h2 id="envs-title" class="eyebrow">Environments</h2>
    <div class="env-row">
      {#each envs as env (env.id)}
        {@const live = rollout?.env === env.id ? rollout : null}
        <article
          class="env"
          aria-labelledby="env-{env.id}"
          data-note={env.id === 'staging' ? 'staging' : undefined}
        >
          <header class="env__head">
            <h3 id="env-{env.id}">{env.name}</h3>
            <span class="env__health">
              <StatusDot tone={live ? 'accent' : env.health} pulse={!!live} />
              {live
                ? live.kind === 'deploy'
                  ? 'Rolling out'
                  : 'Rolling back'
                : `Healthy · ${env.instances} instances`}
            </span>
            <span class="env__url">{env.url}</span>
          </header>

          <div class="env__version" bind:this={versionEls[env.id]}>
            <span class="version" use:changeCue={env.version}>
              <DotMatrix value={env.version} label="Version {env.version}" size="lg" />
            </span>
            {#if live}
              <span class="arrow" aria-hidden="true"><Icon name="arrow-right" size={18} /></span>
              <span class="version version--next">
                <DotMatrix value={live.to} label="to version {live.to}" size="lg" />
              </span>
            {/if}
          </div>
          <p class="env__meta">
            <code>{env.sha}</code> · {env.deployedBy} · {env.deployedAt}
          </p>

          {#if live}
            <div class="rollout" role="status">
              <div class="rollout__row">
                <ProgressBar
                  value={Math.max(0, live.at - 1)}
                  max={env.instances}
                  label="{live.kind === 'deploy' ? 'Rollout' : 'Rollback'} of {live.to}"
                  valueLabel="{Math.min(
                    env.instances,
                    Math.max(0, live.at - 1),
                  )} of {env.instances} instances"
                  showValue
                  size="sm"
                />
                <span class="rollout__timer" role="timer" aria-live="off">
                  <DotMatrix value={clock(live.at)} label="{live.at} seconds" size="sm" />
                </span>
              </div>
              <ol class="rollout__log" aria-label="Rollout log">
                {#each live.log.slice(Math.max(0, live.at - 3), live.at) as line (line)}
                  <li>{line}</li>
                {/each}
              </ol>
            </div>
          {:else if confirming === env.id}
            <div class="confirm" role="group" aria-label="Confirm the deploy">
              <p>
                {env.name} moves from <b>{env.version}</b> to <b>{staging.version}</b>, one instance
                at a time. Shoppers keep their carts and sessions.
              </p>
              <div class="actions">
                <Button variant="soft" label="Cancel" onclick={() => (confirming = null)} />
                <Button
                  variant="primary"
                  icon="rocket"
                  label="Deploy {staging.version}"
                  onclick={promote}
                />
              </div>
            </div>
          {:else}
            <div class="actions" data-note={env.id === 'production' ? 'promote' : undefined}>
              {#if env.id === 'production'}
                <Button
                  variant="primary"
                  icon="rocket"
                  label="Promote {staging.version}"
                  disabled={!canPromote}
                  onclick={() => (confirming = 'production')}
                />
              {/if}
              <ConfirmButton
                icon="undo"
                label="Roll back"
                confirmLabel="Roll back to {env.before[0]?.version}"
                disabled={!!rollout || !env.before.length}
                onconfirm={() => rollBack(env.id)}
              />
            </div>
          {/if}
        </article>
      {/each}
    </div>
  </section>

  <div class="work">
    <section class="pipelines" aria-labelledby="runs-title" data-note="pipelines">
      <header class="list-head">
        <h2 id="runs-title">Pipelines</h2>
        <Popover placement="bottom-end" width="18rem" title="Run a pipeline" autofocus>
          {#snippet trigger(props)}
            <Button variant="soft" icon="play" label="Run pipeline" size="sm" {...props} />
          {/snippet}
          {#snippet children(close)}
            <form
              class="run-form"
              onsubmit={(event) => {
                event.preventDefault();
                startPipeline(close);
              }}
            >
              <label class="field">
                <span>Branch</span>
                <Select
                  bind:value={newBranch}
                  options={branches.map((b) => ({ value: b, label: b }))}
                />
              </label>
              <p class="hint">
                {newBranch === 'main'
                  ? 'Builds, tests and ships to staging.'
                  : 'Builds and tests; nothing is deployed.'}
              </p>
              <Button type="submit" variant="soft" icon="play" label="Run" block />
            </form>
          {/snippet}
        </Popover>
      </header>

      <ul class="runs">
        {#each runs as run (run.id)}
          {@const t = timeline(run)}
          <li class="run" class:run--selected={run.id === selectedId}>
            <button
              type="button"
              class="run__main"
              aria-current={run.id === selectedId ? 'true' : undefined}
              onclick={() => select(run.id)}
            >
              <span class="run__title">
                <Icon name="git-branch" size={15} />
                <span class="branch">{run.branch}</span>
                <span class="status status--{runTone(run.status)}" use:changeCue={run.status}>
                  {runLabel[run.status]}
                </span>
              </span>
              <span class="run__sub">
                <code>{run.sha}</code>
                <span class="msg">{run.message}</span>
              </span>
              <span class="run__by">
                <Avatar name={run.author} size={18} color="auto" />
                {run.author} · {run.when}
              </span>
              <span class="stages" aria-label="Stages">
                {#each t as s, i (s.stage.id)}
                  {#if i > 0}<span class="link link--{s.phase}" aria-hidden="true"></span>{/if}
                  <span class="chip chip--{s.phase}">
                    {@render phaseMark(s.phase, 12)}
                    {s.stage.label}
                    <span class="sr">{phaseLabel[s.phase]}</span>
                  </span>
                {/each}
              </span>
            </button>
            <div class="run__side">
              <span class="run__timer" class:live={run.status === 'running'}>
                <DotMatrix value={clock(run.at)} label="{run.at} seconds" size="sm" />
              </span>
              {#if run.status === 'running'}
                <Button
                  variant="soft"
                  size="sm"
                  icon="close"
                  label="Cancel {run.branch}"
                  iconOnly
                  onclick={() => cancel(run)}
                />
              {:else if run.status === 'failed' || run.status === 'cancelled'}
                <Button
                  variant="soft"
                  size="sm"
                  icon="refresh"
                  label="Run {run.branch} again"
                  iconOnly
                  onclick={() => rerun(run)}
                />
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    </section>

    <Layer
      level="panel"
      padding="lg"
      gap="md"
      as="section"
      aria-labelledby="run-title"
      class="detail"
    >
      <header class="detail__head">
        <div class="detail__title">
          <h2 id="run-title">
            <Icon name="git-branch" size={18} />{selected.branch}
          </h2>
          <p class="muted">
            Pipeline {selected.id.slice(2)} · <code>{selected.sha}</code> · {selected.message}
          </p>
        </div>
        <span class="detail__timer status--{runTone(selected.status)}" role="timer" aria-live="off">
          <DotMatrix value={clock(selected.at)} label="{selected.at} seconds" size="md" />
        </span>
      </header>

      <div class="stage-tabs" role="tablist" aria-label="Stages of pipeline {selected.id.slice(2)}">
        {#each lines as s (s.stage.id)}
          <button
            type="button"
            role="tab"
            class="stage-tab"
            aria-selected={s.stage.id === shownStage.stage.id}
            onclick={() => (pickedStage = s.stage.id)}
          >
            {@render phaseMark(s.phase)}
            {s.stage.label}
          </button>
        {/each}
      </div>

      <ol class="steps" data-note="log">
        {#each shownStage.steps as st (st.step.name)}
          {@const key = `${selected.id}:${st.step.name}`}
          {@const open = isOpen(key, st.phase)}
          {@const out =
            st.phase === 'queued' || st.phase === 'skipped' ? [] : written(selected, st)}
          <li class="step step--{st.phase}">
            <button
              type="button"
              class="step__head"
              aria-expanded={open}
              disabled={!out.length}
              onclick={() => (openSteps[key] = !open)}
            >
              {@render phaseMark(st.phase)}
              <span class="step__name">{st.step.name}</span>
              <span class="step__time">
                {st.phase === 'queued' || st.phase === 'skipped'
                  ? phaseLabel[st.phase]
                  : clock(Math.min(st.step.seconds, Math.max(0, selected.at - st.start)))}
              </span>
              {#if out.length}
                <span class="chev" class:open><Icon name="chevron-down" size={14} /></span>
              {/if}
            </button>
            {#if open && out.length}
              <div class="log" use:follow={out.length}>
                {#each out as line, n (n)}
                  <div
                    class="log__line"
                    class:bad={st.phase === 'failed' && /fail|Timed out/.test(line)}
                  >
                    <span class="log__no">{n + 1}</span><span class="log__text">{line}</span>
                  </div>
                {/each}
                {#if st.phase === 'running'}<span class="cursor" aria-hidden="true"></span>{/if}
              </div>
            {/if}
          </li>
        {/each}
      </ol>

      {#if selected.status === 'failed'}
        <div class="detail__foot">
          <span class="muted">
            Failed in {shownStage.stage.label.toLowerCase()} — the preview server started slowly.
          </span>
          <Button variant="soft" icon="refresh" label="Run again" onclick={() => rerun(selected)} />
        </div>
      {/if}
    </Layer>
  </div>
</Page>

<DesignNotes title="Deployments" {notes} corner="bottom-left" />

<style>
  .eyebrow {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  code {
    font-family: var(--font-mono);
    font-size: 0.92em;
    color: var(--text-2);
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* Environments: two columns on the ground, a hairline between them. */
  .envs {
    display: grid;
    gap: var(--space-4);
    padding-top: var(--space-4);
  }
  .env-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-8);
  }
  .env {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
    padding-left: var(--space-5);
    border-left: 1px solid var(--border-strong);
  }
  .env__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-1) var(--space-3);
  }
  .env__head h3 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .env__health {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .env__url {
    margin-left: auto;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .env__version {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 3.25rem;
  }
  .version {
    display: inline-flex;
    padding: 4px 8px;
    margin: -4px -8px;
    border-radius: var(--radius-md);
  }
  .version--next {
    color: var(--accent-ink);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .arrow {
    display: inline-flex;
    color: var(--text-3);
  }
  .env__meta {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-1);
  }
  .confirm,
  .rollout {
    display: grid;
    gap: var(--space-3);
    max-width: 30rem;
    transform-origin: top left;
    animation: grow var(--motion-base) var(--ease-out);
  }
  .confirm p {
    color: var(--text-2);
    font-size: var(--fs-sm);
    line-height: var(--leading-body);
  }
  .confirm b {
    color: var(--text);
    font-family: var(--font-mono);
    font-weight: var(--fw-semibold);
  }
  @keyframes grow {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.98);
    }
  }
  .rollout__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: var(--space-4);
  }
  .rollout__timer {
    color: var(--accent-ink);
  }
  .rollout__log {
    display: grid;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .rollout__log li:last-child {
    color: var(--text-2);
  }

  .work {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
  }

  /* Pipelines: a list on the ground; rows are parted by hairlines, the open one is selected. */
  .pipelines {
    display: grid;
    gap: var(--space-3);
    min-width: 0;
  }
  .list-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .list-head h2,
  .detail__title h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .run-form {
    display: grid;
    gap: var(--space-3);
  }
  .field {
    display: grid;
    gap: var(--space-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .hint {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .runs {
    display: grid;
    margin: 0 calc(-1 * var(--space-3));
    padding: 0;
    list-style: none;
  }
  .run {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-3);
    padding-right: var(--space-3);
    border-radius: var(--radius-lg);
    transition: background var(--motion-quick) var(--ease-out);
  }
  .run + .run::before {
    content: '';
    position: absolute;
    top: 0;
    left: var(--space-3);
    right: var(--space-3);
    border-top: 1px solid var(--border);
  }
  .run:hover {
    background: var(--fill-subtle);
  }
  .run--selected,
  .run--selected:hover {
    background: var(--layer-selected-bg);
    box-shadow: inset 0 0 0 1px var(--layer-selected-border);
  }
  .run--selected::before,
  .run--selected + .run::before {
    opacity: 0;
  }
  .run__main {
    display: grid;
    gap: var(--space-1);
    min-width: 0;
    padding: var(--space-3);
    border: 0;
    border-radius: var(--radius-lg);
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .run__main:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .run__title {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    color: var(--text-2);
  }
  .branch {
    overflow: hidden;
    color: var(--text);
    font-family: var(--font-mono);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .status {
    padding: 1px 6px;
    border-radius: var(--radius-sm);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
  }
  .status--ok {
    color: var(--ok);
  }
  .status--danger {
    color: var(--danger);
  }
  .status--accent {
    color: var(--accent-ink);
  }
  .status--neutral {
    color: var(--text-3);
  }
  .run__sub {
    display: flex;
    gap: var(--space-2);
    min-width: 0;
    font-size: var(--fs-sm);
  }
  .msg {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .run__by {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .stages {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: var(--space-2);
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 2px 9px 2px 5px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
  }
  .chip--passed {
    background: color-mix(in srgb, var(--ok) 12%, transparent);
    color: var(--text);
  }
  .chip--failed {
    background: color-mix(in srgb, var(--danger) 14%, transparent);
    color: var(--danger);
  }
  .chip--running {
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .chip--skipped,
  .chip--queued {
    color: var(--text-3);
  }
  .link {
    width: 14px;
    height: 2px;
    border-radius: 1px;
    background: var(--border-strong);
  }
  .link--passed,
  .link--running,
  .link--failed {
    background: var(--text-3);
  }
  .mark {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
  .mark--passed {
    background: var(--ok);
    color: var(--on-ok);
  }
  .mark--failed {
    background: var(--danger);
    color: var(--on-danger);
  }
  .mark--running {
    color: var(--accent-ink);
  }
  .mark--queued,
  .mark--skipped,
  .mark--cancelled {
    color: var(--text-3);
  }
  .run__side {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .run__timer {
    color: var(--text-3);
  }
  .run__timer.live {
    color: var(--accent-ink);
  }

  /* The one panel: the open run. */
  .work :global(.detail) {
    position: sticky;
    top: calc(var(--page-top, 0px) + var(--space-4));
    min-width: 0;
  }
  .detail__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
  }
  .detail__title {
    display: grid;
    gap: var(--space-1);
    min-width: 0;
  }
  .detail__title h2 {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-mono);
    overflow-wrap: anywhere;
  }
  .detail__title h2 :global(.icon) {
    color: var(--text-3);
  }
  .detail__timer {
    flex: none;
    padding-top: var(--space-1);
  }
  .stage-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    padding: 3px;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    width: fit-content;
  }
  .stage-tab {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-sm);
    padding: 0 var(--space-3) 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition:
      background var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .stage-tab[aria-selected='true'] {
    background: var(--layer-panel-bg);
    box-shadow: var(--soft-shadow);
    color: var(--text);
  }
  .stage-tab:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .steps {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .step__head {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    min-height: var(--control-md);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    color: var(--text);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .step__head:hover:not(:disabled) {
    background: var(--fill-subtle);
  }
  .step__head:disabled {
    cursor: default;
    color: var(--text-3);
  }
  .step__head:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .step__name {
    flex: 1;
    min-width: 0;
    font-weight: var(--fw-medium);
  }
  .step__time {
    color: var(--text-3);
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .chev {
    display: inline-flex;
    color: var(--text-3);
    transition: transform var(--motion-base) var(--ease-out);
  }
  .chev.open {
    transform: rotate(180deg);
  }
  .log {
    max-height: 15rem;
    overflow: auto;
    margin: var(--space-1) 0 var(--space-2);
    padding: var(--space-3) 0;
    border-radius: var(--radius-md);
    background: var(--editor-bg, var(--fill-subtle));
    box-shadow: inset 0 0 0 1px var(--border);
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    line-height: 1.7;
  }
  .log__line {
    display: grid;
    grid-template-columns: 3rem minmax(0, 1fr);
    padding-right: var(--space-3);
    animation: bb-rise var(--motion-quick) var(--ease-out);
  }
  .log__no {
    padding-right: var(--space-3);
    color: var(--text-3);
    text-align: right;
    user-select: none;
  }
  .log__text {
    color: var(--text-2);
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
  .log__line.bad {
    background: color-mix(in srgb, var(--danger) 10%, transparent);
  }
  .log__line.bad .log__text {
    color: var(--danger);
  }
  .cursor {
    display: block;
    width: 7px;
    height: 13px;
    margin: 2px 0 0 3.75rem;
    background: var(--accent);
    animation: blink 1s steps(2, start) infinite;
  }
  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
  .detail__foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    padding-top: var(--space-3);
    border-top: 1px solid var(--border);
  }

  @media (max-width: 1100px) {
    .work {
      grid-template-columns: minmax(0, 1fr);
    }
    .work :global(.detail) {
      position: static;
    }
  }
  @media (max-width: 720px) {
    .env-row {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-6);
    }
    .env__url {
      margin-left: 0;
      flex-basis: 100%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .confirm,
    .rollout,
    .version--next,
    .log__line {
      animation: none;
    }
    .cursor {
      animation: none;
    }
  }
</style>
