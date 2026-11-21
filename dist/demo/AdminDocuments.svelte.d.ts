import { type SectionProps } from './admin';
interface Props extends SectionProps {
    /** Which level the browser opens on (the first collection and document are picked). */
    view?: 'collections' | 'documents' | 'detail';
    /** A "Rate all" run starts as soon as the section opens. */
    ratingRun?: boolean;
    /** Some documents are selected and their export is in this state. */
    exportState?: 'none' | 'processing' | 'completed' | 'failed' | 'expired';
}
declare const AdminDocuments: import("svelte").Component<Props, {}, "">;
type AdminDocuments = ReturnType<typeof AdminDocuments>;
export default AdminDocuments;
