// Mock data for the Admin console's documents area — collections, versioned documents, the AI
// judge that rates their summaries and the ZIP export — seeded so stories look the same on every
// load.
import { seeded } from './mock';
const END = Date.UTC(2026, 9, 19, 14, 0);
const DAY = 86_400_000;
const pick = (rand, list) => list[Math.floor(rand() * list.length)];
const hex = (rand, length) => Array.from({ length }, () => Math.floor(rand() * 16).toString(16)).join('');
/** A stable number from a string, to seed per-document "randomness". */
const hash = (text) => [...text].reduce((sum, c) => sum + c.charCodeAt(0), 0);
export const CRITERIA = [
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
/** Scores for one rating run; the same document and run always score the same. */
export function scoreDocument(id, run) {
    const rand = seeded(hash(id) * 31 + run);
    const base = 2.6 + rand() * 2.2;
    const score = () => Math.max(1, Math.min(5, Math.round(base + (rand() - 0.5) * 2)));
    return { active: score(), inclusive: score(), focus: score(), restricted: score() };
}
/** Whether rating this document fails in the given run (a few do; retrying usually helps). */
export const ratingFails = (id, run) => seeded(hash(id) + run * 7)() < 0.08;
export const overallScore = (scores) => Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / CRITERIA.length);
export const CONTENT_TYPES = {
    pdf: 'application/pdf',
    html: 'text/html',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    md: 'text/markdown',
    json: 'application/json',
};
export const archiveCollections = [
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
const KEYWORDS = [
    'sustainability',
    'statistics',
    'leipzig',
    'hybrid',
    'accessibility',
    'congress',
    'trends',
];
const SOURCES = ['docs.example.com', 'www.example.com', 'intranet.example.com', 'blog.example.com'];
const NOTES = ['Initial upload', 'Typo fixes', 'Updated figures', 'New layout', 'Re-crawled'];
const SKIP_REASONS = ['Scanned image without text', 'Shorter than 200 words', 'Not in English'];
const FAIL_REASONS = ['Judge timed out after 60 s', 'Model returned invalid JSON'];
function summaryOf(title, keywords) {
    return (`**${title}** sums up the year in three parts.\n\n` +
        `- What changed since the last version, in plain figures\n` +
        `- ${keywords.length ? `Focus: ${keywords.join(', ')}` : 'No special focus'}\n` +
        `- Recommended next steps for the team`);
}
/** The documents of one collection, with their versions and where the judge stands. */
export function archivedDocuments(collection) {
    const owner = archiveCollections.find((c) => c.id === collection);
    const rand = seeded(collection.length * 97 + 13);
    const formats = collection === 'website'
        ? ['html']
        : collection === 'exports'
            ? ['json']
            : ['pdf', 'pdf', 'docx', 'md'];
    return Array.from({ length: owner?.documents ?? 8 }, (_, i) => {
        const format = pick(rand, formats);
        const count = rand() < 0.35 ? 1 : 2 + Math.floor(rand() * 4);
        let at = END - Math.floor(rand() * 40) * DAY;
        let size = Math.round(format === 'html' ? 40_000 + rand() * 600_000 : 200_000 + rand() * 9e6);
        const versions = [];
        for (let v = count; v >= 1; v--) {
            versions.unshift({
                version: v,
                checksum: `sha256:${hex(rand, 64)}`,
                bytes: size,
                contentType: CONTENT_TYPES[format],
                archivedAt: new Date(at).toISOString(),
                note: v === 1 ? 'Initial upload' : pick(rand, NOTES.slice(1)),
            });
            at -= Math.round((3 + rand() * 30) * DAY);
            size = Math.round(size * (0.8 + rand() * 0.3));
        }
        const id = `${collection}-${String(100 + i * 3)}`;
        const title = `${DOC_TITLES[(i * 3 + collection.length) % DOC_TITLES.length]}${format === 'json' ? ' export' : ''}`;
        const keywords = KEYWORDS.filter(() => rand() < 0.25).slice(0, 3);
        const r = rand();
        const rating = format === 'json' || r < 0.08
            ? 'skipped'
            : r < 0.13
                ? 'failed'
                : r < 0.6
                    ? 'rated'
                    : 'unrated';
        const a = rand();
        const doc = {
            id,
            collection,
            title,
            format,
            urn: `urn:example:document:${4700 + hash(id) * 3 + i}`,
            access: a < 0.6 ? 'public' : a < 0.9 ? 'members' : 'restricted',
            keywords,
            source: pick(rand, SOURCES),
            hasOriginal: rand() > 0.25,
            summary: summaryOf(title, keywords),
            versions,
            rating,
        };
        if (rating === 'rated')
            doc.scores = scoreDocument(id, 0);
        if (rating === 'skipped')
            doc.reason = format === 'json' ? 'Data, not prose' : pick(rand, SKIP_REASONS);
        if (rating === 'failed')
            doc.reason = pick(rand, FAIL_REASONS);
        return doc;
    });
}
/** A file just uploaded: one staged version, not rated yet. */
export function stagedDocument(collection, file, n) {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    const format = ext === 'htm' || ext === 'html'
        ? 'html'
        : ext === 'docx'
            ? 'docx'
            : ext === 'md' || ext === 'markdown' || ext === 'txt'
                ? 'md'
                : 'pdf';
    const id = `${collection}-new-${n}`;
    const name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
    const title = name.charAt(0).toUpperCase() + name.slice(1);
    return {
        id,
        collection,
        title,
        format,
        urn: `urn:example:document:staged-${n}`,
        access: 'members',
        keywords: [],
        source: 'upload',
        hasOriginal: true,
        summary: `**${title}** is waiting for the next ingestion run; its summary is written then.`,
        versions: [
            {
                version: 1,
                checksum: 'sha256:pending',
                bytes: file.size,
                contentType: CONTENT_TYPES[format],
                archivedAt: new Date().toISOString(),
                note: 'Staged for the next ingestion run',
            },
        ],
        rating: 'skipped',
        reason: 'Rated after ingestion',
        staged: true,
    };
}
/** The per-item limit of an export. */
export const EXPORT_ITEM_LIMIT = 8 * 1024 * 1024;
/** Which of these documents cannot go into a ZIP, and why. */
export function exportProblems(docs) {
    return docs.flatMap((d) => {
        const latest = d.versions[d.versions.length - 1];
        if (d.access === 'restricted')
            return [
                { id: d.id, code: 'not_public', message: 'Restricted documents stay in the archive.' },
            ];
        if (latest && latest.bytes > EXPORT_ITEM_LIMIT)
            return [{ id: d.id, code: 'too_large', message: 'Larger than the 8 MB limit per item.' }];
        return [];
    });
}
export function exportJob(filename, ids) {
    return {
        id: `exp_${hex(seeded(ids.length * 13 + hash(filename)), 8)}`,
        status: 'pending',
        ids,
        requested: ids.length,
        included: 0,
        failed: 0,
        filename: filename || 'export-2026-10-19.zip',
        bytes: null,
        createdAt: new Date().toISOString(),
        expiresAt: null,
    };
}
