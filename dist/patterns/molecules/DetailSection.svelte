<script lang="ts">
  /**
   * DetailSection molecule — one titled part of a record's detail: a caps heading (with optional
   * `actions` on its right), then its content.
   *
   *   <DetailSection title="Contact"><DetailList items={contact} /></DetailSection>
   */
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    /** Small buttons at the end of the heading, e.g. "Edit". */
    actions?: Snippet | undefined;
    children: Snippet;
  }

  let { title, actions, children }: Props = $props();

  const id = $props.id();
</script>

<section aria-labelledby="{id}-title">
  {#if actions}
    <div class="head">
      <h3 id="{id}-title">{title}</h3>
      <div class="actions">{@render actions()}</div>
    </div>
  {:else}
    <h3 id="{id}-title">{title}</h3>
  {/if}
  {@render children()}
</section>

<style>
  section {
    min-width: 0;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
  }
  .head h3 {
    margin: 0;
  }
  .actions {
    display: flex;
    gap: var(--space-2);
  }
  h3 {
    margin: 0 0 var(--space-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-3);
  }
</style>
