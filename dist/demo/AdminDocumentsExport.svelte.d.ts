import { type AdminSection, type Notify } from './admin';
import { type ExportStatus, type LibraryDocument } from './mock-ops';
interface Props {
    /** The selected documents. */
    selected: LibraryDocument[];
    /** The archive name typed in the selection bar. */
    name?: string;
    /** A job is pending or packing (bindable, for the bar's busy button). */
    working?: boolean;
    /** Whether there is a job to show: the bar stays open for it without a selection. */
    onshowing?: ((showing: boolean) => void) | undefined;
    /** Opens with a job in this state (for stories). */
    start?: 'none' | Exclude<ExportStatus, 'pending'>;
    active?: boolean;
    notify?: Notify | undefined;
    onnavigate?: ((section: AdminSection) => void) | undefined;
}
declare const AdminDocumentsExport: import("svelte").Component<Props, {
    begin: () => void;
}, "working">;
type AdminDocumentsExport = ReturnType<typeof AdminDocumentsExport>;
export default AdminDocumentsExport;
