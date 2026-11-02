<script lang="ts">
  /**
   * Heading atom — a real `<h1>`…`<h6>` with a size from the type scale that suits its level, tight
   * tracking and balanced line breaks. `size` decouples the look from the outline (a visually small
   * `<h2>` in a sidebar). `eyebrow` adds a small accent caps line above, `subtitle` a muted line
   * below — wrapped in an `<hgroup>`, so no extra markup is needed.
   *
   *   <Heading level={1} eyebrow="Overview" subtitle="Everything that happened this week">Dashboard</Heading>
   *   <Heading level={3} size="lg">Recent orders</Heading>
   */
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextSize, TextTone, TextWeight } from './Text.svelte';

  type Level = 1 | 2 | 3 | 4 | 5 | 6;

  interface Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'children' | 'class'> {
    level?: Level;
    /** Visual size; defaults by level (1 display, 2 3xl, 3 2xl, 4 xl, 5 lg, 6 base). */
    size?: TextSize | undefined;
    tone?: TextTone;
    weight?: TextWeight | undefined;
    /** Small accent caps line above the heading. */
    eyebrow?: string | undefined;
    /** Muted line below the heading. */
    subtitle?: string | undefined;
    align?: 'start' | 'center' | 'end' | undefined;
    truncate?: boolean;
    /** Plain text instead of children. */
    text?: string | undefined;
    class?: string;
    children?: Snippet | undefined;
  }

  let {
    level = 2,
    size,
    tone = 'default',
    weight,
    eyebrow,
    subtitle,
    align,
    truncate = false,
    text,
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  const SIZES: Record<Level, TextSize> = {
    1: 'display',
    2: '3xl',
    3: '2xl',
    4: 'xl',
    5: 'lg',
    6: 'base',
  };
  const resolved = $derived(size ?? SIZES[level]);
  const grouped = $derived(!!(eyebrow || subtitle));
</script>

{#snippet heading(cls: string)}
  <svelte:element
    this={`h${level}`}
    class="heading heading--{resolved} heading--{tone} {cls}"
    class:heading--truncate={truncate}
    style:font-weight={weight ? `var(--fw-${weight})` : undefined}
    style:text-align={grouped ? undefined : align}
    {...rest}
  >
    {#if children}{@render children()}{:else}{text ?? ''}{/if}
  </svelte:element>
{/snippet}

{#if grouped}
  <hgroup
    class="group group--{resolved} {extraClass}"
    class:group--center={align === 'center'}
    class:group--end={align === 'end'}
    style:text-align={align}
  >
    {#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
    {@render heading('')}
    {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
  </hgroup>
{:else}
  {@render heading(extraClass)}
{/if}

<style>
  .heading {
    margin: 0;
    min-width: 0;
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.25;
    text-wrap: balance;
    overflow-wrap: break-word;
  }
  .heading--display {
    font-size: var(--fs-display);
    line-height: 1.08;
    letter-spacing: -0.028em;
  }
  .heading--3xl {
    font-size: var(--fs-3xl);
    line-height: 1.18;
    letter-spacing: -0.02em;
  }
  .heading--2xl {
    font-size: var(--fs-2xl);
    letter-spacing: -0.012em;
  }
  .heading--xl {
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
  }
  .heading--lg {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
  }
  .heading--base {
    font-size: var(--fs-base);
    font-weight: var(--fw-semibold);
  }
  .heading--md {
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
  }
  .heading--sm {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
  }
  .heading--xs {
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
  }
  /* Large headings get the display size only where there is room for it. */
  @media (max-width: 520px) {
    .heading--display {
      font-size: var(--fs-3xl);
    }
  }

  .heading--default {
    color: var(--text);
  }
  .heading--muted {
    color: var(--text-2);
  }
  .heading--subtle {
    color: var(--text-3);
  }
  .heading--accent {
    color: var(--accent-ink);
  }
  .heading--danger {
    color: var(--danger);
  }
  .heading--ok {
    color: color-mix(in oklab, var(--ok) var(--ink-share), var(--ink-mix));
  }
  .heading--warn {
    color: var(--draft);
  }
  .heading--info {
    color: color-mix(in oklab, var(--info) var(--ink-share), var(--ink-mix));
  }
  .heading--inherit {
    color: inherit;
  }
  .heading--truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .group {
    display: grid;
    gap: var(--space-1);
    min-width: 0;
    margin: 0;
  }
  .group--display,
  .group--3xl {
    gap: var(--space-2);
  }
  .eyebrow {
    margin: 0;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .subtitle {
    margin: 0;
    max-width: 70ch;
    font-size: var(--fs-base);
    line-height: 1.5;
    color: var(--text-2);
    text-wrap: pretty;
  }
  .group--center .subtitle {
    margin-inline: auto;
  }
  .group--end .subtitle {
    margin-left: auto;
  }
  .group--display .subtitle,
  .group--3xl .subtitle {
    font-size: var(--fs-lg);
  }
  .group--xs .subtitle,
  .group--sm .subtitle,
  .group--md .subtitle {
    font-size: var(--fs-sm);
  }
</style>
