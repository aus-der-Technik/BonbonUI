<script lang="ts">
  /**
   * Admin console · Data (Storybook only): data sets in a spreadsheet-style editor, and a
   * location lookup on a map. Every edit answers in the grid: a saved cell flashes, a rejected
   * one rings red with the reason in a bubble right under it, a locked one explains itself
   * where you clicked, and new rows are typed where they will land.
   */
  import Grid from '../patterns/layout/Grid.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Kbd from '../patterns/atoms/Kbd.svelte';
  import ChoiceCard from '../patterns/molecules/ChoiceCard.svelte';
  import Picker, { type PickerOption } from '../patterns/molecules/Picker.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import ToggleChip from '../patterns/molecules/ToggleChip.svelte';
  import EditableGrid, {
    type CellValue,
    type GridColumn,
    type GridRow,
  } from '../patterns/organisms/EditableGrid.svelte';
  import Sheet from '../patterns/organisms/Sheet.svelte';
  import { numberFormat } from '../utils/format';
  import AdminDataLocations from './AdminDataLocations.svelte';
  import AdminHead from './AdminHead.svelte';
  import type { SectionProps } from './admin';
  import { venueColumns, venueRows } from './mock';

  interface Props extends SectionProps {
    /** The open view: a data set, the data-set chooser, or the location lookup. */
    view?: 'sheet' | 'chooser' | 'locations';
    /** Locations: one lookup times out. */
    failing?: boolean;
  }

  let { notify, view = 'sheet', failing = false }: Props = $props();

  type DataSet = PickerOption & {
    about: string;
    editable: boolean;
    draft?: boolean;
    /** Why it cannot be edited here. */
    lockedWhy?: string;
    columns: GridColumn[];
    rows: () => GridRow[];
  };

  const DATA_SETS: DataSet[] = [
    {
      value: 'venues',
      title: 'Venues',
      meta: 'catalog.venues · 8 rows',
      about: 'Every venue in the catalog with capacities, contact and location.',
      editable: true,
      columns: venueColumns,
      rows: venueRows,
    },
    {
      value: 'events',
      title: 'Event calendar',
      meta: 'catalog.events · 6 rows',
      about: 'Trade fairs and congresses on the public calendar.',
      editable: true,
      columns: [
        { name: 'id', type: 'BIGINT', locked: true },
        { name: 'title', type: 'VARCHAR' },
        { name: 'city', type: 'VARCHAR' },
        { name: 'starts_on', type: 'DATE' },
        { name: 'visitors', type: 'INTEGER' },
        { name: 'public', type: 'BOOLEAN' },
      ],
      rows: () =>
        (
          [
            ['Spring Book Fair', 'Leipzig', '2027-03-18', 280000, true],
            ['Medical Congress', 'Hamburg', '2027-04-07', 4200, false],
            ['Green Building Expo', 'Munich', '2027-05-12', 61000, true],
            ['Data & Society Summit', 'Berlin', '2027-06-02', 1800, true],
            ['Harbour Festival Forum', 'Hamburg', '2027-06-21', null, true],
            ['Autumn Craft Fair', 'Dresden', '2027-09-30', 23000, null],
          ] as [string, string, string, number | null, boolean | null][]
        ).map(([title, city, starts, visitors, open], i) => ({
          id: 501 + i,
          title,
          city,
          starts_on: starts,
          visitors,
          public: open,
        })),
    },
    {
      value: 'members',
      title: 'Members',
      meta: 'catalog.members · 5 rows',
      about: 'Member organisations; maintained in the member directory.',
      editable: false,
      lockedWhy: 'Members are maintained in the member directory — change them there.',
      marks: [{ label: 'read-only' }],
      columns: [
        { name: 'id', type: 'BIGINT', locked: true },
        { name: 'organisation', type: 'VARCHAR', locked: true },
        { name: 'city', type: 'VARCHAR', locked: true },
        { name: 'since', type: 'INTEGER', locked: true },
        { name: 'contact', type: 'VARCHAR', locked: true },
      ],
      rows: () =>
        (
          [
            ['Example Convention Bureau', 'Leipzig', 2009, 'bureau@example.com'],
            ['Example Hotel Group', 'Munich', 2014, 'events@example.com'],
            ['Example Trade Fair Company', 'Hamburg', 2011, 'fairs@example.com'],
            ['Example Event Agency', 'Cologne', 2019, 'hello@example.com'],
            ['Example Science Park', 'Darmstadt', 2022, 'office@example.com'],
          ] as [string, string, number, string][]
        ).map(([organisation, city, since, contact], i) => ({
          id: 3001 + i,
          organisation,
          city,
          since,
          contact,
        })),
    },
    {
      value: 'awards',
      title: 'Awards 2026',
      meta: 'catalog.awards · 0 rows',
      about: 'Nominees and winners. Not served by the query API yet.',
      editable: true,
      draft: true,
      marks: [{ label: 'draft', tone: 'draft' }],
      columns: [
        { name: 'id', type: 'BIGINT', locked: true },
        { name: 'category', type: 'VARCHAR' },
        { name: 'nominee', type: 'VARCHAR' },
        { name: 'winner', type: 'BOOLEAN' },
      ],
      rows: () => [],
    },
  ];

  const MAX_CAPACITY = 100_000;

  // svelte-ignore state_referenced_locally
  let mode = $state<'data' | 'locations'>(view === 'locations' ? 'locations' : 'data');
  // svelte-ignore state_referenced_locally
  let choosing = $state(view === 'chooser');
  let product = $state('venues');
  let rows = $state<GridRow[]>(venueRows());
  let wrap = $state(false);
  let filter = $state('');
  let draft = $state<GridRow | null>(null);
  let highlight = $state<number | null>(null);
  let loading = $state(false);

  const current = $derived(DATA_SETS.find((d) => d.value === product) ?? DATA_SETS[0]!);
  const needle = $derived(filter.trim().toLowerCase());
  const visibleRows = $derived(
    needle
      ? rows.filter((r) =>
          Object.values(r).some((v) =>
            String(v ?? '')
              .toLowerCase()
              .includes(needle),
          ),
        )
      : rows,
  );
  const nextId = $derived(
    Math.max(0, ...rows.map((r) => (typeof r['id'] === 'number' ? r['id'] : 0))) + 1,
  );

  function open(value: string) {
    product = value;
    choosing = false;
    draft = null;
    filter = '';
    highlight = null;
    rows = (DATA_SETS.find((d) => d.value === value) ?? DATA_SETS[0]!).rows();
    reload();
  }

  function reload() {
    loading = true;
    setTimeout(() => (loading = false), 600);
  }

  function commit(row: number, column: string, value: CellValue) {
    const target = visibleRows[row];
    return new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (column === 'capacity' && typeof value === 'number' && value > MAX_CAPACITY) {
          reject(
            new Error(
              `Not saved: a capacity of ${numberFormat.format(value)} is more than any venue holds (at most ${numberFormat.format(MAX_CAPACITY)}).`,
            ),
          );
          return;
        }
        rows = rows.map((r) => (r === target ? { ...r, [column]: value } : r));
        resolve();
      }, 450),
    );
  }

  /** Deleting is soft: the row is gone from view, so the toast offers it back. */
  function remove(row: number) {
    const target = visibleRows[row];
    if (!target) return;
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        const at = rows.indexOf(target);
        rows = rows.filter((r) => r !== target);
        const name = String(target['name'] ?? target['title'] ?? target['nominee'] ?? 'Row');
        notify?.(`“${name}” deleted`, {
          action: {
            label: 'Undo',
            onaction: () => {
              rows = [...rows.slice(0, at), target, ...rows.slice(at)];
              filter = '';
              glow(at);
            },
          },
        });
        resolve();
      }, 350),
    );
  }

  function saveDraft() {
    if (!draft) return;
    const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const locked = Object.fromEntries(
      current.columns
        .filter((c) => c.locked && c.name !== 'id')
        .map((c) => [c.name, c.type === 'TIMESTAMP' ? stamp : null]),
    );
    rows = [...rows, { ...draft, ...locked, id: nextId }];
    draft = null;
    filter = '';
    glow(rows.length - 1);
  }

  /** Flashes a row; going through null makes the same row flash again. */
  function glow(index: number) {
    highlight = null;
    requestAnimationFrame(() => (highlight = index));
  }

  /** Why a cell is locked — shown by the grid at the cell that was clicked. */
  function lockedWhy(column: GridColumn): string {
    return (
      current.lockedWhy ??
      (column.type === 'TIMESTAMP'
        ? `${column.name} is set by the database when a row changes.`
        : `${column.name} is the key of the row and cannot be changed.`)
    );
  }

  const rejection = (error: unknown) =>
    error instanceof Error ? error.message : 'Not saved — try again.';
