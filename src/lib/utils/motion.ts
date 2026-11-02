/** Scrolls to the top, instantly when the user asked for reduced motion. */
export function scrollToTop(): void {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}
