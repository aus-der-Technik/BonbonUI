import { flushSync } from 'svelte';
import { html, render } from '../../test/render';
import GlimmerPanel from './GlimmerPanel.svelte';
describe('GlimmerPanel', () => {
    afterEach(() => vi.useRealTimers());
    it('glimmers while working, then fades out still turning, and is busy only while working', () => {
        vi.useFakeTimers();
        const props = $state({
            working: true,
            level: 'selected',
            'aria-label': 'Answer',
            children: html('<p>Hello</p>'),
        });
        const host = render(GlimmerPanel, props);
        const wrap = host.querySelector('.glimmer');
        const panel = host.querySelector('.glimmer__panel');
        expect(wrap.classList).toContain('glimmer--on');
        expect(panel.tagName).toBe('SECTION');
        expect(panel.dataset.layer).toBe('selected');
        expect(panel.getAttribute('aria-label')).toBe('Answer');
        expect(panel.getAttribute('aria-busy')).toBe('true');
        expect(panel.textContent?.trim()).toBe('Hello');
        expect(host.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
        props.working = false;
        flushSync();
        expect(wrap.classList).not.toContain('glimmer--on');
        expect(wrap.classList).toContain('glimmer--fading');
        expect(panel.hasAttribute('aria-busy')).toBe(false);
        vi.advanceTimersByTime(800);
        flushSync();
        expect(wrap.classList).not.toContain('glimmer--fading');
        // Back to work mid-fade: on again at once.
        props.working = true;
        flushSync();
        props.working = false;
        flushSync();
        props.working = true;
        flushSync();
        expect(wrap.className).toMatch(/glimmer--on(?!.*fading)/);
    });
    it('is quiet when it starts idle', () => {
        const host = render(GlimmerPanel, { children: html('<p>Done</p>') });
        expect(host.querySelector('.glimmer').className).not.toMatch(/glimmer--(on|fading)/);
        expect(host.querySelector('.glimmer__panel').getAttribute('data-layer')).toBe('panel');
    });
});
