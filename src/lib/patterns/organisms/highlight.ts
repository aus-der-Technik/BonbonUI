import { flashChanged } from '../atoms/changed';

/**
 * The `highlight` cue of lists and tables: glows the row whose `data-key` is `key` once
 * (`bb-changed`) and scrolls it into view. Returns false while that row is not rendered (yet),
 * so the caller can try again when its rows change.
 */
export function glowKeyed(root: HTMLElement | undefined, selector: string, key: string): boolean {
  const row = [...(root?.querySelectorAll<HTMLElement>(selector) ?? [])].find(
    (el) => el.dataset.key === key,
  );
  if (!row) return false;
  flashChanged(row);
  row.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
  return true;
}
