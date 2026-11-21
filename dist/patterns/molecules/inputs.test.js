import { click, html, input, key, render, tick } from '../../test/render';
import CheckboxGroup from './CheckboxGroup.svelte';
import Composer from './Composer.svelte';
import JobStatus from './JobStatus.svelte';
import Reactions from './Reactions.svelte';
import StarInput from './StarInput.svelte';
import Tabs from './Tabs.svelte';
import TagInput from './TagInput.svelte';
import ThumbsInput from './ThumbsInput.svelte';
import VersionRail from './VersionRail.svelte';
const radios = (host) => [...host.querySelectorAll('[role="radio"]')];
const tabStops = (host, selector = '[role="radio"]') => [...host.querySelectorAll(selector)].filter((el) => el.tabIndex === 0);
describe('rating radios', () => {
    it('StarInput is one tab stop; arrows, Home and End move and pick', () => {
        const onchange = vi.fn();
        const host = render(StarInput, { onchange, starLabel: (n) => `${n} of 5` });
        expect(tabStops(host)).toHaveLength(1);
        expect(tabStops(host)[0]?.getAttribute('aria-label')).toBe('1 of 5');
        const first = radios(host)[0];
        first.focus();
        key(first, 'ArrowRight');
        expect(onchange).toHaveBeenLastCalledWith(2);
        expect(document.activeElement).toBe(radios(host)[1]);
        expect(tabStops(host)).toEqual([radios(host)[1]]);
        key(document.activeElement, 'End');
        expect(onchange).toHaveBeenLastCalledWith(5);
        key(document.activeElement, 'ArrowRight');
        expect(onchange).toHaveBeenLastCalledWith(1);
        key(document.activeElement, 'ArrowLeft');
        expect(onchange).toHaveBeenLastCalledWith(5);
        expect(radios(host)[4]?.getAttribute('aria-checked')).toBe('true');
    });
    it('ThumbsInput is one tab stop; arrows switch the vote', () => {
        const onchange = vi.fn();
        const host = render(ThumbsInput, { onchange });
        expect(tabStops(host)).toEqual([radios(host)[0]]);
        const up = radios(host)[0];
        up.focus();
        key(up, 'ArrowDown');
        expect(onchange).toHaveBeenLastCalledWith('down');
        expect(document.activeElement).toBe(radios(host)[1]);
        expect(tabStops(host)).toEqual([radios(host)[1]]);
        key(document.activeElement, 'Home');
        expect(onchange).toHaveBeenLastCalledWith('up');
    });
});
describe('TagInput duplicates', () => {
    const field = (host) => host.querySelector('input');
    it('keeps the typed text and says why', () => {
        const onchange = vi.fn();
        const host = render(TagInput, {
            label: 'Topics',
            value: ['a', 'b'],
            onchange,
            duplicateLabel: (tag) => `${tag} exists`,
        });
        input(field(host), 'b');
        key(field(host), 'Enter');
        expect(onchange).not.toHaveBeenCalled();
        expect(field(host).value).toBe('b');
        expect(host.querySelector('[role="status"]')?.textContent).toBe('b exists');
    });
    it('puts a refused tag back when it was ended with a separator', () => {
        const host = render(TagInput, { label: 'Topics', value: ['a'] });
        input(field(host), 'a,');
        expect(field(host).value).toBe('a');
        expect([...host.querySelectorAll('.tag')]).toHaveLength(1);
    });
    it('shakes the existing tag unless motion is reduced', () => {
        const host = render(TagInput, { label: 'Topics', value: ['a', 'b'] });
        input(field(host), 'b');
        key(field(host), 'Enter');
        const tags = host.querySelectorAll('.tag');
        expect(tags[1]?.style.animation).toContain('bb-nope');
        expect(tags[0]?.style.animation).toBe('');
    });
});
describe('Tabs', () => {
    const tabs = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
    ];
    it('keep a tab focusable when the value matches none', () => {
        const host = render(Tabs, { label: 'T', tabs, value: 'zzz' });
        expect(tabStops(host, '[role="tab"]')).toHaveLength(1);
        expect(tabStops(host, '[role="tab"]')[0]?.textContent?.trim()).toBe('A');
    });
    it('point aria-controls only at a rendered panel', () => {
        const bare = render(Tabs, { label: 'T', tabs, value: 'a' });
        expect(bare.querySelector('[role="tab"]')?.hasAttribute('aria-controls')).toBe(false);
        const withPanel = render(Tabs, { label: 'T', tabs, value: 'a', panel: html('<p>x</p>') });
        const id = withPanel.querySelector('[role="tab"]')?.getAttribute('aria-controls');
        expect(id).toBeTruthy();
        expect(withPanel.querySelector(`[id="${id}"]`)?.getAttribute('role')).toBe('tabpanel');
    });
});
describe('wording', () => {
    it('VersionRail names the mark in text, not on a role-less span', () => {
        const host = render(VersionRail, {
            items: [{ value: '2', label: 'v2', marked: true }],
            markLabel: 'newest',
        });
        expect(host.querySelector('[aria-label="newest"]')).toBeNull();
        expect(host.querySelector('button')?.textContent).toContain('newest');
    });
    it('Reactions, JobStatus and Composer take their own strings', async () => {
        const reactions = render(Reactions, {
            readonly: true,
            reactions: [{ emoji: '👍', count: 5, people: ['Ada'] }],
            peopleLabel: (people, rest) => `${people[0]} +${rest}`,
        });
        expect(reactions.querySelector('.chip')?.getAttribute('title')).toBe('Ada +4');
        const job = render(JobStatus, {
            status: 'running',
            done: 3,
            total: 9,
            progressLabel: (d, t) => `${d}/${t}`,
        });
        expect(job.textContent).toContain('3/9');
        const composer = render(Composer, {
            label: 'Message',
            submitOn: 'mod-enter',
            keyLabels: { mod: 'Strg', enter: 'Eingabe' },
            onsubmit: () => { },
        });
        await tick();
        expect(composer.querySelector('.hint')?.textContent).toContain('Strg');
        expect(composer.querySelector('.hint')?.textContent).toContain('Eingabe');
        expect(composer.querySelector('label')?.textContent).toBe('Message');
    });
    it('CheckboxGroup names its fieldset and keeps focus on a spent action', () => {
        const onchange = vi.fn();
        const host = render(CheckboxGroup, {
            label: 'Topics',
            options: [{ value: 'a', label: 'A', description: 'About A' }],
            onchange,
        });
        const fieldset = host.querySelector('fieldset');
        const labelId = fieldset.getAttribute('aria-labelledby');
        expect(host.querySelector(`[id="${labelId}"]`)?.textContent).toBe('Topics');
        const all = host.querySelector('.actions button');
        all.focus();
        click(all);
        expect(onchange).toHaveBeenLastCalledWith(['a']);
        expect(all.getAttribute('aria-disabled')).toBe('true');
        expect(document.activeElement).toBe(all);
        click(all);
        expect(onchange).toHaveBeenCalledTimes(1);
    });
});
