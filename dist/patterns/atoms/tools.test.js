import { flushSync } from 'svelte';
import { click, html, render } from '../../test/render';
import IconButton from './IconButton.svelte';
import Tooltip from './Tooltip.svelte';
import { icons } from './icons';
import { ariaKeyShortcuts, keyLabels } from './keys';
describe('keys', () => {
    it('writes shortcuts the way each platform does', () => {
        expect(keyLabels(['Mod', 'Shift', 'Z'], true)).toEqual(['⌘', '⇧', 'Z']);
        expect(keyLabels(['Mod', 'Shift', 'Z'], false)).toEqual(['Ctrl', 'Shift', 'Z']);
        expect(keyLabels(['Alt', 'ArrowUp', '⌘'], true)).toEqual(['⌥', '↑', '⌘']);
    });
    it('builds aria-keyshortcuts values', () => {
        expect(ariaKeyShortcuts(['Mod', 'b'], true)).toBe('Meta+B');
        expect(ariaKeyShortcuts(['Mod', 'Shift', 'Z'], false)).toBe('Control+Shift+Z');
        expect(ariaKeyShortcuts(['⌥', '⇧', '↑'])).toBe('Alt+Shift+ArrowUp');
    });
});
describe('Tooltip keys and content', () => {
    it('shows the shortcut as key caps after the text and stays the trigger’s description', () => {
        const host = render(Tooltip, {
            text: 'Bold',
            keys: ['Shift', 'B'],
            children: html('<button>B</button>'),
        });
        const tip = host.querySelector('[role="tooltip"]');
        expect(tip.textContent).toContain('Bold');
        const caps = [...tip.querySelectorAll('kbd')].map((kbd) => kbd.textContent);
        expect(caps).toHaveLength(2);
        expect(caps[1]).toBe('B');
        expect(host.querySelector('button')?.getAttribute('aria-describedby')).toBe(tip.id);
    });
    it('renders rich content and lines up with an edge', () => {
        const host = render(Tooltip, {
            content: html('<b>Rich</b>'),
            align: 'end',
            children: html('<button>x</button>'),
        });
        const tip = host.querySelector('[role="tooltip"]');
        expect(tip.querySelector('b')?.textContent).toBe('Rich');
        expect(tip.className).toContain('tip--end');
        expect(tip.querySelector('kbd')).toBeNull();
    });
    it('can stay out of the description when it only repeats the name', () => {
        const host = render(Tooltip, {
            text: 'Bold',
            describe: false,
            children: html('<button aria-label="Bold">B</button>'),
        });
        expect(host.querySelector('button')?.hasAttribute('aria-describedby')).toBe(false);
        expect(host.querySelector('[role="tooltip"]')?.getAttribute('aria-hidden')).toBe('true');
    });
});
describe('IconButton', () => {
    it('is a named action with a tooltip and no pressed state by default', () => {
        const onclick = vi.fn();
        const host = render(IconButton, { icon: 'link', label: 'Link', onclick });
        const button = host.querySelector('button');
        expect(button.getAttribute('aria-label')).toBe('Link');
        expect(button.hasAttribute('aria-pressed')).toBe(false);
        expect(button.type).toBe('button');
        expect(host.querySelector('[role="tooltip"]')?.textContent).toContain('Link');
        // The tooltip repeats the name: it must not be read twice.
        expect(button.hasAttribute('aria-describedby')).toBe(false);
        click(button);
        expect(onclick).toHaveBeenCalledOnce();
    });
    it('toggles aria-pressed and shows the shortcut in its tooltip', () => {
        const host = render(IconButton, {
            icon: 'bold',
            label: 'Bold',
            pressed: true,
            shortcut: ['Shift', 'B'],
        });
        const button = host.querySelector('button');
        expect(button.getAttribute('aria-pressed')).toBe('true');
        expect(button.getAttribute('aria-keyshortcuts')).toBe('Shift+B');
        expect(host.querySelectorAll('[role="tooltip"] kbd')).toHaveLength(2);
        const off = render(IconButton, { icon: 'bold', label: 'Bold', pressed: false });
        expect(off.querySelector('button')?.getAttribute('aria-pressed')).toBe('false');
    });
    it('describes with a longer tooltip, and swallows clicks when (soft) disabled', () => {
        const onclick = vi.fn();
        const host = render(IconButton, {
            icon: 'undo',
            label: 'Undo',
            tooltip: 'Undo typing',
            'aria-disabled': true,
            onclick,
        });
        const button = host.querySelector('button');
        expect(button.getAttribute('aria-describedby')).toBe(host.querySelector('[role="tooltip"]')?.id);
        expect(button.className).toContain('tool--soft-disabled');
        click(button);
        expect(onclick).not.toHaveBeenCalled();
        const hard = render(IconButton, { icon: 'undo', label: 'Undo', disabled: true });
        expect(hard.querySelector('button').disabled).toBe(true);
    });
    it('shows its label, sizes, tones and custom content', () => {
        const host = render(IconButton, {
            icon: 'share',
            label: 'Share',
            showLabel: true,
            size: 'sm',
            shape: 'pill',
            tone: 'danger',
        });
        const button = host.querySelector('button');
        expect(button.textContent).toContain('Share');
        expect(button.hasAttribute('aria-label')).toBe(false);
        expect(button.className).toContain('tool--sm');
        expect(button.className).toContain('tool--pill');
        expect(button.className).toContain('tool--danger');
        // A visible label is its own hint.
        expect(host.querySelector('[role="tooltip"]')).toBeNull();
        const custom = render(IconButton, { label: 'Zoom', children: html('<span>100%</span>') });
        expect(custom.querySelector('button')?.textContent?.trim()).toBe('100%');
        flushSync();
    });
});
describe('editor icons', () => {
    it('has a grip and heading glyphs', () => {
        for (const name of ['grip', 'heading-1', 'heading-2', 'heading-3']) {
            expect(icons[name].paths.length).toBeGreaterThan(0);
        }
    });
});
