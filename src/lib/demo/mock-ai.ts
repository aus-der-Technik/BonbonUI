// Mock data for the AI tooling pages (crawl & extract, classifier bench, prompt playground) —
// deterministic, so stories and screenshots stay stable.
import { seeded } from './mock';

// ---------------------------------------------------------------- crawl & extract

export interface CrawledPage {
  id: string;
  title: string;
  url: string;
  /** The extracted answer, split into the chunks the model returned. */
  chunks: string[];
}

const PAGE_TOPICS: [string, string][] = [
  ['Venue overview', 'venues'],
  ['Plenary hall', 'venues/plenary-hall'],
  ['Meeting rooms', 'venues/meeting-rooms'],
  ['Floor plans', 'venues/floor-plans'],
  ['Catering', 'services/catering'],
  ['Technical equipment', 'services/av-equipment'],
  ['Accessibility', 'accessibility'],
  ['Getting here', 'travel/arrival'],
  ['Parking', 'travel/parking'],
  ['Hotels nearby', 'travel/hotels'],
  ['Sustainability', 'about/sustainability'],
  ['Event calendar', 'events'],
  ['Contact', 'contact'],
];

export function crawledPages(count = 37, seed = 41): CrawledPage[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, i) => {
    const [title, path] = PAGE_TOPICS[i % PAGE_TOPICS.length] ?? ['Page', 'page'];
    const round = Math.floor(i / PAGE_TOPICS.length);
    const chunkCount = 1 + Math.floor(rand() * 3);
    const seats = 80 + Math.round(rand() * 40) * 10;
    const rooms = 4 + Math.floor(rand() * 18);
    const chunks = [
      `The page describes **${rooms} rooms** for up to **${seats} guests**. ` +
        `Daylight in all rooms; the largest can be divided into three.`,
      `- Barrier-free access: ${rand() < 0.7 ? 'yes, lifts on every floor' : 'partly, ground floor only'}\n` +
        `- Wi-Fi: ${rand() < 0.8 ? 'included' : 'on request'}\n- Catering: in-house`,
      `> Prices are on request only. The page links to a contact form and a PDF brochure.`,
    ].slice(0, chunkCount);
    return {
      id: `page-${i + 1}`,
      title: round ? `${title} (${round + 1})` : title,
      url: `https://www.example.com/${path}${round ? `?page=${round + 1}` : ''}`,
      chunks,
    };
  });
}

export const CRAWL_SYSTEM_PROMPT =
  'You extract facts about event venues from web pages. Answer in short Markdown; never invent figures.';

export const CRAWL_TEMPLATE = `Page content:
{{content}}

List the rooms, their capacity and whether they are barrier-free.`;

// ---------------------------------------------------------------- classifier bench

export const CLASSES = ['question', 'task', 'oneword', 'statement', 'other'] as const;
export type InputClass = (typeof CLASSES)[number];

export const FACETS = [
  'location',
  'time',
  'person',
  'organisation',
  'topic',
  'quantity',
  'price',
  'contact',
] as const;
export type Facet = (typeof FACETS)[number];

export type FacetSource = 'model' | 'ner' | 'both';

export interface FacetHit {
  key: Facet;
  value: string;
  source: FacetSource;
}

export interface Classification {
  input: string;
  class: InputClass;
  confidence: number;
  language: 'de' | 'en';
  facets: FacetHit[];
  model: string;
  took_ms: number;
}

const FACET_VALUES: Record<Facet, { en: string; de: string; source: FacetSource }> = {
  location: { en: 'Leipzig', de: 'Leipzig', source: 'both' },
  time: { en: 'next Friday', de: 'nächsten Freitag', source: 'ner' },
  person: { en: 'Jane Doe', de: 'Jane Doe', source: 'ner' },
  organisation: { en: 'the city museum', de: 'das Stadtmuseum', source: 'model' },
  topic: { en: 'sustainability', de: 'Nachhaltigkeit', source: 'model' },
  quantity: { en: '300 people', de: '300 Personen', source: 'both' },
  price: { en: 'under 50 euros', de: 'unter 50 Euro', source: 'ner' },
  contact: { en: 'events@example.com', de: 'events@example.com', source: 'both' },
};

const PROBE_TEMPLATES: Record<InputClass, { en: string; de: string }> = {
  question: { en: 'Which venues are free {x}?', de: 'Welche Locations sind {x} frei?' },
  task: { en: 'Find a venue for {x}', de: 'Finde eine Location für {x}' },
  oneword: { en: '{x}', de: '{x}' },
  statement: {
    en: 'We are planning a conference with {x}.',
    de: 'Wir planen eine Konferenz mit {x}.',
  },
  other: { en: '?? {x} !!', de: '?? {x} !!' },
};

/** The canned input of one probe-matrix cell. */
export function probeInput(cls: InputClass, facet: Facet, lang: 'de' | 'en'): string {
  return PROBE_TEMPLATES[cls][lang].replace('{x}', FACET_VALUES[facet][lang]);
}

// Cells where the (mock) model disagrees with the expectation — what the bench is for.
const MISSES: Partial<Record<`${InputClass}×${Facet}`, InputClass>> = {
  'question×time': 'statement',
  'oneword×quantity': 'other',
  'statement×price': 'task',
  'other×person': 'statement',
  'oneword×contact': 'other',
};

