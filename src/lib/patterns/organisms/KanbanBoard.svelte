<script lang="ts" module>
  import type { Participant } from '../molecules/AvatarStack.svelte';

  export interface KanbanColumn {
    id: string;
    title: string;
    /** Candy colour name or CSS colour of the column dot. */
    color?: string | undefined;
    /** Work-in-progress limit: the count turns amber at the limit and red above it. */
    limit?: number | undefined;
  }

  export type KanbanPriority = 'low' | 'medium' | 'high' | 'urgent';

  export interface KanbanTag {
    label: string;
    /** Candy colour name or CSS colour. */
    color?: string | undefined;
  }

  export interface KanbanCard {
    id: string;
    /** Id of the column it is in; the order inside a column is the order of `cards`. */
    column: string;
    title: string;
    description?: string | undefined;
    tags?: (string | KanbanTag)[] | undefined;
    assignees?: Participant[] | undefined;
    due?: Date | string | undefined;
    priority?: KanbanPriority | undefined;
    /** Number of comments, shown with a speech bubble. */
    comments?: number | undefined;
    /** Checklist progress. */
    tasks?: { done: number; total: number } | undefined;
    /** Colour stripe on top of the card. */
    color?: string | undefined;
  }
</script>

<script lang="ts">
  /**
   * KanbanBoard organism — columns of cards for a project board. Cards move by drag and drop,
   * from the keyboard (Alt + arrow keys on a focused card: left/right to the next column, up/down
   * within it) and with the card's "Move to…" menu (touch). The board reorders `cards` itself
   * (bind it) and reports every move through `onmove(cardId, toColumn, index)`. Columns show
   * their count against an optional WIP limit; in a filling page each column scrolls on its own.
   * A column under a dragged card turns into tinted glass, a card lands with a small jelly
   * wobble, and a card arriving in the last column (your "Done") throws a few sprinkles once
   * (`sprinkle={false}` turns that off).
   *
   *   <KanbanBoard {columns} bind:cards onmove={save} onopen={(card) => (open = card)} />
   */
  import { tick } from 'svelte';
  import AvatarStack from '../molecules/AvatarStack.svelte';
  import Popover from '../molecules/Popover.svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import { candy, sameDay, startOfDay, toDate } from '../../utils/collab';
  import { celebrate } from '../../utils/delight';

  interface Props {
    columns: KanbanColumn[];
    cards?: KanbanCard[];
    /** Id of the open card, drawn on the selected layer. */
    selected?: string | undefined;
    columnWidth?: string;
    /** Reference day for "overdue" and "due today". */
    now?: Date;
    locale?: string;
    label?: string;
    moveLabel?: string;
    moveUpLabel?: string;
    moveDownLabel?: string;
    addCardLabel?: string;
    emptyText?: string;
    priorityLabels?: Record<KanbanPriority, string>;
    /** Read by screen readers on every card. */
    keyboardHint?: string;
    limitLabel?: (count: number, limit: number) => string;
    movedLabel?: (title: string, column: string, position: number, total: number) => string;
    onmove?: ((cardId: string, toColumn: string, index: number) => void) | undefined;
    onopen?: ((card: KanbanCard) => void) | undefined;
    /** Shows an "Add card" button under each column. */
    onadd?: ((columnId: string) => void) | undefined;
    /** A card moved into the last column celebrates with a small burst of sprinkles. */
    sprinkle?: boolean;
  }

  let {
    columns,
    cards = $bindable([]),
    selected,
    columnWidth = '18.5rem',
    now = new Date(),
    locale = 'en',
    label = 'Board',
    moveLabel = 'Move to…',
    moveUpLabel = 'Move up',
    moveDownLabel = 'Move down',
    addCardLabel = 'Add card',
    emptyText = 'Drop cards here',
    priorityLabels = { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent' },
    keyboardHint = 'Alt and the arrow keys move this card.',
    limitLabel = (count, limit) => `${count} of ${limit}`,
    movedLabel = (title, column, position, total) =>
      `Moved “${title}” to ${column}, position ${position} of ${total}.`,
    onmove,
    onopen,
    onadd,
    sprinkle = true,
  }: Props = $props();

  const id = $props.id();
  let board: HTMLDivElement;
  let dragId = $state<string | null>(null);
  let dragHeight = $state(64);
  let drop = $state<{ column: string; index: number } | null>(null);
  let announcement = $state('');
  // The card that just landed: it wobbles once.
  let landed = $state<string | null>(null);

  const PRIORITY_COLOR: Record<KanbanPriority, string> = {
    low: 'var(--color-gray)',
    medium: 'var(--color-blue)',
    high: 'var(--color-orange)',
    urgent: 'var(--color-red)',
  };

  const dueFormat = $derived(new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }));
  const byColumn = $derived(
    new Map(columns.map((column) => [column.id, cards.filter((c) => c.column === column.id)])),
  );
  const columnCards = (columnId: string) => byColumn.get(columnId) ?? [];

  export function move(cardId: string, to: string, index: number): void {
    const card = cards.find((c) => c.id === cardId);
    const column = columns.find((c) => c.id === to);
    if (!card || !column) return;
    const rest = cards.filter((c) => c.id !== cardId);
    const target = rest.filter((c) => c.column === to);
    const at = Math.max(0, Math.min(index, target.length));
    const before = target[at];
    const last = target[target.length - 1];
    const position = before ? rest.indexOf(before) : last ? rest.indexOf(last) + 1 : rest.length;
    rest.splice(position, 0, { ...card, column: to });
    cards = rest;
    announcement = movedLabel(card.title, column.title, at + 1, target.length + 1);
    onmove?.(cardId, to, at);
    void land(cardId, card.column !== to && to === columns.at(-1)?.id);
  }

  async function land(cardId: string, done: boolean) {
    landed = null;
    await tick();
    landed = cardId;
    if (!done || !sprinkle) return;
    const el = board?.querySelector(`[data-card="${CSS.escape(cardId)}"]`);
    if (el) celebrate(el);
  }

  async function focusCard(cardId: string) {
    await tick();
    board?.querySelector<HTMLElement>(`[data-open="${CSS.escape(cardId)}"]`)?.focus();
  }

  function onCardKeydown(event: KeyboardEvent, card: KanbanCard) {
    const list = columnCards(card.column);
    const at = list.indexOf(card);
    const col = columns.findIndex((c) => c.id === card.column);
    const key = event.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) return;
    event.preventDefault();

    if (event.altKey) {
      if (key === 'ArrowUp' && at > 0) move(card.id, card.column, at - 1);
      else if (key === 'ArrowDown' && at < list.length - 1) move(card.id, card.column, at + 1);
      else if (key === 'ArrowLeft' || key === 'ArrowRight') {
        const next = columns[col + (key === 'ArrowLeft' ? -1 : 1)];
        if (!next) return;
        move(card.id, next.id, Math.min(at, columnCards(next.id).length));
      } else return;
      void focusCard(card.id);
      return;
    }

    // Plain arrows walk the board.
    let target: KanbanCard | undefined;
    if (key === 'ArrowUp') target = list[at - 1];
    else if (key === 'ArrowDown') target = list[at + 1];
    else {
      const step = key === 'ArrowLeft' ? -1 : 1;
      for (let c = col + step; c >= 0 && c < columns.length; c += step) {
        const other = columnCards(columns[c]?.id ?? '');
        if (other.length) {
          target = other[Math.min(at, other.length - 1)];
          break;
        }
      }
    }
    if (target) void focusCard(target.id);
  }

  function onDragStart(event: DragEvent, card: KanbanCard) {
    const item = event.currentTarget as HTMLElement;
    dragId = card.id;
    dragHeight = item.offsetHeight || 64;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', card.id);
    }
  }

  function onDragOver(event: DragEvent, columnId: string) {
    if (!dragId) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    const list = event.currentTarget as HTMLElement;
    const items = [...list.querySelectorAll<HTMLElement>('[data-card]:not(.dragging)')];
    let index = items.length;
    for (let i = 0; i < items.length; i++) {
      const box = items[i]!.getBoundingClientRect();
      if (event.clientY < box.top + box.height / 2) {
        index = i;
        break;
      }
    }
    if (drop?.column !== columnId || drop.index !== index) drop = { column: columnId, index };
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    const cardId = dragId ?? event.dataTransfer?.getData('text/plain');
    if (cardId && drop) {
      move(cardId, drop.column, drop.index);
      void focusCard(cardId);
    }
    endDrag();
  }

  function endDrag() {
    dragId = null;
    drop = null;
  }

  function onBoardLeave(event: DragEvent) {
    if (!board.contains(event.relatedTarget as Node | null)) drop = null;
  }

  // Index of a card among the cards that stay put during a drag.
  const restIndex = (list: KanbanCard[], card: KanbanCard) =>
    list.filter((c) => c.id !== dragId).indexOf(card);

  function dueStatus(due: Date): 'overdue' | 'today' | 'later' {
    if (sameDay(due, now)) return 'today';
    return due < startOfDay(now) ? 'overdue' : 'later';
  }

  const tagOf = (tag: string | KanbanTag): KanbanTag =>
    typeof tag === 'string' ? { label: tag } : tag;
