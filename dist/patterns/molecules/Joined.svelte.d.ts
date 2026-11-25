/**
   * Joined molecule — controls that belong together, joined into one: a field and its button (search + "+",
   * search + filter) or a few related actions (‹ Today ›). One capsule, hairlines between the
   * parts, one focus halo when its field has focus; the parts lose their own borders and
   * shadows. A filled part (`primary`, `tinted`: the action the group is about) stays a whole
   * pill of its own, inset in the capsule like a SegmentedControl's thumb — its gloss and glow end
   * in its own round ends, never cut off at a hairline. A press gives the whole group a little.
   *
   * It finds its parts at any depth — Buttons, SearchFields, selects and anything marked
   * `data-part` (a Popover's trigger, an import button in a span) — and marks the ends
   * (`data-joined` = first | mid | last | only), so parts may come and go with rights and state.
   * Give the parts the same `size` as the group (`md` 36 px in a toolbar, `sm` 32 px in a row or
   * a pane's head). A field marked `grow` (class) takes the room left.
   *
   *   <Joined label="Find or start a conversation">
   *     <SearchField label="Search conversations" bind:value={query} />
   *     <Button iconOnly icon="message-plus" label="New message" onclick={onnew} />
   *   </Joined>
   */
import type { Snippet } from 'svelte';
interface Props {
    /** Accessible name of the group. */
    label: string;
    /** Height of the capsule: `md` 36 px (toolbars, the default), `sm` 32 px (rows, a pane's head). */
    size?: 'sm' | 'md' | undefined;
    /** `pill` in toolbars (the default), `rounded` in forms and dense panes. */
    shape?: 'pill' | 'rounded' | undefined;
    /** Takes the width of its container (the field grows). */
    full?: boolean | undefined;
    /** Extra classes on the group. */
    class?: string;
    /** The parts: fields, buttons, selects or anything marked `data-part`. */
    children: Snippet;
}
declare const Joined: import("svelte").Component<Props, {}, "">;
type Joined = ReturnType<typeof Joined>;
export default Joined;
