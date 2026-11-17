<script lang="ts">
  /**
   * Admin console · Jobs (Storybook only): crawl a site and run a prompt on every page, as a
   * mock background job. What happens depends on the input, like a real service: a site on
   * down.example.com never answers, flaky.example.com fails once, and the same URL and prompt
   * as the last finished run come straight from the cache.
   */
  import { onMount } from 'svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Link from '../patterns/atoms/Link.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Disclosure from '../patterns/molecules/Disclosure.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import JobStatus, { type JobState } from '../patterns/molecules/JobStatus.svelte';
  import Markdown from '../patterns/molecules/Markdown.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import { celebrate } from '../utils/delight';
  import { numberFormat } from '../utils/format';
  import AdminHead from './AdminHead.svelte';
  import type { SectionProps } from './admin';
  import { CRAWL_SYSTEM_PROMPT, CRAWL_TEMPLATE, crawledPages } from './mock-ai';

  interface Props extends SectionProps {
    /** Starts a crawl on load that ends this way (`idle`: wait for Start). */
    scenario?: 'idle' | 'running' | 'retrying' | 'failed' | 'cached';
    /** Running crawls changed (0 or 1), e.g. for a count in the navigation. */
    onrunning?: ((count: number) => void) | undefined;
  }

  let { active = true, notify, onnavigate, scenario = 'idle', onrunning }: Props = $props();

  type Phase =
    | 'idle'
    | 'queued'
    | 'crawling'
    | 'retrying'
    | 'extracting'
    | 'done'
    | 'failed'
    | 'cached'
    | 'cancelled';
  type Outcome = 'success' | 'retry' | 'failed';

  const PAGE_SIZE = 6;
  const MAX_ATTEMPTS = 5;
  const DEFAULT_URL = 'https://www.example.com/venues';
  const pages = crawledPages();
  const TOTAL = pages.length;
  const CHUNKS = pages.reduce((n, p) => n + p.chunks.length, 0);
  const timeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' });

  // svelte-ignore state_referenced_locally
  let url = $state(
    scenario === 'failed'
      ? 'https://down.example.com/venues'
      : scenario === 'retrying'
        ? 'https://flaky.example.com/venues'
        : DEFAULT_URL,
  );
  let depth = $state(3);
  let system = $state(CRAWL_SYSTEM_PROMPT);
  let template = $state(CRAWL_TEMPLATE);
  let touched = $state(false);
  let promptOpen = $state(false);

  let phase = $state<Phase>('idle');
  let outcome: Outcome = 'success';
  let downloaded = $state(0);
  let extracted = $state(0);
  let attempt = $state(1);
  let nextRun = $state('');
  let offset = $state(0);
  let chunkAt = $state<Record<string, number>>({});
  /** The URL + prompt of the last finished crawl, and when it ran: the cache. */
  let last = $state<{ key: string; at: Date } | null>(null);
  let ranFor = $state('');
  let results = $state<HTMLElement | undefined>();

  let timers: ReturnType<typeof setTimeout>[] = [];

  const host = (value: string) => {
    try {
      return new URL(value.trim()).hostname;
    } catch {
      return '';
    }
  };
  const runKey = () => [url.trim(), depth, system.trim(), template.trim()].join('|');

  const urlError = $derived(
    touched && !/^https?:\/\/[^\s/]+\.[^\s]+$/.test(url.trim())
      ? 'Enter a full URL starting with https://'
      : undefined,
  );
  const templateError = $derived(
    template.includes('{{content}}') ? undefined : 'The template needs the {{content}} placeholder',
  );
  const busy = $derived(
    phase === 'queued' || phase === 'crawling' || phase === 'retrying' || phase === 'extracting',
  );

  const STATUS: Record<Phase, JobState> = {
    idle: 'idle',
    queued: 'queued',
    crawling: 'running',
    retrying: 'queued',
    extracting: 'running',
    done: 'done',
    failed: 'failed',
    cached: 'cached',
    cancelled: 'cancelled',
  };
  const step = $derived(
    {
      idle: 'Fill in the form and start a crawl',
      queued: 'waiting for a free worker',
      crawling: `${numberFormat.format(downloaded)} pages downloaded`,
      retrying: `attempt ${attempt} of ${MAX_ATTEMPTS} · next run ${nextRun}`,
      extracting: 'asking the model, page by page',
      done: `${numberFormat.format(TOTAL)} pages · ${numberFormat.format(CHUNKS)} answer chunks`,
      failed: `gave up after ${MAX_ATTEMPTS} attempts`,
      cached: `unchanged since the run at ${timeFormat.format(last?.at ?? new Date())}`,
      cancelled: `stopped after ${numberFormat.format(downloaded)} pages`,
    }[phase],
  );
  const showProgress = $derived(phase === 'extracting' || phase === 'done' || phase === 'cached');

  const found = $derived(
    phase === 'done' || phase === 'cached'
      ? pages
      : phase === 'extracting' || phase === 'cancelled'
        ? pages.slice(0, extracted)
        : [],
  );
  const shown = $derived(found.slice(offset, offset + PAGE_SIZE));
  const summary = $derived(
    phase === 'cached'
      ? `${numberFormat.format(TOTAL)} pages · from the cache`
      : phase === 'extracting'
        ? `${numberFormat.format(extracted)} of ${numberFormat.format(TOTAL)} pages extracted`
        : found.length
          ? `${numberFormat.format(found.length)} pages from ${ranFor}`
          : 'One card per crawled page, as the model answers.',
  );

  // The shell counts running crawls in the navigation.
  $effect(() => onrunning?.(busy ? 1 : 0));

  function after(ms: number, task: () => void) {
    const timer = setTimeout(() => {
      timers = timers.filter((t) => t !== timer);
      task();
    }, ms);
    timers.push(timer);
  }

  // Runs `task` every `ms` until it returns false.
  function repeat(ms: number, task: () => boolean) {
    after(ms, () => {
      if (task()) repeat(ms, task);
    });
  }

  function stop() {
    for (const timer of timers) clearTimeout(timer);
    timers = [];
  }

  /** Starts a crawl; `fresh` skips the cache ("Run anyway"). */
  function start(fresh = false) {
    touched = true;
    if (templateError) promptOpen = true;
    if (urlError || templateError) return;
    stop();
    offset = 0;
    chunkAt = {};
    attempt = 1;
    ranFor = host(url) || url;
    const key = runKey();
    if (!fresh && last?.key === key) {
      downloaded = TOTAL;
      extracted = TOTAL;
      phase = 'cached';
      return;
    }
    const site = host(url);
    outcome =
      site === 'down.example.com' ? 'failed' : site === 'flaky.example.com' ? 'retry' : 'success';
    downloaded = 0;
    extracted = 0;
    phase = 'queued';
    after(900, crawl);
  }

  function crawl() {
    phase = 'crawling';
    const until = outcome === 'failed' ? 9 : outcome === 'retry' && attempt === 1 ? 14 : TOTAL;
    repeat(80, () => {
      if (downloaded < until) downloaded += 1;
      if (downloaded < until) return true;
      after(500, downloaded >= TOTAL ? extract : retry);
      return false;
    });
  }

  function retry() {
    if (attempt >= MAX_ATTEMPTS) {
      phase = 'failed';
      finished();
      return;
    }
    attempt += 1;
    nextRun = timeFormat.format(new Date(Date.now() + 120_000));
    phase = 'retrying';
    downloaded = 0;
    after(outcome === 'failed' ? 1000 : 2400, crawl);
  }

  function extract() {
    phase = 'extracting';
    repeat(130, () => {
      extracted += 1;
      if (extracted < TOTAL) return true;
      phase = 'done';
      last = { key: runKey(), at: new Date() };
      finished();
      return false;
    });
  }

  /** The end of a run: sprinkles from the results it produced, or news if you are elsewhere. */
  function finished() {
    if (!active) {
      if (phase === 'done')
        notify?.(`Crawl finished — ${numberFormat.format(TOTAL)} pages from ${ranFor}`, {
          action: { label: 'Open', onaction: () => onnavigate?.('jobs') },
        });
      else
        notify?.(`Crawl of ${ranFor} failed after ${MAX_ATTEMPTS} attempts`, {
          tone: 'error',
          action: { label: 'Open', onaction: () => onnavigate?.('jobs') },
        });
      return;
    }
    // Wait a frame so the last cards are on screen before they celebrate.
    if (phase === 'done')
      requestAnimationFrame(() => {
        const card = results?.querySelector('[data-layer="panel"]') ?? results;
        if (card) celebrate(card);
      });
  }

  function cancel() {
    stop();
    phase = 'cancelled';
  }

  function submit(event: SubmitEvent) {
    event.preventDefault();
    start();
  }

  function moveChunk(id: string, by: number) {
    chunkAt = { ...chunkAt, [id]: (chunkAt[id] ?? 0) + by };
  }

  onMount(() => {
    if (scenario === 'cached') last = { key: runKey(), at: new Date(Date.now() - 2 * 3_600_000) };
    if (scenario !== 'idle') start();
    return () => {
      stop();
      onrunning?.(0);
    };
  });