</script>

<div
  bind:this={board}
  class="board"
  role="region"
  aria-label={label}
  style:--column-w={columnWidth}
  ondragleave={onBoardLeave}
>
  {#each columns as column (column.id)}
    {@const list = columnCards(column.id)}
    {@const count = list.length}
    {@const over = column.limit != null && count > column.limit}
    {@const full = column.limit != null && count === column.limit}
    <section
      class="column"
      class:drop-target={drop?.column === column.id}
      aria-labelledby="{id}-{column.id}"
    >
      <header class="column-head">
        <span class="column-dot" style:--c={candy(column.color, 'var(--text-3)')}></span>
        <h3 class="column-title" id="{id}-{column.id}">{column.title}</h3>
        <span
          class="column-count"
          class:full
          class:over
          title={column.limit != null ? limitLabel(count, column.limit) : undefined}
        >
          {count}{#if column.limit != null}<span class="limit">/{column.limit}</span>{/if}
        </span>
        {#if onadd}
          <Button
            size="xs"
            variant="ghost"
            shape="pill"
            icon="plus"
            iconOnly
            label="{addCardLabel}: {column.title}"
            onclick={() => onadd(column.id)}
          />
        {/if}
      </header>

      <ul
        class="cards"
        ondragover={(event) => onDragOver(event, column.id)}
        ondrop={onDrop}
        aria-label={column.title}
      >
        {#each list as card (card.id)}
          {@const at = restIndex(list, card)}
          {#if drop?.column === column.id && drop.index === at}
            <li class="slot" style:height="{dragHeight}px" aria-hidden="true"></li>
          {/if}
          <li
            class="card"
            class:dragging={dragId === card.id}
            class:selected={selected === card.id}
            class:landed={landed === card.id}
            onanimationend={() => {
              if (landed === card.id) landed = null;
            }}
            data-card={card.id}
            draggable="true"
            ondragstart={(event) => onDragStart(event, card)}
            ondragend={endDrag}
          >
            {#if card.color}<span class="stripe" style:--c={candy(card.color)}></span>{/if}
            {#if card.priority || card.tags?.length}
              <div class="chips">
                {#if card.priority}
                  <span class="chip chip--priority" style:--c={PRIORITY_COLOR[card.priority]}>
                    <Icon name={card.priority === 'urgent' ? 'bolt' : 'flag'} size={11} />
                    {priorityLabels[card.priority]}
                  </span>
                {/if}
                {#each card.tags ?? [] as raw, index (index)}
                  {@const tag = tagOf(raw)}
                  <span class="chip" style:--c={candy(tag.color, 'var(--text-3)')}>{tag.label}</span
                  >
                {/each}
              </div>
            {/if}

            <div class="title-row">
              <button
                type="button"
                class="open"
                data-open={card.id}
                aria-describedby="{id}-hint"
                onclick={() => onopen?.(card)}
                onkeydown={(event) => onCardKeydown(event, card)}
              >
                {card.title}
              </button>
              <Popover label={moveLabel} placement="bottom-end" padding="sm" width="13rem">
                {#snippet trigger(props)}
                  <button
                    type="button"
                    class="menu"
                    aria-label="{moveLabel} {card.title}"
                    title={moveLabel}
                    {...props}
                  >
                    <Icon name="more" size={16} />
                  </button>
                {/snippet}
                {#snippet children(close)}
                  {@const at = list.indexOf(card)}
                  <div class="move-menu" role="group" aria-label={moveLabel}>
                    <p class="move-title">{moveLabel}</p>
                    {#each columns as target (target.id)}
                      <button
                        type="button"
                        class="move-item"
                        disabled={target.id === card.column}
                        onclick={() => {
                          close();
                          move(card.id, target.id, columnCards(target.id).length);
                          void focusCard(card.id);
                        }}
                      >
                        <span class="column-dot" style:--c={candy(target.color, 'var(--text-3)')}
                        ></span>
                        {target.title}
                        {#if target.id === card.column}<Icon name="check" size={14} />{/if}
                      </button>
                    {/each}
                    <hr />
                    <button
                      type="button"
                      class="move-item"
                      disabled={at <= 0}
                      onclick={() => {
                        close();
                        move(card.id, card.column, at - 1);
                        void focusCard(card.id);
                      }}
                    >
                      <Icon name="arrow-up" size={14} />{moveUpLabel}
                    </button>
                    <button
                      type="button"
                      class="move-item"
                      disabled={at >= list.length - 1}
                      onclick={() => {
                        close();
                        move(card.id, card.column, at + 1);
                        void focusCard(card.id);
                      }}
                    >
                      <Icon name="arrow-down" size={14} />{moveDownLabel}
                    </button>
                  </div>
                {/snippet}
              </Popover>
            </div>

            {#if card.description}<p class="description">{card.description}</p>{/if}

            {#if card.due || card.tasks || card.comments || card.assignees?.length}
              <div class="meta">
                {#if card.due}
                  {@const due = toDate(card.due)}
                  <span class="meta-item due due--{dueStatus(due)}">
                    <Icon name="calendar" size={13} />
                    <time datetime={due.toISOString()}>{dueFormat.format(due)}</time>
                  </span>
                {/if}
                {#if card.tasks}
                  <span
                    class="meta-item"
                    class:complete={card.tasks.total > 0 && card.tasks.done === card.tasks.total}
                  >
                    <Icon name="check-square" size={13} />
                    {card.tasks.done}/{card.tasks.total}
                  </span>
                {/if}
                {#if card.comments}
                  <span class="meta-item"><Icon name="chat" size={13} />{card.comments}</span>
                {/if}
                {#if card.assignees?.length}
                  <span class="assignees">
                    <AvatarStack people={card.assignees} size={22} max={3} presence={false} />
                  </span>
                {/if}
              </div>
            {/if}
          </li>
        {/each}
        {#if drop?.column === column.id && drop.index === list.filter((c) => c.id !== dragId).length}
          <li class="slot" style:height="{dragHeight}px" aria-hidden="true"></li>
        {/if}
        {#if !count && drop?.column !== column.id}
          <li class="empty">{emptyText}</li>
        {/if}
      </ul>

      {#if onadd}
        <button type="button" class="add" onclick={() => onadd(column.id)}>
          <Icon name="plus" size={15} />{addCardLabel}
        </button>
      {/if}
    </section>
  {/each}
  <p class="sr-only" id="{id}-hint">{keyboardHint}</p>
  <p class="sr-only" aria-live="assertive">{announcement}</p>
</div>

<style>
  .board {
    display: flex;
    align-items: stretch;
    gap: var(--space-4);
    min-height: 0;
    height: 100%;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scroll-padding-inline: var(--space-1);
    /* room for the column shadows inside the scroll box */
    padding: var(--space-1) var(--space-1) var(--space-3);
    margin: calc(var(--space-1) * -1);
  }
  .column {
    flex: 0 0 var(--column-w);
    max-width: calc(100vw - 3rem);
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: 100%;
    scroll-snap-align: start;
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    transition:
      background-color var(--motion-base) var(--ease-out),
      border-color var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out);
  }
  /* The column under a dragged card becomes tinted glass: "it goes here". */
  .drop-target {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  @media (max-width: 720px) {
    .board {
      scroll-snap-type: x mandatory;
    }
    .column {
      flex-basis: min(var(--column-w), calc(100vw - 4rem));
    }
  }

  .column-head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-3) var(--space-2) var(--space-4);
  }
  .column-dot {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--c);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 22%, transparent);
  }
  .column-title {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .column-count {
    flex-shrink: 0;
    min-width: 1.6rem;
    padding: 0 0.45rem;
    border-radius: var(--radius-pill);
    background: var(--fill-muted);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    line-height: 1.6;
    text-align: center;
  }
  .limit {
    color: var(--text-3);
    font-weight: var(--fw-medium);
  }
  .column-count.full {
    background: var(--tint-warn);
    color: var(--draft);
  }
  .column-count.over {
    background: var(--tint-danger);
    color: var(--danger);
  }
  .column-count.full .limit,
  .column-count.over .limit {
    color: inherit;
  }

  .cards {
    flex: 1 1 auto;
    min-height: 3rem;
    margin: 0;
    padding: var(--space-1) var(--space-3) var(--space-3);
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--glass-strong);
    border: 0.75px solid var(--pill-border);
    box-shadow:
      var(--shadow-frosted),
      inset 0 1px 0 var(--pill-light);
    cursor: grab;
    transition:
      transform var(--motion-base) var(--ease-out),
      box-shadow var(--motion-base) var(--ease-out),
      opacity var(--motion-quick) var(--ease-out);
  }
  .card:hover {
    transform: translateY(-2px);
    box-shadow:
      var(--shadow-frosted-hover),
      inset 0 1px 0 var(--pill-light);
  }
  .card:focus-within {
    box-shadow:
      var(--shadow-frosted-hover),
      0 0 0 2px var(--accent-border);
  }
  .card.selected {
    background: var(--layer-selected-bg);
    border: 1.5px solid var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .card.dragging {
    opacity: 0.4;
    transform: scale(0.97);
    cursor: grabbing;
  }
  .card:active {
    cursor: grabbing;
    transform: scale(0.99);
  }
  /* Landing: one gummy wobble where the card was dropped. */
  .card.landed {
    animation: bb-jelly var(--motion-lazy) var(--ease-out);
  }
  .stripe {
    position: absolute;
    inset: 0 0 auto;
    height: 4px;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    background: var(--c);
  }
  .slot {
    flex-shrink: 0;
    border-radius: var(--radius-lg);
    border: 1.5px dashed var(--accent-border);
    background: var(--accent-faint);
    animation: bb-pop var(--motion-base) var(--ease-out);
  }
  .empty {
    display: grid;
    place-items: center;
    min-height: 4.5rem;
    border-radius: var(--radius-lg);
    border: 1.5px dashed var(--border-strong);
    color: var(--text-3);
    font-size: var(--fs-sm);
    text-align: center;
    padding: 0 var(--space-3);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    height: 1.25rem;
    padding: 0 0.45rem;
    border-radius: var(--radius-pill);
    background: color-mix(in srgb, var(--c) 16%, transparent);
    color: color-mix(in srgb, var(--c) 60%, var(--text));
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    white-space: nowrap;
  }
  .chip--priority {
    background: color-mix(in srgb, var(--c) 20%, transparent);
  }

  .title-row {
    display: flex;
    align-items: flex-start;
    gap: var(--space-1);
  }
  .open {
    flex: 1;
    min-width: 0;
    padding: 0;
    border: 0;
    background: none;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    line-height: 1.35;
    text-align: left;
    overflow-wrap: anywhere;
    cursor: pointer;
  }
  .open:focus-visible {
    outline: none;
  }
  /* The whole card shows the focus of its title. */
  .card:has(.open:focus-visible) {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .menu {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    margin: -3px -4px 0 0;
    border: 0;
    border-radius: 50%;
    background: none;
    color: var(--text-3);
    cursor: pointer;
    opacity: 0;
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .menu:active {
    transform: var(--press-squish);
  }
  .card:hover .menu,
  .card:focus-within .menu,
  .menu[aria-expanded='true'] {
    opacity: 1;
  }
  @media (hover: none) {
    .menu {
      opacity: 1;
    }
  }
  .menu:hover {
    background: var(--fill-hover);
    color: var(--text);
  }
  .menu:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .description {
    margin: 0;
    font-size: var(--fs-sm);
    line-height: 1.45;
    color: var(--text-2);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-3);
    min-height: 22px;
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    font-variant-numeric: tabular-nums;
  }
  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
  .meta-item.complete {
    color: var(--ok);
  }
  .due {
    padding: 0.05rem 0.4rem;
    margin-left: -0.4rem;
    border-radius: var(--radius-pill);
  }
  .due--today {
    background: var(--tint-warn);
    color: var(--draft);
  }
  .due--overdue {
    background: var(--tint-danger);
    color: var(--danger);
  }
  .assignees {
    margin-left: auto;
  }

  .add {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0 var(--space-3) var(--space-3);
    padding: 0 var(--space-3);
    height: var(--control-sm);
    border: 0;
    border-radius: var(--radius-lg);
    background: none;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    cursor: pointer;
  }
  .add:hover {
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .add:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }

  .move-menu {
    display: grid;
    gap: 1px;
  }
  .move-title {
    margin: 0;
    padding: var(--space-1) var(--space-2) var(--space-2);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-3);
  }
  .move-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--control-sm);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    color: var(--text);
    font: inherit;
    font-size: var(--fs-sm);
    text-align: left;
    cursor: pointer;
  }
  .move-item :global(.icon:last-child:not(:first-child)) {
    margin-left: auto;
    color: var(--accent-ink);
  }
  .move-item:hover:not(:disabled) {
    background: var(--accent-faint);
  }
  .move-item:focus-visible {
    outline: var(--focus-ring);
  }
  .move-item:disabled {
    color: var(--text-3);
    cursor: default;
  }
  .move-menu hr {
    margin: var(--space-1) 0;
    border: 0;
    border-top: 1px solid var(--border);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .column {
      transition: none;
    }
    .card:hover,
    .card:active {
      transform: none;
    }
    .card.landed,
    .slot {
      animation: none;
    }
  }
  @media (prefers-reduced-transparency: reduce) {
    .column {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
