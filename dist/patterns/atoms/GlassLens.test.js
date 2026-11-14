import { flushSync } from 'svelte';
import { render } from '../../test/render';
import GlassLens from './GlassLens.svelte';
import NavBar from '../organisms/NavBar.svelte';
import TitlePill from '../molecules/TitlePill.svelte';
import GlassPill from '../molecules/GlassPill.svelte';
import Layer from '../layout/Layer.svelte';
import Dock from '../desktop/Dock.svelte';
import MenuBar from '../desktop/MenuBar.svelte';
import Toolbar from '../desktop/Toolbar.svelte';
import { html } from '../../test/render';
// happy-dom has no layout: give every element a size the lens can work with.
function sized(width = 480, height = 56) {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(width);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(height);
}
afterEach(() => vi.restoreAllMocks());
describe('GlassLens', () => {
    it('draws a displacement filter and a refracting layer that uses it', () => {
        sized();
        const host = render(GlassLens, { refraction: true });
        flushSync();
        const filter = host.querySelector('filter');
        const layer = host.querySelector('.refract');
        expect(filter?.id).toMatch(/^bb-lens-/);
        expect(filter?.querySelectorAll('feDisplacementMap')).toHaveLength(3);
        expect(layer?.getAttribute('style')).toContain(`url(#${filter?.id})`);
        expect(layer?.getAttribute('style')).toContain('saturate(112%)');
    });
    it('splits the colours by chroma', () => {
        sized();
        const host = render(GlassLens, { refraction: true, chroma: 0.1 });
        const scales = [...host.querySelectorAll('feDisplacementMap')].map((m) => Number(m.getAttribute('scale')));
        expect(scales[0]).toBeCloseTo(scales[1] * 1.1);
        expect(scales[2]).toBeCloseTo(scales[1] * 0.9);
    });
    it('is frosted unless refraction is opted into', () => {
        sized();
        expect(render(GlassLens, {}).querySelector('filter')).toBeNull();
    });
    it('stays frosted when refraction is off or the surface is tiny', () => {
        sized();
        expect(render(GlassLens, { refraction: false }).querySelector('filter')).toBeNull();
        vi.restoreAllMocks();
        sized(8, 8);
        expect(render(GlassLens, { refraction: true }).querySelector('filter')).toBeNull();
    });
    it('respects reduced transparency', () => {
        sized();
        const original = window.matchMedia;
        window.matchMedia = ((query) => ({
            matches: query.includes('reduced-transparency'),
            addEventListener() { },
            removeEventListener() { },
        }));
        try {
            expect(render(GlassLens, { refraction: true }).querySelector('filter')).toBeNull();
        }
        finally {
            window.matchMedia = original;
        }
    });
});
describe('lens on front-layer glass', () => {
    it('thins the NavBar and drops its own backdrop when the lens is drawn', () => {
        sized();
        const host = render(NavBar, { brand: 'Brand', lens: { refraction: true } });
        flushSync();
        expect(host.querySelector('.bar')?.classList.contains('lensed')).toBe(true);
        expect(host.querySelector('.bar > .lens .refract')).not.toBeNull();
    });
    it('keeps the NavBar frosted with lens={false} and passes blur / saturate to the frost', () => {
        sized();
        const off = render(NavBar, { brand: 'Brand', lens: false });
        expect(off.querySelector('.lens')).toBeNull();
        expect(off.querySelector('.bar')?.classList.contains('lensed')).toBe(false);
        const frost = render(NavBar, { brand: 'Brand', lens: { refraction: false, blur: 15 } });
        const header = frost.querySelector('.navbar');
        expect(header?.style.getPropertyValue('--layer-front-blur')).toBe('blur(15px) saturate(118%)');
    });
    it('reaches the title pill, glass pills, menu bar, toolbar, dock and front layers', () => {
        sized();
        const on = { refraction: true };
        const cases = [
            [render(TitlePill, { title: 'Orders', lens: on }), '.pill'],
            [render(GlassPill, { children: html('<span>x</span>'), lens: on }), '.glass'],
            [render(MenuBar, { menus: [], clock: false, lens: on }), '.menubar'],
            [render(Toolbar, { title: 'Inbox', lens: on }), '.toolbar'],
            [render(Dock, { items: [], lens: on }), '.dock'],
            [render(Layer, { level: 'front', lens: on, children: html('<span>x</span>') }), '.layer'],
        ];
        for (const [host, selector] of cases) {
            const surface = host.querySelector(selector);
            expect(surface?.querySelector(':scope > .lens .refract'), selector).not.toBeNull();
            expect(surface?.classList.contains('lensed') || surface?.className.includes('lensed')).toBe(true);
        }
    });
    it("keeps mirrored copies out of a surface's own queries", () => {
        sized();
        // happy-dom is not Chromium, so the lens mirrors the page here, as it does in Safari.
        const host = render(Toolbar, {
            title: 'Inbox',
            lens: { refraction: true },
            items: [
                { icon: 'edit', label: 'Compose' },
                { icon: 'trash', label: 'Delete' },
            ],
        });
        expect(host.querySelector('.refract > span')?.shadowRoot).toBeTruthy();
        expect(host.querySelectorAll('.tool')).toHaveLength(2);
    });
    it('leaves panels and plain toolbars alone', () => {
        sized();
        const panel = render(Layer, { level: 'panel', children: html('<span>x</span>') });
        expect(panel.querySelector('.lens')).toBeNull();
        const plain = render(Toolbar, { title: 'Inbox', variant: 'plain' });
        expect(plain.querySelector('.lens')).toBeNull();
    });
});
