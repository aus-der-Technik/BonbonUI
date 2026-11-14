<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import KanbanBoard, { type KanbanCard } from './KanbanBoard.svelte';
  import Stack from '../layout/Stack.svelte';
  import { NOW, boardCards, boardColumns } from '../../demo/mock-collab';

  const { Story } = defineMeta({
    title: 'Organisms/KanbanBoard',
    component: KanbanBoard,
    tags: ['autodocs'],
    args: { columns: boardColumns, cards: boardCards(), now: NOW },
  });
</script>

<script lang="ts">
  let cards = $state(boardCards());
  let log = $state('Drag a card, or focus one and press Alt + arrow keys.');
  let selected = $state<string | undefined>();
  let serial = 0;

  function add(column: string) {
    serial += 1;
    const card: KanbanCard = { id: `new-${serial}`, column, title: `New card ${serial}` };
    cards = [...cards, card];
  }
</script>

<!-- A project board. Columns show their count against a WIP limit ("In progress" allows 3,
"Review" 2 — move a card there to see it turn red). Cards carry priority, tags, due date
(amber today, red overdue), checklist progress, comments and assignees. -->
<Story name="Project board" />

<!-- Every way to move a card: drag and drop, Alt + arrow keys on a focused card, or the "⋯"
menu (touch). While dragging, the column under the card turns into tinted glass; the card lands
with one jelly wobble, and moving it into the last column ("Done") throws a few sprinkles
(`sprinkle={false}` turns that off). `onmove` reports each move; `onopen` and `onadd` make
cards openable and addable. -->
<Story name="Interactive" asChild>
  <Stack gap="sm">
    <p style="margin:0;color:var(--text-2)" aria-live="polite">{log}</p>
    <div style="height:36rem">
      <KanbanBoard
        columns={boardColumns}
        bind:cards
        {selected}
        now={NOW}
        onmove={(id, column, index) => (log = `Moved ${id} to ${column} at index ${index}.`)}
        onopen={(card) => (selected = card.id)}
        onadd={add}
      />
    </div>
  </Stack>
</Story>

<!-- `onmove` may return a promise. Here every save into "Done" fails: the card travels back to
where it was and says so on the card itself, not in a far corner. Moves elsewhere save. -->
<Story name="Failed save" asChild>
  <div style="height:36rem">
    <KanbanBoard
      columns={boardColumns}
      cards={boardCards()}
      now={NOW}
      sprinkle={false}
      onmove={(_id, column) =>
        new Promise<void>((resolve, reject) =>
          setTimeout(
            () => (column === boardColumns.at(-1)?.id ? reject(new Error('conflict')) : resolve()),
            700,
          ),
        )}
    />
  </div>
</Story>

<!-- Narrow columns for a small number of short cards. -->
<Story
  name="Compact"
  args={{
    columnWidth: '14rem',
    columns: boardColumns.slice(1, 4),
    cards: boardCards().map(({ description: _d, tasks: _t, ...card }) => card),
  }}
/>
