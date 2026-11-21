/**
 * The Introduction chapter's pages, for the pager at the end of each page (see book.ts).
 */
import { type PagerStep } from './book';
export { introPages, type PagerStep } from './book';
/** Previous and next page of an Introduction page, found by its title. */
export declare function introPager(title: string): {
    prev?: PagerStep;
    next?: PagerStep;
};
