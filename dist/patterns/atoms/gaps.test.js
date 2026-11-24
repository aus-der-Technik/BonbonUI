import { flushSync } from 'svelte';
import { click, html, render } from '../../test/render';
import Composer from '../molecules/Composer.svelte';
import EmptyState from '../molecules/EmptyState.svelte';
import DataTable from '../organisms/DataTable.svelte';
import Button from './Button.svelte';
import DotMatrix, { layoutDots } from './DotMatrix.svelte';
import ProgressBar from './ProgressBar.svelte';
import Slider from './Slider.svelte';
describe('library gaps found by the example pages', () => {
    it('lets a soft button stand in for EmptyState and Composer primaries', () => {
        const onaction = vi.fn();
        const empty = render(EmptyState, {
            title: 'Nothing yet',
            actionLabel: 'Add',
            onaction,
            actionVariant: 'soft',
        });
        expect(empty.querySelector('.btn--soft')).not.toBeNull();
        click(empty.querySelector('button'));
        expect(onaction).toHaveBeenCalled();
        expect(render(EmptyState, { actionLabel: 'Add', onaction }).querySelector('.btn--primary')).not.toBeNull();
        const composer = render(Composer, { label: 'Reply', onsubmit: vi.fn(), sendVariant: 'soft' });
        expect(composer.querySelector('.btn--soft')).not.toBeNull();
    });
    it('renders a leading row in DataTable, even while it is empty', () => {
        const host = render(DataTable, {
            columns: [{ key: 'name', label: 'Name' }],
            rows: [],
            rowKey: (r) => r.name,
            leading: html('<div class="draft">New row</div>'),
        });
        const leading = host.querySelector('tbody tr.leading');
        expect(leading?.querySelector('.draft')).not.toBeNull();
        expect(leading?.querySelector('td')?.getAttribute('colspan')).toBe('1');
    });
    it('keeps an explicit aria-label and is not erased by an undefined one', () => {
        const named = render(Button, {
            label: 'Close',
            icon: 'close',
            iconOnly: true,
            'aria-label': 'Close the panel',
        });
        expect(named.querySelector('button')?.getAttribute('aria-label')).toBe('Close the panel');
        const plain = render(Button, {
            label: 'Close',
            icon: 'close',
            iconOnly: true,
            'aria-label': undefined,
        });
        expect(plain.querySelector('button')?.getAttribute('aria-label')).toBe('Close');
    });
    it('hides the ProgressBar label but keeps it as the name, built from spans', () => {
        const host = render(ProgressBar, {
            value: 3,
            max: 4,
            label: 'Steps',
            showValue: true,
            hideLabel: true,
        });
        expect(host.querySelector('div')).toBeNull();
        expect(host.querySelector('.head')?.textContent?.trim()).toBe('75%');
        expect(host.querySelector('[role="progressbar"]')?.getAttribute('aria-label')).toBe('Steps');
    });
    it('lets a Slider drop its printed label and value', () => {
        const host = render(Slider, { label: 'Seek', value: 10, hideLabel: true, showValue: false });
        expect(host.querySelector('output')).toBeNull();
        expect(host.querySelector('label.sr-only')?.textContent).toBe('Seek');
        const withValue = render(Slider, { label: 'Volume', value: 40, hideLabel: true });
        expect(withValue.querySelector('output')?.textContent).toBe('40');
        flushSync();
    });
    it('draws the euro sign in dots', () => {
        expect(layoutDots('€').width).toBe(5);
        expect(render(DotMatrix, { value: '€12' }).querySelectorAll('circle').length).toBeGreaterThan(20);
    });
});
