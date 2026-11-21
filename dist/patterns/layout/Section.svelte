<script lang="ts">
  /**
   * Section — a titled block of a page. Gives every block the same heading style and vertical
   * rhythm, so pages read evenly without hand-tuned margins:
   *
   *   <Section title="Members" description="Who can sign in" {actions}>…</Section>
   *   <Section title="Plans" layout="grid" min="18rem">…cards…</Section>
   *   <Section title="Danger zone" level="panel">…</Section>
   *
   * The heading sits on the ground layer; with `level="panel"` the whole section is a glass card.
   */
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { space, type LayerLevel, type Space } from './space';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class' | 'title'> {
    title?: string | undefined;
    /** Small caps line above the title, e.g. a category. */
    eyebrow?: string | undefined;
    description?: string | undefined;
    /** Heading level of the title (default 2). */
    heading?: 2 | 3 | 4;
    /** `lead` is a large greeting-style title that keeps the page's top edge (dashboards);
     *  `hero` is larger with extra room above — for the first section of a website. */
    size?: 'default' | 'lead' | 'hero';
    /** Buttons on the right of the heading. */
    actions?: Snippet | undefined;
    level?: Exclude<LayerLevel, 'front'>;
    /** How the children are laid out. */
    layout?: 'stack' | 'row' | 'grid';
    gap?: Space;
    /** Grid only: minimum column width / maximum column count. */
    min?: string;
    columns?: number | undefined;
    align?: 'start' | 'center';
    class?: string;
    children?: Snippet | undefined;
  }

  let {
    title,
    eyebrow,
    description,
    heading = 2,
    size = 'default',
    actions,
    level = 'ground',
    layout = 'stack',
    gap = 'md',
    min = '16rem',
    columns,
    align = 'start',
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  const id = $props.id();
</script>

<section
  class="section section--{level} section--{size} section--align-{align} {extraClass}"
  aria-labelledby={title ? `${id}-title` : undefined}
  data-layer={level}
  {...rest}
>
  {#if title || eyebrow || description || actions}
    <header class="head">
      <div class="titles">
        {#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
        {#if title}
          <svelte:element this={`h${heading}`} id="{id}-title" class="title">{title}</svelte:element
          >
        {/if}
        {#if description}<p class="description">{description}</p>{/if}
      </div>
      {#if actions}<div class="actions">{@render actions()}</div>{/if}
    </header>
  {/if}
  {#if children}
    <div
      class="body body--{layout}"
      style:--section-gap={space(gap)}
      style:--section-min={min}
      style:--section-cols={columns ?? 99}
    >
      {@render children()}
    </div>
  {/if}
</section>

<style>
  .section {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
  }
  .section--panel {
    padding: var(--space-5) var(--space-6) var(--space-6);
    background: var(--light, none), var(--layer-panel-bg);
    border: 1px solid var(--layer-panel-border);
    border-radius: var(--radius-card);
    box-shadow: var(--layer-panel-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .section--selected {
    padding: var(--space-5) var(--space-6) var(--space-6);
    background: var(--light, none), var(--layer-selected-bg);
    border: 1.5px solid var(--layer-selected-border);
    border-radius: var(--radius-card);
    box-shadow: var(--layer-selected-shadow);
    backdrop-filter: var(--layer-panel-blur);
    -webkit-backdrop-filter: var(--layer-panel-blur);
  }
  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-3) var(--space-4);
  }
  .titles {
    display: grid;
    gap: var(--space-1);
    /* shrink first, wrap the actions under the title only when really narrow */
    min-width: min(100%, 10rem);
    flex: 1 1 0;
  }
  .section--align-center .head {
    justify-content: center;
    text-align: center;
  }
  .section--align-center .titles {
    justify-items: center;
  }
  .eyebrow {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .title {
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    line-height: 1.25;
    color: var(--text);
  }
  .description {
    max-width: 62ch;
    font-size: var(--fs-md);
    color: var(--text-2);
  }
  .section--lead .title {
    font-size: clamp(var(--fs-2xl), 1.4vw + 0.9rem, var(--fs-3xl));
    letter-spacing: -0.02em;
  }
  .section--lead .description {
    font-size: var(--fs-lg);
  }
  .section--hero {
    gap: var(--space-8);
    padding-block: var(--space-8) var(--space-4);
  }
  .section--hero .title {
    font-size: clamp(var(--fs-3xl), 2.2vw + 1rem, 3.25rem);
    line-height: 1.08;
    letter-spacing: -0.025em;
  }
  .section--hero .description {
    font-size: var(--fs-xl);
    max-width: 56ch;
  }
  .section--align-center .description {
    margin-inline: auto;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
  }
  .body {
    min-width: 0;
    gap: var(--section-gap);
  }
  .body--stack {
    display: flex;
    flex-direction: column;
  }
  .body--row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .body--grid {
    --_max: var(--section-cols);
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(
        min(
          100%,
          max(var(--section-min), (100% - (var(--_max) - 1) * var(--section-gap)) / var(--_max))
        ),
        1fr
      )
    );
  }
  .section--align-center .body--row {
    justify-content: center;
  }
</style>
