<script lang="ts">
  /**
   * Admin console · Overview (Storybook only): jobs and user feedback on one screen. The time
   * range in the header changes every figure; everything else acts on the panel it sits on — the
   * charts switch their own series, "New job" adds to the jobs table, the feedback filters and
   * "Add feedback" sit on the feedback list. New rows glow where they land.
   */
  import { onMount } from 'svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import Checkbox from '../patterns/atoms/Checkbox.svelte';
  import LoadingBar from '../patterns/atoms/LoadingBar.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import DetailList, { type DetailItem } from '../patterns/molecules/DetailList.svelte';
  import DropdownMenu from '../patterns/molecules/DropdownMenu.svelte';
  import JobStatus, { type JobState } from '../patterns/molecules/JobStatus.svelte';
  import KpiTile from '../patterns/molecules/KpiTile.svelte';
  import MultiSelect, { type MultiGroup } from '../patterns/molecules/MultiSelect.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import RatingDisplay from '../patterns/molecules/RatingDisplay.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import ActivityLog from '../patterns/organisms/ActivityLog.svelte';
  import ChartCard from '../patterns/organisms/ChartCard.svelte';
  import DataTable, { type Column, type SortOrder } from '../patterns/organisms/DataTable.svelte';
  import DivergingBarChart from '../patterns/organisms/DivergingBarChart.svelte';
  import FeedbackDialog, { type FeedbackDraft } from '../patterns/organisms/FeedbackDialog.svelte';
  import HorizontalBarChart from '../patterns/organisms/HorizontalBarChart.svelte';
  import LineChart from '../patterns/organisms/LineChart.svelte';
  import ResourceList, { type ResourceStatus } from '../patterns/organisms/ResourceList.svelte';
  import { greeting } from '../utils/delight';
  import {
    dateTimeFormat,
    decimalFormat,
    numberFormat,
    percentFormat,
    starLabel,
  } from '../utils/format';
  import { every } from '../utils/poll';
  import AdminHead from './AdminHead.svelte';
  import { later, type SectionProps } from './admin';
  import {
    OPS_JOB_TYPES,
    dailyStats,
    feedbackItems,
    opsActivity,
    opsDaily,
    opsJobs,
    opsServices,
    starDistribution,
    toAverage,
    toDiverging,
    type FeedbackItem,
    type OpsJob,
    type OpsJobStatus,
    type OpsJobType,
    type OpsService,
  } from './mock';

  interface Props extends SectionProps {
    /** Name in the greeting. */
    name?: string;
  }

  let { name = 'Jane', notify, onnavigate }: Props = $props();

  const FEEDBACK_PAGE = 10;
  const RANGES = [7, 14, 30, 90] as const;

  let days = $state<number>(14);
  let loading = $state(false);
  let perDay = $state<'jobs' | 'feedback'>('jobs');
  let ratingOf = $state<'judge' | 'users'>('judge');
  // The row that just arrived or changed: it glows once.
  let glow = $state<string | null>(null);
  let glowTimer: ReturnType<typeof setTimeout> | undefined;

  // The greeting follows the clock; the figures stay those of the mock data.
  const now = new Date();
  const hello = $derived(greeting(now, name));
  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now);

  // ---- figures for the range
  const daily = $derived(opsDaily(days));
  const feedbackDaily = $derived(dailyStats(days, days));
  const succeeded = $derived(daily.reduce((s, d) => s + d.succeeded, 0));
  const failedJobs = $derived(daily.reduce((s, d) => s + d.failed, 0));
  const rated = $derived(daily.reduce((s, d) => s + d.rated, 0));
  const ratingSum = $derived(daily.reduce((s, d) => s + (d.rating ?? 0) * d.rated, 0));
  const thumbsUp = $derived(feedbackDaily.reduce((s, d) => s + d.thumbsUp, 0));
  const thumbsDown = $derived(feedbackDaily.reduce((s, d) => s + d.thumbsDown, 0));
  const starCount = $derived(feedbackDaily.reduce((s, d) => s + d.stars, 0));
  const starSum = $derived(feedbackDaily.reduce((s, d) => s + d.starsSum, 0));
  const rangeLabel = $derived(`last ${days} days`);

  function refresh() {
    loading = true;
    setTimeout(() => (loading = false), 700);
  }

  function flash(id: string) {
    clearTimeout(glowTimer);
    glow = id;
    glowTimer = setTimeout(() => (glow = null), 900);
  }

  // ---- jobs
  let jobs = $state<OpsJob[]>(opsJobs());
  let jobFilter = $state<'all' | 'active' | 'failed'>('all');
  let jobQuery = $state('');
  const activeJobs = $derived(jobs.filter((j) => j.status === 'running' || j.status === 'queued'));
  const failingJobs = $derived(jobs.filter((j) => j.status === 'failed'));
  const jobNeedle = $derived(jobQuery.trim().toLowerCase());
  const shownJobs = $derived(
    jobs.filter(
      (j) =>
        (jobFilter === 'all' ||
          (jobFilter === 'failed' ? j.status === 'failed' : activeJobs.includes(j))) &&
        (!jobNeedle || j.name.toLowerCase().includes(jobNeedle) || j.id.includes(jobNeedle)),
    ),
  );
  const jobColumns: Column[] = [
    { key: 'name', label: 'Job' },
    { key: 'type', label: 'Type', nowrap: true, hideOnMobile: true },
    { key: 'status', label: 'Status' },
    { key: 'startedAt', label: 'Started', nowrap: true, hideOnMobile: true },
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
  const services = opsServices();

  // Running jobs make progress between polls; a queued one starts once a slot is free.
  onMount(() => {
    const stop = every(() => {
      jobs = jobs.map((j) => {
        if (j.status === 'queued') return { ...j, status: 'running' };
        if (j.status !== 'running') return j;
        const done = Math.min(j.total, j.done + Math.ceil(j.total / 12));
        return done >= j.total ? { ...j, done, status: 'done', duration: 312 } : { ...j, done };
      });
    }, 2000);
    return () => {
      stop();
      clearTimeout(glowTimer);
    };
  });

  function retry(job: OpsJob) {
    const { error: _, ...rest } = job;
    jobs = jobs.map((j) =>
      j.id === job.id ? { ...rest, status: 'queued', done: 0, duration: null } : j,
    );
    flash(job.id);
  }

  function startJob(type: OpsJobType) {
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
    // The new job must be visible where it lands: only widen the filter that would hide it.
    if (jobFilter === 'failed') jobFilter = 'all';
    jobQuery = '';
    flash(job.id);
  }

  const duration = (seconds: number | null) =>
    seconds == null
      ? ''
      : ` · ${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;

  // ---- feedback
  let items = $state<FeedbackItem[]>(feedbackItems());
  let sources = $state<string[]>([]);
  let ratings = $state<string[]>([]);
  let commentsOnly = $state(false);
  let sort = $state('receivedAt');
  let order = $state<SortOrder>('desc');
  let offset = $state(0);
  let creating = $state(false);
  let createOrigin = $state<Element | undefined>();
  let pendingGlow: string | null = null;

  const sourceGroups: MultiGroup[] = [
    { options: ['chat-assistant', 'mobile-app', 'website'].map((s) => ({ value: s, label: s })) },
  ];
  const ratingGroups: MultiGroup[] = [
    {
      label: 'Thumbs',
      options: [
        { value: 'up', label: 'Thumbs up' },
        { value: 'down', label: 'Thumbs down' },
      ],
    },
    {
      label: 'Stars',
      options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: starLabel(n), stars: n })),
    },
  ];
  const feedbackColumns: Column[] = [
    { key: 'receivedAt', label: 'Received', sortable: true, nowrap: true },
    { key: 'rating', label: 'Rating', sortable: true, nowrap: true },
    { key: 'source', label: 'Source', hideOnMobile: true, nowrap: true },
    { key: 'comment', label: 'Comment' },
  ];
  const ratingKey = (i: FeedbackItem) =>
    i.ratingValue === 'up' ? 6 : i.ratingValue === 'down' ? 0 : Number(i.ratingValue);
  const feedbackNarrowed = $derived(!!sources.length || !!ratings.length || commentsOnly);
  const filteredFeedback = $derived(
    items
      .filter((i) => !sources.length || sources.includes(i.sourceSystem))
      .filter((i) => !ratings.length || ratings.includes(i.ratingValue))
      .filter((i) => !commentsOnly || !!i.comment)
      .sort((a, b) => {
        const d =
          sort === 'rating'
            ? ratingKey(a) - ratingKey(b)
            : a.receivedAt.localeCompare(b.receivedAt);
        return order === 'asc' ? d : -d;
      }),
  );
  const feedbackPage = $derived(filteredFeedback.slice(offset, offset + FEEDBACK_PAGE));

  function onsort(key: string) {
    order = sort === key && order === 'desc' ? 'asc' : 'desc';
    sort = key;
    offset = 0;
  }

  function details(item: FeedbackItem): DetailItem[] {
    return [
      ...(item.comment ? [{ label: 'Comment', value: item.comment }] : []),
      ...(item.query ? [{ label: 'Query', value: item.query }] : []),
      ...(item.pageUrl ? [{ label: 'Page', value: item.pageUrl, mono: true }] : []),
      { label: 'Submission', value: item.id, mono: true },
    ];
  }

  async function addFeedback(draft: FeedbackDraft, comment: string) {
    await later(700);
    const id = `fb-${String(items.length + 1).padStart(4, '0')}`;
    const item: FeedbackItem = {
      id,
      receivedAt: new Date().toISOString(),
      ratingType: draft.type,
      ratingValue: String(draft.value),
      sourceSystem: 'website',
      sourceVersion: '1.8.2',
      sourceEnvironment: 'prod',
      pageUrl: 'https://www.example.com/admin',
    };
    if (comment.trim()) item.comment = comment.trim();
    items = [item, ...items];
    sources = [];
    ratings = [];
    commentsOnly = false;
    sort = 'receivedAt';
    order = 'desc';
    offset = 0;
    // It glows once the dialog has shrunk back, so you see it arrive.
    pendingGlow = id;
  }

  function removeFeedback(item: FeedbackItem) {
    const index = items.indexOf(item);
    items = items.filter((i) => i.id !== item.id);
    // The row is gone, so the toast is the only place left to answer — with the way back.
    notify?.(`Feedback ${item.id} deleted`, {
      tone: 'warn',
      action: {
        label: 'Undo',
        onaction: () => {
          items = [...items.slice(0, index), item, ...items.slice(index)];
          flash(item.id);
        },
      },
    });
  }
</script>

{#snippet jobCell(job: OpsJob, column: Column)}
  {#if column.key === 'name'}
    <span class="strong">{job.name}</span>
    <span class="mono">{job.id} · {job.owner}</span>
  {:else if column.key === 'type'}
    <Tag label={OPS_JOB_TYPES[job.type]} />
  {:else if column.key === 'status'}
    <JobStatus
      status={JOB_STATE[job.status]}
      done={job.done}
      total={job.status === 'running' || job.status === 'failed' ? job.total : undefined}
    />
  {:else}
    <span class="muted"
      >{dateTimeFormat.format(new Date(job.startedAt))}{duration(job.duration)}</span
    >
  {/if}
{/snippet}

{#snippet jobDetail(job: OpsJob)}
  <Stack gap="sm" align="start">
    {#if job.error}
      <Alert tone="danger" message={job.error}>
        {#snippet actions()}
          <Button
            size="sm"
            variant="primary"
            icon="refresh"
            label="Retry"
            onclick={() => retry(job)}
          />
        {/snippet}
      </Alert>
    {/if}
    <Row gap="sm">
      {#if job.type === 'crawl'}
        <Button
          size="sm"
          icon="arrow-right"
          label="Open in Jobs"
          onclick={() => onnavigate?.('jobs')}
        />
      {:else if job.type === 'rating' || job.type === 'export' || job.type === 'archive'}
        <Button
          size="sm"
          icon="arrow-right"
          label="Open in Documents"
          onclick={() => onnavigate?.('documents')}
        />
      {:else}
        <Button
          size="sm"
          icon="arrow-right"
          label="Open in AI lab"
          onclick={() => onnavigate?.('ai')}
        />
      {/if}
      <Button size="sm" variant="plain" icon="download" label="Logs" href="#{job.id}/logs" />
    </Row>
  </Stack>
{/snippet}

{#snippet feedbackCell(item: FeedbackItem, column: Column)}
  {#if column.key === 'receivedAt'}
    <span class="when">{dateTimeFormat.format(new Date(item.receivedAt))}</span>
  {:else if column.key === 'rating'}
    <RatingDisplay type={item.ratingType} value={item.ratingValue} />
  {:else if column.key === 'source'}
    {item.sourceSystem}
    <span class="muted">{item.sourceVersion} · {item.sourceEnvironment}</span>
  {:else if item.comment}
    <span class="clip">{item.comment}</span>
  {:else}
    <span class="none">No comment</span>
  {/if}
{/snippet}

{#snippet feedbackDetail(item: FeedbackItem)}
  <Card surface="subtle" padding="sm">
    <Stack gap="sm" align="start">
      <DetailList items={details(item)} />
      <ConfirmButton
        size="sm"
        label="Delete"
        confirmLabel="Delete now"
        busyLabel="Deleting…"
        onconfirm={async () => {
          await later(400);
          removeFeedback(item);
        }}
      />
    </Stack>
  </Card>
{/snippet}

<AdminHead
  section="overview"
  eyebrow={today}
  title={hello.text}
  description="{activeJobs.length} jobs running or queued · {failingJobs.length} failed and waiting for a retry. {hello.wink}"
>
  {#snippet actions()}
    <SegmentedControl
      size="sm"
      label="Time range"
      options={RANGES.map((d) => ({ value: d, label: `${d} days` }))}
      bind:value={days}
      onchange={refresh}
    />
    <Button
      variant="secondary"
      icon="refresh"
      label="Refresh"
      busy={loading}
      busyLabel="Refreshing…"
      onclick={refresh}
    />
  {/snippet}
</AdminHead>

<div class="figures" class:loading>
  <div class="bar"><LoadingBar active={loading} label="Updating the figures" /></div>
  <Grid columns={4} min="11rem" aria-label="Key figures" data-note="kpis">
    <KpiTile
      label="Jobs finished"
      value={numberFormat.format(succeeded + failedJobs)}
      detail="{numberFormat.format(failedJobs)} failed · {rangeLabel}"
      meter={[
        { value: succeeded, color: 'var(--ok)' },
        { value: failedJobs, color: 'var(--danger)' },
      ]}
    />
    <KpiTile
      label="Success rate"
      value={percentFormat.format(succeeded / (succeeded + failedJobs || 1))}
      detail="target 97%"
    />
    <KpiTile
      label="Feedback received"
      value={numberFormat.format(thumbsUp + thumbsDown + starCount)}
      detail="{percentFormat.format(thumbsUp / (thumbsUp + thumbsDown || 1))} thumbs up"
      meter={[
        { value: thumbsUp, color: 'var(--up)' },
        { value: thumbsDown, color: 'var(--down)' },
      ]}
    />
    <KpiTile
      label="Average stars"
      value={starCount ? `${decimalFormat.format(starSum / starCount)} ★` : null}
      detail="from {numberFormat.format(starCount)} star ratings"
    />
  </Grid>

  <Grid columns="2fr 1.4fr 1fr" collapse="lg" aria-label="Trends">
    <ChartCard
      title={perDay === 'jobs' ? 'Jobs per day' : 'Thumbs per day'}
      sub={perDay === 'jobs' ? 'Succeeded above the line, failed below' : 'Up above, down below'}
      legend={perDay === 'jobs'
        ? [
            { label: 'Succeeded', color: 'var(--up)' },
            { label: 'Failed', color: 'var(--down)' },
          ]
        : [
            { label: 'Up', color: 'var(--up)' },
            { label: 'Down', color: 'var(--down)' },
          ]}
    >
      {#snippet actions()}
        <SegmentedControl
          size="sm"
          label="Show per day"
          options={[
            { value: 'jobs', label: 'Jobs' },
            { value: 'feedback', label: 'Feedback' },
          ]}
          bind:value={perDay}
        />
      {/snippet}
      {#if perDay === 'jobs'}
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
      {:else}
        <DivergingBarChart data={toDiverging(feedbackDaily)} upLabel="Up" downLabel="Down" />
      {/if}
    </ChartCard>
    <ChartCard
      title="Average rating"
      sub={ratingOf === 'judge'
        ? `Quality judge · ${numberFormat.format(rated)} documents rated`
        : 'Star ratings from users; days without any are skipped'}
      value={ratingOf === 'judge'
        ? `${decimalFormat.format(ratingSum / (rated || 1))} ★`
        : starCount
          ? `${decimalFormat.format(starSum / starCount)} ★`
          : undefined}
    >
      {#snippet actions()}
        <SegmentedControl
          size="sm"
          label="Rated by"
          options={[
            { value: 'judge', label: 'Judge' },
            { value: 'users', label: 'Users' },
          ]}
          bind:value={ratingOf}
        />
      {/snippet}
      <LineChart
        data={ratingOf === 'judge'
          ? daily.map((d) => ({ label: d.label, title: d.title, value: d.rating, count: d.rated }))
          : toAverage(feedbackDaily)}
        min={1}
        max={5}
        tickFormat={(v) => `${v}★`}
        valueFormat={(v) => `${decimalFormat.format(v)} ★`}
        valueLabel="Average"
        countLabel={ratingOf === 'judge' ? 'Rated' : 'Ratings'}
      />
    </ChartCard>
    <ChartCard title="Star distribution" sub="User ratings · {rangeLabel}">
      <HorizontalBarChart data={starDistribution(days)} countLabel="Ratings" />
    </ChartCard>
  </Grid>
</div>

<Grid columns="minmax(0, 2fr) minmax(0, 1fr)" collapse="lg" align="start">
  <Section
    level="panel"
    title="Jobs"
    description="Live · open a row for its error, a retry and where it lives."
  >
    {#snippet actions()}
      <SearchField label="Search jobs" placeholder="Name or id" bind:value={jobQuery} />
      <span data-note="new-job">
        <DropdownMenu
          label="New job"
          icon="plus"
          iconOnly={false}
          variant="primary"
          shape="pill"
          size="md"
          align="end"
          items={(Object.keys(OPS_JOB_TYPES) as OpsJobType[]).map((type) => ({
            label: OPS_JOB_TYPES[type],
            onselect: () => startJob(type),
          }))}
        />
      </span>
    {/snippet}
    <SegmentedControl
      size="sm"
      label="Show"
      options={[
        { value: 'all', label: `All · ${jobs.length}` },
        { value: 'active', label: `Active · ${activeJobs.length}` },
        { value: 'failed', label: `Failed · ${failingJobs.length}` },
      ]}
      bind:value={jobFilter}
    />
    <DataTable
      columns={jobColumns}
      rows={shownJobs}
      rowKey={(j) => j.id}
      cell={jobCell}
      detail={jobDetail}
      highlight={glow ?? undefined}
      singleOpen
      filtered={jobFilter !== 'all' || !!jobNeedle}
      emptyFilteredMessage="No jobs match — try fewer words."
    />
  </Section>

  <Stack gap="lg">
    <Section title="Services" heading={3}>
      <ResourceList
        items={services}
        key={(s) => s.id}
        title={(s) => s.name}
        meta={(s) => s.detail}
        status={(s) => SERVICE_STATUS[s.status]}
        label="Services"
      />
    </Section>
    <Section title="Activity" heading={3}>
      <ActivityLog entries={opsActivity()} label="Recent activity" />
    </Section>
  </Stack>
</Grid>

<Section
  level="panel"
  title="Feedback"
  description="{numberFormat.format(filteredFeedback.length)} {feedbackNarrowed
    ? 'matching'
    : 'in total'} · open a row for the details"
>
  {#snippet actions()}
    <Button
      variant="primary"
      shape="pill"
      icon="message-plus"
      label="Add feedback"
      onclick={(event) => {
        createOrigin = event.currentTarget;
        creating = true;
      }}
    />
  {/snippet}
  <Row gap="sm" align="end" data-note="feedback-filters">
    <MultiSelect
      label="Source"
      allLabel="All sources"
      unit="sources"
      groups={sourceGroups}
      value={sources}
      onchange={(v) => {
        sources = v;
        offset = 0;
      }}
    />
    <MultiSelect
      label="Rating"
      allLabel="All ratings"
      unit="ratings"
      groups={ratingGroups}
      value={ratings}
      onchange={(v) => {
        ratings = v;
        offset = 0;
      }}
    />
    <Checkbox label="With comment only" bind:checked={commentsOnly} onchange={() => (offset = 0)} />
  </Row>
  <DataTable
    columns={feedbackColumns}
    rows={feedbackPage}
    rowKey={(i) => i.id}
    {sort}
    {order}
    {onsort}
    cell={feedbackCell}
    detail={feedbackDetail}
    highlight={glow ?? undefined}
    singleOpen
    filtered={feedbackNarrowed}
    emptyFilteredMessage="No feedback matches these filters — loosen one to see more."
  />
  <Pager
    {offset}
    limit={FEEDBACK_PAGE}
    total={filteredFeedback.length}
    count={feedbackPage.length}
    onpage={(next) => (offset = next)}
  />
</Section>

<FeedbackDialog
  open={creating}
  origin={createOrigin}
  title="Add feedback"
  intro="Log feedback that reached you another way — by phone, mail or in person."
  onclose={() => {
    creating = false;
    if (pendingGlow) flash(pendingGlow);
    pendingGlow = null;
  }}
  onsubmit={addFeedback}
/>

<style>
  .figures {
    position: relative;
    display: grid;
    gap: var(--space-6);
    transition: opacity var(--motion-base) var(--ease-out);
  }
  .figures.loading {
    opacity: 0.6;
  }
  /* The bar sits on the top edge of what it refreshes, without pushing it down. */
  .bar {
    position: absolute;
    inset: calc(-1 * var(--space-3)) 0 auto;
  }
  .strong {
    display: block;
    font-weight: var(--fw-semibold);
  }
  .mono {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .muted {
    display: block;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .when {
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
  }
  .clip {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 60ch;
  }
  .none {
    color: var(--text-3);
    font-style: italic;
  }
</style>
