<script lang="ts" module>
  export type JobState = 'idle' | 'queued' | 'running' | 'done' | 'cached' | 'failed' | 'cancelled';
</script>

<script lang="ts">
  /**
   * JobStatus molecule — where a background job stands: a state pill (spinner while it runs),
   * an optional step text ("crawling · 12 pages") and, when `total` is known, a progress bar
   * with "x of y". Purely presentational: poll the job with `utils/poll` and pass the result in.
   *
   *   <JobStatus status="running" step="importing" done={17} total={40} />
   */
  import Badge from '../atoms/Badge.svelte';
  import ProgressBar from '../atoms/ProgressBar.svelte';
  import Spinner from '../atoms/Spinner.svelte';
  import { numberFormat } from '../../utils/format';

  interface Props {
    status: JobState;
    /** What it is doing right now, e.g. "extracting". */
    step?: string | undefined;
    done?: number | undefined;
    total?: number | undefined;
    /** Extra counts on the right, e.g. "3 failed". */
    detail?: string | undefined;
    labels?: Partial<Record<JobState, string>>;
    /** The progress text, e.g. "17 of 40". */
    progressLabel?: (done: number, total: number) => string;
  }

  let {
    status,
    step,
    done,
    total,
    detail,
    labels = {},
    progressLabel = (d, t) => `${numberFormat.format(d)} of ${numberFormat.format(t)}`,
  }: Props = $props();

  const DEFAULT_LABELS: Record<JobState, string> = {
    idle: 'Not started',
    queued: 'Queued',
    running: 'Running',
    done: 'Completed',
    cached: 'Cached',
    failed: 'Failed',
    cancelled: 'Cancelled',
  };
  const TONE = {
    idle: 'neutral',
    queued: 'neutral',
    running: 'info',
    done: 'live',
    cached: 'live',
    failed: 'danger',
    cancelled: 'locked',
  } as const;

  const working = $derived(status === 'queued' || status === 'running');
  const label = $derived(labels[status] ?? DEFAULT_LABELS[status]);
  const showBar = $derived(total != null && total > 0 && status !== 'idle');
</script>

<div class="job" aria-live="polite">
  <div class="line">
    <Badge tone={TONE[status]} dot={!working && status !== 'idle'}>
      {#if working}<Spinner size={11} label="" />{/if}{label}
    </Badge>
    {#if step}<span class="step">{step}</span>{/if}
    {#if detail}<span class="detail">{detail}</span>{/if}
  </div>
  {#if showBar}
    <ProgressBar
      value={done ?? 0}
      max={total ?? 0}
      label={progressLabel(done ?? 0, total ?? 0)}
      showValue
      tone={status === 'failed' ? 'warn' : status === 'done' || status === 'cached' ? 'ok' : 'info'}
    />
  {/if}
</div>

<style>
  .job {
    display: grid;
    gap: var(--space-2);
  }
  .line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
  }
  .step {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
  }
  .detail {
    margin-left: auto;
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
</style>
