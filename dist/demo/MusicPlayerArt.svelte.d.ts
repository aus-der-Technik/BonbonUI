/**
   * Storybook-only album art for the listening room: two palette colours and one motif, drawn
   * with CSS gradients so no image is fetched and both themes stay in palette.
   */
import type { AlbumArt } from './mock-fun';
interface Props {
    art: AlbumArt;
    /** Any CSS length; the art is square. */
    size?: string;
    class?: string;
}
declare const MusicPlayerArt: import("svelte").Component<Props, {}, "">;
type MusicPlayerArt = ReturnType<typeof MusicPlayerArt>;
export default MusicPlayerArt;
