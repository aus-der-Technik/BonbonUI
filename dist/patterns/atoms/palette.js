/**
 * The candy system palette as a prop vocabulary. Components that take a `color` accept one of
 * these names (resolved to its `--color-*` token, so light and dark both look right) or any CSS
 * colour.
 */
export const paletteColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'mint',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'purple',
    'pink',
    'brown',
    'gray',
];
export const isPaletteColor = (value) => paletteColors.includes(value);
/** A palette name becomes its token; any other CSS colour passes through unchanged. */
export function colorValue(color) {
    if (color === undefined || color === '')
        return undefined;
    return isPaletteColor(color) ? `var(--color-${color})` : color;
}
/** A stable palette colour for a name, e.g. for avatars or category chips without a set colour. */
export function paletteFor(key) {
    let hash = 0;
    for (const char of key)
        hash = (hash * 31 + char.charCodeAt(0)) | 0;
    // Grey and brown read as "disabled" or "muted", so automatic picks skip them.
    const vivid = paletteColors.slice(0, 11);
    return vivid[Math.abs(hash) % vivid.length];
}
