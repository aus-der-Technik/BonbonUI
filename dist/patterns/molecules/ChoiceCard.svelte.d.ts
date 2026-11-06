/**
   * ChoiceCard molecule — a frosted tile to pick one of several things (a data set chooser, a plan,
   * a template): an optional icon in a tinted squircle, title with badges, a meta line and a
   * three-line description. It lifts on hover; `selected` turns it into the tinted "selected"
   * layer. A link with `href`, a button otherwise.
   *
   *   <ChoiceCard icon="database" title="Venues" meta="14 columns" about="…" onclick={open} />
   */
import type { Snippet } from 'svelte';
import type { IconName } from '../atoms/icons';
interface Props {
    title: string;
    meta?: string | undefined;
    about?: string | undefined;
    /** Shown in a tinted squircle above the title. */
    icon?: IconName | undefined;
    /** Marks the chosen tile (tinted glass, `aria-pressed` on a button). */
    selected?: boolean | undefined;
    href?: string | undefined;
    onclick?: (() => void) | undefined;
    badges?: Snippet | undefined;
}
declare const ChoiceCard: import("svelte").Component<Props, {}, "">;
type ChoiceCard = ReturnType<typeof ChoiceCard>;
export default ChoiceCard;
