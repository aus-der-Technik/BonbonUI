// Mock data for the stories and the page demos — shaped like the real services' responses,
// generated deterministically so screenshots and stories stay stable.
import type { DivergingPoint } from '../patterns/organisms/DivergingBarChart.svelte';
import type { LinePoint } from '../patterns/organisms/LineChart.svelte';
import type { BarRow } from '../patterns/organisms/HorizontalBarChart.svelte';
import type { GridColumn, GridRow } from '../patterns/organisms/EditableGrid.svelte';
import type { MapMarker } from '../patterns/organisms/MapView.svelte';
import type { ActivityEntry } from '../patterns/organisms/ActivityLog.svelte';
import type { NavGroup } from '../patterns/organisms/SideNav.svelte';
import { dayFormat, longDayFormat } from '../utils/format';

/** A small seeded PRNG (mulberry32), so "random" data is the same on every load. */
export function seeded(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const END = Date.UTC(2026, 9, 19);
const DAY = 86_400_000;

export interface DailyStats {
  day: string;
  date: Date;
  thumbsUp: number;
  thumbsDown: number;
  stars: number;
  starsSum: number;
}

export function dailyStats(days: number, seed = 7): DailyStats[] {
  const rand = seeded(seed);
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(END - (days - 1 - i) * DAY);
    const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
    const volume = weekend ? 0.35 : 1;
    const thumbsUp = Math.round((6 + rand() * 14) * volume);
    const thumbsDown = Math.round((1 + rand() * 5) * volume);
    const stars = rand() < 0.15 ? 0 : Math.round((2 + rand() * 6) * volume);
    const starsSum = Math.round(stars * (3.4 + rand() * 1.3));
    return { day: date.toISOString().slice(0, 10), date, thumbsUp, thumbsDown, stars, starsSum };
  });
}

export const toDiverging = (daily: DailyStats[]): DivergingPoint[] =>
  daily.map((d) => ({
    label: dayFormat.format(d.date),
    title: longDayFormat.format(d.date),
    up: d.thumbsUp,
    down: d.thumbsDown,
  }));

export const toAverage = (daily: DailyStats[]): LinePoint[] =>
  daily.map((d) => ({
    label: dayFormat.format(d.date),
    title: longDayFormat.format(d.date),
    value: d.stars ? d.starsSum / d.stars : null,
    count: d.stars,
  }));

export const starDistribution = (seed = 3): BarRow[] => {
  const rand = seeded(seed);
  const counts = [12, 18, 41, 96, 133].map((n) => Math.round(n * (0.8 + rand() * 0.4)));
  return [5, 4, 3, 2, 1].map((s) => ({
    label: `${s}★`,
    title: `${s} ${s === 1 ? 'star' : 'stars'}`,
    value: counts[s - 1] ?? 0,
    color: `var(--star-${s})`,
  }));
};

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

const COMMENTS = [
  'The answer cited an outdated venue capacity.',
  'Super schnell, genau das Hotel gefunden.',
  'Results for Leipzig showed venues in Halle first.',
  'Please add filters for barrier-free venues.',
  'Die KI-Antwort war hilfreich, aber zu lang.',
  undefined,
  undefined,
  'Map pins were off by a few hundred metres.',
];
const QUERIES = [
  'Tagungshotels in Leipzig mit 300 Plätzen',
  'nachhaltige Eventlocation Hamburg',
  'Kongresszentrum Bayern',
  'Kongresszentrum Darmstadt Kapazität',
];
const SOURCES = ['chat-assistant', 'chat-assistant', 'chat-assistant', 'website', 'mobile-app'];

export function feedbackItems(count = 137, seed = 11): FeedbackItem[] {
  const rand = seeded(seed);
  const pick = <T>(list: readonly T[]): T => list[Math.floor(rand() * list.length)] as T;
  let at = END + 15 * 3_600_000;
  return Array.from({ length: count }, (_, i) => {
    at -= Math.round(rand() * 9 * 3_600_000);
    const thumbs = rand() < 0.7;
    const comment = pick(COMMENTS);
    const item: FeedbackItem = {
      id: `fb-${String(i + 1).padStart(4, '0')}`,
      receivedAt: new Date(at).toISOString(),
      ratingType: thumbs ? 'thumbs' : 'stars',
      ratingValue: thumbs ? (rand() < 0.78 ? 'up' : 'down') : String(1 + Math.floor(rand() * 5)),
      sourceSystem: pick(SOURCES),
      sourceVersion: `1.${Math.floor(rand() * 9)}.${Math.floor(rand() * 20)}`,
      sourceEnvironment: rand() < 0.85 ? 'prod' : 'stage',
      query: pick(QUERIES),
      pageUrl: 'https://www.example.com/search',
    };
    if (comment) item.comment = comment;
    return item;
  });
}

