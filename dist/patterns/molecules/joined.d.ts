/**
 * How `Joined` finds and marks its parts — apart from the component so it can be tested.
 */
/** Marks the parts (`data-joined` = first | mid | last | only) and lets their wrappers step
 *  aside (`display: contents`), so corners and hairlines follow what is visible — buttons come
 *  and go with rights and state. */
export declare function joinParts(node: HTMLElement): () => void;
