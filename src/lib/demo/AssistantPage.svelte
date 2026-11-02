<script lang="ts">
  /** Example page: ask a question, get a streamed answer with sources, mock data (Storybook only). */
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Alert from '../patterns/molecules/Alert.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Card from '../patterns/atoms/Card.svelte';
  import Slider from '../patterns/atoms/Slider.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import CheckboxGroup from '../patterns/molecules/CheckboxGroup.svelte';
  import Composer from '../patterns/molecules/Composer.svelte';
  import Disclosure from '../patterns/molecules/Disclosure.svelte';
  import Markdown from '../patterns/molecules/Markdown.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import ConfirmDialog from '../patterns/organisms/ConfirmDialog.svelte';
  import ResultPanel from '../patterns/organisms/ResultPanel.svelte';
  import { numberFormat } from '../utils/format';
  import { ANSWER } from './mock';

  const PRESETS = [
    'Conference venues in Leipzig for 300 people',
    'Sustainable event locations in Hamburg',
    'Congress centres in Bavaria',
  ];
  const TOOLS = [
    {
      value: 'search_profiles',
      label: 'search_profiles',
      description: 'Full-text search over venue profiles',
    },
    { value: 'get_profile', label: 'get_profile', description: 'One profile by id' },
    { value: 'geocode', label: 'geocode', description: 'Place name to coordinates' },
    { value: 'nearby', label: 'nearby', description: 'Profiles within a radius' },
  ];

  let question = $state('');
  let answer = $state('');
  let phase = $state<'idle' | 'streaming' | 'done' | 'error'>('idle');
  let lang = $state('en');
  let temperature = $state(0.3);
  let topP = $state(0.9);
  let maxTokens = $state(1200);
  let tools = $state(TOOLS.map((t) => t.value));
  let clearing = $state(false);
  let timer: ReturnType<typeof setInterval> | undefined;

  function ask(text: string) {
    question = text;
    clearInterval(timer);
    answer = '';
    phase = 'streaming';
    const words = ANSWER.split(/(?<=\s)/);
    let i = 0;
    timer = setInterval(() => {
      answer += words.slice(i, i + 2).join('');
      i += 2;
      if (i >= words.length) {
        clearInterval(timer);
        phase = 'done';
      }
    }, 35);
  }
</script>

<Page
  title="Assistant"
  subtitle="ask the venue directory"
  gap="md"
  footer="Example Corp · internal"
>
  {#snippet actions()}
    <SegmentedControl
      size="sm"
      label="Language"
      options={[
        { value: 'de', label: 'DE' },
        { value: 'en', label: 'EN' },
      ]}
      bind:value={lang}
    />
    <Button
      shape="pill"
      size="lg"
      variant="glass"
      icon="trash"
      label="Clear cache"
      collapse
      onclick={() => (clearing = true)}
    />
  {/snippet}

  <Grid columns="minmax(0, 24rem) minmax(0, 1fr)" collapse="lg" align="start">
    <Stack class="controls">
      <Layer level="panel" gap="sm">
        <Composer
          bind:value={question}
          label="Question"
          placeholder="Ask about venues, places or events…"
          buttonLabel="Ask"
          busyLabel="Thinking…"
          icon="send"
          busy={phase === 'streaming'}
          onsubmit={ask}
        />
        <Row gap="xs">
          {#each PRESETS as preset (preset)}
            <Button size="sm" label={preset} onclick={() => ask(preset)} />
          {/each}
        </Row>
      </Layer>
      <Layer level="panel" gap="sm">
        <Disclosure title="Sampling" meta="temperature {temperature.toFixed(2)}">
          <Stack>
            <Slider
              label="Temperature"
              bind:value={temperature}
              min={0}
              max={2}
              step={0.05}
              format={(v) => v.toFixed(2)}
              hint="Higher is more creative"
            />
            <Slider
              label="Top-p"
              bind:value={topP}
              min={0}
              max={1}
              step={0.05}
              format={(v) => v.toFixed(2)}
            />
            <Slider
              label="Max tokens"
              bind:value={maxTokens}
              min={100}
              max={4000}
              step={100}
              format={(v) => numberFormat.format(v)}
            />
          </Stack>
        </Disclosure>
        <Disclosure title="Tools" meta="{tools.length} of {TOOLS.length}">
          <CheckboxGroup
            label="Allowed tools"
            options={TOOLS}
            bind:value={tools}
            mono
            columns={1}
          />
        </Disclosure>
      </Layer>
    </Stack>

    <Stack>
      <ResultPanel
        title="Answer"
        status={phase === 'idle' ? 'empty' : phase === 'error' ? 'error' : 'ready'}
        placeholder="Ask away — or pick an example to warm up."
        copyValue={phase === 'done' ? answer : undefined}
        minHeight="18rem"
      >
        {#snippet headerEnd()}
          {#if phase === 'streaming'}
            <StatusText busy message="Streaming…" />
          {:else if phase === 'done'}
            <StatusText message="{numberFormat.format(answer.length)} characters" />
          {/if}
        {/snippet}
        <Markdown source={answer} streaming={phase === 'streaming'} />
      </ResultPanel>

      {#if phase === 'done'}
        <Alert tone="ok">
          <Badge tone="live" size="sm" label="Grounded" /> <b>Fact check:</b> every venue and capacity
          is in the sources below.
        </Alert>
        <Card title="Sources" count={3}>
          <Row gap="xs">
            <Tag href="https://example.com/hall" external label="Leipzig Congress Hall — profile" />
            <Tag
              href="https://example.com/ring"
              external
              label="Hotel am Ring — meetings & events"
            />
            <Tag href="https://example.com/pavilion" external label="Zoo Pavilion Hall" />
          </Row>
        </Card>
        <Card title="Tools used">
          <Row gap="xs">
            <Tag mono label="search_profiles" count={2} />
            <Tag mono label="get_profile" count={3} />
            <Tag mono label="geocode" count="1 failed" tone="danger" title="Timed out after 5 s" />
          </Row>
        </Card>
      {/if}
    </Stack>
  </Grid>
</Page>

<ConfirmDialog
  open={clearing}
  title="Clear the answer cache?"
  message="The next questions are answered from scratch, which is slower."
  confirmLabel="Yes, clear"
  onconfirm={() => new Promise((resolve) => setTimeout(resolve, 500))}
  onclose={() => (clearing = false)}
/>

<style>
  /* The controls stay in view while a long answer scrolls (two-column layout only). */
  @media (min-width: 961px) {
    :global(.controls) {
      position: sticky;
      top: calc(var(--page-top, 0px) + var(--space-4));
    }
  }
</style>
