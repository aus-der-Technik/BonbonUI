<script lang="ts" module>
  import type { Reaction } from '../molecules/Reactions.svelte';

  export interface ThreadComment {
    id: string;
    author: string;
    src?: string | undefined;
    time: Date | string;
    text: string;
    role?: string | undefined;
    edited?: boolean;
    reactions?: Reaction[] | undefined;
  }
</script>

<script lang="ts">
  /**
   * CommentThread organism — a discussion on one thing (a paragraph, a card, a cell) on a glass
   * card: an optional quote of what it is about, the comments, a reply box and Resolve. Resolved
   * threads fold to a single line that opens again on click. Replies come back through
   * `onreply`; while its promise runs the box is busy, afterwards it is cleared. If it rejects,
   * the draft stays and `replyErrorMessage` shows right under the box.
   *
   * Without comments it is a new thread: just the quote and a compact composer
   * (`startPlaceholder`, `startLabel`) — no empty list. `oncancel` adds a "Discard" button
   * (`cancelLabel`) that drops the draft and lets you close the thread where it was opened.
   *
   *   <CommentThread quote="Launch in Q3" comments={thread} onreply={send} onresolve={resolve} />
   */
  import Comment from '../molecules/Comment.svelte';
  import Composer from '../molecules/Composer.svelte';
  import Button from '../atoms/Button.svelte';
  import Icon from '../atoms/Icon.svelte';
  import Alert from '../molecules/Alert.svelte';

  interface Props {
    comments: ThreadComment[];
    /** The passage the thread is about, shown as a quote on top. */
    quote?: string | undefined;
    resolved?: boolean;
    /** The reply box's text (bindable): set it to prefill, read it to keep a draft. */
    draft?: string;
    /** Shows the reply box (default when `onreply` is set). */
    canReply?: boolean | undefined;
    now?: Date | undefined;
    locale?: string;
    /** Marks the thread as the one in focus (selected layer). */
    active?: boolean;
    label?: string;
    replyLabel?: string;
    replyPlaceholder?: string;
    resolveLabel?: string;
    reopenLabel?: string;
    resolvedLabel?: string;
    /** Shown under the reply box when `onreply` rejects; the draft is kept. */
    replyErrorMessage?: string;
    dismissLabel?: string;
    /** Placeholder of the composer of a thread without comments yet. */
    startPlaceholder?: string;
    /** Send button of a thread without comments yet. */
    startLabel?: string;
    /** The button that drops a draft (shown with `oncancel`). */
    cancelLabel?: string;
    /** Discard: the draft is cleared, then this is called (e.g. to close a new thread). */
    oncancel?: (() => void) | undefined;
    /** "3 comments" in the folded line. */
    countLabel?: (count: number) => string;
    onreply?: ((text: string) => void | Promise<void>) | undefined;
    onresolve?: ((resolved: boolean) => void) | undefined;
    onreact?: ((commentId: string, emoji: string, mine: boolean) => void) | undefined;
  }

  let {
    comments,
    quote,
    resolved = $bindable(false),
    draft = $bindable(''),
    canReply,
    now,
    locale = 'en',
    active = false,
    label = 'Comment thread',
    replyLabel = 'Reply',
    replyPlaceholder = 'Write a reply…',
    resolveLabel = 'Resolve',
    reopenLabel = 'Reopen',
    resolvedLabel = 'Resolved',
    replyErrorMessage = 'Your reply was not sent. Try again.',
    dismissLabel = 'Dismiss',
    startPlaceholder = 'Start the discussion…',
    startLabel = 'Comment',
    cancelLabel = 'Discard',
    oncancel,
    countLabel = (count) => `${count} ${count === 1 ? 'comment' : 'comments'}`,
    onreply,
    onresolve,
    onreact,
  }: Props = $props();

  // Reactions change inside the thread; the `comments` prop stays the parent's.
  let reacted = $state<Record<string, Reaction[]>>({});

  let busy = $state(false);
  let failed = $state(false);
  let expanded = $state(false);

  const showReply = $derived((canReply ?? !!onreply) && !resolved);
  const folded = $derived(resolved && !expanded);
  // Tolerates a missing list: a thread without comments is a new one.
  const fresh = $derived(!comments?.length);

  function discard() {
    draft = '';
    failed = false;
    oncancel?.();
  }

  async function reply(text: string) {
    if (!onreply) return;
    busy = true;
    failed = false;
    try {
      await onreply(text);
      draft = '';
    } catch {
      failed = true;
    } finally {
      busy = false;
    }
  }

  function setResolved(next: boolean) {
    resolved = next;
    expanded = false;
    onresolve?.(next);
  }
</script>

