/**
   * GlimmerPanel — a panel that shows it is being worked on: while `working` (an assistant
   * writing an answer, a summary being drafted), a soft halo in the tint and its neighbouring
   * hues turns slowly round the panel and breathes, with a thin ring of the same colours on its
   * edge. When the work is done the glimmer fades out while still turning, so it lets go
   * instead of switching off. The feedback sits on the thing being made, not in a spinner
   * somewhere else. Under reduced motion the halo stands still.
   *
   *   <GlimmerPanel working={status === 'streaming'} aria-label="Answer">
   *     <Markdown source={answer} />
   *   </GlimmerPanel>
   *
   * A panel (or `level="selected"`), so never inside another panel. Forwarded attributes land
   * on the panel itself; it carries `aria-busy` while working.
   */
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { LayoutTag, Space } from '../layout/space';
interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> {
    /** The glimmer runs while this is true and fades out when it turns false. */
    working?: boolean;
    level?: 'panel' | 'selected';
    as?: LayoutTag;
    padding?: Space | undefined;
    gap?: Space;
    class?: string;
    children?: Snippet | undefined;
}
declare const GlimmerPanel: import("svelte").Component<Props, {}, "">;
type GlimmerPanel = ReturnType<typeof GlimmerPanel>;
export default GlimmerPanel;
