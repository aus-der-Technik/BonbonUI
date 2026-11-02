<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import EditableGrid, { type CellValue, type GridRow } from './EditableGrid.svelte';
  import Sheet from './Sheet.svelte';
  import Badge from '../atoms/Badge.svelte';
  import Button from '../atoms/Button.svelte';
  import Kbd from '../atoms/Kbd.svelte';
  import CodeBlock from '../molecules/CodeBlock.svelte';
  import Stack from '../layout/Stack.svelte';
  import { venueColumns, venueRows } from '../../demo/mock';

  const { Story } = defineMeta({
    title: 'Organisms/EditableGrid',
    component: EditableGrid,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
  });

  const topicColumns = [
    { name: 'name', type: 'VARCHAR' },
    { name: 'topics', type: 'VARCHAR[]' },
  ];
  // A translation pair, a nested address, and a record holding a list and a flag.
  const structColumns = [
    { name: 'name', type: 'VARCHAR' },
    { name: 'title', type: 'STRUCT(de VARCHAR, en VARCHAR)' },
    {
      name: 'address',
      type: 'STRUCT(street VARCHAR, city VARCHAR, geo STRUCT(lat DOUBLE, lng DOUBLE))',
    },
    {
      name: 'contact',
      type: 'STRUCT(email VARCHAR, phones VARCHAR[], verified BOOLEAN)',
    },
  ];
</script>

<script lang="ts">
  let rows = $state<GridRow[]>(venueRows());
  let draft = $state<GridRow | null>(null);

  let structRows = $state<GridRow[]>([
    {
      name: 'Open-air stage',
      title: { de: 'Freilichtbühne', en: 'Open-air stage' },
      address: { street: 'Am Park 1', city: 'Bonn', geo: { lat: 50.7374, lng: 7.0982 } },
      contact: {
        email: 'stage@example.com',
        phones: ['+49 228 1234', '+49 228 5678'],
        verified: true,
      },
    },
    {
      name: 'Town hall',
      title: { de: null, en: null },
      address: { street: 'Markt 2', city: 'Bonn', geo: null },
      contact: { email: null, phones: [], verified: false },
    },
    { name: 'Library', title: null, address: null, contact: null },
  ]);

  let topicRows = $state<GridRow[]>([
    { name: 'Open-air stage', topics: ['concerts', 'outdoor', 'summer', 'barrier-free'] },
    { name: 'Town hall', topics: ['events'] },
    { name: 'Library', topics: null },
  ]);

  // Simulates the save: 600 ms, and a capacity above 100,000 is refused.
  function commit(row: number, column: string, value: CellValue) {
    return new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (column === 'capacity' && typeof value === 'number' && value > 100_000) {
          reject(new Error('capacity out of range'));
          return;
        }
        rows = rows.map((r, i) => (i === row ? { ...r, [column]: value } : r));
        resolve();
      }, 600),
    );
  }

  function remove(row: number) {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        rows = rows.filter((_, i) => i !== row);
        resolve();
      }, 500),
    );
  }
</script>

<!-- The grid inside a Sheet, as in an editor. Click a cell: Enter saves (a green flash), Tab moves
     right, Esc cancels; the open editor wears the tint ring. Enter a capacity of 200000 to see a
     failed save ring red. Hover a row number to delete the row (it asks once). -->
<Story name="Venues" asChild>
  <Stack style="height:30rem">
    <Sheet title="Venues" about="Capacities, accessibility and notes of every venue.">
      {#snippet tools()}<Badge tone="live" label="Editable" />{/snippet}
      <EditableGrid
        columns={venueColumns}
        {rows}
        oncommit={commit}
        ondelete={remove}
        label="Venues"
      />
      {#snippet footer()}
        <span>{rows.length} rows</span>
        <span><Kbd>Enter</Kbd> saves · <Kbd>Tab</Kbd> moves right · <Kbd>Esc</Kbd> cancels</span>
      {/snippet}
    </Sheet>
  </Stack>
</Story>

<!-- `wrap`: long values break onto several lines instead of being cut off. -->
<Story name="Wrapped" asChild>
  <Stack style="height:30rem">
    <Sheet title="Venues" about="Wrapped cells">
      <EditableGrid columns={venueColumns} {rows} wrap oncommit={commit} label="Venues" />
    </Sheet>
  </Stack>
</Story>

<!-- `draft` (bindable) pins a green row under the header for a new record: Enter submits,
     Escape cancels. The code below shows the draft as it is typed. -->
<Story name="Draft row" asChild>
  <Stack gap="sm" style="height:28rem">
    <Sheet title="Venues" about="Add a venue">
      {#snippet tools()}
        <Button
          variant={draft ? 'ghost' : 'success'}
          shape="pill"
          icon={draft ? 'close' : 'plus'}
          label={draft ? 'Cancel' : 'Add row'}
          onclick={() => (draft = draft ? null : {})}
        />
      {/snippet}
      <EditableGrid
        columns={venueColumns}
        rows={rows.slice(0, 4)}
        bind:draft
        oncommit={commit}
        label="Venues"
      />
    </Sheet>
    <CodeBlock label="draft" code={JSON.stringify(draft)} />
  </Stack>
</Story>

<!-- `editable={false}`: a read-only table at full contrast. -->
<Story name="Read-only" asChild>
  <Stack style="height:24rem">
    <Sheet title="Venues" about="Read-only">
      <EditableGrid
        columns={venueColumns}
        rows={rows.slice(0, 5)}
        editable={false}
        label="Venues"
      />
    </Sheet>
  </Stack>
</Story>

<!-- A VARCHAR[] column: tags in the cell, a TagInput to edit. Enter adds a tag, Enter again
     saves. -->
<Story name="List cells" asChild>
  <Stack style="height:18rem">
    <Sheet title="Topics">
      <EditableGrid
        columns={topicColumns}
        rows={topicRows}
        oncommit={(row, column, value) => {
          topicRows = topicRows.map((r, i) => (i === row ? { ...r, [column]: value } : r));
        }}
        label="Topics"
      />
    </Sheet>
  </Stack>
</Story>

<!-- STRUCT columns: each value is edited where it stands. Nested records fold; NULL records still
     show the keys their type names. The code below shows what a save commits. -->
<Story name="Struct cells" asChild>
  <Stack gap="sm">
    <Stack style="height:24rem">
      <Sheet title="Places">
        <EditableGrid
          columns={structColumns}
          rows={structRows}
          wrap
          oncommit={(row, column, value) => {
            structRows = structRows.map((r, i) => (i === row ? { ...r, [column]: value } : r));
          }}
          label="Places"
        />
      </Sheet>
    </Stack>
    <CodeBlock label="rows" code={JSON.stringify(structRows, null, 1)} wrap />
  </Stack>
</Story>
