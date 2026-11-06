/**
   * Section — a titled block of a page. Gives every block the same heading style and vertical
   * rhythm, so pages read evenly without hand-tuned margins:
   *
   *   <Section title="Members" description="Who can sign in" {actions}>…</Section>
   *   <Section title="Plans" layout="grid" min="18rem">…cards…</Section>
   *   <Section title="Danger zone" level="panel">…</Section>
   *
   * The heading sits on the ground layer; with `level="panel"` the whole section is a glass card.
   */
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { type LayerLevel, type Space } from './space';
interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class' | 'title'> {
    title?: string | undefined;
    /** Small caps line above the title, e.g. a category. */
    eyebrow?: string | undefined;
    description?: string | undefined;
    /** Heading level of the title (default 2). */
    heading?: 2 | 3 | 4;
    /** `lead` is a large greeting-style title that keeps the page's top edge (dashboards);
     *  `hero` is larger with extra room above — for the first section of a website. */
    size?: 'default' | 'lead' | 'hero';
    /** Buttons on the right of the heading. */
    actions?: Snippet | undefined;
    level?: Exclude<LayerLevel, 'front'>;
    /** How the children are laid out. */
    layout?: 'stack' | 'row' | 'grid';
    gap?: Space;
    /** Grid only: minimum column width / maximum column count. */
    min?: string;
    columns?: number | undefined;
    align?: 'start' | 'center';
    class?: string;
    children?: Snippet | undefined;
}
declare const Section: import("svelte").Component<Props, {}, "">;
type Section = ReturnType<typeof Section>;
export default Section;
