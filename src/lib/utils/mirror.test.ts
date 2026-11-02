import { HIDE_ATTR, LENS_ATTR, Mirror, STICKY_ATTR } from './mirror';

/** A page with a glass surface (holding its lens box) above some content. */
function page(content: string) {
  document.body.innerHTML = `
    <header class="surface"><span class="lens" ${LENS_ATTR}></span><b>Bar</b></header>
    <main>${content}</main>`;
  const surface = document.querySelector<HTMLElement>('.surface')!;
  const lens = document.querySelector<HTMLElement>('.lens')!;
  return { surface, lens };
}

const mirrors: Mirror[] = [];
function mirror(lens: HTMLElement, surface: HTMLElement) {
  const m = new Mirror(lens, surface);
  mirrors.push(m);
  lens.append(m.host);
  return m;
}

/** The copy of an element, found by a selector that does not rely on ids. */
const copy = (m: Mirror, selector: string) => m.stage.querySelector<HTMLElement>(selector);
/** The original — the copy sits in the header, so a plain document query would find it first. */
const orig = <T extends Element = HTMLElement>(selector: string) =>
  document.body.querySelector<T>(`:scope > main ${selector}`)!;
const wait = (ms = 0) => new Promise<void>((resolve) => setTimeout(resolve, ms));

afterEach(() => {
  for (const m of mirrors.splice(0)) m.destroy();
  document.body.innerHTML = '';
});

