import { buildLens, canRefract, frostFilter, lensFingerprint } from './lens';

/** The stop values of a map, decoded back from its data: URL (0…255 per stop). */
function stops(url: string, channel: 'r' | 'g'): number[] {
  const svg = decodeURIComponent(url.replace('data:image/svg+xml,', ''));
  return [...svg.matchAll(/rgb\((\d+),(\d+),0\)/g)].map((m) =>
    Number(channel === 'r' ? m[1] : m[2]),
  );
}

describe('buildLens', () => {
  it('leaves the centre alone and pulls the edges inwards', () => {
    const lens = buildLens({ width: 600, height: 60, magnify: 1.3, rim: 31, rimBend: 45 });
    const x = stops(lens.mapX, 'r');
    // Left edge fetches from further right (> 128), right edge from further left (< 128).
    expect(x[0]).toBeGreaterThan(200);
    expect(x[x.length - 1]).toBeLessThan(56);
    expect(x[Math.floor(x.length / 2)]).toBeCloseTo(128, -1);
    expect(lens.scale).toBeGreaterThan(0);
  });

  it('bends a short axis less than a long one', () => {
    const lens = buildLens({ width: 600, height: 60, magnify: 1.3, rim: 31, rimBend: 45 });
    const x = stops(lens.mapX, 'r');
    const y = stops(lens.mapY, 'g');
    expect(Math.abs(y[0]! - 128)).toBeLessThan(Math.abs(x[0]! - 128));
  });

  it('stays neutral without magnification or bend', () => {
    const lens = buildLens({ width: 200, height: 200, magnify: 1, rim: 10, rimBend: 0 });
    for (const v of stops(lens.mapX, 'r')) expect(v).toBe(128);
    expect(lens.scale).toBe(2);
  });
});

describe('lensFingerprint', () => {
  it('is stable and changes with any part', () => {
    expect(lensFingerprint(1, 2, 'a')).toBe(lensFingerprint(1, 2, 'a'));
    expect(lensFingerprint(1, 2, 'a')).not.toBe(lensFingerprint(1, 2, 'b'));
  });
});

describe('frostFilter', () => {
  it('keeps the theme unless blur or saturate is set', () => {
    expect(frostFilter(undefined)).toBeUndefined();
    expect(frostFilter(false)).toBeUndefined();
    expect(frostFilter({ magnify: 1.5 })).toBeUndefined();
    expect(frostFilter({ blur: 15, saturate: 160 })).toBe('blur(15px) saturate(160%)');
    expect(frostFilter({ blur: 10 })).toBe('blur(10px) saturate(118%)');
  });
});

describe('canRefract', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  // happy-dom's CSS.supports lives on a prototype a spy cannot reach.
  const supports = (value: boolean) => vi.stubGlobal('CSS', { supports: () => value });

  const as = (ua: string) => vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(ua);

  it('refracts in Chromium, not in Firefox', () => {
    supports(true);
    as('Mozilla/5.0 (Macintosh) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36');
    expect(canRefract()).toBe(true);
    as('Mozilla/5.0 (Macintosh; rv:140.0) Gecko/20100101 Firefox/140.0');
    expect(canRefract()).toBe(false);
  });

  it('leaves WebKit to the mirror, even at the top level', () => {
    supports(true);
    as(
      'Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15',
    );
    expect(canRefract()).toBe(false);
  });

  it('needs backdrop-filter', () => {
    supports(false);
    expect(canRefract()).toBe(false);
  });
});
