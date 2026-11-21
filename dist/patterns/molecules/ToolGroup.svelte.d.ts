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
declare const ToolGroup: import("svelte").Component<Props, {}, "">;
type ToolGroup = ReturnType<typeof ToolGroup>;
export default ToolGroup;
