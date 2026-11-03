<script lang="ts">
  /**
   * ThumbsInput molecule — pick 👍 or 👎 on two big glass buttons; the chosen one takes its chart
   * colour and pops. A radio group: one tab stop, arrow keys move and pick.
   *
   *   <ThumbsInput label="Was this helpful?" bind:value={vote} />
   */
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    value?: 'up' | 'down' | null;
    label?: string;
    upLabel?: string;
    downLabel?: string;
    onchange?: ((value: 'up' | 'down') => void) | undefined;
  }

  let {
    value = $bindable(null),
    label = 'Thumbs',
    upLabel = 'Up',
    downLabel = 'Down',
    onchange,
  }: Props = $props();

  const options = ['up', 'down'] as const;
  const buttons: HTMLButtonElement[] = $state([]);

  function pick(next: 'up' | 'down') {
    if (next === value) return;
    value = next;
    onchange?.(next);
  }

  function onkeydown(event: KeyboardEvent, current: 'up' | 'down') {
    let target: 'up' | 'down';
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key))
      target = current === 'up' ? 'down' : 'up';
    else if (event.key === 'Home') target = 'up';
    else if (event.key === 'End') target = 'down';
    else return;
    event.preventDefault();
    pick(target);
    buttons[options.indexOf(target)]?.focus();
  }
</script>

<div class="choices" role="radiogroup" aria-label={label}>
  {#each options as option, i (option)}
    <button
      bind:this={buttons[i]}
      type="button"
      role="radio"
      aria-checked={value === option}
      tabindex={(value ?? 'up') === option ? 0 : -1}
      class="thumb {option}"
      onclick={() => pick(option)}
      onkeydown={(e) => onkeydown(e, option)}
    >
      <Icon name={option === 'up' ? 'thumbs-up' : 'thumbs-down'} size={20} />
      {option === 'up' ? upLabel : downLabel}
    </button>
  {/each}
</div>

<style>
  .choices {
    display: flex;
    gap: 0.6rem;
  }
  .thumb {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    height: var(--control-xl);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-strong);
    background: var(--input-bg);
    box-shadow: var(--glass-inset);
    font: inherit;
    font-weight: var(--fw-semibold);
    cursor: pointer;
    color: var(--text-2);
    transition:
      color var(--motion-quick) var(--ease-out),
      border-color var(--motion-quick) var(--ease-out),
      background-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .thumb:hover:not([aria-checked='true']) {
    background: var(--fill-hover);
  }
  /* Wide tiles squish less than small pills. */
  .thumb:active {
    transform: scale(0.98, 0.95);
  }
  /* The choice is the selected layer like everywhere else; the thumb keeps its vote colour. */
  .thumb[aria-checked='true'] {
    color: var(--text);
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow: var(--layer-selected-shadow);
  }
  .thumb[aria-checked='true'] :global(.icon) {
    animation: pop var(--motion-base) var(--ease-spring);
  }
  .thumb:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  .up[aria-checked='true'] :global(.icon) {
    color: var(--up);
  }
  .down[aria-checked='true'] :global(.icon) {
    color: var(--down);
  }
  @keyframes pop {
    50% {
      transform: scale(1.3) rotate(-8deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .thumb {
      transition: none;
    }
    .thumb:active {
      transform: none;
    }
    .thumb[aria-checked='true'] :global(.icon) {
      animation: none;
    }
  }
</style>
