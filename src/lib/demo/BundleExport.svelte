<script lang="ts">
  /** Example page: export many documents as one ZIP through a polled background job, mock data (Storybook only). */
  import { onDestroy, onMount } from 'svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import ProgressBar from '../patterns/atoms/ProgressBar.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import { celebrate } from '../utils/delight';
  import { dateTimeFormat, numberFormat } from '../utils/format';
  import { every } from '../utils/poll';
  import { formatBytes } from '../utils/upload';
  import {
    exportErrors,
    exportIds,
    exportJob,
    type ExportError,
    type ExportJob,
    type ExportStatus,
  } from './mock-ops';

  interface Props {
    /** Opens the page with a job already in this state (`empty`: no job yet). */
    start?: 'empty' | ExportStatus;
  }

  let { start = 'empty' }: Props = $props();

  const MAX_IDS = 500;
  const ID_PLACEHOLDER = exportIds.slice(0, 3).join('\n');
  const BYTES_PER_ITEM = 2_297_335;
  const STATUS: Record<
    ExportStatus,
    { label: string; tone: 'neutral' | 'info' | 'live' | 'danger' | 'locked' }
  > = {
    pending: { label: 'Pending', tone: 'neutral' },
    processing: { label: 'Processing', tone: 'info' },
    completed: { label: 'Completed', tone: 'live' },
    failed: { label: 'Failed', tone: 'danger' },
    expired: { label: 'Expired', tone: 'locked' },
  };
  const CODE_TONE = { not_found: 'warn', not_public: 'info', too_large: 'danger' } as const;

  let filename = $state('');
  let idsText = $state('');
  let job = $state<ExportJob | null>(null);
  let checked = $state<Date | null>(null);
  let refreshing = $state(false);

  // The "server" side of the job; the page sees it only through refresh and the poll.
  let server: ExportJob | null = null;
  let timers: ReturnType<typeof setTimeout>[] = [];
  let packing: ReturnType<typeof setInterval> | undefined;
  let stopPolling: (() => void) | undefined;
  // The Start button of the running export: the finished job throws its sprinkles from there.
  let origin: Element | null = null;

  const ids = $derived([...new Set(idsText.split(/[\s,;]+/).filter(Boolean))]);
  const idsError = $derived(ids.length > MAX_IDS ? `At most ${MAX_IDS} IDs per export` : undefined);
  const working = $derived(job?.status === 'pending' || job?.status === 'processing');
  const errors = $derived<ExportError[]>(job?.failed ? exportErrors.slice(0, job.failed) : []);
  const errorColumns: Column[] = [
    { key: 'id', label: 'ID', nowrap: true },
    { key: 'code', label: 'Code', nowrap: true },
    { key: 'message', label: 'Message' },
  ];

  function sync() {
    job = server ? { ...server } : null;
    checked = new Date();
    if (origin && job?.status === 'completed') {
      celebrate(origin);
      origin = null;
    }
    if (!working) {
      stopPolling?.();
      stopPolling = undefined;
    }
  }

  function refresh() {
    refreshing = true;
    timers.push(
      setTimeout(() => {
        sync();
        refreshing = false;
      }, 400),
    );
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
    clearInterval(packing);
  }

  function complete(target: ExportJob) {
    const failing = exportErrors.filter((e) => ids.includes(e.id)).length;
    target.status = 'completed';
    target.failed = failing;
    target.included = target.requested - failing;
    target.bytes = target.included * BYTES_PER_ITEM;
    target.expiresAt = new Date(Date.parse(target.createdAt) + 24 * 3_600_000).toISOString();
  }

  /** Runs the mock job: pending, then one item packed every 250 ms, then completed. */
  function startExport(event?: SubmitEvent) {
    event?.preventDefault();
    if (!ids.length || idsError) return;
    origin = event?.submitter ?? null;
    clearTimers();
    const target = exportJob(
      filename.trim() ? `${filename.trim().replace(/\.zip$/, '')}.zip` : '',
      ids.length,
    );
    server = target;
    sync();
    timers.push(
      setTimeout(() => {
        target.status = 'processing';
        packing = setInterval(() => {
          target.included += 1;
          if (target.included >= target.requested) {
            clearInterval(packing);
            complete(target);
          }
        }, 250);
      }, 1500),
    );
    stopPolling?.();
    stopPolling = every(sync, 2000);
  }

  onMount(() => {
    if (start === 'empty') return;
    idsText = exportIds.join('\n');
    filename = 'q3-reports';
    if (start === 'pending' || start === 'processing') {
      startExport();
      return;
    }
    const target = exportJob('q3-reports.zip', exportIds.length);
    complete(target);
    if (start === 'failed') {
      Object.assign(target, {
        status: 'failed',
        included: 0,
        failed: 0,
        bytes: null,
        expiresAt: null,
        error: 'The export storage is full. Try again later or ask an admin to free space.',
      });
    } else if (start === 'expired') {
      target.status = 'expired';
      target.expiresAt = '2026-10-18T14:00:00.000Z';
    }
    server = target;
    sync();
  });

  onDestroy(() => {
    clearTimers();
    stopPolling?.();
  });
