<script lang="ts" module>
  export interface ActivityEntry {
    id: string;
    /** Who did it — a name or an e-mail address. */
    actor: string;
    /** What happened, e.g. "changed the role of". */
    action: string;
    /** What it happened to, set in bold after the action. */
    target?: string;
    at: Date | string;
    /** Colours the dot: a deletion is `danger`, a creation `ok`. */
    tone?: 'neutral' | 'ok' | 'warn' | 'danger' | 'info';
    detail?: string;
  }
</script>

<script lang="ts">
  /**
   * ActivityLog organism — an audit trail as a vertical timeline: who did what to which record
   * and when, newest first as given. A coloured badge on each avatar (or a dot) tells the kind of
   * change: `ok` a creation, `danger` a deletion, `warn` a risky change, `info` a notice.
   *
   *   <ActivityLog entries={[{ id: '1', actor: 'Jane Doe', action: 'invited', at: new Date() }]} />
   */
  import Avatar from '../atoms/Avatar.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import { dateTimeFormat } from '../../utils/format';

  interface Props {
    entries: ActivityEntry[];
    label?: string;
    emptyText?: string;
    showAvatars?: boolean;
  }

  let {
    entries,
    label = 'Activity',
    emptyText = 'No activity yet. All quiet so far.',
    showAvatars = true,
  }: Props = $props();

  const when = (at: Date | string) =>
    dateTimeFormat.format(typeof at === 'string' ? new Date(at) : at);
</script>

{#if !entries.length}
  <EmptyState message={emptyText} />
{:else}
  <ol class="log" aria-label={label}>
    {#each entries as entry (entry.id)}
      <li class="entry entry--{entry.tone ?? 'neutral'}">
        <span class="marker" aria-hidden="true">
          {#if showAvatars}<Avatar name={entry.actor} size={28} />{:else}<span class="dot"
            ></span>{/if}
        </span>
        <div class="content">
          <p>
            <span class="actor">{entry.actor}</span>
            {entry.action}
            {#if entry.target}<b>{entry.target}</b>{/if}
          </p>
          {#if entry.detail}<p class="detail">{entry.detail}</p>{/if}
          <time datetime={new Date(entry.at).toISOString()}>{when(entry.at)}</time>
        </div>
      </li>
    {/each}
  </ol>
{/if}

<style>
  .log {
    list-style: none;
    display: grid;
  }
  .entry {
    position: relative;
    display: flex;
    gap: var(--space-3);
    padding-bottom: var(--space-5);
  }
  .entry:last-child {
    padding-bottom: 0;
  }
  /* The line linking each entry to the next. */
  .entry:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 13px;
    top: 34px;
    bottom: 4px;
    width: 2px;
    border-radius: var(--radius-pill);
    background: linear-gradient(var(--fill-muted), var(--fill-subtle));
  }
  .marker {
    position: relative;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
  }
  .marker::after {
    content: '';
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--bg);
    background: var(--tone);
  }
  .entry--neutral {
    --tone: var(--text-3);
  }
  .entry--ok {
    --tone: var(--ok);
  }
  .entry--warn {
    --tone: var(--warn);
  }
  .entry--danger {
    --tone: var(--danger);
  }
  .entry--info {
    --tone: var(--info);
  }
  /* Without avatars the dot is the marker: a candy bead with a soft halo of its colour. */
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--tone);
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--tone) 18%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.45);
  }
  .marker:has(.dot)::after {
    display: none;
  }
  .content {
    min-width: 0;
    padding-top: 3px;
    font-size: var(--fs-md);
    line-height: 1.45;
    color: var(--text-2);
  }
  .actor,
  b {
    color: var(--text);
    font-weight: var(--fw-semibold);
  }
  .detail {
    margin-top: 2px;
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  time {
    display: block;
    margin-top: 2px;
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
</style>