const GERMAN =
  /\b(der|die|das|und|ich|wir|wo|wie|gibt|für|mit|eine?|sind|nächsten|finde)\b|[äöüß]/i;
const TASK = /^(find|show|list|book|send|give|finde|zeige|suche|buche|schick)\b/i;

function detect(text: string): FacetHit[] {
  const hits: FacetHit[] = [];
  for (const facet of FACETS) {
    const { en, de, source } = FACET_VALUES[facet];
    const found = [en, de].find((v) => text.toLowerCase().includes(v.toLowerCase()));
    if (found) hits.push({ key: facet, value: found, source });
  }
  const city = /\b(?:in|nach|near|bei)\s+([A-ZÄÖÜ][a-zäöüß]+)/.exec(text)?.[1];
  if (city && !hits.some((h) => h.key === 'location')) {
    hits.push({ key: 'location', value: city, source: 'ner' });
  }
  const count = /\b(\d+)\s*(people|guests|personen|gäste|seats|plätze)/i.exec(text)?.[0];
  if (count && !hits.some((h) => h.key === 'quantity')) {
    hits.push({ key: 'quantity', value: count, source: 'both' });
  }
  const mail = /[\w.+-]+@[\w-]+\.[\w.]+/.exec(text)?.[0];
  if (mail && !hits.some((h) => h.key === 'contact')) {
    hits.push({ key: 'contact', value: mail, source: 'ner' });
  }
  return hits;
}

/** What the mock classifier answers for free text. */
export function classify(input: string, probe?: { cls: InputClass; facet: Facet }): Classification {
  const text = input.trim();
  const rand = seeded(text.length * 31 + (text.codePointAt(0) ?? 0));
  let cls: InputClass;
  if (probe) cls = MISSES[`${probe.cls}×${probe.facet}`] ?? probe.cls;
  else if (/[?？]\s*$/.test(text) && !/^\?\?/.test(text)) cls = 'question';
  else if (!/\s/.test(text)) cls = 'oneword';
  else if (TASK.test(text)) cls = 'task';
  else if (/[.!]\s*$/.test(text) && /\w{3,}/.test(text)) cls = 'statement';
  else cls = 'other';
  return {
    input: text,
    class: cls,
    confidence: Math.round((0.62 + rand() * 0.36) * 100) / 100,
    language: GERMAN.test(text) ? 'de' : 'en',
    facets: detect(text),
    model: 'intent-classifier-v3',
    took_ms: 18 + Math.floor(rand() * 60),
  };
}

// ---------------------------------------------------------------- prompt playground

export const PLAYGROUND_PRESETS = [
  'Which venues in Leipzig seat 300 people?',
  'Barrier-free event spaces near the main station',
  'Summarise the sustainability guide in five bullets',
];

export const PLAYGROUND_TOOLS = [
  { value: 'search_documents', label: 'search_documents', description: 'Full-text search' },
  { value: 'get_document', label: 'get_document', description: 'One document by id' },
  { value: 'search_events', label: 'search_events', description: 'Events by date and place' },
  { value: 'get_event', label: 'get_event', description: 'One event by id' },
  { value: 'geocode', label: 'geocode', description: 'Place name to coordinates' },
  { value: 'nearby', label: 'nearby', description: 'Records within a radius' },
  { value: 'list_categories', label: 'list_categories', description: 'The category tree' },
  { value: 'translate', label: 'translate', description: 'Text into another language' },
  { value: 'fetch_page', label: 'fetch_page', description: 'Downloads one web page' },
];

export const PLAYGROUND_ANSWER = `## Venues in Leipzig for 300 people

Three venues seat **300 guests** and are within 15 minutes of the main station:

1. **Riverside Congress Hall** — plenary hall for up to 3,000, divisible into three; barrier-free.
2. **Hotel am Park** — ballroom for 400 with hotel rooms on site.
3. **Old Exchange Hall** — historic hall for 1,000, ten minutes on foot from the centre.

| Venue | Seats | Barrier-free |
| --- | --- | --- |
| Riverside Congress Hall | 3,000 | yes |
| Hotel am Park | 400 | yes |
| Old Exchange Hall | 1,000 | partly |

> Capacities depend on the seating layout — ask the venues for availability.

Sources: the venue directory and two venue profiles (see below).`;

export const PLAYGROUND_SOURCES = [
  {
    label: 'Riverside Congress Hall — venue profile',
    href: 'https://example.com/venues/riverside',
  },
  { label: 'Hotel am Park — meetings & events', href: 'https://example.com/venues/hotel-am-park' },
  { label: 'Venue directory · Leipzig', href: 'https://example.com/directory/leipzig' },
];

export interface ToolUsage {
  tool: string;
  calls: number;
  failed?: number;
  error?: string;
}

/** Which of the allowed tools the mock model "called". */
export function toolUsage(allowed: string[]): ToolUsage[] {
  const plan: ToolUsage[] = [
    { tool: 'search_documents', calls: 2 },
    { tool: 'get_document', calls: 3 },
    { tool: 'geocode', calls: 1, failed: 1, error: 'Timed out after 5 s' },
    { tool: 'nearby', calls: 1 },
    { tool: 'fetch_page', calls: 2, failed: 1, error: 'HTTP 404 for one page' },
  ];
  return plan.filter((u) => allowed.includes(u.tool));
}
