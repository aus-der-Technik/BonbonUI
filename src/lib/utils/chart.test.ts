import { barPath, hBarPath, niceMax, slotAt, xTicks } from './chart';

describe('niceMax', () => {
  it('rounds up to 1, 2 or 5 × 10ⁿ', () => {
    expect(niceMax(0)).toBe(1);
    expect(niceMax(-3)).toBe(1);
    expect(niceMax(1)).toBe(1);
    expect(niceMax(1.4)).toBe(2);
    expect(niceMax(3)).toBe(5);
    expect(niceMax(7)).toBe(10);
    expect(niceMax(42)).toBe(50);
    expect(niceMax(180)).toBe(200);
  });
});

describe('xTicks', () => {
  it('always keeps the last point and steps back from it', () => {
    expect(xTicks(0, 500)).toEqual([]);
    expect(xTicks(5, 700)).toEqual([0, 1, 2, 3, 4]);
    const ticks = xTicks(30, 280);
    expect(ticks.at(-1)).toBe(29);
    expect(ticks.length).toBeLessThanOrEqual(4);
  });
});

describe('bar paths', () => {
  it('draws nothing for empty bars', () => {
    expect(barPath(0, 10, 10, 0, true)).toBe('');
    expect(hBarPath(0, 0, 0, 10)).toBe('');
  });

  it('rounds the data end up or down', () => {
    expect(barPath(0, 100, 10, 20, true)).toMatch(/^M0,100V84/);
    expect(barPath(0, 100, 10, 20, false)).toMatch(/^M0,100V116/);
    expect(hBarPath(5, 0, 50, 10)).toMatch(/^M5,0H51/);
  });
});

describe('slotAt', () => {
  it('clamps to the data', () => {
    expect(slotAt(-5, 10, 4)).toBe(0);
    expect(slotAt(25, 10, 4)).toBe(2);
    expect(slotAt(500, 10, 4)).toBe(3);
    expect(slotAt(5, 0, 4)).toBe(0);
  });
});
