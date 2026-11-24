import type { Participant } from '../patterns/molecules/AvatarStack.svelte';
import type { ThreadComment } from '../patterns/organisms/CommentThread.svelte';
import { NOW } from './mock-collab';
export type BlockKind = 'p' | 'h1' | 'h2' | 'quote' | 'ul' | 'ol';
export interface DocBlock {
    id: string;
    kind: BlockKind;
    /** Inline HTML: b, i, u, strike, a and mark[data-c] (a comment anchor). */
    html: string;
}
export interface DocThread {
    id: string;
    /** The block the passage lives in (the fallback anchor if the mark is edited away). */
    block: string;
    quote: string;
    comments: ThreadComment[];
    resolved: boolean;
    /** A new thread whose first comment is still being written. */
    draft?: boolean;
}
export { NOW };
export declare const docAuthor = "Alex Morgan";
export declare const docPeople: Participant[];
export declare const docTitle = "Spring handbook";
export declare function docBlocks(): DocBlock[];
export declare function docThreads(): DocThread[];
