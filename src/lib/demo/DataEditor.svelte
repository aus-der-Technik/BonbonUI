<script lang="ts">
  /** Example page: a spreadsheet-style editor for data sets, with mock data (Storybook only). */
  import Page from '../patterns/templates/Page.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import Badge from '../patterns/atoms/Badge.svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Kbd from '../patterns/atoms/Kbd.svelte';
  import ChoiceCard from '../patterns/molecules/ChoiceCard.svelte';
  import Picker, { type PickerOption } from '../patterns/molecules/Picker.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SignInCard from '../patterns/molecules/SignInCard.svelte';
  import ToggleChip from '../patterns/molecules/ToggleChip.svelte';
  import UserMenu from '../patterns/molecules/UserMenu.svelte';
  import EditableGrid, {
    type CellValue,
    type GridRow,
  } from '../patterns/organisms/EditableGrid.svelte';
  import Sheet from '../patterns/organisms/Sheet.svelte';
  import Toaster from '../patterns/organisms/Toaster.svelte';
  import { ToastQueue } from '../utils/toasts.svelte';
  import { venueColumns, venueRows } from './mock';

  interface Props {
    start?: 'signed-out' | 'chooser' | 'sheet';
  }

  let { start = 'sheet' }: Props = $props();

  const products: (PickerOption & { about: string; editable: boolean; draft?: boolean })[] = [
    {
      value: 'venues',
      title: 'Venues',
      meta: 'catalog.venues · 8 rows',
      about: 'Every venue in the catalog with capacities, contact and location.',
      editable: true,
    },
    {
      value: 'events',
      title: 'Event calendar',
      meta: 'catalog.events · 312 rows',
      about: 'Trade fairs and congresses on the public calendar.',
      editable: true,
    },
    {
      value: 'members',
      title: 'Members',
      meta: 'catalog.members · 96 rows',
      about: 'Member organisations; maintained in the CRM.',
      editable: false,
      marks: [{ label: 'read-only' }],
    },
    {
      value: 'awards',
      title: 'Awards 2026',
      meta: 'catalog.awards · 0 rows',
      about: 'Nominees and winners. Not served by /query yet.',
      editable: true,
      draft: true,
      marks: [{ label: 'draft', tone: 'draft' }],
    },
  ];

  // svelte-ignore state_referenced_locally
  let view = $state(start);
  let product = $state<string | null>('venues');
  let rows = $state<GridRow[]>(venueRows());
  let wrap = $state(false);
  let filter = $state('');
  let draft = $state<GridRow | null>(null);
  let loading = $state(false);
  const toasts = new ToastQueue();

  const current = $derived(products.find((p) => p.value === product));
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

  function open(value: string) {
    product = value;
    view = 'sheet';
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
        if (column === 'capacity' && typeof value === 'number' && value > 100_000) {
          toasts.push(`Could not save ${column}: value out of range`, 'error');
          reject(new Error('out of range'));
          return;
        }
        rows = rows.map((r) => (r === target ? { ...r, [column]: value } : r));
        toasts.push(`${column} saved`);
        resolve();
      }, 500),
    );
  }

  function remove(row: number) {
    const target = visibleRows[row];
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        rows = rows.filter((r) => r !== target);
        toasts.push('Row deleted', 'warn');
        resolve();
      }, 400),
    );
  }

  function addOrSave() {
    if (!draft) {
      draft = {};
      return;
    }
    rows = [...rows, { ...draft, id: 1001 + rows.length, updated_at: '2026-10-19 13:40' }];
    draft = null;
    toasts.push('Row added');
  }
</script>

{#snippet rowActions()}
  {#if draft}
    <Button variant="ghost" shape="pill" size="xl" label="Cancel" onclick={() => (draft = null)} />
  {/if}
  <Button
    variant="success"
    shape="pill"
    size="xl"
    icon={draft ? 'check' : 'plus'}
    label={draft ? 'Save row' : 'Add row'}
    onclick={addOrSave}
  />
{/snippet}

<Page
  title="Data editor"
  subtitle="edit data sets"
  href="#"
  fill
  gap="md"
  floating={view === 'sheet' && current?.editable ? rowActions : undefined}
>
  {#snippet actions()}
    {#if view !== 'signed-out'}
      <Picker
        options={products}
        value={product}
        label="Data set"
        heading="Data sets"
        onchange={open}
      />
      <UserMenu email="jane.doe@example.com" onsignout={() => (view = 'signed-out')} />
      <Button
        variant="glass"
        shape="pill"
        size="lg"
        icon="reload"
        label="Reload"
        collapse
        busy={loading}
        onclick={reload}
      />
    {/if}
  {/snippet}

  {#if view === 'signed-out'}
    <!-- No sheet to sign in to: the card floats alone on the backdrop, centred in the room. -->
    <Stack align="center" justify="center">
      <SignInCard
        title="Sign in to edit the data sets"
        text="Every change is recorded under your name, so the editor needs to know who you are. Sign in with your work account."
        onsignin={() => (view = 'chooser')}
      />
    </Stack>
  {:else if view === 'chooser'}
    <Sheet title="Choose a data set">
      <Grid min="20rem" padding="lg" class="chooser">
        {#each products as p (p.value)}
          <ChoiceCard title={p.title} meta={p.meta} about={p.about} onclick={() => open(p.value)}>
            {#snippet badges()}
              {#if p.draft}<Badge tone="draft" label="Draft" />{/if}
              <Badge
                tone={p.editable ? 'live' : 'locked'}
                label={p.editable ? 'Editable' : 'Read-only'}
              />
            {/snippet}
          </ChoiceCard>
        {/each}
      </Grid>
    </Sheet>
  {:else}
    <Sheet title={current?.title ?? 'Venues'} about={current?.about} {loading}>
      {#snippet tools()}
        {#if current?.draft}<Badge tone="draft" label="Draft" />{/if}
        <Badge
          tone={current?.editable ? 'live' : 'locked'}
          label={current?.editable ? 'Editable' : 'Read-only'}
        />
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
      {/snippet}
      <EditableGrid
        columns={venueColumns}
        rows={visibleRows}
        editable={current?.editable ?? false}
        {wrap}
        bind:draft
        resizable
        nullLabel="null"
        oncommit={commit}
        onlockedclick={(column) =>
          toasts.push(`Read-only: ${column.name} cannot be edited here`, 'warn', 3000)}
        ondraftsubmit={addOrSave}
        ondraftcancel={() => (draft = null)}
        ondelete={remove}
        label={current?.title}
      />
      {#snippet footer()}
        <span>{visibleRows.length} of {rows.length} rows</span>
        <span class="hint"
          >Click a cell to edit · <Kbd>Enter</Kbd> saves · <Kbd>Tab</Kbd> saves and moves right · <Kbd
            >Esc</Kbd
          > cancels</span
        >
      {/snippet}
    </Sheet>
  {/if}
</Page>

<Toaster toasts={toasts.items} ondismiss={(id) => toasts.dismiss(id)} offset="8.5rem" />

<style>
  /* The chooser scrolls inside the sheet like the grid it stands in for. */
  :global(.chooser) {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    align-content: start;
  }
  @media (max-width: 700px) {
    .hint {
      display: none;
    }
  }
</style>
