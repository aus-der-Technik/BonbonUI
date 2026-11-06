import { boxWithin, LiquidDrop, squeeze } from './liquid';
import { flowBlocks, pressField } from './flow';

/** Runs requestAnimationFrame callbacks by hand, at 60 Hz. */
function frames() {
  let queue: FrameRequestCallback[] = [];
  let now = 0;
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    queue.push(cb);
    return queue.length;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  vi.spyOn(performance, 'now').mockImplementation(() => now);
  return (count: number) => {
    for (let i = 0; i < count; i++) {
      now += 1000 / 60;
      const run = queue;
      queue = [];
      for (const cb of run) cb(now);
    }
  };
}

afterEach(() => vi.restoreAllMocks());

describe('LiquidDrop', () => {
  it('lands the first box at once, then flows to the next one and settles there', () => {
    const run = frames();
    const boxes: { x: number; y: number; w: number; h: number }[] = [];
    const host = document.createElement('div');
    const drop = new LiquidDrop({ render: (b) => boxes.push(b), host });
    drop.moveTo({ x: 0, y: 0, w: 40, h: 40 });
    expect(boxes.at(-1)).toEqual({ x: 0, y: 0, w: 40, h: 40 });

    drop.moveTo({ x: 0, y: 200, w: 40, h: 40 });
    run(4);
    const mid = boxes.at(-1)!;
    // In flight it is stretched along the motion and thinner across it.
    expect(mid.h).toBeGreaterThan(40);
    expect(mid.w).toBeLessThan(40);
    expect(host.style.scale).not.toBe('');

    run(240);
    const end = boxes.at(-1)!;
    expect(end.y).toBeCloseTo(200, 0);
    expect(end.h).toBeCloseTo(40, 0);
    expect(host.style.scale).toBe('');
    drop.destroy();
  });

  it('follows a small change without a splash and jumps under reduced motion', () => {
    frames();
    const boxes: { x: number; w: number }[] = [];
    const drop = new LiquidDrop({ render: (b) => boxes.push(b) });
    drop.moveTo({ x: 0, y: 0, w: 40, h: 20 });
    drop.moveTo({ x: 0, y: 0, w: 44, h: 20 }, 'follow');
    expect(boxes.at(-1)!.w).toBe(44);

    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    drop.moveTo({ x: 300, y: 0, w: 40, h: 20 });
    expect(boxes.at(-1)!.x).toBe(300);
    drop.destroy();
  });

  it('measures a box from offsets, relative to an ancestor', () => {
    const outer = document.createElement('div');
    const inner = document.createElement('span');
    outer.append(inner);
    document.body.append(outer);
    const define = (el: HTMLElement, left: number, parent: HTMLElement | null) => {
      Object.defineProperty(el, 'offsetLeft', { value: left });
      Object.defineProperty(el, 'offsetTop', { value: 0 });
      Object.defineProperty(el, 'offsetParent', { value: parent });
    };
    define(inner, 30, outer);
    define(outer, 10, null);
    expect(boxWithin(inner, outer).x).toBe(30);
    outer.remove();
  });
});

describe('pressField', () => {
  it('sinks the blocks around a press as a wave and lets them rise back', () => {
    const run = frames();
    const root = document.createElement('div');
    root.innerHTML = `<main><section id="near"><button>Go</button></section><section id="far"></section><section data-flow-fixed></section></main>`;
    document.body.append(root);
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const top = this.id === 'far' ? 600 : 0;
      return { left: 0, right: 100, top, bottom: top + 100, width: 100, height: 100 } as DOMRect;
    });
    expect(flowBlocks(root).map((b) => b.id)).toEqual(['near', 'far']);

    const stop = pressField(root);
    root.querySelector('button')!.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        isPrimary: true,
        clientX: 50,
        clientY: 50,
      }),
    );
    run(20);
    const near = root.querySelector<HTMLElement>('#near')!;
    const far = root.querySelector<HTMLElement>('#far')!;
    const depth = (el: HTMLElement) => Number.parseFloat(el.style.translate.split(' ')[1] ?? '0');
    expect(depth(near)).toBeGreaterThan(1);
    expect(depth(near)).toBeGreaterThan(depth(far));

    window.dispatchEvent(new PointerEvent('pointerup'));
    run(300);
    expect(near.style.translate).toBe('');
    stop();
    root.remove();
  });
});

