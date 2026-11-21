/**
   * IdentityCell molecule — who or what a row is about: picture (or initials), name with an
   * optional badge, and a muted line below. For the first column of a DataTable or the leading
   * part of a list row.
   *
   *   <IdentityCell name="Jane Doe" subtitle="jane.doe@example.com" />
   */
import type { Snippet } from 'svelte';
interface Props {
    name: string;
    /** Portrait or logo; initials when missing. */
    src?: string | undefined;
    /** The name the initials are taken from, e.g. without an academic title. */
    initialsOf?: string | undefined;
    shape?: 'round' | 'square';
    subtitle?: string | null | undefined;
    /** Keeps the subtitle to one line. */
    clamp?: boolean;
    size?: number;
    /** After the name, e.g. a Badge. */
    badge?: Snippet | undefined;
}
declare const IdentityCell: import("svelte").Component<Props, {}, "">;
type IdentityCell = ReturnType<typeof IdentityCell>;
export default IdentityCell;
