<script lang="ts">
  /** Example page: the home dashboard of an operations suite, with mock data (Storybook only). */
  import { onMount } from 'svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import DropdownMenu from '../patterns/molecules/DropdownMenu.svelte';
  import JobStatus, { type JobState } from '../patterns/molecules/JobStatus.svelte';
  import KpiTile from '../patterns/molecules/KpiTile.svelte';
  import RefreshButton from '../patterns/molecules/RefreshButton.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import UserMenu from '../patterns/molecules/UserMenu.svelte';
  import ActivityLog from '../patterns/organisms/ActivityLog.svelte';
  import ChartCard from '../patterns/organisms/ChartCard.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import DivergingBarChart from '../patterns/organisms/DivergingBarChart.svelte';
  import LineChart from '../patterns/organisms/LineChart.svelte';
  import ResourceList, { type ResourceStatus } from '../patterns/organisms/ResourceList.svelte';
  import { greeting } from '../utils/delight';
  import { dateTimeFormat, decimalFormat, numberFormat, percentFormat } from '../utils/format';
  import { every } from '../utils/poll';
  import {
    OPS_JOB_TYPES,
    opsActivity,
    opsDaily,
    opsJobs,
    opsServices,
    type OpsJob,
    type OpsJobStatus,
    type OpsJobType,
    type OpsService,
  } from './mock';

  interface Props {
    /** Name in the greeting. */
    name?: string;
  }

  let { name = 'Jane' }: Props = $props();

  let jobs = $state<OpsJob[]>(opsJobs());
  let days = $state(14);
  let filter = $state<'all' | 'active' | 'failed'>('all');
  let query = $state('');
  let loading = $state(false);
  const services = opsServices();
  // The greeting follows the clock; the dashboard's figures stay those of the mock data.
  const now = new Date();
  const hello = $derived(greeting(now, name));
  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now);

  const daily = $derived(opsDaily(days));
  const succeeded = $derived(daily.reduce((s, d) => s + d.succeeded, 0));
  const failed = $derived(daily.reduce((s, d) => s + d.failed, 0));
  const rated = $derived(daily.reduce((s, d) => s + d.rated, 0));
  const ratingSum = $derived(daily.reduce((s, d) => s + (d.rating ?? 0) * d.rated, 0));
  const active = $derived(jobs.filter((j) => j.status === 'running' || j.status === 'queued'));
  const failing = $derived(jobs.filter((j) => j.status === 'failed'));

  const needle = $derived(query.trim().toLowerCase());
  const shown = $derived(
    jobs.filter(
      (j) =>
        (filter === 'all' || (filter === 'failed' ? j.status === 'failed' : active.includes(j))) &&
        (!needle || j.name.toLowerCase().includes(needle) || j.id.includes(needle)),
    ),
  );

  const columns: Column[] = [
    { key: 'name', label: 'Job' },
    { key: 'type', label: 'Type', nowrap: true, hideOnMobile: true },
    { key: 'status', label: 'Status' },
    { key: 'startedAt', label: 'Started', nowrap: true, hideOnMobile: true },
    { key: 'duration', label: 'Duration', align: 'end', nowrap: true, hideOnMobile: true },
  ];

  const JOB_STATE: Record<OpsJobStatus, JobState> = {
    queued: 'queued',
    running: 'running',
    done: 'done',
    failed: 'failed',
    cached: 'cached',
  };
  const SERVICE_STATUS: Record<OpsService['status'], ResourceStatus> = {
    up: { label: 'Operational', tone: 'live' },
    degraded: { label: 'Degraded', tone: 'draft' },
    down: { label: 'Down', tone: 'danger' },
    maintenance: { label: 'Maintenance', tone: 'info', busy: true },
  };

  // Running jobs make progress between polls; a queued one starts once a slot is free.
  onMount(() =>
    every(() => {
      jobs = jobs.map((j) => {
        if (j.status === 'queued') return { ...j, status: 'running' };
        if (j.status !== 'running') return j;
        const done = Math.min(j.total, j.done + Math.ceil(j.total / 12));
        return done >= j.total ? { ...j, done, status: 'done', duration: 312 } : { ...j, done };
      });
    }, 2000),
  );

  function refresh() {
    loading = true;
    setTimeout(() => (loading = false), 600);
  }

  function retry(job: OpsJob) {
    jobs = jobs.map((j) =>
      j.id === job.id ? { ...j, status: 'queued', done: 0, duration: null } : j,
    );
  }

  function start(type: OpsJobType) {
    const job: OpsJob = {
      id: `job_${Date.now().toString(16).slice(-5)}`,
      name: `New ${OPS_JOB_TYPES[type].toLowerCase()}`,
      type,
      status: 'queued',
      owner: 'jane.doe@example.com',
      startedAt: new Date().toISOString(),
      duration: null,
      done: 0,
      total: 24,
    };
    jobs = [job, ...jobs];
    filter = 'all';
  }

  const duration = (seconds: number | null) =>
    seconds == null
      ? '—'
      : `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;
</script>

{#snippet cell(job: OpsJob, column: Column)}
  {#if column.key === 'name'}
    <Stack gap="xs">
      <span class="job-name">{job.name}</span>
      <span class="mono">{job.id} · {job.owner}</span>
    </Stack>
  {:else if column.key === 'type'}
    <Tag label={OPS_JOB_TYPES[job.type]} />
  {:else if column.key === 'status'}
    <JobStatus
      status={JOB_STATE[job.status]}
      done={job.done}
      total={job.status === 'running' || job.status === 'failed' ? job.total : undefined}
    />
  {:else if column.key === 'startedAt'}
    <span class="muted">{dateTimeFormat.format(new Date(job.startedAt))}</span>
  {:else}
    <span class="figure">{duration(job.duration)}</span>
  {/if}
{/snippet}

{#snippet detail(job: OpsJob)}
  <Stack gap="sm" align="start">
    {#if job.error}<Alert message={job.error} />{/if}
    <Row gap="sm">
      {#if job.status === 'failed'}
        <Button
          size="sm"
          variant="primary"
          icon="refresh"
          label="Retry"
          onclick={() => retry(job)}
        />
      {/if}
      <Button size="sm" icon="external" label="Open job" href="#{job.id}" />
      <Button size="sm" icon="download" label="Logs" href="#{job.id}/logs" />
    </Row>
  </Stack>
{/snippet}

{#snippet aside()}
  <Stack>
    <Section level="panel" title="Services" heading={3}>
      <ResourceList
        items={services}
        key={(s) => s.id}
        title={(s) => s.name}
        meta={(s) => s.detail}
        status={(s) => SERVICE_STATUS[s.status]}
        label="Services"
      />
    </Section>
    <Section level="panel" title="Activity" heading={3}>
      <ActivityLog entries={opsActivity()} label="Recent activity" />
    </Section>
  </Stack>
{/snippet}

<Page title="Operations" subtitle="jobs & services" {aside} footer="Example Corp · internal">
  {#snippet actions()}
    <RefreshButton live {loading} onclick={refresh} />
    <DropdownMenu
      label="New job"
      icon="plus"
      iconOnly={false}
      variant="primary"
      shape="pill"
      size="md"
      items={(Object.keys(OPS_JOB_TYPES) as OpsJobType[]).map((type) => ({
        label: OPS_JOB_TYPES[type],
        onselect: () => start(type),
      }))}
    />
    <UserMenu email="jane.doe@example.com" name="Jane Doe" onsignout={() => {}} />
  {/snippet}

  <Section
    eyebrow={today}
    title={hello.text}
    description="{active.length} jobs running or queued · {failing.length} failed and waiting for a retry. {hello.wink}"
  >
    {#snippet actions()}
      <SegmentedControl
        size="sm"
        label="Time range"
        options={[
          { value: 7, label: '7 days' },
          { value: 14, label: '14 days' },
          { value: 30, label: '30 days' },
        ]}
        bind:value={days}
      />
    {/snippet}
  </Section>

  <Grid columns={4} min="9rem" aria-label="Key figures">
    <KpiTile
      label="Jobs finished"
      value={numberFormat.format(succeeded + failed)}
      detail="{numberFormat.format(failed)} failed · last {days} days"
      meter={[
        { value: succeeded, color: 'var(--ok)' },
        { value: failed, color: 'var(--danger)' },
      ]}
    />
    <KpiTile
      label="Success rate"
      value={percentFormat.format(succeeded / (succeeded + failed || 1))}
      detail="target 97 %"
    />
    <KpiTile
      label="Documents rated"
      value={numberFormat.format(rated)}
      detail="average {decimalFormat.format(ratingSum / (rated || 1))} ★"
    />
    <KpiTile label="Queue" value={active.length} detail="jobs running or waiting" />
  </Grid>

  <Grid columns="3fr 2fr" collapse="lg">
    <ChartCard
      title="Jobs per day"
      sub="Succeeded above the line, failed below"
      legend={[
        { label: 'Succeeded', color: 'var(--up)' },
        { label: 'Failed', color: 'var(--down)' },
      ]}
    >
      <DivergingBarChart
        data={daily.map((d) => ({
          label: d.label,
          title: d.title,
          up: d.succeeded,
          down: d.failed,
        }))}
        upLabel="Succeeded"
        downLabel="Failed"
      />
    </ChartCard>
    <ChartCard title="Average rating" sub="Quality judge, per day">
      <LineChart
        data={daily.map((d) => ({
          label: d.label,
          title: d.title,
          value: d.rating,
          count: d.rated,
        }))}
        min={1}
        max={5}
        tickFormat={(v) => `${v}★`}
        valueFormat={(v) => `${decimalFormat.format(v)} ★`}
        valueLabel="Average"
        countLabel="Rated"
      />
    </ChartCard>
  </Grid>

  <Section level="panel" title="Jobs" description="Open a row for its error, logs and a retry.">
    {#snippet actions()}
      <SearchField label="Search jobs" placeholder="Name or id" bind:value={query} />
      <SegmentedControl
        size="sm"
        label="Show"
        options={[
          { value: 'all', label: 'All' },
          { value: 'active', label: `Active · ${active.length}` },
          { value: 'failed', label: `Failed · ${failing.length}` },
        ]}
        bind:value={filter}
      />
    {/snippet}
    <DataTable
      {columns}
      rows={shown}
      rowKey={(j) => j.id}
      {cell}
      {detail}
      singleOpen
      emptyText="No jobs match — try fewer words."
    />
  </Section>
</Page>

<style>
  .job-name {
    font-weight: var(--fw-semibold);
  }
  .mono {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .figure {
    font-variant-numeric: tabular-nums;
  }
</style>