describe('squeeze', () => {
  it('squeezes the surface around a pressed item and leaves nothing at rest', () => {
    const run = frames();
    const host = document.createElement('div');
    host.innerHTML = '<button>Home</button>';
    document.body.append(host);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const tall = this === host;
      return {
        left: 0,
        top: tall ? 0 : 80,
        width: tall ? 70 : 44,
        height: tall ? 600 : 44,
      } as DOMRect;
    });
    const stop = squeeze(host);
    host
      .querySelector('button')!
      .dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
    run(12);
    expect(host.style.transform).toMatch(/^scale\(0\.9/);
    expect(host.style.transformOrigin).toBe('22px 102px');
    window.dispatchEvent(new PointerEvent('pointerup'));
    run(200);
    expect(host.style.transform).toBe('');
    stop();
    host.remove();
  });
});

describe('light', () => {
  it('lights a surface from an emitter on it, more in glass than on a panel', async () => {
    const { lightFor, reflectKind } = await import('./light');
    const panel = document.createElement('div');
    panel.dataset.layer = 'panel';
    const glass = document.createElement('div');
    glass.dataset.layer = 'front';
    const key = document.createElement('button');
    panel.append(key);
    document.body.append(panel, glass);
    expect(reflectKind(panel)).toBe('panel');
    expect(reflectKind(glass)).toBe('glass');
    const rect = { left: 0, top: 0, right: 200, bottom: 100, width: 200, height: 100 } as DOMRect;
    const emitter = { el: key, x: 50, y: 50, size: 40, strength: 1, colour: 'var(--accent)' };
    const onPanel = lightFor(panel, rect, [emitter]);
    expect(onPanel).toContain('at 50px 50px');
    expect(onPanel).toContain('15.0%');
    // Beside the glass (not inside it), only the facing side is lit, and less.
    const beside = lightFor(glass, { ...rect, left: 80, right: 280 } as DOMRect, [emitter]);
    expect(beside).toContain('at -30px 50px');
    // Far away: nothing.
    expect(lightFor(glass, { ...rect, left: 900, right: 1100 } as DOMRect, [emitter])).toBe('');
    panel.remove();
    glass.remove();
  });
});

describe('what a press moves', () => {
  it('knows whether a press lands on glass, a panel or the ground', async () => {
    const { pressLayer } = await import('./flow');
    document.body.innerHTML = `
      <div data-layer="front"><button id="g"></button><div data-layer="panel"><button id="gp"></button></div></div>
      <section data-layer="panel" id="p"><button id="pb"></button></section>
      <div data-surface="photo"><div data-layer="panel"><button id="photo"></button></div></div>
      <button id="ground"></button>`;
    const at = (id: string) => pressLayer(document.getElementById(id)!);
    expect(at('g').layer).toBe('glass');
    expect(at('gp').layer).toBe('glass');
    expect(at('photo').layer).toBe('glass');
    expect(at('pb')).toEqual({ layer: 'panel', panel: document.getElementById('p') });
    expect(at('ground').layer).toBe('ground');
    document.body.innerHTML = '';
  });

  it('leaves the page still for glass and moves only the panel group for a panel', () => {
    const run = frames();
    const root = document.createElement('div');
    root.innerHTML = `<main>
      <section id="a" data-layer="panel"><button id="in-a">A</button></section>
      <section id="b" data-layer="panel"></section>
      <section id="far" data-layer="panel"></section>
      <div id="bar" data-layer="front"><button id="on-glass">G</button></div>
    </main>`;
    document.body.append(root);
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);
    const tops: Record<string, number> = { a: 0, b: 120, far: 2000, bar: 0 };
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const top = tops[this.id] ?? tops[this.parentElement?.id ?? ''] ?? 0;
      return { left: 0, right: 100, top, bottom: top + 100, width: 100, height: 100 } as DOMRect;
    });
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(3000);
    const stop = pressField(root);
    const down = (id: string) =>
      root.querySelector(`#${id}`)!.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          isPrimary: true,
          clientX: 50,
          clientY: 50,
        }),
      );
    const moved = (id: string) => root.querySelector<HTMLElement>(`#${id}`)!.style.translate !== '';

    down('on-glass');
    run(20);
    expect(['a', 'b', 'far', 'bar'].some(moved)).toBe(false);
    window.dispatchEvent(new PointerEvent('pointerup'));

    down('in-a');
    run(20);
    expect(moved('a')).toBe(true);
    expect(moved('b')).toBe(true);
    expect(moved('far')).toBe(false);
    expect(moved('bar')).toBe(false);
    window.dispatchEvent(new PointerEvent('pointerup'));
    run(300);
    stop();
    root.remove();
  });
});
