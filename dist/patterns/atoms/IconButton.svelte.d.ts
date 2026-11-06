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
import type { IconName } from './icons';
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
declare const IconButton: import("svelte").Component<Props, {}, "">;
type IconButton = ReturnType<typeof IconButton>;
export default IconButton;
