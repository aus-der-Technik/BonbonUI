import { flushSync } from 'svelte';
import { click, html, key, render, tick } from '../../test/render';
import { computePosition } from './anchor';
import Breadcrumbs from './Breadcrumbs.svelte';
import ConfirmButton from './ConfirmButton.svelte';
import RefreshButton from './RefreshButton.svelte';
import ToolGroup from './ToolGroup.svelte';
const viewport = { width: 1000, height: 800 };
const box = (top, left, width = 40, height = 30) => ({
    top,
    bottom: top + height,
    left,
    right: left + width,
    width,
    height,
});
const size = { width: 200, height: 300 };
const byText = (host, text) => [...host.querySelectorAll('button, a')].find((el) => el.textContent?.trim() === text);
describe('computePosition beside the trigger', () => {
    it('opens to the right, aligned with the trigger top, growing from its left edge', () => {
        const pos = computePosition(box(100, 100), size, viewport, { placement: 'right-start' });
        expect(pos).toMatchObject({ top: 100, left: 148, side: 'right', flipped: false });
        // Origin: the facing (left) edge, level with the trigger's centre (100 + 15 - 100).
        expect(pos.origin).toBe('left 15px');
    });
    it('flips to the left when there is no room on the right', () => {
        const pos = computePosition(box(100, 900), size, viewport, { placement: 'right-start' });
        expect(pos.side).toBe('left');
        expect(pos.flipped).toBe(true);
        expect(pos.left).toBe(900 - 8 - 200);
        expect(pos.origin).toBe('right 15px');
    });
    it('flips to the right when asked for the left at the left edge', () => {
        const pos = computePosition(box(100, 20), size, viewport, { placement: 'left' });
        expect(pos.side).toBe('right');
        expect(pos.left).toBe(20 + 40 + 8);
        // Centred vertically on the trigger: 115 - 150.
        expect(pos.top).toBe(8);
    });
    it('centres vertically and keeps the panel inside the viewport', () => {
        const middle = computePosition(box(400, 100), size, viewport, { placement: 'right' });
        expect(middle.top).toBe(415 - 150);
        const low = computePosition(box(760, 100), size, viewport, { placement: 'left-start' });
        expect(low.top).toBe(800 - 300 - 8);
        expect(low.side).toBe('right');
        const end = computePosition(box(400, 500), size, viewport, { placement: 'left-end' });
        expect(end.top).toBe(430 - 300);
        expect(end.left).toBe(500 - 8 - 200);
    });
    it('lays a centred panel over the trigger', () => {
        const pos = computePosition(box(400, 400), size, viewport, { placement: 'center' });
        expect(pos.side).toBe('center');
        expect(pos.left).toBe(420 - 100);
        expect(pos.top).toBe(415 - 150);
        expect(pos.origin).toBe('100px 150px');
    });
    it('still reports the side for top and bottom placements', () => {
        expect(computePosition(box(100, 100), size, viewport).side).toBe('bottom');
        expect(computePosition(box(600, 100), size, viewport).side).toBe('top');
    });
});
describe('ConfirmButton done state', () => {
    afterEach(() => vi.useRealTimers());
    it('says it is done for a moment, announced politely, then returns to rest', async () => {
        vi.useFakeTimers();
        const onconfirm = vi.fn(() => Promise.resolve());
        const host = render(ConfirmButton, { onconfirm, doneLabel: 'Deleted', doneFor: 2000 });
        click(byText(host, 'Delete'));
        click(byText(host, 'Delete permanently'));
        await vi.advanceTimersByTimeAsync(0);
        flushSync();
        expect(byText(host, 'Deleted')).toBeDefined();
        expect(host.querySelector('[role="status"]')?.textContent).toBe('Deleted');
        // A click on "Deleted" does not arm it again.
        click(byText(host, 'Deleted'));
        expect(byText(host, 'Delete permanently')).toBeUndefined();
        await vi.advanceTimersByTimeAsync(2000);
        flushSync();
        expect(byText(host, 'Delete')).toBeDefined();
        expect(host.querySelector('[role="status"]')?.textContent).toBe('');
        expect(onconfirm).toHaveBeenCalledOnce();
    });
    it('goes straight back to rest without a done label', async () => {
        const host = render(ConfirmButton, { onconfirm: () => { } });
        click(byText(host, 'Delete'));
        click(byText(host, 'Delete permanently'));
        await tick();
        flushSync();
        expect(byText(host, 'Delete')).toBeDefined();
    });
});
describe('Breadcrumbs without URLs', () => {
    it('renders link-styled buttons for onclick and onnavigate crumbs', () => {
        const onclick = vi.fn();
        const onnavigate = vi.fn();
        const host = render(Breadcrumbs, {
            items: [
                { label: 'Home', href: '/' },
                { label: 'Files', onclick },
                { label: 'Q3' },
                { label: 'Report' },
            ],
            onnavigate,
        });
        expect(host.querySelector('a')?.getAttribute('href')).toBe('/');
        const buttons = [...host.querySelectorAll('button')];
        expect(buttons.map((b) => b.textContent)).toEqual(['Files', 'Q3']);
        expect(buttons.every((b) => b.type === 'button' && b.classList.contains('crumb'))).toBe(true);
        click(buttons[0]);
        expect(onclick).toHaveBeenCalledOnce();
        expect(onnavigate).toHaveBeenCalledWith(expect.objectContaining({ label: 'Files' }), 1);
        click(buttons[1]);
        expect(onnavigate).toHaveBeenLastCalledWith(expect.objectContaining({ label: 'Q3' }), 2);
        const current = host.querySelector('[aria-current="page"]');
        expect(current?.textContent).toBe('Report');
        expect(current?.tagName).toBe('SPAN');
    });
    it('keeps plain text crumbs when there is nothing to navigate with', () => {
        const host = render(Breadcrumbs, { items: [{ label: 'A' }, { label: 'B' }] });
        expect(host.querySelector('button')).toBeNull();
    });
});
describe('RefreshButton variants', () => {
    it('can be a quiet tool inside a panel', () => {
        const quiet = render(RefreshButton, { variant: 'secondary', size: 'sm' });
        const button = quiet.querySelector('button');
        expect(button.className).toContain('btn--secondary');
        expect(button.className).toContain('btn--sm');
        expect(render(RefreshButton, { variant: 'ghost' }).querySelector('.btn--ghost')).not.toBeNull();
        const loud = render(RefreshButton, {}).querySelector('button');
        expect(loud.className).toContain('btn--primary');
        expect(loud.className).toContain('btn--lg');
        // Live mode stays the calm glass status, whatever the variant.
        expect(render(RefreshButton, { live: true, variant: 'secondary' }).querySelector('.btn--ghost')).not.toBeNull();
    });
});
describe('ToolGroup', () => {
    it('is one tab stop; arrows, Home and End move between enabled tools', async () => {
        const host = render(ToolGroup, {
            label: 'Text style',
            children: html('<span><button id="a">A</button><button id="b" disabled>B</button><button id="c" aria-pressed="true">C</button><button id="d">D</button></span>'),
        });
        await tick();
        const toolbar = host.querySelector('[role="toolbar"]');
        expect(toolbar.getAttribute('aria-label')).toBe('Text style');
        const [a, , c, d] = [...host.querySelectorAll('button')];
        // The pressed tool is where Tab lands.
        expect([a.tabIndex, c.tabIndex, d.tabIndex]).toEqual([-1, 0, -1]);
        c.focus();
        key(c, 'ArrowRight');
        expect(document.activeElement).toBe(d);
        key(d, 'ArrowRight');
        expect(document.activeElement).toBe(a);
        key(a, 'ArrowRight');
        expect(document.activeElement).toBe(c);
        key(c, 'End');
        expect(document.activeElement).toBe(d);
        key(d, 'Home');
        expect(document.activeElement).toBe(a);
        expect([a.tabIndex, c.tabIndex, d.tabIndex]).toEqual([0, -1, -1]);
    });
    it('moves with up and down when vertical', async () => {
        const host = render(ToolGroup, {
            orientation: 'vertical',
            children: html('<span><button>A</button><button>B</button></span>'),
        });
        await tick();
        const [a, b] = [...host.querySelectorAll('button')];
        expect(host.querySelector('[role="toolbar"]')?.getAttribute('aria-orientation')).toBe('vertical');
        a.focus();
        key(a, 'ArrowRight');
        expect(document.activeElement).toBe(a);
        key(a, 'ArrowDown');
        expect(document.activeElement).toBe(b);
    });
});
