/**
 * The Introduction chapter's pages, for the pager at the end of each page (see book.ts).
 */
import { chapterPager, type PagerStep } from './book';

export { introPages, type PagerStep } from './book';

/** Previous and next page of an Introduction page, found by its title. */
export function introPager(title: string): { prev?: PagerStep; next?: PagerStep } {
  return chapterPager('Introduction', title);
}