export const venueColumns: GridColumn[] = [
  { name: 'id', type: 'BIGINT', locked: true },
  { name: 'name', type: 'VARCHAR' },
  { name: 'city', type: 'VARCHAR' },
  { name: 'capacity', type: 'INTEGER' },
  { name: 'barrier_free', type: 'BOOLEAN' },
  { name: 'rating', type: 'DOUBLE' },
  { name: 'notes', type: 'VARCHAR' },
  { name: 'updated_at', type: 'TIMESTAMP', locked: true },
];

export function venueRows(): GridRow[] {
  const venues: [string, string, number, boolean | null, number | null, string | null][] = [
    [
      'Science Congress Centre',
      'Darmstadt',
      4000,
      true,
      4.6,
      'Eco certified; plenary hall divisible into three.',
    ],
    ['Leipzig Congress Hall', 'Leipzig', 3000, true, 4.4, null],
    ['Spa Town Kurhaus', 'Baden-Baden', 2500, false, 4.2, 'Renovation of hall 2 until spring.'],
    ['Elbe Exhibition Centre', 'Dresden', 6000, true, null, null],
    ['Grand Hotel Altstadt', 'München', 2500, null, 4.8, 'Contact via events team only.'],
    ['Kurhaus am Park', 'Wiesbaden', 2200, false, 4.5, null],
    ['Harbour Fair & Congress', 'Hamburg', 12000, true, 4.3, 'Main hall reopened 2024.'],
    ['Old Town Ballroom', 'Köln', 1400, true, 4.1, null],
  ];
  return venues.map(([name, city, capacity, barrierFree, rating, notes], i) => ({
    id: 1001 + i,
    name,
    city,
    capacity,
    barrier_free: barrierFree,
    rating,
    notes,
    updated_at: `2026-10-${String(10 + i).padStart(2, '0')} 09:${String(12 + i * 3).padStart(2, '0')}`,
  }));
}

export type Endpoint = 'places' | 'landmarks' | 'plz' | 'geo';

export const ENDPOINTS: { id: Endpoint; label: string; color: string }[] = [
  { id: 'places', label: 'Places', color: 'var(--series-1)' },
  { id: 'landmarks', label: 'Landmarks', color: 'var(--series-2)' },
  { id: 'plz', label: 'Postal codes', color: 'var(--series-3)' },
  { id: 'geo', label: 'Nearby', color: 'var(--series-4)' },
];

// Leaflet paints SVG markers with literal colours, not CSS variables.
export const ENDPOINT_HEX: Record<Endpoint, string> = {
  places: '#e3000f',
  landmarks: '#2a78d6',
  plz: '#16a34a',
  geo: '#eda100',
};

export interface Hit extends MapMarker {
  endpoint: Endpoint;
}

