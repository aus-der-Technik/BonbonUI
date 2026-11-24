/**
 * The Introduction chapter's pages, for the pager at the end of each page (see book.ts).
 */
import { chapterPager } from './book';
export { introPages } from './book';
/** Previous and next page of an Introduction page, found by its title. */
export function introPager(title) {
    return chapterPager('Introduction', title);
}
