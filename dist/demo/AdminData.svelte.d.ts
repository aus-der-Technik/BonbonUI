import type { SectionProps } from './admin';
interface Props extends SectionProps {
    /** The open view: a data set, the data-set chooser, or the location lookup. */
    view?: 'sheet' | 'chooser' | 'locations';
    /** Locations: one lookup times out. */
    failing?: boolean;
}
declare const AdminData: import("svelte").Component<Props, {}, "">;
type AdminData = ReturnType<typeof AdminData>;
export default AdminData;
