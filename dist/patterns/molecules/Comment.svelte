<script lang="ts">
  /**
   * Comment molecule — one message in a discussion: avatar, author, a relative time, plain text
   * (line breaks kept, nothing interpreted as markup) and optional reactions. `onreply` adds a
   * "Reply" link; `actions` takes extra buttons (a ⋯ menu). `highlight` marks a new message.
   *
   *   <Comment author="Ada Byron" time={date} text="Looks good to me!" bind:reactions />
   */
  import type { Snippet } from 'svelte';
  import Reactions, { type Reaction } from './Reactions.svelte';
  import Avatar from '../atoms/Avatar.svelte';
  import { relativeTime, toDate } from '../../utils/collab';

  interface Props {
    author: string;
    src?: string | undefined;
    time: Date | string;
    text: string;
    /** A role pill next to the name, e.g. "Owner". */
    role?: string | undefined;
    edited?: boolean;
    editedLabel?: string;
    /** `undefined` hides the reactions row; an empty array shows only the add button. */
    reactions?: Reaction[] | undefined;
    /** Reference time for "5 minutes ago" (stable stories and tests). */
    now?: Date | undefined;
    locale?: string;
    highlight?: boolean;
    size?: 'sm' | 'md';
    replyLabel?: string;
    onreply?: (() => void) | undefined;
    onreact?: ((emoji: string, mine: boolean) => void) | undefined;
    actions?: Snippet | undefined;
  }

  let {
    author,
    src,
    time,
    text,
    role,
    edited = false,
    editedLabel = 'edited',
    reactions = $bindable(),
    now,
    locale = 'en',
    highlight = false,
    size = 'md',
    replyLabel = 'Reply',
    onreply,
    onreact,
    actions,
  }: Props = $props();

  const date = $derived(toDate(time));
</script>

<article class="comment comment--{size}" class:highlight>
  <Avatar name={author} {src} size={size === 'sm' ? 26 : 32} />
  <div class="body">
    <header class="head">
      <span class="author">{author}</span>
      {#if role}<span class="role">{role}</span>{/if}
      <time datetime={date.toISOString()} title={date.toLocaleString(locale)}
        >{relativeTime(date, now, locale)}</time
      >
      {#if edited}<span class="edited">· {editedLabel}</span>{/if}
      {#if actions}<span class="actions">{@render actions()}</span>{/if}
    </header>
    <p class="text">{text}</p>
    {#if reactions || onreply}
      <div class="foot">
        {#if reactions}<Reactions bind:reactions size="sm" ontoggle={onreact} />{/if}
        {#if onreply}
          <button type="button" class="reply" onclick={onreply}>{replyLabel}</button>
        {/if}
      </div>
    {/if}
  </div>
</article>

<style>
  .comment {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-3);
    align-items: start;
  }
  .comment--sm {
    gap: var(--space-2);
  }
  .highlight::before {
    content: '';
    position: absolute;
    inset: calc(var(--space-2) * -1);
    z-index: -1;
    border-radius: var(--radius-lg);
    background: var(--accent-faint);
  }
  .body {
    display: grid;
    gap: var(--space-1);
    min-width: 0;
  }
  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.4rem;
    min-height: 1.5rem;
  }
  .author {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text);
  }
  .role {
    padding: 0 0.4rem;
    border-radius: var(--radius-pill);
    background: var(--accent-soft);
    color: var(--accent-ink);
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    line-height: 1.6;
  }
  time,
  .edited {
    font-size: var(--fs-xs);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .actions {
    margin-left: auto;
    align-self: center;
    display: inline-flex;
    gap: var(--space-1);
  }
  .text {
    margin: 0;
    font-size: var(--fs-md);
    line-height: 1.5;
    color: var(--text-2);
    white-space: pre-line;
    overflow-wrap: anywhere;
  }
  .comment--sm .text {
    font-size: var(--fs-sm);
  }
  .foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-1);
  }
  .reply {
    padding: 0.15rem 0.35rem;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--accent-ink);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    cursor: pointer;
  }
  .reply:hover {
    background: var(--accent-faint);
  }
  .reply:focus-visible {
    outline: var(--focus-ring);
  }
</style>
