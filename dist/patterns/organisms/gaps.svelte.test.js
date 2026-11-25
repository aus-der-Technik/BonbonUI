// Runes in a test file: the `.svelte.test.ts` suffix lets props change after mounting.
import { createRawSnippet, flushSync, mount, unmount } from 'svelte';
import { click, html, key, render, tick } from '../../test/render';
import Calendar, {} from '../molecules/Calendar.svelte';
import AppHeader from './AppHeader.svelte';
import CommentThread from './CommentThread.svelte';
import DataTable, {} from './DataTable.svelte';
import EditableGrid from './EditableGrid.svelte';
import ProductGrid from './ProductGrid.svelte';
import ResourceList from './ResourceList.svelte';
import Sheet from './Sheet.svelte';
import SideNav from './SideNav.svelte';
import AdminLayout from '../templates/AdminLayout.svelte';
import Page from '../templates/Page.svelte';
const items = [
    { id: 'a', name: 'Alpha' },
    { id: 'b', name: 'Beta' },
    { id: 'c', name: 'Gamma' },
    { id: 'd', name: 'Delta' },
];
const columns = [{ key: 'name', label: 'Name' }];
const rowKey = (r) => r.id;
/** Mounts with reactive props, so a test can change them afterwards. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function live(component, props) {
    const host = document.createElement('div');
    document.body.append(host);
    const app = mount(component, { target: host, props });
    flushSync();
    return { host, destroy: () => (unmount(app), host.remove()) };
}
const boxes = (host) => [
    ...host.querySelectorAll('tbody input[type="checkbox"]'),
];
const headBox = (host) => host.querySelector('thead input[type="checkbox"]');
describe('DataTable selection', () => {
    it('still reads a single string `selected` as the current row (1.x)', () => {
        const host = render(DataTable, { columns, rows: items, rowKey, selected: 'a' });
        expect(host.querySelector('tr[data-key="a"]')?.getAttribute('aria-current')).toBe('true');
        expect(host.querySelector('thead input[type="checkbox"]')).toBeNull();
    });
    it('picks rows by checkbox, header box, Shift range, Space and row click', () => {
        const onselectionchange = vi.fn();
        const host = render(DataTable, {
            columns,
            rows: items,
            rowKey,
            selectable: true,
            onselectionchange,
        });
        const head = headBox(host);
        expect(head.getAttribute('aria-label')).toBe('Select all rows on screen');
        expect(boxes(host)[0]?.getAttribute('aria-label')).toBe('Select Alpha');
        expect(boxes(host)[0]?.tabIndex).toBe(-1);
        click(boxes(host)[0]);
        expect(onselectionchange).toHaveBeenLastCalledWith(['a']);
        expect(head.indeterminate).toBe(true);
        expect(host.querySelector('tr[data-key="a"]')?.getAttribute('aria-selected')).toBe('true');
        expect(host.querySelector('tr[data-key="a"]')?.classList.contains('picked')).toBe(true);
        expect(host.querySelector('[aria-live="polite"]')?.textContent).toBe('1 selected');
        // Shift+click on the third box picks the range from the last toggled row.
        boxes(host)[2]?.dispatchEvent(new MouseEvent('click', { bubbles: true, shiftKey: true }));
        flushSync();
        expect(onselectionchange).toHaveBeenLastCalledWith(['a', 'b', 'c']);
        // Space on a focused row toggles it.
        const last = host.querySelector('tr[data-key="d"]');
        expect(last.tabIndex).toBe(0);
        key(last, ' ');
        expect(onselectionchange).toHaveBeenLastCalledWith(['a', 'b', 'c', 'd']);
        expect(head.checked).toBe(true);
        // The header box clears the rows on screen when all are picked.
        click(head);
        expect(onselectionchange).toHaveBeenLastCalledWith([]);
        click(head);
        expect(onselectionchange).toHaveBeenLastCalledWith(['a', 'b', 'c', 'd']);
        // A row without an action of its own toggles on click.
        click(host.querySelector('tr[data-key="b"] td:last-child'));
        expect(onselectionchange).toHaveBeenLastCalledWith(['a', 'c', 'd']);
        // Shift+Space unpicks the range up to the last toggled row.
        key(host.querySelector('tr[data-key="d"]'), ' ', { shiftKey: true });
        expect(onselectionchange).toHaveBeenLastCalledWith(['a']);
    });
    it('takes a Shift+click on the box label as a range, once', () => {
        const onselectionchange = vi.fn();
        const host = render(DataTable, {
            columns,
            rows: items,
            rowKey,
            selectable: true,
            onselectionchange,
        });
        click(boxes(host)[1]);
        const label = host.querySelectorAll('tbody td.pick label')[3];
        const event = new MouseEvent('click', { bubbles: true, cancelable: true, shiftKey: true });
        label.dispatchEvent(event);
        flushSync();
        expect(event.defaultPrevented).toBe(true);
        expect(onselectionchange).toHaveBeenCalledTimes(2);
        expect(onselectionchange).toHaveBeenLastCalledWith(['b', 'c', 'd']);
    });
    it('keeps picks from other pages and leaves row actions to Enter', () => {
        const onselectionchange = vi.fn();
        const onrowclick = vi.fn();
        const host = render(DataTable, {
            columns,
            rows: items.slice(0, 2),
            rowKey,
            selectable: true,
            selected: ['z'],
            onrowclick,
            onselectionchange,
        });
        click(headBox(host));
        expect(onselectionchange).toHaveBeenLastCalledWith(['z', 'a', 'b']);
        click(host.querySelector('tr[data-key="a"] td:last-child'));
        expect(onrowclick).toHaveBeenCalledOnce();
        key(host.querySelector('tr[data-key="a"]'), 'Enter');
        expect(onrowclick).toHaveBeenCalledTimes(2);
        key(host.querySelector('tr[data-key="a"]'), ' ');
        expect(onselectionchange).toHaveBeenLastCalledWith(['z', 'b']);
    });
    it('shows the selection bar above the table with actions, detail and Clear', () => {
        const seen = [];
        const actions = createRawSnippet((selection) => {
            seen.push(selection());
            return { render: () => `<button class="export">Export ${selection().count}</button>` };
        });
        const props = $state({
            columns,
            rows: items,
            rowKey,
            selectable: true,
            selected: ['a', 'c'],
            selectionActions: actions,
            selectionDetail: html('<p class="job">job</p>'),
            selectedLabel: (n) => `${n} picked`,
            clearSelectionLabel: 'Unpick',
        });
        const { host, destroy } = live(DataTable, props);
        const bar = host.querySelector('.bar');
        expect(bar?.nextElementSibling?.classList.contains('wrap')).toBe(true);
        expect(bar?.querySelector('.bar-count')?.textContent).toBe('2 picked');
        expect(bar?.querySelector('.export')).not.toBeNull();
        expect(bar?.querySelector('.job')).not.toBeNull();
        expect(seen.at(-1)?.rows.map((r) => r.id)).toEqual(['a', 'c']);
        const clear = [...(bar?.querySelectorAll('button') ?? [])].find((b) => b.textContent?.trim() === 'Unpick');
        click(clear);
        expect(props.selected).toEqual([]);
        expect(host.querySelector('.bar')).toBeNull();
        destroy();
    });
    it('keeps an empty bar with a hint when asked', () => {
        const host = render(DataTable, {
            columns,
            rows: items,
            rowKey,
            selectable: true,
            selectionBar: 'always',
            selectionDetail: html('<p class="job">job</p>'),
            selectionHint: 'Pick some',
        });
        expect(host.querySelector('.bar.empty-bar .bar-hint')?.textContent).toBe('Pick some');
    });
    it('glows a highlighted row once per change, also when it appears later, and adds rowClass', async () => {
        const props = $state({
            columns,
            rows: items.slice(0, 2),
            rowKey,
            highlight: 'a',
            rowClass: (r) => (r.id === 'b' ? 'mine' : undefined),
        });
        const { host, destroy } = live(DataTable, props);
        const row = (id) => host.querySelector(`tr[data-key="${id}"]`);
        expect(row('b').classList.contains('mine')).toBe(true);
        // Not on the first render.
        expect(row('a').style.animation).toBe('');
        props.highlight = 'b';
        flushSync();
        expect(row('b').style.animation).toContain('bb-changed');
        // A key whose row is not there yet glows once the row arrives.
        props.highlight = 'c';
        flushSync();
        props.rows = items.slice(0, 3);
        flushSync();
        await tick();
        expect(row('c').style.animation).toContain('bb-changed');
        props.highlight = undefined;
        flushSync();
        destroy();
    });
});
describe('ResourceList highlight', () => {
    it('glows the row a change landed on', () => {
        const props = $state({
            items,
            key: rowKey,
            title: (i) => i.name,
            highlight: undefined,
        });
        const { host, destroy } = live(ResourceList, props);
        props.highlight = 'c';
        flushSync();
        expect(host.querySelector('li[data-key="c"]')?.style.animation).toContain('bb-changed');
        props.highlight = undefined;
        flushSync();
        destroy();
    });
});
describe('EditableGrid feedback at the cell', () => {
    const gridColumns = [
        { name: 'id', type: 'BIGINT', locked: true },
        { name: 'name', type: 'VARCHAR' },
    ];
    const gridRows = [
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
    ];
    const cell = (host, row, col) => host.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
    it('explains a locked cell in a bubble anchored to it', () => {
        const onlockedclick = vi.fn();
        const host = render(EditableGrid, {
            columns: gridColumns,
            rows: gridRows,
            oncommit: () => { },
            onlockedclick,
            lockedHint: (column, row) => `${column.name} ${String(row['id'])} is fixed`,
        });
        click(cell(host, 1, 0));
        expect(onlockedclick).toHaveBeenCalledOnce();
        const bubble = host.querySelector('.bubble');
        expect(bubble?.textContent?.trim()).toBe('id 2 is fixed');
        expect(bubble?.getAttribute('role')).toBe('status');
        expect(cell(host, 1, 0).getAttribute('aria-describedby')).toBe(bubble?.id);
        // Escape dismisses it; editing another cell does too.
        host
            .querySelector('.wrap')
            ?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        flushSync();
        expect(host.querySelector('.bubble')).toBeNull();
    });
    it('takes a plain string hint and hides it when editing starts', () => {
        const host = render(EditableGrid, {
            columns: gridColumns,
            rows: gridRows,
            oncommit: () => { },
            lockedHint: 'Set by the database',
        });
        click(cell(host, 0, 0));
        expect(host.querySelector('.bubble')?.textContent?.trim()).toBe('Set by the database');
        click(cell(host, 0, 1));
        expect(host.querySelector('.bubble')).toBeNull();
    });
    it('shows why a save was rejected under the cell', async () => {
        const host = render(EditableGrid, {
            columns: gridColumns,
            rows: gridRows,
            oncommit: () => Promise.reject(new Error('too long')),
            errorMessage: (error, column) => `${column.name}: ${error.message}`,
        });
        click(cell(host, 0, 1));
        const editor = host.querySelector('textarea.editor');
        editor.value = 'Changed';
        editor.dispatchEvent(new Event('input', { bubbles: true }));
        key(editor, 'Enter');
        await tick();
        flushSync();
        const bubble = host.querySelector('.bubble.error');
        expect(bubble?.textContent?.trim()).toBe('name: too long');
        expect(bubble?.getAttribute('role')).toBe('alert');
        expect(cell(host, 0, 1).classList.contains('failed')).toBe(true);
    });
});
describe('Calendar day snippet', () => {
    it('renders your controls in every day cell with that day', () => {
        const days = [];
        const day = createRawSnippet((info) => {
            days.push(info());
            return { render: () => `<button class="add-day">+${info().date.getDate()}</button>` };
        });
        const today = new Date(2026, 10, 3);
        const host = render(Calendar, { today, value: today, day, dayReveal: 'hover' });
        const slots = host.querySelectorAll('.cell .slot.reveal .add-day');
        expect(slots.length).toBe(host.querySelectorAll('.cell').length);
        const mine = days.find((d) => d.date.getDate() === 3 && d.inMonth);
        expect(mine).toMatchObject({ selected: true, today: true, allowed: true });
        // The compact picker has no room for them.
        const small = render(Calendar, { today, size: 'sm', day });
        expect(small.querySelector('.slot')).toBeNull();
    });
});
describe('ProductGrid onadd', () => {
    it('hands over the pressed card', async () => {
        const onadd = vi.fn();
        const host = render(ProductGrid, {
            products: [{ id: 'p1', title: 'Mug', price: 12 }],
            onadd,
        });
        click(host.querySelector('button.add'));
        await tick();
        expect(onadd).toHaveBeenCalledOnce();
        const [product, card] = onadd.mock.calls[0];
        expect(product.id).toBe('p1');
        expect(card).toBeInstanceOf(HTMLElement);
        expect(host.querySelector('li.cell')?.contains(card)).toBe(true);
    });
});
describe('CommentThread new thread', () => {
    it('is a compact composer without a list, with Discard', () => {
        const oncancel = vi.fn();
        const host = render(CommentThread, {
            comments: [],
            quote: 'Card title',
            onreply: () => { },
            onresolve: () => { },
            oncancel,
        });
        expect(host.querySelector('.thread.fresh')).not.toBeNull();
        expect(host.querySelector('ol.list')).toBeNull();
        // Nothing to resolve yet.
        expect(host.textContent).not.toContain('Resolve');
        const field = host.querySelector('textarea');
        expect(field.getAttribute('placeholder')).toBe('Start the discussion…');
        field.value = 'Draft';
        field.dispatchEvent(new Event('input', { bubbles: true }));
        flushSync();
        const discard = [...host.querySelectorAll('button')].find((b) => b.textContent?.trim() === 'Discard');
        click(discard);
        expect(oncancel).toHaveBeenCalledOnce();
        expect(field.value).toBe('');
    });
    it('takes its own labels', () => {
        const host = render(CommentThread, {
            comments: [],
            onreply: () => { },
            oncancel: () => { },
            startPlaceholder: 'Ask something',
            startLabel: 'Post',
            cancelLabel: 'Drop',
        });
        expect(host.querySelector('textarea')?.getAttribute('placeholder')).toBe('Ask something');
        const labels = [...host.querySelectorAll('button')].map((b) => b.textContent?.trim());
        expect(labels).toContain('Drop');
    });
});
describe('frames', () => {
    it('SideNav stays a list inside a dialog and takes a fixed orientation', async () => {
        const groups = [{ items: [{ label: 'Home', href: '#', active: true }] }];
        const host = render(SideNav, { groups });
        expect(host.querySelector('nav')?.dataset.orientation).toBe('auto');
        const dialog = document.createElement('dialog');
        document.body.append(dialog);
        const app = mount(SideNav, { target: dialog, props: { groups } });
        flushSync();
        await tick();
        expect(dialog.querySelector('nav')?.dataset.orientation).toBe('vertical');
        unmount(app);
        dialog.remove();
        const strip = render(SideNav, { groups, orientation: 'horizontal' });
        expect(strip.querySelector('nav.nav--horizontal')).not.toBeNull();
    });
    it('Page and AdminLayout keep the fill shell on phones on request', () => {
        const page = render(Page, { fill: true, fillOnPhone: true, children: html('<p>x</p>') });
        expect(page.querySelector('.page.fill.fill-phone')).not.toBeNull();
        const plain = render(Page, { fill: true, children: html('<p>x</p>') });
        expect(plain.querySelector('.fill-phone')).toBeNull();
        const admin = render(AdminLayout, {
            title: 'Admin',
            fill: true,
            fillOnPhone: true,
            children: html('<p>x</p>'),
        });
        expect(admin.querySelector('.fill-phone')).not.toBeNull();
    });
    it('AppHeader and Sheet still render their parts', () => {
        const header = render(AppHeader, { title: 'Orders', actions: html('<button>a</button>') });
        expect(header.querySelector('.inner .title')).not.toBeNull();
        expect(header.querySelector('.inner .actions button')).not.toBeNull();
        const sheet = render(Sheet, { title: 'Data', children: html('<p class="b">b</p>') });
        expect(sheet.querySelector('.sheet .body .b')).not.toBeNull();
    });
});
