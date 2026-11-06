/**
 * Renders markdown to HTML and sanitizes it (DOMPurify, then an own hardening pass). Links open
 * in a new tab with `rel="noopener noreferrer"`. Without a DOM (SSR) the HTML is escaped.
 */
export declare function renderMarkdown(source: string): string;