export function frankfurtHits(): Hit[] {
  const rand = seeded(5);
  const base: Hit[] = [
    {
      endpoint: 'places',
      lat: 50.1109,
      lon: 8.6821,
      title: 'Frankfurt am Main',
      subtitle: 'Place · Hessen',
      color: ENDPOINT_HEX.places,
      details: [
        ['Population', '773.068'],
        ['State', 'Hessen'],
      ],
    },
    {
      endpoint: 'landmarks',
      lat: 50.1071,
      lon: 8.6638,
      title: 'Frankfurt (Main) Hbf',
      subtitle: 'Main station',
      color: ENDPOINT_HEX.landmarks,
      details: [['IBNR', '8000105']],
    },
    {
      endpoint: 'landmarks',
      lat: 50.0379,
      lon: 8.5622,
      title: 'Frankfurt Airport',
      subtitle: 'Airport · FRA',
      color: ENDPOINT_HEX.landmarks,
      details: [
        ['IATA', 'FRA'],
        ['ICAO', 'EDDF'],
      ],
    },
    {
      endpoint: 'plz',
      lat: 50.1125,
      lon: 8.6833,
      title: '60311',
      subtitle: 'Postal code · Frankfurt am Main',
      color: ENDPOINT_HEX.plz,
      details: [['District', 'Innenstadt']],
    },
  ];
  const nearby: Hit[] = Array.from({ length: 14 }, () => {
    const lat = 50.11 + (rand() - 0.5) * 0.3;
    const lon = 8.68 + (rand() - 0.5) * 0.45;
    return {
      endpoint: 'geo',
      lat,
      lon,
      title: String(60000 + Math.floor(rand() * 999)),
      subtitle: `Postal code · ${(rand() * 15).toFixed(1)} km away`,
      color: ENDPOINT_HEX.geo,
      radius: 6,
      details: [['Lat / Lon', `${lat.toFixed(4)}, ${lon.toFixed(4)}`]],
    };
  });
  return [...base, ...nearby];
}

// ---------------------------------------------------------------- users & activity

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

const FIRST = [
  'Jane',
  'Max',
  'Lena',
  'Tobias',
  'Aylin',
  'Jonas',
  'Mia',
  'Felix',
  'Sara',
  'Paul',
  'Emma',
  'Noah',
  'Hannah',
  'Lukas',
];
const LAST = [
  'Doe',
  'Mustermann',
  'Schmidt',
  'Wagner',
  'Yilmaz',
  'Becker',
  'Hoffmann',
  'Koch',
  'Richter',
  'Klein',
  'Wolf',
  'Neumann',
  'Braun',
  'Krüger',
];
const TEAMS = ['Marketing', 'Research', 'Sales', 'Operations'];

export function users(count = 23, seed = 17): User[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, i) => {
    const first = FIRST[i % FIRST.length] ?? 'Jane';
    const last = LAST[(i * 5) % LAST.length] ?? 'Doe';
    const r = rand();
    const status: User['status'] = r < 0.12 ? 'invited' : r < 0.2 ? 'deactivated' : 'active';
    return {
      id: `usr_${(0x2b6c1e + i * 7919).toString(16)}`,
      name: `${first} ${last}`,
      email: `${first}.${last}`.toLowerCase().replace('ü', 'ue') + '@example.com',
      role: i === 0 ? 'admin' : rand() < 0.15 ? 'admin' : rand() < 0.55 ? 'editor' : 'viewer',
      status,
      team: TEAMS[Math.floor(rand() * TEAMS.length)] ?? 'Research',
      lastSeen:
        status === 'invited' ? null : new Date(END - Math.floor(rand() * 20 * DAY)).toISOString(),
    };
  });
}

export function activity(): ActivityEntry[] {
  const at = (hoursAgo: number) => new Date(END + 14 * 3_600_000 - hoursAgo * 3_600_000);
  return [
    {
      id: 'a1',
      actor: 'Jane Doe',
      action: 'changed the role of',
      target: 'Max Mustermann',
      detail: 'viewer → editor',
      at: at(1),
      tone: 'warn',
    },
    { id: 'a2', actor: 'Lena Schmidt', action: 'edited 3 rows in', target: 'Venues', at: at(3) },
    {
      id: 'a3',
      actor: 'Jane Doe',
      action: 'invited',
      target: 'aylin.yilmaz@example.com',
      at: at(20),
      tone: 'ok',
    },
    {
      id: 'a4',
      actor: 'Tobias Wagner',
      action: 'deleted the API token',
      target: 'CI pipeline',
      at: at(28),
      tone: 'danger',
    },
    { id: 'a5', actor: 'Jonas Becker', action: 'signed in from a new device', at: at(50) },
  ];
}

/** The navigation of the example admin suite; `active` is the current page's key. */
export function navGroups(active: string): NavGroup[] {
  const item = (
    key: string,
    label: string,
    icon: NonNullable<NavGroup['items'][number]['icon']>,
    count?: number,
  ) => ({
    label,
    href: `#${key}`,
    icon,
    active: key === active,
    ...(count != null ? { count } : {}),
  });
  return [
    {
      label: 'Workspace',
      items: [
        item('insights', 'Insights', 'chart'),
        item('locations', 'Locations', 'map'),
        item('data', 'Data editor', 'table'),
      ],
    },
    {
      label: 'Administration',
      items: [item('users', 'Users', 'users', 23), item('settings', 'Settings', 'settings')],
    },
  ];
}

