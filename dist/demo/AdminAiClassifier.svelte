<script lang="ts">
  /**
   * AI lab › Classifier (Storybook only): a test bench for an input classifier. The text you
   * type is classified on the right; beside it, the probe matrix fires canned inputs and answers
   * in the cell you pressed — a quiet tick when the class and facet match, colour only for a
   * miss — so probing never overwrites your own text or result.
   */
  import { onDestroy, onMount } from 'svelte';
  import Grid from '../patterns/layout/Grid.svelte';
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
  import CopyButton from '../patterns/molecules/CopyButton.svelte';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
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
    /** Runs every probe once on load and opens a mismatch (for stories). */
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

  // Short column heads keep the matrix low enough to sit right under the input.
  const SHORT: Record<Facet, string> = {
    location: 'loc',
    time: 'time',
    person: 'pers',
    organisation: 'org',
    topic: 'topic',
    quantity: 'qty',
    price: 'price',
    contact: 'mail',
  };

  type Probe = { cls: InputClass; facet: Facet };
  type Outcome = { ok: boolean; input: string; result: Classification };
  const keyOf = (p: Probe) => `${p.cls}×${p.facet}`;
  const ALL: Probe[] = CLASSES.flatMap((cls) => FACETS.map((facet) => ({ cls, facet })));

  let text = $state('Find a venue in Leipzig for 300 people next Friday');
  let touched = $state(false);
  let busy = $state(false);
  let result = $state<Classification | null>(null);
  let lang = $state<'de' | 'en'>('en');
  let outcomes = $state<Record<string, Outcome>>({});
  let probing = $state<string | null>(null);
  let openCell = $state<string | null>(null);
  let runningAll = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  let probeTimer: ReturnType<typeof setTimeout> | undefined;
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
  const ran = $derived(Object.keys(outcomes).length);
  const misses = $derived(Object.values(outcomes).filter((o) => !o.ok).length);
  const json = $derived(result ? JSON.stringify(result, null, 2) : '');

  function probeOutcome(p: Probe): Outcome {
    const input = probeInput(p.cls, p.facet, lang);
    const r = classify(input, p);
    return { ok: r.class === p.cls && r.facets.some((f) => f.key === p.facet), input, result: r };
  }

  function run() {
    touched = true;
    if (length < MIN || length > MAX) return;
    busy = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      result = classify(text);
      busy = false;
    }, 350);
  }

  /** Fires one probe; its answer appears in the cell's own popover. */
  function fire(p: Probe) {
    const key = keyOf(p);
    probing = key;
    clearTimeout(probeTimer);
    probeTimer = setTimeout(() => {
      outcomes = { ...outcomes, [key]: probeOutcome(p) };
      probing = null;
    }, 300);
  }

  function runAll() {
    clearTimeout(sweep);
    openCell = null;
    runningAll = true;
    const fresh: Record<string, Outcome> = {};
    let i = 0;
    const tick = () => {
      const p = ALL[i];
      if (!p) {
        runningAll = false;
        return;
      }
      fresh[keyOf(p)] = probeOutcome(p);
      outcomes = { ...fresh };
      i += 1;
      sweep = setTimeout(tick, 30);
    };
    tick();
  }

  function setLang(next: 'de' | 'en') {
    lang = next;
    outcomes = {};
    openCell = null;
  }

  onMount(() => {
    run();
    if (!probed) return;
    // Every probe at once, then the first mismatch opens where it sits.
    for (const p of ALL) outcomes[keyOf(p)] = probeOutcome(p);
    setTimeout(() => (openCell = 'question×time'), 400);
  });

  onDestroy(() => {
    clearTimeout(timer);
    clearTimeout(probeTimer);
    clearTimeout(sweep);
  });
</script>

