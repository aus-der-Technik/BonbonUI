<script lang="ts" module>
  export interface ResourceStatus {
    label: string;
    tone: 'live' | 'locked' | 'draft' | 'danger' | 'info' | 'neutral';
    /** Transitional ("starting"): a spinner in the badge. */
    busy?: boolean;
  }
</script>

<script lang="ts" generics="T">
  /**
   * ResourceList organism — a light list of things you run or own (instances, volumes, jobs):
   * one row each with a leading slot, title and meta line, a status badge and per-row actions.
   * No header, no sorting — use DataTable for reports. Rows light up softly on hover.
   * `highlight` glows a row once each time it changes to that row's key (one just created).
   *
   *   <ResourceList items={servers} key={(s) => s.id} title={(s) => s.name}
   *     status={(s) => ({ label: 'Running', tone: 'live' })} />
   */
  import type { Snippet } from 'svelte';
  import { untrack } from 'svelte';
  import Badge from '../atoms/Badge.svelte';
  import Spinner from '../atoms/Spinner.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import { glowKeyed } from './highlight';

  interface Props {
    items: T[];
    key: (item: T) => string;
    title: (item: T) => string;
    meta?: ((item: T) => string | undefined) | undefined;
    status?: ((item: T) => ResourceStatus | undefined) | undefined;
    leading?: Snippet<[T]> | undefined;
    actions?: Snippet<[T]> | undefined;
    emptyText?: string;
    label?: string | undefined;
    /** Glows that row once each time this changes to its key, and scrolls it into view. */
    highlight?: string | undefined;
  }

  let {
    items,
    key,
    title,
    meta,
    status,
    leading,
    actions,
    emptyText = 'Nothing here yet.',
    label,
    highlight,
  }: Props = $props();

  let list = $state<HTMLUListElement>();
  let glowed = untrack(() => highlight);
  $effect(() => {
    const target = highlight;
    void items;
    if (target === undefined) glowed = undefined;
    else if (target !== glowed && glowKeyed(list, 'li.row', target)) glowed = target;
  });
</script>

{#if !items.length}
  <EmptyState message={emptyText} />
{:else}
  <ul class="list" aria-label={label} bind:this={list}>
    {#each items as item (key(item))}
      {@const badge = status?.(item)}
      {@const line = meta?.(item)}
      <li class="row" data-key={key(item)}>
        {#if leading}<span class="leading">{@render leading(item)}</span>{/if}
        <span class="text">
          <span class="title">{title(item)}</span>
          {#if line}<span class="meta">{line}</span>{/if}
        </span>
        {#if badge}
          <Badge tone={badge.tone} dot={!badge.busy}>
            {#if badge.busy}<Spinner size={11} label="" />{/if}{badge.label}
          </Badge>
        {/if}
        {#if actions}<span class="actions">{@render actions(item)}</span>{/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .list {
    list-style: none;
    display: grid;
    gap: 2px;
  }
  .row {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-xl);
    padding: var(--space-2) var(--space-3);
    margin-inline: calc(-1 * var(--space-3));
    border-radius: var(--radius-lg);
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .row:hover {
    background: var(--fill-subtle);
  }
  /* Hairline separators, inset to the text like a tablet list; hidden around a lit row. */
  .row + .row::before {
    content: '';
    position: absolute;
    top: -1px;
    left: var(--space-3);
    right: var(--space-3);
    height: 1px;
    background: var(--border-strong);
  }
  .row:hover::before,
  .row:hover + .row::before {
    opacity: 0;
  }
  .leading {
    display: inline-flex;
    flex-shrink: 0;
  }
  .text {
    flex: 1;
    min-width: 0;
    display: grid;
  }
  .title {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .meta {
    font-size: var(--fs-sm);
    color: var(--text-3);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .actions {
    display: inline-flex;
    gap: var(--space-1);
    flex-shrink: 0;
  }
</style>