</script>

<AdminHead section="data">
  {#snippet actions()}
    <SegmentedControl
      label="View"
      options={[
        { value: 'data', label: 'Data sets' },
        { value: 'locations', label: 'Locations' },
      ]}
      bind:value={mode}
    />
  {/snippet}
</AdminHead>

{#if mode === 'locations'}
  <AdminDataLocations {failing} />
{:else if choosing}
  <div class="sheet-box">
    <Sheet title="Choose a data set" about="Pick the table you want to look at or edit.">
      {#snippet tools()}
        <Button
          size="sm"
          icon="arrow-left"
          label="Back to {current.title}"
          onclick={() => (choosing = false)}
        />
      {/snippet}
      <Grid min="18rem" padding="lg" class="chooser">
        {#each DATA_SETS as set (set.value)}
          <ChoiceCard
            title={set.title}
            meta={set.meta}
            about={set.about}
            selected={set.value === product}
            onclick={() => open(set.value)}
          >
            {#snippet badges()}
              {#if set.draft}<Badge tone="draft" label="Draft" />{/if}
              <Badge
                tone={set.editable ? 'neutral' : 'locked'}
                label={set.editable ? 'Editable' : 'Read-only'}
              />
            {/snippet}
          </ChoiceCard>
        {/each}
      </Grid>
    </Sheet>
  </div>
{:else}
  <div class="sheet-box" data-note="grid">
    <Sheet title={current.title} about={current.about} {loading}>
      {#snippet tools()}
        <Picker
          options={DATA_SETS}
          value={product}
          label="Data set"
          heading="Data sets"
          onchange={open}
        />
        <Button
          size="sm"
          variant="ghost"
          icon="grid"
          label="All data sets"
          iconOnly
          onclick={() => (choosing = true)}
        />
        {#if current.draft}<Badge tone="draft" label="Draft" />{/if}
        {#if !current.editable}<Badge tone="locked" label="Read-only" />{/if}
        <ToggleChip
          size="sm"
          icon="wrap"
          label="Wrap"
          title="Wrap long cell contents onto several lines"
          bind:pressed={wrap}
        />
        <SearchField
          label="Filter the loaded rows"
          placeholder="Filter loaded rows"
          bind:value={filter}
        />
        <Button
          size="sm"
          icon="reload"
          label="Reload"
          collapse
          busyLabel="Reloading…"
          busy={loading}
          onclick={reload}
        />
      {/snippet}
      <EditableGrid
        columns={current.columns}
        rows={visibleRows}
        editable={current.editable}
        {wrap}
        bind:draft
        {highlight}
        resizable
        nullLabel="null"
        readOnlyLabel="read-only"
        addRowLabel="New row"
        saveRowLabel="Save row"
        cancelRowLabel="Cancel"
        emptyTitle={needle ? 'Nothing matches' : 'No rows yet'}
        emptyMessage={needle
          ? 'No loaded row contains that text — clear the filter to see them all.'
          : 'This data set is empty. Add the first row and it is saved right away.'}
        oncommit={commit}
        lockedHint={lockedWhy}
        errorMessage={rejection}
        ondraftsubmit={saveDraft}
        ondraftcancel={() => (draft = null)}
        ondelete={remove}
        label={current.title}
      />
      {#snippet footer()}
        <span>{visibleRows.length} of {rows.length} rows</span>
        {#if current.editable}
          <span class="keys"
            >Click a cell to edit · <Kbd>Enter</Kbd> saves · <Kbd>Tab</Kbd> saves and moves right · <Kbd
              >Esc</Kbd
            > cancels</span
          >
        {:else}
          <span class="keys">Read-only here · {current.lockedWhy}</span>
        {/if}
      {/snippet}
    </Sheet>
  </div>
{/if}

<style>
  /* The page scrolls, not the section: the sheet gets a viewport-sized room of its own. */
  .sheet-box {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 22rem;
    max-height: clamp(26rem, calc(var(--app-height, 100dvh) - 16rem), 46rem);
    min-width: 0;
  }
  /* The chooser scrolls inside the sheet like the grid it stands in for. */
  :global(.chooser) {
    min-height: 0;
    overflow-y: auto;
    align-content: start;
  }
  @media (max-width: 700px) {
    .keys {
      display: none;
    }
  }
</style>
