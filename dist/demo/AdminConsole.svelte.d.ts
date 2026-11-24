import { type AdminSection } from './admin';
type Auth = 'signed-in' | 'signed-out' | 'signing-out' | 'connect-device';
interface Props {
    /** The section on screen. */
    section?: AdminSection;
    /** Signed in, or one of the sign-in screens. */
    auth?: Auth;
    /** Users: a workspace without anyone in it yet. */
    usersEmpty?: boolean;
    /** Documents: which level the browser opens on. */
    documentsView?: 'collections' | 'documents' | 'detail';
    /** Documents: a rating run starts as soon as the section opens. */
    ratingRun?: boolean;
    /** Documents: an export of the selection in this state. */
    exportState?: 'none' | 'processing' | 'completed' | 'failed' | 'expired';
    /** Jobs: how the crawl goes, started on load (`idle`: wait for Start). */
    crawl?: 'idle' | 'running' | 'retrying' | 'failed' | 'cached';
    /** AI lab: the open tab. */
    aiTab?: 'playground' | 'classifier' | 'translator';
    /** AI lab: the playground asks its first example on load. */
    autoask?: boolean;
    /** AI lab: the playground's stream breaks off. */
    streamFails?: boolean;
    /** AI lab: the classifier's probe matrix has run once. */
    probed?: boolean;
    /** Data: the open view. */
    dataView?: 'sheet' | 'chooser' | 'locations';
    /** Data: one location lookup times out. */
    lookupFails?: boolean;
    /** Settings: the open tab. */
    settingsTab?: 'general' | 'notifications' | 'api' | 'workspaces' | 'advanced';
}
declare const AdminConsole: import("svelte").Component<Props, {}, "">;
type AdminConsole = ReturnType<typeof AdminConsole>;
export default AdminConsole;
