/**
   * Disclosure molecule — a section that folds open under its heading (advanced options, a
   * danger zone). Several in a row make an accordion, divided by hairlines. `icon` sits before the
   * title.
   *
   *   <Disclosure title="Advanced options" meta="3 settings">…</Disclosure>
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
import type { Tone } from '../tone';
interface Props {
    title: string;
    icon?: IconName | undefined;
    /** Grey line next to the title, e.g. a summary of what's inside. */
    meta?: string | undefined;
    open?: boolean;
    /** Colours the title, e.g. `danger` for a danger zone. */
    tone?: Tone;
    /** Buttons on the right of the heading, shown while open (e.g. "Select all"). */
    actions?: Snippet | undefined;
    children: Snippet;
}
declare const Disclosure: import("svelte").Component<Props, {}, "open">;
type Disclosure = ReturnType<typeof Disclosure>;
export default Disclosure;
