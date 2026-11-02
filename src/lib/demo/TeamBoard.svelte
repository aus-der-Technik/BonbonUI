<script lang="ts">
  /**
   * Example page: a team's kanban project board, mock data (Storybook only). A filling Page: the
   * board takes all the room and each column scrolls on its own; the sidebar and the activity
   * aside appear when the window is wide enough, a menu button and a drawer replace them on
   * smaller screens. Card details open in a Drawer.
   */
  import Button from '../patterns/atoms/Button.svelte';
  import Heading from '../patterns/atoms/Heading.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import AvatarStack from '../patterns/molecules/AvatarStack.svelte';
  import Banner from '../patterns/molecules/Banner.svelte';
  import DatePicker from '../patterns/molecules/DatePicker.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Stat from '../patterns/molecules/Stat.svelte';
  import TaskList from '../patterns/molecules/TaskList.svelte';
  import ActivityLog from '../patterns/organisms/ActivityLog.svelte';
  import CommentThread from '../patterns/organisms/CommentThread.svelte';
  import Drawer from '../patterns/organisms/Drawer.svelte';
  import KanbanBoard, { type KanbanCard } from '../patterns/organisms/KanbanBoard.svelte';
  import NotificationList from '../patterns/organisms/NotificationList.svelte';
  import SideNav from '../patterns/organisms/SideNav.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { sameDay, startOfDay, toDate } from '../utils/collab';
  import {
    NOW,
    boardActivity,
    boardCards,
    boardColumns,
    checklist,
    collabNav,
    notifications,
    team,
    threadComments,
  } from './mock-collab';

  // Labels stay neutral on this board: colour is saved for priority, due dates and the column
  // dots, so the urgent card is the one that stands out.
  let cards = $state<KanbanCard[]>(
    boardCards().map((card) => ({
      ...card,
      tags: card.tags?.map((tag) => (typeof tag === 'string' ? tag : tag.label)),
    })),
  );
  let filter = $state<'all' | 'mine' | 'due'>('all');
  let query = $state('');
  let person = $state<string | null>(null);
  let openId = $state<string | null>(null);
  let navOpen = $state(false);
  let width = $state(1440);
  let inbox = $state(notifications());
  let tasks = $state(checklist());
  let serial = 0;

  const ME = 'Jonas Weber';
  const weekEnd = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + 7);
  const unread = $derived(inbox.filter((n) => n.unread).length);
  const opened = $derived(cards.find((c) => c.id === openId));
  const wide = $derived(width > 900);
  const roomy = $derived(width >= 1320);

  const visible = $derived(
    cards.filter((card) => {
      const names = card.assignees?.map((a) => a.name) ?? [];
      if (filter === 'mine' && !names.includes(ME)) return false;
      if (filter === 'due' && !(card.due && toDate(card.due) <= weekEnd)) return false;
      if (person && !names.includes(person)) return false;
      return !query || card.title.toLowerCase().includes(query.toLowerCase());
    }),
  );

  const done = $derived(cards.filter((c) => c.column === 'done').length);
  const overdue = $derived(
    cards.filter(
      (c) =>
        c.column !== 'done' &&
        c.due &&
        toDate(c.due) < startOfDay(NOW) &&
        !sameDay(toDate(c.due), NOW),
    ).length,
  );

  // The board only sees the filtered cards; apply its move to the full list.
  function move(id: string, column: string, index: number) {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    const rest = cards.filter((c) => c.id !== id);
    const shown = visible.filter((c) => c.id !== id && c.column === column);
    const before = shown[index];
    const last = shown[shown.length - 1];
    const at = before ? rest.indexOf(before) : last ? rest.indexOf(last) + 1 : rest.length;
    rest.splice(at, 0, { ...card, column });
    cards = rest;
  }

  function add(column: string) {
    serial += 1;
    const card: KanbanCard = { id: `new-${serial}`, column, title: 'Untitled card' };
    cards = [...cards, card];
    openId = card.id;
  }

  function update(patch: Partial<KanbanCard>) {
    cards = cards.map((c) => (c.id === openId ? { ...c, ...patch } : c));
  }
</script>

<svelte:window bind:innerWidth={width} />

