/**
   * DetailHeader molecule — the top of a record's detail (e.g. in a DetailPanel): a large
   * picture or initials, a badge above the title, a subtitle and a meta line (a link to the
   * record's parent, a website) and optional `actions` on the right. Its heading id names the
   * panel.
   *
   *   <DetailHeader titleId="venue-title" title="Example Hall" subtitle="Congress centre" />
   */
import type { Snippet } from 'svelte';
interface Props {
    title: string;
    /** Id of the heading, for the panel's `aria-labelledby`. */
    titleId: string;
    /** Portrait or logo; initials when missing. */
    src?: string | undefined;
    /** The name the initials are taken from; defaults to the title. */
    initialsOf?: string | undefined;
    shape?: 'round' | 'square';
    subtitle?: string | null | undefined;
    /** Above the title, e.g. a Badge. */
    badge?: Snippet | undefined;
    /** A small muted line below the subtitle, e.g. a link to the record's parent or website. */
    meta?: Snippet | undefined;
    /** Buttons at the end of the header, e.g. "Edit". */
    actions?: Snippet | undefined;
}
declare const DetailHeader: import("svelte").Component<Props, {}, "">;
type DetailHeader = ReturnType<typeof DetailHeader>;
export default DetailHeader;
