import { addDays, addMonths, candy, dayKey, toDate } from './collab';

describe('collab date helpers', () => {
  it('toDate accepts dates, strings and timestamps', () => {
    const d = new Date(2026, 9, 19);
    expect(toDate(d)).toBe(d);
    expect(toDate('2026-10-19T00:00:00').getDate()).toBe(19);
    expect(toDate(d.getTime()).getTime()).toBe(d.getTime());
  });

  it('addDays crosses month ends on the local calendar', () => {
    expect(dayKey(addDays(new Date(2026, 9, 31), 1))).toBe('2026-11-01');
    expect(dayKey(addDays(new Date(2026, 0, 1), -1))).toBe('2025-12-31');
  });

  it('addMonths clamps to the shorter month', () => {
    expect(dayKey(addMonths(new Date(2026, 0, 31), 1))).toBe('2026-02-28');
  });

  it('candy maps palette names to tokens and passes other colours through', () => {
    expect(candy('pink')).toBe('var(--color-pink)');
    expect(candy('#123456')).toBe('#123456');
    expect(candy(undefined)).toBe('var(--accent)');
  });
});