{#snippet navigation()}
  <SideNav groups={collabNav} label="Workspace" onnavigate={(_, event) => event.preventDefault()} />
{/snippet}

{#snippet activity()}
  <Section title="This week" heading={3} level="panel" gap="md">
    <Grid columns={2} min="7rem" gap="md">
      <Stat size="sm" label="Done" value={done} delta={25} trend={[1, 2, 2, 3, 5, 4, done]} />
      <Stat size="sm" label="Overdue" value={overdue} delta={-50} goodWhen="down" />
    </Grid>
    <TaskList title="Release checklist" bind:items={tasks} sinkDone />
  </Section>
  <Section title="Activity" heading={3} level="panel">
    <ActivityLog entries={boardActivity} />
  </Section>
{/snippet}

<Page
  title="Shared boards"
  subtitle="Product team"
  fill
  gap="md"
  sidebar={wide ? navigation : undefined}
  aside={roomy ? activity : undefined}
  asideWidth="19rem"
>
  {#snippet actions()}
    {#if !wide}
      <Button
        variant="glass"
        shape="pill"
        icon="menu"
        label="Menu"
        iconOnly
        onclick={() => (navOpen = true)}
      />
    {/if}
    <Popover
      label={unread ? `Notifications, ${unread} unread` : 'Notifications'}
      icon="bell"
      iconOnly
      variant="glass"
      size="lg"
      placement="bottom-end"
      width="22rem"
      padding="sm"
    >
      <NotificationList bind:items={inbox} now={NOW} onopen={() => {}} />
    </Popover>
    <Button
      variant="primary"
      shape="pill"
      size="lg"
      icon="plus"
      label="New card"
      collapse
      onclick={() => add('todo')}
    />
  {/snippet}

  {#snippet nav()}
    <Layer level="front" direction="horizontal" gap="sm" wrap={false}>
      <SegmentedControl
        label="Show"
        size="sm"
        bind:value={filter}
        options={[
          { value: 'all', label: 'All' },
          { value: 'mine', label: 'Mine' },
          { value: 'due', label: 'Due soon' },
        ]}
      />
      <SearchField
        label="Search cards"
        placeholder="Search cards"
        shape="pill"
        bind:value={query}
      />
      <Spacer />
      {#if width > 520}
        <AvatarStack
          people={team}
          max={5}
          size={26}
          label="Who's here — pick one to filter"
          onselect={(p) => (person = person === p.name ? null : p.name)}
        />
      {/if}
      {#if person}
        <Button
          size="sm"
          variant="ghost"
          shape="pill"
          icon="close"
          label={person}
          onclick={() => (person = null)}
        />
      {/if}
    </Layer>
  {/snippet}

  <Banner
    tone="accent"
    title="Tip: move cards from the keyboard"
    message="Focus a card and press Alt with the arrow keys — or use its ⋯ menu on touch screens."
  />

  <KanbanBoard
    columns={boardColumns}
    cards={visible}
    selected={openId ?? undefined}
    now={NOW}
    onmove={move}
    onopen={(card) => (openId = card.id)}
    onadd={add}
  />
</Page>

<Drawer
  open={navOpen}
  title="Workspace"
  side="start"
  width="20rem"
  onclose={() => (navOpen = false)}
>
  {@render navigation()}
  {@render activity()}
</Drawer>

<Drawer
  open={!!opened}
  title={opened?.title ?? ''}
  subtitle={boardColumns.find((c) => c.id === opened?.column)?.title}
  onclose={() => (openId = null)}
>
  {#if opened}
    <Stack gap="lg">
      {#if opened.description}<Text tone="muted">{opened.description}</Text>{/if}
      <Grid columns={2} min="10rem" gap="md">
        <Field label="Due date">
          {#snippet children({ id })}
            <DatePicker
              {id}
              value={opened.due ? toDate(opened.due) : undefined}
              today={NOW}
              onchange={(due) => update({ due })}
            />
          {/snippet}
        </Field>
        <Stack gap="xs">
          <Text size="sm" tone="muted" weight="semibold">Assignees</Text>
          <Row>
            {#if opened.assignees?.length}
              <AvatarStack people={opened.assignees} />
            {:else}
              <Text tone="subtle">Nobody yet</Text>
            {/if}
          </Row>
        </Stack>
      </Grid>
      <TaskList title="Checklist" items={checklist().slice(0, 3)} />
      <Stack gap="sm">
        <Heading level={3} size="lg">Discussion</Heading>
        <CommentThread comments={threadComments} now={NOW} onreply={() => {}} />
      </Stack>
    </Stack>
  {/if}
  {#snippet footer()}
    <Row>
      <Popover label="Move to…" placement="top-start" padding="sm">
        {#snippet children(close)}
          <Stack gap="xs">
            {#each boardColumns as column (column.id)}
              <Button
                variant="ghost"
                size="sm"
                label={column.title}
                disabled={column.id === opened?.column}
                onclick={() => {
                  update({ column: column.id });
                  close();
                }}
              />
            {/each}
          </Stack>
        {/snippet}
      </Popover>
      <Spacer />
      <Button label="Close" onclick={() => (openId = null)} />
    </Row>
  {/snippet}
</Drawer>
