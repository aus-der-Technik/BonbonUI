/**
   * Field molecule — a small grey label above a control (the filter bar's `.field`).
   * The control comes in as `children`, which receives the ids to wire up: put `id` on the
   * control (the label points at it), or `labelId` into its `aria-labelledby`; with an `error`,
   * add `errorId` to its `aria-describedby` and mark it `invalid`.
   *
   *   <Field label="E-mail" hint="Used for sign-in">
   *     {#snippet children({ id })}<Input {id} type="email" />{/snippet}
   *   </Field>
   */
import type { Snippet } from 'svelte';
interface Props {
    label: string;
    /** Plain text or a snippet, e.g. with inline `<code>`. */
    hint?: string | Snippet | undefined;
    /** Validation message under the control, in the danger colour and announced. Wire `errorId`
     *  into the control's `aria-describedby` and set it invalid. */
    error?: string | undefined;
    required?: boolean;
    /** Renders the label as a `<span>` for controls a `<label for>` cannot name (groups). */
    group?: boolean;
    children: Snippet<[{
        id: string;
        labelId: string;
        errorId: string;
        invalid: boolean;
    }]>;
}
declare const Field: import("svelte").Component<Props, {}, "">;
type Field = ReturnType<typeof Field>;
export default Field;
