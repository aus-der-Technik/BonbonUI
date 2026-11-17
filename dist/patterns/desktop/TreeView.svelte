<script lang="ts" module>
  import type { IconName } from '../atoms/icons';

  export interface TreeNode {
    id: string;
    label: string;
    /** Default: a folder for nodes with children, a file otherwise. */
    icon?: IconName | undefined;
    /** Icon colour: a palette name or any CSS colour. */
    color?: string | undefined;
    /** Grey text on the right (a size, a count). */
    meta?: string | undefined;
    children?: TreeNode[] | undefined;
  }
</script>

<script lang="ts">
  /**
   * TreeView — a folder tree (files, outlines, layers). ARIA tree with one tab stop:
   * Up / Down move, Right opens a folder or steps into it, Left closes it or steps out to the
   * parent, Home / End jump, Enter or Space selects. A click on the arrow folds, a click on
   * the row selects.
   *
   *   <TreeView nodes={files} bind:value bind:expanded label="Project files" />
   */
  import Icon from '../atoms/Icon.svelte';
  import { colorValue } from '../atoms/palette';

  interface Props {
    nodes: TreeNode[];
    /** The selected node id. */
    value?: string | undefined;
    /** Ids of the open folders. */
    expanded?: string[];
    onselect?: ((node: TreeNode) => void) | undefined;
    ontoggle?: ((node: TreeNode, open: boolean) => void) | undefined;
    /** Accessible name of the tree. */
    label: string;
  }

  let {
    nodes,
    value = $bindable(),
    expanded = $bindable([]),
    onselect,
    ontoggle,
    label,
  }: Props = $props();

  interface Row {
    node: TreeNode;
    parent: TreeNode | undefined;
  }

  const visible = $derived.by(() => {
    const rows: Row[] = [];
    const walk = (list: TreeNode[], parent: TreeNode | undefined) => {
      for (const node of list) {
        rows.push({ node, parent });
        if (node.children?.length && expanded.includes(node.id)) walk(node.children, node);
      }
    };
    walk(nodes, undefined);
    return rows;
  });

  let focusId = $state<string | undefined>();
  const tabId = $derived(
    [focusId, value].find((id) => id && visible.some((r) => r.node.id === id)) ??
      visible[0]?.node.id,
  );
  let root: HTMLElement;

  const isOpen = (node: TreeNode) => expanded.includes(node.id);

  function toggle(node: TreeNode, open = !isOpen(node)) {
    if (!node.children?.length || open === isOpen(node)) return;
    expanded = open ? [...expanded, node.id] : expanded.filter((id) => id !== node.id);
    ontoggle?.(node, open);
  }

  function select(node: TreeNode) {
    value = node.id;
    focusId = node.id;
    onselect?.(node);
  }

  function focus(id: string | undefined) {
    if (!id) return;
    focusId = id;
    root.querySelector<HTMLElement>(`[data-id="${CSS.escape(id)}"]`)?.focus();
  }

  function onkeydown(event: KeyboardEvent) {
    const id = (event.target as HTMLElement).closest<HTMLElement>('[role="treeitem"]')?.dataset[
      'id'
    ];
    const at = visible.findIndex((r) => r.node.id === id);
    const row = visible[at];
    if (!row) return;
    const { node, parent } = row;
    const hasKids = !!node.children?.length;
    let handled = true;
    switch (event.key) {
      case 'ArrowDown':
        focus(visible[at + 1]?.node.id);
        break;
      case 'ArrowUp':
        focus(visible[at - 1]?.node.id);
        break;
      case 'Home':
        focus(visible[0]?.node.id);
        break;
      case 'End':
        focus(visible.at(-1)?.node.id);
        break;
      case 'ArrowRight':
        if (hasKids && !isOpen(node)) toggle(node, true);
        else if (hasKids) focus(node.children?.[0]?.id);
        break;
      case 'ArrowLeft':
        if (hasKids && isOpen(node)) toggle(node, false);
        else focus(parent?.id);
        break;
      case 'Enter':
      case ' ':
        select(node);
        break;
      default:
        handled = false;
    }
    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
</script>

{#snippet branch(list: TreeNode[], level: number)}
  {#each list as node (node.id)}
    {@const hasKids = !!node.children?.length}
    {@const open = hasKids && isOpen(node)}
    <li
      role="treeitem"
      aria-level={level}
      aria-expanded={hasKids ? open : undefined}
      aria-selected={value === node.id}
      tabindex={tabId === node.id ? 0 : -1}
      data-id={node.id}
      onfocus={(e) => e.target === e.currentTarget && (focusId = node.id)}
    >
      <!-- Pointer convenience only; the keyboard works on the treeitem itself. -->
      <div
        class="row"
        role="presentation"
        style:--level={level - 1}
        style:--node-color={colorValue(node.color)}
        onclick={() => select(node)}
        ondblclick={() => toggle(node)}
      >
        <span
          class="twisty"
          class:open
          class:hidden={!hasKids}
          role="presentation"
          onclick={(e) => {
            e.stopPropagation();
            toggle(node);
          }}
        >
          <Icon name="chevron-right" size={12} />
        </span>
        <Icon name={node.icon ?? (hasKids ? 'folder' : 'file')} size={16} />
        <span class="label">{node.label}</span>
        {#if node.meta}<span class="meta">{node.meta}</span>{/if}
      </div>
      {#if open && node.children}
        <ul role="group">{@render branch(node.children, level + 1)}</ul>
      {/if}
    </li>
  {/each}
{/snippet}

<ul class="tree" role="tree" aria-label={label} bind:this={root} {onkeydown}>
  {@render branch(nodes, 1)}
</ul>

<style>
  .tree,
  .tree :global(ul) {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .tree {
    color: var(--text);
    font-size: var(--fs-md);
  }
  li {
    outline: none;
  }
  .row {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-height: var(--control-xs);
    padding: 0 var(--space-2) 0 calc(var(--space-2) + var(--level) * 1.1rem);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: default;
    user-select: none;
    transition: background-color var(--motion-quick) var(--ease-out);
  }
  .row > :global(.icon) {
    color: var(--node-color, var(--accent-ink));
  }
  .row:hover {
    background: var(--fill-hover);
  }
  /* Selected = the selected layer, as everywhere: tinted glass and a tint rim. */
  li[aria-selected='true'] > .row {
    border-color: var(--layer-selected-border);
    background: var(--layer-selected-bg);
    font-weight: var(--fw-semibold);
  }
  li[aria-selected='true'] > .row .meta {
    color: var(--accent-ink);
  }
  li:focus-visible > .row {
    outline: var(--focus-ring);
    outline-offset: -2px;
  }
  .twisty {
    display: grid;
    place-items: center;
    width: 16px;
    height: 16px;
    color: var(--text-3);
    cursor: pointer;
    transition: transform var(--motion-base) var(--ease-out);
  }
  .twisty.open {
    transform: rotate(90deg);
  }
  .twisty.hidden {
    visibility: hidden;
  }
  .label {
    flex: 1;
    min-width: 0;
    margin-left: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .meta {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
  }
  @media (prefers-reduced-motion: reduce) {
    .twisty,
    .row {
      transition: none;
    }
  }
</style>