</script>

{#snippet templateHint()}
  Monospace; <code>{'{{content}}'}</code> is replaced by the text of each page.
{/snippet}

{#snippet urlHint()}
  Tip: try <code>down.example.com</code> to see a site fail, <code>flaky.example.com</code> for a retry
  — or run the same URL twice to hit the cache.
{/snippet}

<AdminHead section="jobs" />

<Grid columns="minmax(0, 25rem) minmax(0, 1fr)" collapse="lg" gap="lg" align="start">
  <Stack gap="md">
    <Section
      level="panel"
      title="New crawl"
      description="Crawls from the start URL, then runs the prompt on every page."
    >
      <Stack as="form" gap="md" onsubmit={submit}>
        <Field label="Start URL" required error={urlError} hint={urlHint}>
          {#snippet children({ id, errorId, invalid })}
            <Input
              {id}
              inputmode="url"
              bind:value={url}
              {invalid}
              aria-describedby={invalid ? errorId : undefined}
              placeholder="https://www.example.com"
              onblur={() => (touched = true)}
            />
          {/snippet}
        </Field>
        <Slider
          label="Link depth"
          bind:value={depth}
          min={1}
          max={10}
          step={1}
          format={(v) => (v === 1 ? '1 level' : `${v} levels`)}
          hint="How many links away from the start URL to follow"
        />
        <Disclosure
          title="Prompt"
          meta={templateError
            ? 'needs {{content}}'
            : `${system.trim().split(/\s+/).length} words · template with {{content}}`}
          bind:open={promptOpen}
        >
          <Stack gap="md">
            <Field label="System prompt">
              {#snippet children({ id })}
                <Textarea {id} bind:value={system} rows={3} autogrow maxRows={6} />
              {/snippet}
            </Field>
            <Field label="Prompt template" hint={templateHint} error={templateError}>
              {#snippet children({ id, errorId, invalid })}
                <Textarea
                  {id}
                  bind:value={template}
                  mono
                  rows={5}
                  autogrow
                  maxRows={10}
                  {invalid}
                  aria-describedby={invalid ? errorId : undefined}
                />
              {/snippet}
            </Field>
          </Stack>
        </Disclosure>
        <Row data-note="crawl-actions">
          <Spacer />
          {#if busy}
            <Button variant="ghost" icon="close" label="Cancel" onclick={cancel} />
          {/if}
          <Button
            type="submit"
            variant="primary"
            icon="play"
            label="Start crawl"
            busyLabel="Running…"
            {busy}
          />
        </Row>
      </Stack>
      <div class="status" data-note="crawl-status" aria-live="polite" hidden={phase === 'idle'}>
        <JobStatus
          status={STATUS[phase]}
          {step}
          done={showProgress ? extracted : undefined}
          total={showProgress ? TOTAL : undefined}
          labels={{
            running: phase === 'extracting' ? 'Extracting' : 'Crawling',
            queued: phase === 'retrying' ? 'Retrying' : 'Queued',
          }}
        />
        {#if phase === 'retrying'}
          <Alert
            tone="warn"
            message="{ranFor} answered HTTP 503. The job tries again on its own — nothing to do."
          />
        {:else if phase === 'failed'}
          <Alert
            tone="danger"
            title="The site did not answer"
            message="{ranFor} answered HTTP 503 five times. Check that it is up, then run the crawl again."
          >
            {#snippet actions()}
              <Button size="sm" icon="refresh" label="Run again" onclick={() => start(true)} />
            {/snippet}
          </Alert>
        {:else if phase === 'cancelled'}
          <Alert
            tone="info"
            message="Stopped after {numberFormat.format(
              downloaded,
            )} pages. The answers so far are kept."
          >
            {#snippet actions()}
              <Button size="sm" icon="refresh" label="Run again" onclick={() => start(true)} />
            {/snippet}
          </Alert>
        {:else if phase === 'cached'}
          <Alert
            tone="info"
            message="Nothing changed since the last run, so the stored answers are shown."
          >
            {#snippet actions()}
              <Button size="sm" icon="refresh" label="Run anyway" onclick={() => start(true)} />
            {/snippet}
          </Alert>
        {/if}
      </div>
    </Section>
  </Stack>

  <div class="results" data-note="crawl-results" bind:this={results}>
    <Section title="Results" description={summary}>
      {#if found.length}
        <Grid min="19rem">
          {#each shown as page (page.id)}
            {@const at = chunkAt[page.id] ?? 0}
            <Section level="panel" heading={3} title={page.title} gap="sm">
              <span class="url"><Link href={page.url} external muted>{page.url}</Link></span>
              <Markdown size="sm" source={page.chunks[at] ?? ''} />
              <Row gap="xs">
                <StatusText message="Chunk {at + 1} of {page.chunks.length}" />
                <Spacer />
                {#if page.chunks.length > 1}
                  <Button
                    size="xs"
                    icon="chevron-left"
                    label="Previous chunk"
                    iconOnly
                    disabled={at === 0}
                    onclick={() => moveChunk(page.id, -1)}
                  />
                  <Button
                    size="xs"
                    icon="chevron-right"
                    label="Next chunk"
                    iconOnly
                    disabled={at >= page.chunks.length - 1}
                    onclick={() => moveChunk(page.id, 1)}
                  />
                {/if}
              </Row>
            </Section>
          {/each}
        </Grid>
        <Pager
          {offset}
          limit={PAGE_SIZE}
          total={found.length}
          count={shown.length}
          onpage={(next) => (offset = next)}
        />
      {:else}
        <Layer level="panel" padding="lg">
          <EmptyState
            icon="globe"
            title={busy ? 'Crawling…' : 'Nothing crawled yet'}
            message={busy
              ? 'Answers appear here page by page while the model reads them.'
              : 'Start a crawl and the answers land here, one card per page.'}
          />
        </Layer>
      {/if}
    </Section>
  </div>
</Grid>

<style>
  .results {
    min-width: 0;
  }
  /* The job's state sits right under the button that started it. */
  .status {
    display: grid;
    gap: var(--space-3);
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-strong);
  }
  .status[hidden] {
    display: none;
  }
  .url {
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-3);
    overflow-wrap: anywhere;
  }
  code {
    font-family: var(--font-mono);
    font-size: 0.95em;
  }
</style>
