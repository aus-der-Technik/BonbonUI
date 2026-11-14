import { type PlaceId } from './mock-home';
interface Props {
    /** The place open in the side panel. */
    place?: PlaceId;
    /** Opens with everyone away: lights off, door locked, Eco. */
    away?: boolean;
    /** The hotspots are pinned to the bundled photo; for another photo they line up instead. */
    anchored?: boolean;
}
declare const SmartHome: import("svelte").Component<Props, {}, "">;
type SmartHome = ReturnType<typeof SmartHome>;
export default SmartHome;
