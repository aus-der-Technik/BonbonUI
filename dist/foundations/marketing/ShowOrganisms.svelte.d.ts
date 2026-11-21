import type { Meta } from './looks';
export declare const names: readonly ["ActivityLog", "AppHeader", "CallToAction", "CartSummary", "ChartCard", "CommentThread", "ConfirmDialog", "DataTable", "DetailPanel", "Dialog", "DivergingBarChart", "Drawer", "EditableGrid", "Faq", "FeatureGrid", "FeedbackDialog"];
export declare const meta: Record<string, Meta>;
export declare const skip: Record<string, string>;
export interface Member {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Invited';
}
declare const ShowOrganisms: import("svelte").Component<Record<string, never>, {}, "">;
type ShowOrganisms = ReturnType<typeof ShowOrganisms>;
export default ShowOrganisms;
