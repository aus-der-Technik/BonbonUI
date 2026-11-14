<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface StatusSegment {
    id?: string | undefined;
    label: string;
    icon?: IconName | undefined;
    /** Colour of the dot / icon: `ok` green, `warn` amber, `danger` red, `accent` the tint. */
    tone?: 'neutral' | 'accent' | 'ok' | 'warn' | 'danger' | undefined;
    /** A status dot in front. */
    dot?: boolean | undefined;
    /** Longer text on hover. */
    title?: string | undefined;
    /** Makes the segment a button (e.g. "Ln 12, Col 4" opens "Go to line"). */
    onclick?: (() => void) | undefined;
  }
</script>

<script lang="ts">
  /**
   * StatusBar — the thin bar at the bottom of a desktop app window: segments of status text
   * ("24 items", "Synced", "Ln 12, Col 4") on the left and right, with optional icons, dots and
   * click actions. Put it in a Window's `footer`; in page flow it sticks to the bottom.
   *
   *   <StatusBar items={[{ label: '24 items' }, { label: 'Synced', dot: true, tone: 'ok' }]}
   *              trailing={[{ label: 'UTF-8' }]} />
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    items?: StatusSegment[];
    trailing?: StatusSegment[];
    /** Accessible name. */
    label?: string;
    /** Free content between the two groups (e.g. a progress bar). */
    children?: Snippet | undefined;
  }

  let { items = [], trailing = [], label = 'Status', children }: Props = $props();
</script>

{#snippet segment(s: StatusSegment)}
  {#if s.onclick}
    <button
      type="button"
      class="seg seg--{s.tone ?? 'neutral'}"
      title={s.title}
      onclick={s.onclick}
    >
      {@render inner(s)}
    </button>
  {:else}
    <span class="seg seg--{s.tone ?? 'neutral'}" title={s.title}>{@render inner(s)}</span>
  {/if}
{/snippet}

{#snippet inner(s: StatusSegment)}
  {#if s.dot}<span class="dot" aria-hidden="true"></span>{/if}
  {#if s.icon}<Icon name={s.icon} size={13} />{/if}
  <span>{s.label}</span>
{/snippet}

<div class="status-bar" role="status" aria-label={label}>
  <div class="group">
    {#each items as s, i (s.id ?? i)}{@render segment(s)}{/each}
  </div>
  {#if children}<div class="middle">{@render children()}</div>{/if}
  <div class="group end">
    {#each trailing as s, i (s.id ?? i)}{@render segment(s)}{/each}
  </div>
</div>

<style>
  .status-bar {
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: calc(var(--control-xs) - 2px);
    padding: 0 var(--space-3);
    border-top: 1px solid var(--border-strong);
    background: var(--fill-subtle);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  .group {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
  }
  .middle {
    flex: 1;
    min-width: 0;
  }
  .end {
    margin-left: auto;
  }
  .seg {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    height: 20px;
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-xs);
    background: none;
    color: inherit;
    font: inherit;
    white-space: nowrap;
  }
  .seg + .seg {
    border-left: 0;
  }
  button.seg {
    cursor: pointer;
  }
  button.seg:hover {
    background: var(--fill-hover);
    color: var(--text);
  }
  button.seg:focus-visible {
    outline: var(--focus-ring);
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--tone);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--tone) 18%, transparent);
  }
  .seg :global(.icon) {
    color: var(--tone);
  }
  .seg--neutral {
    --tone: var(--text-3);
  }
  .seg--accent {
    --tone: var(--accent);
  }
  .seg--ok {
    --tone: var(--ok);
  }
  .seg--warn {
    --tone: var(--warn);
  }
  .seg--danger {
    --tone: var(--danger);
  }
  @media (max-width: 520px) {
    .group:not(.end) .seg:nth-child(n + 3) {
      display: none;
    }
  }
</style>
