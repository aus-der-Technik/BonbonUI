/**
 * Shared helpers of the website and shop components: accent-aware colours and money text.
 * Prices shown on their own use the Price atom; these format amounts inside sentences and rows.
 */
import { type PaletteColor } from '../atoms/palette';
/** A palette name, `accent` (follows the tint) or any CSS colour. */
export type AccentColor = PaletteColor | 'accent' | (string & {});
/** Resolves an AccentColor to CSS (`blue` → `var(--color-blue)`, `accent` → `var(--accent)`). */
export declare const accentColor: (color: AccentColor | undefined) => string;
/** Formats an amount as money, with the same defaults as the Price atom (EUR, en). */
export declare function formatPrice(amount: number, currency?: string, locale?: string): string;
/** Percent saved between a former and a current price, rounded; 0 when there is no saving. */
export declare function discountPercent(price: number, compareAt: number | undefined): number;
