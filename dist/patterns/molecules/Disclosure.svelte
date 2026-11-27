<script lang="ts">
  /**
   * Disclosure molecule — a section that folds open under its heading (advanced options, a
   * danger zone). Several in a row make an accordion, divided by hairlines. `icon` sits before the
   * title.
   *
   *   <Disclosure title="Advanced options" meta="3 settings">…</Disclosure>
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { IconName } from '../atoms/icons';
  import type { Tone } from '../tone';

  interface Props {
    title: string;
    icon?: IconName | undefined;
    /** Grey line next to the title, e.g. a summary of what's inside. */
    meta?: string | undefined;
    open?: boolean;
    /** Colours the title, e.g. `danger` for a danger zone. */
    tone?: Tone;
    /** Buttons on the right of the heading, shown while open (e.g. "Select all"). */
    actions?: Snippet | undefined;
    children: Snippet;
  }

  let {
    title,
    icon,
    meta,
    open = $bindable(false),
    tone = 'neutral',
    actions,
    children,
  }: Props = $props();

  const id = $props.id();
</script>

<div class="disclosure disclosure--{tone}">
  <div class="head">
    <button
      type="button"
      aria-expanded={open}
      aria-controls={open ? `${id}-body` : undefined}
      onclick={() => (open = !open)}
    >
      <Icon name="chevron-right" size={14} class="chev" />
      {#if icon}<Icon name={icon} size={16} class="lead" />{/if}
      <span class="title">{title}</span>
      {#if meta}<span class="meta">{meta}</span>{/if}
    </button>
    {#if actions && open}<div class="actions">{@render actions()}</div>{/if}
  </div>
  {#if open}<div class="body" id="{id}-body">{@render children()}</div>{/if}
</div>

<style>
  .disclosure + :global(.disclosure) {
    border-top: 1px solid var(--border-strong);
  }
  .head {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .actions {
    display: flex;
    gap: var(--space-2);
    flex-shrink: 0;
  }
  .head > button {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    min-height: var(--control-lg);
    padding: var(--space-2) var(--space-2);
    margin: 0 calc(-1 * var(--space-2));
    border: 0;
    border-radius: var(--radius-md);
    background: none;
    font: inherit;
    text-align: left;
    color: var(--text);
    cursor: pointer;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .head > button:hover {
    background: var(--fill-subtle);
  }
  .head > button:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 0;
  }
  .head > button :global(.chev) {
    color: var(--text-3);
    transition: transform var(--motion-base) var(--ease-spring);
  }
  .head > button[aria-expanded='true'] :global(.chev) {
    transform: rotate(90deg);
    color: var(--accent-ink);
  }
  .head > button :global(.lead) {
    color: var(--accent-ink);
  }
  .title {
    font-size: var(--fs-base);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .disclosure--accent {
    --_ink: var(--accent-ink);
  }
  .disclosure--ok {
    --_ink: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
  }
  .disclosure--warn {
    --_ink: var(--draft);
  }
  .disclosure--danger {
    --_ink: var(--danger);
  }
  .disclosure--info {
    --_ink: color-mix(in oklab, var(--info) var(--ink-share), var(--ink-mix));
  }
  .disclosure:not(.disclosure--neutral) .title,
  .disclosure:not(.disclosure--neutral) .head > button :global(:is(.chev, .lead)) {
    color: var(--_ink);
  }
  .meta {
    margin-left: auto;
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .body {
    padding: 0 0 var(--space-4) calc(14px + var(--space-2));
    animation: bb-drop var(--motion-quick) var(--ease-out);
  }
  @media (prefers-reduced-motion: reduce) {
    .head > button,
    .head > button :global(.chev) {
      transition: none;
    }
    .body {
      animation: none;
    }
  }
</style>
