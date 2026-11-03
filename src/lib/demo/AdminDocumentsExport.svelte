<script lang="ts">
  /**
   * The export job of the Admin console's documents table (Storybook only). It renders in the
   * DataTable's selection bar, right above the rows it packs: the bar holds "n selected", the
   * archive name and "Export selected" (which calls `begin()` here), and this line under it
   * shows the job — progress, download, the items that could not be packed, and "Export again"
   * inside the alert when a link has run out.
   */
  import { onDestroy, untrack } from 'svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import JobStatus, { type JobState } from '../patterns/molecules/JobStatus.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import { celebrate } from '../utils/delight';
  import { dateTimeFormat } from '../utils/format';
  import { every } from '../utils/poll';
  import { bytes, clockFormat, type AdminSection, type Notify } from './admin';
  import {
    exportJob,
    exportProblems,
    type ExportJob,
    type ExportProblem,
    type ExportStatus,
    type LibraryDocument,
  } from './mock-ops';

  interface Props {
    /** The selected documents. */
    selected: LibraryDocument[];
    /** The archive name typed in the selection bar. */
    name?: string;
    /** A job is pending or packing (bindable, for the bar's busy button). */
    working?: boolean;
    /** Whether there is a job to show: the bar stays open for it without a selection. */
    onshowing?: ((showing: boolean) => void) | undefined;
    /** Opens with a job in this state (for stories). */
    start?: 'none' | Exclude<ExportStatus, 'pending'>;
    active?: boolean;
    notify?: Notify | undefined;
    onnavigate?: ((section: AdminSection) => void) | undefined;
  }

  let {
    selected,
    name = '',
    working = $bindable(false),
    onshowing,
    start = 'none',
    active = true,
    notify,
    onnavigate,
  }: Props = $props();

  const STATE: Record<ExportStatus, JobState> = {
    pending: 'queued',
    processing: 'running',
    completed: 'done',
    failed: 'failed',
    expired: 'cancelled',
  };
  const problemColumns: Column[] = [
    { key: 'id', label: 'Document', nowrap: true },
    { key: 'code', label: 'Code', nowrap: true },
    { key: 'message', label: 'Why', hideOnMobile: true },
  ];

  let job = $state<ExportJob | null>(null);
  let problems = $state<ExportProblem[]>([]);
  let checked = $state<Date | null>(null);
  let download = $state<HTMLElement | undefined>();

  // The "server" side; the bar sees it only through the poll.
  let server: ExportJob | null = null;
  let serverDocs: LibraryDocument[] = [];
  let timers: ReturnType<typeof setTimeout>[] = [];
  let packing: ReturnType<typeof setInterval> | undefined;
  let stopPolling: (() => void) | undefined;
  // Set when someone pressed Export: the finished job celebrates once, from its download.
  let watching = false;

  $effect(() => {
    working = job?.status === 'pending' || job?.status === 'processing';
    onshowing?.(!!job);
  });
  const link = $derived(job ? `https://example.com/exports/${job.filename}` : '');

  function sync() {
    const was = job?.status;
    job = server ? { ...server } : null;
    checked = new Date();
    if (job?.status === 'completed' && was !== 'completed' && watching) {
      watching = false;
      problems = exportProblems(serverDocs);
      const done = job;
      // The sprinkles come from the result (the download), once it is on screen.
      requestAnimationFrame(() => download && celebrate(download));
      if (!active)
        notify?.(`Export ready: ${done.filename}`, {
          action: { label: 'Open', onaction: () => onnavigate?.('documents') },
        });
    }
    if (!working) {
      stopPolling?.();
      stopPolling = undefined;
    }
  }

  function stop() {
    timers.forEach(clearTimeout);
    timers = [];
    clearInterval(packing);
    stopPolling?.();
    stopPolling = undefined;
  }

  function complete(target: ExportJob, docs: LibraryDocument[]) {
    const failing = exportProblems(docs);
    target.status = 'completed';
    target.failed = failing.length;
    target.included = target.requested - failing.length;
    target.bytes = docs
      .filter((d) => !failing.some((p) => p.id === d.id))
      .reduce((sum, d) => sum + (d.versions[d.versions.length - 1]?.bytes ?? 0), 0);
    target.expiresAt = new Date(Date.parse(target.createdAt) + 24 * 3_600_000).toISOString();
  }

  /** "Export selected" in the bar. */
  export function begin() {
    startExport();
  }

  /** Pending, then one item packed every 220 ms, then completed — polled every second. */
  function startExport(docs: LibraryDocument[] = selected) {
    if (!docs.length) return;
    stop();
    problems = [];
    serverDocs = docs.map((d) => ({ ...d }));
    const filename = name.trim() ? `${name.trim().replace(/\.zip$/, '')}.zip` : '';
    const target = exportJob(
      filename,
      docs.map((d) => d.id),
    );
    server = target;
    watching = true;
    sync();
    timers.push(
      setTimeout(() => {
        target.status = 'processing';
        packing = setInterval(() => {
          target.included += 1;
          if (target.included >= target.requested) {
            clearInterval(packing);
            complete(target, serverDocs);
          }
        }, 220);
      }, 1200),
    );
    stopPolling = every(sync, 1000);
  }

  function again() {
    const ids = job?.ids ?? [];
    startExport(serverDocs.filter((d) => ids.includes(d.id)));
  }

  /** A finished job can be put away; the next export starts a new one. */
  function dismiss() {
    stop();
    server = null;
    job = null;
    problems = [];
  }

  // A story arg opens with a job in some state, once the selection it packs has arrived.
  let startedFor = 'none';
  $effect(() => {
    if (start === startedFor || !selected.length) return;
    startedFor = start;
    if (start !== 'none') untrack(prepare);
  });

  function prepare() {
    if (start === 'processing') return startExport();
    serverDocs = selected.map((d) => ({ ...d }));
    const target = exportJob(
      'q3-reports.zip',
      selected.map((d) => d.id),
    );
    target.createdAt = '2026-10-18T09:40:00.000Z';
    complete(target, serverDocs);
    if (start === 'completed') problems = exportProblems(serverDocs);
    if (start === 'failed') {
      Object.assign(target, {
        status: 'failed',
        included: 0,
        failed: 0,
        bytes: null,
        expiresAt: null,
        error:
          'The export storage is full. Try again in a few minutes, or ask an admin to free space.',
      });
    } else if (start === 'expired') target.status = 'expired';
    server = target;
    sync();
  }

  onDestroy(stop);
