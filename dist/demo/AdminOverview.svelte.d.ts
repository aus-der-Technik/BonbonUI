import { type SectionProps } from './admin';
interface Props extends SectionProps {
    /** Name in the greeting. */
    name?: string;
}
declare const AdminOverview: import("svelte").Component<Props, {}, "">;
type AdminOverview = ReturnType<typeof AdminOverview>;
export default AdminOverview;
