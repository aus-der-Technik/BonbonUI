<script lang="ts">
  /**
   * Example page: a team's kanban board, mock data (Storybook only). A filling Page: the board
   * takes all the room and each column scrolls on its own; new cards are added at the foot of
   * the column they belong to. A card opens in a Drawer with its details, who else is looking at
   * it and its discussion. The week's numbers and the activity sit in the aside on wide screens
   * and in a drawer from the "Activity" button otherwise. TeamWorkspace passes the shared
   * navigation and header actions.
   */
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  import Button from '../patterns/atoms/Button.svelte';
  import Heading from '../patterns/atoms/Heading.svelte';
  import Input from '../patterns/atoms/Input.svelte';
  import Text from '../patterns/atoms/Text.svelte';
  import Grid from '../patterns/layout/Grid.svelte';
  import Layer from '../patterns/layout/Layer.svelte';
  import Row from '../patterns/layout/Row.svelte';
  import Section from '../patterns/layout/Section.svelte';
  import Spacer from '../patterns/layout/Spacer.svelte';
  import Stack from '../patterns/layout/Stack.svelte';
  import AvatarStack from '../patterns/molecules/AvatarStack.svelte';
  import DatePicker from '../patterns/molecules/DatePicker.svelte';
  import Field from '../patterns/molecules/Field.svelte';
  import Popover from '../patterns/molecules/Popover.svelte';
  import SearchField from '../patterns/molecules/SearchField.svelte';
  import SegmentedControl from '../patterns/molecules/SegmentedControl.svelte';
  import Stat from '../patterns/molecules/Stat.svelte';
  import TaskList from '../patterns/molecules/TaskList.svelte';
  import ActivityLog, { type ActivityEntry } from '../patterns/organisms/ActivityLog.svelte';
  import CommentThread, { type ThreadComment } from '../patterns/organisms/CommentThread.svelte';
  import Drawer from '../patterns/organisms/Drawer.svelte';
  import KanbanBoard, { type KanbanCard } from '../patterns/organisms/KanbanBoard.svelte';
  import Page from '../patterns/templates/Page.svelte';
  import { sameDay, startOfDay, toDate } from '../utils/collab';
  import DesignNotes, { type DesignNote } from './DesignNotes.svelte';
  import {
    NOW,
    boardActivity,
    boardCards,
    boardColumns,
    cardThreads,
    checklist,
    team,
    watching,
  } from './mock-collab';

  interface Props {
    /** The shared workspace navigation (left column on wide screens). */
    sidebar?: Snippet | undefined;
    /** Shared header actions: inbox, menu. */
    actions?: Snippet | undefined;
    width?: number;
  }

  let { sidebar, actions, width = 1440 }: Props = $props();

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
  let activityOpen = $state(false);
  let tasks = $state(checklist());
  let threads = $state(cardThreads());
  /** The card whose first comment is being written. */
  let starting = $state<string | null>(null);
  let activity = $state<ActivityEntry[]>([...boardActivity]);
  let serial = 0;

  const ME = 'Jonas Weber';
  const weekEnd = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + 7);
  const opened = $derived(cards.find((c) => c.id === openId));
  const roomy = $derived(width >= 1320);
  const compact = $derived(width < 640);
  const columnTitle = (id: string | undefined) =>
    boardColumns.find((c) => c.id === id)?.title ?? '';

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
  const lookers = $derived(
    (watching[openId ?? ''] ?? [])
      .map((id) => team.find((p) => p.id === id))
      .filter((p) => p !== undefined),
  );

  function log(action: string, target: string, detail?: string, tone?: ActivityEntry['tone']) {
    const entry: ActivityEntry = { id: `log-${Date.now()}`, actor: ME, action, target, at: NOW };
    if (detail) entry.detail = detail;
    if (tone) entry.tone = tone;
    activity = [entry, ...activity];
  }

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
    if (card.column !== column)
      log('moved', card.title, `${columnTitle(card.column)} → ${columnTitle(column)}`, 'ok');
  }

  /** A new card appears at the foot of its column and opens, title ready to type. */
  async function add(column: string) {
    serial += 1;
    const card: KanbanCard = { id: `new-${serial}`, column, title: 'Untitled card' };
    cards = [...cards, card];
    log('added a card to', columnTitle(column), undefined, 'ok');
    openId = card.id;
    await tick();
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('[data-card-title] input');
      input?.focus();
      input?.select();
    }, 250);
  }

  function update(patch: Partial<KanbanCard>) {
    cards = cards.map((c) => (c.id === openId ? { ...c, ...patch } : c));
  }

  function reply(text: string) {
    if (!openId) return;
    const list = threads[openId] ?? [];
    const comment: ThreadComment = {
      id: `${openId}-${list.length + 1}`,
      author: ME,
      time: NOW,
      text,
    };
    threads[openId] = [...list, comment];
    update({ comments: (opened?.comments ?? list.length) + 1 });
  }

  /** The composer of a new thread opens where the button was, ready to type. */
  async function startThread(id: string) {
    starting = id;
    await tick();
    document.querySelector<HTMLElement>('section[aria-label="Discussion"] textarea')?.focus();
  }

  /** After the drawer closes, the card it was about glows once on the board. */
  async function close() {
    const id = openId;
    openId = null;
    await tick();
    const card = id && document.querySelector<HTMLElement>(`[data-card="${CSS.escape(id)}"]`);
    if (!card || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    // A ring rather than the background glow: the card's own glass must stay opaque.
    card.animate(
      [
        { outline: '3px solid var(--accent)', outlineOffset: '2px' },
        { outline: '3px solid transparent', outlineOffset: '6px' },
      ],
      { duration: 900, easing: 'ease-out' },
    );
  }

  const notes: DesignNote[] = [
    {
      principle: 'locality',
      title: 'Add a card in the column it belongs to',
      body: 'There is no global “New card” button that drops cards into some default column. “Add card” sits at the foot of every column; the card appears there and opens, ready for its title.',
      target: '[data-note="board"]',
    },
    {
      principle: 'cues',
      title: 'Cards travel, they never jump',
      body: 'Drag a card, use Alt + arrow keys or its menu — it glides to its new place, and the move shows up at the top of the activity log.',
      target: '[data-note="board"]',
    },
    {
      principle: 'locality',
      title: 'Comments live on the card',
      body: 'The discussion opens with the card and quotes what it is about. Who else is looking at the card right now is shown at the top of it, not in a separate presence panel.',
      target: '[data-note="board"]',
    },
    {
      principle: 'function',
      title: 'Colour means something',
      body: 'Labels stay neutral, so the colour left over goes to priority, overdue dates and the column dots — the urgent card is the one that stands out.',
      target: '[data-note="board"]',
    },
    {
      principle: 'locality',
      title: 'Filters sit on the board they filter',
      body: 'The sticky row above the board narrows it: all, mine, due soon, a search, or one person from the faces of who is here.',
      target: '[data-note="filters"]',
    },
    {
      principle: 'cues',
      title: 'Drawers come from their trigger’s side',
      body: 'Card details and activity slide in from the right, where the board and the Activity button are; the workspace menu on small screens comes from the right too, because its button is there.',
      target: '[data-note="workspace-nav"]',
    },
  ];
</script>

{#snippet activityPanel()}
  <Section title="This week" heading={3} gap="md">
    <Grid columns={2} min="7rem" gap="md">
      <Stat size="sm" label="Done" value={done} delta={25} trend={[1, 2, 2, 3, 5, 4, done]} />
      <Stat size="sm" label="Overdue" value={overdue} delta={-50} goodWhen="down" />
    </Grid>
    <TaskList title="Release checklist" bind:items={tasks} sinkDone />
  </Section>
  <Section title="Activity" heading={3}>
    <ActivityLog entries={activity} />
  </Section>
{/snippet}

<Page
  title="Board"
  subtitle="what the team is working on"
  fill
  gap="md"
  {sidebar}
  aside={roomy ? activityPanel : undefined}
  asideWidth="19rem"
  {actions}
>
  {#snippet nav()}
    <div data-note="filters">
      <Layer level="front" direction="horizontal" gap="sm" wrap={false}>
        <SegmentedControl
          label="Show"
          size="sm"
          bind:value={filter}
          options={[
            { value: 'all', label: 'All' },
            { value: 'mine', label: 'Mine' },
            { value: 'due', label: compact ? 'Due' : 'Due soon' },
          ]}
        />
        <SearchField
          label="Search cards"
          placeholder="Search cards"
          shape="pill"
          bind:value={query}
        />
        <Spacer />
        {#if width > 640}
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
            label={person.split(' ')[0] ?? person}
            onclick={() => (person = null)}
          />
        {/if}
        {#if !roomy}
          <Button
            size="sm"
            variant="glass"
            shape="pill"
            icon="activity"
            label="Activity"
            iconOnly={compact}
            onclick={() => (activityOpen = true)}
          />
        {/if}
      </Layer>
    </div>
  {/snippet}

  <div class="board" data-note="board">
    <KanbanBoard
      columns={boardColumns}
      cards={visible}
      selected={openId ?? undefined}
      now={NOW}
      onmove={move}
      onopen={(card) => (openId = card.id)}
      onadd={add}
    />
  </div>
</Page>

<!-- The Activity button sits at the right end of the filter row, so the drawer comes from there. -->
<Drawer
  open={activityOpen}
  title="Activity"
  side="end"
  width="22rem"
  onclose={() => (activityOpen = false)}
>
  {@render activityPanel()}
</Drawer>

<Drawer
  open={!!opened}
  title={opened?.title ?? ''}
  subtitle={columnTitle(opened?.column)}
  onclose={close}
>
  {#if opened}
    <Stack gap="lg">
      {#if lookers.length}
        <div class="here" role="status">
          <AvatarStack people={lookers} size={24} label="Also looking at this card" />
          <span>
            {lookers.map((p) => p.name.split(' ')[0]).join(' and ')}
            {lookers.length === 1 ? 'is' : 'are'} looking at this card too
          </span>
          <span class="live" aria-hidden="true"></span>
        </div>
      {/if}
      <div data-card-title>
        <Field label="Title">
          {#snippet children({ id })}
            <Input
              {id}
              value={opened.title}
              oninput={(event: Event) =>
                update({ title: (event.currentTarget as HTMLInputElement).value })}
            />
          {/snippet}
        </Field>
      </div>
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
              <Button
                size="sm"
                variant="glass"
                shape="pill"
                icon="plus"
                label="Assign me"
                onclick={() =>
                  update({ assignees: [{ id: 'jonas', name: ME, presence: 'online' }] })}
              />
            {/if}
          </Row>
        </Stack>
      </Grid>
      <TaskList title="Checklist" items={checklist().slice(0, 3)} />
      <Stack gap="sm">
        <Heading level={3} size="lg">Discussion</Heading>
        {#if threads[opened.id]?.length || starting === opened.id}
          <!-- Without comments the thread is a new one: the card's title and a compact composer. -->
          <CommentThread
            label="Discussion"
            comments={threads[opened.id] ?? []}
            quote={threads[opened.id]?.length ? undefined : opened.title}
            now={NOW}
            replyPlaceholder="Reply…"
            onreply={reply}
            oncancel={threads[opened.id]?.length ? undefined : () => (starting = null)}
          />
        {:else}
          <Row>
            <Button
              size="sm"
              variant="glass"
              shape="pill"
              icon="chat"
              label="Start a discussion"
              onclick={() => startThread(opened.id)}
            />
          </Row>
        {/if}
        {#if lookers.length && threads[opened.id]?.length}
          <p class="typing" aria-live="polite">
            <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
            {lookers[0]?.name.split(' ')[0]} is typing…
          </p>
        {/if}
      </Stack>
    </Stack>
  {/if}
  {#snippet footer()}
    <Row>
      <Popover label="Move to…" placement="top-start" padding="sm">
        {#snippet children(closePopover)}
          <Stack gap="xs">
            {#each boardColumns as column (column.id)}
              <Button
                variant="ghost"
                size="sm"
                label={column.title}
                disabled={column.id === opened?.column}
                onclick={() => {
                  if (opened && opened.column !== column.id)
                    log(
                      'moved',
                      opened.title,
                      `${columnTitle(opened.column)} → ${column.title}`,
                      'ok',
                    );
                  update({ column: column.id });
                  closePopover();
                }}
              />
            {/each}
          </Stack>
        {/snippet}
      </Popover>
      <Spacer />
      <Button label="Done" variant="primary" shape="pill" onclick={close} />
    </Row>
  {/snippet}
</Drawer>

<DesignNotes title="Team workspace" {notes} corner="bottom-left" />

<style>
  .board {
    display: grid;
    min-height: 0;
    height: 100%;
  }
  .here {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-pill);
    background: var(--accent-faint);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .live {
    width: 8px;
    height: 8px;
    margin-left: auto;
    border-radius: var(--radius-pill);
    background: var(--ok);
    animation: pulse 1.6s var(--ease-in-out) infinite;
  }
  @keyframes pulse {
    50% {
      opacity: 0.35;
    }
  }
  .typing {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-xs);
    color: var(--text-3);
  }
  .dots {
    display: inline-flex;
    gap: 3px;
  }
  .dots i {
    width: 5px;
    height: 5px;
    border-radius: var(--radius-pill);
    background: var(--text-3);
    animation: bounce 1.2s var(--ease-in-out) infinite;
  }
  .dots i:nth-child(2) {
    animation-delay: 0.15s;
  }
  .dots i:nth-child(3) {
    animation-delay: 0.3s;
  }
  @keyframes bounce {
    30% {
      transform: translateY(-3px);
      opacity: 1;
    }
    0%,
    60%,
    100% {
      opacity: 0.5;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .live,
    .dots i {
      animation: none;
    }
  }
</style>
