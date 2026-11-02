<script lang="ts">
  /** Example page: an AI judge rates documents in a polled background run, mock data (Storybook only). */
  import { onDestroy, onMount } from 'svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import Stars from '../patterns/atoms/Stars.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Tooltip from '../patterns/atoms/Tooltip.svelte';
  import JobStatus from '../patterns/molecules/JobStatus.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import HorizontalBarChart from '../patterns/organisms/HorizontalBarChart.svelte';
  import { celebrate } from '../utils/delight';
  import { numberFormat } from '../utils/format';
  import { every } from '../utils/poll';
  import { formatBytes } from '../utils/upload';
  import {
    CRITERIA,
    overallScore,
    ratedDocuments,
    ratingFails,
    scoreDocument,
    type CriterionKey,
    type RatedDocument,
    type RatingStatus,
  } from './mock-ops';

  interface Props {
    /** `running` starts a "Rate all" run as soon as the page opens. */
    start?: 'idle' | 'running';
  }

  let { start = 'idle' }: Props = $props();

  const PAGE_SIZE = 10;
  const POLL_MS = 2000;
  const oneDecimal = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  // The "server": the rating worker changes it; the page only sees it through the poll.
  const server = {
    docs: ratedDocuments(),
    run: 0,
    total: 0,
    done: 0,
  };
  const snapshot = () => ({
    docs: server.docs.map((d) => ({ ...d })),
    total: server.total,
    done: server.done,
  });

  let view = $state(snapshot());
  let checked = $state<Date | null>(null);
  let filter = $state<'all' | RatingStatus>('all');
  let offset = $state(0);
  let worker: ReturnType<typeof setInterval> | undefined;
  let stopPolling: (() => void) | undefined;
  // The button that started the run: a clean finish throws a few sprinkles from it.
  let origin: Element | null = null;

  const count = (status: RatingStatus) => view.docs.filter((d) => d.status === status).length;
  const counts = $derived({
    rated: count('rated'),
    unrated: count('unrated'),
    queued: count('queued'),
    failed: count('failed'),
    skipped: count('skipped'),
  });
  const running = $derived(counts.queued > 0);
  const scored = $derived(view.docs.filter((d) => d.status === 'rated' && d.scores));
  const average = $derived(
    scored.length
      ? scored.reduce((sum, d) => sum + overallScore(d.scores ?? emptyScores()), 0) / scored.length
      : 0,
  );
  const histogram = $derived(
    [5, 4, 3, 2, 1].map((stars) => ({
      label: `${stars}★`,
      title: `${stars} ${stars === 1 ? 'star' : 'stars'}`,
      value: scored.filter((d) => overallScore(d.scores ?? emptyScores()) === stars).length,
      color: `var(--star-${stars})`,
    })),
  );
  const criterionAverage = (key: CriterionKey) =>
    scored.length ? scored.reduce((sum, d) => sum + (d.scores?.[key] ?? 0), 0) / scored.length : 0;
  const summary = $derived(
    `${counts.rated} rated · ${counts.skipped} skipped · ${counts.failed} failed of ${view.docs.length}`,
  );

  const filtered = $derived(
    filter === 'all' ? view.docs : view.docs.filter((d) => d.status === filter),
  );
  const page = $derived(filtered.slice(offset, offset + PAGE_SIZE));

  const columns: Column[] = [
    { key: 'title', label: 'Document' },
    { key: 'type', label: 'Type', nowrap: true, hideOnMobile: true },
    { key: 'version', label: 'Version', nowrap: true, hideOnMobile: true },
    { key: 'size', label: 'Size', align: 'end', nowrap: true, hideOnMobile: true },
    { key: 'source', label: 'Source', hideOnMobile: true },
    { key: 'rating', label: 'Rating', nowrap: true },
  ];

  function emptyScores(): Record<CriterionKey, number> {
    return { active: 0, inclusive: 0, focus: 0, restricted: 0 };
  }

  function scoreLine(scores: Record<CriterionKey, number>) {
    return CRITERIA.map((c) => `${c.label} ${scores[c.key]}/5`).join(' · ');
  }

  function sync() {
    const wasRunning = running;
    view = snapshot();
    checked = new Date();
    if (wasRunning && !running && origin) {
      if (!counts.failed) celebrate(origin);
      origin = null;
    }
  }

  function work() {
    const next = server.docs.find((d) => d.status === 'queued');
    if (!next) {
      clearInterval(worker);
      worker = undefined;
      return;
    }
    if (ratingFails(next.id, server.run)) {
      next.status = 'failed';
      next.reason = 'Judge timed out after 60 s';
    } else {
      next.status = 'rated';
      next.scores = scoreDocument(next.id, server.run);
      delete next.reason;
    }
    server.done += 1;
  }

  /** Queues documents on the "server", then polls until the queue is empty. */
  function enqueue(ids: string[]) {
    if (!ids.length) return;
    if (!worker) {
      server.total = 0;
      server.done = 0;
    }
    server.run += 1;
    for (const doc of server.docs) {
      if (ids.includes(doc.id) && doc.status !== 'queued') {
        doc.status = 'queued';
        server.total += 1;
      }
    }
    worker ??= setInterval(work, 260);
    sync();
    stopPolling ??= every(() => {
      sync();
      if (!worker) {
        stopPolling?.();
        stopPolling = undefined;
      }
    }, POLL_MS);
  }

  const idsWhere = (test: (d: RatedDocument) => boolean) => view.docs.filter(test).map((d) => d.id);
  const rateAll = () => enqueue(idsWhere((d) => d.status === 'unrated' || d.status === 'failed'));
  const rerateAll = () => enqueue(idsWhere((d) => d.status !== 'skipped'));

  function show(status: 'all' | RatingStatus) {
    filter = status;
    offset = 0;
  }

  onMount(() => {
    if (start === 'running') rateAll();
  });

  onDestroy(() => {
    clearInterval(worker);
    stopPolling?.();
  });