// ---------------------------------------------------------------- assistant & workspaces

export const ANSWER = `## Conference venues in Leipzig for 300 people

Three venues fit **300 seated guests** and are within 15 minutes of the main station:

1. **Leipzig Congress Hall** — plenary hall for up to 3,000, divisible; barrier-free.
2. **Hotel am Ring** — ballroom for 400, hotel rooms on site.
3. **Zoo Pavilion Hall** — historic hall for 1,000, 10 minutes on foot from the centre.

| Venue | Seats | Barrier-free |
| --- | --- | --- |
| Leipzig Congress Hall | 3,000 | yes |
| Hotel am Ring | 400 | yes |
| Zoo Pavilion Hall | 1,000 | partly |

> Ask the venues directly for availability — capacities depend on the seating layout.

See the [venue finder](https://example.com/venues) for more.`;

export interface Workspace {
  id: string;
  name: string;
  volume: string;
  created: string;
  status: 'running' | 'stopped' | 'starting';
}

export function workspaces(): Workspace[] {
  return [
    {
      id: 'w1',
      name: 'analytics-notebooks',
      volume: 'data-1 · 2Gi',
      created: '12.10.2026',
      status: 'running',
    },
    {
      id: 'w2',
      name: 'import-scripts',
      volume: 'data-2 · 1Gi',
      created: '03.10.2026',
      status: 'stopped',
    },
    {
      id: 'w3',
      name: 'report-builder',
      volume: 'data-1 · 2Gi',
      created: '19.10.2026',
      status: 'starting',
    },
  ];
}

// ---------------------------------------------------------------- documents

export interface DocumentRow {
  urn: string;
  title: string;
  access: 'public' | 'members' | 'unknown';
  rating: number | null;
  bytes: number;
  keywords: string[];
  hasOriginal: boolean;
  summary: string;
}

export function documents(): DocumentRow[] {
  const rand = seeded(23);
  const titles = [
    'Meetings & Conventions Report 2026',
    'Green Meetings Guide',
    'Venue Capacity Survey Leipzig',
    'Destination Factsheet',
    'Hybrid Events Checklist',
    'Congress Statistics Q3',
    'Barrier-free Venues Overview',
    'Association Meetings Study',
    'Travel Grants Guidelines',
    'MICE Trends Outlook',
    'Event Safety Handbook',
  ];
  const kws = [
    'nachhaltigkeit',
    'statistik',
    'leipzig',
    'hybrid',
    'barrierefrei',
    'kongress',
    'trends',
  ];
  return titles.map((title, i) => ({
    urn: `urn:example:document:${4700 + i * 13}`,
    title,
    access:
      (['public', 'public', 'members', 'unknown'] as const)[Math.floor(rand() * 4)] ?? 'public',
    rating: rand() < 0.2 ? null : Math.round((2.5 + rand() * 2.5) * 2) / 2,
    bytes: Math.round(80_000 + rand() * 9_000_000),
    keywords: kws.filter(() => rand() < 0.3).slice(0, 3),
    hasOriginal: rand() > 0.25,
    summary: `**${title}** covers the key figures for 2026.\n\n- Main finding one\n- Main finding two\n- Recommended next steps`,
  }));
}

// ---------------------------------------------------------------- operations overview

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

export const OPS_JOB_TYPES: Record<OpsJobType, string> = {
  crawl: 'Crawl & extract',
  rating: 'Quality rating',
  export: 'Bundle export',
  classify: 'Classifier probe',
  archive: 'Archive sync',
};

