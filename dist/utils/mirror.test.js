import { HIDE_ATTR, LENS_ATTR, Mirror, SHELL_ATTR, softened, STICKY_ATTR } from './mirror';
/** A page with a glass surface (holding its lens box) above some content. */
function page(content) {
    document.body.innerHTML = `
    <header class="surface"><span class="lens" ${LENS_ATTR}></span><b>Bar</b></header>
    <main>${content}</main>`;
    const surface = document.querySelector('.surface');
    const lens = document.querySelector('.lens');
    return { surface, lens };
}
const mirrors = [];
function mirror(lens, surface) {
    const m = new Mirror(lens, surface);
    mirrors.push(m);
    lens.append(m.stillHost, m.host);
    return m;
}
/** The copy of an element, found by a selector that does not rely on ids. */
const copy = (m, selector) => m.stage.querySelector(selector);
/** The original — the copy sits in the header, so a plain document query would find it first. */
const orig = (selector) => document.body.querySelector(`:scope > main ${selector}`);
const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));
afterEach(() => {
    for (const m of mirrors.splice(0))
        m.destroy();
    document.body.innerHTML = '';
});
describe('Mirror', () => {
    it('copies the page above a still canvas and hides the surface in the copy', () => {
        const { lens, surface } = page('<p class="text">Behind the glass</p>');
        const m = mirror(lens, surface);
        const [canvas, still] = [...m.stillStage.children];
        expect(canvas?.style.zIndex).toBe('-2147483647');
        // A plain colour fills the still layer once instead of following the scroll.
        expect(canvas?.style.inset).toMatch(/^0(px)?$/);
        expect(still?.tagName).toBe('BODY');
        expect(m.stage.children[0]?.tagName).toBe('BODY');
        expect(m.stillHost.shadowRoot).not.toBe(m.host.shadowRoot);
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
        orig('.field').value = 'typed';
        const m = mirror(lens, surface);
        const field = copy(m, '.field');
        expect(field.id).toBe('q');
        expect(field.value).toBe('typed');
        expect(m.stage.getRootNode()).toBeInstanceOf(ShadowRoot);
        // The page sees only its own elements.
        expect(document.querySelectorAll('.field')).toHaveLength(1);
        expect(document.getElementById('q')).toBe(orig('.field'));
        expect(orig('.radio').checked).toBe(true);
        expect(copy(m, '.frame')?.hasAttribute('src')).toBe(false);
        expect(m.host.inert).toBe(true);
    });
    it('patches attributes, text and children in place, without copying the page again', async () => {
        const { lens, surface } = page('<p class="text">One</p><p class="last">Last</p>');
        const m = mirror(lens, surface);
        const build = vi.spyOn(m, 'build');
        const text = orig('.text');
        text.setAttribute('data-state', 'on');
        text.firstChild.textContent = 'Two';
        await wait();
        expect(copy(m, '.text')?.getAttribute('data-state')).toBe('on');
        expect(copy(m, '.text')?.textContent).toBe('Two');
        const main = document.body.querySelector(':scope > main');
        text.insertAdjacentHTML('afterend', '<p class="later">New</p>');
        main.append('tail');
        orig('.last').remove();
        // Added and removed again in the same batch: never copied.
        main.append(document.createElement('hr'));
        main.querySelector(':scope > hr').remove();
        await wait();
        const main2 = copy(m, 'main');
        expect([...main2.children].map((el) => el.className)).toEqual(['text', 'later']);
        expect(main2.textContent).toContain('tail');
        expect(main2.querySelector('hr')).toBeNull();
        await wait(200);
        expect(build).not.toHaveBeenCalled();
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
        const area = orig('.area');
        area.value = 'note';
        area.dispatchEvent(new Event('input', { bubbles: true }));
        expect(copy(m, '.area').value).toBe('note');
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
        const shadow = m.host.shadowRoot;
        const text = () => shadow.adoptedStyleSheets.length
            ? [...shadow.adoptedStyleSheets[0].cssRules].map((r) => r.cssText).join('')
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
        const rect = (top) => ({ top, bottom: top + 100, left: 0, right: 100 });
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
            return rect(this.closest('.far, .hidden, .inline') ? 5000 : 0);
        });
        vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
        vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);
        const m = mirror(lens, surface);
        const far = copy(m, '.far');
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
        orig('.pick').selectedIndex = 1;
        const m = mirror(lens, surface);
        expect(copy(m, '.pick').selectedIndex).toBe(1);
        expect(copy(m, '.paint')).toBeInstanceOf(HTMLCanvasElement);
        expect(copy(m, '.clip')?.hasAttribute('src')).toBe(false);
        expect(copy(m, '.clip')?.hasAttribute('autoplay')).toBe(false);
        expect(copy(m, '.pic')?.getAttribute('loading')).toBe('eager');
        const pick = orig('.pick');
        pick.selectedIndex = 0;
        pick.dispatchEvent(new Event('change', { bubbles: true }));
        expect(copy(m, '.pick').selectedIndex).toBe(0);
    });
    it('leaves top-layer elements out', () => {
        const { lens, surface } = page('<div class="pop" popover>Menu</div>');
        const matches = Element.prototype.matches;
        vi.spyOn(Element.prototype, 'matches').mockImplementation(function (s) {
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
        vi.spyOn(sticky, 'getBoundingClientRect').mockReturnValue({ left: 10, top: 40 });
        m.sync();
        expect(copy(m, '.sticky')?.style.translate).toBe('10px 40px');
        // A style patch keeps the mirror's own offset.
        sticky.setAttribute('style', 'position:sticky;top:4px');
        m.mutated([{ type: 'attributes', target: sticky, attributeName: 'style' }]);
        expect(copy(m, '.sticky')?.style.translate).toBe('10px 40px');
        vi.restoreAllMocks();
    });
    it('refreshes stand-ins after style changes, a long scroll or a late image; rebuilds on resize', async () => {
        const { lens, surface } = page('<p class="text">One</p><img class="pic" />');
        const m = mirror(lens, surface);
        const refresh = vi.spyOn(m, 'refresh');
        const rebuild = vi.spyOn(m, 'rebuild');
        const build = vi.spyOn(m, 'build');
        orig('.text').setAttribute('class', 'text big');
        await wait();
        expect(refresh).toHaveBeenCalledTimes(1);
        m.scrolled(null, 10_000);
        orig('.pic').dispatchEvent(new Event('load'));
        expect(refresh).toHaveBeenCalledTimes(3);
        await wait(200);
        expect(build).not.toHaveBeenCalled();
        window.dispatchEvent(new Event('resize'));
        document.documentElement.setAttribute('data-theme', 'dark');
        await wait();
        expect(rebuild).toHaveBeenCalledTimes(2);
        document.documentElement.removeAttribute('data-theme');
        m.rebuild(true);
        expect(build).toHaveBeenCalled();
    });
    it('fills in a stand-in once it comes near or its original changes size', async () => {
        const { lens, surface } = page(`
      <section class="far"><p class="inner">Far away</p></section>
      <section class="grows"><p class="inner2">Grows</p></section>
      <section class="shown" style="display:none"><p>Shown</p></section>`);
        let top = 5000;
        let height = 100;
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
            const t = this.closest('.far') ? top : this.closest('.grows, .shown') ? 9000 : 0;
            return { top: t, bottom: t + 100, left: 0, right: 100, width: 100, height: 100 };
        });
        vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
        vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function () {
            return this.closest('.grows') ? height : 100;
        });
        const m = mirror(lens, surface);
        expect(copy(m, '.inner')).toBeNull();
        expect(copy(m, '.inner2')).toBeNull();
        // A change inside a stand-in only asks for a refresh.
        const refresh = vi.spyOn(m, 'refresh');
        orig('.inner2').setAttribute('data-x', '1');
        await wait();
        expect(refresh).toHaveBeenCalled();
        top = 100;
        height = 300;
        orig('.shown').style.display = 'block';
        await wait(200);
        expect(copy(m, '.inner')?.textContent).toBe('Far away');
        // Still far, but with a new size to stand in for.
        expect(copy(m, '.grows')?.style.getPropertyValue('contain-intrinsic-size')).toBe('100px 300px');
        expect(copy(m, '.inner2')).toBeNull();
        vi.restoreAllMocks();
    });
    it('lifts backgrounds below the content into the still layer, placed where they are', () => {
        const { lens, surface } = page(`
      <div class="frame">
        <div class="glow" style="position:fixed;z-index:-1;inset:0"><i class="blob"></i></div>
        <div class="over" style="position:fixed;z-index:3">Toast</div>
      </div>
      <div class="painted" style="background:red">
        <div class="kept" style="position:absolute;z-index:-1"></div>
      </div>`);
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
            const glow = this.classList.contains('glow');
            return {
                top: glow ? 10 : 0,
                left: glow ? 20 : 0,
                bottom: 300,
                right: 400,
                width: glow ? 380 : 400,
                height: glow ? 290 : 300,
            };
        });
        const m = mirror(lens, surface);
        const glow = m.stillStage.querySelector('.glow');
        expect(glow?.parentElement?.hasAttribute(SHELL_ATTR)).toBe(true);
        expect(glow?.parentElement?.className).toBe('frame');
        expect(glow?.querySelector('.blob')).not.toBeNull();
        expect(glow?.style.getPropertyValue('position')).toBe('absolute');
        expect(glow?.style.left).toBe('20px');
        expect(glow?.style.width).toBe('380px');
        expect(copy(m, '.glow')).toBeNull();
        // Above the content, or on top of a painted ancestor: stays with the content.
        expect(copy(m, '.over')).not.toBeNull();
        expect(copy(m, '.kept')).not.toBeNull();
        // A theme switch on an ancestor reaches the stand-in too.
        orig('.frame').setAttribute('data-theme', 'dark');
        m.mutated([
            { type: 'attributes', target: orig('.frame'), attributeName: 'data-theme' },
        ]);
        expect(glow?.parentElement?.getAttribute('data-theme')).toBe('dark');
        vi.restoreAllMocks();
    });
    it('copies checkbox input and ignores elements it does not mirror', () => {
        const { lens, surface } = page('<input class="box" type="checkbox" />');
        const m = mirror(lens, surface);
        const box = orig('.box');
        box.checked = true;
        box.dispatchEvent(new Event('input', { bubbles: true }));
        expect(copy(m, '.box').checked).toBe(true);
        expect(() => m.input(document.createElement('input'))).not.toThrow();
        expect(() => m.scrolled(document.createElement('div'), 0)).not.toThrow();
    });
    it('flattens imports and media, and copies unreadable sheets as nodes', () => {
        class FakeImport {
            styleSheet;
            media;
            constructor(styleSheet, media = { mediaText: 'print' }) {
                this.styleSheet = styleSheet;
                this.media = media;
            }
        }
        vi.stubGlobal('CSSImportRule', FakeImport);
        const link = document.createElement('link');
        const rules = (...cssText) => cssText.map((text) => ({ cssText: text }));
        const sheets = [
            { media: { mediaText: 'screen' }, cssRules: rules('.a{color:red}') },
            { cssRules: [new FakeImport({ cssRules: rules('.b{color:blue}') })] },
            {
                ownerNode: link,
                get cssRules() {
                    throw new DOMException('cross-origin', 'SecurityError');
                },
            },
            { disabled: true, cssRules: rules('.c{color:green}') },
        ];
        vi.spyOn(document, 'styleSheets', 'get').mockReturnValue(sheets);
        const { lens, surface } = page('<p class="text">One</p>');
        const m = mirror(lens, surface);
        const shadow = m.host.shadowRoot;
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
        delete ShadowRoot.prototype.adoptedStyleSheets;
        try {
            const { lens, surface } = page('<p class="text">One</p>');
            const m = mirror(lens, surface);
            const style = [...m.host.shadowRoot.children].find((el) => el.tagName === 'STYLE');
            expect(style?.textContent).toContain('data-bb-mirror-hide');
        }
        finally {
            if (descriptor)
                Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', descriptor);
        }
    });
    it('starts scrolled boxes where they are, and patches removed attributes', () => {
        const { lens, surface } = page('<div class="scroller" data-x="1" style="overflow:auto;height:20px"><div style="height:200px"></div></div>');
        const scroller = orig('.scroller');
        scroller.scrollTop = 25;
        const m = mirror(lens, surface);
        expect(copy(m, '.scroller')?.scrollTop).toBe(scroller.scrollTop);
        scroller.removeAttribute('data-x');
        scroller.setAttribute('autofocus', '');
        m.mutated([
            { type: 'attributes', target: scroller, attributeName: 'data-x' },
            { type: 'attributes', target: scroller, attributeName: 'autofocus' },
        ]);
        expect(copy(m, '.scroller')?.hasAttribute('data-x')).toBe(false);
        expect(copy(m, '.scroller')?.hasAttribute('autofocus')).toBe(false);
    });
    it('freezes animated values into the copy and keeps endless ones fresh', () => {
        vi.useFakeTimers();
        const { lens, surface } = page('<span class="blob" style="opacity:0.4">o</span>');
        const blob = orig('.blob');
        const define = (target, value) => Object.defineProperty(target, 'getAnimations', { configurable: true, value });
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
        }
        finally {
            delete document.getAnimations;
            vi.useRealTimers();
        }
    });
    it('refreshes drifting backgrounds in the still layer only every few seconds', () => {
        vi.useFakeTimers();
        const { lens, surface } = page('<div class="glow" style="position:fixed;z-index:-1"><i class="blob" style="opacity:0.2"></i></div>');
        const blob = orig('.blob');
        Object.defineProperty(document, 'getAnimations', {
            configurable: true,
            value: () => [
                {
                    playState: 'running',
                    effect: {
                        target: blob,
                        getKeyframes: () => [{ offset: 1, opacity: '1' }],
                        getTiming: () => ({ iterations: Infinity }),
                    },
                },
            ],
        });
        try {
            const m = mirror(lens, surface);
            const still = () => m.stillStage.querySelector('.blob').style.opacity;
            expect(still()).toBe('0.2');
            blob.style.opacity = '0.6';
            vi.advanceTimersByTime(3000);
            expect(still()).toBe('0.2');
            vi.advanceTimersByTime(7000);
            expect(still()).toBe('0.6');
        }
        finally {
            delete document.getAnimations;
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
describe('softened', () => {
    it('drops wide blurs and keeps everything else', () => {
        expect(softened('blur(70px) saturate(1.3)')).toBe('saturate(1.3)');
        expect(softened('blur(80px)')).toBe('none');
        expect(softened('blur(4px) saturate(1.3)')).toBeNull();
        expect(softened('none')).toBeNull();
        expect(softened('')).toBeNull();
    });
});
