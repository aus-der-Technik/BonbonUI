import { dayDate, dayFormat, escapeHtml, numberFormat, starLabel } from './format';

describe('format', () => {
  it('uses German number grouping', () => {
    expect(numberFormat.format(1234567)).toBe('1.234.567');
  });

  it('reads day keys as UTC so the day never shifts', () => {
    expect(dayFormat.format(dayDate('2026-10-19'))).toBe('19.10.');
  });

  it('escapes HTML', () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;',
    );
    expect(escapeHtml(null)).toBe('');
  });

  it('pluralises stars', () => {
    expect(starLabel(1)).toBe('1 star');
    expect(starLabel(4)).toBe('4 stars');
  });
});
