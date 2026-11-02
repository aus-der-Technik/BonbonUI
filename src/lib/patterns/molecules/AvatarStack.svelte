<script lang="ts" module>
  export type Presence = 'online' | 'away' | 'busy' | 'offline';

  /** A person in a collaborative view: a reviewer, an assignee, someone looking at the page. */
  export interface Participant {
    id?: string;
    /** A name or an e-mail address; the initials and tooltip come from it. */
    name: string;
    /** Portrait URL; initials show while it is missing or broken. */
    src?: string | undefined;
    /** Adds a presence dot. */
    presence?: Presence | undefined;
  }
</script>

<script lang="ts">
  /**
   * AvatarStack molecule — overlapping avatars for "who is here" or "who is assigned": each with
   * an optional presence dot and its name as a tooltip, a "+3" chip for the rest. With
   * `onselect` every avatar is a button (filter the board by person, open a profile).
   *
   *   <AvatarStack people={reviewers} max={4} />
   */
  import Avatar from '../atoms/Avatar.svelte';
  import Tooltip from '../atoms/Tooltip.svelte';

  interface Props {
    people: Participant[];
    /** Avatars shown before the "+n" chip. */
    max?: number;
    size?: number;
    /** Accessible name of the list. */
    label?: string;
    /** Draws the presence dots that are set. */
    presence?: boolean;
    /** Text of the presence states in tooltips. */
    presenceLabels?: Record<Presence, string>;
    /** Tooltip / accessible name of the overflow chip. */
    moreLabel?: (count: number) => string;
    onselect?: ((person: Participant) => void) | undefined;
  }

  let {
    people,
    max = 4,
    size = 30,
    label = 'People',
    presence = true,
    presenceLabels = { online: 'online', away: 'away', busy: 'busy', offline: 'offline' },
    moreLabel = (count) => `${count} more`,
    onselect,
  }: Props = $props();

  // Showing "+1" instead of the one last avatar would save nothing.
  const cut = $derived(people.length > max + 1 ? max : people.length);
  const shown = $derived(people.slice(0, cut));
  const hidden = $derived(people.slice(cut));

  const tip = (person: Participant) =>
    presence && person.presence
      ? `${person.name} · ${presenceLabels[person.presence]}`
      : person.name;
</script>

<ul class="stack" aria-label={label} style:--size="{size}px">
  {#each shown as person, index (person.id ?? `${person.name}-${index}`)}
    <li class="item">
      <Tooltip text={tip(person)}>
        {#if onselect}
          <button
            type="button"
            class="face face--button"
            aria-label={tip(person)}
            onclick={() => onselect(person)}
          >
            <Avatar name={person.name} src={person.src} {size} />
            {#if presence && person.presence}
              <span class="dot dot--{person.presence}" aria-hidden="true"></span>
            {/if}
          </button>
        {:else}
          <span class="face">
            <Avatar name={person.name} src={person.src} {size} />
            {#if presence && person.presence}
              <span class="dot dot--{person.presence}" aria-hidden="true"></span>
            {/if}
            <span class="sr-only">{tip(person)}</span>
          </span>
        {/if}
      </Tooltip>
    </li>
  {/each}
  {#if hidden.length}
    <li class="item">
      <Tooltip text={hidden.map((p) => p.name).join(', ')}>
        <span
          class="face more"
          role="img"
          aria-label="{moreLabel(hidden.length)}: {hidden.map((p) => p.name).join(', ')}"
          >+{hidden.length}</span
        >
      </Tooltip>
    </li>
  {/if}
</ul>

<style>
  .stack {
    display: inline-flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0 0 0 calc(var(--size) * 0.1);
  }
  .item {
    position: relative;
    /* A light overlap: initials avatars must stay readable, the ring still reads as a stack. */
    margin-left: calc(var(--size) * -0.1);
    transition: transform var(--motion-quick) var(--ease-jelly);
  }
  .item:hover,
  .item:focus-within {
    z-index: 1;
    transform: translateY(-2px);
  }
  .face {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    /* the ring separates overlapping faces in both themes */
    box-shadow: 0 0 0 2px var(--bg);
  }
  .face--button {
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
  }
  .face--button:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .face--button:active {
    transform: var(--press-squish);
  }
  .more {
    background: var(--glass-strong);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
    color: var(--text-2);
    font-size: calc(var(--size) * 0.36);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    box-shadow:
      0 0 0 2px var(--bg),
      var(--glass-inset);
  }
  .dot {
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: max(8px, calc(var(--size) * 0.3));
    height: max(8px, calc(var(--size) * 0.3));
    border-radius: 50%;
    border: 2px solid var(--bg);
    background: var(--presence);
  }
  .dot--online {
    --presence: var(--ok);
  }
  .dot--away {
    --presence: var(--warn);
  }
  .dot--busy {
    --presence: var(--danger);
  }
  .dot--offline {
    --presence: var(--bg);
    box-shadow: inset 0 0 0 2px var(--text-3);
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
