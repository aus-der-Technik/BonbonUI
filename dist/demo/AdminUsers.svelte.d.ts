import { type SectionProps } from './admin';
interface Props extends SectionProps {
    /** Starts with nobody in the workspace yet (the first-run state). */
    empty?: boolean;
}
declare const AdminUsers: import("svelte").Component<Props, {}, "">;
type AdminUsers = ReturnType<typeof AdminUsers>;
export default AdminUsers;
