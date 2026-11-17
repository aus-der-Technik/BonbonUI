export interface CrawledPage {
    id: string;
    title: string;
    url: string;
    /** The extracted answer, split into the chunks the model returned. */
    chunks: string[];
}
export declare function crawledPages(count?: number, seed?: number): CrawledPage[];
export declare const CRAWL_SYSTEM_PROMPT = "You extract facts about event venues from web pages. Answer in short Markdown; never invent figures.";
export declare const CRAWL_TEMPLATE = "Page content:\n{{content}}\n\nList the rooms, their capacity and whether they are barrier-free.";
export declare const CLASSES: readonly ["question", "task", "oneword", "statement", "other"];
export type InputClass = (typeof CLASSES)[number];
export declare const FACETS: readonly ["location", "time", "person", "organisation", "topic", "quantity", "price", "contact"];
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
/** The canned input of one probe-matrix cell. */
export declare function probeInput(cls: InputClass, facet: Facet, lang: 'de' | 'en'): string;
/** What the mock classifier answers for free text. */
export declare function classify(input: string, probe?: {
    cls: InputClass;
    facet: Facet;
}): Classification;
export declare const PLAYGROUND_PRESETS: string[];
export declare const PLAYGROUND_TOOLS: {
    value: string;
    label: string;
    description: string;
}[];
export declare const PLAYGROUND_ANSWER = "## Venues in Leipzig for 300 people\n\nThree venues seat **300 guests** and are within 15 minutes of the main station:\n\n1. **Riverside Congress Hall** \u2014 plenary hall for up to 3,000, divisible into three; barrier-free.\n2. **Hotel am Park** \u2014 ballroom for 400 with hotel rooms on site.\n3. **Old Exchange Hall** \u2014 historic hall for 1,000, ten minutes on foot from the centre.\n\n| Venue | Seats | Barrier-free |\n| --- | --- | --- |\n| Riverside Congress Hall | 3,000 | yes |\n| Hotel am Park | 400 | yes |\n| Old Exchange Hall | 1,000 | partly |\n\n> Capacities depend on the seating layout \u2014 ask the venues for availability.\n\nSources: the venue directory and two venue profiles (see below).";
export declare const PLAYGROUND_SOURCES: {
    label: string;
    href: string;
}[];
export interface ToolUsage {
    tool: string;
    calls: number;
    failed?: number;
    error?: string;
}
/** Which of the allowed tools the mock model "called". */
export declare function toolUsage(allowed: string[]): ToolUsage[];
export type TranslatorLanguage = 'en' | 'de' | 'fr' | 'it';
export declare const TRANSLATOR_LANGUAGES: {
    value: TranslatorLanguage;
    label: string;
}[];
/** The same sentence in every language — what the mock "translates" between. */
export declare const TRANSLATOR_SAMPLES: Record<TranslatorLanguage, string>;
/** A rough guess at the language of a text (English when nothing else matches). */
export declare function detectLanguage(text: string): TranslatorLanguage;
/** The mock translation: a known sample comes back in the target language. */
export declare function translate(text: string, to: TranslatorLanguage): string;
