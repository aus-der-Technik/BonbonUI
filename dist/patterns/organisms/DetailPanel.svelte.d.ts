/**
   * DetailPanel organism — a record's detail on a glass panel floating over its list: it flies
   * in from the right and fades out, the list stays visible, blurred, behind it. It closes like
   * every overlay: Escape, the close button at the top end, or a click beside the panel
   * (`closeOnBackdrop`); ← / → step through the list. Keys pressed inside a dialog opened from
   * the panel stay with that dialog.
   *
   * Two panels can stand side by side, e.g. a person opened from their organisation: the
   * organisation's panel (`layer="behind"`) slides left and leaves the keys to the person's
   * (`layer="front"`), which takes its place. Below the width two panels need (72rem), the
   * front one covers the other. Unlike Drawer it is no native `<dialog>`, which would allow
   * only one modal at a time; it traps focus itself.
   *
   * While the first load runs (`itemKey` null) it shows a skeleton; a new `itemKey`
   * cross-fades the content, and `loading` dims the item on screen while it refreshes.
   *
   *   {#if open}<DetailPanel labelledby="person-title" itemKey={person.id} onclose={close}
   *     onprevious={…} onnext={…}><DetailHeader titleId="person-title" … /></DetailPanel>{/if}
   */
import { type Snippet } from 'svelte';
interface Props {
    /** Id of the heading that names the panel, e.g. DetailHeader's `titleId`. */
    labelledby: string;
    /** Identifies the item on screen; a new key cross-fades the content. `null` while loading. */
    itemKey: string | number | null;
    /** Refreshing the item on screen (e.g. another language): the content dims. */
    loading?: boolean;
    error?: string | undefined;
    onclose: () => void;
    /** A click beside the panels; closes this panel unless given. */
    onbackdrop?: (() => void) | undefined;
    /** A click beside the panels does something (`onbackdrop`, else close). */
    closeOnBackdrop?: boolean;
    /**
     * `single` — the only panel. `behind` — moved left for a panel in front of it; it keeps
     * the backdrop but not the keys. `front` — beside a panel behind it; it owns the keys.
     */
    layer?: 'single' | 'behind' | 'front';
    onprevious?: (() => void) | undefined;
    onnext?: (() => void) | undefined;
    previousLabel?: string;
    nextLabel?: string;
    closeLabel?: string;
    /** Last line of the panel, e.g. "Updated … · id …". */
    footer?: Snippet | undefined;
    children: Snippet;
}
declare const DetailPanel: import("svelte").Component<Props, {}, "">;
type DetailPanel = ReturnType<typeof DetailPanel>;
export default DetailPanel;