<section class="thread" class:active class:resolved class:fresh aria-label={label}>
  {#if folded}
    <button type="button" class="folded" aria-expanded="false" onclick={() => (expanded = true)}>
      <span class="check"><Icon name="check" size={14} /></span>
      <span class="folded-text">
        <b>{resolvedLabel}</b>
        {#if quote}<span class="folded-quote">“{quote}”</span>{/if}
      </span>
      <span class="folded-count">{countLabel(comments.length)}</span>
      <Icon name="chevron-down" size={16} />
    </button>
  {:else}
    {#if quote || (onresolve && !fresh)}
      <header class="head">
        {#if quote}<blockquote class="quote">{quote}</blockquote>{/if}
        {#if onresolve && !fresh}
          <Button
            size="sm"
            variant={resolved ? 'secondary' : 'glass'}
            shape="pill"
            icon={resolved ? 'reload' : 'check'}
            label={resolved ? reopenLabel : resolveLabel}
            onclick={() => setResolved(!resolved)}
          />
        {/if}
      </header>
    {/if}
    {#if !fresh}
      <ol class="list">
        {#each comments as comment, index (comment.id)}
          <li>
            <Comment
              author={comment.author}
              src={comment.src}
              time={comment.time}
              text={comment.text}
              role={comment.role}
              edited={comment.edited ?? false}
              bind:reactions={
                () => reacted[comment.id] ?? comment.reactions,
                (next) => {
                  if (next) reacted[comment.id] = next;
                }
              }
              {now}
              {locale}
              size={index === 0 ? 'md' : 'sm'}
              onreact={onreact ? (emoji, mine) => onreact(comment.id, emoji, mine) : undefined}
            />
          </li>
        {/each}
      </ol>
    {/if}
    {#if showReply}
      <Composer
        bind:value={draft}
        label={fresh ? startLabel : replyLabel}
        placeholder={fresh ? startPlaceholder : replyPlaceholder}
        buttonLabel={fresh ? startLabel : replyLabel}
        icon="send"
        layout="inline"
        minRows={1}
        maxRows={6}
        hint={false}
        {busy}
        onsubmit={reply}
      />
      {#if oncancel}
        <div class="cancel">
          <Button size="sm" variant="ghost" shape="pill" label={cancelLabel} onclick={discard} />
        </div>
      {/if}
      {#if failed}
        <Alert message={replyErrorMessage} {dismissLabel} ondismiss={() => (failed = false)} />
      {/if}
    {/if}
  {/if}
</section>

<style>
  .thread {
    display: grid;
    gap: var(--space-4);
    padding: var(--space-4);
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
    transition:
      box-shadow var(--motion-base) var(--ease-out),
      border-color var(--motion-base) var(--ease-out);
  }
  .active {
    background: var(--layer-selected-bg);
    border: 1.5px solid var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .resolved:not(.active) {
    padding: var(--space-2);
  }
  /* A new thread is only the quote and the composer: tighter, no room for an empty list. */
  .fresh {
    gap: var(--space-3);
    padding: var(--space-3);
  }
  .cancel {
    display: flex;
    justify-content: flex-end;
    margin-top: calc(var(--space-2) * -1);
  }
  .head {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
  }
  .head :global(.btn) {
    margin-left: auto;
  }
  .quote {
    flex: 1;
    min-width: 0;
    margin: 0;
    padding: 0.1rem 0 0.1rem var(--space-3);
    border-left: 3px solid var(--accent);
    border-radius: 2px;
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-style: italic;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-4);
  }
  /* Replies indent under the first comment, joined by a thin rail. */
  .list > li + li {
    position: relative;
    padding-left: calc(32px + var(--space-3));
  }
  .list > li + li::before {
    content: '';
    position: absolute;
    left: 15.5px;
    top: calc(var(--space-4) * -1 + 2px);
    bottom: 50%;
    width: 1px;
    background: var(--border-strong);
  }
  .folded {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    min-height: var(--control-sm);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-lg);
    background: none;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    text-align: left;
    cursor: pointer;
  }
  .folded:hover {
    background: var(--fill-hover);
  }
  .folded:focus-visible {
    outline: var(--focus-ring);
  }
  .check {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--ok);
    color: var(--on-ok);
    flex-shrink: 0;
  }
  .folded-text {
    flex: 1;
    min-width: 0;
    display: flex;
    gap: var(--space-2);
    overflow: hidden;
    white-space: nowrap;
  }
  .folded-text b {
    flex-shrink: 0;
    color: var(--text);
    font-weight: var(--fw-semibold);
  }
  .folded-quote {
    /* a flex item only shrinks below its text (and shows the ellipsis) with min-width: 0 */
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-3);
  }
  .folded-count {
    flex-shrink: 0;
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  @media (prefers-reduced-transparency: reduce) {
    .thread {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-strong);
    }
  }
</style>
