/**
 * Shared helpers of the website and shop components: accent-aware colours and money text.
 * Prices shown on their own use the Price atom; these format amounts inside sentences and rows.
 */
import { colorValue } from '../atoms/palette';
/** Resolves an AccentColor to CSS (`blue` → `var(--color-blue)`, `accent` → `var(--accent)`). */
export const accentColor = (color) => !color || color === 'accent' ? 'var(--accent)' : (colorValue(color) ?? 'var(--accent)');
const formatters = new Map();
/** Formats an amount as money, with the same defaults as the Price atom (EUR, en). */
export function formatPrice(amount, currency = 'EUR', locale = 'en') {
    const key = `${locale}|${currency}`;
    let format = formatters.get(key);
    if (!format) {
        format = new Intl.NumberFormat(locale, { style: 'currency', currency });
        formatters.set(key, format);
    }
    return format.format(amount);
}
/** Percent saved between a former and a current price, rounded; 0 when there is no saving. */
export function discountPercent(price, compareAt) {
    if (!compareAt || compareAt <= price)
        return 0;
    return Math.round(((compareAt - price) / compareAt) * 100);
}
