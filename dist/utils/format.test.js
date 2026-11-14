import { dateTimeFormat, dayDate, dayFormat, decimalFormat, escapeHtml, longDayFormat, numberFormat, percentFormat, starLabel, } from './format';
describe('format', () => {
    it('uses English number grouping', () => {
        expect(numberFormat.format(1234567)).toBe('1,234,567');
        expect(decimalFormat.format(4.5)).toBe('4.50');
        expect(percentFormat.format(0.97)).toBe('97%');
    });
    it('reads day keys as UTC so the day never shifts', () => {
        expect(dayFormat.format(dayDate('2026-10-19'))).toBe('10/19');
    });
    it('formats dates in English on the Berlin wall clock', () => {
        expect(longDayFormat.format(dayDate('2026-10-19'))).toBe('Mon, Oct 19, 2026');
        expect(dateTimeFormat.format(new Date('2026-10-19T12:30:00Z'))).toBe('Oct 19, 2026, 2:30 PM');
    });
    it('escapes HTML', () => {
        expect(escapeHtml(`<a href="x">'&'</a>`)).toBe('&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;');
        expect(escapeHtml(null)).toBe('');
    });
    it('pluralises stars', () => {
        expect(starLabel(1)).toBe('1 star');
        expect(starLabel(4)).toBe('4 stars');
    });
});
