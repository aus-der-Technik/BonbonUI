<script lang="ts">
  import { Page, KanbanBoard, AvatarStack, type KanbanCard } from '../../index';

  const people = [
    { name: 'Ada Example', presence: 'online' as const },
    { name: 'Grace Example', presence: 'online' as const },
    { name: 'Linus Example', presence: 'away' as const },
  ];
  const columns = [
    { id: 'todo', title: 'To do', color: 'blue' },
    { id: 'doing', title: 'In progress', color: 'orange', limit: 3 },
    { id: 'done', title: 'Done', color: 'green' },
  ];
  let cards = $state<KanbanCard[]>([
    { id: 'c1', column: 'todo', title: 'Write the launch post', tags: ['Content'] },
    { id: 'c2', column: 'todo', title: 'Price the yearly plan', assignees: [people[1]!] },
    { id: 'c3', column: 'doing', title: 'Record the demo', priority: 'high', comments: 3 },
    { id: 'c4', column: 'done', title: 'Pick a launch date', tasks: { done: 2, total: 2 } },
  ]);

  // Create sits on the collection it adds to: each column has its own add button.
  function add(column: string) {
    cards.push({ id: crypto.randomUUID(), column, title: 'New card' });
  }
</script>

<Page title="Launch" subtitle="team board" width="full" fill>
  {#snippet actions()}<AvatarStack {people} />{/snippet}

  <KanbanBoard {columns} bind:cards onadd={add} columnWidth="15rem" />
</Page>
