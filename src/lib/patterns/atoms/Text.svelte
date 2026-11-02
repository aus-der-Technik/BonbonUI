<script lang="ts" module>
  export type TextSize = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | 'display';
  export type TextTone =
    'default' | 'muted' | 'subtle' | 'accent' | 'danger' | 'ok' | 'warn' | 'info' | 'inherit';
  export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
</script>

<script lang="ts">
  /**
   * Text atom — body copy from the type scale, so a page only ever uses sizes, colours and weights
   * that belong together. `tone` picks a role colour (muted for secondary lines, subtle for meta),
   * `numeric` switches to tabular figures for amounts and counts, `truncate` cuts to one line (or
   * `truncate={2}` to two) with an ellipsis.
   *
   * Good typography is the default: 1.5 line height for reading, tighter tracking as the size
   * grows, no orphaned last words, and a paragraph (`as="p"`) stops at a comfortable ~70
   * characters per line; `measure={false}` lets it run the full width.
   *
   *   <Text tone="muted">Last synced 2 minutes ago</Text>
   *   <Text size="2xl" weight="bold" numeric>1.284</Text>
   */
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Tag =
    | 'span'
    | 'p'
    | 'div'
    | 'label'
    | 'strong'
    | 'em'
    | 'small'
    | 'time'
    | 'dt'
    | 'dd'
    | 'li'
    | 'figcaption'
    | 'legend'
    | 'blockquote';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    size?: TextSize;
    tone?: TextTone;
    weight?: TextWeight | undefined;
    as?: Tag;
    /** One line with an ellipsis, or a number of lines. */
    truncate?: boolean | number;
    /** Tabular figures, so columns of numbers line up. */
    numeric?: boolean;
    mono?: boolean;
    /** Small caps label style: uppercase, tracked, semibold. */
    caps?: boolean;
    align?: 'start' | 'center' | 'end' | undefined;
    /** Plain text instead of children. */
    text?: string | number | undefined;
    /** Paragraphs stop at a readable line length (~70 characters); `false` lets them run. */
    measure?: boolean;
    class?: string;
    children?: Snippet | undefined;
  }

  let {
    size = 'base',
    tone = 'default',
    weight,
    as = 'span',
    truncate = false,
    numeric = false,
    mono = false,
    caps = false,
    align,
    text,
    measure = true,
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  const lines = $derived(typeof truncate === 'number' ? truncate : truncate ? 1 : 0);
</script>

<svelte:element
  this={as}
  class="text text--{size} text--{tone} {extraClass}"
  class:text--truncate={lines === 1}
  class:text--clamp={lines > 1}
  class:text--numeric={numeric}
  class:text--mono={mono}
  class:text--caps={caps}
  class:text--measure={measure && as === 'p'}
  class:text--centered={align === 'center'}
  style:--text-lines={lines > 1 ? lines : undefined}
  style:font-weight={weight ? `var(--fw-${weight})` : undefined}
  style:text-align={align}
  {...rest}
>
  {#if children}{@render children()}{:else}{text ?? ''}{/if}
</svelte:element>

<style>
  .text {
    margin: 0;
    min-width: 0;
    line-height: 1.5;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }
  /* Long lines tire the eye: paragraphs stop around 70 characters. */
  .text--measure {
    max-width: 70ch;
  }
  .text--measure.text--centered {
    margin-inline: auto;
  }
  blockquote.text {
    padding-left: var(--space-4);
    border-left: 3px solid var(--accent-border);
  }

  .text--xs {
    font-size: var(--fs-xs);
  }
  .text--sm {
    font-size: var(--fs-sm);
  }
  .text--md {
    font-size: var(--fs-md);
  }
  .text--base {
    font-size: var(--fs-base);
  }
  .text--lg {
    font-size: var(--fs-lg);
  }
  .text--xl {
    font-size: var(--fs-xl);
    line-height: 1.45;
  }
  .text--2xl {
    font-size: var(--fs-2xl);
    line-height: 1.4;
    letter-spacing: var(--tracking-tight);
  }
  .text--3xl {
    font-size: var(--fs-3xl);
    line-height: 1.25;
    letter-spacing: -0.015em;
  }
  .text--display {
    font-size: var(--fs-display);
    line-height: 1.1;
    letter-spacing: -0.025em;
  }

  .text--default {
    color: var(--text);
  }
  .text--muted {
    color: var(--text-2);
  }
  .text--subtle {
    color: var(--text-3);
  }
  .text--accent {
    color: var(--accent-ink);
  }
  .text--danger {
    color: var(--danger);
  }
  .text--ok {
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
  }
  .text--warn {
    color: var(--draft);
  }
  .text--info {
    color: color-mix(in oklab, var(--info) var(--ink-share), var(--ink-mix));
  }
  .text--inherit {
    color: inherit;
  }

  .text--truncate {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span.text--truncate {
    display: inline-block;
    max-width: 100%;
    vertical-align: bottom;
  }
  .text--clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--text-lines);
    line-clamp: var(--text-lines);
    overflow: hidden;
  }
  .text--numeric {
    font-variant-numeric: tabular-nums;
  }
  .text--mono {
    font-family: var(--font-mono);
    font-size: 0.92em;
  }
  .text--caps {
    font-size: var(--fs-2xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
</style>
