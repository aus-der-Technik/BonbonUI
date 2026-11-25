// Runes in a test file: the `.svelte.test.ts` suffix lets props change after mounting.
import { flushSync, mount, unmount } from 'svelte';
import { click, render, tick } from '../../test/render';
import Price from '../atoms/Price.svelte';
import CartLine from './CartLine.svelte';
import KpiTile from './KpiTile.svelte';
import Pager from './Pager.svelte';
import PricingCard from './PricingCard.svelte';
import ProductCard from './ProductCard.svelte';
import QuantityStepper from './QuantityStepper.svelte';
import Stat from './Stat.svelte';
import { deltaDirection, deltaTone, formatDelta } from './delta';
const byLabel = (host, label) => host.querySelector(`[aria-label="${label}"]`);
const byText = (host, label) => [...host.querySelectorAll('button')].find((b) => b.textContent?.trim() === label);
describe('shared delta', () => {
    it('reads direction and tone from a number or a printed change', () => {
        expect(deltaDirection(3)).toBe('up');
        expect(deltaDirection(-1)).toBe('down');
        expect(deltaDirection(0)).toBe('flat');
        expect(deltaDirection('−3')).toBe('down');
        expect(deltaDirection('+2')).toBe('up');
        expect(deltaDirection('0')).toBe('flat');
        expect(deltaDirection(undefined)).toBe('flat');
        expect(deltaTone('down', 'down')).toBe('good');
        expect(deltaTone('up', 'down')).toBe('bad');
        expect(deltaTone('up', 'none')).toBe('neutral');
        expect(formatDelta(12.5)).toBe('+12.5 %');
    });
});
describe('KpiTile with Stat props', () => {
    it('takes a numeric delta, goodWhen, deltaLabel, unit and locale like Stat', () => {
        const host = render(KpiTile, {
            label: 'Errors',
            value: 1284,
            unit: 'h',
            delta: -8,
            deltaLabel: 'vs last week',
            goodWhen: 'down',
        });
        expect(host.querySelector('.value')?.textContent).toContain('1,284');
        expect(host.querySelector('.unit')?.textContent).toBe('h');
        const pill = host.querySelector('.delta--good');
        expect(pill?.textContent?.trim()).toBe('-8 %');
        expect(pill?.getAttribute('data-trend')).toBe('down');
        expect(host.textContent).toContain('vs last week');
        const text = render(KpiTile, { label: 'x', value: null, delta: 3, deltaText: '+3 new' });
        expect(text.querySelector('.delta--good')?.textContent?.trim()).toBe('+3 new');
        expect(text.querySelector('.value')?.textContent?.trim()).toBe('–');
        const none = render(KpiTile, { label: 'x', value: 1, delta: 5, goodWhen: 'none' });
        expect(none.querySelector('.delta--neutral')).not.toBeNull();
    });
    it('renders the same delta pill as Stat', () => {
        const stat = render(Stat, { label: 'x', value: 1, delta: 4, goodWhen: 'down' });
        const tile = render(KpiTile, { label: 'x', value: 1, delta: 4, goodWhen: 'down' });
        expect(stat.querySelector('.delta--bad')?.textContent?.trim()).toBe('+4 %');
        expect(tile.querySelector('.delta--bad')?.textContent?.trim()).toBe('+4 %');
    });
});
describe('changed-value cue', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function mountReactive(component, initial) {
        const props = $state(initial);
        const host = document.createElement('div');
        document.body.append(host);
        const app = mount(component, { target: host, props });
        flushSync();
        return {
            host,
            props,
            done: () => {
                unmount(app);
                host.remove();
            },
        };
    }
    beforeEach(() => vi.stubGlobal('matchMedia', () => ({ matches: false })));
    afterEach(() => vi.unstubAllGlobals());
    it('glows a Stat value when it changes, not on the first render', () => {
        const { host, props, done } = mountReactive(Stat, { label: 'Open', value: 3 });
        const value = host.querySelector('.value');
        expect(value.style.animation).toBe('');
        props.value = 4;
        flushSync();
        expect(value.style.animation).toContain('bb-changed');
        done();
    });
    it('glows a Price amount and a KpiTile value when they change', () => {
        const price = mountReactive(Price, { amount: 10 });
        const amount = price.host.querySelector('.amount');
        expect(amount.style.animation).toBe('');
        price.props.amount = 12;
        flushSync();
        expect(amount.style.animation).toContain('bb-changed');
        price.done();
        const tile = mountReactive(KpiTile, { label: 'x', value: 1 });
        const value = tile.host.querySelector('.value');
        tile.props.value = 2;
        flushSync();
        expect(value.style.animation).toContain('bb-changed');
        tile.done();
    });
    it('stays still under reduced motion', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: true }));
        const { host, props, done } = mountReactive(Stat, { label: 'Open', value: 3 });
        props.value = 4;
        flushSync();
        expect(host.querySelector('.value').style.animation).toBe('');
        done();
    });
});
describe('English by default', () => {
    it('formats money in English unless a locale is given', () => {
        expect(render(Price, { amount: 49 }).textContent).toContain('€49.00');
        expect(render(Price, { amount: 49, locale: 'de-DE' }).textContent).toContain('49,00');
        expect(render(CartLine, { title: 'Shirt', price: 59, quantity: 2 }).textContent).toContain('€118.00');
        expect(render(ProductCard, { title: 'Shirt', price: 59 }).textContent).toContain('€59.00');
        expect(render(PricingCard, { name: 'Team', price: 29 }).textContent).toContain('€29');
    });
});
describe('failed actions show at the button', () => {
    it('ProductCard says the add failed, then recovers', async () => {
        vi.useFakeTimers();
        let fail = true;
        const onadd = vi.fn(() => (fail ? Promise.reject(new Error('offline')) : Promise.resolve()));
        const host = render(ProductCard, { title: 'Shirt', price: 59, onadd });
        click(byLabel(host, 'Add to cart'));
        await vi.advanceTimersByTimeAsync(0);
        flushSync();
        const button = byLabel(host, "Couldn't add to cart");
        expect(button).not.toBeNull();
        expect(button?.classList.contains('btn--danger-solid')).toBe(true);
        expect(host.querySelector('[role="status"]')?.textContent).toContain("Couldn't add to cart");
        await vi.advanceTimersByTimeAsync(4000);
        flushSync();
        expect(byLabel(host, 'Add to cart')).not.toBeNull();
        fail = false;
        click(byLabel(host, 'Add to cart'));
        await vi.advanceTimersByTimeAsync(0);
        flushSync();
        expect(byLabel(host, 'Added to cart')).not.toBeNull();
        vi.useRealTimers();
    });
    it('PricingCard shows failedLabel on its button', async () => {
        const onselect = vi.fn(() => Promise.reject(new Error('nope')));
        const host = render(PricingCard, {
            name: 'Team',
            price: 29,
            onselect,
            failedLabel: 'Try again',
        });
        click(byText(host, 'Get started'));
        await tick();
        flushSync();
        const button = byText(host, 'Try again');
        expect(button).toBeDefined();
        expect(button?.classList.contains('btn--danger')).toBe(true);
        expect(host.querySelector('[role="status"]')?.textContent).toContain('Try again');
    });
});
describe('unavailable buttons keep the focus', () => {
    it('Pager: Next at the last page stays focused and does nothing', () => {
        const onpage = vi.fn();
        const host = render(Pager, { offset: 25, limit: 25, total: 50, onpage });
        const next = byText(host, 'Next');
        next.focus();
        expect(next.getAttribute('aria-disabled')).toBe('true');
        expect(next.disabled).toBe(false);
        click(next);
        expect(onpage).not.toHaveBeenCalled();
        expect(document.activeElement).toBe(next);
        click(byText(host, 'Previous'));
        expect(onpage).toHaveBeenCalledWith(0);
    });
    it('QuantityStepper: + at the maximum keeps focus and shakes', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: false }));
        const animate = vi.fn();
        const original = HTMLElement.prototype.animate;
        HTMLElement.prototype.animate = animate;
        const onchange = vi.fn();
        const host = render(QuantityStepper, { value: 2, max: 3, onchange });
        const inc = byLabel(host, 'Increase quantity');
        inc.focus();
        click(inc);
        expect(onchange).toHaveBeenLastCalledWith(3);
        expect(inc.getAttribute('aria-disabled')).toBe('true');
        expect(document.activeElement).toBe(inc);
        animate.mockClear();
        click(inc);
        expect(onchange).toHaveBeenCalledTimes(1);
        expect(document.activeElement).toBe(inc);
        // The "nope" head-shake runs on the pill.
        expect(animate).toHaveBeenCalledOnce();
        expect(animate.mock.contexts[0]).toBe(host.querySelector('.stepper'));
        HTMLElement.prototype.animate = original;
        vi.unstubAllGlobals();
    });
});
