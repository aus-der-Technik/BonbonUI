<script lang="ts">
  /** Example page: a test bench for an input classifier with a probe matrix, mock model (Storybook only). */
  import { onDestroy } from 'svelte';
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import StatusText from '../patterns/atoms/StatusText.svelte';
  import Tag from '../patterns/atoms/Tag.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import CodeBlock from '../patterns/molecules/CodeBlock.svelte';
  import Disclosure from '../patterns/molecules/Disclosure.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import {
    CLASSES,
    FACETS,
    classify,
    probeInput,
    type Classification,
    type Facet,
    type FacetSource,
    type InputClass,
  } from './mock-ai';

  interface Props {
    /** Opens the probe matrix and runs every probe once (for stories). */
    probed?: boolean;
  }

  let { probed = false }: Props = $props();

  const MIN = 3;
  const MAX = 280;
  const SOURCES: { key: FacetSource; label: string }[] = [
    { key: 'model', label: 'Model' },
    { key: 'ner', label: 'NER' },
    { key: 'both', label: 'Both' },
  ];
  const CLASS_TONE: Record<InputClass, 'brand' | 'info' | 'live' | 'neutral' | 'draft'> = {
    question: 'brand',
    task: 'info',
    oneword: 'draft',
    statement: 'live',
    other: 'neutral',
  };

  type Probe = { cls: InputClass; facet: Facet };
  const key = (p: Probe) => `${p.cls}×${p.facet}`;

  let lang = $state<'de' | 'en'>('en');
  let text = $state('Find a venue in Leipzig for 300 people next Friday');
  let touched = $state(false);
  let busy = $state(false);
  let result = $state<Classification | null>(null);
  let probe = $state<Probe | null>(null);
  // svelte-ignore state_referenced_locally
  let matrixOpen = $state(probed);
  let outcomes = $state<Record<string, 'ok' | 'miss'>>({});
  let runningAll = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  let sweep: ReturnType<typeof setTimeout> | undefined;

  const length = $derived(text.trim().length);
  const error = $derived(
    !touched
      ? undefined
      : length < MIN
        ? `Type at least ${MIN} characters`
        : length > MAX
          ? `Keep it under ${MAX} characters`
          : undefined,
  );
  const matches = $derived(
    !!(probe && result) &&
      result?.class === probe?.cls &&
      !!result?.facets.some((f) => f.key === probe?.facet),
  );
  const ran = $derived(Object.keys(outcomes).length);
  const misses = $derived(Object.values(outcomes).filter((o) => o === 'miss').length);
  const json = $derived(result ? JSON.stringify(result, null, 2) : '');

  function judge(p: Probe, r: Classification): 'ok' | 'miss' {
    return r.class === p.cls && r.facets.some((f) => f.key === p.facet) ? 'ok' : 'miss';
  }

  function run(next: Probe | null = null) {
    touched = true;
    if (next) text = probeInput(next.cls, next.facet, lang);
    if (!next && (text.trim().length < MIN || text.trim().length > MAX)) return;
    probe = next;
    busy = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const r = classify(text, next ?? undefined);
      result = r;
      if (next) outcomes = { ...outcomes, [key(next)]: judge(next, r) };
      busy = false;
    }, 350);
  }

  function runAll() {
    clearTimeout(sweep);
    runningAll = true;
    const all = CLASSES.flatMap((cls) => FACETS.map((facet) => ({ cls, facet })));
    const fresh: Record<string, 'ok' | 'miss'> = {};
    let i = 0;
    const tick = () => {
      const p = all[i];
      if (!p) {
        runningAll = false;
        return;
      }
      fresh[key(p)] = judge(p, classify(probeInput(p.cls, p.facet, lang), p));
      outcomes = { ...fresh };
      i += 1;
      sweep = setTimeout(tick, 40);
    };
    tick();
  }

  // svelte-ignore state_referenced_locally
  if (probed) runAll();
  // svelte-ignore state_referenced_locally
  run(probed ? { cls: 'question', facet: 'time' } : null);

  onDestroy(() => {
    clearTimeout(timer);
    clearTimeout(sweep);
  });
</script>

