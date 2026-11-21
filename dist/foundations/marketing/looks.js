/**
 * Local only (not in git): the colours the marketing squares cycle through, and the query the
 * render script drives one story with (`?mk=Button&tint=%23ff2d55&theme=dark`).
 */
import { catalogue } from '../explore/catalogue';
import { tintPresets } from '../../patterns/templates/Application.svelte';
/** The presets, then a few refined ones the presets do not reach. */
export const tints = [
    ...tintPresets.map((t) => t.value),
    '#c2417a', // rose
    '#0f7c9c', // deep teal
    '#9c7a4e', // sand
    '#6f8f5e', // sage
    '#8e5bb5', // plum
    '#e0683f', // coral
];
/** Entries added to the catalogue after the first render: left out of the cycle, so every
 *  earlier square keeps its tint and theme. Give these a `tint` and `theme` in their meta. */
const later = new Set(['GlimmerPanel']);
const cycled = catalogue.filter((e) => !later.has(e.name));
/** A varied but steady look per catalogue entry: neighbours never share a tint. */
export function lookFor(name) {
    const i = Math.max(0, cycled.findIndex((e) => e.name === name));
    const tint = tints[(i * 7) % tints.length] ?? tints[0];
    // About one in three is dark; Graphite and sand read best in light.
    const theme = i % 3 === 1 ? 'dark' : 'light';
    return { tint, theme };
}
export function readQuery() {
    const q = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
    const theme = q.get('theme');
    return {
        mk: q.get('mk'),
        tint: q.get('tint'),
        theme: theme === 'dark' || theme === 'light' ? theme : null,
    };
}
export const kebab = (s) => s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
export const levelFile = {
    Atoms: 'atoms',
    Molecules: 'molecules',
    Organisms: 'organisms',
    Templates: 'templates',
    Layout: 'layout',
    Desktop: 'desktop',
};
