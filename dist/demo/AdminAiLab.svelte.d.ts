import type { SectionProps } from './admin';
type Tab = 'playground' | 'classifier' | 'translator';
interface Props extends SectionProps {
    /** The open tab. */
    tab?: Tab;
    /** The playground asks its first example on load. */
    autoask?: boolean;
    /** The playground's stream breaks off half-way. */
    failing?: boolean;
    /** The classifier's probe matrix has run once. */
    probed?: boolean;
}
declare const AdminAiLab: import("svelte").Component<Props, {}, "">;
type AdminAiLab = ReturnType<typeof AdminAiLab>;
export default AdminAiLab;
