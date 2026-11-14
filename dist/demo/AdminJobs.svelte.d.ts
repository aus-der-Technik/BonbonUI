import type { SectionProps } from './admin';
interface Props extends SectionProps {
    /** Starts a crawl on load that ends this way (`idle`: wait for Start). */
    scenario?: 'idle' | 'running' | 'retrying' | 'failed' | 'cached';
    /** Running crawls changed (0 or 1), e.g. for a count in the navigation. */
    onrunning?: ((count: number) => void) | undefined;
}
declare const AdminJobs: import("svelte").Component<Props, {}, "">;
type AdminJobs = ReturnType<typeof AdminJobs>;
export default AdminJobs;
