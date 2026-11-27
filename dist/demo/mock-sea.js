export const W = 1000;
export const H = 640;
/** Chart units per nautical mile (the chart spans 24 nm east to west). */
export const NM = W / 24;
/** Simulated seconds per real second: slow enough to read, fast enough to see. */
export const SPEEDUP = 30;
/** The live clock starts here (minutes after midnight), so the example is the same every run. */
export const START_MINUTES = 14 * 60;
// ── Geometry helpers ──────────────────────────────────────────────────────────────────────
/** Catmull-Rom through the points, sampled `steps` times per segment. */
export function smooth(points, closed, steps = 10) {
    const n = points.length;
    const at = (i) => closed ? points[(i + n) % n] : points[Math.max(0, Math.min(n - 1, i))];
    const out = [];
    const segments = closed ? n : n - 1;
    for (let i = 0; i < segments; i++) {
        const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
        for (let s = 0; s < steps; s++) {
            const t = s / steps;
            const t2 = t * t;
            const t3 = t2 * t;
            const f = (a, b, c, d) => 0.5 *
                (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
            out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
        }
    }
    if (!closed)
        out.push(points[n - 1]);
    return out;
}
export const pathOf = (pts, closed = false) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('') +
    (closed ? 'Z' : '');
function inside([x, y], poly) {
    let hit = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i];
        const [xj, yj] = poly[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
            hit = !hit;
    }
    return hit;
}
function segmentDistance([x, y], [ax, ay], [bx, by]) {
    const dx = bx - ax;
    const dy = by - ay;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
    return Math.hypot(x - (ax + t * dx), y - (ay + t * dy));
}
// ── The bay ───────────────────────────────────────────────────────────────────────────────
const coast = [
    [-20, 478],
    [60, 452],
    [108, 408],
    [134, 362],
    [182, 334],
    [232, 318],
    [272, 288],
    [302, 242],
    [352, 214],
    [402, 228],
    [432, 258],
    [470, 272],
    [520, 262],
    [556, 236],
    [592, 190],
    [652, 160],
    [722, 150],
    [792, 120],
    [852, 82],
    [922, 62],
    [1020, 44],
];
const coastLine = smooth(coast, false, 8);
/** The mainland: the smoothed coast, closed along the top edge of the chart. */
const mainland = [...coastLine, [1020, -20], [-20, -20]];
const isle = (cx, cy, rx, ry, wobble) => smooth(wobble.map((k, i) => {
    const a = (i / wobble.length) * Math.PI * 2;
    return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k];
}), true, 6);
const islandShapes = [
    {
        name: 'Gull Isle',
        shape: isle(652, 290, 44, 26, [1, 0.86, 1.08, 0.94, 1.1, 0.9, 1.02, 0.84]),
        label: [652, 294],
    },
    {
        name: 'Long Holm',
        shape: smooth([
            [792, 246],
            [828, 228],
            [880, 232],
            [918, 250],
            [904, 272],
            [858, 270],
            [820, 266],
        ], true, 6),
        label: [858, 254],
    },
    {
        name: 'Lantern Rock',
        shape: isle(382, 424, 11, 9, [1, 0.9, 1.1, 0.95, 1, 0.92]),
        label: [382, 446],
    },
    { name: '', shape: isle(206, 472, 7, 5, [1, 0.8, 1.1, 0.9, 1]), label: [0, 0] },
    { name: '', shape: isle(226, 486, 5, 4, [1, 0.9, 1.1, 0.9, 1]), label: [0, 0] },
];
const land = [mainland, ...islandShapes.map((i) => i.shape)];
export const chart = {
    mainland: pathOf(mainland, true),
    coast: pathOf(coastLine),
    islands: islandShapes.map((i) => ({ name: i.name, d: pathOf(i.shape, true), label: i.label })),
    harbour: {
        label: [470, 252],
        // Two breakwater arms leave a gap at the harbour mouth.
        arms: ['M428 262 Q438 290 452 306', 'M518 262 Q506 290 490 306'],
        quay: 'M444 276 H498',
    },
    lighthouse: [382, 424],
    anchorage: { cx: 770, cy: 540, r: 42 },
    fishing: pathOf(smooth([
        [96, 500],
        [250, 498],
        [350, 560],
        [340, 632],
        [110, 632],
    ], true, 6), true),
};
// ── Shipping lanes: a traffic separation scheme from the open sea to the harbour mouth ─────
const LANE_FROM = [1060, 572];
const LANE_TO = [548, 334];
const laneDir = (() => {
    const dx = LANE_TO[0] - LANE_FROM[0];
    const dy = LANE_TO[1] - LANE_FROM[1];
    const l = Math.hypot(dx, dy);
    return { ux: dx / l, uy: dy / l, nx: -dy / l, ny: dx / l };
})();
const laneAt = (offset, t) => [
    LANE_FROM[0] + (LANE_TO[0] - LANE_FROM[0]) * t + laneDir.nx * offset,
    LANE_FROM[1] + (LANE_TO[1] - LANE_FROM[1]) * t + laneDir.ny * offset,
];
export const lanes = {
    /** Inbound (towards the harbour) and outbound lane centre lines. */
    inbound: pathOf([laneAt(-26, 0), laneAt(-26, 1)]),
    outbound: pathOf([laneAt(26, 1), laneAt(26, 0)]),
    /** The separation zone between them. */
    zone: pathOf([laneAt(-8, 0), laneAt(-8, 1), laneAt(8, 1), laneAt(8, 0)], true),
    /** Lane edges. */
    edges: [pathOf([laneAt(-44, 0), laneAt(-44, 1)]), pathOf([laneAt(44, 0), laneAt(44, 1)])],
    /** Direction arrows along both lanes: position and heading. */
    arrows: [0.18, 0.42, 0.66].flatMap((t) => [
        { p: laneAt(-26, t), heading: bearing(laneDir.ux, laneDir.uy) },
        { p: laneAt(26, t), heading: bearing(-laneDir.ux, -laneDir.uy) },
    ]),
    ferry: [
        pathOf(smooth([
            [478, 304],
            [548, 300],
            [606, 298],
        ], false)),
        pathOf(smooth([
            [478, 300],
            [560, 268],
            [652, 238],
            [742, 240],
            [790, 250],
        ], false)),
    ],
};
/** Compass bearing (0 = north, clockwise) of a screen vector. */
export function bearing(dx, dy) {
    return ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
}
export const shipTypes = [
    { id: 'cargo', label: 'Cargo', color: 'green' },
    { id: 'tanker', label: 'Tanker', color: 'red' },
    { id: 'passenger', label: 'Passenger', color: 'blue' },
    { id: 'fishing', label: 'Fishing', color: 'orange' },
    { id: 'pleasure', label: 'Pleasure', color: 'purple' },
];
const H_IN = [471, 292];
const routeSpecs = {
    // In by the inbound lane, turn in the harbour, out by the outbound lane, back round off-chart.
    lane: {
        points: [
            laneAt(-26, -0.08),
            laneAt(-26, 0.5),
            laneAt(-26, 1),
            [500, 318],
            H_IN,
            [486, 316],
            laneAt(26, 1),
            laneAt(26, 0.5),
            laneAt(26, -0.08),
            [1180, 610],
        ],
        mode: 'loop',
        stops: { 4: 'Kestrel Harbour', 8: 'Open sea' },
    },
    // In to the anchorage and out again.
    anchor: {
        points: [
            laneAt(-26, -0.08),
            laneAt(-26, 0.3),
            [790, 520],
            laneAt(26, 0.28),
            laneAt(26, -0.08),
            [1180, 610],
        ],
        mode: 'loop',
        stops: { 2: 'Outer anchorage', 4: 'Open sea' },
    },
    swing: {
        points: [
            [776, 548],
            [780, 552],
            [776, 556],
            [772, 552],
        ],
        mode: 'loop',
        stops: {},
        station: 'At anchor',
    },
    gull: {
        points: [H_IN, [500, 306], [548, 300], [606, 298]],
        mode: 'pingpong',
        stops: { 0: 'Kestrel Harbour', 3: 'Gull Isle pier' },
    },
    holm: {
        points: [H_IN, [496, 300], [560, 268], [652, 238], [742, 240], [790, 250]],
        mode: 'pingpong',
        stops: { 0: 'Kestrel Harbour', 5: 'Long Holm pier' },
    },
    islands: {
        points: [
            [604, 236],
            [760, 212],
            [944, 236],
            [952, 300],
            [800, 318],
            [700, 330],
            [596, 316],
        ],
        mode: 'loop',
        stops: {},
        station: 'Island sightseeing',
    },
    trawl: {
        points: [
            [124, 524],
            [196, 606],
            [258, 524],
            [328, 604],
        ],
        mode: 'pingpong',
        stops: {},
        station: 'Fishing grounds',
    },
    pots: {
        points: [
            [152, 560],
            [282, 540],
            [302, 612],
            [164, 620],
        ],
        mode: 'loop',
        stops: {},
        station: 'Fishing grounds',
    },
    grounds: {
        points: [H_IN, [470, 318], [418, 352], [330, 452], [240, 544]],
        mode: 'pingpong',
        stops: { 0: 'Kestrel Harbour', 4: 'Fishing grounds' },
    },
    bay: {
        points: [
            [300, 300],
            [396, 316],
            [424, 372],
            [332, 398],
            [258, 362],
        ],
        mode: 'loop',
        stops: {},
        station: 'Sailing in the bay',
    },
    rock: {
        points: [
            [382, 368],
            [440, 424],
            [382, 482],
            [324, 424],
        ],
        mode: 'loop',
        stops: {},
        station: 'Round Lantern Rock',
    },
    dash: {
        points: [
            [498, 304],
            [620, 226],
            [780, 194],
            [934, 204],
            [956, 300],
            [862, 322],
            [720, 342],
            [566, 324],
        ],
        mode: 'loop',
        stops: {},
        station: 'Day trip',
    },
};
function build(id, spec) {
    const steps = 12;
    const closed = spec.mode === 'loop';
    const pts = smooth(spec.points, closed, steps);
    if (closed)
        pts.push(pts[0]);
    const acc = [0];
    for (let i = 1; i < pts.length; i++)
        acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const stops = Object.entries(spec.stops).map(([i, name]) => ({
        at: acc[Math.min(pts.length - 1, Number(i) * steps)],
        name,
    }));
    return { id, mode: spec.mode, pts, acc, length: acc.at(-1), stops, station: spec.station };
}
export const routes = Object.fromEntries(Object.entries(routeSpecs).map(([id, spec]) => [id, build(id, spec)]));
export const ships = [
    {
        id: 'gull',
        name: 'Morning Gull',
        type: 'cargo',
        kn: 13.5,
        route: 'lane',
        start: 0.1,
        length: 142,
    },
    {
        id: 'thread',
        name: 'Northern Thread',
        type: 'cargo',
        kn: 12,
        route: 'lane',
        start: 0.58,
        length: 168,
    },
    {
        id: 'atlas',
        name: 'Patient Atlas',
        type: 'cargo',
        kn: 0.4,
        route: 'swing',
        start: 0,
        length: 190,
    },
    {
        id: 'amber',
        name: 'Amber Tide',
        type: 'tanker',
        kn: 11,
        route: 'anchor',
        start: 0.12,
        length: 183,
    },
    {
        id: 'petrel',
        name: 'Iron Petrel',
        type: 'tanker',
        kn: 10,
        route: 'lane',
        start: 0.34,
        length: 176,
    },
    {
        id: 'shuttle',
        name: 'Island Shuttle',
        type: 'passenger',
        kn: 12,
        route: 'gull',
        start: 0.3,
        length: 48,
    },
    {
        id: 'link',
        name: 'Holm Link',
        type: 'passenger',
        kn: 14,
        route: 'holm',
        start: 0.62,
        length: 64,
    },
    {
        id: 'lantern',
        name: 'Sea Lantern',
        type: 'passenger',
        kn: 9,
        route: 'islands',
        start: 0.2,
        length: 92,
    },
    {
        id: 'tern',
        name: 'Quiet Tern',
        type: 'fishing',
        kn: 4,
        route: 'trawl',
        start: 0.25,
        length: 24,
    },
    {
        id: 'puffin',
        name: 'Little Puffin',
        type: 'fishing',
        kn: 3.5,
        route: 'pots',
        start: 0.6,
        length: 14,
    },
    {
        id: 'harvest',
        name: 'Harvest Wave',
        type: 'fishing',
        kn: 7,
        route: 'grounds',
        start: 0.15,
        length: 21,
    },
    {
        id: 'saltwind',
        name: 'Saltwind',
        type: 'pleasure',
        kn: 5.5,
        route: 'bay',
        start: 0.1,
        length: 12,
    },
    {
        id: 'heron',
        name: 'Blue Heron II',
        type: 'pleasure',
        kn: 6.5,
        route: 'rock',
        start: 0.55,
        length: 10,
    },
    {
        id: 'dancer',
        name: 'Wave Dancer',
        type: 'pleasure',
        kn: 18,
        route: 'dash',
        start: 0.4,
        length: 9,
    },
    {
        id: 'kittiwake',
        name: 'Kittiwake',
        type: 'pleasure',
        kn: 5,
        route: 'bay',
        start: 0.62,
        length: 11,
    },
];
/** Where a ship is `sim` seconds after the start of the example. Pure, so the list and the
 *  chart agree without sharing state. */
