export interface MapMarker {
    lat: number;
    lon: number;
    title: string;
    subtitle?: string;
    color: string;
    /** Label/value rows of the popup. */
    details?: [string, string][];
    radius?: number;
}
/** Germany, before anything is shown. */
export declare const GERMANY: [[number, number], [number, number]];
/** basemap.de (BKG): the official German base map, free under CC BY 4.0. */
export declare const BASEMAP_DE: {
    url: string;
    attribution: string;
};
import 'leaflet/dist/leaflet.css';
interface Props {
    markers: MapMarker[];
    home?: [[number, number], [number, number]];
    tiles?: {
        url: string;
        attribution: string;
    };
    /** Zoom when exactly one marker is shown. */
    singleZoom?: number;
    label?: string;
}
declare const MapView: import("svelte").Component<Props, {}, "">;
type MapView = ReturnType<typeof MapView>;
export default MapView;
