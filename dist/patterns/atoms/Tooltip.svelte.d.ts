/**
   * Tooltip atom — a short hint above (or below, or beside) its trigger on hover and keyboard focus,
   * linked with `aria-describedby` on the trigger (the first focusable element inside, else the
   * first element). Escape hides it, and so does opening the trigger's own menu or popover
   * (`aria-expanded="true"`). A small liquid-glass bubble that pops out of its trigger (it scales
   * from the edge that touches the trigger). `keys` adds the shortcut as key caps after the text,
   * written the platform's way (`['Mod', 'B']` → ⌘ B on Apple, Ctrl B elsewhere); `content`
   * replaces the text with your own markup. For anything interactive use a popover.
   *
   *   <Tooltip text="Reload the rows"><Button icon="reload" label="Reload" iconOnly /></Tooltip>
   *   <Tooltip text="Bold" keys={['Mod', 'B']}>…</Tooltip>
   */
import type { Snippet } from 'svelte';
interface Props {
    text?: string;
    /** A shortcut shown as key caps after the text; `Mod`, `Alt`, `Shift` follow the platform. */
    keys?: readonly string[] | undefined;
    /** Rich content in place of `text`. */
    content?: Snippet | undefined;
    /** `right`/`left` for triggers stacked in a column (a navigation rail). */
    placement?: 'top' | 'bottom' | 'right' | 'left';
    /** Which edge of the trigger the bubble lines up with; `start`/`end` for triggers at an edge. */
    align?: 'center' | 'start' | 'end';
    /** Links the bubble as the trigger's description. Turn it off when the bubble only repeats
     *  the trigger's accessible name, so it is not read twice. */
    describe?: boolean;
    children: Snippet;
}
declare const Tooltip: import("svelte").Component<Props, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
