/**
   * FormSection organism — one block of a settings or edit form: title and explanation on the
   * left, the fields on the right (stacked below 760px). Optional `footer` for its own save.
   * Consecutive sections are divided by a hairline.
   *
   *   <FormSection title="Profile" description="Shown to everyone.">…fields…</FormSection>
   */
import type { Snippet } from 'svelte';
interface Props {
    title: string;
    description?: string | undefined;
    children: Snippet;
    footer?: Snippet | undefined;
}
declare const FormSection: import("svelte").Component<Props, {}, "">;
type FormSection = ReturnType<typeof FormSection>;
export default FormSection;