</script>

{#snippet problemCell(item: ExportProblem, column: Column)}
  {#if column.key === 'id'}
    <span class="mono">{item.id}</span>
  {:else if column.key === 'code'}
    <Tag mono label={item.code} />
  {:else}
    <span class="muted">{item.message}</span>
  {/if}
{/snippet}

{#if job}
  <div class="job">
    <Stack gap="sm">
      <Row gap="sm" wrap={false} align="start">
        <div class="status">
          <JobStatus
            status={STATE[job.status]}
            step={job.status === 'pending'
              ? 'waiting for a free worker'
              : job.status === 'processing'
                ? `packing ${job.filename}`
                : job.filename}
            done={job.status === 'processing' ? job.included : undefined}
            total={job.status === 'processing' ? job.requested : undefined}
            detail={job.status === 'completed'
              ? `${job.included} of ${job.requested} packed${job.bytes != null ? ` · ${bytes(job.bytes)}` : ''}`
              : `${job.requested} ${job.requested === 1 ? 'document' : 'documents'}`}
            labels={{ queued: 'Pending', running: 'Packing', done: 'Ready', cancelled: 'Expired' }}
          />
        </div>
        {#if !working}
          <Button size="sm" variant="ghost" label="Dismiss" onclick={dismiss} />
        {/if}
      </Row>
      {#if job.status === 'completed'}
        <Row gap="sm">
          <span class="anchor" bind:this={download}>
            <Button size="sm" variant="primary" icon="download" label="Download ZIP" href={link} />
          </span>
          <CopyButton size="sm" value={link} label="Copy link" />
          <Spacer />
          <StatusText
            message="Link works until {job.expiresAt
              ? dateTimeFormat.format(new Date(job.expiresAt))
              : '–'}"
          />
        </Row>
        {#if problems.length}
          <div class="problems">
            <span class="caption">Not included · {problems.length} of {job.requested}</span>
            <DataTable
              columns={problemColumns}
              rows={problems}
              rowKey={(p) => p.id}
              cell={problemCell}
            />
          </div>
        {/if}
      {:else if job.status === 'failed'}
        <Alert tone="danger" message={job.error ?? 'The export stopped.'}>
          {#snippet actions()}
            <Button size="sm" icon="refresh" label="Try again" onclick={again} />
          {/snippet}
        </Alert>
      {:else if job.status === 'expired'}
        <Alert
          tone="warn"
          message="The archive was deleted 24 hours after it was packed, so the link no longer works."
        >
          {#snippet actions()}
            <Button size="sm" icon="refresh" label="Export again" onclick={again} />
          {/snippet}
        </Alert>
      {:else}
        <StatusText
          busy
          message="Checked {checked ? clockFormat.format(checked) : '–'} · refreshes every second"
        />
      {/if}
    </Stack>
  </div>
{/if}

<style>
  .job {
    padding-top: var(--space-2);
    border-top: 1px solid var(--layer-selected-border);
    animation: bb-rise var(--motion-base) var(--ease-out);
  }
  .status {
    flex: 1;
    min-width: 0;
  }
  .anchor {
    display: inline-flex;
  }
  .problems {
    display: grid;
    gap: var(--space-2);
  }
  .caption {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .mono {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  @media (prefers-reduced-motion: reduce) {
    .job {
      animation: none;
    }
  }
</style>
