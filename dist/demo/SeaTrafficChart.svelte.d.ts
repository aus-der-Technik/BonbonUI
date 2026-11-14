import { type ChartLayers, type Ship, type Weather } from './mock-sea';
interface Props {
    ships: Ship[];
    hour: number;
    weather: Weather;
    layers: ChartLayers;
    /** Moves the ships; the loop also waits for a visible tab. */
    running: boolean;
    selected?: string | null;
    hovered?: string | null;
    /** Simulated seconds since the start; written back about once a second. */
    sim?: number;
    /** The pointer in chart units, or null when it leaves. */
    onpoint?: ((p: {
        x: number;
        y: number;
    } | null) => void) | undefined;
    label?: string;
}
declare const SeaTrafficChart: import("svelte").Component<Props, {}, "selected" | "hovered" | "sim">;
type SeaTrafficChart = ReturnType<typeof SeaTrafficChart>;
export default SeaTrafficChart;
