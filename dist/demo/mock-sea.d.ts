/**
 * Mock data and geometry for the sea traffic example (Pages/Maritime): an invented bay, its
 * islands, depth, shipping lanes, a 24-hour weather forecast and a dozen and a half ships on
 * their routes. Coordinates are chart units (1000 × 640, y down); one sea mile is NM units.
 */
import type { PaletteColor } from '../patterns/atoms/palette';
export declare const W = 1000;
export declare const H = 640;
/** Chart units per nautical mile (the chart spans 24 nm east to west). */
export declare const NM: number;
/** Simulated seconds per real second: slow enough to read, fast enough to see. */
export declare const SPEEDUP = 30;
/** The live clock starts here (minutes after midnight), so the example is the same every run. */
export declare const START_MINUTES: number;
type Pt = [number, number];
/** Catmull-Rom through the points, sampled `steps` times per segment. */
export declare function smooth(points: Pt[], closed: boolean, steps?: number): Pt[];
export declare const pathOf: (pts: Pt[], closed?: boolean) => string;
export declare const chart: {
    mainland: string;
    coast: string;
    islands: {
        name: string;
        d: string;
        label: Pt;
    }[];
    harbour: {
        label: Pt;
        arms: string[];
        quay: string;
    };
    lighthouse: Pt;
    anchorage: {
        cx: number;
        cy: number;
        r: number;
    };
    fishing: string;
};
export declare const lanes: {
    /** Inbound (towards the harbour) and outbound lane centre lines. */
    inbound: string;
    outbound: string;
    /** The separation zone between them. */
    zone: string;
    /** Lane edges. */
    edges: string[];
    /** Direction arrows along both lanes: position and heading. */
    arrows: {
        p: Pt;
        heading: number;
    }[];
    ferry: string[];
};
/** Compass bearing (0 = north, clockwise) of a screen vector. */
export declare function bearing(dx: number, dy: number): number;
export type ShipType = 'cargo' | 'tanker' | 'passenger' | 'fishing' | 'pleasure';
export declare const shipTypes: {
    id: ShipType;
    label: string;
    color: PaletteColor;
}[];
export interface Route {
    id: string;
    mode: 'loop' | 'pingpong';
    pts: Pt[];
    /** Cumulative length at each sample. */
    acc: number[];
    length: number;
    stops: {
        at: number;
        name: string;
    }[];
    station: string | undefined;
}
export declare const routes: Record<string, Route>;
export interface Ship {
    id: string;
    name: string;
    type: ShipType;
    /** Speed through the water, knots. */
    kn: number;
    route: string;
    /** Where on its route it starts (0–1). */
    start: number;
    /** Length overall, metres. */
    length: number;
}
export declare const ships: Ship[];
export interface Fix {
    x: number;
    y: number;
    /** Course over ground, degrees. */
    course: number;
    /** Sim seconds to the next stop; undefined when working an area. */
    eta: number | undefined;
    destination: string;
    onChart: boolean;
}
/** Where a ship is `sim` seconds after the start of the example. Pure, so the list and the
 *  chart agree without sharing state. */
export declare function shipAt(ship: Ship, sim: number): Fix;
/** Grid spacing of the sampled fields, chart units. */
export declare const CELL = 10;
export declare const GX: number;
export declare const GY: number;
/** Distance to the nearest land per grid point (0 on land); computed once, on first use. */
export declare function shoreDistance(): Float32Array;
/** Bilinear lookup in a grid field. */
export declare function sample(field: Float32Array, x: number, y: number): number;
export declare function depth(): Float32Array;
/** Marching squares: one path of line segments where the field crosses `level`. */
export declare function isoline(field: Float32Array, level: number): string;
export type Weather = 'fresh' | 'gale';
/** The chart's switchable layers. */
export interface ChartLayers {
    wind: boolean;
    waves: boolean;
    rain: boolean;
    ships: boolean;
    lanes: boolean;
}
export interface Wind {
    /** Knots. */
    speed: number;
    /** Where it blows from, degrees. */
    from: number;
    /** Screen vector it blows towards (unit length). */
    ux: number;
    uy: number;
}
/**
 * The forecast wind `hour` hours from now: a south-westerly that veers north-west as a front
 * crosses the bay from the west, strongest as it passes, plus the swirl of a small low moving
 * east along the south edge.
 */
export declare function windAt(x: number, y: number, hour: number, weather: Weather): Wind;
/** Significant wave height, metres: grows with the wind and the open water upwind. */
export declare function waveAt(x: number, y: number, hour: number, weather: Weather): number;
/** The wave field on the grid, for shading and contours. */
export declare function waveField(hour: number, weather: Weather): Float32Array;
/** A rain cell riding the front: centre, radii and strength (0–1) at a forecast hour. */
export declare function rainAt(hour: number): {
    x: number;
    y: number;
    rx: number;
    ry: number;
    k: number;
};
/** Morning fog over Long Holm that lifts in the first hours. */
export declare const fogAt: (hour: number) => number;
export declare const compass: (deg: number) => string;
export {};
