import { cubicBezier, glide, motion, originFrom, scrollToTop } from './motion';

describe('scrollToTop', () => {
  it('scrolls smoothly unless reduced motion is asked for', () => {
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const media = vi.spyOn(window, 'matchMedia');

    media.mockReturnValue({ matches: false } as MediaQueryList);
    scrollToTop();
    expect(scroll).toHaveBeenLastCalledWith({ top: 0, behavior: 'smooth' });

    media.mockReturnValue({ matches: true } as MediaQueryList);
    scrollToTop();
    expect(scroll).toHaveBeenLastCalledWith({ top: 0, behavior: 'auto' });
  });
});

describe('motion', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('style');
  });
  const reduce = (on: boolean) =>
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: on } as MediaQueryList);

  it('falls back to the token values without tokens.css', () => {
    reduce(false);
    const m = motion('slow', 'in-out');
    expect(m).toMatchObject({ duration: 360, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' });
    expect(m.reduced).toBe(false);
    expect(m.ease(0)).toBe(0);
    expect(m.ease(1)).toBe(1);
    expect(motion().duration).toBe(220);
  });

  it('reads the --motion-* and --ease-* tokens where they apply', () => {
    reduce(false);
    const root = document.documentElement;
    root.style.setProperty('--motion-base', '0.5s');
    root.style.setProperty('--ease-out', 'linear');
    const m = motion('base', 'out');
    expect(m.duration).toBe(500);
    expect(m.easing).toBe('linear');
    expect(m.ease(0.3)).toBeCloseTo(0.3);
    root.style.setProperty('--motion-base', 'soon');
    root.style.setProperty('--ease-out', 'bouncy');
    expect(motion('base', 'out')).toMatchObject({
      duration: 220,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
  });

  it('turns movement into a quick linear fade under reduced motion', () => {
    reduce(true);
    const m = motion('slow', 'spring');
    expect(m).toMatchObject({ duration: 120, easing: 'linear', reduced: true });
    const node = document.createElement('div');
    const fadeOnly = glide(node, { x: 40, speed: 'slow' });
    expect(fadeOnly.duration).toBe(120);
    expect(fadeOnly.css?.(0.5, 0.5)).toBe('opacity: 0.5');
  });

  it('glides from an offset and scale otherwise', () => {
    reduce(false);
    const node = document.createElement('div');
    document.body.append(node);
    const t = glide(node, { x: 40, y: -10, scale: 0.9, speed: 'quick', delay: 5 });
    expect(t).toMatchObject({ duration: 120, delay: 5 });
    expect(t.css?.(0, 1)).toContain('translate(40px, -10px) scale(0.9)');
    expect(t.css?.(1, 0)).toContain('opacity: 1');
    node.remove();
  });

  it('solves cubic-bezier curves, overshoot included', () => {
    const ease = cubicBezier(0.2, 0.8, 0.2, 1);
    expect(ease(-1)).toBe(0);
    expect(ease(2)).toBe(1);
    expect(ease(0.5)).toBeGreaterThan(0.5);
    expect(ease(0.25)).toBeLessThan(ease(0.5));
    expect(Math.max(...[0.6, 0.7, 0.8].map(cubicBezier(0.34, 1.56, 0.64, 1)))).toBeGreaterThan(1);
    // A flat start (zero slope) still finds its way.
    expect(cubicBezier(1, 0, 1, 0)(0.5)).toBeGreaterThanOrEqual(0);
  });

  it('places a transform origin at the centre of what opened something', () => {
    const box = new DOMRect(100, 100, 300, 200);
    expect(originFrom(new DOMRect(40, 60, 20, 10), box)).toBe('-50px -35px');
    expect(originFrom(undefined, box)).toBeUndefined();
    // An element without layout (no rect) gives no origin, so the default stays.
    expect(originFrom(document.createElement('button'), box)).toBeUndefined();
  });
});
