<script lang="ts" module>
  export interface Reaction {
    emoji: string;
    count: number;
    /** The current user reacted with this emoji. */
    mine?: boolean;
    /** Who reacted, for the tooltip ("Ada, Linus and 3 others"). */
    people?: string[];
  }
</script>

<script lang="ts">
  /**
   * Reactions molecule — emoji counts under a comment or post. A click toggles your own reaction
   * (the count follows at once); the smiley button opens a small picker to add a new one.
   *
   *   <Reactions bind:reactions ontoggle={(emoji, on) => save(emoji, on)} />
   */
  import Popover from './Popover.svelte';
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    reactions?: Reaction[];
    /** Emojis offered by the picker. */
    choices?: string[];
    /** Hides the add button (read-only list). */
    readonly?: boolean;
    size?: 'sm' | 'md';
    label?: string;
    addLabel?: string;
    /** Accessible name of one reaction button. */
    reactionLabel?: (reaction: Reaction) => string;
    /** Tooltip naming who reacted; `rest` is how many are not listed in `people`. */
    peopleLabel?: (people: string[], rest: number) => string;
    /** Called after the list changed: the emoji and whether you now react with it. */
    ontoggle?: ((emoji: string, mine: boolean) => void) | undefined;
  }

  let {
    reactions = $bindable([]),
    choices = ['👍', '❤️', '🎉', '😄', '🤔', '👀', '🚀', '✅'],
    readonly = false,
    size = 'md',
    label = 'Reactions',
    addLabel = 'Add reaction',
    reactionLabel = (r) =>
      `${r.emoji} ${r.count} ${r.count === 1 ? 'reaction' : 'reactions'}${r.mine ? ', including yours' : ''}`,
    peopleLabel = (people, rest) =>
      rest > 0 ? `${people.join(', ')} and ${rest} more` : people.join(', '),
    ontoggle,
  }: Props = $props();

  export function toggle(emoji: string): void {
    const found = reactions.find((r) => r.emoji === emoji);
    let mine: boolean;
    if (!found) {
      mine = true;
      reactions = [...reactions, { emoji, count: 1, mine: true }];
    } else {
      mine = !found.mine;
      reactions = reactions
        .map((r) =>
          r.emoji === emoji ? { ...r, mine, count: Math.max(0, r.count + (mine ? 1 : -1)) } : r,
        )
        .filter((r) => r.count > 0);
    }
    ontoggle?.(emoji, mine);
  }

  const tip = (r: Reaction) => {
    if (!r.people?.length) return undefined;
    return peopleLabel(r.people, Math.max(0, r.count - r.people.length));
  };
</script>

<div class="reactions reactions--{size}" role="group" aria-label={label}>
  {#each reactions as reaction (reaction.emoji)}
    <button
      type="button"
      class="chip"
      class:mine={reaction.mine}
      aria-pressed={!!reaction.mine}
      aria-label={reactionLabel(reaction)}
      title={tip(reaction)}
      disabled={readonly}
      onclick={() => toggle(reaction.emoji)}
    >
      <span class="emoji" aria-hidden="true">{reaction.emoji}</span>
      <span class="count" aria-hidden="true">{reaction.count}</span>
    </button>
  {/each}
  {#if !readonly}
    <Popover label={addLabel} placement="top-start" padding="sm">
      {#snippet trigger(props)}
        <button type="button" class="chip add" aria-label={addLabel} title={addLabel} {...props}>
          <Icon name="plus" size={size === 'sm' ? 12 : 14} />
          <span class="smile" aria-hidden="true">☺</span>
        </button>
      {/snippet}
      {#snippet children(close)}
        <div class="picker">
          {#each choices as emoji (emoji)}
            <button
              type="button"
              class="pick"
              aria-label={emoji}
              onclick={() => {
                const has = reactions.find((r) => r.emoji === emoji)?.mine;
                if (!has) toggle(emoji);
                close();
              }}>{emoji}</button
            >
          {/each}
        </div>
      {/snippet}
    </Popover>
  {/if}
</div>

<style>
  .reactions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1);
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    height: var(--control-xs);
    padding: 0 0.55rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--border);
    background: var(--fill-subtle);
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    transition:
      transform var(--motion-quick) var(--ease-jelly),
      background-color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out);
  }
  .reactions--sm .chip {
    height: 22px;
    padding: 0 0.45rem;
    font-size: var(--fs-xs);
  }
  .chip:hover:not(:disabled) {
    background: var(--fill-hover);
  }
  .chip:active:not(:disabled) {
    transform: var(--press-squish);
  }
  .chip:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .chip:disabled {
    cursor: default;
  }
  .mine {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    color: var(--accent-ink);
  }
  .mine:hover:not(:disabled) {
    background: var(--layer-selected-bg);
  }
  .emoji {
    font-size: 1.05em;
    line-height: 1;
  }
  .add {
    gap: 0.1rem;
    color: var(--text-3);
    background: transparent;
    border-style: dashed;
  }
  .smile {
    font-size: 1.05em;
    line-height: 1;
  }
  .picker {
    display: grid;
    grid-template-columns: repeat(4, 2.5rem);
    gap: var(--space-1);
  }
  .pick {
    display: grid;
    place-items: center;
    height: 2.5rem;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    font-size: 1.35rem;
    cursor: pointer;
    transition: transform var(--motion-quick) var(--ease-spring);
  }
  .pick:hover {
    background: var(--fill-hover);
    transform: scale(1.15);
  }
  .pick:focus-visible {
    outline: var(--focus-ring);
  }
  @media (prefers-reduced-motion: reduce) {
    .chip,
    .pick {
      transition: none;
    }
    .chip:hover:not(:disabled),
    .pick:hover {
      transform: none;
    }
  }
</style>
