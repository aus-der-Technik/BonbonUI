import { flushSync } from 'svelte';
import { click, key, render } from '../../test/render';
import Card from '../atoms/Card.svelte';
import ArcGauge from './ArcGauge.svelte';
describe('ArcGauge', () => {
    it('is one slider with its value, lit up to the value', () => {
        const host = render(ArcGauge, {
            label: 'Target',
            value: 22,
            min: 16,
            max: 28,
            step: 0.5,
            unit: '°C',
            ticks: 13,
        });
        const slider = host.querySelector('[role="slider"]');
        expect(slider.getAttribute('aria-valuenow')).toBe('22');
        expect(slider.getAttribute('aria-valuetext')).toBe('22.0 °C');
        expect(slider.getAttribute('aria-labelledby')).toBeTruthy();
        // 22 of 16…28 is halfway: 7 of 13 ticks lit.
        expect(host.querySelectorAll('line.tick.on')).toHaveLength(7);
        expect(host.querySelector('.glow')).not.toBeNull();
    });
    it('steps with the keys and the buttons, clamped to its range', () => {
        const onchange = vi.fn();
        const host = render(ArcGauge, { label: 'Level', value: 98, onchange });
        const slider = host.querySelector('[role="slider"]');
        key(slider, 'ArrowUp');
        flushSync();
        expect(onchange).toHaveBeenLastCalledWith(99);
        key(slider, 'End');
        flushSync();
        expect(onchange).toHaveBeenLastCalledWith(100);
        expect(host.querySelector('button[aria-label="Increase"]')?.disabled).toBe(true);
        click(host.querySelector('button[aria-label="Decrease"]'));
        flushSync();
        expect(onchange).toHaveBeenLastCalledWith(99);
        key(slider, 'Home');
        flushSync();
        expect(onchange).toHaveBeenLastCalledWith(0);
    });
    it('can drop its caption and buttons', () => {
        const host = render(ArcGauge, { label: 'Volume', value: 0, caption: false, buttons: false });
        expect(host.querySelector('[role="slider"]')?.getAttribute('aria-label')).toBe('Volume');
        expect(host.querySelector('button')).toBeNull();
        expect(host.querySelector('.glow')).toBeNull();
    });
});
describe('Card ink', () => {
    it('carries the dark theme inside', () => {
        const host = render(Card, { surface: 'ink' });
        const card = host.querySelector('.card--ink');
        expect(card?.getAttribute('data-theme')).toBe('dark');
        expect(render(Card, {}).querySelector('.card')?.hasAttribute('data-theme')).toBe(false);
    });
});
describe('ArcGauge current', () => {
    it('lights the ticks to the setting and the glow to where it is now', () => {
        const host = render(ArcGauge, {
            label: 'Target',
            value: 22,
            current: 19,
            min: 16,
            max: 28,
            step: 0.5,
            unit: '°C',
            ticks: 13,
        });
        expect(host.querySelectorAll('line.tick.on')).toHaveLength(7);
        expect(host.querySelector('circle.now')).not.toBeNull();
        expect(host.querySelector('.now-line')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Now 19.0 °C');
        expect(host.querySelector('[role="slider"]')?.getAttribute('aria-valuetext')).toBe('22.0 °C, now 19.0 °C');
    });
});
