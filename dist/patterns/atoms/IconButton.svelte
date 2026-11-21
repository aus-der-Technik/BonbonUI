<script lang="ts">
  /**
   * IconButton atom — the compact tool of tool bars, format bars and palettes: an icon on a flat
   * surface that only fills on hover, so it can sit inside glass without becoming glass-in-glass.
   * `label` is its accessible name and its tooltip; `shortcut` adds the key caps to the tooltip
   * (`['Mod', 'B']` → ⌘ B on Apple, Ctrl B elsewhere) and sets `aria-keyshortcuts`. With
   * `pressed` it is a toggle (`aria-pressed`) and takes the selected layer's tint when on. `sm`
   * looks 26px but keeps a 32px hit area. `showLabel` puts the label beside the icon for tools
   * that need a word; `children` replaces the icon (a swatch, a "100%").
   *
   * Rounded by default (a tool you hold down); `shape="pill"` when it sits in a pill-shaped bar,
   * so the corners stay concentric. Group several with ToolGroup for arrow-key navigation.
   *
   *   <IconButton icon="bold" label="Bold" shortcut={['Mod', 'B']} pressed={bold} onclick={toggle} />
   */
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import Icon from './Icon.svelte';
  import Tooltip from './Tooltip.svelte';
  import type { IconName } from './icons';
  import { ariaKeyShortcuts } from './keys';

  interface Props extends Omit<HTMLButtonAttributes, 'children' | 'class'> {
    icon?: IconName | undefined;
    /** Accessible name, and the tooltip unless `tooltip` says something else. */
    label: string;
    /** Tooltip text when it should say more than the name ("Undo typing"). */
    tooltip?: string | undefined;
    /** Shows a tooltip on hover and focus. */
    hint?: boolean;
    tooltipPlacement?: 'top' | 'bottom';
    tooltipAlign?: 'center' | 'start' | 'end';
    /** A toggle: `aria-pressed` and the selected look while true. Leave unset for an action. */
    pressed?: boolean | undefined;
    /** Keyboard shortcut, shown in the tooltip; `Mod`, `Alt`, `Shift` follow the platform. */
    shortcut?: readonly string[] | undefined;
    size?: 'sm' | 'md';
    shape?: 'rounded' | 'pill';
    /** `accent` for the tool the bar is about (e.g. "Comment"), `danger` for "Delete". */
    tone?: 'neutral' | 'accent' | 'danger';
    /** Shows the label beside the icon. */
    showLabel?: boolean;
    class?: string;
    /** Content in place of the icon. */
    children?: Snippet | undefined;
  }

  let {
    icon,
    label,
    tooltip,
    hint = true,
    tooltipPlacement = 'top',
    tooltipAlign = 'center',
    pressed,
    shortcut,
    size = 'md',
    shape = 'rounded',
    tone = 'neutral',
    showLabel = false,
    type = 'button',
    disabled = false,
    onclick,
    class: extraClass = '',
    children,
    ...rest
  }: Props = $props();

  const iconSize = $derived(size === 'sm' ? 14 : 16);
  const softDisabled = $derived(rest['aria-disabled'] === true || rest['aria-disabled'] === 'true');
  // A visible label already says what the tooltip would; it only earns its place with more.
  const showsTip = $derived(hint && (!showLabel || !!shortcut?.length || tooltip !== undefined));

  function click(event: MouseEvent) {
    if (disabled || softDisabled) {
      event.preventDefault();
      return;
    }
    (onclick as ((event: MouseEvent) => void) | null | undefined)?.(event);
  }
</script>

{#snippet button()}
  <button
    {type}
    class="tool tool--{size} tool--{shape} tool--{tone} {extraClass}"
    class:tool--labelled={showLabel}
    class:tool--soft-disabled={softDisabled}
    {disabled}
    aria-label={showLabel ? undefined : label}
    aria-pressed={pressed === undefined ? undefined : pressed}
    aria-keyshortcuts={shortcut?.length ? ariaKeyShortcuts(shortcut) : undefined}
    onclick={click}
    {...rest}
  >
    {#if children}{@render children()}{:else if icon}<Icon name={icon} size={iconSize} />{/if}
    {#if showLabel}<span class="tool__label">{label}</span>{/if}
  </button>
{/snippet}

{#if showsTip}
  <Tooltip
    text={tooltip ?? label}
    keys={shortcut}
    placement={tooltipPlacement}
    align={tooltipAlign}
    describe={tooltip !== undefined && tooltip !== label}
  >
    {@render button()}
  </Tooltip>
{:else}
  {@render button()}
{/if}

<style>
  .tool {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--motion-quick) var(--ease-out),
      box-shadow var(--motion-quick) var(--ease-out),
      color var(--motion-quick) var(--ease-out),
      transform var(--motion-quick) var(--ease-jelly);
  }
  /* Invisible hit area: a small tool is as easy to hit as any control. */
  .tool::after {
    content: '';
    position: absolute;
    inset: min(0px, calc((100% - var(--target-min)) / 2));
  }

  .tool--sm {
    min-width: var(--control-xs);
    height: var(--control-xs);
    font-size: var(--fs-xs);
  }
  .tool--md {
    min-width: var(--control-sm);
    height: var(--control-sm);
  }
  .tool--labelled {
    padding: 0 var(--space-3) 0 var(--space-2);
  }
  .tool--labelled:not(:has(> :global(svg))) {
    padding: 0 var(--space-3);
  }
  .tool--rounded.tool--sm {
    border-radius: var(--radius-sm);
  }
  .tool--rounded.tool--md {
    border-radius: var(--radius-md);
  }
  .tool--pill {
    border-radius: var(--radius-pill);
  }

  .tool--accent {
    color: var(--accent-ink);
  }
  .tool--danger {
    color: var(--danger);
  }

  /* Hover is a flat fill: the bar around it is the glass, the tool is not. */
  .tool:hover:not(:disabled, .tool--soft-disabled) {
    background: var(--fill-hover);
    color: var(--text);
  }
  .tool--accent:hover:not(:disabled, .tool--soft-disabled) {
    background: var(--accent-faint);
    color: var(--accent-ink);
  }
  .tool--danger:hover:not(:disabled, .tool--soft-disabled) {
    background: var(--tint-danger);
    color: var(--danger);
  }
  .tool:active:not(:disabled, .tool--soft-disabled) {
    transform: var(--press-squish);
  }

  /* On: the selected layer's tint and hairline, small enough for a 32px tool. */
  .tool[aria-pressed='true'],
  .tool[aria-pressed='true']:hover:not(:disabled, .tool--soft-disabled) {
    background: var(--layer-selected-bg);
    box-shadow: inset 0 0 0 0.75px var(--layer-selected-border);
    color: var(--accent-ink);
  }

  .tool:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 1px;
  }
  .tool--danger:focus-visible {
    outline-color: var(--danger);
  }

  .tool:disabled,
  .tool.tool--soft-disabled {
    opacity: var(--disabled-opacity);
    cursor: default;
  }

  .tool__label {
    font-weight: var(--fw-medium);
  }

  @media (prefers-reduced-motion: reduce) {
    .tool {
      transition:
        background-color var(--motion-quick) var(--ease-out),
        color var(--motion-quick) var(--ease-out);
    }
    .tool:active:not(:disabled, .tool--soft-disabled) {
      transform: none;
    }
  }
</style>