export function shipAt(ship, sim) {
    const r = routes[ship.route];
    const perSecond = (ship.kn * NM) / 3600;
    const travelled = ship.start * (r.mode === 'loop' ? r.length : 2 * r.length) + perSecond * sim;
    let d;
    let back = false;
    if (r.mode === 'loop')
        d = travelled % r.length;
    else {
        const m = travelled % (2 * r.length);
        back = m > r.length;
        d = back ? 2 * r.length - m : m;
    }
    // Binary search for the sample before d.
    let lo = 0;
    let hi = r.acc.length - 1;
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (r.acc[mid] <= d)
            lo = mid;
        else
            hi = mid;
    }
    const a = r.pts[lo];
    const b = r.pts[hi];
    const seg = r.acc[hi] - r.acc[lo] || 1;
    const t = (d - r.acc[lo]) / seg;
    const x = a[0] + (b[0] - a[0]) * t;
    const y = a[1] + (b[1] - a[1]) * t;
    const course = (bearing(b[0] - a[0], b[1] - a[1]) + (back ? 180 : 0)) % 360;
    let eta;
    let destination = r.station ?? '';
    if (r.stops.length) {
        const ahead = back
            ? [...r.stops].reverse().find((s) => s.at < d - 0.5)
            : (r.stops.find((s) => s.at > d + 0.5) ?? (r.mode === 'loop' ? r.stops[0] : undefined));
        const stop = ahead ?? r.stops[0];
        const dist = back ? d - stop.at : stop.at >= d ? stop.at - d : r.length - d + stop.at;
        eta = Math.abs(dist) / perSecond;
        destination = stop.name;
    }
    return {
        x,
        y,
        course,
        eta,
        destination,
        onChart: x > -10 && x < W + 10 && y > -10 && y < H + 10,
    };
}
// ── Fields: distance to land, depth and weather ───────────────────────────────────────────
/** Grid spacing of the sampled fields, chart units. */
export const CELL = 10;
export const GX = W / CELL + 1;
export const GY = H / CELL + 1;
let shore;
/** Distance to the nearest land per grid point (0 on land); computed once, on first use. */
export function shoreDistance() {
    if (shore)
        return shore;
    const segs = [];
    for (const poly of land)
        for (let i = 0; i < poly.length; i++)
            segs.push([poly[i], poly[(i + 1) % poly.length]]);
    const field = new Float32Array(GX * GY);
    for (let j = 0; j < GY; j++)
        for (let i = 0; i < GX; i++) {
            const p = [i * CELL, j * CELL];
            if (land.some((poly) => inside(p, poly)))
                continue;
            let best = Infinity;
            for (const [a, b] of segs) {
                // Cheap reject before the exact distance.
                if (Math.abs(a[0] - p[0]) > best + 60 && Math.abs(b[0] - p[0]) > best + 60)
                    continue;
                best = Math.min(best, segmentDistance(p, a, b));
            }
            field[j * GX + i] = best;
        }
    return (shore = field);
}
/** Bilinear lookup in a grid field. */
export function sample(field, x, y) {
    const fx = Math.max(0, Math.min(GX - 1.001, x / CELL));
    const fy = Math.max(0, Math.min(GY - 1.001, y / CELL));
    const i = Math.floor(fx);
    const j = Math.floor(fy);
    const tx = fx - i;
    const ty = fy - j;
    const v = (a, b) => field[b * GX + a];
    return (v(i, j) * (1 - tx) * (1 - ty) +
        v(i + 1, j) * tx * (1 - ty) +
        v(i, j + 1) * (1 - tx) * ty +
        v(i + 1, j + 1) * tx * ty);
}
let depthField;
export function depth() {
    if (depthField)
        return depthField;
    const dist = shoreDistance();
    const field = new Float32Array(GX * GY);
    for (let j = 0; j < GY; j++)
        for (let i = 0; i < GX; i++) {
            const d = dist[j * GX + i];
            const x = i * CELL;
            const y = j * CELL;
            // Deeper offshore, with a gentle swell in the sea floor so contours are not just offsets.
            const floor = 1 + 0.18 * Math.sin(x / 90 + y / 140) + 0.12 * Math.cos(y / 70 - x / 210);
            field[j * GX + i] = d === 0 ? -1 : 72 * (1 - Math.exp(-d / 95)) * floor;
        }
    return (depthField = field);
}
/** Marching squares: one path of line segments where the field crosses `level`. */
export function isoline(field, level) {
    let d = '';
    const lerp = (a, b) => (level - a) / (b - a || 1e-6);
    for (let j = 0; j < GY - 1; j++)
        for (let i = 0; i < GX - 1; i++) {
            const a = field[j * GX + i];
            const b = field[j * GX + i + 1];
            const c = field[(j + 1) * GX + i + 1];
            const e = field[(j + 1) * GX + i];
            const code = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (e > level ? 1 : 0);
            if (code === 0 || code === 15)
                continue;
            const x = i * CELL;
            const y = j * CELL;
            const top = [x + lerp(a, b) * CELL, y];
            const right = [x + CELL, y + lerp(b, c) * CELL];
            const bottom = [x + lerp(e, c) * CELL, y + CELL];
            const left = [x, y + lerp(a, e) * CELL];
            const pairs = {
                1: [[left, bottom]],
                2: [[bottom, right]],
                3: [[left, right]],
                4: [[top, right]],
                5: [
                    [left, top],
                    [bottom, right],
                ],
                6: [[top, bottom]],
                7: [[left, top]],
                8: [[left, top]],
                9: [[top, bottom]],
                10: [
                    [top, right],
                    [left, bottom],
                ],
                11: [[top, right]],
                12: [[left, right]],
                13: [[bottom, right]],
                14: [[left, bottom]],
            }[code];
            for (const [p, q] of pairs)
                d += `M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
        }
    return d;
}
const smoothstep = (a, b, x) => {
    const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
};
/**
 * The forecast wind `hour` hours from now: a south-westerly that veers north-west as a front
 * crosses the bay from the west, strongest as it passes, plus the swirl of a small low moving
 * east along the south edge.
 */
export function windAt(x, y, hour, weather) {
    const peak = weather === 'gale' ? 36 : 22;
    const local = hour - (x - 500) / 260; // the front reaches the west first
    const from = 215 + 85 * smoothstep(5, 13, local);
    const speed0 = 9 + (peak - 9) * Math.exp(-(((local - 10) / 5.5) ** 2));
    const to = ((from + 180) * Math.PI) / 180;
    let u = Math.sin(to) * speed0;
    let v = -Math.cos(to) * speed0;
    // The low: counter-clockwise swirl around a centre moving east.
    const cx = -200 + hour * 58;
    const cy = 720 - hour * 9;
    const dx = x - cx;
    const dy = y - cy;
    const r = Math.hypot(dx, dy) || 1;
    const swirl = (weather === 'gale' ? 12 : 7) * Math.exp(-((r / 300) ** 2));
    u += (dy / r) * swirl;
    v += (-dx / r) * swirl;
    // Land and its lee slow the wind near the shore.
    const near = sample(shoreDistance(), x, y);
    const shelter = 0.6 + 0.4 * smoothstep(0, 60, near);
    u *= shelter;
    v *= shelter;
    const speed = Math.hypot(u, v);
    return { speed, from: (bearing(-u, -v) + 360) % 360, ux: u / (speed || 1), uy: v / (speed || 1) };
}
/** Significant wave height, metres: grows with the wind and the open water upwind. */
export function waveAt(x, y, hour, weather) {
    const d = sample(shoreDistance(), x, y);
    if (d <= 0)
        return 0;
    const w = windAt(x, y, hour, weather);
    const open = 1 - Math.exp(-d / 85);
    // The open sea lies to the south and east, so swell builds towards that corner.
    const exposure = 0.55 + 0.45 * smoothstep(200, 900, x * 0.6 + y * 0.8);
    return Math.max(0, 0.02 * w.speed ** 1.45 * open * exposure);
}
/** The wave field on the grid, for shading and contours. */
export function waveField(hour, weather) {
    const field = new Float32Array(GX * GY);
    for (let j = 0; j < GY; j++)
        for (let i = 0; i < GX; i++)
            field[j * GX + i] = waveAt(i * CELL, j * CELL, hour, weather);
    return field;
}
/** A rain cell riding the front: centre, radii and strength (0–1) at a forecast hour. */
export function rainAt(hour) {
    const t = hour / 24;
    return {
        x: 60 + t * 980,
        y: 600 - t * 420 + Math.sin(t * Math.PI) * 60,
        rx: 110 + 50 * Math.sin(t * Math.PI),
        ry: 70 + 30 * Math.sin(t * Math.PI),
        k: Math.exp(-(((hour - 9) / 7) ** 2)),
    };
}
/** Morning fog over Long Holm that lifts in the first hours. */
export const fogAt = (hour) => Math.max(0, 1 - hour / 5);
export const compass = (deg) => ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(deg / 45) % 8];
