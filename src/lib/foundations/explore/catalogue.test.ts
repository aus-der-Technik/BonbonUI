import indexSource from '../../index.ts?raw';
import mapSource from '../../map.ts?raw';
import { catalogue, filterCatalogue, importLine, levels, tags } from './catalogue';

/** Every component export: `default as Name` re-exported from a `.svelte` file. */
function componentExports(source: string): string[] {
  const names: string[] = [];
  const re = /default as (\w+)[^}]*\}\s*from '\.\/[^']+\.svelte'/g;
  for (const m of source.matchAll(re)) names.push(m[1]!);
  return names;
}

/** Storybook's id rule: lower case, anything but letters and digits becomes one dash. */
const sanitize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** A story's export name is split into words ("ActivityLog" → "Activity Log"). */
const words = (s: string) =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

/** The ids of every story in the repo, read from the stories' `title` and `<Story name>`. */
function storyIds(): Set<string> {
  const files = import.meta.glob<string>('../../**/*.stories.svelte', {
    query: '?raw',
    import: 'default',
    eager: true,
  });
  const ids = new Set<string>();
  for (const source of Object.values(files)) {
    const title = source.split('defineMeta(')[1]?.match(/title:\s*'([^']+)'/)?.[1];
    if (!title) continue;
    for (const m of source.matchAll(/<Story\s[^>]*?name="([^"]+)"/g))
      ids.add(`${sanitize(title)}--${sanitize(words(m[1]!))}`);
  }
  return ids;
}

describe('component catalogue', () => {
  const main = componentExports(indexSource);
  const map = componentExports(mapSource);
  const names = catalogue.map((entry) => entry.name);

  it('finds the component exports (sanity check of the parser)', () => {
    expect(main.length).toBeGreaterThan(150);
    expect(main).toContain('Button');
    expect(main).toContain('ControlCenter');
    expect(map).toEqual(['MapView']);
  });

  it('lists every exported component', () => {
    const missing = [...main, ...map].filter((name) => !names.includes(name));
    expect(missing).toEqual([]);
  });

  it('lists nothing that is not exported, and nothing twice', () => {
    const extra = names.filter((name) => !main.includes(name) && !map.includes(name));
    expect(extra).toEqual([]);
    expect(new Set(names).size).toBe(names.length);
  });

  it('marks the map entry', () => {
    for (const entry of catalogue)
      expect(entry.entry === 'map').toBe(map.includes(entry.name) && !main.includes(entry.name));
    expect(importLine(catalogue.find((e) => e.name === 'MapView')!)).toBe(
      "import { MapView } from '@bonbon-ui/core/map';",
    );
  });

  it('gives every entry a description, a known level and known tags', () => {
    for (const entry of catalogue) {
      expect(entry.description.length).toBeGreaterThan(10);
      expect(levels).toContain(entry.level);
      expect(entry.tags.length).toBeGreaterThan(0);
      for (const tag of entry.tags) expect(tags).toContain(tag);
    }
  });

  it('links every entry to a story that exists', () => {
    const ids = storyIds();
    const broken = catalogue
      .filter((entry) => entry.story !== null && !ids.has(entry.story))
      .map((entry) => `${entry.name} → ${entry.story}`);
    expect(broken).toEqual([]);
  });

  it('filters by words, level and every chosen tag', () => {
    expect(filterCatalogue(catalogue, 'liquid glass thumb', 'All', []).map((e) => e.name)).toEqual([
      'SegmentedControl',
    ]);
    const atoms = filterCatalogue(catalogue, '', 'Atoms', []);
    expect(atoms.every((e) => e.level === 'Atoms')).toBe(true);
    const lit = filterCatalogue(catalogue, '', 'All', ['emits light', 'navigation']);
    expect(lit.map((e) => e.name).sort()).toEqual(['NavBar', 'NavRail', 'SideNav']);
    expect(filterCatalogue(catalogue, 'no such thing', 'All', [])).toEqual([]);
  });
});
