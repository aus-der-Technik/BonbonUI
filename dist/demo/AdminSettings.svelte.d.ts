import { type SectionProps } from './admin';
type Tab = 'general' | 'notifications' | 'api' | 'workspaces' | 'advanced';
interface Props extends SectionProps {
    tab?: Tab;
    /** The workspace's name; saving a new one changes it for the whole console. */
    workspace?: string;
}
declare const AdminSettings: import("svelte").Component<Props, {}, "workspace">;
type AdminSettings = ReturnType<typeof AdminSettings>;
export default AdminSettings;
