/**
   * Storybook-only key art for the game hub: a small SVG landscape per motif, painted with
   * palette tokens only, so each invented game has a face without an image request.
   */
import type { GameArt } from './mock-gaming';
interface Props {
    art: GameArt;
    class?: string;
}
declare const GameHubArt: import("svelte").Component<Props, {}, "">;
type GameHubArt = ReturnType<typeof GameHubArt>;
export default GameHubArt;
