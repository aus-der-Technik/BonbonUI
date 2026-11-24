<script lang="ts" module>
  export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

  export interface Step {
    label: string;
    description?: string | undefined;
    /** Overrides the status derived from `current`. */
    status?: StepStatus | undefined;
  }
</script>

<script lang="ts">
  /**
   * Stepper molecule — the steps of a flow (checkout, onboarding, an import) with where you are:
   * done steps carry a check, the current one glows in the accent, a failed one turns red.
   * Horizontal folds to vertical when its container gets narrow. With `onselect`, finished steps
   * become buttons to jump back.
   *
   *   <Stepper steps={[{ label: 'Cart' }, { label: 'Address' }, { label: 'Pay' }]} current={1} />
   */
  import Icon from '../atoms/Icon.svelte';
  import VisuallyHidden from '../atoms/VisuallyHidden.svelte';

  interface Props {
    steps: Step[];
    /** Index of the current step; earlier ones count as complete. */
    current?: number;
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    /** "Step 2 of 4" for screen readers. */
    stepLabel?: (position: number, total: number) => string;
    statusLabels?: Record<StepStatus, string>;
    onselect?: ((index: number) => void) | undefined;
  }

  let {
    steps,
    current = 0,
    orientation = 'horizontal',
    label = 'Progress',
    stepLabel = (position, total) => `Step ${position} of ${total}`,
    statusLabels = {
      complete: 'completed',
      current: 'current',
      upcoming: 'not started',
      error: 'needs attention',
    },
    onselect,
  }: Props = $props();

  const statusOf = (step: Step, index: number): StepStatus =>
    step.status ?? (index < current ? 'complete' : index === current ? 'current' : 'upcoming');
</script>

<nav class="stepper" aria-label={label}>
  <ol class="steps steps--{orientation}">
    {#each steps as step, index (index)}
      {@const status = statusOf(step, index)}
      {@const clickable = !!onselect && status === 'complete'}
      <li class="step step--{status}" aria-current={status === 'current' ? 'step' : undefined}>
        {#snippet inner()}
          <span class="marker" aria-hidden="true">
            {#if status === 'complete'}<Icon name="check" size={15} />
            {:else if status === 'error'}<Icon name="alert" size={15} />
            {:else}{index + 1}{/if}
          </span>
          <span class="text">
            <VisuallyHidden>{stepLabel(index + 1, steps.length)}:</VisuallyHidden>
            <span class="label">{step.label}</span>
            {#if step.description}<span class="description">{step.description}</span>{/if}
            <VisuallyHidden>({statusLabels[status]})</VisuallyHidden>
          </span>
        {/snippet}
        {#if clickable}
          <button type="button" class="hit" onclick={() => onselect?.(index)}>
            {@render inner()}
          </button>
        {:else}
          <span class="hit">{@render inner()}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .stepper {
    container-type: inline-size;
    width: 100%;
    min-width: 0;
  }
  .steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  .steps--horizontal {
    align-items: flex-start;
  }
  .steps--vertical {
    flex-direction: column;
  }

  .step {
    --marker: 2rem;
    --line: var(--border-strong);
    position: relative;
    flex: 1 1 0;
    min-width: 0;
  }
  .step--complete {
    --line: var(--accent);
  }
  /* The connector to the next step. */
  .step:not(:last-child)::after {
    content: '';
    position: absolute;
    border-radius: var(--radius-pill);
    background: var(--line);
    transition: background-color var(--motion-base) var(--ease-out);
  }
  .steps--horizontal .step:not(:last-child)::after {
    top: calc(var(--marker) / 2 - 1.5px);
    left: calc(var(--marker) + var(--space-2));
    right: var(--space-2);
    height: 3px;
  }
  .steps--vertical .step {
    flex: 0 0 auto;
    padding-bottom: var(--space-5);
  }
  .steps--vertical .step:last-child {
    padding-bottom: 0;
  }
  .steps--vertical .step:not(:last-child)::after {
    left: calc(var(--marker) / 2 - 1.5px);
    top: calc(var(--marker) + var(--space-1));
    bottom: var(--space-1);
    width: 3px;
  }

  .hit {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
  }
  .steps--horizontal .hit {
    padding-right: var(--space-4);
  }
  .steps--vertical .hit {
    flex-direction: row;
    gap: var(--space-3);
  }
  button.hit {
    cursor: pointer;
    border-radius: var(--radius-md);
  }
  button.hit:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
  }
  button.hit:hover .label {
    color: var(--accent-ink);
  }

  .marker {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: var(--marker);
    height: var(--marker);
    border-radius: 50%;
    border: 1.5px solid var(--border-strong);
    background: var(--input-bg);
    color: var(--text-3);
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
    font-variant-numeric: tabular-nums;
    transition:
      transform var(--motion-base) var(--ease-spring),
      box-shadow var(--motion-base) var(--ease-out);
  }
  .step--complete .marker {
    border-color: transparent;
    background: var(--grad-primary);
    color: var(--on-accent);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
  .step--current .marker {
    border: 2px solid var(--accent);
    background: var(--accent-soft);
    color: var(--accent-ink);
    box-shadow:
      0 0 0 4px var(--accent-faint),
      0 4px 14px -4px var(--accent);
    transform: scale(1.06);
  }
  .step--error .marker {
    border-color: transparent;
    background: var(--danger);
    color: var(--on-danger);
    box-shadow: 0 0 0 4px var(--tint-danger);
  }

  .text {
    display: grid;
    gap: 0.1rem;
    min-width: 0;
  }
  .steps--vertical .text {
    padding-top: 0.3rem;
  }
  .label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-2);
    transition: color var(--motion-quick) var(--ease-out);
  }
  .step--current .label,
  .step--complete .label {
    color: var(--text);
  }
  .step--error .label {
    color: var(--danger);
  }
  .description {
    font-size: var(--fs-xs);
    color: var(--text-3);
    line-height: 1.4;
  }

  /* Too narrow for a row of steps: fold into a column. */
  @container (max-width: 34rem) {
    .steps--horizontal {
      flex-direction: column;
    }
    .steps--horizontal .step {
      flex: 0 0 auto;
      padding-bottom: var(--space-4);
    }
    .steps--horizontal .step:last-child {
      padding-bottom: 0;
    }
    .steps--horizontal .hit {
      flex-direction: row;
      gap: var(--space-3);
      padding-right: 0;
    }
    .steps--horizontal .text {
      padding-top: 0.3rem;
    }
    .steps--horizontal .step:not(:last-child)::after {
      left: calc(var(--marker) / 2 - 1.5px);
      right: auto;
      top: calc(var(--marker) + var(--space-1));
      bottom: var(--space-1);
      width: 3px;
      height: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .marker {
      transition: none;
    }
    .step--current .marker {
      transform: none;
    }
  }
</style>
