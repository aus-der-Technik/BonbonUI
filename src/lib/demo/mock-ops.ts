// Mock data for the operations example pages (quality rating, bundle export, archive browser),
// seeded so the stories look the same on every load.
import { seeded } from './mock';

const END = Date.UTC(2026, 9, 19, 14, 0);
const DAY = 86_400_000;

const pick = <T>(rand: () => number, list: readonly T[]): T =>
  list[Math.floor(rand() * list.length)] as T;

const hex = (rand: () => number, length: number) =>
  Array.from({ length }, () => Math.floor(rand() * 16).toString(16)).join('');

// ---------------------------------------------------------------- quality rating

export type CriterionKey = 'active' | 'inclusive' | 'focus' | 'restricted';

export const CRITERIA: { key: CriterionKey; label: string; description: string }[] = [
  {
    key: 'active',
    label: 'Active wording',
    description: 'Prefers active verbs over passive constructions.',
  },
  {
    key: 'inclusive',
    label: 'Inclusive language',
    description: 'Addresses every reader; no gendered defaults.',
  },
  {
    key: 'focus',
    label: 'Focus on main points',
    description: 'Leads with the essentials, keeps detail for later.',
  },
  {
    key: 'restricted',
    label: 'No restricted mentions',
    description: 'Names no competitors, prices or internal projects.',
  },
];

export type RatingStatus = 'skipped' | 'unrated' | 'queued' | 'failed' | 'rated';

export interface RatedDocument {
  id: string;
  title: string;
  type: 'pdf' | 'html' | 'docx' | 'md';
  version: number;
  bytes: number;
  source: string;
  status: RatingStatus;
  /** 1–5 per criterion, once rated. */
  scores?: Record<CriterionKey, number>;
  /** Why it was skipped or failed. */
  reason?: string;
}

const DOC_TITLES = [
  'Annual Report',
  'Onboarding Handbook',
  'Travel Policy',
  'Product Overview',
  'Press Kit',
  'Event Checklist',
  'Security Guidelines',
  'Partner Programme',
  'Sustainability Statement',
  'Support Playbook',
  'Brand Guidelines',
  'Quarterly Newsletter',
  'Accessibility Statement',
  'Pricing FAQ',
  'Release Notes',
  'Data Protection Notice',
  'Workshop Agenda',
  'Case Study',
  'Venue Factsheet',
  'Hiring Guide',
];
const SOURCES = ['docs.example.com', 'www.example.com', 'intranet.example.com', 'blog.example.com'];
const SKIP_REASONS = ['Scanned image without text', 'Shorter than 200 words', 'Not in English'];
const FAIL_REASONS = ['Judge timed out after 60 s', 'Model returned invalid JSON'];

/** Scores for one rating run; the same document and run always score the same. */
export function scoreDocument(id: string, run: number): Record<CriterionKey, number> {
  const rand = seeded([...id].reduce((sum, c) => sum + c.charCodeAt(0), 0) * 31 + run);
  const base = 2.6 + rand() * 2.2;
  const score = () => Math.max(1, Math.min(5, Math.round(base + (rand() - 0.5) * 2)));
  return { active: score(), inclusive: score(), focus: score(), restricted: score() };
}

/** Whether rating this document fails in the given run (a few do, retrying usually helps). */
export const ratingFails = (id: string, run: number): boolean =>
  seeded([...id].reduce((sum, c) => sum + c.charCodeAt(0), 0) + run * 7)() < 0.08;

export const overallScore = (scores: Record<CriterionKey, number>): number =>
  Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / CRITERIA.length);

export function ratedDocuments(count = 40, seed = 31): RatedDocument[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, i) => {
    const id = `doc-${String(2100 + i * 7)}`;
    const r = rand();
    const status: RatingStatus =
      r < 0.08 ? 'skipped' : r < 0.12 ? 'failed' : r < 0.6 ? 'rated' : 'unrated';
    const doc: RatedDocument = {
      id,
      title: `${pick(rand, DOC_TITLES)} ${2024 + Math.floor(rand() * 3)}`,
      type: pick(rand, ['pdf', 'pdf', 'html', 'html', 'docx', 'md'] as const),
      version: 1 + Math.floor(rand() * 5),
      bytes: Math.round(12_000 + rand() * 6_000_000),
      source: pick(rand, SOURCES),
      status,
    };
    if (status === 'rated') doc.scores = scoreDocument(id, 0);
    if (status === 'skipped') doc.reason = pick(rand, SKIP_REASONS);
    if (status === 'failed') doc.reason = pick(rand, FAIL_REASONS);
    return doc;
  });
}

// ---------------------------------------------------------------- bundle export

export type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'expired';

