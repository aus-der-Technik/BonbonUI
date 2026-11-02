// Markdown → sanitized HTML. One place, so every page renders the same subset safely.
import DOMPurify from 'dompurify';
import { Marked } from 'marked';

const parser = new Marked({ gfm: true, breaks: true, async: false });

/** `[text]()` links with an empty target render as plain text instead of dead links. */
const stripEmptyLinks = (source: string) => source.replace(/\[([^\]]+)\]\(\s*\)/g, '$1');

const BLOCKED = 'script, style, iframe, object, embed, link, meta, base, form, frame, frameset';
const UNSAFE_URL = /^\s*(javascript|vbscript|data:(?!image\/(png|gif|jpe?g|webp);))/i;

/**
 * A second, independent pass after DOMPurify: drop active elements, event handlers and script
 * URLs. DOMPurify alone is not enough everywhere — some DOM implementations (happy-dom, used in
 * the unit tests) report support yet hand the input back unsanitized.
 */
function harden(root: DocumentFragment): void {
  for (const node of root.querySelectorAll(BLOCKED)) node.remove();
  for (const element of root.querySelectorAll('*')) {
    for (const attribute of [...element.attributes]) {
      const name = attribute.name.toLowerCase();
      if (name.startsWith('on') || name === 'srcdoc' || name === 'style')
        element.removeAttribute(attribute.name);
      else if (
        ['href', 'src', 'xlink:href', 'action', 'formaction'].includes(name) &&
        UNSAFE_URL.test(attribute.value)
      ) {
        element.removeAttribute(attribute.name);
      }
    }
  }
}

/**
 * Renders markdown to HTML and sanitizes it (DOMPurify, then an own hardening pass). Links open
 * in a new tab with `rel="noopener noreferrer"`. Without a DOM (SSR) the HTML is escaped.
 */
export function renderMarkdown(source: string): string {
  const html = parser.parse(stripEmptyLinks(source)) as string;
  if (typeof window === 'undefined') return html.replace(/</g, '&lt;');
  const clean = DOMPurify.isSupported ? DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }) : html;
  const template = document.createElement('template');
  template.innerHTML = clean;
  harden(template.content);
  for (const link of template.content.querySelectorAll('a[href]')) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
  return template.innerHTML;
}
