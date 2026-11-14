<script lang="ts">
  /**
   * InspectorSection — a titled group of InspectorRows. With `collapsible` the title folds it
   * (`open` is bindable).
   *
   *   <InspectorSection title="Sharing" collapsible>…rows…</InspectorSection>
   */
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';

  interface Props {
    title?: string | undefined;
    collapsible?: boolean;
    open?: boolean;
    children?: Snippet | undefined;
  }

  let { title, collapsible = false, open = $bindable(true), children }: Props = $props();

  const id = $props.id();
</script>

<section class="section" aria-labelledby={title ? `${id}-t` : undefined}>
  {#if title}
    {#if collapsible}
      <h3 class="title">
        <button
          type="button"
          id="{id}-t"
          aria-expanded={open}
          aria-controls="{id}-body"
          onclick={() => (open = !open)}
        >
          <Icon name="chevron-right" size={12} />
          {title}
        </button>
      </h3>
    {:else}
      <h3 class="title" id="{id}-t">{title}</h3>
    {/if}
  {/if}
  {#if open}
    <div class="rows" id="{id}-body">{@render children?.()}</div>
  {/if}
</section>

<style>
  .section {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3) 0;
    border-top: 1px solid var(--border-strong);
  }
  .title {
    margin: 0 0 var(--space-1);
    padding: 0 var(--space-3);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-bold);
  }
  .title button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    margin-left: -4px;
    padding: 2px 4px;
    border: 0;
    border-radius: var(--radius-xs);
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .title button :global(.icon) {
    transition: transform var(--motion-base) var(--ease-out);
  }
  .title button[aria-expanded='true'] :global(.icon) {
    transform: rotate(90deg);
  }
  .title button:focus-visible {
    outline: var(--focus-ring);
  }
  .rows {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  @media (prefers-reduced-motion: reduce) {
    .title button :global(.icon) {
      transition: none;
    }
  }
</style>
