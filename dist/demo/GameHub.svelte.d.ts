interface Props {
    /** The game that is selected. */
    game?: string;
    /** Who is in the party at the start. */
    party?: 'solo' | 'duo' | 'full';
    /** Opens in a running match. */
    inMatch?: boolean;
}
declare const GameHub: import("svelte").Component<Props, {}, "">;
type GameHub = ReturnType<typeof GameHub>;
export default GameHub;
