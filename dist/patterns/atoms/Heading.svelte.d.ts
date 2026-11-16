/**
   * Heading atom — a real `<h1>`…`<h6>` with a size from the type scale that suits its level, tight
   * tracking and balanced line breaks. `size` decouples the look from the outline (a visually small
   * `<h2>` in a sidebar). `eyebrow` adds a small accent caps line above, `subtitle` a muted line
   * below — wrapped in an `<hgroup>`, so no extra markup is needed.
   *
   *   <Heading level={1} eyebrow="Overview" subtitle="Everything that happened this week">Dashboard</Heading>
   *   <Heading level={3} size="lg">Recent orders</Heading>
   */
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { TextSize, TextTone, TextWeight } from './Text.svelte';
type Level = 1 | 2 | 3 | 4 | 5 | 6;
interface Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'children' | 'class'> {
    level?: Level;
    /** Visual size; defaults by level (1 display, 2 3xl, 3 2xl, 4 xl, 5 lg, 6 base). */
    size?: TextSize | undefined;
    tone?: TextTone;
    weight?: TextWeight | undefined;
    /** Small accent caps line above the heading. */
    eyebrow?: string | undefined;
    /** Muted line below the heading. */
    subtitle?: string | undefined;
    align?: 'start' | 'center' | 'end' | undefined;
    truncate?: boolean;
    /** Plain text instead of children. */
    text?: string | undefined;
    class?: string;
    children?: Snippet | undefined;
}
declare const Heading: import("svelte").Component<Props, {}, "">;
type Heading = ReturnType<typeof Heading>;
export default Heading;
