<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface SourceItem {
    id: string;
    label: string;
    icon?: IconName | undefined;
    /** Icon colour: a palette name or any CSS colour (default: the accent). */
    color?: string | undefined;
    /** A number on the right (unread, items). */
    count?: number | string | undefined;
    disabled?: boolean | undefined;
  }

  export interface SourceSection {
    id?: string | undefined;
    /** Small caps heading; a section without one has no header. */
    title?: string | undefined;
    items: SourceItem[];
    /** The heading folds the section. */
    collapsible?: boolean | undefined;
    /** Starts folded. */
    collapsed?: boolean | undefined;
  }
</script>

<script lang="ts">
  /**
   * SourceList — the sidebar of a desktop app (mailboxes, folders, places): sections with a
   * small heading, items with a coloured icon and a count; the selected item sits on the
   * selected layer. Up / Down move between items, Enter or a click selects, a section heading
   * folds its section.
   *
   *   <SourceList bind:value sections={[{ title: 'Favourites', items: [{ id: 'inbox',
   *     label: 'Inbox', icon: 'inbox', count: 12 }] }]} />
   */
  import Icon from '../atoms/Icon.svelte';
  import { colorValue } from '../atoms/palette';
  import { rove } from './shared.svelte';

  interface Props {
    sections: SourceSection[];
    /** The selected item id. */
    value?: string | undefined;
    onselect?: ((item: SourceItem) => void) | undefined;
    /** Accessible name of the navigation. */
    label?: string;
  }

  let { sections, value = $bindable(), onselect, label = 'Sidebar' }: Props = $props();

  const id = $props.id();
  let root: HTMLElement;
  const folded = $state<Record<string, boolean>>({});
  const key = (s: SourceSection, i: number) => s.id ?? s.title ?? String(i);
  const isFolded = (s: SourceSection, i: number) => folded[key(s, i)] ?? s.collapsed ?? false;
  const firstId = $derived(sections.flatMap((s) => s.items).find((i) => !i.disabled)?.id);
  const tabId = $derived(value ?? firstId);

  function select(item: SourceItem) {
    if (item.disabled) return;
    value = item.id;
    onselect?.(item);
  }

  function onkeydown(event: KeyboardEvent) {
    const items = [...root.querySelectorAll<HTMLElement>('.item:not(:disabled), button.heading')];
    rove(event, items, 'vertical');
  }
</script>

<!-- Arrow keys bubble up from the buttons inside (roving focus). -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<nav class="source-list" aria-label={label} bind:this={root} {onkeydown}>
  {#each sections as section, si (key(section, si))}
    {@const sectionId = `${id}-s${si}`}
    {@const isClosed = section.collapsible && isFolded(section, si)}
    <div class="section">
      {#if section.title}
        {#if section.collapsible}
          <button
            type="button"
            class="heading"
            aria-expanded={!isClosed}
            aria-controls={sectionId}
            tabindex="-1"
            onclick={() => (folded[key(section, si)] = !isClosed)}
          >
            <span>{section.title}</span>
            <Icon name="chevron-down" size={13} />
          </button>
        {:else}
          <h3 class="heading" id="{sectionId}-h">{section.title}</h3>
        {/if}
      {/if}
      {#if !isClosed}
        <ul
          id={sectionId}
          aria-labelledby={section.title && !section.collapsible ? `${sectionId}-h` : undefined}
          aria-label={section.collapsible ? section.title : undefined}
        >
          {#each section.items as item (item.id)}
            <li>
              <button
                type="button"
                class="item"
                aria-current={value === item.id ? 'true' : undefined}
                disabled={item.disabled}
                tabindex={tabId === item.id ? 0 : -1}
                style:--item-color={colorValue(item.color)}
                onclick={() => select(item)}
              >
                {#if item.icon}<Icon name={item.icon} size={17} />{/if}
                <span class="label">{item.label}</span>
                {#if item.count !== undefined && item.count !== ''}
                  <span class="count">{item.count}</span>
                {/if}
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/each}
</nav>

<style>
  .source-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 0;
    color: var(--text);
    font-size: var(--fs-md);
  }
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0 0 var(--space-1);
    padding: 0 var(--space-3);
    border: 0;
    background: none;
    color: var(--text-3);
    font: inherit;
    font-size: var(--fs-2xs);
    font-weight: var(--fw-bold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    text-align: left;
  }
  button.heading {
    height: 22px;
    border-radius: var(--radius-xs);
    cursor: pointer;
  }
  button.heading :global(.icon) {
    opacity: 0;
    transition:
      opacity var(--motion-quick) var(--ease-out),
      transform var(--motion-base) var(--ease-out);
  }
  button.heading:hover :global(.icon),
  button.heading:focus-visible :global(.icon) {
    opacity: 1;
  }
  button.heading[aria-expanded='false'] :global(.icon) {
    transform: rotate(-90deg);
  }
  button.heading:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -2px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    min-height: var(--control-sm);
    padding: 0 var(--space-3);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  .item:active:not(:disabled) {
    transform: scale(0.98);
  }
  .item :global(.icon) {
    color: var(--item-color, var(--accent-ink));
  }
  .item:hover:not(:disabled):not([aria-current]) {
    background: var(--fill-hover);
  }
  .item[aria-current='true'] {
    background: var(--layer-selected-bg);
    border-color: var(--layer-selected-border);
    box-shadow:
      0 4px 12px color-mix(in srgb, var(--tint) 16%, transparent),
      var(--glass-inset);
    font-weight: var(--fw-semibold);
  }
  .item[aria-current='true'] .count {
    color: var(--accent-ink);
  }
  .item:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .item:focus-visible {
    outline: var(--focus-ring);
    outline-offset: -1px;
  }
  .label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .count {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  @media (prefers-reduced-motion: reduce) {
    .item,
    button.heading :global(.icon) {
      transition: none;
    }
  }
</style>