describe('Mirror', () => {
  it('copies the page under a canvas and hides the surface in the copy', () => {
    const { lens, surface } = page('<p class="text">Behind the glass</p>');
    const m = mirror(lens, surface);
    const [canvas, body] = [...m.stage.children] as HTMLElement[];
    expect(canvas?.style.zIndex).toBe('-2147483647');
    expect(body?.tagName).toBe('BODY');
    expect(copy(m, '.text')?.textContent).toBe('Behind the glass');
    expect(copy(m, '.surface')?.hasAttribute(HIDE_ATTR)).toBe(true);
    expect(m.host.getAttribute('aria-hidden')).toBe('true');
  });

  it('leaves out lenses, scripts and the copy itself', () => {
    const { lens, surface } = page('<script>1</script><div class="other" data-bb-lens></div>');
    const m = mirror(lens, surface);
    expect(m.stage.querySelector(`[${LENS_ATTR}]`)).toBeNull();
    expect(m.stage.querySelector('script')).toBeNull();
    // The lens box with the mirror inside is not copied into the mirror again.
    expect(m.stage.querySelectorAll('body')).toHaveLength(1);
  });

  it('keeps the copy out of the page: queries, id lookups and radio groups', () => {
    const { lens, surface } = page(`
      <label for="q" class="label">Query</label>
      <input id="q" class="field" name="q" value="first" />
      <input class="radio" type="radio" name="pick" checked />
      <iframe class="frame" src="about:blank"></iframe>`);
    orig<HTMLInputElement>('.field').value = 'typed';
    const m = mirror(lens, surface);
    const field = copy(m, '.field') as HTMLInputElement;
    expect(field.id).toBe('q');
    expect(field.value).toBe('typed');
    expect(m.stage.getRootNode()).toBeInstanceOf(ShadowRoot);
    // The page sees only its own elements.
    expect(document.querySelectorAll('.field')).toHaveLength(1);
    expect(document.getElementById('q')).toBe(orig('.field'));
    expect(orig<HTMLInputElement>('.radio').checked).toBe(true);
    expect(copy(m, '.frame')?.hasAttribute('src')).toBe(false);
    expect(m.host.inert).toBe(true);
  });

  it('patches attributes and text in place and rebuilds on structural changes', async () => {
    const { lens, surface } = page('<p class="text">One</p>');
    const m = mirror(lens, surface);
    const build = vi.spyOn(m, 'build');
    const text = orig('.text');

    text.setAttribute('data-state', 'on');
    text.firstChild!.textContent = 'Two';
    await wait();
    expect(copy(m, '.text')?.getAttribute('data-state')).toBe('on');
    expect(copy(m, '.text')?.textContent).toBe('Two');
    expect(build).not.toHaveBeenCalled();

    document.body
      .querySelector(':scope > main')!
      .insertAdjacentHTML('beforeend', '<p class="later">New</p>');
    await wait();
    expect(copy(m, '.later')).toBeNull();
    await wait(200);
    expect(copy(m, '.later')?.textContent).toBe('New');
  });

  it('ignores changes inside lenses', async () => {
    const { lens, surface } = page('<p class="text">One</p>');
    const m = mirror(lens, surface);
    const rebuild = vi.spyOn(m, 'rebuild');
    lens.append(document.createElement('i'));
    await wait();
    expect(rebuild).not.toHaveBeenCalled();
  });

  it('follows input, scroll and sticky elements', () => {
    const { lens, surface } = page(`
      <div class="scroller" style="overflow:auto;height:20px"><div style="height:200px"></div></div>
      <nav class="sticky" style="position:sticky;top:0">Tabs</nav>
      <textarea class="area"></textarea>`);
    const m = mirror(lens, surface);
    const area = orig<HTMLTextAreaElement>('.area');
    area.value = 'note';
    area.dispatchEvent(new Event('input', { bubbles: true }));
    expect((copy(m, '.area') as HTMLTextAreaElement).value).toBe('note');

    expect(copy(m, '.sticky')?.hasAttribute(STICKY_ATTR)).toBe(true);
    // Safari drops the lens filter over scroll containers: the copy has none.
    expect(copy(m, '.scroller')?.style.getPropertyValue('overflow')).toBe('hidden');
    expect(copy(m, '.scroller')?.style.getPropertyPriority('overflow')).toBe('important');

    const scroller = orig('.scroller');
    scroller.scrollTop = 30;
    scroller.dispatchEvent(new Event('scroll'));
    expect(copy(m, '.scroller')?.scrollTop).toBe(scroller.scrollTop);
  });

  it('styles the copy like the page and follows new styles', async () => {
    const { lens, surface } = page('<p class="text">One</p>');
    const m = mirror(lens, surface);
    const shadow = m.host.shadowRoot!;
    const text = () =>
      shadow.adoptedStyleSheets.length
        ? [...shadow.adoptedStyleSheets[0]!.cssRules].map((r) => r.cssText).join('')
        : [...shadow.querySelectorAll('style')].map((s) => s.textContent).join('');
    expect(text()).toContain('data-bb-mirror-hide');

    const style = document.createElement('style');
    style.textContent = '.text { color: rgb(1, 2, 3); }';
    document.head.append(style);
    await wait();
    expect(text()).toContain('rgb(1, 2, 3)');
    style.remove();
  });

  it('stands in empty boxes for content far from the lens', () => {
    const { lens, surface } = page(`
      <section class="far"><p>Far away</p></section>
      <section class="hidden" style="display:none"><p>Hidden</p></section>
      <span class="inline" style="display:inline">Inline</span>`);
    const rect = (top: number) => ({ top, bottom: top + 100, left: 0, right: 100 }) as DOMRect;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      return rect(this.closest('.far, .hidden, .inline') ? 5000 : 0);
    });
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);
    const m = mirror(lens, surface);
    const far = copy(m, '.far')!;
    expect(far.childNodes).toHaveLength(0);
    expect(far.style.getPropertyValue('content-visibility')).toBe('hidden');
    expect(far.style.getPropertyValue('contain-intrinsic-size')).toBe('100px 100px');
    expect(copy(m, '.hidden')?.childNodes).toHaveLength(0);
    // Inline boxes cannot stand in for their content: they are copied in full.
    expect(copy(m, '.inline')?.textContent).toBe('Inline');
    vi.restoreAllMocks();
  });

  it('copies selects, canvases and media without loading them', () => {
    const { lens, surface } = page(`
      <select class="pick"><option>a</option><option>b</option></select>
      <canvas class="paint" width="4" height="4"></canvas>
      <video class="clip" src="about:blank" autoplay></video>
      <img class="pic" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" loading="lazy" />`);
    orig<HTMLSelectElement>('.pick').selectedIndex = 1;
    const m = mirror(lens, surface);
    expect((copy(m, '.pick') as HTMLSelectElement).selectedIndex).toBe(1);
    expect(copy(m, '.paint')).toBeInstanceOf(HTMLCanvasElement);
    expect(copy(m, '.clip')?.hasAttribute('src')).toBe(false);
    expect(copy(m, '.clip')?.hasAttribute('autoplay')).toBe(false);
    expect(copy(m, '.pic')?.getAttribute('loading')).toBe('eager');

    const pick = orig<HTMLSelectElement>('.pick');
    pick.selectedIndex = 0;
    pick.dispatchEvent(new Event('change', { bubbles: true }));
    expect((copy(m, '.pick') as HTMLSelectElement).selectedIndex).toBe(0);
  });

  it('leaves top-layer elements out', () => {
    const { lens, surface } = page('<div class="pop" popover>Menu</div>');
    const matches = Element.prototype.matches;
    vi.spyOn(Element.prototype, 'matches').mockImplementation(function (this: Element, s) {
      return s.includes(':popover-open') ? this.classList.contains('pop') : matches.call(this, s);
    });
    const m = mirror(lens, surface);
    expect(copy(m, '.pop')).toBeNull();
    vi.restoreAllMocks();
  });

  it('moves sticky copies to where the originals are', () => {
    const { lens, surface } = page('<nav class="sticky" style="position:sticky;top:0">Tabs</nav>');
    const m = mirror(lens, surface);
    const sticky = orig('.sticky');
    vi.spyOn(sticky, 'getBoundingClientRect').mockReturnValue({ left: 10, top: 40 } as DOMRect);
    m.sync();
    expect(copy(m, '.sticky')?.style.translate).toBe('10px 40px');
    // A style patch keeps the mirror's own offset.
    sticky.setAttribute('style', 'position:sticky;top:4px');
    m.mutated([{ type: 'attributes', target: sticky, attributeName: 'style' } as never]);
    expect(copy(m, '.sticky')?.style.translate).toBe('10px 40px');
    vi.restoreAllMocks();
  });

  it('rebuilds after a burst of style changes, a long scroll, a resize or a late image', async () => {
    const { lens, surface } = page('<p class="text">One</p><img class="pic" />');
    const m = mirror(lens, surface);
    const rebuild = vi.spyOn(m, 'rebuild');
    const build = vi.spyOn(m, 'build');

    orig('.text').setAttribute('class', 'text big');
    await wait(500);
    expect(build).toHaveBeenCalledTimes(1);

    m.scrolled(null, 10_000);
    expect(rebuild).toHaveBeenCalledTimes(2);

    window.dispatchEvent(new Event('resize'));
    orig('.pic').dispatchEvent(new Event('load'));
    expect(rebuild).toHaveBeenCalledTimes(4);

    m.rebuild(true);
    expect(build).toHaveBeenCalledTimes(2);
  });

  it('copies checkbox input and ignores elements it does not mirror', () => {
    const { lens, surface } = page('<input class="box" type="checkbox" />');
    const m = mirror(lens, surface);
    const box = orig<HTMLInputElement>('.box');
    box.checked = true;
    box.dispatchEvent(new Event('input', { bubbles: true }));
    expect((copy(m, '.box') as HTMLInputElement).checked).toBe(true);
    expect(() => m.input(document.createElement('input'))).not.toThrow();
    expect(() => m.scrolled(document.createElement('div'), 0)).not.toThrow();
  });

  it('flattens imports and media, and copies unreadable sheets as nodes', () => {
    class FakeImport {
      constructor(
        public styleSheet: unknown,
        public media = { mediaText: 'print' },
      ) {}
    }
    vi.stubGlobal('CSSImportRule', FakeImport);
    const link = document.createElement('link');
    const rules = (...cssText: string[]) => cssText.map((text) => ({ cssText: text }));
    const sheets = [
      { media: { mediaText: 'screen' }, cssRules: rules('.a{color:red}') },
      { cssRules: [new FakeImport({ cssRules: rules('.b{color:blue}') })] },
      {
        ownerNode: link,
        get cssRules(): never {
          throw new DOMException('cross-origin', 'SecurityError');
        },
      },
      { disabled: true, cssRules: rules('.c{color:green}') },
    ];
    vi.spyOn(document, 'styleSheets', 'get').mockReturnValue(sheets as never);
    const { lens, surface } = page('<p class="text">One</p>');
    const m = mirror(lens, surface);
    const shadow = m.host.shadowRoot!;
    const text = [...shadow.adoptedStyleSheets]
      .flatMap((s) => [...s.cssRules])
      .map((r) => r.cssText);
    expect(text.join(' ')).toMatch(/@media screen/);
    expect(text.join(' ')).toMatch(/@media print/);
    expect(text.join(' ')).not.toMatch(/green/);
    expect([...shadow.children].some((el) => el.tagName === 'LINK')).toBe(true);
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('falls back to style nodes without constructed stylesheets', () => {
    const descriptor = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, 'adoptedStyleSheets');
    delete (ShadowRoot.prototype as { adoptedStyleSheets?: unknown }).adoptedStyleSheets;
    try {
      const { lens, surface } = page('<p class="text">One</p>');
      const m = mirror(lens, surface);
      const style = [...m.host.shadowRoot!.children].find((el) => el.tagName === 'STYLE');
      expect(style?.textContent).toContain('data-bb-mirror-hide');
    } finally {
      if (descriptor) Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', descriptor);
    }
  });

  it('starts scrolled boxes where they are, and patches removed attributes', () => {
    const { lens, surface } = page(
      '<div class="scroller" data-x="1" style="overflow:auto;height:20px"><div style="height:200px"></div></div>',
    );
    const scroller = orig('.scroller');
    scroller.scrollTop = 25;
    const m = mirror(lens, surface);
    expect(copy(m, '.scroller')?.scrollTop).toBe(scroller.scrollTop);

    scroller.removeAttribute('data-x');
    scroller.setAttribute('autofocus', '');
    m.mutated([
      { type: 'attributes', target: scroller, attributeName: 'data-x' },
      { type: 'attributes', target: scroller, attributeName: 'autofocus' },
    ] as never);
    expect(copy(m, '.scroller')?.hasAttribute('data-x')).toBe(false);
    expect(copy(m, '.scroller')?.hasAttribute('autofocus')).toBe(false);
  });

  it('freezes animated values into the copy and keeps endless ones fresh', () => {
    vi.useFakeTimers();
    const { lens, surface } = page('<span class="blob" style="opacity:0.4">o</span>');
    const blob = orig('.blob');
    const define = (target: object, value: unknown) =>
      Object.defineProperty(target, 'getAnimations', { configurable: true, value });
    define(document, () => [
      {
        playState: 'running',
        effect: {
          target: blob,
          pseudoElement: null,
          getKeyframes: () => [
            { offset: 0, opacity: '0' },
            { offset: 1, opacity: '1' },
          ],
          getTiming: () => ({ iterations: Infinity }),
        },
      },
      { playState: 'finished', effect: null },
    ]);
    try {
      const m = mirror(lens, surface);
      expect(copy(m, '.blob')?.style.getPropertyValue('opacity')).toBe('0.4');
      expect(copy(m, '.blob')?.style.getPropertyPriority('opacity')).toBe('important');
      blob.style.opacity = '0.9';
      vi.advanceTimersByTime(1000);
      expect(copy(m, '.blob')?.style.getPropertyValue('opacity')).toBe('0.9');
    } finally {
      delete (document as { getAnimations?: unknown }).getAnimations;
      vi.useRealTimers();
    }
  });

  it('stops listening once destroyed', async () => {
    const { lens, surface } = page('<p class="text">One</p>');
    const m = mirror(lens, surface);
    const mutated = vi.spyOn(m, 'mutated');
    m.destroy();
    orig('.text').setAttribute('data-x', '1');
    await wait();
    expect(mutated).not.toHaveBeenCalled();
    expect(m.host.isConnected).toBe(false);
  });
});
