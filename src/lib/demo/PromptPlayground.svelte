<script lang="ts">
  /** Example page: tune sampling and tools, stream an answer and read the judge's verdict, mock model (Storybook only). */
  import { onMount } from 'svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import CheckboxGroup from '../patterns/molecules/CheckboxGroup.svelte';
  import Composer from '../patterns/molecules/Composer.svelte';
  import ConfirmButton from '../patterns/molecules/ConfirmButton.svelte';
  import Disclosure from '../patterns/molecules/Disclosure.svelte';
  import Markdown from '../patterns/molecules/Markdown.svelte';
  import ResultPanel from '../patterns/organisms/ResultPanel.svelte';
  import Toaster from '../patterns/organisms/Toaster.svelte';
  import { numberFormat } from '../utils/format';
  import { ToastQueue } from '../utils/toasts.svelte';
  import { seeded } from './mock';
  import {
    PLAYGROUND_ANSWER,
    PLAYGROUND_PRESETS,
    PLAYGROUND_SOURCES,
    PLAYGROUND_TOOLS,
    toolUsage,
  } from './mock-ai';

  interface Props {
    /** The stream breaks off half-way, as when the model times out. */
    failing?: boolean;
    /** Asks the first example question on load (for stories). */
    autoask?: boolean;
  }

  let { failing = false, autoask = false }: Props = $props();

  type Phase = 'idle' | 'waiting' | 'streaming' | 'done' | 'error';

  let question = $state('');
  let asked = $state('');
  let answer = $state('');
  let phase = $state<Phase>('idle');
  let truncated = $state(false);
  let temperature = $state(0.3);
  let topP = $state(0.9);
  let topK = $state(40);
  let maxTokens = $state(1200);
  let tools = $state([
    'search_documents',
    'get_document',
    'geocode',
    'nearby',
    'fetch_page',
    'translate',
  ]);
  let timer: ReturnType<typeof setTimeout> | undefined;
  const toasts = new ToastQueue();

  const busy = $derived(phase === 'waiting' || phase === 'streaming');
  const sampling = $derived(
    `T ${temperature.toFixed(2)} · top-p ${topP.toFixed(2)} · top-k ${topK} · ${numberFormat.format(maxTokens)} tokens`,
  );
  const grounded = $derived(tools.includes('search_documents') || tools.includes('get_document'));
  const verdict = $derived.by(() => {
    if (!grounded)
      return { ok: false, reason: 'No search tool was allowed, so nothing backs the answer.' };
    if (truncated) return { ok: false, reason: 'The answer was cut off at the token limit.' };
    if (temperature > 1.2)
      return {
        ok: false,
        reason: `Two capacities differ from the sources — temperature ${temperature.toFixed(2)} is high.`,
      };
    return { ok: true, reason: 'Every venue and capacity in the answer is in the sources.' };
  });
  const usage = $derived(phase === 'done' ? toolUsage(tools) : []);

  function ask(text: string) {
    clearTimeout(timer);
    question = text;
    asked = text;
    answer = '';
    truncated = false;
    phase = 'waiting';
    const rand = seeded(text.length);
    // Roughly 3 characters per token; a small limit cuts the answer short.
    const budget = maxTokens * 3;
    const full = PLAYGROUND_ANSWER.slice(0, budget);
    const stopAt = failing ? Math.floor(full.length * 0.4) : full.length;
    const tokens = full.slice(0, stopAt).split(/(?<=\s)/);
    let i = 0;
    const next = () => {
      if (i >= tokens.length) {
        truncated = !failing && budget < PLAYGROUND_ANSWER.length;
        phase = failing ? 'error' : 'done';
        return;
      }
      const take = 1 + Math.floor(rand() * 3);
      answer += tokens.slice(i, i + take).join('');
      i += take;
      timer = setTimeout(next, 25 + rand() * 40);
    };
    timer = setTimeout(() => {
      phase = 'streaming';
      next();
    }, 700);
  }

  function stop() {
    clearTimeout(timer);
    truncated = true;
    phase = 'done';
  }

  onMount(() => {
    if (autoask && PLAYGROUND_PRESETS[0]) ask(PLAYGROUND_PRESETS[0]);
    return () => clearTimeout(timer);
  });
</script>

