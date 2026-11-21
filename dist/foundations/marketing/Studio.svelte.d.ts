/**
   * Local only (not in git): the shared driver of the component studios. It reads `?mk=` from
   * the story's URL, picks that component's arrangement (or the catalogue preview), its look
   * (cycled tint and theme, overridable per component or by `?tint=` / `?theme=`) and frames
   * it. `?mk=__list` prints the squares this studio renders, for the render script.
   */
import type { Snippet } from 'svelte';
import { type Level } from '../explore/catalogue';
import { type Meta } from './looks';
interface Props {
    levels: readonly Level[];
    /** Only these names of those levels (when a level is split across studios). */
    names?: readonly string[] | undefined;
    shows: Record<string, Snippet>;
    meta?: Record<string, Meta>;
    /** Components that get no square of their own, with the reason (for the README). */
    skip?: Record<string, string>;
    /** Rendered for a component without a hand-made arrangement. */
    preview: Snippet<[string]>;
}
declare const Studio: import("svelte").Component<Props, {}, "">;
type Studio = ReturnType<typeof Studio>;
export default Studio;
