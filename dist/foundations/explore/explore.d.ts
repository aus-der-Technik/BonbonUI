/**
 * The Explore chapter's pages, for the pager at the end of each page (see book.ts).
 */
import { type PagerStep } from '../book';
export { explorePages } from '../book';
/** Previous and next page of an Explore page, found by its title. */
export declare function explorePager(title: string): {
    prev?: PagerStep;
    next?: PagerStep;
};
