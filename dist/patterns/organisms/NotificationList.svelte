<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface NotificationItem {
    id: string;
    title: string;
    body?: string | undefined;
    time: Date | string;
    unread?: boolean;
    /** A glyph in a candy tile; `actor` shows that person's avatar instead. */
    icon?: IconName | undefined;
    /** Candy colour name or CSS colour of the icon tile. */
    color?: string | undefined;
    actor?: string | undefined;
    href?: string | undefined;
  }
</script>

<script lang="ts">
  /**
   * NotificationList organism — what happened while you were away: an icon or avatar, a title,
   * a line of detail and a relative time per item, a dot on the unread ones and "Mark all as
   * read" in the header. Opening an item marks it read. Fits a popover, a drawer or a side panel.
   *
   *   <NotificationList bind:items onopen={(item) => goto(item.href)} />
   */
  import Avatar from '../atoms/Avatar.svelte';
  import Icon from '../atoms/Icon.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import { candy, relativeTime, toDate } from '../../utils/collab';

  interface Props {
    items?: NotificationItem[];
    title?: string | undefined;
    now?: Date | undefined;
    locale?: string;
    markAllLabel?: string;
    emptyTitle?: string | undefined;
    emptyMessage?: string | undefined;
    emptyIcon?: IconName | undefined;
    /** @deprecated Use `emptyMessage`. */
    emptyText?: string | undefined;
    unreadLabel?: string;
    /** "3 unread" next to the title. */
    countLabel?: (unread: number) => string;
    onopen?: ((item: NotificationItem) => void) | undefined;
    onread?: ((ids: string[]) => void) | undefined;
  }

  let {
    items = $bindable([]),
    title = 'Notifications',
    now,
    locale = 'en',
    markAllLabel = 'Mark all as read',
    emptyTitle,
    emptyMessage,
    emptyIcon = 'check-circle',
    emptyText,
    unreadLabel = 'Unread',
    countLabel = (unread) => `${unread} unread`,
    onopen,
    onread,
  }: Props = $props();

  const id = $props.id();
  const unread = $derived(items.filter((item) => item.unread).length);

  function markRead(ids: string[]) {
    const set = new Set(ids);
    const changed = items.filter((i) => i.unread && set.has(i.id)).map((i) => i.id);
    if (!changed.length) return;
    items = items.map((i) => (set.has(i.id) ? { ...i, unread: false } : i));
    onread?.(changed);
  }

  function open(event: MouseEvent, item: NotificationItem) {
    markRead([item.id]);
    if (onopen) {
      if (!item.href) event.preventDefault();
      onopen(item);
    }
  }
</script>

{#snippet content(item: NotificationItem, date: Date)}
  <span class="lead" aria-hidden="true">
    {#if item.actor}
      <Avatar name={item.actor} size={36} />
    {:else}
      <span class="tile" style:--c={candy(item.color)}>
        <Icon name={item.icon ?? 'bell'} size={18} />
      </span>
    {/if}
  </span>
  <span class="text">
    <span class="item-title">
      {#if item.unread}<span class="sr-only">{unreadLabel}:</span>{/if}
      {item.title}
    </span>
    {#if item.body}<span class="body">{item.body}</span>{/if}
    <time datetime={date.toISOString()}>{relativeTime(date, now, locale)}</time>
  </span>
  {#if item.unread}<span class="dot" aria-hidden="true"></span>{/if}
{/snippet}

<section class="notifications" aria-labelledby={title ? `${id}-title` : undefined}>
  {#if title}
    <header class="head">
      <h3 class="title" id="{id}-title">{title}</h3>
      {#if unread}<span class="count">{countLabel(unread)}</span>{/if}
      {#if unread}
        <button type="button" class="mark-all" onclick={() => markRead(items.map((i) => i.id))}>
          <Icon name="check" size={14} />{markAllLabel}
        </button>
      {/if}
    </header>
  {/if}

  {#if items.length}
    <ul class="list">
      {#each items as item (item.id)}
        {@const date = toDate(item.time)}
        <li>
          {#if item.href}
            <a
              href={item.href}
              class="item"
              class:unread={item.unread}
              onclick={(event) => open(event, item)}>{@render content(item, date)}</a
            >
          {:else}
            <button
              type="button"
              class="item"
              class:unread={item.unread}
              onclick={(event) => open(event, item)}
            >
              {@render content(item, date)}
            </button>
          {/if}
        </li>
      {/each}
    </ul>
  {:else}
    <EmptyState
      title={emptyTitle}
      message={emptyMessage ?? emptyText ?? 'You are all caught up. Treat yourself.'}
      icon={emptyIcon}
    />
  {/if}
</section>

<style>
  .notifications {
    display: grid;
    gap: var(--space-2);
    min-width: 0;
  }
  .head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-2);
    padding: 0 var(--space-2);
  }
  .title {
    margin: 0;
    font-size: var(--fs-lg);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
  }
  .count {
    padding: 0 0.5rem;
    border-radius: var(--radius-pill);
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    line-height: 1.6;
    font-variant-numeric: tabular-nums;
  }
  .mark-all {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: auto;
    padding: 0.2rem 0.5rem;
    border: 0;
    border-radius: var(--radius-pill);
    background: none;
    color: var(--accent-ink);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    cursor: pointer;
  }
  .mark-all:hover {
    background: var(--accent-faint);
  }
  .mark-all:focus-visible {
    outline: var(--focus-ring);
  }
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 2px;
  }
  .item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-2);
    border: 0;
    border-radius: var(--radius-lg);
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-out);
  }
  .item:hover {
    background: var(--fill-hover);
  }
  .item:active {
    transform: scale(0.99);
  }
  .item:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -1px;
  }
  .item.unread {
    background: var(--accent-faint);
  }
  .item.unread:hover {
    background: var(--accent-soft);
  }
  .lead {
    flex-shrink: 0;
  }
  .tile {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: calc(var(--radius-md) + 2px);
    /* Lit from above: the candy colour a step lighter at the top. The glyph is black or white,
       whichever reads on it (the rule of the --on-* tokens). */
    background: linear-gradient(160deg, oklch(from var(--c) calc(l + 0.1) c h), var(--c) 70%);
    color: oklch(from var(--c) clamp(0.16, (0.7 - l) * 999, 1) 0 0);
    box-shadow:
      0 4px 10px -4px color-mix(in srgb, var(--c) 70%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--pill-light) 45%, transparent);
  }
  .text {
    flex: 1;
    min-width: 0;
    display: grid;
    gap: 0.1rem;
  }
  .item-title {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text);
    line-height: 1.35;
  }
  .unread .item-title {
    font-weight: var(--fw-semibold);
  }
  .body {
    font-size: var(--fs-sm);
    color: var(--text-2);
    line-height: 1.4;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  time {
    font-size: var(--fs-xs);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .dot {
    flex-shrink: 0;
    width: 9px;
    height: 9px;
    margin-top: 0.4rem;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-faint);
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
    .item {
      transition: none;
    }
  }
</style>