</script>

{#snippet metric(label: string, value: string)}
  <Stack gap="xs">
    <span class="metric-label">{label}</span>
    <span class="metric-value">{value}</span>
  </Stack>
{/snippet}

{#snippet errorCell(item: ExportError, column: Column)}
  {#if column.key === 'id'}
    <span class="mono">{item.id}</span>
  {:else if column.key === 'code'}
    <Tag mono label={item.code} tone={CODE_TONE[item.code]} />
  {:else}
    <span class="muted">{item.message}</span>
  {/if}
{/snippet}

<Page
  title="Bundle export"
  subtitle="documents as one ZIP"
  width="wide"
  gap="md"
  footer="Example Corp · internal"
>
  <Grid columns="minmax(0, 2fr) minmax(0, 3fr)" collapse="lg" align="start">
    <Section
      level="panel"
      title="New export"
      description="Packs up to {MAX_IDS} documents with their originals and metadata into one archive."
    >
      <Stack as="form" gap="md" onsubmit={startExport}>
        <Field label="Archive name" hint="Optional — defaults to export-<date>.zip">
          {#snippet children({ id })}
            <Input {id} bind:value={filename} placeholder="q3-reports" autocomplete="off" />
          {/snippet}
        </Field>
        <Field
          label="Document IDs"
          required
          error={idsError}
          hint="{numberFormat.format(ids.length)} unique IDs · one per line, or separated by commas"
        >
          {#snippet children({ id, errorId, invalid })}
            <Textarea
              {id}
              bind:value={idsText}
              mono
              rows={9}
              {invalid}
              aria-describedby={invalid ? errorId : undefined}
              placeholder={ID_PLACEHOLDER}
            />
          {/snippet}
        </Field>
        <Row gap="sm">
          <Button
            variant="ghost"
            icon="file-text"
            label="Paste 25 sample IDs"
            onclick={() => (idsText = exportIds.join('\n'))}
          />
          <Spacer />
          <Button
            type="submit"
            variant="primary"
            icon="download"
            label="Start export"
            busyLabel="Exporting…"
            busy={working}
            disabled={!ids.length || !!idsError}
          />
        </Row>
      </Stack>
    </Section>

    <Stack gap="md">
      <Section
        level="panel"
        title="Export job"
        description={job
          ? `${job.id} · started ${dateTimeFormat.format(new Date(job.createdAt))}`
          : 'The job appears here once it starts.'}
      >
        {#snippet actions()}
          {#if job}
            <Button icon="refresh" label="Refresh" busy={refreshing} onclick={refresh} />
            <Button
              variant="primary"
              icon="download"
              label="Download ZIP"
              href="https://example.com/exports/{job.filename}"
              disabled={job.status !== 'completed'}
            />
          {/if}
        {/snippet}
        {#if job}
          <Grid min="7.5rem" gap="lg">
            <Stack gap="xs">
              <span class="metric-label">Status</span>
              <Row><Badge tone={STATUS[job.status].tone} label={STATUS[job.status].label} /></Row>
            </Stack>
            {@render metric('Requested', numberFormat.format(job.requested))}
            {@render metric('Included', numberFormat.format(job.included))}
            {@render metric('Failed', numberFormat.format(job.failed))}
            {@render metric('Filename', job.filename)}
            {@render metric('Size', job.bytes == null ? '–' : formatBytes(job.bytes))}
            {@render metric(
              'Expires',
              job.expiresAt ? dateTimeFormat.format(new Date(job.expiresAt)) : '–',
            )}
          </Grid>
          {#if job.status === 'processing'}
            <ProgressBar
              value={job.included}
              max={job.requested}
              label="Packed {job.included} of {job.requested}"
              showValue
              tone="info"
            />
          {/if}
          {#if job.status === 'failed' && job.error}
            <Alert tone="error" message={job.error} />
          {:else if job.status === 'expired'}
            <Alert tone="warn">
              The archive was deleted after 24 hours. Start the export again to get a fresh link.
            </Alert>
          {:else if job.status === 'completed'}
            <Row gap="sm">
              <StatusText tone="ok" message="Ready — the link works for 24 hours." />
              <CopyButton
                size="sm"
                value="https://example.com/exports/{job.filename}"
                label="Copy link"
              />
            </Row>
          {/if}
          <StatusText
            busy={working}
            message="Checked {checked?.toLocaleTimeString('de-DE') ?? '–'}{working
              ? ' · refreshes every 2 s'
              : ''}"
          />
        {:else}
          <EmptyState
            compact
            icon="download"
            message="Nothing packed yet. Paste some document IDs and we'll zip them up."
          />
        {/if}
      </Section>

      {#if errors.length}
        <Section
          level="panel"
          title="Not included"
          description="{errors.length} of {job?.requested ?? 0} items could not be packed."
        >
          <DataTable columns={errorColumns} rows={errors} rowKey={(e) => e.id} cell={errorCell} />
        </Section>
      {/if}
    </Stack>
  </Grid>
</Page>

<style>
  .metric-label {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .metric-value {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  .mono {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
  }
  .muted {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
</style>
