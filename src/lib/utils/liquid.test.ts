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
    // Layout offsets (what squeeze measures): a 70×600 rail, a 44px item 80px down.
    const button = host.querySelector('button')!;
    const define = (el: HTMLElement, box: Record<string, unknown>) => {
      for (const [k, v] of Object.entries(box)) Object.defineProperty(el, k, { value: v });
    };
    define(host, {
      offsetLeft: 0,
      offsetTop: 0,
      offsetWidth: 70,
      offsetHeight: 600,
      offsetParent: null,
      clientLeft: 0,
      clientTop: 0,
    });
    define(button, {
      offsetLeft: 0,
      offsetTop: 80,
      offsetWidth: 44,
      offsetHeight: 44,
      offsetParent: host,
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

  /** A page of ground, panels and glass with boxes from `tops` (by id, or the parent's id). */
  function page(html: string, tops: Record<string, number>) {
    const root = document.createElement('div');
    root.innerHTML = html;
    document.body.append(root);
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const top = tops[this.id] ?? tops[this.parentElement?.id ?? ''] ?? 0;
      return { left: 0, right: 100, top, bottom: top + 100, width: 100, height: 100 } as DOMRect;
    });
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(3000);
    const at = (id: string) => root.querySelector<HTMLElement>(`#${id}`)!;
    const down = (id: string, x = 50, y = 50) =>
      at(id).dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          isPrimary: true,
          clientX: x,
          clientY: y,
        }),
      );
    const moved = (id: string) => at(id).style.translate !== '';
    const xy = (id: string) =>
      (at(id).style.translate || '0px 0px').split(' ').map(Number.parseFloat);
    return { root, at, down, moved, xy };
  }

  it('moves only the layer pressed on: glass nothing, a panel the things on panels', () => {
    const run = frames();
    const { root, down, moved } = page(
      `<main>
        <p id="text">On the ground</p>
        <section id="a" data-layer="panel"><button id="in-a">A</button></section>
        <section id="b" data-layer="panel"><p id="b-text">Beside</p></section>
        <section id="far" data-layer="panel"><p id="far-text">Far</p></section>
        <div id="bar" data-layer="front"><button id="on-glass">G</button></div>
      </main>`,
      { text: 0, a: 0, b: 120, far: 2000, bar: 0 },
    );
    const stop = pressField(root);

    down('on-glass');
    run(20);
    expect(['text', 'a', 'in-a', 'b-text', 'far-text', 'bar'].some(moved)).toBe(false);
    window.dispatchEvent(new PointerEvent('pointerup'));

    down('in-a');
    run(20);
    // The things on the panels answer; the tiles, the ground and the glass stay.
    expect(moved('in-a')).toBe(true);
    expect(moved('b-text')).toBe(true);
    expect(moved('a')).toBe(false);
    expect(moved('b')).toBe(false);
    expect(moved('far-text')).toBe(false);
    expect(moved('text')).toBe(false);
    expect(moved('bar')).toBe(false);
    window.dispatchEvent(new PointerEvent('pointerup'));
    run(400);
    stop();
    root.remove();
  });

  it('a press on the ground moves the ground around a panel, never the panel', () => {
    const run = frames();
    const { root, down, moved } = page(
      `<main>
        <div id="row"><button id="go">Go</button><p id="near">Near</p><p id="far">Far</p></div>
        <section id="tile" data-layer="panel"><p id="on-tile">On a panel</p></section>
      </main>`,
      { go: 0, near: 150, far: 900, tile: 60 },
    );
    const stop = pressField(root);
    down('go');
    run(40);
    // The row is one small piece of the ground; the panel beside it is another layer.
    expect(moved('row')).toBe(true);
    expect(moved('tile')).toBe(false);
    expect(moved('on-tile')).toBe(false);
    window.dispatchEvent(new PointerEvent('pointerup'));
    run(400);
    expect(moved('row')).toBe(false);
    stop();
    root.remove();
  });

  it('loses energy with every pixel: the far pieces dip much less', () => {
    const run = frames();
    const { root, down, xy } = page(
      `<main><button id="go">Go</button><p id="near">Near</p><p id="mid">Mid</p><p id="far">Far</p></main>`,
      { go: 0, near: 140, mid: 400, far: 800 },
    );
    const stop = pressField(root);
    down('go');
    run(90);
    const [, go] = xy('go');
    const [, near] = xy('near');
    const [, mid] = xy('mid');
    const [, far] = xy('far');
    expect(go).toBeGreaterThan(2);
    expect(near).toBeLessThan(go!);
    expect(mid).toBeLessThan(near! / 2);
    expect(far ?? 0).toBeLessThan(near! / 8);
    stop();
    root.remove();
  });

  it('a bigger control moves more water than a small one', async () => {
    const { heft } = await import('./flow');
    const run = frames();
    const root = document.createElement('div');
    root.innerHTML = `<main><button id="small">S</button><button id="big">B</button><p id="near">Near</p></main>`;
    document.body.append(root);
    const boxes: Record<string, [number, number, number, number]> = {
      small: [0, 0, 28, 28],
      big: [0, 0, 240, 56],
      near: [0, 160, 100, 20],
    };
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      const [left, top, width, height] = boxes[this.id] ?? [0, 0, 0, 0];
      return { left, top, width, height, right: left + width, bottom: top + height } as DOMRect;
    });
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1000);
    const small = root.querySelector('#small')!;
    const big = root.querySelector('#big')!;
    expect(heft(small)).toBeLessThan(0.7);
    expect(heft(big)).toBeGreaterThan(1.3);

    const near = root.querySelector<HTMLElement>('#near')!;
    const dipAfter = (button: Element) => {
      button.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          isPrimary: true,
          clientX: 10,
          clientY: 10,
        }),
      );
      run(40);
      const dip = Number.parseFloat(near.style.translate.split(' ')[1] ?? '0');
      window.dispatchEvent(new PointerEvent('pointerup'));
      run(600);
      return dip;
    };
    const stop = pressField(root);
    const fromSmall = dipAfter(small);
    const fromBig = dipAfter(big);
    expect(fromBig).toBeGreaterThan(fromSmall * 2);
    stop();
    root.remove();
  });

  it('a drag sways the pieces around, never the one in the hand, and they swing back', () => {
    const run = frames();
    const { root, at, down, xy } = page(
      `<main><div id="held"><input id="slider" type="range" /></div><p id="near">Near</p></main>`,
      { held: 0, near: 120 },
    );
    const stop = pressField(root);
    down('slider');
    run(6);
    for (let i = 1; i <= 8; i++) {
      run(1);
      window.dispatchEvent(
        new PointerEvent('pointermove', { isPrimary: true, clientX: 50 + i * 12, clientY: 50 }),
      );
    }
    run(4);
    expect(xy('near')[0]).toBeGreaterThan(0.3);
    expect(xy('held')[0]).toBeCloseTo(0, 1);
    // The hand stops: the sway swings past its place and back.
    let crossed = false;
    for (let i = 0; i < 60 && !crossed; i++) {
      run(1);
      crossed = (xy('near')[0] ?? 0) < -0.02;
    }
    expect(crossed).toBe(true);
    window.dispatchEvent(new PointerEvent('pointerup'));
    run(600);
    expect(at('near').style.translate).toBe('');
    stop();
    root.remove();
  });

  it('a text field starts the wave but a drag in it does not sway, nor does typing a space', () => {
    const run = frames();
    const { root, at, down, moved } = page(
      `<main><div id="field"><input id="name" type="text" /></div><p id="near">Near</p></main>`,
      { field: 0, near: 120 },
    );
    const stop = pressField(root);
    at('name').dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    run(20);
    expect(moved('near')).toBe(false);
    down('name');
    run(20);
    expect(moved('near')).toBe(true);
    window.dispatchEvent(new PointerEvent('pointerup'));
    run(400);
    stop();
    root.remove();
  });
});
