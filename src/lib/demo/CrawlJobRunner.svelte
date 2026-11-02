<script lang="ts">
  /** Example page: crawl a site and extract answers per page with a prompt, mock job (Storybook only). */
  import { onMount } from 'svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Link from '../patterns/atoms/Link.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import JobStatus, { type JobState } from '../patterns/molecules/JobStatus.svelte';
  import Markdown from '../patterns/molecules/Markdown.svelte';
  import Pager from '../patterns/molecules/Pager.svelte';
  import { celebrate } from '../utils/delight';
  import { numberFormat } from '../utils/format';
  import { CRAWL_SYSTEM_PROMPT, CRAWL_TEMPLATE, crawledPages } from './mock-ai';

  interface Props {
    /** How the simulated job goes. */
    scenario?: 'success' | 'retry' | 'failed' | 'cached';
    /** Starts the job right away (for stories). */
    autostart?: boolean;
  }

  let { scenario = 'success', autostart = false }: Props = $props();

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

  const PAGE_SIZE = 6;
  const MAX_ATTEMPTS = 5;
  const pages = crawledPages();
  const TOTAL = pages.length;

  let url = $state('https://www.example.com/venues');
  let depth = $state(3);
  let system = $state(CRAWL_SYSTEM_PROMPT);
  let template = $state(CRAWL_TEMPLATE);
  let touched = $state(false);

  let phase = $state<Phase>('idle');
  let downloaded = $state(0);
  let extracted = $state(0);
  let attempt = $state(1);
  let nextRun = $state('');
  let offset = $state(0);
  let chunkAt = $state<Record<string, number>>({});

  let timers: ReturnType<typeof setTimeout>[] = [];
  // The Start button the job came from: a finished crawl throws its sprinkles from there.
  let origin: Element | null = null;

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
      done: `${numberFormat.format(TOTAL)} pages · ${numberFormat.format(pages.reduce((n, p) => n + p.chunks.length, 0))} answer chunks`,
      failed: `gave up after ${MAX_ATTEMPTS} attempts`,
      cached: 'same URL and prompt as 2 hours ago',
      cancelled: `stopped after ${numberFormat.format(downloaded)} pages`,
    }[phase],
  );
  const showProgress = $derived(phase === 'extracting' || phase === 'done' || phase === 'cached');

  const results = $derived(
    phase === 'done' || phase === 'cached'
      ? pages
      : phase === 'extracting' || phase === 'cancelled'
        ? pages.slice(0, extracted)
        : [],
  );
  const shown = $derived(results.slice(offset, offset + PAGE_SIZE));
  const summary = $derived(
    phase === 'cached'
      ? `${numberFormat.format(TOTAL)} pages · cached`
      : phase === 'extracting'
        ? `${numberFormat.format(extracted)} of ${numberFormat.format(TOTAL)} pages extracted`
        : `${numberFormat.format(results.length)} pages`,
  );

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

  function start() {
    touched = true;
    if (urlError || templateError) return;
    stop();
    offset = 0;
    chunkAt = {};
    attempt = 1;
    if (scenario === 'cached') {
      downloaded = TOTAL;
      extracted = TOTAL;
      phase = 'cached';
      return;
    }
    downloaded = 0;
    extracted = 0;
    phase = 'queued';
    after(900, crawl);
  }

  function crawl() {
    phase = 'crawling';
    const until = scenario === 'failed' ? 9 : scenario === 'retry' && attempt === 1 ? 14 : TOTAL;
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
      return;
    }
    attempt += 1;
    nextRun = new Date(Date.now() + 120_000).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    phase = 'retrying';
    after(scenario === 'failed' ? 1000 : 2400, crawl);
  }

  function extract() {
    phase = 'extracting';
    repeat(130, () => {
      extracted += 1;
      if (extracted < TOTAL) return true;
      phase = 'done';
      if (origin) celebrate(origin);
      origin = null;
      return false;
    });
  }

  function cancel() {
    stop();
    phase = 'cancelled';
  }

  function submit(event: SubmitEvent) {
    event.preventDefault();
    origin = event.submitter;
    start();
  }

  function moveChunk(id: string, by: number) {
    chunkAt = { ...chunkAt, [id]: (chunkAt[id] ?? 0) + by };
  }

  onMount(() => {
    if (autostart) start();
    return stop;
  });
</script>

{#snippet templateHint()}
  Monospace; <code>{'{{content}}'}</code> is replaced by the text of each page.
{/snippet}

<Page title="Crawl & extract" subtitle="answers from a whole site" footer="Example Corp · internal">
  <Grid columns="minmax(0, 25rem) minmax(0, 1fr)" collapse="lg" gap="lg" align="start">
    <Stack gap="md">
      <Section
        level="panel"
        title="New job"
        description="Crawls from the start URL, then runs the prompt on every page."
      >
        <Stack as="form" gap="md" onsubmit={submit}>
          <Field label="Start URL" required error={urlError}>
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
          <Row>
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
              disabled={!!templateError}
            />
          </Row>
        </Stack>
      </Section>

      <Section level="panel" title="Status">
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
          <Alert tone="warn" message="The site answered HTTP 503. The job retries on its own." />
        {:else if phase === 'failed'}
          <Alert
            tone="error"
            message="The start URL answered HTTP 503 five times. Check that the site is up, then start again."
          />
        {:else if phase === 'cached'}
          <Alert
            tone="info"
            message="Nothing changed since the last run, so the stored results are shown. Edit the prompt to run again."
          />
        {/if}
      </Section>
    </Stack>

    <Section title="Results" description={summary}>
      {#if results.length}
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
          total={results.length}
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
              : 'Start a job and the answers land here, one card per page.'}
          />
        </Layer>
      {/if}
    </Section>
  </Grid>
</Page>

<style>
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
