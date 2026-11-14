import {
  arcPath,
  barPath,
  ellipsize,
  hBarPath,
  labelSpace,
  niceMax,
  niceTicks,
  polar,
  slotAt,
  xTicks,
} from './chart';

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

describe('labelSpace', () => {
  it('makes room for the longest label, never less than the minimum', () => {
    expect(labelSpace([], 24)).toBe(24);
    expect(labelSpace(['€0', '€25K'], 24, 8)).toBe(Math.ceil(4 * 6.5) + 8);
    expect(labelSpace(['Chocolate bars'], 30, 10)).toBeGreaterThan(90);
  });

  it('spreads x labels by what they need', () => {
    // Four short labels fit into 200px at 40px each, though not at the default 70px.
    expect(xTicks(4, 200, 40)).toEqual([0, 1, 2, 3]);
    expect(xTicks(4, 200)).toEqual([1, 3]);
  });
});

describe('niceTicks', () => {
  it('covers the data and zero in steps of 1, 2 or 5 × 10ⁿ', () => {
    expect(niceTicks(0, 42)).toEqual([0, 10, 20, 30, 40, 50]);
    expect(niceTicks(0, 30)).toEqual([0, 5, 10, 15, 20, 25, 30]);
    expect(niceTicks(-8, 12)).toEqual([-10, -5, 0, 5, 10, 15]);
    expect(niceTicks(-30, 120)).toEqual([-40, -20, 0, 20, 40, 60, 80, 100, 120]);
    expect(niceTicks(0.1, 0.3)).toEqual([0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3]);
    expect(niceTicks(-5, -1)).toEqual([-5, -4, -3, -2, -1, 0]);
  });

  it('falls back to 0…1 without a range', () => {
    expect(niceTicks(0, 0)).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    expect(niceTicks(Number.NaN, Number.POSITIVE_INFINITY)).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    expect(Object.is(niceTicks(-5, -1).at(-1), 0)).toBe(true);
  });
});

describe('ellipsize', () => {
  it('cuts long labels with an ellipsis', () => {
    expect(ellipsize('Short', 8)).toBe('Short');
    expect(ellipsize('A long label', 6)).toBe('A lon…');
    expect(ellipsize('A long label', 3)).toBe('A…');
    expect(ellipsize('Anything', 1)).toBe('…');
  });
});

describe('arcPath', () => {
  it("draws ring segments clockwise from twelve o'clock", () => {
    const [x, y] = polar(50, 50, 10, Math.PI / 2);
    expect(x).toBeCloseTo(60);
    expect(y).toBeCloseTo(50);
    expect(arcPath(50, 50, 40, 20, 0, Math.PI / 2)).toBe(
      'M50,10A40,40 0 0 1 90,50L70,50A20,20 0 0 0 50,30Z',
    );
    // More than half a turn takes the large arc.
    expect(arcPath(50, 50, 40, 20, 0, Math.PI * 1.5)).toContain('A40,40 0 1 1');
    expect(arcPath(50, 50, 40, 20, 1, 1)).toBe('');
    expect(arcPath(50, 50, 0, 0, 0, 1)).toBe('');
  });

  it('draws a full turn as two halves and pads slices evenly', () => {
    expect(arcPath(50, 50, 40, 20, 0, Math.PI * 2).match(/M/g)).toHaveLength(2);
    const padded = arcPath(50, 50, 40, 20, 0, Math.PI / 2, 4);
    const [start] = padded.slice(1).split('A');
    // The outer edge starts 2px (along the circle) after twelve o'clock.
    expect(Number(start?.split(',')[0])).toBeCloseTo(52, 0);
  });
});