export function opsJobs(): OpsJob[] {
  const rand = seeded(41);
  const names: [string, OpsJobType][] = [
    ['Venue pages · example.com/venues', 'crawl'],
    ['Rate all reports', 'rating'],
    ['Press kit bundle', 'export'],
    ['Probe matrix · EN', 'classify'],
    ['Nightly archive sync', 'archive'],
    ['Event calendar · example.com/events', 'crawl'],
    ['Re-rate failed summaries', 'rating'],
    ['Member documents bundle', 'export'],
    ['Probe matrix · DE', 'classify'],
    ['Partner pages · example.com/partners', 'crawl'],
    ['Hourly archive sync', 'archive'],
    ['Rate new guides', 'rating'],
  ];
  const owners = ['jane.doe@example.com', 'max.mustermann@example.com', 'scheduler'];
  const statuses: OpsJobStatus[] = [
    'running',
    'running',
    'queued',
    'done',
    'done',
    'failed',
    'done',
    'cached',
    'done',
    'failed',
    'done',
    'done',
  ];
  let at = END + 14 * 3_600_000;
  return names.map(([name, type], i) => {
    at -= Math.round((0.2 + rand() * 1.4) * 3_600_000);
    const status = statuses[i] ?? 'done';
    const total = type === 'crawl' ? 37 : type === 'export' ? 25 : type === 'classify' ? 40 : 120;
    const done =
      status === 'running'
        ? Math.round(total * (0.3 + rand() * 0.5))
        : status === 'queued'
          ? 0
          : status === 'failed'
            ? Math.round(total * rand() * 0.6)
            : total;
    const job: OpsJob = {
      id: `job_${(0x51a2 + i * 977).toString(16)}`,
      name,
      type,
      status,
      owner: owners[i % owners.length] ?? 'scheduler',
      startedAt: new Date(at).toISOString(),
      duration: status === 'running' || status === 'queued' ? null : Math.round(40 + rand() * 600),
      done,
      total,
    };
    if (status === 'failed') {
      job.error = type === 'crawl' ? 'Start URL answered 503 five times' : 'Judge timed out';
    }
    return job;
  });
}

export interface OpsDay {
  label: string;
  title: string;
  succeeded: number;
  failed: number;
  rating: number | null;
  rated: number;
}

export function opsDaily(days = 14, seed = 43): OpsDay[] {
  const rand = seeded(seed);
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(END - (days - 1 - i) * DAY);
    const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
    const volume = weekend ? 0.4 : 1;
    const rated = Math.round((40 + rand() * 120) * volume);
    return {
      label: dayFormat.format(date),
      title: longDayFormat.format(date),
      succeeded: Math.round((60 + rand() * 70) * volume),
      failed: Math.round((1 + rand() * 9) * volume),
      rating: rated ? 3.6 + rand() * 0.9 : null,
      rated,
    };
  });
}

export interface OpsService {
  id: string;
  name: string;
  detail: string;
  status: 'up' | 'degraded' | 'down' | 'maintenance';
}

export function opsServices(): OpsService[] {
  return [
    { id: 's1', name: 'Crawler', detail: '4 workers · p95 1.8 s', status: 'up' },
    { id: 's2', name: 'Judge model', detail: 'p95 6.4 s · 2 % timeouts', status: 'degraded' },
    { id: 's3', name: 'Classifier', detail: 'v3.2 · p95 120 ms', status: 'up' },
    { id: 's4', name: 'Export storage', detail: '61 % used', status: 'up' },
    { id: 's5', name: 'Archive index', detail: 'Reindex until 16:00', status: 'maintenance' },
  ];
}

export function opsActivity(): ActivityEntry[] {
  const at = (minutesAgo: number) => new Date(END + 14 * 3_600_000 - minutesAgo * 60_000);
  return [
    {
      id: 'o1',
      actor: 'scheduler',
      action: 'started',
      target: 'Venue pages · example.com/venues',
      at: at(4),
    },
    {
      id: 'o2',
      actor: 'Partner pages crawl',
      action: 'failed after 5 attempts',
      detail: 'Start URL answered 503',
      at: at(26),
      tone: 'danger',
    },
    {
      id: 'o3',
      actor: 'Jane Doe',
      action: 'downloaded',
      target: 'press-kit.zip',
      detail: '22 of 25 items · 48.2 MB',
      at: at(55),
      tone: 'ok',
    },
    {
      id: 'o4',
      actor: 'Max Mustermann',
      action: 'changed the judge criteria of',
      target: 'Quality rating',
      at: at(130),
      tone: 'warn',
    },
    { id: 'o5', actor: 'Jane Doe', action: 'cleared the answer cache', at: at(240) },
    {
      id: 'o6',
      actor: 'scheduler',
      action: 'archived',
      target: '312 documents',
      at: at(420),
      tone: 'ok',
    },
  ];
}