<Page title="Classifier" subtitle="test bench for user input" footer="Example Corp · internal">
  {#snippet actions()}
    <SegmentedControl
      size="sm"
      label="Probe language"
      options={[
        { value: 'de', label: 'DE' },
        { value: 'en', label: 'EN' },
      ]}
      bind:value={lang}
      onchange={() => (outcomes = {})}
    />
  {/snippet}

  <Grid columns="minmax(0, 1fr) minmax(0, 1fr)" collapse="lg" gap="lg" align="start">
    <Section
      level="panel"
      title="Input"
      description="Anything a user might type into a search or chat box."
    >
      <Field label="Text" {error}>
        {#snippet children({ id, errorId, invalid })}
          <Textarea
            {id}
            bind:value={text}
            rows={3}
            autogrow
            maxRows={8}
            counter
            limit={MAX}
            {invalid}
            aria-describedby={invalid ? errorId : undefined}
            onblur={() => (touched = true)}
            onkeydown={(e) => (e.metaKey || e.ctrlKey) && e.key === 'Enter' && run()}
          />
        {/snippet}
      </Field>
      <Row>
        <StatusText message="{MIN}–{MAX} characters · ⌘ Enter classifies" />
        <Spacer />
        <Button
          variant="primary"
          icon="sparkles"
          label="Classify"
          busyLabel="Classifying…"
          {busy}
          onclick={() => run()}
        />
      </Row>
    </Section>

    <Section level="panel" title="Result">
      {#snippet actions()}
        {#if busy}
          <StatusText busy message="Classifying…" />
        {:else if probe && result}
          <StatusText
            tone={matches ? 'ok' : 'warn'}
            message={matches
              ? `matches ${probe.cls} × ${probe.facet}`
              : `expected ${probe.cls} × ${probe.facet}`}
          />
        {:else if result}
          <StatusText message="{result.took_ms} ms" />
        {/if}
      {/snippet}
      {#if result}
        <Row gap="sm">
          <Badge size="lg" tone={CLASS_TONE[result.class]} label={result.class} />
          <Badge tone="neutral" label={result.language.toUpperCase()} title="Detected language" />
          <Spacer />
          <StatusText message="confidence {result.confidence.toFixed(2)}" />
        </Row>
        <Stack gap="sm" as="ul" class="facets" aria-label="Facets by source">
          {#each SOURCES as source (source.key)}
            {@const hits = result.facets.filter((f) => f.source === source.key)}
            <Row as="li" gap="xs" align="baseline">
              <span class="source">{source.label}</span>
              {#each hits as hit (hit.key)}
                <Tag mono name={hit.key} label={hit.value} />
              {:else}
                <span class="none">—</span>
              {/each}
            </Row>
          {/each}
        </Stack>
        <CodeBlock label="Raw response" code={json} wrap />
      {:else}
        <EmptyState
          compact
          icon="sparkles"
          message="Classify a text or fire a probe to see the class and facets."
        />
      {/if}
    </Section>
  </Grid>

  <Layer level="panel">
    <Disclosure
      title="Probe matrix"
      meta="{CLASSES.length} classes × {FACETS.length} facets{ran
        ? ` · ${ran} run · ${misses} ${misses === 1 ? 'mismatch' : 'mismatches'}`
        : ''}"
      bind:open={matrixOpen}
    >
      {#snippet actions()}
        <Button
          size="sm"
          icon="play"
          label="Run all"
          busyLabel="Running…"
          busy={runningAll}
          onclick={runAll}
        />
      {/snippet}
      <div class="matrix">
        <table>
          <caption class="hint">
            Each cell fires a canned {lang.toUpperCase()} input that should come back as that class with
            that facet.
          </caption>
          <thead>
            <tr>
              <th scope="col"><span class="corner">class \ facet</span></th>
              {#each FACETS as facet (facet)}<th scope="col">{facet}</th>{/each}
            </tr>
          </thead>
          <tbody>
            {#each CLASSES as cls (cls)}
              <tr>
                <th scope="row">{cls}</th>
                {#each FACETS as facet (facet)}
                  {@const outcome = outcomes[`${cls}×${facet}`]}
                  <td>
                    <Button
                      size="xs"
                      iconOnly
                      variant={outcome === 'ok'
                        ? 'success'
                        : outcome === 'miss'
                          ? 'danger'
                          : 'secondary'}
                      icon={outcome === 'ok' ? 'check' : outcome === 'miss' ? 'alert' : 'play'}
                      label="Probe {cls} × {facet}{outcome === 'ok'
                        ? ' — matches'
                        : outcome === 'miss'
                          ? ' — mismatch'
                          : ''}"
                      title={probeInput(cls, facet, lang)}
                      onclick={() => run({ cls, facet })}
                    />
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Disclosure>
  </Layer>
</Page>

<style>
  :global(.facets) {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .source {
    min-width: 3.5rem;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .none {
    color: var(--text-3);
  }
  .matrix {
    overflow-x: auto;
    margin-top: var(--space-2);
  }
  table {
    border-collapse: collapse;
    min-width: 100%;
  }
  caption {
    padding-bottom: var(--space-3);
    text-align: start;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  th {
    padding: var(--space-1) var(--space-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-family: var(--font-mono);
    color: var(--text-2);
    text-align: center;
    white-space: nowrap;
  }
  th[scope='row'] {
    text-align: start;
  }
  .corner {
    color: var(--text-3);
    font-family: var(--font-sans);
    font-weight: var(--fw-medium);
  }
  td {
    padding: var(--space-1);
    text-align: center;
  }
</style>
