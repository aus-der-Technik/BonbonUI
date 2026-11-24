<script lang="ts">
  /**
   * Example page: a data analyst's workbench. A NavRail on glass at the left, the tables and
   * their columns on the ground beside it, and two panels — the query editor and the result
   * table — with the chart of the result on the ground next to the table. The query language is
   * a tiny SQL-like one over in-memory rows (mock-data.ts). Running a query answers at the
   * result's head: the row count and the time glow. A mistake is explained under the editor,
   * with the likely fix one click away. Storybook only.
   */
  import { onDestroy, tick } from 'svelte';
  import Avatar from '../patterns/atoms/Avatar.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import DotMatrix from '../patterns/atoms/DotMatrix.svelte';
  import Icon from '../patterns/atoms/Icon.svelte';
  import Kbd from '../patterns/atoms/Kbd.svelte';
  import Textarea from '../patterns/atoms/Textarea.svelte';
  import { changeCue } from '../patterns/atoms/changed';
  import EmptyState from '../patterns/molecules/EmptyState.svelte';
  import ChartCard from '../patterns/organisms/ChartCard.svelte';
  import DataTable, { type Column } from '../patterns/organisms/DataTable.svelte';
  import HorizontalBarChart from '../patterns/organisms/HorizontalBarChart.svelte';
  import LineChart from '../patterns/organisms/LineChart.svelte';
  import NavRail from '../patterns/organisms/NavRail.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import type { IconName } from '../patterns/atoms/icons';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    QueryError,
    runQuery,
    savedQueries,
    statePresets,
    tables,
    type QueryResult,
    type Row,
  } from './mock-data';

  type Preset = 'by-region' | 'by-month' | 'refunds' | 'low-stock' | 'broken' | 'empty';

  interface Props {
    /** The query in the editor when the page opens; it runs once on open. */
    preset?: Preset;
  }

  let { preset = 'by-region' }: Props = $props();

  const PAGE = 50;
  const railItems: { id: string; label: string; icon: IconName }[] = [
    { id: 'explore', label: 'Explore', icon: 'database' },
    { id: 'saved', label: 'Saved queries', icon: 'bookmark' },
    { id: 'history', label: 'History', icon: 'clock' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const presetSql = (p: Preset) =>
    p === 'broken' || p === 'empty'
      ? statePresets[p]
      : (savedQueries.find((q) => q.id === p) ?? savedQueries[0]!).sql;

  // svelte-ignore state_referenced_locally
  let sql = $state(presetSql(preset));
  let ranSql = $state<string | null>(null);
  let result = $state<QueryResult | null>(null);
  let error = $state<QueryError | null>(null);
  let running = $state(false);
  let runCount = $state(0);
  let shown = $state(PAGE);
  let sortKey = $state<string | undefined>();
  let order = $state<'asc' | 'desc'>('asc');
  let section = $state('explore');
  let openTables = $state<Record<string, boolean>>({ orders: true });
  let editor = $state<HTMLElement | undefined>();
  let timer: ReturnType<typeof setTimeout> | undefined;

  const dirty = $derived(ranSql !== null && sql.trim() !== ranSql.trim());
  const lineCount = $derived(sql.split('\n').length);
  const loaded = $derived(savedQueries.find((q) => q.sql.trim() === sql.trim())?.id);

  const field = () => editor?.querySelector('textarea') ?? null;

  function run() {
    if (running) return;
    running = true;
    clearTimeout(timer);
    // A short pause, as a real warehouse would take; the engine itself answers at once.
    timer = setTimeout(() => {
      running = false;
      ranSql = sql;
      try {
        result = runQuery(sql);
        error = null;
        shown = PAGE;
        sortKey = undefined;
        runCount += 1;
      } catch (e) {
        if (!(e instanceof QueryError)) throw e;
        error = e;
      }
    }, 380);
  }

  onDestroy(() => clearTimeout(timer));

  // The page opens with its query already answered.
  run();

  function onkeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      run();
    }
  }

  async function insert(text: string) {
    const el = field();
    if (!el) return;
    const start = el.selectionStart ?? sql.length;
    const end = el.selectionEnd ?? start;
    const before = sql.slice(0, start);
    const pad = before && !/[\s(,]$/.test(before) ? ' ' : '';
    sql = `${before}${pad}${text}${sql.slice(end)}`;
    await tick();
    el.focus();
    const at = start + pad.length + text.length;
    el.setSelectionRange(at, at);
  }

  function load(text: string) {
    sql = text;
    field()?.focus();
  }

  function applyFix() {
    if (!error?.fix) return;
    sql = error.fix;
    run();
  }

  // ── The result ──────────────────────────────────────────────────────────────────────────

  const sorted = $derived.by(() => {
    if (!result) return [];
    if (!sortKey) return result.rows;
    const key = sortKey;
    const sign = order === 'asc' ? 1 : -1;
    return [...result.rows].sort((a, b) =>
      a[key]! < b[key]! ? -sign : a[key]! > b[key]! ? sign : 0,
    );
  });

  const columns = $derived<Column[]>(
    (result?.columns ?? []).map((c) => ({
      key: c.name,
      label: c.name,
      sortable: true,
      align: c.type === 'number' || c.type === 'key' ? 'end' : 'start',
      nowrap: true,
    })),
  );

  /** Columns whose values are not all whole numbers get two decimals. */
  const decimals = $derived(
    new Set(
      (result?.columns ?? [])
        .filter(
          (c) => c.type === 'number' && result!.rows.some((r) => !Number.isInteger(r[c.name])),
        )
        .map((c) => c.name),
    ),
  );
  const types = $derived(new Map((result?.columns ?? []).map((c) => [c.name, c.type])));
  const show = (value: unknown, key: string) =>
    typeof value === 'number' && types.get(key) !== 'key'
      ? value.toLocaleString(
          'en',
          decimals.has(key) ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : {},
        )
      : String(value ?? '');

  /** A chart when the result has a label column and a figure column and few enough rows. */
  const chart = $derived.by(() => {
    if (!result || !result.rows.length) return null;
    const cols = result.columns;
    const label = cols.find((c) => c.type === 'text' || c.type === 'date');
    const value = cols.find((c) => c.type === 'number' && c.name !== 'id');
    if (!label || !value || result.rows.length > 24) return null;
    const time = label.type === 'date' || /month|day/.test(label.name);
    return {
      kind: time ? ('line' as const) : ('bars' as const),
      label: label.name,
      value: value.name,
      points: result.rows.map((r) => ({
        label: String(r[label.name]),
        value: Number(r[value.name]),
      })),
    };
  });
  /** A ceiling a little above the top value, on a round step (101 → 120, not 200). */
  function ceiling(v: number) {
    if (v <= 0) return 1;
    const unit = 10 ** Math.floor(Math.log10(v));
    const step = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => s * unit >= v * 1.05) ?? 10;
    return step * unit;
  }
  const lineMax = $derived(chart ? ceiling(Math.max(...chart.points.map((p) => p.value))) : 1);

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const statusOf = (r: QueryResult) => `${r.rows.length} ${r.rows.length === 1 ? 'row' : 'rows'}`;

  const notes: DesignNote[] = [
    {
      principle: 'function',
      title: 'Tables and columns on the ground',
      body: 'The schema is a plain list beside the editor, no card. Click a column and its name is written where your cursor is; the play key on a table starts a query on it.',
      target: '[data-note="schema"]',
    },
    {
      principle: 'locality',
      title: 'Mistakes are explained under the line',
      body: 'A typo is named in words on the line it is on, and the likely fix is one click away — “Use total” corrects the query and runs it.',
      target: '[data-note="editor"]',
    },
    {
      principle: 'cues',
      title: 'The answer glows where it lands',
      body: 'Each run lights up the row count and the time at the head of the result. “Run” shimmers only while the query differs from the one shown.',
      target: '[data-note="answer"]',
    },
    {
      principle: 'function',
      title: 'The chart picks its own shape',
      body: 'Grouped by month, the result is a line; grouped by a category, bars. A list of single rows gets no chart at all, and says why.',
      target: '[data-note="chart"]',
    },
    {
      principle: 'friendly',
      title: 'Saved queries sit above the editor they fill',
      body: 'Soft keys load a query into the editor without running it, so you can read it first. The loaded one stays pressed.',
      target: '[data-note="saved"]',
    },
  ];
