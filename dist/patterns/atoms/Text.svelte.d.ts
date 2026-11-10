export type TextSize = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | 'display';
export type TextTone = 'default' | 'muted' | 'subtle' | 'accent' | 'danger' | 'ok' | 'warn' | 'info' | 'inherit';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
/**
   * Text atom — body copy from the type scale, so a page only ever uses sizes, colours and weights
   * that belong together. `tone` picks a role colour (muted for secondary lines, subtle for meta),
   * `numeric` switches to tabular figures for amounts and counts, `truncate` cuts to one line (or
   * `truncate={2}` to two) with an ellipsis.
   *
   * Good typography is the default: 1.5 line height for reading, tighter tracking as the size
   * grows, no orphaned last words, and a paragraph (`as="p"`) stops at a comfortable `--measure`
   * (~68 characters); `measure={false}` lets it run the full width.
   *
   *   <Text tone="muted">Last synced 2 minutes ago</Text>
   *   <Text size="2xl" weight="bold" numeric>1.284</Text>
   */
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
type Tag = 'span' | 'p' | 'div' | 'label' | 'strong' | 'em' | 'small' | 'time' | 'dt' | 'dd' | 'li' | 'figcaption' | 'legend' | 'blockquote';
interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    size?: TextSize;
    tone?: TextTone;
    weight?: TextWeight | undefined;
    as?: Tag;
    /** One line with an ellipsis, or a number of lines. */
    truncate?: boolean | number;
    /** Tabular figures, so columns of numbers line up. */
    numeric?: boolean;
    mono?: boolean;
    /** Small caps label style: uppercase, tracked, semibold. */
    caps?: boolean;
    align?: 'start' | 'center' | 'end' | undefined;
    /** Plain text instead of children. */
    text?: string | number | undefined;
    /** Paragraphs stop at a readable line length (~70 characters); `false` lets them run. */
    measure?: boolean;
    class?: string;
    children?: Snippet | undefined;
}
declare const Text: import("svelte").Component<Props, {}, "">;
type Text = ReturnType<typeof Text>;
export default Text;
