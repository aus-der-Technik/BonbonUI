/**
   * DetailSection molecule — one titled part of a record's detail: a caps heading (with optional
   * `actions` on its right), then its content.
   *
   *   <DetailSection title="Contact"><DetailList items={contact} /></DetailSection>
   */
import type { Snippet } from 'svelte';
interface Props {
    title: string;
    /** Small buttons at the end of the heading, e.g. "Edit". */
    actions?: Snippet | undefined;
    children: Snippet;
}
declare const DetailSection: import("svelte").Component<Props, {}, "">;
type DetailSection = ReturnType<typeof DetailSection>;
export default DetailSection;