</script>

{#snippet cell(row: Row, column: Column)}
  {show(row[column.key], column.key)}
{/snippet}

<Page width="full" gap="lg">
  <div class="shell">
    <div class="rail">
      <NavRail items={railItems} bind:current={section} label="Workbench">
        {#snippet top()}
          <span class="logo" aria-hidden="true"><Icon name="database" size={20} /></span>
        {/snippet}
        {#snippet bottom()}
          <Avatar name="Noor Example" size={40} />
        {/snippet}
      </NavRail>
    </div>

    <header class="head">
      <div>
        <h1>Query explorer</h1>
        <p class="sub">Sales warehouse · read-only · {tables.length} tables</p>
      </div>
      {#if section === 'explore'}
        <div class="saved" role="group" aria-label="Saved queries" data-note="saved">
          {#each savedQueries as q (q.id)}
            <Button
              variant="soft"
              size="sm"
              label={q.name}
              aria-pressed={loaded === q.id}
              onclick={() => load(q.sql)}
            />
          {/each}
        </div>
      {/if}
    </header>

    {#if section === 'explore'}
      <aside class="schema" aria-labelledby="schema-title" data-note="schema">
        <h2 id="schema-title" class="eyebrow">Tables</h2>
        <ul class="tables">
          {#each tables as t (t.name)}
            {@const isOpen = !!openTables[t.name]}
            <li>
              <div class="table-row">
                <button
                  type="button"
                  class="table-name"
                  aria-expanded={isOpen}
                  onclick={() => (openTables[t.name] = !isOpen)}
                >
                  <span class="chev" class:open={isOpen}
                    ><Icon name="chevron-right" size={14} /></span
                  >
                  <Icon name="table" size={16} />
                  <span class="tname">{t.name}</span>
                  <span class="tcount">{t.rows.length.toLocaleString('en')}</span>
                </button>
                <Button
                  variant="soft"
                  size="xs"
                  icon="play"
                  iconOnly
                  label="Start a query on {t.name}"
                  onclick={() => load(`SELECT *\nFROM ${t.name}`)}
                />
              </div>
              {#if isOpen}
                <p class="tdesc">{t.description}</p>
                <ul class="cols">
                  {#each t.columns as c (c.name)}
                    <li>
                      <button
                        type="button"
                        class="col"
                        title="Write {c.name} into the query"
                        onclick={() => insert(c.name)}
                      >
                        <span class="cname">{c.name}</span>
                        <span class="ctype">{c.type}</span>
                      </button>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </aside>

      <div class="main">
        <Layer
          level="panel"
          padding="none"
          gap="none"
          as="section"
          aria-label="Query"
          class="editor-panel"
        >
          <div class="editor" bind:this={editor} data-note="editor">
            <ol class="gutter" aria-hidden="true">
              {#each { length: lineCount } as _, i (i)}
                <li class:bad={error?.line === i + 1}>{i + 1}</li>
              {/each}
            </ol>
            <Textarea
              bind:value={sql}
              variant="plain"
              mono
              autogrow
              rows={5}
              maxRows={14}
              spellcheck={false}
              aria-label="Query"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'query-error' : undefined}
              {onkeydown}
            />
          </div>
          {#if error}
            <div class="error" id="query-error" role="alert">
              <Icon name="alert" size={16} />
              <p><b>Line {error.line}:</b> {error.message}</p>
              {#if error.fix}
                {@const word = /“([^”]+)”\?$/.exec(error.message)?.[1]}
                <Button
                  variant="soft"
                  size="sm"
                  icon="check"
                  label="Use {word ?? 'the fix'}"
                  onclick={applyFix}
                />
              {/if}
            </div>
          {/if}
          <footer class="editor__foot">
            <span class="keys"><Kbd>⌘</Kbd><Kbd>Enter</Kbd> runs the query</span>
            <Button
              variant="primary"
              icon="play"
              label="Run"
              busy={running}
              busyLabel="Running…"
              shimmer={dirty && !running}
              onclick={run}
            />
          </footer>
        </Layer>

        <section class="result" aria-labelledby="result-title">
          <header class="result__head" data-note="answer">
            <h2 id="result-title">Result</h2>
            {#if result}
              <span class="answer" use:changeCue={runCount} role="status">
                <DotMatrix value={result.rows.length} label={statusOf(result)} size="md" />
                <span class="unit">{result.rows.length === 1 ? 'row' : 'rows'}</span>
                <span class="sep" aria-hidden="true"></span>
                <DotMatrix
                  value={Math.max(0.1, result.ms).toFixed(1)}
                  label="{result.ms.toFixed(1)} milliseconds"
                  size="sm"
                />
                <span class="unit">ms</span>
                <span class="scanned">of {result.scanned.toLocaleString('en')} scanned</span>
              </span>
            {/if}
            {#if error && result}
              <span class="stale">Showing the last result</span>
            {:else if result && !chart}
              <span class="nochart" data-note="chart">
                <Icon name="chart" size={14} />
                {!result.rows.length
                  ? 'Nothing to chart.'
                  : result.rows.length > 24
                    ? 'No chart: too many rows. GROUP BY a column to draw one.'
                    : 'No chart: it needs a label column and a number column.'}
              </span>
            {/if}
          </header>

          {#if !result}
            <EmptyState
              icon="database"
              title="No result yet"
              message={error
                ? 'Fix the query above and run it again.'
                : 'Run a query to see its rows here.'}
              compact
            />
          {:else}
            <div class="result__body" class:stale={!!error} class:solo={!chart}>
              <Layer level="panel" padding="md" gap="sm" class="table-panel">
                <DataTable
                  {columns}
                  rows={sorted.slice(0, shown)}
                  rowKey={(r) => JSON.stringify(r)}
                  sort={sortKey}
                  {order}
                  onsort={(key) => {
                    if (sortKey === key) order = order === 'asc' ? 'desc' : 'asc';
                    else {
                      sortKey = key;
                      order = 'asc';
                    }
                  }}
                  {cell}
                  labelledby="result-title"
                  emptyIcon="filter"
                  emptyTitle="No rows match"
                  emptyMessage="Nothing meets the WHERE conditions. Loosen one and run it again."
                />
                {#if sorted.length > shown}
                  <div class="more">
                    <span class="muted">Showing {shown} of {sorted.length}</span>
                    <Button
                      variant="soft"
                      size="sm"
                      label="Show {Math.min(PAGE, sorted.length - shown)} more"
                      onclick={() => (shown += PAGE)}
                    />
                  </div>
                {/if}
              </Layer>

              {#if chart}
                <div class="chart" data-note="chart">
                  <ChartCard
                    title="{cap(chart.value)} by {chart.label}"
                    sub="{chart.points.length} {chart.kind === 'line' ? 'points' : 'groups'}"
                  >
                    {#if chart.kind === 'line'}
                      <LineChart
                        data={chart.points}
                        min={0}
                        max={lineMax}
                        ticks={[0, lineMax / 2, lineMax]}
                        tickFormat={(v) => v.toLocaleString('en')}
                        valueFormat={(v) => show(v, chart.value)}
                        valueLabel={chart.value}
                        height={220}
                        area
                        color="var(--accent)"
                        label="{chart.value} by {chart.label}"
                        categoryLabel={chart.label}
                      />
                    {:else}
                      <HorizontalBarChart
                        data={chart.points}
                        color="var(--accent)"
                        countLabel={chart.value}
                        valueFormat={(v) => show(v, chart.value)}
                        label="{chart.value} by {chart.label}"
                        categoryLabel={chart.label}
                      />
                    {/if}
                  </ChartCard>
                </div>
              {/if}
            </div>
          {/if}
        </section>
      </div>
    {:else}
      <div class="main main--other">
        <EmptyState
          icon={railItems.find((i) => i.id === section)?.icon ?? 'database'}
          title="{railItems.find((i) => i.id === section)?.label} is not part of this example"
          message="Explore shows everything this page demonstrates."
          actionLabel="Back to Explore"
          onaction={() => (section = 'explore')}
        />
      </div>
    {/if}
  </div>
</Page>

<DesignNotes title="Query explorer" {notes} corner="bottom-right" />

<style>
  .shell {
    display: grid;
    grid-template-columns: auto 15rem minmax(0, 1fr);
    /* The last, flexible row takes up the rail's height, so the rows above stay snug. */
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      'rail head head'
      'rail schema main'
      'rail . .';
    gap: var(--space-6) var(--space-8);
    align-items: start;
  }
  .rail {
    grid-area: rail;
    align-self: stretch;
  }
  .rail > :global(*) {
    position: sticky;
    top: var(--sticky-gap);
  }
  .head {
    grid-area: head;
    padding-top: var(--space-2);
  }
  .schema {
    grid-area: schema;
  }
  .main {
    grid-area: main;
  }
  .rail {
    display: flex;
  }
  .logo {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--soft-bg);
    box-shadow: var(--soft-shadow);
    color: var(--accent-ink);
  }
  .eyebrow {
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
  .muted {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }

  /* Schema: a list on the ground. */
  .schema {
    position: sticky;
    top: var(--sticky-gap);
    display: grid;
    gap: var(--space-3);
    padding-top: var(--space-3);
  }
  .tables,
  .cols {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .tables {
    gap: var(--space-2);
  }
  .table-row {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }
  .table-name {
    display: flex;
    flex: 1;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
    min-height: var(--control-md);
    padding: 0 var(--space-2) 0 var(--space-1);
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    color: var(--text);
    font: inherit;
    cursor: pointer;
  }
  .table-name:hover,
  .col:hover {
    background: var(--fill-subtle);
  }
  .table-name:focus-visible,
  .col:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .table-name :global(.icon) {
    flex: none;
    color: var(--text-3);
  }
  .chev {
    display: inline-flex;
    color: var(--text-3);
    transition: transform var(--motion-base) var(--ease-out);
  }
  .chev.open {
    transform: rotate(90deg);
  }
  .tname {
    flex: 1;
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    text-align: left;
  }
  .tcount {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .tdesc {
    margin: 0 0 var(--space-1) 2.4rem;
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .cols {
    margin-left: 1.9rem;
    padding-left: var(--space-2);
    border-left: 1px solid var(--border);
  }
  .col {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 3px var(--space-2);
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--text);
    font: inherit;
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    cursor: pointer;
  }
  .ctype {
    color: var(--text-3);
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    min-width: 0;
    padding-bottom: var(--space-12);
  }
  .shell .main--other {
    grid-column: 2 / -1;
  }
  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: var(--space-4) var(--space-6);
  }
  h1 {
    font-size: var(--fs-display);
    font-weight: var(--fw-medium);
    line-height: var(--leading-tight);
  }
  .sub {
    margin-top: var(--space-1);
    color: var(--text-2);
    font-size: var(--fs-md);
  }
  .saved {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  /* The editor panel: line numbers beside a plain monospace field. */
  .editor {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
  }
  .gutter {
    margin: 0;
    padding: var(--space-4) var(--space-2) var(--space-4) var(--space-4);
    list-style: none;
    color: var(--text-3);
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    line-height: 1.7;
    text-align: right;
    user-select: none;
  }
  .gutter li {
    min-width: 1.5em;
    padding: 0 4px;
    border-radius: 4px;
  }
  .gutter li.bad {
    background: color-mix(in srgb, var(--danger) 14%, transparent);
    color: var(--danger);
  }
  .editor :global(textarea) {
    min-height: 0;
    padding: var(--space-4) var(--space-4) var(--space-4) var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    line-height: 1.7;
    tab-size: 2;
  }
  .error {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-3);
    margin: 0 var(--space-4);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--danger) 9%, transparent);
    color: var(--danger);
    font-size: var(--fs-sm);
    animation: bb-nope var(--motion-slow) var(--ease-out);
  }
  .error p {
    flex: 1;
    min-width: 12rem;
    color: var(--text);
  }
  .error b {
    color: var(--danger);
  }
  .editor__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
  }
  .keys {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }

  /* The result: its answer at the head, then the table panel and the chart on the ground. */
  .result {
    display: grid;
    gap: var(--space-4);
  }
  .result__head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2) var(--space-4);
  }
  .result__head h2 {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .answer {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-2);
    padding: 4px 10px;
    border-radius: var(--radius-md);
  }
  .unit {
    color: var(--text-2);
    font-size: var(--fs-sm);
  }
  .sep {
    align-self: center;
    width: 1px;
    height: 1em;
    margin-inline: var(--space-1);
    background: var(--border-strong);
  }
  .scanned {
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .stale {
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .result__body {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 1fr);
    gap: var(--space-8);
    align-items: start;
    transition: opacity var(--motion-base) var(--ease-out);
  }
  .result__body.solo {
    grid-template-columns: minmax(0, 1fr);
  }
  .nochart {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .result__body.stale {
    opacity: 0.5;
  }
  .result__body :global(.table-panel) {
    min-width: 0;
  }
  .more {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    padding-top: var(--space-2);
    border-top: 1px solid var(--border);
  }
  .chart {
    min-width: 0;
  }

  @media (max-width: 1280px) {
    .result__body {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  @media (max-width: 1100px) {
    .shell {
      grid-template-columns: auto minmax(0, 1fr);
      grid-template-rows: auto auto auto 1fr;
      grid-template-areas:
        'rail head'
        'rail schema'
        'rail main'
        'rail .';
    }
    .schema {
      position: static;
    }
    .tables {
      grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
      align-items: start;
      gap: var(--space-2) var(--space-6);
    }
    .tables > li:has(.cols) {
      grid-column: 1 / -1;
    }
    .cols {
      grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
      column-gap: var(--space-4);
    }
    .shell .main--other {
      grid-column: 2;
    }
  }
  @media (max-width: 900px) {
    .shell {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: none;
      grid-template-areas: 'rail' 'head' 'schema' 'main';
      gap: var(--space-4);
    }
    .rail {
      z-index: var(--z-front);
    }
    .shell .main--other {
      grid-column: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .error {
      animation: none;
    }
  }
</style>
