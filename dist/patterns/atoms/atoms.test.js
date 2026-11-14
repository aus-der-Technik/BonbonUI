import { flushSync } from 'svelte';
import { click, html, render } from '../../test/render';
import Avatar from './Avatar.svelte';
import Badge from './Badge.svelte';
import BrandBar from './BrandBar.svelte';
import Button from './Button.svelte';
import Card from './Card.svelte';
import Checkbox from './Checkbox.svelte';
import Icon from './Icon.svelte';
import Input from './Input.svelte';
import Kbd from './Kbd.svelte';
import LoadingBar from './LoadingBar.svelte';
import Select from './Select.svelte';
import Stars from './Stars.svelte';
import Swatch from './Swatch.svelte';
import Textarea from './Textarea.svelte';
import VisuallyHidden from './VisuallyHidden.svelte';
describe('Button', () => {
    it('is a plain button with variant, size and shape classes', () => {
        const host = render(Button, { label: 'Save', variant: 'primary', size: 'lg', shape: 'pill' });
        const button = host.querySelector('button');
        expect(button?.type).toBe('button');
        expect(button?.className).toContain('btn--primary');
        expect(button?.className).toContain('btn--lg');
        expect(button?.className).toContain('btn--pill');
        expect(button?.textContent?.trim()).toBe('Save');
    });
    it('names icon-only buttons and marks busy', () => {
        const host = render(Button, { label: 'Delete', icon: 'trash', iconOnly: true, busy: true });
        const button = host.querySelector('button');
        expect(button?.getAttribute('aria-label')).toBe('Delete');
        expect(button?.getAttribute('aria-busy')).toBe('true');
        // A busy non-refresh icon makes room for a spinner.
        expect(button?.querySelector('.spinner')).not.toBeNull();
        expect(button?.querySelector('svg')).toBeNull();
        expect(button?.querySelector('.btn__label')).toBeNull();
    });
    it('renders children and calls back, but not when disabled', () => {
        const onclick = vi.fn();
        const host = render(Button, { children: html('<b>Go</b>'), onclick });
        click(host.querySelector('button'));
        expect(onclick).toHaveBeenCalledOnce();
        expect(host.querySelector('b')?.textContent).toBe('Go');
        const disabled = render(Button, { label: 'x', onclick, disabled: true });
        click(disabled.querySelector('button'));
        expect(onclick).toHaveBeenCalledOnce();
    });
    it('becomes a link with href', () => {
        const host = render(Button, { label: 'Docs', href: '/docs', collapse: true });
        const link = host.querySelector('a');
        expect(link?.getAttribute('href')).toBe('/docs');
        expect(link?.getAttribute('aria-label')).toBe('Docs');
    });
});
describe('Icon', () => {
    it('is hidden without a label and an image with one', () => {
        const hidden = render(Icon, { name: 'search' });
        expect(hidden.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
        const named = render(Icon, { name: 'thumbs-up', label: 'Up', size: 24 });
        const svg = named.querySelector('svg');
        expect(svg?.getAttribute('role')).toBe('img');
        expect(svg?.getAttribute('aria-label')).toBe('Up');
        expect(svg?.getAttribute('fill')).toBe('currentColor');
        expect(svg?.getAttribute('width')).toBe('24');
    });
});
describe('Avatar', () => {
    it('derives initials from an e-mail or a name', () => {
        expect(render(Avatar, { name: 'jane.doe@example.com' }).textContent).toBe('JD');
        expect(render(Avatar, { name: 'Max Mustermann' }).textContent).toBe('MM');
        expect(render(Avatar, { name: 'kris' }).textContent).toBe('K');
    });
    it('shows a picture and falls back to the initials when it fails', () => {
        const host = render(Avatar, { name: 'Max Mustermann', src: 'https://example.com/max.jpg' });
        const img = host.querySelector('img');
        expect(img?.getAttribute('src')).toBe('https://example.com/max.jpg');
        img?.dispatchEvent(new Event('error'));
        flushSync();
        expect(host.querySelector('img')).toBeNull();
        expect(host.textContent).toBe('MM');
    });
    it('draws logos square', () => {
        const host = render(Avatar, {
            name: 'Hall',
            src: 'https://example.com/l.svg',
            shape: 'square',
        });
        expect(host.querySelector('img')?.className).toContain('avatar--square');
    });
});
describe('Badge', () => {
    it('shows a dot for live and takes children', () => {
        const live = render(Badge, { tone: 'live', label: 'Editable' });
        expect(live.querySelector('.badge--dot')).not.toBeNull();
        const draft = render(Badge, { tone: 'draft', children: html('<i>Draft</i>') });
        expect(draft.querySelector('.badge--dot')).toBeNull();
        expect(draft.querySelector('i')?.textContent).toBe('Draft');
    });
});
describe('Stars', () => {
    it('clamps and speaks the rating', () => {
        const host = render(Stars, { value: 7 });
        expect(host.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('5 of 5 stars');
        const quiet = render(Stars, { value: 2, label: '' });
        expect(quiet.querySelector('.stars')?.getAttribute('aria-hidden')).toBe('true');
        expect(quiet.querySelector('.off')?.textContent).toBe('★★★');
    });
});
describe('LoadingBar', () => {
    it('renders only while active', () => {
        expect(render(LoadingBar, { active: false }).querySelector('[role="progressbar"]')).toBeNull();
        expect(render(LoadingBar, {}).querySelector('[role="progressbar"]')).not.toBeNull();
    });
});
describe('form atoms', () => {
    it('Input marks invalid and passes attributes', () => {
        const host = render(Input, { invalid: true, placeholder: 'x', size: 'lg' });
        const field = host.querySelector('input');
        expect(field?.getAttribute('aria-invalid')).toBe('true');
        expect(field?.placeholder).toBe('x');
    });
    it('Textarea counts characters against maxlength', () => {
        const host = render(Textarea, { value: 'hello', maxlength: 10, counter: true });
        expect(host.querySelector('.counter')?.textContent).toBe('5 / 10');
    });
    it('Select renders its options', () => {
        const host = render(Select, {
            value: 'b',
            options: [
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B', disabled: true },
            ],
        });
        expect(host.querySelectorAll('option')).toHaveLength(2);
    });
    it('Checkbox wraps a label only when there is one', () => {
        expect(render(Checkbox, { label: 'With comment only' }).querySelector('label')).not.toBeNull();
        // Bare, the box itself is the label (for its hit area): no text label around it.
        expect(render(Checkbox, { 'aria-label': 'x', tone: 'ok' }).querySelector('label.check')).toBeNull();
        expect(render(Checkbox, { children: html('<span>Kids</span>') }).textContent).toContain('Kids');
    });
});
describe('small atoms', () => {
    it('render', () => {
        expect(render(Card, { surface: 'frosted', as: 'section', children: html('<p>c</p>') }).querySelector('section.card--frosted')).not.toBeNull();
        expect(render(BrandBar, { height: 30 }).querySelector('.bar')?.getAttribute('style')).toContain('30px');
        expect(render(Swatch, { color: 'red', shape: 'square' }).querySelector('.swatch--square')).not.toBeNull();
        expect(render(Kbd, { children: html('Enter') }).querySelector('kbd')?.textContent).toBe('Enter');
        expect(render(VisuallyHidden, { children: html('hidden') }).querySelector('.sr-only')).not.toBeNull();
    });
});
