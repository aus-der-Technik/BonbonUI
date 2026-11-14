import type { DivergingPoint } from '../patterns/organisms/DivergingBarChart.svelte';
import type { LinePoint } from '../patterns/organisms/LineChart.svelte';
import type { BarRow } from '../patterns/organisms/HorizontalBarChart.svelte';
import type { GridColumn, GridRow } from '../patterns/organisms/EditableGrid.svelte';
import type { MapMarker } from '../patterns/organisms/MapView.svelte';
import type { ActivityEntry } from '../patterns/organisms/ActivityLog.svelte';
import type { NavGroup } from '../patterns/organisms/SideNav.svelte';
/** A small seeded PRNG (mulberry32), so "random" data is the same on every load. */
export declare function seeded(seed: number): () => number;
export interface DailyStats {
    day: string;
    date: Date;
    thumbsUp: number;
    thumbsDown: number;
    stars: number;
    starsSum: number;
}
export declare function dailyStats(days: number, seed?: number): DailyStats[];
export declare const toDiverging: (daily: DailyStats[]) => DivergingPoint[];
export declare const toAverage: (daily: DailyStats[]) => LinePoint[];
export declare const starDistribution: (seed?: number) => BarRow[];
export interface FeedbackItem {
    id: string;
    receivedAt: string;
    ratingType: 'thumbs' | 'stars';
    ratingValue: string;
    sourceSystem: string;
    sourceVersion?: string;
    sourceEnvironment?: string;
    comment?: string;
    query?: string;
    pageUrl?: string;
}
export declare function feedbackItems(count?: number, seed?: number): FeedbackItem[];
export declare const venueColumns: GridColumn[];
export declare function venueRows(): GridRow[];
export type Endpoint = 'places' | 'landmarks' | 'plz' | 'geo';
export declare const ENDPOINT_HEX: Record<Endpoint, string>;
export declare const ENDPOINTS: {
    id: Endpoint;
    label: string;
    color: string;
}[];
export interface Hit extends MapMarker {
    endpoint: Endpoint;
}
export declare function frankfurtHits(): Hit[];
export type Role = 'admin' | 'editor' | 'viewer';
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: 'active' | 'invited' | 'deactivated';
    team: string;
    lastSeen: string | null;
}
export declare function users(count?: number, seed?: number): User[];
export declare function activity(): ActivityEntry[];
/** The navigation of the example admin suite; `active` is the current page's key. */
export declare function navGroups(active: string): NavGroup[];
export declare const ANSWER = "## Conference venues in Leipzig for 300 people\n\nThree venues fit **300 seated guests** and are within 15 minutes of the main station:\n\n1. **Leipzig Congress Hall** \u2014 plenary hall for up to 3,000, divisible; barrier-free.\n2. **Riverside Hotel** \u2014 ballroom for 400, hotel rooms on site.\n3. **Zoo Pavilion Hall** \u2014 historic hall for 1,000, 10 minutes on foot from the centre.\n\n| Venue | Seats | Barrier-free |\n| --- | --- | --- |\n| Leipzig Congress Hall | 3,000 | yes |\n| Riverside Hotel | 400 | yes |\n| Zoo Pavilion Hall | 1,000 | partly |\n\n> Ask the venues directly for availability \u2014 capacities depend on the seating layout.\n\nSee the [venue finder](https://example.com/venues) for more.";
export interface Workspace {
    id: string;
    name: string;
    volume: string;
    created: string;
    status: 'running' | 'stopped' | 'starting';
}
export declare function workspaces(): Workspace[];
export type OpsJobType = 'crawl' | 'rating' | 'export' | 'classify' | 'archive';
export type OpsJobStatus = 'queued' | 'running' | 'done' | 'failed' | 'cached';
export interface OpsJob {
    id: string;
    name: string;
    type: OpsJobType;
    status: OpsJobStatus;
    owner: string;
    startedAt: string;
    /** Seconds; null while the job has not finished. */
    duration: number | null;
    done: number;
    total: number;
    error?: string;
}
export declare const OPS_JOB_TYPES: Record<OpsJobType, string>;
export declare function opsJobs(): OpsJob[];
export interface OpsDay {
    label: string;
    title: string;
    succeeded: number;
    failed: number;
    rating: number | null;
    rated: number;
}
export declare function opsDaily(days?: number, seed?: number): OpsDay[];
export interface OpsService {
    id: string;
    name: string;
    detail: string;
    status: 'up' | 'degraded' | 'down' | 'maintenance';
}
export declare function opsServices(): OpsService[];
export declare function opsActivity(): ActivityEntry[];
