import { flushSync } from 'svelte';
import { click, html, input, key, render, tick } from '../test/render';
import CartLine from './molecules/CartLine.svelte';
import CheckoutSteps from './molecules/CheckoutSteps.svelte';
import FeatureCard from './molecules/FeatureCard.svelte';
import LogoCloud from './molecules/LogoCloud.svelte';
import NewsletterSignup from './molecules/NewsletterSignup.svelte';
import PricingCard from './molecules/PricingCard.svelte';
import ProductCard from './molecules/ProductCard.svelte';
import QuantityStepper from './molecules/QuantityStepper.svelte';
import Testimonial from './molecules/Testimonial.svelte';
import VariantPicker from './molecules/VariantPicker.svelte';
import { accentColor, discountPercent, formatPrice } from './molecules/web';
import CallToAction from './organisms/CallToAction.svelte';
import CartSummary from './organisms/CartSummary.svelte';
import Faq from './organisms/Faq.svelte';
import FeatureGrid from './organisms/FeatureGrid.svelte';
import Hero from './organisms/Hero.svelte';
import NavBar from './organisms/NavBar.svelte';
import PricingTable from './organisms/PricingTable.svelte';
import ProductGallery from './organisms/ProductGallery.svelte';
import ProductGrid from './organisms/ProductGrid.svelte';
import SiteFooter from './organisms/SiteFooter.svelte';
const $ = (host, selector) => host.querySelector(selector);
const $$ = (host, selector) => [
    ...host.querySelectorAll(selector),
];
const byLabel = (host, label) => host.querySelector(`[aria-label="${label}"]`);
const byText = (host, text) => $$(host, 'button, a').find((b) => b.textContent?.trim() === text);
const text = (el) => el?.textContent?.replace(/\s+/g, ' ').trim();
describe('web helpers', () => {
    it('resolves palette names and accent', () => {
        expect(accentColor(undefined)).toBe('var(--accent)');
        expect(accentColor('accent')).toBe('var(--accent)');
        expect(accentColor('blue')).toBe('var(--color-blue)');
        expect(accentColor('#123456')).toBe('#123456');
    });
    it('formats money and discounts', () => {
        expect(formatPrice(12.5, 'USD', 'en-US')).toBe('$12.50');
        expect(formatPrice(3)).toBe('€3.00');
        expect(discountPercent(80, 100)).toBe(20);
        expect(discountPercent(100, 80)).toBe(0);
        expect(discountPercent(10, undefined)).toBe(0);
    });
});
describe('FeatureCard / FeatureGrid', () => {
    it('renders a card, a link card and extras', () => {
        const host = render(FeatureCard, {
            title: 'Fast',
            text: 'Very',
            icon: 'bolt',
            color: 'orange',
            href: '#fast',
            children: html('<span class="x">More</span>'),
        });
        const card = $(host, 'a.feature');
        expect(card.getAttribute('href')).toBe('#fast');
        expect(card.style.getPropertyValue('--feature-color')).toBe('var(--color-orange)');
        expect(text($(host, 'h3'))).toBe('Fast');
        expect($(host, '.x')).not.toBeNull();
    });
    it('uses the tint by default and wraps a titled grid in a section', () => {
        const calm = render(FeatureGrid, { features: [{ title: 'A' }] });
        expect($(calm, '.feature').style.getPropertyValue('--feature-color')).toBe('var(--accent)');
        const host = render(FeatureGrid, {
            title: 'Features',
            colorful: true,
            features: [
                { title: 'A', icon: 'bolt' },
                { title: 'B', color: 'red' },
            ],
        });
        expect(text($(host, 'h2'))).toBe('Features');
        const cards = $$(host, '.feature');
        expect(cards).toHaveLength(2);
        expect(cards[0].style.getPropertyValue('--feature-color')).toBe('var(--color-blue)');
        expect(cards[1].style.getPropertyValue('--feature-color')).toBe('var(--color-red)');
        expect($(host, 'h3')).not.toBeNull();
    });
    it('renders a bare grid without heading', () => {
        const host = render(FeatureGrid, { features: [{ title: 'Solo' }] });
        expect($(host, 'section')).toBeNull();
        expect(text($(host, 'h2'))).toBe('Solo');
    });
});
describe('PricingCard / PricingTable', () => {
    it('shows price, features and a busy select', async () => {
        let resolve;
        const onselect = vi.fn(() => new Promise((r) => (resolve = r)));
        const host = render(PricingCard, {
            name: 'Team',
            price: 12,
            period: '/ month',
            features: ['SSO', { label: 'Audit', included: false }],
            highlighted: true,
            badge: 'Popular',
            onselect,
        });
        expect($(host, '.plan--highlighted')).not.toBeNull();
        expect(text($(host, '.badge'))).toBe('Popular');
        expect(text($(host, '.price'))).toContain('12');
        expect(text($(host, '.price'))).toContain('/ month');
        expect($$(host, 'li')).toHaveLength(2);
        expect(text($(host, '.excluded'))).toContain('Not included');
        click(byText(host, 'Get started'));
        expect(onselect).toHaveBeenCalled();
        flushSync();
        expect($(host, '[aria-busy="true"]')).not.toBeNull();
        resolve();
        await tick();
        flushSync();
        expect($(host, '[aria-busy="true"]')).toBeNull();
    });
    it('shows free and custom prices', () => {
        const free = render(PricingCard, { name: 'Free', price: 0, period: '/ month' });
        expect(text($(free, '.price'))).toBe('Free');
        const custom = render(PricingCard, { name: 'Ent', price: 'Custom', ctaHref: '#c' });
        expect(text($(custom, '.price'))).toBe('Custom');
        expect($(custom, 'a[href="#c"]')).not.toBeNull();
    });
    it('switches billing and reports the plan', () => {
        const onselect = vi.fn();
        const onbilling = vi.fn();
        const host = render(PricingTable, {
            title: 'Pricing',
            plans: [
                { id: 'a', name: 'A', monthly: 10, yearly: 8 },
                { id: 'b', name: 'B', monthly: 'Custom' },
            ],
            onselect,
            onbilling,
        });
        expect(text($(host, '.saving'))).toBe('Save up to 20%');
        expect(text($$(host, '.plan')[0].querySelector('.price'))).toContain('10');
        click(byText(host, 'Yearly'));
        expect(onbilling).toHaveBeenCalledWith('yearly');
        const first = $$(host, '.plan')[0];
        expect(text(first.querySelector('.price'))).toContain('8');
        expect(first.querySelector('s')).not.toBeNull();
        expect(text(first.querySelector('.note'))).toBe('billed yearly');
        click(first.querySelector('button'));
        expect(onselect).toHaveBeenCalledWith(expect.objectContaining({ id: 'a' }), 'yearly');
    });
    it('hides the switch when no plan has a yearly price', () => {
        const host = render(PricingTable, { plans: [{ id: 'a', name: 'A', monthly: 5 }] });
        expect($(host, '.billing')).toBeNull();
    });
});
describe('Testimonial / LogoCloud / CallToAction', () => {
    it('renders a quote with its author', () => {
        const host = render(Testimonial, {
            quote: 'Great',
            name: 'Ada Lovelace',
            role: 'CTO',
            rating: 5,
        });
        expect(text($(host, 'blockquote'))).toBe('Great');
        expect(text($(host, 'figcaption'))).toContain('Ada Lovelace');
        expect(text($(host, 'figcaption'))).toContain('CTO');
    });
    it('renders wordmarks, images and links', () => {
        const host = render(LogoCloud, {
            title: 'Trusted by',
            logos: [{ name: 'Example Corp' }, { name: 'Example Labs', src: '/u.svg', href: '#u' }],
        });
        expect(text($(host, '.wordmark'))).toBe('Example Corp');
        expect($(host, 'a[href="#u"] img')?.getAttribute('alt')).toBe('Example Labs');
        expect($(host, 'section')?.getAttribute('aria-labelledby')).toBeTruthy();
    });
    it('renders a band with actions and extras', () => {
        const host = render(CallToAction, {
            title: 'Ready?',
            text: 'Go',
            eyebrow: 'Now',
            tone: 'solid',
            actions: html('<button>Start</button>'),
            children: html('<p class="extra-x">small</p>'),
        });
        expect($(host, '.cta--solid')).not.toBeNull();
        expect(text($(host, 'h2'))).toBe('Ready?');
        expect(byText(host, 'Start')).toBeTruthy();
        expect($(host, '.extra-x')).not.toBeNull();
    });
});
describe('Hero', () => {
    it('highlights part of the title and places media', () => {
        const host = render(Hero, {
            title: 'Ship faster today',
            highlight: 'faster',
            eyebrow: 'New',
            eyebrowHref: '#new',
            text: 'Hello',
            image: '/hero.jpg',
            imageAlt: 'Desk',
            backdrop: true,
            actions: html('<button>Go</button>'),
        });
        expect(text($(host, 'h1'))).toBe('Ship faster today');
        expect(text($(host, '.highlight'))).toBe('faster');
        expect($(host, 'a.eyebrow')?.getAttribute('href')).toBe('#new');
        expect($(host, '.hero--align-start.hero--media-end')).not.toBeNull();
        expect($(host, '.media img')?.getAttribute('alt')).toBe('Desk');
        expect($(host, '.backdrop')).not.toBeNull();
    });
    it('centres without media and ignores a missing highlight', () => {
        const host = render(Hero, { title: 'Hello', highlight: 'nope', heading: 2 });
        expect($(host, '.hero--align-center')).not.toBeNull();
        expect($(host, '.highlight')).toBeNull();
        expect(text($(host, 'h2'))).toBe('Hello');
    });
});
describe('NavBar', () => {
    const links = [
        { label: 'Home', href: '#home', active: true },
        { label: 'Pricing', href: '#pricing' },
    ];
    it('marks the active link and opens / closes the menu sheet', () => {
        const onnavigate = vi.fn((_l, e) => e.preventDefault());
        const host = render(NavBar, {
            brand: 'Example Planner',
            links,
            onnavigate,
            actions: html('<button>Sign up</button>'),
            menu: html('<p class="menu-extra">Extra</p>'),
        });
        expect(text($(host, '.wordmark'))).toBe('Example Planner');
        expect($(host, '.links a[aria-current="page"]')?.textContent).toBe('Home');
        const toggle = byLabel(host, 'Open menu');
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        click(toggle);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        expect(toggle.getAttribute('aria-label')).toBe('Close menu');
        expect($(host, '.sheet .menu-extra')).not.toBeNull();
        // A link in the sheet navigates and closes it.
        click($$(host, '.sheet a')[1]);
        expect(onnavigate).toHaveBeenCalledWith(links[1], expect.any(MouseEvent));
        expect($(host, '.sheet')).toBeNull();
    });
    it('stays open when the click lands on the toggle icon, which swaps on open', () => {
        const host = render(NavBar, { brand: 'N', links });
        const toggle = byLabel(host, 'Open menu');
        // A mouse click hits the glyph's <path>; the icon swaps and that path leaves the DOM.
        toggle
            .querySelector('path')
            .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        flushSync();
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        expect($(host, '.sheet')).not.toBeNull();
    });
    it('closes on Escape and on a click outside', () => {
        const host = render(NavBar, { brand: 'N', links });
        const toggle = byLabel(host, 'Open menu');
        click(toggle);
        key(document.body, 'Escape');
        expect($(host, '.sheet')).toBeNull();
        click(toggle);
        document.body.click();
        flushSync();
        expect($(host, '.sheet')).toBeNull();
    });
});
describe('Faq', () => {
    const items = [
        { question: 'One?', answer: 'First.\n\nSecond paragraph.' },
        { question: 'Two?', answer: 'Yes.' },
        { question: 'Three?', answer: 'No.' },
    ];
    it('opens one answer at a time', () => {
        const ontoggle = vi.fn();
        const host = render(Faq, { items, title: 'FAQ', ontoggle });
        const [a, b] = $$(host, '.q button');
        expect(a.getAttribute('aria-expanded')).toBe('false');
        click(a);
        expect(a.getAttribute('aria-expanded')).toBe('true');
        expect($$(host, '.a')[0].hidden).toBe(false);
        expect($$(host, '.a')[0].querySelectorAll('p')).toHaveLength(2);
        click(b);
        expect(a.getAttribute('aria-expanded')).toBe('false');
        expect(b.getAttribute('aria-expanded')).toBe('true');
        click(b);
        expect(b.getAttribute('aria-expanded')).toBe('false');
        expect(ontoggle).toHaveBeenLastCalledWith(1, false);
    });
    it('keeps several open with multiple and moves focus with the keys', () => {
        const host = render(Faq, { items, multiple: true, open: [0] });
        const heads = $$(host, '.q button');
        click(heads[2]);
        expect(heads.filter((h) => h.getAttribute('aria-expanded') === 'true')).toHaveLength(2);
        heads[0].focus();
        key(heads[0], 'ArrowDown');
        expect(document.activeElement).toBe(heads[1]);
        key(heads[1], 'End');
        expect(document.activeElement).toBe(heads[2]);
        key(heads[2], 'ArrowDown');
        expect(document.activeElement).toBe(heads[0]);
        key(heads[0], 'ArrowUp');
        expect(document.activeElement).toBe(heads[2]);
        key(heads[2], 'Home');
        expect(document.activeElement).toBe(heads[0]);
    });
});
describe('SiteFooter', () => {
    it('renders columns, social and legal links', () => {
        const host = render(SiteFooter, {
            brand: 'Example Planner',
            tagline: 'Hi',
            columns: [{ title: 'Product', links: [{ label: 'Pricing', href: '#p' }] }],
            social: [{ label: 'Mail', href: '#m', icon: 'mail' }],
            legal: [{ label: 'Privacy', href: '#privacy' }],
            finePrint: '© 2026',
            children: html('<p class="nl">Newsletter</p>'),
        });
        expect(text($(host, '.column h2'))).toBe('Product');
        expect($(host, 'a[href="#p"]')).not.toBeNull();
        expect(byLabel(host, 'Mail')?.getAttribute('href')).toBe('#m');
        expect(text($(host, '.fine'))).toBe('© 2026');
        expect($(host, 'nav[aria-label="Legal"] a')?.textContent).toBe('Privacy');
        expect($(host, '.nl')).not.toBeNull();
    });
});
describe('NewsletterSignup', () => {
    it('rejects an invalid address without calling back', () => {
        const onsubscribe = vi.fn();
        const host = render(NewsletterSignup, { onsubscribe, title: 'News' });
        input($(host, 'input'), 'nope');
        $(host, 'form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        flushSync();
        expect(onsubscribe).not.toHaveBeenCalled();
        expect(text($(host, '[role="alert"]'))).toBe('Enter a valid email address.');
        expect($(host, 'input')?.getAttribute('aria-invalid')).toBe('true');
        expect($(host, '.pill.nope')).not.toBeNull();
        input($(host, 'input'), 'nope@');
        expect($(host, '[role="alert"]')).toBeNull();
    });
    it('subscribes and thanks, or shows the error', async () => {
        const onsubscribe = vi.fn(async (email) => {
            if (email.startsWith('fail'))
                throw new Error('x');
        });
        const host = render(NewsletterSignup, { onsubscribe, layout: 'stacked' });
        input($(host, 'input'), 'fail@example.com');
        $(host, 'form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        await tick();
        flushSync();
        expect(text($(host, '[role="alert"]'))).toBe("Couldn't subscribe. Please try again.");
        input($(host, 'input'), ' ada@example.com ');
        $(host, 'form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        await tick();
        flushSync();
        expect(onsubscribe).toHaveBeenLastCalledWith('ada@example.com');
        expect(text($(host, '.success'))).toBe("You're in! Check your inbox to confirm.");
    });
});
describe('QuantityStepper', () => {
    it('steps with buttons and respects the limits', () => {
        const onchange = vi.fn();
        const host = render(QuantityStepper, { value: 1, min: 1, max: 3, onchange });
        const dec = byLabel(host, 'Decrease quantity');
        const inc = byLabel(host, 'Increase quantity');
        // At a limit the button stays focusable: marked unavailable, not disabled.
        expect(dec.getAttribute('aria-disabled')).toBe('true');
        expect(dec.disabled).toBe(false);
        click(inc);
        click(inc);
        expect(onchange).toHaveBeenLastCalledWith(3);
        expect(inc.getAttribute('aria-disabled')).toBe('true');
        click(inc);
        expect(onchange).toHaveBeenCalledTimes(2);
        expect($(host, 'input')?.getAttribute('aria-valuenow')).toBe('3');
    });
    it('rolls the figure and shakes at a limit', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: false }));
        const animate = vi.fn();
        const original = HTMLElement.prototype.animate;
        HTMLElement.prototype.animate = animate;
        const host = render(QuantityStepper, { value: 2, min: 1, max: 2 });
        const field = $(host, 'input');
        key(field, 'ArrowUp');
        expect(animate.mock.contexts.at(-1)).toBe($(host, '.stepper'));
        key(field, 'ArrowDown');
        expect(animate.mock.contexts.at(-1)).toBe(field);
        HTMLElement.prototype.animate = original;
        vi.unstubAllGlobals();
    });
    it('handles keys and typed values', () => {
        const onchange = vi.fn();
        const host = render(QuantityStepper, { value: 5, min: 0, max: 50, onchange });
        const field = $(host, 'input');
        key(field, 'ArrowUp');
        expect(onchange).toHaveBeenLastCalledWith(6);
        key(field, 'PageUp');
        expect(onchange).toHaveBeenLastCalledWith(16);
        key(field, 'ArrowDown');
        expect(onchange).toHaveBeenLastCalledWith(15);
        key(field, 'PageDown');
        expect(onchange).toHaveBeenLastCalledWith(5);
        key(field, 'End');
        expect(onchange).toHaveBeenLastCalledWith(50);
        key(field, 'Home');
        expect(onchange).toHaveBeenLastCalledWith(0);
        input(field, '7x');
        key(field, 'Enter');
        expect(onchange).toHaveBeenLastCalledWith(7);
        input(field, '999');
        field.dispatchEvent(new FocusEvent('blur'));
        flushSync();
        expect(onchange).toHaveBeenLastCalledWith(50);
        input(field, '');
        field.dispatchEvent(new FocusEvent('blur'));
        flushSync();
        expect(field.value).toBe('50');
        key(field, 'a');
        expect(onchange).toHaveBeenCalledTimes(8);
    });
});
describe('VariantPicker', () => {
    const colors = [
        { value: 'sage', label: 'Sage', color: '#9bb59a' },
        { value: 'sky', label: 'Sky', color: '#8fb3d9', disabled: true },
        { value: 'ink', label: 'Ink', color: '#2f3640' },
    ];
    it('shows swatches as a radio group and skips sold-out options', () => {
        const onchange = vi.fn();
        const host = render(VariantPicker, {
            label: 'Colour',
            options: colors,
            value: 'sage',
            onchange,
        });
        const radios = $$(host, '[role="radio"]');
        expect($(host, '.picker--swatch')).not.toBeNull();
        expect(text($(host, '.value'))).toBe('Sage');
        expect(radios[0].getAttribute('aria-checked')).toBe('true');
        expect(radios[0].tabIndex).toBe(0);
        expect(radios[1].getAttribute('aria-label')).toBe('Sky, sold out');
        click(radios[1]);
        expect(onchange).not.toHaveBeenCalled();
        key(radios[0], 'ArrowRight');
        expect(onchange).toHaveBeenLastCalledWith('ink');
        expect(document.activeElement).toBe(radios[2]);
        key(radios[2], 'ArrowRight');
        expect(onchange).toHaveBeenLastCalledWith('sage');
        key(radios[0], 'End');
        expect(onchange).toHaveBeenLastCalledWith('ink');
        key(radios[2], 'Home');
        key(radios[0], 'ArrowLeft');
        expect(onchange).toHaveBeenLastCalledWith('ink');
        key(radios[2], 'x');
        expect(onchange).toHaveBeenCalledTimes(5);
    });
    it('shows size pills', () => {
        const host = render(VariantPicker, {
            label: 'Size',
            options: [
                { value: 's', label: 'S' },
                { value: 'm', label: 'M' },
            ],
        });
        expect($(host, '.picker--pill')).not.toBeNull();
        expect($$(host, '[role="radio"]')[0].tabIndex).toBe(0);
        click(byText(host, 'M'));
        expect(text($(host, '.value'))).toBe('M');
    });
});
describe('CheckoutSteps', () => {
    it('marks the current step and goes back via finished ones', () => {
        const onstep = vi.fn();
        const host = render(CheckoutSteps, { current: 2, onstep });
        expect($$(host, 'li')).toHaveLength(4);
        expect(text($(host, '[aria-current="step"]'))).toContain('Payment');
        const back = $$(host, 'li button');
        expect(back).toHaveLength(2);
        click(back[0]);
        expect(onstep).toHaveBeenCalledWith(0);
    });
});
describe('ProductCard', () => {
    it('shows price, discount badge, rating and colours', () => {
        const host = render(ProductCard, {
            title: 'Shirt',
            price: 60,
            compareAt: 80,
            rating: 4.5,
            reviews: 12,
            colors: ['red', 'blue', 'green'],
            maxColors: 2,
            image: '/shirt.jpg',
            imageAlt: 'A shirt',
            subtitle: 'Brand',
            href: '#shirt',
        });
        expect(text($(host, '.badge--danger'))).toBe('-25%');
        expect($(host, 's')).not.toBeNull();
        expect(byLabel(host, '12 reviews')).not.toBeNull();
        expect($$(host, '.dot')).toHaveLength(2);
        expect(text($(host, '.more'))).toBe('+1');
        expect($(host, '.interactive')).not.toBeNull();
        expect($(host, 'a.open')?.getAttribute('href')).toBe('#shirt');
        expect($(host, 'img')?.getAttribute('alt')).toBe('A shirt');
    });
    it('adds to cart, ticks, and toggles the wishlist', async () => {
        vi.useFakeTimers();
        const onadd = vi.fn(() => Promise.resolve());
        const onwishlist = vi.fn();
        const onopen = vi.fn();
        const host = render(ProductCard, {
            title: 'Mug',
            price: 18,
            badge: 'New',
            onadd,
            onwishlist,
            onopen,
        });
        expect(text($(host, '.badge--accent'))).toBe('New');
        click(byLabel(host, 'Add to cart'));
        expect(onadd).toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(0);
        flushSync();
        expect(byLabel(host, 'Added to cart')).not.toBeNull();
        await vi.advanceTimersByTimeAsync(2000);
        flushSync();
        expect(byLabel(host, 'Add to cart')).not.toBeNull();
        vi.useRealTimers();
        const heart = byLabel(host, 'Add to wishlist');
        click(heart);
        expect(onwishlist).toHaveBeenCalledWith(true);
        expect(heart.getAttribute('aria-pressed')).toBe('true');
        expect(heart.getAttribute('aria-label')).toBe('Remove from wishlist');
        click($(host, 'a.open'));
        expect(onopen).toHaveBeenCalled();
    });
    it('is a static tile when sold out and without a link', () => {
        const host = render(ProductCard, { title: 'Gone', price: 9, soldOut: true, onadd: () => { } });
        expect(text($(host, '.badge--neutral'))).toBe('Sold out');
        expect(byLabel(host, 'Add to cart').disabled).toBe(true);
        expect($(host, '.interactive')).toBeNull();
        expect($(host, 'a')).toBeNull();
    });
});
describe('ProductGrid', () => {
    const products = [
        { id: 'a', title: 'A', price: 10 },
        { id: 'b', title: 'B', price: 20, colors: ['red'] },
    ];
    it('wires add, open and the wishlist per product', () => {
        const onadd = vi.fn();
        const onopen = vi.fn();
        const onwishlist = vi.fn();
        const host = render(ProductGrid, { products, onadd, onopen, onwishlist, wishlist: ['b'] });
        expect($$(host, '.product')).toHaveLength(2);
        expect($(host, 'ul[role="list"]')).not.toBeNull();
        click($$(host, '[aria-label="Add to cart"]')[1]);
        expect(onadd).toHaveBeenCalledWith(products[1], expect.any(HTMLElement));
        click($$(host, 'a.open')[0]);
        expect(onopen).toHaveBeenCalledWith(products[0]);
        expect(byLabel(host, 'Remove from wishlist')).not.toBeNull();
        click(byLabel(host, 'Add to wishlist'));
        expect(onwishlist).toHaveBeenCalledWith(products[0], true);
        expect($$(host, '[aria-label="Remove from wishlist"]')).toHaveLength(2);
        click($$(host, '[aria-label="Remove from wishlist"]')[0]);
        expect(onwishlist).toHaveBeenLastCalledWith(products[0], false);
    });
    it('shows an empty state or own markup', () => {
        const empty = render(ProductGrid, { products: [] });
        expect(text(empty)).toContain('Nothing found');
        const own = render(ProductGrid, { products: [], empty: html('<p class="own">None</p>') });
        expect($(own, '.own')).not.toBeNull();
    });
});
describe('ProductGallery', () => {
    const images = [
        { src: '/1.jpg', alt: 'One' },
        { src: '/2.jpg', alt: 'Two' },
        { src: '/3.jpg', alt: 'Three', thumb: '/3s.jpg' },
    ];
    it('pages with buttons, thumbnails and keys', () => {
        const onchange = vi.fn();
        const host = render(ProductGallery, { images, onchange });
        const main = () => $(host, '.stage img')?.getAttribute('alt');
        expect(main()).toBe('One');
        expect(text($(host, '.counter'))).toBe('Image 1 of 3');
        click(byLabel(host, 'Next image'));
        expect(main()).toBe('Two');
        click(byLabel(host, 'Previous image'));
        click(byLabel(host, 'Previous image'));
        expect(main()).toBe('Three');
        const thumbs = $$(host, '.thumb');
        expect(thumbs[2].getAttribute('aria-current')).toBe('true');
        click(thumbs[1]);
        expect(main()).toBe('Two');
        key(thumbs[1], 'ArrowRight');
        expect(main()).toBe('Three');
        key(thumbs[1], 'Home');
        expect(main()).toBe('One');
        key(thumbs[1], 'End');
        expect(main()).toBe('Three');
        key(thumbs[1], 'ArrowLeft');
        expect(main()).toBe('Two');
        key(thumbs[1], 'x');
        expect(onchange).toHaveBeenLastCalledWith(1);
    });
    it('shows a single image without controls', () => {
        const host = render(ProductGallery, { images: [images[0]] });
        expect(byLabel(host, 'Next image')).toBeNull();
        expect($(host, '.thumbs')).toBeNull();
    });
});
describe('CartLine', () => {
    it('changes quantity and removes', () => {
        const onquantity = vi.fn();
        const onremove = vi.fn();
        const host = render(CartLine, {
            title: 'Shirt',
            meta: 'Sage · M',
            price: 10,
            quantity: 2,
            href: '#shirt',
            onquantity,
            onremove,
            currency: 'USD',
            locale: 'en-US',
        });
        expect(text($(host, '.total'))).toBe('$20.00');
        expect(text($(host, '.unit'))).toBe('$10.00 each');
        click(byLabel(host, 'Increase quantity'));
        expect(onquantity).toHaveBeenCalledWith(3);
        expect(text($(host, '.total'))).toBe('$30.00');
        click(byLabel(host, 'Remove Shirt'));
        expect(onremove).toHaveBeenCalled();
    });
    it('is read-only without callbacks', () => {
        const host = render(CartLine, { title: 'Mug', price: 5, quantity: 1 });
        expect(text($(host, '.qty-text'))).toBe('Qty 1');
        expect($(host, 'button')).toBeNull();
    });
});
describe('CartSummary', () => {
    const usd = { currency: 'USD', locale: 'en-US' };
    it('totals up, shows free shipping progress and checks out', async () => {
        const oncheckout = vi.fn(() => Promise.resolve());
        const host = render(CartSummary, {
            ...usd,
            subtotal: 100,
            shipping: 5,
            discount: 10,
            discountCode: 'SPRING10',
            freeShippingFrom: 150,
            oncheckout,
            note: 'Secure',
            children: html('<div class="line-x">line</div>'),
        });
        expect($(host, '.line-x')).not.toBeNull();
        expect(text($(host, '.free p'))).toBe('$50.00 away from free shipping');
        expect(text($(host, '.row--discount'))).toContain('−$10.00');
        expect(text($(host, '.row--total'))).toContain('$95.00');
        click(byText(host, 'Checkout'));
        expect(oncheckout).toHaveBeenCalled();
        await tick();
        expect(text($(host, '.note'))).toBe('Secure');
    });
    it('labels free and later shipping and separate tax', () => {
        const free = render(CartSummary, { ...usd, subtotal: 200, shipping: 0, freeShippingFrom: 150 });
        expect(text($(free, '.free-ship'))).toBe('Free');
        expect(text($(free, '.free p'))).toBe('You get free shipping');
        const later = render(CartSummary, { ...usd, subtotal: 50, tax: 9.5, taxIncluded: false });
        expect(text($(later, '.muted'))).toBe('Calculated at checkout');
        expect(text($(later, '.row--total'))).toContain('$59.50');
    });
    it('applies a code, reports an invalid one and removes it', async () => {
        const ondiscount = vi.fn(async (code) => {
            if (code !== 'OK')
                throw new Error('invalid');
        });
        const onremovediscount = vi.fn();
        const host = render(CartSummary, { subtotal: 10, ondiscount, onremovediscount });
        const field = $(host, '.code-input');
        input(field, 'NOPE');
        $(host, '.code-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        await tick();
        flushSync();
        expect(text($(host, '.code-error'))).toBe('This code is not valid.');
        input(field, 'OK');
        expect($(host, '.code-error')).toBeNull();
        $(host, '.code-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        await tick();
        flushSync();
        expect(ondiscount).toHaveBeenLastCalledWith('OK');
        expect(field.value).toBe('');
        const applied = render(CartSummary, {
            subtotal: 10,
            ondiscount,
            onremovediscount,
            discountCode: 'OK',
        });
        click(byLabel(applied, 'Remove code OK'));
        expect(onremovediscount).toHaveBeenCalled();
    });
});
