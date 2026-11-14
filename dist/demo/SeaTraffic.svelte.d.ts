import { type Weather } from './mock-sea';
interface Props {
    /** The forecast scenario. */
    weather?: Weather;
    /** Forecast hour to open at (0 = now). */
    hour?: number;
    /** A vessel to open selected. */
    selected?: string | undefined;
    /** Opens with the traffic paused. */
    paused?: boolean;
}
declare const SeaTraffic: import("svelte").Component<Props, {}, "">;
type SeaTraffic = ReturnType<typeof SeaTraffic>;
export default SeaTraffic;
