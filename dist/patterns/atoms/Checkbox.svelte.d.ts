/**
   * Checkbox atom — a candy checkbox (accent fill, a check mark that draws itself in),
   * optionally with its label. `tone="ok"` paints it green (e.g. a draft row that is ready), `danger`
   * red (rows marked for deletion). `indeterminate` shows a dash for "some selected".
   * `oncheckedchange` hands over the new state as a boolean (like Switch and ToggleChip); the DOM
   * `onchange` still works. A checkbox without a label keeps its 18px look but a --target-min hit
   * area.
   *
   *   <Checkbox label="Only with comments" bind:checked={onlyComments} />
   */
import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { Tone } from '../tone';
interface Props extends Omit<HTMLInputAttributes, 'type' | 'class' | 'checked' | 'children'> {
    checked?: boolean;
    indeterminate?: boolean;
    label?: string | undefined;
    /** Grey line under the label. */
    description?: string | undefined;
    tone?: Tone | /** @deprecated The old name of `accent`. */ 'red';
    /** Called with the new checked state after the user toggled it. */
    oncheckedchange?: ((checked: boolean) => void) | undefined;
    class?: string;
    children?: Snippet | undefined;
}
declare const Checkbox: import("svelte").Component<Props, {}, "checked" | "indeterminate">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
