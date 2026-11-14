export interface Reaction {
    emoji: string;
    count: number;
    /** The current user reacted with this emoji. */
    mine?: boolean;
    /** Who reacted, for the tooltip ("Ada, Linus and 3 others"). */
    people?: string[];
}
interface Props {
    reactions?: Reaction[];
    /** Emojis offered by the picker. */
    choices?: string[];
    /** Hides the add button (read-only list). */
    readonly?: boolean;
    size?: 'sm' | 'md';
    label?: string;
    addLabel?: string;
    /** Accessible name of one reaction button. */
    reactionLabel?: (reaction: Reaction) => string;
    /** Tooltip naming who reacted; `rest` is how many are not listed in `people`. */
    peopleLabel?: (people: string[], rest: number) => string;
    /** Called after the list changed: the emoji and whether you now react with it. */
    ontoggle?: ((emoji: string, mine: boolean) => void) | undefined;
}
declare const Reactions: import("svelte").Component<Props, {
    toggle: (emoji: string) => void;
}, "reactions">;
type Reactions = ReturnType<typeof Reactions>;
export default Reactions;
