/**
 * The Explore chapter's pages, for the pager at the end of each page (see book.ts).
 */
import { chapterPager } from '../book';
export { explorePages } from '../book';
/** Previous and next page of an Explore page, found by its title. */
export function explorePager(title) {
    return chapterPager('Explore', title);
}
