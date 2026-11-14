/**
   * Textarea atom — multi-line text.
   * - `counter` shows "12 / 2000" under the field: against `maxlength` (hard stop) or `limit`
   *   (soft: typing past it is allowed, the counter turns red and the field invalid).
   * - `autogrow` grows with the content up to `maxRows`.
   * - `variant="plain"` drops border and background to fill a pane (e.g. a SplitPane).
   * - `mono` for prompts, templates and code.
   *
   *   <Textarea placeholder="What should we improve?" maxlength={2000} counter bind:value />
   */
import type { HTMLTextareaAttributes } from 'svelte/elements';
interface Props extends Omit<HTMLTextareaAttributes, 'class' | 'value'> {
    value?: string;
    counter?: boolean;
    limit?: number | undefined;
    invalid?: boolean;
    autogrow?: boolean;
    maxRows?: number;
    mono?: boolean;
    variant?: 'field' | 'plain';
    class?: string;
}
declare const Textarea: import("svelte").Component<Props, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