export interface ExportJob {
  id: string;
  status: ExportStatus;
  requested: number;
  /** Items packed so far (all of them once completed). */
  included: number;
  failed: number;
  filename: string;
  bytes: number | null;
  createdAt: string;
  expiresAt: string | null;
  /** Why the whole job failed. */
  error?: string;
}

export interface ExportError {
  id: string;
  code: 'not_found' | 'not_public' | 'too_large';
  message: string;
}

/** 25 document ids to paste into the export form. */
export const exportIds: string[] = Array.from(
  { length: 25 },
  (_, i) => `doc-${String(3200 + i * 11)}`,
);

export const exportErrors: ExportError[] = [
  { id: 'doc-3233', code: 'not_found', message: 'No document with this id exists.' },
  {
    id: 'doc-3299',
    code: 'not_public',
    message: 'The document is restricted to members and cannot be exported.',
  },
  {
    id: 'doc-3420',
    code: 'too_large',
    message: 'The original is 812 MB; the limit per item is 250 MB.',
  },
];

export function exportJob(filename: string, requested: number): ExportJob {
  return {
    id: 'exp_7f3a9c2e',
    status: 'pending',
    requested,
    included: 0,
    failed: 0,
    filename: filename || 'export-2026-10-19.zip',
    bytes: null,
    createdAt: new Date(END).toISOString(),
    expiresAt: null,
  };
}

// ---------------------------------------------------------------- versioned archive

export interface ArchiveCollection {
  id: string;
  name: string;
  description: string;
  documents: number;
  bytes: number;
  updatedAt: string;
}

export interface ArchivedVersion {
  version: number;
  checksum: string;
  bytes: number;
  contentType: string;
  archivedAt: string;
  note: string;
}

export interface ArchivedDocument {
  id: string;
  collection: string;
  title: string;
  format: 'pdf' | 'html' | 'docx' | 'md' | 'json';
  /** Oldest first; the last one is the latest. */
  versions: ArchivedVersion[];
}

export const CONTENT_TYPES: Record<ArchivedDocument['format'], string> = {
  pdf: 'application/pdf',
  html: 'text/html',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  md: 'text/markdown',
  json: 'application/json',
};

export const archiveCollections: ArchiveCollection[] = [
  {
    id: 'reports',
    name: 'Reports',
    description: 'Annual and quarterly reports',
    documents: 14,
    bytes: 182_400_000,
    updatedAt: '2026-10-18T09:12:00Z',
  },
  {
    id: 'policies',
    name: 'Policies',
    description: 'Internal guidelines and policies',
    documents: 11,
    bytes: 21_700_000,
    updatedAt: '2026-10-12T15:40:00Z',
  },
  {
    id: 'website',
    name: 'Website snapshots',
    description: 'Crawled pages of www.example.com',
    documents: 16,
    bytes: 9_800_000,
    updatedAt: '2026-10-19T06:00:00Z',
  },
  {
    id: 'exports',
    name: 'Data exports',
    description: 'Nightly JSON exports of the catalogue',
    documents: 9,
    bytes: 64_300_000,
    updatedAt: '2026-10-19T02:30:00Z',
  },
];

const NOTES = ['Initial upload', 'Typo fixes', 'Updated figures', 'New layout', 'Re-crawled'];

export function archivedDocuments(collection: string): ArchivedDocument[] {
  const owner = archiveCollections.find((c) => c.id === collection);
  const rand = seeded(collection.length * 97 + 13);
  const formats: ArchivedDocument['format'][] =
    collection === 'website'
      ? ['html']
      : collection === 'exports'
        ? ['json']
        : ['pdf', 'pdf', 'docx', 'md'];
  return Array.from({ length: owner?.documents ?? 8 }, (_, i) => {
    const format = pick(rand, formats);
    const count = rand() < 0.35 ? 1 : 2 + Math.floor(rand() * 4);
    let at = END - Math.floor(rand() * 40) * DAY;
    let bytes = Math.round(format === 'html' ? 40_000 + rand() * 600_000 : 200_000 + rand() * 9e6);
    const versions: ArchivedVersion[] = [];
    for (let v = count; v >= 1; v--) {
      versions.unshift({
        version: v,
        checksum: `sha256:${hex(rand, 64)}`,
        bytes,
        contentType: CONTENT_TYPES[format],
        archivedAt: new Date(at).toISOString(),
        note: v === 1 ? 'Initial upload' : pick(rand, NOTES.slice(1)),
      });
      at -= Math.round((3 + rand() * 30) * DAY);
      bytes = Math.round(bytes * (0.8 + rand() * 0.3));
    }
    return {
      id: `${collection}-${String(100 + i * 3)}`,
      collection,
      title: `${DOC_TITLES[(i * 3 + collection.length) % DOC_TITLES.length]}${format === 'json' ? ' export' : ''}`,
      format,
      versions,
    };
  });
}
