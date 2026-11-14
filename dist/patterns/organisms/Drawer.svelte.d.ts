/**
   * Drawer organism — a liquid-glass panel that glides in from the side for a record's detail
   * or a form, without leaving the list. It floats a little off the viewport edges (full width
   * on phones). Native `<dialog>` (focus trap, Escape, top layer). It closes like every overlay:
   * Escape, the close button at the top end, or a click on the backdrop (`closeOnBackdrop`) —
   * a press that starts inside and is released beside it never counts.
   *
   *   <Drawer open={editing} title="Jane Doe" subtitle="jane.doe@example.com"
   *     onclose={() => (editing = false)}>…{#snippet footer()}…{/snippet}</Drawer>
   */
import type { Snippet } from 'svelte';
interface Props {
    open: boolean;
    title: string;
    subtitle?: string | undefined;
    width?: string;
    /** The edge it slides in from. */
    side?: 'end' | 'start';
    closeLabel?: string;
    /** A click on the backdrop closes it. */
    closeOnBackdrop?: boolean;
    onclose: () => void;
    children: Snippet;
    footer?: Snippet | undefined;
}
declare const Drawer: import("svelte").Component<Props, {}, "">;
type Drawer = ReturnType<typeof Drawer>;
export default Drawer;
