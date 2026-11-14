interface Props {
    /** Opens with music playing. */
    playing?: boolean;
    /** The album that is loaded. */
    album?: string;
    /** Opens with nothing up next. */
    emptyQueue?: boolean;
}
declare const MusicPlayer: import("svelte").Component<Props, {}, "">;
type MusicPlayer = ReturnType<typeof MusicPlayer>;
export default MusicPlayer;
