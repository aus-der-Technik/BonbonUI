/**
   * The one header every Admin console section starts with: title, a one-line subtitle and the
   * controls whose effect is the whole section (e.g. the overview's time range). Storybook only.
   */
import type { Snippet } from 'svelte';
import { type AdminSection } from './admin';
interface Props {
    section: AdminSection;
    /** Overrides the section's title (the overview greets instead). */
    title?: string | undefined;
    /** Overrides the section's subtitle. */
    description?: string | undefined;
    eyebrow?: string | undefined;
    actions?: Snippet | undefined;
}
declare const AdminHead: import("svelte").Component<Props, {}, "">;
type AdminHead = ReturnType<typeof AdminHead>;
export default AdminHead;
