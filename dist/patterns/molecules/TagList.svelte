<script lang="ts">
  /**
   * TagList molecule — keywords of a row as small tags: the first `max`, then a muted "+n" for
   * the rest. With `onclick` every tag does something, e.g. filters by its keyword; `active`
   * highlights the ones that match the current filter in the accent.
   *
   *   <TagList labels={keywords} max={3} onclick={filterBy} active={(k) => k === filter} />
   */
  import Tag from '../atoms/Tag.svelte';

  interface Props {
    labels: string[];
    /** Tags shown before the count; all of them without. */
    max?: number | undefined;
    /** Highlights a label, e.g. the one the list is filtered by. */
    active?: ((label: string) => boolean) | undefined;
    onclick?: ((label: string) => void) | undefined;
    /** Tooltip of a tag. */
    title?: ((label: string) => string) | undefined;
    maxWidth?: string;
    /** The text for the hidden rest, "+2" by default. */
    moreLabel?: (hidden: number) => string;
  }

  let {
    labels,
    max,
    active,
    onclick,
    title,
    maxWidth = '11rem',
    moreLabel = (hidden) => `+${hidden}`,
  }: Props = $props();

  const shown = $derived(max === undefined ? labels : labels.slice(0, max));
  const hidden = $derived(labels.length - shown.length);
</script>

<span class="tags">
  {#each shown as label (label)}
    <Tag
      {label}
      {maxWidth}
      tone={active?.(label) ? 'accent' : 'neutral'}
      title={title?.(label)}
      onclick={onclick ? () => onclick(label) : undefined}
    />
  {/each}
  {#if hidden > 0}<span class="more">{moreLabel(hidden)}</span>{/if}
</span>

<style>
  .tags {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    align-items: center;
  }
  .more {
    padding: 0 var(--space-1);
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
</style>