{#snippet facets(r: Classification)}
  <Stack gap="sm" as="ul" class="ai-facets" aria-label="Facets by source">
    {#each SOURCES as source (source.key)}
      {@const hits = r.facets.filter((f) => f.source === source.key)}
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
{/snippet}

<Grid columns="minmax(0, 1fr) minmax(0, 1fr)" collapse="lg" gap="lg" align="start">
  <Stack gap="lg">
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
            rows={2}
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
          onclick={run}
        />
      </Row>
    </Section>

    <Section
      level="panel"
      title="Probe matrix"
      description="{CLASSES.length} classes × {FACETS.length} facets{ran
        ? ` · ${ran} run · ${misses} ${misses === 1 ? 'mismatch' : 'mismatches'}`
        : ' · press a cell to fire its canned input'}"
      data-note="probe-matrix"
    >
      {#snippet actions()}
        <SegmentedControl
          size="sm"
          label="Probe language"
          options={[
            { value: 'en', label: 'EN' },
            { value: 'de', label: 'DE' },
          ]}
          value={lang}
          onchange={setLang}
        />
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
          <thead>
            <tr>
              <th scope="col"><span class="corner">class \ facet</span></th>
              {#each FACETS as facet (facet)}
                <th scope="col"><abbr title={facet}>{SHORT[facet]}</abbr></th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each CLASSES as cls (cls)}
              <tr>
                <th scope="row">{cls}</th>
                {#each FACETS as facet (facet)}
                  {@const key = `${cls}×${facet}`}
                  {@const outcome = outcomes[key]}
                  <td>
                    <Popover
                      title="{cls} × {facet}"
                      width="20rem"
                      placement="bottom"
                      autofocus={false}
                      open={openCell === key}
                      onopenchange={(next) => (openCell = next ? key : null)}
                    >
                      {#snippet trigger(props)}
                        <button
                          {...props}
                          type="button"
                          class="cell"
                          class:ok={outcome?.ok}
                          class:miss={outcome && !outcome.ok}
                          class:busy={probing === key}
                          aria-label="Probe {cls} × {facet}{outcome
                            ? outcome.ok
                              ? ' — matches'
                              : ' — mismatch'
                            : ''}"
                          onclick={(event) => {
                            const opening = openCell !== key;
                            props.onclick(event);
                            // A fresh cell fires on the way open; a probed one just shows its answer.
                            if (opening && !outcome) fire({ cls, facet });
                          }}
                        >
                          {#if probing === key}
                            <span class="dot" aria-hidden="true"></span>
                          {:else if outcome?.ok}
                            ✓
                          {:else if outcome}
                            ✕
                          {:else}
                            <span class="dot" aria-hidden="true"></span>
                          {/if}
                        </button>
                      {/snippet}
                      <Stack gap="sm">
                        {#if !outcome || probing === key}
                          <StatusText busy message="Classifying the probe…" />
                        {:else}
                          <Row gap="xs" wrap={false} align="start">
                            <span class="probe-input">“{outcome.input}”</span>
                            <Spacer />
                            <CopyButton
                              size="sm"
                              iconOnly
                              value={outcome.input}
                              label="Copy input"
                            />
                          </Row>
                          <Row gap="xs">
                            <Badge
                              tone={outcome.result.class === cls ? 'neutral' : 'danger'}
                              label={outcome.result.class}
                            />
                            <Badge
                              tone="neutral"
                              label={outcome.result.language.toUpperCase()}
                              title="Detected language"
                            />
                            <Spacer />
                            <StatusText
                              message="{outcome.result
                                .took_ms} ms · {outcome.result.confidence.toFixed(2)}"
                            />
                          </Row>
                          {@render facets(outcome.result)}
                          <StatusText
                            tone={outcome.ok ? 'ok' : 'warn'}
                            message={outcome.ok
                              ? `Matches ${cls} × ${facet}`
                              : `Expected ${cls} × ${facet}, got ${outcome.result.class}`}
                          />
                          <Row>
                            <Spacer />
                            <Button
                              size="sm"
                              icon="refresh"
                              label="Fire again"
                              onclick={() => fire({ cls, facet })}
                            />
                          </Row>
                        {/if}
                      </Stack>
                    </Popover>
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Section>
  </Stack>

  <Section level="panel" title="Result" class="ai-result">
    {#snippet actions()}
      {#if busy}
        <StatusText busy message="Classifying…" />
      {:else if result}
        <StatusText message="{result.took_ms} ms" />
      {/if}
    {/snippet}
    {#if result}
      <Row gap="sm">
        <Badge size="lg" tone="accent" label={result.class} />
        <Badge tone="neutral" label={result.language.toUpperCase()} title="Detected language" />
        <Spacer />
        <StatusText message="confidence {result.confidence.toFixed(2)}" />
      </Row>
      {@render facets(result)}
      <CodeBlock label="Raw response" code={json} wrap />
    {:else}
      <EmptyState compact icon="sparkles" message="Classify a text to see its class and facets." />
    {/if}
  </Section>
</Grid>

<style>
  :global(.ai-facets) {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  /* The result stays beside the bench while the matrix scrolls (two-column layout only). */
  @media (min-width: 961px) {
    :global(.ai-result) {
      position: sticky;
      top: calc(var(--page-top, 0px) + var(--space-4));
    }
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
  .probe-input {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    color: var(--text-2);
    overflow-wrap: anywhere;
  }
  .matrix {
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
    min-width: 100%;
  }
  th {
    padding: var(--space-1);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-family: var(--font-mono);
    color: var(--text-2);
    text-align: center;
    white-space: nowrap;
  }
  thead th {
    vertical-align: bottom;
  }
  abbr {
    text-decoration: none;
    cursor: help;
  }
  /* The popover renders inside the cell; its panel reads left-aligned. */
  .matrix :global(.panel) {
    text-align: start;
  }
  th[scope='row'] {
    text-align: start;
    padding-inline-end: var(--space-2);
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
  .cell {
    display: inline-grid;
    place-items: center;
    width: var(--control-sm);
    height: var(--control-sm);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--fill-subtle);
    color: var(--text-3);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-out);
  }
  .cell:hover {
    border-color: var(--border-strong);
    color: var(--text);
  }
  .cell:active {
    transform: scale(0.94);
  }
  .cell:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .cell[aria-expanded='true'] {
    border-color: var(--accent);
    color: var(--text);
  }
  .cell.ok {
    color: var(--text-2);
  }
  /* The only colour in the matrix: what needs work. */
  .cell.miss {
    background: var(--tint-danger);
    border-color: var(--danger);
    color: var(--danger-strong);
  }
  .dot {
    width: var(--space-1);
    height: var(--space-1);
    border-radius: 50%;
    background: currentColor;
    opacity: 0.45;
  }
  .cell.busy .dot {
    animation: bb-pop var(--motion-base) var(--ease-out) infinite alternate;
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    .cell.busy .dot {
      animation: none;
    }
  }
</style>