</script>

{#snippet cell(doc: RatedDocument, column: Column)}
  {#if column.key === 'title'}
    <span class="title">{doc.title}</span>
    <span class="id">{doc.id}</span>
  {:else if column.key === 'type'}
    <Badge size="sm" label={doc.type.toUpperCase()} />
  {:else if column.key === 'version'}
    <span class="muted">v{doc.version}</span>
  {:else if column.key === 'size'}
    <span class="muted">{formatBytes(doc.bytes)}</span>
  {:else if column.key === 'source'}
    <span class="muted">{doc.source}</span>
  {:else if doc.status === 'rated' && doc.scores}
    <Row gap="sm" wrap={false}>
      <Tooltip text={scoreLine(doc.scores)}>
        <Stars value={overallScore(doc.scores)} showValue />
      </Tooltip>
      <Button size="xs" variant="ghost" label="Re-rate" onclick={() => enqueue([doc.id])} />
    </Row>
  {:else if doc.status === 'queued'}
    <StatusText busy message="Queued…" />
  {:else if doc.status === 'failed'}
    <Row gap="sm" wrap={false}>
      <Tooltip text={doc.reason ?? 'The judge did not answer'}>
        <Tag tone="danger" label="Failed" />
      </Tooltip>
      <Button size="xs" icon="refresh" label="Retry" onclick={() => enqueue([doc.id])} />
    </Row>
  {:else if doc.status === 'skipped'}
    <Tooltip text={doc.reason ?? 'Not suitable for rating'}>
      <span class="muted">Skipped</span>
    </Tooltip>
  {:else}
    <Row gap="sm" wrap={false}>
      <span class="muted">Not rated</span>
      <Button size="xs" label="Rate" onclick={() => enqueue([doc.id])} />
    </Row>
  {/if}
{/snippet}

{#snippet detail(doc: RatedDocument)}
  <Card surface="subtle" padding="sm">
    {#if doc.scores && doc.status === 'rated'}
      <Grid min="11rem" gap="md">
        {#each CRITERIA as criterion (criterion.key)}
          <Stack gap="xs">
            <Row gap="sm" wrap={false}>
              <span class="criterion">{criterion.label}</span>
              <Spacer />
              <span class="figure-sm">{doc.scores[criterion.key]}/5</span>
            </Row>
            <ProgressBar
              value={doc.scores[criterion.key]}
              max={5}
              label="{criterion.label}: {doc.scores[criterion.key]} of 5"
              tone={doc.scores[criterion.key] >= 4
                ? 'ok'
                : doc.scores[criterion.key] >= 3
                  ? 'info'
                  : 'warn'}
            />
          </Stack>
        {/each}
      </Grid>
    {:else}
      <StatusText
        tone={doc.status === 'failed' ? 'error' : 'muted'}
        message={doc.reason ?? 'No scores yet — rate the document to see them per criterion.'}
      />
    {/if}
  </Card>
{/snippet}

<Page
  title="Quality rating"
  subtitle="AI judge for documents"
  gap="md"
  footer="Example Corp · internal"
>
  {#snippet aside()}
    <Section level="panel" title="Overall" description="{counts.rated} of {view.docs.length} rated">
      <Row gap="sm" align="baseline">
        <span class="figure">{scored.length ? oneDecimal.format(average) : '–'}</span>
        <Stars value={average} label="Average {oneDecimal.format(average)} of 5 stars" />
      </Row>
      <HorizontalBarChart data={histogram} countLabel="Documents" label="Ratings by stars" />
      <Row gap="xs">
        <Tag label="Rated" tone="ok" count={counts.rated} onclick={() => show('rated')} />
        <Tag label="Not rated" count={counts.unrated} onclick={() => show('unrated')} />
        <Tag label="Queued" tone="info" count={counts.queued} />
        <Tag label="Failed" tone="danger" count={counts.failed} onclick={() => show('failed')} />
        <Tag label="Skipped" count={counts.skipped} onclick={() => show('skipped')} />
      </Row>
    </Section>
    <Section level="panel" title="Criteria" description="Each is scored from 1 to 5.">
      {#each CRITERIA as criterion (criterion.key)}
        {@const value = criterionAverage(criterion.key)}
        <Stack gap="xs">
          <Row gap="sm" wrap={false}>
            <span class="criterion">{criterion.label}</span>
            <Spacer />
            <span class="figure-sm">{scored.length ? oneDecimal.format(value) : '–'}</span>
          </Row>
          <span class="muted">{criterion.description}</span>
          <ProgressBar
            {value}
            max={5}
            label="{criterion.label}: average {oneDecimal.format(value)}"
          />
        </Stack>
      {/each}
    </Section>
  {/snippet}

  <Section
    level="panel"
    title="Rating run"
    description="The judge reads each document and scores it against the criteria."
  >
    {#snippet actions()}
      <Button
        variant="primary"
        icon="sparkles"
        label="Rate all"
        disabled={!counts.unrated && !counts.failed}
        onclick={(event) => {
          origin = event.currentTarget;
          rateAll();
        }}
      />
      <Button
        icon="refresh"
        label="Re-rate"
        busy={running}
        onclick={(event) => {
          origin = event.currentTarget;
          rerateAll();
        }}
      />
    {/snippet}
    <JobStatus
      status={running ? 'running' : view.total ? 'done' : 'idle'}
      step={summary}
      done={view.done}
      total={view.total || undefined}
      labels={{ idle: 'Ready' }}
    />
    <StatusText
      message={checked
        ? `Checked ${checked.toLocaleTimeString('de-DE')}${running ? ' · refreshes every 2 s' : ''}`
        : 'Start a run to rate the documents.'}
    />
  </Section>

  <Section
    level="panel"
    title="Documents"
    description="{numberFormat.format(
      filtered.length,
    )} shown · hover a rating for its scores, click a row for details"
  >
    {#snippet actions()}
      <SegmentedControl
        size="sm"
        wrap
        label="Show"
        value={filter}
        onchange={show}
        options={[
          { value: 'all', label: 'All' },
          { value: 'rated', label: 'Rated' },
          { value: 'unrated', label: 'Not rated' },
          { value: 'failed', label: 'Failed' },
          { value: 'skipped', label: 'Skipped' },
        ]}
      />
    {/snippet}
    <DataTable
      {columns}
      rows={page}
      rowKey={(d) => d.id}
      {cell}
      {detail}
      singleOpen
      emptyText="Nothing in this state right now."
    />
    <Pager
      {offset}
      limit={PAGE_SIZE}
      total={filtered.length}
      count={page.length}
      onpage={(next) => (offset = next)}
    />
  </Section>
</Page>

<style>
  .title {
    display: block;
    font-weight: var(--fw-semibold);
  }
  .id {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .criterion {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
  }
  .figure {
    font-size: var(--fs-kpi);
    font-weight: var(--fw-heavy);
    letter-spacing: -0.02em;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }
  .figure-sm {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    color: var(--text-2);
  }
</style>
