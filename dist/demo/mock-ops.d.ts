export type CriterionKey = 'active' | 'inclusive' | 'focus' | 'restricted';
export declare const CRITERIA: {
    key: CriterionKey;
    label: string;
    description: string;
}[];
export type RatingStatus = 'skipped' | 'unrated' | 'queued' | 'failed' | 'rated';
export type Scores = Record<CriterionKey, number>;
/** Scores for one rating run; the same document and run always score the same. */
export declare function scoreDocument(id: string, run: number): Scores;
/** Whether rating this document fails in the given run (a few do; retrying usually helps). */
export declare const ratingFails: (id: string, run: number) => boolean;
export declare const overallScore: (scores: Scores) => number;
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
export type DocumentFormat = 'pdf' | 'html' | 'docx' | 'md' | 'json';
export type Access = 'public' | 'members' | 'restricted';
export interface LibraryDocument {
    id: string;
    collection: string;
    title: string;
    format: DocumentFormat;
    urn: string;
    access: Access;
    keywords: string[];
    source: string;
    hasOriginal: boolean;
    /** The generated summary the judge rates (Markdown). */
    summary: string;
    /** Oldest first; the last one is the latest. */
    versions: ArchivedVersion[];
    rating: RatingStatus;
    scores?: Scores;
    /** Why rating was skipped or failed. */
    reason?: string;
    /** Uploaded here, waiting for the next ingestion run. */
    staged?: boolean;
}
export declare const CONTENT_TYPES: Record<DocumentFormat, string>;
export declare const archiveCollections: ArchiveCollection[];
/** The documents of one collection, with their versions and where the judge stands. */
export declare function archivedDocuments(collection: string): LibraryDocument[];
/** A file just uploaded: one staged version, not rated yet. */
export declare function stagedDocument(collection: string, file: File, n: number): LibraryDocument;
export type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'expired';
export interface ExportJob {
    id: string;
    status: ExportStatus;
    /** The documents asked for. */
    ids: string[];
    requested: number;
    /** Items packed so far (all that could be packed once completed). */
    included: number;
    failed: number;
    filename: string;
    bytes: number | null;
    createdAt: string;
    expiresAt: string | null;
    /** Why the whole job failed. */
    error?: string;
}
export interface ExportProblem {
    id: string;
    code: 'not_public' | 'too_large';
    message: string;
}
/** The per-item limit of an export. */
export declare const EXPORT_ITEM_LIMIT: number;
/** Which of these documents cannot go into a ZIP, and why. */
export declare function exportProblems(docs: LibraryDocument[]): ExportProblem[];
export declare function exportJob(filename: string, ids: string[]): ExportJob;
