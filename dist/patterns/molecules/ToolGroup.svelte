<script lang="ts">
  /**
   * ToolGroup molecule — a row (or column) of IconButtons that acts as one stop in the tab
   * order (`role="toolbar"`): Tab enters at the last used tool, the arrow keys move between tools,
   * Home and End jump to the ends. Disabled tools are skipped; tools inside an open popover or
   * menu are left alone. It adds no surface of its own — put it in a bar, a Layer or a panel.
   *
   *   <ToolGroup label="Text style">
   *     <IconButton icon="bold" label="Bold" pressed={bold} onclick={…} />
   *     <IconButton icon="italic" label="Italic" pressed={italic} onclick={…} />
   *   </ToolGroup>
   */
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class' | 'role'> {
    /** Accessible name of the toolbar. */
    label?: string;
    orientation?: 'horizontal' | 'vertical';
    /** Space between the tools. */
    gap?: 'none' | 'xs' | 'sm';
    class?: string;
    children: Snippet;
  }

  let {
    label = 'Tools',
    orientation = 'horizontal',
    gap = 'xs',
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  let root: HTMLDivElement | undefined = $state();
  let current: HTMLElement | null = null;

  const FOCUSABLE = 'button, [href], input, select, [tabindex]';

  /** The tools of this toolbar: focusable, enabled, and not inside a nested popup or toolbar. */
  function tools(): HTMLElement[] {
    if (!root) return [];
    const self = root;
    return [...self.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) =>
        !(el as HTMLButtonElement).disabled &&
        el.closest('[role="toolbar"]') === self &&
        !el.closest('[role="dialog"], [role="menu"], [role="listbox"], [role="tooltip"]'),
    );
  }

  /** One tool is reachable with Tab: the current one, else the first (or a pressed one). */
  function sync(): void {
    const all = tools();
    if (!current || !all.includes(current)) {
      current = all.find((el) => el.getAttribute('aria-pressed') === 'true') ?? all[0] ?? null;
    }
    for (const el of all) el.tabIndex = el === current ? 0 : -1;
  }

  $effect(() => {
    if (!root) return;
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled'],
    });
    return () => observer.disconnect();
  });

  function focusin(event: FocusEvent) {
    const target = event.target as HTMLElement;
    if (tools().includes(target)) {
      current = target;
      sync();
    }
  }

  function keydown(event: KeyboardEvent) {
    const all = tools();
    const index = all.indexOf(event.target as HTMLElement);
    if (index < 0) return;
    const [back, forward] =
      orientation === 'horizontal' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown'];
    let next = -1;
    if (event.key === forward) next = (index + 1) % all.length;
    else if (event.key === back) next = (index - 1 + all.length) % all.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = all.length - 1;
    if (next < 0) return;
    event.preventDefault();
    current = all[next] ?? null;
    sync();
    current?.focus();
  }
</script>

<div
  bind:this={root}
  class="group group--{orientation} group--gap-{gap} {extraClass}"
  role="toolbar"
  tabindex="-1"
  aria-label={label}
  aria-orientation={orientation}
  {...rest}
  onfocusin={focusin}
  onkeydown={keydown}
>
  {@render children()}
</div>

<style>
  .group {
    display: inline-flex;
    align-items: center;
  }
  .group:focus {
    outline: none;
  }
  .group--vertical {
    flex-direction: column;
  }
  .group--gap-none {
    gap: 0;
  }
  .group--gap-xs {
    gap: 2px;
  }
  .group--gap-sm {
    gap: var(--space-1);
  }
</style>
