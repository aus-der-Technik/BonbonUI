export type Presence = 'online' | 'away' | 'busy' | 'offline';
/** A person in a collaborative view: a reviewer, an assignee, someone looking at the page. */
export interface Participant {
    id?: string;
    /** A name or an e-mail address; the initials and tooltip come from it. */
    name: string;
    /** Portrait URL; initials show while it is missing or broken. */
    src?: string | undefined;
    /** Adds a presence dot. */
    presence?: Presence | undefined;
}
interface Props {
    people: Participant[];
    /** Avatars shown before the "+n" chip. */
    max?: number;
    size?: number;
    /** Accessible name of the list. */
    label?: string;
    /** Draws the presence dots that are set. */
    presence?: boolean;
    /** Text of the presence states in tooltips. */
    presenceLabels?: Record<Presence, string>;
    /** Tooltip / accessible name of the overflow chip. */
    moreLabel?: (count: number) => string;
    onselect?: ((person: Participant) => void) | undefined;
}
declare const AvatarStack: import("svelte").Component<Props, {}, "">;
type AvatarStack = ReturnType<typeof AvatarStack>;
export default AvatarStack;
