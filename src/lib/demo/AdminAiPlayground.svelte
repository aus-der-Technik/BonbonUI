<script lang="ts">
  /**
   * AI lab › Playground (Storybook only): ask a question with tuned sampling and allowed tools,
   * read the streamed answer, the judge's verdict, sources and tool usage. The settings are
   * frozen when you ask, so the verdict always belongs to the answer on screen.
   */
  import { onMount } from 'svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
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
  import { numberFormat } from '../utils/format';
  import { later } from './admin';
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
    /** Asks the first example question on load. */
    autoask?: boolean;
  }

  let { failing = false, autoask = false }: Props = $props();

  type Phase = 'idle' | 'waiting' | 'streaming' | 'done' | 'error';
  interface Settings {
    temperature: number;
    topP: number;
    topK: number;
    maxTokens: number;
    tools: string[];
  }

  let question = $state('');
  let answer = $state('');
  let phase = $state<Phase>('idle');
  let truncated = $state(false);
  let fromCache = $state(false);
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
  // What the answer on screen was produced with: the verdict reads these, never the live knobs.
  let asked = $state<{ text: string; settings: Settings } | null>(null);
  let cache = $state<string[]>([]);
  let cleared = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const settings = $derived<Settings>({ temperature, topP, topK, maxTokens, tools });
  const busy = $derived(phase === 'waiting' || phase === 'streaming');
  const describe = (s: Settings) =>
    `T ${s.temperature.toFixed(2)} · top-p ${s.topP.toFixed(2)} · top-k ${s.topK} · ${numberFormat.format(s.maxTokens)} tokens`;
  const keyOf = (text: string, s: Settings) => JSON.stringify([text.trim().toLowerCase(), s]);
  const changed = $derived(!!asked && JSON.stringify(asked.settings) !== JSON.stringify(settings));

  const grounded = (s: Settings) =>
    s.tools.includes('search_documents') || s.tools.includes('get_document');
  const verdict = $derived.by(() => {
    if (!asked) return null;
    const s = asked.settings;
    if (!grounded(s))
      return { ok: false, reason: 'No search tool was allowed, so nothing backs the answer.' };
    if (truncated) return { ok: false, reason: 'The answer was cut off at the token limit.' };
    if (s.temperature > 1.2)
      return {
        ok: false,
        reason: `Two capacities differ from the sources — temperature ${s.temperature.toFixed(2)} is high.`,
      };
    return { ok: true, reason: 'Every venue and capacity in the answer is in the sources.' };
  });
  const usage = $derived(phase === 'done' && asked ? toolUsage(asked.settings.tools) : []);

  function ask(text: string) {
    clearTimeout(timer);
    const frozen: Settings = { ...settings, tools: [...settings.tools] };
    const key = keyOf(text, frozen);
    question = text;
    asked = { text, settings: frozen };
    answer = '';
    truncated = false;
    cleared = false;
    // Roughly 3 characters per token; a small limit cuts the answer short.
    const budget = frozen.maxTokens * 3;
    const full = PLAYGROUND_ANSWER.slice(0, budget);
    fromCache = cache.includes(key);
    if (fromCache) {
      answer = full;
      truncated = budget < PLAYGROUND_ANSWER.length;
      phase = 'done';
      return;
    }
    phase = 'waiting';
    const rand = seeded(text.length);
    const stopAt = failing ? Math.floor(full.length * 0.4) : full.length;
    const tokens = full.slice(0, stopAt).split(/(?<=\s)/);
    let i = 0;
    const next = () => {
      if (i >= tokens.length) {
        truncated = !failing && budget < PLAYGROUND_ANSWER.length;
        phase = failing ? 'error' : 'done';
        if (!failing) cache = [...cache, key];
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

  async function clearCache() {
    await later(600);
    cache = [];
    cleared = true;
  }

  onMount(() => {
    if (autoask && PLAYGROUND_PRESETS[0]) ask(PLAYGROUND_PRESETS[0]);
    return () => clearTimeout(timer);
  });
</script>

<Grid columns="minmax(0, 24rem) minmax(0, 1fr)" collapse="lg" gap="lg" align="start">
  <Stack gap="md" class="ai-controls">
    <Layer level="panel" gap="sm">
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
    <Layer level="panel" gap="sm">
      <Disclosure
        title="Sampling"
        meta="T {temperature.toFixed(2)} · p {topP.toFixed(2)} · k {topK} · {numberFormat.format(
          maxTokens,
        )} tok"
      >
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
      <Disclosure title="Tools" meta="{tools.length} of {PLAYGROUND_TOOLS.length} allowed">
        <CheckboxGroup
          label="Allowed tools"
          options={PLAYGROUND_TOOLS}
          bind:value={tools}
          mono
          columns={1}
          countLabel={(n, total) => `${n} of ${total} tools`}
        />
      </Disclosure>
    </Layer>
    <Layer level="panel" gap="sm" data-note="clear-cache">
      <Row gap="sm" wrap={false}>
        <StatusText
          tone={cleared ? 'ok' : 'muted'}
          message={cleared
            ? 'Cache empty — the next answers start from scratch.'
            : cache.length
              ? `${cache.length} ${cache.length === 1 ? 'answer' : 'answers'} cached · asked again, they come back at once`
              : 'No answers cached yet.'}
        />
        <Spacer />
        <ConfirmButton
          size="sm"
          icon="trash"
          label="Clear cache"
          doneLabel="Cleared"
          confirmLabel="Clear now"
          busyLabel="Clearing…"
          disabled={!cache.length}
          onconfirm={clearCache}
        />
      </Row>
    </Layer>
  </Stack>

  <Stack gap="md">
    <ResultPanel
      title={asked?.text || 'Answer'}
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
          <StatusText
            message="{numberFormat.format(answer.length)} characters{fromCache
              ? ' · from cache'
              : ''}"
          />
        {:else if phase === 'error'}
          <StatusText tone="error" message="Stopped" />
          {#if asked}
            <Button size="xs" icon="refresh" label="Try again" onclick={() => ask(asked!.text)} />
          {/if}
        {/if}
      {/snippet}
      <Markdown source={answer} streaming={phase === 'streaming'} />
    </ResultPanel>

    {#if phase === 'done' && verdict && asked}
      <div data-note="verdict">
        <Alert tone={verdict.ok ? 'ok' : 'danger'} variant="card">
          <Stack gap="xs">
            <Row gap="sm" align="center">
              <Badge
                size="sm"
                tone={verdict.ok ? 'ok' : 'danger'}
                label={verdict.ok ? 'OK' : 'FAIL'}
              />
              <span><b>Judge:</b> {verdict.reason}</span>
            </Row>
            <span class="asked-with">Judged with {describe(asked.settings)}</span>
          </Stack>
          {#snippet actions()}
            {#if changed}
              <Button
                size="sm"
                icon="refresh"
                label="Ask with new settings"
                onclick={() => asked && ask(asked.text)}
              />
            {/if}
          {/snippet}
        </Alert>
      </div>
      <Grid min="17rem">
        <Section heading={3} title="Sources" layout="row" gap="xs">
          {#if grounded(asked.settings)}
            {#each PLAYGROUND_SOURCES as source (source.href)}
              <Tag href={source.href} external label={source.label} maxWidth="100%" />
            {/each}
          {:else}
            <StatusText message="No sources — no search tool was allowed." />
          {/if}
        </Section>
        <Section heading={3} title="Tool usage" layout="row" gap="xs">
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

<style>
  .asked-with {
    color: var(--text-3);
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
  }
  /* The controls stay in view while a long answer scrolls (two-column layout only). */
  @media (min-width: 961px) {
    :global(.ai-controls) {
      position: sticky;
      top: calc(var(--page-top, 0px) + var(--space-4));
    }
  }
</style>
