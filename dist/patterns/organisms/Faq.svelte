<script lang="ts" module>
  export interface FaqItem {
    question: string;
    /** Plain text; blank lines start a new paragraph. */
    answer: string;
  }
</script>

<script lang="ts">
  /**
   * Faq organism — questions and answers as an accordion, on the ground between hairlines
   * by default (`level="panel"` puts them on one card). One answer is open
   * at a time unless `multiple`; arrow keys, Home and End move between the questions.
   * `open` (bindable) lists the open questions by index.
   *
   *   <Faq title="Questions & answers" items={[{ question: 'Can I cancel?', answer: 'Any time.' }]} />
   */
  import Icon from '../atoms/Icon.svelte';
  import Section from '../layout/Section.svelte';

  interface Props {
    items: FaqItem[];
    /** Lets several answers be open at once. */
    multiple?: boolean;
    open?: number[];
    title?: string | undefined;
    eyebrow?: string | undefined;
    description?: string | undefined;
    align?: 'start' | 'center';
    size?: 'default' | 'hero';
    ontoggle?: ((index: number, open: boolean) => void) | undefined;
    /** `ground` (default) sits on the backdrop; `panel` is a card. */
    level?: 'ground' | 'panel';
  }

  let {
    items,
    level = 'ground',
    multiple = false,
    open = $bindable([]),
    title,
    eyebrow,
    description,
    align = 'center',
    size = 'hero',
    ontoggle,
  }: Props = $props();

  const id = $props.id();
  const heads: HTMLButtonElement[] = $state([]);

  function toggle(index: number) {
    const isOpen = open.includes(index);
    if (isOpen) open = open.filter((i) => i !== index);
    else open = multiple ? [...open, index] : [index];
    ontoggle?.(index, !isOpen);
  }

  function onkeydown(event: KeyboardEvent, index: number) {
    const n = items.length;
    const target =
      event.key === 'ArrowDown'
        ? (index + 1) % n
        : event.key === 'ArrowUp'
          ? (index - 1 + n) % n
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? n - 1
              : -1;
    if (target < 0) return;
    event.preventDefault();
    heads[target]?.focus();
  }
</script>

{#snippet list()}
  <div class="faq faq--{level}">
    {#each items as item, i (item.question)}
      {@const isOpen = open.includes(i)}
      <div class="item" class:open={isOpen}>
        <h3 class="q">
          <button
            bind:this={heads[i]}
            type="button"
            id="{id}-q{i}"
            aria-expanded={isOpen}
            aria-controls="{id}-a{i}"
            onclick={() => toggle(i)}
            onkeydown={(e) => onkeydown(e, i)}
          >
            <span>{item.question}</span>
            <span class="chev" aria-hidden="true"><Icon name="plus" size={16} /></span>
          </button>
        </h3>
        <div class="a" id="{id}-a{i}" role="region" aria-labelledby="{id}-q{i}" hidden={!isOpen}>
          <div class="a-inner">
            {#each item.answer.split(/\n\s*\n/) as paragraph, p (p)}<p>{paragraph}</p>{/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
{/snippet}

{#if title || eyebrow || description}
  <Section {title} {eyebrow} {description} {align} {size} gap="lg">
    {@render list()}
  </Section>
{:else}
  {@render list()}
{/if}

<style>
  .faq {
    width: 100%;
    max-width: 48rem;
    margin-inline: auto;
    border-block: 1px solid var(--border-strong);
  }
  .faq--panel {
    padding: var(--space-2) var(--space-6);
    border: 1px solid var(--layer-panel-border);
    border-radius: var(--radius-card);
    background: var(--layer-panel-bg);
    box-shadow: var(--layer-panel-shadow);
  }
  .item + .item {
    border-top: 1px solid var(--border-strong);
  }
  .q {
    margin: 0;
    font-size: inherit;
  }
  .q button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    width: 100%;
    min-height: var(--control-xl);
    padding: var(--space-4) 0;
    border: 0;
    background: none;
    font: inherit;
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.35;
    text-align: left;
    color: var(--text);
    cursor: pointer;
  }
  .q button:hover {
    color: var(--accent-ink);
  }
  .q button:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
  .chev {
    flex: none;
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: var(--radius-pill);
    color: var(--text-2);
    background: var(--fill-subtle);
    transition:
      transform var(--motion-base) var(--ease-spring),
      background var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out);
  }
  .q button:hover .chev {
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .q button:active .chev {
    transform: scale(0.9);
  }
  .open .q button:active .chev {
    transform: rotate(45deg) scale(0.9);
  }
  .open .chev,
  .open .q button:hover .chev {
    transform: rotate(45deg);
    color: var(--on-accent);
    background: var(--accent);
  }
  .a-inner {
    display: grid;
    gap: var(--space-3);
    padding: 0 var(--space-10) var(--space-5) 0;
    font-size: var(--fs-base);
    line-height: 1.6;
    color: var(--text-2);
    animation: bb-drop var(--motion-base) var(--ease-out);
  }
  @media (max-width: 520px) {
    .faq {
      padding-inline: var(--space-4);
    }
    .a-inner {
      padding-right: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .chev,
    .a-inner {
      transition: none;
      animation: none;
    }
  }
</style>