<Page title="Playground" subtitle="prompts, tools & a judge" footer="Example Corp · internal">
  {#snippet actions()}
    <ConfirmButton
      icon="trash"
      label="Clear cache"
      confirmLabel="Clear now"
      busyLabel="Clearing…"
      onconfirm={() =>
        new Promise<void>((resolve) =>
          setTimeout(() => {
            toasts.push('Answer cache cleared');
            resolve();
          }, 600),
        )}
    />
  {/snippet}

  <Grid columns="minmax(0, 24rem) minmax(0, 1fr)" collapse="lg" gap="lg" align="start">
    <Stack gap="md">
      <Layer level="panel">
        <Composer
          bind:value={question}
          label="Question"
          placeholder="Ask anything about the documents…"
          buttonLabel="Ask"
          busyLabel="Answering…"
          icon="send"
          {busy}
          onsubmit={ask}
        />
        <Row gap="xs">
          {#each PLAYGROUND_PRESETS as preset (preset)}
            <Button size="sm" label={preset} disabled={busy} onclick={() => ask(preset)} />
          {/each}
        </Row>
      </Layer>
      <Layer level="panel">
        <Disclosure title="Sampling" meta={sampling}>
          <Stack gap="md">
            <Slider
              label="Temperature"
              bind:value={temperature}
              min={0}
              max={2}
              step={0.05}
              format={(v) => v.toFixed(2)}
              hint="Above 1.2 the judge starts finding made-up figures"
            />
            <Slider
              label="Top-p"
              bind:value={topP}
              min={0}
              max={1}
              step={0.05}
              format={(v) => v.toFixed(2)}
            />
            <Slider label="Top-k" bind:value={topK} min={1} max={100} step={1} />
            <Slider
              label="Max tokens"
              bind:value={maxTokens}
              min={100}
              max={4000}
              step={100}
              format={(v) => numberFormat.format(v)}
              hint="Below 500 the answer is cut off"
            />
          </Stack>
        </Disclosure>
      </Layer>
      <Layer level="panel">
        <CheckboxGroup
          label="Allowed tools"
          options={PLAYGROUND_TOOLS}
          bind:value={tools}
          mono
          columns={1}
          countLabel={(n, total) => `${n} of ${total} tools`}
        />
      </Layer>
    </Stack>

    <Stack gap="md">
      <ResultPanel
        title={asked || 'Answer'}
        status={phase === 'idle'
          ? 'empty'
          : phase === 'waiting'
            ? 'loading'
            : phase === 'error'
              ? 'error'
              : 'ready'}
        placeholder="Ask away — or pick an example to warm up."
        loadingLabel="Waiting for the first token…"
        error="The model stopped after {numberFormat.format(
          answer.length,
        )} characters: the upstream service timed out after 30 s. Try again or lower max tokens."
        copyValue={phase === 'done' ? answer : undefined}
        minHeight="20rem"
      >
        {#snippet headerEnd()}
          {#if phase === 'waiting'}
            <StatusText busy message="Waiting…" />
          {:else if phase === 'streaming'}
            <StatusText busy message="{numberFormat.format(answer.length)} characters" />
            <Button size="xs" icon="pause" label="Stop" onclick={stop} />
          {:else if phase === 'done'}
            <StatusText message="{numberFormat.format(answer.length)} characters" />
          {:else if phase === 'error'}
            <StatusText tone="error" message="Stopped" />
          {/if}
        {/snippet}
        <Markdown source={answer} streaming={phase === 'streaming'} />
      </ResultPanel>

      {#if phase === 'done'}
        <Alert tone={verdict.ok ? 'ok' : 'error'} variant="card">
          <Row gap="sm" align="center">
            <Badge
              size="sm"
              tone={verdict.ok ? 'live' : 'danger'}
              label={verdict.ok ? 'OK' : 'FAIL'}
            />
            <span><b>Judge:</b> {verdict.reason}</span>
          </Row>
        </Alert>
        <Grid min="17rem">
          <Section level="panel" heading={3} title="Sources" layout="row" gap="xs">
            {#if grounded}
              {#each PLAYGROUND_SOURCES as source (source.href)}
                <Tag href={source.href} external label={source.label} maxWidth="100%" />
              {/each}
            {:else}
              <StatusText message="No sources — no search tool was allowed." />
            {/if}
          </Section>
          <Section level="panel" heading={3} title="Tool usage" layout="row" gap="xs">
            {#each usage as use (use.tool)}
              <Tag mono label={use.tool} count={use.calls} title="{use.calls} calls" />
              {#if use.failed}
                <Tag
                  mono
                  tone="danger"
                  label={use.tool}
                  count="{use.failed} failed"
                  title={use.error}
                />
              {/if}
            {:else}
              <StatusText message="No tools called." />
            {/each}
          </Section>
        </Grid>
      {/if}
    </Stack>
  </Grid>
</Page>

<Toaster toasts={toasts.items} ondismiss={(id) => toasts.dismiss(id)} />
